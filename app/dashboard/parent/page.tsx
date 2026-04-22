import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import WeeklyActivityChart, { type ChartDataPoint } from '@/components/parent/WeeklyActivityChart'
import GradeTrendChart, { type GradeTrendPoint } from '@/components/parent/GradeTrendChart'
import NotificationBell from '@/components/NotificationBell'
import { toLetterGrade, letterGradeColor, calculateWeightedAverage } from '@/lib/grades/calculator'
import type { Pathway, Plan, SubscriptionStatus } from '@prisma/client'
import type { TutorSessionMetadata } from '@/lib/ai/tutor-prompt'

// ─── Display helpers ────────────────────────────────────────────────────────

const PATHWAY_INFO: Record<Pathway, { label: string; color: string }> = {
  ADVANCED:   { label: 'Advanced Scholars', color: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
  STANDARD:   { label: 'Standard Academic', color: 'text-blue-400 bg-blue-500/10 ring-blue-500/20' },
  VOCATIONAL: { label: 'Vocational',         color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
}

const PLAN_LABELS: Record<Plan, string> = {
  SINGLE: 'Single Student',
  FAMILY: 'Family',
  SCHOOL: 'School / Co-op',
}

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  ACTIVE:   'text-emerald-400',
  TRIALING: 'text-blue-400',
  PAST_DUE: 'text-amber-400',
  CANCELED: 'text-rose-400',
}

const SUBJECT_COLORS: Record<string, string> = {
  'Bible & Theology':    'bg-violet-500',
  'Mathematics':         'bg-blue-500',
  'Language Arts':       'bg-emerald-500',
  'Science':             'bg-amber-500',
  'History & Geography': 'bg-rose-500',
}

const SESSION_QUALITY_STYLES: Record<string, { label: string; color: string }> = {
  engaged:    { label: 'Engaged',     color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
  passive:    { label: 'Getting Started', color: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
  struggling: { label: 'Persevering', color: 'text-violet-400 bg-violet-500/10 ring-violet-500/20' },
}

const STUDENT_ACCENT = [
  { text: 'text-blue-400',   bg: 'bg-blue-500/10',   ring: 'ring-blue-500/20' },
  { text: 'text-violet-400', bg: 'bg-violet-500/10', ring: 'ring-violet-500/20' },
  { text: 'text-emerald-400',bg: 'bg-emerald-500/10',ring: 'ring-emerald-500/20' },
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatRelativeDate(date: Date): string {
  const diff = Date.now() - date.getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(diff / 86_400_000)
  if (m < 2)   return 'Just now'
  if (m < 60)  return `${m}m ago`
  if (h < 24)  return `${h}h ago`
  if (d === 1) return 'Yesterday'
  return `${d}d ago`
}

function getScheduling(enrollmentStartMonth: number): string {
  return enrollmentStartMonth >= 7 && enrollmentStartMonth <= 8
    ? '10-Month Classic'
    : '12-Month Mastery'
}

// ─── Chevron icon ─────────────────────────────────────────────────────────
function ChevronRight() {
  return (
    <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

// ─── Empty / onboarding state ─────────────────────────────────────────────
function NoStudentsState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mb-2">Add your first student</h2>
      <p className="text-gray-400 text-sm max-w-sm mb-6">
        Once you add a student, you&apos;ll see their progress, courses, and activity here.
      </p>
      <Link
        href="/dashboard/parent/add-student"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
      >
        Add a student
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ParentDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ enrolled?: string; purchased?: string; courseId?: string }>
}) {
  const params = await searchParams
  const showEnrolledBanner = params.enrolled === 'true'
  const showPurchasedBanner = params.purchased === 'true'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Resolve parent Prisma record
  const dbParent = await prisma.user.findUnique({
    where: { email: user.email! },
    select: {
      id: true,
      name: true,
      role: true,
      subscription: {
        select: { plan: true, status: true, currentPeriodEnd: true },
      },
    },
  })
  if (!dbParent) redirect('/login')
  if (dbParent.role !== 'PARENT') redirect('/dashboard')

  // Date anchors
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  const monthAgo = new Date(now)
  monthAgo.setDate(now.getDate() - 30)

  // Fetch children with all needed relations
  const children = await prisma.user.findMany({
    where: { parentId: dbParent.id },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      name: true,
      createdAt: true,
      pathway: true,
      gradeLevel: true,
      schedulingOption: true,
      enrollments: {
        where: { status: 'ACTIVE' },
        orderBy: { startDate: 'desc' },
        select: {
          id: true,
          pathway: true,
          startDate: true,
          course: {
            select: { id: true, title: true, subject: true, gradeLevelMin: true },
          },
        },
      },
      grades: {
        orderBy: { gradedAt: 'desc' },
        take: 50,
        select: {
          id: true,
          score: true,
          gradedAt: true,
          assessment: {
            select: {
              id: true,
              type: true,
              createdAt: true,
              lesson: {
                select: {
                  unit: {
                    select: {
                      course: { select: { id: true, title: true, subject: true } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tutorSessions: {
        where: { startedAt: { gte: monthAgo } },
        orderBy: { startedAt: 'desc' },
        select: {
          id: true,
          startedAt: true,
          metadata: true,
          tokenCount: true,
          pathway: true,
          lesson: {
            select: {
              title: true,
              unit: { select: { course: { select: { title: true, subject: true } } } },
            },
          },
        },
      },
    },
  })

  // ─── Derived computations ───────────────────────────────────────────────

  type Child = typeof children[0]

  function gradeLevel(c: Child): string {
    // Prefer the profile-level grade, fall back to the first enrolled course's grade
    if (c.gradeLevel != null) return String(c.gradeLevel)
    const g = c.enrollments[0]?.course.gradeLevelMin
    return g != null ? String(g) : '—'
  }

  function primaryPathway(c: Child): Pathway {
    // Prefer the profile-level pathway, fall back to the first active enrollment's pathway
    return c.pathway ?? c.enrollments[0]?.pathway ?? 'STANDARD'
  }

  function overallProgress(c: Child): number {
    if (!c.grades.length) return 0
    return Math.round(c.grades.reduce((s, g) => s + g.score, 0) / c.grades.length)
  }

  function courseProgress(c: Child, courseId: string): number {
    const gs = c.grades.filter(g => g.assessment.lesson.unit.course.id === courseId)
    if (!gs.length) return 0
    return Math.round(gs.reduce((s, g) => s + g.score, 0) / gs.length)
  }

  function tutorSessionsThisWeek(c: Child): number {
    return c.tutorSessions.filter(s => new Date(s.startedAt) >= weekStart).length
  }

  function schedulingOption(c: Child): string {
    // Prefer the profile-level scheduling option, fall back to deriving from enrollment start month
    if (c.schedulingOption) return c.schedulingOption
    const start = c.enrollments[0]?.startDate
    return start ? getScheduling(new Date(start).getMonth()) : '12-Month Mastery'
  }

  function assessmentBuckets(c: Child) {
    const formative = c.grades
      .filter(g => g.assessment.type === 'FORMATIVE')
      .sort((a, b) => new Date(a.assessment.createdAt).getTime() - new Date(b.assessment.createdAt).getTime())
    const summative = c.grades
      .filter(g => g.assessment.type === 'SUMMATIVE')
      .sort((a, b) => new Date(a.assessment.createdAt).getTime() - new Date(b.assessment.createdAt).getTime())
    return {
      baseline:  formative[0] ? { done: true, score: formative[0].score }  : { done: false, score: null },
      midpoint:  formative[1] ? { done: true, score: formative[1].score }  : { done: false, score: null },
      summative: summative[0] ? { done: true, score: summative[0].score } : { done: false, score: null },
    }
  }

  // Summary stats
  const totalGrades   = children.reduce((s, c) => s + c.grades.length, 0)
  const avgProgress   = children.length
    ? Math.round(children.reduce((s, c) => s + overallProgress(c), 0) / children.length)
    : 0
  const totalTutorSessions = children.reduce((s, c) => s + c.tutorSessions.length, 0)

  // Weekly chart data — serialised to plain objects (no Date instances)
  const chartData: ChartDataPoint[] = DAY_NAMES.map((day, i) => {
    const dayStart = new Date(weekStart)
    dayStart.setDate(weekStart.getDate() + i)
    const dayEnd = new Date(dayStart)
    dayEnd.setHours(23, 59, 59, 999)
    let count = 0
    for (const c of children) {
      count += c.grades.filter(g => {
        const d = new Date(g.gradedAt)
        return d >= dayStart && d <= dayEnd
      }).length
      count += c.tutorSessions.filter(s => {
        const d = new Date(s.startedAt)
        return d >= dayStart && d <= dayEnd
      }).length
    }
    return { day, count, isToday: i === now.getDay() }
  })

  // Per-child grade trend data for charts
  function gradeTrendData(c: Child): GradeTrendPoint[] {
    return c.grades
      .slice()
      .sort((a, b) => new Date(a.gradedAt).getTime() - new Date(b.gradedAt).getTime())
      .map((g, i) => ({
        label: `#${i + 1}`,
        score: g.score,
        type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE',
      }))
  }

  // Per-child per-course weighted grades
  function courseGrades(c: Child): { courseId: string; courseTitle: string; subject: string; score: number; letterGrade: string; gradeColor: string }[] {
    const courseMap = new Map<string, { title: string; subject: string; grades: { score: number; type: 'FORMATIVE' | 'SUMMATIVE' }[] }>()
    for (const g of c.grades) {
      const course = g.assessment.lesson.unit.course
      const existing = courseMap.get(course.id) ?? { title: course.title, subject: course.subject, grades: [] }
      existing.grades.push({ score: g.score, type: g.assessment.type as 'FORMATIVE' | 'SUMMATIVE' })
      courseMap.set(course.id, existing)
    }
    return Array.from(courseMap.entries()).map(([courseId, data]) => {
      const score = calculateWeightedAverage(data.grades)
      const lg = toLetterGrade(score)
      return { courseId, courseTitle: data.title, subject: data.subject, score, letterGrade: lg, gradeColor: letterGradeColor(lg) }
    })
  }

  // Activity feed — keep Date objects server-side only
  type ActivityItem = {
    id: string
    studentName: string
    studentIdx: number
    type: 'grade' | 'tutor'
    description: string
    score?: number
    date: Date
    subjectDot?: string
  }
  const activityItems: ActivityItem[] = []
  children.forEach((c, idx) => {
    c.grades.slice(0, 15).forEach(g => {
      const course = g.assessment.lesson.unit.course
      activityItems.push({
        id: `g-${g.id}`,
        studentName: c.name,
        studentIdx: idx,
        type: 'grade',
        description: `Completed assessment in ${course.title}`,
        score: g.score,
        date: new Date(g.gradedAt),
        subjectDot: SUBJECT_COLORS[course.subject] ?? 'bg-gray-500',
      })
    })
    c.tutorSessions.slice(0, 5).forEach(s => {
      activityItems.push({
        id: `t-${s.id}`,
        studentName: c.name,
        studentIdx: idx,
        type: 'tutor',
        description: 'AI Master Tutor session',
        date: new Date(s.startedAt),
      })
    })
  })
  activityItems.sort((a, b) => b.date.getTime() - a.date.getTime())
  const recentActivity = activityItems.slice(0, 10)

  const sub = dbParent.subscription
  const parentFirstName = dbParent.name.split(' ')[0]
  const maxStudents = sub?.plan === 'SINGLE' ? 1 : sub?.plan === 'FAMILY' ? 3 : 10
  const canAddStudent = children.length < maxStudents

  // ─── JSX ──────────────────────────────────────────────────────────────────

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
            <span className="text-sm text-gray-400">Parent</span>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* ── Payment success banners ──────────────────────────────────── */}
        {showEnrolledBanner && (
          <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-6 py-5">
            <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p className="font-semibold text-emerald-300">Subscription activated!</p>
              <p className="text-sm text-gray-400 mt-0.5">Your payment was successful. Your students now have full access to all courses.</p>
            </div>
          </div>
        )}
        {showPurchasedBanner && (
          <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-6 py-5">
            <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p className="font-semibold text-emerald-300">Course purchased!</p>
              <p className="text-sm text-gray-400 mt-0.5">Your payment was successful. The course is now available for your student.</p>
            </div>
          </div>
        )}

        {/* ── 0. No-subscription banner ─────────────────────────────────── */}
        {!sub && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl px-6 py-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-300">Please select a plan to get started</p>
                <p className="text-xs text-amber-400/80 mt-0.5">
                  You need an active subscription to add students and access all features.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              View plans
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {parentFirstName}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {sub ? (
              <div className="flex items-center gap-2 bg-gray-900 ring-1 ring-white/8 rounded-xl px-4 py-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-sm font-medium">{PLAN_LABELS[sub.plan]}</span>
                <span className={`text-xs font-medium ${STATUS_STYLES[sub.status]}`}>
                  · {sub.status === 'TRIALING' ? 'Trial' : sub.status.charAt(0) + sub.status.slice(1).toLowerCase()}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-500/10 ring-1 ring-amber-500/20 rounded-xl px-4 py-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-sm font-medium text-amber-300">No active subscription</span>
              </div>
            )}
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 px-4 py-2.5 rounded-xl transition-colors"
            >
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* ── 2. Summary stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Students',           value: children.length },
            { label: 'Active Courses',     value: children.reduce((s, c) => s + c.enrollments.length, 0) },
            { label: 'Avg. Progress',      value: `${avgProgress}%` },
            { label: 'AI Tutor Sessions',  value: totalTutorSessions },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Main content grid ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left col (2/3) ────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── Student cards ───────────────────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Students</h2>
                {canAddStudent && (
                  <Link
                    href="/dashboard/parent/add-student"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add student
                  </Link>
                )}
              </div>

              {children.length === 0 ? (
                <NoStudentsState />
              ) : (
                <div className="space-y-4">
                  {children.map((child, idx) => {
                    const pathway    = primaryPathway(child)
                    const pathInfo   = PATHWAY_INFO[pathway]
                    const progress   = overallProgress(child)
                    const accent     = STUDENT_ACCENT[idx % STUDENT_ACCENT.length]
                    const scheduling = schedulingOption(child)

                    return (
                      <div key={child.id} className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                        {/* Card header */}
                        <div className="p-5 border-b border-white/5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center ${accent.text} text-sm font-bold`}>
                                {child.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{child.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {gradeLevel(child) !== '—' && (
                                    <span className="text-xs text-gray-500">Grade {gradeLevel(child)}</span>
                                  )}
                                  <span className="text-gray-700 text-xs">·</span>
                                  <span className="text-xs text-gray-500">{scheduling}</span>
                                  <span className="text-gray-700 text-xs">·</span>
                                  <span className="text-xs text-gray-500">{tutorSessionsThisWeek(child)} tutor sessions this week</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${pathInfo.color}`}>
                                {pathInfo.label}
                              </span>
                              <Link
                                href={`/dashboard/parent/student/${child.id}`}
                                className="text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 px-3 py-1.5 rounded-lg ring-1 ring-white/8 transition-colors"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>

                          {/* Overall progress bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                              <span>Overall progress</span>
                              <span className={`font-semibold ${accent.text}`}>{progress}%</span>
                            </div>
                            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  pathway === 'ADVANCED' ? 'bg-amber-500' :
                                  pathway === 'VOCATIONAL' ? 'bg-emerald-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Courses */}
                        {child.enrollments.length > 0 ? (
                          <div className="p-5">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
                              {child.enrollments.length} enrolled course{child.enrollments.length !== 1 ? 's' : ''}
                            </p>
                            <div className="space-y-2.5">
                              {child.enrollments.map(enr => {
                                const pct = courseProgress(child, enr.course.id)
                                const dot = SUBJECT_COLORS[enr.course.subject] ?? 'bg-gray-500'
                                return (
                                  <div key={enr.id} className="flex items-center gap-3">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                    <p className="text-xs text-gray-300 flex-1 truncate">{enr.course.title}</p>
                                    <div className="w-20 h-1.5 bg-white/8 rounded-full overflow-hidden shrink-0">
                                      <div className="h-full bg-blue-500/70 rounded-full" style={{ width: `${pct}%` }} />
                                    </div>
                                    <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="p-5">
                            <p className="text-xs text-gray-600 italic">No active enrollments yet.</p>
                          </div>
                        )}

                        {/* Tutor Session Summaries */}
                        {child.tutorSessions.length > 0 && (
                          <div className="p-5 border-t border-white/5">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
                              Recent AI Tutor Sessions ({child.tutorSessions.length})
                            </p>
                            <div className="space-y-2">
                              {child.tutorSessions.slice(0, 5).map(session => {
                                const meta = session.metadata as unknown as TutorSessionMetadata | null
                                const quality = meta?.sessionQuality ? SESSION_QUALITY_STYLES[meta.sessionQuality] : null
                                const lessonTitle = session.lesson?.title ?? 'Unknown lesson'
                                const courseTitle = session.lesson?.unit?.course?.title
                                const subjectDot = session.lesson?.unit?.course?.subject
                                  ? SUBJECT_COLORS[session.lesson.unit.course.subject] ?? 'bg-gray-500'
                                  : 'bg-gray-500'

                                return (
                                  <div key={session.id} className="flex items-center gap-3 rounded-xl bg-white/3 ring-1 ring-white/6 px-3.5 py-2.5">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${subjectDot}`} />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs text-gray-300 truncate">{lessonTitle}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        {courseTitle && <span className="text-xs text-gray-600 truncate">{courseTitle}</span>}
                                        <span className="text-xs text-gray-700">·</span>
                                        <span className="text-xs text-gray-600">{meta?.messageCount ?? 0} exchanges</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      {quality && (
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${quality.color}`}>
                                          {quality.label}
                                        </span>
                                      )}
                                      {meta?.struggledConcepts && meta.struggledConcepts.length > 0 && (
                                        <span className="text-xs text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20 px-2 py-0.5 rounded-full">
                                          {meta.struggledConcepts.length} concept{meta.struggledConcepts.length !== 1 ? 's' : ''} to review
                                        </span>
                                      )}
                                      <span className="text-xs text-gray-600">{formatRelativeDate(new Date(session.startedAt))}</span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* ── Family Progress Summary ──────────────────────────────── */}
            {children.length > 0 && (
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold">Family Progress Summary</h2>
                  {canAddStudent && (
                    <Link
                      href="/dashboard/parent/add-student"
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add student
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Lessons Completed', value: totalGrades },
                    { label: 'Avg. Progress',     value: `${avgProgress}%` },
                    { label: 'Active Students',   value: children.length },
                  ].map(s => (
                    <div key={s.label} className="bg-white/3 rounded-xl p-4">
                      <p className="text-xl font-bold">{s.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">This week&apos;s activity</p>
                <WeeklyActivityChart data={chartData} />
              </div>
            )}

            {/* ── Assessment Tracker ───────────────────────────────────── */}
            {children.length > 0 && (
              <div>
                <h2 className="text-base font-semibold mb-4">Assessment Tracker</h2>
                <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Student</th>
                        <th className="text-center text-xs font-medium text-gray-500 px-4 py-3">
                          <span className="hidden sm:inline">Baseline</span>
                          <span className="sm:hidden">Base</span>
                        </th>
                        <th className="text-center text-xs font-medium text-gray-500 px-4 py-3">
                          <span className="hidden sm:inline">Mid-Year</span>
                          <span className="sm:hidden">Mid</span>
                        </th>
                        <th className="text-center text-xs font-medium text-gray-500 px-4 py-3">Summative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {children.map((child, idx) => {
                        const buckets = assessmentBuckets(child)
                        const accent  = STUDENT_ACCENT[idx % STUDENT_ACCENT.length]

                        function AssessmentCell({ bucket }: { bucket: { done: boolean; score: number | null } }) {
                          if (bucket.done) {
                            return (
                              <td className="px-4 py-3.5 text-center">
                                <div className="flex flex-col items-center gap-0.5">
                                  <CheckIcon className="text-emerald-400" />
                                  <span className="text-xs text-emerald-400 font-medium">{Math.round(bucket.score!)}%</span>
                                </div>
                              </td>
                            )
                          }
                          return (
                            <td className="px-4 py-3.5 text-center">
                              <span className="text-xs text-gray-600">Not yet</span>
                            </td>
                          )
                        }

                        return (
                          <tr key={child.id} className={`${idx < children.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/2 transition-colors`}>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${accent.bg.replace('bg-', 'bg-').replace('/10', '')} shrink-0`} />
                                <span className="text-sm font-medium">{child.name}</span>
                              </div>
                            </td>
                            <AssessmentCell bucket={buckets.baseline}  />
                            <AssessmentCell bucket={buckets.midpoint}  />
                            <AssessmentCell bucket={buckets.summative} />
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Activity Feed ────────────────────────────────────────── */}
            {recentActivity.length > 0 && (
              <div>
                <h2 className="text-base font-semibold mb-4">Recent Activity</h2>
                <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 divide-y divide-white/5">
                  {recentActivity.map(item => {
                    const accent = STUDENT_ACCENT[item.studentIdx % STUDENT_ACCENT.length]
                    return (
                      <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                        <div className={`w-7 h-7 rounded-full ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center ${accent.text} text-xs font-bold shrink-0`}>
                          {item.studentName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-xs font-semibold ${accent.text}`}>{item.studentName}</span>
                            <span className="text-xs text-gray-500">{item.description}</span>
                            {item.type === 'grade' && item.score != null && (
                              <span className={`text-xs font-semibold ${item.score >= 80 ? 'text-emerald-400' : item.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                                · {Math.round(item.score)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {item.type === 'tutor' && (
                            <span className="text-xs text-blue-400 bg-blue-500/10 ring-1 ring-blue-500/20 px-2 py-0.5 rounded-full">AI Tutor</span>
                          )}
                          {item.subjectDot && (
                            <span className={`w-1.5 h-1.5 rounded-full ${item.subjectDot}`} />
                          )}
                          <span className="text-xs text-gray-600">{formatRelativeDate(item.date)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Course Grades + Trend ──────────────────────────────── */}
            {children.length > 0 && children.some(c => c.grades.length > 0) && (
              <div>
                <h2 className="text-base font-semibold mb-4">Course Grades</h2>
                <div className="space-y-4">
                  {children.map((child, idx) => {
                    const cGrades = courseGrades(child)
                    const trend = gradeTrendData(child)
                    if (cGrades.length === 0) return null
                    const accent = STUDENT_ACCENT[idx % STUDENT_ACCENT.length]
                    return (
                      <div key={child.id} className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
                        <div className="p-5 border-b border-white/5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-6 h-6 rounded-full ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center ${accent.text} text-xs font-bold`}>
                              {child.name.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold">{child.name}</span>
                          </div>
                          <div className="space-y-2">
                            {cGrades.map(cg => (
                              <div key={cg.courseId} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${SUBJECT_COLORS[cg.subject] ?? 'bg-gray-500'}`} />
                                  <span className="text-xs text-gray-300 truncate">{cg.courseTitle}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className={`text-sm font-bold ${cg.gradeColor}`}>{cg.letterGrade}</span>
                                  <span className="text-xs text-gray-500">{cg.score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {trend.length >= 2 && (
                          <div className="p-5">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">Grade Trend</p>
                            <GradeTrendChart data={trend} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>{/* end left col */}

          {/* ── Right sidebar (1/3) ───────────────────────────────────── */}
          <div className="space-y-4">

            {/* Subscription card */}
            <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold mb-4">Subscription</h3>
              {sub ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Plan</span>
                    <span className="text-white font-medium">{PLAN_LABELS[sub.plan]}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Status</span>
                    <span className={`inline-flex items-center gap-1.5 font-medium ${STATUS_STYLES[sub.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {sub.status.charAt(0) + sub.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Renews</span>
                    <span className="text-white font-medium">
                      {new Date(sub.currentPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Students</span>
                    <span className="text-white font-medium">{children.length} / {maxStudents}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-500 mb-3">No active subscription.</p>
                  <Link href="/pricing" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    View plans →
                  </Link>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
              <nav className="space-y-1">
                {([
                  { label: 'View Course Catalog', href: '/courses' },
                  { label: 'Student Portfolios', href: '/dashboard/parent/portfolio' },
                  { label: 'Download Progress Report', href: '#', note: 'Coming soon' },
                  ...(sub?.plan === 'SINGLE' ? [{ label: 'Upgrade to Family Plan', href: '/pricing', highlight: true }] : []),
                ] as { label: string; href: string; note?: string; highlight?: boolean }[]).map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      link.highlight
                        ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <div className="flex items-center gap-2">
                      {link.note && <span className="text-xs text-gray-600">{link.note}</span>}
                      <ChevronRight />
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Support */}
            <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <h3 className="text-sm font-semibold mb-2">Need help?</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Questions about enrollment, curriculum, or your account? We&apos;re here.
              </p>
              <a
                href="mailto:support@thegospelacademy.com"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact support
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

          </div>{/* end sidebar */}
        </div>{/* end main grid */}
      </main>
    </div>
  )
}
