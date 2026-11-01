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
  /** Digits only (e.g. age). */
  numeric?: boolean
  placeholder?: L
  hint?: L
  /** Sheet column name. Defaults to label.th; set it to keep the column when the label changes. */
  column?: string
  options?: { value: string; label: L }[]
  /** Only ask for these plans. Omit to ask for every plan. */
  plans?: PlanKey[]
}

// Same questions as the Google Forms "คอร์สเรียน (Gen3)" and "คอร์สเรียน (Online)".
export const ENROLL_FIELDS: EnrollField[] = [
  { key: 'fullName', label: { en: 'Full name', th: 'ชื่อ-สกุล จริง' }, type: 'text', required: true, maxLength: 120 },
  { key: 'nickname', label: { en: 'Nickname', th: 'ชื่อเล่น' }, type: 'text', required: true, maxLength: 60 },
  { key: 'phone', label: { en: 'Phone number', th: 'เบอร์โทรศัพท์' }, type: 'tel', required: true, maxLength: 20 },
  { key: 'age', label: { en: 'Age', th: 'อายุ' }, type: 'text', required: true, maxLength: 3, numeric: true },
  {
    key: 'facebook',
    label: { en: 'Facebook name', th: 'ชื่อ Facebook' },
    placeholder: { en: 'Name or profile link', th: 'ชื่อ หรือลิงก์โปรไฟล์' },
    type: 'text',
    required: true,
    maxLength: 200,
  },
  {
    key: 'email',
    label: { en: 'Email', th: 'Email' },
    hint: { en: 'For contact and your Whop / Discord access', th: 'ใช้ติดต่อกลับ และส่งสิทธิ์เข้าเรียน Whop / Discord' },
    column: 'Email หรือ Gmail เพื่อติดต่อกลับ และส่งสิทธิ์เข้าเรียนใน Whop / Discord',
    type: 'email',
    required: true,
    maxLength: 160,
  },
  {
    key: 'reason',
    label: { en: 'Why do you want to learn with NA Trades?', th: 'เหตุผลที่อยากเรียนกับ NA Trades' },
    type: 'textarea',
    required: true,
    maxLength: 1000,
  },
]

export const fieldsForPlan = (plan: PlanKey) => ENROLL_FIELDS.filter((f) => !f.plans || f.plans.includes(plan))

/** "12,900", "12900" and "฿12,900" all give 12900. Empty or invalid gives 0. */
export const parsePrice = (p: string) => {
  const n = Number(String(p).replace(/[,\s฿]/g, ''))
  return p && Number.isFinite(n) && n > 0 ? n : 0
}

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
      (f.numeric && !/^\d{1,3}$/.test(v)) ||
      (f.type === 'select' && !f.options?.some((o) => o.value === v))
    ) {
      bad.push(f.key)
    }
  }
  return bad
}
