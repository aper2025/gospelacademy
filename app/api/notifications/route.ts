import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true },
  })
  return dbUser
}

// ─── GET — Fetch notifications ────────────────────────────────────────────

export async function GET() {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        data: true,
        read: true,
        createdAt: true,
      },
    })

    const unreadCount = notifications.filter(n => !n.read).length

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    console.error('Notifications GET error:', error)
    return NextResponse.json({ error: 'Failed to load notifications.' }, { status: 500 })
  }
}

// ─── PUT — Mark notifications as read ─────────────────────────────────────

export async function PUT(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as { notificationIds?: string[]; markAllRead?: boolean }

    if (body.markAllRead) {
      await prisma.notification.updateMany({
        where: { userId: dbUser.id, read: false },
        data: { read: true },
      })
      return NextResponse.json({ success: true })
    }

    if (body.notificationIds?.length) {
      await prisma.notification.updateMany({
        where: {
          id: { in: body.notificationIds },
          userId: dbUser.id,
        },
        data: { read: true },
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'No action specified.' }, { status: 400 })
  } catch (error) {
    console.error('Notifications PUT error:', error)
    return NextResponse.json({ error: 'Failed to update notifications.' }, { status: 500 })
  }
}
