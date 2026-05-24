import React, { useState, ReactNode } from 'react'
import { cn } from './utils'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

interface AlertProps {
  variant: AlertVariant
  title?: string
  children: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  icon?: ReactNode
  className?: string
}

const variantStyles: Record<AlertVariant, {
  wrapper: string
  icon: string
  title: string
  body: string
}> = {
  info: {
    wrapper: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    body: 'text-blue-700',
  },
  success: {
    wrapper: 'bg-emerald-50 border-emerald-200',
    icon: 'text-emerald-500',
    title: 'text-emerald-800',
    body: 'text-emerald-700',
  },
  warning: {
    wrapper: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-500',
    title: 'text-amber-800',
    body: 'text-amber-700',
  },
  danger: {
    wrapper: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    body: 'text-red-700',
  },
}

const DefaultIcon = ({ variant }: { variant: AlertVariant }) => {
  if (variant === 'info') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
      </svg>
    )
  }
  if (variant === 'success') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
      </svg>
    )
  }
  if (variant === 'warning') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
    </svg>
  )
}

export const Alert = ({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
}: AlertProps) => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const styles = variantStyles[variant]

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-xl border',
        styles.wrapper,
        className,
      )}
      role="alert"
    >
      <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
        {icon ?? <DefaultIcon variant={variant} />}
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('text-sm font-semibold mb-1', styles.title)}>
            {title}
          </p>
        )}
        <div className={cn('text-sm', styles.body)}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 ml-auto -mt-0.5 -mr-0.5 rounded-lg p-1 opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current',
            styles.icon,
          )}
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
      )}
    </div>
  )
}
