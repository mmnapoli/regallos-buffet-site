import { NextRequest, NextResponse } from 'next/server'
import { readGallery, writeGallery } from '@/lib/db'
import { GalleryImageDB } from '@/lib/types'

export async function GET() {
  try {
    const db = await readGallery()
    const sorted = db.images.sort((a, b) => a.order - b.order)
    return NextResponse.json({ images: sorted }, { status: 200 })
  } catch (error) {
    console.error('Gallery GET error:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar galeria.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { src, alt, span } = body

    if (!src || !alt || !span) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: src, alt, span' },
        { status: 400 }
      )
    }

    const db = await readGallery()
    const newImage: GalleryImageDB = {
      id: `img_${Date.now()}`,
      src,
      alt,
      span: span as 'large' | 'tall' | 'normal',
      order: db.images.length,
      uploadedAt: new Date().toISOString(),
    }

    db.images.push(newImage)
    await writeGallery(db)

    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    console.error('Gallery POST error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar imagem na galeria.' },
      { status: 500 }
    )
  }
}
