<script setup lang="ts">
const { lang } = useLang()
useHead({ htmlAttrs: { lang } })
</script>

<template>
  <SpaceBackdrop />
  <NuxtPage />
</template>
