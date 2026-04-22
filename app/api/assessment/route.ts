import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Pathway } from '@prisma/client'
import { getProvider } from '@/lib/ai/provider'
import { checkRateLimit } from '@/lib/rate-limit'
import { isLessonContent } from '@/lib/types/curriculum'
import {
  buildFormativeGradingPrompt,
  buildSummativeGradingPrompt,
  parseGradingResponse,
} from '@/lib/ai/grading-prompt'
import type {
  AssessmentSubType,
  FormativeResponse,
  GradeMetadata,
  AIGradingResult,
} from '@/lib/types/assessment'

const VALID_PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']
const VALID_SUB_TYPES: AssessmentSubType[] = ['formative', 'summative', 'baseline', 'midpoint', 'quiz', 'project', 'final-exam']

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, parentId: true, role: true },
  })
  return dbUser
}

// ─── GET — Fetch grades for a student ─────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId') ?? dbUser.id
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')

    // Students can only view their own assessments
    if (dbUser.role === 'STUDENT' && studentId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parents can only view their own children's assessments
    if (dbUser.role === 'PARENT' && studentId !== dbUser.id) {
      const isChild = await prisma.user.findFirst({
        where: { id: studentId, parentId: dbUser.id },
        select: { id: true },
      })
      if (!isChild) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const where: Record<string, unknown> = { studentId }
    if (lessonId) {
      where.lessonId = lessonId
    }

    const assessments = await prisma.assessment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        lessonId: true,
        type: true,
        prompt: true,
        rubric: true,
        response: true,
        pathway: true,
        createdAt: true,
        lesson: {
          select: {
            title: true,
            weekNumber: true,
            unit: {
              select: {
                id: true,
                title: true,
                unitNumber: true,
                courseId: true,
                course: { select: { id: true, title: true, subject: true } },
              },
            },
          },
        },
        grades: {
          orderBy: { attempt: 'desc' },
          select: {
            id: true,
            score: true,
            feedback: true,
            gradedBy: true,
            attempt: true,
            gradedAt: true,
          },
        },
      },
    })

    // Filter by courseId if provided
    const filtered = courseId
      ? assessments.filter(a => a.lesson.unit.courseId === courseId)
      : assessments

    return NextResponse.json({ assessments: filtered })
  } catch (error) {
    console.error('Assessment GET error:', error)
    return NextResponse.json({ error: 'Failed to load assessments.' }, { status: 500 })
  }
}

