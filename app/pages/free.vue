<script setup lang="ts">
import { freeVideos } from '~/data/media'

const { t } = useLang()
const { socials, lineLink } = useSiteLinks()

useHead({ title: () => `${t.value.free.title} · NA TRADES` })
useSeoMeta({ description: () => t.value.free.sub, ogTitle: () => `${t.value.free.title} · NA TRADES` })
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(15,76,76,0.35),transparent_60%)]" />
    <SiteHeader />

    <main class="relative px-4 pt-32 pb-12 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="eyebrow mb-4">{{ t.freePage.eyebrow }}</p>
          <h1 class="section-title">{{ t.free.title }}</h1>
          <p class="mt-4 text-mist">{{ t.free.sub }}</p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(id, i) in freeVideos" :key="id" class="card p-2">
            <YoutubeLite :id="id" :title="`${t.free.video} ${i + 1}`" :play-label="t.free.play" />
          </div>
        </div>

        <section v-if="socials.length || lineLink" class="mx-auto mt-20 max-w-3xl text-center">
          <h2 class="text-2xl text-white sm:text-3xl">{{ t.freePage.community }}</h2>
          <p class="mt-3 text-mist">{{ t.freePage.communitySub }}</p>
          <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="card flex items-center justify-center gap-3 px-4 py-4 text-slate-200 transition hover:border-gold/30 hover:text-gold-soft"
            >
              <SocialIcon :name="s.name" class="h-5 w-5" />
              {{ s.label }}
            </a>
            <a
              v-if="lineLink"
              :href="lineLink"
              target="_blank"
              rel="noopener noreferrer"
              class="card flex items-center justify-center gap-3 px-4 py-4 text-slate-200 transition hover:border-gold/30 hover:text-gold-soft"
            >
              {{ t.freePage.line }}
            </a>
          </div>
        </section>
      </div>
    </main>

    <CourseCta />
    <SiteFooter />
  </div>
</template>
