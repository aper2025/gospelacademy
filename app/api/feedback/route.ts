import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

const VALID_CATEGORIES = ['content', 'tutor', 'ui', 'general'] as const

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

// ─── POST — Submit feedback ─────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 5 feedback submissions per hour per user
    const rl = checkRateLimit(`feedback:${dbUser.id}`, { limit: 5, windowSeconds: 3600 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    const body = await request.json() as {
      category?: string
      rating?: number
      message?: string
      page?: string
    }

    const { category, rating, message, page } = body

    if (!category || !VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
      return NextResponse.json({ error: 'Valid category required.' }, { status: 400 })
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1-5.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message must be under 2000 characters.' }, { status: 400 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId: dbUser.id,
        category,
        rating,
        message: message.trim(),
        page: page ?? null,
      },
    })

    return NextResponse.json({ success: true, id: feedback.id })
  } catch (err) {
    console.error('[feedback/POST]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ─── GET — Fetch feedback (admin only) ──────────────────────────────────────

export async function GET() {
  try {
    const dbUser = await getAuthUser()
    if (!dbUser || dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const feedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: { select: { name: true, email: true, role: true } },
      },
    })

    return NextResponse.json({ feedback })
  } catch (err) {
    console.error('[feedback/GET]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
