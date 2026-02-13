// ========================================
// DATA COMPOSABLES - KINNOV'ART
// ========================================

import type { Project, Artist, BlogPost } from '~/types'

// Projects Data
export const useProjects = () => {
    const projects: Project[] = [
        {
            id: 'f1',
            title: { fr: 'Fauteuil Mansour', en: 'Mansour Armchair' },
            category: 'furniture',
            image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Mobilier artisanal en bois local et tissus modernes.', en: 'Handcrafted furniture using local wood and modern fabrics.' },
            featured: true
        },
        {
            id: 'f2',
            title: { fr: 'Chaise Kinnov', en: 'Kinnov Chair' },
            category: 'furniture',
            image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Design ergonomique et durable.', en: 'Ergonomic and sustainable design.' },
            featured: false
        },
        {
            id: 'f3',
            title: { fr: 'Table Nongo', en: 'Nongo Table' },
            category: 'furniture',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Table en bois massif avec finition artisanale.', en: 'Solid wood table with artisan finish.' },
            featured: false
        },
        {
            id: 'f4',
            title: { fr: 'Canapé Bilal', en: 'Bilal Sofa' },
            category: 'furniture',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Canapé confortable avec tissus locaux.', en: 'Comfortable sofa with local fabrics.' },
            featured: true
        },
        {
            id: 'av1',
            title: { fr: 'Rythmes de Nongo', en: 'Nongo Rhythms' },
            category: 'audiovisual',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Production vidéo d\'un concert live à la Maison des Jeunes.', en: 'Video production of a live concert at Maison des Jeunes.' },
            featured: true
        },
        {
            id: 'av2',
            title: { fr: 'Documentaire Artiste', en: 'Artist Documentary' },
            category: 'audiovisual',
            image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Portrait documentaire d\'artistes locaux.', en: 'Documentary portrait of local artists.' },
            featured: false
        },
        {
            id: 'av3',
            title: { fr: 'Couverture Événement', en: 'Event Coverage' },
            category: 'audiovisual',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Montage vidéo professionnel d\'événements culturels.', en: 'Professional video editing of cultural events.' },
            featured: false
        },
        {
            id: 'a1',
            title: { fr: 'L\'Éveil du Talent', en: 'Talent Awakening' },
            category: 'art',
            image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Peinture murale collaborative.', en: 'Collaborative mural painting.' },
            featured: true
        },
        {
            id: 'a2',
            title: { fr: 'Expression Jeunesse', en: 'Youth Expression' },
            category: 'art',
            image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Exposition d\'art contemporain local.', en: 'Local contemporary art exhibition.' },
            featured: false
        },
        {
            id: 'a3',
            title: { fr: 'Fusion Culturelle', en: 'Cultural Fusion' },
            category: 'art',
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
            description: { fr: 'Projet artistique multiculturel.', en: 'Multicultural art project.' },
            featured: false
        }
    ]

    const getProjects = () => projects
    const getFeaturedProjects = () => projects.filter(p => p.featured)
    const getProjectsByCategory = (category: string) =>
        category === 'all' ? projects : projects.filter(p => p.category === category)

    return {
        projects,
        getProjects,
        getFeaturedProjects,
        getProjectsByCategory
    }
}

