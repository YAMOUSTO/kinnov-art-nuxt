<template>
  <Section
    :bg="bg"
    padding="md"
    :container="false"
    :class="[
      'page-header',
      `page-header--${bg}`,
      { 'page-header--image': image, 'page-header--scrim-light': image && scrim === 'light' }
    ]"
  >
    <!-- Optional photo band: decorative, so it is hidden from assistive tech and
         the dark scrim guarantees the title below keeps WCAG contrast. -->
    <div v-if="image" class="page-header__media" aria-hidden="true">
      <NuxtImg
        :src="image"
        alt=""
        class="page-header__bg"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        preload
      />
      <div class="page-header__scrim"></div>
    </div>
    <div class="container text-center page-header__content">
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
  /** Optional photo background (e.g. `/images/webp/best4-1920.webp`). */
  image?: string
  /**
   * Scrim drawn over the photo. `dark` (default) keeps white text over a dark
   * veil — good for busy/dark photos. `light` draws a soft light band behind the
   * heading with near-black text (WCAG AA on bright photos) and leaves the rest
   * of the photo uncluttered; opt in per page so the other headers are unchanged.
   */
  scrim?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  bg: 'gray',
  image: '',
  scrim: 'dark'
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

  // Photo band: the image sits behind the text with a dark scrim, so the title
  // and subtitle flip back to white (the gold band below is hidden anyway).
  &--image {
    position: relative;

    .page-header__media {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .page-header__bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .page-header__scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65));
    }

    .page-header__content {
      position: relative;
      z-index: 1;
    }

    .page-header__title {
      color: #FFFFFF;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .page-header__subtitle {
      color: rgba(255, 255, 255, 0.92);
    }
  }

  // Bright photo with a light band behind the heading (opt-in via `scrim="light"`).
  // The photo stays visible top and bottom, while a soft near-white band covers
  // the heading area so near-black text keeps a comfortable margin over AA
  // (≈ 18:1 at the band centre). Must come after `&--image` to win the override.
  &--scrim-light {
    // Opacity of the light band is tunable per page through
    // `--page-header-scrim-opacity`, so a page can reveal more of the photo
    // without touching the shared default (0.92 suits bright photos).
    .page-header__scrim {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, var(--page-header-scrim-opacity, 0.92)) 20%,
        rgba(255, 255, 255, var(--page-header-scrim-opacity, 0.92)) 80%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    .page-header__title {
      color: $color-black;
      // Soft white halo keeps the near-black title legible even where a lighter
      // band lets a busy part of the photo show through.
      text-shadow: 0 1px 14px rgba(255, 255, 255, 0.9);
    }

    .page-header__subtitle {
      // 82% black on the near-white band ≈ 12:1, comfortably above AA.
      color: rgba(0, 0, 0, 0.82);
    }
  }
}
</style>
