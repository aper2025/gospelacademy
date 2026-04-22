'use client'

import Link from 'next/link'
import { type SeedLesson, type SeedUnit, type SeedCourse } from '@/lib/data/course-seed'
import { useProgress, type LessonStatus } from '@/lib/hooks/use-progress'

// ─── Constants (mirror lesson + course view) ──────────────────────────────────

const SUBJECT_COLORS: Record<string, string> = {
  'Bible & Theology':    'text-violet-400 bg-violet-500/10 ring-violet-500/25',
  'Mathematics':         'text-blue-400 bg-blue-500/10 ring-blue-500/25',
  'Language Arts':       'text-emerald-400 bg-emerald-500/10 ring-emerald-500/25',
  'Science':             'text-amber-400 bg-amber-500/10 ring-amber-500/25',
  'History & Geography': 'text-rose-400 bg-rose-500/10 ring-rose-500/25',
}

// Weeks 1–3 = instruction, week 4 = project (3+1 rhythm labels)
const RHYTHM_LABEL: Record<number, { label: string; color: string; dot: string }> = {
  1: { label: 'Instruction Week 1', color: 'text-violet-400',  dot: 'bg-violet-400'  },
  2: { label: 'Instruction Week 2', color: 'text-blue-400',    dot: 'bg-blue-400'    },
  3: { label: 'Instruction Week 3', color: 'text-blue-400',    dot: 'bg-blue-400'    },
  4: { label: 'Project Week',       color: 'text-emerald-400', dot: 'bg-emerald-400' },
}

// Position of a lesson within its unit (1-based index within 4-lesson unit)
function weekPosition(lesson: SeedLesson, unit: SeedUnit): number {
  return lesson.weekNumber - unit.weekStart + 1
}

// ─── Status indicator ─────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: LessonStatus }) {
  if (status === 'completed') return (
    <span className="w-6 h-6 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  )
  if (status === 'in-progress') return (
    <span className="w-6 h-6 rounded-full bg-blue-500/15 ring-1 ring-blue-500/30 flex items-center justify-center shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
    </span>
  )
  return (
    <span className="w-6 h-6 rounded-full ring-1 ring-white/12 flex items-center justify-center shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
    </span>
  )
}

// ─── Lesson card ──────────────────────────────────────────────────────────────

