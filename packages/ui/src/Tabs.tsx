import React, { ReactNode } from 'react'
import { cn } from './utils'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
  badge?: number | string
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
  variant?: 'underline' | 'segmented' | 'pill' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

export function Tabs({
  tabs,
  activeId,
  onChange,
  variant = 'underline',
  size = 'md',
  className,
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={cn('flex border-b border-gray-200', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              sizeClasses[size],
              'font-medium border-b-2 -mb-px flex items-center gap-2 transition-colors',
              tab.id === activeId
                ? 'text-violet-600 border-violet-600'
                : 'text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium',
                tab.id === activeId
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-gray-100 text-gray-600'
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'segmented') {
    return (
      <div className={cn('inline-flex p-1 bg-gray-100 rounded-xl gap-1', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              sizeClasses[size],
              'font-medium rounded-lg flex items-center gap-2 transition-all',
              tab.id === activeId
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-800',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium',
                tab.id === activeId
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-gray-200 text-gray-600'
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div className={cn('flex gap-1', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              sizeClasses[size],
              'font-medium rounded-lg flex items-center gap-2 transition-colors',
              tab.id === activeId
                ? 'bg-violet-100 text-violet-700'
                : 'text-gray-600 hover:bg-gray-100',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium',
                tab.id === activeId
                  ? 'bg-violet-200 text-violet-800'
                  : 'bg-gray-100 text-gray-600'
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  // vertical
  return (
    <div className={cn('flex flex-col border-r border-gray-200 gap-0.5', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          disabled={tab.disabled}
          onClick={() => !tab.disabled && onChange(tab.id)}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors text-left',
            tab.id === activeId
              ? 'bg-violet-50 text-violet-700 border-r-2 border-violet-600 rounded-r-none'
              : 'text-gray-600 hover:bg-gray-100',
            tab.disabled && 'opacity-40 cursor-not-allowed'
          )}
        >
          {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
          <span className="flex-1">{tab.label}</span>
          {tab.badge !== undefined && (
            <span className={cn(
              'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium',
              tab.id === activeId
                ? 'bg-violet-100 text-violet-700'
                : 'bg-gray-100 text-gray-600'
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
