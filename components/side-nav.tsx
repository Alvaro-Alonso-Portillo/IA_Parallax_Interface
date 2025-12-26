"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
  { id: "hero", label: "Index" },
  { id: "principles", label: "Manifesto" },
  { id: "work", label: "Results" },
  { id: "signals", label: "Modules" },
  { id: "colophon", label: "Uplink" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col gap-6 px-4">
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                activeSection === id ? "bg-accent scale-125 shadow-[0_0_5px_var(--accent)]" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
              )}
            />
            <motion.span
              initial={{ x: 0, opacity: 0 }}
              whileHover={{ x: 6, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "absolute left-8 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap pointer-events-none",
                activeSection === id ? "text-accent opacity-100" : "text-muted-foreground placeholder:opacity-0",
              )}
            >
              {label}
            </motion.span>
          </button>
        ))}
      </div >
    </nav >
  )
}
