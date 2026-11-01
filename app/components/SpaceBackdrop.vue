<script setup lang="ts">
// Site-wide deep-space background, fixed behind every page: drifting, twinkling stars
// in three depth layers, a few bright stars with a soft flare, an occasional shooting
// star, and nebula clouds. Scrolling moves the layers at different speeds, so new
// clouds and a distant planet come into view as you go down the page.
// Draws one still frame (no parallax) for reduced motion.
const props = withDefaults(defineProps<{ density?: number }>(), { density: 1 })

const wrap = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

interface Star { x: number; y: number; r: number; depth: number; phase: number; speed: number; hue: number; bright: boolean }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; max: number }

onMounted(() => {
  const el = canvas.value!
  const ctx = el.getContext('2d')
  if (!ctx) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let w = 0
  let h = 0
  let dpr = 1
  let stars: Star[] = []
  const meteors: Meteor[] = []
  let raf = 0
  let visible = true
  let scrollY = window.scrollY
  const onScroll = () => {
    scrollY = window.scrollY
    if (reduce) return
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    wrap.value?.style.setProperty('--p', String(Math.min(1, scrollY / max)))
  }
  let nextMeteor = performance.now() + 1500
  let seededWidth = 0

  const seed = () => {
    const count = Math.round(((w * h) / 2300) * props.density)
    stars = Array.from({ length: count }, () => {
      const depth = Math.random() < 0.6 ? 0.3 : Math.random() < 0.75 ? 0.6 : 1
      const bright = depth === 1 && Math.random() < 0.06
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (bright ? 1.4 : 0.4) + Math.random() * depth * 1.1,
        depth,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        // Mostly white-blue, some warm gold, a few violet.
        // Black-and-white sky: stars are white with a slight cool or warm tint.
        hue: Math.random() < 0.5 ? 220 : 40,
        bright,
      }
    })
  }

  const resize = () => {
    const box = { width: window.innerWidth, height: window.innerHeight }
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = box.width
    h = box.height
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    // Mobile browsers resize the viewport when the URL bar hides; only reseed on a
    // real width change so the stars don't jump.
    if (box.width !== seededWidth) {
      seededWidth = box.width
      seed()
    }
    if (reduce) draw(0)
  }

  const spawnMeteor = () => {
    const fromLeft = Math.random() < 0.5
    const angle = (fromLeft ? 0.35 : Math.PI - 0.35) + (Math.random() - 0.5) * 0.3
    const speed = 9 + Math.random() * 6
    meteors.push({
      x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
      y: Math.random() * h * 0.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      max: 50 + Math.random() * 30,
    })
  }

  function draw(t: number) {
    ctx!.clearRect(0, 0, w, h)
    const time = t / 1000
    for (const s of stars) {
      // Slow drift to the left, faster for closer stars (parallax).
      if (!reduce) {
        s.x -= s.depth * 0.06
        if (s.x < -4) s.x = w + 4
      }
      // Scroll parallax: closer stars move further. Wrap around the viewport.
      const y = reduce ? s.y : (((s.y - scrollY * s.depth * 0.25) % h) + h) % h
      const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase)
      const a = (0.15 + 0.55 * s.depth) * tw
      ctx!.fillStyle = `hsla(${s.hue}, 10%, 96%, ${a})`
      ctx!.beginPath()
      ctx!.arc(s.x, y, s.r, 0, Math.PI * 2)
      ctx!.fill()
      if (s.bright) {
        const g = ctx!.createRadialGradient(s.x, y, 0, s.x, y, s.r * 7)
        g.addColorStop(0, `hsla(${s.hue}, 10%, 95%, ${0.3 * tw})`)
        g.addColorStop(1, 'transparent')
        ctx!.fillStyle = g
        ctx!.fillRect(s.x - s.r * 7, y - s.r * 7, s.r * 14, s.r * 14)
        // Thin cross flare.
        ctx!.strokeStyle = `hsla(${s.hue}, 10%, 97%, ${0.25 * tw})`
        ctx!.lineWidth = 0.6
        const L = s.r * 6 * tw
        ctx!.beginPath()
        ctx!.moveTo(s.x - L, y)
        ctx!.lineTo(s.x + L, y)
        ctx!.moveTo(s.x, y - L)
        ctx!.lineTo(s.x, y + L)
        ctx!.stroke()
      }
    }

    if (reduce) return
    if (t > nextMeteor) {
      spawnMeteor()
      nextMeteor = t + 3500 + Math.random() * 6000
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i]!
      m.x += m.vx
      m.y += m.vy
      m.life++
      const fade = 1 - m.life / m.max
      const tail = 14
      const g = ctx!.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail)
      g.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`)
      g.addColorStop(0.3, `rgba(220, 220, 230, ${0.4 * fade})`)
      g.addColorStop(1, 'rgba(220, 220, 230, 0)')
      ctx!.strokeStyle = g
      ctx!.lineWidth = 1.4
      ctx!.lineCap = 'round'
      ctx!.beginPath()
      ctx!.moveTo(m.x, m.y)
      ctx!.lineTo(m.x - m.vx * tail, m.y - m.vy * tail)
      ctx!.stroke()
      if (m.life >= m.max) meteors.splice(i, 1)
    }
  }

  const loop = (t: number) => {
    if (visible) draw(t)
    raf = requestAnimationFrame(loop)
  }

  const onVis = () => (visible = document.visibilityState === 'visible')
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVis)
  resize()
  onScroll()
  if (!reduce) raf = requestAnimationFrame(loop)

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onVis)
  })
})
</script>

<template>
  <div ref="wrap" aria-hidden="true" class="pointer-events-none fixed inset-0 overflow-hidden">
    <div class="field">
      <div class="nebula nebula-a" />
      <div class="nebula nebula-b" />
      <div class="nebula nebula-c" />
      <div class="nebula nebula-d" />
      <div class="nebula nebula-e" />
      <div class="planet"><span class="ring" /></div>
    </div>
    <canvas ref="canvas" class="absolute inset-0 h-full w-full" />
  </div>
</template>

<style scoped>
/* A tall layer that slides up as the page scrolls (--p goes 0 to 1). */
.field {
  position: absolute;
  inset: 0 0 auto 0;
  height: 260vh;
  transform: translate3d(0, calc(var(--p, 0) * -160vh), 0);
  will-change: transform;
}
.nebula {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
}
.nebula-a {
  left: -10%;
  top: 2%;
  width: 55%;
  height: 24%;
  background: radial-gradient(closest-side, rgba(59, 91, 219, 0.18), transparent);
  animation: drift-a 26s ease-in-out infinite alternate;
}
.nebula-b {
  right: -12%;
  top: 0;
  width: 50%;
  height: 28%;
  background: radial-gradient(closest-side, rgba(124, 77, 219, 0.16), transparent);
  animation: drift-b 32s ease-in-out infinite alternate;
}
.nebula-c {
  left: 30%;
  top: 22%;
  width: 40%;
  height: 18%;
  background: radial-gradient(closest-side, rgba(31, 138, 138, 0.17), transparent);
  animation: drift-a 38s ease-in-out infinite alternate-reverse;
}
.nebula-d {
  right: -8%;
  top: 46%;
  width: 55%;
  height: 26%;
  background: radial-gradient(closest-side, rgba(31, 138, 138, 0.17), transparent);
  animation: drift-b 34s ease-in-out infinite alternate;
}
.nebula-e {
  left: -14%;
  top: 70%;
  width: 60%;
  height: 28%;
  background: radial-gradient(closest-side, rgba(124, 77, 219, 0.15), transparent);
  animation: drift-a 40s ease-in-out infinite alternate;
}
.planet {
  position: absolute;
  left: 8%;
  top: 52%;
  width: clamp(70px, 9vw, 130px);
  aspect-ratio: 1;
  border-radius: 9999px;
  background: radial-gradient(circle at 32% 30%, rgba(240, 240, 245, 0.6), rgba(120, 120, 130, 0.35) 45%, rgba(10, 10, 12, 0.95) 75%);
  box-shadow: 0 0 60px 6px rgba(255, 255, 255, 0.1), inset -12px -10px 30px rgba(0, 0, 0, 0.85);
  opacity: 0.35;
}
.ring {
  position: absolute;
  left: -40%;
  top: 38%;
  width: 180%;
  height: 24%;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: rgba(255, 255, 255, 0.06);
  transform: rotate(-16deg);
}
@keyframes drift-a {
  to {
    transform: translate(6%, 4%) scale(1.12);
    opacity: 0.75;
  }
}
@keyframes drift-b {
  to {
    transform: translate(-5%, 6%) scale(0.92);
    opacity: 0.8;
  }
}
@media (prefers-reduced-motion: reduce) {
  .nebula {
    animation: none;
  }
  .field {
    transform: none;
  }
}
</style>
