/**
 * Grade calculation engine for The Gospel Academy.
 *
 * Weighted breakdown by assessment category:
 *   Quizzes:        40%  (lesson mastery — 10 MCQ per instruction lesson)
 *   Comprehension:  15%  (formative checks — discussion/practice responses)
 *   Projects:       20%  (applied learning — unit projects, AI + manual grading)
 *   Final Exam:     25%  (summative course mastery)
 *
 * When a category has no grades yet, its weight is redistributed
 * proportionally among the categories that do have grades.
 *
 * Letter grade mapping: A(90+) B(80+) C(70+) D(60+) F(<60)
 */

import type { GradeMetadata, AssessmentSubType } from '@/lib/types/assessment'

// ─── Letter grade mapping ──────────────────────────────────────────────────

export type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export function toLetterGrade(score: number): LetterGrade {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function letterGradeColor(grade: LetterGrade): string {
  switch (grade) {
    case 'A': return 'text-emerald-400'
    case 'B': return 'text-blue-400'
    case 'C': return 'text-amber-400'
    case 'D': return 'text-orange-400'
    case 'F': return 'text-rose-400'
  }
}

export function scoreColor(score: number): string {
  return letterGradeColor(toLetterGrade(score))
}

// ─── Category weights ───────────────────────────────────────────────────────

interface CategoryWeight {
  subTypes: AssessmentSubType[]
  weight: number
}

const CATEGORY_WEIGHTS: CategoryWeight[] = [
  { subTypes: ['quiz'],                    weight: 0.40 },
  { subTypes: ['formative', 'baseline', 'midpoint'], weight: 0.15 },
  { subTypes: ['project', 'summative'],    weight: 0.20 },
  { subTypes: ['final-exam'],              weight: 0.25 },
]

// ─── Weighted average calculation ──────────────────────────────────────────

export interface GradeInput {
  score: number
  type: 'FORMATIVE' | 'SUMMATIVE'
  /** SubType from GradeMetadata for fine-grained weighting. Falls back to type-based if absent. */
  subType?: AssessmentSubType
}

/**
 * Parse the subType from a grade's feedback JSON.
 * Returns undefined if not parseable.
 */
export function extractSubType(feedbackJson: string | null): AssessmentSubType | undefined {
  if (!feedbackJson) return undefined
  try {
    const meta = JSON.parse(feedbackJson) as GradeMetadata
    return meta.subType
  } catch {
    return undefined
  }
}

/**
 * Calculate weighted course grade using the 4-category system.
 * Categories without grades have their weight redistributed proportionally.
 */
export function calculateWeightedAverage(grades: GradeInput[]): number {
  if (grades.length === 0) return 0

  // Group grades by category
  const categoryScores: { weight: number; avg: number }[] = []
  let totalActiveWeight = 0

  for (const cat of CATEGORY_WEIGHTS) {
    const matching = grades.filter(g => {
      if (g.subType) return cat.subTypes.includes(g.subType)
      // Fallback: map Prisma type to default subType
      if (g.type === 'FORMATIVE') return cat.subTypes.includes('formative') || cat.subTypes.includes('quiz')
      if (g.type === 'SUMMATIVE') return cat.subTypes.includes('summative') || cat.subTypes.includes('project')
      return false
    })

    if (matching.length > 0) {
      const avg = matching.reduce((sum, g) => sum + g.score, 0) / matching.length
      categoryScores.push({ weight: cat.weight, avg })
      totalActiveWeight += cat.weight
    }
  }

  if (categoryScores.length === 0) return 0

  // Redistribute weights proportionally among active categories
  let weighted = 0
  for (const cs of categoryScores) {
    weighted += cs.avg * (cs.weight / totalActiveWeight)
  }

  return Math.round(weighted)
}

// ─── Unit-by-unit grade breakdown ──────────────────────────────────────────

export interface UnitGrade {
  unitId: string
  unitTitle: string
  unitNumber: number
  formativeAvg: number | null
  summativeAvg: number | null
  weightedAvg: number
  letterGrade: LetterGrade
  gradeCount: number
}

export interface CourseGradeSummary {
  courseId: string
  courseTitle: string
  subject: string
  overallScore: number
  letterGrade: LetterGrade
  completionPct: number         // 0–100 based on graded assessments / total lessons
  unitBreakdown: UnitGrade[]
  totalFormativeGrades: number
  totalSummativeGrades: number
}

export interface GradeWithContext {
  gradeId: string
  assessmentId: string
  score: number
  type: 'FORMATIVE' | 'SUMMATIVE'
  attempt: number
  gradedBy: string
  gradedAt: string
  lessonId: string
  lessonTitle: string
  unitId: string
  unitTitle: string
  unitNumber: number
  courseId: string
  courseTitle: string
  subject: string
  feedback: string
}

/**
 * Given a list of grades with context, compute per-course summaries
 * with unit-by-unit breakdown.
 */
export function computeCourseGrades(
  grades: GradeWithContext[],
  totalLessonsPerCourse: Record<string, number>
): CourseGradeSummary[] {
  const courseMap = new Map<string, GradeWithContext[]>()

  for (const g of grades) {
    const existing = courseMap.get(g.courseId) ?? []
    existing.push(g)
    courseMap.set(g.courseId, existing)
  }

  return Array.from(courseMap.entries()).map(([courseId, courseGrades]) => {
    // Unit breakdown
    const unitMap = new Map<string, GradeWithContext[]>()
    for (const g of courseGrades) {
      const existing = unitMap.get(g.unitId) ?? []
      existing.push(g)
      unitMap.set(g.unitId, existing)
    }

    const unitBreakdown: UnitGrade[] = Array.from(unitMap.entries())
      .map(([unitId, unitGrades]) => {
        const first = unitGrades[0]
        const formative = unitGrades.filter(g => g.type === 'FORMATIVE')
        const summative = unitGrades.filter(g => g.type === 'SUMMATIVE')
        const fAvg = formative.length > 0
          ? formative.reduce((s, g) => s + g.score, 0) / formative.length
          : null
        const sAvg = summative.length > 0
          ? summative.reduce((s, g) => s + g.score, 0) / summative.length
          : null
        const weighted = calculateWeightedAverage(unitGrades.map(g => ({
          score: g.score,
          type: g.type,
          subType: extractSubType(g.feedback),
        })))

        return {
          unitId,
          unitTitle: first.unitTitle,
          unitNumber: first.unitNumber,
          formativeAvg: fAvg !== null ? Math.round(fAvg) : null,
          summativeAvg: sAvg !== null ? Math.round(sAvg) : null,
          weightedAvg: weighted,
          letterGrade: toLetterGrade(weighted),
          gradeCount: unitGrades.length,
        }
      })
      .sort((a, b) => a.unitNumber - b.unitNumber)

    const first = courseGrades[0]
    const allInputs: GradeInput[] = courseGrades.map(g => ({
      score: g.score,
      type: g.type,
      subType: extractSubType(g.feedback),
    }))
    const overallScore = calculateWeightedAverage(allInputs)
    const totalLessons = totalLessonsPerCourse[courseId] ?? 1
    const uniqueLessonsGraded = new Set(courseGrades.map(g => g.lessonId)).size
    const completionPct = Math.min(100, Math.round((uniqueLessonsGraded / totalLessons) * 100))

    return {
      courseId,
      courseTitle: first.courseTitle,
      subject: first.subject,
      overallScore,
      letterGrade: toLetterGrade(overallScore),
      completionPct,
      unitBreakdown,
      totalFormativeGrades: courseGrades.filter(g => g.type === 'FORMATIVE').length,
      totalSummativeGrades: courseGrades.filter(g => g.type === 'SUMMATIVE').length,
    }
  })
}
