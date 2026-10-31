// Enrollment form definition, shared by the page (client) and the API (server).
// To change the questions, edit ENROLL_FIELDS only. The Sheet columns follow it.

export type PlanKey = 'private' | 'online'
export const PLAN_KEYS: PlanKey[] = ['private', 'online']

type L = { en: string; th: string }

export interface EnrollField {
  key: string
  label: L
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required: boolean
  maxLength: number
  placeholder?: L
  hint?: L
  options?: { value: string; label: L }[]
  /** Only ask for these plans. Omit to ask for every plan. */
  plans?: PlanKey[]
}

export const ENROLL_FIELDS: EnrollField[] = [
  { key: 'fullName', label: { en: 'Full name', th: 'ชื่อ-นามสกุล' }, type: 'text', required: true, maxLength: 120 },
  { key: 'nickname', label: { en: 'Nickname', th: 'ชื่อเล่น' }, type: 'text', required: false, maxLength: 60 },
  {
    key: 'email',
    label: { en: 'Google email (Gmail)', th: 'อีเมล Google (Gmail)' },
    hint: { en: 'Course access is sent to this email.', th: 'สิทธิ์เข้าเรียนจะส่งไปที่อีเมลนี้' },
    type: 'email',
    required: true,
    maxLength: 160,
  },
  { key: 'phone', label: { en: 'Phone number', th: 'เบอร์โทร' }, type: 'tel', required: true, maxLength: 20 },
  { key: 'lineId', label: { en: 'LINE ID', th: 'LINE ID' }, type: 'text', required: false, maxLength: 60 },
  {
    key: 'experience',
    label: { en: 'Trading experience', th: 'ประสบการณ์เทรด' },
    type: 'select',
    required: true,
    maxLength: 40,
    options: [
      { value: 'none', label: { en: 'New to trading', th: 'ยังไม่เคยเทรด' } },
      { value: '<1y', label: { en: 'Less than 1 year', th: 'น้อยกว่า 1 ปี' } },
      { value: '1-3y', label: { en: '1–3 years', th: '1–3 ปี' } },
      { value: '3y+', label: { en: 'More than 3 years', th: 'มากกว่า 3 ปี' } },
    ],
  },
  {
    key: 'market',
    label: { en: 'Main market you trade', th: 'ตลาดที่เทรดเป็นหลัก' },
    placeholder: { en: 'e.g. NQ, Gold, Forex', th: 'เช่น NQ, ทองคำ, Forex' },
    type: 'text',
    required: false,
    maxLength: 80,
  },
  {
    key: 'note',
    label: { en: 'Anything you want me to know', th: 'อยากบอกอะไรเพิ่มเติม' },
    type: 'textarea',
    required: false,
    maxLength: 1000,
  },
]

export const fieldsForPlan = (plan: PlanKey) => ENROLL_FIELDS.filter((f) => !f.plans || f.plans.includes(plan))

export const SLIP_MAX_BYTES = 4 * 1024 * 1024
export const SLIP_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s-]{7,19}$/

/** Keys of every invalid field (empty when the form is valid). */
export function invalidFields(plan: PlanKey, values: Record<string, string>): string[] {
  const bad: string[] = []
  for (const f of fieldsForPlan(plan)) {
    const v = (values[f.key] ?? '').trim()
    if (!v) {
      if (f.required) bad.push(f.key)
      continue
    }
    if (
      v.length > f.maxLength ||
      (f.type === 'email' && !EMAIL_RE.test(v)) ||
      (f.type === 'tel' && !PHONE_RE.test(v)) ||
      (f.type === 'select' && !f.options?.some((o) => o.value === v))
    ) {
      bad.push(f.key)
    }
  }
  return bad
}
