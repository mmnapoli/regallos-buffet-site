export interface GalleryImageDB {
  id: string
  src: string
  alt: string
  span: 'large' | 'tall' | 'normal'
  order: number
  uploadedAt: string
}

export interface GalleryDB {
  images: GalleryImageDB[]
}

export interface SectionImageDB {
  src: string
  alt: string
  uploadedAt: string
}

export interface SiteImagesDB {
  sections: Record<string, SectionImageDB | null>
  cardapios: Record<string, SectionImageDB>
  logo: string | null
}
