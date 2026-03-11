'use client'

import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'

const giftBoxes = [
  {
    title: 'Kits Personalizados',
    description: 'Caixas premium com seleção especial de iguarias, personalizadas para sua empresa ou ocasião.',
    icon: Gift,
  },
  {
    title: 'Datas Temáticas',
    description: 'Box curadas para aniversariantes, final de ano, eventos corporativos e celebrações especiais.',
    icon: Gift,
  },
  {
    title: 'Apresentação Premium',
    description: 'Cada detalhe pensado com cuidado. Embalagem elegante que impressiona seus clientes e colaboradores.',
    icon: Gift,
  },
]

export default function GiftBoxSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
      {/* Background accent */}
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
          <div className="mb-4">
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">
              Presentes Premium
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-4">
            Gift Boxes
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Soluções elegantes e personalizadas para dar de presente com sofisticação.
          </p>
        </motion.div>

        {/* Gift boxes grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {giftBoxes.map((box, index) => {
            const Icon = box.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative group bg-white rounded-xl p-6 sm:p-8 border border-border-light transition-all duration-300 shadow-soft group-hover:shadow-card"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-text-main mb-3">
                  {box.title}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                  {box.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
