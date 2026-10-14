// https://nuxt.com/docs/api/configuration/nuxt-config

// Absolute origin used for canonical URLs, hreflang alternates, og:url/og:image,
// the sitemap and robots.txt. Netlify injects `URL` at build time (the primary
// site URL — deploy previews therefore point their canonical at production,
// which is deliberate: netlify.toml sends `X-Robots-Tag: noindex` on previews so
// they can never compete with the real site). A self-hosted build must set
// NUXT_PUBLIC_SITE_URL explicitly (e.g. https://www.kinnovart.com). When it is
// empty the SEO URLs stay relative instead of pointing at a guessed domain.
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.NUXT_PUBLIC_I18N_BASE_URL ||
  process.env.URL ||
  ''
).replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  // Components Configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // i18n Configuration
  i18n: {
    locales: [
      {
        code: 'fr',
        // `language` (BCP 47), not `iso` -- v10 renamed the field. Without it
        // useLocaleHead() silently emits no hreflang alternates ("Locale
        // `language` ISO code is required to generate alternate link").
        language: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: './locales',
    defaultLocale: 'fr',
    // Canonical/hreflang URLs are absolute, so they need the deployed origin
    // (see `siteUrl` above). When it is empty i18n emits relative URLs rather
    // than pointing at a guessed domain.
    baseUrl: siteUrl,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Runtime configuration
  // Values can be overridden per deployment with NUXT_PUBLIC_* env vars.
  // Social links and the map embed default to empty/disabled because the
  // previous hardcoded values were guesses that resolved to dead pages
  // (audit H8) and a stock Unsplash photo of a map that was not a map at all
  // (audit L12).
  runtimeConfig: {
    public: {
      // Deployed origin (no trailing slash). Used to build absolute canonical,
      // og:image, sitemap and robots URLs. Overridable at runtime with
      // NUXT_PUBLIC_SITE_URL.
      siteUrl,
      contactEmail: 'contact@kinnovart.com',
      // WhatsApp number in international format, digits only (for wa.me links).
      // Overridable per deployment with NUXT_PUBLIC_WHATSAPP.
      whatsapp: '224611464609',
      social: {
        facebook: 'https://www.facebook.com/KAALAPROD',
        instagram: '',
        tiktok: '',
        youtube: '',
        linkedin: ''
      },
      map: {
        // Nongo, Conakry. Set `embedUrl` to '' to hide the map entirely.
        embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-13.5984%2C9.6312%2C-13.5584%2C9.6512&layer=mapnik&marker=9.6412%2C-13.5784',
        linkUrl: 'https://www.openstreetmap.org/?mlat=9.6412&mlon=-13.5784#map=17/9.6412/-13.5784',
        label: "Kinnov'art, Nongo, Conakry"
      }
    }
  },

  // Image Configuration
  image: {
    domains: ['images.unsplash.com', 'i.pravatar.cc']
  },

  // CSS Configuration
  css: [
    '@/assets/scss/main.scss'
  ],

  // Vite Configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_mixins.scss" as *;
          `
        }
      }
    }
  },

  // App Configuration
  app: {
    head: {
      // NOTE: htmlAttrs.lang, the site title and the meta description are all
      // driven by the active locale in app.vue via useLocaleHead() + t().
      // Do not hardcode them here or they will never change language.
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        // PWA / mobile-web-app chrome (see public/manifest.webmanifest).
        { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0A0A0A', media: '(prefers-color-scheme: dark)' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: "Kinnov'art" },
        { name: 'application-name', content: "Kinnov'art" },
        { name: 'msapplication-TileColor', content: '#D4AF37' },
        {
          name: 'keywords',
          content:
            "Kinnov'art, scénographie Conakry, meubles en pneus recyclés, kiosques sur mesure, aménagement d'espaces, décoration événementielle, production artistique, Guinée, set design Guinea, recycled tyre furniture, kiosk making, event decoration"
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: "Kinnov'art" },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Prerender the SEO endpoints alongside the crawled pages so the static
  // deploy ships a real /sitemap.xml and /robots.txt (public/robots.txt is
  // removed — the server route is the single source of truth).
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  // TypeScript Configuration
  typescript: {
    strict: true,
    typeCheck: false  // Disabled to avoid vue-tsc dependency
  }
})
