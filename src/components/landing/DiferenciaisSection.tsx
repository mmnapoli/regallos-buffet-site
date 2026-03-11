'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Utensils, Users, Sparkles } from 'lucide-react'

const diferenciais = [
  {
    icon: Utensils,
    title: 'Cardápios Personalizados',
    description: 'Criamos menus exclusivos pensados no seu público, preferências e orçamento.',
  },
  {
    icon: Users,
    title: 'Atendimento Dedicado',
    description: 'Equipe treinada e prestativa, presente do início ao fim do seu evento.',
  },
  {
    icon: CheckCircle,
    title: 'Estrutura Completa',
    description: 'Fornecemos tudo: mesas, cadeiras, louça, talheres e toda logística.',
  },
  {
    icon: Sparkles,
    title: 'Apresentação Impecável',
    description: 'Cada detalhe contado, da decoração ao acabamento de cada prato.',
  },
]

export default function DiferenciaisSection() {
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
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Por que escolher a Regallos
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Somos mais que um buffet. Somos especialistas em criar experiências inesquecíveis.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {diferenciais.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className="h-full p-6 sm:p-8 bg-background-warm rounded-2xl border border-border-light/50 transition-all duration-300 hover:border-accent/30 hover:shadow-card cursor-pointer">
                  {/* Icon container */}
                  <div className="mb-5 inline-block p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-text-main mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative line */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
