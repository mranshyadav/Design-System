import React, { useState, ReactNode } from 'react'
import { cn } from './utils'

export interface AccordionItem {
  id: string
  trigger: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  variant?: 'bordered' | 'flush'
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({
  items,
  variant = 'bordered',
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen)

  function toggle(id: string) {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (isOpen) {
        return prev.filter((x) => x !== id)
      }
      if (allowMultiple) {
        return [...prev, id]
      }
      return [id]
    })
  }

  return (
    <div
      className={cn(
        variant === 'bordered'
          ? 'divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden'
          : 'divide-y divide-gray-100',
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              className={cn(
                'flex justify-between items-center w-full px-4 py-3.5 text-sm font-medium text-gray-900 text-left transition-colors',
                item.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              )}
              aria-expanded={isOpen}
            >
              <span>{item.trigger}</span>
              <svg
                className={cn(
                  'w-4 h-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
