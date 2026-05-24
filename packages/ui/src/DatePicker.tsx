import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from './utils'

export interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  clearable?: boolean
  className?: string
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  minDate,
  maxDate,
  clearable = false,
  className,
}: DatePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())

  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClickOutside])

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  function isDisabled(date: Date): boolean {
    const d = startOfDay(date)
    if (minDate && d < startOfDay(minDate)) return true
    if (maxDate && d > startOfDay(maxDate)) return true
    return false
  }

  function handleDayClick(day: number, month: number, year: number) {
    const date = new Date(year, month, day)
    if (isDisabled(date)) return
    onChange(date)
    setOpen(false)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  // Build calendar grid: prev month trailing days + current month + next month leading days
  const calendarDays: Array<{ day: number; month: number; year: number; currentMonth: boolean }> = []

  // Previous month trailing days
  const prevMonthYear = viewMonth === 0 ? viewYear - 1 : viewYear
  const prevMonthIndex = viewMonth === 0 ? 11 : viewMonth - 1
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonthIndex)
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, month: prevMonthIndex, year: prevMonthYear, currentMonth: false })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, month: viewMonth, year: viewYear, currentMonth: true })
  }

  // Next month leading days
  const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear
  const remaining = 42 - calendarDays.length
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({ day: d, month: nextMonthIndex, year: nextMonthYear, currentMonth: false })
  }

  return (
    <div ref={containerRef} className={cn('relative inline-block w-full', className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-2 w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white transition-colors',
          open ? 'border-violet-400 ring-2 ring-violet-100' : 'hover:border-gray-400'
        )}
      >
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className={cn('flex-1 text-left', value ? 'text-gray-900' : 'text-gray-400')}>
          {value ? formatDate(value) : placeholder}
        </span>
        {clearable && value && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onChange(null) }}
            onKeyDown={(e) => e.key === 'Enter' && (e.stopPropagation(), onChange(null))}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear date"
          >
            ✕
          </span>
        )}
      </button>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 rounded-xl border border-gray-200 bg-white shadow-lg p-4 w-72">
          {/* Month nav */}
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-900">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Next month"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center text-xs text-gray-400 py-1 font-medium">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ day, month, year, currentMonth }, i) => {
              const date = new Date(year, month, day)
              const selected = value ? isSameDay(date, value) : false
              const isToday = isSameDay(date, today)
              const disabled = isDisabled(date)

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDayClick(day, month, year)}
                  disabled={disabled}
                  className={cn(
                    'py-1.5 rounded-lg text-sm text-center transition-colors',
                    selected
                      ? 'bg-violet-600 text-white font-semibold'
                      : disabled
                      ? 'opacity-30 cursor-not-allowed text-gray-400'
                      : !currentMonth
                      ? 'text-gray-300 hover:bg-gray-100'
                      : 'text-gray-700 hover:bg-gray-100',
                    isToday && !selected && 'font-bold'
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
