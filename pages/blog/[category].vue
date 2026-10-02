<template>
  <div class="blog-category-page">
    <PageHeader
      bg="gray"
      :title="categoryTitle"
      :subtitle="$t('blog.subtitle')"
    />

    <Section>
      <div class="container">
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-3">
          <Card 
            v-for="post in filteredPosts" 
            :key="post.id"
            :image="post.image"
            :title="post.title[locale]"
            :description="post.excerpt[locale]"
            :badge="$t(`blog.${post.category}`)"
            class="scroll-reveal"
          />
        </div>
        <div v-else class="empty-state">
          <p class="empty-state__text">{{ $t('common.noResults') }}</p>
          <Button variant="outline" :to="localePath('/blog')" class="empty-state__action">
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

useHead(() => ({
  title: t('pageMeta.blogCategory.title', { category: categoryTitle.value }),
  meta: [
    { name: 'description', content: t('pageMeta.blogCategory.description', { category: categoryTitle.value }) }
  ]
}))
</script>
