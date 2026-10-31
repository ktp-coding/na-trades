export type SocialName = 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'discord' | 'telegram'

// Env values arrive as strings. Only accept http(s) links so a bad value
// can never turn into a javascript: URL.
export const safeUrl = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim()) return ''
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

export const isOn = (value: unknown) => String(value ?? '').trim().toLowerCase() === 'true'

export function useSiteLinks() {
  const config = useRuntimeConfig().public
  const courseLink = safeUrl(config.courseLink)
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
    joinHref: courseLink || '/#contact',
    joinTarget: courseLink ? '_blank' : undefined,
    privateCourseLink: safeUrl(config.privateCourseLink),
    showBuyCourse: isOn(config.showBuyCourse),
    showBuyPrivateCourse: isOn(config.showBuyPrivateCourse),
    blobBaseUrl: safeUrl(config.blobBaseUrl).replace(/\/$/, ''),
    socials,
  }
}
