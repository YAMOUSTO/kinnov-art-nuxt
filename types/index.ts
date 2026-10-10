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
    /** Icon name, rendered by ServiceIcon */
    icon: string
    /** i18n key for the concrete realisations, e.g. `services.items.tireFurniture.examples` */
    examplesKey: string
    /** Representative image of the service (WebP in public/images/webp/). */
    image: string
    /** Optional secondary photo shown next to the service body (e.g. a realisation detail). */
    imageSecondary?: string
    // Alt text is not stored here: it lives in the locale files under
    // `services.items.${slug}.imageAlt` / `.imageSecondaryAlt` so it can be
    // translated (FR + EN) alongside the rest of the copy.
}

export interface NavItem {
    label: string
    path: string
    children?: NavItem[]
}
