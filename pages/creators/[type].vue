<template>
  <div class="artist-type-page">
    <PageHeader
      bg="gray"
      :title="typeTitle"
      :subtitle="$t('creators.subtitle')"
    />

    <Section>
      <div class="container">
        <div v-if="filteredArtists.length > 0" class="grid grid-cols-3">
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
        <div v-else class="empty-state">
          <p class="empty-state__text">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/creators')" class="empty-state__action">
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
const { getArtistsByType } = useArtists()

const type = computed(() => route.params.type as string)
const typeTitle = computed(() => {
  const key = `creators.${type.value}`
  return t(key) !== key ? t(key) : type.value.charAt(0).toUpperCase() + type.value.slice(1).replace('-', ' ')
})

const filteredArtists = computed(() => getArtistsByType(type.value))

useHead(() => ({
  title: t('pageMeta.creatorsType.title', { type: typeTitle.value }),
  meta: [
    { name: 'description', content: t('pageMeta.creatorsType.description', { type: typeTitle.value }) }
  ]
}))
</script>
