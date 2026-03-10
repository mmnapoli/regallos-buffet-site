'use client'

import { Users, ChevronRight } from 'lucide-react'
import type { Cardapio } from '@/types'

interface CardapioCardProps {
  cardapio: Cardapio
  isSelected: boolean
  onSelect: (cardapio: Cardapio) => void
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CardapioCard({ cardapio, isSelected, onSelect }: CardapioCardProps) {
  return (
    <button
      onClick={() => onSelect(cardapio)}
      className={`w-full text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${isSelected
          ? 'border-primary bg-primary/5 shadow-card'
          : 'border-border-light bg-white hover:border-primary/30 hover:shadow-card'
        }
      `}
      aria-pressed={isSelected}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-xl font-bold text-text-main">
            {cardapio.name}
          </h3>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            {cardapio.description}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(cardapio.pricePerPerson)}
              <span className="text-xs text-text-muted font-normal"> /pessoa</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Mín. {cardapio.minGuests}
            </span>
          </div>
        </div>

        <div className={`mt-2 transition-colors duration-200 ${isSelected ? 'text-primary' : 'text-border-light'}`}>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-primary/10">
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            Selecionado
          </span>
        </div>
      )}
    </button>
  )
}
