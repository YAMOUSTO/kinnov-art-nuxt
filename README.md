# Kinnov'art - Nuxt.js Website

A professional, bilingual (French/English) website for Kinnov'art creative center, showcasing furniture design, artist management, and audiovisual production services.

## 🌟 Features

- ✅ **Bilingual Support**: French (primary, unprefixed) and English (`/en/`) with seamless language switching
- ✅ **Dropdown Navigation**: Professional header with dropdown menus for Gallery, Creators, Blog, and About
- ✅ **SCSS Design System**: Complete design tokens with responsive breakpoints and dark mode
- ✅ **6 Main Pages**: Homepage, Gallery, Creators, Blog, About, Contact
- ✅ **Advanced Features**: Lightbox gallery, search functionality, scroll animations
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
│   └── ui/              # Button, Card, Modal, etc.
├── composables/          # Reusable logic
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

1. **Homepage** - Hero section, services, featured projects and creators
2. **Gallery** - Filterable portfolio with lightbox (Furniture, Art, Audiovisual)
3. **Creators** - Talent showcase (Featured, New Talents, Alumni)
4. **Blog** - News, tutorials, and events with search
5. **About** - Mission, team, and location
6. **Contact** - Contact form (opens in the visitor's email client) and location

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
