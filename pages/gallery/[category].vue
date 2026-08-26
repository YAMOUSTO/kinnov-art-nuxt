<template>
  <div class="gallery-category">
    <Section class="header-section" bg="gray">
      <div class="container text-center scroll-reveal">
        <h1 class="page-title">{{ categoryTitle }}</h1>
        <p class="lead">{{ $t('gallery.subtitle') }}</p> 
      </div>
    </Section>

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
        <div v-else class="text-center py-12">
          <p class="text-xl text-gray-500">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/gallery')" class="mt-4">
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

useHead({
  title: `${categoryTitle.value} - Kinnov'art`,
  meta: [
    { name: 'description', content: `Découvrez nos projets en ${categoryTitle.value}` }
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
