'use client'

import { motion } from 'framer-motion'

const clients = [
  { id: 1, name: 'Cliente 1' },
  { id: 2, name: 'Cliente 2' },
  { id: 3, name: 'Cliente 3' },
  { id: 4, name: 'Cliente 4' },
  { id: 5, name: 'Cliente 5' },
  { id: 6, name: 'Cliente 6' },
]

export default function ClientesSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-background-warm overflow-hidden">
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
            Marcas que Confiam em Nós
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Trabalhamos com empresas líderes, eventos de marcas premium e celebrações de pessoas que entendem qualidade.
          </p>
        </motion.div>

        {/* Logos grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="flex items-center justify-center p-4 sm:p-6 bg-white rounded-xl border border-border-light/50 transition-all duration-300 hover:border-accent/30 hover:shadow-card cursor-pointer"
            >
              {/* Placeholder logo */}
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-accent/30 to-primary/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-sm font-bold text-primary/50">Logo</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-text-muted">
                  {client.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-text-muted text-sm sm:text-base">
            Sua marca também pode fazer parte dessa história. Junte-se a empresas que priorizam qualidade.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
