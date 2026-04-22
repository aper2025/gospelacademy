'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Pathway = 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
type Scheduling = '12-Month Mastery' | '10-Month Classic'

const GRADE_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'Pre-K' },
  { value: 1, label: 'Kindergarten' },
  { value: 2, label: 'Grade 1' },
  { value: 3, label: 'Grade 2' },
  { value: 4, label: 'Grade 3' },
  { value: 5, label: 'Grade 4' },
  { value: 6, label: 'Grade 5' },
  { value: 7, label: 'Grade 6' },
  { value: 8, label: 'Grade 7' },
  { value: 9, label: 'Grade 8 / Grade 9' },
  { value: 10, label: 'Grade 10' },
  { value: 11, label: 'Grade 11' },
  { value: 12, label: 'Grade 12' },
]

function gradeLabel(value: number | ''): string {
  if (value === '') return ''
  return GRADE_OPTIONS.find(g => g.value === value)?.label ?? `Grade ${value}`
}

const PATHWAY_OPTIONS: { value: Pathway; label: string; description: string; color: string; ring: string; text: string }[] = [
  {
    value: 'ADVANCED',
    label: 'Advanced Scholars',
    description: 'Rigorous, college-preparatory pace for high-achieving students.',
    color: 'bg-amber-500/10',
    ring: 'ring-amber-500/40',
    text: 'text-amber-400',
  },
  {
    value: 'STANDARD',
    label: 'Standard Academic',
    description: 'Well-rounded, biblically-integrated education at a steady pace.',
    color: 'bg-blue-500/10',
    ring: 'ring-blue-500/40',
    text: 'text-blue-400',
  },
  {
    value: 'VOCATIONAL',
    label: 'Vocational',
    description: 'Practical skills training woven with faith principles.',
    color: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/40',
    text: 'text-emerald-400',
  },
]

const SCHEDULING_OPTIONS: { value: Scheduling; label: string; description: string }[] = [
  {
    value: '12-Month Mastery',
    label: '12-Month Mastery',
    description: '3 weeks academic + 1 week project-based, year-round.',
  },
  {
    value: '10-Month Classic',
    label: '10-Month Classic',
    description: 'Traditional August–May school year calendar.',
  },
]

const SUBJECT_COLORS: Record<string, string> = {
  'Bible & Theology': 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
  'Mathematics': 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  'Language Arts': 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  'Science': 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  'History': 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
}

interface CourseOption {
  id: string
  title: string
  subject: string
  gradeLevelMin: number
  gradeLevelMax: number
}

