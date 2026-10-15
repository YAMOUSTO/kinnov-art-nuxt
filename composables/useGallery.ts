/**
 * Données de la page /galerie — photos classées par service.
 *
 * Les six catégories reprennent les six services de la maison :
 * scénographie, mobilier, kiosques, aménagement, production, formation.
 * Un `null` signifie « pas encore classée » : la photo n'apparaît alors que
 * sous le filtre « Tous ».
 *
 * Ajouter une photo :
 *   1. déposer l'original dans `public/images/` ;
 *   2. la convertir en WebP 800px via le script `imgtool/convert.mjs`
 *      (entrée `[source, 'nom-800.webp', 800]`) ;
 *   3. ajouter une entrée ci-dessous avec `src`, `categorie`, `width`,
 *      `height` et `color`. Les trois derniers se lisent avec sharp (simple
 *      devDependency, aucun code exécuté au runtime) :
 *        node -e "const s=require('sharp');(async()=>{const p='public/images/webp/nom-800.webp';const m=await s(p).metadata();const d=(await s(p).stats()).dominant;console.log(m.width,m.height,'#'+[d.r,d.g,d.b].map(v=>v.toString(16).padStart(2,'0')).join(''))})()"
 *
 * `width`/`height` sont les dimensions réelles du fichier : le navigateur
 * réserve la place (`aspect-ratio`) et la grille n'a donc aucun décalage.
 * `color` est la couleur dominante, utilisée comme fond d'attente avant le
 * décodage de l'image.
 *
 * TODO propriétaire :
 *   - les photos `g-*`, `gallery-*`, `best*`, `event-people-1` et
 *     `event-misc-1` ne sont pas classées (`categorie: null`) : le nom de
 *     fichier ne permet pas de trancher sans voir la photo. Les assigner à la
 *     bonne catégorie au fur et à mesure que le contenu est connu
 *     (`scenography` / `furniture` / `kiosks` / `spaceDesign` / `production` /
 *     `training`), puis retirer le `// TODO propriétaire: classer cette photo`.
 *   - les `alt` sont génériques (clés `gallery.alt.*`, localisées FR/EN) :
 *     remplacer par une vraie description du contenu de chaque photo
 *     (accessibilité + SEO).
 *   - `rougecouteau.jpg` ne doit JAMAIS être ajoutée (exclusion demandée).
 */

export type GalleryCategory =
  | 'scenography'
  | 'furniture'
  | 'kiosks'
  | 'spaceDesign'
  | 'production'
  | 'training'

export interface GalleryPhoto {
  /** WebP path in `public/images/webp/` — also the full image for the lightbox. */
  src: string
  /** Service category, or `null` when not yet classified (visible under « Tous »). */
  categorie: GalleryCategory | null
  /** Intrinsic width in px (real file size). */
  width: number
  /** Intrinsic height in px (real file size). */
  height: number
  /** Dominant colour (hex) used as the placeholder box background. */
  color: string
}

export const GALLERY_CATEGORIES: { slug: GalleryCategory; labelKey: string }[] = [
  { slug: 'scenography', labelKey: 'gallery.categories.scenography' },
  { slug: 'furniture', labelKey: 'gallery.categories.furniture' },
  { slug: 'kiosks', labelKey: 'gallery.categories.kiosks' },
  { slug: 'spaceDesign', labelKey: 'gallery.categories.spaceDesign' },
  { slug: 'production', labelKey: 'gallery.categories.production' },
  { slug: 'training', labelKey: 'gallery.categories.training' }
]

