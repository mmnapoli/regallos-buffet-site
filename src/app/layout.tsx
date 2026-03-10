import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buffet Regallos',
  description: 'O melhor buffet da região',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
