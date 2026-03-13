import { promises as fs } from 'fs'
import path from 'path'
import { GalleryDB, SiteImagesDB } from './types'

const DB_DIR = path.join(process.cwd(), 'data', 'db')
const GALLERY_FILE = path.join(DB_DIR, 'gallery.json')
const SITE_IMAGES_FILE = path.join(DB_DIR, 'site-images.json')

// Ensure db directory exists
async function ensureDbDir() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true })
  } catch (error) {
    // Directory may already exist
  }
}

export async function readGallery(): Promise<GalleryDB> {
  try {
    const content = await fs.readFile(GALLERY_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return { images: [] }
    }
    throw error
  }
}

export async function writeGallery(data: GalleryDB): Promise<void> {
  await ensureDbDir()
  await fs.writeFile(GALLERY_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function readSiteImages(): Promise<SiteImagesDB> {
  try {
    const content = await fs.readFile(SITE_IMAGES_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return {
        sections: {
          hero: null,
          sobre: null,
          corporativo: null,
          social: null,
        },
        cardapios: {},
        logo: null,
      }
    }
    throw error
  }
}

export async function writeSiteImages(data: SiteImagesDB): Promise<void> {
  await ensureDbDir()
  await fs.writeFile(SITE_IMAGES_FILE, JSON.stringify(data, null, 2), 'utf-8')
}
