<template>
  <div class="artist-type-page">
    <Section class="header-section" bg="gray">
      <div class="container text-center scroll-reveal">
        <h1 class="page-title">{{ typeTitle }}</h1>
        <p class="lead">{{ $t('creators.subtitle') }}</p> 
      </div>
    </Section>

    <Section>
      <div class="container">
        <div v-if="filteredArtists.length > 0" class="grid grid-cols-3">
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
        <div v-else class="text-center py-12">
          <p class="text-xl text-gray-500">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/creators')" class="mt-4">
            {{ $t('creators.viewAll') }}
          </Button>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
// Assuming useArtists composable exists and has getArtistsByType or getArtists
const { getArtistsByType } = useArtists()

const type = computed(() => route.params.type as string)
const typeTitle = computed(() => {
  const key = `creators.${type.value}`
  return t(key) !== key ? t(key) : type.value.charAt(0).toUpperCase() + type.value.slice(1).replace('-', ' ')
})

const filteredArtists = computed(() => getArtistsByType(type.value))

useHead({
  title: `${typeTitle.value} - Kinnov'art Artists`,
  meta: [
    { name: 'description', content: `Meet our ${typeTitle.value} creators.` }
  ]
})
</script>

<style lang="scss" scoped>
.page-title {
  font-family: $font-heading;
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  color: var(--color-primary);
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }
}
</style>
