<template>
  <div v-if="embedUrl" class="location-map">
    <iframe
      :src="embedUrl"
      class="location-map__frame"
      :title="label"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
    <a
      v-if="linkUrl"
      :href="linkUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="location-map__link"
    >
      {{ $t('common.openInMaps') }}
    </a>
  </div>
</template>

<script setup lang="ts">
/**
 * Real, interactive map of the Kinnov'art address.
 *
 * This replaced a stock Unsplash photograph of a generic map with a pin
 * overlaid on it (audit L12). The photo was captioned `alt="Map"` yet showed
 * somewhere that was not Nongo, which misdirected visitors.
 *
 * The provider is configurable via runtimeConfig.public.map.* so the owner can
 * swap in Google/Mapbox without touching this component. Setting `embedUrl` to
 * an empty string hides the map.
 */
const config = useRuntimeConfig()

const map = config.public.map as {
  embedUrl: string
  linkUrl: string
  label: string
}

const embedUrl = computed(() => map.embedUrl)
const linkUrl = computed(() => map.linkUrl)
const label = computed(() => map.label)
</script>

<style lang="scss" scoped>
.location-map {
  position: relative;
  margin-top: $spacing-8;
  border-radius: $radius-2xl;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background-color: var(--color-surface);

  &__frame {
    display: block;
    width: 100%;
    height: 400px;
    border: 0;
  }

  &__link {
    display: block;
    padding: $spacing-3 $spacing-4;
    font-family: $font-heading;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    text-align: center;
    text-decoration: none;
    color: $color-black;
    background-color: var(--color-primary);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
