import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { uploadFile, deleteFile, keyFromUrl } from '@/lib/storage/r2'
import { getProvider } from '@/lib/ai/provider'
import { isLessonContent } from '@/lib/types/curriculum'
import { buildSummativeGradingPrompt, parseGradingResponse } from '@/lib/ai/grading-prompt'
import type { GradeMetadata, AIGradingResult } from '@/lib/types/assessment'

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true, parentId: true },
  })
  return dbUser
}

// ─── Rate limiting ───────────────────────────────────────────────────────────

const uploadTimes: Map<string, number[]> = new Map()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const times = (uploadTimes.get(userId) ?? []).filter(t => now - t < 60_000)
  if (times.length >= 5) return false
  times.push(now)
  uploadTimes.set(userId, times)
  return true
}

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

const ALLOWED_EXTENSIONS = new Set([
  'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'mp4', 'mp3', 'wav', 'mov',
  'txt', 'rtf', 'csv',
])

const ALLOWED_MIMES = new Set([
  'application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg','image/png','image/gif','image/webp','image/svg+xml',
  'video/mp4','video/quicktime','audio/mpeg','audio/wav',
  'text/plain','text/csv','application/rtf',
])

function isAllowedFile(filename: string, mimeType?: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (!ALLOWED_EXTENSIONS.has(ext)) return false
  // Verify MIME type if provided by browser
  if (mimeType && mimeType !== 'application/octet-stream' && !ALLOWED_MIMES.has(mimeType)) return false
  return true
}

// ─── GET: Fetch portfolio submissions ────────────────────────────────────────

export async function GET(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const lessonId = searchParams.get('lessonId')
  const studentId = searchParams.get('studentId')

  // Determine which student to query
  let targetStudentId: string

  if (user.role === 'STUDENT') {
    targetStudentId = user.id
  } else if (user.role === 'PARENT' && studentId) {
    // Verify this student belongs to this parent
    const student = await prisma.user.findFirst({
      where: { id: studentId, parentId: user.id },
      select: { id: true },
    })
    if (!student) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    targetStudentId = student.id
  } else if (user.role === 'ADMIN' && studentId) {
    targetStudentId = studentId
  } else if (user.role === 'ADMIN' || user.role === 'PARENT') {
    // Return all submissions for admin or parent's children
    const where = user.role === 'ADMIN'
      ? {}
      : { student: { parentId: user.id } }
    const submissions = await prisma.portfolioSubmission.findMany({
      where,
      include: {
        lesson: { select: { title: true, unit: { select: { title: true, course: { select: { id: true, title: true } } } } } },
        student: { select: { name: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ submissions })
  } else {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Single lesson query or all for student
  if (lessonId) {
    const submission = await prisma.portfolioSubmission.findUnique({
      where: { studentId_lessonId: { studentId: targetStudentId, lessonId } },
    })
    return NextResponse.json({ submission })
  }

  const submissions = await prisma.portfolioSubmission.findMany({
    where: { studentId: targetStudentId },
    include: {
      lesson: { select: { title: true, unit: { select: { title: true, course: { select: { id: true, title: true } } } } } },
    },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json({ submissions })
}

// ─── POST: Create or update a portfolio submission ───────────────────────────

export async function POST(req: NextRequest) {
  const user = await getAuthUser()
  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Only students can submit portfolio work' }, { status: 403 })
  }

  if (!checkRateLimit(user.id)) {
    return NextResponse.json({ error: 'Too many uploads. Please wait a moment.' }, { status: 429 })
  }

  const formData = await req.formData()
  const lessonId = formData.get('lessonId') as string
  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || undefined
  const textContent = (formData.get('textContent') as string) || undefined
  const file = formData.get('file') as File | null

  if (!lessonId || !title) {
    return NextResponse.json({ error: 'lessonId and title are required' }, { status: 400 })
  }

  // Validate text content length
  if (textContent && textContent.length > 100_000) {
    return NextResponse.json({ error: 'Text content must be under 100,000 characters.' }, { status: 400 })
  }

  // Verify student is enrolled in this course
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, type: true, unit: { select: { courseId: true } } },
  })
  if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })

  const enrollment = await prisma.enrollment.findFirst({
    where: { studentId: user.id, courseId: lesson.unit.courseId, status: 'ACTIVE' },
  })
  if (!enrollment) return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })

  // Handle file upload
  let fileUrl: string | undefined
  let fileType: string | undefined
  let fileSize: number | undefined

  if (file && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds 50MB limit' }, { status: 400 })
    }
    if (!isAllowedFile(file.name, file.type)) {
      return NextResponse.json({ error: 'File type not allowed. Accepted: PDF, DOC, DOCX, PPT, PPTX, images, audio, video.' }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const key = `portfolio/${user.id}/${lessonId}/${Date.now()}.${ext}`
    fileUrl = await uploadFile(key, buffer, file.type)
    fileType = file.type
    fileSize = file.size
  }

  // Check for existing submission (to delete old file if replacing)
  const existing = await prisma.portfolioSubmission.findUnique({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
  })

  if (existing?.fileUrl && fileUrl) {
    // Replace old file
    try { await deleteFile(keyFromUrl(existing.fileUrl)) } catch { /* ok */ }
  }

  const submission = await prisma.portfolioSubmission.upsert({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
    create: {
      studentId: user.id,
      lessonId,
      title,
      description,
      textContent,
      fileUrl,
      fileType,
      fileSize,
      status: 'draft',
    },
    update: {
      title,
      description,
      textContent,
      ...(fileUrl && { fileUrl, fileType, fileSize }),
      status: 'draft', // Reset to draft on edit
    },
  })

  return NextResponse.json({ submission }, { status: existing ? 200 : 201 })
}

