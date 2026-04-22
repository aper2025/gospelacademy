export default function ParentDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-pulse">
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="h-4 w-40 bg-white/8 rounded" />
          <div className="h-8 w-20 bg-white/8 rounded-lg" />
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div>
          <div className="h-8 w-56 bg-white/8 rounded mb-2" />
          <div className="h-4 w-44 bg-white/5 rounded" />
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <div className="h-7 w-10 bg-white/8 rounded mb-2" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6">
            <div className="h-5 w-40 bg-white/8 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
