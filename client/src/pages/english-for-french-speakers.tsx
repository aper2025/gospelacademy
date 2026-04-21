import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Globe,
  GraduationCap,
  Languages,
  MessageSquare,
  Star,
  Target,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";
import { useState } from "react";

const LEVELS = [
  {
    level: "A1 → A2",
    title: "English Foundations",
    subtitle: "for French Speakers",
    weeks: "9 weeks · 36 lessons",
    description:
      "Start from zero. Learn greetings, numbers, daily vocabulary, and simple conversations. Build the habit of thinking in English.",
    outcomes: [
      "Introduce yourself confidently",
      "Handle basic daily interactions",
      "Read simple signs and menus",
      "Write short messages",
    ],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    level: "A2 → B1",
    title: "English Fluency Builder",
    subtitle: "for French Speakers",
    weeks: "9 weeks · 36 lessons",
    description:
      "Expand your vocabulary to real-world topics — work, technology, travel, and global issues. Tackle the false cognates (faux amis) that trip up every French speaker.",
    outcomes: [
      "Hold conversations on everyday topics",
      "Understand authentic audio and video",
      "Write emails and short reports",
      "Navigate workplace English",
    ],
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    level: "B1 → B2",
    title: "Academic English Bridge",
    subtitle: "for French Speakers",
    weeks: "9 weeks · 36 lessons",
    description:
      "Master the academic writing and reading skills required for university. Learn how English essays differ from French dissertations. Develop critical thinking in English.",
    outcomes: [
      "Read and summarize academic texts",
      "Write 5-paragraph essays",
      "Participate in academic discussions",
      "Understand lectures and podcasts",
    ],
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    level: "B2 Mastery",
    title: "University-Ready English",
    subtitle: "for French Speakers",
    weeks: "9 weeks · 36 lessons",
    description:
      "Full test preparation for TOEFL, IELTS, and Duolingo English Test. Mock exams in all three formats. University application guidance included.",
    outcomes: [
      "Pass TOEFL iBT (target: 61+)",
      "Pass IELTS Academic (target: 6.0+)",
      "Pass Duolingo English Test (target: 95+)",
      "Submit university applications in English",
    ],
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
  },
];

const COMPETITORS = [
  { name: "EF English Live", price: "$89–$139/mo", note: "No French-specific support" },
  { name: "Wall Street English", price: "$150–$250/mo", note: "In-person centers only" },
  { name: "British Council Online", price: "$88–$202/mo", note: "Generic, not CEFR-targeted" },
  { name: "Babbel", price: "$15–$70/mo", note: "App only, no exam prep" },
  { name: "Gospel Academy", price: "Included in TGA", note: "French-specific + biblical worldview + exam prep", highlight: true },
];

