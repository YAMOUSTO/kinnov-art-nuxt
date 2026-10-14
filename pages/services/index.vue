<template>
  <div class="services-page">
    <PageHeader
      bg="primary"
      image="/images/webp/best4-1920.webp"
      :title="$t('services.title')"
      :subtitle="$t('services.subtitle')"
    />

    <!-- Jump nav: the five services are the reason to visit this page, so they get
         an in-page index rather than making the visitor scroll to find them. -->
    <Section padding="sm" bg="white">
      <div class="container">
        <nav class="services-index scroll-reveal" :aria-label="$t('services.title')">
          <a
            v-for="(service, i) in services"
            :key="service.slug"
            :href="`#${service.slug}`"
            class="services-index__link"
          >
            <span class="services-index__number">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="services-index__label">{{ $t(`services.items.${service.slug}.title`) }}</span>
          </a>
        </nav>
      </div>
    </Section>

    <Section v-for="(service, i) in services" :key="service.slug" padding="lg" :bg="i % 2 === 0 ? 'white' : 'gray'">
      <div class="container">
        <div :id="service.slug" class="service scroll-reveal" :class="{ 'service--reverse': i % 2 === 1 }">
          <div class="service__media">
            <NuxtImg
              :src="service.image"
              :alt="$t(`services.items.${service.slug}.imageAlt`)"
              class="service__image"
              loading="lazy"
            />
          </div>

          <div class="service__body">
            <div class="service__icon">
              <ServiceIcon :name="service.icon" :size="36" />
            </div>

            <p class="service__eyebrow">
              {{ $t('services.examplesLabel') }} {{ String(i + 1).padStart(2, '0') }}
            </p>
            <h2 class="service__title">
              {{ $t(`services.items.${service.slug}.title`) }}
            </h2>
            <p class="service__description">
              {{ $t(`services.items.${service.slug}.description`) }}
            </p>

            <!-- Kiosk making is the one service the owner listed without an example,
                 so this block renders nothing for it rather than inventing one. -->
            <ul v-if="examples(service).length" class="service__examples">
              <li v-for="example in examples(service)" :key="example" class="service__example">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ example }}
              </li>
            </ul>

            <!-- Optional second photo for the service (e.g. the TV studio detail
                 for space design). Data lives in composables/useServices.ts. -->
            <div v-if="service.imageSecondary" class="service__secondary">
              <NuxtImg
                :src="service.imageSecondary"
                :alt="$t(`services.items.${service.slug}.imageSecondaryAlt`)"
                class="service__secondary-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Closing CTA. Deliberately dark (not gold): the footer directly below is
         gold, and two adjacent gold bands merged into one undifferentiated slab.
         The dark band separates the page from the footer. -->
    <Section bg="secondary">
      <div class="container text-center scroll-reveal services-cta">
        <h2 class="services-cta__title">{{ $t('services.ctaTitle') }}</h2>
        <p class="services-cta__text">{{ $t('services.intro') }}</p>
        <Button variant="accent" size="lg" :to="localePath('/contact')">
          {{ $t('nav.contact') }}
        </Button>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types'

const { t, tm } = useI18n()
const localePath = useLocalePath()
const { services } = useServices()

/**
 * Examples live under the active locale as an array. `tm()` returns the raw
 * message structure — with vue-i18n's compiled messages that is an array of AST
 * nodes, not strings (stringifying them rendered `[object Object]`), so each
 * entry is resolved back through `t()` by index. A missing key would make `tm`
 * return a string instead of a list, hence the Array check.
 */
const examples = (service: Service): string[] => {
  const key = `services.items.${service.slug}.examples`
  const value = tm(key)
  if (!Array.isArray(value)) return []
  return value.map((_, i) => t(`${key}.${i}`))
}

usePageSeo({
  titleKey: 'pageMeta.services.title',
  descriptionKey: 'pageMeta.services.description',
  image: '/og/og-services.jpg'
})
</script>

<style lang="scss" scoped>
.services-index {
  // Mobile: the five chips wrap onto ragged lines and leave an unbalanced gap.
  // A single row that scrolls horizontally keeps them on one reading line.
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: $spacing-3 $spacing-4;
  overflow-x: auto;
  padding-bottom: $spacing-2;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  // Desktop: enough room to wrap, balanced and centred.
  @include respond-to('md') {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
    padding-bottom: 0;
  }

  &__link {
    flex-shrink: 0;
    display: inline-flex;
    align-items: baseline;
    gap: $spacing-2;
    padding: $spacing-2 $spacing-4;
    border: 1px solid var(--border-color);
    border-radius: $radius-full;
    text-decoration: none;
    color: var(--color-text);
    transition: border-color $transition-base $easing-in-out,
      background-color $transition-base $easing-in-out;

    &:hover {
      border-color: var(--color-primary);
      background-color: var(--color-gray-100);
    }
  }

  &__number {
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: var(--color-primary-text);
  }

  &__label {
    font-size: $font-size-sm;
  }
}

.service {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-8;
  align-items: center;
  // Anchored from the jump nav: keep the heading clear of the sticky header.
  scroll-margin-top: 100px;

  @include respond-to('lg') {
    grid-template-columns: 1fr 1fr;
    gap: $spacing-16;
  }

  &--reverse {
    @include respond-to('lg') {
      .service__media {
        order: 2;
      }
    }
  }

  &__media {
    position: relative;
    border-radius: $radius-xl;
    overflow: hidden;
    box-shadow: $shadow-lg;
    aspect-ratio: 4 / 3;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: $spacing-4;
    border-radius: $radius-full;
    background-color: color-mix(in srgb, var(--color-primary) 14%, transparent);
    color: var(--color-primary-text);
  }

  &__eyebrow {
    margin: 0 0 $spacing-2;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: var(--color-text);
    margin-bottom: $spacing-4;

    @include respond-to('md') {
      font-size: $font-size-3xl;
    }
  }

  &__description {
    font-size: $font-size-lg;
    line-height: $line-height-relaxed;
    color: var(--color-text-muted);
    max-width: 52ch;
  }

  &__examples {
    list-style: none;
    padding: 0;
    margin: $spacing-6 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-2 $spacing-3;
  }

  &__example {
    display: inline-flex;
    align-items: center;
    gap: $spacing-2;
    padding: $spacing-2 $spacing-4;
    border-radius: $radius-full;
    background-color: var(--color-surface);
    border: 1px solid var(--border-color);
    font-size: $font-size-sm;
    color: var(--color-text);
  }

  &__secondary {
    margin-top: $spacing-6;
    border-radius: $radius-xl;
    overflow: hidden;
    box-shadow: $shadow-md;
    aspect-ratio: 16 / 9;
  }

  &__secondary-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.services-cta {
  &__title {
    font-family: $font-heading;
    font-size: $font-size-3xl;
    color: var(--color-primary);
    margin-bottom: $spacing-4;
  }

  &__text {
    max-width: 52ch;
    margin: 0 auto $spacing-8;
    color: rgba(255, 255, 255, 0.82);
  }
}
</style>
