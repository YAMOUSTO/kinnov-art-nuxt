<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="container hero__container">
        <div class="hero__content scroll-reveal">
          <h1 class="hero__title">{{ $t('home.heroTitle') }}</h1>
          <p class="hero__subtitle">{{ $t('home.heroSubtitle') }}</p>
          <div class="hero__actions">
            <Button variant="accent" size="lg" :to="localePath('/gallery')" class="hero__cta">
              {{ $t('home.heroCta') }}
            </Button>
            <Button variant="outline" size="lg" :to="localePath('/contact')" class="hero__cta-secondary">
              {{ $t('nav.contact') }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Scroll Down Indicator -->
      <a href="#intro" class="hero__scroll-down" @click.prevent="scrollToSection('intro')">
        <span class="sr-only">Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </a>
    </section>

    <!-- Brand Introduction -->
    <Section id="intro" class="section--intro">
      <div class="container">
        <div class="intro__content scroll-reveal">
          <div class="intro__text">
            <h2 class="section-title">Kinnov'art</h2>
            <p class="lead">
              {{ $t('home.brandIntro') }}
            </p>
            <div class="intro__stats">
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">{{ $t('creators.title') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">{{ $t('gallery.artProjects') }}</span>
              </div>
            </div>
          </div>
          <div class="intro__image-wrapper">
             <NuxtImg 
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800"
              alt="Kinnov'art Studio" 
              class="intro__image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>

    <!-- Services -->
    <Section class="section--services">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title scroll-reveal">{{ $t('home.services') }}</h2>
          <p class="section-subtitle">{{ $t('home.heroSubtitle') }}</p>
        </div>
        
        <div class="services-grid">
          <!-- Furniture Design -->
          <div class="service-card scroll-reveal">
            <div class="service-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
            </div>
            <h3 class="service-card__title">{{ $t('home.furnitureDesign') }}</h3>
            <p class="service-card__desc">{{ $t('home.furnitureDesc') }}</p>
          </div>

          <!-- Artist Management -->
          <div class="service-card scroll-reveal service-card--delay-1">
             <div class="service-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="service-card__title">{{ $t('home.artistManagement') }}</h3>
            <p class="service-card__desc">{{ $t('home.artistDesc') }}</p>
          </div>

          <!-- Audiovisual -->
          <div class="service-card scroll-reveal service-card--delay-2">
             <div class="service-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
            </div>
            <h3 class="service-card__title">{{ $t('home.audioVideo') }}</h3>
            <p class="service-card__desc">{{ $t('home.audioVideoDesc') }}</p>
          </div>

          <!-- Talent Discovery -->
          <div class="service-card scroll-reveal service-card--delay-3">
             <div class="service-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="service-card__title">{{ $t('home.talentDiscovery') }}</h3>
            <p class="service-card__desc">{{ $t('home.talentDesc') }}</p>
          </div>
        </div>
      </div>
    </Section>

    <!-- Featured Projects -->
    <Section class="section--projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title scroll-reveal">{{ $t('home.featuredProjects') }}</h2>
          <Button variant="outline" :to="localePath('/gallery')">
            {{ $t('common.viewAll') }}
          </Button>
        </div>
        <div class="featured-grid">
          <Card 
            v-for="project in featuredProjects" 
            :key="project.id"
            :image="project.image"
            :title="project.title[locale]"
            :description="project.description[locale]"
            :badge="$t(`gallery.${project.category}`)"
            :to="localePath(`/gallery`)"
            class="scroll-reveal"
          />
        </div>
      </div>
    </Section>

    <!-- Featured Artists -->
    <Section class="section--creators" bg="gray">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title scroll-reveal">{{ $t('creators.title') }}</h2>
          <Button variant="outline" :to="localePath('/creators')">
            {{ $t('common.viewAll') }}
          </Button>
        </div>
        <div class="creators-grid">
          <Card 
            v-for="artist in featuredArtists" 
            :key="artist.id"
            :image="artist.image"
            :title="artist.name"
            :description="artist.bio[locale]"
            :badge="artist.specialty"
            :to="localePath(`/creators`)"
            class="scroll-reveal"
          />
        </div>
      </div>
    </Section>

    <!-- Audiovisual Productions (New Premium Cards) -->
    <Section class="section--audiovisual">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title scroll-reveal">{{ $t('home.audioVideo') }}</h2>
          <Button variant="outline" :to="localePath('/gallery')">
            {{ $t('common.viewAll') }}
          </Button>
        </div>
        <div class="audiovisual-grid">
          <MediaCard 
            v-for="project in audiovisualProjects" 
            :key="project.id"
            :image="project.image"
            :title="project.title[locale]"
            :description="project.description[locale]"
            :badge="$t('home.audioVideo')"
            :actionText="$t('common.learnMore')"
            :to="localePath('/gallery')"
            class="scroll-reveal"
          />
        </div>
      </div>
    </Section>

    <!-- Latest News (Horizontal Cards) -->
    <Section class="section--news" bg="gray">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title scroll-reveal">{{ $t('blog.title') }}</h2>
          <Button variant="outline" :to="localePath('/blog')">
            {{ $t('common.viewAll') }}
          </Button>
        </div>
        <div class="news-grid">
          <HorizontalCard 
            v-for="post in latestPosts" 
            :key="post.id"
            :image="post.image"
            :category="$t(`blog.${post.category}`)"
            :date="post.date"
            :title="post.title[locale]"
            :description="post.excerpt[locale]"
            :actionText="$t('blog.readMore')"
            :to="localePath('/blog')"
            class="scroll-reveal"
          />
        </div>
      </div>
    </Section>

    <!-- Location CTA -->
    <Section class="section--cta" bg="primary">
      <div class="container text-center scroll-reveal">
        <h2 class="section-title cta-title">{{ $t('about.location') }}</h2>
        <p class="lead cta-text">
          Nongo, Conakry, Guinée. {{ $t('home.heroSubtitle') }}
        </p>
        <Button variant="accent" size="lg" :to="localePath('/contact')">
          {{ $t('nav.contact') }}
        </Button>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { getFeaturedProjects, getProjectsByCategory } = useProjects()
const { getArtistsByType } = useArtists()
const { getPosts } = useBlogPosts()

const featuredProjects = getFeaturedProjects().slice(0, 3)
const audiovisualProjects = getProjectsByCategory('audiovisual').slice(0, 3)
const featuredArtists = getArtistsByType('featured')
const latestPosts = getPosts().slice(0, 2) // Match screenshot (2 cards)

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO
useHead({
  title: 'Kinnov\'art - L\'art de l\'Innovation Créative',
  meta: [
    { name: 'description', content: 'Centre créatif à Nongo spécialisé dans le design de mobilier, la gestion d\'artistes et la production audiovisuelle.' }
  ]
})
</script>

<style lang="scss" scoped>
// Hero Section
.hero {
  position: relative;
  min-height: 90vh;
  @include flex-center;
  background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920'); // More artistic
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.85), rgba(0, 0, 0, 0.9));
    z-index: 1;
  }

  &__container {
    position: relative;
    z-index: 2;
  }

  &__content {
    text-align: center;
    color: #FFFFFF; // Always white on hero
    max-width: 900px;
    margin: 0 auto;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-extrabold;
    margin-bottom: $spacing-6;
    text-shadow: 0 4px 6px rgba(0,0,0,0.3);

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
    margin-bottom: $spacing-10;
    color: rgba(255, 255, 255, 0.95);
    font-weight: $font-weight-medium;

    @include respond-to('md') {
      font-size: $font-size-xl;
    }
  }

  &__actions {
    @include flex-center;
    gap: $spacing-4;
    flex-wrap: wrap;
  }

  &__cta {
    min-width: 160px;
    box-shadow: $shadow-lg;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &__cta-secondary {
    min-width: 160px;
    border-color: #FFFFFF;
    color: #FFFFFF;
    
    &:hover {
      background-color: #FFFFFF;
      color: var(--color-primary);
    }
  }

  &__scroll-down {
    position: absolute;
    bottom: max(6vh, 40px); // Ensure it's not hidden by mobile browser UI
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-white);
    animation: bounce 2s infinite;
    cursor: pointer;
    z-index: 20; // Ensure it's above the overlay (z-index 1) and container (z-index 2)
    padding: $spacing-2; // Larger touch area
    background: rgba(0,0,0,0.2); // Subtle semi-transparent background for contrast
    border-radius: $radius-full;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all $transition-base $easing-in-out;
    
    svg {
      width: 40px;
      height: 40px;
      stroke-width: 2.5; // Thicker lines for visibility
    }

    &:hover {
      color: var(--color-accent);
      background: rgba(0,0,0,0.4);
      transform: translateX(-50%) translateY(-5px);
    }
  }
}

