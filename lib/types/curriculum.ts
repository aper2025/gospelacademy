/**
 * Curriculum content types for The Gospel Academy.
 *
 * Every `Lesson` record in the database has a `content` field typed `Json`.
 * At runtime that field should conform to `LessonContent` below.
 *
 * Design goals:
 *  - Three pathway variants (ADVANCED, STANDARD, VOCATIONAL) can each carry
 *    different text, depth, and activities for the same lesson week.
 *  - The IPO (Input → Processing → Output) learning module maps cleanly onto
 *    how each pathway delivers a lesson.
 *  - Every content block is discriminated by `type` so renderers can switch
 *    on a single field without extra null-checks.
 */

// ─── Pathways ────────────────────────────────────────────────────────────────

export type Pathway = 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'

// ─── Subjects ────────────────────────────────────────────────────────────────

export type Subject =
  | 'Bible & Theology'
  | 'Mathematics'
  | 'Language Arts'
  | 'Science'
  | 'History & Geography'

// ─── Content block primitives ────────────────────────────────────────────────

/** A paragraph or section of instructional text. */
export interface TextBlock {
  type: 'text'
  /** Optional heading displayed above the body. */
  heading?: string
  /** Main body. Supports a lightweight markdown subset (bold, italic, lists). */
  body: string
}

/** A passage the student reads — scripture, primary source, or excerpt. */
export interface ReadingPassage {
  type: 'reading'
  /** Short title shown above the passage. */
  title: string
  /** Source citation, e.g. "Genesis 1:1–2 (ESV)" or "Westminster Shorter Catechism, Q1" */
  source: string
  /** Full passage text. */
  text: string
  /** Optional reading level annotation for renderer hints. */
  readingLevel?: 'easy' | 'moderate' | 'challenging'
}

/** Open-ended or Socratic discussion prompts — used synchronously or async. */
export interface DiscussionQuestion {
  type: 'discussion'
  /** The question text shown to the student. */
  question: string
  /**
   * Optional scaffolding hint shown after the student attempts an answer,
   * or displayed immediately for STANDARD/VOCATIONAL pathways.
   */
  hint?: string
  /** If true this question is used as a graded Socratic seminar prompt. */
  isGraded?: boolean
}

/** Skill-practice item — math problem, grammar exercise, vocabulary, etc. */
export interface PracticeProblem {
  type: 'practice'
  /** Problem or prompt text. */
  prompt: string
  /** Answer key visible only to the AI tutor / teacher view, never the student. */
  answerKey?: string
  /** Worked example shown after a configurable number of attempts. */
  workedExample?: string
  /** Tags used by the AI tutor to select remediation resources. */
  skills?: string[]
}

/**
 * A multi-day applied project brief (Vocational emphasis, but present
 * in all pathways at varying scope).
 */
export interface ProjectBrief {
  type: 'project'
  title: string
  /** One-sentence summary used in parent/dashboard cards. */
  summary: string
  /** Full brief — objectives, steps, materials, deliverables. */
  description: string
  /** Expected deliverable format. */
  deliverable: 'written-report' | 'oral-presentation' | 'portfolio-artifact' | 'demonstration' | 'other'
  /** Estimated hours for the project portion. */
  estimatedHours?: number
  /** Rubric dimensions used by the AI tutor for grading. */
  rubric?: RubricDimension[]
}

/** A single rubric scoring dimension. */
export interface RubricDimension {
  dimension: string
  /** Maximum points for this dimension. */
  maxPoints: number
  /** Descriptors for each score band. */
  descriptors: {
    exemplary: string
    proficient: string
    developing: string
  }
}

/**
 * "Wonder prompt" — a curiosity-sparking question or fact that opens the
 * lesson and activates prior knowledge. Short, memorable, often rhetorical.
 */
export interface WonderPrompt {
  type: 'wonder'
  /** The wonder question or statement. */
  prompt: string
  /** Optional follow-up connection to surface after the student reflects. */
  connection?: string
}

