<script setup lang="ts">
import { reviews } from '~/data/reviews'

const props = defineProps<{ limit?: number; more?: boolean }>()
const { t } = useLang()
const list = computed(() => (props.limit ? reviews.slice(0, props.limit) : reviews))
</script>

<template>
  <section id="reviews" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
    <div class="mx-auto max-w-6xl">
      <div class="mx-auto mb-10 max-w-2xl text-center">
        <p class="eyebrow mb-4">{{ t.reviews.eyebrow }}</p>
        <h2 class="section-title">{{ t.reviews.title }}</h2>
        <p class="mt-4 text-mist">{{ t.reviews.sub }}</p>
      </div>
      <div class="gap-5 sm:columns-2 lg:columns-3">
        <figure v-for="r in list" :key="r.name" class="card mb-5 break-inside-avoid p-6">
          <svg viewBox="0 0 24 24" class="h-6 w-6 text-gold/60" fill="currentColor" aria-hidden="true"><path d="M9.6 6C6.5 7.3 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.6 6Z" /></svg>
          <p class="mt-3 text-lg leading-snug text-gold-soft">{{ r.highlight }}</p>
          <blockquote class="mt-3 text-sm leading-relaxed text-slate-300">{{ r.quote }}</blockquote>
          <figcaption class="mt-5 flex items-center gap-3 border-t border-white/[0.07] pt-4">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-sm text-gold" aria-hidden="true">{{ r.name.replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase() }}</span>
            <span class="min-w-0">
              <span class="block truncate text-white">{{ r.name }}</span>
              <span class="block text-xs text-mist">{{ r.tag || t.reviews.source }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
      <div v-if="more && limit && reviews.length > limit" class="mt-4 text-center">
        <NuxtLink to="/course#reviews" class="btn-ghost">{{ t.reviews.more }}</NuxtLink>
      </div>
    </div>
  </section>
</template>
