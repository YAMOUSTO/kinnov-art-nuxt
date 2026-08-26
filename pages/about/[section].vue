<template>
  <div class="about-section-page">
    <Section class="header-section" bg="gray">
      <div class="container text-center scroll-reveal">
        <h1 class="page-title">{{ sectionTitle }}</h1>
        <p class="lead">{{ $t('about.subtitle') }}</p> 
      </div>
    </Section>

    <Section>
      <div class="container scroll-reveal">
        <div class="content-wrapper">
          <!-- History Content -->
          <div v-if="section === 'history'" class="content-block">
            <h2 class="content-title">Notre Histoire</h2>
            <p>
              Fondé en 2020 au cœur de Nongo, Kinnov'art est né de la passion commune pour l'artisanat local et l'innovation numérique.
              Ce qui a commencé comme un petit atelier de menuiserie s'est rapidement transformé en un centre créatif multidisciplinaire.
            </p>
            <p>
              Au fil des années, nous avons élargi nos horizons pour inclure la production audiovisuelle, la gestion d'artistes et l'événementiel,
              devenant ainsi un pilier de la scène culturelle de Conakry.
            </p>
          </div>

          <!-- Mission Content -->
          <div v-if="section === 'mission'" class="content-block">
            <h2 class="content-title">Notre Mission</h2>
            <p>
              Notre mission est double : valoriser le savoir-faire guinéen à travers des créations modernes et offrir une plateforme
              d'expression aux jeunes talents.
            </p>
            <ul class="mission-list">
              <li><strong>Innovation :</strong> Repousser les limites de la création locale.</li>
              <li><strong>Formation :</strong> Transmettre les compétences aux nouvelles générations.</li>
              <li><strong>Collaboration :</strong> Créer des synergies entre artistes de différents horizons.</li>
            </ul>
          </div>

          <!-- Team Content -->
          <div v-if="section === 'team'" class="content-block">
            <h2 class="content-title">L'Équipe</h2>
            <p class="mb-8">
              Une équipe passionnée et diversifiée, unie par la volonté de créer et d'innover.
            </p>
            <div class="team-grid">
              <div class="team-member">
                <div class="team-member__image-wrapper">
                   <img src="https://i.pravatar.cc/300?u=director" alt="Directeur" class="team-member__image" />
                </div>
                <div class="team-member__content">
                  <h3 class="team-member__name">M. Fodé Moussa Soumah</h3>
                  <p class="team-member__role">Directeur Général</p>
                </div>
              </div>
               <div class="team-member">
                <div class="team-member__image-wrapper">
                   <img src="https://i.pravatar.cc/300?u=designer" alt="Designer" class="team-member__image" />
                </div>
                <div class="team-member__content">
                  <h3 class="team-member__name">M. Ismael Camara</h3>
                  <p class="team-member__role">Directeur Créatif</p>
                </div>
              </div>
               <div class="team-member">
                <div class="team-member__image-wrapper">
                   <img src="https://i.pravatar.cc/300?u=tech" alt="Tech" class="team-member__image" />
                </div>
                <div class="team-member__content">
                  <h3 class="team-member__name">M. Ibrahima Soumah</h3>
                  <p class="team-member__role">Responsable Formation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const section = computed(() => route.params.section as string)
const sectionTitle = computed(() => {
  const key = `about.${section.value}`
  return t(key) !== key ? t(key) : section.value.charAt(0).toUpperCase() + section.value.slice(1)
})

useHead({
  title: `${sectionTitle.value} - Kinnov'art`,
  meta: [
    { name: 'description', content: `En savoir plus sur ${sectionTitle.value} chez Kinnov'art.` }
  ]
})
</script>

<style lang="scss" scoped>
.page-title {
  font-family: $font-heading;
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  color: var(--color-primary);
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }
}

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

.mission-list {
  list-style: disc;
  padding-left: $spacing-6;
  margin-top: $spacing-6;

  li {
    margin-bottom: $spacing-3;
  }
}

// Team Grid - More space
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  
  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-8;
  }
}

.team-member {
  background-color: var(--color-surface);
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-md;
  display: flex;
  align-items: center;
  text-align: left;
  transition: transform $transition-base $easing-in-out;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }
  
  &__image-wrapper {
    width: 120px;
    min-width: 120px; // Prevent shrinking
    height: 120px; // Match width for square/circle or full height
    margin: 0; // Reset margin
    border-radius: 0; // Rectangle or partial
    // Let's make it a full height image section on the left
    height: 100%;
    position: relative;
    
    // Ensure image covers
    & img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    padding: $spacing-4;
    flex-grow: 1;
  }

  &__name {
    font-family: $font-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-primary);
    margin-bottom: $spacing-1;
    line-height: $line-height-tight;
  }

  &__role {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    font-weight: $font-weight-medium;
  }
}
</style>
