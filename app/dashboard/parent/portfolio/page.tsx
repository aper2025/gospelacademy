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

export default async function ParentPortfolioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  if (!dbUser || (dbUser.role !== 'PARENT' && dbUser.role !== 'ADMIN')) redirect('/dashboard/parent')

  // Get children
  const children = await prisma.user.findMany({
    where: { parentId: dbUser.id, role: 'STUDENT' },
    select: { id: true, name: true },
  })

  // Get all portfolio submissions for children
  const submissions = await prisma.portfolioSubmission.findMany({
    where: { studentId: { in: children.map(c => c.id) } },
    include: {
      student: { select: { id: true, name: true } },
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

  // Group by student
  const byStudent = children.map(child => ({
    ...child,
    submissions: submissions.filter(s => s.studentId === child.id),
  }))

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/dashboard/parent" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-white">Student Portfolios</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {byStudent.map(child => (
          <section key={child.id}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                {child.name.charAt(0)}
              </div>
              <h2 className="text-base font-semibold text-white">{child.name}</h2>
              <span className="text-xs text-gray-500 ml-1">
                {child.submissions.length} project{child.submissions.length !== 1 ? 's' : ''}
              </span>
            </div>

            {child.submissions.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-6 ring-1 ring-white/8 text-center">
                <p className="text-sm text-gray-500">No portfolio submissions yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {child.submissions.map(sub => (
                  <div
                    key={sub.id}
                    className="bg-gray-900 rounded-xl p-5 ring-1 ring-white/8"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-white line-clamp-2">{sub.title}</h3>
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

                    {sub.textContent && (
                      <div className="mt-3 p-3 rounded-lg bg-white/3 ring-1 ring-white/6">
                        <p className="text-xs text-gray-400 line-clamp-4 whitespace-pre-wrap">{sub.textContent}</p>
                      </div>
                    )}

                    {sub.feedback && (
                      <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 ring-1 ring-emerald-500/15">
                        <p className="text-xs text-emerald-400 font-medium mb-1">Feedback</p>
                        <ParsedFeedback feedback={sub.feedback} size="xs" />
                      </div>
                    )}

                    {sub.fileUrl && (
                      <a
                        href={sub.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                        View attached file
                      </a>
                    )}

                    <p className="mt-3 text-xs text-gray-600">
                      Updated {new Date(sub.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {children.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-1">No students added yet</p>
            <Link href="/dashboard/parent/add-student" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Add a student →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
