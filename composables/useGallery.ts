/**
 * Données de la page /galerie — événements, métiers et projets.
 *
 * Ajouter une photo :
 *   1. déposer l'original dans `public/images/` ;
 *   2. la convertir en WebP 800px via le script `imgtool/convert.mjs`
 *      (entrée `[source, 'nom-800.webp', 800]`) ;
 *   3. ajouter une entrée ci-dessous avec `src` et `category`.
 *
 * TODO propriétaire :
 *   - `category` des photos `g-*` est temporairement mise par défaut sur
 *     `events` : la répartir entre `events` / `crafts` / `projects` au fur et à
 *     mesure que le contenu de chaque photo est connu.
 *   - les `alt` sont génériques (clés `gallery.alt.*`, localisées FR/EN) :
 *     remplacer par une vraie description du contenu de chaque photo
 *     (accessibilité + SEO).
 *   - `rougecouteau.jpg` ne doit JAMAIS être ajoutée (exclusion demandée).
 */

export type GalleryCategory = 'events' | 'crafts' | 'projects'

export interface GalleryPhoto {
  src: string
  category: GalleryCategory
}

const PROJECTS: GalleryPhoto[] = [
  // Les 8 « Réalisations » de la page d'accueil.
  { src: '/images/webp/gallery-1-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-2-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-3-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-4-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-5-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-6-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-7-800.webp', category: 'projects' },
  { src: '/images/webp/gallery-8-800.webp', category: 'projects' }
]

// TODO: répartir entre events / crafts / projects (temporairement `events`).
const EVENTS: GalleryPhoto[] = [
  { src: '/images/webp/g-480611085-800.webp', category: 'events' },
  { src: '/images/webp/g-481044415-800.webp', category: 'events' },
  { src: '/images/webp/g-481083738-800.webp', category: 'events' },
  { src: '/images/webp/g-481086768-800.webp', category: 'events' },
  { src: '/images/webp/g-481245019-800.webp', category: 'events' },
  { src: '/images/webp/g-481249370-800.webp', category: 'events' },
  { src: '/images/webp/g-481482244-800.webp', category: 'events' },
  { src: '/images/webp/g-481505625-800.webp', category: 'events' },
  { src: '/images/webp/g-481513646-800.webp', category: 'events' },
  { src: '/images/webp/g-481672506-800.webp', category: 'events' },
  { src: '/images/webp/g-481778060-800.webp', category: 'events' },
  { src: '/images/webp/g-481781911-800.webp', category: 'events' },
  { src: '/images/webp/g-481814589-800.webp', category: 'events' },
  { src: '/images/webp/g-482087749-800.webp', category: 'events' },
  { src: '/images/webp/g-482122123-800.webp', category: 'events' },
  { src: '/images/webp/g-482134205-800.webp', category: 'events' },
  { src: '/images/webp/action-hommes-800.webp', category: 'events' },
  { src: '/images/webp/hommes-800.webp', category: 'events' },
  { src: '/images/webp/hommes2-800.webp', category: 'events' },
  { src: '/images/webp/best-800.webp', category: 'events' },
  { src: '/images/webp/best-and-800.webp', category: 'events' },
  { src: '/images/webp/fleurs1-800.webp', category: 'events' },
  { src: '/images/webp/fleurss-800.webp', category: 'events' },
  { src: '/images/webp/pneux-800.webp', category: 'events' },
  { src: '/images/webp/salon-800.webp', category: 'events' }
]

// Savoir-faire / métiers de la maison (photo du PDG au travail incluse).
const CRAFTS: GalleryPhoto[] = [
  { src: '/images/webp/g-481776672-800.webp', category: 'crafts' },
  { src: '/images/webp/g-481477524-800.webp', category: 'crafts' },
  { src: '/images/webp/pdg1-800.webp', category: 'crafts' },
  { src: '/images/webp/kisque-800.webp', category: 'crafts' },
  { src: '/images/webp/pneus-1-800.webp', category: 'crafts' },
  { src: '/images/webp/pneus-2-800.webp', category: 'crafts' },
  { src: '/images/webp/pneus-3-800.webp', category: 'crafts' }
]

export const GALLERY_CATEGORIES: { slug: GalleryCategory; labelKey: string }[] = [
  { slug: 'events', labelKey: 'gallery.catEvents' },
  { slug: 'crafts', labelKey: 'gallery.catCrafts' },
  { slug: 'projects', labelKey: 'gallery.catProjects' }
]

export const useGallery = () => ({
  photos: [...PROJECTS, ...EVENTS, ...CRAFTS],
  categories: GALLERY_CATEGORIES
})
