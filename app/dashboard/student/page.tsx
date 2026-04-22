import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import NotificationBell from '@/components/NotificationBell'
import { prisma } from '@/lib/prisma'
import { calculateWeightedAverage, toLetterGrade, letterGradeColor } from '@/lib/grades/calculator'

const subjectColors: Record<string, string> = {
  'Bible & Theology': 'text-violet-700 bg-violet-100 ring-violet-200',
  'Mathematics': 'text-blue-700 bg-blue-100 ring-blue-200',
  'Language Arts': 'text-emerald-700 bg-emerald-100 ring-emerald-200',
  'Science': 'text-amber-700 bg-amber-100 ring-amber-200',
  'History & Geography': 'text-rose-700 bg-rose-100 ring-rose-200',
}

export default async function StudentDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, name: true, pathway: true, role: true },
  })
  if (!dbUser) redirect('/login')
  if (dbUser.role !== 'STUDENT') redirect('/dashboard')

  // Fetch enrollments with course + lesson counts
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: dbUser.id, status: { in: ['ACTIVE', 'COMPLETED'] } },
    select: {
      id: true,
      pathway: true,
      status: true,
      course: {
        select: {
          id: true,
          title: true,
          subject: true,
          units: {
            select: {
              id: true,
              lessons: { select: { id: true } },
            },
          },
        },
      },
    },
  })

  // Fetch all grades
  const grades = await prisma.grade.findMany({
    where: { studentId: dbUser.id },
    orderBy: { gradedAt: 'desc' },
    take: 100,
    select: {
      id: true,
      score: true,
      gradedAt: true,
      assessment: {
        select: {
          type: true,
          lessonId: true,
          lesson: {
            select: {
              id: true,
              title: true,
              unit: { select: { courseId: true, course: { select: { title: true } } } },
            },
          },
        },
      },
    },
  })

  // Fetch tutor sessions count (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const recentTutorSessions = await prisma.tutorSession.count({
    where: { studentId: dbUser.id, startedAt: { gte: weekAgo } },
  })

  // Streak tracker: count consecutive days with at least one grade or tutor session
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentGrades = await prisma.grade.findMany({
    where: { studentId: dbUser.id, gradedAt: { gte: thirtyDaysAgo } },
    select: { gradedAt: true },
  })
  const recentSessions = await prisma.tutorSession.findMany({
    where: { studentId: dbUser.id, startedAt: { gte: thirtyDaysAgo } },
    select: { startedAt: true },
  })

  // Build set of active days
  const activeDays = new Set<string>()
  for (const g of recentGrades) {
    activeDays.add(new Date(g.gradedAt).toISOString().slice(0, 10))
  }
  for (const s of recentSessions) {
    activeDays.add(new Date(s.startedAt).toISOString().slice(0, 10))
  }

  // Count streak backwards from today
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (activeDays.has(d.toISOString().slice(0, 10))) {
      streak++
    } else if (i > 0) break // first day (today) can be inactive
  }

  // Fetch lesson progress (completed lessons)
  const lessonProgressRecords = await prisma.lessonProgress.findMany({
    where: { studentId: dbUser.id, status: 'COMPLETED' },
    select: { lessonId: true },
  })
  const completedLessonIds = new Set(lessonProgressRecords.map(p => p.lessonId))

  // Build course data
  const courseData = enrollments.map(enr => {
    const totalLessons = enr.course.units.reduce((s, u) => s + u.lessons.length, 0)
    const courseGrades = grades.filter(g => g.assessment.lesson.unit.courseId === enr.course.id)
    const allLessonIds = enr.course.units.flatMap(u => u.lessons.map(l => l.id))
    const completedInCourse = allLessonIds.filter(id => completedLessonIds.has(id)).length
    const progress = totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0
    const inputs = courseGrades.map(g => ({ score: g.score, type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE' }))
    const avg = calculateWeightedAverage(inputs)
    const lg = toLetterGrade(avg)

    // Find next lesson (first lesson not yet completed)
    const nextLessonId = allLessonIds.find(id => !completedLessonIds.has(id)) ?? allLessonIds[0]

    return {
      courseId: enr.course.id,
      title: enr.course.title,
      subject: enr.course.subject,
      totalLessons,
      gradedLessons: completedInCourse,
      progress,
      avgScore: avg,
      letterGrade: lg,
      gradeColor: letterGradeColor(lg),
      nextLessonId,
      isCompleted: enr.status === 'COMPLETED',
    }
  })

  const totalLessons = courseData.reduce((s, c) => s + c.totalLessons, 0)
  const completedLessons = courseData.reduce((s, c) => s + c.gradedLessons, 0)
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Recent grades
  const recentGradesList = grades.slice(0, 5)

  const firstName = dbUser.name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Student'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold tracking-tight text-gray-900">
              The Gospel Academy
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Student</span>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Welcome header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Welcome back, {firstName}</h1>
          <p className="text-gray-500 text-sm">
            Signed in as <span className="text-gray-700">{user.email}</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Courses', value: courseData.length },
            { label: 'Progress', value: `${overallProgress}%` },
            { label: 'Lessons Done', value: completedLessons },
            { label: 'Day Streak', value: streak, highlight: streak >= 3 },
            { label: 'Tutor Sessions', value: recentTutorSessions, sub: 'this week' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
              <p className={`text-2xl font-bold ${'highlight' in stat && stat.highlight ? 'text-amber-500' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              {'sub' in stat && stat.sub && <p className="text-xs text-gray-400">{stat.sub}</p>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Course list */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">My Courses</h2>
              {courseData.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 ring-1 ring-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-4">You&apos;re not enrolled in any courses yet.</p>
                  <Link href="/courses" className="inline-flex items-center gap-1.5 bg-[#E8632B] hover:bg-[#d4571f] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                    Browse courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {courseData.map((course) => {
                    const colorClass = subjectColors[course.subject] ?? 'text-gray-600 bg-gray-100 ring-gray-200'
                    return (
                      <Link
                        key={course.courseId}
                        href={`/dashboard/student/courses/${course.courseId}`}
                        className="block bg-white rounded-2xl p-5 ring-1 ring-gray-200 hover:ring-[#E8632B]/30 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="font-medium text-sm text-gray-900 group-hover:text-[#E8632B] transition-colors">{course.title}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ring-1 ${colorClass}`}>
                                {course.subject}
                              </span>
                              {course.isCompleted && (
                                <span className="text-xs font-medium text-emerald-700 bg-emerald-100 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">Completed</span>
                              )}
                              {course.gradedLessons > 0 && (
                                <span className={`text-xs font-bold ${course.gradeColor}`}>{course.letterGrade}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-semibold text-gray-900">{course.progress}%</span>
                            {course.avgScore > 0 && (
                              <p className="text-xs text-gray-500 mt-0.5">{course.avgScore}% avg</p>
                            )}
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E8632B] rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {course.gradedLessons} of {course.totalLessons} lessons
                          </p>
                          {course.isCompleted ? (
                            <span className="text-xs text-emerald-600 font-medium group-hover:text-emerald-500 transition-colors">
                              View Certificate
                            </span>
                          ) : course.nextLessonId ? (
                            <span className="text-xs text-[#E8632B] font-medium group-hover:text-[#d4571f] transition-colors">
                              Continue →
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Recent Grades */}
            {recentGradesList.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Grades</h2>
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 divide-y divide-gray-100">
                  {recentGradesList.map(g => {
                    const lg = toLetterGrade(g.score)
                    return (
                      <div key={g.id} className="flex items-center gap-4 px-5 py-3.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${letterGradeColor(lg)} bg-gray-50`}>
                          {lg}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 truncate">{g.assessment.lesson.title}</p>
                          <p className="text-xs text-gray-400">{g.assessment.lesson.unit.course.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-sm font-semibold ${g.score >= 80 ? 'text-emerald-600' : g.score >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                            {Math.round(g.score)}%
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(g.gradedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Streak card */}
            {streak > 0 && (
              <div className="bg-amber-50 rounded-2xl p-5 ring-1 ring-amber-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-lg font-bold text-amber-600">{streak} day streak!</p>
                    <p className="text-xs text-gray-500">Keep it going — consistency builds mastery.</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - (6 - i))
                    const active = activeDays.has(d.toISOString().slice(0, 10))
                    return (
                      <div key={i} className={`flex-1 h-2 rounded-full ${active ? 'bg-amber-400' : 'bg-gray-200'}`} />
                    )
                  })}
                </div>
              </div>
            )}

            {/* AI Tutor CTA */}
            <div className="bg-[#07212D] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-white mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-white mb-1">AI Master Tutor</h3>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Stuck on a problem? Your personal AI tutor is available 24/7 to help.
              </p>
              <Link
                href="/dashboard/student/tutor"
                className="inline-flex items-center gap-1.5 bg-[#E8632B] hover:bg-[#d4571f] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Open AI Tutor
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
              <nav className="space-y-1">
                {[
                  { label: 'My Portfolio', href: '/dashboard/student/portfolio' },
                  { label: 'Course Catalog', href: '/courses' },
                  { label: 'Send Feedback', href: '/dashboard/feedback' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                    <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
