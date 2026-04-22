import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ParsedFeedback } from '@/components/ui/ParsedFeedback'

function StatusBadge({ status, grade }: { status: string; grade: number | null }) {
  if (status === 'graded') {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
        Graded: {grade}/100
      </span>
    )
  }
  if (status === 'submitted') {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
        Awaiting Review
      </span>
    )
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/20">
      Draft
    </span>
  )
}

export default async function PortfolioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, name: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'STUDENT') redirect('/dashboard/student')

  const submissions = await prisma.portfolioSubmission.findMany({
    where: { studentId: dbUser.id },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          unit: {
            select: {
              title: true,
              course: { select: { id: true, title: true } },
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  const stats = {
    total: submissions.length,
    drafts: submissions.filter(s => s.status === 'draft').length,
    submitted: submissions.filter(s => s.status === 'submitted').length,
    graded: submissions.filter(s => s.status === 'graded').length,
    avgGrade: (() => {
      const graded = submissions.filter(s => s.grade !== null)
      if (graded.length === 0) return null
      return Math.round(graded.reduce((sum, s) => sum + s.grade!, 0) / graded.length)
    })(),
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/dashboard/student" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-white">My Portfolio</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Projects', value: stats.total, color: 'text-white' },
            { label: 'Drafts', value: stats.drafts, color: 'text-gray-400' },
            { label: 'Submitted', value: stats.submitted, color: 'text-amber-400' },
            { label: 'Graded', value: stats.graded, color: 'text-emerald-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 rounded-xl p-4 ring-1 ring-white/8">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {stats.avgGrade !== null && (
          <div className="bg-gray-900 rounded-xl p-4 ring-1 ring-white/8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-400">{stats.avgGrade}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Average Portfolio Grade</p>
              <p className="text-xs text-gray-500">Across {stats.graded} graded project{stats.graded !== 1 ? 's' : ''}</p>
            </div>
          </div>
        )}

        {/* Submissions grid */}
        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-gray-400 mb-1">No portfolio submissions yet</p>
            <p className="text-sm text-gray-500">Complete project lessons to start building your portfolio.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {submissions.map(sub => (
              <Link
                key={sub.id}
                href={`/dashboard/student/courses/${sub.lesson.unit.course.id}/lessons/${sub.lessonId}`}
                className="group bg-gray-900 rounded-xl p-5 ring-1 ring-white/8 hover:ring-white/15 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {sub.title}
                  </h3>
                  <StatusBadge status={sub.status} grade={sub.grade} />
                </div>

                {sub.description && (
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{sub.description}</p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{sub.lesson.unit.course.title}</span>
                  <span className="opacity-30">|</span>
                  <span>{sub.lesson.title}</span>
                </div>

                {sub.feedback && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 ring-1 ring-emerald-500/15">
                    <p className="text-xs text-emerald-400 font-medium mb-1">Feedback</p>
                    <ParsedFeedback feedback={sub.feedback} size="xs" />
                  </div>
                )}

                <p className="mt-3 text-xs text-gray-600">
                  Updated {new Date(sub.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
