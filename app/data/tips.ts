// Short articles taken from the course PDFs. Each one is a small piece of a lesson,
// not the whole lesson: enough to be useful, with the rest left for the course.
import type { Block } from './articles'
import type { Lang } from './i18n'

export interface Tip {
  slug: string
  title: string
  icon: string
  theme: 'gold' | 'ict' | 'qt' | 'fractal'
  module: Record<Lang, string>
  tagline: Record<Lang, string>
  excerpt: Record<Lang, string>
  body: Record<Lang, Block[]>
}

export const tips: Tip[] = [
  {
    slug: 'four-states-of-price',
    title: 'The 4 States of Price',
    icon: '/images/icon-ict.png',
    theme: 'ict',
    module: { en: 'From Module 1 · Price Delivery', th: 'จาก Module 1 · Price Delivery' },
    tagline: { en: 'Price Delivery', th: 'Price Delivery' },
    excerpt: {
      en: 'Price only ever does four things, and it always has to leave a range before it can retrace or reverse.',
      th: 'ราคามีอยู่แค่ 4 สภาวะ และต้องออกจากกรอบก่อนเสมอ ถึงจะย่อหรือกลับตัวได้',
    },
    body: {
      th: [
        { type: 'p', text: 'ถ้าตัดเรื่องอินดิเคเตอร์ออกไปทั้งหมด ราคามีอยู่แค่ 4 สภาวะ แล้ววนเป็นวัฏจักรไปเรื่อย ๆ ครับ' },
        { type: 'list', items: [
          'Consolidation · ราคาพักตัวในกรอบ',
          'Expansion · ราคาวิ่งออกจากกรอบอย่างมีแรง',
          'Retracement · ราคาย่อตัวชั่วคราว แล้วไปต่อทางเดิม',
          'Reversal · ราคาเปลี่ยนทิศ หลังไปแตะสภาพคล่องนอกกรอบ',
        ] },
        { type: 'h2', text: 'ออกจากกรอบก่อนเสมอ' },
        { type: 'p', text: 'ราคาต้อง Expansion ออกจาก Consolidation ก่อน ถึงจะย่อหรือกลับตัวได้ ถ้ายังอยู่ในกรอบ ก็ยังไม่ใช่เวลาที่จะไปเดาว่าราคาจะย่อหรือกลับตัวครับ' },
        { type: 'quote', text: 'Expansion → Retracement หรือ Reversal → Expansion' },
        { type: 'h2', text: 'ย่อ ไม่เท่ากับ กลับตัว' },
        { type: 'p', text: 'จุดที่คนพลาดบ่อยคือเห็นราคาย่อแล้วคิดว่ากลับตัว Retracement คือการพักชั่วคราวแล้วไปต่อ ส่วน Reversal คือการเปลี่ยนมือ ซึ่งมักเกิดหลังราคาไปกวาดสภาพคล่องนอกกรอบมาแล้ว แยกสองอย่างนี้ออก ก็ไม่ต้องสวนเทรนด์โดยไม่จำเป็น' },
        { type: 'note', text: 'ในคอร์ส ผมสอนต่อว่าแต่ละสภาวะดูจากแท่งเทียนยังไง และใช้คู่กับ PD Arrays หาจุดที่ราคาน่าจะย่อมาครับ' },
      ],
      en: [
        { type: 'p', text: 'Take away every indicator and price only does four things, in a cycle that keeps repeating.' },
        { type: 'list', items: [
          'Consolidation · price rests inside a range',
          'Expansion · price leaves the range with strength',
          'Retracement · a temporary pullback before continuing',
          'Reversal · a change of direction after taking liquidity outside the range',
        ] },
        { type: 'h2', text: 'It leaves the range first' },
        { type: 'p', text: 'Price has to expand out of consolidation before it can retrace or reverse. While it is still inside the range, there is nothing to retrace yet.' },
        { type: 'quote', text: 'Expansion → Retracement or Reversal → Expansion' },
        { type: 'h2', text: 'A retracement is not a reversal' },
        { type: 'p', text: 'The common mistake is to see a pullback and call it a reversal. A retracement pauses and continues. A reversal changes hands, usually after price has swept liquidity outside the range. Telling them apart keeps you from fighting the trend.' },
        { type: 'note', text: 'In the course I show how to read each state from the candles, and how to pair it with PD Arrays to find where price is likely to pull back to.' },
      ],
    },
  },
  {
    slug: 'time-is-fractal',
    title: 'Time Is Fractal',
    icon: '/images/icon-qt.png',
    theme: 'qt',
    module: { en: 'From Module 2 · Time is Fractal', th: 'จาก Module 2 · Time is Fractal' },
    tagline: { en: 'Quarterly Theory', th: 'Quarterly Theory' },
    excerpt: {
      en: 'The same cycle repeats from the year down to 90 minutes, and every cycle splits into four quarters.',
      th: 'รอบเดียวกันเกิดซ้ำตั้งแต่รอบปีไปจนถึง 90 นาที และทุกรอบแบ่งได้เป็น 4 Quarter',
    },
    body: {
      th: [
        { type: 'p', text: 'หลักแรกของ Quarterly Theory คือเวลาทำงานเป็นรอบ และรอบเดียวกันเกิดซ้ำทุกระดับ ตั้งแต่ปี เดือน สัปดาห์ วัน ไปจนถึง 90 นาทีครับ' },
        { type: 'h2', text: 'ทุกรอบแบ่งเป็น 4 Quarter' },
        { type: 'list', items: [
          'ปี แบ่งเป็น Quarter ละ 3 เดือน',
          'เดือน แบ่งเป็น Quarter ละ 1 สัปดาห์',
          'สัปดาห์ แบ่งเป็น Quarter ละ 1 วัน',
          'วัน แบ่งเป็น Quarter ละ 6 ชั่วโมง',
          'Session แบ่งเป็น Quarter ละ 90 นาที',
        ] },
        { type: 'h2', text: 'รอบเล็กสอดคล้องกับรอบใหญ่' },
        { type: 'p', text: 'อ่านรอบใหญ่เพื่อหาทิศทาง แล้วใช้รอบเล็กหาจังหวะเข้า ถ้ารู้ว่าตอนนี้อยู่ Quarter ไหนของรอบ ก็พอคาดได้ว่าช่วงไหนราคาน่าจะ Expansion และช่วงไหนน่าจะกลับตัวครับ' },
        { type: 'quote', text: 'รู้รอบเวลา = รู้ช่วงที่ราคาจะวิ่ง' },
        { type: 'note', text: 'ในคอร์ส ผมสอนต่อว่าแต่ละ Quarter ทำหน้าที่อะไร และใช้ True Open กับ SSMT ช่วยยืนยันยังไงครับ' },
      ],
      en: [
        { type: 'p', text: 'The first rule of Quarterly Theory is that time works in cycles, and the same cycle repeats at every level: the year, the month, the week, the day, down to 90 minutes.' },
        { type: 'h2', text: 'Every cycle has four quarters' },
        { type: 'list', items: [
          'A year splits into quarters of 3 months',
          'A month splits into quarters of 1 week',
          'A week splits into quarters of 1 day',
          'A day splits into quarters of 6 hours',
          'A session splits into quarters of 90 minutes',
        ] },
        { type: 'h2', text: 'Small cycles follow big ones' },
        { type: 'p', text: 'Read the bigger cycle for direction, then use the smaller one for timing. Knowing which quarter you are in tells you when expansion or a reversal is more likely.' },
        { type: 'quote', text: 'Know the cycle, and you know when price is likely to move.' },
        { type: 'note', text: 'In the course I go on to the job of each quarter, and how True Open and SSMT help confirm it.' },
      ],
    },
  },
  {
    slug: 'true-open',
    title: 'True Open as a Time Filter',
    icon: '/images/icon-qt.png',
    theme: 'qt',
    module: { en: 'From Module 2 · True Opens', th: 'จาก Module 2 · True Opens' },
    tagline: { en: 'Quarterly Theory', th: 'Quarterly Theory' },
    excerpt: {
      en: 'One price level that tells you which side to look for: above it, think short; below it, think long.',
      th: 'ราคาเดียวที่บอกว่าควรมองฝั่งไหน เหนือ True Open หา Short ต่ำกว่าหา Long',
    },
    body: {
      th: [
        { type: 'p', text: 'True Open คือราคาเปิดของ Quarter ที่ 2 (Q2) ในแต่ละรอบเวลา เป็นจุดที่ช่วง Manipulation เริ่มอย่างเป็นทางการครับ' },
        { type: 'h2', text: 'ใช้เป็นตัวกรองเวลา' },
        { type: 'list', items: [
          'ราคาอยู่เหนือ True Open ให้มองหา Short',
          'ราคาอยู่ต่ำกว่า True Open ให้มองหา Long',
        ] },
        { type: 'p', text: 'เหตุผลคือเราอยากซื้อในราคาที่ถูกกว่าจุดเริ่มของรอบ และขายในราคาที่แพงกว่า กฎข้อเดียวนี้ช่วยตัดเทรดที่เข้าผิดฝั่งออกไปได้เยอะครับ' },
        { type: 'h2', text: 'ก่อนกับหลัง True Open' },
        { type: 'quote', text: 'ก่อน True Open คือ Noise · หลัง True Open คือ Logic ของรอบ' },
        { type: 'p', text: 'การหลอก (Judas Swing) ที่มีความหมาย ต้องเกิดโดยอ้างอิงกับ True Open ถ้าราคาสวิงก่อนถึงเวลา ส่วนใหญ่ยังเป็นแค่ Noise ครับ' },
        { type: 'note', text: 'ในคอร์ส ผมสอนวิธีหา True Open ของแต่ละรอบ รวมถึง Monthly True Open ที่ต้องนับสัปดาห์ให้ถูก และวิธีใช้คู่กับ Judas Swing' },
      ],
      en: [
        { type: 'p', text: 'True Open is the opening price of the second quarter (Q2) of a cycle. It marks the point where the manipulation phase officially starts.' },
        { type: 'h2', text: 'Use it as a time filter' },
        { type: 'list', items: [
          'Price above True Open: look for shorts',
          'Price below True Open: look for longs',
        ] },
        { type: 'p', text: 'The idea is to buy below where the cycle really started and sell above it. That one rule removes a lot of trades taken on the wrong side.' },
        { type: 'h2', text: 'Before and after True Open' },
        { type: 'quote', text: 'Before True Open is noise. After True Open is the logic of the cycle.' },
        { type: 'p', text: 'A meaningful Judas Swing is read against True Open. A swing that happens before it is usually just noise.' },
        { type: 'note', text: 'In the course I show how to find the True Open of each cycle, including the Monthly True Open and which week counts, and how to use it with the Judas Swing.' },
      ],
    },
  },
  {
    slug: 'read-candles-in-threes',
    title: 'Read Candles in Threes',
    icon: '/images/icon-fractal.png',
    theme: 'fractal',
    module: { en: 'From Module 3 · Understand Candlestick', th: 'จาก Module 3 · Understand Candlestick' },
    tagline: { en: 'Fractal Model', th: 'Fractal Model' },
    excerpt: {
      en: 'One candle is a word. Three candles tell the whole story, without needing an indicator.',
      th: 'แท่งเทียนแท่งเดียวเหมือนคำเดียว 3 แท่งถึงเล่าเรื่องได้ครบ โดยไม่ต้องพึ่งอินดิเคเตอร์',
    },
    body: {
      th: [
        { type: 'p', text: 'Price Action คือการอ่านแรงซื้อขายจากแท่งเทียนโดยตรง ไม่ต้องพึ่งอินดิเคเตอร์ เริ่มจากดูแท่งเทียนให้ออกก่อนว่าแท่งไหนแข็งแรง แท่งไหนลังเลครับ' },
        { type: 'h2', text: 'แข็งแรง หรือ ลังเล' },
        { type: 'list', items: [
          'ตัวแท่งยาว ไส้สั้น = แข็งแรง ฝั่งนั้นคุมราคาอยู่',
          'ตัวแท่งสั้น ไส้ยาว = ลังเล ยังไม่มีใครชนะขาด',
        ] },
        { type: 'h2', text: 'ดูเป็นชุด 3 แท่ง' },
        { type: 'p', text: 'แท่งเดียวบอกได้แค่ช่วงสั้น ๆ แต่ 3 แท่งต่อกันเล่าเรื่องได้ครบกว่า ว่าราคากำลังไปต่อ หรือกำลังจะกลับตัว รูปแบบกลับตัว 3 แท่ง (3 Candle Reversal) ช่วยคาดการณ์แท่งถัดไปได้น่าเชื่อถือกว่าดูแท่งเดียวครับ' },
        { type: 'quote', text: '3 แท่งเล่าเรื่องได้ครบ น่าเชื่อถือกว่าแท่งเดียว' },
        { type: 'note', text: 'ในคอร์ส ผมต่อยอดเรื่องนี้เป็นการนับแท่ง Candle 1 ถึง 4 เพื่อหา Swing Point และจุดเข้า แล้วยืนยันด้วย CISD ครับ' },
      ],
      en: [
        { type: 'p', text: 'Price action means reading buying and selling pressure straight from the candles, without leaning on indicators. It starts with telling a strong candle from a hesitant one.' },
        { type: 'h2', text: 'Strong or hesitant' },
        { type: 'list', items: [
          'Long body, short wicks = strength. That side is in control.',
          'Short body, long wicks = hesitation. Nobody has won yet.',
        ] },
        { type: 'h2', text: 'Read them in sets of three' },
        { type: 'p', text: 'One candle only tells a short part of the story. Three in a row show whether price is continuing or turning. A 3 candle reversal predicts the next candle far better than a single candle does.' },
        { type: 'quote', text: 'Three candles tell the whole story. One candle does not.' },
        { type: 'note', text: 'In the course this becomes numbering candles 1 to 4 to find swing points and entries, confirmed with CISD.' },
      ],
    },
  },
]
