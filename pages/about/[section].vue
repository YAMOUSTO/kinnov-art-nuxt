<template>
  <div class="about-section-page">
    <PageHeader
      bg="gray"
      :title="sectionTitle"
      :subtitle="$t('about.subtitle')"
    />

    <Section>
      <div class="container scroll-reveal">
        <div class="content-wrapper">
          <!-- History Content -->
          <div v-if="section === 'history'" class="content-block">
            <h2 class="content-title">{{ $t('aboutContent.historyTitle') }}</h2>
            <p>{{ $t('aboutContent.historyP1') }}</p>
            <p>{{ $t('aboutContent.historyP2') }}</p>
          </div>

          <!-- Mission Content -->
          <div v-if="section === 'mission'" class="content-block">
            <h2 class="content-title">{{ $t('aboutContent.missionTitle') }}</h2>
            <p>{{ $t('aboutContent.missionP') }}</p>
            <ul class="mission-list">
              <li><strong>{{ $t('aboutContent.missionInnovation') }} :</strong> {{ $t('aboutContent.missionInnovationText') }}</li>
              <li><strong>{{ $t('aboutContent.missionTraining') }} :</strong> {{ $t('aboutContent.missionTrainingText') }}</li>
              <li><strong>{{ $t('aboutContent.missionCollaboration') }} :</strong> {{ $t('aboutContent.missionCollaborationText') }}</li>
            </ul>
          </div>

          <!-- Team Content -->
          <div v-if="section === 'team'" class="content-block">
            <h2 class="content-title">{{ $t('aboutContent.teamTitle') }}</h2>
            <p class="content-intro">{{ $t('aboutContent.teamIntro') }}</p>
            <TeamGrid :members="teamMembers" />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { teamMembers } = useTeam()

const section = computed(() => route.params.section as string)
const sectionTitle = computed(() => {
  const key = `about.${section.value}`
  return t(key) !== key ? t(key) : section.value.charAt(0).toUpperCase() + section.value.slice(1)
})

useHead(() => ({
  title: t('pageMeta.aboutSection.title', { section: sectionTitle.value }),
  meta: [
    { name: 'description', content: t('pageMeta.aboutSection.description', { section: sectionTitle.value }) }
  ]
}))
</script>

<style lang="scss" scoped>
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.content-title {
  font-family: $font-heading;
  font-size: $font-size-2xl;
  color: var(--color-secondary);
  margin-bottom: $spacing-6;
}

.content-block {
  font-size: $font-size-lg;
  color: var(--color-text);
  line-height: $line-height-relaxed;

  p {
    margin-bottom: $spacing-6;
  }
}

.content-intro {
  font-size: $font-size-lg;
  color: var(--color-text-muted);
  margin-bottom: $spacing-8;
}

.mission-list {
  list-style: disc;
  padding-left: $spacing-6;
  margin-top: $spacing-6;

  li {
    margin-bottom: $spacing-3;
  }
}
</style>
