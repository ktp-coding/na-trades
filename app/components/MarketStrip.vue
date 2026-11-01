<script setup lang="ts">
// Live-ish prices for the markets NA TRADES trades. Data from /api/quotes (delayed),
// refreshed every minute while the tab is open.
interface Quote {
  key: string
  price: number | null
  change: number | null
  spark: number[]
}

const { lang } = useLang()

const markets = [
  { key: 'NQ', name: 'Nasdaq 100', digits: 2, tv: 'CME_MINI:NQ1!' },
  { key: 'ES', name: 'S&P 500', digits: 2, tv: 'CME_MINI:ES1!' },
  { key: 'YM', name: 'Dow Jones', digits: 0, tv: 'CBOT_MINI:YM1!' },
  { key: 'RTY', name: 'Russell 2000', digits: 1, tv: 'CME_MINI:RTY1!' },
  { key: 'BTC', name: 'Bitcoin', digits: 0, tv: 'BINANCE:BTCUSDT' },
  { key: 'ETH', name: 'Ethereum', digits: 0, tv: 'BINANCE:ETHUSDT' },
  { key: 'GC', name: 'Gold', digits: 1, tv: 'COMEX:GC1!' },
  { key: 'SI', name: 'Silver', digits: 2, tv: 'COMEX:SI1!' },
  { key: 'CL', name: 'Crude Oil', digits: 2, tv: 'NYMEX:CL1!' },
  { key: 'DXY', name: 'US Dollar Index', digits: 2, tv: 'TVC:DXY' },
  { key: 'EURUSD', name: 'Euro / Dollar', digits: 4, tv: 'FX:EURUSD' },
  { key: 'GBPUSD', name: 'Pound / Dollar', digits: 4, tv: 'FX:GBPUSD' },
]

const { data, refresh } = useFetch<{ quotes: Quote[]; at: number }>('/api/quotes', { server: false, lazy: true })

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => {
    if (document.visibilityState === 'visible') refresh()
  }, 60_000)
})
onBeforeUnmount(() => clearInterval(timer))

const rows = computed(() =>
  markets.map((m) => {
    const q = data.value?.quotes.find((x) => x.key === m.key)
    return { ...m, price: q?.price ?? null, change: q?.change ?? null, spark: q?.spark ?? [] }
  }),
)

const chartUrl = (tv: string) => `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tv)}`

const fmt = (n: number, d: number) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

function sparkPath(v: number[]) {
  if (v.length < 2) return ''
  const min = Math.min(...v)
  const max = Math.max(...v)
  const span = max - min || 1
  return v.map((y, i) => `${i ? 'L' : 'M'}${((i / (v.length - 1)) * 100).toFixed(1)} ${(28 - ((y - min) / span) * 26).toFixed(1)}`).join(' ')
}

const updated = computed(() => {
  if (!data.value?.at) return ''
  return new Date(data.value.at).toLocaleTimeString(lang.value === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' })
})
</script>

<template>
  <section aria-label="Markets" class="relative px-4 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <div class="glass grid grid-cols-3 gap-px overflow-hidden rounded-2xl sm:grid-cols-4 lg:grid-cols-6">
        <a
          v-for="m in rows"
          :key="m.key"
          :href="chartUrl(m.tv)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${m.name} chart on TradingView`"
          class="group relative min-w-0 bg-ink/60 px-3 py-3 transition-colors hover:bg-white/[0.06] sm:px-4 sm:py-4"
        >
          <FaIcon name="arrow-up-right-from-square" class="absolute right-3 bottom-3 text-[10px] text-mist/0 transition group-hover:text-mist/70" />
          <div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
            <span class="flex items-center gap-2"><MarketLogo :market="m.key" /><span class="font-display text-lg tracking-wider text-white sm:text-xl">{{ m.key }}</span></span>
            <span
              v-if="m.change != null"
              class="text-xs font-medium tabular-nums"
              :class="m.change >= 0 ? 'text-teal-300' : 'text-rose-400'"
            >{{ m.change >= 0 ? '+' : '' }}{{ m.change.toFixed(2) }}%</span>
          </div>
          <p class="truncate text-xs text-mist">{{ m.name }}</p>
          <p class="mt-2 truncate text-base tabular-nums text-slate-100 sm:text-lg">
            <template v-if="m.price != null">{{ fmt(m.price, m.digits) }}</template>
            <span v-else class="inline-block h-4 w-20 animate-pulse rounded bg-white/10 align-middle" />
          </p>
          <svg v-if="m.spark.length > 1" viewBox="0 0 100 30" preserveAspectRatio="none" class="mt-2 h-7 w-full" aria-hidden="true">
            <path :d="sparkPath(m.spark)" fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5"
              :stroke="(m.change ?? 0) >= 0 ? '#5eead4' : '#fb7185'" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
          <div v-else class="mt-2 h-7" />
        </a>
      </div>
      <p class="mt-2 flex items-center justify-end gap-2 text-xs text-mist/70">
        <span class="relative flex h-1.5 w-1.5"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300/60" /><span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" /></span>
        {{ lang === 'th' ? 'ราคาล่าช้าประมาณ 10 นาที · กดเพื่อดูกราฟ' : 'Prices delayed ~10 min · tap for chart' }}<template v-if="updated"> · {{ updated }}</template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 20px 60px -30px rgba(99, 102, 241, 0.45);
  backdrop-filter: blur(8px);
}
</style>
