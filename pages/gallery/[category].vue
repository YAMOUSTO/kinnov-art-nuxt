<template>
  <div class="gallery-category">
    <PageHeader
      bg="gray"
      :title="categoryTitle"
      :subtitle="$t('gallery.subtitle')"
    />

    <Section>
      <div class="container">
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-3">
          <Card 
            v-for="project in filteredProjects" 
            :key="project.id"
            :image="project.image"
            :title="project.title[locale]"
            :description="project.description[locale]"
            :badge="$t(`gallery.${project.category}`)"
            class="scroll-reveal"
          />
        </div>
        <div v-else class="empty-state">
          <p class="empty-state__text">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/gallery')" class="empty-state__action">
            {{ $t('gallery.viewAll') }}
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
const { getProjectsByCategory } = useProjects()

const category = computed(() => route.params.category as string)
const categoryTitle = computed(() => {
  // Map route param to translation key or generic title
  const key = `gallery.${category.value}`
  return t(key) !== key ? t(key) : category.value.charAt(0).toUpperCase() + category.value.slice(1).replace('-', ' ')
})

const filteredProjects = computed(() => getProjectsByCategory(category.value))

useHead(() => ({
  title: t('pageMeta.galleryCategory.title', { category: categoryTitle.value }),
  meta: [
    { name: 'description', content: t('pageMeta.galleryCategory.description', { category: categoryTitle.value }) }
  ]
}))
</script>
