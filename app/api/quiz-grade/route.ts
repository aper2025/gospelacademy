import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'
import type { GradeMetadata } from '@/lib/types/assessment'

/**
 * POST /api/quiz-grade
 * Records a quiz score in the Grade table so it counts toward course grade.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true, parentId: true, name: true },
    })
    if (!dbUser || dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can submit quiz grades.' }, { status: 403 })
    }

    const rl = checkRateLimit(`quiz-grade:${dbUser.id}`, { limit: 10, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many submissions.' }, { status: 429 })
    }

    const body = await request.json() as {
      lessonId?: string
      score?: number
      correctCount?: number
      totalQuestions?: number
      attempt?: number
    }

    const { lessonId, score, correctCount, totalQuestions, attempt } = body

    if (!lessonId || typeof score !== 'number' || score < 0 || score > 100) {
      return NextResponse.json({ error: 'Valid lessonId and score (0-100) required.' }, { status: 400 })
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, title: true },
    })
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 })
    }

    // Find or create assessment record for this quiz
    let assessment = await prisma.assessment.findFirst({
      where: { studentId: dbUser.id, lessonId, type: 'FORMATIVE' },
      select: { id: true, grades: { select: { attempt: true }, orderBy: { attempt: 'desc' }, take: 1 } },
    })

    // Only record the grade if it's higher than the previous attempt (best score wins)
    if (assessment?.grades[0]) {
      const prevGrade = await prisma.grade.findFirst({
        where: { assessmentId: assessment.id },
        orderBy: { score: 'desc' },
        select: { score: true },
      })
      if (prevGrade && prevGrade.score >= score) {
        // Previous score is better or equal — no need to record
        return NextResponse.json({ recorded: false, reason: 'Previous score was higher.' })
      }
    }

    const gradeMetadata: GradeMetadata = {
      gradingMode: 'ai',
      subType: 'quiz',
      aiResult: {
        score,
        feedback: `Quiz score: ${correctCount ?? '?'}/${totalQuestions ?? '?'} correct (${Math.round(score)}%)`,
        strengths: [],
        growthAreas: [],
      },
      attempt: attempt ?? 1,
    }

    if (!assessment) {
      const newAssessment = await prisma.assessment.create({
        data: {
          studentId: dbUser.id,
          lessonId,
          type: 'FORMATIVE',
          prompt: `Quiz: ${lesson.title}`,
          rubric: { subType: 'quiz' },
          response: JSON.stringify({ score, correctCount, totalQuestions }),
          pathway: 'STANDARD', // Quiz is same for all pathways
        },
      })
      assessment = { id: newAssessment.id, grades: [] }
    }

    const attemptNum = assessment.grades[0] ? assessment.grades[0].attempt + 1 : 1
    gradeMetadata.attempt = attemptNum

    await prisma.grade.create({
      data: {
        assessmentId: assessment.id,
        studentId: dbUser.id,
        score: Math.round(score),
        feedback: JSON.stringify(gradeMetadata),
        gradedBy: 'quiz-auto',
        attempt: attemptNum,
      },
    })

    // Notify parent
    if (dbUser.parentId) {
      await prisma.notification.create({
        data: {
          userId: dbUser.parentId,
          type: 'grade_posted',
          title: 'Quiz Grade Recorded',
          message: `${dbUser.name} scored ${Math.round(score)}% on quiz: "${lesson.title}"`,
          data: { studentId: dbUser.id, lessonId, score },
        },
      }).catch(() => {})
    }

    return NextResponse.json({ recorded: true, score: Math.round(score) })
  } catch (error) {
    console.error('Quiz grade error:', error)
    return NextResponse.json({ error: 'Failed to record quiz grade.' }, { status: 500 })
  }
}
