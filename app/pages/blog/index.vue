<script setup lang="ts">
import { articles } from '~/data/articles'


const { t } = useLang()
useHead({ title: () => `${t.value.blog.title} · N|A TRADES` })
useSeoMeta({ description: () => t.value.blog.sub, ogTitle: () => `${t.value.blog.title} · N|A TRADES` })
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_60%)]" />
    <SiteHeader />
    <main class="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="eyebrow mb-4">{{ t.blog.eyebrow }}</p>
          <h1 class="section-title">{{ t.blog.title }}</h1>
          <p class="mt-4 text-mist">{{ t.blog.sub }}</p>
        </div>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
        </div>
      </div>
    </main>
    <CourseCta />
    <SiteFooter />
  </div>
</template>
