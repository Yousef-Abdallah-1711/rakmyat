'use client'

import { Dialog } from 'radix-ui'
import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  title: string
  closeLabel: string
  children: ReactNode
  description?: string
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({
  title,
  closeLabel,
  children,
  description,
  trigger,
  open,
  onOpenChange,
}: ModalProps) {
  const controlled = open !== undefined

  return (
    <Dialog.Root
      onOpenChange={onOpenChange}
      open={controlled ? open : undefined}
    >
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.heading}>{title}</Dialog.Title>
          {description ? (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          ) : null}
          <Dialog.Close asChild>
            <button
              aria-label={closeLabel}
              className={`focus-ring ${styles.close}`}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
