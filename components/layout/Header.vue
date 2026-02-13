<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header__content">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="header__logo">
          <span class="header__logo-text">Kinnov'art</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="header__nav" :class="{ 'header__nav--open': mobileMenuOpen }">
          <ul class="header__menu">
            <li class="header__menu-item">
              <NuxtLink :to="localePath('/')" class="header__link" @click="closeMobileMenu">
                {{ $t('nav.home') }}
              </NuxtLink>
            </li>

            <!-- Gallery Dropdown -->
            <li class="header__menu-item header__menu-item--dropdown" @mouseenter="openDropdown('gallery')" @mouseleave="closeDropdown">
              <button class="header__link header__link--dropdown" @click="toggleDropdown('gallery')">
                {{ $t('nav.gallery') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'gallery' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" v-show="activeDropdown === 'gallery'">
                <NuxtLink :to="localePath('/gallery')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('gallery.all') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/gallery/furniture')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('gallery.furniture') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/gallery/art-projects')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('gallery.artProjects') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/gallery/audiovisual')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('gallery.audiovisual') }}
                </NuxtLink>
              </div>
            </li>

            <!-- Artists Dropdown -->
            <li class="header__menu-item header__menu-item--dropdown" @mouseenter="openDropdown('artists')" @mouseleave="closeDropdown">
              <button class="header__link header__link--dropdown" @click="toggleDropdown('artists')">
                {{ $t('nav.artists') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'artists' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" v-show="activeDropdown === 'artists'">
                <NuxtLink :to="localePath('/artists')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('nav.artists') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/artists/featured')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('artists.featured') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/artists/new-talents')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('artists.newTalents') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/artists/alumni')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('artists.alumni') }}
                </NuxtLink>
              </div>
            </li>

            <!-- Blog Dropdown -->
            <li class="header__menu-item header__menu-item--dropdown" @mouseenter="openDropdown('blog')" @mouseleave="closeDropdown">
              <button class="header__link header__link--dropdown" @click="toggleDropdown('blog')">
                {{ $t('nav.blog') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'blog' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" v-show="activeDropdown === 'blog'">
                <NuxtLink :to="localePath('/blog')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('nav.blog') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/blog/news')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('blog.news') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/blog/tutorials')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('blog.tutorials') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/blog/events')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('blog.events') }}
                </NuxtLink>
              </div>
            </li>

            <!-- About Dropdown -->
            <li class="header__menu-item header__menu-item--dropdown" @mouseenter="openDropdown('about')" @mouseleave="closeDropdown">
              <button class="header__link header__link--dropdown" @click="toggleDropdown('about')">
                {{ $t('nav.about') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'about' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" v-show="activeDropdown === 'about'">
                <NuxtLink :to="localePath('/about')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('nav.about') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/about/history')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('about.history') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/about/mission')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('about.mission') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/about/team')" class="header__dropdown-link" @click="closeMobileMenu">
                  {{ $t('about.team') }}
                </NuxtLink>
              </div>
            </li>

            <li class="header__menu-item">
              <NuxtLink :to="localePath('/contact')" class="header__link" @click="closeMobileMenu">
                {{ $t('nav.contact') }}
              </NuxtLink>
            </li>
          </ul>

          <!-- Language Switcher -->
          <LanguageSwitcher class="header__lang-switcher" />
        </nav>

        <!-- Mobile Menu Toggle -->
        <button class="header__mobile-toggle" @click="toggleMobileMenu" :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'">
          <span class="header__hamburger" :class="{ 'header__hamburger--open': mobileMenuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const localePath = useLocalePath()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    activeDropdown.value = null
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  activeDropdown.value = null
}

const openDropdown = (dropdown: string) => {
  if (window.innerWidth >= 1024) {
    activeDropdown.value = dropdown
  }
}

const closeDropdown = () => {
  if (window.innerWidth >= 1024) {
    activeDropdown.value = null
  }
}

const toggleDropdown = (dropdown: string) => {
  if (window.innerWidth < 1024) {
    activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  background-color: $color-white;
  transition: box-shadow $transition-base $easing-in-out;

  &--scrolled {
    box-shadow: $shadow-md;
  }

  &__content {
    @include flex-between;
    padding: $spacing-4 0;
  }

  &__logo {
    text-decoration: none;
    z-index: $z-index-sticky + 1;
  }

  &__logo-text {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    background: linear-gradient(135deg, $color-primary, $color-secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__nav {
    @include flex-between;
    gap: $spacing-8;

    @media (max-width: $breakpoint-lg - 1px) {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 400px;
      height: 100vh;
      background-color: $color-white;
      flex-direction: column;
      align-items: flex-start;
      padding: $spacing-20 $spacing-6 $spacing-6;
      transform: translateX(100%);
      transition: transform $transition-base $easing-in-out;
      box-shadow: $shadow-2xl;
      overflow-y: auto;

      &--open {
        transform: translateX(0);
      }
    }
  }

  &__menu {
    @include flex-start;
    gap: $spacing-2;

    @media (max-width: $breakpoint-lg - 1px) {
      flex-direction: column;
      width: 100%;
      gap: 0;
    }
  }

  &__menu-item {
    position: relative;

    @media (max-width: $breakpoint-lg - 1px) {
      width: 100%;
      border-bottom: 1px solid $color-gray-200;
    }

    &--dropdown {
      @include respond-to('lg') {
        &:hover .header__dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    padding: $spacing-3 $spacing-4;
    font-family: $font-heading;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $color-primary;
    text-decoration: none;
    transition: color $transition-base $easing-in-out;
    white-space: nowrap;

    @media (max-width: $breakpoint-lg - 1px) {
      width: 100%;
      padding: $spacing-4;
      font-size: $font-size-base;
    }

    &:hover {
      color: $color-secondary;
    }

    &--dropdown {
      background: none;
      border: none;
      cursor: pointer;
    }
  }

  &__dropdown-icon {
    transition: transform $transition-base $easing-in-out;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    @include respond-to('lg') {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 220px;
      background-color: $color-white;
      border-radius: $radius-lg;
      box-shadow: $shadow-xl;
      padding: $spacing-2;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: opacity $transition-base $easing-in-out,
                  visibility $transition-base $easing-in-out,
                  transform $transition-base $easing-in-out;
    }

    @media (max-width: $breakpoint-lg - 1px) {
      padding-left: $spacing-4;
      max-height: 0;
      overflow: hidden;
      transition: max-height $transition-base $easing-in-out;
    }
  }

  .header__menu-item--dropdown .header__dropdown-icon--open ~ .header__dropdown {
    @media (max-width: $breakpoint-lg - 1px) {
      max-height: 300px;
    }
  }

  &__dropdown-link {
    display: block;
    padding: $spacing-3 $spacing-4;
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text;
    text-decoration: none;
    border-radius: $radius-md;
    transition: background-color $transition-base $easing-in-out,
                color $transition-base $easing-in-out;

    &:hover {
      background-color: $color-gray-100;
      color: $color-secondary;
    }
  }

  &__lang-switcher {
    @media (max-width: $breakpoint-lg - 1px) {
      margin-top: $spacing-6;
    }
  }

  &__mobile-toggle {
    display: none;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: $z-index-sticky + 1;

    @media (max-width: $breakpoint-lg - 1px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__hamburger {
    position: relative;
    width: 24px;
    height: 2px;
    background-color: $color-primary;
    transition: background-color $transition-base $easing-in-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $color-primary;
      transition: transform $transition-base $easing-in-out;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }

    &--open {
      background-color: transparent;

      &::before {
        transform: translateY(8px) rotate(45deg);
      }

      &::after {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
}

// Mobile menu overlay
@media (max-width: $breakpoint-lg - 1px) {
  .header__nav--open::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba($color-black, 0.5);
    z-index: -1;
  }
}
</style>
