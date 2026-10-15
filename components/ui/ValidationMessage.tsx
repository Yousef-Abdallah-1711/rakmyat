type ValidationMessageProps = {
  id: string
  children?: string
}

export function ValidationMessage({ id, children }: ValidationMessageProps) {
  if (!children) return null

  return (
    <p aria-live="polite" className="form-validation" id={id} role="status">
      {children}
    </p>
  )
}
