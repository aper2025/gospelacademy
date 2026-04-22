import { notFound } from 'next/navigation'
import { fetchCourse } from '@/lib/data/queries'
import CoursePageClient from './course-page-client'

interface Props { params: Promise<{ courseId: string }> }

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params
  const course = await fetchCourse(courseId)
  if (!course) notFound()
  return <CoursePageClient course={course} courseId={courseId} />
}
