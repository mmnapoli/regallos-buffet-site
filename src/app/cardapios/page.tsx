'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Users, ChefHat, Beef, UtensilsCrossed, Coffee, Gift, Salad } from 'lucide-react'

const cardapios = [
  {
    slug: 'churrasco',
    icon: Beef,
    title: 'Churrasco',
    description: 'Picanha, maminha, fraldinha, linguiça artesanal e costela no bafo. Acompanha arroz, farofa, vinagrete, pão de alho e saladas frescas.',
    priceFrom: 110,
    minGuests: 40,
    highlights: ['Carnes nobres na brasa', 'Guarnições completas', 'Churrasqueiro profissional'],
  },
  {
    slug: 'feijoada',
    icon: UtensilsCrossed,
    title: 'Feijoada',
    description: 'Feijoada completa com todas as carnes tradicionais. Arroz branco, couve refogada, farofa crocante, laranja e torresmo.',
    priceFrom: 89,
    minGuests: 50,
    highlights: ['Receita tradicional', 'Carnes selecionadas', 'Acompanhamentos clássicos'],
  },
  {
    slug: 'finger-food',
    icon: ChefHat,
    title: 'Finger Food',
    description: 'Seleção sofisticada de canapés, bruschettas, mini hambúrgueres gourmet, wraps artesanais e tartares.',
    priceFrom: 75,
    minGuests: 30,
    highlights: ['Apresentação premium', 'Ideal para coquetéis', 'Variedade de sabores'],
  },
  {
    slug: 'grazing-table',
    icon: Salad,
    title: 'Grazing Table',
    description: 'Mesa de frios e petiscos montada com queijos artesanais, embutidos importados, frutas, geleias e pães especiais.',
    priceFrom: 95,
    minGuests: 30,
    highlights: ['Montagem cenográfica', 'Produtos artesanais', 'Visual impactante'],
  },
  {
    slug: 'festival-massas',
    icon: UtensilsCrossed,
    title: 'Festival de Massas',
    description: 'Estação ao vivo com massas frescas e molhos artesanais: bolonhesa, alfredo, pesto, tomate seco e muito mais.',
    priceFrom: 85,
    minGuests: 40,
    highlights: ['Preparo ao vivo', 'Massas frescas', 'Molhos autorais'],
  },
  {
    slug: 'coffee-break',
    icon: Coffee,
    title: 'Coffee Break',
    description: 'Cardápio adaptável para reuniões, workshops e seminários. Salgados, doces, frutas, sucos e cafés especiais.',
    priceFrom: 45,
    minGuests: 20,
    highlights: ['Ideal para corporativo', 'Cardápio flexível', 'Montagem rápida'],
  },
]

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CardapiosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 bg-gradient-to-b from-background-warm to-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-medium text-accent uppercase tracking-widest">Nossos cardápios</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mt-3">
            Sabores para cada ocasião
          </h1>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Todos os cardápios são personalizáveis. Escolha sua base e adicione extras para criar a experiência perfeita.
          </p>
        </div>
      </section>

      {/* Grid de cardápios */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardapios.map((cardapio) => {
            const Icon = cardapio.icon
            return (
              <div
                key={cardapio.slug}
                className="bg-white rounded-xl border border-border-light p-6 transition-all duration-200 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading text-xl font-bold text-text-main">{cardapio.title}</h2>
                    <p className="text-sm text-text-muted mt-2 leading-relaxed">{cardapio.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {cardapio.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-accent/5 text-accent font-medium border border-accent/15"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          A partir de {formatCurrency(cardapio.priceFrom)}
                        </span>
                        <span className="text-xs text-text-muted"> /pessoa</span>
                        <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                          <Users className="w-3 h-3" aria-hidden="true" />
                          Mín. {cardapio.minGuests} convidados
                        </div>
                      </div>
                      <Link
                        href="/orcamento"
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200 cursor-pointer"
                      >
                        Orçar
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Gift Box */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background-warm rounded-2xl p-8 sm:p-10 border border-border-light flex flex-col sm:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
              <Gift className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-2xl font-bold text-text-main">Gift Box Personalizada</h2>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">
                Caixas especiais para datas comemorativas, brindes corporativos e presentes temáticos.
                Montamos a gift box perfeita para a sua necessidade.
              </p>
            </div>
            <a
              href="https://wa.me/5511947588959?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20Gift%20Boxes."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium text-sm transition-colors duration-200 hover:bg-accent-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Solicitar Gift Box
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
