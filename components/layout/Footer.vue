<template>
  <footer class="footer">
    <!-- Main Footer Content -->
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand Section -->
          <div class="footer__section">
            <NuxtLink :to="localePath('/')" class="footer__logo-link">
              <img src="/logo.jpeg" alt="Kinnov'art Logo" class="footer__logo-img" />
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
              <li><NuxtLink :to="localePath('/gallery')">{{ $t('nav.gallery') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/artists')">{{ $t('nav.artists') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink></li>
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
                <a href="mailto:contact@kinnovart.com">contact@kinnovart.com</a>
              </li>
              <li>
                <svg class="footer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="tel:+224621000000">+224 621 00 00 00</a>
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
          
          <div class="footer__social">
            <span class="footer__social-label">{{ $t('footer.followUs') }}:</span>
            <a href="https://facebook.com/kinnovart" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com/kinnovart" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://youtube.com/@kinnovart" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/kinnovart" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const localePath = useLocalePath()
const newsletterEmail = ref('')

const handleNewsletterSubmit = () => {
  // Handle newsletter subscription
  console.log('Newsletter subscription:', newsletterEmail.value)
  newsletterEmail.value = ''
  // You can add actual newsletter logic here
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $color-primary;
  color: $color-white;

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
    color: rgba($color-white, 0.8);
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-accent;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;

    a {
      font-size: $font-size-sm;
      color: rgba($color-white, 0.8);
      text-decoration: none;
      transition: color $transition-base $easing-in-out;

      &:hover {
        color: $color-accent;
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
      color: rgba($color-white, 0.8);
    }

    a {
      color: rgba($color-white, 0.8);
      text-decoration: none;
      transition: color $transition-base $easing-in-out;

      &:hover {
        color: $color-accent;
      }
    }
  }

  &__icon {
    flex-shrink: 0;
    color: $color-accent;
  }

  &__newsletter-text {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.8);
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
    border: 1px solid rgba($color-white, 0.2);
    border-radius: $radius-md;
    background-color: rgba($color-white, 0.1);
    color: $color-white;
    transition: border-color $transition-base $easing-in-out;

    &::placeholder {
      color: rgba($color-white, 0.5);
    }

    &:focus {
      outline: none;
      border-color: $color-accent;
    }
  }

  &__newsletter-button {
    @include button-accent;
    white-space: nowrap;
  }

  &__bottom {
    border-top: 1px solid rgba($color-white, 0.1);
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
    color: rgba($color-white, 0.6);
  }

  &__social {
    display: flex;
    align-items: center;
    gap: $spacing-4;
  }

  &__social-label {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.8);
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $radius-full;
    background-color: rgba($color-white, 0.1);
    color: $color-white;
    transition: all $transition-base $easing-in-out;

    &:hover {
      background-color: $color-accent;
      color: $color-primary;
      transform: translateY(-2px);
    }
  }
}
</style>
