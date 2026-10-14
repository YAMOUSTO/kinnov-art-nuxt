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
              {{ $t('footer.description') }}
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
              <li v-if="config.public.contactEmail">
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a :href="`mailto:${config.public.contactEmail}`">{{ config.public.contactEmail }}</a>
              </li>
              <li v-if="whatsappDisplay">
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a :href="whatsappTel">{{ whatsappDisplay }}</a>
              </li>
              <li v-if="whatsappHref">
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
                  {{ $t('contact.whatsapp') }}
                </a>
              </li>
              <li v-if="facebookHref">
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path :d="SOCIAL_ICONS.facebook.path" />
                </svg>
                <a :href="facebookHref" target="_blank" rel="noopener noreferrer">Facebook</a>
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

    <!-- Copyright -->
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-content">
          <p class="footer__copyright">{{ $t('footer.rights') }}</p>
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
const { link: whatsappLink, display: whatsappDisplay, tel: whatsappTel } = useWhatsapp()

const whatsappHref = computed(() => whatsappLink(t('contact.whatsappMessage')))

const SOCIAL_ICONS: Record<string, { label: string, path: string }> = {
  facebook: {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  }
}

// Facebook profile link, from runtimeConfig.public.social.facebook
// (NUXT_PUBLIC_SOCIAL_FACEBOOK). Rendered in the contact list, under WhatsApp.
const facebookHref = computed(() => {
  const social = config.public.social as Record<string, string>
  return social?.facebook || ''
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
    // The footer band is always the light gold, but in the dark theme
    // button-accent resolves --color-accent to #ef4444, where its white label is
    // only ~3.76:1 (fails WCAG AA). Pin the darker red instead: white on
    // $color-accent-dark holds >=6.4:1 in both themes.
    background-color: $color-accent-dark;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, #{$color-accent-dark} 85%, #000);
    }
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
}
</style>