const FAQS = [
  {
    q: "Do I need any English at all to start?",
    a: "No. Level 1 (A1) starts from absolute zero. If you speak French or Haitian Creole, you can enroll and begin immediately.",
  },
  {
    q: "How long does the full program take?",
    a: "Each level is 9 weeks (36 lessons). The full A1–B2 journey is 36 weeks — about 9 months if you study one level at a time. Many motivated students complete two levels simultaneously.",
  },
  {
    q: "Is this for Haitian students only?",
    a: "No. The course is designed for any French or Haitian Creole speaker anywhere in the world — Haiti, France, Senegal, Canada, Belgium, or anywhere else in the 400 million-person Francophone community.",
  },
  {
    q: "Will I be ready for UoPeople after this course?",
    a: "Yes. Level 4 is specifically designed to meet UoPeople's English requirements (TOEFL 61, IELTS 6.0, DET 95). You will take full mock exams in all three formats before completing the course.",
  },
  {
    q: "What level should I start at?",
    a: "Start at Level 1 if you know very little English. If you already have some English, take a short free placement conversation with our AI tutor on the platform to identify your starting level.",
  },
  {
    q: "Is there a biblical worldview component?",
    a: "Yes. Every lesson integrates faith-based reflection. This is an explicitly Christian program, though the English skills you learn are universal.",
  },
  {
    q: "Can I take this alongside other Gospel Academy courses?",
    a: "Absolutely. The English course uses the same platform, same dashboard, and same learning system. You can study English alongside any other TGA course.",
  },
  {
    q: "What are the 3 learning pathways?",
    a: "Every lesson has three tracks: Advanced Scholars (deeper content, ~80 min), Standard Academic (core content, ~60 min), and Vocational (practical focus, ~45 min). You choose your track based on your goals.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 bg-white text-gray-600 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function EnglishForFrenchSpeakers() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">Gospel Academy</span>
            <span className="hidden sm:inline text-gray-400 mx-2">·</span>
            <span className="hidden sm:inline text-sm text-gray-600">English for French Speakers</span>
          </div>
          <Button
            onClick={() => (window.location.href = "/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5"
          >
            Start Free
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-600/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <Languages className="h-4 w-4" />
              <span>Conçu pour les francophones · Built for French speakers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Zero English to{" "}
              <span className="text-blue-300">University-Ready</span>
              <br />
              in One Program.
            </h1>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed max-w-2xl">
              The only affordable English program built specifically for French and Haitian Creole
              speakers — taking you from A1 to B2 with full TOEFL, IELTS, and DET preparation.
            </p>
            <div className="mt-4 text-blue-200 text-lg font-medium">
              144 lessons · 4 CEFR levels · 3 learning pathways · Biblical worldview
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 text-lg"
                onClick={() => (window.location.href = "/auth")}
              >
                Begin Your English Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-800/40 px-8 py-4 text-lg"
                onClick={() => document.getElementById("levels")?.scrollIntoView({ behavior: "smooth" })}
              >
                See the 4 Levels
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof banner */}
      <section className="bg-blue-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>UoPeople admission ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>TOEFL · IELTS · DET prep included</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Haiti · Senegal · DRC · France · Canada</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Biblical worldview integrated</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              400 million French speakers. Zero affordable A1→B2 programs.
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Existing English courses are built for generic learners. They don't address the
              specific challenges French speakers face — the faux amis, the pronunciation traps,
              the grammar differences between French and English structure. They're also expensive,
              often $100–$250/month for a program that won't get you university-ready.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Gospel Academy built what didn't exist: a complete, structured, faith-integrated
              English program designed from the ground up for the 400 million people who speak
              French or Haitian Creole.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Levels */}
      <section id="levels" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The 4-Level Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              A complete CEFR-aligned path from your first English word to university admission
            </p>
          </div>

          {/* Progress bar */}
          <div className="hidden lg:flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 via-purple-400 to-amber-400 -translate-y-1/2" />
            {["A1", "A2", "B1", "B2", "Mastery"].map((label, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEVELS.map((l, i) => (
              <Card key={i} className={`border ${l.border} overflow-hidden`}>
                <div className={`h-2 bg-gradient-to-r ${l.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${l.badge} mb-2`}>
                        {l.level}
                      </span>
                      <CardTitle className="text-xl">{l.title}</CardTitle>
                      <p className="text-sm text-gray-500">{l.subtitle}</p>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap mt-1">{l.weeks}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{l.description}</p>
                  <ul className="space-y-1.5">
                    {l.outcomes.map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Admission */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
                <GraduationCap className="h-4 w-4" />
                University Admission Track
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                This course gets you into{" "}
                <span className="text-blue-300">university</span>.
              </h2>
              <p className="mt-5 text-blue-100 text-lg leading-relaxed">
                University of the People (UoPeople) is accredited, tuition-free, and accepts students
                from 200+ countries. Their English requirement is CEFR B2. That's exactly what this
                program delivers.
              </p>
              <p className="mt-4 text-blue-200 leading-relaxed">
                Level 4 includes full mock exams, test strategy sessions, and university application
                guidance — all taught with French-speaker-specific advice on where students typically
                lose points.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 space-y-6">
                <h3 className="font-bold text-lg text-blue-200">UoPeople English Requirements</h3>
                {[
                  { test: "TOEFL iBT", score: "61+", status: "Level 4 target: 70+" },
                  { test: "IELTS Academic", score: "6.0+", status: "Level 4 target: 6.5+" },
                  { test: "Duolingo English Test", score: "95+", status: "Level 4 target: 105+" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl px-5 py-4">
                    <div>
                      <div className="font-semibold">{item.test}</div>
                      <div className="text-sm text-blue-300">{item.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{item.score}</div>
                      <div className="text-xs text-blue-300">required</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-xl px-5 py-4">
                  <Award className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <p className="text-sm text-green-200">
                    Level 4 graduates have full preparation for all three tests. Choose whichever
                    test your target university accepts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Built for you. Not translated for you.</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Every lesson was written with French speakers in mind — not adapted from a generic course.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Languages,
                title: "50+ Faux Amis Alerts",
                desc: "Actuellement ≠ actually. Librairie ≠ library. We flag every false cognate that trips up French speakers throughout all 4 levels.",
              },
              {
                icon: MessageSquare,
                title: "French-Specific Pronunciation",
                desc: "Mastering /th/, the silent /h/, English stress-timing, and the schwa — specifically compared to French phonology.",
              },
              {
                icon: BookOpen,
                title: "Grammar Contrast Lessons",
                desc: "We teach English grammar by contrasting it with French: adjective order, question formation with do/does, present perfect vs. passé composé.",
              },
              {
                icon: TrendingUp,
                title: "3 Learning Pathways",
                desc: "Advanced Scholars (80 min), Standard Academic (60 min), and Vocational (45 min). Every lesson, every level. Choose your intensity.",
              },
              {
                icon: Star,
                title: "Biblical Worldview Integrated",
                desc: "Every lesson connects to scripture. Learn English through the lens of faith — reading passages, discussing biblical principles, writing reflections.",
              },
              {
                icon: Target,
                title: "AI Tutor for English",
                desc: "Ask questions in French. Get Socratic guidance in English. The AI tutor knows you're a French speaker and meets you where you are.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Better than $150/month courses — included in your subscription.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every competitor charges per course. Gospel Academy includes English for French Speakers
              in every TGA subscription.
            </p>
          </div>
          <div className="space-y-3">
            {COMPETITORS.map((c, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 rounded-xl border gap-3 ${
                  c.highlight
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <div>
                  <div className={`font-semibold ${c.highlight ? "text-white" : "text-gray-900"}`}>
                    {c.name}
                    {c.highlight && (
                      <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-0.5">You are here</span>
                    )}
                  </div>
                  <div className={`text-sm mt-0.5 ${c.highlight ? "text-blue-200" : "text-gray-500"}`}>
                    {c.note}
                  </div>
                </div>
                <div
                  className={`text-xl font-bold whitespace-nowrap ${
                    c.highlight ? "text-white" : "text-gray-700"
                  }`}
                >
                  {c.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Who this is for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Haitian Students",
                desc: "Seeking admission to UoPeople, ASU Online, or other English-medium universities. Get exactly the score you need.",
              },
              {
                icon: Globe,
                title: "Francophone Africans",
                desc: "Students in Senegal, DRC, Ivory Coast, Cameroon, and beyond seeking international education and career opportunities.",
              },
              {
                icon: TrendingUp,
                title: "Career-Focused Professionals",
                desc: "French-speaking professionals in tourism, NGOs, or international business needing workplace-level English.",
              },
              {
                icon: Users,
                title: "NGO & Mission Staff",
                desc: "Local staff at international organizations who need to communicate with English-speaking partners and donors.",
              },
              {
                icon: BookOpen,
                title: "Church Communities",
                desc: "Churches in Haiti and Francophone Africa seeking to equip their members with English for greater impact.",
              },
              {
                icon: Star,
                title: "Immigration Families",
                desc: "Families relocating to Canada, the US, or the UK who need structured English before or after arrival.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Start Your English Journey Today.</h2>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            144 lessons. 4 levels. Full TOEFL/IELTS/DET preparation. Designed for you — the French
            speaker who's ready to open a world of opportunity.
          </p>
          <div className="mt-3 text-blue-300 font-medium">
            Proverbs 4:7 — "The beginning of wisdom is this: Get wisdom."
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-4 text-lg"
              onClick={() => (window.location.href = "/auth")}
            >
              Get Started — It's Free
            </Button>
          </div>
          <p className="mt-6 text-blue-400 text-sm">
            Included with any Gospel Academy subscription · No separate payment required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="text-white font-semibold">The Gospel Academy</span> · A ministry of
            Veritas AI Solutions
          </div>
          <div className="flex gap-6">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/auth" className="hover:text-white transition-colors">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
