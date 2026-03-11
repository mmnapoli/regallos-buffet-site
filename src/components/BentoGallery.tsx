'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'
import type { GalleryImage } from '@/data/site-config'

interface BentoGalleryProps {
  images: GalleryImage[]
}

export default function BentoGallery({ images }: BentoGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
      {images.map((img, i) => {
        const spanClass =
          img.span === 'large'
            ? 'col-span-2 row-span-1'
            : img.span === 'tall'
              ? 'col-span-1 row-span-2'
              : 'col-span-1 row-span-1'

        return (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${spanClass}`}
          >
            {/* Placeholder enquanto não tem foto real */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-primary/20 mx-auto" aria-hidden="true" />
                <p className="text-[10px] text-primary/30 mt-1 font-medium">{img.alt}</p>
              </div>
            </div>

            {/* Imagem real - descomente quando tiver as fotos */}
            {/* <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            /> */}

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          </div>
        )
      })}
    </div>
  )
}
