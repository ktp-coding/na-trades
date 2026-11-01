// Small in-memory rate limiter. On serverless it is per instance, which is
// still enough to stop a single client from hammering the form.
const hits = new Map<string, number[]>()

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > limit
}
