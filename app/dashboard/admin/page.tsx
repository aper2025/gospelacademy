import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import NotificationBell from '@/components/NotificationBell'
import { prisma } from '@/lib/prisma'
import type { Pathway } from '@prisma/client'

const pathwayColors: Record<Pathway, string> = {
  ADVANCED:   'text-amber-400 bg-amber-500/10 ring-amber-500/20',
  STANDARD:   'text-blue-400 bg-blue-500/10 ring-blue-500/20',
  VOCATIONAL: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20',
}

const pathwayLabels: Record<Pathway, string> = {
  ADVANCED: 'Advanced',
  STANDARD: 'Standard',
  VOCATIONAL: 'Vocational',
}

const quickLinks = [
  {
    label: 'Tutor Sessions',
    description: 'Review AI tutor conversations and flagged sessions',
    href: '/dashboard/admin/sessions',
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>),
  },
  {
    label: 'Issue Reports',
    description: 'View and manage content issues reported by students and parents',
    href: '/dashboard/admin/issues',
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>),
  },
]

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Verify admin role
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { role: true },
  })
  if (!dbUser || dbUser.role !== 'ADMIN') redirect('/dashboard')

  // Real aggregate queries
  const [
    totalStudents,
    totalCourses,
    activeEnrollments,
    totalGrades,
    totalTutorSessions,
    totalTokens,
    totalBetaUsers,
    recentEnrollments,
    courseStats,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.course.count({ where: { isActive: true } }),
    prisma.enrollment.count({ where: { status: 'ACTIVE' } }),
    prisma.grade.count(),
    prisma.tutorSession.count(),
    prisma.tutorSession.aggregate({ _sum: { tokenCount: true } }),
    prisma.user.count({ where: { isBeta: true } }),
    prisma.enrollment.findMany({
      orderBy: { startDate: 'desc' },
      take: 10,
      select: {
        id: true,
        pathway: true,
        startDate: true,
        student: { select: { name: true, isBeta: true } },
        course: { select: { title: true } },
      },
    }),
    prisma.course.findMany({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        subject: true,
        enrollments: { where: { status: 'ACTIVE' }, select: { id: true } },
        units: { select: { lessons: { select: { id: true } } } },
      },
    }),
  ])

  // Completion rate: grades scored / (active enrollments * avg lessons per course)
  const avgLessonsPerCourse = courseStats.length > 0
    ? courseStats.reduce((s, c) => s + c.units.reduce((us, u) => us + u.lessons.length, 0), 0) / courseStats.length
    : 1
  const expectedGrades = activeEnrollments * avgLessonsPerCourse
  const completionRate = expectedGrades > 0 ? Math.min(100, Math.round((totalGrades / expectedGrades) * 100)) : 0

  const totalTokenCount = totalTokens._sum.tokenCount ?? 0
  const estimatedCost = (totalTokenCount * 0.00001).toFixed(2)

  // Month-over-month (simplified: count enrollments in last 30 days)
  const monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 30)
  const newEnrollmentsThisMonth = await prisma.enrollment.count({
    where: { startDate: { gte: monthAgo } },
  })

  const stats = [
    { label: 'Total Students', value: String(totalStudents), delta: `${activeEnrollments} enrolled`, positive: null as boolean | null },
    { label: 'Active Courses', value: String(totalCourses), delta: `${courseStats.reduce((s, c) => s + c.enrollments.length, 0)} enrollments`, positive: null },
    { label: 'New Enrollments', value: String(newEnrollmentsThisMonth), delta: 'last 30 days', positive: newEnrollmentsThisMonth > 0 },
    { label: 'Completion Rate', value: `${completionRate}%`, delta: `${totalGrades} grades`, positive: completionRate > 50 },
    { label: 'Beta Users', value: String(totalBetaUsers), delta: 'beta participants', positive: totalBetaUsers > 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Nav */}
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              The Gospel Academy
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-sm text-gray-400">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>
            <NotificationBell />
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Welcome header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <span className="text-xs font-medium bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20 px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>
          <p className="text-gray-400 text-sm">Platform overview and management tools</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 mb-2">{stat.label}</p>
              {stat.positive !== null && (
                <p className={`text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.delta}
                </p>
              )}
              {stat.positive === null && (
                <p className="text-xs text-gray-600">{stat.delta}</p>
              )}
            </div>
          ))}
        </div>

        {/* AI Usage row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
            <p className="text-2xl font-bold">{totalTutorSessions}</p>
            <p className="text-xs text-gray-500 mt-1">AI Tutor Sessions</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
            <p className="text-2xl font-bold">{totalTokenCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Total Tokens Used</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
            <p className="text-2xl font-bold">${estimatedCost}</p>
            <p className="text-xs text-gray-500 mt-1">Est. AI Cost</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent enrollments */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Recent Enrollments</h2>
                <Link href="/dashboard/admin/enrollments" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  View all
                </Link>
              </div>
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                {recentEnrollments.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-xs text-gray-600">No enrollments yet.</p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Student</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden sm:table-cell">Course</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Pathway</th>
                        <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnrollments.map((row, i) => (
                        <tr
                          key={row.id}
                          className={`hover:bg-white/2 transition-colors ${i < recentEnrollments.length - 1 ? 'border-b border-white/5' : ''}`}
                        >
                          <td className="px-5 py-3.5 font-medium text-sm">
                            {row.student.name}
                            {row.student.isBeta && (
                              <span className="ml-2 text-xs font-medium bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 px-2 py-0.5 rounded-full">
                                Beta
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-gray-400 hidden sm:table-cell">{row.course.title}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${pathwayColors[row.pathway]}`}>
                              {pathwayLabels[row.pathway]}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-500 text-right hidden md:table-cell">
                            {new Date(row.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Course completion rates */}
            <div>
              <h2 className="text-base font-semibold mb-4">Course Overview</h2>
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Course</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">Subject</th>
                      <th className="text-center text-xs font-medium text-gray-500 px-3 py-3">Students</th>
                      <th className="text-center text-xs font-medium text-gray-500 px-3 py-3">Lessons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseStats.map((course, i) => {
                      const lessonCount = course.units.reduce((s, u) => s + u.lessons.length, 0)
                      return (
                        <tr key={course.id} className={`hover:bg-white/2 transition-colors ${i < courseStats.length - 1 ? 'border-b border-white/5' : ''}`}>
                          <td className="px-5 py-3.5 font-medium text-sm">{course.title}</td>
                          <td className="px-4 py-3.5 text-gray-400 text-xs hidden sm:table-cell">{course.subject}</td>
                          <td className="px-3 py-3.5 text-center text-sm">{course.enrollments.length}</td>
                          <td className="px-3 py-3.5 text-center text-sm text-gray-400">{lessonCount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-base font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 bg-gray-900 rounded-xl p-4 ring-1 ring-white/8 hover:ring-white/20 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/8 transition-colors shrink-0">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-white transition-colors">{link.label}</p>
                    <p className="text-xs text-gray-500 truncate">{link.description}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
