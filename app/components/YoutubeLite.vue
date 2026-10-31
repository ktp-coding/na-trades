<script setup lang="ts">
// Shows the thumbnail first and only loads the YouTube player after a click.
// Faster page load, and no YouTube cookies until the visitor asks for the video.
const props = defineProps<{ id: string; title: string }>()
const playing = ref(false)
const safeId = computed(() => (/^[\w-]{6,20}$/.test(props.id) ? props.id : ''))
</script>

<template>
  <div v-if="safeId" class="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
    <iframe
      v-if="playing"
      :src="`https://www.youtube-nocookie.com/embed/${safeId}?autoplay=1&rel=0`"
      :title="title"
      class="absolute inset-0 h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
    <button
      v-else
      type="button"
      class="group absolute inset-0 h-full w-full"
      :aria-label="`เล่นวิดีโอ: ${title}`"
      @click="playing = true"
    >
      <img
        :src="`https://i.ytimg.com/vi/${safeId}/hqdefault.jpg`"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
      />
      <span
        class="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 ring-1 ring-gold/60 backdrop-blur transition group-hover:scale-110 group-hover:bg-gold/90"
      >
        <svg viewBox="0 0 24 24" class="ml-1 h-6 w-6 fill-gold-soft group-hover:fill-ink"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  </div>
</template>
