import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './foundation.module.css'

type SecondaryButtonProps = {
  children: ReactNode
  href?: string
  disabled?: boolean
  size?: 'lg' | 'md' | 'sm'
  locale?: 'en' | 'ar'
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

export function SecondaryButton({
  children,
  href,
  disabled = false,
  size = 'md',
  locale,
  className,
  ...buttonProps
}: SecondaryButtonProps) {
  const classes = [
    styles.button,
    styles.secondary,
    size === 'sm' ? styles.small : size === 'lg' ? styles.large : styles.medium,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link
        aria-disabled={disabled || undefined}
        className={classes}
        data-locale={locale}
        href={href as '/'}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      {...buttonProps}
      aria-busy={buttonProps['aria-busy']}
      className={classes}
      data-locale={locale}
      disabled={disabled}
      type={buttonProps.type ?? 'button'}
    >
      {children}
    </button>
  )
}
