import { GalleryImageDB, SiteImagesDB } from './types'

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Erro desconhecido')
  }

  return data
}

export async function uploadImage(
  file: File,
  subfolder: 'gallery' | 'sections' | 'cardapios' | 'logo'
): Promise<{ url: string }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('subfolder', subfolder)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  return handleResponse(response)
}

export async function fetchGallery(): Promise<GalleryImageDB[]> {
  const response = await fetch('/api/gallery')
  const data = await handleResponse<{ images: GalleryImageDB[] }>(response)
  return data.images
}

export async function addGalleryImage(imageData: {
  src: string
  alt: string
  span: 'large' | 'tall' | 'normal'
}): Promise<GalleryImageDB> {
  const response = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData),
  })

  return handleResponse(response)
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const response = await fetch(`/api/gallery/${id}`, {
    method: 'DELETE',
  })

  await handleResponse(response)
}

export async function updateGalleryImage(
  id: string,
  data: { alt?: string; span?: string }
): Promise<GalleryImageDB> {
  const response = await fetch(`/api/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return handleResponse(response)
}

export async function reorderGallery(orderedIds: string[]): Promise<GalleryImageDB[]> {
  const response = await fetch('/api/gallery/reorder', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds }),
  })

  const data = await handleResponse<{ images: GalleryImageDB[] }>(response)
  return data.images
}

export async function fetchSiteImages(): Promise<SiteImagesDB> {
  const response = await fetch('/api/site-images')
  return handleResponse(response)
}

export async function updateSectionImage(
  section: string,
  src: string,
  alt: string
): Promise<SiteImagesDB> {
  const response = await fetch('/api/site-images', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, src, alt }),
  })

  return handleResponse(response)
}

export async function updateCardapioImage(
  cardapioId: string,
  src: string,
  alt: string
): Promise<SiteImagesDB> {
  const response = await fetch('/api/site-images', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardapioId, src, alt }),
  })

  return handleResponse(response)
}

export async function updateLogo(src: string): Promise<SiteImagesDB> {
  const response = await fetch('/api/site-images', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logo: true, src }),
  })

  return handleResponse(response)
}
