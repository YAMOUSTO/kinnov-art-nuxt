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

  const revealPage = async () => {
    await nextTick()
    observeElements()
  }

  nuxtApp.hook('app:mounted', () => {
    observeElements()
  })

  // With `pageTransition.mode: 'out-in'` (nuxt.config), `page:finish` fires
  // while the *old* page is still in the DOM: the outgoing page has not left
  // yet and the incoming one is not inserted. Observing only here therefore
  // re-observes the leaving page and the new page never gets an observer —
  // every `.scroll-reveal` element stays at `opacity: 0` and the page renders
  // blank. `page:transition:finish` runs from the transition's `onAfterLeave`,
  // i.e. right when the new page is inserted, so one nextTick lands after the
  // DOM swap. Keep both hooks: `page:transition:finish` never fires when a
  // route disables the page transition, where `page:finish` alone is correct.
  nuxtApp.hook('page:finish', revealPage)
  nuxtApp.hook('page:transition:finish', revealPage)

  if (import.meta.client) {
    // Without this the observer outlives the app and keeps closures alive.
    window.addEventListener('beforeunload', () => observer?.disconnect())
  }
})
