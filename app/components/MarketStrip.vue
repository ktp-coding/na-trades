<script setup lang="ts">
// Market prices from TradingView's free "Tickers" widget, two rows of six.
// Futures (NQ, ES, YM, RTY, GC, SI, CL) use TradingView's CFD feeds, which are
// real time in the free widget; CME futures themselves are delayed there.
const { lang } = useLang()

const rows = [
  [
    { proName: 'OANDA:NAS100USD', title: 'NQ · Nasdaq 100' },
    { proName: 'OANDA:SPX500USD', title: 'ES · S&P 500' },
    { proName: 'OANDA:US30USD', title: 'YM · Dow Jones' },
    { proName: 'OANDA:US2000USD', title: 'RTY · Russell 2000' },
    { proName: 'BINANCE:BTCUSDT', title: 'BTC' },
    { proName: 'BINANCE:ETHUSDT', title: 'ETH' },
  ],
  [
    { proName: 'OANDA:XAUUSD', title: 'GC · Gold' },
    { proName: 'OANDA:XAGUSD', title: 'SI · Silver' },
    { proName: 'TVC:USOIL', title: 'CL · Crude Oil' },
    { proName: 'TVC:DXY', title: 'DXY' },
    { proName: 'FX:EURUSD', title: 'EURUSD' },
    { proName: 'FX:GBPUSD', title: 'GBPUSD' },
  ],
]

const hosts = ref<HTMLDivElement[]>([])

function mount() {
  hosts.value.forEach((host, i) => {
    host.innerHTML = '<div class="tradingview-widget-container__widget"></div>'
    const s = document.createElement('script')
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
    s.async = true
    s.innerHTML = JSON.stringify({
      symbols: rows[i],
      colorTheme: 'dark',
      isTransparent: true,
      showSymbolLogo: true,
      locale: lang.value === 'th' ? 'th_TH' : 'en',
    })
    host.appendChild(s)
  })
}

onMounted(mount)
watch(lang, mount)
</script>

<template>
  <section aria-label="Markets" class="relative px-4 sm:px-6">
    <div class="glass mx-auto max-w-6xl overflow-hidden rounded-2xl px-2 py-2 sm:px-4">
      <div v-for="(_, i) in rows" :key="i" :ref="(el) => { if (el) hosts[i] = el as HTMLDivElement }" class="tradingview-widget-container min-h-[72px]" />
    </div>
    <p class="mx-auto mt-2 max-w-6xl text-right text-xs text-mist/60">
      <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank" class="hover:text-mist">Market data by TradingView</a>
    </p>
  </section>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
}
</style>
