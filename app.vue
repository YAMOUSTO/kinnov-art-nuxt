<template>
  <div>
    <NuxtLayout>
      <NuxtErrorBoundary @error="handlePageError">
        <NuxtPage />
        <template #error="{ error, clearError }">
          <div class="error-boundary">
            <h1 class="error-boundary__title">{{ $t('error.title') }}</h1>
            <p class="error-boundary__text">{{ $t('error.body') }}</p>
            <button type="button" class="error-boundary__button" @click="handleRetry(clearError)">
              {{ $t('error.retry') }}
            </button>
            <p v-if="isDev && error?.message" class="error-boundary__detail">{{ error.message }}</p>
          </div>
        </template>
      </NuxtErrorBoundary>
    </NuxtLayout>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localeHead = useLocaleHead({ dir: true, lang: true, seo: true })

const isDev = import.meta.dev

useHead(() => ({
  titleTemplate: (title?: string) => (title ? `${title} | Kinnov'art` : t('pageMeta.siteTitle')),
  title: t('pageMeta.siteTitle'),
  // `lang` is set explicitly from the active locale: relying on useLocaleHead().htmlAttrs
  // alone left <html> with no lang attribute at all (audit N8), which breaks screen-reader
  // pronunciation when the visitor switches to English.
  htmlAttrs: { ...(localeHead.value?.htmlAttrs ?? {}), lang: locale.value },
  link: localeHead.value?.link ?? [],
  meta: [
    ...(localeHead.value?.meta ?? []),
    { name: 'description', content: t('pageMeta.siteDescription') }
  ]
}))

// `.scroll-reveal` is handled by plugins/scroll-observer.client.ts, which owns
// the single app-wide IntersectionObserver.

const handlePageError = (error: unknown) => {
  console.error('[page error]', error)
}

const handleRetry = (clearError: (opts?: { redirect: boolean }) => void) => {
  clearError({ redirect: true })
}
</script>

<style lang="scss" scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-4;
  min-height: 60vh;
  padding: $spacing-8 $spacing-4;
  text-align: center;

  &__title {
    font-family: $font-heading;
    font-size: $font-size-3xl;
    color: $color-primary;
  }

  &__text {
    max-width: 480px;
    color: $color-text-muted;
  }

  &__button {
    padding: $spacing-3 $spacing-6;
    background-color: $color-primary;
    color: $color-secondary;
    border-radius: $radius-md;
    font-weight: $font-weight-semibold;
    transition: opacity $transition-base $easing-in-out;

    &:hover {
      opacity: 0.85;
    }
  }

  &__detail {
    max-width: 640px;
    padding: $spacing-3 $spacing-4;
    background-color: $color-gray-100;
    border-radius: $radius-md;
    font-family: monospace;
    font-size: $font-size-sm;
    color: $color-accent;
    word-break: break-word;
  }
}
</style>
