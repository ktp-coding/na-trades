// Latest prices for the market strip on the home page.
// Source: Yahoo Finance chart API (no key needed; futures are delayed ~10 min).
// Cached for 60 seconds so every visitor shares one upstream call per minute.

export interface Quote {
  key: string
  price: number | null
  change: number | null // percent vs previous close
  spark: number[] // intraday closes, oldest first
}

const SYMBOLS: Record<string, string> = {
  NQ: 'NQ=F',
  ES: 'ES=F',
  YM: 'YM=F',
  RTY: 'RTY=F',
  BTC: 'BTC-USD',
  ETH: 'ETH-USD',
  GC: 'GC=F',
  SI: 'SI=F',
  CL: 'CL=F',
  DXY: 'DX-Y.NYB',
  EURUSD: 'EURUSD=X',
  GBPUSD: 'GBPUSD=X',
}

// Picks the latest trading session out of a few days of 15-minute bars, so the card
// still has a line (and a fair % change) on weekends and holidays when futures and
// FX are closed. A session ends at any gap of more than 90 minutes in the bars;
// markets that never close (crypto) just use the last 24 hours.
export function lastSession(ts: number[], closes: (number | null)[]) {
  const pts = ts.map((t, i) => [t, closes[i]] as const).filter((p): p is readonly [number, number] => typeof p[1] === 'number')
  if (!pts.length) return { spark: [] as number[], prev: null as number | null }
  let start = 0
  for (let i = pts.length - 1; i > 0; i--) {
    if (pts[i]![0] - pts[i - 1]![0] > 90 * 60) {
      start = i
      break
    }
  }
  const dayAgo = pts.at(-1)![0] - 24 * 3600
  while (start < pts.length - 1 && pts[start]![0] < dayAgo) start++
  const spark = pts.slice(start).map((p) => p[1])
  const prev = start > 0 ? pts[start - 1]![1] : null
  return { spark, prev }
}

// Last good quote per market, served if Yahoo fails, so a hiccup doesn't blank the cards.
const lastGood = new Map<string, Quote>()

async function fetchOne(key: string, symbol: string): Promise<Quote> {
  try {
    const res: any = await $fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`, {
      query: { interval: '15m', range: '5d', includePrePost: 'true' },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; na-trades/1.0)' },
      timeout: 6000,
    })
    const r = res?.chart?.result?.[0]
    const meta = r?.meta ?? {}
    const { spark: all, prev: sessionPrev } = lastSession(r?.timestamp ?? [], r?.indicators?.quote?.[0]?.close ?? [])
    const price: number | null = typeof meta.regularMarketPrice === 'number' ? meta.regularMarketPrice : all.at(-1) ?? null
    const prev: number | null = sessionPrev ?? meta.previousClose ?? null
    const change = price != null && prev ? ((price - prev) / prev) * 100 : null
    // Keep the sparkline light: at most ~48 points.
    const step = Math.max(1, Math.ceil(all.length / 48))
    const spark = all.filter((_, i) => i % step === 0 || i === all.length - 1)
    if (price == null) throw new Error('no price')
    const quote = { key, price, change, spark }
    lastGood.set(key, quote)
    return quote
  } catch {
    return lastGood.get(key) ?? { key, price: null, change: null, spark: [] }
  }
}

export default defineCachedEventHandler(
  async () => {
    const quotes = await Promise.all(Object.entries(SYMBOLS).map(([k, s]) => fetchOne(k, s)))
    return { quotes, at: Date.now() }
  },
  { maxAge: 60, swr: true, name: 'quotes', getKey: () => 'all' },
)
