<script setup lang="ts">
import { PLAN_KEYS, SLIP_MAX_BYTES, SLIP_TYPES, fieldsForPlan, invalidFields, type PlanKey } from '#shared/enroll'

const config = useRuntimeConfig().public
const { lineLink, enrollEnabled } = useSiteLinks()
const { lang, t } = useLang()
const route = useRoute()

useHead({ title: () => `${t.value.enroll.title} · NA TRADES`, meta: [{ name: 'robots', content: 'noindex' }] })

// --- State ---------------------------------------------------------------
const step = ref<1 | 2 | 3 | 4>(1)
const plan = ref<PlanKey>(PLAN_KEYS.includes(route.query.plan as PlanKey) ? (route.query.plan as PlanKey) : 'online')
const coaching = ref(false)
const values = reactive<Record<string, string>>({})
for (const f of fieldsForPlan('private').concat(fieldsForPlan('online'))) values[f.key] = ''
const consent = ref(false)
const marketing = ref(false)
const honeypot = ref('')
const errors = reactive<Record<string, string>>({})
const slip = ref<File | null>(null)
const slipPreview = ref('')
const sending = ref(false)
const submitError = ref('')
const orderId = ref('')
const copied = ref(false)
const dragging = ref(false)

const fields = computed(() => fieldsForPlan(plan.value))
const { priceLabel, coachingLabel, totalLabel } = usePlanPrice()
const total = computed(() => totalLabel(plan.value, coaching.value))
const bank = {
  name: String(config.bankName || ''),
  no: String(config.bankAccountNo || ''),
  owner: String(config.bankAccountName || ''),
}

const scrollTop = () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Step 1 ----------------------------------------------------------------
const goTransfer = () => {
  for (const k of Object.keys(errors)) delete errors[k]
  for (const key of invalidFields(plan.value, values)) {
    errors[key] = (values[key] ?? '').trim() ? t.value.enroll.errors.invalid : t.value.enroll.errors.required
  }
  if (!consent.value) errors.consent = t.value.enroll.errors.consent
  const first = Object.keys(errors)[0]
  if (first) {
    if (import.meta.client) document.getElementById(`f-${first}`)?.focus()
    return
  }
  step.value = 2
  scrollTop()
}

// --- Step 2 ----------------------------------------------------------------
const copyAccount = async () => {
  try {
    await navigator.clipboard.writeText(bank.no.replace(/[^\d]/g, ''))
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard not available */
  }
}

// --- Step 3 ----------------------------------------------------------------
const setSlip = (file: File | undefined | null) => {
  errors.slip = ''
  if (!file) return
  if (!SLIP_TYPES.includes(file.type)) {
    errors.slip = t.value.enroll.errors.slipType
    return
  }
  if (file.size > SLIP_MAX_BYTES) {
    errors.slip = t.value.enroll.errors.slipSize
    return
  }
  if (slipPreview.value) URL.revokeObjectURL(slipPreview.value)
  slip.value = file
  slipPreview.value = file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
}
const onPick = (e: Event) => setSlip((e.target as HTMLInputElement).files?.[0])
const onDrop = (e: DragEvent) => {
  dragging.value = false
  setSlip(e.dataTransfer?.files?.[0])
}

const submit = async () => {
  submitError.value = ''
  if (!slip.value) {
    errors.slip = t.value.enroll.errors.slip
    return
  }
  const fd = new FormData()
  fd.append('plan', plan.value)
  fd.append('coaching', coaching.value ? 'yes' : 'no')
  for (const f of fields.value) fd.append(f.key, (values[f.key] ?? '').trim())
  fd.append('consent', consent.value ? 'yes' : 'no')
  fd.append('marketing', marketing.value ? 'yes' : 'no')
  fd.append('lang', lang.value)
  fd.append('website', honeypot.value)
  fd.append('slip', slip.value)

  sending.value = true
  try {
    const res = await $fetch<{ ok: boolean; orderId: string }>('/api/enroll', { method: 'POST', body: fd })
    orderId.value = res.orderId
    step.value = 4
    scrollTop()
  } catch (err: unknown) {
    const code = (err as { statusCode?: number })?.statusCode
    submitError.value =
      code === 429 ? t.value.enroll.errors.busy : code === 503 ? t.value.enroll.errors.closed : code === 415 ? t.value.enroll.errors.slipType : t.value.enroll.errors.generic
  } finally {
    sending.value = false
  }
}

