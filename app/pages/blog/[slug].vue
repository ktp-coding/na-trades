<script setup lang="ts">
import { articles, findArticle } from '~/data/articles'

const route = useRoute()
const article = findArticle(String(route.params.slug))
if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}


const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

const { lang, t } = useLang()
const nav = computed(() => [
  { href: '/', label: t.value.nav.home },
  { href: '/#systems', label: t.value.nav.systems },
  { href: '/#course', label: t.value.nav.course },
  { href: '/blog', label: t.value.nav.blog },
  { href: '/#contact', label: t.value.nav.contact },
])

useHead({ title: `${article.title} · N|A TRADES` })
useSeoMeta({
  description: () => article.excerpt[lang.value],
  ogTitle: article.title,
  ogDescription: () => article.excerpt[lang.value],
  ogType: 'article',
})
</script>

<template>
  <div v-if="article" class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_60%)]" />
    <SiteHeader :nav="nav" />
    <main class="relative px-4 pt-28 pb-12 sm:px-6 sm:pt-36">
      <article class="mx-auto max-w-2xl">
        <NuxtLink to="/blog" class="text-sm text-mist hover:text-gold-soft">{{ t.blog.back }}</NuxtLink>
        <header class="mt-8 flex flex-col items-start gap-5">
          <img :src="article.icon" alt="" width="384" height="384" class="icon-mask h-16 w-16" />
          <p class="eyebrow">{{ article.tagline[lang] }}</p>
          <h1 class="text-gold-gradient font-display text-5xl leading-none tracking-wide sm:text-6xl">{{ article.title }}</h1>
        </header>

        <div class="mt-10 space-y-6 text-lg leading-relaxed text-slate-300">
          <template v-for="(b, i) in article.body[lang]" :key="i">
            <p v-if="b.type === 'p'">{{ b.text }}</p>
            <h2 v-else-if="b.type === 'h2'" class="pt-4 text-xl font-normal text-white">{{ b.text }}</h2>
            <ul v-else-if="b.type === 'list'" class="space-y-3">
              <li v-for="item in b.items" :key="item" class="flex gap-3">
                <span class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{{ item }}</span>
              </li>
            </ul>
            <blockquote v-else-if="b.type === 'quote'" class="border-l-2 border-gold py-1 pl-5 text-xl text-gold-soft sm:text-2xl">
              {{ b.text }}
            </blockquote>
            <p v-else-if="b.type === 'note'" class="card px-6 py-5 text-base text-mist italic">{{ b.text }}</p>
          </template>
        </div>
      </article>

      <section class="mx-auto mt-20 max-w-6xl">
        <h2 class="mb-6 text-xl text-white">{{ t.blog.next }}</h2>
        <div class="grid gap-5 md:grid-cols-3">
          <ArticleCard v-for="a in others" :key="a.slug" :article="a" />
        </div>
      </section>
    </main>
    <CourseCta />
    <SiteFooter />
  </div>
</template>
