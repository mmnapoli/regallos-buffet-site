'use client'

import { Minus, Plus, Users } from 'lucide-react'

interface GuestCounterProps {
  guests: number
  minGuests: number
  onChange: (value: number) => void
}

export default function GuestCounter({ guests, minGuests, onChange }: GuestCounterProps) {
  const decrement = () => {
    if (guests > minGuests) onChange(guests - 1)
  }

  const increment = () => {
    onChange(guests + 1)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val >= minGuests) {
      onChange(val)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-background-warm rounded-xl border border-border-light">
      <div className="flex items-center gap-2 text-text-muted">
        <Users className="w-5 h-5" aria-hidden="true" />
        <label htmlFor="guest-count" className="text-sm font-medium">
          Número de Convidados
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          disabled={guests <= minGuests}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border-light bg-white text-text-main transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Diminuir convidados"
        >
          <Minus className="w-4 h-4" aria-hidden="true" />
        </button>

        <input
          id="guest-count"
          type="number"
          min={minGuests}
          value={guests}
          onChange={handleInput}
          className="w-20 text-center text-2xl font-heading font-bold text-primary border-b-2 border-accent bg-transparent focus:outline-none focus:border-primary"
        />

        <button
          onClick={increment}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border-light bg-white text-text-main transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Aumentar convidados"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <span className="text-xs text-text-muted">
        Mínimo: {minGuests} convidados
      </span>
    </div>
  )
}
