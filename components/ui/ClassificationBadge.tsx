import styles from './foundation.module.css'

export type ProjectClassification =
  | 'real-client-project'
  | 'internal-product'
  | 'concept-demo'
  | 'confidential-summary'

type ClassificationBadgeProps = {
  classification: ProjectClassification
  label: string
  placement?: 'overlay' | 'inline'
}

const badgeKind: Record<ProjectClassification, string> = {
  'real-client-project': 'client',
  'internal-product': 'internal',
  'concept-demo': 'concept',
  'confidential-summary': 'confidential',
}

export function ClassificationBadge({
  classification,
  label,
  placement = 'overlay',
}: ClassificationBadgeProps) {
  return (
    <span
      className={[
        styles.badge,
        placement === 'inline' ? styles.badgeInline : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      data-kind={badgeKind[classification]}
    >
      {label}
    </span>
  )
}
