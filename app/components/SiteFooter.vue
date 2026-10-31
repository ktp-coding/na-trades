<script setup lang="ts">
const { socials } = useSiteLinks()
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="border-t border-white/5 px-4 py-12 sm:px-6">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/images/icon-na.png" alt="" width="32" height="32" loading="lazy" class="icon-mask h-8 w-8" />
        <span class="text-sm tracking-[0.3em] text-gold-soft">N|A TRADES</span>
      </NuxtLink>
      <div v-if="socials.length" class="flex flex-wrap justify-center gap-3">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 text-gold-soft transition hover:border-gold/60 hover:bg-gold/10"
        >
          <SocialIcon :name="s.name" class="h-5 w-5" />
        </a>
      </div>
      <a href="mailto:natrades.contact@gmail.com" class="flex items-center gap-2 text-sm text-mist hover:text-gold-soft">
        <SocialIcon name="mail" class="h-4 w-4" />
        natrades.contact@gmail.com
      </a>
      <p class="max-w-2xl text-xs leading-relaxed text-mist/60">
        การเทรดมีความเสี่ยงสูง เนื้อหาทั้งหมดเพื่อการศึกษา ไม่ใช่คำแนะนำการลงทุน ผลลัพธ์ในอดีตไม่ได้รับประกันผลในอนาคต
      </p>
      <p class="text-xs text-mist/50">© {{ year }} N|A TRADES. All rights reserved.</p>
    </div>
  </footer>
</template>
