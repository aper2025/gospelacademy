import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '../faq/faq-accordion'

export const metadata: Metadata = {
  title: 'English for French Speakers — From Zero to University-Ready',
  description:
    'The only affordable English program built for French and Haitian Creole speakers. 4 CEFR levels (A1→B2), 144 lessons, TOEFL/IELTS/DET prep, biblical worldview.',
  openGraph: {
    title: 'English for French Speakers — The Gospel Academy',
    description:
      'Zero English to university-ready in one program. Built specifically for the 400 million French speakers worldwide.',
  },
  keywords: [
    'learn English French speakers',
    'English course Haitian students',
    'TOEFL prep French speakers',
    'English for Creole speakers',
    'CEFR English course',
    'UoPeople English requirement',
    'affordable English program',
  ],
}

const LEVELS = [
  {
    level: 'A1 → A2',
    title: 'English Foundations',
    weeks: '9 weeks · 36 lessons',
    description:
      'Start from zero. Learn greetings, numbers, daily vocabulary, and simple conversations. Build the habit of thinking in English.',
    outcomes: [
      'Introduce yourself confidently',
      'Handle basic daily interactions',
      'Read simple signs and menus',
      'Write short messages and notes',
    ],
    color: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    ring: 'ring-emerald-200',
  },
  {
    level: 'A2 → B1',
    title: 'English Fluency Builder',
    weeks: '9 weeks · 36 lessons',
    description:
      'Expand your vocabulary to real-world topics — work, technology, travel, and global issues. Tackle the false cognates (faux amis) that trip up every French speaker.',
    outcomes: [
      'Hold conversations on everyday topics',
      'Understand authentic audio and video',
      'Write emails and short reports',
      'Navigate workplace English',
    ],
    color: 'bg-blue-500',
    badge: 'bg-blue-50 text-blue-700 ring-blue-200',
    ring: 'ring-blue-200',
  },
  {
    level: 'B1 → B2',
    title: 'Academic English Bridge',
    weeks: '9 weeks · 36 lessons',
    description:
      'Master academic writing and reading for university. Learn how English essays differ from French dissertations. Develop critical thinking in English.',
    outcomes: [
      'Read and summarize academic texts',
      'Write structured 5-paragraph essays',
      'Participate in academic discussions',
      'Understand lectures and podcasts',
    ],
    color: 'bg-purple-500',
    badge: 'bg-purple-50 text-purple-700 ring-purple-200',
    ring: 'ring-purple-200',
  },
  {
    level: 'B2 Mastery',
    title: 'University-Ready English',
    weeks: '9 weeks · 36 lessons',
    description:
      'Full test preparation for TOEFL, IELTS, and Duolingo English Test. Mock exams in all three formats. University application guidance included.',
    outcomes: [
      'Pass TOEFL iBT (target: 61+)',
      'Pass IELTS Academic (target: 6.0+)',
      'Pass Duolingo English Test (target: 95+)',
      'Submit university applications in English',
    ],
    color: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
    ring: 'ring-amber-200',
  },
]

const COMPETITORS = [
  { name: 'EF English Live', price: '$89–$139/mo', note: 'No French-specific support' },
  { name: 'Wall Street English', price: '$150–$250/mo', note: 'In-person centers only' },
  { name: 'British Council', price: '$88–$202/mo', note: 'Generic, not CEFR-targeted' },
  { name: 'Babbel', price: '$15–$70/mo', note: 'App only, no exam prep' },
]

