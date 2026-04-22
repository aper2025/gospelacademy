/**
 * Assessment type definitions for The Gospel Academy grading system.
 */

export type AssessmentSubType =
  | 'formative'
  | 'summative'
  | 'baseline'
  | 'midpoint'
  | 'quiz'
  | 'project'
  | 'final-exam'

export interface FormativeResponse {
  questionId: string
  answer: string
}

export interface FormativeQuestion {
  id: string
  prompt: string
  answerKey: string
  pointsPossible: number
}

export interface AIGradingResult {
  score: number
  feedback: string
  strengths: string[]
  growthAreas: string[]
  questionScores?: {
    questionId: string
    score: number
    feedback: string
    correct: boolean
  }[]
  dimensionScores?: {
    dimension: string
    score: number
    level: string
  }[]
}

export interface GradeMetadata {
  gradingMode: 'ai' | 'teacher' | 'auto' | 'manual'
  subType: AssessmentSubType
  aiResult?: AIGradingResult
  attempt: number
  originalAiScore?: number
  overrideNote?: string
  overriddenBy?: string
}
