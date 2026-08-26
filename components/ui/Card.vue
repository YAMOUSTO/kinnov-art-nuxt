<template>
  <component 
    :is="to ? 'NuxtLink' : 'div'"
    v-bind="to ? { to } : {}"
    class="card" 
    :class="{ 'card--hover': hover, 'card--link': to }"
  >
    <div v-if="image" class="card__image-wrapper">
      <NuxtImg 
        :src="image" 
        :alt="imageAlt || title"
        loading="lazy"
        class="card__image"
      />
      <div v-if="badge" class="card__badge">{{ badge }}</div>
    </div>
    <div class="card__content">
      <h3 v-if="title" class="card__title">{{ title }}</h3>
      <p v-if="description" class="card__description">{{ description }}</p>
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  image?: string
  imageAlt?: string
  title?: string
  description?: string
  badge?: string
  hover?: boolean
  to?: string
}

withDefaults(defineProps<Props>(), {
  hover: true,
  to: undefined
})
</script>

<style lang="scss" scoped>
.card {
  @include card-base;
  background-color: var(--color-surface);
  border: 1px solid var(--border-color);
  color: var(--color-text);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &--hover {
    @include card-hover;
  }

  &--link {
    cursor: pointer;
  }

  &__image-wrapper {
    position: relative;
    padding-top: 66.66%; // 3:2 Aspect Ratio
    overflow: hidden;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $easing-out;
  }

  &:hover &__image {
    transform: scale(1.05);
  }

  &__badge {
    position: absolute;
    top: $spacing-3;
    right: $spacing-3;
    background-color: var(--color-accent);
    color: var(--color-primary);
    padding: $spacing-1 $spacing-3;
    border-radius: $radius-full;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 1;
    box-shadow: $shadow-md;
  }

  &__content {
    padding: $spacing-5;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin-bottom: $spacing-2;
    transition: color $transition-base $easing-in-out;
  }

  &:hover &__title {
    color: var(--color-secondary);
  }

  &__description {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-4;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__footer {
    border-top: 1px solid var(--border-color);
    margin-top: auto;
    padding-top: $spacing-4;
  }
}
</style>
