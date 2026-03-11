'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    text: 'A Regallos transformou nosso evento corporativo em algo realmente memorável. Profissionalismo impecável e comida excepcional.',
    author: 'Bruno Santos',
    company: 'Diretor Executivo - TechCorp',
    rating: 5,
  },
  {
    id: 2,
    text: 'Cada detalhe foi pensado com cuidado. Desde a apresentação até o atendimento, tudo refletia qualidade premium.',
    author: 'Marina Costa',
    company: 'Anfitriã - Evento Social',
    rating: 5,
  },
  {
    id: 3,
    text: 'Não apenas comida deliciosa, mas uma experiência completa. A equipe é dedicada e verdadeiramente comprometida.',
    author: 'Felipe Oliveira',
    company: 'Gerente de Eventos',
    rating: 5,
  },
]

export default function DepoimentosSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Histórias de eventos transformados em sucessos inesquecíveis.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="relative p-6 sm:p-8 bg-background-warm rounded-2xl border border-border-light/50 transition-all duration-300 hover:border-accent/30 hover:shadow-card"
            >
              {/* Quote mark */}
              <div className="absolute -top-2 -left-2 w-12 h-12 flex items-center justify-center">
                <span className="text-5xl text-accent/20 font-serif">"</span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-main text-base sm:text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border-light/50">
                <p className="font-semibold text-text-main text-sm sm:text-base">
                  {testimonial.author}
                </p>
                <p className="text-xs sm:text-sm text-text-muted">
                  {testimonial.company}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent rounded-b-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
