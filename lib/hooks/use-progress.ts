'use client'

/**
 * useProgress — Database-backed lesson completion tracker.
 *
 * Fetches progress from /api/progress on mount, scoped by courseId.
 * Mutations use optimistic updates + API persistence.
 *
 * The public API surface matches the original localStorage version
 * so existing call-sites don't need changes (except passing courseId).
 */

import { useState, useCallback, useEffect, useRef } from 'react'

export type LessonStatus = 'completed' | 'in-progress' | 'not-started'

export interface CourseCompletedInfo {
  courseId: string
}

export interface UseProgressReturn {
  status: (lessonId: string) => LessonStatus
  markComplete:   (lessonId: string) => void
  markStarted:    (lessonId: string) => void
  markIncomplete: (lessonId: string) => void
  completedCount: (lessonIds: string[]) => number
  isComplete:     (lessonId: string) => boolean
  isUnitComplete: (lessonIds: string[]) => boolean
  isUnitUnlocked: (unitIndex: number, units: { lessons: { id: string }[] }[]) => boolean
  lastCourseCompleted: CourseCompletedInfo | null
  clearCourseCompleted: () => void
}

export function useProgress(courseId?: string): UseProgressReturn {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [started, setStarted]     = useState<Set<string>>(new Set())
  const [lastCourseCompleted, setLastCourseCompleted] = useState<CourseCompletedInfo | null>(null)
  const fetchedRef = useRef(false)

  // Hydrate from API on mount
  useEffect(() => {
    fetchedRef.current = false
    const url = courseId
      ? `/api/progress?courseId=${courseId}`
      : '/api/progress'

    fetch(url)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.progress) return
        const comp = new Set<string>()
        const strt = new Set<string>()
        for (const p of data.progress as Array<{ lessonId: string; status: string }>) {
          if (p.status === 'COMPLETED') comp.add(p.lessonId)
          else if (p.status === 'STARTED') strt.add(p.lessonId)
        }
        setCompleted(comp)
        setStarted(strt)
        fetchedRef.current = true
      })
      .catch(console.error)
  }, [courseId])

  const markComplete = useCallback((id: string) => {
    // Optimistic update
    setCompleted(prev => new Set(prev).add(id))
    setStarted(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    // Persist and check for course completion
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: id, status: 'COMPLETED' }),
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.courseCompleted && data.courseId) {
          setLastCourseCompleted({ courseId: data.courseId })
        }
      })
      .catch(console.error)
  }, [])

  const markStarted = useCallback((id: string) => {
    // Optimistic: add to started if not already started or completed
    setCompleted(prev => {
      if (prev.has(id)) return prev // Already completed — skip
      setStarted(s => {
        if (s.has(id)) return s
        const next = new Set(s).add(id)
        // Persist (server guards against downgrading COMPLETED)
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId: id, status: 'STARTED' }),
        }).catch(console.error)
        return next
      })
      return prev
    })
  }, [])

  const markIncomplete = useCallback((id: string) => {
    // Optimistic update
    setCompleted(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    // Persist
    fetch('/api/progress', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: id }),
    }).catch(console.error)
  }, [])

  const status = useCallback((id: string): LessonStatus => {
    if (completed.has(id)) return 'completed'
    if (started.has(id))   return 'in-progress'
    return 'not-started'
  }, [completed, started])

  const isComplete = useCallback((id: string) => completed.has(id), [completed])

  const completedCount = useCallback(
    (ids: string[]) => ids.filter(id => completed.has(id)).length,
    [completed],
  )

  const isUnitComplete = useCallback(
    (lessonIds: string[]) => lessonIds.length > 0 && lessonIds.every(id => completed.has(id)),
    [completed],
  )

  const isUnitUnlocked = useCallback(
    (unitIndex: number, units: { lessons: { id: string }[] }[]) => {
      if (unitIndex === 0) return true
      const prevUnit = units[unitIndex - 1]
      if (!prevUnit) return true
      const prevLessonIds = prevUnit.lessons.map(l => l.id)
      return prevLessonIds.length > 0 && prevLessonIds.every(id => completed.has(id))
    },
    [completed],
  )

  const clearCourseCompleted = useCallback(() => {
    setLastCourseCompleted(null)
  }, [])

  return {
    status, markComplete, markStarted, markIncomplete,
    completedCount, isComplete, isUnitComplete, isUnitUnlocked,
    lastCourseCompleted, clearCourseCompleted,
  }
}
