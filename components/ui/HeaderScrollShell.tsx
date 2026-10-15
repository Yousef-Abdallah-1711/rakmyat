'use client'

import { useEffect, useState, type ReactNode } from 'react'

type HeaderScrollShellProps = {
  children: ReactNode
  className?: string
}

export function HeaderScrollShell({
  children,
  className,
}: HeaderScrollShellProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={className} data-scrolled={scrolled}>
      {children}
    </header>
  )
}
