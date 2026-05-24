import React, { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from './utils'

type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type DrawerSide = 'left' | 'right'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: DrawerSize
  side?: DrawerSide
  footer?: ReactNode
  children: ReactNode
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: 'max-w-xs',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'w-full',
}

export const Drawer = ({
  open,
  onClose,
  title,
  size = 'md',
  side = 'right',
  footer,
  children,
}: DrawerProps) => {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex',
        side === 'right' ? 'justify-end' : 'justify-start',
      )}
    >
      {/* Backdrop scrim */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'relative h-full bg-white shadow-2xl flex flex-col transition-transform w-full',
          sizeClasses[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {title ? (
            <h2 id="drawer-title" className="text-base font-semibold text-gray-900">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
