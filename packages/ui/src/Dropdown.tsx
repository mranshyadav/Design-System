import React, { useState, useRef, useEffect, cloneElement } from 'react'
import { cn } from './utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownProps {
  trigger: React.ReactElement
  align?: 'start' | 'end' | 'center'
  side?: 'top' | 'bottom'
  children: React.ReactNode
  className?: string
}

export interface DropdownItemProps {
  icon?: React.ReactNode
  variant?: 'default' | 'danger'
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export interface DropdownSeparatorProps {
  className?: string
}

export interface DropdownLabelProps {
  children: React.ReactNode
  className?: string
}

// ─── Context ─────────────────────────────────────────────────────────────────

const DropdownContext = React.createContext<{ close: () => void }>({ close: () => {} })

// ─── Sub-components ──────────────────────────────────────────────────────────

function DropdownItem({
  icon,
  variant = 'default',
  checked,
  disabled,
  onClick,
  children,
  className,
}: DropdownItemProps) {
  const { close } = React.useContext(DropdownContext)

  const handleClick = () => {
    if (disabled) return
    onClick?.()
    close()
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors',
        variant === 'danger'
          ? 'text-red-600 hover:bg-red-50 disabled:text-red-300'
          : 'text-gray-700 hover:bg-gray-50 disabled:text-gray-300',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center',
            variant === 'danger' ? 'text-red-500' : 'text-gray-400',
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{children}</span>
      {checked !== undefined && (
        <span className="ml-auto flex h-4 w-4 items-center justify-center">
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
    </button>
  )
}

function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <hr className={cn('my-1 border-gray-100', className)} />
}

function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div
      className={cn(
        'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ─── Alignment helpers ───────────────────────────────────────────────────────

const alignClasses: Record<'start' | 'end' | 'center', string> = {
  start: 'left-0',
  end: 'right-0',
  center: 'left-1/2 -translate-x-1/2',
}

const sideClasses: Record<'top' | 'bottom', string> = {
  top: 'bottom-full mb-1.5',
  bottom: 'top-full mt-1.5',
}

// ─── Main Dropdown ────────────────────────────────────────────────────────────

function DropdownRoot({
  trigger,
  align = 'end',
  side = 'bottom',
  children,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const triggerWithHandler = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      trigger.props.onClick?.(e)
      toggle()
    },
    'aria-expanded': open,
    'aria-haspopup': 'menu' as const,
  })

  return (
    <DropdownContext.Provider value={{ close }}>
      <div ref={containerRef} className="relative inline-block">
        {triggerWithHandler}

        {open && (
          <div
            role="menu"
            className={cn(
              'absolute z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1 shadow-lg',
              alignClasses[align],
              sideClasses[side],
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  )
}

// ─── Compound export ──────────────────────────────────────────────────────────

export const Dropdown = Object.assign(DropdownRoot, {
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Label: DropdownLabel,
})
