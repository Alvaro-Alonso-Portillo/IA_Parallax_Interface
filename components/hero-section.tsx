"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -30,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-[#080808] overflow-hidden md:pl-20"
    >
      <AnimatedNoise opacity={0.03} />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Main content */}
      <SplitFlapAudioProvider>
        <div ref={contentRef} className="relative z-10 w-full max-w-5xl px-4 md:px-6 flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center">
            {/* Scaled container for title */}
            <div className="transform scale-[0.45] sm:scale-75 md:scale-100 origin-center transition-transform">
              <SplitFlapText text="IA_PARALLAX" speed={80} />
            </div>
          </div>

          <h2 className="mt-4 md:mt-8 font-sans font-light text-xl md:text-3xl text-accent tracking-[0.2em] uppercase">
            ARQUITECTURAS DE SOFTWARE AUTÓNOMO
          </h2>

          <div className="mt-8 space-y-6">
            <span className="font-mono text-[10px] md:text-xs text-muted-foreground/50 tracking-widest">EXPLORAR SISTEMAS</span>
            <p className="font-sans text-[11px] md:text-xs text-[#888888] max-w-lg leading-relaxed text-balance">
              Automatizamos la captación y cualificación de clientes para empresas B2B de alto rendimiento. Eliminamos la dependencia de contratación para escalar su pipeline de ventas mediante infraestructura técnica propietaria.
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-6">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-foreground overflow-hidden hover:border-accent transition-all duration-300 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 w-full h-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">
                <ScrambleTextOnHover text="INICIAR PROTOCOLO" as="span" duration={0.6} />
              </span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        {/* Sound Toggle - Bottom Left */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-30">
          <div className="border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm hover:border-accent transition-colors duration-300">
            <SplitFlapMuteToggle />
          </div>
        </div>
      </SplitFlapAudioProvider>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm">
          v.01 / Experimental Build
        </div>
      </div>
    </section>
  )
}
