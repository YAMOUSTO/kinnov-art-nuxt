<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="container hero__container">
        <div class="hero__content scroll-reveal">
          <h1 class="hero__title">{{ $t('home.heroTitle') }}</h1>
          <p class="hero__subtitle">{{ $t('home.heroSubtitle') }}</p>
          <Button variant="accent" size="lg" :to="localePath('/gallery')" class="hero__cta">
            {{ $t('home.heroCta') }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Brand Introduction -->
    <Section bg="white">
      <div class="text-center scroll-reveal">
        <h2 class="section-title">Kinnov'art</h2>
        <p class="lead" style="max-width: 800px; margin: 0 auto;">
          {{ $t('home.brandIntro') }}
        </p>
      </div>
    </Section>

    <!-- Services -->
    <Section bg="gray">
      <h2 class="section-title text-center scroll-reveal">{{ $t('home.services') }}</h2>
      <div class="grid grid-cols-4" style="margin-top: 3rem;">
        <Card 
          v-for="service in services" 
          :key="service.id"
          :image="service.image"
          :title="$t(service.titleKey)"
          :description="$t(service.descKey)"
          class="scroll-reveal"
        />
      </div>
    </Section>

    <!-- Featured Projects -->
    <Section bg="white">
      <div class="section-header">
        <h2 class="section-title scroll-reveal">{{ $t('home.featuredProjects') }}</h2>
        <Button variant="outline" :to="localePath('/gallery')">
          {{ $t('common.viewAll') }}
        </Button>
      </div>
      <div class="grid grid-cols-3" style="margin-top: 3rem;">
        <Card 
          v-for="project in featuredProjects" 
          :key="project.id"
          :image="project.image"
          :title="project.title[locale]"
          :description="project.description[locale]"
          :badge="$t(`gallery.${project.category}`)"
          class="scroll-reveal"
        />
      </div>
    </Section>

    <!-- Featured Artists -->
    <Section bg="gray">
      <div class="section-header">
        <h2 class="section-title scroll-reveal">{{ $t('artists.title') }}</h2>
        <Button variant="outline" :to="localePath('/artists')">
          {{ $t('common.viewAll') }}
        </Button>
      </div>
      <div class="grid grid-cols-3" style="margin-top: 3rem;">
        <Card 
          v-for="artist in featuredArtists" 
          :key="artist.id"
          :image="artist.image"
          :title="artist.name"
          :description="artist.bio[locale]"
          :badge="artist.specialty"
          class="scroll-reveal"
        />
      </div>
    </Section>

    <!-- Location CTA -->
    <Section bg="primary" padding="lg">
      <div class="text-center scroll-reveal">
        <h2 class="section-title" style="color: var(--color-accent);">{{ $t('about.location') }}</h2>
        <Button variant="accent" size="lg" :to="localePath('/contact')" style="margin-top: 2rem;">
          {{ $t('nav.contact') }}
        </Button>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { getFeaturedProjects } = useProjects()
const { getArtistsByType } = useArtists()

const featuredProjects = getFeaturedProjects().slice(0, 3)
const featuredArtists = getArtistsByType('featured')

const services = [
  {
    id: 1,
    titleKey: 'home.furnitureDesign',
    descKey: 'home.furnitureDesc',
    image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    titleKey: 'home.artistManagement',
    descKey: 'home.artistDesc',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    titleKey: 'home.audioVideo',
    descKey: 'home.audioVideoDesc',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    titleKey: 'home.talentDiscovery',
    descKey: 'home.talentDesc',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  }
]

// SEO
useHead({
  title: 'Kinnov\'art - L\'art de l\'Innovation Créative',
  meta: [
    { name: 'description', content: 'Centre créatif à Nongo spécialisé dans le design de mobilier, la gestion d\'artistes et la production audiovisuelle.' }
  ]
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 90vh;
  @include flex-center;
  background-image: url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1920');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($color-primary, 0.9), rgba($color-secondary, 0.7));
    z-index: 1;
  }

  &__container {
    position: relative;
    z-index: 2;
  }

  &__content {
    text-align: center;
    color: $color-white;
    max-width: 900px;
    margin: 0 auto;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-extrabold;
    margin-bottom: $spacing-6;
    text-shadow: 2px 2px 4px rgba($color-black, 0.3);

    @include respond-to('md') {
      font-size: $font-size-5xl;
    }

    @include respond-to('lg') {
      font-size: $font-size-6xl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-8;
    color: rgba($color-white, 0.95);

    @include respond-to('md') {
      font-size: $font-size-xl;
    }
  }

  &__cta {
    animation: pulse 2s infinite;
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

.section-header {
  @include flex-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-4;
}
</style>
