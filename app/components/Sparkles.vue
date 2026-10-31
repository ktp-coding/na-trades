<script setup lang="ts">
// Small gold stars that twinkle in the background. Positions come from a fixed seed,
// so the server and the browser draw the same stars (no hydration mismatch).
const props = withDefaults(defineProps<{ count?: number; seed?: number }>(), { count: 22, seed: 7 })

const stars = computed(() => {
  let x = props.seed
  const rand = () => {
    x = (x * 16807) % 2147483647
    return (x - 1) / 2147483646
  }
  return Array.from({ length: props.count }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 100).toFixed(2)}%`,
    size: 6 + Math.round(rand() * 8),
    d: `${(2.5 + rand() * 3).toFixed(2)}s`,
    delay: `${(rand() * 4).toFixed(2)}s`,
    star: rand() > 0.55,
  }))
})
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <span
      v-for="(s, i) in stars"
      :key="i"
      class="twinkle absolute"
      :style="{ left: s.left, top: s.top, width: `${s.size}px`, height: `${s.size}px`, '--d': s.d, '--delay': s.delay }"
    >
      <svg v-if="s.star" viewBox="0 0 24 24" class="h-full w-full text-gold-soft drop-shadow-[0_0_6px_rgba(231,211,164,0.8)]" fill="currentColor"><path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" /></svg>
      <span v-else class="block h-1/3 w-1/3 rounded-full bg-gold-soft shadow-[0_0_8px_2px_rgba(231,211,164,0.6)]" />
    </span>
  </div>
</template>
