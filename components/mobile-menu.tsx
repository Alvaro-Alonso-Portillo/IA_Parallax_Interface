"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

const NAV_ITEMS = [
    { id: "hero", label: "HOME" },
    { id: "signals", label: "MÓDULOS" },
    { id: "services", label: "SISTEMAS" },
    { id: "work", label: "RESULTADOS" },
    { id: "principles", label: "FILOSOFÍA" },
    { id: "colophon", label: "CONEXIÓN" },
]

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const scrollToSection = (id: string) => {
        setIsOpen(false)
        const element = document.getElementById(id)
        if (element) {
            // Small delay to allow menu close animation
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" })
            }, 300)
        }
    }

    return (
        <>
            {/* Hamburger Button - Only visible on mobile/tablet */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 z-50 p-2 md:hidden text-white/80 hover:text-accent transition-colors mix-blend-difference"
                aria-label="Open Menu"
            >
                <Menu className="w-8 h-8" />
            </button>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 text-white/80 hover:text-accent transition-colors"
                            aria-label="Close Menu"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Menu Items */}
                        <nav className="flex flex-col items-center gap-8">
                            {NAV_ITEMS.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className="font-[var(--font-bebas)] text-5xl text-white hover:text-accent transition-colors tracking-wide"
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
