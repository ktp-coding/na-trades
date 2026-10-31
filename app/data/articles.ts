// Blog articles, built from the same copy as the home page so both stay in sync.
import { copy, type Lang, type SystemCard } from './i18n'
import { tips } from './tips'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'note'; text: string }

interface Localized {
  tagline: string
  excerpt: string
  body: Block[]
}

export interface Article {
  slug: string
  title: string
  icon: string
  theme: 'gold' | 'ict' | 'qt' | 'fractal'
  tagline: Record<Lang, string>
  excerpt: Record<Lang, string>
  body: Record<Lang, Block[]>
}

const keyPoints: Record<Lang, string> = { en: 'Key points', th: 'สรุปสั้น ๆ' }

const fromSystem = (card: SystemCard, lang: Lang): Localized => {
  const body: Block[] = card.intro.map((text) => ({ type: 'p', text }))
  if (card.highlight) body.push({ type: 'quote', text: card.highlight })
  body.push({ type: 'h2', text: card.focusLabel.replace(/:$/, '') })
  body.push({ type: 'list', items: card.focus })
  if (card.closing) body.push({ type: 'p', text: card.closing })
  if (card.note) body.push({ type: 'note', text: card.note })
  body.push({ type: 'h2', text: keyPoints[lang] })
  body.push({ type: 'list', items: card.points })
  return { tagline: card.tagline, excerpt: card.highlight || card.intro[0]!, body }
}

const sources: {
  slug: string
  title: string
  icon: string
  theme: Article['theme']
  build: (lang: Lang) => Localized
}[] = [
  {
    slug: 'about-na-trades',
    title: 'About NA TRADES',
    icon: '/images/icon-na.png',
    theme: 'gold',
    build: (lang) => {
      const [first, ...rest] = copy[lang].about.paragraphs
      return {
        tagline: 'Time, Price & Intent',
        excerpt: first!,
        body: [{ type: 'quote', text: first! }, ...rest.map((text) => ({ type: 'p' as const, text }))],
      }
    },
  },
  ...(['amd', 'ict', 'qt'] as const).map((key) => {
    const card = (lang: Lang) => copy[lang].systems.cards.find((c) => c.key === key)!
    return {
      slug: { amd: 'amd-model', ict: 'ict-concept', qt: 'quarterly-theory' }[key],
      title: card('en').title,
      icon: key === 'qt' ? '/images/icon-qt.png' : key === 'ict' ? '/images/icon-ict.png' : '/images/icon-amd.svg',
      theme: key === 'qt' ? ('qt' as const) : ('ict' as const),
      build: (lang: Lang) => fromSystem(card(lang), lang),
    }
  }),
  {
    slug: 'how-the-framework-works-together',
    title: 'How the Framework Works Together',
    icon: '/images/icon-fractal.png',
    theme: 'fractal',
    build: (lang) => {
      const f = copy[lang].systems.framework
      return {
        tagline: 'Understand The Logic of Time & Price',
        excerpt: f.rows.map((r) => r.k).join(' · '),
        body: [
          { type: 'h2', text: f.title },
          { type: 'list', items: f.rows.map((r) => `${r.k} ${r.v}`) },
          { type: 'p', text: f.closing },
          { type: 'quote', text: f.closingHighlight },
        ],
      }
    },
  },
]

const built: Article[] = sources.map((s) => {
  const en = s.build('en')
  const th = s.build('th')
  return {
    slug: s.slug,
    title: s.title,
    icon: s.icon,
    theme: s.theme,
    tagline: { en: en.tagline, th: th.tagline },
    excerpt: { en: en.excerpt, th: th.excerpt },
    body: { en: en.body, th: th.body },
  }
})

// Short pieces from the course PDFs come first, so the newest reading is at the top.
export const articles: Article[] = [
  ...tips.map((t) => ({
    slug: t.slug,
    title: t.title,
    icon: t.icon,
    theme: t.theme,
    tagline: t.module,
    excerpt: t.excerpt,
    body: t.body,
  })),
  ...built,
]

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug)
