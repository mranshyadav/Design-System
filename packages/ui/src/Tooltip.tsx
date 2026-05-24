import React, {
  useState,
  useRef,
  ReactNode,
  ReactElement,
} from 'react'
import { cn } from './utils'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
type TooltipVariant = 'dark' | 'light' | 'danger'

interface TooltipProps {
  content: ReactNode
  placement?: TooltipPlacement
  variant?: TooltipVariant
  delay?: number
  children: ReactElement
}

const variantClasses: Record<TooltipVariant, string> = {
  dark: 'bg-gray-900 text-white',
  light: 'bg-white border border-gray-200 text-gray-700 shadow-sm',
  danger: 'bg-red-600 text-white',
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const ArrowTop = ({ variant }: { variant: TooltipVariant }) => (
  <div
    className={cn(
      'absolute top-full left-1/2 -translate-x-1/2 w-0 h-0',
      'border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
      variant === 'dark' ? 'border-t-gray-900' : variant === 'danger' ? 'border-t-red-600' : 'border-t-gray-200',
    )}
  />
)

const ArrowBottom = ({ variant }: { variant: TooltipVariant }) => (
  <div
    className={cn(
      'absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0',
      'border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
      variant === 'dark' ? 'border-b-gray-900' : variant === 'danger' ? 'border-b-red-600' : 'border-b-gray-200',
    )}
  />
)

const ArrowLeft = ({ variant }: { variant: TooltipVariant }) => (
  <div
    className={cn(
      'absolute left-full top-1/2 -translate-y-1/2 w-0 h-0',
      'border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
      variant === 'dark' ? 'border-l-gray-900' : variant === 'danger' ? 'border-l-red-600' : 'border-l-gray-200',
    )}
  />
)

const ArrowRight = ({ variant }: { variant: TooltipVariant }) => (
  <div
    className={cn(
      'absolute right-full top-1/2 -translate-y-1/2 w-0 h-0',
      'border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
      variant === 'dark' ? 'border-r-gray-900' : variant === 'danger' ? 'border-r-red-600' : 'border-r-gray-200',
    )}
  />
)

const Arrow = ({
  placement,
  variant,
}: {
  placement: TooltipPlacement
  variant: TooltipVariant
}) => {
  if (placement === 'top') return <ArrowTop variant={variant} />
  if (placement === 'bottom') return <ArrowBottom variant={variant} />
  if (placement === 'left') return <ArrowLeft variant={variant} />
  return <ArrowRight variant={variant} />
}

export const Tooltip = ({
  content,
  placement = 'top',
  variant = 'dark',
  delay = 200,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay)
  }

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setVisible(false)
  }

  const child = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      show()
      children.props.onMouseEnter?.(e)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide()
      children.props.onMouseLeave?.(e)
    },
    onFocus: (e: React.FocusEvent) => {
      show()
      children.props.onFocus?.(e)
    },
    onBlur: (e: React.FocusEvent) => {
      hide()
      children.props.onBlur?.(e)
    },
  })

  return (
    <span className="relative inline-flex">
      {child}
      {visible && (
        <span
          className={cn(
            'absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none',
            variantClasses[variant],
            placementClasses[placement],
          )}
          role="tooltip"
        >
          {content}
          <Arrow placement={placement} variant={variant} />
        </span>
      )}
    </span>
  )
}
