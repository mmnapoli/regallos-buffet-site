'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase } from 'lucide-react'
import { SectionImageDB } from '@/lib/types'

export default function CorporativoSection() {
  const [image, setImage] = useState<SectionImageDB | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    fetch('/api/site-images')
      .then((r) => r.json())
      .then((data) => {
        setImage(data.sections.corporativo)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-background-warm overflow-hidden">
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
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                Para Empresas
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
                Eventos Corporativos Sofisticados
              </h2>
            </div>

            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              Levamos toda a estrutura necessária para o seu evento ser um sucesso. Nossa equipe treinada garante pontualidade, apresentação impecável e atendimento atencioso a cada detalhe.
            </p>

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

          {/* Image placeholder or real image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            {loading ? (
              <div className="relative overflow-hidden rounded-xl bg-background-warm aspect-[4/5] flex items-center justify-center">
                <p className="text-text-muted">Carregando imagem...</p>
              </div>
            ) : image?.src && !imageError ? (
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl bg-background-warm aspect-[4/5]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Briefcase className="w-12 h-12 text-text-muted/20 mx-auto mb-2" />
                    <p className="text-xs text-text-muted/40 font-medium">Evento corporativo</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
