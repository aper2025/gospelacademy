'use client'

import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`rounded-2xl ring-1 transition-colors ${
              isOpen ? 'bg-white ring-gray-300' : 'bg-gray-50 ring-gray-200 hover:ring-gray-300'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start gap-4 px-5 py-4 text-left"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ring-1 text-xs font-bold transition-colors ${
                isOpen
                  ? 'bg-[#E8632B]/10 ring-[#E8632B]/25 text-[#E8632B]'
                  : 'bg-gray-100 ring-gray-300 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <span className={`flex-1 text-sm font-medium leading-relaxed transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.q}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pl-15">
                <div className="ml-10 border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
