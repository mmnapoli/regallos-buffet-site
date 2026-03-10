import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Regallos Gastronomia | Buffet Premium',
  description: 'Monte seu cardápio personalizado para eventos. Buffet premium com opções de feijoada, churrasco, finger food e muito mais.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-text-main font-body">
        {children}
      </body>
    </html>
  )
}
