import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { calculateWeightedAverage, toLetterGrade, extractSubType } from '@/lib/grades/calculator'
import type { GradeInput } from '@/lib/grades/calculator'

/**
 * GET /api/grades/course-snapshot?courseId=xxx
 *
 * Returns the authenticated student's current weighted course grade
 * as a lightweight { score, letter } object for inline display.
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
    if (!dbUser || dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const courseId = request.nextUrl.searchParams.get('courseId')
    if (!courseId) {
      return NextResponse.json({ error: 'courseId required' }, { status: 400 })
    }

    // Fetch all grades for this student in this course
    const grades = await prisma.grade.findMany({
      where: {
        studentId: dbUser.id,
        assessment: {
          lesson: { unit: { courseId } },
        },
      },
      select: {
        score: true,
        feedback: true,
        assessment: { select: { type: true } },
      },
    })

    if (grades.length === 0) {
      return NextResponse.json({ score: null, letter: null })
    }

    const inputs: GradeInput[] = grades.map(g => ({
      score: g.score,
      type: g.assessment.type,
      subType: extractSubType(g.feedback),
    }))

    const score = calculateWeightedAverage(inputs)
    const letter = toLetterGrade(score)

    return NextResponse.json({ score, letter })
  } catch (error) {
    console.error('Course snapshot error:', error)
    return NextResponse.json({ error: 'Failed to load grade' }, { status: 500 })
  }
}
