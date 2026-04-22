import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { isLessonContent } from '@/lib/types/curriculum'
import SummativeAssessmentClient from './summative-client'

interface Props {
  params: Promise<{ courseId: string; unitId: string }>
}

export default async function SummativeAssessmentPage({ params }: Props) {
  const { courseId, unitId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, pathway: true },
  })
  if (!dbUser) redirect('/login')

  // Fetch unit with course and lessons
  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    select: {
      id: true,
      title: true,
      unitNumber: true,
      course: { select: { id: true, title: true, subject: true } },
      lessons: {
        orderBy: { weekNumber: 'asc' },
        select: { id: true, title: true, content: true },
      },
    },
  })

  if (!unit || unit.course.id !== courseId) redirect(`/dashboard/student/courses/${courseId}`)

  // Find the last lesson (usually the assessment/project lesson)
  const assessmentLesson = unit.lessons[unit.lessons.length - 1]
  if (!assessmentLesson || !isLessonContent(assessmentLesson.content)) {
    redirect(`/dashboard/student/courses/${courseId}/units/${unitId}`)
  }

  const content = assessmentLesson.content
  const pathway = dbUser.pathway ?? 'STANDARD'
  const variant = content.pathways.find(p => p.pathway === pathway) ?? content.pathways[1]

  // Find project block in output phase
  const projectBlock = variant.ipo.output.find(b => b.type === 'project')
  const rubric = projectBlock && 'rubric' in projectBlock && projectBlock.rubric
    ? projectBlock.rubric
    : []

  // Load existing grade for this assessment
  const existingGrade = await prisma.grade.findFirst({
    where: {
      studentId: dbUser.id,
      assessment: { lessonId: assessmentLesson.id, type: 'SUMMATIVE' },
    },
    orderBy: { attempt: 'desc' },
    select: { id: true, score: true, feedback: true, attempt: true, gradedAt: true },
  })

  return (
    <SummativeAssessmentClient
      courseId={courseId}
      courseTitle={unit.course.title}
      unitTitle={unit.title}
      unitNumber={unit.unitNumber}
      lessonId={assessmentLesson.id}
      lessonTitle={assessmentLesson.title}
      pathway={pathway}
      projectTitle={projectBlock && 'title' in projectBlock ? projectBlock.title : 'Unit Assessment'}
      projectDescription={projectBlock && 'description' in projectBlock ? projectBlock.description : variant.objectives.join('. ')}
      rubric={rubric}
      objectives={variant.objectives}
      existingGrade={existingGrade ? {
        score: existingGrade.score,
        feedback: existingGrade.feedback,
        attempt: existingGrade.attempt,
        gradedAt: existingGrade.gradedAt.toISOString(),
      } : null}
    />
  )
}
