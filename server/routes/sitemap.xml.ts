// Sitemap for the static deploy. `nitro.prerender` (nuxt.config.ts) prerenders
// this route, so the shipped /sitemap.xml is generated from the same source of
// truth as the app: the route list below plus the i18n locale config.
//
// `siteUrl` is the deployed origin (NUXT_PUBLIC_SITE_URL / Netlify `URL`). When
// it is empty -- a local build with no env -- the <loc> values fall back to
// root-relative paths rather than pointing at a guessed domain (audit H8).

const LOCALES = [
  { code: 'fr', prefix: '' },
  { code: 'en', prefix: '/en' }
] as const

// Route -> crawl priority. The about sub-pages are low-traffic deep links.
const ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/galerie', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/history', priority: '0.5', changefreq: 'yearly' },
  { path: '/about/mission', priority: '0.5', changefreq: 'yearly' },
  { path: '/about/team', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' }
]

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const origin = String(config.public.siteUrl || '').replace(/\/+$/, '')

  // `prefix_except_default`: the default locale has no prefix, the others do.
  const localize = (prefix: string, path: string) => (path === '/' ? prefix || '/' : `${prefix}${path}`)
  const absolute = (path: string) => `${origin}${path}`
  const lastmod = new Date().toISOString().slice(0, 10)

  const entries = ROUTES.flatMap((route) =>
    LOCALES.map((locale) => {
      const alternates = LOCALES.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${escapeXml(
            absolute(localize(alt.prefix, route.path))
          )}"/>`
      ).join('\n')

      return [
        '  <url>',
        `    <loc>${escapeXml(absolute(localize(locale.prefix, route.path)))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        alternates,
        // x-default advertises the default locale's URL to unmatched visitors.
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
          absolute(localize(LOCALES[0].prefix, route.path))
        )}"/>`,
        '  </url>'
      ].join('\n')
    })
  )

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    ''
  ].join('\n')
})
