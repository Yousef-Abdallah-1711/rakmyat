import styles from './foundation.module.css'

type SkeletonProps = {
  label: string
  className?: string
  lines?: number
}

export function Skeleton({ label, className, lines = 1 }: SkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      className={className}
      role="status"
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <span
          aria-hidden="true"
          className={styles.skeleton}
          key={index}
          style={{ width: index === lines - 1 ? '68%' : '100%' }}
        />
      ))}
    </div>
  )
}