onBeforeUnmount(() => {
  if (slipPreview.value) URL.revokeObjectURL(slipPreview.value)
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_60%)]" />
    <SiteHeader />

    <main class="relative px-4 pt-28 pb-20 sm:px-6 sm:pt-32">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8 text-center">
          <h1 class="section-title">{{ t.enroll.title }}</h1>
          <p class="mt-2 font-display text-xl tracking-wide text-gold">{{ t.enroll.sub }}</p>
        </div>

        <!-- Stepper -->
        <ol v-if="step < 4" class="mx-auto mb-8 flex max-w-xl items-center justify-between gap-2 text-xs sm:text-sm">
          <li v-for="(label, i) in t.enroll.steps" :key="label" class="flex flex-1 items-center gap-2">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
              :class="step > i + 1 ? 'border-gold bg-gold text-ink' : step === i + 1 ? 'border-gold text-gold-soft' : 'border-white/15 text-mist'"
            >{{ i + 1 }}</span>
            <span :class="step === i + 1 ? 'text-white' : 'text-mist'">{{ label }}</span>
            <span v-if="i < 2" class="hidden h-px flex-1 bg-white/10 sm:block" />
          </li>
        </ol>

        <div class="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start" :class="step === 4 ? 'lg:grid-cols-1' : ''">
          <div class="card p-5 sm:p-8">
            <!-- STEP 1: details -->
            <form v-if="step === 1" novalidate @submit.prevent="goTransfer">
              <h2 class="text-lg text-white">{{ t.enroll.choosePlan }}</h2>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <label
                  v-for="key in PLAN_KEYS"
                  :key="key"
                  class="cursor-pointer rounded-2xl border p-4 transition"
                  :class="plan === key ? 'border-gold bg-gold/[0.06]' : 'border-white/10 hover:border-white/25'"
                >
                  <input v-model="plan" type="radio" name="plan" :value="key" class="sr-only" />
                  <span class="flex items-start justify-between gap-3">
                    <span class="text-white">{{ t.enroll.plans[key].name }}</span>
                    <span class="shrink-0 font-display text-xl tracking-wide text-gold-soft">{{ priceLabel(key) }}</span>
                  </span>
                  <span class="mt-1 block text-sm text-mist">{{ t.enroll.plans[key].desc }}</span>
                </label>
              </div>

              <!-- Add-on, shown once a plan is picked -->
              <h2 class="mt-8 text-lg text-white">{{ t.enroll.addonTitle }}</h2>
              <label
                class="mt-4 block cursor-pointer rounded-2xl border p-4 transition"
                :class="coaching ? 'border-gold bg-gold/[0.06]' : 'border-white/10 hover:border-white/25'"
              >
                <span class="flex items-start gap-3">
                  <input v-model="coaching" type="checkbox" class="mt-1 h-4 w-4 shrink-0 accent-[#c9a96a]" />
                  <span class="flex-1">
                    <span class="flex items-start justify-between gap-3">
                      <span class="text-white">{{ t.coursePage.coach.title }}</span>
                      <span class="shrink-0 font-display text-xl tracking-wide text-gold-soft">+ {{ coachingLabel() }}</span>
                    </span>
                    <span class="mt-1 block text-sm text-mist">{{ t.coursePage.coach.desc }}</span>
                    <ul class="mt-3 space-y-1.5 text-sm text-slate-300">
                      <li v-for="item in t.coursePage.coach.items" :key="item" class="flex gap-3">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{{ item }}
                      </li>
                    </ul>
                  </span>
                </span>
              </label>

              <h2 class="mt-8 text-lg text-white">{{ t.enroll.detailsTitle }}</h2>
              <p class="mt-1 text-sm text-mist">{{ t.enroll.detailsSub }}</p>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div v-for="f in fields" :key="f.key" :class="f.type === 'textarea' ? 'sm:col-span-2' : ''">
                  <label :for="`f-${f.key}`" class="mb-1.5 block text-sm text-slate-300">
                    {{ f.label[lang] }}
                    <span v-if="f.required" class="text-gold">*</span>
                    <span v-else class="text-mist/60">({{ t.enroll.optional }})</span>
                  </label>
                  <select
                    v-if="f.type === 'select'"
                    :id="`f-${f.key}`"
                    v-model="values[f.key]"
                    class="w-full rounded-xl border bg-ink-2 px-4 py-3 text-white outline-none focus:border-gold"
                    :class="errors[f.key] ? 'border-red-400/70' : 'border-white/10'"
                  >
                    <option value="" disabled>—</option>
                    <option v-for="o in f.options" :key="o.value" :value="o.value">{{ o.label[lang] }}</option>
                  </select>
                  <textarea
                    v-else-if="f.type === 'textarea'"
                    :id="`f-${f.key}`"
                    v-model="values[f.key]"
                    rows="3"
                    :maxlength="f.maxLength"
                    class="w-full rounded-xl border bg-ink-2 px-4 py-3 text-white outline-none focus:border-gold"
                    :class="errors[f.key] ? 'border-red-400/70' : 'border-white/10'"
                  />
                  <input
                    v-else
                    :id="`f-${f.key}`"
                    v-model="values[f.key]"
                    :type="f.type"
                    :maxlength="f.maxLength"
                    :placeholder="f.placeholder?.[lang]"
                    :autocomplete="f.key === 'email' ? 'email' : f.type === 'tel' ? 'tel' : f.key === 'fullName' ? 'name' : 'off'"
                    :inputmode="f.numeric ? 'numeric' : undefined"
                    class="w-full rounded-xl border bg-ink-2 px-4 py-3 text-white outline-none placeholder:text-mist/40 focus:border-gold"
                    :class="errors[f.key] ? 'border-red-400/70' : 'border-white/10'"
                  />
                  <p v-if="errors[f.key]" class="mt-1 text-xs text-red-300">{{ errors[f.key] }}</p>
                  <p v-else-if="f.hint" class="mt-1 text-xs text-mist/70">{{ f.hint[lang] }}</p>
                </div>
              </div>

              <!-- Honeypot -->
              <div class="absolute -left-[9999px]" aria-hidden="true">
                <label>Website <input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" /></label>
              </div>

              <div class="mt-6 space-y-3 text-sm">
                <label class="flex gap-3 text-slate-300">
                  <input id="f-consent" v-model="consent" type="checkbox" class="mt-1 h-4 w-4 shrink-0 accent-[#c9a96a]" />
                  <span>{{ t.enroll.consent }} <span class="text-gold">*</span></span>
                </label>
                <p v-if="errors.consent" class="text-xs text-red-300">{{ errors.consent }}</p>
                <label class="flex gap-3 text-mist">
                  <input v-model="marketing" type="checkbox" class="mt-1 h-4 w-4 shrink-0 accent-[#c9a96a]" />
                  <span>{{ t.enroll.marketing }}</span>
                </label>
              </div>

              <div class="mt-8 flex justify-end">
                <button type="submit" class="btn-gold w-full sm:w-auto">{{ t.enroll.next }}</button>
              </div>
            </form>

            <!-- STEP 2: transfer -->
            <div v-else-if="step === 2">
              <h2 class="text-lg text-white">{{ t.enroll.transferTitle }}</h2>
              <p class="mt-1 text-sm text-mist">{{ t.enroll.transferSub }}</p>
              <dl class="mt-6 divide-y divide-white/5 rounded-2xl border border-white/10 bg-ink-2">
                <div class="flex items-center justify-between gap-4 px-5 py-4">
                  <dt class="text-sm text-mist">{{ t.enroll.bank }}</dt>
                  <dd class="text-right text-white">{{ bank.name || '—' }}</dd>
                </div>
                <div class="flex items-center justify-between gap-4 px-5 py-4">
                  <dt class="text-sm text-mist">{{ t.enroll.accountNo }}</dt>
                  <dd class="flex items-center gap-3">
                    <span class="font-display text-2xl tracking-wider text-gold-soft">{{ bank.no || '—' }}</span>
                    <button v-if="bank.no" type="button" class="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-soft hover:bg-gold/10" @click="copyAccount">
                      {{ copied ? t.enroll.copied : t.enroll.copy }}
                    </button>
                  </dd>
                </div>
                <div class="flex items-center justify-between gap-4 px-5 py-4">
                  <dt class="text-sm text-mist">{{ t.enroll.accountName }}</dt>
                  <dd class="text-right text-white">{{ bank.owner || '—' }}</dd>
                </div>
                <div class="flex items-center justify-between gap-4 px-5 py-4">
                  <dt class="text-sm text-mist">{{ t.enroll.amount }}</dt>
                  <dd class="font-display text-3xl tracking-wide text-gold">{{ total }}</dd>
                </div>
              </dl>
              <div class="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <button type="button" class="btn-ghost" @click="step = 1">{{ t.enroll.back }}</button>
                <button type="button" class="btn-gold" @click="step = 3; scrollTop()">{{ t.enroll.transferred }}</button>
              </div>
            </div>

            <!-- STEP 3: slip -->
            <div v-else-if="step === 3">
              <h2 class="text-lg text-white">{{ t.enroll.slipTitle }}</h2>
              <p class="mt-1 text-sm text-mist">{{ t.enroll.slipSub }}</p>
              <label
                class="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition"
                :class="dragging ? 'border-gold bg-gold/5' : errors.slip ? 'border-red-400/60' : 'border-white/15 hover:border-gold/50'"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @drop.prevent="onDrop"
              >
                <input type="file" class="sr-only" :accept="SLIP_TYPES.join(',')" @change="onPick" />
                <img v-if="slipPreview" :src="slipPreview" alt="" class="max-h-64 rounded-lg" />
                <template v-if="slip">
                  <span class="text-sm text-white">{{ slip.name }}</span>
                  <span class="text-xs text-gold-soft underline">{{ t.enroll.change }}</span>
                </template>
                <template v-else>
                  <svg viewBox="0 0 24 24" class="h-10 w-10 text-gold" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  <span class="text-white">{{ t.enroll.pick }}</span>
                  <span class="text-xs text-mist">{{ t.enroll.drop }}</span>
                </template>
              </label>
              <p v-if="errors.slip" class="mt-2 text-sm text-red-300">{{ errors.slip }}</p>
              <p v-if="submitError" class="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{{ submitError }}</p>
              <div class="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <button type="button" class="btn-ghost" :disabled="sending" @click="step = 2">{{ t.enroll.back }}</button>
                <button type="button" class="btn-gold disabled:opacity-60" :disabled="sending" @click="submit">
                  {{ sending ? t.enroll.sending : t.enroll.submit }}
                </button>
              </div>
            </div>

            <!-- STEP 4: done -->
            <div v-else class="py-6 text-center">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/50">
                <svg viewBox="0 0 24 24" class="h-8 w-8 text-gold" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
              <h2 class="mt-6 text-2xl text-white">{{ t.enroll.doneTitle }}</h2>
              <p class="mx-auto mt-2 max-w-md text-mist">{{ t.enroll.doneSub }}</p>
              <p class="mt-6 text-sm text-mist">{{ t.enroll.orderNo }}</p>
              <p class="font-display text-3xl tracking-wider text-gold-soft">{{ orderId }}</p>
              <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <NuxtLink to="/" class="btn-ghost">{{ t.enroll.backHome }}</NuxtLink>
                <a v-if="lineLink" :href="lineLink" target="_blank" rel="noopener noreferrer" class="btn-gold">{{ t.enroll.help }}</a>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <aside v-if="step < 4" class="card p-5 sm:p-6 lg:sticky lg:top-28">
            <p class="text-sm text-mist">{{ t.enroll.summary }}</p>
            <p class="mt-3 text-white">{{ t.enroll.plans[plan].name }}</p>
            <p class="text-xs text-mist">{{ t.enroll.sub }}</p>
            <div class="mt-4 space-y-2 border-t border-white/5 pt-4 text-sm">
              <div class="flex justify-between gap-3">
                <span class="text-mist">{{ t.enroll.plans[plan].name }}</span>
                <span class="text-white">{{ priceLabel(plan) }}</span>
              </div>
              <div v-if="coaching" class="flex justify-between gap-3">
                <span class="text-mist">{{ t.coursePage.coach.title }}</span>
                <span class="text-white">+ {{ coachingLabel() }}</span>
              </div>
            </div>
            <div class="mt-3 flex items-end justify-between border-t border-white/5 pt-3">
              <span class="text-sm text-mist">{{ t.enroll.total }}</span>
              <span class="font-display text-2xl tracking-wide text-gold">{{ total }}</span>
            </div>
            <p v-if="!enrollEnabled" class="mt-4 text-xs text-mist/70">{{ t.enroll.errors.closed }}</p>
            <a v-if="lineLink" :href="lineLink" target="_blank" rel="noopener noreferrer" class="mt-4 block text-sm text-gold-soft hover:underline">{{ t.enroll.help }} →</a>
          </aside>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
