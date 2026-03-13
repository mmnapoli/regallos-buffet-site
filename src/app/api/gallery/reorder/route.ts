import { NextRequest, NextResponse } from 'next/server'
import { readGallery, writeGallery } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderedIds } = body

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: 'orderedIds deve ser um array.' },
        { status: 400 }
      )
    }

    const db = await readGallery()
    const imageMap = new Map(db.images.map((img) => [img.id, img]))

    // Reorder
    db.images = orderedIds
      .map((id: string) => imageMap.get(id))
      .filter((img) => img !== undefined)

    db.images.forEach((img, index) => {
      img.order = index
    })

    await writeGallery(db)

    return NextResponse.json({ images: db.images }, { status: 200 })
  } catch (error) {
    console.error('Gallery PATCH error:', error)
    return NextResponse.json(
      { error: 'Erro ao reordenar galeria.' },
      { status: 500 }
    )
  }
}
