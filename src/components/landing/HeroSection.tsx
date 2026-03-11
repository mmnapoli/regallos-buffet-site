'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
      },
    },
  }

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-background-warm to-white" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -mr-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Text content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 w-fit">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide">
                  Gastronomia de Alto Padrão
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-main leading-tight tracking-tight text-balance">
                Experiências
                <span className="block text-primary">Gastronômicas</span>
                que Elevam Cada Evento
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl"
            >
              Para eventos corporativos e celebrações sociais, oferecemos cardápios personalizados, apresentação impecável e atendimento dedicado. Desde São Paulo para o Brasil.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-elevated active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/cardapios"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary/5 hover:shadow-card active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                Conhecer Cardápios
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-6 sm:gap-10 pt-4 sm:pt-8 border-t border-border-light/50 mt-8">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-primary">14+</p>
                <p className="text-sm text-text-muted mt-1">Anos de experiência</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-primary">2.000+</p>
                <p className="text-sm text-text-muted mt-1">Eventos realizados</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-text-muted mt-1">Personalizado</p>
              </div>
            </motion.div>
          </div>

          {/* Image placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 aspect-[4/5]">
              {/* Placeholder image - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl text-accent/30 mb-4">🍽️</div>
                  <p className="text-text-muted/30 font-medium">Imagem premium de evento</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute top-6 right-6 w-20 h-20 border-2 border-accent/30 rounded-full" />
              <div className="absolute bottom-6 left-6 w-32 h-32 border-2 border-primary/20 rounded-full" />
            </div>

            {/* Floating element */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-elevated p-4 max-w-xs hidden xl:block"
            >
              <p className="text-sm font-semibold text-text-main">
                ✓ Atendimento 24/7
              </p>
              <p className="text-xs text-text-muted mt-1">
                Pronto para transformar seu evento em um sucesso memorável
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
