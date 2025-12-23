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
    subtitle: "AUTOMATIZACIÓN DE VENTAS & CRM",
    note: "Captura y cualificación autónoma de leads en tiempo real.",
    icon: Magnet,
  },
  {
    date: "2025.05.28",
    title: "SHADOW OPS",
    subtitle: "ATENCIÓN AL CLIENTE CON IA",
    note: "Agentes invisibles para soporte y operaciones 24/7.",
    icon: Ghost,
  },
  {
    date: "2025.05.15",
    title: "DATA PIPELINE",
    subtitle: "INTEGRACIÓN DE APIS Y DATOS",
    note: "Unificación de flujos de datos y estructuración API.",
    icon: Workflow,
  },
  {
    date: "2025.04.30",
    title: "AUTO_SCALE",
    subtitle: "INFRAESTRUCTURA CLOUD ESCALABLE",
    note: "Infraestructura líquida que se adapta a la demanda.",
    icon: Zap,
  },
  {
    date: "2025.04.12",
    title: "NEURAL SYNC",
    subtitle: "MODELOS PROPIETARIOS & RAG",
    note: "Sincronización de modelos de lenguaje propietarios.",
    icon: Brain,
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

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
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent-purple bg-accent/20 backdrop-blur-sm",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / MÓDULOS</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          <ScrambleInView text="SISTEMAS EN LÍNEA" />
        </h2>
      </div>

      {/* Responsive Grid container */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-6 md:pr-12"
      >
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
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
        "group relative w-full",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]",
      )}
    >
      {/* Card with paper texture effect */}
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8 h-full">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Issue number - editorial style */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          {/* Replaced Date with Icon or placed Icon relative? 
              User wants Big Icon. I'll put it top-right absolute to be safe and clean.
           */}
          <time className="font-mono text-[10px] text-muted-foreground/60 opacity-0 md:opacity-100 transition-opacity">{signal.date}</time>
        </div>

        {/* Icon Absolute */}
        <div className="absolute top-6 right-6">
          <Icon className="w-8 h-8 text-gray-600 transition-colors duration-300 group-hover:text-cyan-400" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-2 group-hover:text-accent transition-colors duration-300 relative z-10">
          {signal.title}
        </h3>

        {/* Subtitle */}
        <h3 className="font-mono text-xs text-gray-400 mb-4 tracking-wider uppercase relative z-10">
          {signal.subtitle}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed relative z-10">{signal.note}</p>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
