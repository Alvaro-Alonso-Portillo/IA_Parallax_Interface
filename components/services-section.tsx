"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleInView } from "@/components/scramble-text"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
    {
        id: "01",
        title: "LEAD FLOW OS",
        description: "Captura, cualificación y agendamiento autónomo.",
    },
    {
        id: "02",
        title: "SHADOW OPS",
        description: "Agentes de soporte y operaciones invisibles 24/7.",
    },
    {
        id: "03",
        title: "DATA PIPELINE",
        description: "Unificación de APIs y estructuración de datos.",
    },
    {
        id: "04",
        title: "AUTO_SCALE",
        description: "Infraestructura líquida que crece con la demanda.",
    },
]

export function ServicesSection() {
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

            const cards = gridRef.current?.querySelectorAll(".service-card")
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
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative w-full bg-transparent py-24 md:py-32 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div ref={headerRef} className="mb-16 border-b border-white/5 pb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
                        02 / Active Systems
                    </span>
                    <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-white tracking-wide">
                        <ScrambleInView text="SISTEMAS ACTIVOS" />
                    </h2>
                </div>

                {/* Services Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    return (
        <div
            className={cn(
                "service-card group relative flex flex-col justify-between p-6 h-64",
                "border border-white/5 bg-black/20 backdrop-blur-sm",
                "transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
            )}
        >
            {/* Header Row */}
            <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/40 group-hover:text-accent transition-colors duration-300">
                    /{service.id}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            {/* Content */}
            <div className="space-y-4">
                <h3 className="font-mono text-lg font-bold text-white group-hover:text-accent transition-colors duration-300 tracking-tight">
                    {service.title}
                </h3>
                <p className="font-mono text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {service.description}
                </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-accent transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-accent transition-colors duration-300" />
        </div>
    )
}
