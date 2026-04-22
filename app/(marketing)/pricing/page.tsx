'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PRICES } from '@/lib/stripe-prices'

import { gradeLevelRange } from '@/lib/grade-labels'

type BillingCycle = 'monthly' | 'annual'

interface CourseOption {
  id: string
  title: string
  subject: string
  gradeLevelMin: number
  gradeLevelMax: number
}

interface PricingTier {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  annualMonthly: number
  description: string
  badge?: string
  features: string[]
  cta: string
  priceIdMonthly?: string
  priceIdAnnual?: string
  ctaHref?: string
  highlight: boolean
}

const TIERS: PricingTier[] = [
  {
    id: 'single',
    name: 'Single Student',
    monthlyPrice: 49,
    annualPrice: 399,
    annualMonthly: 33,
    description: 'Everything one student needs to thrive academically and spiritually.',
    features: [
      '1 student',
      'All courses (Pre-K through Grade 12)',
      'AI Master Tutor, 24/7',
      'All three learning pathways',
      'Parent progress dashboard',
      'Biblical worldview in every subject',
    ],
    cta: 'Get Started',
    priceIdMonthly: PRICES.single_monthly,
    priceIdAnnual: PRICES.single_annual_value,
    highlight: false,
  },
  {
    id: 'family',
    name: 'Family',
    monthlyPrice: 89,
    annualPrice: 890,
    annualMonthly: 74,
    description: 'One plan for the whole family — each child gets their own tailored experience.',
    badge: 'Most Popular',
    features: [
      'Up to 3 students',
      'All courses per student',
      'AI Master Tutor, 24/7 for all students',
      'All three learning pathways',
      'Multi-student parent dashboard',
      'Biblical worldview in every subject',
      'Priority email support',
    ],
    cta: 'Get Started',
    priceIdMonthly: PRICES.family_monthly,
    priceIdAnnual: PRICES.family_annual,
    highlight: true,
  },
  {
    id: 'school',
    name: 'School / Co-op',
    monthlyPrice: 149,
    annualPrice: 1490,
    annualMonthly: 124,
    description: 'Designed for homeschool co-ops, micro-schools, and small Christian schools.',
    features: [
      'Up to 10 students',
      'All courses per student',
      'AI Master Tutor, 24/7',
      'All three learning pathways',
      'Admin dashboard with full reporting',
      'Biblical worldview in every subject',
      'Priority support + onboarding call',
    ],
    cta: 'Contact Us',
    ctaHref: 'mailto:ap@veritasaisolutions.com',
    priceIdMonthly: PRICES.school_monthly,
    priceIdAnnual: PRICES.school_annual,
    highlight: false,
  },
]

const VALUE_COMPARISON = [
  { courses: 1, perCourse: 149, annual: 399 },
  { courses: 3, perCourse: 447, annual: 399 },
  { courses: 5, perCourse: 745, annual: 399 },
]

