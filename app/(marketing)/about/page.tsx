import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Our Story',
  description:
    'Built on 20 years of Gospel Haiti International School experience, The Gospel Academy brings Christ-centered education to families worldwide through AI-powered learning.',
  openGraph: {
    title: 'About The Gospel Academy',
    description: 'Built on 20 years of Gospel Haiti International School experience — faith-rooted education powered by AI.',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">Our Mission</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            The Gospel Academy exists to provide world-class, biblically-grounded education to every
            student who seeks it — regardless of geography, income, or background. We believe that
            rigorous academics and deep faith are not at odds, but are meant to flourish together.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We envision a future where Christian education is accessible to every family —
            powered by AI that adapts to each student, anchored in Scripture, and delivered
            with the rigor of the best private institutions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through three distinct learning pathways — Advanced Scholars, Standard Academic,
            and Vocational — we meet each student where they are and equip them for where
            God is calling them. Our AI Master Tutor works alongside students 24/7, using the
            Socratic method to deepen understanding rather than simply dispensing answers.
          </p>
        </div>
      </section>

      {/* Gospel Haiti Connection */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#E8632B]/5 rounded-2xl ring-1 ring-[#E8632B]/20 p-8 sm:p-10">
          <span className="inline-flex items-center gap-2 bg-[#E8632B]/10 text-[#E8632B] text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-[#E8632B]/20 mb-5">
            Ministry Partnership
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gospel Haiti</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Gospel Academy is a ministry of Gospel Haiti, a nonprofit organization dedicated to
            transforming communities in Haiti through the Gospel, education, and practical support.
          </p>
          <p className="text-gray-600 leading-relaxed">
            A portion of every subscription directly supports education initiatives in Haiti —
            providing scholarships, teacher training, and learning resources to students who
            would otherwise have no access to quality education. When you enroll your child,
            you&apos;re also investing in a child across the world.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">From the Founder</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-[#E8632B] flex items-center justify-center text-white text-xl font-bold shrink-0">
              GA
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                &ldquo;I started The Gospel Academy because I saw two things that didn&apos;t have to
                be separate: excellent education and genuine faith. Too many families are forced to choose
                between academic rigor and biblical truth. With advances in AI, we can now offer both —
                personalized, high-quality instruction that keeps Christ at the center.&rdquo;
              </p>
              <p className="text-sm text-gray-500">
                — Founder, The Gospel Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gray-50 rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:support@thegospelacademy.com"
            className="inline-flex items-center gap-2 text-[#E8632B] hover:text-[#d4571f] transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            support@thegospelacademy.com
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#07212D] rounded-2xl px-8 sm:px-12 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Academy
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            Give your child the education they deserve — rigorous, faith-filled, and powered by
            technology that adapts to how they learn best.
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
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-lg ring-1 ring-white/20 transition-colors text-base"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
