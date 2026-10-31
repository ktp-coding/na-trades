<script setup lang="ts">
// Course = Zone B: everything needed to decide and enroll, in buying order.
import { PLAN_KEYS, type PlanKey } from '#shared/enroll'

const { t } = useLang()
const { joinHref, joinTarget, enrollEnabled, courseLink, privateCourseLink, showBuyCourse, showBuyPrivateCourse, blobBaseUrl } = useSiteLinks()
const { priceLabel } = usePlanPrice()

useHead({ title: () => `${t.value.course.title} · NA TRADES` })
useSeoMeta({ description: () => t.value.course.sub, ogTitle: () => `${t.value.course.title} · NA TRADES` })

const moduleStyles = [
  { no: '01', title: 'ICT Core Concepts', icon: '/images/icon-ict.png', accent: 'from-ict/60 via-ict/15 hover:border-ict-glow/50', glow: 'bg-ict-glow' },
  { no: '02', title: 'Quarterly Theory Fundamentals', icon: '/images/icon-qt.png', accent: 'from-qt/60 via-qt/15 hover:border-qt-glow/50', glow: 'bg-qt-glow' },
  { no: '03', title: 'Fractal Model', icon: '/images/icon-fractal.png', accent: 'from-fractal/70 via-fractal/15 hover:border-fractal-glow/50', glow: 'bg-fractal-glow' },
]
const pathDots = ['bg-ict-glow', 'bg-qt-glow', 'bg-fractal-glow', 'bg-gold']

// Where each plan's button goes: the enroll form when it is on, otherwise the old external links.
const planHref = (key: PlanKey) => {
  if (enrollEnabled) return `/enroll?plan=${key}`
  return (key === 'private' ? privateCourseLink : courseLink) || '#contact'
}
const isExternal = (href: string) => href.startsWith('http')

