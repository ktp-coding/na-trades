<script setup lang="ts">
const { joinHref, joinTarget } = useSiteLinks()
const { t } = useLang()
const route = useRoute()

// One menu for every page. Zone A (about, blog, free) first, the course last.
const nav = computed(() => [
  { href: '/about', label: t.value.nav.about },
  { href: '/blog', label: t.value.nav.blog },
  { href: '/free', label: t.value.nav.free },
  { href: '/course', label: t.value.nav.course },
  { href: '#contact', label: t.value.nav.contact },
])
const isActive = (href: string) => href.startsWith('/') && (route.path === href || route.path.startsWith(`${href}/`))
const isMenuOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isMenuOpen.value = false
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="scrolled || isMenuOpen ? 'border-b border-white/5 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'"
  >
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6" aria-label="Main">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/images/icon-na.png" alt="" width="40" height="40" class="icon-mask h-10 w-10" />
        <span class="text-sm tracking-[0.3em] text-gold-soft">N|A TRADES</span>
      </NuxtLink>
      <div class="hidden items-center gap-6 lg:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.href"
          :to="item.href"
          class="text-sm transition hover:text-gold-soft"
          :class="isActive(item.href) ? 'text-gold-soft' : 'text-mist'"
          :aria-current="isActive(item.href) ? 'page' : undefined"
        >{{ item.label }}</NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <LangSwitch />
        <a :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="btn-gold hidden !px-5 !py-2 !text-sm sm:inline-flex">{{ t.nav.join }}</a>
        <button
          type="button"
          class="-mr-2 rounded-full p-2 text-slate-200 lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="t.nav.menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
    <div v-if="isMenuOpen" id="mobile-menu" class="border-t border-white/5 lg:hidden">
      <div class="mx-auto flex max-w-6xl flex-col px-4 py-3">
        <NuxtLink v-for="item in nav" :key="item.href" :to="item.href" class="py-3 text-mist hover:text-gold-soft" @click="isMenuOpen = false">{{ item.label }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
