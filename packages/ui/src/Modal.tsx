import React, { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from './utils'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'
type IconVariant = 'default' | 'danger' | 'warning' | 'success'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  icon?: ReactNode
  iconVariant?: IconVariant
  size?: ModalSize
  footer?: ReactNode
  children?: ReactNode
  closeOnBackdrop?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

const iconVariantClasses: Record<IconVariant, string> = {
  default: 'bg-gray-100 text-gray-600',
  danger: 'bg-red-100 text-red-600',
  warning: 'bg-amber-100 text-amber-600',
  success: 'bg-emerald-100 text-emerald-600',
}

export const Modal = ({
  open,
  onClose,
  title,
  description,
  icon,
  iconVariant = 'default',
  size = 'md',
  footer,
  children,
  closeOnBackdrop = true,
}: ModalProps) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop scrim */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl w-full',
          sizeClasses[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          {icon && (
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', iconVariantClasses[iconVariant])}>
              {icon}
            </div>
          )}
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900 pr-8">
            {title}
          </h2>
          {description && (
            <p id="modal-description" className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        {/* Body */}
        {children && (
          <div className="px-6 pb-4">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
