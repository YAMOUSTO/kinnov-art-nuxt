<template>
  <div ref="pageEl" class="gallery-page">
    <PageHeader
      bg="gray"
      scrim="light"
      image="/images/webp/gallery-header-1920.webp"
      :title="$t('gallery.title')"
      :subtitle="$t('gallery.subtitle')"
    />

    <!-- Filter bar. It lives OUTSIDE the <Section> below on purpose: Section sets
         `overflow: hidden`, which turns it into a non-scrolling clip container and
         would defeat `position: sticky`. It sticks right under the sticky site
         header (offset measured at runtime) and stays one z-index below it, so the
         header always wins the overlap — the bug where a band covered the filters
         is gone. -->
    <div class="gallery-filterbar">
      <div class="container">
        <div
          class="gallery-filters"
          role="group"
          :aria-label="$t('gallery.filterLabel')"
        >
          <button
            type="button"
            class="gallery-filter"
            :class="{ 'gallery-filter--active': activeFilter === 'all' }"
            :aria-pressed="activeFilter === 'all'"
            @click="setFilter('all')"
          >
            {{ $t('gallery.all') }}
            <span class="gallery-filter__count">{{ photos.length }}</span>
          </button>
          <button
            v-for="category in categories"
            :key="category.slug"
            type="button"
            class="gallery-filter"
            :class="{ 'gallery-filter--active': activeFilter === category.slug }"
            :aria-pressed="activeFilter === category.slug"
            @click="setFilter(category.slug)"
          >
            {{ $t(category.labelKey) }}
            <span class="gallery-filter__count">{{ countOf(category.slug) }}</span>
          </button>
        </div>
      </div>
    </div>

    <Section padding="lg" bg="white">
      <div class="container gallery-body">
        <!-- Masonry via CSS multi-column: photos flow at their real aspect ratio
             (each item reserves space from its intrinsic width/height) and the
             last row can never leave an empty cell. -->
        <div v-if="displayedPhotos.length" class="gallery-masonry">
          <button
            v-for="(photo, i) in displayedPhotos"
            :key="photo.src"
            type="button"
            class="gallery-item"
            :style="{
              aspectRatio: `${photo.width} / ${photo.height}`,
              backgroundColor: photo.color
            }"
            @click="openLightbox(i, $event)"
          >
            <!-- `sizes` uses @nuxt/image's `screen:size` syntax, NOT a CSS media
                 query: the module resolves each key against `image.screens`
                 (sm:640 md:768 lg:1024) and emits
                 `(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw`,
                 one candidate per density. A raw `(max-width: …)` string is
                 parsed as garbage and yields a single `0w` srcset entry. -->
            <NuxtImg
              :src="photo.src"
              :alt="altFor(photo)"
              :width="photo.width"
              :height="photo.height"
              sizes="sm:50vw md:33vw lg:25vw"
              format="webp"
              :quality="75"
              class="gallery-item__image"
              :loading="i < 4 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'auto'"
              :decoding="i < 4 ? 'auto' : 'async'"
            />
            <span class="gallery-item__zoom" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </span>
          </button>
        </div>

        <!-- Shown when a category has no photos yet. -->
        <p v-else class="gallery-empty">{{ $t('gallery.empty') }}</p>
      </div>
    </Section>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          ref="dialogEl"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('gallery.title')"
          tabindex="-1"
          @click.self="onBackdropClick"
          @keydown.tab="trapFocus"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="onPointerCancel"
        >
          <button
            type="button"
            class="lightbox__control lightbox__close"
            :aria-label="$t('gallery.close')"
            @click="closeLightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            class="lightbox__control lightbox__nav lightbox__nav--prev"
            :aria-label="$t('gallery.prev')"
            @click="prevPhoto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <figure class="lightbox__figure">
            <img
              :src="currentPhoto.src"
              :alt="altFor(currentPhoto)"
              class="lightbox__image"
              decoding="async"
            />
            <figcaption class="lightbox__caption">
              {{ altFor(currentPhoto) }} ({{ lightboxIndex + 1 }}/{{ lightboxList.length }})
            </figcaption>
          </figure>

          <button
            type="button"
            class="lightbox__control lightbox__nav lightbox__nav--next"
            :aria-label="$t('gallery.next')"
            @click="nextPhoto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { GalleryPhoto } from '~/composables/useGallery'

const { t } = useI18n()
const { photos, categories } = useGallery()

const pageEl = ref<HTMLElement | null>(null)
const activeFilter = ref<string>('all')

const countOf = (slug: string) => photos.filter((photo) => photo.categorie === slug).length

/**
 * Localised alt text. Photos carry only a category; the description is a
 * localised generic key (`gallery.alt.<category>`, `gallery.alt.generic` when
 * unclassified) numbered within its own category, so the placeholder is at
 * least readable in the visitor's language.
 * TODO propriétaire : remplacer par une description réelle de chaque photo.
 */
