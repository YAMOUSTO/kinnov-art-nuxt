// robots.txt for the static deploy. Prerendered alongside /sitemap.xml
// (nuxt.config.ts `nitro.prerender`); public/robots.txt was removed so this
// route is the single source of truth.
//
// The Sitemap line needs an absolute origin. When `siteUrl` is empty (local
// build with no env) it is omitted rather than emitting a wrong domain.

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const origin = String(config.public.siteUrl || '').replace(/\/+$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return ['User-agent: *', 'Allow: /', ...(origin ? ['', `Sitemap: ${origin}/sitemap.xml`] : []), ''].join('\n')
})