const FAQS = [
  {
    question: 'What\'s the difference between buying a course and subscribing?',
    answer:
      'Buying a course gives you lifetime access to that single course for $149 — perfect if your child only needs one or two subjects. A subscription gives you access to all 10 courses for a monthly or annual fee. If your child is taking 3 or more courses, the all-access subscription is the better value.',
  },
  {
    question: 'Can I upgrade from per-course to a subscription?',
    answer:
      'Yes! You can upgrade to a full subscription at any time. Your per-course purchase remains valid as lifetime access — the subscription simply adds access to all other courses.',
  },
  {
    question: 'What does lifetime access mean?',
    answer:
      'When you buy an individual course, your child has access to that course forever — no recurring fees, no expiration. You own it. This includes all future updates to that course\'s content.',
  },
  {
    question: 'Can I switch between pathways mid-year?',
    answer:
      'Yes. Students can change their learning pathway at any time from their dashboard. Our AI Tutor will adapt to the new pace and style immediately, ensuring a smooth transition.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'We offer a 14-day money-back guarantee on all plans. If The Gospel Academy isn\'t the right fit, contact us within 14 days of your first payment and we\'ll issue a full refund — no questions asked.',
  },
  {
    question: 'What grades are supported?',
    answer:
      'The Gospel Academy serves Pre-K through Grade 12 across five core subjects: Bible & Theology, Mathematics, Language Arts, Science, and History & Geography.',
  },
  {
    question: 'Does the annual plan renew automatically?',
    answer:
      'Yes, all plans renew automatically at the end of your billing period. You can cancel at any time from your account settings. Annual plans are non-refundable after the 14-day guarantee window.',
  },
  {
    question: 'How does the AI tutor work?',
    answer:
      'Our AI Master Tutor uses the Socratic method to guide students through each lesson — asking thought-provoking questions rather than giving away answers. It\'s available 24/7, adapts to your child\'s pathway and grade level, and is fully aware of the lesson context. Think of it as a tireless, patient tutor that meets your child exactly where they are.',
  },
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('annual')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loadingTier, setLoadingTier] = useState<string | null>(null)
  const [loadingCourse, setLoadingCourse] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  // Per-course state
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [selectedGrade, setSelectedGrade] = useState<string>('all')
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data: { courses?: CourseOption[] }) => {
        if (data.courses) {
          setCourses(data.courses)
        }
      })
      .catch(() => {})
  }, [])

  const filteredCourses = selectedGrade === 'all'
    ? courses
    : courses.filter((c) => {
        const grade = parseInt(selectedGrade, 10)
        return c.gradeLevelMin <= grade && c.gradeLevelMax >= grade
      })

  async function handleCheckout(tier: PricingTier) {
    const priceId = billing === 'annual' ? tier.priceIdAnnual : tier.priceIdMonthly
    if (!priceId) return

    setLoadingTier(tier.id)
    setCheckoutError(null)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json() as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Could not start checkout.')
      }

      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoadingTier(null)
    }
  }

  async function handleCoursePurchase() {
    if (!selectedCourseId) return

    setLoadingCourse(true)
    setCheckoutError(null)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRICES.per_course,
          courseId: selectedCourseId,
          mode: 'payment',
        }),
      })

      const data = await res.json() as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Could not start checkout.')
      }

      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoadingCourse(false)
    }
  }

  return (
    <>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-[#E8632B]/10 text-[#E8632B] text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-[#E8632B]/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8632B]" />
          14-day money-back guarantee
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Invest in Your Child&apos;s Future
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Faith-rooted education powered by AI — at a fraction of the cost of private tutoring.
        </p>
      </section>

      {/* ── Section A: Buy Individual Courses ─────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Buy Individual Courses</h2>
              <p className="text-gray-600 text-sm">One-time purchase. Lifetime access. No subscription required.</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-gray-900">$149</span>
              <span className="text-gray-500 text-sm ml-1">/course</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="grade-select" className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                Filter by grade
              </label>
              <select
                id="grade-select"
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value)
                  setSelectedCourseId('')
                }}
                className="w-full bg-gray-50 ring-1 ring-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8632B]"
              >
                <option value="all">All grades</option>
                <option value="0">Pre-K</option>
                <option value="1">Kindergarten</option>
                <option value="2">Grade 1</option>
                <option value="3">Grade 2</option>
                <option value="4">Grade 3</option>
                <option value="5">Grade 4</option>
                <option value="6">Grade 5</option>
                <option value="7">Grade 6</option>
                <option value="8">Grade 7</option>
                <option value="9">Grade 8 / Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div>
              <label htmlFor="course-select" className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                Select a course
              </label>
              <select
                id="course-select"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-gray-50 ring-1 ring-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8632B]"
              >
                <option value="">Choose a course...</option>
                {filteredCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({gradeLevelRange(c.gradeLevelMin, c.gradeLevelMax)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCoursePurchase}
            disabled={!selectedCourseId || loadingCourse}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3 rounded-lg ring-1 ring-[#E8632B] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingCourse ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Redirecting&hellip;
              </>
            ) : (
              'Buy This Course — $149'
            )}
          </button>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckIcon /> Lifetime access</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> AI Master Tutor included</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> All pathway levels</span>
          </div>
        </div>
      </section>

      {/* Divider with "OR" */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative">
          <div className="border-t border-gray-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-xs text-gray-500 uppercase tracking-widest">
            or get all-access
          </span>
        </div>
      </div>

      {/* ── Section B: All-Access Plans ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20 mb-4">
            Best value
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">All-Access Plans</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Unlimited courses for one price. The more subjects your child takes, the more you save.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 bg-gray-100 ring-1 ring-gray-200 rounded-xl p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billing === 'annual'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Annual
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                billing === 'annual'
                  ? 'bg-emerald-500/15 text-emerald-700'
                  : 'bg-emerald-500/10 text-emerald-600'
              }`}>
                Save up to 32%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {TIERS.map((tier) => {
            const price = billing === 'annual' ? tier.annualMonthly : tier.monthlyPrice
            const billed = billing === 'annual'
              ? `Billed $${tier.annualPrice}/year`
              : 'Billed monthly'

            const savings = billing === 'annual' && tier.id === 'single'
              ? 'Save $189 vs monthly'
              : null

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl ring-1 overflow-hidden ${
                  tier.highlight
                    ? 'bg-white ring-[#E8632B] shadow-lg shadow-[#E8632B]/10'
                    : 'bg-white ring-gray-200'
                }`}
              >
                {tier.badge && (
                  <div className="bg-[#E8632B] text-white text-xs font-semibold text-center py-2 tracking-wide uppercase">
                    {tier.badge}
                  </div>
                )}

                <div className="flex flex-col flex-1 p-7">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{tier.name}</h2>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{tier.description}</p>

                  <div className="mb-1">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">${price}</span>
                    <span className="text-gray-500 text-sm ml-1">/mo</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{billed}</p>
                  {savings && (
                    <p className="text-xs text-emerald-600 font-medium mb-6">{savings}</p>
                  )}
                  {!savings && <div className="mb-6" />}

                  {tier.ctaHref?.startsWith('mailto') ? (
                    <a
                      href={tier.ctaHref}
                      className={`inline-flex items-center justify-center w-full py-3 rounded-lg text-sm font-semibold transition-all mb-8 ${
                        tier.highlight
                          ? 'bg-[#E8632B] hover:bg-[#d4571f] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 ring-1 ring-gray-200'
                      }`}
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCheckout(tier)}
                      disabled={loadingTier === tier.id}
                      className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold transition-all mb-8 disabled:opacity-70 disabled:cursor-not-allowed ${
                        tier.highlight
                          ? 'bg-[#E8632B] hover:bg-[#d4571f] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 ring-1 ring-gray-200'
                      }`}
                    >
                      {loadingTier === tier.id ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Redirecting&hellip;
                        </>
                      ) : tier.cta}
                    </button>
                  )}

                  <div className="border-t border-gray-200 pt-7 space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          All plans include a 14-day money-back guarantee. No contracts. Cancel anytime.
        </p>

        {checkoutError && (
          <div className="mt-6 max-w-md mx-auto text-center text-xs text-rose-600 bg-rose-500/10 ring-1 ring-rose-500/20 px-4 py-3 rounded-xl">
            {checkoutError}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* ── Section C: Value Comparison ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Per-course vs. all-access</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            See how quickly the all-access plan pays for itself.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-gray-500 font-medium">Courses</th>
                <th className="text-center py-4 px-4 text-gray-500 font-medium">Per-course total</th>
                <th className="text-center py-4 px-4 text-[#E8632B] font-medium">All-access annual</th>
                <th className="text-center py-4 px-4 text-gray-500 font-medium">You save</th>
              </tr>
            </thead>
            <tbody>
              {VALUE_COMPARISON.map((row) => {
                const savings = row.perCourse - row.annual
                const savesMore = savings > 0
                return (
                  <tr key={row.courses} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {row.courses} course{row.courses > 1 ? 's' : ''}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500">
                      ${row.perCourse}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-[#E8632B]/10 text-[#E8632B] px-3 py-1 rounded-full text-xs font-semibold">
                        $399/yr
                      </span>
                    </td>
                    <td className={`py-4 px-4 text-center font-semibold ${savesMore ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {savesMore ? `$${savings} with all-access` : 'Per-course is cheaper'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Taking 3+ courses? The all-access subscription is the smarter choice.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <p className="text-gray-600">Everything you need to know before enrolling.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i} className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#07212D] rounded-2xl px-8 sm:px-12 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start your free trial today
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            14 days, no commitment. Experience the full platform before you pay a cent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Create your free account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="mailto:ap@veritasaisolutions.com"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-lg ring-1 ring-white/20 transition-colors text-base"
            >
              Talk to us first
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
