import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'
import { isLessonContent } from '@/lib/types/curriculum'
import type { MultipleChoiceQuestion } from '@/lib/types/curriculum'
import type { GradeMetadata, AIGradingResult } from '@/lib/types/assessment'

const EXAM_QUESTION_COUNT = 20

/**
 * GET /api/final-exam?courseId=xxx
 * Generates a final exam by sampling quiz questions from each unit.
 * Returns the exam if student has completed all lessons.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true },
    })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const courseId = new URL(request.url).searchParams.get('courseId')
    if (!courseId) return NextResponse.json({ error: 'courseId required' }, { status: 400 })

    // Verify enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId: dbUser.id, courseId, status: { in: ['ACTIVE', 'COMPLETED'] } },
    })
    if (!enrollment) return NextResponse.json({ error: 'Not enrolled' }, { status: 403 })

    // Check all lessons are completed
    const totalLessons = await prisma.lesson.count({
      where: { unit: { courseId } },
    })
    const completedLessons = await prisma.lessonProgress.count({
      where: { studentId: dbUser.id, status: 'COMPLETED', lesson: { unit: { courseId } } },
    })

    if (completedLessons < totalLessons) {
      return NextResponse.json({
        error: 'Complete all lessons before taking the final exam.',
        completedLessons,
        totalLessons,
      }, { status: 400 })
    }

    // Check if already graded
    const existingGrade = await prisma.assessment.findFirst({
      where: {
        studentId: dbUser.id,
        type: 'SUMMATIVE',
        rubric: { path: ['subType'], equals: 'final-exam' },
        lesson: { unit: { courseId } },
      },
      select: {
        id: true,
        grades: { orderBy: { attempt: 'desc' }, take: 1, select: { score: true } },
      },
    })

    // Gather quiz questions from all lessons in the course
    const lessons = await prisma.lesson.findMany({
      where: { unit: { courseId } },
      select: { id: true, content: true, unit: { select: { unitNumber: true } } },
      orderBy: [{ unit: { unitNumber: 'asc' } }, { weekNumber: 'asc' }],
    })

    const questionPool: (MultipleChoiceQuestion & { unitNumber: number; lessonId: string })[] = []
    for (const lesson of lessons) {
      if (!isLessonContent(lesson.content)) continue
      const quiz = lesson.content.quiz
      if (!quiz?.length) continue
      for (const q of quiz) {
        questionPool.push({ ...q, unitNumber: lesson.unit.unitNumber, lessonId: lesson.id })
      }
    }

    if (questionPool.length < EXAM_QUESTION_COUNT) {
      return NextResponse.json({ error: 'Not enough quiz content for a final exam.' }, { status: 500 })
    }

    // Sample evenly across units
    const unitNumbers = [...new Set(questionPool.map(q => q.unitNumber))].sort((a, b) => a - b)
    const questionsPerUnit = Math.max(1, Math.floor(EXAM_QUESTION_COUNT / unitNumbers.length))
    const selected: typeof questionPool = []

    for (const unitNum of unitNumbers) {
      const unitQuestions = questionPool.filter(q => q.unitNumber === unitNum)
      // Seeded shuffle using courseId + unitNumber for consistency
      const seed = hashString(`${courseId}-${unitNum}-${dbUser.id}`)
      const shuffled = seededShuffle(unitQuestions, seed)
      selected.push(...shuffled.slice(0, questionsPerUnit))
    }

    // Fill remaining slots if needed
    if (selected.length < EXAM_QUESTION_COUNT) {
      const remaining = questionPool.filter(q => !selected.includes(q))
      const seed = hashString(`${courseId}-fill-${dbUser.id}`)
      const shuffled = seededShuffle(remaining, seed)
      selected.push(...shuffled.slice(0, EXAM_QUESTION_COUNT - selected.length))
    }

    // Trim to exact count
    const examQuestions = selected.slice(0, EXAM_QUESTION_COUNT)

    // Get course title
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { title: true },
    })

    return NextResponse.json({
      courseId,
      courseTitle: course?.title ?? 'Course',
      questions: examQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        // Do NOT send correctAnswer or explanation to client
        unitNumber: q.unitNumber,
        lessonId: q.lessonId,
      })),
      totalQuestions: examQuestions.length,
      previousScore: existingGrade?.grades[0]?.score ?? null,
    })
  } catch (error) {
    console.error('Final exam GET error:', error)
    return NextResponse.json({ error: 'Failed to generate exam.' }, { status: 500 })
  }
}

/**
 * POST /api/final-exam
 * Submit final exam answers for grading.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true, parentId: true, name: true },
    })
    if (!dbUser || dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can submit exams.' }, { status: 403 })
    }

    const rl = checkRateLimit(`final-exam:${dbUser.id}`, { limit: 5, windowSeconds: 300 })
    if (!rl.success) return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 })

    const body = await request.json() as {
      courseId?: string
      answers?: Record<string, number> // questionId → selectedOptionIndex
    }

    const { courseId, answers } = body
    if (!courseId || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'courseId and answers required.' }, { status: 400 })
    }

    // Load all quiz questions from course to grade against
    const lessons = await prisma.lesson.findMany({
      where: { unit: { courseId } },
      select: { id: true, content: true, unit: { select: { unitNumber: true } } },
    })

    // Build answer key
    const answerKey: Record<string, { correctAnswer: number; explanation: string }> = {}
    for (const lesson of lessons) {
      if (!isLessonContent(lesson.content)) continue
      const quiz = lesson.content.quiz
      if (!quiz?.length) continue
      for (const q of quiz) {
        answerKey[q.id] = { correctAnswer: q.correctAnswer, explanation: q.explanation }
      }
    }

    // Grade
    let correct = 0
    let total = 0
    for (const [qId, selected] of Object.entries(answers)) {
      total++
      if (answerKey[qId] && answerKey[qId].correctAnswer === selected) {
        correct++
      }
    }

    const score = total > 0 ? Math.round((correct / total) * 100) : 0

    // Find a lesson in this course to attach the assessment to (use first lesson)
    const firstLesson = await prisma.lesson.findFirst({
      where: { unit: { courseId } },
      orderBy: [{ unit: { unitNumber: 'asc' } }, { weekNumber: 'asc' }],
      select: { id: true },
    })

    if (!firstLesson) {
      return NextResponse.json({ error: 'Course has no lessons.' }, { status: 500 })
    }

    // Get course title
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { title: true },
    })

    // Create or update assessment
    let assessment = await prisma.assessment.findFirst({
      where: {
        studentId: dbUser.id,
        type: 'SUMMATIVE',
        rubric: { path: ['subType'], equals: 'final-exam' },
        lesson: { unit: { courseId } },
      },
      select: { id: true, grades: { select: { attempt: true }, orderBy: { attempt: 'desc' }, take: 1 } },
    })

    const attemptNum = assessment?.grades[0] ? assessment.grades[0].attempt + 1 : 1

    if (!assessment) {
      const created = await prisma.assessment.create({
        data: {
          studentId: dbUser.id,
          lessonId: firstLesson.id,
          type: 'SUMMATIVE',
          prompt: `Final Exam: ${course?.title ?? 'Course'}`,
          rubric: { subType: 'final-exam' },
          response: JSON.stringify(answers),
          pathway: 'STANDARD',
        },
      })
      assessment = { id: created.id, grades: [] }
    } else {
      await prisma.assessment.update({
        where: { id: assessment.id },
        data: { response: JSON.stringify(answers) },
      })
    }

    const aiResult: AIGradingResult = {
      score,
      feedback: `Final Exam: ${correct}/${total} correct (${score}%)`,
      strengths: correct >= total * 0.8 ? ['Strong mastery of course material'] : [],
      growthAreas: correct < total * 0.7 ? ['Review units where questions were missed'] : [],
    }

    const gradeMetadata: GradeMetadata = {
      gradingMode: 'ai',
      subType: 'final-exam',
      aiResult,
      attempt: attemptNum,
    }

    await prisma.grade.create({
      data: {
        assessmentId: assessment.id,
        studentId: dbUser.id,
        score,
        feedback: JSON.stringify(gradeMetadata),
        gradedBy: 'exam-auto',
        attempt: attemptNum,
      },
    })

    // Notify parent
    if (dbUser.parentId) {
      await prisma.notification.create({
        data: {
          userId: dbUser.parentId,
          type: 'grade_posted',
          title: 'Final Exam Completed',
          message: `${dbUser.name} scored ${score}% on the ${course?.title ?? 'course'} final exam`,
          data: { studentId: dbUser.id, courseId, score },
        },
      }).catch(() => {})
    }

    return NextResponse.json({
      score,
      correct,
      total,
      attempt: attemptNum,
      passed: score >= 60,
    })
  } catch (error) {
    console.error('Final exam POST error:', error)
    return NextResponse.json({ error: 'Failed to grade exam.' }, { status: 500 })
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0x7fffffff
  }
  return hash
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr]
  let s = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
