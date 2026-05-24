import React, { useState, useRef, useEffect } from 'react'
import { cn } from './utils'

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string
  hint?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: InputSize
  className?: string
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'py-1.5 px-3',
  md: 'py-2 px-3',
  lg: 'py-2.5 px-4',
}

export function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = 'md',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const baseClasses = cn(
    'w-full rounded-xl border text-sm outline-none transition-all',
    error
      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
      : 'border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-400',
    sizeClasses[size],
    prefix ? 'pl-9' : undefined,
    suffix ? 'pr-9' : undefined,
    props.disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white',
    className,
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 flex items-center text-gray-400">
            {prefix}
          </span>
        )}
        <input id={inputId} className={baseClasses} {...props} />
        {suffix && (
          <span className="pointer-events-none absolute right-3 flex items-center text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {(hint || error) && (
        <p className={cn('text-xs', error ? 'text-red-500' : 'text-gray-400')}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  showCount?: boolean
  className?: string
}

export function Textarea({
  label,
  hint,
  error,
  showCount,
  className,
  id,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState<string>(
    (value as string) ?? (defaultValue as string) ?? '',
  )
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const isControlled = value !== undefined
  const currentValue = isControlled ? (value as string) : internalValue
  const charCount = currentValue?.length ?? 0

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e)
  }

  const baseClasses = cn(
    'w-full rounded-xl border text-sm outline-none transition-all py-2 px-3 resize-y min-h-[80px]',
    error
      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
      : 'border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-400',
    props.disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white',
    className,
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={baseClasses}
        maxLength={maxLength}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        {...props}
      />
      <div className="flex items-start justify-between">
        {(hint || error) ? (
          <p className={cn('text-xs', error ? 'text-red-500' : 'text-gray-400')}>
            {error ?? hint}
          </p>
        ) : (
          <span />
        )}
        {showCount && maxLength !== undefined && (
          <p className="text-xs text-gray-400 tabular-nums">
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
