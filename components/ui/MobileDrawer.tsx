'use client'

import { useRef, useState, type ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import { Link } from '@/i18n/navigation'
import { IconButton } from './IconButton'
import { PrimaryButton } from './PrimaryButton'
import styles from './MobileDrawer.module.css'

export type DrawerItem = {
  href: string
  label: string
}

type MobileDrawerProps = {
  items: DrawerItem[]
  trigger: ReactNode
  languageSwitcher: ReactNode
  title: string
  menuLabel: string
  closeLabel: string
  primaryLabel: string
  primaryHref: string
  locale: 'en' | 'ar'
}

export function MobileDrawer({
  items,
  trigger,
  languageSwitcher,
  title,
  menuLabel,
  closeLabel,
  primaryLabel,
  primaryHref,
  locale,
}: MobileDrawerProps) {
  const pointerStart = useRef<number | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.overlay}
          data-testid="mobile-drawer-overlay"
        />
        <Dialog.Content
          aria-label={menuLabel}
          className={styles.content}
          data-testid="mobile-drawer-content"
          onPointerDown={(event) => {
            pointerStart.current = event.clientX
          }}
          onPointerUp={(event) => {
            if (pointerStart.current === null) return
            const delta = event.clientX - pointerStart.current
            const direction = document.documentElement.dir === 'rtl' ? -1 : 1
            if (delta * direction < -60) {
              setOpen(false)
            }
            pointerStart.current = null
          }}
        >
          <Dialog.Title className={styles.hiddenTitle}>{title}</Dialog.Title>
          <div className={styles.topline}>
            <p aria-hidden="true" className={styles.title}>
              {title}
            </p>
            <Dialog.Close asChild>
              <IconButton className={styles.close} label={closeLabel}>
                <span aria-hidden="true">×</span>
              </IconButton>
            </Dialog.Close>
          </div>
          <nav aria-label={menuLabel} className={styles.nav}>
            {items.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link className={styles.link} href={item.href as '/'}>
                  {item.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
          <div className={styles.actions}>
            <div className={styles.language}>{languageSwitcher}</div>
            <Dialog.Close asChild>
              <PrimaryButton href={primaryHref} locale={locale} size="lg">
                {primaryLabel}
              </PrimaryButton>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
