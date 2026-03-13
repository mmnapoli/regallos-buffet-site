import { NextRequest, NextResponse } from 'next/server'
import { readGallery, writeGallery } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { alt, span } = body

    const db = await readGallery()
    const image = db.images.find((img) => img.id === id)

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não encontrada.' },
        { status: 404 }
      )
    }

    if (alt !== undefined) image.alt = alt
    if (span !== undefined) image.span = span

    await writeGallery(db)

    return NextResponse.json(image, { status: 200 })
  } catch (error) {
    console.error('Gallery PUT error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar imagem.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await readGallery()

    const initialLength = db.images.length
    db.images = db.images.filter((img) => img.id !== id)

    if (db.images.length === initialLength) {
      return NextResponse.json(
        { error: 'Imagem não encontrada.' },
        { status: 404 }
      )
    }

    // Reorder remaining images
    db.images.forEach((img, index) => {
      img.order = index
    })

    await writeGallery(db)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Gallery DELETE error:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar imagem.' },
      { status: 500 }
    )
  }
}
