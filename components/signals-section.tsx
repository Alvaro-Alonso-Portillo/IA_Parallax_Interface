"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleInView } from "@/components/scramble-text"
import { Magnet, Ghost, Workflow, Zap, Brain, type LucideIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "2025.06.10",
    title: "LEAD FLOW OS",
    subtitle: "CONVERSIÓN & CUALIFICACIÓN",
    note: "Reduzca el tiempo de respuesta a segundos. Maximice la tasa de conversión sin agentes humanos.",
    icon: Magnet,
  },
  {
    date: "2025.05.28",
    title: "SHADOW OPS",
    subtitle: "CAPACIDAD OPS 24/7",
    note: "Seguridad operativa ininterrumpida. Ejecute procesos de back-office con coste marginal cero.",
    icon: Ghost,
  },
  {
    date: "2025.05.15",
    title: "DATA SYNC",
    subtitle: "ACTIVOS DE INFORMACIÓN",
    note: "Elimine la conciliación manual de reportes. La verdad operativa está disponible en tiempo real.",
    icon: Workflow,
  },
  {
    date: "2025.04.30",
    title: "ELASTIC CLOUD",
    subtitle: "RESILIENCIA DE ESCALA",
    note: "Infraestructura líquida. Estabilidad garantizada bajo presión sin intervención manual de IT.",
    icon: Zap,
  },
  {
    date: "2025.04.12",
    title: "PROPRIETARY IA",
    subtitle: "SOBERANÍA INTELECTUAL",
    note: "Su conocimiento interno transformado en ventaja competitiva privada mediante modelos RAG.",
    icon: Brain,
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-48 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-32">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / MÓDULOS</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight mb-6">
            <ScrambleInView text="SISTEMAS EN LÍNEA" />
          </h2>
          <div className="max-w-2xl space-y-4 text-balance">
            <p className="font-sans text-[11px] text-[#888888] leading-relaxed italic border-l border-accent pl-4">
              Usted adquiere infraestructuras técnicas propietarias que operan como activos permanentes en su balance operativo. Sin modelos de outsourcing ni gestión manual.
            </p>
          </div>
        </div>

        {/* Responsive Grid container */}
        <div
          ref={(el) => {
            scrollRef.current = el
            cardsRef.current = el
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
        >
          {signals.map((signal, index) => (
            <div key={index} className={cn(
              index < 2 ? "lg:col-span-3" : "lg:col-span-2"
            )}>
              <SignalCard signal={signal} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: { date: string; title: string; subtitle: string; note: string; icon: LucideIcon }
  index: number
}) {
  const Icon = signal.icon

  return (
    <article
      className={cn(
        "group relative w-full bg-transparent overflow-hidden",
        "transition-all duration-300 ease-out",
        "border border-[#444444] hover:border-accent hover:bg-[#111111]",
      )}
    >
      <div className="relative p-8 h-full">
        {/* Issue number - editorial style */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <time className="font-mono text-[10px] text-muted-foreground/60 opacity-0 md:opacity-100 transition-opacity">{signal.date}</time>
        </div>

        {/* Icon Absolute */}
        <div className="absolute top-6 right-6">
          <Icon className="w-8 h-8 text-muted-foreground/40 transition-colors duration-300 group-hover:text-accent" strokeWidth={1} />
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] font-thin text-4xl tracking-tight mb-2 text-white group-hover:text-accent transition-colors duration-300 relative z-10">
          {signal.title}
        </h3>

        {/* Subtitle */}
        <h3 className="font-sans text-[10px] text-[#888888] mb-4 tracking-widest uppercase relative z-10">
          {signal.subtitle}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-[#333333] mb-6 group-hover:bg-accent/40 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-sans text-[11px] text-[#888888]/80 leading-relaxed relative z-10">{signal.note}</p>
      </div>
    </article>
  )
}
