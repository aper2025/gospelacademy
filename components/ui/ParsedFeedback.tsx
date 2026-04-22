'use client'

interface FeedbackData {
  aiFeedback?: string
  feedback?: string
  strengths?: string[]
  growthAreas?: string[]
  note?: string
}

function tryParseFeedback(feedback: string): FeedbackData | null {
  try {
    const parsed = JSON.parse(feedback)
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as FeedbackData
    }
  } catch {
    // Not JSON — return null to fall back to plain text
  }
  return null
}

export function ParsedFeedback({ feedback, size = 'sm' }: { feedback: string; size?: 'xs' | 'sm' }) {
  const parsed = tryParseFeedback(feedback)

  // If not JSON, render as plain text
  if (!parsed) {
    return (
      <p className={`${size === 'xs' ? 'text-xs' : 'text-sm'} text-gray-300 leading-relaxed whitespace-pre-wrap`}>
        {feedback}
      </p>
    )
  }

  const feedbackText = parsed.aiFeedback || parsed.feedback || ''
  const strengths = parsed.strengths || []
  const growthAreas = parsed.growthAreas || []
  const textClass = size === 'xs' ? 'text-xs' : 'text-sm'

  return (
    <div className="space-y-3">
      {feedbackText && (
        <p className={`${textClass} text-gray-300 leading-relaxed`}>{feedbackText}</p>
      )}

      {strengths.length > 0 && (
        <div>
          <p className={`${size === 'xs' ? 'text-[10px]' : 'text-xs'} font-semibold text-emerald-400 uppercase tracking-wide mb-1`}>Strengths</p>
          <ul className={`${textClass} text-gray-400 space-y-1`}>
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-500 shrink-0">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {growthAreas.length > 0 && (
        <div>
          <p className={`${size === 'xs' ? 'text-[10px]' : 'text-xs'} font-semibold text-amber-400 uppercase tracking-wide mb-1`}>Areas for Growth</p>
          <ul className={`${textClass} text-gray-400 space-y-1`}>
            {growthAreas.map((g, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 shrink-0">→</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {parsed.note && (
        <p className="text-[10px] text-gray-500 italic">{parsed.note}</p>
      )}
    </div>
  )
}
