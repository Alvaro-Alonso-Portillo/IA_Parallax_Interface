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
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      <AnimatedNoise opacity={0.03} />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-5xl px-4 md:px-6 flex flex-col items-center text-center">
        <SplitFlapAudioProvider>
          <div className="relative flex flex-col items-center">
            {/* Scaled container for title */}
            <div className="transform scale-[0.45] sm:scale-75 md:scale-100 origin-center transition-transform">
              <SplitFlapText text="IA_PARALLAX" speed={80} />
            </div>

            {/* Mute toggle position - adjusted for centered layout */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:block">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/80 text-[clamp(1.5rem,4vw,2.5rem)] mt-3 md:mt-6 tracking-widest uppercase">
          ARQUITECTURA DE SISTEMAS AUTÓNOMOS
        </h2>

        <p className="mt-4 md:mt-8 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
          Transformamos la fricción manual en flujos de trabajo perpetuos. No diseñamos interfaces, construimos la maquinaria invisible que escala tu negocio.
        </p>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-6">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-foreground overflow-hidden hover:border-accent transition-all duration-300 bg-background/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">
              <ScrambleTextOnHover text="INICIAR PROTOCOLO" as="span" duration={0.6} />
            </span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
            </span>
          </a>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm">
          v.01 / Experimental Build
        </div>
      </div>
    </section>
  )
}
