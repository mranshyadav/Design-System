import React, { useState, useRef, useEffect } from 'react'

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

/**
 * Dropdown — select with grouped options, search-friendly.
 *
 * @param {string} value — selected value
 * @param {Function} onChange — (value) => void
 * @param {string} placeholder
 * @param {Array<{group?: string, items: {value: string, label: string, meta?: string, danger?: boolean}[]}>} options
 */
export function Dropdown({ value, onChange, placeholder = 'Choose…', options = [], style }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const allItems = options.flatMap(o => o.items ?? [o])
  const selected = allItems.find(i => i.value === value)

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border-1)'}`,
          boxShadow: open ? '0 0 0 2px var(--accent-ring)' : 'none',
          borderRadius: 'var(--radius-4)', padding: '0 10px', height: 36,
          fontSize: 'var(--fs-14)', color: 'var(--fg-1)',
          justifyContent: 'space-between', width: '100%',
          transition: 'border-color 120ms var(--ease-standard)',
        }}
      >
        {selected
          ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)' }}>{selected.label}</span>
          : <span style={{ color: 'var(--fg-3)' }}>{placeholder}</span>
        }
        <span style={{ color: open ? 'var(--accent)' : 'var(--fg-3)', display: 'inline-flex' }}>
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: 'var(--surface)', border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-6)', boxShadow: 'var(--shadow-2)',
          padding: 4, zIndex: 100, minWidth: 220,
          animation: 'sr-rise 160ms var(--ease-standard)',
        }}>
          {options.map((section, si) => {
            const hasGroup = !!section.group
            const items = hasGroup ? section.items : [section]
            return (
              <div key={si}>
                {hasGroup && (
                  <div style={{
                    padding: '6px 10px',
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--fg-3)',
                  }}>— {section.group}</div>
                )}
                {items.map((item, ii) => (
                  <button key={ii} onClick={() => { onChange?.(item.value); setOpen(false) }} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '7px 10px', border: 0,
                    background: 'transparent',
                    color: item.danger ? 'var(--danger)' : 'var(--fg-1)',
                    borderRadius: 'var(--radius-4)', fontSize: 'var(--fs-13)', cursor: 'pointer',
                    fontWeight: item.value === value ? 500 : 400,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = item.danger ? 'rgba(154,34,34,0.08)' : 'rgba(31,63,224,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ width: 14, color: 'var(--accent)' }}>
                      {item.value === value && <CheckIcon />}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', flex: 1 }}>{item.label}</span>
                    {item.meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginLeft: 'auto' }}>{item.meta}</span>}
                  </button>
                ))}
                {si < options.length - 1 && (
                  <div style={{ height: 1, background: 'var(--border-1)', margin: '4px -4px' }} />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
