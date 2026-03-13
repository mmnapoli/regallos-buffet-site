'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/cardapios', label: 'Cardápios' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/orcamento', label: 'Orçamento' },
]

interface HeaderProps {
  logoSrc?: string
}

export default function Header({ logoSrc = '/logo-horizontal.svg' }: HeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
          aria-label="Regallos Gastronomia - Página inicial"
        >
          <div className="relative h-10 sm:h-12 w-40">
            <Image
              src={logoSrc}
              alt="Regallos Gastronomia"
              fill
              className="object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu principal">
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer relative group
                  ${isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text-main'
                  }
                `}
              >
                {link.label}
                <span
                  className={`absolute bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTA and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/5511947588959?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20evento."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-card active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            aria-label="Solicitar orçamento via WhatsApp"
          >
            <span className="hidden md:inline">Solicitar Orçamento</span>
            <span className="md:hidden">Orçamento</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-background-warm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-primary" aria-hidden="true" />
              : <Menu className="w-5 h-5 text-primary" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-border-light/30 bg-white/95 backdrop-blur-sm px-4 py-3 space-y-2"
          aria-label="Menu mobile"
        >
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-text-muted hover:text-text-main hover:bg-background-warm'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://wa.me/5511947588959"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-primary text-sm font-medium cursor-pointer rounded-lg hover:bg-primary/5 transition-colors duration-200"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            (11) 94758-8959
          </a>
        </nav>
      )}
    </header>
  )
}
