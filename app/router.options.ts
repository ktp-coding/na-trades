import type { RouterConfig } from '@nuxt/schema'

// Scrolling after a page change. Hash targets are handled by the motion plugin so the
// section lands just under the fixed header (and works with smooth scroll).
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const samePage = to.path === from.path
    if (samePage && !to.hash) return false
    if (samePage && to.hash === from.hash && !savedPosition) return false
    return new Promise((resolve) => {
      const done = () => {
        if (to.hash && !savedPosition) {
          const go = nuxtApp.$scrollToHash as ((h: string) => void) | undefined
          if (go) {
            go(to.hash)
            return resolve(false)
          }
          return resolve({ el: to.hash, top: 96 })
        }
        resolve(savedPosition ?? { top: 0 })
      }
      if (samePage) done()
      else nuxtApp.hooks.hookOnce('page:finish', () => setTimeout(done, 0))
    })
  },
}
