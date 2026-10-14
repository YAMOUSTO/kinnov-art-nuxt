<template>
  <div class="app-wrapper">
    <!-- Keyboard users can jump straight past the header navigation. -->
    <a href="#main" class="skip-link">{{ $t('a11y.skipToContent') }}</a>
    <Header />
    <main id="main" class="main-content" tabindex="-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;

  // Focused programmatically by the skip link; the visible affordance is the
  // skip link itself, so the full-width outline would only add noise.
  &:focus {
    outline: none;
  }
}

.skip-link {
  position: absolute;
  top: -100px;
  left: $spacing-4;
  z-index: $z-index-fixed + 100;
  padding: $spacing-3 $spacing-5;
  background-color: var(--color-secondary);
  color: var(--color-background);
  border-radius: $radius-md;
  font-family: $font-heading;
  font-weight: $font-weight-semibold;
  text-decoration: none;
  transition: top $transition-base $easing-in-out;

  &:focus {
    top: $spacing-4;
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
</style>
