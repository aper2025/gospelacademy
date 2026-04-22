'use client'

import { useState, useEffect, useCallback } from 'react'
import type { MultipleChoiceQuestion, Pathway } from '@/lib/types/curriculum'
import { QUIZ_PASS_THRESHOLD, QUIZ_MAX_ATTEMPTS } from '@/lib/types/curriculum'

interface Props {
  quiz: MultipleChoiceQuestion[]
  pathway: Pathway
  lessonId: string
  onPass: () => void
}

interface QuizState {
  attempts: number
  passed: boolean
  lastScore: number
}

type Phase = 'idle' | 'in-progress' | 'submitted'

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const

// Seeded random shuffle so options stay consistent within an attempt
// but change between attempts and between students
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr]
  let s = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0x7fffffff
  }
  return hash
}

interface ShuffledQuestion {
  original: MultipleChoiceQuestion
  shuffledOptions: string[]
  correctShuffledIndex: number // where the correct answer ended up after shuffle
  originalIndices: number[]   // maps shuffled index → original index
}

function shuffleQuestions(quiz: MultipleChoiceQuestion[], seed: number): ShuffledQuestion[] {
  return quiz.map((q) => {
    const indices = [0, 1, 2, 3]
    const questionSeed = seed ^ hashString(q.id)
    const shuffledIndices = seededShuffle(indices, questionSeed)
    return {
      original: q,
      shuffledOptions: shuffledIndices.map(i => q.options[i]),
      correctShuffledIndex: shuffledIndices.indexOf(q.correctAnswer),
      originalIndices: shuffledIndices,
    }
  })
}

function getStorageKey(lessonId: string) {
  return `quiz-${lessonId}`
}

