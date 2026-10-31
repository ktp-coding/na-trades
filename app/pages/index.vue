<script setup lang="ts">
const { joinHref, joinTarget, privateCourseLink, showBuyCourse, showBuyPrivateCourse, blobBaseUrl } = useSiteLinks()
const { t } = useLang()

const nav = computed(() => [
  { href: '#about', label: t.value.nav.about },
  { href: '#systems', label: t.value.nav.systems },
  { href: '#course', label: t.value.nav.course },
  { href: '#free-learning', label: t.value.nav.free },
  ...(showBuyPrivateCourse ? [{ href: '#private-course', label: t.value.nav.private }] : []),
  { href: '/blog', label: t.value.nav.blog },
  { href: '#contact', label: t.value.nav.contact },
])

const systemIcons: Record<string, string> = {
  amd: '/images/icon-amd.svg',
  ict: '/images/icon-ict.png',
  qt: '/images/icon-qt.png',
}

const moduleStyles = [
  { no: '01', title: 'ICT Core Concepts', icon: '/images/icon-ict.png', accent: 'from-ict/60 via-ict/15 hover:border-ict-glow/50', glow: 'bg-ict-glow' },
  { no: '02', title: 'Quarterly Theory Fundamentals', icon: '/images/icon-qt.png', accent: 'from-qt/60 via-qt/15 hover:border-qt-glow/50', glow: 'bg-qt-glow' },
  { no: '03', title: 'Fractal Model', icon: '/images/icon-fractal.png', accent: 'from-fractal/70 via-fractal/15 hover:border-fractal-glow/50', glow: 'bg-fractal-glow' },
]

const freeVideos = ['FAZefHynWd8', 'MAKnmNTDu1k', 'ia-ZhkI2eig']