// ─── PATCH: Submit for grading ───────────────────────────────────────────────

export async function PATCH(req: NextRequest) {
  const user = await getAuthUser()
  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Only students can submit portfolio work' }, { status: 403 })
  }

  const body = await req.json()
  const { lessonId } = body

  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId is required' }, { status: 400 })
  }

  const submission = await prisma.portfolioSubmission.findUnique({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
  })

  if (!submission) {
    return NextResponse.json({ error: 'No submission found' }, { status: 404 })
  }

  if (submission.status === 'submitted' || submission.status === 'graded') {
    return NextResponse.json({ error: 'Already submitted' }, { status: 400 })
  }

  if (!submission.textContent && !submission.fileUrl) {
    return NextResponse.json({ error: 'Cannot submit empty work. Add text or a file.' }, { status: 400 })
  }

  // Mark as submitted immediately
  await prisma.portfolioSubmission.update({
    where: { id: submission.id },
    data: { status: 'submitted', submittedAt: new Date() },
  })

  // Trigger AI grading on the project
  let aiGrade: number | null = null
  let aiFeedback: string | null = null

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, title: true, content: true, unit: { select: { courseId: true } } },
    })

    if (lesson && isLessonContent(lesson.content)) {
      const content = lesson.content
      // Find student's pathway from enrollment
      const enrollment = await prisma.enrollment.findFirst({
        where: { studentId: user.id, courseId: lesson.unit.courseId, status: 'ACTIVE' },
        select: { pathway: true },
      })
      const pathway = enrollment?.pathway ?? 'STANDARD'
      const variant = content.pathways.find(p => p.pathway === pathway)

      // Find project block with rubric
      const projectBlock = variant?.ipo.output.find(b => b.type === 'project')
      const rubric = projectBlock && 'rubric' in projectBlock && projectBlock.rubric
        ? projectBlock.rubric
        : [{ dimension: 'Overall Quality', maxPoints: 100, descriptors: { exemplary: 'Excellent work demonstrating mastery', proficient: 'Good work meeting expectations', developing: 'Needs additional effort and revision' } }]

      const projectDescription = projectBlock && 'description' in projectBlock
        ? projectBlock.description
        : variant?.objectives.join('. ') ?? lesson.title

      const studentWork = submission.textContent ?? submission.title

      const gradingPrompt = buildSummativeGradingPrompt(
        projectDescription,
        rubric,
        studentWork,
        pathway as 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
      )

      const provider = getProvider()
      const aiText = await provider.chat({
        systemPrompt: gradingPrompt,
        messages: [],
        userMessage: 'Please grade this student project submission and return the JSON result.',
      })

      const parsed = parseGradingResponse(aiText)
      aiGrade = Math.round(parsed.overallScore)
      aiFeedback = parsed.feedback

      // Save AI grade to portfolio submission
      await prisma.portfolioSubmission.update({
        where: { id: submission.id },
        data: {
          status: 'graded',
          grade: aiGrade,
          feedback: JSON.stringify({
            aiFeedback: parsed.feedback,
            strengths: parsed.strengths,
            growthAreas: parsed.growthAreas,
            note: 'AI-graded. Teacher may review and adjust.',
          }),
        },
      })

      // Also record as a SUMMATIVE grade in the Grade table
      const aiResult: AIGradingResult = {
        score: aiGrade,
        feedback: parsed.feedback,
        strengths: parsed.strengths,
        growthAreas: parsed.growthAreas,
      }

      const gradeMetadata: GradeMetadata = {
        gradingMode: 'ai',
        subType: 'project',
        aiResult,
        attempt: 1,
      }

      // Find or create assessment
      let assessment = await prisma.assessment.findFirst({
        where: { studentId: user.id, lessonId, type: 'SUMMATIVE' },
        select: { id: true },
      })
      if (!assessment) {
        assessment = await prisma.assessment.create({
          data: {
            studentId: user.id,
            lessonId,
            type: 'SUMMATIVE',
            prompt: `Project: ${lesson.title}`,
            rubric: { subType: 'project' },
            response: studentWork,
            pathway,
          },
        })
      }

      await prisma.grade.create({
        data: {
          assessmentId: assessment.id,
          studentId: user.id,
          score: aiGrade,
          feedback: JSON.stringify(gradeMetadata),
          gradedBy: 'ai',
          attempt: 1,
        },
      })

      // Auto-mark lesson as complete
      await prisma.lessonProgress.upsert({
        where: { studentId_lessonId: { studentId: user.id, lessonId } },
        create: { studentId: user.id, lessonId, status: 'COMPLETED', completedAt: new Date() },
        update: { status: 'COMPLETED', completedAt: new Date() },
      }).catch(() => {})

      // Notify parent
      const student = await prisma.user.findUnique({
        where: { id: user.id },
        select: { parentId: true, name: true },
      })
      if (student?.parentId) {
        await prisma.notification.create({
          data: {
            userId: student.parentId,
            type: 'grade_posted',
            title: 'Project Graded',
            message: `${student.name} scored ${aiGrade}% on project: "${lesson.title}"`,
            data: { studentId: user.id, lessonId, score: aiGrade },
          },
        }).catch(() => {})
      }
    }
  } catch (err) {
    console.error('Project AI grading error:', err)
    // Non-fatal — project is still submitted even if AI grading fails
  }

  // Re-fetch updated submission
  const updated = await prisma.portfolioSubmission.findUnique({
    where: { id: submission.id },
  })

  return NextResponse.json({ submission: updated, aiGrade, aiFeedback })
}

// ─── DELETE: Remove a draft submission ───────────────────────────────────────

export async function DELETE(req: NextRequest) {
  const user = await getAuthUser()
  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const lessonId = searchParams.get('lessonId')
  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
  }

  const submission = await prisma.portfolioSubmission.findUnique({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
  })

  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (submission.status !== 'draft') {
    return NextResponse.json({ error: 'Can only delete draft submissions' }, { status: 400 })
  }

  // Clean up R2 file
  if (submission.fileUrl) {
    try { await deleteFile(keyFromUrl(submission.fileUrl)) } catch { /* ok */ }
  }

  await prisma.portfolioSubmission.delete({ where: { id: submission.id } })
  return NextResponse.json({ success: true })
}
