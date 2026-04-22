'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Subject = 'Bible & Theology' | 'Mathematics' | 'Language Arts' | 'English Language Arts' | 'Science' | 'History & Geography'
type ApiPathway = 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'

interface Course {
  id: string
  title: string
  subject: string
  gradeLevelMin: number
  gradeLevelMax: number
}

const SUBJECTS = ['All', 'Bible & Theology', 'Mathematics', 'Language Arts', 'English Language Arts', 'Science', 'History & Geography'] as const
type SubjectFilter = typeof SUBJECTS[number]

const SUBJECT_STYLES: Record<string, { badge: string; dot: string; accent: string }> = {
  'Bible & Theology':        { badge: 'text-violet-400 bg-violet-500/10 ring-violet-500/20',   dot: 'bg-violet-400',  accent: 'bg-violet-400' },
  'Mathematics':             { badge: 'text-blue-400 bg-blue-500/10 ring-blue-500/20',          dot: 'bg-blue-400',    accent: 'bg-blue-400' },
  'Language Arts':           { badge: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20', dot: 'bg-emerald-400', accent: 'bg-emerald-400' },
  'English Language Arts':   { badge: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20', dot: 'bg-emerald-400', accent: 'bg-emerald-400' },
  'Science':                 { badge: 'text-amber-400 bg-amber-500/10 ring-amber-500/20',       dot: 'bg-amber-400',   accent: 'bg-amber-400' },
  'History & Geography':     { badge: 'text-rose-400 bg-rose-500/10 ring-rose-500/20',          dot: 'bg-rose-400',    accent: 'bg-rose-400' },
}

import { gradeLevelLabel, gradeLevelRange } from '@/lib/grade-labels'

const PATHWAY_OPTIONS: { label: string; value: ApiPathway; description: string; color: string; ring: string }[] = [
  {
    label: 'Advanced Scholars',
    value: 'ADVANCED',
    description: 'Rigorous, college-preparatory pace for high-achieving students.',
    color: 'text-violet-400',
    ring: 'ring-violet-500/40 bg-violet-500/10',
  },
  {
    label: 'Standard Academic',
    value: 'STANDARD',
    description: 'Well-rounded, biblically-integrated education at a steady pace.',
    color: 'text-blue-400',
    ring: 'ring-blue-500/40 bg-blue-500/10',
  },
  {
    label: 'Vocational',
    value: 'VOCATIONAL',
    description: 'Practical skills training woven with faith principles.',
    color: 'text-amber-400',
    ring: 'ring-amber-500/40 bg-amber-500/10',
  },
]

export default function CourseCatalogPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<SubjectFilter>('All')
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set())
  const [modalCourse, setModalCourse] = useState<Course | null>(null)
  const [selectedPathway, setSelectedPathway] = useState<ApiPathway>('STANDARD')
  const [enrolling, setEnrolling] = useState(false)
  const [enrollError, setEnrollError] = useState<string | null>(null)

  const filtered = activeFilter === 'All'
    ? courses
    : courses.filter((c) => c.subject === activeFilter)

  // Fetch courses + enrollment status on mount
  const fetchEnrollments = useCallback(async () => {
    try {
      const res = await fetch('/api/courses')
      if (!res.ok) return
      const data = await res.json() as { courses?: Course[]; enrolledCourseIds?: string[] }
      if (data.courses) {
        setCourses(data.courses)
      }
      if (data.enrolledCourseIds) {
        setEnrolledIds(new Set(data.enrolledCourseIds))
      }
    } catch {
      // non-fatal — unauthenticated users see "Enroll" buttons normally
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  function openModal(course: Course) {
    setModalCourse(course)
    setSelectedPathway('STANDARD')
    setEnrollError(null)
  }

  function closeModal() {
    if (enrolling) return
    setModalCourse(null)
    setEnrollError(null)
  }

  async function handleEnroll() {
    if (!modalCourse || enrolling) return
    setEnrolling(true)
    setEnrollError(null)

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: modalCourse.id, pathway: selectedPathway }),
      })

      if (res.status === 401) {
        router.push('/login')
        return
      }

      const data = await res.json() as {
        success?: boolean
        alreadyEnrolled?: boolean
        error?: string
        redirectTo?: string
      }

      if (!res.ok) {
        if (data.redirectTo) {
          router.push(data.redirectTo)
          return
        }
        throw new Error(data.error ?? 'Enrollment failed.')
      }

      // Mark as enrolled locally
      setEnrolledIds((prev) => new Set([...prev, modalCourse.id]))
      setModalCourse(null)

      // Brief delay so the card "Enrolled!" state is visible before navigating
      setTimeout(() => router.push('/dashboard/student'), 800)
    } catch (err) {
      setEnrollError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Nav */}
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            The Gospel Academy
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2">
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-blue-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {courses.length} courses · Pre-K through Grade 12
          </div>
          <h1 className="text-4xl font-bold mb-3">Course Catalog</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Explore all available courses across five core subjects. Every course is taught through
            a biblical worldview and aligned to one of our three learning pathways.
          </p>
        </div>

        {/* Subject filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SUBJECTS.map((subject) => {
            const isActive = activeFilter === subject
            const count = subject === 'All'
              ? courses.length
              : courses.filter((c) => c.subject === subject).length
            if (subject !== 'All' && count === 0) return null

            return (
              <button
                key={subject}
                onClick={() => setActiveFilter(subject)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ring-1 ${
                  isActive
                    ? 'bg-blue-600 text-white ring-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/8 ring-white/8'
                }`}
              >
                {subject !== 'All' && (
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white' : SUBJECT_STYLES[subject as Subject]?.dot ?? 'bg-gray-400'
                  }`} />
                )}
                {subject}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/8 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {loading ? 'Loading courses…' : <>
            Showing <span className="text-white font-medium">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'All' && <> in <span className="text-white font-medium">{activeFilter}</span></>}
          </>}
        </p>

        {/* Course grid */}
        {!loading && filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg font-medium mb-1">No courses found</p>
            <p className="text-sm">Try selecting a different subject filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => {
              const subjectStyle = SUBJECT_STYLES[course.subject] ?? { badge: 'text-gray-400 bg-gray-500/10 ring-gray-500/20', dot: 'bg-gray-400', accent: 'bg-gray-400' }
              const isEnrolled = enrolledIds.has(course.id)
              const gradeLabel = gradeLevelRange(course.gradeLevelMin, course.gradeLevelMax)

              return (
                <div
                  key={course.id}
                  className="flex flex-col bg-gray-900 rounded-2xl ring-1 ring-white/8 hover:ring-white/20 transition-all group overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className={`h-0.5 w-full ${subjectStyle.accent}`} />

                  <div className="flex flex-col flex-1 p-6">
                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${subjectStyle.badge}`}>
                        {course.subject}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full ring-1 text-gray-400 bg-white/5 ring-white/10">
                        {gradeLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <h3 className="text-base font-semibold leading-snug group-hover:text-white transition-colors mb-1">
                        {course.title}
                      </h3>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Enroll button */}
                    {isEnrolled ? (
                      <div className="inline-flex items-center justify-center gap-2 w-full bg-emerald-500/10 text-emerald-400 text-sm font-medium px-4 py-2.5 rounded-xl ring-1 ring-emerald-500/20">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Enrolled
                      </div>
                    ) : (
                      <button
                        onClick={() => openModal(course)}
                        className="inline-flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all"
                      >
                        Enroll in this course
                        <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Not sure which pathway is right for your student?
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Create an account to enroll
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} The Gospel Academy. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Sign in</Link>
            <Link href="/register" className="hover:text-gray-300 transition-colors">Register</Link>
          </div>
        </div>
      </footer>

      {/* Pathway selection modal */}
      {modalCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="w-full max-w-md bg-gray-900 rounded-2xl ring-1 ring-white/10 shadow-2xl">

            {/* Modal header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Enrolling in</p>
                  <h2 className="text-lg font-semibold">{modalCourse.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">Grade {modalCourse.gradeLevelMin} · {modalCourse.subject}</p>
                </div>
                <button
                  onClick={closeModal}
                  disabled={enrolling}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition-colors disabled:opacity-40"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pathway selection */}
            <div className="p-6">
              <p className="text-sm font-medium mb-4">Choose your learning pathway</p>
              <div className="space-y-3">
                {PATHWAY_OPTIONS.map((option) => {
                  const isSelected = selectedPathway === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedPathway(option.value)}
                      disabled={enrolling}
                      className={`w-full text-left p-4 rounded-xl ring-1 transition-all disabled:opacity-50 ${
                        isSelected
                          ? `${option.ring} ring-2`
                          : 'bg-white/3 ring-white/8 hover:bg-white/6 hover:ring-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'border-current bg-current' : 'border-gray-600'
                        } ${option.color}`}>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                          )}
                        </span>
                        <div>
                          <p className={`text-sm font-medium ${isSelected ? option.color : 'text-white'}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Error */}
              {enrollError && (
                <p className="mt-4 text-xs text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20 px-4 py-2.5 rounded-lg">
                  {enrollError}
                </p>
              )}
            </div>

            {/* Modal actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={closeModal}
                disabled={enrolling}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 transition-all disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {enrolling ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enrolling…
                  </>
                ) : (
                  'Confirm Enrollment'
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
