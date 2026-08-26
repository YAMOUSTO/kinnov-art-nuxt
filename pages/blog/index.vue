<template>
  <div class="blog-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title" style="color: var(--color-accent);">{{ $t('blog.title') }}</h1>
        <p class="page-subtitle" style="color: rgba(255, 255, 255, 0.9);">{{ $t('blog.subtitle') }}</p>
      </div>
    </Section>

    <Section bg="white">
      <!-- Search and Filter -->
      <div class="blog-controls">
        <input 
          v-model="searchQuery"
          type="text"
          :placeholder="$t('blog.search')"
          class="search-input"
        />
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
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-3" style="margin-top: 3rem;">
        <Card 
          v-for="post in filteredPosts" 
          :key="post.id"
          :image="post.image"
          :title="post.title[locale]"
          :description="post.excerpt[locale]"
          :badge="$t(`blog.${post.category}`)"
          class="scroll-reveal"
        >
          <template #footer>
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <Button variant="secondary" size="sm">
                {{ $t('blog.readMore') }}
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { locale } = useI18n()
const { getPostsByCategory } = useBlogPosts()

const searchQuery = ref('')
const activeCategory = ref('all')

const categories = [
  { value: 'all', label: 'gallery.all' },
  { value: 'news', label: 'blog.news' },
  { value: 'tutorial', label: 'blog.tutorials' },
  { value: 'event', label: 'blog.events' }
]

const filteredPosts = computed(() => {
  let posts = getPostsByCategory(activeCategory.value)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title[locale.value].toLowerCase().includes(query) ||
      post.excerpt[locale.value].toLowerCase().includes(query)
    )
  }
  
  return posts
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: 'Blog - Kinnov\'art',
  meta: [
    { name: 'description', content: 'Actualités, tutoriels et événements de Kinnov\'art' }
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

.blog-controls {
  display: flex;
  flex-direction: column;
  gap: $spacing-6;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: $spacing-4 $spacing-6;
  font-size: $font-size-base;
  border: 2px solid $color-gray-300;
  border-radius: $radius-full;
  transition: border-color $transition-base $easing-in-out;

  &:focus {
    outline: none;
    border-color: $color-secondary;
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

.post-meta {
  @include flex-between;
  align-items: center;
  gap: $spacing-4;
}

.post-date {
  font-size: $font-size-sm;
  color: $color-gray-500;
}
</style>
