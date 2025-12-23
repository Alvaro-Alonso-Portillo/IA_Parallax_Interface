"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import gsap from "gsap"

interface ScrambleTextProps {
  text: string
  className?: string
  /** Delay in milliseconds before animation starts */
  delayMs?: number
  /** Duration of the scramble animation in seconds */
  duration?: number
}

interface ScrambleTextOnHoverProps {
  text: string
  className?: string
  /** Duration of the scramble animation in seconds */
  duration?: number
  /** Element type to render */
  as?: "span" | "button" | "div"
  /** onClick handler for buttons */
  onClick?: () => void
}

const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx"

/**
 * Run the scramble animation on text
 */
function runScrambleAnimation(
  text: string,
  duration: number,
  setDisplayText: (text: string) => void,
  onComplete?: () => void,
): gsap.core.Tween {
  const lockedIndices = new Set<number>()
  const finalChars = text.split("")
  const totalChars = finalChars.length
  const scrambleObj = { progress: 0 }

  return gsap.to(scrambleObj, {
    progress: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const numLocked = Math.floor(scrambleObj.progress * totalChars)

      for (let i = 0; i < numLocked; i++) {
        lockedIndices.add(i)
      }

      const newDisplay = finalChars
        .map((char, i) => {
          if (lockedIndices.has(i)) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")

      setDisplayText(newDisplay)
    },
    onComplete: () => {
      setDisplayText(text)
      onComplete?.()
    },
  })
}

/**
 * Scramble text animation component - animates on mount.
 */
export function ScrambleText({ text, className, delayMs = 0, duration = 0.9 }: ScrambleTextProps) {
  // Initialize with text to avoid flash of empty content
  const [displayText, setDisplayText] = useState(text)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Run animation only once on initial mount
  useEffect(() => {
    if (hasAnimated || !text) return

    // Start with scrambled text
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("")
    setDisplayText(scrambledStart)

    timeoutRef.current = setTimeout(() => {
      animationRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
        setHasAnimated(true)
      })
    }, delayMs)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animationRef.current) animationRef.current.kill()
    }
  }, []) // Empty deps - only run on mount

  // Handle text prop changes after initial animation
  useEffect(() => {
    if (hasAnimated && displayText !== text) {
      setDisplayText(text)
    }
  }, [text, hasAnimated, displayText])

  return (
    <span ref={containerRef} className={className}>
      {displayText || text}
    </span>
  )
}

/**
 * Scramble text animation component - animates on hover.
 */
export function ScrambleTextOnHover({
  text,
  className,
  duration = 0.4,
  as: Component = "span",
  onClick,
}: ScrambleTextOnHoverProps) {
  const [displayText, setDisplayText] = useState(text)
  const isAnimating = useRef(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    // Kill any existing animation
    if (tweenRef.current) {
      tweenRef.current.kill()
    }

    // Start with scrambled
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("")
    setDisplayText(scrambledStart)

    tweenRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
      isAnimating.current = false
    })
  }, [text, duration])

  // Update display text if text prop changes
  useEffect(() => {
    if (!isAnimating.current) {
      setDisplayText(text)
    }
  }, [text])

  return (
    <Component className={className} onMouseEnter={handleMouseEnter} onClick={onClick}>
      {displayText}
    </Component>
  )
}
/**
 * Scramble text animation component - animates when scrolled into view.
 */
export function ScrambleInView({
  text,
  className,
  duration = 0.8,
  threshold = 0.8, // Default to 80% viewpoint
}: {
  text: string
  className?: string
  duration?: number
  threshold?: number
}) {
  const [displayText, setDisplayText] = useState(text) // Start with final text for SSR/SEO
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!elementRef.current || hasAnimated) return

    const el = elementRef.current

    // Don't animate on server or if reduced motion
    const ctx = gsap.context(() => {
      // Initial state: scrambled (visually) or hidden? 
      // Better strategy: Keep it as final text until trigger, then scramble->final?
      // Or Start scrambled invisible?
      // Let's go with: Start hidden or static, then when in view, quickly switch to scrambled and resolve.

      // Actually, for "Cyber deco", usually it implies it starts empty/random and randomizes into place.
      // Let's start with empty/scrambled immediately if we can, but SEO matters.
      // So we keep text in DOM, but visually replace with scramble on entry.

      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        ScrollTrigger.create({
          trigger: el,
          start: `top ${threshold * 100}%`,
          onEnter: () => {
            if (hasAnimated) return

            // Start animation
            const scrambledStart = text.split("").map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("")
            setDisplayText(scrambledStart)

            tweenRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
              setHasAnimated(true)
            })
          },
          once: true
        })
      })
    }, elementRef)

    return () => ctx.revert()
  }, [text, duration, threshold, hasAnimated])

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  )
}
