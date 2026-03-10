'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StepIndicator from '@/components/StepIndicator'
import CardapioCard from '@/components/CardapioCard'
import GuestCounter from '@/components/GuestCounter'
import ExtraCard from '@/components/ExtraCard'
import BudgetSummary from '@/components/BudgetSummary'
import StickyTotal from '@/components/StickyTotal'
import { cardapios, extras as allExtras } from '@/data/mock'
import type { Cardapio, Extra } from '@/types'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

export default function OrcamentoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedCardapio, setSelectedCardapio] = useState<Cardapio | null>(null)
  const [guests, setGuests] = useState(50)
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])

  const availableExtras = useMemo(() => {
    if (!selectedCardapio) return []
    return allExtras.filter((e) => e.linkedCardapios.includes(selectedCardapio.id))
  }, [selectedCardapio])

  const groupedExtras = useMemo(() => {
    const groups: Record<string, Extra[]> = {}
    availableExtras.forEach((e) => {
      if (!groups[e.category]) groups[e.category] = []
      groups[e.category].push(e)
    })
    return groups
  }, [availableExtras])

  const categoryLabels: Record<string, string> = {
    bebidas: 'Bebidas',
    salgados: 'Salgados & Entradas',
    sobremesas: 'Sobremesas',
    servicos: 'Serviços',
  }

  const handleSelectCardapio = (cardapio: Cardapio) => {
    setSelectedCardapio(cardapio)
    setGuests(Math.max(guests, cardapio.minGuests))
    setSelectedExtras((prev) =>
      prev.filter((e) => e.linkedCardapios.includes(cardapio.id))
    )
  }

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id)
      if (exists) return prev.filter((e) => e.id !== extra.id)
      return [...prev, extra]
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-28 pb-32 max-w-3xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center mb-8">
          <span className="text-xs font-medium text-accent uppercase tracking-widest">Orçamento online</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-main mt-3">
            Monte seu Cardápio
          </h1>
          <p className="text-text-muted mt-2 text-sm max-w-md mx-auto">
            Escolha o cardápio base, personalize com extras e veja o valor em tempo real.
          </p>
        </section>

        <StepIndicator currentStep={step} />

        {/* Step 1 */}
        {step === 1 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
              <h2 className="font-heading text-xl font-bold text-text-main">
                Escolha o Cardápio Base
              </h2>
            </div>

            <div className="space-y-3">
              {cardapios.map((c) => (
                <CardapioCard
                  key={c.id}
                  cardapio={c}
                  isSelected={selectedCardapio?.id === c.id}
                  onSelect={handleSelectCardapio}
                />
              ))}
            </div>

            {selectedCardapio && (
              <GuestCounter
                guests={guests}
                minGuests={selectedCardapio.minGuests}
                onChange={setGuests}
              />
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedCardapio}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium text-sm transition-colors duration-200 hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Personalizar Extras
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </section>
        )}

        {/* Step 2 */}
        {step === 2 && selectedCardapio && (
          <section className="space-y-6">
            <GuestCounter
              guests={guests}
              minGuests={selectedCardapio.minGuests}
              onChange={setGuests}
            />

            {Object.entries(groupedExtras).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-heading text-lg font-bold text-text-main mb-3">
                  {categoryLabels[category] || category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((extra) => (
                    <ExtraCard
                      key={extra.id}
                      extra={extra}
                      isSelected={selectedExtras.some((e) => e.id === extra.id)}
                      guests={guests}
                      onToggle={toggleExtra}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border-light text-text-muted font-medium text-sm transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium text-sm transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Ver Resumo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </section>
        )}

        {/* Step 3 */}
        {step === 3 && selectedCardapio && (
          <section>
            <BudgetSummary
              cardapio={selectedCardapio}
              extras={selectedExtras}
              guests={guests}
              onBack={() => setStep(2)}
            />
          </section>
        )}
      </main>

      <StickyTotal
        cardapio={selectedCardapio}
        extras={selectedExtras}
        guests={guests}
      />

      {!selectedCardapio && <Footer />}
    </div>
  )
}
