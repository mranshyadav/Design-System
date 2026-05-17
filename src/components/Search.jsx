import React, { useState, useRef } from 'react'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
  </svg>
)

/**
 * FilterChip — dismissable pill inside the search bar.
 */
function FilterChip({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', background: 'var(--accent-soft)',
      color: 'var(--accent)', borderRadius: 'var(--radius-2)',
      fontSize: 'var(--fs-12)', fontFamily: 'var(--font-mono)', fontWeight: 500,
    }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', lineHeight: 1 }}>×</button>
    </span>
  )
}

/**
 * Search — input with filter chips, autocomplete dropdown, and ⌘K hint.
 *
 * @param {'md'|'lg'} size
 * @param {Array<{label: string}>} filters — active filter chips
 * @param {Function} onRemoveFilter
 * @param {Array<{group: string, items: {label: string, meta?: string}[]}>} results — dropdown sections
 * @param {string} kbd — keyboard shortcut label, e.g. "⌘K"
 */
export function Search({
  placeholder = 'Search…',
  size = 'md',
  filters = [],
  onRemoveFilter,
  results,
  kbd,
  value,
  onChange,
  style,
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const h = size === 'lg' ? 44 : 36
  const fs = size === 'lg' ? 'var(--fs-15)' : 'var(--fs-14)'
  const showDropdown = focused && results && results.length > 0

  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface)', border: '1px solid',
        borderColor: focused ? 'var(--accent)' : 'var(--border-1)',
        boxShadow: focused ? '0 0 0 2px var(--accent-ring)' : 'none',
        borderRadius: 'var(--radius-4)', padding: '0 10px', height: h,
        transition: `border-color 120ms var(--ease-standard), box-shadow 120ms var(--ease-standard)`,
      }}>
        <span style={{ color: focused ? 'var(--accent)' : 'var(--fg-3)', display: 'inline-flex', flexShrink: 0 }}>
          <SearchIcon />
        </span>
        {filters.map((f, i) => (
          <FilterChip key={i} label={f.label} onRemove={() => onRemoveFilter?.(i)} />
        ))}
        <input
          value={value}
          onChange={onChange}
          placeholder={filters.length ? 'Refine…' : placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontSize: fs, color: 'var(--fg-1)', height: '100%',
          }}
          {...props}
        />
        {value && (
          <button onClick={() => onChange?.({ target: { value: '' } })} style={{
            background: 'var(--graphite-15)', color: 'var(--paper)', border: 'none',
            borderRadius: '50%', width: 16, height: 16,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, cursor: 'pointer', flexShrink: 0,
          }}>×</button>
        )}
        {kbd && !value && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)',
            background: 'var(--bg-3)', border: '1px solid var(--border-1)',
            borderRadius: 3, padding: '1px 5px', flexShrink: 0,
          }}>{kbd}</span>
        )}
      </div>

      {showDropdown && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: 'var(--surface)', border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-4)', boxShadow: 'var(--shadow-2)',
          zIndex: 50, overflow: 'hidden',
        }}>
          {results.map((section, si) => (
            <div key={si}>
              <div style={{
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--fg-3)',
                borderBottom: '1px solid var(--border-1)',
              }}>
                — {section.group} · {section.items.length}
              </div>
              {section.items.map((item, ii) => (
                <div key={ii} style={{
                  padding: '8px 12px', fontSize: 'var(--fs-13)',
                  display: 'flex', gap: 8, alignItems: 'center',
                  borderBottom: '1px solid var(--border-1)', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(31,63,224,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', flex: 1 }}>{item.label}</span>
                  {item.meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{item.meta}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
