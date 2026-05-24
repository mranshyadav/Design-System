import React from 'react'
import { cn } from './utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'ghost'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children?: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  outline: 'border border-gray-300 text-gray-700 bg-transparent',
  ghost: 'text-gray-600',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

interface BadgeCountProps {
  count: number
  max?: number
  className?: string
}

export function BadgeCount({ count, max = 99, className }: BadgeCountProps) {
  const displayText = count > max ? `${max}+` : String(count)

  return (
    <span
      className={cn(
        'absolute -top-1.5 -right-1.5 inline-flex items-center justify-center',
        'min-w-[18px] h-[18px] px-1',
        'rounded-full bg-red-500 text-white text-[10px] font-bold leading-none',
        className
      )}
    >
      {displayText}
    </span>
  )
}
