// Site copy in English (default) and Thai.
// English keeps the original NA TRADES wording. Thai follows the tone of the course material.

export type Lang = 'en' | 'th'

export interface SystemCard {
  key: 'amd' | 'ict' | 'qt'
  title: string
  tagline: string
  intro: string[]
  highlight?: string
  focusLabel: string
  focus: string[]
  closing?: string
  note: string
  points: string[]
}

const en = {
  nav: {
    about: 'About',
    systems: 'Systems',
    course: 'Course',
    free: 'Free Learning',
    private: 'Private Course',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Contact',
    join: 'Join Course',
    home: 'Home',
    menu: 'Open menu',
  },
  hero: {
    eyebrow: 'ICT Concept & Quarterly Theory',
    title: 'NA TRADES',
    course: 'Understand The Logic of Time & Price',
    sub: 'The full course is open. Learn to read price through time and structure, not indicators.',
    cta: 'Join Course',
    secondary: 'Explore the Systems',
    stats: [
      { v: '3', l: 'Core modules' },
      { v: '3', l: 'Summary PDFs' },
      { v: 'Whop', l: 'Instant access' },
      { v: 'Discord', l: 'Student community' },
    ],
  },
  about: {
    title: 'About',
    paragraphs: [
      'NA TRADES is built on the belief that price only makes sense when time and structure align.',
      'Our approach combines ICT Concepts with Quarterly Theory to explain how price is delivered, why it moves, and when meaningful expansion is most likely to occur. Rather than reacting to indicators or isolated patterns, every trade is framed within market structure, liquidity, and time-based context.',
      'This framework forms the foundation of the Understand The Logic of Time & Price course — a structured system designed to develop clarity, discipline, and consistency. The goal is not just better entries, but a deeper understanding of market behavior that supports long-term growth, especially within the demands of prop firm trading.',
      'NA TRADES is committed to mastering the process, respecting market logic, and building repeatable execution through time, price, and intent.',
    ],
  },
  systems: {
    title: 'Trading Systems',
    cards: [
      {
        key: 'amd',
        title: 'AMD Model',
        tagline: 'Intraday Execution Logic',
        intro: ['AMD Models are used to read intraday price behavior through time. Price is not random within the day. It consistently follows a logical sequence:'],
        highlight: 'Accumulation → Manipulation → Distribution',
        focusLabel: 'This model helps traders understand:',
        focus: ['When price is being built and held within a range', 'When liquidity is engineered and taken', 'When real expansion is most likely to occur'],
        note: 'Within the course, AMD acts as the execution layer, applying price logic inside the correct time window.',
        points: ['Session-based intraday structure', 'Liquidity-driven price behavior', 'Designed for intraday and directional execution'],
      },
      {
        key: 'ict',
        title: 'ICT Concept',
        tagline: 'Price Delivery & Market Logic',
        intro: ['ICT Concepts explain how price is delivered by the market, not just where it moves.'],
        focusLabel: 'The focus is on understanding:',
        focus: ['Liquidity and inducement', 'Market structure shifts', 'Institutional reference points such as Order Blocks and Fair Value Gaps'],
        closing: 'Rather than reacting to indicators, this framework reveals who is in control of price and why.',
        note: 'Within the course, ICT serves as the price logic engine, supporting confirmation and precise entries when aligned with time.',
        points: ['Liquidity-based market behavior', 'Structure-driven confirmations', 'Time and price alignment'],
      },
      {
        key: 'qt',
        title: 'Quarterly Theory',
        tagline: 'Time-Based Market Framework',
        intro: ['Quarterly Theory is the time foundation of the course.', 'The core principle is simple:'],
        highlight: 'Price does not move with intent unless it is in the right time window.',
        focusLabel: 'By dividing market time into structured quarters, this framework defines:',
        focus: ['When accumulation is expected', 'When manipulation is likely', 'When expansion has the highest probability'],
        closing: 'The key is not the signal itself, but when the signal appears.',
        note: '',
        points: ['Higher-timeframe directional bias', 'Time-based filtering', 'Context for all price action decisions'],
      },
    ] as SystemCard[],
    framework: {
      title: 'How the Framework Works Together',
      rows: [
        { k: 'Quarterly Theory', v: 'defines when the market is likely to move' },
        { k: 'ICT Concept', v: 'explains why price behaves the way it does' },
        { k: 'AMD Models', v: 'define how to execute within that window' },
      ],
      closing: 'This creates a structured, repeatable approach built on',
      closingHighlight: 'time, logic, and price behavior — not randomness.',
    },
  },
  course: {
    eyebrow: 'The Course',
    title: 'Understand The Logic of Time & Price',
    sub: 'Three modules that build on each other. From reading a single candle to knowing when and where to enter.',
    moduleLabel: 'Module',
    modules: [
      { tag: 'How and why price moves', topics: ['Power of 3 (AMD)', 'Price Delivery', 'PD Arrays', 'Internal & External Liquidity', 'Institutional Order Flow', 'Top Down Analysis', 'Advanced Market Tools'] },
      { tag: 'When price is likely to move', topics: ['Time is Fractal (yearly → 90-minute)', 'Quarter Functions (Q1–Q4)', 'True Opens', 'Quarterly Theory Cheatsheet', 'Sequential SMT (SSMT)'] },
      { tag: 'Where to enter, how far it can run', topics: ['Understand Candlestick', 'Swing Highs & Lows (Candle 1–4)', 'Swing Confirmation', 'Point of Interest (POI)', 'Entry Flow Chart'] },
    ],
    previews: 'Inside the course · tap to enlarge',
    includedTitle: "What's included",
    included: [
      'Full video lessons for all 3 modules',
      '3 summary PDFs, one for each module',
      'Access to the student Discord',
      'Ask questions directly when you get stuck',
      'A step-by-step path from fundamentals to execution',
    ],
    cta: 'Join Course on Whop',
    ctaNote: 'Secure checkout on Whop · instant access after joining',
  },
  free: {
    title: 'Free Learning',
    sub: 'Start here. If this way of reading the market clicks, the full course goes deeper.',
    video: 'Free Learning Video',
    play: 'Play video',
  },
  private: {
    title: 'Private Course & Mentorship',
    cta: 'Join Private Course',
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'Is this course for beginners?', a: 'Yes. It starts from reading candles and the Power of 3, then moves to time and entries. You only need to know basic candlestick charts.' },
      { q: 'Which markets does it work on?', a: 'The ideas are about time and price, so they apply to liquid markets such as index futures, gold and forex.' },
      { q: 'Do you give trade signals?', a: 'No. The course teaches you to read the chart yourself so you can trade on your own for the long run.' },
      { q: 'How do I get access after joining?', a: 'You join and pay through Whop. You get the video lessons, the PDFs under Files, and the student Discord right away.' },
      { q: 'Can I ask questions?', a: 'Yes. Ask in Discord or message me directly.' },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Articles',
    sub: 'The ideas behind the Time & Price framework.',
    readMore: 'Read more',
    all: 'All articles',
    back: '← All articles',
    next: 'Keep reading',
  },
  cta: {
    title: 'Understand The Logic of Time & Price',
    sub: 'The complete system, from fundamentals to execution.',
    join: 'Join Course',
    explore: 'See what you will learn',
  },
  footer: {
    contact: 'Contact',
    email: 'Email',
    disclaimer: 'Trading involves substantial risk. All content is for educational purposes only and is not financial advice. Past performance does not guarantee future results.',
    rights: 'All rights reserved.',
  },
  modal: { close: 'Close' },
}

