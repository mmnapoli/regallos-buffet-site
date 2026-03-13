'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadImage } from '@/lib/api-client'
import { AlertCircle, Loader2 } from 'lucide-react'

// Client-side file validation
function validateImageFile(buffer: ArrayBuffer, mimetype: string, sizeInBytes: number) {
  const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!validMimes.includes(mimetype)) {
    return {
      valid: false,
      error: 'Tipo de arquivo não suportado. Use JPG, PNG, WebP ou SVG.',
    }
  }

  const MAX_SIZE = 5 * 1024 * 1024
  if (sizeInBytes > MAX_SIZE) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo 5MB.',
    }
  }

  return { valid: true }
}

interface ImageUploaderProps {
  currentSrc?: string
  subfolder: 'gallery' | 'sections' | 'cardapios' | 'logo'
  onUploadComplete: (url: string) => void
  label?: string
  aspectRatio?: string
}

export default function ImageUploader({
  currentSrc,
  subfolder,
  onUploadComplete,
  label = 'Clique para selecionar imagem',
  aspectRatio = 'aspect-video',
}: ImageUploaderProps) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(currentSrc)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Local validation
    const buffer = await file.arrayBuffer()
    const validation = validateImageFile(buffer, file.type, file.size)

    if (!validation.valid) {
      setStatus('error')
      setErrorMsg(validation.error || 'Erro na validação')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    try {
      setStatus('uploading')
      setErrorMsg(null)

      const { url } = await uploadImage(file, subfolder)

      setPreviewSrc(url)
      setStatus('success')
      onUploadComplete(url)

      setTimeout(() => setStatus('idle'), 2000)
    } catch (error: any) {
      setStatus('error')
      setErrorMsg(error.message || 'Erro ao fazer upload')
      setTimeout(() => setStatus('idle'), 3000)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-text-main">{label}</p>}

      <label className="relative block group cursor-pointer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={status === 'uploading'}
        />

        <div
          className={`relative w-full ${aspectRatio} rounded-lg border-2 transition-all overflow-hidden
            ${
              status === 'uploading'
                ? 'border-primary bg-primary/5'
                : status === 'error'
                  ? 'border-red-500 bg-red-50'
                  : status === 'success'
                    ? 'border-green-500 bg-green-50'
                    : 'border-dashed border-border-light group-hover:border-primary bg-background-warm'
            }
          `}
        >
          {previewSrc ? (
            <>
              <Image
                src={previewSrc}
                alt="Preview"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {status === 'uploading' && (
                <>
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                  <p className="text-xs text-text-muted">Enviando...</p>
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                  <p className="text-xs text-red-600 px-2">{errorMsg}</p>
                </>
              )}
              {status === 'success' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-xs text-green-600">Enviado!</p>
                </>
              )}
              {status === 'idle' && (
                <>
                  <p className="text-2xl mb-2">📷</p>
                  <p className="text-xs text-text-muted font-medium">{label}</p>
                </>
              )}
            </div>
          )}
        </div>
      </label>
    </div>
  )
}
