<script setup lang="ts">
import { articles } from '~/data/articles'

useHead({ title: 'บทความ · N|A TRADES' })
useSeoMeta({
  description: 'บทความเรื่อง ICT Concept, Quarterly Theory, AMD Model และวิธีมองเวลากับราคาให้เป็นระบบ จาก N|A TRADES',
  ogTitle: 'บทความ · N|A TRADES',
})

const nav = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/#modules', label: 'คอร์ส' },
  { href: '/blog', label: 'บทความ' },
  { href: '/#faq', label: 'FAQ' },
]
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_60%)]" />
    <SiteHeader :nav="nav" />
    <main class="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="eyebrow mb-4">Blog</p>
          <h1 class="section-title">บทความ</h1>
          <p class="mt-4 text-mist">แนวคิดเบื้องหลังระบบ Time &amp; Price อ่านก่อนตัดสินใจเรียนได้เลย</p>
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
