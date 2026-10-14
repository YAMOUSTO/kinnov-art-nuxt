import type { Service } from '~/types'

/**
 * The six crafts the studio offers. Each entry carries the slug (which is also
 * the i18n key suffix), the icon, three representative photos and the example
 * list key. The human-readable copy — titles, descriptions, the "what's
 * included" bullets, the examples AND the image alt texts — lives in the locale
 * files under `services.items.${slug}` so it stays translatable (FR + EN) and
 * consistent between the home and services pages.
 *
 * Every service now uses the same three-image layout on /services: one large
 * photo (`image`, also reused by the homepage cards) plus two smaller
 * thumbnails (`imageSecondary`, `imageTertiary`). No photo file is reused across
 * services. `imagePositions` crops a photo to hide third-party text (see S5).
 *
 * Built from the owner's list. Do not invent examples for a service the owner
 * listed without one; the template hides the example block when the list is
 * empty.
 *
 * TODO propriétaire: vérifier que la photo correspond au service (les
 *   deux vignettes `imageSecondary` / `imageTertiary` ont été choisies par
 *   affinité de nom de fichier, aucune photo n'étant visible ici) et ajuster
 *   les textes alternatifs FR/EN en conséquence.
 */
const SERVICES: Service[] = [
  {
    slug: 'scenography',
    icon: 'layers',
    examplesKey: 'services.items.scenography.examples',
    image: '/images/webp/svc-scenography-800.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageSecondary: '/images/webp/event-artist-1-800.webp',
    imageTertiary: '/images/webp/event-live-1-800.webp'
  },
  {
    slug: 'tireFurniture',
    icon: 'tyre',
    examplesKey: 'services.items.tireFurniture.examples',
    image: '/images/webp/svc-tire-furniture-800.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageSecondary: '/images/webp/pneus-1-800.webp',
    imageTertiary: '/images/webp/fauteuil-800.webp',
    // Le texte « Mobilier en pneus » est incrusté sur le meuble : le recadrage
    // ne peut pas l'éliminer complètement.
    // TODO propriétaire: remplacer l'image (texte « Mobilier en pneus » visible)
    // TODO propriétaire: vérifier l'autorisation d'utiliser ces marques
    imagePositions: { image: 'center 30%' }
  },
  {
    slug: 'kiosks',
    icon: 'home',
    examplesKey: 'services.items.kiosks.examples',
    // TODO propriétaire : la photo actuelle n'est pas un kiosque. Remplacer par
    // une vraie photo de kiosque réalisé par Kinnov'art (convertir en WebP 800px
    // puis mettre à jour le chemin ici).
    image: '/images/webp/svc-kiosks-800.webp',
    imageSecondary: '/images/webp/svc-kiosks-2-800.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageTertiary: '/images/webp/kisque-800.webp',
    // La photo de kiosque affiche l'enseigne tierce « Loterie Nationale Guinée ».
    // TODO propriétaire: remplacer l'image (texte « Loterie Nationale Guinée » visible)
    // TODO propriétaire: vérifier l'autorisation d'utiliser ces marques
    imagePositions: { image: 'center 30%' }
  },
  {
    slug: 'spaceDesign',
    icon: 'grid',
    examplesKey: 'services.items.spaceDesign.examples',
    image: '/images/webp/svc-space-design-800.webp',
    imageSecondary: '/images/webp/svc-space-best-1200.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageTertiary: '/images/webp/salon-800.webp'
  },
  {
    slug: 'production',
    icon: 'film',
    examplesKey: 'services.items.production.examples',
    image: '/images/webp/svc-production-800.webp',
    imageSecondary: '/images/webp/svc-production-2-800.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageTertiary: '/images/webp/event-media-1-800.webp',
    // La photo « production » affiche une liste de titres d'artistes.
    // TODO propriétaire: remplacer l'image (liste de titres d'artistes visible)
    imagePositions: { image: 'center 70%' }
  },
  {
    slug: 'training',
    icon: 'cap',
    examplesKey: 'services.items.training.examples',
    // TODO propriétaire : remplacer par une vraie photo de formation en
    // décoration événementielle (convertir en WebP 800px, puis mettre à jour ici).
    image: '/images/webp/craft-action-1-800.webp',
    imageSecondary: '/images/webp/craft-metier-2-800.webp',
    // TODO propriétaire: vérifier que la photo correspond au service
    imageTertiary: '/images/webp/craft-metier-1-800.webp'
  }
]

export const useServices = () => ({
  services: SERVICES,
  getServices: () => SERVICES,
  getService: (slug: string) => SERVICES.find(s => s.slug === slug)
})
