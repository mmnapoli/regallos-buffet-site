'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  fetchGallery,
  addGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
  fetchSiteImages,
  updateSectionImage,
  updateCardapioImage,
  updateLogo,
} from '@/lib/api-client'
import { GalleryImageDB, SiteImagesDB } from '@/lib/types'
import ImageUploader from '@/components/admin/ImageUploader'
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react'

export default function ImagensAdminPage() {
  const [activeTab, setActiveTab] = useState<'galeria' | 'secoes' | 'logo'>('galeria')
  const [gallery, setGallery] = useState<GalleryImageDB[]>([])
  const [siteImages, setSiteImages] = useState<SiteImagesDB | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingNewImage, setPendingNewImage] = useState<{ src: string } | null>(null)
  const [newImageForm, setNewImageForm] = useState<{ alt: string; span: 'normal' | 'large' | 'tall' }>({ alt: '', span: 'normal' })

  // Cardapios list (hardcoded from mock data)
  const cardapios = [
    { id: 'card_feijoada', name: 'Feijoada Premium' },
    { id: 'card_churrasco', name: 'Churrasco Completo' },
    { id: 'card_fingerfood', name: 'Finger Food' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [galleryData, siteData] = await Promise.all([
        fetchGallery(),
        fetchSiteImages(),
      ])
      setGallery(galleryData)
      setSiteImages(siteData)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Gallery handlers
  const handleGalleryUploadComplete = (url: string) => {
    setPendingNewImage({ src: url })
  }

  const handleConfirmNewImage = async () => {
    if (!pendingNewImage) return
    try {
      const newImage = await addGalleryImage({
        src: pendingNewImage.src,
        alt: newImageForm.alt || 'Foto do evento',
        span: newImageForm.span as 'large' | 'tall' | 'normal',
      })
      setGallery((prev) => [...prev, newImage])
      setPendingNewImage(null)
      setNewImageForm({ alt: '', span: 'normal' })
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta imagem?')) return
    try {
      await deleteGalleryImage(id)
      setGallery((prev) => prev.filter((img) => img.id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleMoveImage = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= gallery.length) return

    const orderedIds = gallery.map((img) => img.id)
    ;[orderedIds[index], orderedIds[newIndex]] = [orderedIds[newIndex], orderedIds[index]]

    try {
      await fetchGallery() // Reorder via reorder endpoint would be ideal, but we'll refresh
      // For now, just let the UI update optimistically
      setGallery((prev) => {
        const newGallery = [...prev]
        ;[newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]]
        newGallery.forEach((img, i) => {
          img.order = i
        })
        return newGallery
      })
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleUpdateGalleryImageAlt = async (id: string, alt: string) => {
    try {
      const updated = await updateGalleryImage(id, { alt })
      setGallery((prev) =>
        prev.map((img) => (img.id === id ? updated : img))
      )
    } catch (err: any) {
      alert(err.message)
    }
  }

  // Section image handlers
  const handleSectionImageUpload = async (
    section: string,
    url: string,
    alt: string
  ) => {
    try {
      const updated = await updateSectionImage(section, url, alt)
      setSiteImages(updated)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleCardapioImageUpload = async (
    cardapioId: string,
    url: string,
    alt: string
  ) => {
    try {
      const updated = await updateCardapioImage(cardapioId, url, alt)
      setSiteImages(updated)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleLogoUpload = async (url: string) => {
    try {
      const updated = await updateLogo(url)
      setSiteImages(updated)
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-text-muted">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Erro: {error}</p>
        <button
          onClick={loadData}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-main">Gerenciar Imagens</h1>
        <p className="text-text-muted mt-1">
          Controle todas as imagens do site
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border-light">
        <button
          onClick={() => setActiveTab('galeria')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'galeria'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Galeria
        </button>
        <button
          onClick={() => setActiveTab('secoes')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'secoes'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Seções do Site
        </button>
        <button
          onClick={() => setActiveTab('logo')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'logo'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Logo
        </button>
      </div>

      {/* Tab: Galeria */}
      {activeTab === 'galeria' && (
        <div className="space-y-6">
          {/* New image section */}
          <div className="bg-white rounded-lg border border-border-light p-6">
            <h3 className="text-lg font-semibold text-text-main mb-4">
              Adicionar Nova Imagem
            </h3>
            <ImageUploader
              subfolder="gallery"
              onUploadComplete={handleGalleryUploadComplete}
              label="Selecione uma imagem para a galeria"
            />

            {pendingNewImage && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Descrição da imagem
                  </label>
                  <input
                    type="text"
                    value={newImageForm.alt}
                    onChange={(e) =>
                      setNewImageForm((prev) => ({ ...prev, alt: e.target.value }))
                    }
                    placeholder="ex: Mesa de buffet"
                    className="w-full px-3 py-2 border border-border-light rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Tamanho na galeria
                  </label>
                  <select
                    value={newImageForm.span}
                    onChange={(e) =>
                      setNewImageForm((prev) => ({
                        ...prev,
                        span: e.target.value as 'normal' | 'large' | 'tall',
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-light rounded-lg"
                  >
                    <option value="normal">Normal</option>
                    <option value="large">Larga</option>
                    <option value="tall">Alta</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleConfirmNewImage}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setPendingNewImage(null)}
                    className="px-4 py-2 border border-border-light rounded-lg hover:bg-background-warm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Gallery grid */}
          <div>
            <h3 className="text-lg font-semibold text-text-main mb-4">
              Imagens da Galeria ({gallery.length})
            </h3>

            {gallery.length === 0 ? (
              <p className="text-text-muted text-center py-8">
                Nenhuma imagem na galeria ainda
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((img, index) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-lg border border-border-light overflow-hidden space-y-3 p-3"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-background-warm">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Alt text */}
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => handleUpdateGalleryImageAlt(img.id, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-border-light rounded"
                      placeholder="Descrição da imagem"
                    />

                    {/* Size badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {img.span === 'large'
                          ? 'Larga'
                          : img.span === 'tall'
                            ? 'Alta'
                            : 'Normal'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMoveImage(index, 'up')}
                        disabled={index === 0}
                        className="flex-1 px-2 py-1 text-sm bg-background-warm rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        title="Mover para cima"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveImage(index, 'down')}
                        disabled={index === gallery.length - 1}
                        className="flex-1 px-2 py-1 text-sm bg-background-warm rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        title="Mover para baixo"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryImage(img.id)}
                        className="flex-1 px-2 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center gap-1"
                        title="Deletar imagem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Logo */}
      {activeTab === 'logo' && siteImages && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border-light p-6">
            <h3 className="text-lg font-semibold text-text-main mb-4">
              Gerenciar Logo
            </h3>
            <p className="text-text-muted text-sm mb-6">
              Este logo aparece no cabeçalho, rodapé e na seção principal do site.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current logo preview */}
              <div>
                <h4 className="font-medium text-text-main mb-3">Logo Atual</h4>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-background-warm border border-border-light flex items-center justify-center p-4">
                  {siteImages.logo ? (
                    <Image
                      src={siteImages.logo}
                      alt="Logo Regallos"
                      width={280}
                      height={105}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src="/logo-horizontal.svg"
                      alt="Logo padrão Regallos"
                      width={280}
                      height={105}
                      className="object-contain"
                    />
                  )}
                </div>
                {siteImages.logo && (
                  <p className="text-xs text-text-muted mt-2">Logo personalizado</p>
                )}
                {!siteImages.logo && (
                  <p className="text-xs text-text-muted mt-2">Logo padrão</p>
                )}
              </div>

              {/* Upload new logo */}
              <div>
                <h4 className="font-medium text-text-main mb-3">Novo Logo</h4>
                <ImageUploader
                  subfolder="logo"
                  onUploadComplete={handleLogoUpload}
                  label="Selecione uma imagem/SVG para o logo"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Seções */}
      {activeTab === 'secoes' && siteImages && (
        <div className="space-y-6">
          {/* Main sections */}
          <div className="bg-white rounded-lg border border-border-light p-6 space-y-6">
            <h3 className="text-lg font-semibold text-text-main">
              Seções do Site
            </h3>

            {/* Hero */}
            <SectionImageEditor
              title="Hero"
              section="hero"
              image={siteImages.sections.hero}
              onUpload={(url, alt) => handleSectionImageUpload('hero', url, alt)}
            />

            {/* Sobre */}
            <SectionImageEditor
              title="Sobre Nós"
              section="sobre"
              image={siteImages.sections.sobre}
              onUpload={(url, alt) => handleSectionImageUpload('sobre', url, alt)}
            />

            {/* Corporativo */}
            <SectionImageEditor
              title="Eventos Corporativos"
              section="corporativo"
              image={siteImages.sections.corporativo}
              onUpload={(url, alt) => handleSectionImageUpload('corporativo', url, alt)}
            />

            {/* Social */}
            <SectionImageEditor
              title="Eventos Sociais"
              section="social"
              image={siteImages.sections.social}
              onUpload={(url, alt) => handleSectionImageUpload('social', url, alt)}
            />
          </div>

          {/* Cardapios */}
          <div className="bg-white rounded-lg border border-border-light p-6 space-y-6">
            <h3 className="text-lg font-semibold text-text-main">
              Imagens dos Cardápios
            </h3>

            {cardapios.map((cardapio) => (
              <SectionImageEditor
                key={cardapio.id}
                title={cardapio.name}
                section={cardapio.id}
                image={siteImages.cardapios[cardapio.id]}
                onUpload={(url, alt) => handleCardapioImageUpload(cardapio.id, url, alt)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component for section image editing
interface SectionImageEditorProps {
  title: string
  section: string
  image: any
  onUpload: (url: string, alt: string) => void
}

function SectionImageEditor({
  title,
  section,
  image,
  onUpload,
}: SectionImageEditorProps) {
  const [alt, setAlt] = useState(image?.alt || '')

  const handleUploadComplete = (url: string) => {
    onUpload(url, alt || title)
  }

  return (
    <div className="border-t border-border-light pt-4 first:border-t-0 first:pt-0">
      <h4 className="font-medium text-text-main mb-3">{title}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current image or placeholder */}
        <div>
          {image?.src ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-background-warm">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg bg-background-warm border-2 border-dashed border-border-light flex items-center justify-center text-text-muted">
              <div className="text-center">
                <p className="text-2xl mb-2">📷</p>
                <p className="text-xs">Sem imagem</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload and alt text */}
        <div className="space-y-3">
          <ImageUploader
            currentSrc={image?.src}
            subfolder="sections"
            onUploadComplete={handleUploadComplete}
            label={`Upload para ${title}`}
          />

          <div>
            <label className="block text-xs font-medium text-text-main mb-1">
              Descrição
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="ex: Equipe Regallos"
              className="w-full px-2 py-1 text-xs border border-border-light rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
