# Kinnov'art - Nuxt.js Website

A professional, bilingual (French/English) website for Kinnov'art creative center in Nongo, Conakry. The site is built around the studio's five real service lines: set design, tyre furniture, kiosk making, space design and artistic production.

## 🌟 Features

- ✅ **Bilingual Support**: French (primary, unprefixed) and English (`/en/`) with seamless language switching
- ✅ **Five Services Focus**: every page drives toward the studio's actual offering
- ✅ **SCSS Design System**: Complete design tokens with responsive breakpoints and dark mode
- ✅ **5 Main Pages**: Homepage, Services, About (+ history/mission/team), Contact
- ✅ **In-page service index**: numbered jump nav on `/services`, each card links to its anchor
- ✅ **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- ✅ **SEO Optimized**: Localized meta tags, `hreflang` alternates, canonical URLs, semantic HTML, and accessibility features
- ✅ **Structured Data**: schema.org `@graph` (Organization + LocalBusiness + WebSite), locale-reactive, driven by the real runtime config
- ✅ **Sitemap & robots**: `/sitemap.xml` and `/robots.txt` are server routes, prerendered at build time from one route list
- ✅ **Social cards**: per-page Open Graph / Twitter images (1200×630) plus a PWA manifest and generated app icons
- ✅ **Graceful degradation**: unconfigured social links, map and site origin are omitted rather than guessed — no dead links, no wrong domains

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
kinnov-art-nuxt/
├── assets/scss/          # SCSS design system
├── components/           # Vue components
│   ├── layout/          # Header, Footer
│   └── ui/              # Button, Section, PageHeader, ServiceIcon, etc.
├── composables/          # Reusable logic (useServices, useTeam, useTheme, usePageSeo)
├── i18n/locales/         # i18n translations (FR/EN)
├── pages/                # Route pages
├── public/               # Deployed static assets (icons, og cards, webp images)
├── scripts/              # Build-time helpers (brand assets, 404 finalize)
├── server/routes/        # Prerendered /robots.txt and /sitemap.xml
├── source-images/        # Owner's original photos — NOT deployed (gitignored)
├── types/                # TypeScript definitions
├── error.vue             # Localized 404/500 page
└── nuxt.config.ts        # Nuxt configuration
```

## 🎨 Design System

### Colors

Light and dark themes are defined as CSS custom properties in `assets/scss/_variables.scss`.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-primary` | `#D4AF37` Classic Gold | `#F0D588` |
| `--color-secondary` | `#000000` Pure Black | `#FFFFFF` |
| `--color-accent` | `#B91C1C` Deep Red | `#EF4444` |
| `--color-background` | `#FFFFFF` Pure White | `#0A0A0A` Rich Ebony |
| `--color-text` | `#000000` Pure Black | `#FAFAFA` |

### Typography
- **Headings**: Montserrat
- **Body**: Open Sans

## 📄 Pages

1. **Homepage** — hero, brand intro, and the five services as linked cards with their realisations
2. **Services** — the five service lines in detail, with a numbered jump nav and per-service anchors
3. **About** — mission and location, plus `/about/history`, `/about/mission` and `/about/team`
4. **Contact** — contact form (opens in the visitor's email client) and location

`composables/useServices.ts` is the single source of truth for the offering. To change or
reorder the services, edit that file and the matching `services.items.*` keys in
`i18n/locales/fr.json` and `i18n/locales/en.json`.

## 🛠️ Technologies

- **Framework**: Nuxt 4
- **Styling**: SCSS
- **i18n**: @nuxtjs/i18n (v10)
- **Images**: @nuxt/image
- **TypeScript**: Full type safety
- **Utilities**: @vueuse/nuxt

> **Note:** there is no backend in this repository. The contact form validates input and
> opens WhatsApp with the message pre-filled (phone number in `runtimeConfig.public.whatsapp`);
> a floating WhatsApp button is available on every page. It does not send messages on the server.

## 🚀 Deployment

The site is **fully static**: `nuxt generate` prerenders every route into `.output/public`,
including `/sitemap.xml` and `/robots.txt` (see `nitro.prerender` in `nuxt.config.ts`).

Netlify is configured in `netlify.toml`:

| Setting | Value |
| --- | --- |
| Build command | `npm run generate` |
| Publish directory | `.output/public` |
| Node version | `22` (also in `.nvmrc`; must satisfy `^20.19.0 \|\| >=22.12.0`) |

### Environment

Every variable is optional — with none set the site still builds, it just omits absolute
SEO URLs and hides unconfigured social links / the map rather than guessing.
See [`.env.example`](.env.example) for the full list. The important one:

- `NUXT_PUBLIC_SITE_URL` — the deployed origin, no trailing slash. Drives canonical URLs,
  `hreflang`, `og:url`/`og:image`, the sitemap and the `Sitemap:` line in `robots.txt`.
  **Netlify fills this automatically** from its injected `URL` variable; set it explicitly
  on any other host.

Deploy previews and branch deploys get `X-Robots-Tag: noindex` from `netlify.toml`, so they
can never compete with production in search results.

### Custom domain

The site answers on `https://kinnovart.netlify.app`. When `kinnovart.com` is attached in
Netlify (Domain management → *Add a domain*, then **set it as the primary domain**), Netlify
injects the new origin as `URL`, so canonical URLs, `hreflang`, `og:url`/`og:image`, the
sitemap and the `Sitemap:` line in `robots.txt` all follow with **no code change** — trigger a
redeploy so the prerendered HTML picks it up. Set `NUXT_PUBLIC_SITE_URL` explicitly instead if
the site is ever served from another origin.

### URL behaviour

- A route is prerendered as `services.html` and served at `/services` with a **200** — the
  extensionless URL the canonical tag advertises. This relies on
  `nitro.prerender.autoSubfolderIndex: false`; the default (`services/index.html`) makes
  Netlify answer `/services` with a 301 to `/services/`.
- A trailing slash is normalised by Netlify to the extensionless URL and an unknown path
  returns a real 404. Both are Netlify's own behaviour.
- **Do not add redirect rules** to `netlify.toml` or a `public/_redirects` file. Any custom
  rule makes Netlify answer an unmatched path with a 301 to *itself*, so a typo'd address
  spins until the browser reports "too many redirects" — a catch-all `404` rule does not
  prevent it. The reproduction is recorded in `netlify.toml`.

### Regenerating brand assets

App icons (`public/icons/`) and social cards (`public/og/`) are committed. To rebuild them
after changing the wordmark or source photos:

```bash
node scripts/generate-brand-assets.mjs
```

It reads the wordmark from `public/logo-transparent.png` and the tracked webp derivatives in
`public/images/webp/`. The owner's original uploads live in `source-images/`, which is
**gitignored and never deployed** — `public/` ships only the webp images the site references.

### Notes

- `.planning/DESIGN-AUDIT.md` carries the verified per-item status of the earlier design audit.
- A few items are intentionally waiting on owner input (real social profile URLs, the
  authoritative team roster, exact map coordinates); the site degrades gracefully without them.

## 📝 License

© 2026 Kinnov'art. All rights reserved.

## 📍 Location

Nongo, Maison des Jeunes  
Face à la Mosquée Bilal Mansour Fadiga  
Conakry, Guinée

---

**Built with ❤️ for Kinnov'art**
