import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { type Plan, type SubscriptionStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { PRICES } from '@/lib/stripe-prices'

// Map Stripe price IDs → internal Plan enum
const PRICE_TO_PLAN: Record<string, Plan> = {
  [PRICES.single_monthly]:      'SINGLE',
  [PRICES.single_annual]:       'SINGLE',
  [PRICES.single_annual_value]: 'SINGLE',
  [PRICES.per_course]:          'SINGLE',
  [PRICES.family_monthly]:      'FAMILY',
  [PRICES.family_annual]:       'FAMILY',
  [PRICES.school_monthly]:      'SCHOOL',
  [PRICES.school_annual]:       'SCHOOL',
}

// Map Stripe subscription statuses → internal SubscriptionStatus enum
const STRIPE_STATUS_MAP: Record<string, SubscriptionStatus> = {
  active:             'ACTIVE',
  trialing:           'TRIALING',
  past_due:           'PAST_DUE',
  canceled:           'CANCELED',
  unpaid:             'PAST_DUE',
  incomplete:         'PAST_DUE',
  incomplete_expired: 'CANCELED',
  paused:             'PAST_DUE',
}

function getPlan(priceId: string): Plan {
  const plan = PRICE_TO_PLAN[priceId]
  if (!plan) {
    // Log so unmapped price IDs are visible immediately — don't silently default
    console.warn(`[webhook] Unknown priceId "${priceId}" — defaulting plan to SINGLE. Add it to PRICE_TO_PLAN.`)
  }
  return plan ?? 'SINGLE'
}

function getStatus(stripeStatus: string): SubscriptionStatus {
  const status = STRIPE_STATUS_MAP[stripeStatus]
  if (!status) {
    console.warn(`[webhook] Unknown Stripe status "${stripeStatus}" — defaulting to PAST_DUE.`)
  }
  return status ?? 'PAST_DUE'
}

/**
 * Build a Subscription upsert payload from a Stripe Subscription object.
 * Centralised so checkout.session.completed and customer.subscription.updated
 * both write the same fields.
 */
function buildSubscriptionPayload(
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
) {
  const item = subscription.items.data[0]
  if (!item) {
    throw new Error(`[webhook] Subscription ${subscription.id} has no line items.`)
  }

  const priceId = item.price.id
  // In Stripe SDK v20 / API 2026-02-25, current_period_end lives on the
  // SubscriptionItem, not the Subscription object.
  const periodEnd = item.current_period_end

  return {
    userId,
    stripeCustomerId:     customerId,
    stripeSubscriptionId: subscription.id,
    stripePriceId:        priceId,
    status:               getStatus(subscription.status),
    plan:                 getPlan(priceId),
    currentPeriodEnd:     new Date(periodEnd * 1000),
  }
}

// In App Router, request.text() returns the raw body — required for Stripe
// webhook signature verification (must not be parsed by a body parser first).
export async function POST(request: NextRequest) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[webhook] Missing stripe-signature header.')
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }

  console.log(`[webhook] Received event: ${event.type} (${event.id})`)

  try {
    switch (event.type) {

      // ── 1. Checkout completed → create/update Subscription ─────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`[webhook] checkout.session.completed — session ${session.id}, mode: ${session.mode}`)

        // ── Per-course one-time payment ─────────────────────────────────────
        if (session.mode === 'payment') {
          const courseId = session.metadata?.courseId
          if (!courseId) {
            console.error('[webhook] One-time payment session has no courseId in metadata. Skipping.')
            break
          }

          // Resolve customer email
          let paymentEmail = session.customer_email
          if (!paymentEmail && session.customer) {
            const customer = await stripe.customers.retrieve(session.customer as string)
            if (!customer.deleted) {
              paymentEmail = (customer as Stripe.Customer).email
            }
          }
          if (!paymentEmail) {
            console.error(`[webhook] Could not resolve email for one-time payment session ${session.id}.`)
            break
          }

          console.log(`[webhook] Per-course purchase: ${courseId} by ${paymentEmail}`)

          const paymentCustomerName =
            session.customer_details?.name ??
            paymentEmail.split('@')[0]

          const paymentUser = await prisma.user.upsert({
            where:  { email: paymentEmail },
            create: { email: paymentEmail, name: paymentCustomerName, role: 'PARENT' },
            update: {},
            select: { id: true },
          })
          console.log(`[webhook] User upserted for per-course — userId: ${paymentUser.id}`)

          // Find the parent's first student (linked via parentId)
          const student = await prisma.user.findFirst({
            where: { parentId: paymentUser.id, role: 'STUDENT' },
            select: { id: true },
          })
          const studentId = student?.id
          if (studentId) {
            const existing = await prisma.enrollment.findFirst({
              where: { studentId, courseId },
            })
            if (!existing) {
              await prisma.enrollment.create({
                data: { studentId, courseId, pathway: 'STANDARD', status: 'ACTIVE' },
              })
              console.log(`[webhook] Enrolled student ${studentId} in course ${courseId}`)
            } else {
              console.log(`[webhook] Student ${studentId} already enrolled in ${courseId}`)
            }
          } else {
            console.log(`[webhook] No student found for user ${paymentUser.id}. Course ${courseId} will be enrolled after onboarding.`)
          }
          break
        }

        // ── Subscription checkout ───────────────────────────────────────────
        if (!session.subscription) {
          console.log('[webhook] Session has no subscription. Skipping.')
          break
        }
        if (!session.customer) {
          console.error('[webhook] Session has no customer. Cannot create subscription record.')
          break
        }

        // Retrieve the full Stripe Subscription to get current_period_end + price
        console.log(`[webhook] Retrieving subscription ${session.subscription}`)
        const stripeSub = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )

        // Resolve customer email — prefer session field, fall back to Stripe customer object
        let customerEmail = session.customer_email
        if (!customerEmail) {
          console.log('[webhook] customer_email not on session, fetching from Stripe customer object')
          const customer = await stripe.customers.retrieve(session.customer as string)
          if (!customer.deleted) {
            customerEmail = (customer as Stripe.Customer).email
          }
        }

        if (!customerEmail) {
          console.error(`[webhook] Could not resolve email for session ${session.id}. Subscription NOT saved.`)
          break
        }

        console.log(`[webhook] Resolved customer email: ${customerEmail}`)

        // Upsert User — new subscribers may not have visited /dashboard yet
        const customerName =
          session.customer_details?.name ??
          session.customer_email?.split('@')[0] ??
          ''

        const user = await prisma.user.upsert({
          where:  { email: customerEmail },
          create: { email: customerEmail, name: customerName || customerEmail.split('@')[0], role: 'PARENT' },
          update: {},
          select: { id: true },
        })
        console.log(`[webhook] User upserted — userId: ${user.id}`)

        const payload = buildSubscriptionPayload(user.id, session.customer as string, stripeSub)
        console.log(`[webhook] Upserting Subscription:`, {
          userId:               payload.userId,
          plan:                 payload.plan,
          status:               payload.status,
          stripeSubscriptionId: payload.stripeSubscriptionId,
          stripePriceId:        payload.stripePriceId,
          currentPeriodEnd:     payload.currentPeriodEnd,
        })

        await prisma.subscription.upsert({
          where:  { userId: user.id },
          create: payload,
          update: payload,
        })
        console.log(`[webhook] Subscription record saved for userId: ${user.id}`)
        break
      }

      // ── 2. Subscription changed (plan upgrade/downgrade, status change) ─
      case 'customer.subscription.updated': {
        const stripeSub    = event.data.object as Stripe.Subscription
        const customerId   = stripeSub.customer as string
        console.log(`[webhook] customer.subscription.updated — subscription ${stripeSub.id}, status: ${stripeSub.status}`)

        // Look up user via stripeCustomerId on the existing Subscription record.
        // If none exists yet (race: updated fires before completed), find the
        // customer email from Stripe and upsert both User and Subscription.
        const existing = await prisma.subscription.findUnique({
          where:  { stripeSubscriptionId: stripeSub.id },
          select: { userId: true },
        })

        if (existing) {
          const payload = buildSubscriptionPayload(existing.userId, customerId, stripeSub)
          await prisma.subscription.update({
            where: { stripeSubscriptionId: stripeSub.id },
            data:  payload,
          })
          console.log(`[webhook] Subscription updated for userId: ${existing.userId}`)
        } else {
          // Race condition — resolve user from Stripe customer and upsert
          console.warn(`[webhook] No existing Subscription for ${stripeSub.id}. Resolving from Stripe customer.`)
          const customer = await stripe.customers.retrieve(customerId)
          const email    = !customer.deleted ? (customer as Stripe.Customer).email : null

          if (!email) {
            console.error(`[webhook] Could not resolve email for customer ${customerId}. Skipping update.`)
            break
          }

          const user = await prisma.user.upsert({
            where:  { email },
            create: { email, name: email.split('@')[0], role: 'PARENT' },
            update: {},
            select: { id: true },
          })

          const payload = buildSubscriptionPayload(user.id, customerId, stripeSub)
          await prisma.subscription.upsert({
            where:  { userId: user.id },
            create: payload,
            update: payload,
          })
          console.log(`[webhook] Subscription upserted (race recovery) for userId: ${user.id}`)
        }
        break
      }

      // ── 3. Subscription cancelled ────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const stripeSub = event.data.object as Stripe.Subscription
        console.log(`[webhook] customer.subscription.deleted — subscription ${stripeSub.id}`)

        const result = await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: stripeSub.id },
          data:  { status: 'CANCELED' },
        })
        console.log(`[webhook] Marked ${result.count} subscription(s) as CANCELED.`)
        break
      }

      default:
        console.log(`[webhook] Unhandled event type: ${event.type} — ignoring.`)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`[webhook] Error processing event ${event.type} (${event.id}):`, error)
    // Return 500 so Stripe retries the event
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }
}
