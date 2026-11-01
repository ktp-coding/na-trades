<script setup lang="ts">
const { lang } = useLang()
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
// Absolute page URL for link previews and search engines (query strings dropped).
const pageUrl = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path}`)
useHead({
  htmlAttrs: { lang },
  link: [{ rel: 'canonical', href: pageUrl }],
  meta: [{ property: 'og:url', content: pageUrl }],
})
</script>

<template>
  <SpaceBackdrop />
  <NuxtPage />
</template>
