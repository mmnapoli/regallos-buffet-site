export interface Cardapio {
  id: string
  name: string
  description: string
  pricePerPerson: number
  minGuests: number
  image: string
}

export interface Extra {
  id: string
  name: string
  description: string
  price: number
  chargeType: 'per_person' | 'fixed'
  category: 'bebidas' | 'salgados' | 'sobremesas' | 'servicos'
  linkedCardapios: string[] // IDs dos cardápios compatíveis
  image?: string
}

export interface BudgetState {
  step: 1 | 2 | 3
  selectedCardapio: Cardapio | null
  guests: number
  selectedExtras: Extra[]
}
