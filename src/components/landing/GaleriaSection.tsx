'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const galleryItems = [
  { id: 1, title: 'Evento Corporativo', span: 'col-span-1 row-span-1' },
  { id: 2, title: 'Detalhe de Apresentação', span: 'col-span-1 row-span-2' },
  { id: 3, title: 'Montagem de Mesa', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Celebração Social', span: 'col-span-2 row-span-1' },
  { id: 5, title: 'Gastronomia', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'Atendimento', span: 'col-span-1 row-span-1' },
]

export default function GaleriaSection() {
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
    <section className="relative py-16 sm:py-20 lg:py-24 bg-background-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="h-1 w-12 bg-accent rounded-full" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-4">
            Galeria de Eventos
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Veja o cuidado, qualidade e elegância em cada evento que criamos.
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
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 font-medium">{item.title}</p>
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

        {/* CTA Below Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-text-muted text-base sm:text-lg mb-4">
            Quer ver mais? Explore nossos cardápios e dê o primeiro passo.
          </p>
          <a
            href="https://wa.me/5511947588959?text=Olá!%20Gostaria%20de%20mais%20informações%20e%20fotos%20dos%20nossos%20eventos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary/5 hover:shadow-card active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          >
            Ver Mais Fotos
          </a>
        </motion.div>
      </div>
    </section>
  )
}
