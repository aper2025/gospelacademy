export default function LessonLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-pulse">
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/8 rounded-lg" />
          <div className="h-3 w-48 bg-white/8 rounded" />
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header card */}
        <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 p-6">
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-20 bg-white/8 rounded-full" />
            <div className="h-5 w-16 bg-white/8 rounded-full" />
          </div>
          <div className="h-7 w-80 bg-white/8 rounded mb-2" />
          <div className="h-4 w-full bg-white/5 rounded" />
        </div>

        {/* Phase selector */}
        <div className="flex gap-2">
          {['Input', 'Processing', 'Output'].map(p => (
            <div key={p} className="h-8 w-24 bg-white/5 rounded-full" />
          ))}
        </div>

        {/* Content blocks */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-900 ring-1 ring-white/8 p-5">
              <div className="h-5 w-36 bg-white/8 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-5/6 bg-white/5 rounded" />
                <div className="h-4 w-4/6 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
