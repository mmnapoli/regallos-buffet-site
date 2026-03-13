'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Instagram, Clock } from 'lucide-react'

interface FooterProps {
  logoSrc?: string
}

export default function Footer({ logoSrc = '/logo-horizontal.svg' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background-dark text-white">
      {/* Decorative divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block cursor-pointer group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg">
              <div className="relative h-10 w-40">
                <Image
                  src={logoSrc}
                  alt="Regallos Gastronomia"
                  fill
                  className="object-contain brightness-0 invert transition-opacity duration-200 group-hover:opacity-80"
                />
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Há 14 anos transformando eventos em experiências gastronômicas inesquecíveis. Qualidade, cuidado e sabor em cada detalhe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Menu
            </h3>
            <nav className="space-y-3" aria-label="Links de navegação">
              <Link
                href="/"
                className="block text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                Início
              </Link>
              <Link
                href="/cardapios"
                className="block text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                Cardápios
              </Link>
              <Link
                href="/eventos"
                className="block text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                Eventos
              </Link>
              <Link
                href="/orcamento"
                className="block text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                Orçamento
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+5511947588959"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer group"
              >
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  (11) 94758-8959
                </span>
              </a>
              <a
                href="https://wa.me/5511947588959"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors duration-200 cursor-pointer group"
              >
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Fale via WhatsApp
                </span>
              </a>
              <div className="flex items-start gap-3 text-white/70 group cursor-default">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Rua Manuel Jacinto, 526</p>
                  <p>São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Informações
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/70 cursor-default">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Seg - Sex</p>
                  <p>8h - 18h</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                  Siga-nos
                </p>
                <a
                  href="https://instagram.com/regallosgastronomia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-200 cursor-pointer group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-white/50">
            © {currentYear} Regallos Gastronomia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/40">
            Criado com ❤️ para eventos inesquecíveis
          </p>
        </div>
      </div>
    </footer>
  )
}
