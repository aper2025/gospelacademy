import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

/**
 * GET /api/courses
 * Returns all courses from the DB plus the current user's enrolled course IDs.
 * Unauthenticated requests still get the full course list with an empty enrolledCourseIds array.
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limit: 60 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const rl = checkRateLimit(`courses:${ip}`, { limit: 60, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }
    const [courses, supabase] = await Promise.all([
      prisma.course.findMany({
        select: {
          id: true,
          title: true,
          subject: true,
          gradeLevelMin: true,
          gradeLevelMax: true,
        },
        orderBy: [{ gradeLevelMin: 'asc' }, { subject: 'asc' }],
      }),
      createClient(),
    ])

    const { data: { user } } = await supabase.auth.getUser()

    let enrolledCourseIds: string[] = []
    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: {
          enrollments: {
            where: { status: 'ACTIVE' },
            select: { courseId: true },
          },
        },
      })
      enrolledCourseIds = dbUser?.enrollments.map((e) => e.courseId) ?? []
    }

    return NextResponse.json({ courses, enrolledCourseIds })
  } catch (error) {
    console.error('Courses API error:', error)
    return NextResponse.json(
      { error: 'Failed to load enrollment data.' },
      { status: 500 }
    )
  }
}
