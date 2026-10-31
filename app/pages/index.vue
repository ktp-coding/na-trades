<script setup lang="ts">
// Home = Zone A: who NA TRADES is and how we read the market.
// No prices here. The course lives on /course; this page only points to it once (CourseCta).
import { articles } from '~/data/articles'
import { freeVideos, freeVideoTitles } from '~/data/media'

const { t } = useLang()

const systemMeta: Record<string, { icon: string; slug: string }> = {
  ict: { icon: '/images/icon-ict.png', slug: 'ict-concept' },
  qt: { icon: '/images/icon-qt.png', slug: 'quarterly-theory' },
  fractal: { icon: '/images/icon-fractal.png', slug: 'fractal-model' },
}

const latest = articles.slice(0, 3)

// Old links pointed at sections that used to live on this page (e.g. /#course).
// The hash never reaches the server, so send those visitors on from the browser.
const movedSections: Record<string, string> = {
  '#course': '/course',
  '#private-course': '/course#plans',
  '#faq': '/course#faq',
}
onMounted(() => {
  const target = movedSections[window.location.hash]
  if (target) navigateTo(target, { replace: true })
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <!-- Ambient background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.35),transparent_60%)]" />
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_900px)]" />

    <SiteHeader />

    <main id="top">
      <!-- 01 Hero -->
      <section class="relative px-4 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-20">
        <MarketBackdrop />
        <div class="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <div class="relative mb-8 sm:mb-10">
            <div aria-hidden="true" class="aura absolute -inset-16 rounded-full blur-2xl sm:-inset-24" />
            <div aria-hidden="true" class="absolute -inset-6 rounded-full border border-gold/15 sm:-inset-10" />
            <div aria-hidden="true" class="absolute -inset-12 rounded-full border border-gold/[0.07] sm:-inset-20" />
            <img src="/images/icon-na.png" alt="NA TRADES" width="384" height="384" class="icon-mask relative h-40 w-40 sm:h-56 sm:w-56" fetchpriority="high" />
          </div>

          <h1 class="text-gold-gradient font-display text-6xl leading-none tracking-wide sm:text-8xl">{{ t.hero.title }}</h1>
          <p class="eyebrow mt-4">{{ t.hero.eyebrow }}</p>
          <p class="mt-8 max-w-2xl text-lg text-slate-300 sm:text-xl">{{ t.about.paragraphs[0] }}</p>

          <div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <NuxtLink to="/blog" class="btn-gold w-full sm:w-auto">
              {{ t.home.readArticles }}
              <FaIcon name="arrow-right" />
            </NuxtLink>
            <NuxtLink to="/course" class="btn-ghost w-full sm:w-auto">{{ t.home.seeCourse }}</NuxtLink>
          </div>
        </div>
      </section>

      <TickerTape />

      <!-- 02 About (short) -->
      <section id="about" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="section-title mb-8 text-center">{{ t.about.title }}</h2>
          <div class="card space-y-5 p-6 text-base leading-relaxed text-slate-300 sm:p-10 sm:text-lg">
            <p>{{ t.about.paragraphs[1] }}</p>
            <p class="text-gold-soft">{{ t.about.paragraphs[3] }}</p>
            <NuxtLink to="/about" class="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft">
              {{ t.home.aboutMore }} <FaIcon name="arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 03 Trading Systems -->
      <section id="systems" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="section-title mb-10 text-center">{{ t.systems.title }}</h2>
          <div class="grid gap-5 lg:grid-cols-3">
            <NuxtLink
              v-for="c in t.systems.cards"
              :key="c.key"
              :to="`/blog/${systemMeta[c.key]?.slug}`"
              class="card group flex flex-col p-6 transition hover:border-gold/30 sm:p-8"
            >
              <img :src="systemMeta[c.key]?.icon" :alt="c.title" width="384" height="384" loading="lazy" class="icon-mask mx-auto h-24 w-24" />
              <h3 class="mt-5 text-center font-display text-3xl tracking-wide text-white">{{ c.title }}</h3>
              <p class="mt-1 text-center text-sm text-gold">{{ c.tagline }}</p>
              <div class="mt-5 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                <p v-for="(p, i) in c.intro" :key="i">{{ p }}</p>
                <p v-if="c.highlight" class="text-gold-soft">{{ c.highlight }}</p>
              </div>
              <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-gold group-hover:text-gold-soft">
                {{ t.home.readArticle }} <FaIcon name="arrow-right" />
              </span>
            </NuxtLink>
          </div>

          <!-- 04 Framework summary -->
          <div class="mt-8 rounded-[2rem] bg-gradient-to-b from-gold/40 via-gold/5 to-gold/20 p-px">
            <div class="rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 text-center sm:px-12">
              <h3 class="text-2xl text-white sm:text-3xl">{{ t.systems.framework.title }}</h3>
              <p class="mt-2 font-display text-xl tracking-wide text-gold">Understand The Logic of Time &amp; Price</p>
              <div class="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
                <div v-for="r in t.systems.framework.rows" :key="r.k" class="card px-5 py-5">
                  <p class="text-gold-soft">{{ r.k }}</p>
                  <p class="mt-1 text-sm text-mist">{{ r.v }}</p>
                </div>
              </div>
              <p class="mt-8 text-mist">{{ t.systems.framework.closing }}</p>
              <p class="mt-1 text-lg text-gold-soft">{{ t.systems.framework.closingHighlight }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 Latest articles -->
      <section id="articles" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <h2 class="section-title">{{ t.home.latest }}</h2>
            <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft">{{ t.blog.all }} <FaIcon name="arrow-right" /></NuxtLink>
          </div>
          <div class="grid gap-5 md:grid-cols-3">
            <ArticleCard v-for="a in latest" :key="a.slug" :article="a" />
          </div>
        </div>
      </section>

      <!-- 06 Free Learning -->
      <section id="free-learning" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <h2 class="section-title">{{ t.free.title }}</h2>
            <p class="mt-4 text-mist">{{ t.free.sub }}</p>
          </div>
          <div class="grid gap-5 md:grid-cols-3">
            <div v-for="(id, i) in freeVideos" :key="id" class="card p-2">
              <YoutubeLite :id="id" :title="freeVideoTitles[id] || `${t.free.video} ${i + 1}`" :play-label="t.free.play" />
            </div>
          </div>
          <div class="mt-8 text-center">
            <NuxtLink to="/free" class="btn-ghost">{{ t.home.freeMore }}</NuxtLink>
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <StudentReviews :limit="3" more />

      <!-- 07 Course banner -->
      <CourseCta />
    </main>

    <SiteFooter />
  </div>
</template>
