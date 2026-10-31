import { randomBytes } from 'node:crypto'
import { PLAN_KEYS, SLIP_MAX_BYTES, fieldsForPlan, invalidFields, type PlanKey } from '#shared/enroll'

// Accepts the enrollment form (multipart) and forwards it to the Google Apps
// Script web app, which writes the row to Google Sheets and saves the slip
// in the plan's Drive folder.

const folderId = (value: string) => value.match(/folders\/([\w-]{10,})/)?.[1] ?? (/^[\w-]{10,}$/.test(value) ? value : '')
const sheetId = (value: string) => value.match(/spreadsheets\/d\/([\w-]{10,})/)?.[1] ?? (/^[\w-]{10,}$/.test(value) ? value : '')

function sniffType(buf: Buffer): string | null {
  if (buf.length < 12) return null
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg'
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp'
  if (buf.subarray(0, 5).toString('ascii') === '%PDF-') return 'application/pdf'
  return null
}

const EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }

// Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
const cell = (v: string) => (/^[=+\-@\t\r]/.test(v) ? `'${v}` : v)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (isRateLimited(`enroll:${ip}`)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const parts = await readMultipartFormData(event)
  if (!parts) throw createError({ statusCode: 400, statusMessage: 'Invalid form' })

  const values: Record<string, string> = {}
  let slip: { data: Buffer; filename?: string } | null = null
  for (const p of parts) {
    if (!p.name) continue
    if (p.name === 'slip') {
      if (slip) throw createError({ statusCode: 400, statusMessage: 'One slip only' })
      slip = { data: p.data, filename: p.filename }
    } else if (!p.filename) {
      values[p.name] = p.data.toString('utf8').slice(0, 2000)
    }
  }

  // Honeypot: real visitors never fill this hidden field.
  if (values.website) return { ok: true, orderId: 'NA-0' }

  const plan = values.plan as PlanKey
  if (!PLAN_KEYS.includes(plan)) throw createError({ statusCode: 400, statusMessage: 'Invalid plan' })
  if (values.consent !== 'yes') throw createError({ statusCode: 400, statusMessage: 'Consent required' })

  const bad = invalidFields(plan, values)
  if (bad.length) throw createError({ statusCode: 400, statusMessage: `Invalid field: ${bad.join(', ')}` })

  if (!slip || slip.data.length === 0) throw createError({ statusCode: 400, statusMessage: 'Slip required' })
  if (slip.data.length > SLIP_MAX_BYTES) throw createError({ statusCode: 413, statusMessage: 'Slip too large' })
  const mimeType = sniffType(slip.data)
  if (!mimeType) throw createError({ statusCode: 415, statusMessage: 'Slip must be JPG, PNG, WEBP or PDF' })

  const gasUrl = String(config.gasUrl || '')
  const target = {
    sheetId: sheetId(String(config.sheetId || '')),
    folderId: folderId(String(plan === 'private' ? config.driveFolderPrivate : config.driveFolderOnline) || ''),
  }
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(gasUrl) || !config.gasSecret || !target.sheetId || !target.folderId) {
    console.error('[enroll] Missing or invalid Google settings (NUXT_GAS_URL, NUXT_GAS_SECRET, NUXT_SHEET_ID, NUXT_DRIVE_FOLDER_*)')
    throw createError({ statusCode: 503, statusMessage: 'Enrollment is not configured yet' })
  }

  const now = new Date()
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, '')
  const orderId = `NA-${ymd}-${randomBytes(3).toString('hex').toUpperCase()}`
  const price = String(plan === 'private' ? config.public.pricePrivate : config.public.priceOnline || '')

  // Thai column names, matching the existing Google Form response sheets.
  const row: Record<string, string> = {
    'ประทับเวลา': now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }),
    'เลขที่การสมัคร': orderId,
    'รูปแบบ': plan === 'private' ? 'เรียนสด' : 'คลิปออนไลน์',
    'ยอดที่ต้องโอน': price,
  }
  for (const f of fieldsForPlan(plan)) row[f.label.th] = cell((values[f.key] ?? '').trim())
  row['ยินยอมให้ใช้รีวิว'] = values.marketing === 'yes' ? 'ใช่' : 'ไม่'
  row['ภาษา'] = values.lang === 'th' ? 'TH' : 'EN'
  row['สถานะ'] = 'รอตรวจสลิป'

  let res: { ok?: boolean; error?: string } | undefined
  try {
    res = await $fetch<{ ok?: boolean; error?: string }>(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: config.gasSecret,
        sheetId: target.sheetId,
        sheetName: plan === 'private' ? 'Private' : 'Online',
        folderId: target.folderId,
        row,
        file: {
          name: `${orderId}_${String(values.fullName).trim().replace(/[^\p{L}\p{N} _-]/gu, '').slice(0, 40)}.${EXT[mimeType]}`,
          mimeType,
          base64: slip.data.toString('base64'),
        },
      }),
      timeout: 30000,
      retry: 0,
    })
  } catch (err) {
    console.error('[enroll] Apps Script request failed', err)
  }
  if (!res?.ok) {
    console.error('[enroll] Apps Script error', res?.error)
    throw createError({ statusCode: 502, statusMessage: 'Could not save your enrollment' })
  }

  return { ok: true, orderId }
})

