<template>
  <div class="card" :class="{ 'card--hover': hover }">
    <div v-if="image" class="card__image">
      <NuxtImg 
        :src="image" 
        :alt="imageAlt || title"
        loading="lazy"
        class="card__img"
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
  </div>
</template>

<script setup lang="ts">
interface Props {
  image?: string
  imageAlt?: string
  title?: string
  description?: string
  badge?: string
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: true
})
</script>

<style lang="scss" scoped>
.card {
  @include card-base;

  &--hover {
    @include card-hover;
  }

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $easing-in-out;

    .card--hover:hover & {
      transform: scale(1.1);
    }
  }

  &__badge {
    position: absolute;
    top: $spacing-4;
    right: $spacing-4;
    padding: $spacing-2 $spacing-4;
    background-color: $color-accent;
    color: $color-primary;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: $radius-full;
  }

  &__content {
    padding: $spacing-6;
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin-bottom: $spacing-3;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-gray-600;
    line-height: $line-height-relaxed;
  }

  &__footer {
    padding: 0 $spacing-6 $spacing-6;
  }
}
</style>
