import { HeroSection } from "@/components/hero-section"
import { LogoTicker } from "@/components/logo-ticker"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { CTASection } from "@/components/cta-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { MobileMenu } from "@/components/mobile-menu"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <MobileMenu />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <LogoTicker />
        <SignalsSection />
        <WorkSection />
        <PrinciplesSection />
        <CTASection />
        <ColophonSection />
      </div>
    </main>
  )
}
