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
    specialty?: string
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
    id: string
    name: string
    role: LocalizedString
    image: string
    bio: LocalizedString
}

export interface NavItem {
    label: string
    path: string
    children?: NavItem[]
}
