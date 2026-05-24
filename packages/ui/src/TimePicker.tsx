import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from './utils'

export interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  format?: '12h' | '24h'
  minuteStep?: number
  placeholder?: string
  className?: string
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function parseTime(value: string, format: '12h' | '24h'): { hour: number; minute: number; period: 'AM' | 'PM' } {
  const [hStr, mStr] = (value || '').split(':')
  let hour = parseInt(hStr ?? '0', 10) || 0
  const minute = parseInt(mStr ?? '0', 10) || 0

  let period: 'AM' | 'PM' = 'AM'
  if (format === '12h') {
    if (hour >= 12) {
      period = 'PM'
      if (hour > 12) hour -= 12
    } else if (hour === 0) {
      hour = 12
    }
  }

  return { hour, minute, period }
}

function toHHMM(hour: number, minute: number, period: 'AM' | 'PM', format: '12h' | '24h'): string {
  let h = hour
  if (format === '12h') {
    if (period === 'AM') {
      if (hour === 12) h = 0
    } else {
      if (hour !== 12) h = hour + 12
    }
  }
  return `${pad(h)}:${pad(minute)}`
}

function formatDisplay(value: string, format: '12h' | '24h'): string {
  if (!value) return ''
  const { hour, minute, period } = parseTime(value, format)
  if (format === '12h') {
    return `${pad(hour)}:${pad(minute)} ${period}`
  }
  return value
}

export function TimePicker({
  value,
  onChange,
  format = '12h',
  minuteStep = 5,
  placeholder,
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { hour, minute, period } = parseTime(value, format)

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

  function handleHourChange(h: number) {
    onChange(toHHMM(h, minute, period, format))
  }

  function handleMinuteChange(m: number) {
    onChange(toHHMM(hour, m, period, format))
  }

  function handlePeriodChange(p: 'AM' | 'PM') {
    onChange(toHHMM(hour, minute, p, format))
  }

  const hours = format === '12h'
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)

  const minutes: number[] = []
  for (let m = 0; m < 60; m += minuteStep) {
    minutes.push(m)
  }

  const displayValue = value ? formatDisplay(value, format) : ''

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
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className={cn('flex-1 text-left', displayValue ? 'text-gray-900' : 'text-gray-400')}>
          {displayValue || placeholder || (format === '12h' ? 'HH:MM AM/PM' : 'HH:MM')}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="flex divide-x divide-gray-100">
            {/* Hours */}
            <ScrollColumn label="Hour">
              {hours.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => handleHourChange(h)}
                  className={cn(
                    'block w-full py-1.5 text-sm text-center transition-colors',
                    h === hour
                      ? 'bg-violet-50 text-violet-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  {pad(h)}
                </button>
              ))}
            </ScrollColumn>

            {/* Separator label */}
            <div className="flex items-center px-2 text-gray-400 font-bold text-lg self-stretch bg-white">
              :
            </div>

            {/* Minutes */}
            <ScrollColumn label="Min">
              {minutes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMinuteChange(m)}
                  className={cn(
                    'block w-full py-1.5 text-sm text-center transition-colors',
                    m === minute
                      ? 'bg-violet-50 text-violet-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  {pad(m)}
                </button>
              ))}
            </ScrollColumn>

            {/* AM/PM */}
            {format === '12h' && (
              <ScrollColumn label="AM/PM">
                {(['AM', 'PM'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePeriodChange(p)}
                    className={cn(
                      'block w-full py-1.5 text-sm text-center transition-colors',
                      p === period
                        ? 'bg-violet-50 text-violet-700 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    )}
                  >
                    {p}
                  </button>
                ))}
              </ScrollColumn>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ScrollColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-16">
      <div className="text-center text-xs text-gray-400 font-medium py-1.5 border-b border-gray-100 bg-gray-50">
        {label}
      </div>
      <div className="overflow-y-auto h-40">
        {children}
      </div>
    </div>
  )
}
