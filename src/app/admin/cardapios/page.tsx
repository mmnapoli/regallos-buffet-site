'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, Save, X, Users } from 'lucide-react'
import { cardapios as initialCardapios } from '@/data/mock'
import type { Cardapio } from '@/types'
import ImageUploader from '@/components/admin/ImageUploader'
import { updateCardapioImage } from '@/lib/api-client'

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const emptyCardapio: Cardapio = {
  id: '',
  name: '',
  description: '',
  pricePerPerson: 0,
  minGuests: 30,
  image: '',
}

export default function AdminCardapios() {
  const [items, setItems] = useState<Cardapio[]>(initialCardapios)
  const [editing, setEditing] = useState<Cardapio | null>(null)
  const [isNew, setIsNew] = useState(false)

  const startNew = () => {
    setEditing({ ...emptyCardapio, id: `cardapio-${Date.now()}` })
    setIsNew(true)
  }

  const startEdit = (item: Cardapio) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-main">Cardápios</h1>
          <p className="text-sm text-text-muted mt-1">Gerencie os cardápios base do buffet.</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium transition-colors duration-200 hover:bg-primary-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Novo Cardápio
        </button>
      </div>

      {/* Modal de edição */}
      {editing && (
        <div className="bg-white rounded-xl border border-border-light shadow-card p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-text-main">
            {isNew ? 'Novo Cardápio' : 'Editar Cardápio'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="card-name" className="block text-sm font-medium text-text-main mb-1">
                Nome
              </label>
              <input
                id="card-name"
                type="text"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                placeholder="Nome do cardápio"
              />
            </div>
            <div>
              <label htmlFor="card-price" className="block text-sm font-medium text-text-main mb-1">
                Preço por pessoa (R$)
              </label>
              <input
                id="card-price"
                type="number"
                min={0}
                step={1}
                value={editing.pricePerPerson}
                onChange={(e) => setEditing({ ...editing, pricePerPerson: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="card-min" className="block text-sm font-medium text-text-main mb-1">
                Mínimo de convidados
              </label>
              <input
                id="card-min"
                type="number"
                min={1}
                value={editing.minGuests}
                onChange={(e) => setEditing({ ...editing, minGuests: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-text-main mb-2">
                Imagem do Cardápio
              </label>
              <ImageUploader
                currentSrc={editing.image}
                subfolder="cardapios"
                onUploadComplete={(url) => {
                  setEditing({ ...editing, image: url })
                  if (!isNew) {
                    updateCardapioImage(editing.id, url, editing.name).catch((err) =>
                      alert(err.message)
                    )
                  }
                }}
                label="Selecione uma imagem"
              />
            </div>
          </div>

          <div>
            <label htmlFor="card-desc" className="block text-sm font-medium text-text-main mb-1">
              Descrição
            </label>
            <textarea
              id="card-desc"
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none"
              placeholder="Descreva o cardápio..."
            />
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

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-background-warm">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Foto</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Preço/pessoa</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Mín.</th>
                <th className="text-right px-4 py-3 font-medium text-text-muted">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border-light last:border-0 hover:bg-background-warm transition-colors duration-200">
                  <td className="px-4 py-3">
                    {item.image ? (
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded bg-background-warm flex items-center justify-center text-text-muted/40">
                        <span className="text-xs">📷</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-main">{item.name}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {formatCurrency(item.pricePerPerson)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-text-muted">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      {item.minGuests}
                    </span>
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
