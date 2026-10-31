<script setup lang="ts">
defineProps<{ hideExplore?: boolean }>()
const { joinHref, joinTarget } = useSiteLinks()
const { t } = useLang()
</script>

<template>
  <section class="px-4 py-16 sm:px-6 sm:py-20">
    <div class="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-b from-gold/40 via-gold/10 to-gold/25 p-px">
      <div class="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 text-center sm:px-12">
        <div aria-hidden="true" class="aura absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-2xl" />
        <p class="eyebrow relative mb-3">Full Course</p>
        <h2 class="relative font-display text-3xl tracking-wide text-white sm:text-4xl">{{ t.cta.title }}</h2>
        <p class="relative mt-3 text-mist">{{ t.cta.sub }}</p>
        <div class="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold">{{ t.cta.join }}</a>
          <NuxtLink v-if="!hideExplore" to="/course" class="btn-ghost">{{ t.cta.explore }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
