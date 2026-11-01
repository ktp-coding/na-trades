<script setup lang="ts">
const { socials, lineLink, messengerLink, joinHref, joinTarget } = useSiteLinks()
const year = new Date().getFullYear()
const { t } = useLang()

const columns = computed(() => [
  {
    title: t.value.footer.explore,
    links: [
      { to: '/', label: t.value.nav.home },
      { to: '/about', label: t.value.nav.about },
      { to: '/blog', label: t.value.nav.blog },
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
  <footer id="contact" class="scroll-mt-24 px-4 pt-20 pb-8 sm:px-6">
    <div class="mx-auto flex w-full max-w-6xl flex-col">

      <!-- Columns -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div class="col-span-2 flex flex-col gap-5 lg:col-span-1">
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

        <div class="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <span class="text-sm font-medium text-white">{{ t.nav.contact }}</span>
          <a v-if="messengerLink" :href="messengerLink" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm text-mist transition hover:text-gold-soft">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-gold-soft transition group-hover:bg-gold/15"><SocialIcon name="facebook" class="h-4 w-4" /></span>
            {{ t.footer.messenger }}
          </a>
          <a v-if="lineLink" :href="lineLink" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm text-mist transition hover:text-gold-soft">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-gold-soft transition group-hover:bg-gold/15"><SocialIcon name="line" class="h-4 w-4" /></span>
            {{ t.footer.line }}
          </a>
          <a href="mailto:natrades.contact@gmail.com" class="group flex items-center gap-3 text-sm text-mist transition hover:text-gold-soft">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-gold-soft transition group-hover:bg-gold/15"><FaIcon name="envelope" class="!h-3.5 !align-middle" /></span>
            natrades.contact@gmail.com
          </a>
        </div>
      </div>

      <!-- Legal -->
      <div class="mt-12 flex flex-col items-center gap-3 text-center">
        <p class="max-w-2xl text-xs leading-relaxed text-mist/60">{{ t.footer.disclaimer }}</p>
        <NuxtLink to="/disclaimer" class="text-xs text-mist/70 underline decoration-white/20 underline-offset-4 transition hover:text-gold-soft">{{ t.disclaimerPage.link }}</NuxtLink>
        <p class="text-xs text-mist/50">© {{ year }} NA TRADES. {{ t.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>
