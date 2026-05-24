import React, { ReactNode } from 'react'
import { cn } from './utils'

type ProgressColor = 'accent' | 'success' | 'warning' | 'danger'

// ProgressBar

type BarSize = 'xs' | 'sm' | 'md'

interface ProgressBarProps {
  value?: number
  indeterminate?: boolean
  color?: ProgressColor
  size?: BarSize
  label?: string
  showPercent?: boolean
  className?: string
}

const barColorClasses: Record<ProgressColor, string> = {
  accent: 'bg-violet-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

const barSizeClasses: Record<BarSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
}

export const ProgressBar = ({
  value = 0,
  indeterminate = false,
  color = 'accent',
  size = 'sm',
  label,
  showPercent = false,
  className,
}: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showPercent && !indeterminate && (
            <span className="text-xs font-medium text-gray-500">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-gray-200', barSizeClasses[size])}>
        {indeterminate ? (
          <div
            className={cn('h-full w-1/3 rounded-full', barColorClasses[color])}
            style={{ animation: 'indeterminate 1.5s ease-in-out infinite' }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full transition-all duration-300 ease-in-out', barColorClasses[color])}
            style={{ width: `${clampedValue}%` }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}
      </div>
      <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}

// ProgressCircle

type CircleSize = 'sm' | 'md' | 'lg'

interface ProgressCircleProps {
  value?: number
  indeterminate?: boolean
  size?: CircleSize
  color?: ProgressColor
  showPercent?: boolean
  strokeWidth?: number
}

const circleSizePx: Record<CircleSize, number> = {
  sm: 48,
  md: 64,
  lg: 80,
}

const circleColorClasses: Record<ProgressColor, string> = {
  accent: 'stroke-violet-600',
  success: 'stroke-emerald-500',
  warning: 'stroke-amber-500',
  danger: 'stroke-red-500',
}

export const ProgressCircle = ({
  value = 0,
  indeterminate = false,
  size = 'md',
  color = 'accent',
  showPercent = false,
  strokeWidth = 4,
}: ProgressCircleProps) => {
  const clampedValue = Math.min(100, Math.max(0, value))
  const px = circleSizePx[size]
  const radius = 15.9
  const dashOffset = 100 - clampedValue

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: px, height: px }}>
      <svg
        viewBox="0 0 36 36"
        className={cn('-rotate-90', indeterminate && 'animate-spin')}
        width={px}
        height={px}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="stroke-gray-200"
        />
        {/* Progress */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray="100"
          strokeDashoffset={indeterminate ? 75 : dashOffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-in-out', circleColorClasses[color])}
        />
      </svg>
      {showPercent && !indeterminate && (
        <span className="absolute text-xs font-semibold text-gray-700">
          {clampedValue}
        </span>
      )}
    </div>
  )
}
