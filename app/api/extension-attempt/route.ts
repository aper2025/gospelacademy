import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

async function getStudent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
}

// GET: Check if student has attempted this extension
export async function GET(req: NextRequest) {
  const user = await getStudent()
  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const lessonId = new URL(req.url).searchParams.get('lessonId')
  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
  }

  const attempt = await prisma.extensionAttempt.findUnique({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
  })

  return NextResponse.json({ attempt })
}

// POST: Record an extension attempt
export async function POST(req: NextRequest) {
  const user = await getStudent()
  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { lessonId, attempted, revealed } = body

  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
  }

  const attempt = await prisma.extensionAttempt.upsert({
    where: { studentId_lessonId: { studentId: user.id, lessonId } },
    create: {
      studentId: user.id,
      lessonId,
      attempted: attempted ?? true,
      revealed: revealed ?? false,
    },
    update: {
      attempted: attempted ?? true,
      ...(revealed ? { revealed: true } : {}),
    },
  })

  return NextResponse.json({ attempt })
}
