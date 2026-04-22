import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import SessionsTable from './sessions-table'
import type { TutorSessionMetadata } from '@/lib/ai/tutor-prompt'
import type { ChatMessage } from '@/lib/ai/provider'

export interface SessionRow {
  id: string
  studentName: string
  studentId: string
  lessonTitle: string
  courseTitle: string
  subject: string
  pathway: string
  startedAt: string
  messageCount: number
  hintLevel: number
  sessionQuality: string
  struggledConcepts: string[]
  tokenCount: number
  messages: ChatMessage[]
  needsReview: boolean
}

export default async function AdminSessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string; course?: string; quality?: string; dateFrom?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify admin role
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { role: true },
  })
  if (dbUser?.role !== 'ADMIN') redirect('/dashboard')

  const params = await searchParams

  // Build filter conditions
  const where: Record<string, unknown> = {}
  if (params.student) {
    where.student = { name: { contains: params.student, mode: 'insensitive' } }
  }
  if (params.dateFrom) {
    where.startedAt = { gte: new Date(params.dateFrom) }
  }

  const sessions = await prisma.tutorSession.findMany({
    where,
    orderBy: { startedAt: 'desc' },
    take: 100,
    select: {
      id: true,
      pathway: true,
      startedAt: true,
      metadata: true,
      tokenCount: true,
      messages: true,
      student: { select: { id: true, name: true } },
      lesson: {
        select: {
          title: true,
          unit: { select: { course: { select: { title: true, subject: true } } } },
        },
      },
    },
  })

  // Transform to serializable rows
  const rows: SessionRow[] = sessions
    .filter(s => {
      // Apply course filter
      if (params.course) {
        const courseTitle = s.lesson.unit?.course?.title ?? ''
        if (!courseTitle.toLowerCase().includes(params.course.toLowerCase())) return false
      }
      // Apply quality filter
      if (params.quality) {
        const meta = s.metadata as unknown as TutorSessionMetadata | null
        if (meta?.sessionQuality !== params.quality) return false
      }
      return true
    })
    .map(s => {
      const meta = s.metadata as unknown as TutorSessionMetadata | null
      return {
        id: s.id,
        studentName: s.student.name,
        studentId: s.student.id,
        lessonTitle: s.lesson.title ?? 'Unknown',
        courseTitle: s.lesson.unit?.course?.title ?? 'Unknown',
        subject: s.lesson.unit?.course?.subject ?? 'Unknown',
        pathway: s.pathway,
        startedAt: s.startedAt.toISOString(),
        messageCount: meta?.messageCount ?? 0,
        hintLevel: meta?.hintLevel ?? 1,
        sessionQuality: meta?.sessionQuality ?? 'engaged',
        struggledConcepts: meta?.struggledConcepts ?? [],
        tokenCount: s.tokenCount,
        messages: (s.messages as unknown as ChatMessage[]) ?? [],
        needsReview: (meta?.hintLevel ?? 1) >= 4,
      }
    })

  // Stats
  const totalSessions = rows.length
  const flaggedCount = rows.filter(r => r.needsReview).length
  const totalTokens = rows.reduce((s, r) => s + r.tokenCount, 0)
  const highTokenSessions = rows.filter(r => r.tokenCount > 2000).length

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">The Gospel Academy</Link>
            <span className="text-white/20">/</span>
            <Link href="/dashboard/admin" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">Admin</Link>
            <span className="text-white/20">/</span>
            <span className="text-sm text-gray-400">Tutor Sessions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">AI Tutor Session Log</h1>
          <p className="text-sm text-gray-400">Review all student tutor sessions across the platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
            <p className="text-2xl font-bold">{totalSessions}</p>
            <p className="text-xs text-gray-500 mt-1">Total Sessions</p>
          </div>
          <div className={`bg-gray-900 rounded-2xl p-5 ring-1 ${flaggedCount > 0 ? 'ring-amber-500/30' : 'ring-white/8'}`}>
            <p className={`text-2xl font-bold ${flaggedCount > 0 ? 'text-amber-400' : ''}`}>{flaggedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Flagged for Review</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
            <p className="text-2xl font-bold">{totalTokens.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Est. Total Tokens</p>
          </div>
          <div className={`bg-gray-900 rounded-2xl p-5 ring-1 ${highTokenSessions > 0 ? 'ring-rose-500/30' : 'ring-white/8'}`}>
            <p className={`text-2xl font-bold ${highTokenSessions > 0 ? 'text-rose-400' : ''}`}>{highTokenSessions}</p>
            <p className="text-xs text-gray-500 mt-1">High Token Sessions (&gt;2k)</p>
          </div>
        </div>

        <SessionsTable rows={rows} />
      </main>
    </div>
  )
}
