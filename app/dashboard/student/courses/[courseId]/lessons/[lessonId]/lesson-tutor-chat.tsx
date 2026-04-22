'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Pathway, ContentBlock } from '@/lib/types/curriculum'
import type { ChatMessage } from '@/lib/ai/provider'
import type { TutorSessionMetadata } from '@/lib/ai/tutor-prompt'

const WELCOME_MESSAGES: Record<Pathway, string> = {
  ADVANCED:
    "Welcome, scholar! I'm here to push your thinking deeper on this lesson. Let's wrestle with the ideas together — ask me anything or share what's challenging you.",
  STANDARD:
    "Hi there! I'm your AI tutor for this lesson. I'll guide you step by step through the material. What would you like to explore or what's confusing you?",
  VOCATIONAL:
    "Hey! I'm here to help you connect this lesson to real life. Let's figure out how these ideas apply to the world around you. What's on your mind?",
}

const HINT_LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Exploring', color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
  2: { label: 'Guided', color: 'text-blue-400 bg-blue-500/10 ring-blue-500/20' },
  3: { label: 'Scaffolded', color: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
  4: { label: 'Supported', color: 'text-violet-400 bg-violet-500/10 ring-violet-500/20' },
}

const ENCOURAGEMENT_MESSAGES = [
  "You're working through this well — keep going!",
  "Great effort! Wrestling with hard questions builds real understanding.",
  "You're making real progress. Every question you ask shows growth.",
  "Nice work staying with it. The struggle is where learning happens!",
]

function getEncouragementMessage(messageCount: number): string {
  return ENCOURAGEMENT_MESSAGES[messageCount % ENCOURAGEMENT_MESSAGES.length]
}

function shouldShowEncouragement(metadata: TutorSessionMetadata | null): boolean {
  if (!metadata) return false
  const { messageCount, sessionQuality } = metadata
  if (messageCount < 3) return false
  if (sessionQuality === 'struggling') return messageCount % 3 === 0
  if (sessionQuality === 'passive') return messageCount % 5 === 0
  return messageCount % 4 === 0
}

// ─── Fallback Content (discussion questions from lesson) ────────────────────

