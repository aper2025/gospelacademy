import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { type Pathway } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const VALID_GRADES = [6, 7, 8, 9]
const VALID_PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json() as {
      firstName?: string
      lastName?: string
      gradeLevel?: number
      pathway?: string
      schedulingOption?: string
      dateOfBirth?: string
    }

    const { firstName, lastName, gradeLevel, pathway, schedulingOption, dateOfBirth } = body

    // Validate required fields
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required.' }, { status: 400 })
    }
    if (!lastName?.trim()) {
      return NextResponse.json({ error: 'Last name is required.' }, { status: 400 })
    }
    if (!gradeLevel || !VALID_GRADES.includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade level must be 6, 7, 8, or 9.' }, { status: 400 })
    }
    if (!pathway || !VALID_PATHWAYS.includes(pathway as Pathway)) {
      return NextResponse.json({ error: 'Invalid pathway.' }, { status: 400 })
    }
    if (!schedulingOption || !['12-Month Mastery', '10-Month Classic'].includes(schedulingOption)) {
      return NextResponse.json({ error: 'Invalid scheduling option.' }, { status: 400 })
    }

    // Resolve the parent's Prisma User record
    const dbParent = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true, subscription: { select: { plan: true } } },
    })

    if (!dbParent) {
      return NextResponse.json({ error: 'Parent account not found.' }, { status: 404 })
    }

    // Only parents can add students
    if (dbParent.role !== 'PARENT') {
      return NextResponse.json({ error: 'Only parent accounts can add students.' }, { status: 403 })
    }

    // Require an active subscription before adding any student
    if (!dbParent.subscription) {
      return NextResponse.json(
        { error: 'A subscription is required to add students.', redirectTo: '/pricing' },
        { status: 402 }
      )
    }

    // Enforce per-plan student limits
    const studentCount = await prisma.user.count({
      where: { parentId: dbParent.id, role: 'STUDENT' },
    })

    const planLimits: Record<string, number> = { SINGLE: 1, FAMILY: 3, SCHOOL: 10 }
    const limit = planLimits[dbParent.subscription.plan] ?? 1

    if (studentCount >= limit) {
      return NextResponse.json(
        {
          error: `Your ${dbParent.subscription.plan.charAt(0) + dbParent.subscription.plan.slice(1).toLowerCase()} plan supports up to ${limit} student${limit > 1 ? 's' : ''}. Upgrade to add more.`,
          redirectTo: '/pricing',
        },
        { status: 403 }
      )
    }

    // Build a synthetic email for the student (not used for auth, just satisfies the unique constraint)
    // Uses random ID to avoid leaking student names in the email field
    const randomId = crypto.randomUUID()
    const studentEmail = `student.${randomId}@family.gospelacademy.internal`

    const student = await prisma.user.create({
      data: {
        email: studentEmail,
        name: `${firstName.trim()} ${lastName.trim()}`,
        role: 'STUDENT',
        parentId: dbParent.id,
        pathway: pathway as Pathway,
        gradeLevel: Number(gradeLevel),
        schedulingOption,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
      select: { id: true, name: true },
    })

    return NextResponse.json({ success: true, studentId: student.id, name: student.name })
  } catch (error) {
    console.error('Add student error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
