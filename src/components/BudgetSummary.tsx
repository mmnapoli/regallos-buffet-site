'use client'

import { MessageCircle, ArrowLeft, FileText } from 'lucide-react'
import type { Cardapio, Extra } from '@/types'

interface BudgetSummaryProps {
  cardapio: Cardapio
  extras: Extra[]
  guests: number
  onBack: () => void
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function BudgetSummary({ cardapio, extras, guests, onBack }: BudgetSummaryProps) {
  const baseTotal = cardapio.pricePerPerson * guests

  const extrasPerPerson = extras
    .filter((e) => e.chargeType === 'per_person')
    .reduce((sum, e) => sum + e.price * guests, 0)

  const extrasFixed = extras
    .filter((e) => e.chargeType === 'fixed')
    .reduce((sum, e) => sum + e.price, 0)

  const total = baseTotal + extrasPerPerson + extrasFixed
  const perPerson = total / guests

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de um orçamento:\n\n` +
    `*Cardápio:* ${cardapio.name}\n` +
    `*Convidados:* ${guests}\n` +
    `*Base:* ${formatCurrency(baseTotal)}\n` +
    (extras.length > 0
      ? `*Extras:*\n${extras.map((e) => {
          const val = e.chargeType === 'per_person' ? e.price * guests : e.price
          return `  - ${e.name}: ${formatCurrency(val)}`
        }).join('\n')}\n`
      : '') +
    `\n*Total estimado:* ${formatCurrency(total)}\n` +
    `*Por pessoa:* ${formatCurrency(perPerson)}`
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-5 h-5 text-accent" aria-hidden="true" />
        <h2 className="font-heading text-2xl font-bold text-text-main">
          Resumo do Orçamento
        </h2>
      </div>

      {/* Card resumo */}
      <div className="bg-white rounded-xl border border-border-light shadow-card p-6 space-y-4">
        {/* Cardápio base */}
        <div className="flex justify-between items-center pb-3 border-b border-border-light">
          <div>
            <p className="font-medium text-text-main">{cardapio.name}</p>
            <p className="text-xs text-text-muted">
              {formatCurrency(cardapio.pricePerPerson)} x {guests} convidados
            </p>
          </div>
          <span className="font-bold text-text-main">{formatCurrency(baseTotal)}</span>
        </div>

        {/* Extras */}
        {extras.length > 0 && (
          <div className="space-y-2 pb-3 border-b border-border-light">
            <p className="text-xs text-text-muted uppercase tracking-wide font-medium">Extras</p>
            {extras.map((extra) => {
              const val = extra.chargeType === 'per_person' ? extra.price * guests : extra.price
              return (
                <div key={extra.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-text-main">{extra.name}</p>
                    <p className="text-[10px] text-text-muted">
                      {extra.chargeType === 'per_person'
                        ? `${formatCurrency(extra.price)} x ${guests}`
                        : 'Valor fixo'
                      }
                    </p>
                  </div>
                  <span className="text-sm font-medium text-text-main">{formatCurrency(val)}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Totais */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-muted">Por pessoa</span>
            <span className="text-sm font-medium text-text-main">{formatCurrency(perPerson)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-accent/20">
            <span className="font-heading text-lg font-bold text-text-main">Total</span>
            <span className="font-heading text-2xl font-bold text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Selo premium */}
      <div className="text-center">
        <span className="inline-block text-[10px] uppercase tracking-widest text-accent border border-accent/30 rounded-full px-4 py-1 font-medium">
          Orçamento Estimado
        </span>
      </div>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border-light text-text-muted font-medium text-sm transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Voltar e Editar
        </button>

        <a
          href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium text-sm transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Enviar via WhatsApp
        </a>
      </div>
    </div>
  )
}
