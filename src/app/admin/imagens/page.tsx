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
  reorderGallery,
} from '@/lib/api-client'
import { GalleryImageDB, SiteImagesDB } from '@/lib/types'
import ImageUploader from '@/components/admin/ImageUploader'
import { Trash2, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// A wrapper component for a sortable gallery item
function SortableGalleryItem({
  img,
  onDelete
}: {
  img: GalleryImageDB
  onDelete: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: img.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    opacity: isDragging ? 0.8 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg border border-border-light overflow-hidden space-y-3 p-3 flex flex-col items-center relative"
    >
      <div 
        className="absolute top-2 left-2 z-10 p-1 bg-white/80 backdrop-blur rounded cursor-grab active:cursor-grabbing hover:bg-white text-text-muted shadow-sm"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm">
        <Image
          src={img.src}
          alt="Foto da galeria"
          fill
          className="object-cover pointer-events-none"
        />
      </div>

      <div className="flex gap-2 mt-2 w-full">
        <button
          onClick={() => onDelete(img.id)}
          className="w-full px-2 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center gap-2 font-medium"
          title="Deletar imagem"
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function ImagensAdminPage() {
  const [activeTab, setActiveTab] = useState<'galeria' | 'secoes'>('galeria')
  const [gallery, setGallery] = useState<GalleryImageDB[]>([])
  const [siteImages, setSiteImages] = useState<SiteImagesDB | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires minimum moving of 5px before drag starts, to allow clicks on buttons
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
  const handleGalleryUploadComplete = async (url: string) => {
    try {
      const newImage = await addGalleryImage({
        src: url,
        alt: '',
        span: 'normal',
      })
      setGallery((prev) => [...prev, newImage])
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setGallery((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        
        const newArray = arrayMove(items, oldIndex, newIndex)
        
        // Optimistic update of orders
        newArray.forEach((img, i) => { img.order = i })
        
        // Save to backend
        const orderedIds = newArray.map(img => img.id)
        reorderGallery(orderedIds).catch(err => alert("Erro ao salvar ordem: " + err.message))
        
        return newArray
      })
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
      </div>

      {/* Tab: Galeria */}
      {activeTab === 'galeria' && (
        <div className="space-y-6">
          {/* New image section */}
          <div className="bg-white rounded-lg border border-border-light p-6">
            <h3 className="text-lg font-semibold text-text-main mb-4">
              Adicionar Imagens
            </h3>
            <ImageUploader
              subfolder="gallery"
              multiple={true}
              aspectRatio="aspect-[4/1]"
              onUploadComplete={handleGalleryUploadComplete}
              label="Solte imagens aqui ou clique para selecionar"
            />
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
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={gallery.map(g => g.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {gallery.map((img) => (
                      <SortableGalleryItem 
                        key={img.id} 
                        img={img} 
                        onDelete={handleDeleteGalleryImage} 
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      )}


      {/* Tab: Seções */}
      {activeTab === 'secoes' && siteImages && (
        <div className="space-y-6">
          {/* Main sections */}
          <div className="bg-white rounded-lg border border-border-light p-6 space-y-6">
            <h3 className="text-lg font-semibold text-text-main">
              Seções de Eventos
            </h3>

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
