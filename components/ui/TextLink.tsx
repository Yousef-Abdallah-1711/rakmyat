import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import styles from './foundation.module.css'

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children: ReactNode
  locale?: 'en' | 'ar'
}

export function TextLink({ href, children, locale, ...props }: TextLinkProps) {
  return (
    <Link
      {...props}
      className={[styles.textLink, props.className].filter(Boolean).join(' ')}
      data-locale={locale}
      href={href as '/'}
    >
      {children}
    </Link>
  )
}
