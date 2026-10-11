<template>
  <footer class="footer">
    <!-- Main Footer Content -->
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand Section -->
          <div class="footer__section">
            <NuxtLink :to="localePath('/')" class="footer__logo-link">
              <img src="/logo-transparent.png" alt="Kinnov'art" class="footer__logo-img" />
            </NuxtLink>
            <p class="footer__description">
              {{ $t('home.brandIntro') }}
            </p>
            <p class="footer__location">
              {{ $t('about.location') }}
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer__section">
            <h4 class="footer__title">{{ $t('footer.quickLinks') }}</h4>
            <ul class="footer__links">
              <li><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/services')">{{ $t('nav.services') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/galerie')">{{ $t('nav.gallery') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer__section">
            <h4 class="footer__title">{{ $t('nav.contact') }}</h4>
            <ul class="footer__contact">
              <li>
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="mailto:kinnovart@gmail.com">kinnovart@gmail.com</a>
              </li>
              <li>
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="tel:+224611464609">+224 611 46 46 09</a>
              </li>
              <li v-if="whatsappHref">
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
                  {{ $t('contact.whatsapp') }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer__section">
            <h4 class="footer__title">{{ $t('footer.newsletter') }}</h4>
            <p class="footer__newsletter-text">{{ $t('footer.newsletterDesc') }}</p>
            <form class="footer__newsletter-form" @submit.prevent="handleNewsletterSubmit">
              <label for="footer-email" class="sr-only">{{ $t('footer.emailPlaceholder') }}</label>
              <input 
                id="footer-email"
                type="email" 
                v-model="newsletterEmail"
                :placeholder="$t('footer.emailPlaceholder')"
                class="footer__newsletter-input"
                required
              />
              <button type="submit" class="footer__newsletter-button">
                {{ $t('footer.subscribe') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Media & Copyright -->
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-content">
          <p class="footer__copyright">{{ $t('footer.rights') }}</p>
          
          <!--
            Facebook, Instagram and TikTok icons (fixed order). Links come from
            runtimeConfig.public.social (NUXT_PUBLIC_SOCIAL_*); they fall back
            to '#' until the owner supplies real profile URLs.
          -->
          <div class="footer__social">
            <span class="footer__social-label">{{ $t('footer.followUs') }}:</span>
            <a
              v-for="social in socialLinks"
              :key="social.key"
              :href="social.url"
              :target="social.url === '#' ? undefined : '_blank'"
              :rel="social.url === '#' ? undefined : 'noopener noreferrer'"
              class="footer__social-link"
              :aria-label="social.label"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path :d="social.path" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const localePath = useLocalePath()
const newsletterEmail = ref('')

const config = useRuntimeConfig()
const { t } = useI18n()
const { link: whatsappLink } = useWhatsapp()

const whatsappHref = computed(() => whatsappLink(t('contact.whatsappMessage')))

const SOCIAL_ICONS: Record<string, { label: string, path: string }> = {
  facebook: {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  instagram: {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
  },
  tiktok: {
    label: 'TikTok',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'
  },
  youtube: {
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  }
}

// Networks shown in the footer, in display order.
const FOOTER_SOCIALS = ['facebook', 'instagram', 'tiktok'] as const

// The icons always render (so they are visible even before the owner supplies
// URLs). Each link uses runtimeConfig.public.social.<key>
// (NUXT_PUBLIC_SOCIAL_<KEY>) when set, otherwise falls back to '#'.
// TODO propriétaire : renseigner les URLs réelles de Facebook, Instagram et
// TikTok (sinon les icônes renvoient vers la page courante).
const socialLinks = computed(() => {
  const social = config.public.social as Record<string, string>
  return FOOTER_SOCIALS.map((key) => ({
    key,
    url: social?.[key] || '#',
    ...SOCIAL_ICONS[key]
  }))
})

const handleNewsletterSubmit = () => {
  newsletterEmail.value = ''
}
</script>

<style lang="scss" scoped>
.footer {
  // Gold band: light in both themes, so all text switches to near-black.
  // White on #D4AF37 was ~2.1:1 and failed WCAG AA everywhere in the footer.
  background-color: $color-primary;
  color: $color-black;

  &__main {
    padding: $spacing-16 0 $spacing-12;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-8;

    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('lg') {
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__logo-link {
    display: inline-block;
    max-width: 220px;
    margin-bottom: $spacing-2;
  }

  &__logo-img {
    width: 100%;
    height: auto;
    max-height: 56px;
    object-fit: contain;
  }

  &__description,
  &__location {
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
    color: rgba($color-black, 0.8);
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-black;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;

    a {
      font-size: $font-size-sm;
      color: rgba($color-black, 0.8);
      text-decoration: none;
      transition: color $transition-base $easing-in-out;

      &:hover {
        color: $color-black;
        text-decoration: underline;
      }
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: $spacing-3;

    li {
      display: flex;
      align-items: center;
      gap: $spacing-3;
      font-size: $font-size-sm;
      color: rgba($color-black, 0.8);
    }

    a {
      color: rgba($color-black, 0.8);
      text-decoration: none;
      transition: color $transition-base $easing-in-out;

      &:hover {
        color: $color-black;
        text-decoration: underline;
      }
    }
  }

  &__icon {
    flex-shrink: 0;
    color: $color-accent;
  }

  &__newsletter-text {
    font-size: $font-size-sm;
    color: rgba($color-black, 0.8);
  }

  &__newsletter-form {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;

    @include respond-to('md') {
      flex-direction: row;
    }
  }

  &__newsletter-input {
    flex: 1;
    padding: $spacing-3 $spacing-4;
    font-size: $font-size-sm;
    border: 1px solid rgba($color-black, 0.25);
    border-radius: $radius-md;
    background-color: rgba($color-white, 0.45);
    color: $color-black;
    transition: border-color $transition-base $easing-in-out;

    &::placeholder {
      color: rgba($color-black, 0.65);
    }

    &:focus {
      outline: none;
      border-color: $color-black;
      box-shadow: 0 0 0 3px rgba($color-black, 0.2);
    }
  }

  &__newsletter-button {
    @include button-accent;
    white-space: nowrap;
  }

  &__bottom {
    border-top: 1px solid rgba($color-black, 0.15);
    padding: $spacing-6 0;
  }

  &__bottom-content {
    @include flex-between;
    flex-direction: column;
    gap: $spacing-4;

    @include respond-to('md') {
      flex-direction: row;
    }
  }

  &__copyright {
    font-size: $font-size-sm;
    color: rgba($color-black, 0.7);
  }

  &__social {
    display: flex;
    align-items: center;
    gap: $spacing-4;
  }

  &__social-label {
    font-size: $font-size-sm;
    color: rgba($color-black, 0.8);
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $radius-full;
    background-color: rgba($color-black, 0.1);
    color: $color-black;
    transition: all $transition-base $easing-in-out;

    &:hover {
      background-color: $color-accent;
      color: $color-white;
      transform: translateY(-2px);
    }
  }
}
</style>
