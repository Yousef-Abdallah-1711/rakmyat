'use client'

import { Accordion as RadixAccordion } from 'radix-ui'
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  label: string
  type?: 'single' | 'multiple'
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className={styles.chevron}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export function Accordion({ items, label, type = 'single' }: AccordionProps) {
  if (type === 'multiple') {
    return (
      <RadixAccordion.Root
        aria-label={label}
        className={styles.root}
        type="multiple"
      >
        {items.map((item) => (
          <RadixAccordion.Item
            className={styles.item}
            key={item.id}
            value={item.id}
          >
            <RadixAccordion.Header>
              <RadixAccordion.Trigger className={styles.trigger}>
                {item.title}
                <Chevron />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className={styles.content}>
              <div className={styles.contentInner}>{item.content}</div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    )
  }

  return (
    <RadixAccordion.Root
      aria-label={label}
      className={styles.root}
      collapsible
      type="single"
    >
      {items.map((item) => (
        <RadixAccordion.Item
          className={styles.item}
          key={item.id}
          value={item.id}
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className={styles.trigger}>
              {item.title}
              <Chevron />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={styles.content}>
            <div className={styles.contentInner}>{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
