import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/landing/HeroSection'
import CorporativoSection from '@/components/landing/CorporativoSection'
import SocialSection from '@/components/landing/SocialSection'
import GiftBoxSection from '@/components/landing/GiftBoxSection'
import GaleriaSection from '@/components/landing/GaleriaSection'
import CTAFinalSection from '@/components/landing/CTAFinalSection'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16 sm:pt-20">
        <HeroSection />
        <CorporativoSection />
        <SocialSection />
        <GiftBoxSection />
        <GaleriaSection />
        <CTAFinalSection />
      </main>

      <Footer />
    </div>
  )
}
