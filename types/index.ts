// ========================================
// TYPE DEFINITIONS - KINNOV'ART
// ========================================

export interface LocalizedString {
    fr: string
    en: string
}

export interface Project {
    id: string
    title: LocalizedString
    category: 'furniture' | 'art' | 'audiovisual'
    image: string
    description: LocalizedString
    featured?: boolean
}

export interface Artist {
    id: string
    name: string
    type: 'featured' | 'new' | 'alumni'
    image: string
    bio: LocalizedString
    /** i18n key for the creator's specialty, e.g. `specialties.painting` */
    specialtyKey?: string
    portfolio?: string[]
}

export interface BlogPost {
    id: string
    title: LocalizedString
    excerpt: LocalizedString
    content: LocalizedString
    date: string
    category: 'news' | 'tutorial' | 'event'
    image: string
    author?: string
}

export interface TeamMember {
    id: number
    name: string
    /** i18n key for the member's role, e.g. `team.roles.creativeDirector` */
    roleKey: string
    image: string
}

export interface Service {
    /** URL-safe identifier, also the i18n key suffix: `services.items.${slug}` */
    slug: string
    /** Feather icon name, rendered by ServiceIcon */
    icon: string
    /** i18n key for the concrete realisations, e.g. `services.items.tireFurniture.examples` */
    examplesKey: string
    /** Optional representative image. Placeholder Unsplash photo until real work is shot. */
    image: string
}

export interface NavItem {
    label: string
    path: string
    children?: NavItem[]
}
