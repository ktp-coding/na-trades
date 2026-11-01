<script setup lang="ts">
// Small round badges for the market cards. Drawn here (no third-party logos):
// US flag for the US index futures, coins for crypto, metal discs, an oil drop,
// and paired flags for the currency pairs.
const props = defineProps<{ market: string }>()
const uid = useId()

type Badge = 'us' | 'eu' | 'uk' | 'btc' | 'eth' | 'gold' | 'silver' | 'oil'
const badges = computed<Badge[]>(() => {
  switch (props.market) {
    case 'BTC': return ['btc']
    case 'ETH': return ['eth']
    case 'GC': return ['gold']
    case 'SI': return ['silver']
    case 'CL': return ['oil']
    case 'EURUSD': return ['eu', 'us']
    case 'GBPUSD': return ['uk', 'us']
    default: return ['us'] // NQ, ES, YM, RTY, DXY
  }
})
const stripes = [0, 2, 4, 6, 8, 10, 12].map((i) => i * (24 / 13))
const euStars = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return [12 + Math.cos(a) * 6.2, 12 + Math.sin(a) * 6.2]
})
</script>

<template>
  <span class="inline-flex shrink-0 items-center" aria-hidden="true">
    <svg
      v-for="(b, i) in badges"
      :key="b"
      viewBox="0 0 24 24"
      class="h-5 w-5 rounded-full ring-2 ring-ink-2"
      :class="i > 0 ? '-ml-1.5' : ''"
    >
      <defs>
        <clipPath :id="`${uid}-${b}`"><circle cx="12" cy="12" r="12" /></clipPath>
        <radialGradient v-if="b === 'gold' || b === 'silver'" :id="`${uid}-${b}-g`" cx="35%" cy="30%" r="75%">
          <stop offset="0" :stop-color="b === 'gold' ? '#fde68a' : '#f4f4f5'" />
          <stop offset="1" :stop-color="b === 'gold' ? '#b8892f' : '#8b8b94'" />
        </radialGradient>
      </defs>
      <g :clip-path="`url(#${uid}-${b})`">
        <template v-if="b === 'us'">
          <rect width="24" height="24" fill="#f5f5f5" />
          <rect v-for="y in stripes" :key="y" x="0" :y="y" width="24" :height="24 / 13" fill="#c8102e" />
          <rect width="11" height="12.9" fill="#1f3a8a" />
          <circle v-for="p in [[3,3],[7,3],[5,6.4],[3,9.8],[7,9.8]]" :key="p.join()" :cx="p[0]" :cy="p[1]" r="0.9" fill="#fff" />
        </template>
        <template v-else-if="b === 'eu'">
          <rect width="24" height="24" fill="#1d3f9a" />
          <circle v-for="p in euStars" :key="p.join()" :cx="p[0]" :cy="p[1]" r="1" fill="#fcd34d" />
        </template>
        <template v-else-if="b === 'uk'">
          <rect width="24" height="24" fill="#1e3a8a" />
          <path d="M0 0L24 24M24 0L0 24" stroke="#fff" stroke-width="5" />
          <path d="M0 0L24 24M24 0L0 24" stroke="#c8102e" stroke-width="1.8" />
          <path d="M12 0V24M0 12H24" stroke="#fff" stroke-width="7" />
          <path d="M12 0V24M0 12H24" stroke="#c8102e" stroke-width="4" />
        </template>
        <template v-else-if="b === 'btc'">
          <rect width="24" height="24" fill="#f7931a" />
          <g fill="#fff">
            <rect x="9.6" y="4.6" width="1.4" height="2.4" />
            <rect x="12.4" y="4.6" width="1.4" height="2.4" />
            <rect x="9.6" y="17" width="1.4" height="2.4" />
            <rect x="12.4" y="17" width="1.4" height="2.4" />
            <path d="M8 6.6h5.4c2 0 3.3 1.1 3.3 2.7 0 1.1-.6 1.9-1.5 2.3 1.3.4 2.1 1.3 2.1 2.6 0 1.9-1.5 3.2-3.7 3.2H8V15h1.2V9H8zm3.6 2.3v2.4h1.6c.8 0 1.3-.5 1.3-1.2s-.5-1.2-1.3-1.2zm0 4.2V15h2c.9 0 1.5-.5 1.5-1.3s-.6-1.3-1.5-1.3z" />
          </g>
        </template>
        <template v-else-if="b === 'eth'">
          <rect width="24" height="24" fill="#627eea" />
          <path d="M12 3.5l5.2 8.7L12 15.3l-5.2-3.1z" fill="#fff" />
          <path d="M12 16.4l5.2-3.1L12 20.6l-5.2-7.3z" fill="#fff" fill-opacity=".75" />
        </template>
        <template v-else-if="b === 'gold' || b === 'silver'">
          <rect width="24" height="24" :fill="`url(#${uid}-${b}-g)`" />
          <text x="12" y="15.6" text-anchor="middle" font-size="9.5" font-weight="700" font-family="Arial, sans-serif" :fill="b === 'gold' ? '#5b3d06' : '#3f3f46'">{{ b === 'gold' ? 'Au' : 'Ag' }}</text>
        </template>
        <template v-else-if="b === 'oil'">
          <rect width="24" height="24" fill="#1c1c22" />
          <path d="M12 4.5c-.2 0-.4.1-.5.2C10.3 6.3 6.8 11 6.8 13.9a5.2 5.2 0 0 0 10.4 0c0-2.9-3.5-7.6-4.7-9.2-.1-.1-.3-.2-.5-.2z" fill="#f5b041" />
        </template>
      </g>
    </svg>
  </span>
</template>
