'use client'

import { BookOpen, PlusCircle, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Cardápios', value: '3', icon: BookOpen, href: '/admin/cardapios' },
  { label: 'Extras', value: '9', icon: PlusCircle, href: '/admin/extras' },
  { label: 'Mín. Convidados', value: '30', icon: Users, href: '#' },
  { label: 'Preço Médio', value: 'R$ 91', icon: DollarSign, href: '#' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-main">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Gerencie cardápios e extras do seu buffet.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-border-light p-5 transition-all duration-200 hover:shadow-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide font-medium">{stat.label}</p>
                  <p className="text-2xl font-heading font-bold text-text-main mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-border-light p-6">
        <h2 className="font-heading text-lg font-bold text-text-main mb-4">Acesso Rápido</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/cardapios"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium transition-colors duration-200 hover:bg-primary-dark cursor-pointer"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Gerenciar Cardápios
          </Link>
          <Link
            href="/admin/extras"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium transition-colors duration-200 hover:bg-primary/5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            Gerenciar Extras
          </Link>
        </div>
      </div>
    </div>
  )
}
