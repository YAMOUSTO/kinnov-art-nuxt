<template>
  <Transition name="fade">
    <button 
      v-if="isVisible" 
      class="scroll-to-top" 
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  // Show button after scrolling down 400px
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: $spacing-8;
  right: $spacing-8;
  width: 50px;
  height: 50px;
  border-radius: $radius-full;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  box-shadow: $shadow-lg;
  cursor: pointer;
  @include flex-center;
  z-index: $z-index-fixed + 50;
  transition: all $transition-base $easing-in-out;

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }

  @media (max-width: $breakpoint-md) {
    bottom: $spacing-6;
    right: $spacing-6;
    width: 44px;
    height: 44px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
