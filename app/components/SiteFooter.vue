<script setup lang="ts">
const { socials, lineLink, joinHref, joinTarget } = useSiteLinks()
const year = new Date().getFullYear()
const { t } = useLang()

const columns = computed(() => [
  {
    title: t.value.footer.explore,
    links: [
      { to: '/', label: t.value.nav.home },
      { to: '/about', label: t.value.nav.about },
      { to: '/blog', label: t.value.nav.blog },
      { to: '#contact', label: t.value.nav.contact },
    ],
  },
  {
    title: t.value.footer.learn,
    links: [
      { to: '/free', label: t.value.nav.free },
      { to: '/course', label: t.value.nav.course },
      { to: '/course#faq', label: t.value.nav.faq },
    ],
  },
])
</script>

<template>
  <!-- Tall enough that "Contact" links can bring its heading up under the header. -->
  <footer id="contact" class="flex min-h-[calc(100svh-5rem)] scroll-mt-24 flex-col px-4 pt-16 pb-8 sm:min-h-[calc(100svh-6rem)] sm:px-6">
    <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <!-- Contact -->
      <div class="flex flex-col items-center gap-5 text-center">
        <h2 class="section-title">{{ t.footer.contact }}</h2>
        <a href="mailto:natrades.contact@gmail.com" class="flex items-center gap-2 text-mist hover:text-gold-soft">
          <SocialIcon name="mail" class="h-4 w-4" />
          natrades.contact@gmail.com
        </a>
        <a v-if="lineLink" :href="lineLink" target="_blank" rel="noopener noreferrer" class="btn-gold">{{ t.footer.line }}</a>
      </div>

      <div class="min-h-14 flex-1" />

      <!-- Columns -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div class="col-span-2 flex flex-col gap-5 sm:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/images/icon-na.png" alt="" width="44" height="44" loading="lazy" class="icon-mask logo-star h-11 w-11" />
            <span class="text-sm tracking-[0.3em] text-gold-soft">NA TRADES</span>
          </NuxtLink>
          <p class="max-w-sm text-gold-gradient text-lg leading-snug">{{ t.footer.motto }}</p>
          <div v-if="socials.length" class="flex flex-col gap-3">
            <span class="text-sm font-medium text-white">{{ t.footer.follow }}</span>
            <div class="flex flex-wrap gap-3">
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-gold-soft transition hover:scale-110 hover:bg-gold/15"
              >
                <SocialIcon :name="s.name" class="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        <nav v-for="col in columns" :key="col.title" :aria-label="col.title" class="flex flex-col gap-4">
          <span class="text-sm font-medium text-white">{{ col.title }}</span>
          <NuxtLink v-for="l in col.links" :key="l.to" :to="l.to" class="text-sm text-mist transition hover:text-gold-soft">{{ l.label }}</NuxtLink>
          <a v-if="col === columns[1]" :href="joinHref" :target="joinTarget" rel="noopener noreferrer" class="text-sm text-gold-soft transition hover:text-gold">{{ t.nav.join }}</a>
        </nav>
      </div>

      <!-- Legal -->
      <div class="mt-12 flex flex-col items-center gap-3 text-center">
        <p class="max-w-2xl text-xs leading-relaxed text-mist/60">{{ t.footer.disclaimer }}</p>
        <p class="text-xs text-mist/50">© {{ year }} NA TRADES. {{ t.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>
