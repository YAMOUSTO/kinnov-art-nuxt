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

/**
 * Optional `object-position` crops for a service's three photos, keyed by slot.
 * Values are CSS `object-position` strings (e.g. `center 30%`); used to frame a
 * photo and push third-party text out of the visible crop. A missing slot falls
 * back to `center`.
 */
export interface ServiceImagePositions {
    /** Crop for the large `image`. */
    image?: string
    /** Crop for `imageSecondary`. */
    imageSecondary?: string
    /** Crop for `imageTertiary`. */
    imageTertiary?: string
}

export interface Service {
    /** URL-safe identifier, also the i18n key suffix: `services.items.${slug}` */
    slug: string
    /** Icon name, rendered by ServiceIcon */
    icon: string
    /** i18n key for the concrete realisations, e.g. `services.items.tireFurniture.examples` */
    examplesKey: string
    /**
     * Large representative image (WebP in public/images/webp/). Consumed both by
     * the homepage service cards and by the /services page.
     */
    image: string
    /** First smaller thumbnail shown under the large image on /services. */
    imageSecondary: string
    /** Second smaller thumbnail shown under the large image on /services. */
    imageTertiary: string
    /** Optional per-slot `object-position` crops (see ServiceImagePositions). */
    imagePositions?: ServiceImagePositions
    // Alt text is not stored here: it lives in the locale files under
    // `services.items.${slug}.imageAlt` / `.imageSecondaryAlt` / `.imageTertiaryAlt`
    // so it can be translated (FR + EN) alongside the rest of the copy.
}

export interface NavItem {
    label: string
    path: string
    children?: NavItem[]
}
