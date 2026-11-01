<script setup lang="ts">
// Round badges for the market cards, drawn here (no third-party logos): a coloured
// disc with the index size for the US index futures, gold/silver bars, an oil drop,
// coins for crypto, flags for the currency futures and a $ for the dollar index.
const props = defineProps<{ market: string }>()
const uid = useId()

const index: Record<string, { label: string; bg: string; size: number }> = {
  NQ: { label: '100', bg: '#0b8fb3', size: 8.6 },
  ES: { label: '500', bg: '#c8102e', size: 8.6 },
  YM: { label: '30', bg: '#17a2d6', size: 9.4 },
  RTY: { label: '2000', bg: '#4a1030', size: 7 },
}
const euStars = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return [12 + Math.cos(a) * 6.4, 12 + Math.sin(a) * 6.4]
})
</script>

<template>
  <svg viewBox="0 0 24 24" class="h-6 w-6 shrink-0" aria-hidden="true">
    <defs>
      <clipPath :id="`${uid}-c`"><circle cx="12" cy="12" r="12" /></clipPath>
    </defs>
    <g :clip-path="`url(#${uid}-c)`">
      <template v-if="index[market]">
        <rect width="24" height="24" :fill="index[market]!.bg" />
        <text x="12" y="12" dy=".36em" text-anchor="middle" :font-size="index[market]!.size" font-weight="700" font-family="Arial, Helvetica, sans-serif" fill="#fff">{{ index[market]!.label }}</text>
      </template>

      <template v-else-if="market === 'GC' || market === 'SI'">
        <rect width="24" height="24" :fill="market === 'GC' ? '#d99e0b' : '#b5b5c0'" />
        <g fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round">
          <path d="M9.6 8h4.8l1 2.8H8.6z" />
          <path d="M5.6 12h4.8l1 2.8H4.6zM13.6 12h4.8l1 2.8h-6.8z" />
        </g>
      </template>

      <template v-else-if="market === 'CL'">
        <rect width="24" height="24" fill="#16161a" />
        <path d="M12 5.2c-.2 0-.4.1-.5.2-1.2 1.6-4.2 5.6-4.2 8.2a4.7 4.7 0 0 0 9.4 0c0-2.6-3-6.6-4.2-8.2-.1-.1-.3-.2-.5-.2z" fill="#fff" />
      </template>

      <template v-else-if="market === 'BTC'">
        <rect width="24" height="24" fill="#f7931a" />
        <g fill="#fff" transform="rotate(12 12 12)">
          <rect x="9.6" y="4.6" width="1.4" height="2.4" />
          <rect x="12.4" y="4.6" width="1.4" height="2.4" />
          <rect x="9.6" y="17" width="1.4" height="2.4" />
          <rect x="12.4" y="17" width="1.4" height="2.4" />
          <path d="M8 6.6h5.4c2 0 3.3 1.1 3.3 2.7 0 1.1-.6 1.9-1.5 2.3 1.3.4 2.1 1.3 2.1 2.6 0 1.9-1.5 3.2-3.7 3.2H8V15h1.2V9H8zm3.6 2.3v2.4h1.6c.8 0 1.3-.5 1.3-1.2s-.5-1.2-1.3-1.2zm0 4.2V15h2c.9 0 1.5-.5 1.5-1.3s-.6-1.3-1.5-1.3z" />
        </g>
      </template>

      <template v-else-if="market === 'ETH'">
        <rect width="24" height="24" fill="#4f5fa8" />
        <path d="M12 3.6l5 8.5-5 3-5-3z" fill="#fff" />
        <path d="M12 16.2l5-3-5 7.2-5-7.2z" fill="#fff" fill-opacity=".8" />
      </template>

      <template v-else-if="market === '6E'">
        <rect width="24" height="24" fill="#1d4fb8" />
        <circle v-for="p in euStars" :key="p.join()" :cx="p[0]" :cy="p[1]" r="1.05" fill="#fcd116" />
      </template>

      <template v-else-if="market === '6B'">
        <rect width="24" height="24" fill="#012169" />
        <path d="M-2 -2L26 26M26 -2L-2 26" stroke="#fff" stroke-width="5.5" />
        <path d="M-2 -2L26 26M26 -2L-2 26" stroke="#c8102e" stroke-width="1.8" />
        <path d="M12 -2V26M-2 12H26" stroke="#fff" stroke-width="7.5" />
        <path d="M12 -2V26M-2 12H26" stroke="#c8102e" stroke-width="4.2" />
      </template>

      <template v-else>
        <!-- DXY -->
        <rect width="24" height="24" fill="#0e7a5c" />
        <text x="12" y="12" dy=".36em" text-anchor="middle" font-size="15" font-weight="700" font-family="Arial, Helvetica, sans-serif" fill="#fff">$</text>
      </template>
    </g>
  </svg>
</template>
