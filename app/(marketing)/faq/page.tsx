import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from './faq-accordion'

export const metadata: Metadata = {
  title: 'FAQ — The Gospel Academy',
  description: 'Frequently asked questions about The Gospel Academy — Christian online school powered by AI tutoring for Pre-K through Grade 12.',
}

const FAQ_ITEMS = [
  {
    q: 'How is The Gospel Academy different from traditional online schools?',
    a: 'The Gospel Academy combines world-class AI tutoring with a biblical worldview integrated into every subject. Our AI Master Tutor adapts to your child\'s pace using the Socratic method — guiding them to deeper understanding rather than just giving answers. Tuition starts at $41/month versus $8,000–$15,000/year for traditional Christian schools.',
  },
  {
    q: 'What does "biblical worldview" mean in the curriculum?',
    a: 'We teach that all truth is God\'s truth. Scripture isn\'t a separate add-on — it\'s woven through every subject. In science, we explore the Creator\'s design. In history, we recognize God\'s providential hand. In literature, we develop moral imagination grounded in biblical values. In math, we reflect on the orderly mind of God. Our Grand Narrative Framework — Creation, Fall, Redemption, Restoration — runs through every course.',
  },
  {
    q: 'How does the AI tutor actually teach my child?',
    a: 'The AI Master Tutor uses the Socratic method — asking thought-provoking questions instead of giving away answers. Students struggle productively, then receive carefully scaffolded hints that guide them deeper. The tutor is available 24/7, knows your child\'s learning pathway, and provides instant feedback on assessments. It never replaces the role of a teacher — it amplifies it.',
  },
  {
    q: 'What are the three learning pathways?',
    a: 'Every course offers three pathways: Advanced Scholars (rigorous, honors-level with deeper analysis), Standard Academic (grade-level rigor with balanced support), and Vocational (practical application with more scaffolding). Students can switch pathways at any time, and the AI Tutor adjusts instantly — changing pacing, hint progression, and content depth.',
  },
  {
    q: 'What grades and subjects do you currently cover?',
    a: 'We serve Pre-K through Grade 12 across five core subjects: Bible & Theology, Mathematics, English Language Arts, Science, and History & Geography. Elementary grades (Pre-K through Grade 5) currently offer Mathematics, with additional subjects coming soon. Middle and high school grades offer the full range of courses.',
  },
  {
    q: 'Can my child work at their own pace?',
    a: 'Absolutely. There are no rigid schedules or fixed cohort timelines. Students learn at their own pace within their chosen pathway. Each lesson follows our Input → Processing → Output structure, and students can take as long as they need. Our progress dashboard helps you monitor where your child stands.',
  },
  {
    q: 'How do I track my child\'s progress and grades?',
    a: 'Parents get a dedicated dashboard showing all grades, quiz scores, essay feedback, and lesson completion progress. You can see which pathway your child is on, monitor their AI tutor conversations, and receive notifications when grades are posted or courses are completed. Certificates are automatically generated when a course is finished.',
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Yes. We offer a full refund within 14 days of your first payment — no questions asked. We genuinely want you to try the platform risk-free and see if it\'s the right fit for your family before committing.',
  },
  {
    q: 'What makes the AI tutor different from ChatGPT or other AI tools?',
    a: 'Our AI Master Tutor is purpose-built for education. It knows the lesson context, your child\'s pathway, their learning history, and their struggle patterns. It never gives direct answers — it uses carefully scaffolded hints (4 levels) that match your child\'s pace. It also integrates biblical theology naturally and is designed to deepen thinking, not replace it.',
  },
  {
    q: 'How can I get started?',
    a: 'Click "Get Started" to create your parent account, then walk through our 4-step onboarding wizard to set up your student\'s profile, choose a course, and select a learning pathway. Your student can begin their first lesson immediately — no waiting period.',
  },
]

export default function FaqPage() {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#E8632B] bg-[#E8632B]/10 ring-1 ring-[#E8632B]/20 px-3 py-1 rounded-full mb-6">
            Common Questions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about The Gospel Academy.
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="mailto:support@thegospelacademy.com" className="text-[#E8632B] hover:text-[#d4571f] transition-colors">
              Reach out to us
            </a>.
          </p>
        </div>

        {/* FAQ accordion */}
        <FaqAccordion items={FAQ_ITEMS} />

        {/* CTA */}
        <div className="mt-16 bg-[#07212D] rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to get started?</h2>
          <p className="text-sm text-gray-300 mb-6 max-w-md mx-auto">
            Join families who are giving their children a Christ-centered education.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#E8632B] hover:bg-[#d4571f] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Get Started Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg ring-1 ring-white/20 transition-colors text-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
