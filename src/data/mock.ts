import { Cardapio, Extra } from '@/types'

export const cardapios: Cardapio[] = [
  {
    id: 'feijoada',
    name: 'Feijoada Premium',
    description: 'Feijoada completa com todas as carnes nobres, arroz, couve, farofa, laranja e acompanhamentos tradicionais.',
    pricePerPerson: 89,
    minGuests: 50,
    image: '/images/feijoada.jpg',
  },
  {
    id: 'churrasco',
    name: 'Churrasco Completo',
    description: 'Picanha, maminha, fraldinha, linguiça artesanal e costela no bafo com guarnições completas.',
    pricePerPerson: 110,
    minGuests: 40,
    image: '/images/churrasco.jpg',
  },
  {
    id: 'finger-food',
    name: 'Finger Food',
    description: 'Seleção de canapés, bruschettas, mini hambúrgueres gourmet e wraps artesanais.',
    pricePerPerson: 75,
    minGuests: 30,
    image: '/images/fingerfood.jpg',
  },
]

export const extras: Extra[] = [
  // Bebidas
  {
    id: 'sucos-naturais',
    name: 'Sucos Naturais',
    description: 'Variedade de sucos naturais da estação',
    price: 6,
    chargeType: 'per_person',
    category: 'bebidas',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  {
    id: 'refrigerante-agua',
    name: 'Refrigerante e Água',
    description: 'Refrigerantes variados e água mineral',
    price: 5,
    chargeType: 'per_person',
    category: 'bebidas',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  {
    id: 'bar-drinks',
    name: 'Bar de Drinks',
    description: 'Estação completa de drinks com bartender',
    price: 1200,
    chargeType: 'fixed',
    category: 'bebidas',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  // Salgados
  {
    id: 'mini-pasteis',
    name: 'Mini Pastéis',
    description: 'Pastéis variados: carne, queijo e palmito',
    price: 8,
    chargeType: 'per_person',
    category: 'salgados',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  {
    id: 'coxinha-gourmet',
    name: 'Coxinha Gourmet',
    description: 'Coxinhas recheadas com frango desfiado temperado',
    price: 7,
    chargeType: 'per_person',
    category: 'salgados',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  // Sobremesas
  {
    id: 'mesa-brigadeiros',
    name: 'Mesa de Brigadeiros',
    description: 'Brigadeiros gourmet de diversos sabores',
    price: 9,
    chargeType: 'per_person',
    category: 'sobremesas',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  {
    id: 'bolo-decorado',
    name: 'Bolo Decorado',
    description: 'Bolo cenográfico decorado sob encomenda',
    price: 350,
    chargeType: 'fixed',
    category: 'sobremesas',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  // Serviços
  {
    id: 'garcom-extra',
    name: 'Garçom Extra',
    description: 'Profissional adicional para servir o evento',
    price: 200,
    chargeType: 'fixed',
    category: 'servicos',
    linkedCardapios: ['feijoada', 'churrasco', 'finger-food'],
  },
  // Extras vinculados
  {
    id: 'pao-alho',
    name: 'Pão de Alho',
    description: 'Pão de alho artesanal na brasa',
    price: 5,
    chargeType: 'per_person',
    category: 'salgados',
    linkedCardapios: ['churrasco'],
  },
]
