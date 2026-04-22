'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SessionRow } from './page'

const QUALITY_STYLES: Record<string, { label: string; color: string }> = {
  engaged:    { label: 'Engaged',     color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
  passive:    { label: 'Passive',     color: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
  struggling: { label: 'Struggling',  color: 'text-rose-400 bg-rose-500/10 ring-rose-500/20' },
}

const PATHWAY_STYLES: Record<string, string> = {
  ADVANCED:   'text-amber-400 bg-amber-500/10 ring-amber-500/20',
  STANDARD:   'text-blue-400 bg-blue-500/10 ring-blue-500/20',
  VOCATIONAL: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function SessionsTable({ rows }: { rows: SessionRow[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Filter state from URL
  const [studentFilter, setStudentFilter] = useState(searchParams.get('student') ?? '')
  const [courseFilter, setCourseFilter] = useState(searchParams.get('course') ?? '')
  const [qualityFilter, setQualityFilter] = useState(searchParams.get('quality') ?? '')
  const [dateFilter, setDateFilter] = useState(searchParams.get('dateFrom') ?? '')

  function applyFilters() {
    const params = new URLSearchParams()
    if (studentFilter) params.set('student', studentFilter)
    if (courseFilter) params.set('course', courseFilter)
    if (qualityFilter) params.set('quality', qualityFilter)
    if (dateFilter) params.set('dateFrom', dateFilter)
    router.push(`/dashboard/admin/sessions?${params.toString()}`)
  }

  function clearFilters() {
    setStudentFilter('')
    setCourseFilter('')
    setQualityFilter('')
    setDateFilter('')
    router.push('/dashboard/admin/sessions')
  }

  const hasFilters = studentFilter || courseFilter || qualityFilter || dateFilter

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[160px]">
            <label className="text-xs text-gray-500 block mb-1.5">Student</label>
            <input
              value={studentFilter}
              onChange={e => setStudentFilter(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="text-xs text-gray-500 block mb-1.5">Course</label>
            <input
              value={courseFilter}
              onChange={e => setCourseFilter(e.target.value)}
              placeholder="Search by course..."
              className="w-full bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
          <div className="w-40">
            <label className="text-xs text-gray-500 block mb-1.5">Quality</label>
            <select
              value={qualityFilter}
              onChange={e => setQualityFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/8 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 transition-colors"
            >
              <option value="">All</option>
              <option value="engaged">Engaged</option>
              <option value="passive">Passive</option>
              <option value="struggling">Struggling</option>
            </select>
          </div>
          <div className="w-44">
            <label className="text-xs text-gray-500 block mb-1.5">From Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/8 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
          <button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Filter
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white px-3 py-2 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 overflow-hidden">
        {rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">No sessions found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Lesson / Course</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Pathway</th>
                  <th className="text-center text-xs font-medium text-gray-500 px-3 py-3">Msgs</th>
                  <th className="text-center text-xs font-medium text-gray-500 px-3 py-3">Hint</th>
                  <th className="text-center text-xs font-medium text-gray-500 px-3 py-3">Quality</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-3 py-3 hidden lg:table-cell">Tokens</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden sm:table-cell">Date</th>
                  <th className="px-3 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const quality = QUALITY_STYLES[row.sessionQuality] ?? QUALITY_STYLES.engaged
                  const pathwayStyle = PATHWAY_STYLES[row.pathway] ?? ''
                  const isExpanded = expandedId === row.id

                  return (
                    <tr key={row.id} className="group">
                      <td colSpan={9} className="p-0">
                        <div>
                          {/* Main row */}
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : row.id)}
                            className={`w-full flex items-center text-left hover:bg-white/2 transition-colors ${
                              i < rows.length - 1 && !isExpanded ? 'border-b border-white/5' : ''
                            } ${row.needsReview ? 'bg-amber-500/3' : ''}`}
                          >
                            <div className="px-5 py-3.5 flex items-center gap-2 w-[140px] shrink-0">
                              {row.needsReview && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Needs teacher review" />
                              )}
                              <span className="text-sm font-medium truncate">{row.studentName}</span>
                            </div>
                            <div className="px-4 py-3.5 flex-1 min-w-0">
                              <p className="text-sm text-gray-300 truncate">{row.lessonTitle}</p>
                              <p className="text-xs text-gray-600 truncate">{row.courseTitle}</p>
                            </div>
                            <div className="px-4 py-3.5 hidden md:block shrink-0">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${pathwayStyle}`}>
                                {row.pathway}
                              </span>
                            </div>
                            <div className="px-3 py-3.5 text-center w-14 shrink-0">
                              <span className="text-sm text-gray-300">{row.messageCount}</span>
                            </div>
                            <div className="px-3 py-3.5 text-center w-14 shrink-0">
                              <span className={`text-sm font-medium ${row.hintLevel >= 4 ? 'text-amber-400' : row.hintLevel >= 3 ? 'text-amber-300' : 'text-gray-300'}`}>
                                {row.hintLevel}/4
                              </span>
                            </div>
                            <div className="px-3 py-3.5 text-center shrink-0">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${quality.color}`}>
                                {quality.label}
                              </span>
                            </div>
                            <div className="px-3 py-3.5 text-right w-20 hidden lg:block shrink-0">
                              <span className={`text-sm ${row.tokenCount > 2000 ? 'text-rose-400 font-medium' : 'text-gray-400'}`}>
                                {row.tokenCount.toLocaleString()}
                              </span>
                            </div>
                            <div className="px-5 py-3.5 text-right hidden sm:block shrink-0 w-40">
                              <span className="text-xs text-gray-500">{formatDate(row.startedAt)}</span>
                            </div>
                            <div className="px-3 py-3.5 shrink-0">
                              <svg className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </div>
                          </button>

                          {/* Expanded conversation */}
                          {isExpanded && (
                            <div className="border-b border-white/5 bg-gray-950/50">
                              {/* Struggled concepts */}
                              {row.struggledConcepts.length > 0 && (
                                <div className="px-5 pt-4">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-gray-500 font-medium">Struggled concepts:</span>
                                    {row.struggledConcepts.map(c => (
                                      <span key={c} className="text-xs text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20 px-2 py-0.5 rounded-full">
                                        {c}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Token alert */}
                              {row.tokenCount > 2000 && (
                                <div className="mx-5 mt-3 px-3 py-2 rounded-lg bg-rose-500/8 ring-1 ring-rose-500/15">
                                  <p className="text-xs text-rose-400 font-medium">
                                    High token usage: {row.tokenCount.toLocaleString()} estimated tokens (~${(row.tokenCount * 0.00001).toFixed(4)} est. cost)
                                  </p>
                                </div>
                              )}

                              {/* Messages */}
                              <div className="p-5 space-y-2.5 max-h-[500px] overflow-y-auto">
                                {row.messages.length === 0 ? (
                                  <p className="text-xs text-gray-600 text-center py-4">No messages recorded.</p>
                                ) : (
                                  row.messages.map((msg, mi) => (
                                    <div key={mi} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                      <div className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                                        msg.role === 'user'
                                          ? 'bg-blue-600/20 ring-1 ring-blue-500/20 text-blue-200'
                                          : 'bg-white/5 ring-1 ring-white/8 text-gray-400'
                                      }`}>
                                        <p className={`text-xs font-semibold mb-0.5 ${msg.role === 'user' ? 'text-blue-400' : 'text-gray-500'}`}>
                                          {msg.role === 'user' ? 'Student' : 'AI Tutor'}
                                        </p>
                                        {msg.content}
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
