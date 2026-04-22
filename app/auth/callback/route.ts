import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /auth/callback
 *
 * Supabase redirects here after email-based auth flows (signup confirmation,
 * password recovery, magic links).  The `code` query param is exchanged for
 * a session via PKCE, then we redirect based on the flow type.
 *
 * IMPORTANT: We create the Supabase client inline (not via the shared
 * createClient helper) so that cookie-setting errors are NOT silently
 * swallowed.  The shared helper wraps setAll in try/catch {} which can
 * cause the session cookies to be lost on redirect.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const rawNext = searchParams.get('next') ?? '/dashboard'
  // Prevent open redirect: only allow relative paths, block protocol-relative URLs
  const next = (rawNext.startsWith('/') && !rawNext.startsWith('//')) ? rawNext : '/dashboard'

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/reset-password', baseUrl))
      }
      return NextResponse.redirect(new URL(next, baseUrl))
    }

    console.error('[auth/callback] Code exchange failed:', error.message)
  }

  return NextResponse.redirect(
    new URL('/login?error=auth_callback_failed', baseUrl)
  )
}
