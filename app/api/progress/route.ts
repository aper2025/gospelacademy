import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { ProgressStatus } from '@prisma/client'
import { sendEmail } from '@/lib/email/send'
import { courseCompletionEmail } from '@/lib/email/templates'
import { calculateWeightedAverage, toLetterGrade } from '@/lib/grades/calculator'
import { checkRateLimit } from '@/lib/rate-limit'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  return dbUser
}

// ─── GET — Fetch progress for a student, optionally filtered by courseId ────

export async function GET(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    const where: Record<string, unknown> = { studentId: dbUser.id }
    if (courseId) {
      where.lesson = { unit: { courseId } }
    }

    const progress = await prisma.lessonProgress.findMany({
      where,
      select: {
        lessonId: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
    })

    return NextResponse.json({ progress })
  } catch (err) {
    console.error('[progress/GET]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ─── POST — Upsert lesson progress ─────────────────────────────────────────

const VALID_STATUSES: ProgressStatus[] = ['STARTED', 'COMPLETED']

export async function POST(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can update progress.' }, { status: 403 })
    }

    const body = await request.json() as { lessonId?: string; status?: string }
    const { lessonId, status } = body

    if (!lessonId || !status || !VALID_STATUSES.includes(status as ProgressStatus)) {
      return NextResponse.json({ error: 'Invalid input. Requires lessonId and status (STARTED | COMPLETED).' }, { status: 400 })
    }

    // Rate limit: 60 progress updates per minute per user
    const rl = checkRateLimit(`progress:${dbUser.id}`, { limit: 60, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Don't downgrade COMPLETED to STARTED
    if (status === 'STARTED') {
      const existing = await prisma.lessonProgress.findUnique({
        where: { studentId_lessonId: { studentId: dbUser.id, lessonId } },
        select: { status: true },
      })
      if (existing?.status === 'COMPLETED') {
        return NextResponse.json({ progress: existing })
      }
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { studentId_lessonId: { studentId: dbUser.id, lessonId } },
      create: {
        studentId: dbUser.id,
        lessonId,
        status: status as ProgressStatus,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
      update: {
        status: status as ProgressStatus,
        ...(status === 'COMPLETED' ? { completedAt: new Date() } : {}),
      },
    })

    // ── Course completion detection ──────────────────────────────────
    if (status === 'COMPLETED') {
      // Find which course this lesson belongs to
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { unit: { select: { courseId: true } } },
      })

      if (lesson?.unit?.courseId) {
        const courseId = lesson.unit.courseId

        // Count total lessons in this course
        const totalLessons = await prisma.lesson.count({
          where: { unit: { courseId } },
        })

        // Count completed lessons for this student in this course
        const completedLessons = await prisma.lessonProgress.count({
          where: {
            studentId: dbUser.id,
            status: 'COMPLETED',
            lesson: { unit: { courseId } },
          },
        })

        if (completedLessons >= totalLessons) {
          // Check if enrollment is already COMPLETED to avoid duplicate notifications
          const enrollment = await prisma.enrollment.findFirst({
            where: { studentId: dbUser.id, courseId, status: 'ACTIVE' },
            select: { id: true },
          })

          if (enrollment) {
            // Mark enrollment as COMPLETED (idempotent)
            await prisma.enrollment.updateMany({
              where: { studentId: dbUser.id, courseId },
              data: { status: 'COMPLETED' },
            })

            // Notify parent
            const student = await prisma.user.findUnique({
              where: { id: dbUser.id },
              select: { parentId: true, name: true },
            })

            const course = await prisma.course.findUnique({
              where: { id: courseId },
              select: { title: true },
            })

            if (student?.parentId && course) {
              await prisma.notification.create({
                data: {
                  userId: student.parentId,
                  type: 'course_completed',
                  title: 'Course Completed!',
                  message: `${student.name} has completed "${course.title}"! A certificate is now available for download.`,
                  data: { studentId: dbUser.id, courseId },
                },
              }).catch(err => console.error('Notification create error:', err))

              // Send course completion email to parent
              const parent = await prisma.user.findUnique({
                where: { id: student.parentId },
                select: { email: true, name: true },
              })
              if (parent && !parent.email.endsWith('.internal')) {
                const grades = await prisma.grade.findMany({
                  where: { studentId: dbUser.id, assessment: { lesson: { unit: { courseId } } } },
                  select: { score: true, assessment: { select: { type: true } } },
                })
                const inputs = grades.map(g => ({
                  score: g.score,
                  type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE',
                }))
                const score = calculateWeightedAverage(inputs)
                const email = courseCompletionEmail({
                  parentName: parent.name,
                  studentName: student.name,
                  courseName: course.title,
                  letterGrade: toLetterGrade(score),
                  score,
                })
                sendEmail({ to: parent.email, ...email })
                  .catch(err => console.error('[progress] Completion email error:', err))
              }
            }

            return NextResponse.json({ progress, courseCompleted: true, courseId })
          }
        }
      }
    }

    return NextResponse.json({ progress })
  } catch (err) {
    console.error('[progress/POST]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ─── DELETE — Remove progress (for markIncomplete) ──────────────────────────

export async function DELETE(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can modify progress.' }, { status: 403 })
    }

    const body = await request.json() as { lessonId?: string }
    const { lessonId } = body

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
    }

    await prisma.lessonProgress.deleteMany({
      where: { studentId: dbUser.id, lessonId },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[progress/DELETE]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
