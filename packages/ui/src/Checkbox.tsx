import React, { useRef, useEffect } from 'react'
import { cn } from './utils'

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  label?: string
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  error?: string
  onChange: (checked: boolean) => void
  className?: string
  id?: string
}

export function Checkbox({
  label,
  checked,
  indeterminate = false,
  disabled,
  error,
  onChange,
  className,
  id,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const checkboxId = id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          'flex cursor-pointer items-start gap-2.5',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <input
          ref={inputRef}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={cn(
            'mt-0.5 h-4 w-4 rounded accent-violet-600 cursor-pointer',
            'border-gray-300',
            disabled && 'cursor-not-allowed',
            error && 'accent-red-500',
          )}
        />
        {label && (
          <span
            className={cn(
              'text-sm',
              error ? 'text-red-600' : 'text-gray-700',
            )}
          >
            {label}
          </span>
        )}
      </label>
      {error && (
        <p className="pl-6 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

export interface ToggleProps {
  label?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  size?: 'sm' | 'md'
  className?: string
  id?: string
}

const toggleSizes = {
  sm: {
    track: 'w-8 h-5',
    knob: 'h-3.5 w-3.5',
    knobOff: 'translate-x-0.5',
    knobOn: 'translate-x-4',
  },
  md: {
    track: 'w-10 h-6',
    knob: 'h-4 w-4',
    knobOff: 'translate-x-1',
    knobOn: 'translate-x-5',
  },
}

export function Toggle({
  label,
  checked,
  disabled,
  onChange,
  size = 'md',
  className,
  id,
}: ToggleProps) {
  const toggleId = id ?? (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  const sizes = toggleSizes[size]

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!disabled) onChange(!checked)
    }
  }

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {/* Visually hidden native checkbox for a11y */}
      <input
        id={toggleId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Custom track */}
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => { if (!disabled) onChange(!checked) }}
        className={cn(
          'relative shrink-0 rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          sizes.track,
          checked ? 'bg-violet-600' : 'bg-gray-200',
        )}
      >
        {/* Knob */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
            sizes.knob,
            checked ? sizes.knobOn : sizes.knobOff,
          )}
        />
      </div>

      {label && (
        <span className="text-sm text-gray-700">{label}</span>
      )}
    </label>
  )
}
