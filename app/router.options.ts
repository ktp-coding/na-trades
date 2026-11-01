import type { RouterConfig } from '@nuxt/schema'

// Scrolling after a page change. All of it goes through the motion plugin so the smooth
// scroller and the browser never pull in different directions.
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const toHash = nuxtApp.$scrollToHash as ((h: string) => void) | undefined
    const toTop = nuxtApp.$scrollToTop as ((top?: number, smooth?: boolean) => void) | undefined
    const samePage = to.path === from.path
    if (samePage && to.hash === from.hash && !savedPosition) return false

    const run = () => {
      if (to.hash && !savedPosition && toHash) toHash(to.hash)
      else if (toTop) toTop(savedPosition?.top ?? 0, samePage)
      else return savedPosition ?? (to.hash ? { el: to.hash, top: 96 } : { top: 0 })
      return false
    }
    if (samePage) return run()
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', () => setTimeout(() => resolve(run()), 0))
    })
  },
}
