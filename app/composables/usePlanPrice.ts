import type { PlanKey } from '#shared/enroll'

// Prices come from NUXT_PUBLIC_PRICE_PRIVATE / NUXT_PUBLIC_PRICE_ONLINE.
// "12,900", "12900" and "฿12,900" all show as ฿12,900. Empty or invalid shows "price on request".
export const formatPrice = (p: string) => {
  const n = Number(p.replace(/[,\s฿]/g, ''))
  return p && Number.isFinite(n) && n > 0 ? `฿${n.toLocaleString('en-US')}` : ''
}

export function usePlanPrice() {
  const config = useRuntimeConfig().public
  const { t } = useLang()
  const prices: Record<PlanKey, string> = {
    private: String(config.pricePrivate || ''),
    online: String(config.priceOnline || ''),
  }
  const priceLabel = (key: PlanKey) => formatPrice(prices[key]) || t.value.enroll.priceOnRequest
  return { prices, priceLabel }
}
