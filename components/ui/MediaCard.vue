<template>
  <NuxtLink :to="to" class="media-card group">
    <!-- Image Background -->
    <div class="media-card__image-wrapper">
      <NuxtImg 
        :src="image" 
        :alt="title"
        loading="lazy"
        class="media-card__image"
      />
      <div class="media-card__overlay"></div>
    </div>

    <!-- Badge -->
    <div v-if="badge" class="media-card__badge">
      {{ badge }}
    </div>

    <!-- Content -->
    <div class="media-card__content">
      <h3 class="media-card__title">{{ title }}</h3>
      
      <div class="media-card__details">
        <p v-if="description" class="media-card__description">{{ description }}</p>
        
        <div class="media-card__action">
          <span class="media-card__action-text">{{ actionText }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="media-card__icon"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  image: string
  title: string
  description?: string
  badge?: string
  to: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  actionText: 'View More'
})
</script>

<style lang="scss" scoped>
.media-card {
  position: relative;
  display: block;
  border-radius: $radius-xl;
  overflow: hidden;
  height: 400px; // Fixed height for consistency
  box-shadow: $shadow-lg;
  text-decoration: none;
  background-color: var(--color-gray-900);

  &__image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $easing-out;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top, 
      rgba(0, 0, 0, 0.9) 0%, 
      rgba(0, 0, 0, 0.5) 50%, 
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: opacity $transition-base $easing-in-out;
    opacity: 0.8;
  }

  // Hover Effect: Scale Image
  &:hover &__image {
    transform: scale(1.1);
  }

  &:hover &__overlay {
    opacity: 1;
  }

  // Badge
  &__badge {
    position: absolute;
    top: $spacing-4;
    right: $spacing-4;
    background-color: var(--color-accent); // Yellow as requested
    color: var(--color-primary);
    padding: $spacing-1 $spacing-3;
    border-radius: $radius-full;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 10;
    box-shadow: $shadow-md;
  }

  // Content
  &__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: $spacing-6;
    z-index: 20;
    transform: translateY(20px); // Slightly improved initial state
    transition: transform $transition-base $easing-out;
  }

  &:hover &__content {
    transform: translateY(0);
  }

  &__title {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: var(--color-white);
    margin-bottom: $spacing-2;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  &__details {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.4s $easing-out;
  }

  &:hover &__details {
    max-height: 200px; // Approximate max height
    opacity: 1;
    margin-top: $spacing-2;
  }

  &__description {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.9);
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__action {
    display: flex;
    align-items: center;
    color: var(--color-accent);
    font-weight: $font-weight-bold;
    font-family: $font-heading;
    text-transform: uppercase;
    font-size: $font-size-xs;
    letter-spacing: 0.05em;
    
    &-text {
      margin-right: $spacing-2;
    }
  }

  &__icon {
    transition: transform $transition-base $easing-in-out;
  }

  &:hover &__icon {
    transform: translateX(4px);
  }
}
</style>
