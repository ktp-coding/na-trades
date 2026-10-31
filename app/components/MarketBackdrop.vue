<script setup lang="ts">
// Animated candlestick chart for hero backgrounds. The candles follow an AMD path
// (range, a stop hunt below, then expansion up) and draw in one by one, then the
// last candle keeps ticking like a live price. Data comes from a fixed seed, so the
// server and the browser render the same chart.
const props = withDefaults(defineProps<{ seed?: number; count?: number }>(), { seed: 11, count: 46 })

const W = 1200
const H = 420
const chart = computed(() => {
  let x = props.seed
  const rand = () => {
    x = (x * 16807) % 2147483647
    return (x - 1) / 2147483646
  }
  const n = props.count
  let price = 220
  const raw = Array.from({ length: n }, (_, i) => {
    const t = i / n
    // Accumulation, manipulation (dip), distribution (run up).
    const drift = t < 0.35 ? (rand() - 0.5) * 10 : t < 0.5 ? -9 + rand() * 6 : 6 + rand() * 9
    const open = price
    const close = open + drift * (rand() > 0.22 ? 1 : -0.6)
    const high = Math.max(open, close) + rand() * 12
    const low = Math.min(open, close) - rand() * 12
    price = close
    return { open, close, high, low }
  })
  const max = Math.max(...raw.map((c) => c.high))
  const min = Math.min(...raw.map((c) => c.low))
  const y = (v: number) => 30 + ((max - v) / (max - min)) * (H - 60)
  const step = W / n
  const candles = raw.map((c, i) => ({
    x: i * step + step / 2,
    w: step * 0.56,
    top: y(Math.max(c.open, c.close)),
    bottom: y(Math.min(c.open, c.close)),
    hi: y(c.high),
    lo: y(c.low),
    up: c.close >= c.open,
    delay: `${(i * 0.045).toFixed(3)}s`,
  }))
  const line = candles.map((c, i) => `${i ? 'L' : 'M'}${c.x.toFixed(1)} ${(c.up ? c.top : c.bottom).toFixed(1)}`).join(' ')
  const last = candles[candles.length - 1]!
  return { candles, line, last, lastY: last.up ? last.top : last.bottom }
})
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]">
    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMid slice" class="h-full w-full opacity-[0.32]">
      <defs>
        <linearGradient id="mb-line" x1="0" x2="1">
          <stop offset="0" stop-color="#2dd4bf" stop-opacity="0" />
          <stop offset="1" stop-color="#2dd4bf" />
        </linearGradient>
      </defs>
      <g v-for="(c, i) in chart.candles" :key="i" class="mb-candle" :style="{ animationDelay: c.delay }">
        <line :x1="c.x" :x2="c.x" :y1="c.hi" :y2="c.lo" :stroke="c.up ? '#2dd4bf' : '#fb7185'" stroke-width="1.5" />
        <rect
          :x="c.x - c.w / 2"
          :y="c.top"
          :width="c.w"
          :height="Math.max(2, c.bottom - c.top)"
          rx="1.5"
          :fill="c.up ? '#2dd4bf' : '#fb7185'"
          :class="i === chart.candles.length - 1 ? 'mb-live' : ''"
        />
      </g>
      <path :d="chart.line" fill="none" stroke="url(#mb-line)" stroke-width="2" class="mb-path" pathLength="1" />
      <circle :cx="chart.last.x" :cy="chart.lastY" r="5" fill="#2dd4bf" class="mb-dot" />
      <circle :cx="chart.last.x" :cy="chart.lastY" r="5" fill="none" stroke="#2dd4bf" stroke-width="2" class="mb-ping" />
    </svg>
  </div>
</template>

<style scoped>
.mb-candle {
  opacity: 0;
  animation: mb-in 0.5s ease-out forwards;
}
.mb-path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: mb-draw 2.6s ease-out 0.4s forwards;
}
.mb-live {
  transform-box: fill-box;
  transform-origin: bottom;
  animation: mb-tick 1.6s ease-in-out 2.6s infinite;
}
.mb-dot {
  opacity: 0;
  animation: mb-in 0.4s ease-out 2.6s forwards;
}
.mb-ping {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: mb-ping 1.8s ease-out 2.8s infinite;
}
@keyframes mb-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes mb-draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes mb-tick {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.35);
  }
}
@keyframes mb-ping {
  0% {
    opacity: 0.9;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(4);
  }
}
@media (prefers-reduced-motion: reduce) {
  .mb-candle,
  .mb-dot {
    opacity: 1;
  }
  .mb-path {
    stroke-dashoffset: 0;
  }
}
</style>
