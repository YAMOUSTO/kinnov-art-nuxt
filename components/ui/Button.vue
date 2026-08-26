<template>
  <NuxtLink 
    v-if="to"
    :to="to"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--loading': loading, 'btn--block': block }
    ]"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <slot />
  </NuxtLink>
  <button 
    v-else
    :type="type"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--loading': loading, 'btn--block': block }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  to?: string
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false
})

const tag = computed(() => props.to ? 'NuxtLink' : 'button')
</script>

<style lang="scss" scoped>
.btn {
  @include button-base;
  position: relative;

  &--primary {
    @include button-primary;
  }

  &--secondary {
    @include button-secondary;
  }

  &--accent {
    @include button-accent;
  }

  &--outline {
    @include button-outline;
  }

  &--sm {
    padding: $spacing-2 $spacing-4;
    font-size: $font-size-xs;
  }

  &--md {
    padding: $spacing-3 $spacing-6;
    font-size: $font-size-sm;
  }

  &--lg {
    padding: $spacing-4 $spacing-8;
    font-size: $font-size-base;
  }

  &--block {
    width: 100%;
  }

  &--loading {
    pointer-events: none;
    opacity: 0.7;
  }

  &__spinner {
    @include spinner;
    margin-right: $spacing-2;
  }
}
</style>