// --- Course images (Vercel Blob) --------------------------------------------
const courseImages = computed(() => {
  if (!blobBaseUrl) return []
  const list = [
    { src: `${blobBaseUrl}/images/1.%20ICT%20Core%20Concepts.png`, alt: 'ICT Core Concepts' },
    { src: `${blobBaseUrl}/images/2.%20Quarterly%20Theory%20Fundamentals.png`, alt: 'Quarterly Theory Fundamentals' },
    { src: `${blobBaseUrl}/images/3.%20Fractal%20Model.png`, alt: 'Fractal Model' },
  ]
  if (showBuyCourse) {
    list.push(
      { src: `${blobBaseUrl}/images/2026P1-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P1' },
      { src: `${blobBaseUrl}/images/2026P3-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P3' },
    )
  }
  return list
})

const privateCourseImages = computed(() =>
  blobBaseUrl
    ? [
        { src: `${blobBaseUrl}/images/Mentorship.png`, alt: 'Mentorship' },
        { src: `${blobBaseUrl}/images/4.%20Large%20Range%20Model.png`, alt: 'Large Range Model' },
      ]
    : [],
)

// --- Image modal -------------------------------------------------------------
const selectedImage = ref<{ src: string; alt: string } | null>(null)
const openImage = (img: { src: string; alt: string }) => {
  selectedImage.value = img
  document.body.style.overflow = 'hidden'
}
const closeImage = () => {
  selectedImage.value = null
  document.body.style.overflow = ''
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedImage.value) closeImage()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <!-- Ambient background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.35),transparent_60%)]" />
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_900px)]" />

    <SiteHeader :nav="nav" />

    <main id="top">
      <!-- Hero -->
      <section class="relative px-4 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-20">
        <div class="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div class="relative mb-8 sm:mb-10">
            <div aria-hidden="true" class="aura absolute -inset-16 rounded-full blur-2xl sm:-inset-24" />
            <div aria-hidden="true" class="absolute -inset-6 rounded-full border border-gold/15 sm:-inset-10" />
            <div aria-hidden="true" class="absolute -inset-12 rounded-full border border-gold/[0.07] sm:-inset-20" />
            <img src="/images/icon-na.png" alt="N|A TRADES" width="384" height="384" class="icon-mask relative h-40 w-40 sm:h-56 sm:w-56" fetchpriority="high" />
          </div>

          <h1 class="text-gold-gradient font-display text-6xl leading-none tracking-wide sm:text-8xl">{{ t.hero.title }}</h1>
          <p class="eyebrow mt-4">{{ t.hero.eyebrow }}</p>

          <div class="mt-10 w-full max-w-2xl rounded-2xl border border-gold/20 bg-gold/[0.04] px-5 py-6 sm:px-8">
            <p class="font-display text-2xl tracking-wide text-gold-soft sm:text-3xl">{{ t.hero.course }}</p>
            <p class="mt-2 text-mist">{{ t.hero.sub }}</p>
            <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto">
                {{ t.hero.cta }}
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </a>
              <a href="#systems" class="btn-ghost w-full sm:w-auto">{{ t.hero.secondary }}</a>
            </div>
          </div>

          <ul class="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 text-sm text-mist sm:grid-cols-4">
            <li v-for="s in t.hero.stats" :key="s.l" class="card px-4 py-3">
              <span class="block font-display text-2xl text-gold-soft">{{ s.v }}</span>{{ s.l }}
            </li>
          </ul>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="section-title mb-8 text-center">{{ t.about.title }}</h2>
          <div class="card space-y-5 p-6 text-base leading-relaxed text-slate-300 sm:p-10 sm:text-lg">
            <p v-for="(para, i) in t.about.paragraphs" :key="i" :class="i === 0 ? 'text-xl text-gold-soft sm:text-2xl' : ''">{{ para }}</p>
          </div>
        </div>
      </section>

      <!-- Trading Systems -->
      <section id="systems" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="section-title mb-10 text-center">{{ t.systems.title }}</h2>
          <div class="grid gap-5 lg:grid-cols-3">
            <article v-for="c in t.systems.cards" :key="c.key" class="card flex flex-col p-6 sm:p-8">
              <img :src="systemIcons[c.key]" :alt="c.title" width="384" height="384" loading="lazy" class="icon-mask mx-auto h-24 w-24" />
              <h3 class="mt-5 text-center font-display text-3xl tracking-wide text-white">{{ c.title }}</h3>
              <p class="mt-1 text-center text-sm text-gold">{{ c.tagline }}</p>
              <div class="mt-5 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                <p v-for="(p, i) in c.intro" :key="i">{{ p }}</p>
                <p v-if="c.highlight" class="text-gold-soft">{{ c.highlight }}</p>
                <p class="pt-1">{{ c.focusLabel }}</p>
              </div>
              <ul class="mt-3 space-y-2 text-sm text-mist">
                <li v-for="f in c.focus" :key="f" class="flex gap-3"><span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{{ f }}</li>
              </ul>
              <p v-if="c.closing" class="mt-4 text-sm text-slate-300">{{ c.closing }}</p>
              <p v-if="c.note" class="mt-4 text-sm text-mist italic">{{ c.note }}</p>
              <ul class="mt-auto space-y-1.5 border-t border-white/5 pt-5 text-xs text-mist/80 sm:text-sm">
                <li v-for="p in c.points" :key="p">• {{ p }}</li>
              </ul>
            </article>
          </div>

          <!-- Framework summary -->
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

      <!-- Course -->
      <section id="course" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <p class="eyebrow mb-4">{{ t.course.eyebrow }}</p>
            <h2 class="text-gold-gradient font-display text-4xl leading-none tracking-wide sm:text-6xl">{{ t.course.title }}</h2>
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

          <!-- Course images -->
          <div v-if="courseImages.length" class="mt-12">
            <p class="mb-5 text-center text-sm text-mist">{{ t.course.previews }}</p>
            <div class="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
              <button
                v-for="img in courseImages"
                :key="img.src"
                type="button"
                class="group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.07] bg-panel sm:w-80"
                @click="openImage(img)"
              >
                <img :src="img.src" :alt="img.alt" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              </button>
            </div>
          </div>

          <!-- Offer -->
          <div class="mx-auto mt-12 max-w-3xl rounded-[2rem] bg-gradient-to-b from-gold/50 via-gold/10 to-gold/30 p-px">
            <div class="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 sm:px-12 sm:py-12">
              <div aria-hidden="true" class="aura absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-2xl" />
              <h3 class="relative text-center text-2xl text-white sm:text-3xl">{{ t.course.includedTitle }}</h3>
              <ul class="relative mx-auto mt-8 max-w-md space-y-4">
                <li v-for="item in t.course.included" :key="item" class="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  <span class="text-slate-200">{{ item }}</span>
                </li>
              </ul>
              <div class="relative mt-10 flex flex-col items-center">
                <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto sm:min-w-72">{{ t.course.cta }}</a>
                <p class="mt-4 text-center text-xs text-mist/70">{{ t.course.ctaNote }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Free Learning -->
      <section id="free-learning" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <h2 class="section-title">{{ t.free.title }}</h2>
            <p class="mt-4 text-mist">{{ t.free.sub }}</p>
          </div>
          <div class="grid gap-5 md:grid-cols-3">
            <div v-for="(id, i) in freeVideos" :key="id" class="card p-2">
              <YoutubeLite :id="id" :title="`${t.free.video} ${i + 1}`" :play-label="t.free.play" />
            </div>
          </div>
        </div>
      </section>

      <!-- Private Course -->
      <section v-if="showBuyPrivateCourse" id="private-course" class="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="section-title mb-10 text-center">{{ t.private.title }}</h2>
          <div class="flex flex-wrap justify-center gap-5">
            <button
              v-for="img in privateCourseImages"
              :key="img.src"
              type="button"
              class="group w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-panel sm:max-w-sm"
              @click="openImage(img)"
            >
              <img :src="img.src" :alt="img.alt" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            </button>
          </div>
          <div v-if="privateCourseLink" class="mt-8 flex justify-center">
            <a :href="privateCourseLink" target="_blank" rel="noopener noreferrer" class="btn-ghost">{{ t.private.cta }}</a>
          </div>
        </div>
      </section>

      <!-- FAQ -->
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

      <CourseCta />
    </main>

    <SiteFooter />

    <!-- Image modal -->
    <Transition enter-active-class="transition duration-300" leave-active-class="transition duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
        role="dialog"
        aria-modal="true"
        :aria-label="selectedImage.alt"
        @click="closeImage"
      >
        <button
          type="button"
          class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          :aria-label="t.modal.close"
          @click.stop="closeImage"
        >
          ✕
        </button>
        <img :src="selectedImage.src" :alt="selectedImage.alt" class="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl" @click.stop />
      </div>
    </Transition>
  </div>
</template>
