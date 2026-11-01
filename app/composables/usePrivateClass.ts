// Live Private Group dates, from env so they can change per round without a code change.
// NUXT_PUBLIC_PRIVATE_START_DATE   first live class, YYYY-MM-DD (e.g. 2026-11-28)
// NUXT_PUBLIC_PRIVATE_OPEN_DATE    first day to enroll, YYYY-MM-DD (optional; with CLOSE shows a range)
// NUXT_PUBLIC_PRIVATE_CLOSE_DATE   last day to enroll, YYYY-MM-DD (optional)
// NUXT_PUBLIC_PRIVATE_SCHEDULE     free text, e.g. "ทุกวันเสาร์ 20:00–22:00" (optional)
// Anything empty or not a valid date is simply not shown.

const TH_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
const EN_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-11-28" → "เสาร์ 28 พ.ย. 2026" / "Sat 28 Nov 2026". Fixed format, so server and browser agree. */
export function formatClassDate(value: string, lang: 'th' | 'en'): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').trim())
  if (!m) return ''
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const date = new Date(Date.UTC(y, mo - 1, d))
  if (date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return ''
  const day = date.getUTCDay()
  return lang === 'th'
    ? `${TH_DAYS[day]} ${d} ${TH_MONTHS[mo - 1]} ${y}`
    : `${EN_DAYS[day]} ${d} ${EN_MONTHS[mo - 1]} ${y}`
}

/** Parsed YYYY-MM-DD, or null. */
function parts(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').trim())
  if (!m) return null
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const date = new Date(Date.UTC(y, mo - 1, d))
  if (date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null
  return { y, mo, d }
}

/** "2026-11-02" + "2026-11-26" → "2 – 26 พ.ย. 2026"; across months/years the parts are kept. */
export function formatDateRange(from: string, to: string, lang: 'th' | 'en'): string {
  const a = parts(from)
  const b = parts(to)
  if (!a || !b) return ''
  const months = lang === 'th' ? TH_MONTHS : EN_MONTHS
  const end = `${b.d} ${months[b.mo - 1]} ${b.y}`
  if (a.y !== b.y) return `${a.d} ${months[a.mo - 1]} ${a.y} – ${end}`
  if (a.mo !== b.mo) return `${a.d} ${months[a.mo - 1]} – ${end}`
  return `${a.d} – ${end}`
}

export function usePrivateClass() {
  const config = useRuntimeConfig().public
  const { lang } = useLang()
  const startDate = computed(() => formatClassDate(String(config.privateStartDate || ''), lang.value))
  const closeDate = computed(() => formatClassDate(String(config.privateCloseDate || ''), lang.value))
  const enrollRange = computed(() =>
    formatDateRange(String(config.privateOpenDate || ''), String(config.privateCloseDate || ''), lang.value),
  )
  const schedule = computed(() => String(config.privateSchedule || '').trim().slice(0, 120))
  const hasInfo = computed(() => Boolean(startDate.value || closeDate.value || schedule.value))
  return { startDate, closeDate, enrollRange, schedule, hasInfo }
}