/**
 * Biblical worldview integration block — explicit connections between
 * the lesson's academic content and Scripture / Christian thought.
 */
export interface BiblicalWorldviewBlock {
  type: 'biblical-worldview'
  /** Core theme, e.g. "Stewardship", "Imago Dei", "Truth and Revelation". */
  theme: string
  /** Scripture reference(s) for the connection. */
  scriptureRef: string
  /** 2–4 sentence integration text. */
  reflection: string
  /** Depth-appropriate application question for the student. */
  applicationQuestion?: string
}

// ─── External resources ─────────────────────────────────────────────────────

/** An external learning resource linked to a lesson (e.g. Khan Academy, YouTube). */
export interface ExternalResource {
  title: string
  url: string
  type: 'video' | 'article' | 'interactive' | 'worksheet'
  /** Source name, e.g. "Khan Academy", "YouTube", "BibleProject". */
  source: string
  /** Which lesson objective this resource supports (0-based index). */
  objectiveIndex?: number
}

// ─── Advanced Extension (SAT/ACT Challenge) ─────────────────────────────────

/**
 * A single SAT/ACT-style challenge question shown to ADVANCED pathway students.
 * Optional, ungraded — designed for higher-order thinking and test readiness.
 * Students attempt the question, then reveal a detailed worked solution.
 */
export interface AdvancedExtension {
  /** The challenge question text. May include mathematical expressions. */
  question: string
  /** Detailed worked solution with step-by-step explanation. */
  solution: string
  /** The final answer (concise, for quick reference). */
  answer: string
  /** Source attribution, e.g. "SAT Practice Test 4, Section 3" or "ACT-style". */
  source?: string
  /** Skill tags for tracking and remediation. */
  skills: string[]
  /** Difficulty relative to grade level. */
  difficulty: 'medium' | 'hard'
}

/** Union of all content block types. */
export type ContentBlock =
  | TextBlock
  | ReadingPassage
  | DiscussionQuestion
  | PracticeProblem
  | ProjectBrief
  | WonderPrompt
  | BiblicalWorldviewBlock

// ─── IPO (Input → Processing → Output) module ────────────────────────────────

/**
 * Each phase of the IPO model contains an ordered sequence of content blocks.
 *
 * INPUT      — Build background knowledge, activate curiosity, present new
 *              information (text, reading, wonder prompts).
 * PROCESSING — Students wrestle with the material (discussion questions,
 *              practice problems, Socratic dialogue with AI tutor).
 * OUTPUT     — Students demonstrate mastery (project brief, written response,
 *              or graded assessment prompt).
 */
export interface IPOModule {
  input: ContentBlock[]
  processing: ContentBlock[]
  output: ContentBlock[]
}

// ─── Pathway variant ─────────────────────────────────────────────────────────

/**
 * A single pathway's full lesson content.
 * Each pathway carries its own IPO module so content depth, reading level,
 * and activities can differ while still covering the same learning objectives.
 */
export interface PathwayVariant {
  pathway: Pathway
  /** Pathway-specific lesson title (can differ from the top-level title). */
  title: string
  /**
   * Estimated on-task minutes for a student on this pathway.
   * Used by the dashboard to project weekly workload.
   */
  estimatedMinutes: number
  /** Ordered IPO module for this pathway. */
  ipo: IPOModule
  /**
   * Pathway-specific learning objectives — written as "Students will be able to…"
   */
  objectives: string[]
}

// ─── Top-level LessonContent ─────────────────────────────────────────────────

/**
 * The full value of `Lesson.content` (the `Json` field in Prisma).
 *
 * One `LessonContent` document covers all three pathways for a single lesson
 * week. The renderer selects the correct `PathwayVariant` at runtime based on
 * the student's enrolled pathway.
 */
export interface LessonContent {
  /** Schema version — increment when breaking changes are made. */
  schemaVersion: 1

