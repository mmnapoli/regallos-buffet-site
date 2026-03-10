'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  ArrowRight,
  Heart,
  Briefcase,
  PartyPopper,
  GraduationCap,
  Baby,
  Building2,
  Presentation,
  Handshake,
  Calendar,
  Check,
} from 'lucide-react'

const socialEvents = [
  { icon: Heart, title: 'Casamentos', description: 'Cardápios elegantes para o dia mais especial.' },
  { icon: PartyPopper, title: 'Aniversários', description: 'Festas temáticas com menus personalizados.' },
  { icon: GraduationCap, title: 'Formaturas', description: 'Celebração com buffet completo para turmas.' },
  { icon: Baby, title: 'Chá de Bebê', description: 'Recepções delicadas e acolhedoras.' },
]

const corporateEvents = [
  { icon: Building2, title: 'Confraternização', description: 'Eventos de final de ano e datas especiais.' },
  { icon: Presentation, title: 'Seminários', description: 'Coffee break e almoços para palestras e workshops.' },
  { icon: Handshake, title: 'Lançamentos', description: 'Coquetéis e finger food para lançamentos de produto.' },
  { icon: Calendar, title: 'Eventos Internos', description: 'Café da manhã, almoço executivo e happy hour.' },
]

const diferenciais = [
  'Cardápios 100% personalizáveis',
  'Equipe treinada e uniformizada',
  'Louças, talheres e decoração inclusos',
  'Montagem e desmontagem no local',
  'Degustação prévia disponível',
  'Atendimento dedicado do início ao fim',
]

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 bg-gradient-to-b from-background-warm to-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-medium text-accent uppercase tracking-widest">Eventos</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mt-3">
            Do social ao corporativo
          </h1>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Atendemos todos os tipos de eventos com cardápios personalizados, infraestrutura completa e uma equipe dedicada ao sucesso do seu evento.
          </p>
        </div>
      </section>

      {/* Eventos Sociais */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Celebrações</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-main mt-2">Eventos Sociais</h2>
            <p className="text-text-muted mt-2 max-w-lg">
              Momentos especiais merecem uma gastronomia à altura. Cuidamos de cada detalhe para que você e seus convidados apenas aproveitem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {socialEvents.map((event) => {
              const Icon = event.icon
              return (
                <div
                  key={event.title}
                  className="bg-white rounded-xl border border-border-light p-5 transition-all duration-200 hover:shadow-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-main">{event.title}</h3>
                  <p className="text-sm text-text-muted mt-1.5">{event.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Eventos Corporativos */}
      <section className="py-16 px-4 bg-background-warm">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Empresas</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-main mt-2">Eventos Corporativos</h2>
            <p className="text-text-muted mt-2 max-w-lg">
              Soluções gastronômicas para empresas que valorizam a experiência dos colaboradores e convidados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {corporateEvents.map((event) => {
              const Icon = event.icon
              return (
                <div
                  key={event.title}
                  className="bg-white rounded-xl border border-border-light p-5 transition-all duration-200 hover:shadow-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-main">{event.title}</h3>
                  <p className="text-sm text-text-muted mt-1.5">{event.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Por que nos escolher</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-main mt-2">Nossos Diferenciais</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diferenciais.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-background-warm rounded-lg border border-border-light"
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                </div>
                <span className="text-sm text-text-main font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Pronto para planejar seu evento?
          </h2>
          <p className="text-white/70 mt-3 max-w-lg mx-auto">
            Monte seu cardápio online ou entre em contato conosco para uma proposta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/orcamento"
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-white font-medium transition-colors duration-200 hover:bg-accent-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              Fazer Orçamento Online
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/5511947588959?text=Ol%C3%A1!%20Gostaria%20de%20or%C3%A7ar%20um%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/30 text-white font-medium transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
