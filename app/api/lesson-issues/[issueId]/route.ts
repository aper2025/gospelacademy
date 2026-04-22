import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  return dbUser
}

// ─── PATCH — Update issue status (admin only) ──────────────────────────────

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ issueId: string }> }
) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser || dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { issueId } = await params

    const body = await request.json() as {
      status?: string
      adminNote?: string
    }

    const validStatuses = ['OPEN', 'REVIEWED', 'RESOLVED', 'DISMISSED']
    if (!body.status || !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: 'Valid status required.' }, { status: 400 })
    }

    const data: Record<string, unknown> = { status: body.status }
    if (body.adminNote !== undefined) {
      // Validate admin note length
      if (typeof body.adminNote === 'string' && body.adminNote.length > 5000) {
        return NextResponse.json({ error: 'Admin note must be under 5000 characters.' }, { status: 400 })
      }
      data.adminNote = typeof body.adminNote === 'string' ? body.adminNote.slice(0, 5000) : body.adminNote
    }
    if (body.status === 'RESOLVED' || body.status === 'DISMISSED') {
      data.resolvedAt = new Date()
    }

    const issue = await prisma.lessonIssue.update({
      where: { id: issueId },
      data,
      include: {
        user: { select: { name: true, email: true } },
        lesson: { select: { title: true } },
      },
    })

    return NextResponse.json({ issue })
  } catch (err) {
    console.error('[lesson-issues/PATCH]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
