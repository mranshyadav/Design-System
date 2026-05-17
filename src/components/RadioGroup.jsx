import React from 'react'

/**
 * RadioGroup — standard, card-style, and segmented variants.
 *
 * @param {string} value — selected value
 * @param {Function} onChange — (value) => void
 * @param {Array<{value, label, description?, price?, disabled?}>} options
 * @param {'standard'|'card'|'segmented'} variant
 */
export function RadioGroup({ value, onChange, options = [], variant = 'standard', style }) {
  if (variant === 'segmented') {
    return (
      <div style={{
        display: 'inline-flex', padding: 2,
        background: 'var(--bg-3)', borderRadius: 'var(--radius-6)',
        ...style,
      }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => !opt.disabled && onChange?.(opt.value)} style={{
            background: value === opt.value ? 'var(--surface)' : 'transparent',
            border: 0, padding: '6px 14px',
            fontSize: 'var(--fs-13)', fontWeight: 500,
            color: value === opt.value ? 'var(--fg-1)' : 'var(--fg-2)',
            borderRadius: 'var(--radius-4)', cursor: opt.disabled ? 'not-allowed' : 'pointer',
            boxShadow: value === opt.value ? 'var(--shadow-1)' : 'none',
            opacity: opt.disabled ? 0.45 : 1,
            transition: 'background 120ms var(--ease-standard)',
          }}>
            {opt.label}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
        {options.map(opt => {
          const selected = value === opt.value
          return (
            <label key={opt.value} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14,
              background: selected ? 'rgba(31,63,224,0.03)' : 'var(--surface)',
              border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-1)'}`,
              boxShadow: selected ? 'inset 0 0 0 1px var(--accent)' : 'none',
              borderRadius: 'var(--radius-6)',
              cursor: opt.disabled ? 'not-allowed' : 'pointer',
              opacity: opt.disabled ? 0.45 : 1,
              transition: 'border-color 120ms var(--ease-standard)',
            }}>
              <input type="radio" checked={selected} onChange={() => !opt.disabled && onChange?.(opt.value)} style={{ display: 'none' }} />
              <span style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border-2)'}`,
                position: 'relative',
              }}>
                {selected && <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--accent)' }} />}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500 }}>{opt.label}</div>
                {opt.description && <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-2)', marginTop: 4 }}>{opt.description}</div>}
              </div>
              {opt.price && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)' }}>{opt.price}</div>}
            </label>
          )
        })}
      </div>
    )
  }

  // standard
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      {options.map(opt => {
        const selected = value === opt.value
        return (
          <label key={opt.value} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            cursor: opt.disabled ? 'not-allowed' : 'pointer',
            padding: '4px 0', fontSize: 'var(--fs-14)',
            opacity: opt.disabled ? 0.45 : 1,
          }}>
            <input type="radio" checked={selected} onChange={() => !opt.disabled && onChange?.(opt.value)} style={{ display: 'none' }} />
            <span style={{
              width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2,
              border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border-2)'}`,
              background: 'var(--surface)', position: 'relative',
            }}>
              {selected && <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--accent)' }} />}
            </span>
            <span>
              {opt.label}
              {opt.description && <span style={{ display: 'block', fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginTop: 2 }}>{opt.description}</span>}
            </span>
          </label>
        )
      })}
    </div>
  )
}
