'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface ExamQuestion {
  id: string
  question: string
  options: string[]
  unitNumber: number
  lessonId: string
}

interface ExamData {
  courseId: string
  courseTitle: string
  questions: ExamQuestion[]
  totalQuestions: number
  previousScore: number | null
}

interface ExamResult {
  score: number
  correct: number
  total: number
  attempt: number
  passed: boolean
}

export default function FinalExamClient({
  courseId,
  courseTitle,
  subject,
}: {
  courseId: string
  courseTitle: string
  subject: string
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exam, setExam] = useState<ExamData | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<ExamResult | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const QUESTIONS_PER_PAGE = 5

  const fetchExam = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/final-exam?courseId=${courseId}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to load exam.')
        if (data.completedLessons !== undefined) {
          setError(`Complete all lessons before taking the final exam. (${data.completedLessons}/${data.totalLessons} completed)`)
        }
        return
      }
      setExam(data)
      if (data.previousScore !== null) {
        // Student has taken this before
      }
    } catch {
      setError('Failed to load exam. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => { fetchExam() }, [fetchExam])

  const handleAnswer = (questionId: string, optionIndex: number) => {
    if (result) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = async () => {
    if (!exam) return
    const unanswered = exam.questions.filter(q => answers[q.id] === undefined)
    if (unanswered.length > 0) {
      setError(`Please answer all questions. ${unanswered.length} remaining.`)
      // Jump to first unanswered question
      const firstUnanswered = exam.questions.findIndex(q => answers[q.id] === undefined)
      setCurrentPage(Math.floor(firstUnanswered / QUESTIONS_PER_PAGE))
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/final-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, answers }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to submit exam.')
        return
      }
      setResult(data)
    } catch {
      setError('Failed to submit exam. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const totalPages = exam ? Math.ceil(exam.questions.length / QUESTIONS_PER_PAGE) : 0
  const pageQuestions = exam
    ? exam.questions.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE)
    : []
  const answeredCount = Object.keys(answers).length
  const totalQuestions = exam?.totalQuestions ?? 0

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 flex items-center gap-3">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeLinecap="round" />
          </svg>
          Preparing your final exam…
        </div>
      </div>
    )
  }

  // ── Error (not eligible) ──
  if (error && !exam) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-6 flex items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/25 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Not Ready Yet</h1>
          <p className="text-gray-400">{error}</p>
          <Link
            href={`/dashboard/student/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to course
          </Link>
        </div>
      </div>
    )
  }

  // ── Result screen ──
  if (result) {
    const passed = result.passed
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-6">
        <div className="max-w-2xl mx-auto space-y-6 pt-8">
          <div className={`rounded-2xl p-8 text-center ring-1 ${
            passed
              ? 'bg-gradient-to-br from-emerald-500/15 to-teal-500/10 ring-emerald-500/25'
              : 'bg-gradient-to-br from-amber-500/15 to-orange-500/10 ring-amber-500/25'
          }`}>
            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
              passed ? 'bg-emerald-500/20 ring-1 ring-emerald-500/30' : 'bg-amber-500/20 ring-1 ring-amber-500/30'
            }`}>
              {passed ? (
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                </svg>
              )}
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              {passed ? 'Congratulations!' : 'Keep Studying!'}
            </h1>
            <p className="text-lg text-gray-300 mb-1">{courseTitle} — Final Exam</p>
            <p className="text-sm text-gray-500 mb-6">Attempt #{result.attempt}</p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div>
                <div className={`text-4xl font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {result.score}%
                </div>
                <div className="text-sm text-gray-500 mt-1">Score</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-4xl font-bold text-white">
                  {result.correct}/{result.total}
                </div>
                <div className="text-sm text-gray-500 mt-1">Correct</div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              {passed
                ? 'You passed the final exam! This score has been recorded in your grade book.'
                : 'You need 60% to pass. Review your lessons and try again when ready.'}
            </p>

            <div className="flex items-center justify-center gap-3">
              <Link
                href={`/dashboard/student/courses/${courseId}`}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl ring-1 ring-white/10 transition-colors"
              >
                ← Back to Course
              </Link>
              {!passed && (
                <button
                  onClick={() => {
                    setResult(null)
                    setAnswers({})
                    setCurrentPage(0)
                    fetchExam()
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                  Retake Exam
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Exam UI ──
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/dashboard/student/courses/${courseId}`}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors mb-1 inline-block"
            >
              ← Back to course
            </Link>
            <h1 className="text-xl font-bold text-white">{courseTitle} — Final Exam</h1>
            <p className="text-sm text-gray-400 mt-1">
              {totalQuestions} questions • Answer all questions to submit
            </p>
          </div>
          {exam?.previousScore !== null && (
            <div className="text-right">
              <span className="text-xs text-gray-500">Previous score</span>
              <div className="text-lg font-bold text-blue-400">{exam?.previousScore}%</div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{answeredCount} of {totalQuestions} answered</span>
            <span>Page {currentPage + 1} of {totalPages}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
              style={{ width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-500/10 ring-1 ring-red-500/25 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {pageQuestions.map((q, idx) => {
            const globalIdx = currentPage * QUESTIONS_PER_PAGE + idx + 1
            const selected = answers[q.id]
            return (
              <div key={q.id} className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-sm font-semibold text-gray-400">
                    {globalIdx}
                  </span>
                  <p className="text-white text-[15px] leading-relaxed pt-1">{q.question}</p>
                </div>
                <div className="space-y-2 pl-11">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => handleAnswer(q.id, oi)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        selected === oi
                          ? 'bg-blue-500/15 ring-1 ring-blue-500/40 text-blue-300'
                          : 'bg-white/[0.02] ring-1 ring-white/[0.06] text-gray-300 hover:bg-white/[0.05] hover:ring-white/10'
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full ring-1 flex items-center justify-center text-xs font-medium shrink-0 ${
                          selected === oi
                            ? 'bg-blue-500/20 ring-blue-500/50 text-blue-400'
                            : 'ring-white/15 text-gray-500'
                        }`}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination + Submit */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageAnswered = exam!.questions
                .slice(i * QUESTIONS_PER_PAGE, (i + 1) * QUESTIONS_PER_PAGE)
                .every(q => answers[q.id] !== undefined)
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    i === currentPage
                      ? 'bg-blue-600 text-white'
                      : pageAnswered
                        ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {currentPage < totalPages - 1 ? (
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeLinecap="round" />
                  </svg>
                  Grading…
                </>
              ) : (
                'Submit Exam'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
