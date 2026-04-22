import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Pathway } from '@prisma/client'
import { getProvider, type ChatMessage } from '@/lib/ai/provider'
import {
  buildTutorSystemPrompt,
  HINT_PROGRESSION,
  defaultMetadata,
  preFlightCheck,
  type TutorSessionMetadata,
  type SessionQuality,
} from '@/lib/ai/tutor-prompt'
import { isLessonContent } from '@/lib/types/curriculum'

const VALID_PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']

// ─── Rate limit constants ───────────────────────────────────────────────────

const MAX_MESSAGES_PER_SESSION = 50
const MAX_MESSAGES_PER_MINUTE = 10
const MAX_TOKENS_PER_SESSION = 5000
const MAX_MESSAGES_PER_DAY = 200  // Per-student daily cap across all sessions
const RATE_LIMIT_WINDOW_MS = 60_000

// ─── Per-student daily rate limit (in-memory, resets on restart) ──────────────

const dailyUsage = new Map<string, { count: number; resetAt: number }>()

// Cleanup stale daily entries every 30 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of dailyUsage) {
    if (entry.resetAt < now) dailyUsage.delete(key)
  }
}, 30 * 60 * 1000)

function checkDailyLimit(studentId: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const key = `tutor-daily:${studentId}`
  const entry = dailyUsage.get(key)

  if (!entry || entry.resetAt < now) {
    dailyUsage.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 })
    return { allowed: true }
  }

  if (entry.count >= MAX_MESSAGES_PER_DAY) {
    return {
      allowed: false,
      reason: `You've reached your daily limit of ${MAX_MESSAGES_PER_DAY} tutor messages. Come back tomorrow refreshed and ready to learn!`,
    }
  }

  entry.count++
  return { allowed: true }
}

// ─── Timeout constant ───────────────────────────────────────────────────────

const AI_TIMEOUT_MS = 15_000

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true },
  })
  return dbUser
}

// ─── Hint level advancement logic ────────────────────────────────────────────

function computeNextHintLevel(
  metadata: TutorSessionMetadata,
  pathway: Pathway,
  assistantText: string
): number {
  const rule = HINT_PROGRESSION[pathway]
  const isStruggling = assistantText.includes('[STRUGGLED:')

  if (rule.attemptsToAdvance === null) return metadata.hintLevel
  if (!isStruggling) return metadata.hintLevel

  return Math.min(metadata.hintLevel + 1, rule.maxLevel)
}

function extractStruggledConcept(text: string): string | null {
  const match = text.match(/\[STRUGGLED:\s*([^\]]+)\]/)
  return match ? match[1].trim() : null
}

function stripHiddenTags(text: string): string {
  return text.replace(/\s*\[STRUGGLED:[^\]]*\]/g, '').trim()
}

function assessSessionQuality(
  metadata: TutorSessionMetadata,
  messages: ChatMessage[]
): SessionQuality {
  const userMessages = messages.filter(m => m.role === 'user')
  if (userMessages.length === 0) return metadata.sessionQuality

  const avgLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length
  if (avgLength < 20 && userMessages.length > 2) return 'passive'
  if (metadata.hintLevel >= 3) return 'struggling'
  return 'engaged'
}

// ─── Rate limiting checks ───────────────────────────────────────────────────

interface RateLimitResult {
  allowed: boolean
  reason?: string
}

function checkRateLimits(
  metadata: TutorSessionMetadata,
  tokenCount: number
): RateLimitResult {
  // Max messages per session
  if (metadata.messageCount >= MAX_MESSAGES_PER_SESSION) {
    return {
      allowed: false,
      reason: `You've had a great session with ${MAX_MESSAGES_PER_SESSION} exchanges! Take a break, review what you've learned, and come back to continue later.`,
    }
  }

  // Max tokens per session
  if (tokenCount >= MAX_TOKENS_PER_SESSION) {
    return {
      allowed: false,
      reason: "You've had a thorough session! To keep things running smoothly, take a break and review your notes. You can start a new conversation next time.",
    }
  }

  // Max messages per minute
  const now = Date.now()
  const recentTimestamps = (metadata.rateLimitTimestamps ?? [])
    .filter(ts => now - ts < RATE_LIMIT_WINDOW_MS)

  if (recentTimestamps.length >= MAX_MESSAGES_PER_MINUTE) {
    return {
      allowed: false,
      reason: "You're sending messages really fast! Take a moment to think about the tutor's last response, then try again.",
    }
  }

  return { allowed: true }
}

