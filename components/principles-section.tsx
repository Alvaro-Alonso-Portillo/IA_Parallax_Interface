"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleInView } from "@/components/scramble-text"

gsap.registerPlugin(ScrollTrigger)

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: "01",
      titleParts: [
        { text: "DECISION", highlight: true },
        { text: " OWNERSHIP", highlight: false },
      ],
      description: "Antes: Microgestión táctica constante. Cambio: El sistema valida y ejecuta la lógica. Resultado: Libertad directiva total para el crecimiento estratégico.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "OPERATIONAL", highlight: true },
        { text: " LEVERAGE", highlight: false },
      ],
      description: "Antes: Crecimiento lineal dependiente de nómina. Cambio: Reemplazo de horas-hombre por lógica inagotable. Resultado: Escalabilidad directa con costes marginales cero.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "ELASTIC ", highlight: false },
        { text: "GROWTH", highlight: true },
      ],
      description: "Antes: Colapso operativo ante picos de demanda. Cambio: Infraestructura líquida auto-escalable. Resultado: Capacidad de expansión inmediata sin contratar personal.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "ZERO-ERROR ", highlight: false },
        { text: "ARCHITECTURE", highlight: true },
      ],
      description: "Antes: Errores humanos que destruyen el margen. Cambio: Blindaje total mediante procesos deterministas. Resultado: Integridad operativa absoluta en cada interacción.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
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

      // Each principle slides in from its aligned side
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-48 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / MANIFIESTO</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          <ScrambleInView text="FILOSOFÍA DEL NÚCLEO" />
        </h2>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${principle.align === "right" ? "items-end text-right" : "items-start text-left"
              }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] font-thin text-4xl md:text-6xl lg:text-8xl tracking-tight leading-normal overflow-visible py-2">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    <span className="font-thin">{part.text}</span>
                  </HighlightText>
                ) : (
                  <span key={i} className="font-thin">{part.text}</span>
                ),
              )}
            </h3>

            {/* Description */}
            <p className="mt-6 max-w-md font-sans text-[13px] text-[#888888] leading-relaxed">
              {principle.description}
            </p>

            {/* Decorative line */}
            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${principle.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
