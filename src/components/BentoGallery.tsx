'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera, X } from 'lucide-react'
import type { GalleryImage } from '@/data/site-config'

interface BentoGalleryProps {
  images: GalleryImage[]
}

export default function BentoGallery({ images }: BentoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
        {images.map((img, i) => {
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer col-span-1 row-span-1 text-left w-full h-full appearance-none m-0 p-0 border-none bg-transparent`}
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.alt || 'Foto da galeria'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-primary/20 mx-auto" aria-hidden="true" />
                  </div>
                </div>
              )}


            </button>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedImage.src && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full cursor-pointer z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null)
            }}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <div 
            className="relative w-full h-[80vh] md:h-[90vh] max-w-6xl mx-auto flex items-center justify-center scale-95 md:scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  )
}

