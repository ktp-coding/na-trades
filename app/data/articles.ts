// Articles for the /blog section.
// The text is the original "About" and "Trading Systems" copy from the old site.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'note'; text: string }

export interface Article {
  slug: string
  title: string
  tagline: string
  excerpt: string
  icon: string
  theme: 'gold' | 'ict' | 'qt' | 'fractal'
  body: Block[]
}

export const articles: Article[] = [
  {
    slug: 'about-na-trades',
    title: 'About N|A TRADES',
    tagline: 'Time, Price & Intent',
    excerpt: 'NA TRADES is built on the belief that price only makes sense when time and structure align.',
    icon: '/images/icon-na.png',
    theme: 'gold',
    body: [
      { type: 'quote', text: 'NA TRADES is built on the belief that price only makes sense when time and structure align.' },
      {
        type: 'p',
        text: 'Our approach combines ICT Concepts with Quarterly Theory to explain how price is delivered, why it moves, and when meaningful expansion is most likely to occur. Rather than reacting to indicators or isolated patterns, every trade is framed within market structure, liquidity, and time-based context.',
      },
      {
        type: 'p',
        text: 'This framework forms the foundation of the Understand The Logic of Time & Price course — a structured system designed to develop clarity, discipline, and consistency. The goal is not just better entries, but a deeper understanding of market behavior that supports long-term growth, especially within the demands of prop firm trading.',
      },
      {
        type: 'p',
        text: 'NA TRADES is committed to mastering the process, respecting market logic, and building repeatable execution through time, price, and intent.',
      },
    ],
  },
  {
    slug: 'amd-model',
    title: 'AMD Model',
    tagline: 'Intraday Execution Logic',
    excerpt: 'Price is not random within the day. It consistently follows a logical sequence: Accumulation → Manipulation → Distribution.',
    icon: '/images/icon-ict.png',
    theme: 'ict',
    body: [
      {
        type: 'p',
        text: 'AMD Models are used to read intraday price behavior through time. Price is not random within the day. It consistently follows a logical sequence:',
      },
      { type: 'quote', text: 'Accumulation → Manipulation → Distribution' },
      { type: 'h2', text: 'This model helps traders understand' },
      {
        type: 'list',
        items: [
          'When price is being built and held within a range',
          'When liquidity is engineered and taken',
          'When real expansion is most likely to occur',
        ],
      },
      { type: 'note', text: 'Within the course, AMD acts as the execution layer, applying price logic inside the correct time window.' },
      { type: 'h2', text: 'Key points' },
      {
        type: 'list',
        items: ['Session-based intraday structure', 'Liquidity-driven price behavior', 'Designed for intraday and directional execution'],
      },
    ],
  },
  {
    slug: 'ict-concept',
    title: 'ICT Concept',
    tagline: 'Price Delivery & Market Logic',
    excerpt: 'ICT Concepts explain how price is delivered by the market, not just where it moves.',
    icon: '/images/icon-ict.png',
    theme: 'ict',
    body: [
      { type: 'p', text: 'ICT Concepts explain how price is delivered by the market, not just where it moves.' },
      { type: 'h2', text: 'The focus is on understanding' },
      {
        type: 'list',
        items: [
          'Liquidity and inducement',
          'Market structure shifts',
          'Institutional reference points such as Order Blocks and Fair Value Gaps',
        ],
      },
      { type: 'p', text: 'Rather than reacting to indicators, this framework reveals who is in control of price and why.' },
      {
        type: 'note',
        text: 'Within the course, ICT serves as the price logic engine, supporting confirmation and precise entries when aligned with time.',
      },
      { type: 'h2', text: 'Key points' },
      { type: 'list', items: ['Liquidity-based market behavior', 'Structure-driven confirmations', 'Time and price alignment'] },
    ],
  },
  {
    slug: 'quarterly-theory',
    title: 'Quarterly Theory',
    tagline: 'Time-Based Market Framework',
    excerpt: 'Price does not move with intent unless it is in the right time window.',
    icon: '/images/icon-qt.png',
    theme: 'qt',
    body: [
      { type: 'p', text: 'Quarterly Theory is the time foundation of the course.' },
      { type: 'p', text: 'The core principle is simple:' },
      { type: 'quote', text: 'Price does not move with intent unless it is in the right time window.' },
      { type: 'h2', text: 'By dividing market time into structured quarters, this framework defines' },
      {
        type: 'list',
        items: ['When accumulation is expected', 'When manipulation is likely', 'When expansion has the highest probability'],
      },
      { type: 'note', text: 'The key is not the signal itself, but when the signal appears.' },
      { type: 'h2', text: 'Key points' },
      { type: 'list', items: ['Higher-timeframe directional bias', 'Time-based filtering', 'Context for all price action decisions'] },
    ],
  },
  {
    slug: 'how-the-framework-works-together',
    title: 'How the Framework Works Together',
    tagline: 'Understand The Logic of Time & Price',
    excerpt: 'Quarterly Theory defines when, ICT explains why, AMD defines how to execute.',
    icon: '/images/icon-fractal.png',
    theme: 'fractal',
    body: [
      {
        type: 'list',
        items: [
          'Quarterly Theory defines when the market is likely to move',
          'ICT Concept explains why price behaves the way it does',
          'AMD Models define how to execute within that window',
        ],
      },
      { type: 'p', text: 'This creates a structured, repeatable approach built on' },
      { type: 'quote', text: 'time, logic, and price behavior — not randomness.' },
    ],
  },
]

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug)
