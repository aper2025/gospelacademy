'use client'

import { useState, useEffect, useRef } from 'react'
import { ParsedFeedback } from '@/components/ui/ParsedFeedback'

interface PortfolioSubmission {
  id: string
  title: string
  description: string | null
  textContent: string | null
  fileUrl: string | null
  fileType: string | null
  fileSize: number | null
  status: string
  submittedAt: string | null
  grade: number | null
  feedback: string | null
}

export default function ProjectSubmissionCard({ lessonId, onSubmissionChange }: { lessonId: string; onSubmissionChange?: (submitted: boolean) => void }) {
  const [submission, setSubmission] = useState<PortfolioSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [textContent, setTextContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch(`/api/portfolio?lessonId=${lessonId}`)
      .then(r => r.json())
      .then(data => {
        if (data.submission) {
          setSubmission(data.submission)
          setTitle(data.submission.title || '')
          setDescription(data.submission.description || '')
          setTextContent(data.submission.textContent || '')
          const isSubmitted = data.submission.status === 'submitted' || data.submission.status === 'graded'
          if (isSubmitted) onSubmissionChange?.(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  const isReadOnly = submission?.status === 'submitted' || submission?.status === 'graded'

  async function handleSave() {
    if (!title.trim()) { setError('Please add a title'); return }
    setError(''); setSuccess(''); setSaving(true)

    const fd = new FormData()
    fd.append('lessonId', lessonId)
    fd.append('title', title.trim())
    fd.append('description', description.trim())
    fd.append('textContent', textContent)
    if (file) fd.append('file', file)

    try {
      const res = await fetch('/api/portfolio', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save'); return }
      setSubmission(data.submission)
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
      setSuccess('Draft saved')
      setTimeout(() => setSuccess(''), 3000)
    } catch { setError('Network error') }
    finally { setSaving(false) }
  }

  async function handleSubmit() {
    if (!submission) return
    if (!submission.textContent && !submission.fileUrl) {
      setError('Add text or upload a file before submitting')
      return
    }
    setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to submit'); return }
      setSubmission(data.submission)
      setSuccess('Submitted for review!')
      onSubmissionChange?.(true)
    } catch { setError('Network error') }
    finally { setSubmitting(false) }
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) {
    return (
      <div className="p-6 sm:p-8 animate-pulse">
        <div className="h-4 w-40 bg-white/5 rounded mb-4" />
        <div className="h-20 bg-white/5 rounded" />
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8 border-t border-white/6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-md bg-blue-500/15 ring-1 ring-blue-500/25 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Submission</span>
        {submission && (
          <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${
            submission.status === 'graded' ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' :
            submission.status === 'submitted' ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20' :
            'bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/20'
          }`}>
            {submission.status === 'graded' ? `Graded: ${submission.grade}/100` :
             submission.status === 'submitted' ? 'Submitted — Awaiting Review' :
             'Draft'}
          </span>
        )}
      </div>

      {/* Graded feedback */}
      {submission?.status === 'graded' && submission.feedback && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-500/5 ring-1 ring-emerald-500/15">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Feedback</p>
          <ParsedFeedback feedback={submission.feedback} size="sm" />
        </div>
      )}

      {/* Read-only view for submitted/graded */}
      {isReadOnly ? (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-white">{submission?.title}</p>
            {submission?.description && <p className="text-sm text-gray-400 mt-1">{submission.description}</p>}
          </div>
          {submission?.textContent && (
            <div className="p-4 rounded-xl bg-white/3 ring-1 ring-white/6">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{submission.textContent}</p>
            </div>
          )}
          {submission?.fileUrl && (
            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
              View attached file {submission.fileSize ? `(${formatBytes(submission.fileSize)})` : ''}
            </a>
          )}
          {submission?.submittedAt && (
            <p className="text-xs text-gray-500">Submitted {new Date(submission.submittedAt).toLocaleDateString()}</p>
          )}
        </div>
      ) : (
        /* Editable form for drafts / new submissions */
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title for your project..."
              className="w-full bg-white/5 ring-1 ring-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of your work..."
              className="w-full bg-white/5 ring-1 ring-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Your Work</label>
            <textarea
              value={textContent}
              onChange={e => setTextContent(e.target.value)}
              placeholder="Write your report, reflection, or project work here..."
              rows={8}
              className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Upload File (optional, max 50MB)</label>
            <input
              ref={fileRef}
              type="file"
              onChange={e => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mp3"
              className="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-500/10 file:text-blue-400 file:ring-1 file:ring-blue-500/20 hover:file:bg-blue-500/20 file:cursor-pointer"
            />
            {submission?.fileUrl && !file && (
              <p className="mt-1.5 text-xs text-gray-500">
                Current file: {submission.fileType} ({submission.fileSize ? formatBytes(submission.fileSize) : 'unknown size'})
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-emerald-400">{success}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 ring-1 ring-white/10 text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            {submission && (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit for Review'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
