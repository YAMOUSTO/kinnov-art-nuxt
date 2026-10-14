<template>
  <div class="error-page">
    <div class="error-page__inner">
      <p class="error-page__code" aria-hidden="true">{{ error.statusCode }}</p>
      <h1 class="error-page__title">{{ title }}</h1>
      <p class="error-page__text">{{ body }}</p>

      <div class="error-page__actions">
        <button type="button" class="error-page__button" @click="goHome">
          {{ $t('error.backHome') }}
        </button>
        <button v-if="!isNotFound" type="button" class="error-page__button error-page__button--ghost" @click="retry">
          {{ $t('error.retry') }}
        </button>
      </div>

      <p v-if="isDev && error.message" class="error-page__detail">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

// Nuxt renders this component outside the normal page tree, so it owns its own
// <head> (the `titleTemplate` from app.vue does not apply) and its own locale
// lookup. Everything here is defensive: an error page is the worst place to
// throw a second error.
const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const isDev = import.meta.dev

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() =>
  t(isNotFound.value ? 'error.notFoundTitle' : 'error.title')
)
const body = computed(() => t(isNotFound.value ? 'error.notFoundBody' : 'error.body'))

useHead({
  // Full title including the site suffix, because app.vue's titleTemplate is not
  // in scope for this component.
  title: `${title.value} | Kinnov'art`,
  meta: [
    // Error pages must never be indexed.
    { name: 'robots', content: 'noindex' }
  ]
})

const goHome = () => {
  // '/' is the default locale root; detectBrowserLanguage re-routes an English
  // visitor from there, so this is locale-correct without needing the router.
  clearError({ redirect: '/' })
}

const retry = () => {
  clearError()
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-8 $spacing-4;
  background-color: var(--color-background, #fff);
  color: var(--color-text, #000);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 560px;
    text-align: center;
  }

  &__code {
    margin: 0;
    font-family: $font-heading;
    font-size: clamp(4rem, 12vw, 7rem);
    font-weight: $font-weight-bold;
    line-height: 1;
    color: var(--color-primary, #d4af37);
  }

  &__title {
    margin: $spacing-4 0 $spacing-3;
    font-family: $font-heading;
    font-size: $font-size-2xl;
    color: var(--color-text, #000);
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted, #4b5563);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-3;
    margin-top: $spacing-6;
  }

  &__button {
    padding: $spacing-3 $spacing-6;
    background-color: var(--color-primary, #d4af37);
    color: var(--color-secondary, #000);
    border: 1px solid transparent;
    border-radius: $radius-md;
    font-family: $font-heading;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    transition: opacity $transition-base $easing-in-out;

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary, #d4af37);
      outline-offset: 3px;
    }

    &--ghost {
      background-color: transparent;
      border-color: var(--color-primary, #d4af37);
      color: var(--color-primary-text, #8a6a12);

      :global([data-theme='dark']) & {
        color: var(--color-primary, #f0d588);
      }
    }
  }

  &__detail {
    max-width: 100%;
    margin-top: $spacing-6;
    padding: $spacing-3 $spacing-4;
    background-color: var(--color-gray-100, #f8f9fa);
    border-radius: $radius-md;
    font-family: monospace;
    font-size: $font-size-sm;
    color: var(--color-primary-text, #8a6a12);
    text-align: left;
    word-break: break-word;
  }
}
</style>
