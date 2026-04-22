import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { uploadFile, deleteFile, keyFromUrl } from '@/lib/storage/r2'

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true, role: true },
  })
  return dbUser
}

// ─── Rate limiting (simple in-memory) ────────────────────────────────────────

const uploadTimes: Map<string, number[]> = new Map()
const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_UPLOADS_PER_MINUTE = 10

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const times = (uploadTimes.get(userId) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  if (times.length >= MAX_UPLOADS_PER_MINUTE) return false
  times.push(now)
  uploadTimes.set(userId, times)
  return true
}

// ─── POST: Upload a resource ─────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(request: NextRequest) {
  const admin = await getAdminUser()
  if (!admin || admin.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  if (!checkRateLimit(admin.id)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const formData = await request.formData()
  const lessonId = formData.get('lessonId') as string | null
  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  const file = formData.get('file') as File | null

  if (!lessonId || !title || !file) {
    return NextResponse.json(
      { error: 'Missing required fields: lessonId, title, file' },
      { status: 400 },
    )
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB` },
      { status: 400 },
    )
  }

  // Validate file type (extension + MIME type)
  const allowedExts = new Set(['pdf','doc','docx','ppt','pptx','xls','xlsx','jpg','jpeg','png','gif','webp','mp4','mp3','wav','mov','txt','rtf','csv','svg'])
  const allowedMimes = new Set([
    'application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg','image/png','image/gif','image/webp','image/svg+xml',
    'video/mp4','video/quicktime','audio/mpeg','audio/wav',
    'text/plain','text/csv','application/rtf',
  ])
  const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
  if (!allowedExts.has(fileExt)) {
    return NextResponse.json({ error: 'File type not allowed.' }, { status: 400 })
  }
  // Verify MIME type matches expected type for the extension (if browser provides it)
  if (file.type && !allowedMimes.has(file.type) && file.type !== 'application/octet-stream') {
    return NextResponse.json({ error: 'File MIME type does not match allowed types.' }, { status: 400 })
  }

  // Verify lesson exists
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true },
  })
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  // Upload to R2
  const ext = file.name.split('.').pop() ?? 'bin'
  const key = `resources/${lessonId}/${Date.now()}-${sanitizeFilename(file.name)}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileUrl = await uploadFile(key, buffer, file.type || 'application/octet-stream')

  // Save metadata to DB
  const resource = await prisma.adminResource.create({
    data: {
      lessonId,
      title,
      description: description || null,
      fileUrl,
      fileType: file.type || `application/${ext}`,
      fileSize: file.size,
      uploadedBy: admin.id,
    },
  })

  return NextResponse.json(resource, { status: 201 })
}

// ─── GET: List resources for a lesson ────────────────────────────────────────

export async function GET(request: NextRequest) {
  const admin = await getAdminUser()
  if (!admin || admin.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const lessonId = request.nextUrl.searchParams.get('lessonId')
  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId is required' }, { status: 400 })
  }

  const resources = await prisma.adminResource.findMany({
    where: { lessonId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      fileUrl: true,
      fileType: true,
      fileSize: true,
      createdAt: true,
    },
  })

  return NextResponse.json(resources)
}

// ─── DELETE: Remove a resource ───────────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const admin = await getAdminUser()
  if (!admin || admin.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const resourceId = request.nextUrl.searchParams.get('id')
  if (!resourceId) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const resource = await prisma.adminResource.findUnique({
    where: { id: resourceId },
  })
  if (!resource) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  // Delete from R2 then DB
  await deleteFile(keyFromUrl(resource.fileUrl))
  await prisma.adminResource.delete({ where: { id: resourceId } })

  return NextResponse.json({ success: true })
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(0, 100)
}
