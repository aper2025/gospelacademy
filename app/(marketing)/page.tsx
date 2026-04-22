import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Gospel Academy — World-Class Christian Education',
  description:
    'Christ-centered online school for Pre-K through Grade 12 with personalized tutoring, three flexible learning pathways, and biblical worldview integration.',
  openGraph: {
    title: 'The Gospel Academy — World-Class Christian Education',
    description: 'Christ-centered online education for Pre-K through Grade 12 with personalized tutoring and three flexible learning pathways.',
  },
}

const audiences = [
  {
    title: 'Homeschool Families',
    description:
      'A complete, structured curriculum your children can follow at their own pace — with built-in tutoring support so you don\'t have to teach every subject yourself.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: 'Christian Schools',
    description:
      'Supplement your existing curriculum with our courses, or use our platform as a complete solution. Ideal for schools looking for quality digital resources rooted in a biblical worldview.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
  {
    title: 'International Students',
    description:
      'Access an accredited American education from anywhere in the world. Our online platform removes geographic barriers so every student can learn.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Individual Courses',
    description:
      'Need just one subject? Students can enroll in individual courses — perfect for filling gaps, getting ahead, or exploring new interests.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
]

const pathways = [
  {
    name: 'Advanced Scholars',
    description:
      'Rigorous, college-preparatory curriculum for high-achieving students ready to be challenged at every level.',
    badge: 'Honors Track',
  },
  {
    name: 'Standard Academic',
    description:
      'A well-rounded, biblically-integrated education that builds strong foundations in all core disciplines.',
    badge: 'Core Track',
  },
  {
    name: 'Vocational',
    description:
      'Practical skills training woven with faith principles, preparing students for trades and entrepreneurship.',
    badge: 'Skills Track',
  },
]

const features = [
  {
    title: 'Biblical Worldview',
    description:
      'Every subject is taught through the lens of Scripture. Truth, beauty, and knowledge are anchored in God\'s Word.',
  },
  {
    title: 'Personalized Tutoring',
    description:
      'Our intelligent tutor provides Socratic instruction, answers questions, and adapts to each student\'s learning pace — available 24/7.',
  },
  {
    title: 'Flexible Learning',
    description:
      'Learn at your own pace from anywhere in the world. Structured courses meet the needs of homeschool, hybrid, and traditional families.',
  },
  {
    title: 'Parent Dashboard',
    description:
      'Track your child\'s progress, view grades, and stay involved with a comprehensive parent dashboard.',
  },
  {
    title: 'Three Pathways',
    description:
      'Advanced, Standard, and Vocational tracks ensure every student is challenged at the right level.',
  },
  {
    title: 'Pre-K through Grade 12',
    description:
      'A complete education covering Bible, Mathematics, Language Arts, Science, and History across all grade levels.',
  },
]

const subjects = ['Bible & Theology', 'Mathematics', 'Language Arts', 'Science', 'History']

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-6">
            World-Class Christian Education,{' '}
            <span className="text-[#E8632B]">
              Preparing the Next Generation for Success
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
            A rigorous, biblically-grounded online school with personalized tutoring,
            three learning pathways, and the flexibility your family needs — Pre-K through Grade 12.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Start Free Trial
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3.5 rounded-lg ring-1 ring-gray-300 transition-colors text-base"
            >
              View Pricing
            </Link>
          </div>

          {/* Subject pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {subjects.map((s) => (
              <span
                key={s}
                className="text-sm text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Whether you&apos;re a parent, a school, or a student anywhere in the world — we have a path for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-xl p-6 ring-1 ring-gray-200 hover:ring-[#E8632B]/30 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E8632B]/10 flex items-center justify-center text-[#E8632B] mb-4">
                  {a.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Three Learning Pathways</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Every student is unique. Choose the track that best fits your child&apos;s calling and goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {pathways.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-xl p-7 ring-1 ring-gray-200 hover:ring-[#E8632B]/30 hover:shadow-sm transition-all"
            >
              <span className="inline-block text-xs font-medium text-[#E8632B] bg-[#E8632B]/10 px-3 py-1 rounded-full mb-4">
                {p.badge}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why The Gospel Academy</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Every element is designed to form the whole student — mind, character, and calling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-[#07212D] rounded-2xl px-8 sm:px-12 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            Join families and schools who are educating the next generation of
            faithful, capable leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Create Your Free Account
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