// Toutes les photos de la galerie. Chaque entrée est indépendante de son
// groupe d'origine : seule `categorie` compte pour le filtrage.
const GALLERY: GalleryPhoto[] = [
  // --- Réalisations (page d'accueil) ---
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-1-800.webp', categorie: null, width: 720, height: 480, color: '#f8f8f8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-2-800.webp', categorie: null, width: 720, height: 480, color: '#f8f8f8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-3-800.webp', categorie: null, width: 720, height: 480, color: '#f8f8f8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-4-800.webp', categorie: null, width: 800, height: 450, color: '#786878' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-5-800.webp', categorie: null, width: 800, height: 450, color: '#988888' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-6-800.webp', categorie: null, width: 720, height: 480, color: '#f8f8f8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-7-800.webp', categorie: null, width: 800, height: 600, color: '#f8e828' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/gallery-8-800.webp', categorie: null, width: 800, height: 405, color: '#c86898' },

  // --- Scénographie : artistes et scènes ---
  { src: '/images/webp/event-live-1-800.webp', categorie: 'scenography', width: 800, height: 1422, color: '#080808' },
  { src: '/images/webp/event-live-2-800.webp', categorie: 'scenography', width: 800, height: 450, color: '#584848' },
  { src: '/images/webp/event-artist-1-800.webp', categorie: 'scenography', width: 720, height: 960, color: '#f8a8d8' },
  { src: '/images/webp/event-artist-2-800.webp', categorie: 'scenography', width: 800, height: 1242, color: '#081888' },
  { src: '/images/webp/event-artist-3-800.webp', categorie: 'scenography', width: 711, height: 555, color: '#e8e8e8' },
  { src: '/images/webp/event-artist-4-800.webp', categorie: 'scenography', width: 800, height: 600, color: '#e8d8c8' },
  { src: '/images/webp/event-artist-5-800.webp', categorie: 'scenography', width: 800, height: 450, color: '#f83828' },

  // --- Production : couverture média et artistes ---
  { src: '/images/webp/event-media-1-800.webp', categorie: 'production', width: 720, height: 554, color: '#d8c8b8' },
  { src: '/images/webp/event-media-2-800.webp', categorie: 'production', width: 800, height: 450, color: '#98a8a8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/event-people-1-800.webp', categorie: null, width: 800, height: 533, color: '#e8e8e8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/event-misc-1-800.webp', categorie: null, width: 800, height: 600, color: '#d8d8d8' },

  // --- Photos non identifiables par leur nom de fichier ---
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-480611085-800.webp', categorie: null, width: 800, height: 918, color: '#b8c8d8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481044415-800.webp', categorie: null, width: 800, height: 600, color: '#c8d8d8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481083738-800.webp', categorie: null, width: 800, height: 541, color: '#c8a808' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481086768-800.webp', categorie: null, width: 800, height: 600, color: '#383838' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481245019-800.webp', categorie: null, width: 800, height: 599, color: '#c8d8b8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481249370-800.webp', categorie: null, width: 720, height: 477, color: '#a8b8c8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481482244-800.webp', categorie: null, width: 800, height: 1199, color: '#c8c8d8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481505625-800.webp', categorie: null, width: 800, height: 600, color: '#181828' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481513646-800.webp', categorie: null, width: 800, height: 600, color: '#080818' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481672506-800.webp', categorie: null, width: 800, height: 498, color: '#0878e8' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481778060-800.webp', categorie: null, width: 720, height: 508, color: '#181818' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481781911-800.webp', categorie: null, width: 800, height: 1067, color: '#181818' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481814589-800.webp', categorie: null, width: 800, height: 599, color: '#181818' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-482087749-800.webp', categorie: null, width: 800, height: 600, color: '#d8a828' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-482122123-800.webp', categorie: null, width: 800, height: 600, color: '#a86848' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-482134205-800.webp', categorie: null, width: 800, height: 600, color: '#181828' },

  // --- Production : hommes en action ---
  { src: '/images/webp/action-hommes-800.webp', categorie: 'production', width: 720, height: 960, color: '#d8d8c8' },
  { src: '/images/webp/hommes-800.webp', categorie: 'production', width: 800, height: 1047, color: '#080808' },
  { src: '/images/webp/hommes2-800.webp', categorie: 'production', width: 800, height: 581, color: '#080808' },

  // --- Non classées ---
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/best-800.webp', categorie: null, width: 800, height: 413, color: '#781848' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/best-and-800.webp', categorie: null, width: 800, height: 530, color: '#a81818' },

  // --- Aménagement : fleurs et salon ---
  { src: '/images/webp/fleurs1-800.webp', categorie: 'spaceDesign', width: 800, height: 734, color: '#181818' },
  { src: '/images/webp/fleurss-800.webp', categorie: 'spaceDesign', width: 800, height: 600, color: '#d8e8c8' },
  { src: '/images/webp/salon-800.webp', categorie: 'spaceDesign', width: 800, height: 457, color: '#0878c8' },

  // --- Mobilier : pneus recyclés ---
  { src: '/images/webp/pneux-800.webp', categorie: 'furniture', width: 800, height: 600, color: '#f8b808' },
  { src: '/images/webp/pneus-1-800.webp', categorie: 'furniture', width: 464, height: 1032, color: '#f8f8f8' },
  { src: '/images/webp/pneus-2-800.webp', categorie: 'furniture', width: 800, height: 360, color: '#f8f8f8' },
  { src: '/images/webp/pneus-3-800.webp', categorie: 'furniture', width: 800, height: 360, color: '#f8f8f8' },
  { src: '/images/webp/craft-pneus-tv-800.webp', categorie: 'furniture', width: 800, height: 1067, color: '#080808' },

  // --- Formation : métiers, atelier, PDG au travail ---
  { src: '/images/webp/craft-metier-1-800.webp', categorie: 'training', width: 800, height: 450, color: '#887868' },
  { src: '/images/webp/craft-metier-2-800.webp', categorie: 'training', width: 800, height: 450, color: '#787878' },
  { src: '/images/webp/craft-action-1-800.webp', categorie: 'training', width: 720, height: 924, color: '#d8b898' },
  { src: '/images/webp/craft-pdg-1-800.webp', categorie: 'training', width: 800, height: 441, color: '#980808' },
  { src: '/images/webp/craft-pdg-2-800.webp', categorie: 'training', width: 720, height: 491, color: '#080808' },
  { src: '/images/webp/pdg1-800.webp', categorie: 'training', width: 800, height: 750, color: '#d8d8c8' },

  // --- Non identifiables ---
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481776672-800.webp', categorie: null, width: 750, height: 1000, color: '#787888' },
  // TODO propriétaire: classer cette photo
  { src: '/images/webp/g-481477524-800.webp', categorie: null, width: 800, height: 1068, color: '#e8e8e8' },

  // --- Kiosques ---
  { src: '/images/webp/kisque-800.webp', categorie: 'kiosks', width: 800, height: 450, color: '#f8d8b8' },
  // Le filtre « Kiosques » n'avait qu'une seule photo : le propriétaire a
  // demandé d'en ajouter pour que la catégorie ne soit pas si pauvre.
  // TODO propriétaire: vérifier que ces deux photos sont bien des kiosques et
  //   qu'elles ne montrent pas d'enseigne tierce lisible.
  { src: '/images/webp/fb-470202327-800.webp', categorie: 'kiosks', width: 800, height: 800, color: '#d8d8d8' },
  { src: '/images/webp/svc-kiosks-2-800.webp', categorie: 'kiosks', width: 540, height: 960, color: '#988888' }
]

export const useGallery = () => ({
  photos: GALLERY,
  categories: GALLERY_CATEGORIES
})
