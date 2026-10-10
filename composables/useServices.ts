import type { Service } from '~/types'

/**
 * Single source of truth for the studio's service offering.
 *
 * This list comes from the site owner and replaces the four generic service cards the
 * homepage used to advertise ("Furniture Design", "Artist Management", "Audiovisual
 * Production", "Talent Discovery"). Three of those four were not services the studio
 * actually sells. The order below is the owner's own priority order — do not reorder
 * without asking him, the first entry is what he leads with.
 *
 * `examples` are transcribed verbatim from his brief, not invented. Where he gave no
 * example (kiosks) the list is empty and the template renders no bullet block, rather
 * than padding it with plausible-sounding filler.
 *
 * NOTE FOR THE SITE OWNER — two things need your confirmation:
 *  1. "Photo de cours" (service 5) is rendered exactly as written. It is ambiguous in
 *     French — it may mean photographing the training courses at the Maison des Jeunes,
 *     or something else. Confirm before launch and the translation can be corrected.
 *  2. All images are the owner's own photographs, converted to WebP in
 *     `public/images/webp/` (cards ≈ 800px wide).
 */
const SERVICES: Service[] = [
  {
    slug: 'scenography',
    icon: 'layers',
    examplesKey: 'services.items.scenography.examples',
    image: '/images/webp/svc-scenography-800.webp',
    alt: 'Décor blanc conçu par Kinnov’art pour un clip, avec fauteuil et mannequin'
  },
  {
    slug: 'tireFurniture',
    icon: 'disc',
    examplesKey: 'services.items.tireFurniture.examples',
    image: '/images/webp/svc-tire-furniture-800.webp',
    alt: 'Table basse fabriquée à partir d’un pneu recyclé peint en blanc'
  },
  {
    slug: 'kiosks',
    icon: 'home',
    examplesKey: 'services.items.kiosks.examples',
    image: '/images/webp/svc-kiosks-800.webp',
    alt: 'Kiosque conçu et réalisé par Kinnov’art',
    imageSecondary: '/images/webp/svc-kiosks-2-800.webp',
    imageSecondaryAlt: 'Autre kiosque réalisé par Kinnov’art'
  },
  {
    slug: 'spaceDesign',
    icon: 'grid',
    examplesKey: 'services.items.spaceDesign.examples',
    image: '/images/webp/svc-space-design-800.webp',
    alt: 'Espace événementiel entièrement aménagé et habillé par Kinnov’art',
    imageSecondary: '/images/webp/svc-space-best-1200.webp',
    imageSecondaryAlt: 'Espace aménagé et décoré par Kinnov’art'
  },
  {
    slug: 'production',
    icon: 'film',
    examplesKey: 'services.items.production.examples',
    image: '/images/webp/svc-production-800.webp',
    alt: 'Artiste en shooting photo pendant une production Kinnov’art',
    imageSecondary: '/images/webp/svc-production-2-800.webp',
    imageSecondaryAlt: 'Prise de vue photo lors d’une production Kinnov’art'
  }
]

export const useServices = () => ({
  services: SERVICES,
  getServices: () => SERVICES,
  getService: (slug: string) => SERVICES.find(s => s.slug === slug)
})
