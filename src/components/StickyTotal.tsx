'use client'

import { Calculator } from 'lucide-react'
import type { Cardapio, Extra } from '@/types'

interface StickyTotalProps {
  cardapio: Cardapio | null
  extras: Extra[]
  guests: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function StickyTotal({ cardapio, extras, guests }: StickyTotalProps) {
  if (!cardapio) return null

  const baseTotal = cardapio.pricePerPerson * guests

  const extrasPerPerson = extras
    .filter((e) => e.chargeType === 'per_person')
    .reduce((sum, e) => sum + e.price * guests, 0)

  const extrasFixed = extras
    .filter((e) => e.chargeType === 'fixed')
    .reduce((sum, e) => sum + e.price, 0)

  const total = baseTotal + extrasPerPerson + extrasFixed
  const perPerson = guests > 0 ? total / guests : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-sticky border-t border-accent/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-accent" aria-hidden="true" />
          <div className="text-sm">
            <p className="text-text-muted">
              {cardapio.name} &middot; {guests} convidados
              {extras.length > 0 && ` · ${extras.length} extra${extras.length > 1 ? 's' : ''}`}
            </p>
            <p className="text-xs text-text-muted">
              {formatCurrency(perPerson)} por pessoa
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-text-muted uppercase tracking-wide">Total</p>
          <p className="text-xl font-heading font-bold text-primary">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
    </div>
  )
}
