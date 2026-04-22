/**
 * lib/data/queries.ts
 *
 * Server-side Prisma queries for Course → Unit → Lesson pages.
 * Returns data shaped to match the SeedCourse / SeedUnit / SeedLesson
 * types so the existing UI components work unchanged.
 *
 * Falls back to course-seed.ts hard-coded data when the DB returns null.
 */

import { prisma } from '@/lib/prisma'
import { isLessonContent, type LessonContent } from '@/lib/types/curriculum'
import {
  getCourse as getSeedCourse,
  getUnit   as getSeedUnit,
  BIBLE_9,
  type SeedCourse,
  type SeedUnit,
  type SeedLesson,
} from './course-seed'

// ─── Course with nested Units + Lessons ─────────────────────────────────────

export async function fetchCourse(courseId: string): Promise<SeedCourse | null> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        orderBy: { unitNumber: 'asc' },
        include: {
          lessons: { orderBy: { weekNumber: 'asc' } },
        },
      },
    },
  })

  if (!course) return getSeedCourse(courseId)

  return {
    id:          course.id,
    title:       course.title,
    subject:     course.subject as SeedCourse['subject'],
    gradeLevel:  course.gradeLevelMin as SeedCourse['gradeLevel'],
    description: '', // no description column on Course model
    units: course.units.map(unit => {
      // Try to derive a description from the first lesson's content
      const firstContent = parseLessonContent(unit.lessons[0]?.content)
      return {
        id:                unit.id,
        unitNumber:        unit.unitNumber,
        title:             unit.title,
        objectivesSummary: firstContent?.description ?? `Unit ${unit.unitNumber}: ${unit.title}`,
        weekStart:         unit.weekStart,
        weekEnd:           unit.weekEnd,
        lessons: unit.lessons.map(lesson => toLessonSeed(lesson)),
      }
    }),
  }
}

// ─── Single Unit (with parent Course context for nav) ────────────────────────

export interface UnitWithCourse {
  course: SeedCourse
  unit:   SeedUnit
}

export async function fetchUnitWithCourse(
  courseId: string,
  unitId: string,
): Promise<UnitWithCourse | null> {
  const course = await fetchCourse(courseId)
  if (!course) return null

  const unit = course.units.find(u => u.id === unitId)
  if (!unit) {
    // Try seed fallback
    const seedCourse = getSeedCourse(courseId) ?? BIBLE_9
    const seedUnit   = getSeedUnit(seedCourse, unitId)
    if (seedUnit) return { course: seedCourse, unit: seedUnit }
    return null
  }

  return { course, unit }
}

// ─── Single Lesson with LessonContent ────────────────────────────────────────

export interface LessonWithContext {
  lessonContent:  LessonContent
  courseId:       string
  courseTitle:    string
  courseSubject:  string
  studentPathway?: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
}

export async function fetchLesson(
  courseId: string,
  lessonId: string,
  studentEmail?: string,
): Promise<LessonWithContext | null> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      unit: {
        include: {
          course: { select: { id: true, title: true, subject: true } },
        },
      },
    },
  })

  if (!lesson) return null

  const content = parseLessonContent(lesson.content)
  if (!content) return null

  // Look up the student's enrolled pathway for this course
  let studentPathway: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL' | undefined
  if (studentEmail) {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        student: { email: studentEmail },
        courseId: lesson.unit.course.id,
        status: 'ACTIVE',
      },
      select: { pathway: true },
    })
    if (enrollment) {
      studentPathway = enrollment.pathway
    }
  }

  return {
    lessonContent: content,
    courseId:       lesson.unit.course.id,
    courseTitle:    lesson.unit.course.title,
    courseSubject:  lesson.unit.course.subject,
    studentPathway,
  }
}

// ─── Lesson Navigation (prev/next) ──────────────────────────────────────────

export interface LessonNav {
  prevLesson: { id: string; title: string } | null
  nextLesson: { id: string; title: string } | null
  currentIndex: number
  totalLessons: number
}

export async function fetchLessonNav(courseId: string, lessonId: string): Promise<LessonNav> {
  const units = await prisma.unit.findMany({
    where: { courseId },
    orderBy: { unitNumber: 'asc' },
    select: {
      lessons: {
        orderBy: { weekNumber: 'asc' },
        select: { id: true, title: true },
      },
    },
  })

  const allLessons = units.flatMap(u => u.lessons)
  const currentIndex = allLessons.findIndex(l => l.id === lessonId)

  return {
    prevLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    nextLesson: currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    currentIndex: Math.max(currentIndex, 0),
    totalLessons: allLessons.length,
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseLessonContent(raw: unknown): LessonContent | null {
  if (!raw) return null
  // Prisma returns Json fields as already-parsed objects
  if (isLessonContent(raw)) return raw
  // If somehow stringified, try parsing
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (isLessonContent(parsed)) return parsed
    } catch { /* ignore */ }
  }
  return null
}

function toLessonSeed(lesson: {
  id: string
  weekNumber: number
  title: string
  type: string
  content: unknown
}): SeedLesson {
  const content = parseLessonContent(lesson.content)

  // Derive estimated minutes from the STANDARD pathway variant
  const standardVariant = content?.pathways?.find(p => p.pathway === 'STANDARD')
  const estimatedMinutes = standardVariant?.estimatedMinutes ?? (lesson.type === 'PROJECT' ? 90 : 60)

  return {
    id:               lesson.id,
    weekNumber:       lesson.weekNumber,
    title:            lesson.title,
    description:      content?.description ?? `Week ${lesson.weekNumber}`,
    type:             lesson.type as SeedLesson['type'],
    estimatedMinutes,
  }
}
