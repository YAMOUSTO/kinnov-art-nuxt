<template>
  <section class="section" :class="[bgClass, paddingClass]" v-bind="$attrs">
    <div v-if="container" class="container">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
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
  position: relative;
  overflow: hidden;

  // Background Variants
  &--bg-white {
    background-color: var(--color-background);
  }

  &--bg-gray {
    background-color: var(--color-gray-100);
  }

  &--bg-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &--bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);
  }

  &--bg-accent {
    background-color: var(--color-accent);
    color: var(--color-primary);
  }

  // Padding Variants
  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: $spacing-8 0;
  }

  &--padding-md {
    @include section-padding;
  }

  &--padding-lg {
    padding: $spacing-24 0;

    @include respond-to('lg') {
      padding: $spacing-32 0;
    }
  }
}
</style>
