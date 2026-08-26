<template>
  <div class="about-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title" style="color: var(--color-accent);">{{ $t('about.title') }}</h1>
        <p class="page-subtitle" style="color: rgba(255, 255, 255, 0.9);">{{ $t('about.subtitle') }}</p>
      </div>
    </Section>

    <!-- Mission -->
    <Section bg="white">
      <div class="content-section scroll-reveal">
        <h2 class="section-title">{{ $t('about.missionTitle') }}</h2>
        <p class="lead">{{ $t('about.missionText') }}</p>
        <p class="body-text">
          Depuis notre création, nous nous engageons à fournir un espace où la créativité peut s'épanouir. 
          Notre atelier situé à Nongo, face à la Mosquée Bilal Mansour Fadiga, est devenu un hub pour les 
          artistes, designers et créateurs de toute la Guinée.
        </p>
      </div>
    </Section>

    <!-- Team -->
    <Section bg="gray">
      <h2 class="section-title text-center scroll-reveal">{{ $t('about.teamTitle') }}</h2>
      <div class="grid grid-cols-3" style="margin-top: 3rem;">
        <Card 
          v-for="member in teamMembers" 
          :key="member.id"
          :image="member.image"
          :title="member.name"
          :description="member.role"
          class="scroll-reveal"
        />
      </div>
    </Section>

    <!-- Location -->
    <Section bg="white">
      <div class="location-section scroll-reveal">
        <h2 class="section-title text-center">{{ $t('contact.location') }}</h2>
        <p class="text-center lead">{{ $t('about.location') }}</p>
        <div class="map-placeholder">
          <NuxtImg 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
            alt="Map location"
            class="map-image"
          />
          <div class="map-marker">
            <div class="marker-pin">📍</div>
            <span class="marker-text">Kinnov'art Nongo</span>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const teamMembers = [
  {
    id: 1,
    name: 'Ismael Camara',
    role: 'Directeur Créatif',
    image: 'https://i.pravatar.cc/300?u=amadou'
  },
  {
    id: 2,
    name: 'Ibrahima Sory Savané',
    role: 'Responsable Formation',
    image: 'https://i.pravatar.cc/300?u=mariama2'
  },
  {
    id: 3,
    name: 'Fode Soumah',
    role: 'Chef Atelier Mobilier',
    image: 'https://i.pravatar.cc/300?u=ibrahima'
  }
]

useHead({
  title: 'À Propos - Kinnov\'art',
  meta: [
    { name: 'description', content: 'Découvrez l\'histoire, la mission et l\'équipe de Kinnov\'art' }
  ]
})
</script>

<style lang="scss" scoped>
.page-title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }
}

.page-subtitle {
  font-size: $font-size-lg;
  max-width: 700px;
  margin: 0 auto;

  @include respond-to('md') {
    font-size: $font-size-xl;
  }
}

.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-primary;
  margin-bottom: $spacing-6;

  @include respond-to('md') {
    font-size: $font-size-4xl;
  }
}

.content-section {
  max-width: 800px;
  margin: 0 auto;

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

.map-placeholder {
  position: relative;
  margin-top: $spacing-8;
  border-radius: $radius-2xl;
  overflow: hidden;
  height: 400px;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.3);
}

.map-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  animation: bounce 2s infinite;
}

.marker-pin {
  font-size: $font-size-5xl;
  filter: drop-shadow(0 4px 8px rgba($color-black, 0.3));
}

.marker-text {
  display: block;
  margin-top: $spacing-2;
  padding: $spacing-2 $spacing-4;
  background-color: $color-white;
  color: $color-primary;
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
}
</style>
