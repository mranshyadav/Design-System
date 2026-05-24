import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  ReactNode,
} from 'react'
import { cn } from './utils'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
}

type ToastOptions = Omit<ToastItem, 'id' | 'variant' | 'title'>

interface ToastContextValue {
  add: (toast: Omit<ToastItem, 'id'>) => void
  dismiss: (id: string) => void
}

interface UseToastReturn {
  success: (title: string, opts?: ToastOptions) => void
  error: (title: string, opts?: ToastOptions) => void
  warning: (title: string, opts?: ToastOptions) => void
  info: (title: string, opts?: ToastOptions) => void
  dismiss: (id: string) => void
}

type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'

interface ToastProviderProps {
  position?: ToastPosition
  maxToasts?: number
  children: ReactNode
}

const ToastContext = createContext<ToastContextValue | null>(null)

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
}

const variantIconColors: Record<ToastVariant, string> = {
  success: 'bg-emerald-100 text-emerald-600',
  error: 'bg-red-100 text-red-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-blue-100 text-blue-600',
}

const ToastIcon = ({ variant }: { variant: ToastVariant }) => {
  if (variant === 'success') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
      </svg>
    )
  }
  if (variant === 'error') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
      </svg>
    )
  }
  if (variant === 'warning') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
    </svg>
  )
}

const ToastCard = ({
  toast,
  onDismiss,
}: {
  toast: ToastItem
  onDismiss: (id: string) => void
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex items-start gap-3 w-80">
      <div className={cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center', variantIconColors[toast.variant])}>
        <ToastIcon variant={toast.variant} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-gray-500 mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="mt-1.5 text-xs font-semibold text-violet-600 hover:underline focus:outline-none"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none rounded-md"
        aria-label="Dismiss"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  )
}

export const ToastProvider = ({
  position = 'top-right',
  maxToasts = 5,
  children,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      const newToast: ToastItem = { ...toast, id }

      setToasts((prev) => {
        const updated = [newToast, ...prev]
        return updated.slice(0, maxToasts)
      })

      const duration = toast.duration ?? 4000
      setTimeout(() => {
        dismiss(id)
      }, duration)
    },
    [dismiss, maxToasts],
  )

  return (
    <ToastContext.Provider value={{ add, dismiss }}>
      {children}
      <div
        className={cn(
          'fixed z-[200] flex flex-col gap-2',
          positionClasses[position],
        )}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): UseToastReturn => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const { add, dismiss } = ctx

  return {
    success: (title, opts) => add({ variant: 'success', title, ...opts }),
    error: (title, opts) => add({ variant: 'error', title, ...opts }),
    warning: (title, opts) => add({ variant: 'warning', title, ...opts }),
    info: (title, opts) => add({ variant: 'info', title, ...opts }),
    dismiss,
  }
}
