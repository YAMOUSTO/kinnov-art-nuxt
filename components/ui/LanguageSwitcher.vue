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
  background-color: var(--color-gray-200);
  padding: 4px;
  border-radius: $radius-lg;
  border: 1px solid var(--border-color);

  &__button {
    padding: $spacing-1 $spacing-3;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: var(--color-text-muted);
    background-color: transparent;
    border: none;
    border-radius: $radius-md;
    cursor: pointer;
    transition: all $transition-base $easing-in-out;

    &:hover {
      color: var(--color-primary);
    }

    &--active {
      background-color: var(--color-white);
      color: var(--color-primary);
      box-shadow: var(--shadow-sm);
    }
  }
}
</style>
