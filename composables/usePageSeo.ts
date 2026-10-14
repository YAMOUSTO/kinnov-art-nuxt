import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

interface PageSeoOptions {
  /** i18n key for the page title (rendered without the site suffix). */
  titleKey: string
  /** i18n key for the meta description. */
  descriptionKey: string
  /** Optional interpolation params shared by both keys (e.g. `{ section }`). */
  params?: MaybeRefOrGetter<Record<string, unknown>>
  /** Root-relative path to a page-specific social image. */
  image?: string
}

/**
 * Centralised per-page SEO: a localized title + description plus the Open Graph
 * and Twitter equivalents the previous bare `useHead` blocks omitted.
 *
 * Canonical, hreflang alternates, og:locale and og:url are emitted once,
 * globally, by `useLocaleHead()` in `app.vue`; this composable deliberately does
 * not duplicate them. `og:image` is made absolute only when a site origin is
 * configured (see `siteUrl` in nuxt.config.ts).
 */
export function usePageSeo(options: PageSeoOptions) {
  const { t } = useI18n()
  const config = useRuntimeConfig()

  useHead(() => {
    const params = toValue(options.params) ?? {}
    const title = t(options.titleKey, params)
    const description = t(options.descriptionKey, params)

    const origin = String(config.public.siteUrl || '').replace(/\/+$/, '')
    const imagePath = options.image || '/og/og-default.jpg'
    const image = origin ? `${origin}${imagePath}` : imagePath

    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image }
      ]
    }
  })
}
