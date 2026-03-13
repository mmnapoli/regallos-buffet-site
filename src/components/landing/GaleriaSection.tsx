'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BentoGallery from '@/components/BentoGallery'
import { GalleryImageDB } from '@/lib/types'

export default function GaleriaSection() {
  const [galleryItems, setGalleryItems] = useState<GalleryImageDB[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setGalleryItems(data.images || [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Chunk gallery into pages of 8
  const itemsPerPage = 8
  const pages = []
  for (let i = 0; i < galleryItems.length; i += itemsPerPage) {
    pages.push(galleryItems.slice(i, i + itemsPerPage))
  }
  const currentItems = pages[currentPage] || []
  const maxPages = Math.max(1, pages.length)

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
            Nossos Eventos
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-4">
            Galeria
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Uma seleção dos nossos eventos.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Carregando galeria...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Nenhuma imagem na galeria</p>
            </div>
          ) : (
            <BentoGallery images={currentItems} />
          )}
        </motion.div>

        {/* Navigation arrows */}
        {maxPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10 sm:mt-12">
            <motion.button
              whileHover={{ x: -3 }}
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-elevated active:scale-95"
              aria-label="Fotos anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxPages }).map((_, page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary w-6'
                      : 'bg-border-light hover:bg-primary/50'
                  }`}
                  aria-label={`Ir para página ${page + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => setCurrentPage(Math.min(maxPages - 1, currentPage + 1))}
              disabled={currentPage === maxPages - 1}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-elevated active:scale-95"
              aria-label="Próximas fotos"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}
