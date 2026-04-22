import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import IssuesTable from './issues-table'

export const metadata = { title: 'Issue Reports — Admin' }

export default async function AdminIssuesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { role: true },
  })
  if (!dbUser || dbUser.role !== 'ADMIN') redirect('/dashboard')

  const [issues, counts] = await Promise.all([
    prisma.lessonIssue.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: {
        user: { select: { name: true, email: true, role: true } },
        lesson: {
          select: {
            id: true,
            title: true,
            unit: { select: { unitNumber: true, course: { select: { title: true, id: true } } } },
          },
        },
      },
    }),
    prisma.lessonIssue.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
  ])

  const statusCounts: Record<string, number> = { OPEN: 0, REVIEWED: 0, RESOLVED: 0, DISMISSED: 0 }
  for (const c of counts) {
    statusCounts[c.status] = c._count.id
  }
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0)

  const serialized = issues.map(i => ({
    id: i.id,
    category: i.category,
    description: i.description,
    status: i.status,
    adminNote: i.adminNote,
    createdAt: i.createdAt.toISOString(),
    resolvedAt: i.resolvedAt?.toISOString() ?? null,
    user: i.user,
    lesson: {
      id: i.lesson.id,
      title: i.lesson.title,
      unitNumber: i.lesson.unit.unitNumber,
      courseTitle: i.lesson.unit.course.title,
      courseId: i.lesson.unit.course.id,
    },
  }))

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Issue Reports</h1>
          <p className="text-sm text-gray-400 mt-1">Student and parent-reported issues with lesson content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Total', count: total, color: 'text-white' },
            { label: 'Open', count: statusCounts.OPEN, color: 'text-amber-400' },
            { label: 'Reviewed', count: statusCounts.REVIEWED, color: 'text-blue-400' },
            { label: 'Resolved', count: statusCounts.RESOLVED, color: 'text-emerald-400' },
            { label: 'Dismissed', count: statusCounts.DISMISSED, color: 'text-gray-400' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-white/[0.04] ring-1 ring-white/8 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <IssuesTable issues={serialized} />
      </div>
    </div>
  )
}