function updateRateLimitTimestamps(timestamps: number[] = []): number[] {
  const now = Date.now()
  // Keep only timestamps within the rate limit window, plus the new one
  return [...timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS), now]
}

// ─── GET — Load existing session history ─────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')
    const pathway = searchParams.get('pathway') as Pathway | null

    if (!lessonId || !pathway || !VALID_PATHWAYS.includes(pathway)) {
      return NextResponse.json({ error: 'lessonId and valid pathway required.' }, { status: 400 })
    }

    const session = await prisma.tutorSession.findFirst({
      where: { studentId: dbUser.id, lessonId, pathway },
      orderBy: { startedAt: 'desc' },
      select: { id: true, messages: true, metadata: true, tokenCount: true },
    })

    return NextResponse.json({
      messages: (session?.messages as unknown as ChatMessage[]) ?? [],
      sessionId: session?.id ?? null,
      metadata: (session?.metadata as unknown as TutorSessionMetadata) ?? null,
      tokenCount: session?.tokenCount ?? 0,
    })
  } catch (error) {
    console.error('Tutor GET error:', error)
    return NextResponse.json({ error: 'Failed to load session.' }, { status: 500 })
  }
}

// ─── POST — Streaming chat with session persistence ──────────────────────────

export async function POST(request: NextRequest) {
  let sessionContext = '(unknown)'
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as {
      lessonId?: string
      message?: string
      conversationHistory?: ChatMessage[]
      pathway?: string
      metadata?: TutorSessionMetadata
    }

    const { lessonId, message, conversationHistory = [], pathway } = body
    sessionContext = `student=${dbUser.id} lesson=${lessonId} pathway=${pathway}`

    // Validate inputs
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }
    if (!lessonId || typeof lessonId !== 'string') {
      return NextResponse.json({ error: 'lessonId is required.' }, { status: 400 })
    }
    if (!pathway || !VALID_PATHWAYS.includes(pathway as Pathway)) {
      return NextResponse.json({ error: 'Valid pathway required.' }, { status: 400 })
    }

    const trimmedMessage = message.trim()

    // Pre-flight safety check
    const preflight = preFlightCheck(trimmedMessage)
    if (!preflight.ok) {
      return NextResponse.json({ error: preflight.reason }, { status: 422 })
    }

    // Fetch lesson and validate content
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, content: true },
    })

    if (!lesson || !isLessonContent(lesson.content)) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 })
    }

    const typedPathway = pathway as Pathway

    // Load existing session (including server-side conversation history) or use defaults
    const existing = await prisma.tutorSession.findFirst({
      where: { studentId: dbUser.id, lessonId, pathway: typedPathway },
      select: { id: true, messages: true, metadata: true, tokenCount: true },
    })
    const currentMetadata: TutorSessionMetadata =
      (existing?.metadata as unknown as TutorSessionMetadata) ?? defaultMetadata(typedPathway)
    const currentTokenCount = existing?.tokenCount ?? 0

    // SECURITY: Load conversation history from server, never trust client-supplied history
    const serverHistory: ChatMessage[] = existing?.messages
      ? (existing.messages as unknown as ChatMessage[])
      : []

    // Rate limit checks — per-session limits
    const rateLimitResult = checkRateLimits(currentMetadata, currentTokenCount)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.reason, rateLimited: true },
        { status: 429 }
      )
    }

    // Per-student daily limit across all sessions
    const dailyResult = checkDailyLimit(dbUser.id)
    if (!dailyResult.allowed) {
      return NextResponse.json(
        { error: dailyResult.reason, rateLimited: true },
        { status: 429 }
      )
    }

    const systemPrompt = buildTutorSystemPrompt(lesson.content, typedPathway, currentMetadata)

    // Call AI provider with timeout + retry
    const provider = getProvider()
    let aiStream: ReadableStream<string>

    try {
      aiStream = await callWithTimeout(
        () => provider.chatStream({
          systemPrompt,
          messages: serverHistory,
          userMessage: trimmedMessage,
        }),
        AI_TIMEOUT_MS
      )
    } catch (timeoutErr) {
      // First timeout — retry once
      console.warn(`Tutor AI timeout (attempt 1), retrying. ${sessionContext}`, timeoutErr)
      try {
        aiStream = await callWithTimeout(
          () => provider.chatStream({
            systemPrompt,
            messages: serverHistory,
            userMessage: trimmedMessage,
          }),
          AI_TIMEOUT_MS
        )
      } catch (retryErr) {
        console.error(`Tutor AI timeout (attempt 2), giving up. ${sessionContext}`, retryErr)
        return NextResponse.json(
          { error: 'Your AI Tutor is temporarily unavailable. Review the lesson content and try again shortly.', aiUnavailable: true },
          { status: 503 }
        )
      }
    }

    // Tee the stream: one branch for SSE response, one for collecting full text
    const [responseBranch, collectBranch] = aiStream.tee()

    // Collect full text asynchronously for session persistence + metadata update
    const persistPromise = (async () => {
      try {
        const reader = collectBranch.getReader()
        let fullText = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += value
        }

        if (!fullText) return { metadata: currentMetadata, tokenCount: currentTokenCount }

        const struggledConcept = extractStruggledConcept(fullText)
        const cleanText = stripHiddenTags(fullText)

        const updatedMetadata: TutorSessionMetadata = {
          messageCount: currentMetadata.messageCount + 1,
          hintLevel: computeNextHintLevel(currentMetadata, typedPathway, fullText),
          struggledConcepts: struggledConcept
            ? [...new Set([...currentMetadata.struggledConcepts, struggledConcept])]
            : currentMetadata.struggledConcepts,
          sessionQuality: 'engaged',
          rateLimitTimestamps: updateRateLimitTimestamps(currentMetadata.rateLimitTimestamps),
        }

        const updatedMessages: ChatMessage[] = [
          ...serverHistory,
          { role: 'user', content: trimmedMessage },
          { role: 'assistant', content: cleanText },
        ]

        updatedMetadata.sessionQuality = assessSessionQuality(updatedMetadata, updatedMessages)

        const newTokens = Math.ceil((trimmedMessage.length + cleanText.length) / 4)
        const totalTokens = currentTokenCount + newTokens

        const sessionData = {
          messages: updatedMessages as unknown as import('@prisma/client').Prisma.JsonArray,
          metadata: updatedMetadata as unknown as import('@prisma/client').Prisma.JsonObject,
          tokenCount: totalTokens,
        }

        if (existing) {
          await prisma.tutorSession.update({
            where: { id: existing.id },
            data: sessionData,
          })
        } else {
          await prisma.tutorSession.create({
            data: {
              studentId: dbUser.id,
              lessonId,
              pathway: typedPathway,
              ...sessionData,
            },
          })
        }

        return { metadata: updatedMetadata, tokenCount: totalTokens }
      } catch (err) {
        console.error(`Tutor session persist error. ${sessionContext}`, err)
        return { metadata: currentMetadata, tokenCount: currentTokenCount }
      }
    })()

    // Convert AI stream to SSE format, stripping hidden tags from streamed output
    const encoder = new TextEncoder()
    let streamBuffer = ''
    const sseStream = new ReadableStream({
      async start(controller) {
        try {
          const reader = responseBranch.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            streamBuffer += value
            const tagStart = streamBuffer.lastIndexOf('[STRUGGLED:')
            if (tagStart !== -1) {
              const tagEnd = streamBuffer.indexOf(']', tagStart)
              if (tagEnd !== -1) {
                const cleaned = streamBuffer.slice(0, tagStart) + streamBuffer.slice(tagEnd + 1)
                if (cleaned) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(cleaned)}\n\n`))
                }
                streamBuffer = ''
              }
            } else {
              if (streamBuffer) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(streamBuffer)}\n\n`))
              }
              streamBuffer = ''
            }
          }
          if (streamBuffer) {
            const cleaned = stripHiddenTags(streamBuffer)
            if (cleaned) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(cleaned)}\n\n`))
            }
          }

          const { metadata: finalMetadata, tokenCount: finalTokenCount } = await persistPromise
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ __metadata: finalMetadata, __tokenCount: finalTokenCount })}\n\n`))
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          console.error(`Tutor stream error. ${sessionContext}`, err)
          // Try to send an error event before closing
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ __error: 'Stream interrupted. Please try again.' })}\n\n`))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch {
            controller.error(err)
          }
        }
      },
    })

    return new Response(sseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error(`Tutor POST error. ${sessionContext}`, error)
    return NextResponse.json(
      { error: 'Your AI Tutor is temporarily unavailable. Review the lesson content and try again shortly.', aiUnavailable: true },
      { status: 500 }
    )
  }
}

// ─── Timeout helper ─────────────────────────────────────────────────────────

async function callWithTimeout<T>(
  fn: () => T | Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    Promise.resolve(fn()),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out')), timeoutMs)
    ),
  ])
}
