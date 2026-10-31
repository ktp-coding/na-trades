<script setup lang="ts">
import type { Article } from '~/data/articles'

defineProps<{ article: Article }>()
const { lang, t } = useLang()

const themes: Record<Article['theme'], string> = {
  gold: 'from-gold/25 via-gold/5 hover:border-gold/40',
  ict: 'from-ict/60 via-ict/15 hover:border-ict-glow/50',
  qt: 'from-qt/60 via-qt/15 hover:border-qt-glow/50',
  fractal: 'from-fractal/70 via-fractal/15 hover:border-fractal-glow/50',
}
</script>

<template>
  <NuxtLink
    :to="`/blog/${article.slug}`"
    class="group flex h-full flex-col rounded-3xl border border-white/[0.07] bg-gradient-to-b to-ink-2 p-6 transition duration-500 sm:p-7"
    :class="themes[article.theme]"
  >
    <div class="flex items-center gap-4">
      <img :src="article.icon" alt="" width="384" height="384" loading="lazy" class="icon-mask h-14 w-14 shrink-0" />
      <p class="text-xs tracking-[0.25em] text-gold uppercase" :class="trackingFix(article.tagline[lang])">{{ article.tagline[lang] }}</p>
    </div>
    <h3 class="mt-5 font-display text-3xl tracking-wide text-white">{{ article.title }}</h3>
    <p class="mt-3 flex-1 text-sm leading-relaxed text-mist">{{ article.excerpt[lang] }}</p>
    <span class="mt-6 inline-flex items-center gap-2 text-sm text-gold-soft">
      {{ t.blog.readMore }}
      <svg viewBox="0 0 24 24" class="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </span>
  </NuxtLink>
</template>
