import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { type Pathway } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email/send'
import { welcomeEmail } from '@/lib/email/templates'
import { checkRateLimit } from '@/lib/rate-limit'

const VALID_PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in again.' }, { status: 401 })
    }

    const rl = checkRateLimit(`onboarding:${user.id}`, { limit: 5, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json() as {
      firstName?: string
      lastName?: string
      gradeLevel?: number
      pathway?: string
      schedulingOption?: string
      courseId?: string
    }

    const { firstName, lastName, gradeLevel, pathway, schedulingOption, courseId } = body

    // Validate
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required.' }, { status: 400 })
    }
    if (!lastName?.trim()) {
      return NextResponse.json({ error: 'Last name is required.' }, { status: 400 })
    }
    if (gradeLevel === undefined || gradeLevel === null || gradeLevel < 0 || gradeLevel > 12) {
      return NextResponse.json({ error: 'Please select a valid grade level.' }, { status: 400 })
    }
    if (!pathway || !VALID_PATHWAYS.includes(pathway as Pathway)) {
      return NextResponse.json({ error: 'Invalid pathway.' }, { status: 400 })
    }
    if (!schedulingOption || !['12-Month Mastery', '10-Month Classic'].includes(schedulingOption)) {
      return NextResponse.json({ error: 'Invalid scheduling option.' }, { status: 400 })
    }

    // Validate course exists in DB and matches grade level
    if (!courseId) {
      return NextResponse.json({ error: 'Please select a course.' }, { status: 400 })
    }
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, subject: true, gradeLevelMin: true, gradeLevelMax: true },
    })
    if (!course) {
      return NextResponse.json({ error: 'Invalid course selection.' }, { status: 400 })
    }
    if (gradeLevel < course.gradeLevelMin || gradeLevel > course.gradeLevelMax) {
      return NextResponse.json({ error: 'Course does not match the selected grade level.' }, { status: 400 })
    }

    // 1. Upsert parent user: set role = PARENT, isBeta = true
    const parentUser = await prisma.user.upsert({
      where: { email: user.email! },
      update: { role: 'PARENT', isBeta: true },
      create: {
        email: user.email!,
        name: (user.user_metadata?.full_name as string | undefined) ?? user.email!.split('@')[0],
        role: 'PARENT',
        isBeta: true,
      },
      select: { id: true, name: true },
    })

    // 2. Create student user (idempotency: check if student already exists under this parent)
    const existingStudent = await prisma.user.findFirst({
      where: {
        parentId: parentUser.id,
        name: `${firstName.trim()} ${lastName.trim()}`,
        role: 'STUDENT',
      },
      select: { id: true },
    })
    if (existingStudent) {
      return NextResponse.json({ success: true, studentId: existingStudent.id, alreadyExists: true })
    }

    const slug = `${firstName.toLowerCase().trim()}.${lastName.toLowerCase().trim()}.${Date.now()}`
    const studentEmail = `student.${slug}@family.gospelacademy.internal`

    const student = await prisma.user.create({
      data: {
        email: studentEmail,
        name: `${firstName.trim()} ${lastName.trim()}`,
        role: 'STUDENT',
        parentId: parentUser.id,
        pathway: pathway as Pathway,
        gradeLevel: Number(gradeLevel),
        schedulingOption,
      },
      select: { id: true },
    })

    // 3. Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId: course.id,
        pathway: pathway as Pathway,
        status: 'ACTIVE',
      },
      select: { id: true },
    })

    // 4. Create welcome notification for the parent
    await prisma.notification.create({
      data: {
        userId: parentUser.id,
        type: 'welcome',
        title: 'Welcome to The Gospel Academy!',
        message: `Your student ${firstName} ${lastName} has been enrolled in ${course.title}. Head to the dashboard to get started.`,
        data: { studentId: student.id, courseId: course.id, enrollmentId: enrollment.id },
      },
    })

    // 5. Send welcome email to parent (non-blocking)
    const email = welcomeEmail({
      parentName: parentUser.name,
      studentName: `${firstName.trim()} ${lastName.trim()}`,
      courseName: course.title,
      pathway: pathway as string,
    })
    sendEmail({ to: user.email!, ...email })
      .catch(err => console.error('[onboarding] Welcome email error:', err))

    return NextResponse.json({
      success: true,
      studentId: student.id,
      enrollmentId: enrollment.id,
    })
  } catch (error) {
    console.error('Onboarding complete error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
