'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UtensilsCrossed, Phone, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/cardapios', label: 'Cardápios' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/orcamento', label: 'Orçamento' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer" aria-label="Regallos Gastronomia - Página inicial">
          <UtensilsCrossed className="w-7 h-7 text-primary" aria-hidden="true" />
          <div>
            <span className="font-heading text-xl font-bold text-primary tracking-wide block leading-tight">
              Regallos
            </span>
            <span className="text-[10px] text-accent font-medium tracking-[0.2em] uppercase">
              Gastronomia & Eventos
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Menu principal">
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer
                  ${isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-text-muted hover:text-text-main hover:bg-background-warm'
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5511947588959?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20do%20Buffet%20Regallos."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Entrar em contato via WhatsApp"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Contato
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-background-warm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen
              ? <X className="w-5 h-5" aria-hidden="true" />
              : <Menu className="w-5 h-5" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border-light bg-white px-4 py-3 space-y-1" aria-label="Menu mobile">
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer
                  ${isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-text-muted hover:text-text-main hover:bg-background-warm'
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://wa.me/5511947588959"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-primary text-sm font-medium cursor-pointer"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            (11) 94758-8959
          </a>
        </nav>
      )}
    </header>
  )
}
