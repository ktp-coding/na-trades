import { parsePrice, type PlanKey } from '#shared/enroll'

// Prices come from NUXT_PUBLIC_PRICE_PRIVATE / NUXT_PUBLIC_PRICE_ONLINE / NUXT_PUBLIC_PRICE_COACHING
// (and NUXT_PUBLIC_PRICE_COACHING_PRIVATE, the lower 1:1 price with the live plan).
// "12,900", "12900" and "฿12,900" all show as ฿12,900. Empty or invalid shows "price on request".
export const formatPrice = (p: string | number) => {
  const n = typeof p === 'number' ? p : parsePrice(p)
  return n > 0 ? `฿${n.toLocaleString('en-US')}` : ''
}

export function usePlanPrice() {
  const config = useRuntimeConfig().public
  const { t } = useLang()
  const prices: Record<PlanKey, string> = {
    private: String(config.pricePrivate || ''),
    online: String(config.priceOnline || ''),
  }
  const coachingPrice = (key: PlanKey = 'online') =>
    String((key === 'private' && config.priceCoachingPrivate) || config.priceCoaching || '')
  const priceLabel = (key: PlanKey) => formatPrice(prices[key]) || t.value.enroll.priceOnRequest
  const coachingLabel = (key: PlanKey = 'online') => formatPrice(coachingPrice(key)) || t.value.enroll.priceOnRequest
  /** Plan price plus the 1:1 Coaching add-on when chosen. */
  const totalLabel = (key: PlanKey, coaching: boolean) => {
    const base = parsePrice(prices[key])
    const extra = coaching ? parsePrice(coachingPrice(key)) : 0
    if (!base || (coaching && !extra)) return t.value.enroll.priceOnRequest
    return formatPrice(base + extra)
  }
  return { prices, coachingPrice, priceLabel, coachingLabel, totalLabel }
}
