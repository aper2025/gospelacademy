import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import type { GradeMetadata } from '@/lib/types/assessment'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true, name: true },
  })
  return dbUser
}

// ─── GET — Fetch grade history for an assessment ──────────────────────────

export async function GET(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const assessmentId = searchParams.get('assessmentId')
    const studentId = searchParams.get('studentId') ?? dbUser.id

    // Students can only see their own grades
    if (dbUser.role === 'STUDENT' && studentId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parents can only see their own children's grades
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
    if (assessmentId) where.assessmentId = assessmentId

    const grades = await prisma.grade.findMany({
      where,
      orderBy: [{ gradedAt: 'desc' }],
      select: {
        id: true,
        assessmentId: true,
        score: true,
        feedback: true,
        gradedBy: true,
        attempt: true,
        gradedAt: true,
        assessment: {
          select: {
            type: true,
            lessonId: true,
            pathway: true,
            lesson: {
              select: {
                title: true,
                unit: {
                  select: {
                    id: true,
                    title: true,
                    unitNumber: true,
                    course: { select: { id: true, title: true, subject: true } },
                  },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ grades })
  } catch (error) {
    console.error('Grades GET error:', error)
    return NextResponse.json({ error: 'Failed to load grades.' }, { status: 500 })
  }
}

// ─── PUT — Manual grade override (admin/parent only) ──────────────────────

export async function PUT(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can override grades (academic integrity)
    if (dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only administrators can override grades.' }, { status: 403 })
    }

    const body = await request.json() as {
      gradeId?: string
      newScore?: number
      note?: string
    }

    const { gradeId, newScore, note } = body

    if (!gradeId || typeof gradeId !== 'string') {
      return NextResponse.json({ error: 'gradeId is required.' }, { status: 400 })
    }
    if (newScore === undefined || typeof newScore !== 'number' || newScore < 0 || newScore > 100) {
      return NextResponse.json({ error: 'newScore must be between 0 and 100.' }, { status: 400 })
    }

    // Fetch existing grade
    const existing = await prisma.grade.findUnique({
      where: { id: gradeId },
      select: {
        id: true,
        score: true,
        feedback: true,
        assessmentId: true,
        studentId: true,
        assessment: {
          select: {
            lesson: {
              select: { title: true },
            },
          },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Grade not found.' }, { status: 404 })
    }

    // Parse existing metadata to preserve AI grade
    let metadata: GradeMetadata
    try {
      metadata = JSON.parse(existing.feedback) as GradeMetadata
    } catch {
      metadata = {
        gradingMode: 'ai',
        subType: 'formative',
        attempt: 1,
      }
    }

    // Apply override
    metadata.originalAiScore = metadata.originalAiScore ?? existing.score
    metadata.overrideNote = note ?? ''
    metadata.overriddenBy = dbUser.id
    metadata.gradingMode = 'manual'

    const updated = await prisma.grade.update({
      where: { id: gradeId },
      data: {
        score: newScore,
        feedback: JSON.stringify(metadata),
        gradedBy: dbUser.id,
      },
    })

    // Notify student's parent about the override
    const student = await prisma.user.findUnique({
      where: { id: existing.studentId },
      select: { parentId: true, name: true },
    })
    if (student?.parentId && student.parentId !== dbUser.id) {
      await prisma.notification.create({
        data: {
          userId: student.parentId,
          type: 'grade_posted',
          title: 'Grade Updated',
          message: `${student.name}'s grade on "${existing.assessment.lesson.title}" was updated to ${Math.round(newScore)}%`,
          data: { studentId: existing.studentId, gradeId, score: newScore, overriddenBy: dbUser.name },
        },
      }).catch(err => console.error('Notification error:', err))
    }

    return NextResponse.json({
      gradeId: updated.id,
      score: updated.score,
      originalAiScore: metadata.originalAiScore,
    })
  } catch (error) {
    console.error('Grades PUT error:', error)
    return NextResponse.json({ error: 'Failed to update grade.' }, { status: 500 })
  }
}
