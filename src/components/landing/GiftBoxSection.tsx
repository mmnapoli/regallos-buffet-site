'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const giftBoxes = [
  {
    id: 1,
    title: 'Boxes corporativas\nsob medida',
    description:
      'Temos opções de kits corporativos ideais para presentear funcionários, clientes e stakeholders, com atenção aos detalhes e uma apresentação alinhada à proposta de cada marca.',
  },
  {
    id: 2,
    title: 'Boxes temáticas\npara ocasiões especiais',
    description:
      'Também criamos boxes temáticas para datas e momentos especiais, como Festa Junina, Dia das Mães e outras ocasiões ao longo do ano, com composições personalizadas que tornam cada entrega mais especial.',
  },
]

export default function GiftBoxSection() {
  const containerRef = useRef(null)

  // Parallax suave para os cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const card1Y = useTransform(scrollYProgress, [0, 1], [40, -20])
  const card2Y = useTransform(scrollYProgress, [0, 1], [-40, 20])

  // Variants para o título (reveal com delay)
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Variantes para cards (entrada suave com stagger)
  const cardVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  })

  // Variante para a borda superior dos cards (animação on hover)
  const topBorderVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Grande e Editorial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={titleVariants}
          className="max-w-3xl mb-20 sm:mb-28 lg:mb-32"
        >
          <div className="mb-6">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Presentes Especiais
            </span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-text-main leading-tight">
            Gift boxes para
            <br />
            <span className="text-primary">diferentes ocasiões</span>
          </h2>
        </motion.div>

        {/* Cards Layout - Staggered Editorial Style */}
        <div className="relative space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Card 1 - Left Aligned */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardVariants(0.1)}
            style={{ y: card1Y }}
            className="w-full lg:w-1/2 group cursor-pointer"
          >
            <div className="relative bg-white border-l-4 border-l-primary/0 group-hover:border-l-primary pl-0 group-hover:pl-6 transition-all duration-500 overflow-hidden">
              {/* Top accent line - appear on hover */}
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              {/* Content */}
              <div className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8">
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-6 group-hover:text-primary transition-colors duration-500">
                  {giftBoxes[0].title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-8 group-hover:text-text-main/80 transition-colors duration-500">
                  {giftBoxes[0].description}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-500">
                  <span>Conheça mais</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Right Aligned with offset */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardVariants(0.3)}
            style={{ y: card2Y }}
            className="w-full lg:w-1/2 lg:ml-auto group cursor-pointer"
          >
            <div className="relative bg-white border-r-4 border-r-primary/0 group-hover:border-r-primary pr-0 group-hover:pr-6 transition-all duration-500 overflow-hidden">
              {/* Top accent line - appear on hover */}
              <div className="absolute top-0 right-0 h-1 bg-gradient-to-l from-primary via-primary to-transparent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              {/* Content */}
              <div className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8">
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-6 group-hover:text-primary transition-colors duration-500">
                  {giftBoxes[1].title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-8 group-hover:text-text-main/80 transition-colors duration-500">
                  {giftBoxes[1].description}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-2 transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                  <span>Conheça mais</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
