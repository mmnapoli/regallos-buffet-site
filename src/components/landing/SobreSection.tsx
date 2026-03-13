'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionImageDB } from '@/lib/types'

export default function SobreSection() {
  const [image, setImage] = useState<SectionImageDB | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    fetch('/api/site-images')
      .then((r) => r.json())
      .then((data) => {
        setImage(data.sections.sobre)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background */}
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
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-accent rounded-full" />
                  <span className="text-sm font-semibold text-accent tracking-wide uppercase">
                    Sobre nós
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-6">
                  Cuidado em Cada Detalhe,
                  <span className="block text-accent">Sabor em Cada Momento</span>
                </h2>
              </div>

              <div className="space-y-4 text-text-muted text-base sm:text-lg leading-relaxed">
                <p>
                  A Regallos Gastronomia nasceu da paixão por criar experiências memoráveis. Durante 14 anos, transformamos cada evento em uma celebração de sabor, elegância e cuidado.
                </p>
                <p>
                  Somos mais que um buffet. Somos consultores, parceiros na criação de momentos que deixam marcas positivas. Cada cardápio é pensado com precisão, cada prato é apresentado com refinamento, cada detalhe reflete nosso compromisso com a excelência.
                </p>
                <p>
                  Nossa equipe é treinada não apenas em gastronomia, mas na arte de receber bem. Entendemos que eventos corporativos exigem profissionalismo milimétrico, e celebrações sociais pedem sensibilidade e charme.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-border-light/50">
                <p className="text-text-main font-semibold text-sm">
                  —
                </p>
                <p className="italic text-text-muted text-sm mt-2">
                  "Porque seu evento merece ser excepcional"
                </p>
              </div>
            </div>
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
              <div className="relative overflow-hidden rounded-2xl bg-background-warm aspect-square flex items-center justify-center">
                <p className="text-text-muted">Carregando imagem...</p>
              </div>
            ) : image?.src && !imageError ? (
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/15 via-primary/10 to-transparent aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍🍳</div>
                    <p className="text-text-muted/30 font-medium">Equipe Regallos</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-24 h-24 border border-accent/30 rounded-full" />
                <div className="absolute bottom-6 left-6 w-32 h-32 border border-primary/20 rounded-lg rotate-45" />
              </div>
            )}

            {/* Accent line */}
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent/30 to-transparent rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
