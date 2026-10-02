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
 * example (wigs) the list is empty and the template renders no bullet block, rather
 * than padding it with plausible-sounding filler.
 *
 * NOTE FOR THE SITE OWNER — two things need your confirmation:
 *  1. "Photo de cours" (service 5) is rendered exactly as written. It is ambiguous in
 *     French — it may mean photographing the training courses at the Maison des Jeunes,
 *     or something else. Confirm before launch and the translation can be corrected.
 *  2. Every `image` below is an Unsplash placeholder. Real photographs of the tyre
 *     chair, the sets and the concerts would be worth far more than these.
 */
const SERVICES: Service[] = [
  {
    slug: 'scenography',
    icon: 'layers',
    examplesKey: 'services.items.scenography.examples',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'tireFurniture',
    icon: 'disc',
    examplesKey: 'services.items.tireFurniture.examples',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'wigs',
    icon: 'feather',
    examplesKey: 'services.items.wigs.examples',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'spaceDesign',
    icon: 'grid',
    examplesKey: 'services.items.spaceDesign.examples',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'production',
    icon: 'film',
    examplesKey: 'services.items.production.examples',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800'
  }
]

export const useServices = () => ({
  services: SERVICES,
  getServices: () => SERVICES,
  getService: (slug: string) => SERVICES.find(s => s.slug === slug)
})
