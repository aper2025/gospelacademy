'use client'

import Link from 'next/link'

interface CourseCompletionModalProps {
  courseId: string
  onDismiss: () => void
}

export default function CourseCompletionModal({ courseId, onDismiss }: CourseCompletionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
        {/* Gradient celebration header */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-500 to-blue-600 p-8 text-center">
          {/* Trophy icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.996.178-1.768.65-2.08 1.377C2.611 6.94 4.613 9.366 8.1 11.016c.58.275 1.153.5 1.707.672M18.75 4.236c.996.178 1.768.65 2.08 1.377.559 1.327-1.443 3.753-4.93 5.403-.58.275-1.152.5-1.706.672M12 2.25c2.49 0 4.63 1.718 5.198 4.13.076.323.132.654.166.993M12 2.25c-2.49 0-4.63 1.718-5.198 4.13a8.959 8.959 0 0 0-.166.993" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-white/80 text-sm">
            You have completed the entire course! Your hard work and dedication have paid off.
          </p>
        </div>

        {/* Body */}
        <div className="bg-gray-900 p-6 space-y-4">
          <p className="text-sm text-gray-400 text-center">
            A certificate of completion is now available for download.
          </p>

          <div className="space-y-3">
            <a
              href={`/api/certificate?courseId=${courseId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Certificate
            </a>

            <Link
              href="/dashboard/student"
              onClick={onDismiss}
              className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium py-3 rounded-xl ring-1 ring-white/8 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
