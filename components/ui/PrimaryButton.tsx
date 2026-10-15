import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './foundation.module.css'

type SharedProps = {
  children: ReactNode
  size?: 'lg' | 'md' | 'sm'
  loading?: boolean
  loadingLabel?: string
  locale?: 'en' | 'ar'
  className?: string
}

type LinkButtonProps = SharedProps & {
  href: string
  disabled?: boolean
  onClick?: never
}

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: never
  }

export type PrimaryButtonProps = LinkButtonProps | NativeButtonProps

function sizeClass(size: SharedProps['size']) {
  if (size === 'sm') return styles.small
  if (size === 'lg') return styles.large
  return styles.medium
}

export function PrimaryButton(props: PrimaryButtonProps) {
  const {
    children,
    size = 'md',
    loading = false,
    loadingLabel,
    locale,
    className,
  } = props
  const classes = [styles.button, styles.primary, sizeClass(size), className]
    .filter(Boolean)
    .join(' ')
  const content = loading ? (
    <>
      <span className={styles.spinner} aria-hidden="true" />
      {loadingLabel ? (
        <span className={styles.visuallyHidden}>{loadingLabel}</span>
      ) : null}
    </>
  ) : (
    children
  )

  if ('href' in props && props.href) {
    return (
      <Link
        aria-disabled={props.disabled || loading || undefined}
        className={classes}
        data-locale={locale}
        href={props.href as '/'}
        tabIndex={props.disabled || loading ? -1 : undefined}
      >
        {content}
      </Link>
    )
  }

  const buttonProps = { ...props } as Record<string, unknown>
  const nativeProps = props as NativeButtonProps
  for (const sharedProp of [
    'children',
    'size',
    'loading',
    'loadingLabel',
    'locale',
    'className',
    'href',
  ]) {
    delete buttonProps[sharedProp]
  }

  return (
    <button
      {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
      data-locale={locale}
      disabled={nativeProps.disabled || loading}
      aria-busy={loading || undefined}
      type={nativeProps.type ?? 'button'}
    >
      {content}
    </button>
  )
}
