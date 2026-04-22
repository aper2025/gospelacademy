'use client'

import { useState } from 'react'
import Link from 'next/link'
import { allLessonIds, type SeedCourse, type SeedUnit, type SeedLesson } from '@/lib/data/course-seed'
import { useProgress, type LessonStatus } from '@/lib/hooks/use-progress'
import type { Pathway } from '@/lib/types/curriculum'

// ─── Constants (match lesson view) ───────────────────────────────────────────

const PATHWAY_META: Record<Pathway, { label: string; text: string; bg: string; ring: string }> = {
  ADVANCED:   { label: 'Advanced Scholars', text: 'text-amber-400',   bg: 'bg-amber-500/10',   ring: 'ring-amber-500/30'   },
  STANDARD:   { label: 'Standard Academic', text: 'text-blue-400',    bg: 'bg-blue-500/10',    ring: 'ring-blue-500/30'    },
  VOCATIONAL: { label: 'Vocational',         text: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30' },
}

const SUBJECT_COLORS: Record<string, string> = {
  'Bible & Theology':    'text-violet-400 bg-violet-500/10 ring-violet-500/25',
  'Mathematics':         'text-blue-400 bg-blue-500/10 ring-blue-500/25',
  'Language Arts':       'text-emerald-400 bg-emerald-500/10 ring-emerald-500/25',
  'Science':             'text-amber-400 bg-amber-500/10 ring-amber-500/25',
  'History & Geography': 'text-rose-400 bg-rose-500/10 ring-rose-500/25',
}

// ─── Status indicator dot ─────────────────────────────────────────────────────

function StatusDot({ status }: { status: LessonStatus }) {
  if (status === 'completed') return (
    <span className="w-5 h-5 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 flex items-center justify-center shrink-0">
      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  )
  if (status === 'in-progress') return (
    <span className="w-5 h-5 rounded-full bg-blue-500/15 ring-1 ring-blue-500/30 flex items-center justify-center shrink-0">
      <span className="w-2 h-2 rounded-full bg-blue-400" />
    </span>
  )
  return (
    <span className="w-5 h-5 rounded-full ring-1 ring-white/15 flex items-center justify-center shrink-0">
      <span className="w-2 h-2 rounded-full bg-white/15" />
    </span>
  )
}

// ─── Lesson row inside the accordion ─────────────────────────────────────────

function LessonRow({
  lesson,
  courseId,
  unitId,
  status,
  locked,
}: {
  lesson: SeedLesson
  courseId: string
  unitId: string
  status: LessonStatus
  locked?: boolean
}) {
  const isProject = lesson.type === 'PROJECT'

  const Wrapper = locked ? 'div' : Link
  const wrapperProps = locked
    ? { className: 'group flex items-center gap-3 px-4 py-3 rounded-xl opacity-50 cursor-not-allowed' }
    : { href: `/dashboard/student/courses/${courseId}/lessons/${lesson.id}`, className: 'group flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors rounded-xl' }

  return (
    // @ts-expect-error -- dynamic tag union
    <Wrapper {...wrapperProps}>
      <StatusDot status={status} />

      {/* Week number */}
      <span className="text-xs font-mono text-gray-600 w-8 shrink-0 tabular-nums">
        W{lesson.weekNumber}
      </span>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-medium truncate ${status === 'completed' ? 'text-gray-400 line-through decoration-gray-600' : 'text-white group-hover:text-blue-300 transition-colors'}`}>
            {lesson.title}
          </span>
          {isProject && (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-1.5 py-0.5 rounded-md shrink-0">
              Project
            </span>
          )}
          {status === 'in-progress' && (
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 ring-1 ring-blue-500/20 px-1.5 py-0.5 rounded-md shrink-0">
              In Progress
            </span>
          )}
        </div>
        <p className="text-xs text-gray-600 truncate mt-0.5 hidden sm:block">{lesson.description}</p>
      </div>

      {/* Time */}
      <span className="text-xs text-gray-600 flex items-center gap-1 shrink-0">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {lesson.estimatedMinutes}m
      </span>

      {/* Chevron */}
      <svg className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </Wrapper>
  )
}

// ─── Unit accordion card ──────────────────────────────────────────────────────

function UnitAccordion({
  unit,
  courseId,
  defaultOpen,
  progress,
  locked,
}: {
  unit: SeedUnit
  courseId: string
  defaultOpen: boolean
  progress: ReturnType<typeof useProgress>
  locked?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen && !locked)
  const lessonIds      = unit.lessons.map(l => l.id)
  const done           = progress.completedCount(lessonIds)
  const total          = lessonIds.length
  const pct            = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone        = done === total

  return (
    <div className={`rounded-2xl overflow-hidden ring-1 transition-colors ${locked ? 'bg-gray-900/40 ring-white/5 opacity-60' : allDone ? 'bg-gray-900/60 ring-white/5' : 'bg-gray-900 ring-white/8'}`}>
      {/* Unit header button */}
      <button
        onClick={() => !locked && setOpen(o => !o)}
        className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left ${locked ? 'cursor-not-allowed' : 'hover:bg-white/3'}`}
      >
        {/* Unit number badge */}
        <span className={`w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
          locked
            ? 'bg-white/5 ring-1 ring-white/10 text-gray-600'
            : allDone
            ? 'bg-emerald-500/15 ring-1 ring-emerald-500/25 text-emerald-400'
            : open
            ? 'bg-violet-500/15 ring-1 ring-violet-500/25 text-violet-400'
            : 'bg-white/5 ring-1 ring-white/10 text-gray-500'
        }`}>
          {locked
            ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            : allDone
            ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            : unit.unitNumber
          }
        </span>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white truncate">{unit.title}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">Weeks {unit.weekStart}–{unit.weekEnd}</span>
            <span className="text-gray-700 text-xs">·</span>
            <span className={`text-xs font-medium ${locked ? 'text-gray-600' : allDone ? 'text-emerald-400' : 'text-gray-500'}`}>
              {locked ? 'Complete previous unit to unlock' : `${done}/${total} complete`}
            </span>
          </div>
        </div>

        {/* Mini progress bar + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block w-20 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${allDone ? 'bg-emerald-500' : 'bg-violet-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Lesson list */}
      {open && (
        <div className="border-t border-white/5 px-2 py-2">
          {/* Unit link */}
          <Link
            href={`/dashboard/student/courses/${courseId}/units/${unit.id}`}
            className="flex items-center gap-2 px-4 py-2 mb-1 text-xs text-gray-500 hover:text-blue-400 hover:bg-white/3 rounded-xl transition-colors group"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            <span className="group-hover:underline">Unit overview &amp; objectives</span>
          </Link>

          <div className="space-y-0.5">
            {unit.lessons.map(lesson => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                courseId={courseId}
                unitId={unit.id}
                status={progress.status(lesson.id)}
                locked={locked}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main client component ───────────────────────────────────────────────────

export default function CoursePageClient({
  course,
  courseId,
}: {
  course: SeedCourse
  courseId: string
}) {
  const progress = useProgress(courseId)

  const [activePathway] = useState<Pathway>('STANDARD')
  const pm = PATHWAY_META[activePathway]
  const subjectStyle = SUBJECT_COLORS[course.subject] ?? 'text-gray-400 bg-gray-500/10 ring-gray-500/20'

  const lessonIds    = allLessonIds(course)
  const totalLessons = lessonIds.length
  const doneCount    = progress.completedCount(lessonIds)
  const overallPct   = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0

  const totalHours   = Math.round(
    course.units.flatMap(u => u.lessons).reduce((s, l) => s + l.estimatedMinutes, 0) / 60
  )

  // Default open: the first unit with an incomplete lesson
  const firstIncompleteUnitIdx = course.units.findIndex(
    u => !u.lessons.every(l => progress.isComplete(l.id))
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Sticky nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/dashboard/student"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5 text-xs overflow-hidden flex-1 min-w-0">
            <Link href="/dashboard/student" className="text-gray-500 hover:text-gray-300 transition-colors shrink-0">Dashboard</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400 truncate">{course.title}</span>
          </div>
          <span className={`hidden sm:inline text-xs font-medium px-2.5 py-1 rounded-full ring-1 shrink-0 ${subjectStyle}`}>
            {course.subject}
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Course header card ──────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
          {/* Accent bar */}
          <div className="h-1 bg-gradient-to-r from-violet-500 to-blue-500" />

          <div className="p-6">
            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${subjectStyle}`}>
                {course.subject}
              </span>
              <span className="text-xs text-gray-500 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full">
                Grade {course.gradeLevel}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${pm.bg} ${pm.ring} ${pm.text}`}>
                {pm.label}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{course.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              {[
                { label: 'Units',   value: course.units.length },
                { label: 'Lessons', value: totalLessons },
                { label: 'Hours',   value: `~${totalHours}h` },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white/3 ring-1 ring-white/6 px-3 sm:px-4 py-3">
                  <p className="text-base sm:text-lg font-bold text-white">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Overall progress */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Overall progress</span>
                <span className="font-semibold text-white">{doneCount}/{totalLessons} lessons · {overallPct}%</span>
              </div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Course Complete Card ──────────────────────────────────────── */}
        {overallPct === 100 && (
          <div className="space-y-3">
            {/* Final Exam CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/10 ring-1 ring-blue-500/25 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 ring-1 ring-blue-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-400 mb-1">Final Exam</h3>
                  <p className="text-sm text-gray-400">All lessons complete! Take the final exam to demonstrate your mastery of this course.</p>
                </div>
                <Link
                  href={`/dashboard/student/courses/${courseId}/final-exam`}
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Take Exam
                </Link>
              </div>
            </div>

            {/* Certificate */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 ring-1 ring-emerald-500/25 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-400 mb-1">Course Complete!</h3>
                  <p className="text-sm text-gray-400">Congratulations on finishing all {totalLessons} lessons. Download your certificate below.</p>
                </div>
                <a
                  href={`/api/certificate?courseId=${courseId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Certificate
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Unit accordions ─────────────────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1">
            Course Units
          </h2>
          <div className="space-y-3">
            {course.units.map((unit, idx) => (
              <UnitAccordion
                key={unit.id}
                unit={unit}
                courseId={courseId}
                defaultOpen={idx === Math.max(0, firstIncompleteUnitIdx)}
                progress={progress}
                locked={!progress.isUnitUnlocked(idx, course.units)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
