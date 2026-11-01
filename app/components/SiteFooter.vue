<script setup lang="ts">
const { socials } = useSiteLinks()
const year = new Date().getFullYear()
const { t } = useLang()
</script>

<template>
  <!-- Tall enough that "Contact" links can bring its heading up under the header. -->
  <footer id="contact" class="flex min-h-[calc(100svh-5rem)] scroll-mt-24 flex-col px-4 pt-16 pb-10 sm:min-h-[calc(100svh-6rem)] sm:px-6">
    <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-6 text-center">
      <h2 class="section-title">{{ t.footer.contact }}</h2>
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/images/icon-na.png" alt="" width="32" height="32" loading="lazy" class="icon-mask logo-mono h-8 w-8" />
        <span class="text-sm tracking-[0.3em] text-gold-soft">NA TRADES</span>
      </NuxtLink>
      <div v-if="socials.length" class="flex flex-wrap justify-center gap-4 sm:gap-6">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          class="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.04] text-gold-soft transition hover:scale-110 hover:border-gold/60 hover:bg-gold/10"
        >
          <SocialIcon :name="s.name" class="h-6 w-6" />
        </a>
      </div>
      <a href="mailto:natrades.contact@gmail.com" class="flex items-center gap-2 text-sm text-mist hover:text-gold-soft">
        <SocialIcon name="mail" class="h-4 w-4" />
        natrades.contact@gmail.com
      </a>
      <div class="mt-auto flex flex-col items-center gap-6 pt-10">
      <p class="max-w-2xl text-xs leading-relaxed text-mist/60">
        {{ t.footer.disclaimer }}
      </p>
      <p class="text-xs text-mist/50">© {{ year }} NA TRADES. {{ t.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>
