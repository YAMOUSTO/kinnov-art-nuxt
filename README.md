# Kinnov'art - Nuxt.js Website

A professional, bilingual (French/English) website for Kinnov'art creative center in Nongo, Conakry. The site is built around the studio's five real service lines: set design, tyre furniture, wig making, space design and artistic production.

## 🌟 Features

- ✅ **Bilingual Support**: French (primary, unprefixed) and English (`/en/`) with seamless language switching
- ✅ **Five Services Focus**: every page drives toward the studio's actual offering
- ✅ **SCSS Design System**: Complete design tokens with responsive breakpoints and dark mode
- ✅ **5 Main Pages**: Homepage, Services, About (+ history/mission/team), Contact
- ✅ **In-page service index**: numbered jump nav on `/services`, each card links to its anchor
- ✅ **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- ✅ **SEO Optimized**: Localized meta tags, `hreflang` alternates, semantic HTML, and accessibility features

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
├── composables/          # Reusable logic (useServices, useTeam, useTheme)
├── i18n/locales/         # i18n translations (FR/EN)
├── pages/                # Route pages
├── types/                # TypeScript definitions
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
> hands off to the visitor's email client via `mailto:`; it does not send messages on the server.

## 📝 License

© 2026 Kinnov'art. All rights reserved.

## 📍 Location

Nongo, Maison des Jeunes  
Face à la Mosquée Bilal Mansour Fadiga  
Conakry, Guinée

---

**Built with ❤️ for Kinnov'art**
