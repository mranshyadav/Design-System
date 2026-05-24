import React, { useState, useRef, useEffect } from 'react'
import { cn } from './utils'

export interface SearchResult {
  id: string
  label: string
  description?: string
}

export interface SearchProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  results?: SearchResult[]
  onSelect?: (result: SearchResult) => void
  kbdHint?: string
  clearable?: boolean
  loading?: boolean
  className?: string
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-gray-400"
    >
      <path
        d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM14 14l-3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="animate-spin text-gray-400"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="28"
        strokeDashoffset="10"
      />
    </svg>
  )
}

export function Search({
  placeholder = 'Search…',
  value,
  onChange,
  results,
  onSelect,
  kbdHint,
  clearable,
  loading,
  className,
}: SearchProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasResults = Array.isArray(results) && results.length > 0

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (hasResults) setOpen(true)
    else setOpen(false)
  }, [hasResults])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result)
    setOpen(false)
  }

  const handleClear = () => {
    onChange('')
    setOpen(false)
    inputRef.current?.focus()
  }

  const showClear = clearable && value.length > 0 && !loading
  const showKbd = kbdHint && !value

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 flex items-center">
          {loading ? <Spinner /> : <SearchIcon />}
        </span>

        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => { if (hasResults) setOpen(true) }}
          className={cn(
            'w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 text-sm outline-none transition-all',
            'focus:border-violet-400 focus:ring-2 focus:ring-violet-500',
            (showClear || showKbd) ? 'pr-16' : 'pr-3',
          )}
          autoComplete="off"
        />

        <span className="pointer-events-none absolute right-3 flex items-center gap-1.5">
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              className="pointer-events-auto flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M1 1l8 8M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          {showKbd && (
            <kbd className="pointer-events-none rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-400 font-sans">
              {kbdHint}
            </kbd>
          )}
        </span>
      </div>

      {open && hasResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <ul role="listbox" className="py-1 max-h-64 overflow-y-auto">
            {results!.map((result) => (
              <li key={result.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(result)
                  }}
                >
                  <span className="text-sm font-medium text-gray-800">{result.label}</span>
                  {result.description && (
                    <span className="text-xs text-gray-400">{result.description}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
