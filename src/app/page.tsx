'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/landing/HeroSection'
import DiferenciaisSection from '@/components/landing/DiferenciaisSection'
import CorporativoSection from '@/components/landing/CorporativoSection'
import SocialSection from '@/components/landing/SocialSection'
import GaleriaSection from '@/components/landing/GaleriaSection'
import SobreSection from '@/components/landing/SobreSection'
import ClientesSection from '@/components/landing/ClientesSection'
import DepoimentosSection from '@/components/landing/DepoimentosSection'
import CTAFinalSection from '@/components/landing/CTAFinalSection'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16 sm:pt-20">
        <HeroSection />
        <DiferenciaisSection />
        <CorporativoSection />
        <SocialSection />
        <GaleriaSection />
        <SobreSection />
        <ClientesSection />
        <DepoimentosSection />
        <CTAFinalSection />
      </main>

      <Footer />
    </div>
  )
}
