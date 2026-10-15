<template>
  <div ref="pageEl" class="services-page">
    <PageHeader
      bg="primary"
      scrim="light"
      image="/images/webp/best4-1920.webp"
      :title="$t('services.title')"
      :subtitle="$t('services.subtitle')"
    />

    <!-- Jump nav: the six services are the reason to visit this page, so they get
         an in-page index rather than making the visitor scroll to find them.
         Phones wrap it into a two-column grid of short labels (six full titles in
         one row measured 1682px inside a 364px window, so barely one of the six
         was visible) and it stays in the flow there; from `lg` up it is a single
         sticky row under the site header so the scroll-spy highlight stays
         visible while the visitor reads. -->
    <div ref="navEl" class="services-nav">
      <div class="container">
        <nav class="services-index" :aria-label="$t('services.indexLabel')">
          <a
            v-for="(service, i) in services"
            :key="service.slug"
            :href="`#${service.slug}`"
            class="services-index__link"
            :class="{ 'services-index__link--active': activeSlug === service.slug }"
            :aria-current="activeSlug === service.slug ? 'true' : undefined"
          >
            <span class="services-index__number">{{ String(i + 1).padStart(2, '0') }}</span>
            <!-- Two labels, one per breakpoint, because the full service titles do
                 not fit a phone grid. Both stay in the DOM so the server and the
                 client render identical markup; `display: none` also keeps the
                 unused one out of the accessibility tree, so it is read once. -->
            <span class="services-index__label services-index__label--full">{{ $t(`services.items.${service.slug}.title`) }}</span>
            <span class="services-index__label services-index__label--short">{{ $t(`services.items.${service.slug}.shortTitle`) }}</span>
          </a>
        </nav>
      </div>
    </div>

    <Section v-for="(service, i) in services" :key="service.slug" padding="lg" :bg="i % 2 === 0 ? 'white' : 'gray'">
      <!-- The anchor id belongs to this wrapper, not to the animated `.service`
           below it: `.service` reveals in from `translateY(30px)`, and the browser
           measured an anchor jump against that pre-reveal transform, landing every
           jumped-to section 30px under the sticky nav. -->
      <div :id="service.slug" class="container service-section">
        <div class="service scroll-reveal" :class="{ 'service--reverse': i % 2 === 1 }">
          <!-- One identical layout for all six services: a large photo over two
               smaller thumbnails. All image data lives in composables/useServices.ts. -->
          <div class="service__media">
            <div class="service__figure">
              <NuxtImg
                :src="service.image"
                :alt="$t(`services.items.${service.slug}.imageAlt`)"
                class="service__image"
                :style="imageStyle(service.imagePositions?.image)"
                loading="lazy"
              />
            </div>
            <div class="service__thumbs">
              <div class="service__thumb">
                <NuxtImg
                  :src="service.imageSecondary"
                  :alt="$t(`services.items.${service.slug}.imageSecondaryAlt`)"
                  class="service__thumb-image"
                  :style="imageStyle(service.imagePositions?.imageSecondary)"
                  loading="lazy"
                />
              </div>
              <div class="service__thumb">
                <NuxtImg
                  :src="service.imageTertiary"
                  :alt="$t(`services.items.${service.slug}.imageTertiaryAlt`)"
                  class="service__thumb-image"
                  :style="imageStyle(service.imagePositions?.imageTertiary)"
                  loading="lazy"
                />
              </div>
            </div>
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

            <!-- "Ce qui est inclus": at most three bullets, each derived only from
                 the service description above. No invented numbers or extras. -->
            <div v-if="includes(service).length" class="service__includes">
              <h3 class="service__includes-title">{{ $t('services.includesTitle') }}</h3>
              <ul class="service__includes-list">
                <li v-for="item in includes(service)" :key="item" class="service__include">
                  {{ item }}
                </li>
              </ul>
            </div>

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

            <!-- Per-service WhatsApp quote request. Rendered only when a number is
                 configured (useWhatsapp().link() returns '' otherwise). -->
            <div v-if="quoteUrl(service)" class="service__actions">
              <Button
                variant="primary"
                size="md"
                :to="quoteUrl(service)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('services.quoteCta') }}
              </Button>
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
        <div class="services-cta__actions">
          <Button variant="accent" size="lg" :to="localePath('/contact')">
            {{ $t('nav.contact') }}
          </Button>
          <Button
            v-if="ctaWhatsappUrl"
            variant="primary"
            size="lg"
            :to="ctaWhatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('services.ctaWhatsapp') }}
          </Button>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Service } from '~/types'

