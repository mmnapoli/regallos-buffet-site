'use client'

import { Plus, Check } from 'lucide-react'
import type { Extra } from '@/types'

interface ExtraCardProps {
  extra: Extra
  isSelected: boolean
  guests: number
  onToggle: (extra: Extra) => void
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const categoryLabels: Record<string, string> = {
  bebidas: 'Bebida',
  salgados: 'Entrada',
  sobremesas: 'Sobremesa',
  servicos: 'Serviço',
}

export default function ExtraCard({ extra, isSelected, guests, onToggle }: ExtraCardProps) {
  const totalPrice = extra.chargeType === 'per_person'
    ? extra.price * guests
    : extra.price

  return (
    <button
      onClick={() => onToggle(extra)}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border-light bg-white hover:border-primary/20'
        }
      `}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-text-main truncate">
              {extra.name}
            </h4>
            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium border border-accent/20">
              {categoryLabels[extra.category] || extra.category}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 line-clamp-1">
            {extra.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold text-primary">
              {formatCurrency(extra.price)}
            </span>
            <span className="text-[10px] text-text-muted">
              {extra.chargeType === 'per_person' ? '/pessoa' : 'fixo'}
            </span>
            {extra.chargeType === 'per_person' && (
              <span className="text-[10px] text-accent">
                = {formatCurrency(totalPrice)}
              </span>
            )}
          </div>
        </div>

        <div
          className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200
            ${isSelected
              ? 'bg-primary text-white'
              : 'bg-border-light text-text-muted'
            }
          `}
        >
          {isSelected
            ? <Check className="w-4 h-4" aria-hidden="true" />
            : <Plus className="w-4 h-4" aria-hidden="true" />
          }
        </div>
      </div>
    </button>
  )
}
