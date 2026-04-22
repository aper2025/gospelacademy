'use client'

import { useState } from 'react'
import type { Pathway, ContentBlock } from '@/lib/types/curriculum'

interface Props {
  lessonId: string
  pathway: Pathway
  outputBlocks: ContentBlock[]
  answers: Record<string, string>
}

interface QuestionScore {
  questionId: string
  score: number
  feedback: string
  correct: boolean
}

interface GradeResult {
  score: number
  feedback: string
  strengths: string[]
  growthAreas: string[]
  questionScores?: QuestionScore[]
  attempt: number
}

export default function FormativeCheckCard({ lessonId, pathway, outputBlocks, answers }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<GradeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Find gradable blocks
  const gradableBlocks = outputBlocks.filter(b =>
    (b.type === 'discussion' && b.isGraded) || b.type === 'practice'
  )

  if (gradableBlocks.length === 0) return null

  // Check if student has answered any questions
  const answeredQuestions = gradableBlocks.filter((_, i) => {
    const key = `practice-${i}` // matches lesson-page-client answer keys
    return answers[key]?.trim()
  })

  // Also check discussion keys
  const answeredDiscussions = gradableBlocks.filter((b, i) => {
    if (b.type === 'discussion') {
      const key = `discussion-${i}`
      return answers[key]?.trim()
    }
    return false
  })

  const totalAnswered = new Set([
    ...answeredQuestions.map((_, i) => i),
    ...answeredDiscussions.map((_, i) => i),
  ])

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    // Build responses from answers
    const responses = gradableBlocks.map((block, i) => {
      const practiceKey = `practice-${i}`
      const discussionKey = `discussion-${i}`
      const answer = answers[practiceKey] || answers[discussionKey] || ''
      return { questionId: `q-${i}`, answer }
    }).filter(r => r.answer.trim())

    if (responses.length === 0) {
      setError('Please answer at least one question before submitting.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          pathway,
          subType: 'formative',
          responses,
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

  if (result) {
    return (
      <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/25 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Comprehension Check Complete</h3>
                <p className="text-xs text-gray-500">Attempt #{result.attempt}</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${result.score >= 80 ? 'text-emerald-400' : result.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              {Math.round(result.score)}%
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-300 leading-relaxed">{result.feedback}</p>

          {result.strengths.length > 0 && (
            <div>
              <p className="text-xs font-medium text-emerald-400 mb-1.5">Strengths</p>
              <ul className="space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-emerald-400 mt-0.5">+</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.growthAreas.length > 0 && (
            <div>
              <p className="text-xs font-medium text-amber-400 mb-1.5">Areas to Grow</p>
              <ul className="space-y-1">
                {result.growthAreas.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-amber-400 mt-0.5">*</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.questionScores && result.questionScores.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Question Breakdown</p>
              <div className="space-y-1.5">
                {result.questionScores.map((qs, i) => (
                  <div key={qs.questionId} className="flex items-center gap-2 text-xs">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${qs.correct ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                      {i + 1}
                    </span>
                    <span className="text-gray-400 flex-1">{qs.feedback}</span>
                    <span className={`font-medium ${qs.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {qs.score}pt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Comprehension Check</h3>
          <p className="text-xs text-gray-500">
            {gradableBlocks.length} question{gradableBlocks.length !== 1 ? 's' : ''} — answer above, then submit here
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20">
          <p className="text-xs text-rose-400">{error}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-medium py-3 rounded-xl transition-colors"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            Grading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            Submit for Grading
          </>
        )}
      </button>
    </div>
  )
}
