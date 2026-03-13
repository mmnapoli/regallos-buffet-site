import { NextRequest, NextResponse } from 'next/server'
import { saveUploadedFile, validateImageFile } from '@/lib/upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const subfolder = formData.get('subfolder') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não fornecido.' },
        { status: 400 }
      )
    }

    if (!['gallery', 'sections', 'cardapios', 'logo'].includes(subfolder)) {
      return NextResponse.json(
        { error: 'Pasta de upload inválida.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Validate
    const validation = validateImageFile(file.type, buffer.length)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Save file
    const url = await saveUploadedFile(buffer, file.name, subfolder as any)

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar arquivo.' },
      { status: 500 }
    )
  }
}
