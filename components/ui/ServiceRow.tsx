import { Link } from '@/i18n/navigation'
import { OversizedNumeral } from './OversizedNumeral'
import styles from './foundation.module.css'

type ServiceRowProps = {
  title: string
  summary: string
  pillarNumber: number
  href: string
  className?: string
  'data-testid'?: string
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className={styles.serviceArrow}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M3.5 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function ServiceRow({
  title,
  summary,
  pillarNumber,
  href,
  className,
  'data-testid': testId,
}: ServiceRowProps) {
  return (
    <Link
      aria-label={`${title}. ${summary}`}
      className={[styles.serviceRow, className].filter(Boolean).join(' ')}
      data-testid={testId}
      href={href as '/'}
    >
      <OversizedNumeral label={title} value={pillarNumber} />
      <span className={styles.serviceContent}>
        <span className="type-h2">{title}</span>
        <span className="type-body block">{summary}</span>
      </span>
      <Arrow />
    </Link>
  )
}
