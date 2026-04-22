'use client'

import { useState, useEffect } from 'react'
import type { AdvancedExtension } from '@/lib/types/curriculum'

interface Props {
  extension: AdvancedExtension
  lessonId: string
}

export default function AdvancedExtensionCard({ extension, lessonId }: Props) {
  const [open, setOpen] = useState(false)
  const [attempt, setAttempt] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [tracked, setTracked] = useState(false)

  // Check if student already attempted this extension
  useEffect(() => {
    fetch(`/api/extension-attempt?lessonId=${lessonId}`)
      .then(r => r.json())
      .then(data => {
        if (data.attempt) {
          setSubmitted(true)
          setTracked(true)
          if (data.attempt.revealed) setShowSolution(true)
        }
      })
      .catch(() => {})
  }, [lessonId])

  async function trackAttempt(revealed: boolean) {
    try {
      await fetch('/api/extension-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, attempted: true, revealed }),
      })
      setTracked(true)
    } catch { /* ok */ }
  }

  function handleSubmitAttempt() {
    if (!attempt.trim()) return
    setSubmitted(true)
    if (!tracked) trackAttempt(false)
  }

  function handleRevealSolution() {
    setShowSolution(true)
    trackAttempt(true)
  }

  return (
    <section id="advanced-extension" className="space-y-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 ring-1 ring-amber-500/20 hover:ring-amber-500/30 px-6 py-5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 ring-1 ring-amber-500/25 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-base font-semibold text-white">SAT/ACT Challenge</p>
            <p className="text-xs text-gray-500">Push yourself with a higher-order thinking question</p>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="rounded-2xl bg-gray-900/50 ring-1 ring-amber-500/10 overflow-hidden">
          {/* Question */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {extension.difficulty === 'hard' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
                  Hard
                </span>
              )}
              {extension.difficulty === 'medium' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
                  Medium
                </span>
              )}
              {extension.source && (
                <span className="text-xs text-gray-500">{extension.source}</span>
              )}
            </div>

            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{extension.question}</p>
            </div>

            {/* Skill tags */}
            {extension.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {extension.skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 ring-1 ring-white/8">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Student attempt area */}
          {!submitted && (
            <div className="px-6 pb-6">
              <label className="block text-xs font-medium text-gray-400 mb-2">Your work (show your reasoning)</label>
              <textarea
                value={attempt}
                onChange={e => setAttempt(e.target.value)}
                placeholder="Work through the problem here... Show your steps."
                rows={5}
                className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-y leading-relaxed"
              />
              <button
                onClick={handleSubmitAttempt}
                disabled={!attempt.trim()}
                className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit My Attempt
              </button>
            </div>
          )}

          {/* After submitting attempt */}
          {submitted && !showSolution && (
            <div className="px-6 pb-6 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm text-emerald-400 font-medium">Attempt recorded</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ready to see the detailed solution? Take a moment to review your work first.
              </p>
              <button
                onClick={handleRevealSolution}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 ring-1 ring-white/10 text-gray-300 hover:bg-white/10 transition-colors"
              >
                Reveal Solution
              </button>
            </div>
          )}

          {/* Solution reveal */}
          {showSolution && (
            <div className="border-t border-amber-500/10">
              <div className="p-6 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/15 ring-1 ring-amber-500/25 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-amber-400">Solution</span>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                  <p className="text-xs font-semibold text-amber-300 uppercase tracking-wide mb-1">Answer</p>
                  <p className="text-sm font-medium text-white">{extension.answer}</p>
                </div>

                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Step-by-Step Explanation</p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{extension.solution}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
