/**
 * Hard-coded seed data for Bible & Theology, Grade 9.
 * Used by Course and Unit pages until Phase 4 DB integration.
 *
 * Structure mirrors the Prisma Course → Unit → Lesson schema so swapping
 * in real DB records later requires only replacing the data source.
 *
 * 3+1 weekly rhythm:
 *   Weeks 1–3 of every unit = INSTRUCTION lessons
 *   Week 4 of every unit    = PROJECT lesson
 */

import type { Subject } from '@/lib/types/curriculum'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LessonType = 'INSTRUCTION' | 'PROJECT'

export interface SeedLesson {
  id: string
  weekNumber: number
  title: string
  description: string
  type: LessonType
  /** Minutes, pathway STANDARD baseline */
  estimatedMinutes: number
}

export interface SeedUnit {
  id: string
  unitNumber: number
  title: string
  objectivesSummary: string
  weekStart: number
  weekEnd: number
  lessons: SeedLesson[]
}

export interface SeedCourse {
  id: string
  title: string
  subject: Subject
  gradeLevel: 9 | 8 | 7 | 6
  description: string
  units: SeedUnit[]
}

// ─── Course: Bible & Theology — Grade 9 ─────────────────────────────────────

export const BIBLE_9: SeedCourse = {
  id:          'bible-theology-9',
  title:       'Bible & Theology',
  subject:     'Bible & Theology',
  gradeLevel:  9,
  description: 'A full-year survey of systematic and biblical theology grounded in a Reformed, evangelical framework. Students move from the nature of God through the storyline of Scripture — creation, fall, redemption, consummation — building a coherent biblical worldview they can apply in every area of life.',

  units: [

    // ── Unit 1 ───────────────────────────────────────────────────────────────
    {
      id:                'unit-1',
      unitNumber:        1,
      title:             'In the Beginning: God and Creation',
      objectivesSummary: 'Establish a biblical foundation for all learning by examining who God is, how He reveals Himself, and what it means to be made in His image.',
      weekStart: 1,
      weekEnd:   4,
      lessons: [
        {
          id:               'lesson-1-1',
          weekNumber:       1,
          title:            'The Nature and Revelation of God',
          description:      'General and special revelation, communicable and incommunicable attributes, the Two-Book Doctrine.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-1-2',
          weekNumber:       2,
          title:            'The Trinity: One God in Three Persons',
          description:      'The doctrine of the Trinity, its biblical basis, historical development, and its implications for Christian life and thought.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-1-3',
          weekNumber:       3,
          title:            'Imago Dei: What It Means to Be Human',
          description:      'Being made in the image of God — the dignity, purpose, and vocation of humanity in light of creation.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-1-4',
          weekNumber:       4,
          title:            'Project Week: "Who Is God?" Portfolio Entry',
          description:      'Students synthesise the unit into a written or visual portfolio entry defending their answer to "Who is God?" using at least three attributes and two Scripture references.',
          type:             'PROJECT',
          estimatedMinutes: 90,
        },
      ],
    },

    // ── Unit 2 ───────────────────────────────────────────────────────────────
    {
      id:                'unit-2',
      unitNumber:        2,
      title:             'Creation and the Fall',
      objectivesSummary: 'Examine the goodness of God\'s original creation, the nature and consequences of the Fall, and how this shapes a biblical understanding of sin, suffering, and the human condition.',
      weekStart: 5,
      weekEnd:   8,
      lessons: [
        {
          id:               'lesson-2-1',
          weekNumber:       5,
          title:            'The Goodness of Creation',
          description:      'Genesis 1–2 as the foundation for a Christian view of the physical world, work, rest, and culture.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-2-2',
          weekNumber:       6,
          title:            'The Fall and Its Consequences',
          description:      'Genesis 3, the nature of original sin, total depravity, and how the Fall affects every dimension of human life.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-2-3',
          weekNumber:       7,
          title:            'Sin, Death, and the Covenant of Grace',
          description:      'God\'s response to the Fall: protoevangelium (Gen 3:15), the covenant of grace, and the promise of redemption.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-2-4',
          weekNumber:       8,
          title:            'Project Week: A Christian Response to Suffering',
          description:      'Students research a real-world example of suffering and write a 500-word response grounded in a biblical understanding of the Fall and redemption.',
          type:             'PROJECT',
          estimatedMinutes: 90,
        },
      ],
    },

    // ── Unit 3 ───────────────────────────────────────────────────────────────
    {
      id:                'unit-3',
      unitNumber:        3,
      title:             'Redemption: From Abraham to Sinai',
      objectivesSummary: 'Trace God\'s redemptive plan from the Abrahamic covenant through the Exodus and Sinai, seeing how each covenant advances the promise of a Redeemer.',
      weekStart: 9,
      weekEnd:   12,
      lessons: [
        {
          id:               'lesson-3-1',
          weekNumber:       9,
          title:            'The Abrahamic Covenant',
          description:      'Promise, land, and blessing — how God\'s covenant with Abraham lays the foundation for the rest of Scripture.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-3-2',
          weekNumber:       10,
          title:            'The Exodus: Redemption and Liberation',
          description:      'The Passover, the Exodus, and how they prefigure Christ\'s atoning work.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-3-3',
          weekNumber:       11,
          title:            'The Mosaic Covenant: Law and Grace',
          description:      'The Ten Commandments, the tabernacle, and how the Mosaic law functions within the covenant of grace.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-3-4',
          weekNumber:       12,
          title:            'Project Week: Covenant Timeline Presentation',
          description:      'Students create a visual timeline tracing all major covenants from Creation to Sinai, presenting it in an oral or portfolio format.',
          type:             'PROJECT',
          estimatedMinutes: 90,
        },
      ],
    },

    // ── Unit 4 ───────────────────────────────────────────────────────────────
    {
      id:                'unit-4',
      unitNumber:        4,
      title:             'The Promised King',
      objectivesSummary: 'Study the Davidic covenant, the Psalms, and the wisdom literature as they point forward to the ultimate King — preparing students for the New Testament.',
      weekStart: 13,
      weekEnd:   16,
      lessons: [
        {
          id:               'lesson-4-1',
          weekNumber:       13,
          title:            'The Davidic Covenant: A King Forever',
          description:      '2 Samuel 7 and the promise of an eternal throne — its immediate fulfilment in Solomon and its ultimate fulfilment in Christ.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-4-2',
          weekNumber:       14,
          title:            'The Psalms: Israel\'s Prayer Book',
          description:      'Major psalm types (lament, praise, wisdom, royal/messianic) and how they teach us to pray, grieve, and trust.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-4-3',
          weekNumber:       15,
          title:            'Wisdom Literature: Proverbs, Ecclesiastes, Job',
          description:      'What is wisdom? The fear of the Lord as the foundation of knowledge, and how wisdom literature addresses life\'s hardest questions.',
          type:             'INSTRUCTION',
          estimatedMinutes: 60,
        },
        {
          id:               'lesson-4-4',
          weekNumber:       16,
          title:            'Project Week: A Psalm of My Own',
          description:      'Students compose an original psalm in a chosen type (lament, praise, or royal), demonstrating mastery of the unit\'s themes.',
          type:             'PROJECT',
          estimatedMinutes: 90,
        },
      ],
    },

  ],
}

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Find a course by id. Returns BIBLE_9 for any known id (extend as courses grow). */
export function getCourse(courseId: string): SeedCourse | null {
  if (courseId === BIBLE_9.id || courseId === 'example') return BIBLE_9
  return null
}

/** Find a unit within a course. */
export function getUnit(course: SeedCourse, unitId: string): SeedUnit | null {
  return course.units.find(u => u.id === unitId) ?? null
}

/** Find a lesson within a unit. */
export function getLesson(unit: SeedUnit, lessonId: string): SeedLesson | null {
  return unit.lessons.find(l => l.id === lessonId) ?? null
}

/** All lesson IDs across the entire course — useful for overall progress. */
export function allLessonIds(course: SeedCourse): string[] {
  return course.units.flatMap(u => u.lessons.map(l => l.id))
}
