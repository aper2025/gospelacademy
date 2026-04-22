export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-pulse">
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="h-4 w-40 bg-white/8 rounded" />
          <div className="h-8 w-20 bg-white/8 rounded-lg" />
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-10">
          <div className="h-8 w-48 bg-white/8 rounded mb-2" />
          <div className="h-4 w-64 bg-white/5 rounded" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <div className="h-8 w-14 bg-white/8 rounded mb-2" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-5 ring-1 ring-white/8">
              <div className="h-7 w-16 bg-white/8 rounded mb-2" />
              <div className="h-3 w-24 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-gray-900 rounded-2xl ring-1 ring-white/8 p-6">
          <div className="h-5 w-40 bg-white/8 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-white/3 rounded-lg" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
