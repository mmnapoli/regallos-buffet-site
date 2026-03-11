'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Briefcase } from 'lucide-react'

const corporateEvents = [
  'Coffee Breaks & Recepções',
  'Convenções e Conferences',
  'Encontros Corporativos',
  'Coquetéis e Celebrações',
  'Brunches Executivos',
  'Confraternizações',
]

export default function CorporativoSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-background-warm overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-accent rounded-full" />
                <span className="text-sm font-semibold text-accent tracking-wide uppercase">
                  Para Empresas
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
                Eventos Corporativos com Precisão
              </h2>
            </div>

            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              Sua empresa merece um evento tão profissional quanto você. Entendemos as necessidades de eventos B2B: pontualidade, qualidade impecável, discrição e logística refinada.
            </p>

            {/* Event types */}
            <div className="mb-10">
              <p className="text-sm font-semibold text-text-main mb-4">
                Especializados em:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {corporateEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-text-muted text-sm sm:text-base">{event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-block"
            >
              <a
                href="https://wa.me/5511947588959?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20um%20evento%20corporativo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-elevated active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                Solicitar Proposta
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 aspect-[4/5]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Briefcase className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                  <p className="text-text-muted/30 font-medium">Evento corporativo</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-24 h-24 border-2 border-accent/30 rounded-xl" />
              <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-primary/20 rounded-full" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-elevated p-4 max-w-xs hidden xl:block"
            >
              <p className="text-sm font-semibold text-primary flex items-center gap-2 mb-1">
                ✓ Suporte Total
              </p>
              <p className="text-xs text-text-muted">
                Do planejamento à limpeza final
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