function LessonCard({
  lesson,
  unit,
  courseId,
  status,
  isLast,
}: {
  lesson: SeedLesson
  unit: SeedUnit
  courseId: string
  status: LessonStatus
  isFirst: boolean
  isLast: boolean
}) {
  const pos      = weekPosition(lesson, unit)
  const rhythm   = RHYTHM_LABEL[pos] ?? RHYTHM_LABEL[1]
  const isProject = lesson.type === 'PROJECT'

  const cardBg = isProject
    ? 'bg-emerald-500/5 ring-emerald-500/15 hover:bg-emerald-500/8'
    : status === 'completed'
    ? 'bg-gray-900/50 ring-white/5 hover:bg-gray-900/70'
    : 'bg-gray-900 ring-white/8 hover:bg-gray-900/80'

  return (
    <div className="relative flex gap-4">
      {/* Vertical connector line */}
      <div className="flex flex-col items-center shrink-0">
        <StatusIcon status={status} />
        {!isLast && <div className="w-px flex-1 mt-1 bg-white/8 min-h-4" />}
      </div>

      {/* Card */}
      <Link
        href={`/dashboard/student/courses/${courseId}/lessons/${lesson.id}`}
        className={`group flex-1 rounded-xl ring-1 p-4 mb-4 transition-colors ${cardBg}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Rhythm label */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${rhythm.dot}`} />
              <span className={`text-xs font-medium ${rhythm.color}`}>{rhythm.label}</span>
              {isProject && (
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-1.5 py-0.5 rounded-md">
                  Project
                </span>
              )}
              {status === 'in-progress' && (
                <span className="text-xs font-medium text-blue-400 bg-blue-500/10 ring-1 ring-blue-500/20 px-1.5 py-0.5 rounded-md">
                  In Progress
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={`text-sm font-semibold leading-snug mb-1 ${
              status === 'completed' ? 'text-gray-500' : 'text-white group-hover:text-blue-300 transition-colors'
            }`}>
              {status === 'completed' && (
                <span className="line-through decoration-gray-600">{lesson.title}</span>
              )}
              {status !== 'completed' && lesson.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{lesson.description}</p>
          </div>

          {/* Right side: time + caret */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {lesson.estimatedMinutes}m
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors bg-white/5 group-hover:bg-blue-500/15 group-hover:text-blue-400 text-gray-500 ring-1 ring-white/8 group-hover:ring-blue-500/25">
              {status === 'completed' ? 'Review' : status === 'in-progress' ? 'Continue →' : 'Start →'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ─── 3+1 rhythm explainer ─────────────────────────────────────────────────────

function RhythmBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        { label: 'Instruction × 3',  color: 'text-violet-400 bg-violet-500/10 ring-violet-500/20' },
        { label: 'Project Week × 1', color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
      ].map(b => (
        <span key={b.label} className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${b.color}`}>
          {b.label}
        </span>
      ))}
    </div>
  )
}

// ─── Main client component ───────────────────────────────────────────────────

export default function UnitPageClient({
  course,
  unit,
  courseId,
}: {
  course: SeedCourse
  unit: SeedUnit
  courseId: string
}) {
  const progress = useProgress(courseId)

  const lessonIds = unit.lessons.map(l => l.id)
  const done      = progress.completedCount(lessonIds)
  const total     = lessonIds.length
  const pct       = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone   = done === total

  const subjectStyle = SUBJECT_COLORS[course.subject] ?? 'text-gray-400 bg-gray-500/10 ring-gray-500/20'

  // Adjacent units for navigation
  const unitIdx  = course.units.findIndex(u => u.id === unit.id)
  const prevUnit = unitIdx > 0 ? course.units[unitIdx - 1] : null
  const nextUnit = unitIdx < course.units.length - 1 ? course.units[unitIdx + 1] : null

  // Check if this unit is locked
  const isLocked = !progress.isUnitUnlocked(unitIdx, course.units)

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Locked unit banner ───────────────────────────────────────────── */}
      {isLocked && (
        <div className="bg-amber-500/10 border-b border-amber-500/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-400">This unit is locked</p>
              <p className="text-xs text-gray-400">
                Complete {prevUnit ? `Unit ${prevUnit.unitNumber}: ${prevUnit.title}` : 'the previous unit'} first to unlock this content.
              </p>
            </div>
            {prevUnit && (
              <Link
                href={`/dashboard/student/courses/${courseId}/units/${prevUnit.id}`}
                className="shrink-0 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 ring-1 ring-amber-500/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                Go to Unit {prevUnit.unitNumber}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Sticky nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href={`/dashboard/student/courses/${courseId}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5 text-xs overflow-hidden flex-1 min-w-0">
            <Link href="/dashboard/student" className="text-gray-500 hover:text-gray-300 shrink-0 transition-colors">Dashboard</Link>
            <span className="text-gray-700">/</span>
            <Link href={`/dashboard/student/courses/${courseId}`} className="text-gray-500 hover:text-gray-300 shrink-0 transition-colors truncate max-w-24">
              {course.title}
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400 truncate">Unit {unit.unitNumber}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Unit header card ────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-blue-500" />
          <div className="p-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${subjectStyle}`}>
                {course.subject}
              </span>
              <span className="text-xs text-gray-500 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full">
                Grade {course.gradeLevel}
              </span>
              <span className="text-xs text-gray-500 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full">
                Weeks {unit.weekStart}–{unit.weekEnd}
              </span>
            </div>

            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1">
              Unit {unit.unitNumber}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
              {unit.title}
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {unit.objectivesSummary}
            </p>

            {/* 3+1 rhythm badges */}
            <RhythmBadges />
          </div>

          {/* Progress bar */}
          <div className="border-t border-white/6 px-6 py-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Unit progress</span>
              <span className={`font-semibold ${allDone ? 'text-emerald-400' : 'text-white'}`}>
                {done}/{total} lessons complete
              </span>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-violet-500 to-blue-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {allDone && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Unit complete — well done!
              </p>
            )}
          </div>
        </div>

        {/* ── 3+1 rhythm explainer banner ─────────────────────────────────── */}
        <div className="rounded-xl bg-white/3 ring-1 ring-white/8 px-4 py-3 flex items-start gap-3">
          <svg className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="text-white font-medium">3+1 weekly rhythm:</span>{' '}
            Weeks 1–3 deliver instruction through Input → Processing → Output lessons.
            Week 4 is a dedicated <span className="text-emerald-400 font-medium">Project Week</span> where you apply everything from the unit in a single extended assignment.
          </p>
        </div>

        {/* ── Lesson list (timeline style) ────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 px-1">
            Lessons — Unit {unit.unitNumber}
          </h2>

          <div className="pl-1">
            {unit.lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                unit={unit}
                courseId={courseId}
                status={progress.status(lesson.id)}
                isFirst={i === 0}
                isLast={i === unit.lessons.length - 1}
              />
            ))}
          </div>
        </section>

        {/* ── Unit navigation ─────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {prevUnit ? (
            <Link
              href={`/dashboard/student/courses/${courseId}/units/${prevUnit.id}`}
              className="group flex items-center gap-3 rounded-xl bg-gray-900 ring-1 ring-white/8 hover:ring-white/15 p-4 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Previous unit</p>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                  Unit {prevUnit.unitNumber}: {prevUnit.title}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href={`/dashboard/student/courses/${courseId}`}
              className="group flex items-center gap-3 rounded-xl bg-gray-900 ring-1 ring-white/8 hover:ring-white/15 p-4 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              <div>
                <p className="text-xs text-gray-600">Back to course</p>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{course.title}</p>
              </div>
            </Link>
          )}

          {nextUnit ? (
            <Link
              href={`/dashboard/student/courses/${courseId}/units/${nextUnit.id}`}
              className="group flex items-center justify-between gap-3 rounded-xl bg-gray-900 ring-1 ring-white/8 hover:ring-blue-500/30 hover:bg-blue-500/5 p-4 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Next unit</p>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                  Unit {nextUnit.unitNumber}: {nextUnit.title}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ) : (
            <div className="rounded-xl bg-emerald-500/8 ring-1 ring-emerald-500/20 p-4 flex items-center gap-3">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div>
                <p className="text-xs text-emerald-500/70">Final unit</p>
                <p className="text-sm font-medium text-emerald-400">You&apos;ve reached the end of the course!</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
