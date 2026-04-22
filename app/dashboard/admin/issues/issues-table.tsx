'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Issue {
  id: string
  category: string
  description: string
  status: string
  adminNote: string | null
  createdAt: string
  resolvedAt: string | null
  user: { name: string; email: string; role: string }
  lesson: { id: string; title: string; unitNumber: number; courseTitle: string; courseId: string }
}

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  REVIEWED: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  RESOLVED: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  DISMISSED: 'bg-gray-500/10 text-gray-400 ring-gray-500/20',
}

const CATEGORY_LABELS: Record<string, string> = {
  content_error: 'Content Error',
  typo: 'Typo / Grammar',
  broken_link: 'Broken Link',
  suggestion: 'Suggestion',
  other: 'Other',
}

const TABS = ['ALL', 'OPEN', 'REVIEWED', 'RESOLVED', 'DISMISSED'] as const

export default function IssuesTable({ issues: initial }: { issues: Issue[] }) {
  const [issues, setIssues] = useState(initial)
  const [activeTab, setActiveTab] = useState<string>('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})

  const filtered = activeTab === 'ALL' ? issues : issues.filter(i => i.status === activeTab)

  async function updateStatus(issueId: string, status: string) {
    setUpdating(issueId)
    try {
      const res = await fetch(`/api/lesson-issues/${issueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNote: noteInputs[issueId] || undefined }),
      })
      if (res.ok) {
        const { issue } = await res.json()
        setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: issue.status, adminNote: issue.adminNote, resolvedAt: issue.resolvedAt } : i))
      }
    } catch { /* ignore */ }
    finally { setUpdating(null) }
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-white/10 text-white ring-1 ring-white/15'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'ALL' ? `All (${issues.length})` : `${tab.charAt(0) + tab.slice(1).toLowerCase()} (${issues.filter(i => i.status === tab).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No issues found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(issue => (
            <div key={issue.id} className="rounded-xl bg-white/[0.03] ring-1 ring-white/8 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
                className="w-full px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${STATUS_STYLES[issue.status]}`}>
                        {issue.status}
                      </span>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                        {CATEGORY_LABELS[issue.category] || issue.category}
                      </span>
                    </div>
                    <p className="text-sm text-white mt-2 line-clamp-1">{issue.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {issue.lesson.courseTitle} &middot; Unit {issue.lesson.unitNumber} &middot; {issue.lesson.title}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">{new Date(issue.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{issue.user.name}</p>
                  </div>
                </div>
              </button>

              {expandedId === issue.id && (
                <div className="px-5 pb-5 border-t border-white/6 pt-4 space-y-4">
                  {/* Full description */}
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-1">Description</p>
                    <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{issue.description}</p>
                  </div>

                  {/* Reporter info */}
                  <div className="flex gap-6 text-xs text-gray-500">
                    <span>Reported by: {issue.user.name} ({issue.user.email})</span>
                    <span>Role: {issue.user.role}</span>
                    <span>Date: {new Date(issue.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Lesson link */}
                  <Link
                    href={`/dashboard/student/courses/${issue.lesson.courseId}/lessons/${issue.lesson.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    View Lesson
                  </Link>

                  {/* Admin note */}
                  {issue.adminNote && (
                    <div className="p-3 rounded-lg bg-blue-500/5 ring-1 ring-blue-500/15">
                      <p className="text-xs font-medium text-blue-400 mb-1">Admin Note</p>
                      <p className="text-sm text-gray-300">{issue.adminNote}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <textarea
                      value={noteInputs[issue.id] || ''}
                      onChange={e => setNoteInputs(prev => ({ ...prev, [issue.id]: e.target.value }))}
                      placeholder="Add a note (optional)..."
                      rows={2}
                      className="w-full bg-white/5 ring-1 ring-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                    <div className="flex gap-2">
                      {issue.status !== 'REVIEWED' && (
                        <button
                          onClick={() => updateStatus(issue.id, 'REVIEWED')}
                          disabled={updating === issue.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/25 hover:bg-blue-600/30 transition-colors disabled:opacity-50"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {issue.status !== 'RESOLVED' && (
                        <button
                          onClick={() => updateStatus(issue.id, 'RESOLVED')}
                          disabled={updating === issue.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/25 hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
                        >
                          Resolve
                        </button>
                      )}
                      {issue.status !== 'DISMISSED' && (
                        <button
                          onClick={() => updateStatus(issue.id, 'DISMISSED')}
                          disabled={updating === issue.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-600/20 text-gray-400 ring-1 ring-gray-500/25 hover:bg-gray-600/30 transition-colors disabled:opacity-50"
                        >
                          Dismiss
                        </button>
                      )}
                      {(issue.status === 'RESOLVED' || issue.status === 'DISMISSED') && (
                        <button
                          onClick={() => updateStatus(issue.id, 'OPEN')}
                          disabled={updating === issue.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600/20 text-amber-400 ring-1 ring-amber-500/25 hover:bg-amber-600/30 transition-colors disabled:opacity-50"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
