import Link from 'next/link'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
            The Gospel Academy
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 hidden sm:block">
              About
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 hidden sm:block">
              Pricing
            </Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 hidden sm:block">
              FAQ
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-[#E8632B] hover:bg-[#d4571f] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">The Gospel Academy</p>
              <p className="text-xs text-gray-500">
                A ministry of Gospel Haiti &middot; Christ-centered education for the next generation
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
              <Link href="/login" className="hover:text-gray-900 transition-colors">Sign in</Link>
              <Link href="/register" className="hover:text-gray-900 transition-colors">Register</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <span>&copy; {new Date().getFullYear()} The Gospel Academy. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            </div>
            <a href="mailto:support@thegospelacademy.com" className="hover:text-gray-600 transition-colors">
              support@thegospelacademy.com
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
