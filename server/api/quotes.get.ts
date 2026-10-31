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
  BTC: 'BTC-USD',
  GC: 'GC=F',
  CL: 'CL=F',
}

async function fetchOne(key: string, symbol: string): Promise<Quote> {
  try {
    const res: any = await $fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`, {
      query: { interval: '15m', range: '1d', includePrePost: 'true' },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; na-trades/1.0)' },
      timeout: 6000,
    })
    const r = res?.chart?.result?.[0]
    const meta = r?.meta ?? {}
    const closes: number[] = (r?.indicators?.quote?.[0]?.close ?? []).filter((v: unknown): v is number => typeof v === 'number')
    const price: number | null = typeof meta.regularMarketPrice === 'number' ? meta.regularMarketPrice : closes.at(-1) ?? null
    const prev: number | null = meta.chartPreviousClose ?? meta.previousClose ?? null
    const change = price != null && prev ? ((price - prev) / prev) * 100 : null
    // Keep the sparkline light: at most ~48 points.
    const step = Math.max(1, Math.ceil(closes.length / 48))
    const spark = closes.filter((_, i) => i % step === 0 || i === closes.length - 1)
    return { key, price, change, spark }
  } catch {
    return { key, price: null, change: null, spark: [] }
  }
}

export default defineCachedEventHandler(
  async () => {
    const quotes = await Promise.all(Object.entries(SYMBOLS).map(([k, s]) => fetchOne(k, s)))
    return { quotes, at: Date.now() }
  },
  { maxAge: 60, swr: true, name: 'quotes', getKey: () => 'all' },
)
