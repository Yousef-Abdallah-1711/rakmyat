import type { HTMLAttributes, ReactNode } from 'react'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  surface?: 'page' | 'tinted' | 'dark'
}

export function Section({
  children,
  className,
  surface = 'page',
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={[
        'section-shell',
        surface === 'tinted' && 'bg-bg-section-tinted',
        surface === 'dark' && 'bg-bg-section-dark text-ink-on-dark',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </section>
  )
}
