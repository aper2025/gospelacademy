import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function TutorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'STUDENT') redirect('/dashboard')

  // Fetch enrollments with course, units, and lessons
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: dbUser.id, status: 'ACTIVE' },
    select: {
      pathway: true,
      course: {
        select: {
          id: true,
          title: true,
          subject: true,
          units: {
            orderBy: { unitNumber: 'asc' },
            select: {
              id: true,
              title: true,
              unitNumber: true,
              lessons: {
                orderBy: { weekNumber: 'asc' },
                select: { id: true, title: true, weekNumber: true },
              },
            },
          },
        },
      },
    },
  })

  // Find lessons with existing tutor sessions for this student
  const tutorSessions = await prisma.tutorSession.findMany({
    where: { studentId: dbUser.id },
    orderBy: { startedAt: 'desc' },
    take: 10,
    select: {
      lessonId: true,
      pathway: true,
      startedAt: true,
      lesson: {
        select: {
          id: true,
          title: true,
          unit: {
            select: {
              course: { select: { id: true, title: true } },
            },
          },
        },
      },
    },
  })

  // Get lesson progress to find the "next" lesson per course
  const completedProgress = await prisma.lessonProgress.findMany({
    where: { studentId: dbUser.id, status: 'COMPLETED' },
    select: { lessonId: true },
  })
  const completedIds = new Set(completedProgress.map(p => p.lessonId))

  const subjectColors: Record<string, string> = {
    'Bible & Theology': 'text-violet-400 bg-violet-500/10 ring-violet-500/20',
    'Mathematics': 'text-blue-400 bg-blue-500/10 ring-blue-500/20',
    'Language Arts': 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20',
    'Science': 'text-amber-400 bg-amber-500/10 ring-amber-500/20',
    'History & Geography': 'text-rose-400 bg-rose-500/10 ring-rose-500/20',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/dashboard/student"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Back to dashboard"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AI Master Tutor</p>
              <p className="text-xs text-gray-500 leading-tight">Select a lesson to get started</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Intro */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your AI Tutor is ready to help</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Select a lesson below to open your AI tutor. The tutor will guide you through the lesson
            content using Socratic questioning — helping you think, not just giving answers.
          </p>
        </div>

        {/* Recent tutor sessions */}
        {tutorSessions.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">Continue a conversation</h2>
            <div className="grid gap-2">
              {tutorSessions.map((session) => (
                <Link
                  key={`${session.lessonId}-${session.pathway}`}
                  href={`/dashboard/student/courses/${session.lesson.unit.course.id}/lessons/${session.lessonId}`}
                  className="flex items-center gap-4 bg-gray-900 rounded-xl p-4 ring-1 ring-white/8 hover:ring-blue-500/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-white transition-colors truncate">
                      {session.lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{session.lesson.unit.course.title}</p>
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">
                    {new Date(session.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Course/lesson picker */}
        {enrollments.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl p-8 ring-1 ring-white/8 text-center">
            <p className="text-sm text-gray-500 mb-4">You&apos;re not enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-gray-300">Choose a lesson</h2>
            {enrollments.map((enr) => {
              // Find the next incomplete lesson
              const allLessons = enr.course.units.flatMap(u =>
                u.lessons.map(l => ({ ...l, unitTitle: u.title, unitNumber: u.unitNumber, lessonNumber: l.weekNumber }))
              )
              const nextLesson = allLessons.find(l => !completedIds.has(l.id)) ?? allLessons[0]
              const colorClass = subjectColors[enr.course.subject] ?? 'text-gray-400 bg-gray-500/10 ring-gray-500/20'

              return (
                <div key={enr.course.id} className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                  {/* Course header */}
                  <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold">{enr.course.title}</p>
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ring-1 mt-1 ${colorClass}`}>
                        {enr.course.subject}
                      </span>
                    </div>
                  </div>

                  {/* Quick pick: next lesson */}
                  {nextLesson && (
                    <Link
                      href={`/dashboard/student/courses/${enr.course.id}/lessons/${nextLesson.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 bg-blue-600/5 hover:bg-blue-600/10 border-b border-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-400 font-medium mb-0.5">Continue where you left off</p>
                        <p className="text-sm text-gray-200 group-hover:text-white transition-colors truncate">
                          Unit {nextLesson.unitNumber}, Lesson {nextLesson.lessonNumber}: {nextLesson.title}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  )}

                  {/* All units collapsed */}
                  <details className="group/details">
                    <summary className="px-5 py-3 text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors flex items-center gap-2">
                      <svg className="w-3 h-3 transition-transform group-open/details:rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      Browse all {allLessons.length} lessons
                    </summary>
                    <div className="px-5 pb-4 space-y-3 max-h-72 overflow-y-auto">
                      {enr.course.units.map((unit) => (
                        <div key={unit.id}>
                          <p className="text-xs font-medium text-gray-500 mb-1.5">
                            Unit {unit.unitNumber}: {unit.title}
                          </p>
                          <div className="space-y-0.5">
                            {unit.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={`/dashboard/student/courses/${enr.course.id}/lessons/${lesson.id}`}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${completedIds.has(lesson.id) ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                                <span className="truncate">
                                  {lesson.weekNumber}. {lesson.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )
            })}
          </div>
        )}

        {/* Tip */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            Tip: You can also open the AI tutor directly from any lesson page — look for the tutor chat at the bottom of the lesson.
          </p>
        </div>
      </main>
    </div>
  )
}
