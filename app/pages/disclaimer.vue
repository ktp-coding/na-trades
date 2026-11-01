<script setup lang="ts">
const { t } = useLang()

useHead({ title: () => `${t.value.disclaimerPage.title} · NA TRADES` })
useSeoMeta({ description: () => t.value.disclaimerPage.intro, ogTitle: () => `${t.value.disclaimerPage.title} · NA TRADES` })
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <SiteHeader />

    <main class="relative px-4 pt-32 pb-16 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-3xl">
        <h1 class="section-title text-center">{{ t.disclaimerPage.title }}</h1>
        <p class="mt-4 text-center text-mist">{{ t.disclaimerPage.intro }}</p>

        <ol class="mt-12 space-y-4">
          <li v-for="(s, i) in t.disclaimerPage.sections" :key="s.k" class="card flex gap-5 p-6">
            <span class="font-display text-sm tracking-[0.3em] text-gold/70">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h2 class="text-lg text-white">{{ s.k }}</h2>
              <p class="mt-2 text-sm leading-relaxed text-slate-300">{{ s.v }}</p>
            </div>
          </li>
        </ol>

        <p class="mt-10 text-center text-xs text-mist/60">{{ t.disclaimerPage.updated }}</p>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
