'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface GradeTrendPoint {
  label: string   // e.g. "Week 1" or "U1L2"
  score: number
  type: 'FORMATIVE' | 'SUMMATIVE'
}

interface TooltipPayload {
  value: number
  payload: GradeTrendPoint
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayload[]
}) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="bg-gray-800 ring-1 ring-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-gray-400 mb-0.5">{p.payload.label}</p>
      <p className={`font-semibold ${p.value >= 80 ? 'text-emerald-400' : p.value >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
        {Math.round(p.value)}%
      </p>
      <p className="text-gray-500 text-[10px] mt-0.5">
        {p.payload.type === 'SUMMATIVE' ? 'Summative' : 'Formative'}
      </p>
    </div>
  )
}

export default function GradeTrendChart({ data }: { data: GradeTrendPoint[] }) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-32 text-xs text-gray-600">
        Not enough data points for a trend chart.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: '#6b7280', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#6b7280', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <ReferenceLine y={70} stroke="#4b5563" strokeDasharray="3 3" />
        <ReferenceLine y={90} stroke="#374151" strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#60a5fa', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
