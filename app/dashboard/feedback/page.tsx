'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { value: 'content', label: 'Lesson Content', description: 'Quality of lessons, activities, and materials' },
  { value: 'tutor', label: 'AI Tutor', description: 'AI tutor helpfulness, accuracy, and experience' },
  { value: 'ui', label: 'Website & Navigation', description: 'How the platform looks and works' },
  { value: 'general', label: 'General Feedback', description: 'Anything else you want to share' },
] as const

export default function FeedbackPage() {
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = category && rating > 0 && message.trim().length >= 10 && !submitting

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          rating,
          message: message.trim(),
          page: window.location.pathname,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit feedback')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold text-white mb-2">Thank You!</h1>
          <p className="text-gray-400 mb-6">
            Your feedback helps us improve The Gospel Academy for everyone. We read every submission.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/dashboard/student"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => {
                setSubmitted(false)
                setCategory('')
                setRating(0)
                setMessage('')
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-sm transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Beta Feedback</h1>
        <p className="text-gray-400">
          Help us make The Gospel Academy better. Your feedback is valuable and goes directly to our team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            What is your feedback about?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`text-left p-4 rounded-xl ring-1 transition-all ${
                  category === cat.value
                    ? 'ring-2 ring-blue-500 bg-blue-500/10'
                    : 'ring-white/10 hover:bg-white/5'
                }`}
              >
                <div className="text-sm font-medium text-white">{cat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{cat.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Overall rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl transition-transform hover:scale-110"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                <span className={
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                }>
                  &#9733;
                </span>
              </button>
            ))}
            {rating > 0 && (
              <span className="text-sm text-gray-400 self-center ml-2">
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-300 mb-2">
            Your feedback
          </label>
          <textarea
            id="feedback-message"
            rows={5}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you liked, what could be better, or any suggestions you have..."
            className="w-full bg-gray-800 border border-white/10 focus:border-blue-500 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none resize-none"
          />
          <div className="flex justify-between mt-1">
            <span className={`text-xs ${message.trim().length < 10 && message.length > 0 ? 'text-amber-400' : 'text-gray-500'}`}>
              {message.trim().length < 10 && message.length > 0
                ? `${10 - message.trim().length} more characters needed`
                : '\u00A0'}
            </span>
            <span className="text-xs text-gray-500">{message.length}/2000</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
            canSubmit
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}
