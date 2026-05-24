import React, { ReactNode } from 'react'
import { cn } from './utils'

interface EmptyStateAction {
  label: string
  icon?: ReactNode
  onClick: () => void
  variant?: 'primary' | 'outline'
}

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: EmptyStateAction
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          {icon}
        </div>
      )}

      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-xs">{description}</p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                action.variant === 'outline'
                  ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400'
                  : 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
              )}
            >
              {action.icon && <span className="flex-shrink-0">{action.icon}</span>}
              {action.label}
            </button>
          )}

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
