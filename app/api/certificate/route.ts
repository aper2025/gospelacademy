import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { CertificateDocument, type CertificateData } from '@/lib/certificate/template'
import { calculateWeightedAverage, toLetterGrade } from '@/lib/grades/calculator'
import { checkRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Authenticate
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, role: true, name: true },
    })
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Rate limit: 10 certificate downloads per minute per user
    const rl = checkRateLimit(`cert:${dbUser.id}`, { limit: 10, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const studentIdParam = searchParams.get('studentId')

    if (!courseId) {
      return NextResponse.json({ error: 'courseId required' }, { status: 400 })
    }

    // Determine which student's certificate to generate
    let studentId = dbUser.id
    let studentName = dbUser.name

    // Parents can view their child's certificate
    if (studentIdParam && dbUser.role === 'PARENT') {
      const child = await prisma.user.findFirst({
        where: { id: studentIdParam, parentId: dbUser.id },
        select: { id: true, name: true },
      })
      if (!child) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 })
      }
      studentId = child.id
      studentName = child.name
    }

    // Verify enrollment is COMPLETED
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId, courseId, status: 'COMPLETED' },
      select: { id: true },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Course not completed' }, { status: 400 })
    }

    // Fetch course info with units
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        title: true,
        subject: true,
        units: {
          orderBy: { unitNumber: 'asc' },
          select: {
            id: true,
            unitNumber: true,
            title: true,
            lessons: { select: { id: true } },
          },
        },
      },
    })
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Fetch all grades for this student in this course
    const grades = await prisma.grade.findMany({
      where: {
        studentId,
        assessment: { lesson: { unit: { courseId } } },
      },
      select: {
        score: true,
        assessment: {
          select: {
            type: true,
            lesson: { select: { unitId: true } },
          },
        },
      },
    })

    // Calculate per-unit grades
    const unitGradeMap = new Map<string, { scores: { score: number; type: 'FORMATIVE' | 'SUMMATIVE' }[] }>()
    for (const g of grades) {
      const unitId = g.assessment.lesson.unitId
      if (!unitGradeMap.has(unitId)) {
        unitGradeMap.set(unitId, { scores: [] })
      }
      unitGradeMap.get(unitId)!.scores.push({
        score: g.score,
        type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE',
      })
    }

    const unitSummaries = course.units.map(unit => {
      const unitGrades = unitGradeMap.get(unit.id)
      const avg = unitGrades ? calculateWeightedAverage(unitGrades.scores) : 0
      return {
        unitNumber: unit.unitNumber,
        title: unit.title,
        letterGrade: toLetterGrade(avg),
        score: avg,
      }
    })

    // Overall grade
    const allInputs = grades.map(g => ({
      score: g.score,
      type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE',
    }))
    const overallScore = calculateWeightedAverage(allInputs)

    // Get completion date from latest lesson progress
    const latestProgress = await prisma.lessonProgress.findFirst({
      where: {
        studentId,
        status: 'COMPLETED',
        lesson: { unit: { courseId } },
      },
      orderBy: { completedAt: 'desc' },
      select: { completedAt: true },
    })

    const completionDate = latestProgress?.completedAt
      ? new Date(latestProgress.completedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })

    // Check SAT/ACT Challenge badge eligibility
    // Student must have attempted 80%+ of extension questions in this course
    let satActChallengeBadge = false
    const allLessons = await prisma.lesson.findMany({
      where: { unit: { courseId } },
      select: { id: true, content: true },
    })
    const lessonsWithExtension = allLessons.filter(l => {
      const content = l.content as Record<string, unknown>
      return content && content.advancedExtension
    })
    if (lessonsWithExtension.length > 0) {
      const attempts = await prisma.extensionAttempt.count({
        where: {
          studentId,
          lessonId: { in: lessonsWithExtension.map(l => l.id) },
          attempted: true,
        },
      })
      satActChallengeBadge = attempts >= Math.ceil(lessonsWithExtension.length * 0.8)
    }

    const certData: CertificateData = {
      studentName,
      courseTitle: course.title,
      subject: course.subject,
      completionDate,
      letterGrade: toLetterGrade(overallScore),
      overallScore,
      units: unitSummaries,
      satActChallengeBadge,
    }

    // Render PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(CertificateDocument, { data: certData }) as any
    const buffer = await renderToBuffer(element)

    const filename = `TGA-Certificate-${course.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error('[certificate/GET]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