// Intro Section
.section--intro {
  background-color: var(--color-background);
}

.intro {
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-12;
    align-items: center;

    @include respond-to('lg') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__text {
    text-align: left;
  }

  &__image-wrapper {
    position: relative;
    border-radius: $radius-2xl;
    overflow: hidden;
    box-shadow: $shadow-2xl;
    aspect-ratio: 4/3;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $easing-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__stats {
    display: flex;
    gap: $spacing-12;
    margin-top: $spacing-8;
    border-top: 1px solid var(--border-color);
    padding-top: $spacing-8;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: $font-heading;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: var(--color-secondary);
}

.stat-label {
  font-size: $font-size-sm;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

// Services Section
.section--services {
  background-color: var(--color-surface);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-8;
  margin-top: $spacing-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service-card {
  background-color: var(--color-background);
  padding: $spacing-8 $spacing-6;
  border-radius: $radius-xl;
  text-align: center;
  transition: all $transition-base $easing-in-out;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-8px);
    background-color: var(--color-surface);
    box-shadow: $shadow-xl;
    border-color: var(--border-color);

    .service-card__icon {
      background-color: var(--color-primary);
      color: var(--color-white);
      transform: rotate(15deg);
    }
    
    .service-card__title {
      color: var(--color-secondary);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-6;
    background-color: var(--color-gray-100);
    color: var(--color-primary);
    border-radius: $radius-full;
    @include flex-center;
    transition: all $transition-base $easing-in-out;
    border: 1px solid var(--border-color);
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin-bottom: $spacing-4;
    transition: color $transition-base $easing-in-out;
  }

  &__desc {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    line-height: $line-height-relaxed;
  }
}

// Section Header Layout
.section-header {
  @include flex-between;
  align-items: flex-end;
  margin-bottom: $spacing-12;
  
  &.text-center {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: var(--color-primary);
  margin-bottom: $spacing-2;

  @include respond-to('md') {
    font-size: $font-size-4xl;
  }
}

.section-subtitle {
  font-size: $font-size-lg;
  color: var(--color-text-muted);
  max-width: 600px;
}

.featured-grid,
.creators-grid,
.audiovisual-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  margin-top: $spacing-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  margin-top: $spacing-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card--delay-1 { transition-delay: 100ms; }
.service-card--delay-2 { transition-delay: 200ms; }
.service-card--delay-3 { transition-delay: 300ms; }

.cta-title {
  color: var(--color-accent);
  margin-bottom: $spacing-4;
}

.cta-text {
  color: var(--color-white);
  margin-bottom: $spacing-8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
