/**
 * Single owner of the `.scroll-reveal` IntersectionObserver.
 *
 * This replaces the previous per-component `useScrollAnimation()` composable,
 * which built a *new* IntersectionObserver on every mount and raced the
 * `page:finish` hook here. One observer now serves the whole app.
 */
import { nextTick } from 'vue'

const REVEAL_SELECTOR = '.scroll-reveal:not(.is-visible)'

const OBSERVER_OPTIONS = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
} as const

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const observeElements = () => {
    if (!observer) return
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer!.observe(el))
  }

  if (import.meta.client && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      OBSERVER_OPTIONS
    )
  }

  nuxtApp.hook('app:mounted', () => {
    observeElements()
  })

  // `page:finish` fires once the new page component has mounted, so a single
  // nextTick is enough. The previous `setTimeout(100)` + `setTimeout(500)`
  // fallback pair existed to paper over racing the DOM update.
  nuxtApp.hook('page:finish', async () => {
    await nextTick()
    observeElements()
  })

  if (import.meta.client) {
    // Without this the observer outlives the app and keeps closures alive.
    window.addEventListener('beforeunload', () => observer?.disconnect())
  }
})
