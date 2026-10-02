<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :aria-label="title ? undefined : resolvedAriaLabel"
        @click.self="close"
      >
        <div
          ref="contentRef"
          class="modal__content"
          :class="`modal__content--${size}`"
          @keydown="handleKeydown"
        >
          <h2 v-if="title" :id="titleId" class="modal__title">
            {{ title }}
          </h2>
          <button
            type="button"
            class="modal__close"
            :aria-label="$t('common.close')"
            @click="close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

interface Props {
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Rendered as the dialog's visible heading and used as its accessible name. */
  title?: string
  /** Accessible name used only when no `title` is supplied. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  title: '',
  ariaLabel: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()

const contentRef = ref<HTMLElement | null>(null)
const titleId = `modal-title-${useId()}`

// Element that had focus before the dialog opened, so focus can be restored.
let previouslyFocused: HTMLElement | null = null

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

const getFocusable = () => {
  if (!contentRef.value) return [] as HTMLElement[]
  return Array.from(contentRef.value.querySelectorAll<HTMLElement>(FOCUSABLE))
    .filter(el => el.offsetParent !== null || el === document.activeElement)
}

const close = () => {
  emit('update:modelValue', false)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
    return
  }

  if (e.key !== 'Tab') return

  // Trap Tab / Shift+Tab inside the dialog instead of letting focus escape to
  // the page behind it.
  const focusable = getFocusable()
  if (focusable.length === 0) {
    e.preventDefault()
    contentRef.value?.focus()
    return
  }

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement

  if (e.shiftKey && (active === first || active === contentRef.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

const lockBodyScroll = (lock: boolean) => {
  if (import.meta.client) {
    document.body.style.overflow = lock ? 'hidden' : ''
  }
}

watch(() => props.modelValue, async (open) => {
  if (!import.meta.client) return

  if (open) {
    previouslyFocused = document.activeElement as HTMLElement | null
    lockBodyScroll(true)
    await nextTick()
    // Prefer the first interactive control; fall back to the dialog itself.
    const focusable = getFocusable()
    ;(focusable[0] ?? contentRef.value)?.focus()
  } else {
    lockBodyScroll(false)
    previouslyFocused?.focus()
    previouslyFocused = null
  }
})

onBeforeUnmount(() => {
  // Restore scroll if the component is torn down while the dialog is open.
  if (props.modelValue) lockBodyScroll(false)
})

// An empty aria-label is worse than none, so fall back to a generic localized
// name when the caller supplies neither `title` nor `ariaLabel`.
const resolvedAriaLabel = computed(() => props.ariaLabel || t('common.dialog'))
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

    &:focus {
      outline: none;
    }

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

  &__title {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: var(--color-text);
    margin: 0;
    padding: $spacing-6 $spacing-16 $spacing-4 $spacing-6;
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
      // Gold background with white glyph measured 2.10:1; keep the label dark.
      background-color: var(--color-primary);
      color: $color-black;
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
