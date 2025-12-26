"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SpotlightGrid() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Base Grid - Faint Static */}
            <div className="absolute inset-0 grid-bg opacity-[0.05]" />

            {/* Spotlight Grid - Revealing */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(to right, #FF4F00 1px, transparent 1px),
            linear-gradient(to bottom, #FF4F00 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                }}
            />
        </div>
    )
}
