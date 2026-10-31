<script setup lang="ts">
import { articles } from '~/data/articles'

const { joinHref, joinTarget, privateCourseLink, showBuyCourse, showBuyPrivateCourse, blobBaseUrl } = useSiteLinks()

const nav = [
  { href: '#about', label: 'About' },
  { href: '#modules', label: 'เนื้อหา' },
  { href: '#offer', label: 'สิ่งที่ได้' },
  { href: '/blog', label: 'บทความ' },
  { href: '#free', label: 'เรียนฟรี' },
  { href: '#faq', label: 'FAQ' },
]

// --- Content --------------------------------------------------------------
const pains = [
  {
    q: 'เข้าถูกทาง แต่โดนกินสต็อปก่อนทุกที',
    a: 'เพราะยังไม่เห็นว่า Liquidity อยู่ตรงไหน ราคาเลยต้องไปเก็บของก่อนแล้วค่อยวิ่งจริง',
    fix: 'ICT',
  },
  {
    q: 'Setup สวย แต่เข้าผิดจังหวะเวลา',
    a: 'Setup เดียวกัน ถ้าเกิดผิด Quarter ก็ไม่วิ่ง ต้องรู้ว่าตอนนี้ตลาดอยู่ช่วงสะสม หลอก หรือพร้อมไปแล้ว',
    fix: 'QT',
  },
  {
    q: 'ไม่รู้จะถือต่อหรือปิดดี',
    a: 'ถ้านับแท่งเป็น จะรู้ว่าราคายังเหลือแรงอีกกี่แท่ง วางเป้าได้ชัด ไม่ต้องเดาใจตัวเอง',
    fix: 'Fractal',
  },
]

const modules = [
  {
    no: '01',
    key: 'ict',
    title: 'ICT Core Concepts',
    tag: 'ราคาวิ่งยังไง ทำไมวิ่ง',
    icon: '/images/icon-ict.png',
    accent: 'from-ict/60 via-ict/15',
    glow: 'bg-ict-glow',
    ring: 'group-hover:border-ict-glow/50',
    topics: ['Power of 3 (AMD)', 'Price Delivery', 'PD Arrays', 'Internal & External Liquidity', 'Institutional Order Flow', 'Top Down Analysis', 'Advanced Market Tools'],
  },
  {
    no: '02',
    key: 'qt',
    title: 'Quarterly Theory Fundamentals',
    tag: 'ราคาจะวิ่ง "เมื่อไหร่"',
    icon: '/images/icon-qt.png',
    accent: 'from-qt/60 via-qt/15',
    glow: 'bg-qt-glow',
    ring: 'group-hover:border-qt-glow/50',
    topics: ['Time is Fractal (ปี → 90 นาที)', 'หน้าที่ของ Q1–Q4', 'True Opens', 'Quarterly Theory Cheatsheet', 'Sequential SMT (SSMT)'],
  },
  {
    no: '03',
    key: 'fractal',
    title: 'Fractal Model',
    tag: 'เข้าตรงไหน เหลือแรงกี่แท่ง',
    icon: '/images/icon-fractal.png',
    accent: 'from-fractal/70 via-fractal/15',
    glow: 'bg-fractal-glow',
    ring: 'group-hover:border-fractal-glow/50',
    topics: ['อ่านแท่งเทียนให้ขาด', 'Swing Highs & Lows (Candle 1–4)', 'Swing Confirmation', 'Point of Interest (POI)', 'Flow Chart เข้า / ไม่เข้า'],
  },
]

const outcomes = [
  { t: 'รู้ว่าตอนนี้อยู่ Quarter ไหน', d: 'เปิดกราฟแล้วบอกได้ว่าช่วงนี้ราคาควรสะสม หลอก หรือวิ่ง' },
  { t: 'รู้ว่าควรรอที่โซนไหน', d: 'ใช้ PD Arrays กับ Liquidity หาโซนที่ราคามักกลับมาตอบสนอง' },
  { t: 'มีเกณฑ์เข้า / ปล่อยผ่าน', d: 'Flow Chart ชัด ๆ ไว้เบรกตัวเองตอนอยากเข้ามั่ว' },
  { t: 'ทำซ้ำได้ทุกวัน', d: 'Top Down ขั้นตอนเดิมทุกครั้ง พรุ่งนี้เปิดกราฟก็ใช้ได้เลย' },
]

const included = [
  'วิดีโอเต็ม 3 โมดูล ICT · QT · Fractal',
  'PDF สรุปใจความสำคัญ ครบ 3 เล่ม',
  'เข้ากลุ่ม Discord ของนักเรียน',
  'ติดตรงไหน ถามผมได้โดยตรง',
  'เนื้อหาต่อกันเป็นระบบ เรียนจากพื้นฐานไปถึงจุดเข้า',
]

