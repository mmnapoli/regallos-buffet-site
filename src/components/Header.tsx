'use client'

import { UtensilsCrossed, Phone } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-7 h-7 text-primary" aria-hidden="true" />
          <div>
            <h1 className="font-heading text-xl font-bold text-primary tracking-wide">
              Regallos
            </h1>
            <span className="text-xs text-accent font-medium tracking-widest uppercase">
              Gastronomia
            </span>
          </div>
        </div>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Entrar em contato via WhatsApp"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Contato</span>
        </a>
      </div>
    </header>
  )
}
