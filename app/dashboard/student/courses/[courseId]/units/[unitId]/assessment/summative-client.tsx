'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Pathway, RubricDimension } from '@/lib/types/curriculum'
import type { GradeMetadata } from '@/lib/types/assessment'

interface Props {
  courseId: string
  courseTitle: string
  unitTitle: string
  unitNumber: number
  lessonId: string
  lessonTitle: string
  pathway: Pathway
  projectTitle: string
  projectDescription: string
  rubric: RubricDimension[]
  objectives: string[]
  existingGrade: {
    score: number
    feedback: string
    attempt: number
    gradedAt: string
  } | null
}

interface GradeResult {
  score: number
  feedback: string
  strengths: string[]
  growthAreas: string[]
  attempt: number
}

export default function SummativeAssessmentClient({
  courseId, courseTitle, unitTitle, unitNumber, lessonId, lessonTitle,
  pathway, projectTitle, projectDescription, rubric, objectives, existingGrade,
}: Props) {
  const [response, setResponse] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<GradeResult | null>(() => {
    if (!existingGrade) return null
    try {
      const meta = JSON.parse(existingGrade.feedback) as GradeMetadata
      return {
        score: existingGrade.score,
        feedback: meta.aiResult?.feedback ?? 'No feedback available.',
        strengths: meta.aiResult?.strengths ?? [],
        growthAreas: meta.aiResult?.growthAreas ?? [],
        attempt: existingGrade.attempt,
      }
    } catch {
      return {
        score: existingGrade.score,
        feedback: existingGrade.feedback,
        strengths: [],
        growthAreas: [],
        attempt: existingGrade.attempt,
      }
    }
  })
  const [error, setError] = useState<string | null>(null)
  const [showRubric, setShowRubric] = useState(false)

  async function handleSubmit() {
    if (!response.trim()) {
      setError('Please write your response before submitting.')
      return
    }
    if (response.trim().length < 50) {
      setError('Your response is quite short. Try to write at least a few sentences.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          pathway,
          subType: 'summative',
          responses: response.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to submit. Please try again.')
        return
      }

      const data = await res.json()
      setResult(data)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const gradeColor = (score: number) =>
    score >= 90 ? 'text-emerald-400' : score >= 80 ? 'text-blue-400' : score >= 70 ? 'text-amber-400' : 'text-rose-400'

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-2 text-sm">
          <Link href={`/dashboard/student/courses/${courseId}`} className="text-gray-400 hover:text-white transition-colors">
            {courseTitle}
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-gray-500">Unit {unitNumber}</span>
          <span className="text-white/20">/</span>
          <span className="text-gray-300">Assessment</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-violet-400 bg-violet-500/10 ring-1 ring-violet-500/20 px-2.5 py-1 rounded-full">
              Summative
            </span>
            <span className="text-xs text-gray-500">{unitTitle}</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{projectTitle}</h1>
          <p className="text-gray-400 text-sm leading-relaxed">{projectDescription}</p>
        </div>

        {/* Objectives */}
        {objectives.length > 0 && (
          <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-5">
            <h2 className="text-sm font-semibold mb-3">Learning Objectives</h2>
            <ul className="space-y-1.5">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-blue-400 mt-0.5 shrink-0">{i + 1}.</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rubric */}
        {rubric.length > 0 && (
          <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
            <button
              onClick={() => setShowRubric(r => !r)}
              className="w-full flex items-center justify-between p-5 text-sm font-semibold hover:bg-white/2 transition-colors"
            >
              <span>Grading Rubric ({rubric.reduce((s, d) => s + d.maxPoints, 0)} total points)</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${showRubric ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {showRubric && (
              <div className="px-5 pb-5 space-y-3">
                {rubric.map((dim, i) => (
                  <div key={i} className="bg-white/3 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">{dim.dimension}</h3>
                      <span className="text-xs text-gray-500">{dim.maxPoints} pts</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="font-medium text-emerald-400 mb-1">Exemplary</p>
                        <p className="text-gray-500 leading-relaxed">{dim.descriptors.exemplary}</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-400 mb-1">Proficient</p>
                        <p className="text-gray-500 leading-relaxed">{dim.descriptors.proficient}</p>
                      </div>
                      <div>
                        <p className="font-medium text-amber-400 mb-1">Developing</p>
                        <p className="text-gray-500 leading-relaxed">{dim.descriptors.developing}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Result display */}
        {result && (
          <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Assessment Results</h2>
                <p className="text-xs text-gray-500 mt-0.5">Attempt #{result.attempt}</p>
              </div>
              <div className={`text-3xl font-bold ${gradeColor(result.score)}`}>
                {Math.round(result.score)}%
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">{result.feedback}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {result.strengths.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-emerald-400 mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                        <span className="text-emerald-400">+</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.growthAreas.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-amber-400 mb-2">Growth Areas</p>
                  <ul className="space-y-1">
                    {result.growthAreas.map((a, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                        <span className="text-amber-400">*</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setResult(null); setResponse('') }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Resubmit
              </button>
              <Link
                href={`/dashboard/student/courses/${courseId}`}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Back to course
              </Link>
            </div>
          </div>
        )}

        {/* Response textarea */}
        {!result && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-2">Your Response</label>
              <textarea
                value={response}
                onChange={e => setResponse(e.target.value)}
                placeholder="Write your response here. Take your time to address all parts of the assignment..."
                rows={12}
                className="w-full bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500/60 transition-colors resize-y leading-relaxed"
              />
              <div className="flex justify-between mt-1.5">
                <p className="text-xs text-gray-600">
                  {response.length > 0 ? `${response.trim().split(/\s+/).length} words` : 'Minimum 50 characters'}
                </p>
              </div>
            </div>

            {error && (
              <div className="px-3 py-2 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20">
                <p className="text-xs text-rose-400">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  AI is grading your work...
                </>
              ) : (
                'Submit Assessment'
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
