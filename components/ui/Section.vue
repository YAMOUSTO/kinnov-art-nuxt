<template>
  <section class="section" :class="[bgClass, paddingClass]">
    <div v-if="container" class="container">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  bg?: 'white' | 'gray' | 'primary' | 'secondary' | 'accent'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  container?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bg: 'white',
  padding: 'md',
  container: true
})

const bgClass = computed(() => props.bg ? `section--bg-${props.bg}` : '')
const paddingClass = computed(() => props.padding ? `section--padding-${props.padding}` : '')
</script>

<style lang="scss" scoped>
.section {
  width: 100%;

  &--bg-white {
    background-color: $color-white;
  }

  &--bg-gray {
    background-color: $color-background;
  }

  &--bg-primary {
    background-color: $color-primary;
    color: $color-white;
  }

  &--bg-secondary {
    background-color: $color-secondary;
    color: $color-white;
  }

  &--bg-accent {
    background-color: $color-accent;
    color: $color-primary;
  }

  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: $spacing-8 0;

    @include respond-to('md') {
      padding: $spacing-12 0;
    }
  }

  &--padding-md {
    @include section-padding;
  }

  &--padding-lg {
    padding: $spacing-20 0;

    @include respond-to('md') {
      padding: $spacing-24 0;
    }

    @include respond-to('lg') {
      padding: $spacing-32 0;
    }
  }
}
</style>
