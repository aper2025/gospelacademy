export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-pulse">
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/8 rounded-lg" />
          <div className="h-3 w-40 bg-white/8 rounded" />
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="rounded-2xl bg-gray-900 ring-1 ring-white/8 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500/30 to-blue-500/30" />
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-24 bg-white/8 rounded-full" />
              <div className="h-6 w-16 bg-white/8 rounded-full" />
            </div>
            <div className="h-7 w-72 bg-white/8 rounded mb-2" />
            <div className="h-4 w-full bg-white/5 rounded mb-6" />
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-white/3 ring-1 ring-white/6 px-4 py-3">
                  <div className="h-6 w-8 bg-white/8 rounded mb-1" />
                  <div className="h-3 w-12 bg-white/5 rounded" />
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/8 rounded-full" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-900 ring-1 ring-white/8 p-5">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white/8 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 w-48 bg-white/8 rounded mb-1" />
                  <div className="h-3 w-32 bg-white/5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