const FAQS = [
  {
    q: 'Do I need any English at all to start?',
    a: 'No. Level 1 (A1) starts from absolute zero. If you speak French or Haitian Creole, you can enroll and begin immediately.',
  },
  {
    q: 'How long does the full program take?',
    a: 'Each level is 9 weeks (36 lessons). The full A1–B2 journey is 36 weeks — about 9 months. Many motivated students complete two levels simultaneously.',
  },
  {
    q: 'Is this for Haitian students only?',
    a: 'No. The course is designed for any French or Creole speaker anywhere — Haiti, France, Senegal, DRC, Canada, Belgium, or anywhere in the 400-million-person Francophone community.',
  },
  {
    q: 'Will I be ready for UoPeople after this course?',
    a: "Yes. Level 4 specifically targets UoPeople's requirements (TOEFL 61, IELTS 6.0, DET 95). You'll take full mock exams in all three formats before completing the course.",
  },
  {
    q: 'What level should I start at?',
    a: 'Start at Level 1 if you know very little English. If you already have some English, take a short placement conversation with our AI tutor to find your starting level.',
  },
  {
    q: 'Is there a biblical worldview component?',
    a: 'Yes. Every lesson integrates faith-based reflection. This is an explicitly Christian program, though the English skills you learn are universal.',
  },
  {
    q: 'Can I take this alongside other Gospel Academy courses?',
    a: 'Absolutely. The English course uses the same platform, same dashboard, and same learning system. You can study English alongside any TGA course.',
  },
  {
    q: 'What are the 3 learning pathways?',
    a: 'Every lesson has three tracks: Advanced Scholars (~80 min), Standard Academic (~60 min), and Vocational (~45 min). Choose your track based on your goals.',
  },
]

export default function EnglishForFrenchSpeakersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#07212D] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>
            Conçu pour les francophones · Built for French speakers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Zero English to{' '}
            <span className="text-[#E8632B]">University-Ready</span>
            <br className="hidden sm:block" />
            {' '}in One Program.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-4">
            The only affordable English program built specifically for French and Haitian
            Creole speakers — taking you from A1 to B2 with full TOEFL, IELTS, and DET preparation.
          </p>
          <p className="text-gray-400 font-medium mb-10">
            144 lessons · 4 CEFR levels · 3 learning pathways · Biblical worldview
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Begin Your English Journey
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="#levels"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-lg ring-1 ring-white/20 transition-colors text-base"
            >
              See the 4 Levels
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#E8632B] text-white py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm font-medium">
          <span>UoPeople admission ready</span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span>TOEFL · IELTS · DET prep</span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span>Haiti · Senegal · DRC · France · Canada</span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span>Biblical worldview</span>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            400 million French speakers.
            <br />
            Zero affordable A1→B2 programs.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Existing English courses are built for generic learners. They don&apos;t address
            the specific challenges French speakers face — the faux amis, the pronunciation
            traps, the grammar differences between French and English structure. They&apos;re
            also expensive, often $100–$250/month.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Gospel Academy built what didn&apos;t exist: a complete, structured, faith-integrated
            English program designed from the ground up for the Francophone world.
          </p>
        </div>
      </section>

      {/* 4 Levels */}
      <section id="levels" className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The 4-Level Journey</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              A complete CEFR-aligned path from your first English word to university admission.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {LEVELS.map((l) => (
              <div key={l.level} className={`bg-white rounded-xl ring-1 ${l.ring} overflow-hidden`}>
                <div className={`h-1.5 ${l.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ring-1 ${l.badge} mb-2`}>
                        {l.level}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{l.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{l.weeks}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{l.description}</p>
                  <ul className="space-y-1.5">
                    {l.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Admission */}
      <section className="bg-[#07212D] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-blue-200 ring-1 ring-white/20 mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
                University Admission Track
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                This course gets you into{' '}
                <span className="text-[#E8632B]">university</span>.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                University of the People (UoPeople) is accredited, tuition-free, and accepts
                students from 200+ countries. Their English requirement is CEFR B2. That&apos;s
                exactly what this program delivers.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Level 4 includes full mock exams, test strategy sessions, and university
                application guidance — all with French-speaker-specific advice on where
                students typically lose points.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 space-y-4">
              {[
                { test: 'TOEFL iBT', score: '61+', target: 'Level 4 target: 70+' },
                { test: 'IELTS Academic', score: '6.0+', target: 'Level 4 target: 6.5+' },
                { test: 'Duolingo English Test', score: '95+', target: 'Level 4 target: 105+' },
              ].map((item) => (
                <div key={item.test} className="flex items-center justify-between bg-white/5 ring-1 ring-white/10 rounded-xl px-5 py-4">
                  <div>
                    <div className="font-semibold">{item.test}</div>
                    <div className="text-sm text-gray-400">{item.target}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{item.score}</div>
                    <div className="text-xs text-gray-400">required</div>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 bg-green-500/10 ring-1 ring-green-400/20 rounded-xl px-5 py-4">
                <svg className="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="text-sm text-green-200">
                  Level 4 graduates have full preparation for all three tests.
                  Choose whichever your target university accepts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for you. Not translated for you.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every lesson was written with French speakers in mind — not adapted from a generic course.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '50+ Faux Amis Alerts',
                desc: "Actuellement ≠ actually. Librairie ≠ library. We flag every false cognate that trips up French speakers throughout all 4 levels.",
                icon: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802',
              },
              {
                title: 'French-Specific Pronunciation',
                desc: 'Mastering /th/, the silent /h/, English stress-timing, and the schwa — specifically compared to French phonology.',
                icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
              },
              {
                title: 'Grammar Contrast Lessons',
                desc: "We teach English grammar by contrasting it with French: adjective order, question formation with do/does, present perfect vs. passé composé.",
                icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
              },
              {
                title: '3 Learning Pathways',
                desc: 'Advanced Scholars (80 min), Standard Academic (60 min), and Vocational (45 min). Every lesson, every level. Choose your intensity.',
                icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
              },
              {
                title: 'Biblical Worldview',
                desc: "Every lesson connects to scripture. Learn English through the lens of faith — reading passages, discussing principles, writing reflections.",
                icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
              },
              {
                title: 'AI Tutor for English',
                desc: "Ask questions in French. Get Socratic guidance in English. The AI tutor knows you're a French speaker and meets you where you are.",
                icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 ring-1 ring-gray-200 hover:ring-[#E8632B]/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#E8632B]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#E8632B]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Better than $150/month courses.
              <br />
              Included in your subscription.
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Every competitor charges per course. Gospel Academy includes English for French
              Speakers in every TGA subscription.
            </p>
          </div>
          <div className="space-y-3">
            {COMPETITORS.map((c) => (
              <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 rounded-xl bg-white ring-1 ring-gray-200 gap-2">
                <div>
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.note}</div>
                </div>
                <div className="text-xl font-bold text-gray-700 whitespace-nowrap">{c.price}</div>
              </div>
            ))}
            {/* TGA row — highlighted */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 rounded-xl bg-[#E8632B] text-white gap-2">
              <div>
                <div className="font-semibold">
                  Gospel Academy
                  <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-0.5">You are here</span>
                </div>
                <div className="text-sm text-orange-100">French-specific + biblical worldview + exam prep</div>
              </div>
              <div className="text-xl font-bold whitespace-nowrap">Included in TGA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Who This Is For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Haitian Students',
                desc: 'Seeking admission to UoPeople, ASU Online, or other English-medium universities. Get exactly the score you need.',
              },
              {
                title: 'Francophone Africans',
                desc: 'Students in Senegal, DRC, Ivory Coast, Cameroon, and beyond seeking international education and career opportunities.',
              },
              {
                title: 'Career Professionals',
                desc: 'French-speaking professionals in tourism, NGOs, or international business needing workplace-level English.',
              },
              {
                title: 'NGO & Mission Staff',
                desc: 'Local staff at international organizations who need to communicate with English-speaking partners and donors.',
              },
              {
                title: 'Church Communities',
                desc: 'Churches in Haiti and Francophone Africa seeking to equip their members with English for greater impact.',
              },
              {
                title: 'Immigration Families',
                desc: 'Families relocating to Canada, the US, or the UK who need structured English before or after arrival.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-[#07212D] rounded-2xl px-8 sm:px-12 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Your English Journey Today.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-3 leading-relaxed">
            144 lessons. 4 levels. Full TOEFL/IELTS/DET preparation. Designed for you — the
            French speaker who&apos;s ready to open a world of opportunity.
          </p>
          <p className="text-gray-400 italic mb-8">
            Proverbs 4:7 — &ldquo;The beginning of wisdom is this: Get wisdom.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Get Started — It&apos;s Free
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
          <p className="mt-6 text-gray-500 text-sm">
            Included with any Gospel Academy subscription · No separate payment required
          </p>
        </div>
      </section>
    </>
  )
}