const { t, tm } = useI18n()
const localePath = useLocalePath()
const { services } = useServices()
const { link: whatsappLink } = useWhatsapp()

const pageEl = ref<HTMLElement | null>(null)
const navEl = ref<HTMLElement | null>(null)
const activeSlug = ref('')

const headerH = ref(97)
const navH = ref(56)

/**
 * Examples and "what's included" live under the active locale as arrays. `tm()`
 * returns the raw message structure — with vue-i18n's compiled messages that is
 * an array of AST nodes, not strings (stringifying them rendered
 * `[object Object]`) — so each entry is resolved back through `t()` by index. A
 * missing key would make `tm` return a string instead of a list, hence the
 * Array check.
 */
const resolveList = (key: string): string[] => {
  const value = tm(key)
  if (!Array.isArray(value)) return []
  return value.map((_, i) => t(`${key}.${i}`))
}
const examples = (service: Service): string[] =>
  resolveList(`services.items.${service.slug}.examples`)
const includes = (service: Service): string[] =>
  resolveList(`services.items.${service.slug}.includes`)

/** `object-position` crop for a photo slot, or undefined to keep the default. */
const imageStyle = (position?: string) =>
  position ? { objectPosition: position } : undefined

/**
 * wa.me link with a per-service, localised quote message. `link()` returns ''
 * when no number is configured, so the callers hide the button in that case.
 */
const quoteUrl = (service: Service): string =>
  whatsappLink(
    t('services.quoteMessage', { service: t(`services.items.${service.slug}.title`) })
  )

const ctaWhatsappUrl = computed(() => whatsappLink(t('contact.whatsappMessage')))

/**
 * Offset bookkeeping. From `lg` up the nav sticks directly under the sticky site
 * header, so both heights are measured and published as CSS vars: the nav uses
 * `--svc-header-h` for its `top`, and the sections use header + nav +
 * `--svc-nav-h` for their `scroll-margin-top` so an anchor jump clears both. On
 * phones the nav is part of the flow, so only the header offset applies (see the
 * `.service-section` styles) and `navPinned` keeps the scroll-spy in step.
 */
const navPinned = ref(false)

const syncOffsets = () => {
  const root = pageEl.value
  if (!root) return
  const header = document.querySelector<HTMLElement>('.header')
  if (header?.offsetHeight) {
    headerH.value = header.offsetHeight
    root.style.setProperty('--svc-header-h', `${header.offsetHeight}px`)
  }
  if (navEl.value?.offsetHeight) {
    navH.value = navEl.value.offsetHeight
    root.style.setProperty('--svc-nav-h', `${navEl.value.offsetHeight}px`)
    // Ask CSS instead of repeating the breakpoint here.
    navPinned.value = getComputedStyle(navEl.value).position === 'sticky'
  }
}

/**
 * Scroll-spy: the last service whose top has crossed the activation line is the
 * one being read (monotonic, so scrolling both ways stays correct). rAF-throttled
 * so the scroll listener stays cheap.
 */
