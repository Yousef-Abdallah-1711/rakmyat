'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ReactNode } from 'react'
import { motionTokens } from '@/lib/motion/tokens'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  label?: string
}

export function ScrollReveal({
  children,
  className,
  label,
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (
        !section ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return
      }

      gsap.fromTo(
        section,
        { y: motionTokens.reveal.distance },
        {
          y: 0,
          duration: motionTokens.duration.slow / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: `top ${100 - motionTokens.reveal.visibilityPercent}%`,
            once: true,
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <div
      aria-label={label}
      className={className}
      data-scroll-reveal="ready"
      ref={sectionRef}
    >
      {children}
    </div>
  )
}
