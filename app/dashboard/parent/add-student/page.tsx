'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Pathway = 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
type Scheduling = '12-Month Mastery' | '10-Month Classic'

const GRADE_OPTIONS = [
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
] as const

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

interface FieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}

function Field({ label, required, children, hint }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-600 mt-1.5">{hint}</p>}
    </div>
  )
}

export default function AddStudentPage() {
  const router = useRouter()

  const [firstName, setFirstName]           = useState('')
  const [lastName, setLastName]             = useState('')
  const [gradeLevel, setGradeLevel]         = useState<number | ''>('')
  const [pathway, setPathway]               = useState<Pathway>('STANDARD')
  const [schedulingOption, setScheduling]   = useState<Scheduling>('10-Month Classic')
  const [dateOfBirth, setDateOfBirth]       = useState('')
  const [submitting, setSubmitting]         = useState(false)
  const [error, setError]                   = useState<string | null>(null)

  const isValid = firstName.trim() && lastName.trim() && gradeLevel !== ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/parent/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gradeLevel: Number(gradeLevel),
          pathway,
          schedulingOption,
          dateOfBirth: dateOfBirth || undefined,
        }),
      })

      const data = await res.json() as {
        success?: boolean
        studentId?: string
        error?: string
        redirectTo?: string
      }

      if (!res.ok || !data.success) {
        // API signals we should redirect (e.g. no subscription, plan limit reached)
        if (data.redirectTo) {
          router.push(data.redirectTo)
          return
        }
        throw new Error(data.error ?? 'Failed to add student.')
      }

      router.push('/dashboard/parent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Nav */}
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-3">
          <Link
            href="/dashboard/parent"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Back to dashboard"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <span className="text-sm font-semibold">The Gospel Academy</span>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-sm text-gray-400">Add Student</span>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Add a student</h1>
          <p className="text-gray-400 text-sm">
            Set up your student&apos;s profile, pathway, and schedule. You can always change these later.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-8">

            {/* ── Name ─────────────────────────────────────────────────── */}
            <section className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Student info</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" required>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Emma"
                    autoComplete="given-name"
                    className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </Field>

                <Field label="Last name" required>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Johnson"
                    autoComplete="family-name"
                    className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Grade level" required>
                  <select
                    value={gradeLevel}
                    onChange={e => setGradeLevel(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select grade…</option>
                    {GRADE_OPTIONS.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Date of birth" hint="Optional — used for age verification only">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-800 border border-white/8 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </Field>
              </div>
            </section>

            {/* ── Pathway ──────────────────────────────────────────────── */}
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

            {/* ── Scheduling ───────────────────────────────────────────── */}
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

            {/* ── Error ────────────────────────────────────────────────── */}
            {error && (
              <div className="text-sm text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* ── Actions ──────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={!isValid || submitting}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Adding student…
                  </>
                ) : 'Add Student'}
              </button>
              <Link
                href="/dashboard/parent"
                className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 transition-colors"
              >
                Cancel
              </Link>
            </div>

          </div>
        </form>
      </main>
    </div>
  )
}
