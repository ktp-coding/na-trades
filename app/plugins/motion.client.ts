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

  // --- Smooth scroll -----------------------------------------------------------
  const lenis = reduce ? null : new Lenis({ lerp: 0.1 })

  // --- Jump to #sections -------------------------------------------------------
  // Lands the section just below the fixed header. Uses the layout position
  // (offsetTop), not getBoundingClientRect, so a section still sliding in with the
  // reveal animation doesn't throw the landing spot off.
  const scrollToHash = (hash: string, immediate = false) => {
    let el: HTMLElement | null = null
    try {
      el = document.getElementById(decodeURIComponent(hash.replace(/^#/, '')))
    } catch {}
    if (!el) return false
    el.classList.add('is-visible')
    let y = 0
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop
    const header = document.querySelector('header')?.getBoundingClientRect().height ?? 80
    const top = Math.max(0, y - header - 16)
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(top, { immediate, force: true })
    } else window.scrollTo({ top, behavior: 'auto' })
    return true
  }

  // Same-page links (href="#plans", or NuxtLink to "#contact"): scroll here instead of
  // letting the browser and the router each jump on their own.
  document.addEventListener(
    'click',
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!a || (a.target && a.target !== '_self')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
      if (!scrollToHash(url.hash)) return
      e.preventDefault()
      if (location.hash !== url.hash) history.pushState(history.state, '', url.hash)
    },
    true,
  )

  // Arriving with a hash (from another page or a direct link): wait for the page to
  // render, jump, then correct once more after fonts and images settle.
  const settleOnHash = (hash: string) => {
    requestAnimationFrame(() => {
      scrollToHash(hash, true)
      setTimeout(() => scrollToHash(hash, true), 350)
      document.fonts?.ready.then(() => scrollToHash(hash, true))
    })
  }
  nuxtApp.provide('scrollToHash', settleOnHash)
  // Plain scroll for page changes. Going through Lenis (immediate) also cancels any
  // smooth scroll still easing from the old page, which otherwise drags the new page
  // back down to where you were.
  nuxtApp.provide('scrollToTop', (top = 0, smooth = false) => {
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(top, { immediate: !smooth, force: true })
    } else window.scrollTo({ top, behavior: 'auto' })
  })
  if (location.hash) nuxtApp.hooks.hookOnce('page:finish', () => settleOnHash(location.hash))

  if (!lenis) return { provide: { lenis: null as Lenis | null } }
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