  // ── Metadata ─────────────────────────────────────────────────────────────
  subject: Subject
  /** Prisma Course.gradeLevelMin value (6–9). */
  gradeLevel: 6 | 7 | 8 | 9
  /** Unit number within the course (1-based). */
  unitNumber: number
  /** Week number within the unit (1-based). */
  weekNumber: number
  /** Canonical lesson title shown in nav / breadcrumbs. */
  title: string
  /**
   * One-sentence description shown on student dashboard cards and
   * parent progress reports.
   */
  description: string

  // ── Shared elements (pathway-agnostic) ───────────────────────────────────
  /**
   * Key vocabulary terms with definitions. Shared across all pathways;
   * the AI tutor draws on these for clarification.
   */
  vocabulary: VocabTerm[]
  /**
   * Memory verses or catechism answers required for this lesson week.
   * Shared across all pathways.
   */
  memoryWork?: MemoryWorkItem[]

  // ── Post-lesson quiz ────────────────────────────────────────────────────
  /**
   * 10 multiple-choice questions to assess learning from this lesson.
   * Aligned to the lesson objectives. Shared across all pathways.
   *
   * INSTRUCTION lessons MUST include a quiz.
   * PROJECT lessons do NOT have a quiz — they are assessed by project rubric.
   *
   * Students must pass the quiz to unlock the next lesson.
   * Passing thresholds by pathway (see QUIZ_PASS_THRESHOLD):
   *  - ADVANCED:   80% (8/10)
   *  - STANDARD:   70% (7/10)
   *  - VOCATIONAL: 60% (6/10)
   *
   * After 3 failed attempts the quiz is locked. The student must review
   * the lesson content before retaking. The system identifies specific
   * objectives/topics the student needs to revisit based on which
   * questions were answered incorrectly.
   */
  quiz?: MultipleChoiceQuestion[]

  // ── Deep-dive lesson content ────────────────────────────────────────────
  /**
   * Expanded teaching content for students who need deeper instruction.
   * Rendered as a collapsible "Full Lesson" section above the IPO phases.
   * Generated by AI enrichment script for lessons with thin content.
   * Uses the same ContentBlock types as IPO phases.
   */
  fullLesson?: ContentBlock[]

  /**
   * Standalone practice exercises for student skill-building.
   * Rendered as a collapsible "Practice Exercises" section after the Output phase.
   * Separate from IPO processing-phase practice blocks.
   */
  practiceExercises?: PracticeProblem[]

  // ── External resources ──────────────────────────────────────────────────
  /** AI-generated or manually curated external learning resources. */
  resources?: ExternalResource[]

  // ── Advanced extension (SAT/ACT Challenge) ────────────────────────────
  /**
   * Optional SAT/ACT-style challenge question for ADVANCED pathway students.
   * Aligned to the lesson objective but at a higher cognitive level.
   * Not graded — students attempt, then reveal a detailed worked solution.
   * Completing extension questions across a course earns a certificate badge.
   *
   * Currently used for Mathematics courses (grades 6–12).
   */
  advancedExtension?: AdvancedExtension

  // ── Per-pathway content ──────────────────────────────────────────────────
  /** One entry per pathway. Renderers index by `variant.pathway`. */
  pathways: [PathwayVariant, PathwayVariant, PathwayVariant]
}

// ─── Multiple-choice quiz (post-lesson assessment) ──────────────────────────

/** A single multiple-choice question used in post-lesson quizzes and assessments. */
export interface MultipleChoiceQuestion {
  /** Unique identifier within the quiz, e.g. "q1", "q2". */
  id: string
  /** The question text. */
  question: string
  /** Four answer options. */
  options: [string, string, string, string]
  /** Zero-based index of the correct answer in the options array. */
  correctAnswer: 0 | 1 | 2 | 3
  /** Brief explanation of why the correct answer is right. */
  explanation: string
  /**
   * Which lesson objective this question assesses.
   * Used to generate targeted remediation when students fail —
   * the system tells students which specific topics to review.
   */
  objectiveIndex?: number
}

