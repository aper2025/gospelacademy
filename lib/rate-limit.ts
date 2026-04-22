/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window approach with automatic cleanup.
 *
 * For production at scale, swap to Redis-backed rate limiting.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const cache = new Map<string, RateLimitEntry>()

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (entry.resetAt < now) cache.delete(key)
  }
}, 5 * 60 * 1000)

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window duration in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check rate limit for a given identifier (e.g., IP address, user ID).
 */
export function checkRateLimit(
  identifier: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const now = Date.now()
  const key = `rl:${identifier}`
  const entry = cache.get(key)

  if (!entry || entry.resetAt < now) {
    // New window
    cache.set(key, { count: 1, resetAt: now + opts.windowSeconds * 1000 })
    return { success: true, remaining: opts.limit - 1, resetAt: now + opts.windowSeconds * 1000 }
  }

  if (entry.count >= opts.limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { success: true, remaining: opts.limit - entry.count, resetAt: entry.resetAt }
}
