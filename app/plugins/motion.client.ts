// Smooth scrolling (Lenis), fade-in of sections as they scroll into view, and the
// soft gold glow that follows the pointer over cards. All of it is skipped when the
// visitor asks the system for reduced motion.
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // --- Card glow follows the pointer (desktop only) ---------------------------
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener(
      'pointermove',
      (e) => {
        const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      },
      { passive: true },
    )
  }

  if (reduce) return { provide: { lenis: null as Lenis | null } }

  // --- Smooth scroll -----------------------------------------------------------
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } })
  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // --- Reveal sections on scroll ----------------------------------------------
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        io.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  const setupReveal = () => {
    io.disconnect()
    // Only sections that start below the fold, so nothing on screen blinks on load.
    for (const el of document.querySelectorAll<HTMLElement>('main section, footer')) {
      if (el.classList.contains('is-visible')) continue
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue
      el.classList.add('reveal')
      io.observe(el)
    }
  }
  nuxtApp.hook('page:finish', () => {
    lenis.resize()
    requestAnimationFrame(setupReveal)
  })

  return { provide: { lenis: lenis as Lenis | null } }
})
