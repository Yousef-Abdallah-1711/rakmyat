import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './foundation.module.css'

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> & {
  children: ReactNode
  label: string
  active?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, label, active, type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        aria-label={label}
        aria-pressed={active}
        className={[styles.iconButton, props.className]
          .filter(Boolean)
          .join(' ')}
        data-active={active}
        type={type}
      >
        <span aria-hidden="true">{children}</span>
      </button>
    )
  },
)
