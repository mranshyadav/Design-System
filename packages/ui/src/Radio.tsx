import React from 'react'
import { cn } from './utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  variant?: 'default' | 'card' | 'segmented'
  label?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

// ─── Variant renderers ────────────────────────────────────────────────────────

function DefaultVariant({
  options,
  value,
  onChange,
  orientation,
  groupName,
}: {
  options: RadioOption[]
  value: string
  onChange: (v: string) => void
  orientation: 'horizontal' | 'vertical'
  groupName: string
}) {
  return (
    <div
      className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex cursor-pointer items-start gap-2.5',
            option.disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <input
            type="radio"
            name={groupName}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange(option.value)}
            className="mt-0.5 h-4 w-4 accent-violet-600 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-gray-800">{option.label}</span>
            {option.description && (
              <span className="text-xs text-gray-400">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  )
}

function CardVariant({
  options,
  value,
  onChange,
  orientation,
}: {
  options: RadioOption[]
  value: string
  onChange: (v: string) => void
  orientation: 'horizontal' | 'vertical'
}) {
  return (
    <div
      className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
      )}
    >
      {options.map((option) => {
        const selected = value === option.value
        return (
          <div
            key={option.value}
            role="radio"
            aria-checked={selected}
            aria-disabled={option.disabled}
            tabIndex={option.disabled ? -1 : 0}
            onClick={() => { if (!option.disabled) onChange(option.value) }}
            onKeyDown={(e) => {
              if ((e.key === ' ' || e.key === 'Enter') && !option.disabled) {
                e.preventDefault()
                onChange(option.value)
              }
            }}
            className={cn(
              'flex cursor-pointer select-none flex-col gap-1 rounded-xl border p-4 transition-all',
              selected
                ? 'border-violet-500 bg-violet-50 ring-1 ring-violet-500'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              option.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  selected
                    ? 'border-violet-600 bg-white'
                    : 'border-gray-300 bg-white',
                )}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-violet-600" />
                )}
              </span>
              <span className="text-sm font-medium text-gray-800">{option.label}</span>
            </div>
            {option.description && (
              <span className="pl-6 text-xs text-gray-400">{option.description}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SegmentedVariant({
  options,
  value,
  onChange,
}: {
  options: RadioOption[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex rounded-xl bg-gray-100 p-1 gap-0.5">
      {options.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => { if (!option.disabled) onChange(option.value) }}
            className={cn(
              'flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
              selected
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
              option.disabled && 'cursor-not-allowed opacity-40',
            )}
            aria-pressed={selected}
          >
            <span className="flex flex-col items-center gap-0.5">
              <span>{option.label}</span>
              {option.description && (
                <span className="text-xs font-normal text-gray-400">{option.description}</span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

let _radioGroupId = 0

export function RadioGroup({
  value,
  onChange,
  options,
  variant = 'default',
  label,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const groupName = React.useRef(`radio-group-${++_radioGroupId}`).current

  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label && (
        <legend className="mb-1 text-sm font-semibold text-gray-700">{label}</legend>
      )}

      {variant === 'default' && (
        <DefaultVariant
          options={options}
          value={value}
          onChange={onChange}
          orientation={orientation}
          groupName={groupName}
        />
      )}

      {variant === 'card' && (
        <CardVariant
          options={options}
          value={value}
          onChange={onChange}
          orientation={orientation}
        />
      )}

      {variant === 'segmented' && (
        <SegmentedVariant options={options} value={value} onChange={onChange} />
      )}
    </fieldset>
  )
}
