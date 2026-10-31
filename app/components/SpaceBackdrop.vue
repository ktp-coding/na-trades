<script setup lang="ts">
// Deep-space background for hero sections: drifting, twinkling stars in three depth
// layers, a few bright stars with a soft flare, an occasional shooting star, and slow
// nebula clouds. Pauses when off screen; draws one still frame for reduced motion.
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
  let nextMeteor = performance.now() + 1500

  const seed = () => {
    const count = Math.round(((w * h) / 2600) * props.density)
    stars = Array.from({ length: count }, () => {
      const depth = Math.random() < 0.6 ? 0.3 : Math.random() < 0.75 ? 0.6 : 1
      const bright = depth === 1 && Math.random() < 0.08
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (bright ? 1.4 : 0.4) + Math.random() * depth * 1.1,
        depth,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        // Mostly white-blue, some warm gold, a few violet.
        hue: Math.random() < 0.15 ? 42 : Math.random() < 0.2 ? 265 : 215,
        bright,
      }
    })
  }

  const resize = () => {
    const box = wrap.value!.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = box.width
    h = box.height
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    seed()
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
      const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase)
      const a = (0.25 + 0.75 * s.depth) * tw
      ctx!.fillStyle = `hsla(${s.hue}, 90%, ${s.hue === 215 ? 92 : 80}%, ${a})`
      ctx!.beginPath()
      ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx!.fill()
      if (s.bright) {
        const g = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7)
        g.addColorStop(0, `hsla(${s.hue}, 100%, 85%, ${0.45 * tw})`)
        g.addColorStop(1, 'transparent')
        ctx!.fillStyle = g
        ctx!.fillRect(s.x - s.r * 7, s.y - s.r * 7, s.r * 14, s.r * 14)
        // Thin cross flare.
        ctx!.strokeStyle = `hsla(${s.hue}, 100%, 90%, ${0.35 * tw})`
        ctx!.lineWidth = 0.6
        const L = s.r * 6 * tw
        ctx!.beginPath()
        ctx!.moveTo(s.x - L, s.y)
        ctx!.lineTo(s.x + L, s.y)
        ctx!.moveTo(s.x, s.y - L)
        ctx!.lineTo(s.x, s.y + L)
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
      g.addColorStop(0.3, `rgba(165, 180, 252, ${0.4 * fade})`)
      g.addColorStop(1, 'rgba(165, 180, 252, 0)')
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

  const ro = new ResizeObserver(resize)
  ro.observe(wrap.value!)
  const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting))
  io.observe(wrap.value!)
  resize()
  if (!reduce) raf = requestAnimationFrame(loop)

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
  })
})
</script>

<template>
  <div ref="wrap" aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="nebula nebula-a" />
    <div class="nebula nebula-b" />
    <div class="nebula nebula-c" />
    <canvas ref="canvas" class="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
  </div>
</template>

<style scoped>
.nebula {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
}
.nebula-a {
  left: -10%;
  top: 5%;
  width: 55%;
  height: 60%;
  background: radial-gradient(closest-side, rgba(99, 102, 241, 0.35), transparent);
  animation: drift-a 26s ease-in-out infinite alternate;
}
.nebula-b {
  right: -12%;
  top: 0;
  width: 50%;
  height: 70%;
  background: radial-gradient(closest-side, rgba(168, 85, 247, 0.28), transparent);
  animation: drift-b 32s ease-in-out infinite alternate;
}
.nebula-c {
  left: 30%;
  top: 45%;
  width: 40%;
  height: 45%;
  background: radial-gradient(closest-side, rgba(45, 212, 191, 0.14), transparent);
  animation: drift-a 38s ease-in-out infinite alternate-reverse;
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
}
</style>
