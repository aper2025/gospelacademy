import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const ROLE_REDIRECT: Record<string, string> = {
  ADMIN: '/dashboard/admin',
  PARENT: '/dashboard/parent',
  STUDENT: '/dashboard/student',
  TEACHER: '/dashboard/student',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { role: true },
  })

  if (!dbUser) {
    const name =
      (user.user_metadata?.full_name as string | undefined) ??
      user.email!.split('@')[0]

    dbUser = await prisma.user.create({
      data: {
        email: user.email!,
        name,
        role: 'STUDENT',
      },
      select: { role: true },
    })
  }

  redirect(ROLE_REDIRECT[dbUser.role] ?? '/dashboard/student')
}
