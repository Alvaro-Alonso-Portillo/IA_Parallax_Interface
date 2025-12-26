"use client"

import { useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { ScrambleInView } from "@/components/scramble-text"

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#080808] py-12 md:py-56 flex items-center justify-center overflow-hidden md:pl-20"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 grid-bg opacity-10 pointer-events-none" />

            {/* Content Container */}
            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
            >
                {/* Blinking Status Indicator */}
                <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        STATUS: WAITING FOR INPUT...
                    </span>
                </div>

                {/* Main Title */}
                <h2 className="font-[var(--font-bebas)] font-thin text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-[0.9] mb-6">
                    <ScrambleInView text="¿ES VIABLE SU TRANSICIÓN AUTÓNOMA?" duration={0.6} />
                </h2>

                {/* Subtitle */}
                <p className="font-sans text-[13px] md:text-sm text-[#888888] mb-12 max-w-xl leading-relaxed">
                    Evaluamos la arquitectura técnica de su empresa antes de cualquier compromiso de integración. Conversación técnica de alto nivel para determinar su potencial de escala.
                </p>

                {/* High Interaction Button */}
                <button
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 overflow-hidden transition-all duration-300 hover:border-accent"
                >
                    {/* Hover Fill Effect - Solid Accent */}
                    <div className="absolute inset-0 w-full h-full bg-accent translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />

                    {/* Text Content */}
                    <div className="relative z-10 flex items-center gap-3">
                        <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-black">
                            SOLICITAR AUDITORÍA DE ACCESO
                        </span>
                        <ArrowRight className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-black group-hover:translate-x-1" />
                    </div>
                </button>
            </div>
        </section>
    )
}
