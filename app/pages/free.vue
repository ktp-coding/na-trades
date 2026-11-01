<script setup lang="ts">
import { freePdf, freeVideos, freeVideoTitles } from '~/data/media'
import { articles } from '~/data/articles'

const { t } = useLang()
const { socials, lineLink } = useSiteLinks()
const youtube = computed(() => socials.find((s) => s.name === 'youtube')?.href || '')
const [featured, ...moreVideos] = freeVideos

// Tabs: ?tab=pdf opens the PDF tab directly, so the link can be shared.
const route = useRoute()
const router = useRouter()
const tab = computed<'videos' | 'pdf'>({
  get: () => (route.query.tab === 'pdf' ? 'pdf' : 'videos'),
  set: (v) => router.replace({ query: { ...route.query, tab: v === 'pdf' ? 'pdf' : undefined } }),
})
const selectedImage = ref<{ src: string; alt: string } | null>(null)

useHead({ title: () => `${t.value.free.title} · NA TRADES` })
useSeoMeta({ description: () => t.value.free.sub, ogTitle: () => `${t.value.free.title} · NA TRADES` })
useShareImage('free')
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <SiteHeader />

    <main class="relative px-4 pt-32 pb-12 sm:px-6 sm:pt-40">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="eyebrow mb-4">{{ t.freePage.eyebrow }}</p>
          <h1 class="section-title">{{ t.free.title }}</h1>
          <p class="mt-4 text-mist">{{ t.free.sub }}</p>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="mx-auto mb-10 flex w-fit rounded-full border border-white/10 bg-ink-2 p-1 text-sm">
          <button
            v-for="k in (['videos', 'pdf'] as const)"
            :key="k"
            type="button"
            role="tab"
            :aria-selected="tab === k"
            class="rounded-full px-6 py-2.5 transition"
            :class="tab === k ? 'bg-gold text-ink' : 'text-mist hover:text-white'"
            @click="tab = k"
          >
            {{ k === 'videos' ? t.freePage.tabVideos : t.freePage.tabPdf }}
          </button>
        </div>

        <!-- Free PDF -->
        <div v-if="tab === 'pdf'" class="mx-auto max-w-5xl">
          <div class="grid items-center gap-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-12">
            <a :href="freePdf.href" target="_blank" rel="noopener noreferrer" class="group mx-auto block w-full max-w-[340px]">
              <img :src="freePdf.cover" :alt="t.freePage.pdf.title" width="1200" height="1500" class="w-full rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-gold/20 transition duration-500 group-hover:-translate-y-1" />
            </a>
            <div class="text-center md:text-left">
              <p class="eyebrow" :class="trackingFix(t.freePage.pdf.eyebrow)">{{ t.freePage.pdf.eyebrow }}</p>
              <h2 class="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">{{ t.freePage.pdf.title }}</h2>
              <p class="mt-4 text-slate-300">{{ t.freePage.pdf.sub }}</p>
              <div class="mt-7">
                <a :href="freePdf.href" target="_blank" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto">
                  {{ t.freePage.pdf.cta }}
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </a>
                <p class="mt-3 text-xs text-mist">{{ t.freePage.pdf.note }}</p>
              </div>
            </div>
          </div>

          <div v-if="freePdf.video" class="mx-auto mt-16 max-w-3xl">
            <h3 class="text-center text-2xl text-white">{{ t.freePage.pdf.videoTitle }}</h3>
            <p class="mt-2 mb-6 text-center text-mist">{{ t.freePage.pdf.videoSub }}</p>
            <div class="rounded-2xl ring-1 ring-white/10">
              <YoutubeLite :id="freePdf.video" :title="t.freePage.pdf.videoTitle" :play-label="t.free.play" />
            </div>
          </div>

          <h3 class="mt-16 mb-6 text-center text-2xl text-white">{{ t.freePage.pdf.insideTitle }}</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="(it, i) in t.freePage.pdf.items" :key="it.k" class="card p-6">
              <p class="font-display text-lg tracking-wide text-gold">0{{ i + 1 }}</p>
              <h4 class="mt-1 text-lg text-white">{{ it.k }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-slate-300">{{ it.v }}</p>
            </div>
          </div>

          <div class="mt-5 rounded-3xl border border-gold/25 bg-gold/[0.04] p-6 sm:p-8">
            <h4 class="text-lg text-gold-soft">{{ t.freePage.pdf.stepsTitle }}</h4>
            <ol class="mt-4 space-y-3 text-slate-300">
              <li v-for="(st, i) in t.freePage.pdf.steps" :key="st" class="flex gap-3">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs text-gold">{{ i + 1 }}</span>
                <span>{{ st }}</span>
              </li>
            </ol>
          </div>

          <h3 class="mt-16 mb-6 text-center text-2xl text-white">{{ t.freePage.pdf.previewTitle }}</h3>
          <div class="grid gap-4 sm:grid-cols-3">
            <button
              v-for="(src, i) in freePdf.pages"
              :key="src"
              type="button"
              class="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white"
              @click="selectedImage = { src, alt: `${t.freePage.pdf.title} ${i + 1}` }"
            >
              <img :src="src" :alt="`${t.freePage.pdf.title} ${i + 1}`" width="800" height="800" loading="lazy" class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
            </button>
          </div>
          <div class="mt-10 text-center">
            <a :href="freePdf.href" target="_blank" rel="noopener noreferrer" class="btn-gold">{{ t.freePage.pdf.cta }}</a>
          </div>
        </div>

        <!-- Videos: the first one big, the rest in a 2-column row -->
        <div v-else class="mx-auto max-w-3xl space-y-5">
          <figure v-if="featured">
            <YoutubeLite :id="featured" :title="freeVideoTitles[featured] || `${t.free.video} 1`" :play-label="t.free.play" />
            <figcaption class="px-1 pt-3 text-white">{{ freeVideoTitles[featured] }}</figcaption>
          </figure>
          <div class="grid gap-5 sm:grid-cols-2">
            <figure v-for="(id, i) in moreVideos" :key="id">
              <YoutubeLite :id="id" :title="freeVideoTitles[id] || `${t.free.video} ${i + 2}`" :play-label="t.free.play" />
              <figcaption class="px-1 pt-3 text-sm text-white">{{ freeVideoTitles[id] }}</figcaption>
            </figure>
          </div>
          <div v-if="youtube" class="pt-3 text-center">
            <a :href="youtube" target="_blank" rel="noopener noreferrer" class="btn-ghost inline-flex items-center gap-2">
              <SocialIcon name="youtube" class="h-5 w-5" />
              {{ t.freePage.youtube }}
            </a>
          </div>
        </div>

        <!-- Articles -->
        <section class="mt-20">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <h2 class="text-2xl text-white sm:text-3xl">{{ t.freePage.readTitle }}</h2>
            <p class="mt-3 text-mist">{{ t.freePage.readSub }}</p>
          </div>
          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
          </div>
        </section>

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
              <SocialIcon name="line" class="h-5 w-5" />
              {{ t.freePage.line }}
            </a>
          </div>
        </section>
      </div>
    </main>

    <CourseCta />
    <ImageModal v-model="selectedImage" />
    <SiteFooter />
  </div>
</template>