type Copy = typeof en

const th: Copy = {
  nav: {
    about: 'เกี่ยวกับเรา',
    systems: 'ระบบเทรด',
    course: 'คอร์ส',
    free: 'เรียนฟรี',
    private: 'Private Course',
    blog: 'บทความ',
    faq: 'คำถาม',
    contact: 'ติดต่อ',
    join: 'สมัครเรียน',
    home: 'หน้าแรก',
    menu: 'เปิดเมนู',
  },
  hero: {
    eyebrow: 'ICT Concept & Quarterly Theory',
    title: 'NA TRADES',
    course: 'Understand The Logic of Time & Price',
    sub: 'เปิดรับนักเรียนแล้ว เรียนอ่านราคาผ่านเวลาและโครงสร้าง ไม่ต้องพึ่งอินดิเคเตอร์',
    cta: 'สมัครเรียน',
    secondary: 'ดูระบบเทรด',
    stats: [
      { v: '3', l: 'โมดูลหลัก' },
      { v: '3', l: 'เล่ม PDF สรุป' },
      { v: 'Whop', l: 'เข้าเรียนได้ทันที' },
      { v: 'Discord', l: 'กลุ่มนักเรียน' },
    ],
  },
  about: {
    title: 'เกี่ยวกับเรา',
    paragraphs: [
      'NA TRADES เชื่อว่าราคาจะอ่านออกก็ต่อเมื่อเวลากับโครงสร้างไปด้วยกัน',
      'เราใช้ ICT Concept คู่กับ Quarterly Theory เพื่ออธิบายว่าราคาถูกส่งไปยังไง ทำไมถึงวิ่ง และช่วงไหนที่ราคามีโอกาสวิ่งจริงมากที่สุด เราไม่เข้าเทรดตามอินดิเคเตอร์หรือ Pattern เดี่ยว ๆ ทุกออเดอร์ต้องดูโครงสร้างตลาด Liquidity และเวลาประกอบกันเสมอ',
      'แนวคิดนี้คือพื้นฐานของคอร์ส Understand The Logic of Time & Price เป็นระบบที่ทำให้มองกราฟได้ชัด มีวินัย และเทรดได้สม่ำเสมอ เป้าหมายไม่ใช่แค่หาจุดเข้าที่ดีขึ้น แต่คือเข้าใจพฤติกรรมราคาจนเติบโตได้ในระยะยาว โดยเฉพาะคนที่เทรด Prop Firm',
      'NA TRADES ตั้งใจฝึกที่กระบวนการ เคารพตรรกะของตลาด และทำซ้ำให้ได้ ผ่านเวลา ราคา และเจตนาของราคา',
    ],
  },
  systems: {
    title: 'ระบบเทรด',
    cards: [
      {
        key: 'amd',
        title: 'AMD Model',
        tagline: 'ลำดับการวิ่งของราคาระหว่างวัน',
        intro: ['AMD ใช้อ่านพฤติกรรมราคาระหว่างวันผ่านเวลา ราคาระหว่างวันไม่ได้สุ่ม มันเดินตามลำดับเดิมเกือบทุกครั้ง'],
        highlight: 'สะสม → หลอก → วิ่ง',
        focusLabel: 'โมเดลนี้ช่วยให้รู้ว่า',
        focus: ['ช่วงไหนราคากำลังสะสมอยู่ในกรอบ', 'ช่วงไหนราคากำลังไปเก็บ Liquidity', 'ช่วงไหนที่ราคามีโอกาสวิ่งจริงมากที่สุด'],
        note: 'ในคอร์ส AMD คือส่วนที่ใช้ตอนเข้าเทรด เอาตรรกะของราคามาใช้ในช่วงเวลาที่ถูกต้อง',
        points: ['โครงสร้างระหว่างวันตาม Session', 'ราคาวิ่งตาม Liquidity', 'เหมาะกับเทรดระหว่างวันแบบมีทิศทาง'],
      },
      {
        key: 'ict',
        title: 'ICT Concept',
        tagline: 'ราคาวิ่งยังไง ทำไมถึงวิ่ง',
        intro: ['ICT ไม่ได้บอกแค่ว่าราคาจะไปไหน แต่บอกว่าตลาดส่งราคาไปยังไง'],
        focusLabel: 'สิ่งที่ต้องเข้าใจคือ',
        focus: ['Liquidity และการล่อให้คนเข้าผิดฝั่ง', 'จังหวะที่โครงสร้างตลาดเปลี่ยน', 'โซนอ้างอิงของรายใหญ่ เช่น Order Block และ Fair Value Gap'],
        closing: 'แทนที่จะรอสัญญาณจากอินดิเคเตอร์ เราจะเห็นว่าใครคุมราคาอยู่ และคุมเพราะอะไร',
        note: 'ในคอร์ส ICT คือส่วนที่อธิบายเหตุผลของราคา ใช้ยืนยันและหาจุดเข้าที่แม่นขึ้นเมื่อตรงกับเวลา',
        points: ['ราคาวิ่งตาม Liquidity', 'ยืนยันด้วยโครงสร้าง', 'เวลากับราคาต้องตรงกัน'],
      },
      {
        key: 'qt',
        title: 'Quarterly Theory',
        tagline: 'กรอบเวลาของตลาด',
        intro: ['Quarterly Theory คือพื้นฐานเรื่องเวลาของคอร์สนี้', 'หลักคิดง่าย ๆ คือ'],
        highlight: 'ถ้ายังไม่ถึงเวลา ราคาจะยังไม่วิ่งจริง',
        focusLabel: 'พอแบ่งเวลาของตลาดเป็น Quarter เราจะรู้ว่า',
        focus: ['ช่วงไหนควรเป็นช่วงสะสม', 'ช่วงไหนมีโอกาสหลอก', 'ช่วงไหนมีโอกาสวิ่งมากที่สุด'],
        closing: 'สิ่งสำคัญไม่ใช่สัญญาณ แต่คือสัญญาณนั้นเกิดตอนไหน',
        note: '',
        points: ['ใช้ Timeframe ใหญ่หาทิศทาง', 'กรองจังหวะด้วยเวลา', 'เป็นบริบทของทุกการตัดสินใจ'],
      },
    ],
    framework: {
      title: 'ทั้งระบบทำงานร่วมกันยังไง',
      rows: [
        { k: 'Quarterly Theory', v: 'บอกว่าตลาดน่าจะวิ่งเมื่อไหร่' },
        { k: 'ICT Concept', v: 'บอกว่าทำไมราคาถึงวิ่งแบบนั้น' },
        { k: 'AMD Models', v: 'บอกว่าจะเข้าเทรดยังไงในช่วงเวลานั้น' },
      ],
      closing: 'ทั้งหมดรวมกันเป็นวิธีเทรดที่เป็นระบบและทำซ้ำได้ อยู่บน',
      closingHighlight: 'เวลา ตรรกะ และพฤติกรรมราคา ไม่ใช่การเดา',
    },
  },
  course: {
    eyebrow: 'The Course',
    title: 'Understand The Logic of Time & Price',
    sub: '3 โมดูลต่อกันเป็นระบบเดียว ตั้งแต่อ่านแท่งเทียนแท่งเดียว จนรู้ว่าควรเข้าเมื่อไหร่ เข้าตรงไหน',
    moduleLabel: 'Module',
    modules: [
      { tag: 'ราคาวิ่งยังไง ทำไมวิ่ง', topics: ['Power of 3 (AMD)', 'Price Delivery', 'PD Arrays', 'Internal & External Liquidity', 'Institutional Order Flow', 'Top Down Analysis', 'Advanced Market Tools'] },
      { tag: 'ราคาจะวิ่งเมื่อไหร่', topics: ['Time is Fractal (ปี → 90 นาที)', 'หน้าที่ของ Q1–Q4', 'True Opens', 'Quarterly Theory Cheatsheet', 'Sequential SMT (SSMT)'] },
      { tag: 'เข้าตรงไหน เหลือแรงอีกกี่แท่ง', topics: ['อ่านแท่งเทียน', 'Swing Highs & Lows (Candle 1–4)', 'Swing Confirmation', 'Point of Interest (POI)', 'Flow Chart เข้า / ไม่เข้า'] },
    ],
    previews: 'ตัวอย่างในคอร์ส · กดเพื่อดูภาพใหญ่',
    includedTitle: 'สิ่งที่ได้',
    included: [
      'วิดีโอเต็มทั้ง 3 โมดูล',
      'PDF สรุปใจความสำคัญ ครบ 3 เล่ม',
      'เข้ากลุ่ม Discord ของนักเรียน',
      'ติดตรงไหน ถามผมได้โดยตรง',
      'เรียนเป็นขั้นตอน จากพื้นฐานไปถึงจุดเข้า',
    ],
    cta: 'สมัครเรียนผ่าน Whop',
    ctaNote: 'ชำระเงินผ่าน Whop · เข้าเรียนได้ทันทีหลังสมัคร',
  },
  free: {
    title: 'เรียนฟรี',
    sub: 'ลองดูก่อนว่าวิธีมองตลาดแบบนี้เข้ากับเราไหม ถ้าใช่ คอร์สเต็มจะลงลึกกว่านี้',
    video: 'คลิปเรียนฟรี',
    play: 'เล่นวิดีโอ',
  },
  private: {
    title: 'Private Course & Mentorship',
    cta: 'สมัคร Private Course',
  },
  faq: {
    title: 'คำถามที่เจอบ่อย',
    items: [
      { q: 'มือใหม่เรียนได้ไหม', a: 'ได้ครับ คอร์สเริ่มจากอ่านแท่งเทียนกับ Power of 3 ก่อน แล้วค่อยต่อไปเรื่องเวลาและจุดเข้า ขอแค่รู้จักกราฟแท่งเทียนเบื้องต้น' },
      { q: 'ใช้กับตลาดไหนได้บ้าง', a: 'หลักการเป็นเรื่องเวลากับราคา ใช้ได้กับตลาดที่สภาพคล่องสูง เช่น ดัชนี Futures ทองคำ และ Forex' },
      { q: 'มีสัญญาณให้เข้าตามไหม', a: 'ไม่มีครับ คอร์สนี้สอนให้อ่านกราฟเองเป็น จะได้เทรดเองได้ในระยะยาว' },
      { q: 'สมัครแล้วเข้าเรียนยังไง', a: 'สมัครและชำระเงินผ่าน Whop ได้สิทธิ์ดูวิดีโอ โหลด PDF ที่หน้า Files และเข้ากลุ่ม Discord ได้ทันที' },
      { q: 'เรียนแล้วติด ถามได้ไหม', a: 'ได้เลยครับ ถามใน Discord หรือทักผมตรง ๆ ก็ได้' },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'บทความ',
    sub: 'แนวคิดเบื้องหลังระบบ Time & Price',
    readMore: 'อ่านต่อ',
    all: 'บทความทั้งหมด',
    back: '← บทความทั้งหมด',
    next: 'อ่านต่อ',
  },
  cta: {
    title: 'Understand The Logic of Time & Price',
    sub: 'ครบทั้งระบบ ตั้งแต่พื้นฐานจนถึงจุดเข้า',
    join: 'สมัครเรียน',
    explore: 'ดูเนื้อหาคอร์ส',
  },
  footer: {
    contact: 'ติดต่อ',
    email: 'อีเมล',
    disclaimer: 'การเทรดมีความเสี่ยงสูง เนื้อหาทั้งหมดเพื่อการศึกษา ไม่ใช่คำแนะนำการลงทุน ผลลัพธ์ในอดีตไม่ได้รับประกันผลในอนาคต',
    rights: 'สงวนลิขสิทธิ์',
  },
  modal: { close: 'ปิด' },
}

export const copy: Record<Lang, Copy> = { en, th }
