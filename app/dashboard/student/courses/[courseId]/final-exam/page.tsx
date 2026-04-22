import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import FinalExamClient from './final-exam-client'

export default async function FinalExamPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'STUDENT') redirect('/dashboard')

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, title: true, subject: true },
  })
  if (!course) redirect('/dashboard/student')

  return <FinalExamClient courseId={courseId} courseTitle={course.title} subject={course.subject} />
}
