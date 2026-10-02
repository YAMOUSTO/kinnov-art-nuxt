<template>
  <div class="gallery-page">
    <PageHeader
      bg="primary"
      :title="$t('gallery.title')"
      :subtitle="$t('gallery.subtitle')"
    />

    <Section bg="white">
      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category.value"
          @click="activeCategory = category.value"
          class="filter-tab"
          :class="{ 'filter-tab--active': activeCategory === category.value }"
        >
          {{ $t(category.label) }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="gallery-grid">
        <Card 
          v-for="project in filteredProjects" 
          :key="project.id"
          :image="project.image"
          :title="project.title[locale]"
          :description="project.description[locale]"
          :badge="$t(`gallery.${project.category}`)"
          @click="openLightbox(project)"
          @keydown.enter="openLightbox(project)"
          role="button"
          tabindex="0"
          class="gallery-card scroll-reveal"
        />
      </div>

      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>{{ $t('common.noResults') }}</p>
      </div>
    </Section>

    <!-- Lightbox Modal -->
    <Modal
      v-model="lightboxOpen"
      size="xl"
      :aria-label="selectedProject?.title[locale]"
    >
      <div v-if="selectedProject" class="lightbox">
        <NuxtImg :src="selectedProject.image" :alt="selectedProject.title[locale]" class="lightbox__image" />
        <div class="lightbox__content">
          <h2 class="lightbox__title">{{ selectedProject.title[locale] }}</h2>
          <p class="lightbox__description">{{ selectedProject.description[locale] }}</p>
          <span class="lightbox__category">{{ $t(`gallery.${selectedProject.category}`) }}</span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '~/types'

const { locale, t } = useI18n()
const { getProjectsByCategory } = useProjects()

const activeCategory = ref('all')
const lightboxOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const categories = [
  { value: 'all', label: 'gallery.all' },
  { value: 'furniture', label: 'gallery.furniture' },
  { value: 'art', label: 'gallery.art' },
  { value: 'audiovisual', label: 'gallery.audiovisual' }
]

const filteredProjects = computed(() => getProjectsByCategory(activeCategory.value))

const openLightbox = (project: Project) => {
  selectedProject.value = project
  lightboxOpen.value = true
}

useHead(() => ({
  title: t('pageMeta.gallery.title'),
  meta: [{ name: 'description', content: t('pageMeta.gallery.description') }]
}))
</script>

<style lang="scss" scoped>
.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: $spacing-3;
}

.filter-tab {
  padding: $spacing-3 $spacing-6;
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $color-gray-600;
  background-color: $color-white;
  border: 2px solid $color-gray-300;
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-base $easing-in-out;

  &:hover {
    border-color: $color-secondary;
    color: $color-secondary;
  }

  &--active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  margin-top: $spacing-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.gallery-card {
  cursor: pointer;
}

.lightbox {
  &__image {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
  }

  &__content {
    padding: $spacing-6;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin-bottom: $spacing-3;
  }

  &__description {
    font-size: $font-size-base;
    color: $color-gray-700;
    margin-bottom: $spacing-4;
  }

  &__category {
    display: inline-block;
    padding: $spacing-2 $spacing-4;
    background-color: $color-accent;
    color: $color-primary;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    border-radius: $radius-full;
  }
}
</style>