const altFor = (photo: GalleryPhoto) => {
  const group = photos.filter((p) => p.categorie === photo.categorie)
  const n = group.indexOf(photo) + 1
  const key = photo.categorie ? `gallery.alt.${photo.categorie}` : 'gallery.alt.generic'
  return t(key, { n, total: group.length })
}

// Filters always apply to the ENTIRE list; the grid renders every photo of the
// active filter (no client-side batching — see the note below). Counts reflect
// the full category.
const filteredPhotos = computed(() =>
  activeFilter.value === 'all'
    ? photos
    : photos.filter((photo) => photo.categorie === activeFilter.value)
)

// IMPORTANT — every photo is rendered in the HTML on purpose.
//
// The grid uses `<NuxtImg sizes="...">`, which emits a `/_ipx/...` srcset whose
// derivatives are only produced at build time for the URLs present in the
// prerendered HTML. Batching (showing 16, revealing more on scroll) put photos
// 17+ in the DOM only after hydration, so the browser requested `/_ipx/...`
// files that were never generated → 404 and broken images on a static host.
// Rendering the whole filtered list keeps every derivative prerendered;
// `loading="lazy"` below still defers the offscreen downloads.
const displayedPhotos = computed(() => filteredPhotos.value)

const setFilter = (slug: string) => {
  activeFilter.value = slug
}

// Switching category dismisses the lightbox (its index would otherwise point at
// a stale position in the new list).
watch(activeFilter, () => {
  closeLightbox()
})

// --- Lightbox -----------------------------------------------------------------
const dialogEl = ref<HTMLElement | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
let openerEl: HTMLElement | null = null

/** The lightbox walks the full filtered list, not just the displayed batch. */
const lightboxList = computed(() => filteredPhotos.value)
const currentPhoto = computed(
  () => lightboxList.value[lightboxIndex.value] ?? lightboxList.value[0]
)

const openLightbox = (index: number, event?: MouseEvent) => {
  openerEl = (event?.currentTarget as HTMLElement | null) ?? null
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxList.value.length
}

const prevPhoto = () => {
  lightboxIndex.value =
    (lightboxIndex.value - 1 + lightboxList.value.length) % lightboxList.value.length
}

/**
 * Preload the neighbour full-resolution images so paging feels instant. The
 * grid only ever loads sized derivatives; the raw `src` is the full image.
 */
const preloadNeighbours = () => {
  const list = lightboxList.value
  if (!lightboxOpen.value || list.length < 2) return
  const around = [
    (lightboxIndex.value + 1) % list.length,
    (lightboxIndex.value - 1 + list.length) % list.length
  ]
  for (const index of around) {
    if (index === lightboxIndex.value) continue
    const img = new Image()
    img.src = list[index].src
  }
}

watch([lightboxOpen, lightboxIndex], () => preloadNeighbours())

// Body scroll lock + focus management: focus moves into the dialog on open and
// returns to the thumbnail that opened it on close.
watch(lightboxOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    dialogEl.value?.focus()
  } else {
    if (openerEl?.isConnected) openerEl.focus()
    openerEl = null
  }
})

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/** Cycle Tab / Shift+Tab within the dialog (focus trap). */
const trapFocus = (event: KeyboardEvent) => {
  const root = dialogEl.value
  if (!root) return
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  if (!nodes.length) {
    event.preventDefault()
    root.focus()
    return
  }
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement
  // Focus is either inside the dialog (on a control) or on the dialog itself.
  const inside = !!active && active !== root && root.contains(active)
  if (!inside) {
    event.preventDefault()
    ;(event.shiftKey ? last : first).focus()
    return
  }
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') nextPhoto()
  else if (event.key === 'ArrowLeft') prevPhoto()
}

// --- Swipe (touch / pointer) --------------------------------------------------
// Horizontal intent only: a gesture must clear the threshold AND be dominated
// by horizontal travel, so vertical scrolling is never hijacked.
const SWIPE_THRESHOLD = 50
let swipeStartX = 0
let swipeStartY = 0
let swipeActive = false
let swipeNavigated = false

const onPointerDown = (event: PointerEvent) => {
  if ((event.target as HTMLElement).closest('button')) return
  swipeActive = true
  swipeNavigated = false
  swipeStartX = event.clientX
  swipeStartY = event.clientY
}

const onPointerUp = (event: PointerEvent) => {
  if (!swipeActive) return
  swipeActive = false
  const dx = event.clientX - swipeStartX
  const dy = event.clientY - swipeStartY
  if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    swipeNavigated = true
    if (dx < 0) nextPhoto()
    else prevPhoto()
  }
}

const onPointerCancel = () => {
  swipeActive = false
}

// A swipe-then-click on the backdrop must not also dismiss the dialog.
const onBackdropClick = () => {
  if (swipeNavigated) {
    swipeNavigated = false
    return
  }
  closeLightbox()
}

