<template>
  <div class="about-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title page-title--accent">{{ $t('about.title') }}</h1>
        <p class="page-subtitle page-subtitle--light">{{ $t('about.subtitle') }}</p>
      </div>
    </Section>

    <!-- Mission -->
    <Section bg="white">
      <div class="content-section scroll-reveal">
        <h2 class="section-title">{{ $t('about.missionTitle') }}</h2>
        <p class="lead">{{ $t('about.missionText') }}</p>
        <p class="body-text">
          {{ $t('about.missionBody') }}
        </p>
      </div>
    </Section>

    <!-- Team -->
    <Section bg="gray">
      <h2 class="section-title text-center scroll-reveal">{{ $t('about.teamTitle') }}</h2>
      <TeamGrid :members="teamMembers" />
    </Section>

    <!-- Location -->
    <Section bg="white">
      <div class="location-section scroll-reveal">
        <h2 class="section-title text-center">{{ $t('contact.location') }}</h2>
        <p class="text-center lead">{{ $t('about.location') }}</p>
        <LocationMap />
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { teamMembers } = useTeam()

useHead(() => ({
  title: t('pageMeta.about.title'),
  meta: [{ name: 'description', content: t('pageMeta.about.description') }]
}))
</script>

<style lang="scss" scoped>
.page-title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }

  &--accent {
    // The gold band is light in both themes, so the title must be dark. The
    // previous --color-accent (red) measured ~3.1:1 on gold, which fails AA.
    color: $color-black;
  }
}

.page-subtitle {
  font-size: $font-size-lg;
  max-width: 700px;
  margin: 0 auto;

  @include respond-to('md') {
    font-size: $font-size-xl;
  }

  &--light {
    // White on gold was ~2.1:1; near-black holds ~9.9:1 on the gold band.
    color: rgba(0, 0, 0, 0.82);
  }
}

.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: var(--color-primary-text);
  margin-bottom: $spacing-6;

  @include respond-to('md') {
    font-size: $font-size-4xl;
  }
}

.content-section {
  // Was capped at 800px, which left the « Notre Engagement » block narrower and
  // visually indented versus the team cards on the row below. Match the section
  // container so all blocks share the same left/right edges.
  width: 100%;

  .lead {
    margin-bottom: $spacing-6;
  }

  .body-text {
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $color-gray-700;
  }
}

.location-section {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
