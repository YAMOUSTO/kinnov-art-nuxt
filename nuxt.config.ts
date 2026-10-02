// https://nuxt.com/docs/api/configuration/nuxt-config
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
    // Canonical/hreflang URLs are absolute, so they need the deployed origin.
    // Set NUXT_PUBLIC_I18N_BASE_URL (e.g. https://www.kinnovart.com) per
    // deployment; leave empty locally and i18n omits the SEO links rather than
    // emitting wrong ones.
    baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL || '',
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
      contactEmail: 'contact@kinnovart.com',
      social: {
        facebook: '',
        instagram: '',
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
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: "Kinnov'art" },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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

  // TypeScript Configuration
  typescript: {
    strict: true,
    typeCheck: false  // Disabled to avoid vue-tsc dependency
  }
})
