'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UtensilsCrossed,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cardapios', label: 'Cardápios', icon: BookOpen },
  { href: '/admin/extras', label: 'Extras', icon: PlusCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background-warm flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-light flex flex-col transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-border-light">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-6 h-6 text-primary" aria-hidden="true" />
            <div>
              <p className="font-heading font-bold text-primary text-lg">Regallos</p>
              <p className="text-[10px] text-accent uppercase tracking-widest font-medium">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Menu do admin">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-primary/5 text-primary'
                    : 'text-text-muted hover:bg-background-warm hover:text-text-main'
                  }
                `}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border-light">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <header className="lg:hidden bg-white border-b border-border-light px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-background-warm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Abrir menu"
          >
            {sidebarOpen
              ? <X className="w-5 h-5" aria-hidden="true" />
              : <Menu className="w-5 h-5" aria-hidden="true" />
            }
          </button>
          <span className="font-heading font-bold text-primary">Admin</span>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
