import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from 'react'
import { cn } from './utils'

type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'

interface PopoverProps {
  trigger: ReactElement
  placement?: PopoverPlacement
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnClickOutside?: boolean
}

const placementClasses: Record<PopoverPlacement, string> = {
  'bottom-start': 'top-full left-0 mt-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  'bottom-end': 'top-full right-0 mt-1.5',
  'top-start': 'bottom-full left-0 mb-1.5',
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  'top-end': 'bottom-full right-0 mb-1.5',
  left: 'right-full top-0 mr-1.5',
  right: 'left-full top-0 ml-1.5',
}

export const Popover = ({
  trigger,
  placement = 'bottom-start',
  children,
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
}: PopoverProps) => {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isOpen = isControlled ? controlledOpen : internalOpen

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value)
    onOpenChange?.(value)
  }

  const toggle = () => setOpen(!isOpen)

  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeOnClickOutside])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      toggle()
      trigger.props.onClick?.(e)
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'true',
  })

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      {clonedTrigger}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 rounded-xl border border-gray-200 bg-white shadow-lg',
            placementClasses[placement],
          )}
          role="dialog"
        >
          {children}
        </div>
      )}
    </div>
  )
}