/** A short-answer question that can be AI-graded. */
export interface ShortAnswerQuestion {
  /** Unique identifier, e.g. "sa1". */
  id: string
  /** The question text. */
  question: string
  /** Expected answer key — used by AI grader for comparison. */
  answerKey: string
  /** Points possible for this question. */
  pointsPossible: number
  /** Optional hint shown after first attempt. */
  hint?: string
}

// ─── Course-level assessments ───────────────────────────────────────────────

/**
 * Pre-course diagnostic assessment (MC + short answer).
 * Ungraded — used to establish a knowledge baseline.
 * Questions should mirror the end-of-course assessment so students
 * can compare their growth from start to finish.
 *
 * Stored in: content/<slug>/pre-course-assessment.json
 */
export interface PreCourseAssessment {
  type: 'pre-course'
  title: string
  description: string
  multipleChoice: MultipleChoiceQuestion[]
  shortAnswer: ShortAnswerQuestion[]
}

/**
 * End-of-unit assessment (MC + short answer).
 * Tests synthesis and integration ACROSS the unit's lessons —
 * not just recall of individual lesson content. Questions should
 * require students to connect ideas from multiple lessons.
 *
 * Stored in: content/<slug>/unit-N-assessment.json
 */
export interface UnitAssessment {
  type: 'end-of-unit'
  unitNumber: number
  title: string
  description: string
  multipleChoice: MultipleChoiceQuestion[]
  shortAnswer: ShortAnswerQuestion[]
}

/**
 * End-of-course summative assessment (MC + short answer + essay).
 * Comprehensive review of the entire course.
 * Questions should parallel the pre-course assessment so students
 * can measure their growth across the course.
 *
 * Stored in: content/<slug>/end-of-course-assessment.json
 */
export interface EndOfCourseAssessment {
  type: 'end-of-course'
  title: string
  description: string
  multipleChoice: MultipleChoiceQuestion[]
  shortAnswer: ShortAnswerQuestion[]
  /** Essay prompt for summative evaluation. */
  essayPrompt?: {
    prompt: string
    rubric: RubricDimension[]
    pointsPossible: number
  }
}

// ─── Supporting types ────────────────────────────────────────────────────────

export interface VocabTerm {
  term: string
  definition: string
  /** Optional example sentence using the term in context. */
  example?: string
}

export interface MemoryWorkItem {
  /** The text to be memorised. */
  text: string
  /** Reference or source, e.g. "John 1:1" or "WSC Q1". */
  reference: string
  type: 'scripture' | 'catechism' | 'poem' | 'other'
}

// ─── Quiz passing thresholds & retry policy ─────────────────────────────────

/**
 * Minimum quiz score (as a percentage) required to unlock the next lesson.
 * With 10 MC questions, these thresholds map cleanly:
 *  - ADVANCED:   80% = 8/10
 *  - STANDARD:   70% = 7/10
 *  - VOCATIONAL: 60% = 6/10
 */
export const QUIZ_PASS_THRESHOLD: Record<Pathway, number> = {
  ADVANCED: 80,
  STANDARD: 70,
  VOCATIONAL: 60,
} as const

/**
 * Maximum quiz attempts before the quiz is locked.
 * After this many failed attempts, the student must review the lesson
 * content before retaking. The system identifies which objectives
 * the student missed and directs them to the relevant lesson sections.
 */
export const QUIZ_MAX_ATTEMPTS = 3

// ─── Runtime helper ──────────────────────────────────────────────────────────

/**
 * Type-guard to verify a raw JSON value from Prisma conforms to LessonContent.
 * Use this at the API boundary before passing content to the renderer.
 */
export function isLessonContent(value: unknown): value is LessonContent {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    v.schemaVersion === 1 &&
    typeof v.subject === 'string' &&
    typeof v.unitNumber === 'number' &&
    typeof v.weekNumber === 'number' &&
    Array.isArray(v.pathways) &&
    v.pathways.length === 3
  )
}
