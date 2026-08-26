<template>
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
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
}
</style>
