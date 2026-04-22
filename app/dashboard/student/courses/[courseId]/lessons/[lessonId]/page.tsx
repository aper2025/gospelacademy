import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { fetchLesson, fetchLessonNav } from '@/lib/data/queries'
import { exampleLesson } from '@/lib/data/example-lesson'
import LessonPageClient from './lesson-page-client'

interface Props { params: Promise<{ courseId: string; lessonId: string }> }

export default async function LessonPage({ params }: Props) {
  const { courseId, lessonId } = await params

  // Get current user email to resolve enrolled pathway
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [dbResult, lessonNav, dbUser] = await Promise.all([
    fetchLesson(courseId, lessonId, user?.email ?? undefined),
    fetchLessonNav(courseId, lessonId),
    user?.email
      ? prisma.user.findUnique({ where: { email: user.email }, select: { role: true } })
      : null,
  ])

  // Use DB lesson if found, otherwise fall back to example lesson for demo
  const lesson = dbResult?.lessonContent ?? exampleLesson
  if (!dbResult && lessonId !== 'example') {
    // Neither DB nor known demo id — 404
    // (Allow 'example' lessonId for the original demo route)
    notFound()
  }

  // Fetch admin-uploaded resources for this lesson
  const adminResources = await prisma.adminResource.findMany({
    where: { lessonId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      fileUrl: true,
      fileType: true,
      fileSize: true,
    },
  })

  return (
    <LessonPageClient
      lesson={lesson}
      courseId={courseId}
      lessonId={lessonId}
      initialPathway={dbResult?.studentPathway}
      prevLesson={lessonNav.prevLesson}
      nextLesson={lessonNav.nextLesson}
      currentIndex={lessonNav.currentIndex}
      totalLessons={lessonNav.totalLessons}
      userRole={dbUser?.role ?? 'STUDENT'}
      adminResources={adminResources}
    />
  )
}
