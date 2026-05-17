import React from 'react'

/**
 * Checkbox — off, on, indeterminate, disabled, error states.
 *
 * @param {boolean|'indeterminate'} checked
 * @param {Function} onChange — (checked) => void
 * @param {string} label
 * @param {string} description
 * @param {boolean} disabled
 * @param {string} error
 */
export function Checkbox({ checked, onChange, label, description, disabled = false, error, style }) {
  const isOn = checked === true
  const isMixed = checked === 'indeterminate'

  return (
    <label style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: '4px 0', fontSize: 'var(--fs-14)',
      opacity: disabled ? 0.45 : 1,
      ...style,
    }}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={e => !disabled && onChange?.(e.target.checked)}
        style={{ display: 'none' }}
      />
      <span style={{
        width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 2,
        border: `1.5px solid ${error ? 'var(--danger)' : (isOn || isMixed) ? 'var(--accent)' : 'var(--border-2)'}`,
        background: (isOn || isMixed) ? 'var(--accent)' : 'var(--surface)',
        position: 'relative',
      }}>
        {isOn && (
          <span style={{
            position: 'absolute', left: 4, top: 0.5, width: 5, height: 9,
            border: 'solid #fff', borderWidth: '0 2px 2px 0',
            transform: 'rotate(45deg)',
          }} />
        )}
        {isMixed && (
          <span style={{
            position: 'absolute', left: 3, right: 3, top: 6,
            height: 2, background: '#fff', borderRadius: 1,
          }} />
        )}
      </span>
      <span>
        <span style={{ color: error ? 'var(--fg-1)' : undefined }}>{label}</span>
        {description && <span style={{ display: 'block', fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginTop: 2 }}>{description}</span>}
        {error && <span style={{ display: 'block', fontSize: 'var(--fs-12)', color: 'var(--danger)', marginTop: 2 }}>{error}</span>}
      </span>
    </label>
  )
}

/**
 * Toggle — switch/toggle variant.
 *
 * @param {boolean} checked
 * @param {Function} onChange
 * @param {string} label
 */
export function Toggle({ checked, onChange, label, disabled = false, style }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: '4px 0', opacity: disabled ? 0.45 : 1,
      ...style,
    }}>
      <input type="checkbox" checked={checked} onChange={e => !disabled && onChange?.(e.target.checked)} style={{ display: 'none' }} />
      <span style={{
        width: 32, height: 18, borderRadius: 9999,
        background: checked ? 'var(--accent)' : 'var(--graphite-15)',
        position: 'relative',
        transition: 'background 120ms var(--ease-standard)',
        flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', top: 2, left: 2,
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--surface)',
          boxShadow: '0 1px 2px rgba(14,15,18,0.2)',
          transform: checked ? 'translateX(14px)' : 'translateX(0)',
          transition: 'transform 120ms var(--ease-standard)',
        }} />
      </span>
      {label && <span style={{ fontSize: 'var(--fs-14)', color: 'var(--fg-1)' }}>{label}</span>}
    </label>
  )
}
