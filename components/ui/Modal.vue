<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal" @click.self="close">
        <div class="modal__content" :class="`modal__content--${size}`">
          <button class="modal__close" @click="close" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  emit('update:modelValue', false)
}

// Handle ESC key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Static backdrop
  backdrop-filter: blur(4px);
  z-index: $z-index-modal;
  @include flex-center;
  padding: $spacing-4;

  &__content {
    position: relative;
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--border-color);
    border-radius: $radius-2xl;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: $shadow-2xl;

    &--sm {
      max-width: 400px;
      width: 100%;
    }

    &--md {
      max-width: 600px;
      width: 100%;
    }

    &--lg {
      max-width: 800px;
      width: 100%;
    }

    &--xl {
      max-width: 1200px;
      width: 100%;
    }

    &--full {
      width: 95vw;
      height: 95vh;
      max-height: 95vh;
    }
  }

  &__close {
    position: absolute;
    top: $spacing-4;
    right: $spacing-4;
    width: 40px;
    height: 40px;
    @include flex-center;
    background-color: var(--color-gray-100);
    border: none;
    border-radius: $radius-full;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: all $transition-base $easing-in-out;
    z-index: 1;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
}

// Transition
.modal-enter-active,
.modal-leave-active {
  transition: opacity $transition-base $easing-in-out;

  .modal__content {
    transition: transform $transition-base $easing-in-out;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal__content {
    transform: scale(0.9);
  }
}
</style>
