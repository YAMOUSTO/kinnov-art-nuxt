<template>
  <div class="blog-category-page">
    <Section class="header-section" bg="gray">
      <div class="container text-center scroll-reveal">
        <h1 class="page-title">{{ categoryTitle }}</h1>
        <p class="lead">{{ $t('blog.subtitle') }}</p> 
      </div>
    </Section>

    <Section>
      <div class="container">
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-3">
          <Card 
            v-for="post in filteredPosts" 
            :key="post.id"
            :image="post.image"
            :title="post.title[locale]"
            :description="post.excerpt[locale]"
            :badge="post.category"
            class="scroll-reveal"
          />
        </div>
        <div v-else class="text-center py-12">
          <p class="text-xl text-gray-500">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/blog')" class="mt-4">
            {{ $t('blog.viewAll') }}
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
// Assuming useBlog composable exists
const { getPostsByCategory } = useBlogPosts()

const category = computed(() => route.params.category as string)
const categoryTitle = computed(() => {
  const key = `blog.${category.value}`
  return t(key) !== key ? t(key) : category.value.charAt(0).toUpperCase() + category.value.slice(1).replace('-', ' ')
})

const filteredPosts = computed(() => getPostsByCategory(category.value))

useHead({
  title: `${categoryTitle.value} - Kinnov'art Blog`,
  meta: [
    { name: 'description', content: `Read our latest articles in ${categoryTitle.value}.` }
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
}
</style>
