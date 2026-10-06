// ========================================
// TYPE DEFINITIONS - KINNOV'ART
// ========================================

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
