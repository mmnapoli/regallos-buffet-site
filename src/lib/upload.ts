import { promises as fs } from 'fs'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function saveUploadedFile(
  buffer: Buffer,
  originalFilename: string,
  subfolder: 'gallery' | 'sections' | 'cardapios' | 'logo'
): Promise<string> {
  // Create folder if it doesn't exist
  const folderPath = path.join(UPLOADS_DIR, subfolder)
  await fs.mkdir(folderPath, { recursive: true })

  // Generate unique filename: timestamp + extension
  const ext = path.extname(originalFilename).toLowerCase()
  const filename = `img_${Date.now()}${ext}`
  const filepath = path.join(folderPath, filename)

  // Write file
  await fs.writeFile(filepath, buffer)

  // Return public URL
  return `/uploads/${subfolder}/${filename}`
}

// This function is only for server-side validation in API routes
export function validateImageFile(
  mimetype: string,
  sizeInBytes: number
): { valid: boolean; error?: string } {
  // Check file type (include SVG for logos)
  const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!validMimes.includes(mimetype)) {
    return {
      valid: false,
      error: 'Tipo de arquivo não suportado. Use JPG, PNG, WebP ou SVG.',
    }
  }

  // Check file size (5MB max)
  const MAX_SIZE = 5 * 1024 * 1024
  if (sizeInBytes > MAX_SIZE) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo 5MB.',
    }
  }

  return { valid: true }
}
