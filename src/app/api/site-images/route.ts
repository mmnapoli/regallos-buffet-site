import { NextRequest, NextResponse } from 'next/server'
import { readSiteImages, writeSiteImages } from '@/lib/db'
import { SectionImageDB } from '@/lib/types'

export async function GET() {
  try {
    const db = await readSiteImages()
    return NextResponse.json(db, { status: 200 })
  } catch (error) {
    console.error('Site images GET error:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar imagens do site.' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, cardapioId, logo, src, alt } = body

    if (!src) {
      return NextResponse.json(
        { error: 'Campo obrigatório: src' },
        { status: 400 }
      )
    }

    const db = await readSiteImages()

    if (logo) {
      // Update logo
      db.logo = src
    } else if (section) {
      // Update section image
      if (!['hero', 'sobre', 'corporativo', 'social'].includes(section)) {
        return NextResponse.json(
          { error: 'Seção inválida.' },
          { status: 400 }
        )
      }
      if (!alt) {
        return NextResponse.json(
          { error: 'Campo obrigatório para seção: alt' },
          { status: 400 }
        )
      }
      const imageData: SectionImageDB = {
        src,
        alt,
        uploadedAt: new Date().toISOString(),
      }
      db.sections[section] = imageData
    } else if (cardapioId) {
      // Update cardapio image
      if (!alt) {
        return NextResponse.json(
          { error: 'Campo obrigatório para cardápio: alt' },
          { status: 400 }
        )
      }
      const imageData: SectionImageDB = {
        src,
        alt,
        uploadedAt: new Date().toISOString(),
      }
      db.cardapios[cardapioId] = imageData
    } else {
      return NextResponse.json(
        { error: 'Especifique logo, section ou cardapioId.' },
        { status: 400 }
      )
    }

    await writeSiteImages(db)

    return NextResponse.json(db, { status: 200 })
  } catch (error) {
    console.error('Site images PUT error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar imagem.' },
      { status: 500 }
    )
  }
}
