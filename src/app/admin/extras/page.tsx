'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, Save, X, Filter } from 'lucide-react'
import { extras as initialExtras, cardapios } from '@/data/mock'
import type { Extra } from '@/types'

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const categories = [
  { value: 'bebidas', label: 'Bebidas' },
  { value: 'salgados', label: 'Salgados' },
  { value: 'sobremesas', label: 'Sobremesas' },
  { value: 'servicos', label: 'Serviços' },
] as const

const emptyExtra: Extra = {
  id: '',
  name: '',
  description: '',
  price: 0,
  chargeType: 'per_person',
  category: 'bebidas',
  linkedCardapios: [],
}

export default function AdminExtras() {
  const [items, setItems] = useState<Extra[]>(initialExtras)
  const [editing, setEditing] = useState<Extra | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredItems = filterCategory === 'all'
    ? items
    : items.filter((i) => i.category === filterCategory)

  const startNew = () => {
    setEditing({ ...emptyExtra, id: `extra-${Date.now()}`, linkedCardapios: cardapios.map((c) => c.id) })
    setIsNew(true)
  }

  const startEdit = (item: Extra) => {
    setEditing({ ...item })
    setIsNew(false)
  }

  const cancelEdit = () => {
    setEditing(null)
    setIsNew(false)
  }

  const saveItem = () => {
    if (!editing || !editing.name.trim()) return

    if (isNew) {
      setItems((prev) => [...prev, editing])
    } else {
      setItems((prev) => prev.map((i) => (i.id === editing.id ? editing : i)))
    }
    setEditing(null)
    setIsNew(false)
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const toggleLinkedCardapio = (cardapioId: string) => {
    if (!editing) return
    const linked = editing.linkedCardapios.includes(cardapioId)
      ? editing.linkedCardapios.filter((id) => id !== cardapioId)
      : [...editing.linkedCardapios, cardapioId]
    setEditing({ ...editing, linkedCardapios: linked })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-main">Extras</h1>
          <p className="text-sm text-text-muted mt-1">Gerencie extras: bebidas, salgados, sobremesas e serviços.</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Novo Extra
        </button>
      </div>

      {/* Modal de edição */}
      {editing && (
        <div className="bg-white rounded-xl border border-border-light shadow-card p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-text-main">
            {isNew ? 'Novo Extra' : 'Editar Extra'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="extra-name" className="block text-sm font-medium text-text-main mb-1">
                Nome
              </label>
              <input
                id="extra-name"
                type="text"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                placeholder="Nome do extra"
              />
            </div>
            <div>
              <label htmlFor="extra-price" className="block text-sm font-medium text-text-main mb-1">
                Preço (R$)
              </label>
              <input
                id="extra-price"
                type="number"
                min={0}
                step={0.5}
                value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="extra-category" className="block text-sm font-medium text-text-main mb-1">
                Categoria
              </label>
              <select
                id="extra-category"
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value as Extra['category'] })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Tipo de Cobrança
              </label>
              <div className="flex rounded-lg border border-border-light overflow-hidden">
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, chargeType: 'per_person' })}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer
                    ${editing.chargeType === 'per_person'
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-muted hover:bg-background-warm'
                    }
                  `}
                >
                  Por Pessoa
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, chargeType: 'fixed' })}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer
                    ${editing.chargeType === 'fixed'
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-muted hover:bg-background-warm'
                    }
                  `}
                >
                  Preço Fixo
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="extra-desc" className="block text-sm font-medium text-text-main mb-1">
              Descrição
            </label>
            <textarea
              id="extra-desc"
              rows={2}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none"
              placeholder="Descreva o extra..."
            />
          </div>

          {/* Vínculo com cardápios */}
          <div>
            <p className="text-sm font-medium text-text-main mb-2">Disponível nos cardápios:</p>
            <div className="flex flex-wrap gap-2">
              {cardapios.map((c) => {
                const isLinked = editing.linkedCardapios.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleLinkedCardapio(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors duration-200 cursor-pointer
                      ${isLinked
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-white border-border-light text-text-muted hover:border-accent/50'
                      }
                    `}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light text-text-muted text-sm font-medium transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              Cancelar
            </button>
            <button
              onClick={saveItem}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium transition-colors duration-200 hover:bg-accent-dark cursor-pointer"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Filtro */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-text-muted" aria-hidden="true" />
        <div className="flex gap-1">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer
              ${filterCategory === 'all' ? 'bg-primary text-white' : 'bg-background-warm text-text-muted hover:text-text-main'}
            `}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilterCategory(c.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer
                ${filterCategory === c.value ? 'bg-primary text-white' : 'bg-background-warm text-text-muted hover:text-text-main'}
              `}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-background-warm">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Categoria</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Preço</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Cobrança</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Cardápios</th>
                <th className="text-right px-4 py-3 font-medium text-text-muted">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-border-light last:border-0 hover:bg-background-warm transition-colors duration-200">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-main">{item.name}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium border border-accent/20">
                      {categories.find((c) => c.value === item.category)?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted">
                    {item.chargeType === 'per_person' ? 'Por pessoa' : 'Fixo'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.linkedCardapios.map((id) => {
                        const c = cardapios.find((card) => card.id === id)
                        return c ? (
                          <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-background-warm text-text-muted">
                            {c.name.split(' ')[0]}
                          </span>
                        ) : null
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-1.5 rounded-lg hover:bg-primary/5 text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`Editar ${item.name}`}
                      >
                        <Pencil className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Excluir ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
