<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
// Initialize scroll animations globally
useScrollAnimation()
</script>
