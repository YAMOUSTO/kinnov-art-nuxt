/**
 * Données de la page /galerie — événements, métiers et projets.
 *
 * Ajouter une photo :
 *   1. déposer l'original dans `public/images/` ;
 *   2. la convertir en WebP 800px via le script `imgtool/convert.mjs`
 *      (entrée `[source, 'nom-800.webp', 800]`) ;
 *   3. ajouter une entrée ci-dessous avec `src`, `alt` et `category`.
 *
 * TODO propriétaire :
 *   - `category` des 27 nouvelles photos (g-*) est temporairement mise par
 *     défaut sur `events` : répartir manuellement entre `events` / `crafts` /
 *     `projects` quand le contenu de chaque photo est connu.
 *   - `alt` génériques (numérotés) : remplacer par une vraie description du
 *     contenu de la photo (accessibilité + SEO).
 *   - `rougecouteau.jpg` ne doit JAMAIS être ajoutée (exclusion demandée).
 */

export type GalleryCategory = 'events' | 'crafts' | 'projects'

export interface GalleryPhoto {
  src: string
  alt: string
  category: GalleryCategory
}

const PROJECTS: GalleryPhoto[] = [
  // Les 8 « Réalisations » de la page d'accueil.
  { src: '/images/webp/gallery-1-800.webp', alt: 'Réalisation Kinnov’art (1/8)', category: 'projects' },
  { src: '/images/webp/gallery-2-800.webp', alt: 'Réalisation Kinnov’art (2/8)', category: 'projects' },
  { src: '/images/webp/gallery-3-800.webp', alt: 'Réalisation Kinnov’art (3/8)', category: 'projects' },
  { src: '/images/webp/gallery-4-800.webp', alt: 'Réalisation Kinnov’art (4/8)', category: 'projects' },
  { src: '/images/webp/gallery-5-800.webp', alt: 'Réalisation Kinnov’art (5/8)', category: 'projects' },
  { src: '/images/webp/gallery-6-800.webp', alt: 'Réalisation Kinnov’art (6/8)', category: 'projects' },
  { src: '/images/webp/gallery-7-800.webp', alt: 'Réalisation Kinnov’art (7/8)', category: 'projects' },
  { src: '/images/webp/gallery-8-800.webp', alt: 'Réalisation Kinnov’art (8/8)', category: 'projects' }
]

// TODO: répartir entre events / crafts / projects (temporairement `events`).
const EVENTS: GalleryPhoto[] = [
  { src: '/images/webp/g-480611085-800.webp', alt: 'Photo Kinnov’art (1/27)', category: 'events' },
  { src: '/images/webp/g-481044415-800.webp', alt: 'Photo Kinnov’art (2/27)', category: 'events' },
  { src: '/images/webp/g-481083738-800.webp', alt: 'Photo Kinnov’art (3/27)', category: 'events' },
  { src: '/images/webp/g-481086768-800.webp', alt: 'Photo Kinnov’art (4/27)', category: 'events' },
  { src: '/images/webp/g-481245019-800.webp', alt: 'Photo Kinnov’art (5/27)', category: 'events' },
  { src: '/images/webp/g-481249370-800.webp', alt: 'Photo Kinnov’art (6/27)', category: 'events' },
  { src: '/images/webp/g-481477524-800.webp', alt: 'Photo Kinnov’art (7/27)', category: 'events' },
  { src: '/images/webp/g-481482244-800.webp', alt: 'Photo Kinnov’art (8/27)', category: 'events' },
  { src: '/images/webp/g-481505625-800.webp', alt: 'Photo Kinnov’art (9/27)', category: 'events' },
  { src: '/images/webp/g-481513646-800.webp', alt: 'Photo Kinnov’art (10/27)', category: 'events' },
  { src: '/images/webp/g-481672506-800.webp', alt: 'Photo Kinnov’art (11/27)', category: 'events' },
  { src: '/images/webp/g-481776672-800.webp', alt: 'Photo Kinnov’art (12/27)', category: 'events' },
  { src: '/images/webp/g-481778060-800.webp', alt: 'Photo Kinnov’art (13/27)', category: 'events' },
  { src: '/images/webp/g-481781911-800.webp', alt: 'Photo Kinnov’art (14/27)', category: 'events' },
  { src: '/images/webp/g-481814589-800.webp', alt: 'Photo Kinnov’art (15/27)', category: 'events' },
  { src: '/images/webp/g-482087749-800.webp', alt: 'Photo Kinnov’art (16/27)', category: 'events' },
  { src: '/images/webp/g-482122123-800.webp', alt: 'Photo Kinnov’art (17/27)', category: 'events' },
  { src: '/images/webp/g-482134205-800.webp', alt: 'Photo Kinnov’art (18/27)', category: 'events' },
  { src: '/images/webp/action-hommes-800.webp', alt: 'Photo Kinnov’art (19/27)', category: 'events' },
  { src: '/images/webp/hommes-800.webp', alt: 'Photo Kinnov’art (20/27)', category: 'events' },
  { src: '/images/webp/hommes2-800.webp', alt: 'Photo Kinnov’art (21/27)', category: 'events' },
  { src: '/images/webp/best-800.webp', alt: 'Photo Kinnov’art (22/27)', category: 'events' },
  { src: '/images/webp/best-and-800.webp', alt: 'Photo Kinnov’art (23/27)', category: 'events' },
  { src: '/images/webp/fleurs1-800.webp', alt: 'Photo Kinnov’art (24/27)', category: 'events' },
  { src: '/images/webp/fleurss-800.webp', alt: 'Photo Kinnov’art (25/27)', category: 'events' },
  { src: '/images/webp/pneux-800.webp', alt: 'Photo Kinnov’art (26/27)', category: 'events' },
  { src: '/images/webp/salon-800.webp', alt: 'Photo Kinnov’art (27/27)', category: 'events' }
]

export const GALLERY_CATEGORIES: { slug: GalleryCategory; labelKey: string }[] = [
  { slug: 'events', labelKey: 'gallery.catEvents' },
  { slug: 'crafts', labelKey: 'gallery.catCrafts' },
  { slug: 'projects', labelKey: 'gallery.catProjects' }
]

export const useGallery = () => {
  const photos: GalleryPhoto[] = [...PROJECTS, ...EVENTS]
  return { photos, categories: GALLERY_CATEGORIES }
}
