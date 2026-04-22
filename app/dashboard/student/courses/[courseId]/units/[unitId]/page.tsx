import { notFound } from 'next/navigation'
import { fetchUnitWithCourse } from '@/lib/data/queries'
import UnitPageClient from './unit-page-client'

interface Props { params: Promise<{ courseId: string; unitId: string }> }

export default async function UnitPage({ params }: Props) {
  const { courseId, unitId } = await params
  const data = await fetchUnitWithCourse(courseId, unitId)
  if (!data) notFound()
  return <UnitPageClient course={data.course} unit={data.unit} courseId={courseId} />
}
