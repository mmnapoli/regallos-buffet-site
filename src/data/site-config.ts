/**
 * Configuração White-Label do Site
 *
 * Para vender para outros buffets, basta alterar este arquivo.
 * No futuro, esses dados virão do Admin Panel / banco de dados.
 */

export interface SiteConfig {
  // Marca
  brandName: string
  brandTagline: string
  logoUrl: string | null // null = usa ícone padrão

  // Cores (CSS variables)
  colors: {
    primary: string
    primaryLight: string
    primaryDark: string
    accent: string
    accentLight: string
    accentDark: string
  }

  // Contato
  contact: {
    phone: string
    phoneFormatted: string
    whatsapp: string // número sem formatação
    email: string
    address: string
    city: string
    cep: string
    hours: string
  }

  // Redes sociais
  social: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }

  // Homepage
  hero: {
    title: string
    highlight: string
    subtitle: string
    badge: string
  }

  about: {
    title: string
    description: string[]
    stats: { value: string; label: string }[]
  }

  // Galeria (fotos do buffet)
  gallery: GalleryImage[]
}

export interface GalleryImage {
  src: string
  alt: string
  span?: 'large' | 'tall' | 'normal' // para Bento Grid
}

export const siteConfig: SiteConfig = {
  brandName: 'Regallos',
  brandTagline: 'Gastronomia & Eventos',
  logoUrl: null,

  colors: {
    primary: '#800020',
    primaryLight: '#9A1B3A',
    primaryDark: '#600018',
    accent: '#D4AF37',
    accentLight: '#E4C76B',
    accentDark: '#B8962E',
  },

  contact: {
    phone: '11947588959',
    phoneFormatted: '(11) 94758-8959',
    whatsapp: '5511947588959',
    email: 'contato@regallosgastronomia.com.br',
    address: 'Rua Manuel Jacinto, 526',
    city: 'São Paulo, SP',
    cep: '05624-000',
    hours: 'Seg a Sex: 8h às 18h',
  },

  social: {
    instagram: 'https://instagram.com/regallosgastronomia',
  },

  hero: {
    title: 'Transformamos momentos em',
    highlight: 'experiências',
    subtitle: 'Buffet completo para eventos sociais e corporativos. Cardápios personalizados, equipe qualificada e infraestrutura completa para tornar seu evento inesquecível.',
    badge: '14 anos de excelência gastronômica',
  },

  about: {
    title: 'Cada evento é único, cada cardápio também',
    description: [
      'A Regallos Gastronomia nasceu da paixão pela boa comida e pelo desejo de criar experiências memoráveis. Com mais de 14 anos de atuação em São Paulo, atendemos eventos sociais e corporativos com cardápios totalmente personalizados.',
      'Nossa equipe qualificada cuida de cada detalhe — da seleção dos ingredientes à apresentação dos pratos — para que você só precise aproveitar o momento.',
    ],
    stats: [
      { value: '14+', label: 'Anos de experiência' },
      { value: '2.000+', label: 'Eventos realizados' },
      { value: '100%', label: 'Cardápios personalizados' },
    ],
  },

  // Galeria - substitua pelos caminhos reais das suas fotos
  // Coloque as imagens em /public/gallery/
  gallery: [
    { src: '/gallery/foto-1.jpg', alt: 'Mesa de buffet completa', span: 'large' },
    { src: '/gallery/foto-2.jpg', alt: 'Churrasco na brasa', span: 'normal' },
    { src: '/gallery/foto-3.jpg', alt: 'Decoração do evento', span: 'tall' },
    { src: '/gallery/foto-4.jpg', alt: 'Sobremesas artesanais', span: 'normal' },
    { src: '/gallery/foto-5.jpg', alt: 'Equipe Regallos', span: 'normal' },
    { src: '/gallery/foto-6.jpg', alt: 'Finger food gourmet', span: 'large' },
  ],
}
