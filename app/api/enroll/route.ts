import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Pathway } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

// Static course metadata so we can upsert Course rows on demand
// (avoids needing a separate seed step before enrollment works)
const COURSE_META: Record<string, {
  title: string
  subject: string
  gradeLevelMin: number
  gradeLevelMax: number
}> = {
  'bible-6':   { title: 'Bible 6',   subject: 'Bible & Theology', gradeLevelMin: 6, gradeLevelMax: 6 },
  'bible-7':   { title: 'Bible 7',   subject: 'Bible & Theology', gradeLevelMin: 7, gradeLevelMax: 7 },
  'math-6':    { title: 'Math 6',    subject: 'Mathematics',      gradeLevelMin: 6, gradeLevelMax: 6 },
  'math-7':    { title: 'Math 7',    subject: 'Mathematics',      gradeLevelMin: 7, gradeLevelMax: 7 },
  'math-8':    { title: 'Math 8',    subject: 'Mathematics',      gradeLevelMin: 8, gradeLevelMax: 8 },
  'ela-6':     { title: 'ELA 6',     subject: 'Language Arts',    gradeLevelMin: 6, gradeLevelMax: 6 },
  'ela-7':     { title: 'ELA 7',     subject: 'Language Arts',    gradeLevelMin: 7, gradeLevelMax: 7 },
  'ela-8':     { title: 'ELA 8',     subject: 'Language Arts',    gradeLevelMin: 8, gradeLevelMax: 8 },
  'science-6': { title: 'Science 6', subject: 'Science',          gradeLevelMin: 6, gradeLevelMax: 6 },
  'science-7': { title: 'Science 7', subject: 'Science',          gradeLevelMin: 7, gradeLevelMax: 7 },
}

const VALID_PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rl = checkRateLimit(`enroll:${user.id}`, { limit: 10, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json() as { courseId?: string; pathway?: string }
    const { courseId, pathway } = body

    if (!courseId || typeof courseId !== 'string') {
      return NextResponse.json({ error: 'courseId is required.' }, { status: 400 })
    }

    if (!pathway || !VALID_PATHWAYS.includes(pathway as Pathway)) {
      return NextResponse.json(
        { error: 'pathway must be one of ADVANCED, STANDARD, VOCATIONAL.' },
        { status: 400 }
      )
    }

    const courseMeta = COURSE_META[courseId]

    // For courses not in the static map (e.g. HS courses seeded via DB),
    // verify the course exists in the database directly.
    if (!courseMeta) {
      const dbCourse = await prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true },
      })
      if (!dbCourse) {
        return NextResponse.json({ error: 'Course not found.' }, { status: 404 })
      }
    }

    // Look up existing user — must already exist with STUDENT role
    // (Students are created via parent onboarding, not auto-provisioned)
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true, parentId: true },
    })
    if (!dbUser) {
      return NextResponse.json({ error: 'User account not found. Please complete registration first.' }, { status: 404 })
    }
    if (dbUser.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can enroll in courses.' }, { status: 403 })
    }

    // Verify parent has an active subscription before allowing enrollment
    if (dbUser.parentId) {
      const parent = await prisma.user.findUnique({
        where: { id: dbUser.parentId },
        select: { subscription: true },
      })
      if (!parent?.subscription) {
        return NextResponse.json(
          { error: 'A subscription is required to enroll in courses. Please ask your parent to subscribe.', redirectTo: '/pricing' },
          { status: 402 }
        )
      }
    }

    // Upsert Course row for static courses; DB-seeded courses already exist
    if (courseMeta) {
      await prisma.course.upsert({
        where: { id: courseId },
        update: {},
        create: {
          id: courseId,
          ...courseMeta,
        },
      })
    }

    // Check for an existing active enrollment
    const existing = await prisma.enrollment.findFirst({
      where: { studentId: dbUser.id, courseId },
      select: { id: true },
    })

    if (existing) {
      return NextResponse.json({ alreadyEnrolled: true })
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: dbUser.id,
        courseId,
        pathway: pathway as Pathway,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error('Enroll API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