const freeVideos = [
  { id: 'FAZefHynWd8', title: 'N|A TRADES Free Learning 1' },
  { id: 'MAKnmNTDu1k', title: 'N|A TRADES Free Learning 2' },
  { id: 'ia-ZhkI2eig', title: 'N|A TRADES Free Learning 3' },
]

const faqs = [
  {
    q: 'มือใหม่เรียนได้ไหม',
    a: 'ได้ครับ คอร์สเริ่มจากอ่านแท่งเทียนกับ Power of 3 ก่อน แล้วค่อยต่อไปเรื่องเวลาและจุดเข้า ขอแค่รู้จักกราฟแท่งเทียนเบื้องต้น',
  },
  {
    q: 'ใช้กับตลาดไหนได้บ้าง',
    a: 'หลักการเป็นเรื่องเวลากับราคา ใช้ได้กับตลาดที่สภาพคล่องสูง เช่น ดัชนี Futures, ทองคำ, Forex',
  },
  {
    q: 'มีสัญญาณให้เข้าตามไหม',
    a: 'ไม่มีครับ คอร์สนี้สอนให้อ่านเองเป็น เพื่อให้เทรดได้ด้วยตัวเองในระยะยาว',
  },
  {
    q: 'สมัครแล้วเข้าเรียนยังไง',
    a: 'สมัครและชำระเงินผ่าน Whop ได้สิทธิ์เข้าดูวิดีโอ โหลด PDF ที่หน้า Files และเข้ากลุ่ม Discord ได้ทันที',
  },
  {
    q: 'เรียนแล้วติด ถามได้ไหม',
    a: 'ถามได้เลยครับ ทักใน Discord หรือทักผมตรง ๆ ก็ได้',
  },
]

