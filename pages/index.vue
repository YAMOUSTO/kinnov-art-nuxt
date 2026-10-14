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
            <Button variant="accent" size="lg" :to="localePath('/services')" class="hero__cta">
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
        <span class="sr-only">{{ $t('a11y.scrollDown') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"></polyline></svg>
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
              <div v-for="stat in stats" :key="stat.labelKey" class="stat-item">
                <span class="stat-number">{{ stat.value }}</span>
                <span class="stat-label">{{ $t(stat.labelKey) }}</span>
              </div>
            </div>
          </div>
          <div class="intro__image-wrapper">
             <NuxtImg
              src="/images/webp/pdg-900.webp"
              :alt="$t('home.introImageAlt')"
              class="intro__image"
              width="900"
              height="1171"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>

    <!-- Services -->
    <Section class="section--services" id="services">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title scroll-reveal">{{ $t('services.title') }}</h2>
          <p class="section-subtitle">{{ $t('services.subtitle') }}</p>
        </div>

        <div class="services-grid">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="`${localePath('/services')}#${service.slug}`"
            class="service-card scroll-reveal"
          >
            <div class="service-card__media">
              <NuxtImg
                :src="service.image"
                :alt="$t(`services.items.${service.slug}.imageAlt`)"
                class="service-card__image"
                :style="serviceCardPosition(service)"
                width="800"
                height="500"
                loading="lazy"
              />
              <div class="service-card__icon">
                <ServiceIcon :name="service.icon" />
              </div>
            </div>
            <h3 class="service-card__title">
              {{ $t(`services.items.${service.slug}.title`) }}
            </h3>
            <p class="service-card__desc">
              {{ $t(`services.items.${service.slug}.description`) }}
            </p>
            <ul v-if="examples(service).length" class="service-card__examples">
              <li v-for="example in examples(service)" :key="example" class="service-card__example">
                {{ example }}
              </li>
            </ul>
            <span class="service-card__more">
              {{ $t('common.learnMore') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </NuxtLink>
        </div>

        <div class="services-cta text-center scroll-reveal">
          <Button variant="outline" :to="localePath('/services')">
            {{ $t('home.servicesCta') }}
          </Button>
        </div>
      </div>
    </Section>

    <!-- Notre démarche — trois principes (recyclage, formation, création locale).
         Contenu strictement descriptif : aucun chiffre ni promesse inventés. -->
    <Section class="section--approach" bg="gray" id="approche">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title scroll-reveal">{{ $t('home.approachTitle') }}</h2>
          <p class="section-subtitle">{{ $t('home.approachSubtitle') }}</p>
        </div>

        <ul class="approach-grid">
          <li
            v-for="pillar in approach"
            :key="pillar.key"
            class="approach-card scroll-reveal"
          >
            <span class="approach-card__icon">
              <ServiceIcon :name="pillar.icon" :size="28" />
            </span>
            <h3 class="approach-card__title">{{ $t(`home.approach.${pillar.key}.title`) }}</h3>
            <p class="approach-card__text">{{ $t(`home.approach.${pillar.key}.text`) }}</p>
          </li>
        </ul>
      </div>
    </Section>

    <!-- Réalisations -->
    <Section class="section--gallery" padding="lg">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title scroll-reveal">{{ $t('home.galleryTitle') }}</h2>
          <p class="section-subtitle">{{ $t('home.gallerySubtitle') }}</p>
        </div>

        <!-- Filtres par service. Le HTML des tuiles est recréé à chaque filtre,
             donc elles ne portent volontairement pas `scroll-reveal` (l'observer
             n'agit que sur les nœuds présents à l'entrée de la page). -->
        <div
          class="gallery-filters scroll-reveal"
          role="group"
          :aria-label="$t('home.galleryTitle')"
        >
          <button
            v-for="filter in galleryFilters"
            :key="filter.slug"
            type="button"
            class="gallery-filter"
            :class="{ 'gallery-filter--active': activeGalleryFilter === filter.slug }"
            :aria-pressed="activeGalleryFilter === filter.slug"
            @click="activeGalleryFilter = filter.slug"
          >
            {{ $t(filter.labelKey) }}
          </button>
        </div>

        <div v-if="visibleGallery.length" class="gallery-grid">
          <figure
            v-for="(photo, i) in visibleGallery"
            :key="photo.src"
            class="gallery-item"
          >
            <NuxtImg
              :src="photo.src"
              :alt="galleryAlt(photo)"
              class="gallery-item__image"
              :style="photo.position ? { objectPosition: photo.position } : undefined"
              width="800"
              height="800"
              loading="lazy"
            />
            <figcaption class="gallery-item__caption">
              {{ galleryCaption(photo) }}
            </figcaption>
          </figure>
        </div>

        <!-- Affiché quand un filtre n'a aucune tuile (ex. catégorie non encore
             documentée). -->
        <p v-else class="gallery-empty">{{ $t('home.galleryEmpty') }}</p>

        <div class="gallery-more text-center">
          <Button variant="outline" size="md" :to="localePath('/galerie')">
            {{ $t('home.galleryViewAll') }}
          </Button>
        </div>
      </div>
    </Section>

    <!-- Clips produits par Kinnov'art pour des artistes guinéens (liste réelle
         fournie par le propriétaire). -->
    <Section class="section--testimonials" padding="lg">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title scroll-reveal">{{ $t('home.testimonialsTitle') }}</h2>
          <p class="section-subtitle">{{ $t('home.testimonialsSubtitle') }}</p>
        </div>
      </div>

      <!-- Marquee en défilement continu : la liste est rendue deux fois pour une
           boucle sans couture, la copie dupliquée étant masquée aux technologies
           d'assistance. Les commandes précédent/suivant basculent la piste en
           positionnement manuel (l'animation CSS est alors coupée), ce qui rend
           le bloc utilisable au clavier et au toucher. -->
      <div class="testimonials" :class="{ 'testimonials--manual': testimonialsManual }">
        <div
          ref="testimonialsTrackRef"
          class="testimonials__track"
          :style="testimonialsManual ? testimonialsTrackStyle : undefined"
        >
          <figure
            v-for="i in marqueeItems"
            :key="i"
            class="testimonial"
            :aria-hidden="i >= testimonialCount ? 'true' : undefined"
          >
            <span class="testimonial__mark" aria-hidden="true">♪</span>
            <blockquote class="testimonial__quote">
              {{ $t(`home.testimonials.${i % testimonialCount}.quote`) }}
            </blockquote>
            <figcaption class="testimonial__author">
              <span class="testimonial__avatar" aria-hidden="true">{{ testimonialInitials(i % testimonialCount) }}</span>
              <span class="testimonial__meta">
                <cite class="testimonial__name">{{ $t(`home.testimonials.${i % testimonialCount}.artist`) }}</cite>
                <span class="testimonial__role">{{ $t('home.clipLabel') }} · {{ $t(`home.testimonials.${i % testimonialCount}.song`) }}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <!-- Commandes de la liste de clips (le clavier atteint les boutons
           nativement). -->
      <div class="testimonials__controls">
        <button
          type="button"
          class="testimonials__control"
          :aria-label="$t('home.testimonialsPrev')"
          @click="prevTestimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          class="testimonials__control"
          :aria-label="$t('home.testimonialsNext')"
          @click="nextTestimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </Section>

    <!-- Location CTA -->

    <Section class="section--cta" bg="primary">
      <div class="container text-center scroll-reveal">
        <h2 class="section-title cta-title">{{ $t('home.locationTitle') }}</h2>
        <p class="lead cta-text">
          {{ $t('about.location') }}
        </p>
        <Button variant="accent" size="lg" :to="localePath('/contact')">
          {{ $t('nav.contact') }}
        </Button>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Service } from '~/types'

const { t, tm } = useI18n()
const localePath = useLocalePath()
const { services } = useServices()
const { stats } = useStats()

/**
 * Same key-resolution guard as the services page: `tm()` returns the raw message
 * structure (compiled AST nodes with vue-i18n v11, not plain strings), so each
 * entry is resolved back through `t()` by index, and a missing key would make
 * `tm` return a string rather than a list.
 */
const examples = (service: Service): string[] => {
  const key = `services.items.${service.slug}.examples`
  const value = tm(key)
  if (!Array.isArray(value)) return []
  return value.map((_, i) => t(`${key}.${i}`))
}

/**
 * « Notre démarche » — trois piliers. Les icônes réutilisent ServiceIcon ; le
 * texte vit dans les fichiers de locale (`home.approach.<key>.title|text`, FR + EN).
 */
const approach = [
  { key: 'recycling', icon: 'recycle' },
  { key: 'training', icon: 'cap' },
  { key: 'local', icon: 'feather' }
] as const

/**
 * Cadrage des photos de cartes services sur l'accueil. La photo « kiosque »
 * affiche une enseigne tierce et la photo « production » une liste de titres
 * d'artistes : on décale le point de recadrage pour sortir ce texte du cadre
 * 16/10 de la carte.
 *
 * TODO propriétaire : vérifier ce recadrage (texte tiers « Loterie Nationale
 *   Guinée » sur la photo kiosque). Fournir une nouvelle photo si le texte
 *   reste visible.
 * TODO propriétaire : vérifier le recadrage de la photo « production » (liste
 *   de titres d'artistes) ; fournir une nouvelle photo si besoin.
 * TODO propriétaire : vérifier l'autorisation d'utiliser les marques visibles
 *   (« Loterie Nationale Guinée »).
 */
const SERVICE_IMAGE_POSITION: Record<string, string> = {
  kiosks: 'center 30%',
  production: 'center 70%'
}

const serviceCardPosition = (service: Service) => {
  const position = SERVICE_IMAGE_POSITION[service.slug]
  return position ? { objectPosition: position } : undefined
}

type HomeGalleryService =
  | 'scenography'
  | 'furniture'
  | 'kiosks'
  | 'spaceDesign'
  | 'production'
  | 'training'

interface HomeGalleryPhoto {
  src: string
  /** Service implied by the photo; `null` = indéterminé (visible sous « Tous »). */
  service: HomeGalleryService | null
}

/**
 * Galerie « Réalisations » de l'accueil — huit tuiles, avec AU PLUS un kiosque
 * et un mobilier/pouf. Dérivés WebP 800px dans public/images/webp/ ; originaux
 * hors déploiement (source-images/, gitignoré).
 * Ne jamais utiliser rouge-couteau.jpg (exclusion demandée par le propriétaire).
 *
 * Les `service` ci-dessous sont provisoires : la photo ne permet pas toujours de
 * trancher, et elle n'est pas visible depuis le code.
 * TODO propriétaire : confirmer le type de chaque réalisation (donc son filtre)
 *   et corriger `service` (ou mettre `null`) selon le contenu réel.
 * TODO propriétaire : décrire chaque photo (alt) pour l'accessibilité et le SEO.
 */
const gallery: HomeGalleryPhoto[] = [
  { src: '/images/webp/image_acceuil-800.webp', service: 'spaceDesign' },
  { src: '/images/webp/best1-800.webp', service: 'scenography' },
  { src: '/images/webp/meilleur-img-800.webp', service: 'spaceDesign' },
  { src: '/images/webp/best0-800.webp', service: 'production' },
  { src: '/images/webp/fb-470202327-800.webp', service: 'kiosks' },
  { src: '/images/webp/best4-800.webp', service: 'spaceDesign' },
  { src: '/images/webp/fauteuil-800.webp', service: 'furniture' },
  { src: '/images/webp/best2-800.webp', service: 'training' }
]

const galleryFilters = [
  { slug: 'all', labelKey: 'home.galleryFilters.all' },
  { slug: 'scenography', labelKey: 'home.galleryFilters.scenography' },
  { slug: 'furniture', labelKey: 'home.galleryFilters.furniture' },
  { slug: 'kiosks', labelKey: 'home.galleryFilters.kiosks' },
  { slug: 'spaceDesign', labelKey: 'home.galleryFilters.spaceDesign' },
  { slug: 'production', labelKey: 'home.galleryFilters.production' },
  { slug: 'training', labelKey: 'home.galleryFilters.training' }
] as const

const activeGalleryFilter = ref<string>('all')

const visibleGallery = computed(() =>
  activeGalleryFilter.value === 'all'
    ? gallery
    : gallery.filter((photo) => photo.service === activeGalleryFilter.value)
)

// Légende = type de réalisation localisé ; repli générique si le type est inconnu.
const galleryCaption = (photo: HomeGalleryPhoto) =>
  photo.service
    ? t(`home.galleryFilters.${photo.service}`)
    : t('home.galleryCaption')

const galleryAlt = (photo: HomeGalleryPhoto) => {
  const n = gallery.indexOf(photo) + 1
  return t('home.galleryAlt', { type: galleryCaption(photo), n })
}

// Clips: length comes from `tm()` (compiled AST structure, so only the
// count is usable); every visible string is resolved through `t()` per index.
const testimonialCount = computed(() => {
  const raw = tm('home.testimonials')
  return Array.isArray(raw) ? raw.length : 0
})

// Two copies of the list so the marquee can translate -50% and loop seamlessly.
const marqueeItems = computed(() =>
  Array.from({ length: testimonialCount.value * 2 }, (_, i) => i)
)

const testimonialInitials = (i: number) =>
  t(`home.testimonials.${i}.artist`)
    .split(' ')
    .map((word) => word[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase()

// Contrôles du marquee de clips. Tant que l'utilisateur n'intervient pas, la
// piste défile en CSS ; au premier clic, on coupe l'animation et on repositionne
// la piste en `translateX`, ce qui la rend pilotable au clavier et au toucher.
const testimonialsManual = ref(false)
const testimonialIndex = ref(0)
const testimonialStep = ref(0)
const testimonialsTrackRef = ref<HTMLElement | null>(null)

const measureTestimonialStep = () => {
  const first = testimonialsTrackRef.value?.firstElementChild as HTMLElement | null
  if (!first) return
  const marginRight = parseFloat(window.getComputedStyle(first).marginRight) || 0
  testimonialStep.value = first.offsetWidth + marginRight
}

const testimonialsTrackStyle = computed(() => ({
  animation: 'none',
  transform: `translateX(-${testimonialIndex.value * testimonialStep.value}px)`
}))

const goToTestimonial = (i: number) => {
  const count = testimonialCount.value
  if (!count) return
  testimonialsManual.value = true
  measureTestimonialStep()
  testimonialIndex.value = ((i % count) + count) % count
}

const nextTestimonial = () => goToTestimonial(testimonialIndex.value + 1)
const prevTestimonial = () => goToTestimonial(testimonialIndex.value - 1)

onMounted(() => window.addEventListener('resize', measureTestimonialStep))
onUnmounted(() => window.removeEventListener('resize', measureTestimonialStep))

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO. The hero is a CSS background, so its image is preloaded explicitly —
// the browser would otherwise discover it only after the stylesheet parses
// (LCP regression).
usePageSeo({
  titleKey: 'pageMeta.home.title',
  descriptionKey: 'pageMeta.home.description',
  image: '/og/og-home.jpg'
})

useHead({
  link: [{ rel: 'preload', as: 'image', href: '/images/webp/image_acceuil-1920.webp' }]
})
</script>

<style lang="scss" scoped>
// Hero Section
.hero {
  position: relative;
  min-height: 90vh;
  @include flex-center;
  // Owner's own photo (facade with neon, tyres and painted drums), preloaded in
  // useHead above. The dark scrim overlay below keeps the white text readable.
  background-image: url('/images/webp/image_acceuil-1920.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &__overlay {
    position: absolute;
    inset: 0;
    // Dark veil centred behind the headline so the white text stays readable
    // while the photo reads through at the edges. Built from the neutral
    // --hero-scrim-base (black) only — never a palette colour — so the themes
    // differ solely by strength (--hero-scrim-strength, see _theme.scss).
    background: radial-gradient(
      ellipse 80% 70% at center,
      var(--hero-scrim-base) 0%,
      color-mix(in srgb, var(--hero-scrim-base) 70%, transparent) 45%,
      transparent 78%
    );
    opacity: var(--hero-scrim-strength);
    z-index: 1;
  }

  &__container {
    position: relative;
    z-index: 2;
  }

  &__content {
    text-align: center;
    // Always white on hero: the scrim behind it is dark in both themes, so this
    // must not be a theme token (audit H6).
    color: #FFFFFF;
    max-width: 900px;
    margin: 0 auto;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-extrabold;
    margin-bottom: $spacing-6;
    text-shadow: 0 4px 6px var(--shadow-color);

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
    // White at 95% over the dark hero scrim, in both themes.
    color: color-mix(in srgb, #FFFFFF 95%, transparent);
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
      color: $color-black;
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

  // The hero sits on a dark photo scrim in both themes, but the global
  // `:focus-visible` outline uses --color-secondary — black in the light theme,
  // which is invisible here. Force white so keyboard focus is always visible.
  &__cta,
  &__cta-secondary,
  &__scroll-down {
    &:focus-visible {
      outline: 2px solid #FFFFFF;
      outline-offset: 2px;
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
    // Portrait source (pdg-900.webp is 900×1171), so the frame mirrors that ratio
    // instead of the old 4/3 landscape crop that letterboxed the subject.
    aspect-ratio: 3 / 4;
    
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
    // Bias the crop upwards so the face stays centred when the frame narrows on
    // mobile.
    object-position: center 25%;
    transition: transform $transition-slow $easing-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-6 $spacing-10;
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
  // The three values are long placeholders ("À confirmer") until the owner
  // supplies the real figures, so the size is tuned to fit three wrapping
  // columns without breaking mid-word (see composables/useStats.ts).
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
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
  // Flex rather than grid: five cards in a 3-column grid leaves a visibly empty
  // third slot on the second row. Centred wrapping reads as a deliberate 3 + 2.
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-8;
  margin-top: $spacing-12;
}

.service-card {
  // The whole card is a NuxtLink to /services#slug, so it must not inherit the
  // global anchor underline/colour.
  flex: 1 1 300px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  border-radius: $radius-xl;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all $transition-base $easing-in-out;
  border: 1px solid var(--border-color);

  &:hover,
  &:focus-visible {
    transform: translateY(-8px);
    background-color: var(--color-surface);
    box-shadow: $shadow-xl;

    .service-card__icon {
      background-color: var(--color-primary);
      color: $color-black;
      transform: rotate(15deg);
    }

    .service-card__image {
      transform: scale(1.06);
    }

    .service-card__title {
      color: var(--color-secondary);
    }

    .service-card__more {
      color: var(--color-secondary);
      gap: $spacing-3;
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: var(--color-gray-100);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow $easing-out;
  }

  &__icon {
    position: absolute;
    left: $spacing-4;
    bottom: $spacing-4;
    width: 56px;
    height: 56px;
    background-color: var(--color-gray-100);
    color: var(--color-primary-text);
    border-radius: $radius-full;
    @include flex-center;
    transition: all $transition-base $easing-in-out;
    border: 1px solid var(--border-color);
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin: $spacing-6 $spacing-6 $spacing-3;
    transition: color $transition-base $easing-in-out;
  }

  &__desc {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    line-height: $line-height-relaxed;
    margin: 0 $spacing-6;
  }

  &__examples {
    list-style: none;
    padding: 0;
    margin: $spacing-4 $spacing-6 0;
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-2;
  }

  &__example {
    padding: $spacing-1 $spacing-3;
    border-radius: $radius-full;
    background-color: var(--color-surface);
    border: 1px solid var(--border-color);
    font-size: $font-size-xs;
    color: var(--color-text-muted);
  }

  &__more {
    display: inline-flex;
    align-items: center;
    gap: $spacing-2;
    margin: auto $spacing-6 $spacing-6;
    padding-top: $spacing-4;
    font-family: $font-heading;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: var(--color-primary-text);
    transition: color $transition-base $easing-in-out,
      gap $transition-base $easing-in-out;
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
  color: var(--color-primary-text);
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

// The service cards are now rendered by v-for with no per-index delay modifier.
// The staggered `service-card--delay-*` classes were removed with the old
// hand-written cards; `scroll-reveal` handles entry animation.
.services-cta {
  margin-top: $spacing-12;
}

// « Notre démarche » — trois piliers (recyclage, formation, création locale).
// The section background comes from the Section component (`bg="gray"`), which
// also gives the correct theme-aware means; only the inner layout lives here.
.approach-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  margin-top: $spacing-12;

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.approach-card {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  padding: $spacing-8;
  background-color: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  &__icon {
    @include flex-center;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    border-radius: $radius-full;
    background-color: var(--color-primary);
    color: $color-black;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
  }

  &__text {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    line-height: $line-height-relaxed;
  }
}

// Réalisations — simple responsive grid of the owner's photos (square crop,
// centred subject so nothing important is cut on mobile).
.section--gallery {
  background-color: var(--color-background);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-4;

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-6;
  }
}

// Filtres « Réalisations » : boutons pastille, l'actif en or plein.
.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-2;
  margin-bottom: $spacing-8;
}

.gallery-filter {
  padding: $spacing-2 $spacing-4;
  border-radius: $radius-full;
  border: 1px solid var(--border-color);
  background-color: var(--color-background);
  color: var(--color-text-muted);
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  transition: all $transition-base $easing-in-out;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-text);
    outline-offset: 2px;
  }

  &--active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: $color-black;
  }
}

.gallery-empty {
  margin: $spacing-12 0;
  text-align: center;
  font-size: $font-size-lg;
  color: var(--color-text-muted);
}

.gallery-more {
  margin-top: $spacing-8;
}

.gallery-item {
  position: relative;
  margin: 0;
  aspect-ratio: 1;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-md;
  transition: transform $transition-base $easing-in-out,
    box-shadow $transition-base $easing-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;

    .gallery-item__image {
      transform: scale(1.06);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform $transition-slow $easing-out;
  }

  // Type de réalisation, posé sur un dégradé bas pour rester lisible quelle que
  // soit la photo (le texte est blanc sur un scrim noir, dans les deux thèmes).
  &__caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $spacing-6 $spacing-4 $spacing-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-white;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  }
}

// Témoignages — cartes en défilement continu (marquee). La piste contient deux
// copies de la liste et translate -50% pour boucler sans couture : les cartes
// portent un margin-right (et non un gap sur la piste) pour que la moitié de la
// largeur tombe exactement sur le début de la copie.
.section--testimonials {
  background-color: var(--color-surface);
  overflow: hidden;
}

.testimonials {
  margin-top: $spacing-12;
  overflow: hidden;
  // Fade the edges so cards enter and leave smoothly.
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);

  &__track {
    display: flex;
    width: max-content;
    animation: testimonials-scroll 110s linear infinite;
  }

  // Reading a moving card is uncomfortable: pause on intent.
  &:hover &__track,
  &:focus-within &__track {
    animation-play-state: paused;
  }

  // Manual mode: the CSS marquee is replaced by an inline transform on the
  // track (see pages/index.vue script), so the pause rule no longer applies and
  // the edge fade would otherwise clip a card the user explicitly asked for.
  &--manual {
    mask-image: none;
    -webkit-mask-image: none;

    .testimonials__track {
      animation: none;
    }
  }
}

// Commandes précédent/suivant du bloc de clips, sous la piste.
.testimonials__controls {
  @include flex-center;
  gap: $spacing-4;
  margin-top: $spacing-8;
}

.testimonials__control {
  @include flex-center;
  width: 48px;
  height: 48px;
  border-radius: $radius-full;
  border: 1px solid var(--border-color);
  background-color: var(--color-background);
  color: var(--color-text);
  transition: all $transition-base $easing-in-out;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-text);
    outline-offset: 2px;
  }
}

.testimonial {
  flex: 0 0 auto;
  width: min(360px, 80vw);
  margin-right: $spacing-6;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  padding: $spacing-6;
  background-color: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: $radius-xl;
  box-shadow: $shadow-md;

  &__mark {
    font-family: $font-heading;
    font-size: $font-size-4xl;
    line-height: 0.8;
    height: 28px;
    color: var(--color-primary);
  }

  &__quote {
    margin: 0;
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: var(--color-text);
  }

  &__author {
    display: flex;
    align-items: center;
    gap: $spacing-3;
    margin-top: auto;
    padding-top: $spacing-2;
  }

  &__avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary);
    color: $color-black;
    font-family: $font-heading;
    font-weight: $font-weight-bold;
    font-size: $font-size-sm;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__name {
    font-style: normal;
    font-weight: $font-weight-bold;
    font-size: $font-size-sm;
    color: var(--color-text);
  }

  &__role {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
  }
}

@keyframes testimonials-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

// Static, horizontally scrollable fallback instead of a runaway animation.
@media (prefers-reduced-motion: reduce) {
  .testimonials {
    overflow-x: auto;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .testimonials__track {
    animation: none;
  }
}

// Location CTA — owner's photo behind a dark scrim so the gold title and white
// text stay readable (WCAG) over any part of the image.
.section--cta {
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url('/images/webp/best1-1920.webp');
  background-size: cover;
  background-position: center;
}

.cta-title {
  // Sits over a dark photo scrim (both themes), so use the light brand gold
  // rather than the dark-surface --color-accent/#D4AF37 pair that fails here.
  color: var(--color-primary);
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
