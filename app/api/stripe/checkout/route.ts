import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

interface CheckoutBody {
  priceId?: string
  courseId?: string
  mode?: 'subscription' | 'payment'
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const rl = checkRateLimit(`checkout:${ip}`, { limit: 10, windowSeconds: 60 })
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json() as CheckoutBody
    const { priceId, courseId, mode } = body

    if (!priceId || typeof priceId !== 'string' || priceId.trim() === '') {
      return NextResponse.json({ error: 'priceId is required.' }, { status: 400 })
    }

    if (mode === 'payment' && (!courseId || typeof courseId !== 'string')) {
      return NextResponse.json({ error: 'courseId is required for per-course purchases.' }, { status: 400 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      console.error('[checkout] STRIPE_SECRET_KEY is not set.')
      return NextResponse.json(
        { error: 'Payment system is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Log checkout request (without revealing key mode)
    console.log(`[checkout] priceId: ${priceId}, mode: ${mode ?? 'subscription'}`)

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2026-03-25.dahlia',
    })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isPayment = mode === 'payment'

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: isPayment ? 'payment' : 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: isPayment
        ? `${BASE_URL}/dashboard/parent?purchased=true&courseId=${courseId}`
        : `${BASE_URL}/dashboard/parent?enrolled=true`,
      cancel_url: `${BASE_URL}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    }

    if (isPayment && courseId) {
      sessionParams.metadata = { courseId }
    }

    if (user?.email) {
      sessionParams.customer_email = user.email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL.')
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error(`[checkout] Stripe error: ${error.type} — ${error.message}`, {
        code: error.code,
        param: error.param,
        statusCode: error.statusCode,
      })
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: error.statusCode || 500 }
      )
    }

    console.error('[checkout] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Could not create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