// Artists Data
export const useArtists = () => {
    const artists: Artist[] = [
        {
            id: 'art1',
            name: 'Ibrahim Sory',
            type: 'featured',
            image: 'https://i.pravatar.cc/300?u=ibrahim',
            bio: { fr: 'Spécialiste du design de mobilier avec 10 ans d\'expérience.', en: 'Furniture design specialist with 10 years of experience.' },
            specialty: 'Furniture Design'
        },
        {
            id: 'art2',
            name: 'Aissatou Diallo',
            type: 'featured',
            image: 'https://i.pravatar.cc/300?u=aissatou',
            bio: { fr: 'Artiste peintre reconnue internationalement.', en: 'Internationally recognized painter.' },
            specialty: 'Painting'
        },
        {
            id: 'art3',
            name: 'Mamadou Bah',
            type: 'featured',
            image: 'https://i.pravatar.cc/300?u=mamadou',
            bio: { fr: 'Vidéaste et réalisateur primé.', en: 'Award-winning videographer and director.' },
            specialty: 'Videography'
        },
        {
            id: 'art4',
            name: 'Fatoumata K.',
            type: 'new',
            image: 'https://i.pravatar.cc/300?u=fatou',
            bio: { fr: 'Jeune talent de l\'audiovisuel et du montage.', en: 'Young audiovisual and editing talent.' },
            specialty: 'Video Editing'
        },
        {
            id: 'art5',
            name: 'Saliou Camara',
            type: 'new',
            image: 'https://i.pravatar.cc/300?u=saliou',
            bio: { fr: 'Sculpteur émergent spécialisé dans l\'art moderne.', en: 'Emerging sculptor specializing in modern art.' },
            specialty: 'Sculpture'
        },
        {
            id: 'art6',
            name: 'Mariama Sylla',
            type: 'new',
            image: 'https://i.pravatar.cc/300?u=mariama',
            bio: { fr: 'Photographe talentueuse capturant la culture guinéenne.', en: 'Talented photographer capturing Guinean culture.' },
            specialty: 'Photography'
        },
        {
            id: 'art7',
            name: 'Moussa Camara',
            type: 'alumni',
            image: 'https://i.pravatar.cc/300?u=moussa',
            bio: { fr: 'Artiste multidisciplinaire et mentor.', en: 'Multidisciplinary artist and mentor.' },
            specialty: 'Mixed Media'
        },
        {
            id: 'art8',
            name: 'Kadiatou Barry',
            type: 'alumni',
            image: 'https://i.pravatar.cc/300?u=kadiatou',
            bio: { fr: 'Designer graphique et illustratrice.', en: 'Graphic designer and illustrator.' },
            specialty: 'Graphic Design'
        },
        {
            id: 'art9',
            name: 'Alpha Condé',
            type: 'alumni',
            image: 'https://i.pravatar.cc/300?u=alpha',
            bio: { fr: 'Producteur musical et ingénieur du son.', en: 'Music producer and sound engineer.' },
            specialty: 'Music Production'
        }
    ]

    const getArtists = () => artists
    const getArtistsByType = (type: string) =>
        type === 'all' ? artists : artists.filter(a => a.type === type)

    return {
        artists,
        getArtists,
        getArtistsByType
    }
}

// Blog Posts Data
export const useBlogPosts = () => {
    const posts: BlogPost[] = [
        {
            id: 'b1',
            title: { fr: 'Inauguration de l\'Atelier', en: 'Workshop Inauguration' },
            excerpt: { fr: 'Retour sur l\'ouverture de notre nouvel espace à Nongo.', en: 'A look back at our new space opening in Nongo.' },
            content: { fr: 'Situé face à la mosquée, notre nouvel atelier...', en: 'Located opposite the mosque, our new workshop...' },
            date: '2024-05-20',
            category: 'event',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'b2',
            title: { fr: 'Tuto : Restaurer un Fauteuil', en: 'DIY: Restore an Armchair' },
            excerpt: { fr: 'Apprenez les bases de la tapisserie.', en: 'Learn the basics of upholstery.' },
            content: { fr: 'Dans ce tutoriel vidéo, nos artisans...', en: 'In this video tutorial, our craftsmen...' },
            date: '2024-05-15',
            category: 'tutorial',
            image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'b3',
            title: { fr: 'Nouveau Partenariat Annoncé', en: 'New Partnership Announced' },
            excerpt: { fr: 'Kinnov\'art s\'associe avec des artistes locaux.', en: 'Kinnov\'art partners with local artists.' },
            content: { fr: 'Nous sommes ravis d\'annoncer...', en: 'We are excited to announce...' },
            date: '2024-06-01',
            category: 'news',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'b4',
            title: { fr: 'Atelier de Design pour Jeunes', en: 'Design Workshop for Youth' },
            excerpt: { fr: 'Formation gratuite en design de mobilier.', en: 'Free furniture design training.' },
            content: { fr: 'Rejoignez notre atelier mensuel...', en: 'Join our monthly workshop...' },
            date: '2024-06-10',
            category: 'event',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'b5',
            title: { fr: 'Guide : Montage Vidéo Débutant', en: 'Guide: Beginner Video Editing' },
            excerpt: { fr: 'Les bases du montage vidéo expliquées simplement.', en: 'Video editing basics explained simply.' },
            content: { fr: 'Découvrez les techniques essentielles...', en: 'Discover essential techniques...' },
            date: '2024-06-15',
            category: 'tutorial',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800'
        }
    ]

    const getPosts = () => posts
    const getPostsByCategory = (category: string) =>
        category === 'all' ? posts : posts.filter(p => p.category === category)

    return {
        posts,
        getPosts,
        getPostsByCategory
    }
}