// --- Course image gallery (Vercel Blob) ------------------------------------
const courseImages = computed(() => {
  if (!blobBaseUrl) return []
  const base = [
    { src: `${blobBaseUrl}/images/1.%20ICT%20Core%20Concepts.png`, alt: 'ICT Core Concepts' },
    { src: `${blobBaseUrl}/images/2.%20Quarterly%20Theory%20Fundamentals.png`, alt: 'Quarterly Theory Fundamentals' },
    { src: `${blobBaseUrl}/images/3.%20Fractal%20Model.png`, alt: 'Fractal Model' },
  ]
  if (showBuyCourse) {
    base.push(
      { src: `${blobBaseUrl}/images/2026P1-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P1' },
      { src: `${blobBaseUrl}/images/2026P3-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P3' },
    )
  }
  return base
})

const privateCourseImages = computed(() =>
  blobBaseUrl
    ? [
        { src: `${blobBaseUrl}/images/Mentorship.png`, alt: 'Mentorship' },
        { src: `${blobBaseUrl}/images/4.%20Large%20Range%20Model.png`, alt: 'Large Range Model' },
      ]
    : [],
)

// --- Image modal -----------------------------------------------------------
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
      <section class="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <div class="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div class="relative mb-8 sm:mb-10">
            <div aria-hidden="true" class="aura absolute -inset-16 rounded-full blur-2xl sm:-inset-24" />
            <div aria-hidden="true" class="absolute -inset-6 rounded-full border border-gold/15 sm:-inset-10" />
            <div aria-hidden="true" class="absolute -inset-12 rounded-full border border-gold/[0.07] sm:-inset-20" />
            <img src="/images/icon-na.png" alt="N|A TRADES" width="384" height="384" class="icon-mask relative h-40 w-40 sm:h-56 sm:w-56" fetchpriority="high" />
          </div>

          <p class="eyebrow mb-5">A Course by N|A Trades</p>
          <h1 class="text-gold-gradient font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl md:text-8xl">
            Understand the Logic<br class="hidden sm:block" />
            of Time &amp; Price
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            เลิกเดาว่าราคาจะไปทางไหน มาอ่าน <span class="text-gold-soft">เวลา</span> กับ <span class="text-gold-soft">ราคา</span> ให้เป็นระบบ
            ด้วย ICT, Quarterly Theory และ Fractal Model ในคอร์สเดียว
          </p>

          <div class="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto">
              สมัครเรียนเลย
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </a>
            <a href="#modules" class="btn-ghost w-full sm:w-auto">ดูเนื้อหาคอร์ส</a>
          </div>

          <ul class="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 text-sm text-mist sm:grid-cols-4">
            <li class="card px-4 py-3"><span class="block font-display text-2xl text-gold-soft">3</span>โมดูลหลัก</li>
            <li class="card px-4 py-3"><span class="block font-display text-2xl text-gold-soft">3</span>เล่ม PDF สรุป</li>
            <li class="card px-4 py-3"><span class="block font-display text-2xl text-gold-soft">Whop</span>เข้าเรียนได้ทันที</li>
            <li class="card px-4 py-3"><span class="block font-display text-2xl text-gold-soft">Discord</span>คอมมูนิตี้นักเรียน</li>
          </ul>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <p class="eyebrow mb-4">About</p>
            <h2 class="section-title">Price only makes sense when time and structure align.</h2>
          </div>
          <div class="card space-y-4 p-6 leading-relaxed text-slate-300 sm:p-8">
            <p>
              Our approach combines ICT Concepts with Quarterly Theory to explain how price is delivered, why it
              moves, and when meaningful expansion is most likely to occur. Rather than reacting to indicators or
              isolated patterns, every trade is framed within market structure, liquidity, and time-based context.
            </p>
            <p>
              This framework forms the foundation of the Understand The Logic of Time &amp; Price course — a
              structured system designed to develop clarity, discipline, and consistency. The goal is not just
              better entries, but a deeper understanding of market behavior that supports long-term growth,
              especially within the demands of prop firm trading.
            </p>
            <p>
              NA TRADES is committed to mastering the process, respecting market logic, and building repeatable
              execution through time, price, and intent.
            </p>
            <div class="grid gap-3 border-t border-white/5 pt-5 text-sm sm:grid-cols-3">
              <p><span class="block text-gold-soft">Quarterly Theory</span>defines when the market is likely to move</p>
              <p><span class="block text-gold-soft">ICT Concept</span>explains why price behaves the way it does</p>
              <p><span class="block text-gold-soft">AMD Models</span>define how to execute within that window</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pains -->
      <section id="why" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-12 max-w-2xl text-center">
            <p class="eyebrow mb-4">The Problem</p>
            <h2 class="section-title">อ่านทางถูก แต่ยังไม่ได้เงิน?</h2>
            <p class="mt-4 text-mist">ส่วนใหญ่ไม่ได้พลาดเพราะทิศ แต่พลาดเพราะไม่รู้ "จังหวะ" คอร์สนี้แก้ตรงนั้น</p>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div v-for="p in pains" :key="p.q" class="card flex flex-col p-6 sm:p-8">
              <h3 class="text-lg font-normal text-white">{{ p.q }}</h3>
              <p class="mt-3 flex-1 leading-relaxed text-mist">{{ p.a }}</p>
              <p class="mt-6 text-sm text-gold">แก้ด้วย <span class="ml-1 text-xs tracking-[0.25em] uppercase">{{ p.fix }}</span></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Modules -->
      <section id="modules" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-12 max-w-2xl text-center">
            <p class="eyebrow mb-4">Course Content</p>
            <h2 class="section-title">3 โมดูล ต่อกันเป็นระบบเดียว</h2>
            <p class="mt-4 text-mist">QT บอก <span class="text-gold-soft">เมื่อไหร่</span> · ICT บอก <span class="text-gold-soft">ทำไม</span> · Fractal บอก <span class="text-gold-soft">เข้าตรงไหน</span></p>
          </div>

          <div class="grid gap-5 lg:grid-cols-3">
            <article
              v-for="m in modules"
              :key="m.key"
              class="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b to-ink-2 p-6 transition duration-500 sm:p-8"
              :class="[m.accent, m.ring]"
            >
              <div aria-hidden="true" class="absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-25 blur-3xl transition duration-500 group-hover:opacity-45" :class="m.glow" />
              <div class="relative flex items-center gap-4">
                <img :src="m.icon" :alt="m.title" width="384" height="384" loading="lazy" class="icon-mask h-20 w-20 shrink-0" />
                <div>
                  <p class="text-xs tracking-[0.3em] text-gold">MODULE {{ m.no }}</p>
                  <p class="mt-1 text-sm text-mist">{{ m.tag }}</p>
                </div>
              </div>
              <h3 class="relative mt-6 font-display text-3xl tracking-wide text-white sm:text-4xl">{{ m.title }}</h3>
              <ul class="relative mt-5 space-y-2.5">
                <li v-for="t in m.topics" :key="t" class="flex gap-3 text-sm text-slate-300">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {{ t }}
                </li>
              </ul>
            </article>
          </div>

          <!-- Course previews -->
          <div v-if="courseImages.length" class="mt-14">
            <p class="mb-5 text-center text-sm text-mist">ตัวอย่างภาพในคอร์ส · กดเพื่อดูภาพใหญ่</p>
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
        </div>
      </section>

      <!-- Outcomes -->
      <section class="px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p class="eyebrow mb-4">After the Course</p>
            <h2 class="section-title">เปิดกราฟพรุ่งนี้<br />ก็ใช้ได้เลย</h2>
            <p class="mt-4 max-w-md text-mist">ไม่ได้สอนให้จำ Pattern แต่สอนให้เข้าใจว่าราคาวิ่งเพราะอะไร และวิ่งเมื่อไหร่</p>
          </div>
          <ol class="grid gap-4 sm:grid-cols-2">
            <li v-for="(o, i) in outcomes" :key="o.t" class="card p-6">
              <span class="font-display text-4xl text-gold/70">0{{ i + 1 }}</span>
              <h3 class="mt-2 text-lg font-normal text-white">{{ o.t }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-mist">{{ o.d }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- Offer -->
      <section id="offer" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-3xl">
          <div class="relative rounded-[2rem] bg-gradient-to-b from-gold/50 via-gold/10 to-gold/30 p-px">
            <div class="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-2 px-6 py-10 sm:px-12 sm:py-14">
              <div aria-hidden="true" class="aura absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-2xl" />
              <div class="relative text-center">
                <p class="eyebrow mb-4">Full Course</p>
                <h2 class="font-display text-4xl tracking-wide text-white sm:text-5xl">Understand the Logic of Time &amp; Price</h2>
                <p class="mt-3 text-mist">ICT · Quarterly Theory · Fractal Model</p>
              </div>
              <ul class="relative mx-auto mt-10 max-w-md space-y-4">
                <li v-for="item in included" :key="item" class="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  <span class="text-slate-200">{{ item }}</span>
                </li>
              </ul>
              <div class="relative mt-10 flex flex-col items-center">
                <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto sm:min-w-72">ดูราคาและสมัครผ่าน Whop</a>
                <p class="mt-4 text-xs text-mist/70">ชำระเงินผ่าน Whop · ได้สิทธิ์เข้าเรียนทันทีหลังสมัคร</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Private course -->
      <section v-if="showBuyPrivateCourse" id="private-course" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-10 max-w-2xl text-center">
            <p class="eyebrow mb-4">Mentorship</p>
            <h2 class="section-title">Private Course &amp; Mentorship</h2>
            <p class="mt-4 text-mist">สำหรับคนที่อยากให้ดูกราฟและแผนเทรดด้วยกันแบบใกล้ชิด</p>
          </div>
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
            <a :href="privateCourseLink" target="_blank" rel="noopener noreferrer" class="btn-ghost">สมัคร Private Course</a>
          </div>
        </div>
      </section>

      <!-- Free learning -->
      <section id="free" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mx-auto mb-12 max-w-2xl text-center">
            <p class="eyebrow mb-4">Free Learning</p>
            <h2 class="section-title">ลองดูวิธีคิดก่อน ฟรี</h2>
            <p class="mt-4 text-mist">ชอบแนวนี้ค่อยสมัครคอร์สเต็ม</p>
          </div>
          <div class="grid gap-5 md:grid-cols-3">
            <div v-for="v in freeVideos" :key="v.id" class="card p-2">
              <YoutubeLite :id="v.id" :title="v.title" />
            </div>
          </div>
        </div>
      </section>

      <!-- Blog -->
      <section id="blog" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left">
            <div>
              <p class="eyebrow mb-4">Blog</p>
              <h2 class="section-title">อ่านแนวคิดก่อนเรียน</h2>
            </div>
            <NuxtLink to="/blog" class="btn-ghost !py-2.5 !text-sm">บทความทั้งหมด</NuxtLink>
          </div>
          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ArticleCard v-for="a in articles.slice(1, 5)" :key="a.slug" :article="a" />
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div class="mx-auto max-w-3xl">
          <div class="mb-10 text-center">
            <p class="eyebrow mb-4">FAQ</p>
            <h2 class="section-title">คำถามที่เจอบ่อย</h2>
          </div>
          <div class="space-y-3">
            <details v-for="f in faqs" :key="f.q" class="group card px-6 py-5 open:border-gold/25">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-white [&::-webkit-details-marker]:hidden">
                <span class="font-normal">{{ f.q }}</span>
                <span class="text-xl text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p class="mt-3 leading-relaxed text-mist">{{ f.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="px-4 py-20 sm:px-6 sm:py-28">
        <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div class="relative mb-8">
            <div aria-hidden="true" class="aura absolute -inset-12 rounded-full blur-2xl" />
            <img src="/images/icon-na.png" alt="" width="384" height="384" loading="lazy" class="icon-mask relative h-24 w-24" />
          </div>
          <h2 class="section-title">ตลาดไม่ได้สุ่ม<br />มันมีเวลาของมัน</h2>
          <p class="mt-4 text-mist">เริ่มอ่านให้ออกตั้งแต่วันนี้</p>
          <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold mt-8">สมัครเรียนเลย</a>
        </div>
      </section>
    </main>

    <SiteFooter />

    <!-- Image modal -->
    <Transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
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
          aria-label="ปิด"
          @click.stop="closeImage"
        >
          ✕
        </button>
        <img :src="selectedImage.src" :alt="selectedImage.alt" class="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl" @click.stop />
      </div>
    </Transition>
  </div>
</template>
