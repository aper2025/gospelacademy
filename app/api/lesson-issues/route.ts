import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

const VALID_CATEGORIES = ['content_error', 'typo', 'broken_link', 'suggestion', 'other'] as const

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

// ─── POST — Submit an issue report ──────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rl = checkRateLimit(`lesson-issue:${dbUser.id}`, { limit: 5, windowSeconds: 3600 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many reports. Please try again later.' }, { status: 429 })
    }

    const body = await request.json() as {
      lessonId?: string
      category?: string
      description?: string
    }

    const { lessonId, category, description } = body

    if (!lessonId || typeof lessonId !== 'string') {
      return NextResponse.json({ error: 'Lesson ID required.' }, { status: 400 })
    }
    if (!category || !VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
      return NextResponse.json({ error: 'Valid category required.' }, { status: 400 })
    }
    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters.' }, { status: 400 })
    }
    if (description.length > 2000) {
      return NextResponse.json({ error: 'Description must be under 2000 characters.' }, { status: 400 })
    }

    // Verify lesson exists and user has access (enrolled in the course)
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, unit: { select: { courseId: true } } },
    })
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 })
    }

    // Students/parents must be enrolled in the course to report issues
    if (dbUser.role !== 'ADMIN') {
      const reporterId = dbUser.role === 'PARENT'
        ? (await prisma.user.findFirst({ where: { parentId: dbUser.id }, select: { id: true } }))?.id
        : dbUser.id
      if (reporterId) {
        const enrollment = await prisma.enrollment.findFirst({
          where: { studentId: reporterId, courseId: lesson.unit.courseId, status: 'ACTIVE' },
          select: { id: true },
        })
        if (!enrollment) {
          return NextResponse.json({ error: 'You must be enrolled in this course to report issues.' }, { status: 403 })
        }
      }
    }

    const issue = await prisma.lessonIssue.create({
      data: {
        lessonId,
        userId: dbUser.id,
        category,
        description: description.trim(),
      },
    })

    return NextResponse.json({ success: true, id: issue.id })
  } catch (err) {
    console.error('[lesson-issues/POST]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ─── GET — List issues (admin only) ─────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser || dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const lessonId = searchParams.get('lessonId')

    const where: Record<string, unknown> = {}
    if (status && ['OPEN', 'REVIEWED', 'RESOLVED', 'DISMISSED'].includes(status)) {
      where.status = status
    }
    if (lessonId) {
      where.lessonId = lessonId
    }

    const issues = await prisma.lessonIssue.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: {
        user: { select: { name: true, email: true, role: true } },
        lesson: {
          select: {
            title: true,
            unit: { select: { unitNumber: true, course: { select: { title: true, id: true } } } },
          },
        },
      },
    })

    return NextResponse.json({ issues })
  } catch (err) {
    console.error('[lesson-issues/GET]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