// Courses fetched from database

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 2: Student info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gradeLevel, setGradeLevel] = useState<number | ''>('')
  const [pathway, setPathway] = useState<Pathway>('STANDARD')
  const [schedulingOption, setScheduling] = useState<Scheduling>('10-Month Classic')

  // Step 3: Course selection
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [allCourses, setAllCourses] = useState<CourseOption[]>([])

  // Fetch courses from DB on mount
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then((data: { courses?: CourseOption[] }) => {
        if (data.courses) setAllCourses(data.courses)
      })
      .catch(() => {})
  }, [])

  const filteredCourses = gradeLevel !== ''
    ? allCourses.filter(c => gradeLevel >= c.gradeLevelMin && gradeLevel <= c.gradeLevelMax)
    : []

  // Reset course selection when grade changes
  useEffect(() => {
    setSelectedCourse(null)
  }, [gradeLevel])

  const canProceedStep2 = firstName.trim() && lastName.trim() && gradeLevel !== ''
  const canProceedStep3 = selectedCourse !== null

  async function handleComplete() {
    if (submitting) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gradeLevel: Number(gradeLevel),
          pathway,
          schedulingOption,
          courseId: selectedCourse,
        }),
      })

      const data = await res.json() as { success?: boolean; error?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Something went wrong.')
      }

      router.push('/dashboard/parent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
    }
  }

  const selectedCourseData = allCourses.find(c => c.id === selectedCourse)

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Progress bar */}
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">The Gospel Academy</span>
            <span className="text-xs text-gray-500">Step {step} of 4</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 ring-1 ring-blue-500/30 flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Welcome to The Gospel Academy!
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Let&apos;s get your family set up. In the next few steps, you&apos;ll add your first
              student and choose their first course.
            </p>

            <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 max-w-sm mx-auto mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">I&apos;m a parent enrolling my child</p>
                  <p className="text-xs text-gray-500">You&apos;ll manage your student&apos;s account</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Let&apos;s get started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}

        {/* Step 2: Add student */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold mb-1">Add your first student</h1>
            <p className="text-gray-400 text-sm mb-8">
              Tell us about your child so we can personalize their experience.
            </p>

            <div className="space-y-8">
              {/* Student info */}
              <section className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 space-y-5">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Student Info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      First name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Emma"
                      className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Last name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Johnson"
                      className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Grade level <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={e => setGradeLevel(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select grade&hellip;</option>
                    {GRADE_OPTIONS.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Pathway */}
              <section className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-0.5">Academic Pathway</h2>
                  <p className="text-xs text-gray-500">Choose the learning track that fits your student&apos;s goals.</p>
                </div>
                <div className="space-y-3">
                  {PATHWAY_OPTIONS.map(opt => {
                    const selected = pathway === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPathway(opt.value)}
                        className={`w-full text-left p-4 rounded-xl ring-1 transition-all ${
                          selected
                            ? `${opt.color} ${opt.ring} ring-2`
                            : 'bg-white/3 ring-white/8 hover:bg-white/6 hover:ring-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selected ? `border-current ${opt.text}` : 'border-gray-600'
                          }`}>
                            {selected && <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
                          </span>
                          <div>
                            <p className={`text-sm font-semibold ${selected ? opt.text : 'text-white'}`}>{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Scheduling */}
              <section className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-0.5">Scheduling Option</h2>
                  <p className="text-xs text-gray-500">Choose a calendar format that works for your family.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SCHEDULING_OPTIONS.map(opt => {
                    const selected = schedulingOption === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setScheduling(opt.value)}
                        className={`text-left p-4 rounded-xl ring-1 transition-all ${
                          selected
                            ? 'bg-blue-500/10 ring-blue-500/40 ring-2'
                            : 'bg-white/3 ring-white/8 hover:bg-white/6 hover:ring-white/15'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            selected ? 'border-blue-400 text-blue-400' : 'border-gray-600'
                          }`}>
                            {selected && <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
                          </span>
                          <div>
                            <p className={`text-sm font-semibold ${selected ? 'text-blue-400' : 'text-white'}`}>{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Navigation */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Choose course */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold mb-1">Choose a first course</h1>
            <p className="text-gray-400 text-sm mb-8">
              Pick a course for {firstName || 'your student'} to start with. You can add more courses later.
            </p>

            {filteredCourses.length === 0 ? (
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-8 text-center">
                <p className="text-gray-500 text-sm">No courses available for the selected grade level.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {filteredCourses.map(course => {
                  const selected = selectedCourse === course.id
                  const colorClasses = SUBJECT_COLORS[course.subject] || 'bg-gray-500/10 text-gray-400 ring-gray-500/20'
                  return (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={`text-left p-5 rounded-2xl ring-1 transition-all ${
                        selected
                          ? 'bg-blue-500/10 ring-blue-500/40 ring-2'
                          : 'bg-gray-900 ring-white/8 hover:ring-white/20'
                      }`}
                    >
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ring-1 mb-3 ${colorClasses}`}>
                        {course.subject}
                      </span>
                      <p className="text-base font-semibold mb-1">{course.title}</p>
                      <p className="text-xs text-gray-500">
                        {course.gradeLevelMin === course.gradeLevelMax
                          ? gradeLabel(course.gradeLevelMin)
                          : `${gradeLabel(course.gradeLevelMin)} – ${gradeLabel(course.gradeLevelMax)}`}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(4)}
                disabled={!canProceedStep3}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <h1 className="text-2xl font-bold mb-1">You&apos;re all set!</h1>
            <p className="text-gray-400 text-sm mb-8">
              Review your choices below, then hit &ldquo;Get Started&rdquo; to begin.
            </p>

            <div className="space-y-4 mb-8">
              {/* Student summary */}
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Student</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium">{firstName} {lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Grade</span>
                    <span className="font-medium">{gradeLabel(gradeLevel)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pathway</span>
                    <span className="font-medium">
                      {PATHWAY_OPTIONS.find(p => p.value === pathway)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Schedule</span>
                    <span className="font-medium">{schedulingOption}</span>
                  </div>
                </div>
              </div>

              {/* Course summary */}
              <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">First Course</h2>
                {selectedCourseData && (
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${
                      SUBJECT_COLORS[selectedCourseData.subject] || ''
                    }`}>
                      {selectedCourseData.subject}
                    </span>
                    <span className="text-sm font-medium">{selectedCourseData.title}</span>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="text-sm text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleComplete}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Setting up&hellip;
                  </>
                ) : (
                  <>
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={submitting}
                className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
