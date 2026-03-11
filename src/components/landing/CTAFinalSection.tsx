'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, ArrowRight } from 'lucide-react'

export default function CTAFinalSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-background-dark overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-48" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-8"
        >
          {/* Decorative line */}
          <div className="flex justify-center">
            <div className="h-1 w-12 bg-accent rounded-full" />
          </div>

          {/* Main headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance">
            Vamos Criar Algo
            <span className="block text-accent">Memorável Juntos?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Cada evento é uma oportunidade de criar uma experiência única. Estamos prontos para transformar sua visão em realidade.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5511947588959?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-background-dark px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-accent-light hover:shadow-elevated active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-dark cursor-pointer group"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">Solicitar via WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Contact form CTA (optional) */}
            <button
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10 hover:shadow-card active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background-dark cursor-pointer"
              onClick={() => {
                // Scroll to contact form or open modal
                const contactElement = document.getElementById('contact-form')
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <Mail className="w-5 h-5" />
              <span>Fale Conosco</span>
            </button>
          </motion.div>

          {/* Additional contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-white/70 text-sm sm:text-base"
          >
            <a
              href="tel:+5511947588959"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              (11) 94758-8959
            </a>
            <a
              href="https://instagram.com/regallosgastronomia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer"
            >
              📷 @regallosgastronomia
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