// --- Header offset (sticky filter bar) ----------------------------------------
const syncHeaderOffset = () => {
  const header = document.querySelector<HTMLElement>('.header')
  if (header?.offsetHeight) {
    pageEl.value?.style.setProperty('--gal-header-h', `${header.offsetHeight}px`)
  }
}

onMounted(() => {
  syncHeaderOffset()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', syncHeaderOffset)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', syncHeaderOffset)
  document.body.style.overflow = ''
})

usePageSeo({
  titleKey: 'pageMeta.gallery.title',
  descriptionKey: 'pageMeta.gallery.description',
  image: '/og/og-galerie.jpg'
})
</script>

<style lang="scss" scoped>
.gallery-page {
  // Measured at runtime (see syncHeaderOffset); this is the fallback.
  --gal-header-h: 97px;
  // Owner feedback: the near-opaque white band hid most of the banner photo.
  // Lower the shared light scrim here only, so more of the photo shows while
  // the heading keeps its soft white halo (see PageHeader `--scrim-light`).
  --page-header-scrim-opacity: 0.6;
}

.gallery-filterbar {
  // Sticks under the sticky site header; one z-index lower so the header always
  // wins the overlap.
  position: sticky;
  top: var(--gal-header-h);
  z-index: $z-index-sticky - 1;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--border-color);
}

.gallery-filters {
  // Mobile: a single row that scrolls horizontally, so every filter stays on one
  // reading line with a >= 44px touch target.
  display: flex;
  flex-wrap: nowrap;
  gap: $spacing-2;
  overflow-x: auto;
  padding: $spacing-2 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  // Desktop: a centred wrapping row.
  @include respond-to('lg') {
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-3;
    overflow-x: visible;
    padding: $spacing-3 0;
  }
}

.gallery-filter {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  min-height: 44px;
  padding: $spacing-2 $spacing-5;
  border: 1px solid var(--border-color);
  border-radius: $radius-full;
  background: none;
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: var(--color-text);
  white-space: nowrap;
  cursor: pointer;
  transition: border-color $transition-base $easing-in-out,
    background-color $transition-base $easing-in-out,
    color $transition-base $easing-in-out;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // Gold fill with near-black text (9.99:1) — white on gold fails WCAG.
  &--active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: $color-black;
  }
}

.gallery-filter__count {
  font-size: $font-size-xs;
  opacity: 0.75;
}

.gallery-body {
  // Keeps the last row / "Voir plus" button clear of the floating WhatsApp button.
  padding-bottom: $spacing-16;
}

.gallery-masonry {
  // CSS multi-column masonry: items flow at their natural ratio and the last row
  // can never leave a hole.
  columns: 2;
  column-gap: $spacing-4;

  @include respond-to('md') {
    columns: 3;
  }

  @include respond-to('lg') {
    columns: 4;
    column-gap: $spacing-6;
  }
}

.gallery-item {
  position: relative;
  display: block;
  width: 100%;
  // Never split a tile across two columns.
  break-inside: avoid;
  margin: 0 0 $spacing-4;
  padding: 0;
  border: 0;
  border-radius: $radius-xl;
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: $shadow-md;
  transition: transform $transition-base $easing-in-out,
    box-shadow $transition-base $easing-in-out;

  @include respond-to('lg') {
    margin-bottom: $spacing-6;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;

    .gallery-item__image {
      transform: scale(1.06);
    }

    .gallery-item__zoom {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.gallery-item__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform $transition-slow $easing-out;
}

.gallery-item__zoom {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  color: #ffffff;
  opacity: 0;
  transition: opacity $transition-base $easing-in-out;
}

.gallery-empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: $spacing-12 0;
  margin: 0;
}

// Lightbox
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.92);
  padding: $spacing-6;

  // Focused programmatically on open; the visible controls carry the affordance.
  &:focus {
    outline: none;
  }
}

.lightbox__figure {
  margin: 0;
  max-width: min(1100px, 92vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-3;
  // Let horizontal swipes reach JS, keep vertical pan and pinch-zoom.
  touch-action: pan-y pinch-zoom;
}

.lightbox__image {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: $radius-lg;
}

.lightbox__caption {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
}

.lightbox__control {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: $radius-full;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  cursor: pointer;
  transition: background-color $transition-base $easing-in-out,
    border-color $transition-base $easing-in-out;

  &:hover,
  &:focus-visible {
    background: rgba(0, 0, 0, 0.7);
    border-color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.lightbox__close {
  top: $spacing-6;
  right: $spacing-6;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);

  &--prev {
    left: $spacing-6;
  }

  &--next {
    right: $spacing-6;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity $transition-base $easing-in-out;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .lightbox__nav {
    top: auto;
    bottom: $spacing-6;
    transform: none;

    &--prev {
      left: calc(50% - 64px);
    }

    &--next {
      right: calc(50% - 64px);
    }
  }
}
</style>
