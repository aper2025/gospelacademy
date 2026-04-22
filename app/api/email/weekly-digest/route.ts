import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email/send'
import { weeklyDigestEmail } from '@/lib/email/templates'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  let sent = 0
  let skipped = 0
  const errors: string[] = []

  try {
    const parents = await prisma.user.findMany({
      where: { role: 'PARENT' },
      select: { id: true, email: true, name: true },
    })

    for (const parent of parents) {
      const students = await prisma.user.findMany({
        where: { parentId: parent.id, role: 'STUDENT' },
        select: { id: true, name: true },
      })

      if (students.length === 0) {
        skipped++
        continue
      }

      let parentHasActivity = false
      const studentDigests: Array<{
        studentName: string
        lessonsCompleted: number
        lessonsStarted: number
        courseProgress: Array<{ courseName: string; completedLessons: number; totalLessons: number }>
        recentGrades: Array<{ assessmentTitle: string; score: number; gradedAt: string }>
      }> = []

      for (const student of students) {
        // Lessons completed or started in the last 7 days
        const recentProgress = await prisma.lessonProgress.findMany({
          where: {
            studentId: student.id,
            updatedAt: { gte: sevenDaysAgo },
          },
          select: { status: true },
        })

        const lessonsCompleted = recentProgress.filter((p) => p.status === 'COMPLETED').length
        const lessonsStarted = recentProgress.filter((p) => p.status === 'STARTED').length

        // Recent grades
        const recentGrades = await prisma.grade.findMany({
          where: {
            studentId: student.id,
            gradedAt: { gte: sevenDaysAgo },
          },
          select: {
            score: true,
            gradedAt: true,
            assessment: { select: { prompt: true } },
          },
          orderBy: { gradedAt: 'desc' },
          take: 5,
        })

        // Course progress from enrollments
        const enrollments = await prisma.enrollment.findMany({
          where: {
            studentId: student.id,
            status: 'ACTIVE',
          },
          select: {
            course: {
              select: {
                title: true,
                units: {
                  select: {
                    lessons: { select: { id: true } },
                  },
                },
              },
            },
          },
        })

        const courseProgress = await Promise.all(
          enrollments.map(async (e) => {
            const totalLessons = e.course.units.reduce((sum, u) => sum + u.lessons.length, 0)
            const lessonIds = e.course.units.flatMap((u) => u.lessons.map((l) => l.id))

            const completedLessons = lessonIds.length > 0
              ? await prisma.lessonProgress.count({
                  where: {
                    studentId: student.id,
                    lessonId: { in: lessonIds },
                    status: 'COMPLETED',
                  },
                })
              : 0

            return {
              courseName: e.course.title,
              completedLessons,
              totalLessons,
            }
          })
        )

        if (lessonsCompleted > 0 || lessonsStarted > 0 || recentGrades.length > 0) {
          parentHasActivity = true
        }

        studentDigests.push({
          studentName: student.name,
          lessonsCompleted,
          lessonsStarted,
          courseProgress,
          recentGrades: recentGrades.map((g) => ({
            assessmentTitle: g.assessment.prompt.slice(0, 60) + (g.assessment.prompt.length > 60 ? '…' : ''),
            score: Math.round(g.score),
            gradedAt: g.gradedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          })),
        })
      }

      if (!parentHasActivity) {
        skipped++
        continue
      }

      const { subject, html } = weeklyDigestEmail({
        parentName: parent.name,
        students: studentDigests,
      })

      const success = await sendEmail({ to: parent.email, subject, html })
      if (success) {
        sent++
      } else {
        console.error(`[weekly-digest] Failed to send to ${parent.email}`)
        errors.push(parent.id) // Log ID only, not email (PII)
      }
    }

    return NextResponse.json({ sent, skipped, errorCount: errors.length })
  } catch (err) {
    console.error('[weekly-digest] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
