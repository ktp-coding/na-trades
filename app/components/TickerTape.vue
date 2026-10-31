<script setup lang="ts">
// Scrolling strip of the concepts taught in the course, styled like a market ticker.
const items = [
  { k: 'ICT', up: true },
  { k: 'Quarterly Theory', up: true },
  { k: 'Fractal Model', up: true },
  { k: 'Liquidity Sweep', up: false },
  { k: 'FVG', up: true },
  { k: 'True Open', up: true },
  { k: 'Power of 3', up: true },
  { k: 'Judas Swing', up: false },
  { k: 'CISD', up: true },
  { k: 'SMT', up: false },
  { k: 'Order Block', up: true },
  { k: 'IRL → ERL', up: true },
]
</script>

<template>
  <div class="relative overflow-hidden border-y border-white/[0.06] bg-ink-2/80 py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
    <div class="ticker flex w-max gap-10 font-display text-lg tracking-wider whitespace-nowrap">
      <template v-for="n in 2" :key="n">
        <span v-for="it in items" :key="`${n}-${it.k}`" class="inline-flex items-center gap-2 text-slate-300" :aria-hidden="n === 2">
          <span :class="it.up ? 'text-teal-300' : 'text-rose-400'">{{ it.up ? '▲' : '▼' }}</span>
          {{ it.k }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  animation: ticker 40s linear infinite;
}
.ticker:hover {
  animation-play-state: paused;
}
@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}
</style>