let ticking = false
const updateActive = () => {
  ticking = false
  // The line sits just past where an anchor jump lands a section (sticky chrome
  // + 1rem), so the service that was jumped to becomes the active one.
  const line = headerH.value + (navPinned.value ? navH.value : 0) + 24
  let current = ''
  for (const service of services) {
    const el = document.getElementById(service.slug)
    if (el && el.getBoundingClientRect().top <= line) current = service.slug
  }
  activeSlug.value = current
}
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateActive)
}
const onResize = () => {
  syncOffsets()
  updateActive()
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  syncOffsets()
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  if ('ResizeObserver' in window && navEl.value) {
    resizeObserver = new ResizeObserver(syncOffsets)
    resizeObserver.observe(navEl.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  resizeObserver?.disconnect()
})

usePageSeo({
  titleKey: 'pageMeta.services.title',
  descriptionKey: 'pageMeta.services.description',
  image: '/og/og-services.jpg'
})
</script>

<style lang="scss" scoped>
.services-page {
  // Measured at runtime (see syncOffsets); these are the fallbacks.
  --svc-header-h: 97px;
  --svc-nav-h: 56px;
  // Owner feedback: the near-opaque white band hid most of the banner photo —
  // same fix as /galerie. Reveal more of the photo here only, without touching
  // the shared default. 0.6 is the point where the photo reads again while the
  // near-black title and 82%-black subtitle keep WCAG AA over the darkest 10%
  // of this photo (measured 8.2:1 / 6.6:1; 0.5 is the AA floor, 0.4 fails).
  --page-header-scrim-opacity: 0.6;
}

.services-nav {
  // Phones: in the flow, not pinned. A two-column grid of six labelled services
  // is too tall to keep on screen for the whole page.
  background-color: var(--color-background);
  border-bottom: 1px solid var(--border-color);

  // Desktop: sticks right under the sticky site header, one z-index below it so
  // the header always wins the overlap.
  @include respond-to('lg') {
    position: sticky;
    top: var(--svc-header-h);
    z-index: $z-index-sticky - 1;
  }
}

.services-index {
  // Phones/tablets: a wrapping grid, so all six services are on screen at once.
  // `minmax(0, 1fr)` lets a column shrink below its label's min-content width,
  // which is what lets a long label wrap instead of overflowing the row.
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-2;
  padding: $spacing-2 0;

  // Tablets: three columns keep the index to two rows.
  @include respond-to('sm') {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  // Desktop: all six in one row, equal columns, no wrapping.
  @include respond-to('lg') {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    padding: $spacing-3 0;
  }

  &__link {
    // Grid items default to `min-width: auto`, which would hold each chip at its
    // min-content width and overflow the grid on a narrow phone.
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-2;
    // ≥ 44px touch target (mobile).
    min-height: 44px;
    padding: $spacing-2 $spacing-4;
    border: 1px solid var(--border-color);
    border-radius: $radius-full;
    text-align: center;
    text-decoration: none;
    color: var(--color-text);
    transition: border-color $transition-base $easing-in-out,
      background-color $transition-base $easing-in-out,
      color $transition-base $easing-in-out;

    &:hover {
      border-color: var(--color-primary);
      background-color: var(--color-gray-100);
    }

    &--active {
      border-color: var(--color-primary);
      background-color: color-mix(in srgb, var(--color-primary) 16%, transparent);
      color: var(--color-text);

      .services-index__number {
        color: var(--color-primary-text);
      }
    }
  }

  &__number {
    // The number should never be the thing that gets squeezed.
    flex-shrink: 0;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: var(--color-primary-text);
  }

  &__label {
    font-size: $font-size-sm;
    line-height: $line-height-normal;
  }

  // Which label shows is a breakpoint decision, so both are in the DOM and CSS
  // picks one: identical markup on server and client, and `display: none` also
  // keeps the unused one out of the accessibility tree.
  &__label--full {
    display: none;

    @include respond-to('lg') {
      display: inline;
    }
  }

  &__label--short {
    @include respond-to('lg') {
      display: none;
    }
  }
}

.service-section {
  // Anchor target for the jump nav, on the wrapper that does not animate away
  // from its own flow position. The nav is only pinned from `lg` up, so on
  // phones just the header has to be cleared.
  scroll-margin-top: calc(var(--svc-header-h) + #{$spacing-4});

  @include respond-to('lg') {
    scroll-margin-top: calc(var(--svc-header-h) + var(--svc-nav-h) + #{$spacing-4});
  }
}

.service {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-8;
  align-items: center;

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
    display: flex;
    flex-direction: column;
    gap: $spacing-3;
  }

  &__figure {
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

  &__thumbs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-3;
  }

  &__thumb {
    position: relative;
    border-radius: $radius-lg;
    overflow: hidden;
    box-shadow: $shadow-md;
    aspect-ratio: 4 / 3;
  }

  &__thumb-image {
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

  &__includes {
    margin-top: $spacing-6;
  }

  &__includes-title {
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-primary-text);
    margin-bottom: $spacing-3;
  }

  &__includes-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
  }

  &__include {
    position: relative;
    padding-left: $spacing-6;
    font-size: $font-size-base;
    line-height: $line-height-normal;
    color: var(--color-text);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 8px;
      height: 8px;
      border-radius: $radius-full;
      background-color: var(--color-primary);
    }
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

  &__actions {
    margin-top: $spacing-8;
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

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $spacing-4;
  }
}
</style>
