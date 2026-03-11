'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
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
        duration: 0.7,
      },
    },
  }

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-white">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Image
              src="/logo-horizontal.svg"
              alt="Regallos Gastronomia"
              width={280}
              height={105}
              className="h-20 sm:h-24 lg:h-28 w-auto"
              priority
            />
          </motion.div>

          {/* Main headline */}
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-main leading-tight tracking-tight text-balance">
              Eventos corporativos,
              <span className="block text-accent">celebrações sociais</span>
              e gift boxes
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl"
          >
            Estrutura completa, equipe preparada, cardápios bem apresentados e atendimento personalizado para cada ocasião.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-xl bg-background-warm/50 backdrop-blur-sm border border-border-light/30"
            >
              <p className="font-heading text-3xl sm:text-4xl font-bold text-accent">14+</p>
              <p className="text-sm sm:text-base text-text-muted text-center">anos de experiência</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-xl bg-background-warm/50 backdrop-blur-sm border border-border-light/30"
            >
              <p className="font-heading text-3xl sm:text-4xl font-bold text-accent">2.000+</p>
              <p className="text-sm sm:text-base text-text-muted text-center">eventos realizados</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-xl bg-background-warm/50 backdrop-blur-sm border border-border-light/30"
            >
              <p className="font-heading text-3xl sm:text-4xl font-bold text-accent">100%</p>
              <p className="text-sm sm:text-base text-text-muted text-center">personalizado</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
