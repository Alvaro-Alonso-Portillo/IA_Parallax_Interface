"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ScrambleInView } from "@/components/scramble-text"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "PROP-TECH SCALE",
    medium: "REAL ESTATE",
    description: "S: Agendamiento manual dependiente de agentes.\nI: Cierre de agendamiento autónomo.\nO: +450% capacidad operativa sin headcount.",
    span: "col-span-2 row-span-2",
    roi: "+450%",
    roiLabel: "CAPACIDAD OPERATIVA"
  },
  {
    title: "CORE LOGISTICS",
    medium: "LOGISTICS",
    description: "S: Rotura de stock por procesos manuales.\nI: Reposición predictiva vía modelos RAG.\nO: Latencia cero en error de inventario.",
    span: "col-span-1 row-span-1",
    roi: "0% LATENCIA",
    roiLabel: "ERROR DE INVENTARIO"
  },
  {
    title: "L1 AUTONOMOUS",
    medium: "FINTECH",
    description: "S: Soporte Nivel 1 gestionado por humanos.\nI: Erradicación operativa del flujo L1.\nO: -75% payroll offset (85% resolución auto).",
    span: "col-span-1 row-span-2",
    roi: "-75%",
    roiLabel: "PAYROLL OFFSET"
  },
  {
    title: "SYNTÉTIC PIPELINE",
    medium: "OUTREACH",
    description: "S: Prospección manual y cualificación lenta.\nI: Pipeline de prospección cualificada 24/7.\nO: 12k leads/mes con 0 intervención humana.",
    span: "col-span-1 row-span-1",
    roi: "12k+",
    roiLabel: "LEADS / MES (0 HC)"
  },
  {
    title: "AUDI-PROTOCOL",
    medium: "LEGAL TECH",
    description: "S: Auditoría manual con alto margen de error.\nI: Protocolo de auditoría por agentes IA.\nO: 99.99% precisión en detección de anomalías.",
    span: "col-span-2 row-span-1",
    roi: "99.99%",
    roiLabel: "DATA PRECISION"
  },
  {
    title: "ONBOARDING OPS",
    medium: "INTERNAL OPS",
    description: "S: Gestión manual de accesos y roles técnicos.\nI: Automatización de onboarding técnico.\nO: Ejecución finalizada en 30 segundos.",
    span: "col-span-1 row-span-1",
    roi: "30sec",
    roiLabel: "TIME TO PRODUCTION"
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-48 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-32 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / RESULTADOS</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            <ScrambleInView text="CASOS DE ESTUDIO" />
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Implementaciones de alto impacto y reducción de carga operativa.
        </p>
      </div>

      {/* Responsive Grid/List */}
      <div
        ref={gridRef}
        className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-visible md:grid md:grid-cols-4 md:gap-6 md:auto-rows-[200px]"
      >
        {experiments.map((experiment, index) => (
          <WorkCard
            key={index}
            experiment={experiment}
            index={index}
            persistHover={index === 0}
            className="w-full md:w-auto"
          />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
  persistHover = false,
  className,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
    roi: string
    roiLabel: string
  }
  index: number
  persistHover?: boolean
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-[#333333] p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden bg-transparent",
        experiment.span,
        isActive && "border-accent/40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer removed to maintain 'blueprint' look */}

      {/* Active Indicator Bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 bg-accent transition-transform duration-300 origin-left",
          isActive ? "scale-x-100" : "scale-x-0"
        )}
      />

      {/* Data Scan Beam */}
      {isActive && (
        <motion.div
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 1.5, ease: "linear", repeat: 0 }}
          className="absolute left-0 right-0 h-[2px] bg-accent/40 pointer-events-none z-30"
          style={{ boxShadow: "0 0 10px var(--accent)" }}
        />
      )}

      {/* ROI Metrics Box - Floating Bottom Right */}
      <div
        className={cn(
          "absolute bottom-4 right-4 z-20 px-4 py-2 border border-white/10 border-t-cyan-500/50 bg-black/40 backdrop-blur-xl rounded shadow-xl transition-all duration-500 transform",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex flex-col items-end">
          <span className="font-[var(--font-bebas)] font-light text-2xl md:text-3xl text-white tracking-wide">
            {experiment.roi}
          </span>
          <span className="font-mono text-[9px] uppercase text-muted-foreground/40">
            {experiment.roiLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pl-2"> {/* Added padding for indicator */}
        <span className={cn(
          "font-mono text-[10px] uppercase tracking-widest transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/20"
        )}>
          {experiment.medium}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] font-thin text-2xl md:text-3xl lg:text-4xl tracking-tight transition-all duration-300",
            isActive ? "text-white opacity-100 translate-x-1" : "text-gray-600 opacity-100"
          )}
        >
          {experiment.title}
        </h3>
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10 hidden md:block">
        <p
          className={cn(
            "font-sans text-[11px] text-[#888888] leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {experiment.description}
        </p>
      </div>

      {/* Decorative Index (Moved to top right for space or keep if it fits, let's keep it but make it fade out if box covers) */}
      <span
        className={cn(
          "absolute top-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  )
}
