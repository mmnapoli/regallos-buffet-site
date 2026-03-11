'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const allGalleryItems = [
  { id: 1, title: 'Evento Corporativo', span: 'col-span-1 row-span-1' },
  { id: 2, title: 'Detalhe de Apresentação', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Montagem de Mesa', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Celebração Social', span: 'col-span-1 row-span-1' },
  { id: 5, title: 'Gastronomia', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'Atendimento', span: 'col-span-1 row-span-1' },
  { id: 7, title: 'Buffet Premium', span: 'col-span-1 row-span-1' },
  { id: 8, title: 'Decoração Elegante', span: 'col-span-1 row-span-1' },
  { id: 9, title: 'Serviço Refinado', span: 'col-span-1 row-span-1' },
  { id: 10, title: 'Pratos Especiais', span: 'col-span-1 row-span-1' },
  { id: 11, title: 'Ambiente Sofisticado', span: 'col-span-1 row-span-1' },
  { id: 12, title: 'Momento Especial', span: 'col-span-1 row-span-1' },
  { id: 13, title: 'Detalhes Requintados', span: 'col-span-1 row-span-1' },
  { id: 14, title: 'Apresentação Impecável', span: 'col-span-1 row-span-1' },
  { id: 15, title: 'Convidados Felizes', span: 'col-span-1 row-span-1' },
  { id: 16, title: 'Sucesso Total', span: 'col-span-1 row-span-1' },
]

export default function GaleriaSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const galleryItems = currentPage === 0 ? allGalleryItems.slice(0, 8) : allGalleryItems.slice(8, 16)
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4 sm:gap-5 lg:gap-6"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`${item.span} group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 border border-border-light/50 cursor-pointer`}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center bg-background-warm">
                <div className="text-center">
                  <p className="text-2xl text-text-muted/20 mx-auto mb-1">📷</p>
                  <p className="text-xs text-text-muted/40 font-medium">{item.title}</p>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <p className="text-white font-semibold text-sm sm:text-base">
                  {item.title}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/50 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-10 sm:mt-12">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-elevated active:scale-95"
            aria-label="Fotos anteriores"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {[0, 1].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentPage === page ? 'bg-primary w-6' : 'bg-border-light hover:bg-primary/50'
                }`}
                aria-label={`Ir para grupo ${page + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-elevated active:scale-95"
            aria-label="Próximas fotos"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
    </section>
  )
}
