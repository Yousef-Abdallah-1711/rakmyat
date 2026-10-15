import styles from './foundation.module.css'

type OversizedNumeralProps = {
  value: number | string
  label: string
  className?: string
}

export function OversizedNumeral({
  value,
  label,
  className,
}: OversizedNumeralProps) {
  return (
    <span
      aria-hidden="true"
      className={[styles.numeral, className].filter(Boolean).join(' ')}
      data-numeral={String(value).padStart(2, '0')}
      title={label}
    >
      {String(value).padStart(2, '0')}
    </span>
  )
}
