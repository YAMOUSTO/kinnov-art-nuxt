<template>
  <Section
    :bg="bg"
    padding="md"
    :container="false"
    :class="['page-header', `page-header--${bg}`]"
  >
    <div class="container text-center scroll-reveal">
      <h1 class="page-header__title">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="page-header__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </Section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  /** `primary` renders the gold brand band; `gray`/`white` render neutral bands. */
  bg?: 'white' | 'gray' | 'primary'
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  bg: 'gray'
})
</script>

<style lang="scss" scoped>
.page-header {
  &__title {
    font-family: $font-heading;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    margin-bottom: $spacing-4;
    // Never use --color-primary here: gold on the gray/white band is only
    // 1.91:1 / 2.10:1 contrast and fails WCAG AA.
    color: var(--color-text);

    @include respond-to('md') {
      font-size: $font-size-5xl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    line-height: $line-height-relaxed;
    color: var(--color-text-muted);
    margin: 0;
    max-width: 62ch;
    margin-inline: auto;

    @include respond-to('md') {
      font-size: $font-size-xl;
    }
  }

  // Section.vue forces `color: var(--color-white)` on the `primary` (gold)
  // background, which measures 2.10:1 against gold. Override to near-black
  // (9.99:1) and keep the subtitle at 82% black (7.72:1).
  &--primary {
    .page-header__title {
      color: $color-black;
    }

    .page-header__subtitle {
      color: rgba(0, 0, 0, 0.82);
    }
  }
}
</style>
