<template>
  <div class="gallery-page">
    <PageHeader
      bg="gray"
      image="/images/webp/gallery-header-1920.webp"
      :title="$t('gallery.title')"
      :subtitle="$t('gallery.subtitle')"
    />

    <Section padding="lg" bg="white">
      <div class="container">
        <!-- Category filters. The grid items are re-created on every filter
             change, so they deliberately carry no `scroll-reveal` class: the
             reveal observer only picks up nodes present at page entry. -->
        <div
          class="gallery-filters scroll-reveal"
          role="group"
          :aria-label="$t('gallery.filterLabel')"
        >
          <button
            type="button"
            class="gallery-filter"
            :class="{ 'gallery-filter--active': activeFilter === 'all' }"
            :aria-pressed="activeFilter === 'all'"
            @click="activeFilter = 'all'"
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
            @click="activeFilter = category.slug"
          >
            {{ $t(category.labelKey) }}
            <span class="gallery-filter__count">{{ countOf(category.slug) }}</span>
          </button>
        </div>

        <div v-if="visiblePhotos.length" class="gallery-grid">
          <button
            v-for="(photo, i) in visiblePhotos"
            :key="photo.src"
            type="button"
            class="gallery-item"
            @click="openLightbox(i)"
          >
            <NuxtImg
              :src="photo.src"
              :alt="altFor(photo)"
              class="gallery-item__image"
              loading="lazy"
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
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('gallery.title')"
          @click.self="closeLightbox"
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
            />
            <figcaption class="lightbox__caption">
              {{ altFor(currentPhoto) }} ({{ lightboxIndex + 1 }}/{{ visiblePhotos.length }})
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { GalleryPhoto } from '~/composables/useGallery'

const { t } = useI18n()
const { photos, categories } = useGallery()

const activeFilter = ref<string>('all')

const countOf = (slug: string) => photos.filter((photo) => photo.category === slug).length

/**
 * Localised alt text. Photos carry only a category; the description is a
 * localised generic key (`gallery.alt.<category>`) numbered within its own
 * category, so the placeholder is at least readable in the visitor's language.
 * TODO propriétaire : remplacer par une description réelle de chaque photo.
 */
const altFor = (photo: GalleryPhoto) => {
  const group = photos.filter((p) => p.category === photo.category)
  const n = group.indexOf(photo) + 1
  return t(`gallery.alt.${photo.category}`, { n, total: group.length })
}

const visiblePhotos = computed(() =>
  activeFilter.value === 'all'
    ? photos
    : photos.filter((photo) => photo.category === activeFilter.value)
)

// Lightbox — index is always clamped against the *filtered* list, so switching
// categories while it is open cannot point at a stale position.
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const currentPhoto = computed(
  () => visiblePhotos.value[lightboxIndex.value] ?? visiblePhotos.value[0]
)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % visiblePhotos.value.length
}

const prevPhoto = () => {
  lightboxIndex.value =
    (lightboxIndex.value - 1 + visiblePhotos.value.length) % visiblePhotos.value.length
}

const onKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') nextPhoto()
  else if (event.key === 'ArrowLeft') prevPhoto()
}

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

useHead(() => ({
  title: t('pageMeta.gallery.title'),
  meta: [{ name: 'description', content: t('pageMeta.gallery.description') }]
}))
</script>

<style lang="scss" scoped>
.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-3;
  margin-bottom: $spacing-10;
}

.gallery-filter {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-5;
  border: 1px solid var(--border-color);
  border-radius: $radius-full;
  background: none;
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color $transition-base $easing-in-out,
    background-color $transition-base $easing-in-out,
    color $transition-base $easing-in-out;

  &:hover {
    border-color: var(--color-primary);
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-4;

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-6;
  }
}

.gallery-item {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  aspect-ratio: 1;
  border-radius: $radius-xl;
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: $shadow-md;
  transition: transform $transition-base $easing-in-out,
    box-shadow $transition-base $easing-in-out;

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
}

.gallery-item__image {
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
}

.lightbox__figure {
  margin: 0;
  max-width: min(1100px, 92vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-3;
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
