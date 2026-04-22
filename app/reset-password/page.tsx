'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let cancelled = false

    async function init() {
      // 1. Check for hash tokens (implicit flow / Supabase may append these)
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        window.history.replaceState(null, '', window.location.pathname)
        if (!cancelled) {
          if (sessionError) {
            setError('This reset link is invalid or has expired. Please request a new one.')
          } else {
            setSessionReady(true)
          }
          setInitializing(false)
        }
        return
      }

      // 2. PKCE flow — session cookies set by /auth/callback
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return

      if (session) {
        setSessionReady(true)
        setInitializing(false)
        return
      }

      // 3. No session yet — wait briefly for onAuthStateChange to fire
      await new Promise(resolve => setTimeout(resolve, 1500))
      if (cancelled) return

      const { data: { session: retrySession } } = await supabase.auth.getSession()
      if (cancelled) return

      if (retrySession) {
        setSessionReady(true)
      } else {
        setError('No active session. Please use the reset link from your email.')
      }
      setInitializing(false)
    }

    // Listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setSessionReady(true)
        setInitializing(false)
      }
    })

    init()

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = async () => {
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      if (
        updateError.message.includes('expired') ||
        updateError.message.includes('invalid') ||
        updateError.message.includes('same_password')
      ) {
        setError('This reset link has expired or the password is the same as your current one. Please try again.')
      } else {
        setError(updateError.message)
      }
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h1>
        <p className="text-gray-500 mb-8">Enter your new password below.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
            {(error.includes('expired') || error.includes('invalid') || error.includes('No active session')) && (
              <Link href="/forgot-password" className="block mt-2 text-[#E8632B] hover:underline">
                Request a new reset link
              </Link>
            )}
          </div>
        )}

        {initializing ? (
          <div className="flex items-center justify-center py-8">
            <svg className="w-6 h-6 animate-spin text-[#E8632B]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="ml-3 text-gray-500 text-sm">Verifying reset link...</span>
          </div>
        ) : success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
            Password updated successfully! Redirecting to dashboard...
          </div>
        ) : sessionReady ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-[#E8632B] focus:ring-1 focus:ring-[#E8632B]"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleReset()}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-[#E8632B] focus:ring-1 focus:ring-[#E8632B]"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full bg-[#E8632B] hover:bg-[#d4571f] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        ) : null}

        <p className="text-gray-500 text-sm text-center mt-6">
          <Link href="/login" className="text-[#E8632B] hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
