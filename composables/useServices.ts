import type { Service } from '~/types'

/**
 * The five crafts the studio offers. Each entry carries the slug (which is also
 * the i18n key suffix), the icon, the representative image and the example list
 * key. The human-readable copy — titles, descriptions, examples AND the image
 * alt texts — lives in the locale files under `services.items.${slug}` so it
 * stays translatable (FR + EN) and consistent between the home and services
 * pages.
 *
 * Built from the owner's list. Do not invent examples for a service the owner
 * listed without one; the template hides the example block when the list is
 * empty.
 */
const SERVICES: Service[] = [
  {
    slug: 'scenography',
    icon: 'layers',
    examplesKey: 'services.items.scenography.examples',
    image: '/images/webp/svc-scenography-800.webp'
  },
  {
    slug: 'tireFurniture',
    icon: 'tyre',
    examplesKey: 'services.items.tireFurniture.examples',
    image: '/images/webp/svc-tire-furniture-800.webp'
  },
  {
    slug: 'kiosks',
    icon: 'home',
    examplesKey: 'services.items.kiosks.examples',
    // TODO propriétaire : la photo actuelle n'est pas un kiosque. Remplacer par
    // une vraie photo de kiosque réalisé par Kinnov'art (convertir en WebP 800px
    // puis mettre à jour le chemin ici).
    image: '/images/webp/svc-kiosks-800.webp',
    imageSecondary: '/images/webp/svc-kiosks-2-800.webp'
  },
  {
    slug: 'spaceDesign',
    icon: 'grid',
    examplesKey: 'services.items.spaceDesign.examples',
    image: '/images/webp/svc-space-design-800.webp',
    imageSecondary: '/images/webp/svc-space-best-1200.webp'
  },
  {
    slug: 'production',
    icon: 'film',
    examplesKey: 'services.items.production.examples',
    image: '/images/webp/svc-production-800.webp',
    imageSecondary: '/images/webp/svc-production-2-800.webp'
  }
]

export const useServices = () => ({
  services: SERVICES,
  getServices: () => SERVICES,
  getService: (slug: string) => SERVICES.find(s => s.slug === slug)
})
