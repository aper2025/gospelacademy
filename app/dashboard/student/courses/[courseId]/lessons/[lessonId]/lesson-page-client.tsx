'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LessonTutorChat from './lesson-tutor-chat'
import FormativeCheckCard from '@/components/assessment/FormativeCheckCard'
import LessonQuizCard from '@/components/lesson/LessonQuizCard'
import ProjectSubmissionCard from '@/components/lesson/ProjectSubmissionCard'
import AdvancedExtensionCard from '@/components/lesson/AdvancedExtensionCard'
import ReportIssueCard from '@/components/lesson/ReportIssueCard'
import { useProgress } from '@/lib/hooks/use-progress'
import CourseCompletionModal from '@/components/CourseCompletionModal'
import type {
  LessonContent,
  Pathway,
  ContentBlock,
  PathwayVariant,
  TextBlock,
  ReadingPassage,
  WonderPrompt,
  BiblicalWorldviewBlock,
  DiscussionQuestion,
  PracticeProblem,
  ProjectBrief,
  RubricDimension,
  ExternalResource,
} from '@/lib/types/curriculum'

// ─── Constants ────────────────────────────────────────────────────────────────

const PATHWAY_META: Record<Pathway, { label: string; color: string; ring: string; text: string; bg: string }> = {
  ADVANCED:   { label: 'Advanced Scholars', color: 'bg-amber-500/15 ring-amber-500/30',  ring: 'ring-amber-500',   text: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  STANDARD:   { label: 'Standard Academic', color: 'bg-blue-500/15 ring-blue-500/30',    ring: 'ring-blue-500',    text: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  VOCATIONAL: { label: 'Vocational',         color: 'bg-emerald-500/15 ring-emerald-500/30', ring: 'ring-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
}

const SUBJECT_COLORS: Record<string, string> = {
  'Bible & Theology':    'text-violet-400 bg-violet-500/10 ring-violet-500/25',
  'Mathematics':         'text-blue-400 bg-blue-500/10 ring-blue-500/25',
  'Language Arts':       'text-emerald-400 bg-emerald-500/10 ring-emerald-500/25',
  'Science':             'text-amber-400 bg-amber-500/10 ring-amber-500/25',
  'History & Geography': 'text-rose-400 bg-rose-500/10 ring-rose-500/25',
}

const READING_LEVEL: Record<string, string> = {
  easy:        'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20',
  moderate:    'text-amber-400 bg-amber-500/10 ring-amber-500/20',
  challenging: 'text-rose-400 bg-rose-500/10 ring-rose-500/20',
}

const DELIVERABLE_LABELS: Record<ProjectBrief['deliverable'], string> = {
  'written-report':     'Written Report',
  'oral-presentation':  'Oral Presentation',
  'portfolio-artifact': 'Portfolio Artifact',
  'demonstration':      'Demonstration',
  'other':              'Other',
}

// ─── Inline markdown renderer ─────────────────────────────────────────────────

function renderInline(text: string | undefined | null): React.ReactNode {
  if (!text) return null
  const segments = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return segments.map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{seg.slice(2, -2)}</strong>
    if (seg.startsWith('*') && seg.endsWith('*'))
      return <em key={i}>{seg.slice(1, -1)}</em>
    return seg
  })
}

function renderBody(text: string | undefined | null): React.ReactNode {
  if (!text) return null
  const paras = text.split(/\n\n+/)
  return (
    <div className="space-y-4 max-w-[65ch]">
      {paras.map((para, i) => {
        const lines = para.split('\n').filter(Boolean)
        const isBullet   = lines.length > 0 && lines.every(l => /^[-*]\s/.test(l))
        const isNumbered = lines.length > 0 && lines.every(l => /^\d+\.\s/.test(l))

        if (isBullet) return (
          <ul key={i} className="space-y-2.5 pl-1">
            {lines.map((l, j) => (
              <li key={j} className="flex gap-2.5 text-base text-gray-300 leading-[1.7]">
                <span className="text-gray-500 mt-1.5 shrink-0">–</span>
                <span>{renderInline(l.replace(/^[-*]\s/, ''))}</span>
              </li>
            ))}
          </ul>
        )

        if (isNumbered) return (
          <ol key={i} className="space-y-2.5 pl-1">
            {lines.map((l, j) => (
              <li key={j} className="flex gap-3 text-base text-gray-300 leading-[1.7]">
                <span className="text-gray-500 font-mono tabular-nums shrink-0 pt-0.5 w-5">{j + 1}.</span>
                <span>{renderInline(l.replace(/^\d+\.\s/, ''))}</span>
              </li>
            ))}
          </ol>
        )

        return (
          <p key={i} className="text-base text-gray-300 leading-[1.7]">
            {renderInline(para)}
          </p>
        )
      })}
    </div>
  )
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className ?? ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function WonderBlock({ block }: { block: WonderPrompt }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 ring-1 ring-violet-500/20 p-8 overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="relative max-w-[65ch]">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-violet-400 text-lg">✦</span>
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Wonder Prompt</span>
        </div>
        <p className="text-lg font-medium text-white leading-relaxed italic mb-4">
          &ldquo;{block.prompt}&rdquo;
        </p>
        {block.connection && (
          <p className="text-base text-violet-300/80 leading-[1.7] border-t border-violet-500/15 pt-4 mt-4">
            {block.connection}
          </p>
        )}
      </div>
    </div>
  )
}

function ReadingBlock({ block }: { block: ReadingPassage }) {
  const [expanded, setExpanded] = useState(true)
  const levelStyle = block.readingLevel ? READING_LEVEL[block.readingLevel] : null

  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/3 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-violet-500/15 ring-1 ring-violet-500/25 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-white truncate">{block.title}</p>
            <p className="text-sm text-gray-500 mt-0.5">{block.source}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {levelStyle && (
            <span className={`hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-full ring-1 capitalize ${levelStyle}`}>
              {block.readingLevel}
            </span>
          )}
          <ChevronDown className={`text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {expanded && (
        <div className="px-6 pb-6">
          <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/8 p-6">
            <p className="text-base text-gray-100 leading-[1.8] whitespace-pre-line max-w-[65ch]">{block.text}</p>
          </div>
          <p className="text-xs text-gray-600 mt-3 text-right">{block.source}</p>
        </div>
      )}
    </div>
  )
}

function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 p-6 sm:p-8">
      {block.heading && (
        <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-blue-500 shrink-0" />
          {block.heading}
        </h4>
      )}
      {renderBody(block.body)}
    </div>
  )
}

function BiblicalWorldviewRenderer({ block }: { block: BiblicalWorldviewBlock }) {
  // Some content uses alternate field names (e.g. math uses framework/Christ_connection)
  const raw = block as unknown as Record<string, unknown>
  const theme = block.theme || raw.framework as string || ''
  const scriptureRef = block.scriptureRef || ''
  const reflection = block.reflection || raw.Christ_connection as string || ''
  const applicationQuestion = block.applicationQuestion || ''

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-500/8 to-orange-500/5 ring-1 ring-amber-500/20 p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-amber-500/15 ring-1 ring-amber-500/25 flex items-center justify-center shrink-0">
          <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Biblical Worldview</span>
            {theme && <>
              <span className="text-xs text-amber-500/60">·</span>
              <span className="text-sm font-medium text-amber-300/80">{theme}</span>
            </>}
          </div>
          {scriptureRef && <p className="text-sm text-amber-500/70 mt-1 font-mono">{scriptureRef}</p>}
        </div>
      </div>
      {reflection && <p className="text-base text-gray-300 leading-[1.7] mb-5 max-w-[65ch]">{reflection}</p>}
      {applicationQuestion && (
        <div className="rounded-xl bg-amber-500/8 ring-1 ring-amber-500/15 p-5">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Reflect & Apply</p>
          <p className="text-base text-amber-100/90 leading-[1.7] max-w-[65ch]">{applicationQuestion}</p>
        </div>
      )}
    </div>
  )
}

function DiscussionBlock({ block, idx, pathway, answer, onAnswer }: {
  block: DiscussionQuestion; idx: number; pathway: Pathway; answer: string; onAnswer: (val: string) => void
}) {
  const [hintVisible, setHintVisible] = useState(pathway !== 'ADVANCED')
  // Some content uses 'questions' (array) instead of single 'question'
  const raw = block as unknown as Record<string, unknown>
  const questions = raw.questions as string[] | undefined
  const questionText = block.question || (questions ? questions.join('\n\n') : '')

  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="w-8 h-8 rounded-full bg-blue-500/15 ring-1 ring-blue-500/25 text-sm font-bold text-blue-400 flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Discussion</span>
            {block.isGraded && (
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-2 py-0.5 rounded-full">Graded</span>
            )}
          </div>
          {questions ? (
            <ol className="space-y-3">
              {questions.map((q, i) => (
                <li key={i} className="text-base text-white leading-[1.7] font-medium flex gap-2.5">
                  <span className="text-gray-500 shrink-0">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-base text-white leading-[1.7] font-medium max-w-[65ch]">{questionText}</p>
          )}
        </div>
      </div>
      {block.hint && (
        <div className="mb-5">
          {hintVisible ? (
            <div className="rounded-xl bg-blue-500/8 ring-1 ring-blue-500/15 p-4">
              <p className="text-xs font-semibold text-blue-400 mb-2">💡 Scaffolding Hint</p>
              <p className="text-sm text-blue-200/80 leading-relaxed max-w-[65ch]">{block.hint}</p>
            </div>
          ) : (
            <button onClick={() => setHintVisible(true)} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
              <span className="w-5 h-5 rounded-full border border-blue-500/40 flex items-center justify-center text-blue-500 text-xs">?</span>
              Show hint
            </button>
          )}
        </div>
      )}
      <textarea value={answer} onChange={e => onAnswer(e.target.value)} placeholder="Write your response here…" rows={5}
        className="w-full bg-white/[0.04] border border-white/10 focus:border-blue-500/60 focus:bg-white/[0.06] text-white text-base placeholder-gray-600 rounded-xl px-5 py-4 outline-none resize-none transition-colors leading-[1.7]" />
      {answer.trim() && <p className="text-xs text-gray-500 mt-2 text-right">{answer.trim().split(/\s+/).length} words</p>}
    </div>
  )
}

function PracticeBlock({ block, idx, answer, onAnswer }: {
  block: PracticeProblem; idx: number; answer: string; onAnswer: (val: string) => void
}) {
  // Content uses 'prompt', 'instructions', or 'question' depending on how it was seeded
  const extra = block as unknown as Record<string, unknown>
  const practiceText = block.prompt || extra.instructions as string | undefined || extra.question as string | undefined
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="w-8 h-8 rounded-full bg-violet-500/15 ring-1 ring-violet-500/25 text-sm font-bold text-violet-400 flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
        <div className="flex-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-3">
            {(block as unknown as Record<string, unknown>).activity as string || 'Practice'}
          </span>
          {renderBody(practiceText)}
        </div>
      </div>
      {block.skills && block.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {block.skills.map(skill => (
            <span key={skill} className="text-xs text-gray-400 bg-white/[0.04] ring-1 ring-white/10 px-2.5 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      )}
      <textarea value={answer} onChange={e => onAnswer(e.target.value)} placeholder="Show your work here…" rows={6}
        className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.06] text-white text-base placeholder-gray-600 rounded-xl px-5 py-4 outline-none resize-none transition-colors leading-[1.7]" />
    </div>
  )
}

function RubricRow({ dim }: { dim: RubricDimension }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-white/6">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between bg-white/3 hover:bg-white/5 px-4 py-3 transition-colors text-left">
        <span className="text-sm font-medium text-white">{dim.dimension}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">{dim.maxPoints} pts</span>
          <ChevronDown className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="grid sm:grid-cols-3 gap-px bg-white/5">
          {([
            { level: 'Exemplary', color: 'text-emerald-400', desc: dim.descriptors.exemplary },
            { level: 'Proficient', color: 'text-blue-400', desc: dim.descriptors.proficient },
            { level: 'Developing', color: 'text-amber-400', desc: dim.descriptors.developing },
          ] as const).map(({ level, color, desc }) => (
            <div key={level} className="bg-gray-900 px-4 py-3">
              <p className={`text-xs font-semibold ${color} mb-1.5`}>{level}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectBlock({ block, lessonId, onSubmissionChange }: { block: ProjectBrief; lessonId: string; onSubmissionChange?: (submitted: boolean) => void }) {
  const [rubricOpen, setRubricOpen] = useState(false)
  // Some content uses 'instructions' instead of 'description'/'summary'
  const extra = block as unknown as Record<string, unknown>
  const briefText = block.description || extra.instructions as string | undefined
  const summaryText = block.summary || (briefText ? (briefText.match(/^(.+?[.!?])(?:\s|\n|$)/)?.[1] ?? briefText.substring(0, 120)) : '')
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-white/6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/25 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Project Brief</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {block.deliverable && <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-2.5 py-1 rounded-full">{DELIVERABLE_LABELS[block.deliverable] ?? block.deliverable}</span>}
            {block.estimatedHours && <span className="text-xs text-gray-500 flex items-center gap-1"><ClockIcon />~{block.estimatedHours}h</span>}
          </div>
        </div>
        <h4 className="text-lg font-semibold text-white mb-1.5">{block.title}</h4>
        {summaryText && <p className="text-base text-gray-400 leading-relaxed">{summaryText}</p>}
      </div>
      {briefText && (
        <div className="p-6 sm:p-8 border-b border-white/6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Full Brief</p>
          {renderBody(briefText)}
        </div>
      )}
      {block.rubric && block.rubric.length > 0 && (
        <div className="p-6 sm:p-8">
          <button onClick={() => setRubricOpen(o => !o)} className="flex items-center justify-between w-full text-left">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Rubric ({block.rubric.length} dimensions · {block.rubric.reduce((s, d) => s + d.maxPoints, 0)} pts total)
            </span>
            <ChevronDown className={`text-gray-500 transition-transform ${rubricOpen ? 'rotate-180' : ''}`} />
          </button>
          {rubricOpen && (
            <div className="mt-4 space-y-2">
              {block.rubric.map(dim => <RubricRow key={dim.dimension} dim={dim} />)}
            </div>
          )}
        </div>
      )}
      <ProjectSubmissionCard lessonId={lessonId} onSubmissionChange={onSubmissionChange} />
    </div>
  )
}

// ─── Content block dispatcher ─────────────────────────────────────────────────

function BlockRenderer({ block, idx, pathway, answers, onAnswer, lessonId, onProjectSubmit }: {
  block: ContentBlock; idx: number; pathway: Pathway; answers: Record<string, string>; onAnswer: (key: string, val: string) => void; lessonId?: string; onProjectSubmit?: (submitted: boolean) => void
}) {
  const key = `${block.type}-${idx}`
  switch (block.type) {
    case 'wonder':             return <WonderBlock block={block} />
    case 'reading':            return <ReadingBlock block={block} />
    case 'text':               return <TextBlockRenderer block={block} />
    case 'biblical-worldview': return <BiblicalWorldviewRenderer block={block} />
    case 'discussion':         return <DiscussionBlock block={block} idx={idx} pathway={pathway} answer={answers[key] ?? ''} onAnswer={val => onAnswer(key, val)} />
    case 'practice':           return <PracticeBlock block={block} idx={idx} answer={answers[key] ?? ''} onAnswer={val => onAnswer(key, val)} />
    case 'project':            return <ProjectBlock block={block} lessonId={lessonId || ''} onSubmissionChange={onProjectSubmit} />
    default:                   return null
  }
}

// ─── Phase wrappers ───────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 'input', number: '1', label: 'Input', subtitle: 'Receive & Absorb',
    color: 'text-violet-400', bg: 'bg-violet-500/10', ring: 'ring-violet-500/25', bar: 'bg-violet-500',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>,
  },
  {
    id: 'processing', number: '2', label: 'Processing', subtitle: 'Think & Wrestle',
    color: 'text-blue-400', bg: 'bg-blue-500/10', ring: 'ring-blue-500/25', bar: 'bg-blue-500',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>,
  },
  {
    id: 'output', number: '3', label: 'Output', subtitle: 'Demonstrate Mastery',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/25', bar: 'bg-emerald-500',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
  },
] as const

function PhaseHeader({ phase }: { phase: typeof PHASES[number] }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-5 rounded-2xl ${phase.bg} ring-1 ${phase.ring}`}>
      <div className={`w-10 h-10 rounded-full bg-gray-950/60 ring-1 ${phase.ring} flex items-center justify-center ${phase.color} shrink-0`}>
        {phase.icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${phase.color} uppercase tracking-widest`}>Phase {phase.number}</span>
          <span className="text-gray-600 text-xs">·</span>
          <span className={`text-base font-semibold ${phase.color}`}>{phase.label}</span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{phase.subtitle}</p>
      </div>
    </div>
  )
}

// ─── Vocabulary sidebar card ──────────────────────────────────────────────────

function VocabularyCard({ lesson }: { lesson: LessonContent }) {
  const [open, setOpen] = useState(false)
  if (!lesson.vocabulary?.length) return null
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors">
        <span className="text-base font-semibold text-white">Vocabulary ({lesson.vocabulary.length})</span>
        <ChevronDown className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3">
          {lesson.vocabulary.map(v => (
            <div key={v.term} className="rounded-xl bg-white/[0.04] ring-1 ring-white/8 p-4">
              <p className="text-base font-semibold text-white mb-1.5">{v.term}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{v.definition}</p>
              {v.example && <p className="text-sm text-gray-600 italic mt-2 border-t border-white/5 pt-2">{v.example}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MemoryWorkCard({ lesson }: { lesson: LessonContent }) {
  if (!lesson.memoryWork?.length) return null
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors">
        <span className="text-base font-semibold text-white">Memory Work ({lesson.memoryWork.length})</span>
        <ChevronDown className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3">
          {lesson.memoryWork.map((m, i) => (
            <div key={i} className="rounded-xl bg-amber-500/8 ring-1 ring-amber-500/15 p-4">
              <p className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-widest">
                {m.type === 'scripture' ? '✦ Scripture' : m.type === 'catechism' ? '⊕ Catechism' : '○ Memory'}
              </p>
              <p className="text-base text-white italic leading-[1.7] mb-2">&ldquo;{m.text}&rdquo;</p>
              <p className="text-sm text-amber-500/70 font-mono">— {m.reference}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Resource types & helpers ────────────────────────────────────────────────

interface AdminResourceData {
  id: string
  title: string
  description: string | null
  fileUrl: string
  fileType: string
  fileSize: number
}

const RESOURCE_TYPE_ICONS: Record<ExternalResource['type'], { icon: string; color: string }> = {
  video:       { icon: '▶', color: 'text-red-400 bg-red-500/10 ring-red-500/25' },
  article:     { icon: '📄', color: 'text-blue-400 bg-blue-500/10 ring-blue-500/25' },
  interactive: { icon: '⚡', color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/25' },
  worksheet:   { icon: '📝', color: 'text-amber-400 bg-amber-500/10 ring-amber-500/25' },
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileTypeIcon(mimeType: string): string {
  if (mimeType.startsWith('video/')) return '▶'
  if (mimeType === 'application/pdf') return '📄'
  if (mimeType.startsWith('image/')) return '🖼'
  return '📎'
}

// ─── External resource card ──────────────────────────────────────────────────

function ExternalResourceCard({ resource }: { resource: ExternalResource }) {
  const meta = RESOURCE_TYPE_ICONS[resource.type] ?? RESOURCE_TYPE_ICONS.article
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 rounded-xl bg-white/3 ring-1 ring-white/8 hover:ring-white/15 hover:bg-white/5 p-4 transition-all group"
    >
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ring-1 shrink-0 ${meta.color}`}>
        {meta.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors truncate">{resource.title.replace(/^Search:\s*/i, '')}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{resource.source}</span>
          <span className="text-xs text-gray-600 capitalize">{resource.type}</span>
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  )
}

// ─── Uploaded resource card ──────────────────────────────────────────────────

function UploadedResourceCard({ resource, isAdmin, onDelete }: {
  resource: AdminResourceData; isAdmin: boolean; onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/3 ring-1 ring-white/8 p-4">
      <span className="w-8 h-8 rounded-lg bg-gray-500/10 ring-1 ring-gray-500/25 flex items-center justify-center text-sm shrink-0">
        {fileTypeIcon(resource.fileType)}
      </span>
      <div className="min-w-0 flex-1">
        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer"
          className="text-sm font-medium text-white hover:text-blue-300 transition-colors truncate block">
          {resource.title}
        </a>
        {resource.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{resource.description}</p>
        )}
        <span className="text-xs text-gray-600 mt-1 block">{formatFileSize(resource.fileSize)}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </a>
        {isAdmin && (
          <button onClick={() => onDelete(resource.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Admin upload modal ──────────────────────────────────────────────────────

function AdminUploadModal({ lessonId, onClose, onUploaded }: {
  lessonId: string; onClose: () => void; onUploaded: (res: AdminResourceData) => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload() {
    if (!title.trim() || !file) return
    setUploading(true)
    setError('')

    const form = new FormData()
    form.append('lessonId', lessonId)
    form.append('title', title.trim())
    if (description.trim()) form.append('description', description.trim())
    form.append('file', file)

    const res = await fetch('/api/admin/resources', { method: 'POST', body: form })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Upload failed')
      setUploading(false)
      return
    }

    const resource = await res.json()
    onUploaded(resource)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 ring-1 ring-white/10 rounded-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white mb-4">Upload Resource</h3>

        <label className="text-xs font-medium text-gray-400 mb-1.5 block">Title *</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Fractions Practice Worksheet"
          className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-blue-500/60 mb-4" />

        <label className="text-xs font-medium text-gray-400 mb-1.5 block">Description (optional)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Brief description of the resource"
          className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-blue-500/60 resize-none mb-4" />

        <label className="text-xs font-medium text-gray-400 mb-1.5 block">File *</label>
        <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/15 mb-4" />

        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleUpload} disabled={!title.trim() || !file || uploading}
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 disabled:text-white/40 px-5 py-2 rounded-lg transition-colors">
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Full Lesson (deep-dive expandable section) ──────────────────────────────

function FullLessonSection({ blocks, pathway, answers, onAnswer, lessonId }: {
  blocks: ContentBlock[]; pathway: Pathway; answers: Record<string, string>; onAnswer: (key: string, val: string) => void; lessonId?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <section id="full-lesson" className="space-y-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 ring-1 ring-blue-500/20 hover:ring-blue-500/30 px-6 py-5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-base font-semibold text-white">Full Lesson</p>
            <p className="text-xs text-gray-500">Detailed teaching content for deeper understanding</p>
          </div>
        </div>
        <ChevronDown className={`text-gray-500 group-hover:text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-6 pl-0 sm:pl-2">
          {blocks.map((block, i) => (
            <BlockRenderer key={`fl-${i}`} block={block} idx={i} pathway={pathway} answers={answers} onAnswer={onAnswer} lessonId={lessonId} />
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Practice Exercises (expandable section) ─────────────────────────────────

function PracticeExercisesSection({ exercises, answers, onAnswer }: {
  exercises: PracticeProblem[]; answers: Record<string, string>; onAnswer: (key: string, val: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <section id="practice-exercises" className="space-y-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-2xl bg-gradient-to-r from-violet-500/10 to-emerald-500/10 ring-1 ring-violet-500/20 hover:ring-violet-500/30 px-6 py-5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-500/15 ring-1 ring-violet-500/25 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-base font-semibold text-white">Practice Exercises ({exercises.length})</p>
            <p className="text-xs text-gray-500">Build your skills with guided practice</p>
          </div>
        </div>
        <ChevronDown className={`text-gray-500 group-hover:text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-6 pl-0 sm:pl-2">
          {exercises.map((ex, i) => (
            <PracticeBlock key={`pe-${i}`} block={ex} idx={i} answer={answers[`pe-practice-${i}`] ?? ''} onAnswer={val => onAnswer(`pe-practice-${i}`, val)} />
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Resources section ───────────────────────────────────────────────────────

function ResourcesSection({ lesson, lessonId, adminResources: initialResources, isAdmin }: {
  lesson: LessonContent; lessonId: string; adminResources: AdminResourceData[]; isAdmin: boolean
}) {
  const [adminResources, setAdminResources] = useState(initialResources)
  const [showUpload, setShowUpload] = useState(false)

  const externalResources = lesson.resources ?? []
  const hasAny = externalResources.length > 0 || adminResources.length > 0

  // Hide section entirely if nothing to show and not admin
  if (!hasAny && !isAdmin) return null

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/resources?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAdminResources(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <section id="additional-resources" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Additional Resources</span>
            <p className="text-xs text-gray-500">Supplementary materials for deeper learning</p>
          </div>
        </div>
        {isAdmin && (
          <button onClick={() => setShowUpload(true)}
            className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </button>
        )}
      </div>

      {externalResources.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {externalResources.map((res, i) => (
            <ExternalResourceCard key={i} resource={res} />
          ))}
        </div>
      )}

      {adminResources.length > 0 && (
        <div className="space-y-3">
          {externalResources.length > 0 && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">Uploaded Materials</p>
          )}
          {adminResources.map(res => (
            <UploadedResourceCard key={res.id} resource={res} isAdmin={isAdmin} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {!hasAny && isAdmin && (
        <div className="rounded-xl bg-white/3 ring-1 ring-white/8 p-6 text-center">
          <p className="text-sm text-gray-500">No resources yet. Upload supplementary materials for students.</p>
        </div>
      )}

      {showUpload && (
        <AdminUploadModal
          lessonId={lessonId}
          onClose={() => setShowUpload(false)}
          onUploaded={res => setAdminResources(prev => [res, ...prev])}
        />
      )}
    </section>
  )
}

// ─── Main client component ───────────────────────────────────────────────────

export default function LessonPageClient({
  lesson,
  courseId,
  lessonId,
  initialPathway,
  prevLesson,
  nextLesson,
  currentIndex,
  totalLessons,
  userRole,
  adminResources = [],
}: {
  lesson: LessonContent
  courseId: string
  lessonId: string
  initialPathway?: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
  prevLesson: { id: string; title: string } | null
  nextLesson: { id: string; title: string } | null
  currentIndex: number
  totalLessons: number
  userRole?: string
  adminResources?: AdminResourceData[]
}) {

  const [activePathway, setActivePathway] = useState<Pathway>(initialPathway ?? 'STANDARD')
  const [answers, setAnswers]             = useState<Record<string, string>>({})
  const [quizPassed, setQuizPassed]       = useState(false)
  const [projectSubmitted, setProjectSubmitted] = useState(false)
  const [courseGrade, setCourseGrade]      = useState<{ score: number; letter: string } | null>(null)
  const progress = useProgress(courseId)
  const completed = progress.isComplete(lessonId)

  const hasQuiz = Array.isArray(lesson.quiz) && lesson.quiz.length > 0
  const hasProject = lesson.pathways.some(p =>
    [...(p.ipo.input || []), ...(p.ipo.processing || []), ...(p.ipo.output || [])].some(b => b.type === 'project')
  )
  const canComplete = (!hasQuiz || quizPassed) && (!hasProject || projectSubmitted)

  // Auto-mark lesson as started when visited
  useEffect(() => { progress.markStarted(lessonId) }, [lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch course grade when lesson is completed
  useEffect(() => {
    if (!completed) { setCourseGrade(null); return }
    fetch('/api/grades/course-snapshot?courseId=' + encodeURIComponent(courseId))
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.score !== undefined) setCourseGrade(data) })
      .catch(() => {})
  }, [completed, courseId])

  const variant = lesson.pathways.find(p => p.pathway === activePathway) as PathwayVariant
  const meta    = PATHWAY_META[activePathway]
  const subjectStyle = SUBJECT_COLORS[lesson.subject] ?? 'text-gray-400 bg-gray-500/10 ring-gray-500/20'

  function setAnswer(key: string, val: string) {
    setAnswers(prev => ({ ...prev, [key]: val }))
  }

  const PATHWAYS: Pathway[] = ['ADVANCED', 'STANDARD', 'VOCATIONAL']

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-40 sm:pb-32">

      {/* ── Sticky nav ────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href={`/dashboard/student/courses/${courseId}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1 overflow-hidden">
            <Link href="/dashboard/student" className="text-gray-500 hover:text-gray-300 transition-colors shrink-0">Dashboard</Link>
            <span className="text-gray-700">/</span>
            <Link href={`/dashboard/student/courses/${courseId}`} className="text-gray-500 hover:text-gray-300 transition-colors shrink-0">Course</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400 truncate">{lesson.title}</span>
          </div>
          <span className={`hidden sm:inline text-xs font-medium px-2.5 py-1 rounded-full ring-1 shrink-0 ${subjectStyle}`}>{lesson.subject}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 space-y-10">

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gray-900 ring-1 ring-white/10 overflow-hidden">
          <div className={`h-1 w-full ${activePathway === 'ADVANCED' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : activePathway === 'VOCATIONAL' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-violet-500'}`} />
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${subjectStyle}`}>{lesson.subject}</span>
              <span className="text-xs text-gray-500 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full">Grade {lesson.gradeLevel}</span>
              <span className="text-xs text-gray-500 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full">Unit {lesson.unitNumber} · Week {lesson.weekNumber}</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${meta.color} ${meta.text}`}>{meta.label}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1 bg-white/5 ring-1 ring-white/8 px-2.5 py-1 rounded-full"><ClockIcon />{variant.estimatedMinutes} min</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">{variant.title}</h1>
            <p className="text-base text-gray-400 leading-[1.7] mb-6 max-w-[65ch]">{lesson.description}</p>
            <button
              onClick={() => {
                const el = document.getElementById('ai-tutor-chat')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              Ask AI Tutor
            </button>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Learning Objectives</p>
              <div className="space-y-2.5">
                {variant.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full ${meta.bg} ring-1 ${meta.ring.replace('ring-', 'ring-').replace('500', '500/30')} flex items-center justify-center ${meta.text} text-xs font-bold shrink-0 mt-0.5`}>{i + 1}</span>
                    <p className="text-sm text-gray-300 leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/6 px-6 sm:px-8 py-5">
            <p className="text-sm text-gray-500 mb-3">Your pathway — switch to preview other tracks</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PATHWAYS.map(p => {
                const pm = PATHWAY_META[p]
                const pv = lesson.pathways.find(v => v.pathway === p)!
                const active = p === activePathway
                return (
                  <button key={p} onClick={() => setActivePathway(p)}
                    className={`rounded-xl p-3 text-left ring-1 transition-all ${active ? `${pm.bg} ${pm.ring.replace('ring-', 'ring-2 ring-')}` : 'bg-white/3 ring-white/8 hover:bg-white/5'}`}>
                    <p className={`text-xs font-semibold mb-0.5 ${active ? pm.text : 'text-gray-300'}`}>{pm.label}</p>
                    <p className="text-xs text-gray-600">{pv.estimatedMinutes} min</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Sidebar-style helper cards (collapsible) ───────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <VocabularyCard lesson={lesson} />
          <MemoryWorkCard lesson={lesson} />
        </div>

        {/* ── Full Lesson (expandable deep-dive) ────────────────────────── */}
        {lesson.fullLesson && lesson.fullLesson.length > 0 && (
          <FullLessonSection blocks={lesson.fullLesson} pathway={activePathway} answers={answers} onAnswer={setAnswer} lessonId={lessonId} />
        )}

        {/* ── 2. INPUT PHASE ────────────────────────────────────────────── */}
        <section id="phase-input" className="space-y-6">
          <PhaseHeader phase={PHASES[0]} />
          {variant.ipo.input.map((block, i) => (
            <BlockRenderer key={i} block={block} idx={i} pathway={activePathway} answers={answers} onAnswer={setAnswer} lessonId={lessonId} onProjectSubmit={setProjectSubmitted} />
          ))}
        </section>

        {/* ── 3. PROCESSING PHASE (hidden if empty) ─────────────────────── */}
        {variant.ipo.processing.length > 0 && (
          <section id="phase-processing" className="space-y-6">
            <PhaseHeader phase={PHASES[1]} />
            {variant.ipo.processing.map((block, i) => (
              <BlockRenderer key={i} block={block} idx={i} pathway={activePathway} answers={answers} onAnswer={setAnswer} lessonId={lessonId} onProjectSubmit={setProjectSubmitted} />
            ))}
            <div id="ai-tutor-chat">
              <LessonTutorChat lessonId={lessonId} pathway={activePathway} lessonComplete={completed} processingBlocks={variant.ipo.processing} />
            </div>
          </section>
        )}

        {/* ── 4. OUTPUT PHASE (hidden if empty) ────────────────────────── */}
        {variant.ipo.output.length > 0 && (
          <section id="phase-output" className="space-y-6">
            <PhaseHeader phase={PHASES[2]} />
            {variant.ipo.output.map((block, i) => (
              <BlockRenderer key={i} block={block} idx={i} pathway={activePathway} answers={answers} onAnswer={setAnswer} lessonId={lessonId} onProjectSubmit={setProjectSubmitted} />
            ))}
            <FormativeCheckCard lessonId={lessonId} pathway={activePathway} outputBlocks={variant.ipo.output} answers={answers} />
          </section>
        )}

        {/* ── Practice Exercises (expandable) ──────────────────────────── */}
        {lesson.practiceExercises && lesson.practiceExercises.length > 0 && (
          <PracticeExercisesSection exercises={lesson.practiceExercises} answers={answers} onAnswer={setAnswer} />
        )}

        {/* ── SAT/ACT Challenge (Advanced pathway only) ────────────── */}
        {lesson.advancedExtension && activePathway === 'ADVANCED' && (
          <AdvancedExtensionCard extension={lesson.advancedExtension} lessonId={lessonId} />
        )}

        {/* ── 5. LESSON QUIZ ──────────────────────────────────────────── */}
        {hasQuiz && (
          <section id="lesson-quiz" className="space-y-4">
            <LessonQuizCard
              quiz={lesson.quiz!}
              pathway={activePathway}
              lessonId={lessonId}
              onPass={() => setQuizPassed(true)}
            />
          </section>
        )}

        {/* ── 6. ADDITIONAL RESOURCES ────────────────────────────────── */}
        <ResourcesSection
          lesson={lesson}
          lessonId={lessonId}
          adminResources={adminResources}
          isAdmin={userRole === 'ADMIN'}
        />

        {/* ── 7. REPORT AN ISSUE ──────────────────────────────────── */}
        <ReportIssueCard lessonId={lessonId} />

        {/* Spacer so content isn't hidden behind fixed bottom nav */}
        <div className="h-32" />
      </div>

      {/* ── Course Completion Modal ──────────────────────────────────────── */}
      {progress.lastCourseCompleted && (
        <CourseCompletionModal
          courseId={progress.lastCourseCompleted.courseId}
          onDismiss={progress.clearCourseCompleted}
        />
      )}

      {/* ── 5. Fixed bottom navigation ────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur-md border-t border-white/6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            {prevLesson ? (
              <Link href={`/dashboard/student/courses/${courseId}/lessons/${prevLesson.id}`} aria-label="Previous lesson" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 px-2.5 sm:px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/3 ring-1 ring-white/5 px-2.5 sm:px-4 py-2.5 rounded-xl cursor-not-allowed shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                <span className="hidden sm:inline">Previous</span>
              </span>
            )}
            <div className="flex-1 flex flex-col items-stretch">
              <button
                onClick={() => completed ? progress.markIncomplete(lessonId) : canComplete ? progress.markComplete(lessonId) : undefined}
                disabled={!completed && !canComplete}
                className={`flex items-center justify-center gap-2.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  completed
                    ? 'bg-emerald-500/15 ring-1 ring-emerald-500/30 text-emerald-400'
                    : canComplete
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                      : 'bg-emerald-600/30 text-white/40 cursor-not-allowed'
                }`}
              >
                {completed ? (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>Lesson Complete</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>Mark Lesson Complete</>
                )}
              </button>
              {completed && courseGrade && (
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-500">Course Grade:</span>
                  <span className={`text-xs font-bold ${
                    courseGrade.score >= 90 ? 'text-emerald-400' :
                    courseGrade.score >= 80 ? 'text-blue-400' :
                    courseGrade.score >= 70 ? 'text-amber-400' :
                    courseGrade.score >= 60 ? 'text-orange-400' : 'text-rose-400'
                  }`}>{courseGrade.letter} ({courseGrade.score}%)</span>
                </div>
              )}
              {!completed && !canComplete && (
                <p className="text-xs text-gray-600 text-center mt-1.5">
                  {hasProject && !projectSubmitted ? 'Submit your project above to unlock' : 'Complete the quiz above to unlock'}
                </p>
              )}
            </div>
            {nextLesson && completed ? (
              <Link href={`/dashboard/student/courses/${courseId}/lessons/${nextLesson.id}`} aria-label="Next lesson" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 px-2.5 sm:px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            ) : nextLesson && !completed ? (
              <span aria-label="Complete this lesson to continue" className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/3 ring-1 ring-white/5 px-2.5 sm:px-4 py-2.5 rounded-xl cursor-not-allowed shrink-0" title="Complete this lesson to unlock">
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              </span>
            ) : (
              <Link href={`/dashboard/student/courses/${courseId}`} aria-label="Back to course" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/8 px-2.5 sm:px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <span className="hidden sm:inline">Back to Course</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center gap-1 mt-3">
            {PHASES.filter(phase => {
              if (phase.id === 'processing') return variant.ipo.processing.length > 0
              if (phase.id === 'output') return variant.ipo.output.length > 0
              return true
            }).map(phase => (
              <a key={phase.id} href={`#phase-${phase.id}`} className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors ${phase.color} hover:bg-white/5`}>
                {phase.number}. {phase.label}
              </a>
            ))}
            {totalLessons > 0 && (
              <span className="text-xs text-gray-600 ml-2">Lesson {currentIndex + 1} of {totalLessons}</span>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
