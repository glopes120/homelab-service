/**
 * Rate Limiter em memória
 * 
 * Protege contra brute force e spam.
 * Em produção, substituir por Redis (Upstash) para multi-instance.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key)
  }
}

export interface RateLimitConfig {
  windowMs: number
  max: number
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  cleanup()

  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { allowed: true, remaining: config.max - 1, retryAfterMs: 0 }
  }

  entry.count++

  if (entry.count > config.max) {
    const retryAfterMs = entry.resetAt - now
    return { allowed: false, remaining: 0, retryAfterMs }
  }

  return { allowed: true, remaining: config.max - entry.count, retryAfterMs: 0 }
}

export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  max: 5,
}

export const REGISTER_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60 * 60 * 1000,
  max: 3,
}
