import { useId, type InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'children'
> & {
  label: string
  error?: string
}

export function Checkbox({ label, error, id, ...props }: CheckboxProps) {
  const generatedID = useId()
  const inputID = id ?? generatedID
  const errorID = `${inputID}-error`

  return (
    <div className="checkbox-field">
      <label className="checkbox-label" htmlFor={inputID}>
        <input
          {...props}
          aria-describedby={error ? errorID : undefined}
          aria-invalid={error ? true : undefined}
          className="checkbox-control"
          id={inputID}
          type="checkbox"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p
          aria-live="polite"
          className="form-validation"
          id={errorID}
          role="status"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