// ─── POST — Submit assessment for grading ─────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can submit assessments.' }, { status: 403 })
    }

    // Rate limit: 10 assessment submissions per minute per user
    const rl = checkRateLimit(`assessment:${dbUser.id}`, { limit: 10, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many submissions. Please wait a moment.' }, { status: 429 })
    }

    const body = await request.json() as {
      lessonId?: string
      pathway?: string
      subType?: string
      responses?: FormativeResponse[] | string
    }

    const { lessonId, pathway, subType, responses } = body

    // Validate inputs
    if (!lessonId || typeof lessonId !== 'string') {
      return NextResponse.json({ error: 'lessonId is required.' }, { status: 400 })
    }
    if (!pathway || !VALID_PATHWAYS.includes(pathway as Pathway)) {
      return NextResponse.json({ error: 'Valid pathway required.' }, { status: 400 })
    }
    if (!subType || !VALID_SUB_TYPES.includes(subType as AssessmentSubType)) {
      return NextResponse.json({ error: 'Valid subType required.' }, { status: 400 })
    }
    if (!responses || (typeof responses !== 'string' && !Array.isArray(responses))) {
      return NextResponse.json({ error: 'Responses are required.' }, { status: 400 })
    }

    const typedPathway = pathway as Pathway
    const typedSubType = subType as AssessmentSubType

    // Fetch lesson
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, content: true, title: true },
    })
    if (!lesson || !isLessonContent(lesson.content)) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 })
    }

    const content = lesson.content
    const variant = content.pathways.find(p => p.pathway === typedPathway)
    if (!variant) {
      return NextResponse.json({ error: 'Pathway variant not found.' }, { status: 404 })
    }

    // Determine assessment type for Prisma
    const prismaType = typedSubType === 'summative' ? 'SUMMATIVE' : 'FORMATIVE'

    // Build grading prompt and grade via AI
    let gradingPrompt: string
    let responseText: string

    if (typedSubType === 'summative') {
      if (typeof responses !== 'string') {
        return NextResponse.json({ error: 'Summative assessment requires a string response.' }, { status: 400 })
      }
      // Find project block with rubric in output phase
      const projectBlock = variant.ipo.output.find(b => b.type === 'project')
      const rubric = projectBlock && 'rubric' in projectBlock && projectBlock.rubric
        ? projectBlock.rubric
        : [{ dimension: 'Overall Quality', maxPoints: 100, descriptors: { exemplary: 'Excellent work', proficient: 'Good work', developing: 'Needs improvement' } }]

      gradingPrompt = buildSummativeGradingPrompt(
        projectBlock && 'description' in projectBlock ? projectBlock.description : variant.objectives.join('. '),
        rubric,
        responses,
        typedPathway
      )
      responseText = responses
    } else {
      if (!Array.isArray(responses)) {
        return NextResponse.json({ error: 'Formative assessment requires an array of responses.' }, { status: 400 })
      }

      // Build questions from output phase graded blocks
      const gradedBlocks = [
        ...variant.ipo.output.filter(b => (b.type === 'discussion' && b.isGraded) || b.type === 'practice'),
        ...variant.ipo.processing.filter(b => (b.type === 'discussion' && b.isGraded) || b.type === 'practice'),
      ]

      const questions = gradedBlocks.map((block, i) => ({
        id: responses[i]?.questionId ?? `q-${i}`,
        prompt: 'prompt' in block ? block.prompt : ('question' in block ? block.question : ''),
        answerKey: 'answerKey' in block && block.answerKey ? block.answerKey : 'Evaluate based on understanding of the concept.',
        pointsPossible: 'answerKey' in block ? 20 : 10,
      }))

      if (questions.length === 0) {
        // Fallback: treat all responses as general comprehension
        responses.forEach((r, i) => {
          questions.push({
            id: r.questionId,
            prompt: `Question ${i + 1}`,
            answerKey: 'Evaluate based on understanding of the lesson content.',
            pointsPossible: 20,
          })
        })
      }

      gradingPrompt = buildFormativeGradingPrompt(questions, responses, typedSubType)
      responseText = JSON.stringify(responses)
    }

    // Call AI for grading
    const provider = getProvider()
    let aiText: string
    try {
      aiText = await provider.chat({
        systemPrompt: gradingPrompt,
        messages: [],
        userMessage: 'Please grade the student responses above and return the JSON result.',
      })
    } catch (err) {
      console.error('AI grading error:', err)
      return NextResponse.json(
        { error: 'AI grading is temporarily unavailable. Your response has been saved and will be graded shortly.' },
        { status: 503 }
      )
    }

    // Parse AI response
    let parsed: ReturnType<typeof parseGradingResponse>
    try {
      parsed = parseGradingResponse(aiText)
    } catch (err) {
      console.error('AI grading parse error:', err, 'Raw:', aiText)
      return NextResponse.json(
        { error: 'Failed to parse AI grading response. Please try again.' },
        { status: 500 }
      )
    }

    const overallScore = parsed.overallScore

    // Count existing attempts
    const existingAssessment = await prisma.assessment.findFirst({
      where: { studentId: dbUser.id, lessonId, type: prismaType },
      select: { id: true, grades: { select: { attempt: true }, orderBy: { attempt: 'desc' }, take: 1 } },
    })

    const attempt = existingAssessment?.grades[0]
      ? existingAssessment.grades[0].attempt + 1
      : 1

    const aiResult: AIGradingResult = {
      score: overallScore,
      feedback: parsed.feedback,
      strengths: parsed.strengths,
      growthAreas: parsed.growthAreas,
      ...('questionScores' in parsed ? { questionScores: parsed.questionScores } : {}),
    }

    const gradeMetadata: GradeMetadata = {
      gradingMode: 'ai',
      subType: typedSubType,
      aiResult,
      attempt,
    }

    // Create or reuse assessment, add new grade
    let assessmentId: string
    if (existingAssessment) {
      assessmentId = existingAssessment.id
      // Update response on existing assessment
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: { response: responseText },
      })
    } else {
      const newAssessment = await prisma.assessment.create({
        data: {
          studentId: dbUser.id,
          lessonId,
          type: prismaType,
          prompt: lesson.title,
          rubric: { subType: typedSubType },
          response: responseText,
          pathway: typedPathway,
        },
      })
      assessmentId = newAssessment.id
    }

    const grade = await prisma.grade.create({
      data: {
        assessmentId,
        studentId: dbUser.id,
        score: overallScore,
        feedback: JSON.stringify(gradeMetadata),
        gradedBy: 'ai',
        attempt,
      },
    })

    // Auto-mark lesson as complete after grading
    await prisma.lessonProgress.upsert({
      where: { studentId_lessonId: { studentId: dbUser.id, lessonId } },
      create: { studentId: dbUser.id, lessonId, status: 'COMPLETED', completedAt: new Date() },
      update: { status: 'COMPLETED', completedAt: new Date() },
    }).catch(err => console.error('Auto-complete progress error:', err))

    // Create notification for parent
    const student = await prisma.user.findUnique({
      where: { id: dbUser.id },
      select: { parentId: true, name: true },
    })
    if (student?.parentId) {
      await prisma.notification.create({
        data: {
          userId: student.parentId,
          type: 'grade_posted',
          title: 'New Grade Posted',
          message: `${student.name} scored ${Math.round(overallScore)}% on "${lesson.title}"`,
          data: { studentId: dbUser.id, lessonId, gradeId: grade.id, score: overallScore },
        },
      }).catch(err => console.error('Notification create error:', err))
    }

    return NextResponse.json({
      gradeId: grade.id,
      assessmentId,
      score: overallScore,
      feedback: parsed.feedback,
      strengths: parsed.strengths,
      growthAreas: parsed.growthAreas,
      ...('questionScores' in parsed ? { questionScores: parsed.questionScores } : {}),
      attempt,
    })
  } catch (error) {
    console.error('Assessment POST error:', error)
    return NextResponse.json({ error: 'Failed to submit assessment.' }, { status: 500 })
  }
}
