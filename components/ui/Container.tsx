import type { HTMLAttributes, ReactNode } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={['container-shell', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
