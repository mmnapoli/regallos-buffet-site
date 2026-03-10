'use client'

import Link from 'next/link'
import { UtensilsCrossed, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-accent" aria-hidden="true" />
              <div>
                <span className="font-heading text-lg font-bold block leading-tight">Regallos</span>
                <span className="text-[10px] text-accent tracking-[0.2em] uppercase">Gastronomia & Eventos</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Há 14 anos transformando momentos em experiências gastronômicas inesquecíveis. Eventos sociais e corporativos com cardápios personalizados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4 text-accent">Navegação</h3>
            <nav className="space-y-2" aria-label="Links do rodapé">
              <Link href="/" className="block text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer">Início</Link>
              <Link href="/cardapios" className="block text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer">Cardápios</Link>
              <Link href="/eventos" className="block text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer">Eventos</Link>
              <Link href="/orcamento" className="block text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer">Faça um Orçamento</Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4 text-accent">Contato</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/5511947588959"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                (11) 94758-8959
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Rua Manuel Jacinto, 526 – São Paulo, SP<br />CEP 05624-000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                Seg a Sex: 8h às 18h
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Regallos Gastronomia e Eventos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