// Module slides live in /public/images/course. Extra course posters still come from Vercel Blob.
const courseImages = computed(() => {
  const list = [
    { src: '/images/course/module-1-ict.webp', alt: 'Module 01 · ICT Core Concepts' },
    { src: '/images/course/module-2-qt.webp', alt: 'Module 02 · Quarterly Theory Fundamentals' },
    { src: '/images/course/module-3-fractal.webp', alt: 'Module 03 · Fractal Model' },
  ]
  if (blobBaseUrl && showBuyCourse) {
    list.push(
      { src: `${blobBaseUrl}/images/2026P1-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P1' },
      { src: `${blobBaseUrl}/images/2026P3-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P3' },
    )
  }
  return list
})

const privateCourseImages = computed(() =>
  blobBaseUrl && showBuyPrivateCourse
    ? [
        { src: `${blobBaseUrl}/images/Mentorship.png`, alt: 'Mentorship' },
        { src: `${blobBaseUrl}/images/4.%20Large%20Range%20Model.png`, alt: 'Large Range Model' },
      ]
    : [],
)

const selectedImage = ref<{ src: string; alt: string } | null>(null)
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(76,29,149,0.3),transparent_60%)]" />

    <SiteHeader />

    <main>
      <!-- 01 Hero -->
      <section class="relative px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-16">
        <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p class="eyebrow mb-4">{{ t.course.eyebrow }}</p>
          <h1 class="text-gold-gradient font-display text-5xl leading-none tracking-wide sm:text-7xl">{{ t.course.title }}</h1>
          <p class="mt-5 max-w-2xl text-lg text-slate-300">{{ t.hero.sub }}</p>
          <div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto">
              {{ t.course.cta }}
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </a>
            <a href="#plans" class="btn-ghost w-full sm:w-auto">{{ t.coursePage.plansTitle }}</a>
          </div>
          <ul class="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 text-sm text-mist sm:grid-cols-4">
            <li v-for="s in t.hero.stats" :key="s.l" class="card px-4 py-3">
              <span class="block font-display text-2xl text-gold-soft">{{ s.v }}</span>{{ s.l }}
            </li>
          </ul>
        </div>
      </section>

      <!-- 02 Who it's for -->
      <section class="px-4 py-12 sm:px-6 sm:py-16">
        <div class="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div class="card p-6 sm:p-8">
            <h2 class="text-xl text-white sm:text-2xl">{{ t.coursePage.forTitle }}</h2>
            <ul class="mt-5 space-y-3">
              <li v-for="item in t.coursePage.forItems" :key="item" class="flex items-start gap-3 text-slate-300">
                <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="card p-6 sm:p-8">
            <h2 class="text-xl text-white sm:text-2xl">{{ t.coursePage.notForTitle }}</h2>
            <ul class="mt-5 space-y-3">
              <li v-for="item in t.coursePage.notForItems" :key="item" class="flex items-start gap-3 text-mist">
                <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-mist/60" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" /></svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 03 Modules -->
      <section id="modules" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <h2 class="section-title">{{ t.course.title }}</h2>
            <p class="mt-4 text-mist">{{ t.course.sub }}</p>
          </div>
          <div class="grid gap-5 lg:grid-cols-3">
            <article
              v-for="(m, i) in moduleStyles"
              :key="m.no"
              class="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b to-ink-2 p-6 transition duration-500 sm:p-8"
              :class="m.accent"
            >
              <div aria-hidden="true" class="absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-25 blur-3xl transition duration-500 group-hover:opacity-45" :class="m.glow" />
              <div class="relative flex items-center gap-4">
                <img :src="m.icon" :alt="m.title" width="384" height="384" loading="lazy" class="icon-mask h-20 w-20 shrink-0" />
                <div>
                  <p class="text-xs tracking-[0.3em] text-gold">{{ t.course.moduleLabel.toUpperCase() }} {{ m.no }}</p>
                  <p class="mt-1 text-sm text-mist">{{ t.course.modules[i]?.tag }}</p>
                </div>
              </div>
              <h3 class="relative mt-6 font-display text-3xl tracking-wide text-white sm:text-4xl">{{ m.title }}</h3>
              <ul class="relative mt-5 space-y-2.5">
                <li v-for="topic in t.course.modules[i]?.topics" :key="topic" class="flex gap-3 text-sm text-slate-300">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{{ topic }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- 04 Learning path -->
      <section class="px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-3xl">
          <h2 class="section-title mb-10 text-center">{{ t.coursePage.pathTitle }}</h2>
          <ol class="relative space-y-6 border-l border-white/10 pl-8">
            <li v-for="(step, i) in t.coursePage.path" :key="step.k" class="relative">
              <span aria-hidden="true" class="absolute top-1.5 -left-[2.32rem] h-3 w-3 rounded-full ring-4 ring-ink" :class="pathDots[i]" />
              <p class="font-display text-sm tracking-[0.3em] text-gold">{{ String(i + 1).padStart(2, '0') }}</p>
              <h3 class="mt-1 text-lg text-white">{{ step.k }}</h3>
              <p class="mt-1 text-mist">{{ step.v }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- 05 What's included -->
      <section class="px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-b from-gold/50 via-gold/10 to-gold/30 p-px">
            <div class="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 sm:px-12 sm:py-12">
              <div aria-hidden="true" class="aura absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-2xl" />
              <h2 class="relative text-center text-2xl text-white sm:text-3xl">{{ t.course.includedTitle }}</h2>
              <ul class="relative mx-auto mt-8 max-w-md space-y-4">
                <li v-for="item in t.course.included" :key="item" class="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  <span class="text-slate-200">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="courseImages.length" class="mt-12">
            <p class="mb-5 text-center text-sm text-mist">{{ t.course.previews }}</p>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                v-for="img in courseImages"
                :key="img.src"
                type="button"
                class="group overflow-hidden rounded-2xl border border-white/[0.07] bg-panel"
                @click="selectedImage = img"
              >
                <img :src="img.src" :alt="img.alt" loading="lazy" class="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 06 Plans & pricing -->
      <section id="plans" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-5xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <h2 class="section-title">{{ t.coursePage.plansTitle }}</h2>
            <p class="mt-4 text-mist">{{ t.coursePage.plansSub }}</p>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="key in PLAN_KEYS"
              :key="key"
              class="relative flex flex-col overflow-hidden rounded-3xl border p-6 sm:p-8"
              :class="key === 'private' ? 'border-gold/40 bg-gold/[0.05]' : 'border-white/[0.08] bg-panel'"
            >
              <h3 class="font-display text-3xl tracking-wide text-white">{{ t.enroll.plans[key].name }}</h3>
              <p class="mt-2 text-mist">{{ t.enroll.plans[key].desc }}</p>
              <p class="mt-6 font-display text-4xl tracking-wide text-gold">{{ priceLabel(key) }}</p>
              <ul class="mt-6 space-y-2.5 text-sm text-slate-300">
                <li v-for="item in t.coursePage.planFeatures[key]" :key="item" class="flex gap-3">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{{ item }}
                </li>
              </ul>
              <div class="mt-auto pt-8">
                <a
                  :href="planHref(key)"
                  :target="isExternal(planHref(key)) ? '_blank' : undefined"
                  rel="noopener noreferrer"
                  :class="key === 'private' ? 'btn-gold' : 'btn-ghost'"
                  class="w-full"
                >{{ t.coursePage.choose }}</a>
              </div>
            </article>
          </div>
          <p class="mt-6 text-center text-xs text-mist/70">{{ t.course.ctaNote }}</p>

          <!-- 1:1 Coaching add-on (arranged by message, not through the form) -->
          <article class="mt-8 grid gap-6 rounded-3xl border border-white/[0.08] bg-panel p-6 sm:p-8 md:grid-cols-[1fr_1.2fr]">
            <div class="flex flex-col">
              <p class="eyebrow">{{ t.coursePage.coach.tag }}</p>
              <h3 class="mt-2 font-display text-3xl tracking-wide text-white">{{ t.coursePage.coach.title }}</h3>
              <p class="mt-2 text-mist">{{ t.coursePage.coach.desc }}</p>
              <p class="mt-5 font-display text-3xl tracking-wide text-gold">{{ t.coursePage.coach.price }}</p>
              <div class="mt-auto pt-6">
                <a href="#contact" class="btn-ghost w-full sm:w-auto">{{ t.coursePage.coach.cta }}</a>
              </div>
            </div>
            <div>
              <ul class="space-y-2.5 text-sm text-slate-300">
                <li v-for="item in t.coursePage.coach.items" :key="item" class="flex gap-3">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{{ item }}
                </li>
              </ul>
              <p class="mt-5 text-sm text-gold-soft">{{ t.coursePage.coach.note }}</p>
            </div>
          </article>

          <div v-if="privateCourseImages.length" class="mt-12">
            <p class="mb-5 text-center text-sm text-mist">{{ t.private.title }}</p>
            <div class="flex flex-wrap justify-center gap-5">
              <button
                v-for="img in privateCourseImages"
                :key="img.src"
                type="button"
                class="group w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-panel sm:max-w-sm"
                @click="selectedImage = img"
              >
                <img :src="img.src" :alt="img.alt" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 07 Instructor -->
      <section class="px-4 py-14 sm:px-6 sm:py-20">
        <div class="card mx-auto flex max-w-4xl flex-col items-center gap-8 p-6 sm:flex-row sm:p-10">
          <div class="relative shrink-0">
            <div aria-hidden="true" class="aura absolute -inset-8 rounded-full blur-2xl" />
            <img src="/images/icon-na.png" alt="NA TRADES" width="384" height="384" loading="lazy" class="icon-mask relative h-28 w-28" />
          </div>
          <div class="text-center sm:text-left">
            <p class="eyebrow">{{ t.coursePage.instructorTitle }}</p>
            <p class="mt-3 text-lg text-gold-soft">{{ t.about.paragraphs[0] }}</p>
            <p class="mt-3 text-slate-300">{{ t.about.paragraphs[3] }}</p>
            <NuxtLink to="/about" class="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft">
              {{ t.coursePage.instructorMore }} <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 08 Reviews: add once students' approved reviews are ready -->

      <!-- 09 FAQ -->
      <section id="faq" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-3xl">
          <h2 class="section-title mb-10 text-center">{{ t.faq.title }}</h2>
          <div class="space-y-3">
            <details v-for="f in t.faq.items" :key="f.q" class="group card px-6 py-5 open:border-gold/25">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-white [&::-webkit-details-marker]:hidden">
                <span class="font-normal">{{ f.q }}</span>
                <span class="text-xl text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p class="mt-3 leading-relaxed text-mist">{{ f.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- 10 Closing CTA -->
      <CourseCta hide-explore />
    </main>

    <SiteFooter />
    <ImageModal v-model="selectedImage" />
  </div>
</template>
