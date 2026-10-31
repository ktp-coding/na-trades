<script setup lang="ts">
// Full-screen image preview. Close with the ✕ button, a click outside the image, or Escape.
const image = defineModel<{ src: string; alt: string } | null>({ default: null })
const { t } = useLang()

const close = () => {
  image.value = null
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && image.value) close()
}
watch(image, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition enter-active-class="transition duration-300" leave-active-class="transition duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="image"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      :aria-label="image.alt"
      @click="close"
    >
      <button
        type="button"
        class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
        :aria-label="t.modal.close"
        @click.stop="close"
      >
        ✕
      </button>
      <img :src="image.src" :alt="image.alt" class="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl" @click.stop />
    </div>
  </Transition>
</template>
