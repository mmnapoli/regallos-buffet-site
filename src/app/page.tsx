import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/landing/HeroSection'
import CorporativoSection from '@/components/landing/CorporativoSection'
import SocialSection from '@/components/landing/SocialSection'
import GiftBoxSection from '@/components/landing/GiftBoxSection'
import GaleriaSection from '@/components/landing/GaleriaSection'
import CTAFinalSection from '@/components/landing/CTAFinalSection'
import { readSiteImages } from '@/lib/db'

export default async function HomePage() {
  const siteImages = await readSiteImages()
  const logoSrc = siteImages.logo ?? '/logo-horizontal.svg'

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header logoSrc={logoSrc} />

      <main className="flex-1 pt-16 sm:pt-20">
        <HeroSection logoSrc={logoSrc} />
        <CorporativoSection />
        <SocialSection />
        <GiftBoxSection />
        <GaleriaSection />
        <CTAFinalSection />
      </main>

      <Footer logoSrc={logoSrc} />
    </div>
  )
}
