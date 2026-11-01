<script setup lang="ts">
// Start date, enroll deadline and class time for the Live Private Group (set by env).
const { t } = useLang()
const { startDate, closeDate, enrollRange, schedule, hasInfo } = usePrivateClass()
</script>

<template>
  <dl v-if="hasInfo" class="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
    <div v-if="startDate" class="flex items-center gap-2">
      <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" stroke-linecap="round" /></svg>
      <dt class="text-mist">{{ t.enroll.privateDates.start }}</dt>
      <dd class="text-gold-soft">{{ startDate }}</dd>
    </div>
    <div v-if="schedule" class="flex items-center gap-2">
      <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" stroke-linecap="round" /></svg>
      <dt class="text-mist">{{ t.enroll.privateDates.schedule }}</dt>
      <dd class="text-slate-200">{{ schedule }}</dd>
    </div>
    <div v-if="closeDate" class="flex items-center gap-2">
      <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v8l5 3" stroke-linecap="round" /><path d="M20 12a8 8 0 1 1-2.3-5.6" stroke-linecap="round" /></svg>
      <dt class="text-mist">{{ enrollRange ? t.enroll.privateDates.open : t.enroll.privateDates.close }}</dt>
      <dd class="text-slate-200">{{ enrollRange || closeDate }}</dd>
    </div>
  </dl>
</template>
