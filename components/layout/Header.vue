<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header__content">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="header__logo" aria-label="Kinnov'art">
          <div class="header__logo-container">
            <img src="/logo.jpeg" alt="Kinnov'art Logo" class="header__logo-img" />
          </div>
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
              <button class="header__link header__link--dropdown" @click="toggleDropdown('gallery')" :aria-expanded="activeDropdown === 'gallery'">
                {{ $t('nav.gallery') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'gallery' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" :class="{ 'header__dropdown--open': activeDropdown === 'gallery' }">
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
              <button class="header__link header__link--dropdown" @click="toggleDropdown('artists')" :aria-expanded="activeDropdown === 'artists'">
                {{ $t('nav.artists') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'artists' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" :class="{ 'header__dropdown--open': activeDropdown === 'artists' }">
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
              <button class="header__link header__link--dropdown" @click="toggleDropdown('blog')" :aria-expanded="activeDropdown === 'blog'">
                {{ $t('nav.blog') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'blog' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" :class="{ 'header__dropdown--open': activeDropdown === 'blog' }">
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
              <button class="header__link header__link--dropdown" @click="toggleDropdown('about')" :aria-expanded="activeDropdown === 'about'">
                {{ $t('nav.about') }}
                <svg class="header__dropdown-icon" :class="{ 'header__dropdown-icon--open': activeDropdown === 'about' }" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown" :class="{ 'header__dropdown--open': activeDropdown === 'about' }">
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

          <!-- Desktop Switchers (Hidden on Mobile) -->
          <div class="header__switchers header__switchers--desktop">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </nav>

        <!-- Group for Top Right Actions -->
        <div class="header__actions">
          <!-- Switchers (Mobile: Top Right, Desktop: Hidden) -->
          <div class="header__switchers header__switchers--mobile">
               <ThemeSwitcher />
               <LanguageSwitcher />
          </div>

          <!-- Mobile Menu Toggle -->
          <button class="header__mobile-toggle" @click="toggleMobileMenu" :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'">
            <span class="header__hamburger" :class="{ 'header__hamburger--open': mobileMenuOpen }"></span>
          </button>
        </div>
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
  background-color: var(--color-surface);
  transition: all $transition-base $easing-in-out;
  border-bottom: 1px solid transparent;

  &--scrolled {
    box-shadow: $shadow-md;
    border-color: var(--border-color);
  }

  &__content {
    @include flex-between;
    padding: $spacing-4 0;
    position: relative;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-2;
  }

  &__logo {
    text-decoration: none;
    z-index: $z-index-fixed + 20;
    display: block;
    max-width: 240px;

    @media (max-width: ($breakpoint-lg - 1px)) {
      max-width: 180px;
    }
  }

  &__logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__logo-img {
    width: 100%;
    height: auto;
    max-height: 64px;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  &__logo-slogan {
    display: none;
  }

  &__nav {
    @include flex-between;
    gap: $spacing-2;

    @media (max-width: ($breakpoint-lg - 1px)) {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--color-background);
      flex-direction: column;
      align-items: flex-start; // Left aligned
      justify-content: flex-start; // Start from top
      padding: $spacing-24 $spacing-8 $spacing-8; // Extra top padding for header area
      transform: translateX(100%);
      transition: transform $transition-base $easing-in-out;
      z-index: $z-index-fixed;
      overflow-y: auto;

      &--open {
        transform: translateX(0);
      }
    }
  }

  &__menu {
    @include flex-start;
    gap: $spacing-4;

    @media (max-width: ($breakpoint-lg - 1px)) {
      flex-direction: column;
      width: 100%;
      align-items: flex-start; // Left aligned
      gap: 0; // Remove gap, handle with padding/margin in items
    }
  }

  &__menu-item {
    position: relative;

    @media (max-width: ($breakpoint-lg - 1px)) {
      width: 100%; // Full width
      text-align: left; // Left aligned
      border-bottom: 1px solid var(--border-color); // Optional separator
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
    padding: $spacing-2;
    font-family: $font-heading;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text);
    text-decoration: none;
    transition: color $transition-base $easing-in-out;
    white-space: nowrap;

    @media (max-width: ($breakpoint-lg - 1px)) {
      font-size: $font-size-xl;
      padding: $spacing-4 0; // Bigger click area
      justify-content: space-between; // Push icon to right if exists
      width: 100%;
    }

    &:hover {
      color: var(--color-secondary);
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
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      min-width: 220px;
      background-color: var(--color-surface);
      border: 1px solid var(--border-color);
      border-radius: $radius-lg;
      box-shadow: $shadow-xl;
      padding: $spacing-2;
      opacity: 0;
      visibility: hidden;
      transition: all $transition-base $easing-in-out;
    }

    @media (max-width: ($breakpoint-lg - 1px)) {
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      background: var(--color-gray-50);
      box-shadow: none;
      text-align: left;
      
      &--open {
        max-height: 500px;
        padding-bottom: $spacing-4;
      }
    }
  }

  &__dropdown-link {
    display: block;
    padding: $spacing-3 $spacing-4;
    font-family: $font-body;
    font-size: $font-size-sm;
    color: var(--color-text);
    text-decoration: none;
    border-radius: $radius-md;
    transition: all $transition-base $easing-in-out;

    &:hover {
      background-color: var(--color-gray-100);
      color: var(--color-primary);
    }
    
    @media (max-width: ($breakpoint-lg - 1px)) {
      font-size: $font-size-lg;
      color: var(--color-text-muted);
      padding: $spacing-3 0; // Adjust padding
    }
  }

  &__switchers {
    display: flex;
    align-items: center;
    gap: $spacing-3;

    &--desktop {
      display: none;
      @include respond-to('lg') {
        display: flex;
        margin-left: $spacing-2;
      }
    }

    &--mobile {
      display: flex;
      margin-right: $spacing-12; // Space for hamburger
      z-index: $z-index-fixed + 20; // Above nav
      
      @include respond-to('lg') {
        display: none; // Hide on desktop
      }
    }
  }

  &__mobile-toggle {
    display: none;
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: $z-index-fixed + 20;

    @media (max-width: ($breakpoint-lg - 1px)) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__hamburger {
    position: relative;
    width: 24px;
    height: 2px;
    background-color: var(--color-text);
    transition: background-color $transition-base $easing-in-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-text);
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
</style>
