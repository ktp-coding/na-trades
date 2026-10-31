<script setup lang="ts">
const { lang, setLang } = useLang()
</script>

<template>
  <div class="flex items-center rounded-full border border-gold/25 p-0.5 text-xs" role="group" aria-label="Language">
    <button
      v-for="l in (['en', 'th'] as const)"
      :key="l"
      type="button"
      class="rounded-full px-2.5 py-1 uppercase transition"
      :class="lang === l ? 'bg-gold text-ink' : 'text-mist hover:text-gold-soft'"
      :aria-pressed="lang === l"
      @click="setLang(l)"
    >
      {{ l }}
    </button>
  </div>
</template>
