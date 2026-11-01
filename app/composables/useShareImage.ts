// Share image (og:image) for a page. Website pages use the templates in /images/og/
// (designed in Figma, section "OG – Website (1200×630)"); the course keeps its own cover.
const SIZES = {
  site: { width: 1200, height: 630 },
  course: { width: 900, height: 507 },
} as const

export function useShareImage(name: 'home' | 'about' | 'free' | 'blog' | 'disclaimer' | 'course') {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const isCourse = name === 'course'
  const size = isCourse ? SIZES.course : SIZES.site
  useSeoMeta({
    ogImage: `${siteUrl}/images/${isCourse ? 'og-cover.png' : `og/${name}.jpg`}`,
    ogImageWidth: size.width,
    ogImageHeight: size.height,
  })
}
