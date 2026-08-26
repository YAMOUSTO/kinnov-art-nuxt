<template>
  <div class="h-card">
    <div class="h-card__image-wrapper">
      <NuxtImg 
        :src="image" 
        :alt="title"
        loading="lazy"
        class="h-card__image"
      />
    </div>
    <div class="h-card__content">
      <div class="h-card__meta">
        <span class="h-card__category">{{ category }}</span>
        <span class="h-card__date">{{ date }}</span>
      </div>
      
      <h3 class="h-card__title">{{ title }}</h3>
      <p class="h-card__description">{{ description }}</p>
      
      <NuxtLink :to="to" class="h-card__btn">
        {{ actionText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
  category: string
  date: string
  title: string
  description: string
  to?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  to: '#',
  actionText: 'Lire Plus'
})
</script>

<style lang="scss" scoped>
.h-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-md;
  transition: all $transition-base $easing-in-out;
  height: 100%;

  @include respond-to('md') {
    flex-direction: row;
    align-items: stretch;
    min-height: 280px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }

  &__image-wrapper {
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;

    @include respond-to('md') {
      width: 40%; // Adjust as needed, screenshot looks like ~35-40%
      height: auto;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $easing-out;
  }

  &:hover &__image {
    transform: scale(1.05);
  }

  &__content {
    padding: $spacing-6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    @include respond-to('md') {
        padding: $spacing-8;
    }
  }

  &__meta {
    @include flex-between;
    margin-bottom: $spacing-4;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__category {
    color: var(--color-accent); // Or a specific red like in screenshot? Using project accent.
    // Screenshot has red text "EVENTS". If accent is yellow, might need an override. 
    // Assuming project secondary color (often red/orange in standard themes) or text-muted.
    // Let's use color-secondary for now to be distinct.
    color: #FF6B6B; // Hardcoded to match screenshot vibe if variables don't match, but better to use var.
    // Let's stick to var(--color-secondary) or similar if defined. 
    // Variables have: primary, secondary, accent. 
    color: var(--color-secondary); 
  }

  &__date {
    color: var(--color-text-muted);
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-xl; // Bigger title
    font-weight: $font-weight-bold;
    color: var(--color-primary); // Dark blue usually
    margin-bottom: $spacing-4;
    line-height: $line-height-tight;
  }

  &__description {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-8;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
  }

  &__btn {
    align-self: flex-start;
    display: inline-block;
    padding: $spacing-2 $spacing-6;
    border: 1px solid var(--color-primary);
    border-radius: $radius-full; // Pill shape
    color: var(--color-primary);
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: all $transition-base $easing-in-out;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
}
</style>
