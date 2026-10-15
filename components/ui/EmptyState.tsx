import { Link } from '@/i18n/navigation'

type EmptyStateProps = {
  message: string
  linkLabel: string
  href?: string
}

export function EmptyState({
  message,
  linkLabel,
  href = '/process',
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="type-body">{message}</p>
      <Link className="empty-state__link focus-ring" href={href as '/'}>
        {linkLabel}
      </Link>
    </div>
  )
}
