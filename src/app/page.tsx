'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  ArrowRight,
  UtensilsCrossed,
  Users,
  Star,
  Calendar,
  ChefHat,
  Gift,
  Coffee,
  Beef,
} from 'lucide-react'

const services = [
  {
    icon: Beef,
    title: 'Churrasco',
    description: 'Carnes nobres preparadas na brasa com acompanhamentos completos.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Feijoada',
    description: 'A tradição brasileira com todas as carnes e guarnições clássicas.',
  },
  {
    icon: ChefHat,
    title: 'Finger Food',
    description: 'Canapés, bruschettas e mini porções gourmet para recepções.',
  },
  {
    icon: Coffee,
    title: 'Coffee Break',
    description: 'Cardápios adaptáveis para reuniões, workshops e seminários.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Festival de Massas',
    description: 'Estação de massas ao vivo com molhos artesanais.',
  },
  {
    icon: Gift,
    title: 'Gift Box',
    description: 'Caixas personalizadas para datas temáticas e presentes corporativos.',
  },
]

const stats = [
  { value: '14+', label: 'Anos de experiência' },
  { value: '2.000+', label: 'Eventos realizados' },
  { value: '100%', label: 'Cardápios personalizados' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-b from-background-warm to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <Star className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-accent">14 anos de excelência gastronômica</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-main leading-tight">
            Transformamos momentos<br />
            em <span className="text-primary">experiências</span>
          </h1>

          <p className="text-text-muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Buffet completo para eventos sociais e corporativos. Cardápios personalizados,
            equipe qualificada e infraestrutura completa para tornar seu evento inesquecível.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/orcamento"
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-white font-medium transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Faça seu Orçamento
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/cardapios"
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border-light text-text-muted font-medium transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Ver Cardápios
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-border-light">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Sobre nós</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-main mt-3">
              Cada evento é único,<br />cada cardápio também
            </h2>
            <p className="text-text-muted mt-4 leading-relaxed">
              A Regallos Gastronomia nasceu da paixão pela boa comida e pelo desejo de criar
              experiências memoráveis. Com mais de 14 anos de atuação em São Paulo, atendemos
              eventos sociais e corporativos com cardápios totalmente personalizados.
            </p>
            <p className="text-text-muted mt-3 leading-relaxed">
              Nossa equipe qualificada cuida de cada detalhe — da seleção dos ingredientes
              à apresentação dos pratos — para que você só precise aproveitar o momento.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Users className="w-4 h-4 text-accent" aria-hidden="true" />
                Equipe especializada
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Calendar className="w-4 h-4 text-accent" aria-hidden="true" />
                Atendemos todos os dias
              </div>
            </div>
          </div>

          <div className="bg-background-warm rounded-2xl p-8 border border-border-light">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
              <ChefHat className="w-20 h-20 text-primary/30" aria-hidden="true" />
            </div>
            <p className="text-xs text-text-muted text-center mt-3">Sua foto principal aqui</p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-4 bg-background-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Nossos serviços</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-main mt-3">
              Cardápios para todos os eventos
            </h2>
            <p className="text-text-muted mt-3 max-w-lg mx-auto">
              Do churrasco à grazing table, temos a opção ideal para seu evento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-6 border border-border-light transition-all duration-200 hover:shadow-card cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-main">{service.title}</h3>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/cardapios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-medium text-sm transition-colors duration-200 hover:bg-primary hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Ver todos os cardápios
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] uppercase tracking-widest text-accent border border-accent/30 rounded-full px-4 py-1 font-medium mb-6">
            Pronto para começar?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-main">
            Monte seu cardápio personalizado
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            Use nossa calculadora interativa para escolher o cardápio base, personalizar
            extras e ver o orçamento em tempo real.
          </p>
          <Link
            href="/orcamento"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-white font-medium mt-8 transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Fazer Orçamento Online
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
