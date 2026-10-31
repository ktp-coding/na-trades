<script setup lang="ts">
const { t } = useLang()

useHead({ title: () => `${t.value.about.title} · NA TRADES` })
useSeoMeta({ description: () => t.value.about.paragraphs[0], ogTitle: () => `${t.value.about.title} · NA TRADES` })
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <SiteHeader />

    <main class="relative px-4 pt-32 pb-12 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-3xl">
        <div class="flex flex-col items-center text-center">
          <div class="relative mb-8">
            <div aria-hidden="true" class="aura absolute -inset-12 rounded-full blur-2xl" />
            <img src="/images/icon-na.png" alt="NA TRADES" width="384" height="384" class="icon-mask logo-star relative h-28 w-28 sm:h-36 sm:w-36" />
          </div>
          <p class="eyebrow">{{ t.aboutPage.eyebrow }}</p>
          <h1 class="section-title mt-3">{{ t.about.title }}</h1>
        </div>

        <div class="reading-veil mt-10 space-y-6 text-base leading-relaxed text-slate-300 sm:text-lg">
          <p v-for="(para, i) in t.about.paragraphs" :key="i" :class="i === 0 ? 'text-xl text-gold-soft sm:text-2xl' : ''">{{ para }}</p>
        </div>

        <div class="mt-14 rounded-[2rem] bg-gradient-to-b from-gold/40 via-gold/5 to-gold/20 p-px">
          <div class="rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 sm:px-10">
            <h2 class="text-center text-2xl text-white">{{ t.systems.framework.title }}</h2>
            <ul class="mt-6 divide-y divide-white/10">
              <li v-for="(r, i) in t.systems.framework.rows" :key="r.k" class="flex gap-5 py-4">
                <span class="font-display text-sm tracking-[0.3em] text-gold/70">{{ String(i + 1).padStart(2, '0') }}</span>
                <div>
                <p class="text-gold-soft">{{ r.k }}</p>
                <p class="mt-1 text-sm text-mist">{{ r.v }}</p>
                </div>
              </li>
            </ul>
            <p class="mt-8 text-center text-mist">{{ t.systems.framework.closing }}</p>
            <p class="mt-1 text-center text-lg text-gold-soft">{{ t.systems.framework.closingHighlight }}</p>
          </div>
        </div>

        <div class="mt-10 text-center">
          <NuxtLink to="/blog" class="btn-ghost">{{ t.aboutPage.blogLink }}</NuxtLink>
        </div>
      </div>
    </main>

    <CourseCta />
    <SiteFooter />
  </div>
</template>