function loadQuizState(lessonId: string): QuizState {
  if (typeof window === 'undefined') return { attempts: 0, passed: false, lastScore: 0 }
  try {
    const raw = localStorage.getItem(getStorageKey(lessonId))
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { attempts: 0, passed: false, lastScore: 0 }
}

function saveQuizState(lessonId: string, state: QuizState) {
  try {
    localStorage.setItem(getStorageKey(lessonId), JSON.stringify(state))
  } catch { /* ignore */ }
}

export default function LessonQuizCard({ quiz, pathway, lessonId, onPass }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [quizState, setQuizState] = useState<QuizState>({ attempts: 0, passed: false, lastScore: 0 })
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now())
  const shuffledQuiz = shuffleQuestions(quiz, shuffleSeed)

  const threshold = QUIZ_PASS_THRESHOLD[pathway]
  const requiredCorrect = Math.ceil((threshold / 100) * quiz.length)
  const locked = quizState.attempts >= QUIZ_MAX_ATTEMPTS && !quizState.passed

  // Load persisted state on mount
  useEffect(() => {
    const saved = loadQuizState(lessonId)
    setQuizState(saved)
    if (saved.passed) onPass()
  }, [lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  const answeredCount = Object.keys(selections).length
  const allAnswered = answeredCount === quiz.length

  const score = useCallback(() => {
    let correct = 0
    for (const sq of shuffledQuiz) {
      if (selections[sq.original.id] === sq.correctShuffledIndex) correct++
    }
    return correct
  }, [shuffledQuiz, selections])

  function handleSelect(questionId: string, optionIndex: number) {
    if (phase !== 'in-progress') return
    setSelections(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleStart() {
    setSelections({})
    setShuffleSeed(Date.now())
    setPhase('in-progress')
  }

  function handleSubmit() {
    if (!allAnswered) return
    const correct = score()
    const pct = Math.round((correct / quiz.length) * 100)
    const passed = pct >= threshold

    const newState: QuizState = {
      attempts: quizState.attempts + 1,
      passed,
      lastScore: pct,
    }
    setQuizState(newState)
    saveQuizState(lessonId, newState)
    setPhase('submitted')

    if (passed) onPass()

    // Record quiz score to database for grade tracking
    fetch('/api/quiz-grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId,
        score: pct,
        correctCount: correct,
        totalQuestions: quiz.length,
        attempt: newState.attempts,
      }),
    }).catch(() => {}) // Non-blocking — grade recording is best-effort
  }

  function handleRetry() {
    setSelections({})
    setShuffleSeed(Date.now())
    setPhase('in-progress')
  }

  // Get missed objectives for locked state
  function getMissedObjectives(): string[] {
    const missed = new Set<number>()
    for (const sq of shuffledQuiz) {
      if (selections[sq.original.id] !== sq.correctShuffledIndex && sq.original.objectiveIndex != null) {
        missed.add(sq.original.objectiveIndex)
      }
    }
    return Array.from(missed).sort((a, b) => a - b).map(i => `Objective ${i + 1}`)
  }

  const correctCount = phase === 'submitted' ? score() : 0
  const pct = phase === 'submitted' ? Math.round((correctCount / quiz.length) * 100) : 0
  const passed = phase === 'submitted' && quizState.passed
  const failed = phase === 'submitted' && !quizState.passed
  const isLocked = failed && quizState.attempts >= QUIZ_MAX_ATTEMPTS
  const remainingAttempts = QUIZ_MAX_ATTEMPTS - quizState.attempts

  // ── Already passed (returning to lesson) ────────────────────────────────
  if (phase === 'idle' && quizState.passed) {
    return (
      <div className="rounded-2xl bg-gray-900 ring-1 ring-emerald-500/25 overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/6">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Lesson Quiz — Passed</h3>
            <p className="text-xs text-emerald-400">Score: {quizState.lastScore}% ({Math.round(quizState.lastScore / 100 * quiz.length)}/{quiz.length})</p>
          </div>
        </div>
      </div>
    )
  }

  // ── Locked state ───────────────────────────────────────────────────────
  if (locked) {
    const missed = getMissedObjectives()
    return (
      <div className="rounded-2xl bg-gray-900 ring-1 ring-rose-500/25 overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/6">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 ring-1 ring-rose-500/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Quiz Locked</h3>
            <p className="text-xs text-rose-400">
              {QUIZ_MAX_ATTEMPTS} attempts used — Last score: {quizState.lastScore}%
            </p>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-gray-300 leading-relaxed">
            Review the lesson content before retaking the quiz. Focus on these areas:
          </p>
          {missed.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {missed.map(obj => (
                <span key={obj} className="text-xs font-medium text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20 px-2.5 py-1 rounded-full">
                  {obj}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500">
            Scroll up and review the lesson material, then come back to try again.
          </p>
          <button
            onClick={() => {
              const newState = { attempts: 0, passed: false, lastScore: 0 }
              setQuizState(newState)
              saveQuizState(lessonId, newState)
              setPhase('idle')
            }}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Reset and try again after reviewing
          </button>
        </div>
      </div>
    )
  }

  // ── Idle state ─────────────────────────────────────────────────────────
  if (phase === 'idle') {
    return (
      <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/6">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Lesson Quiz</h3>
            <p className="text-xs text-gray-500">
              {quiz.length} questions — Pass with {requiredCorrect}/{quiz.length} correct ({threshold}%)
            </p>
          </div>
        </div>
        <div className="p-5">
          {quizState.attempts > 0 && (
            <p className="text-xs text-amber-400 mb-3">
              Previous score: {quizState.lastScore}% — {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
            </p>
          )}
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            {quizState.attempts > 0 ? 'Retake Quiz' : 'Start Quiz'}
          </button>
        </div>
      </div>
    )
  }

  // ── In-progress / Submitted state ──────────────────────────────────────
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Lesson Quiz</h3>
            {phase === 'in-progress' && (
              <p className="text-xs text-gray-500">{answeredCount} of {quiz.length} answered</p>
            )}
            {phase === 'submitted' && (
              <p className={`text-xs ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                Score: {pct}% ({correctCount}/{quiz.length})
              </p>
            )}
          </div>
        </div>
        {phase === 'submitted' && (
          <span className={`text-2xl font-bold ${passed ? 'text-emerald-400' : pct >= threshold - 10 ? 'text-amber-400' : 'text-rose-400'}`}>
            {pct}%
          </span>
        )}
      </div>

      {/* Result banner */}
      {phase === 'submitted' && passed && (
        <div className="px-5 py-3 bg-emerald-500/10 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <p className="text-sm text-emerald-400 font-medium">
              Congratulations! You passed the quiz.
            </p>
          </div>
        </div>
      )}
      {phase === 'submitted' && failed && !isLocked && (
        <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-sm text-amber-400 font-medium">
              Not quite — you need {requiredCorrect}/{quiz.length} correct. {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining.
            </p>
          </div>
        </div>
      )}
      {phase === 'submitted' && isLocked && (
        <div className="px-5 py-3 bg-rose-500/10 border-b border-rose-500/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <p className="text-sm text-rose-400 font-medium">
              Quiz locked — review the lesson content, then reset to try again.
            </p>
          </div>
        </div>
      )}

      {/* Progress dots */}
      {phase === 'in-progress' && (
        <div className="px-5 py-3 border-b border-white/6 flex items-center gap-1.5 flex-wrap">
          {shuffledQuiz.map((sq) => (
            <span
              key={sq.original.id}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                selections[sq.original.id] != null ? 'bg-blue-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      )}

      {/* Questions */}
      <div className="p-5 space-y-4">
        {shuffledQuiz.map((sq, i) => {
          const q = sq.original
          const selected = selections[q.id]
          const isSubmitted = phase === 'submitted'
          const isCorrect = selected === sq.correctShuffledIndex

          return (
            <div key={q.id} className="rounded-xl bg-white/3 ring-1 ring-white/6 overflow-hidden">
              {/* Question header */}
              <div className="px-4 py-3 border-b border-white/5">
                <div className="flex items-start gap-2.5">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-500/15 ring-1 ring-emerald-500/25 text-emerald-400'
                        : 'bg-rose-500/15 ring-1 ring-rose-500/25 text-rose-400'
                      : 'bg-blue-500/15 ring-1 ring-blue-500/25 text-blue-400'
                  }`}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-white leading-relaxed">{q.question}</p>
                </div>
              </div>

              {/* Options */}
              <div className="p-3 space-y-2">
                {sq.shuffledOptions.map((opt, oi) => {
                  const isSelected = selected === oi
                  const isAnswer = sq.correctShuffledIndex === oi

                  let optionStyle = 'bg-white/3 ring-1 ring-white/8 hover:bg-white/5 cursor-pointer'
                  if (phase === 'in-progress' && isSelected) {
                    optionStyle = 'bg-blue-500/15 ring-1 ring-blue-500/40 cursor-pointer'
                  }
                  if (isSubmitted) {
                    if (isSelected && isAnswer) {
                      // Student picked the right answer
                      optionStyle = 'bg-emerald-500/10 ring-1 ring-emerald-500/30'
                    } else if (isSelected && !isAnswer) {
                      // Student picked wrong — but do NOT reveal correct answer
                      optionStyle = 'bg-rose-500/10 ring-1 ring-rose-500/30'
                    } else {
                      // Unselected options — neutral styling, don't highlight correct
                      optionStyle = 'bg-white/2 ring-1 ring-white/5 opacity-60'
                    }
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={isSubmitted}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-colors ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSubmitted && isSelected && isAnswer
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isSubmitted && isSelected && !isAnswer
                            ? 'bg-rose-500/20 text-rose-400'
                            : phase === 'in-progress' && isSelected
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-white/5 text-gray-500'
                      }`}>
                        {isSubmitted && isSelected && isAnswer ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : isSubmitted && isSelected && !isAnswer ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          OPTION_LABELS[oi]
                        )}
                      </span>
                      <span className={`text-sm leading-relaxed ${
                        isSubmitted && isSelected && isAnswer ? 'text-emerald-300' :
                        isSubmitted && isSelected && !isAnswer ? 'text-rose-300' :
                        'text-gray-300'
                      }`}>
                        {opt}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Show a brief hint for wrong answers without revealing the correct one */}
              {isSubmitted && !isCorrect && (
                <div className="mx-3 mb-3 px-3.5 py-2.5 rounded-lg text-xs leading-relaxed bg-rose-500/8 text-rose-300/80">
                  Review the lesson material and try again — you can do this!
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="px-5 pb-5">
        {phase === 'in-progress' && (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 disabled:text-white/40 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            Submit Quiz ({answeredCount}/{quiz.length} answered)
          </button>
        )}
        {phase === 'submitted' && failed && !isLocked && (
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            Try Again ({remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} left)
          </button>
        )}
        {phase === 'submitted' && isLocked && (
          <button
            onClick={() => {
              const newState = { attempts: 0, passed: false, lastScore: 0 }
              setQuizState(newState)
              saveQuizState(lessonId, newState)
              setPhase('idle')
            }}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            Reset After Review
          </button>
        )}
      </div>
    </div>
  )
}
