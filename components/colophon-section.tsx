"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleInView } from "@/components/scramble-text"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-48 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / UPLINK</span>
        <h2 className="mt-4 font-[var(--font-bebas)] font-thin text-5xl md:text-7xl tracking-tight uppercase">
          <ScrambleInView text="INFRAESTRUCTURA" />
        </h2>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-4">TECNOLOGÍA</h4>
          <ul className="space-y-2">
            <li className="font-sans text-[11px] text-[#888888]">Next.js 15</li>
            <li className="font-sans text-[11px] text-[#888888]">Tailwind v4</li>
            <li className="font-sans text-[11px] text-[#888888]">Vercel Edge</li>
          </ul>
        </div>

        {/* Typography */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-4">LEGAL</h4>
          <ul className="space-y-2">
            <li className="font-sans text-[11px] text-[#888888]">Privacidad</li>
            <li className="font-sans text-[11px] text-[#888888]">Términos</li>
            <li className="font-sans text-[11px] text-[#888888]">Licencia</li>
          </ul>
        </div>

        {/* Location */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-4">UBICACIÓN</h4>
          <ul className="space-y-2">
            <li className="font-sans text-[11px] text-[#888888]">Global Remote</li>
            <li className="font-sans text-[11px] text-[#888888]">Madrid, ES</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-4">PROTOCOL ACCESS</h4>
          <ul className="space-y-2">
            <li className="font-sans text-[11px] text-foreground/80">access@iaparallax.com</li>
            <li className="font-sans text-[10px] text-[#888888] mt-2 italic leading-relaxed">
              Encrypted channel active. Technical feasibility only.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-[#333333] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[9px] text-[#555555] uppercase tracking-widest">
          © 2025 IA_PARALLAX. TRANSMISSION TERMINATED.
        </p>
      </div>
    </section>
  )
}
