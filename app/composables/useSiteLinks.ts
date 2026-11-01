export type SocialName = 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'discord' | 'telegram'

// Env values arrive as strings. Only accept http(s) links so a bad value
// can never turn into a javascript: URL.
export const safeUrl = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim()) return ''
  // Accept "www.youtube.com/@x" style values too, as the old site did.
  const raw = value.trim()
  const withScheme = /^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw.replace(/^\/+/, '')}`
  try {
    const url = new URL(withScheme)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

export const isOn = (value: unknown) => String(value ?? '').trim().toLowerCase() === 'true'

// facebook.com/<page> → m.me/<page>, which opens a Messenger chat with the page.
export const messengerFrom = (fb: string): string => {
  if (!fb) return ''
  try {
    const url = new URL(fb)
    if (!/(^|\.)facebook\.com$/i.test(url.hostname)) return ''
    const id = url.pathname.split('/').filter(Boolean)[0]
    if (id === 'profile.php') return url.searchParams.get('id') ? `https://m.me/${url.searchParams.get('id')}` : ''
    return id && /^[\w.-]+$/.test(id) ? `https://m.me/${id}` : ''
  } catch {
    return ''
  }
}

export function useSiteLinks() {
  const config = useRuntimeConfig().public
  const courseLink = safeUrl(config.courseLink)
  const enrollEnabled = isOn(config.enrollEnabled)
  const socials = (
    [
      { name: 'youtube', label: 'YouTube', href: safeUrl(config.youtubeLink) },
      { name: 'facebook', label: 'Facebook', href: safeUrl(config.fbLink) },
      { name: 'instagram', label: 'Instagram', href: safeUrl(config.igLink) },
      { name: 'tiktok', label: 'TikTok', href: safeUrl(config.tiktokLink) },
      { name: 'discord', label: 'Discord', href: safeUrl(config.discordLink) },
      { name: 'telegram', label: 'Telegram', href: safeUrl(config.telegramLink) },
    ] as { name: SocialName; label: string; href: string }[]
  ).filter((s) => s.href)

  return {
    courseLink,
    enrollEnabled,
    joinHref: enrollEnabled ? '/enroll' : courseLink || '#contact',
    joinTarget: !enrollEnabled && courseLink ? '_blank' : undefined,
    lineLink: safeUrl(config.lineLink),
    messengerLink: messengerFrom(safeUrl(config.fbLink)),
    privateCourseLink: safeUrl(config.privateCourseLink),
    showBuyCourse: isOn(config.showBuyCourse),
    showBuyPrivateCourse: isOn(config.showBuyPrivateCourse),
    blobBaseUrl: safeUrl(config.blobBaseUrl).replace(/\/$/, ''),
    socials,
  }
}
