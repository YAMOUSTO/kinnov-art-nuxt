<template>
  <div class="artists-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title" style="color: var(--color-accent);">{{ $t('artists.title') }}</h1>
        <p class="page-subtitle" style="color: rgba(255, 255, 255, 0.9);">{{ $t('artists.subtitle') }}</p>
      </div>
    </Section>

    <Section bg="white">
      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button 
          v-for="type in artistTypes" 
          :key="type.value"
          @click="activeType = type.value"
          class="filter-tab"
          :class="{ 'filter-tab--active': activeType === type.value }"
        >
          {{ $t(type.label) }}
        </button>
      </div>

      <!-- Artists Grid -->
      <div class="grid grid-cols-3" style="margin-top: 3rem;">
        <Card 
          v-for="artist in filteredArtists" 
          :key="artist.id"
          :image="artist.image"
          :title="artist.name"
          :description="artist.bio[locale]"
          :badge="artist.specialty"
          class="scroll-reveal"
        />
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { locale } = useI18n()
const { getArtistsByType } = useArtists()

const activeType = ref('all')

const artistTypes = [
  { value: 'all', label: 'gallery.all' },
  { value: 'featured', label: 'artists.featured' },
  { value: 'new', label: 'artists.newTalents' },
  { value: 'alumni', label: 'artists.alumni' }
]

const filteredArtists = computed(() => getArtistsByType(activeType.value))

useHead({
  title: 'Nos Talents - Kinnov\'art',
  meta: [
    { name: 'description', content: 'Découvrez les créateurs de demain que nous accompagnons' }
  ]
})
</script>

<style lang="scss" scoped>
.page-title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }
}

.page-subtitle {
  font-size: $font-size-lg;
  max-width: 700px;
  margin: 0 auto;

  @include respond-to('md') {
    font-size: $font-size-xl;
  }
}

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
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-white;
  }
}
</style>
