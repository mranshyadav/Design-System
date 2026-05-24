import React from 'react'
import { cn } from './utils'

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg'
type SpinnerColor = 'accent' | 'white' | 'gray'

interface SpinnerProps {
  size?: SpinnerSize
  color?: SpinnerColor
  className?: string
}

const spinnerSizePx: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
}

const spinnerColorClasses: Record<SpinnerColor, string> = {
  accent: 'text-violet-600',
  white: 'text-white',
  gray: 'text-gray-400',
}

export function Spinner({ size = 'md', color = 'accent', className }: SpinnerProps) {
  const px = spinnerSizePx[size]

  return (
    <svg
      className={cn('animate-spin', spinnerColorClasses[color], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={px}
      height={px}
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

type DotsSize = 'sm' | 'md' | 'lg'
type DotsColor = 'accent' | 'gray'

interface DotsProps {
  size?: DotsSize
  color?: DotsColor
  className?: string
}

const dotsSizeClasses: Record<DotsSize, string> = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
}

const dotsColorClasses: Record<DotsColor, string> = {
  accent: 'bg-violet-600',
  gray: 'bg-gray-400',
}

const DOT_DELAYS = ['0ms', '150ms', '300ms']

export function Dots({ size = 'md', color = 'accent', className }: DotsProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1', className)}
      role="status"
      aria-label="Loading"
    >
      {DOT_DELAYS.map((delay, i) => (
        <span
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            dotsSizeClasses[size],
            dotsColorClasses[color]
          )}
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  )
}

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md',
        className
      )}
    />
  )
}
