/**
 * Shared grade-level label mapping.
 *
 * The database stores grade levels as integers using an offset system:
 *   0 = Pre-K, 1 = Kindergarten, 2 = Grade 1, … 6 = Grade 5,
 *   7 = Grade 6, 8 = Grade 7, 9 = Grade 8/9 (banded),
 *   10 = Grade 10, 11 = Grade 11, 12 = Grade 12.
 */

const GRADE_LABEL_MAP: Record<number, string> = {
  0: 'Pre-K',
  1: 'Kindergarten',
  2: 'Grade 1',
  3: 'Grade 2',
  4: 'Grade 3',
  5: 'Grade 4',
  6: 'Grade 5',
  7: 'Grade 6',
  8: 'Grade 7',
  9: 'Grade 8/9',
  10: 'Grade 10',
  11: 'Grade 11',
  12: 'Grade 12',
}

export function gradeLevelLabel(level: number): string {
  return GRADE_LABEL_MAP[level] ?? `Grade ${level}`
}

export function gradeLevelRange(min: number, max: number): string {
  if (min === max) return gradeLevelLabel(min)
  return `${gradeLevelLabel(min)} – ${gradeLevelLabel(max)}`
}
