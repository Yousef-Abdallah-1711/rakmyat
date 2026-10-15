import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { ValidationMessage } from './ValidationMessage'

type Option = {
  value: string
  label: string
}

type FieldProps = {
  label: string
  name: string
  error?: string
  hint?: string
  required?: boolean
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  multiline?: boolean
  selectOptions?: Option[]
  selectPlaceholder?: string
  className?: string
  autoComplete?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  value?: string
  defaultValue?: string
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
}

function usesLtrValue(type: FieldProps['type']) {
  return ['email', 'number', 'tel', 'url'].includes(type ?? '')
}

export function FormField({
  label,
  name,
  error,
  hint,
  required = false,
  type = 'text',
  multiline = false,
  selectOptions,
  selectPlaceholder,
  className,
  autoComplete,
  dir,
  value,
  defaultValue,
  onChange,
}: FieldProps) {
  const id = useId()
  const errorID = `${id}-error`
  const hintID = `${id}-hint`
  const direction = usesLtrValue(type) ? 'ltr' : dir
  const describedBy = [hint && hintID, error && errorID]
    .filter(Boolean)
    .join(' ')

  let control: ReactNode
  const sharedProps = {
    'aria-describedby': describedBy || undefined,
    'aria-invalid': error ? true : undefined,
    className: 'form-control',
    defaultValue,
    dir: direction,
    id,
    name,
    onChange: onChange as never,
    required,
    value,
  }

  if (selectOptions) {
    control = (
      <select {...sharedProps}>
        {selectPlaceholder ? (
          <option value="">{selectPlaceholder}</option>
        ) : null}
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  } else if (multiline) {
    control = <textarea {...sharedProps} rows={5} />
  } else {
    control = <input {...sharedProps} autoComplete={autoComplete} type={type} />
  }

  return (
    <div className={['form-field', className].filter(Boolean).join(' ')}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {control}
      {hint ? (
        <p className="form-hint" id={hintID}>
          {hint}
        </p>
      ) : null}
      <ValidationMessage id={errorID}>{error}</ValidationMessage>
    </div>
  )
}