function FallbackContent({ processingBlocks }: { processingBlocks: ContentBlock[] }) {
  const discussions = processingBlocks.filter(b => b.type === 'discussion')
  if (discussions.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-500/8 ring-1 ring-amber-500/15 p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-xs font-semibold text-amber-400">AI Tutor Unavailable</p>
        </div>
        <p className="text-xs text-amber-200/80 leading-relaxed mb-3">
          Your AI Tutor is temporarily unavailable. In the meantime, work through these discussion questions from the lesson:
        </p>
        <div className="space-y-2.5">
          {discussions.map((block, i) => {
            if (block.type !== 'discussion') return null
            return (
              <div key={i} className="rounded-lg bg-white/3 ring-1 ring-white/6 p-3">
                <p className="text-sm text-gray-300 leading-relaxed mb-2">{block.question}</p>
                {block.hint && (
                  <p className="text-xs text-gray-500 italic">Hint: {block.hint}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Session Summary Card ───────────────────────────────────────────────────

function SessionSummary({ metadata }: { metadata: TutorSessionMetadata }) {
  const qualityLabels: Record<string, { label: string; color: string }> = {
    engaged: { label: 'Engaged', color: 'text-emerald-400' },
    passive: { label: 'Getting Started', color: 'text-amber-400' },
    struggling: { label: 'Persevering', color: 'text-violet-400' },
  }
  const quality = qualityLabels[metadata.sessionQuality] ?? qualityLabels.engaged

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/8 to-blue-500/5 ring-1 ring-emerald-500/20 p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <span className="text-sm font-semibold text-emerald-400">Tutor Session Summary</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        <div className="rounded-xl bg-white/3 ring-1 ring-white/6 p-2 sm:p-3 text-center">
          <p className="text-sm sm:text-lg font-bold text-white">{metadata.messageCount}</p>
          <p className="text-xs text-gray-500">Exchanges</p>
        </div>
        <div className="rounded-xl bg-white/3 ring-1 ring-white/6 p-2 sm:p-3 text-center">
          <p className={`text-sm sm:text-lg font-bold ${quality.color}`}>{quality.label}</p>
          <p className="text-xs text-gray-500">Engagement</p>
        </div>
        <div className="rounded-xl bg-white/3 ring-1 ring-white/6 p-2 sm:p-3 text-center">
          <p className="text-sm sm:text-lg font-bold text-white">{HINT_LEVEL_LABELS[metadata.hintLevel]?.label ?? 'Exploring'}</p>
          <p className="text-xs text-gray-500">Support Level</p>
        </div>
      </div>
      {metadata.struggledConcepts.length > 0 && (
        <div className="rounded-xl bg-white/3 ring-1 ring-white/6 p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Concepts to Review</p>
          <div className="flex flex-wrap gap-1.5">
            {metadata.struggledConcepts.map(concept => (
              <span key={concept} className="text-xs text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20 px-2 py-0.5 rounded-full">
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Hint Level Progress Indicator ──────────────────────────────────────────

function HintLevelIndicator({ level, prevLevel }: { level: number; prevLevel: number }) {
  const info = HINT_LEVEL_LABELS[level] ?? HINT_LEVEL_LABELS[1]
  const advanced = level > prevLevel

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 text-xs font-medium transition-all ${info.color} ${advanced ? 'animate-pulse' : ''}`}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i <= level ? 'bg-current' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      <span>{info.label}</span>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function LessonTutorChat({
  lessonId,
  pathway,
  lessonComplete,
  processingBlocks,
}: {
  lessonId: string
  pathway: Pathway
  lessonComplete?: boolean
  processingBlocks?: ContentBlock[]
}) {
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState<TutorSessionMetadata | null>(null)
  const [prevHintLevel, setPrevHintLevel] = useState(1)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [errorState, setErrorState] = useState<{ message: string; canRetry: boolean; aiUnavailable?: boolean } | null>(null)
  const [rateLimited, setRateLimited] = useState(false)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const prevPathwayRef = useRef(pathway)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Load existing session on mount / pathway change
  useEffect(() => {
    if (prevPathwayRef.current !== pathway) {
      abortRef.current?.abort()
      setMessages([])
      setStreamingText('')
      setStreaming(false)
      setMetadata(null)
      setPrevHintLevel(1)
      setErrorState(null)
      setRateLimited(false)
      prevPathwayRef.current = pathway
    }

    let cancelled = false
    setLoading(true)

    fetch(`/api/tutor?lessonId=${encodeURIComponent(lessonId)}&pathway=${pathway}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          if (data.messages?.length) setMessages(data.messages)
          if (data.metadata) {
            setMetadata(data.metadata)
            setPrevHintLevel(data.metadata.hintLevel)
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [lessonId, pathway])

  useEffect(scrollToBottom, [messages, streamingText, scrollToBottom])

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  // Show encouragement when metadata updates
  useEffect(() => {
    if (shouldShowEncouragement(metadata)) {
      setShowEncouragement(true)
      const timer = setTimeout(() => setShowEncouragement(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [metadata?.messageCount]) // eslint-disable-line react-hooks/exhaustive-deps

  async function sendMessage(retryMessage?: string) {
    const trimmed = retryMessage ?? input.trim()
    if (!trimmed || streaming) return

    setErrorState(null)
    setLastFailedMessage(null)

    if (!retryMessage) {
      const userMsg: ChatMessage = { role: 'user', content: trimmed }
      setMessages(prev => [...prev, userMsg])
      setInput('')
    }

    setStreaming(true)
    setStreamingText('')

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          message: trimmed,
          conversationHistory: retryMessage
            ? messages.slice(0, -1) // remove the failed assistant message for retry
            : messages.slice(0, -1), // messages before the user msg we just added
          pathway,
          metadata,
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))

        if (res.status === 429) {
          setRateLimited(true)
          setErrorState({ message: err.error || 'Rate limited', canRetry: false })
          return
        }
        if (res.status === 422) {
          // Pre-flight safety rejection — show as assistant message
          setMessages(prev => [...prev, { role: 'assistant', content: err.error }])
          return
        }
        if (err.aiUnavailable) {
          setErrorState({ message: err.error, canRetry: true, aiUnavailable: true })
          setLastFailedMessage(trimmed)
          return
        }

        throw new Error(err.error || 'Request failed')
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            // Check for metadata update
            if (typeof parsed === 'object' && parsed !== null && '__metadata' in parsed) {
              const newMeta = parsed.__metadata as TutorSessionMetadata
              setPrevHintLevel(metadata?.hintLevel ?? 1)
              setMetadata(newMeta)
              continue
            }
            // Check for stream error
            if (typeof parsed === 'object' && parsed !== null && '__error' in parsed) {
              setErrorState({ message: parsed.__error as string, canRetry: true })
              setLastFailedMessage(trimmed)
              continue
            }
            const text = parsed as string
            fullText += text
            setStreamingText(fullText)
          } catch {
            // skip malformed chunks
          }
        }
      }

      if (fullText) {
        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return

      console.error('Tutor chat error:', err)

      // Network error — show retry
      setErrorState({
        message: 'Connection lost. Check your internet and try again.',
        canRetry: true,
      })
      setLastFailedMessage(trimmed)
    } finally {
      setStreaming(false)
      setStreamingText('')
      abortRef.current = null
    }
  }

  function handleRetry() {
    if (lastFailedMessage) {
      sendMessage(lastFailedMessage)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const inputDisabled = streaming || rateLimited

  // Show session summary when lesson is marked complete
  if (lessonComplete && metadata && metadata.messageCount > 0) {
    return <SessionSummary metadata={metadata} />
  }

  if (!expanded) {
    return (
      <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
        <button
          onClick={() => setExpanded(true)}
          className="w-full p-5 flex items-center justify-between gap-3 hover:bg-white/3 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Master Tutor</p>
              <p className="text-xs text-gray-500">Socratic dialogue for this lesson</p>
            </div>
          </div>
          <span className="text-xs font-medium text-blue-400 bg-blue-500/10 ring-1 ring-blue-500/20 px-3 py-1.5 rounded-full shrink-0">
            {messages.length > 0 ? 'Continue Conversation' : 'Start Conversation'}
          </span>
        </button>
      </div>
    )
  }

  const displayMessages =
    messages.length > 0
      ? messages
      : [{ role: 'assistant' as const, content: WELCOME_MESSAGES[pathway] }]

  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-white">AI Master Tutor</p>
          {metadata && (
            <HintLevelIndicator level={metadata.hintLevel} prevLevel={prevHintLevel} />
          )}
        </div>
        <button
          onClick={() => setExpanded(false)}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Minimize
        </button>
      </div>

      {/* Encouragement toast */}
      {showEncouragement && metadata && (
        <div className="px-4 py-2 bg-emerald-500/8 border-b border-emerald-500/15 transition-all">
          <p className="text-xs text-emerald-400 text-center font-medium">
            {getEncouragementMessage(metadata.messageCount)}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="max-h-[40vh] sm:max-h-[400px] overflow-y-auto p-4 space-y-3">
        {loading && messages.length === 0 && (
          <div className="text-xs text-gray-600 text-center py-4">Loading conversation...</div>
        )}
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 ring-1 ring-white/8 text-gray-300'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {streaming && streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-white/5 ring-1 ring-white/8 text-gray-300">
              {streamingText}
              <span className="inline-block w-1.5 h-4 bg-blue-400 rounded-full ml-0.5 animate-pulse align-middle" />
            </div>
          </div>
        )}
        {streaming && !streamingText && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2.5 bg-white/5 ring-1 ring-white/8">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Error state with retry */}
        {errorState && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-rose-500/8 ring-1 ring-rose-500/15">
              <p className="text-sm text-rose-300 leading-relaxed mb-2">{errorState.message}</p>
              {errorState.canRetry && (
                <button
                  onClick={handleRetry}
                  className="text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 ring-1 ring-rose-500/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        )}

        {/* Fallback content when AI is unavailable */}
        {errorState?.aiUnavailable && processingBlocks && (
          <FallbackContent processingBlocks={processingBlocks} />
        )}

        {/* Rate limit message */}
        {rateLimited && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-amber-500/8 ring-1 ring-amber-500/15">
              <p className="text-sm text-amber-300 leading-relaxed">{errorState?.message}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/6">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={rateLimited ? 'Session limit reached. Take a break!' : 'Ask a question about this lesson...'}
            rows={1}
            disabled={inputDisabled}
            maxLength={500}
            className="flex-1 bg-white/5 border border-white/8 focus:border-blue-500/60 text-white text-sm placeholder-gray-600 rounded-xl px-4 py-2.5 outline-none resize-none transition-colors leading-relaxed disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || inputDisabled}
            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white flex items-center justify-center shrink-0 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-600 hidden sm:block">
            Press Enter to send, Shift+Enter for new line
          </p>
          <p className={`text-xs ${input.length > 450 ? 'text-amber-400' : 'text-gray-700'}`}>
            {input.length}/500
          </p>
        </div>
      </div>
    </div>
  )
}
