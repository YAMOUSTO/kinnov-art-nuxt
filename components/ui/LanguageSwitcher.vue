<template>
  <div class="lang-switcher">
    <button 
      v-for="locale in availableLocales" 
      :key="locale.code"
      @click="switchLanguage(locale.code)"
      class="lang-switcher__button"
      :class="{ 'lang-switcher__button--active': currentLocale === locale.code }"
      :aria-label="`Switch to ${locale.name}`"
    >
      {{ locale.code.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const switchLanguage = (code: string) => {
  const path = switchLocalePath(code)
  router.push(path)
}
</script>

<style lang="scss" scoped>
.lang-switcher {
  display: flex;
  gap: $spacing-2;
  background-color: $color-gray-100;
  padding: $spacing-1;
  border-radius: $radius-full;

  &__button {
    padding: $spacing-2 $spacing-4;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: $color-gray-600;
    background-color: transparent;
    border: none;
    border-radius: $radius-full;
    cursor: pointer;
    transition: all $transition-base $easing-in-out;

    &:hover {
      color: $color-primary;
    }

    &--active {
      background-color: $color-primary;
      color: $color-white;
    }
  }
}
</style>
