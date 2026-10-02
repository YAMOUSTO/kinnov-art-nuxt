<template>
  <div class="creators-page">
    <PageHeader
      bg="primary"
      :title="$t('creators.title')"
      :subtitle="$t('creators.subtitle')"
    />

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

      <!-- Creators Grid -->
      <div class="creators-grid">
        <Card 
          v-for="artist in filteredArtists" 
          :key="artist.id"
          :image="artist.image"
          :title="artist.name"
          :description="artist.bio[locale]"
          :badge="$t(artist.specialtyKey!)"
          class="scroll-reveal"
        />
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { locale, t } = useI18n()
const { getArtistsByType } = useArtists()

const activeType = ref('all')

const artistTypes = [
  { value: 'all', label: 'gallery.all' },
  { value: 'featured', label: 'creators.featured' },
  { value: 'new', label: 'creators.new' },
  { value: 'alumni', label: 'creators.alumni' }
]

const filteredArtists = computed(() => getArtistsByType(activeType.value))

useHead(() => ({
  title: t('pageMeta.creators.title'),
  meta: [{ name: 'description', content: t('pageMeta.creators.description') }]
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
.creators-grid {
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
</style>
