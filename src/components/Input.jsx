import React, { useState } from 'react'

const fieldBase = {
  display: 'flex', alignItems: 'center', gap: 8,
  background: 'var(--surface)', border: '1px solid var(--border-1)',
  borderRadius: 'var(--radius-4)', padding: '0 10px',
  transition: `border-color ${120}ms var(--ease-standard), box-shadow ${120}ms var(--ease-standard)`,
}

/**
 * Input — text input with label, helper text, and error state.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label
 * @param {string} helper
 * @param {string} error
 * @param {React.ReactNode} prefix — icon on the left
 * @param {React.ReactNode} suffix — icon on the right
 */
export function Input({
  size = 'md',
  label,
  helper,
  error,
  prefix,
  suffix,
  style,
  inputStyle,
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const h = size === 'sm' ? 32 : size === 'lg' ? 44 : 36
  const fs = size === 'lg' ? 'var(--fs-15)' : 'var(--fs-14)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-2)' }}>
          {label}
        </label>
      )}
      <div style={{
        ...fieldBase, height: h,
        borderColor: error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--border-1)',
        boxShadow: focused && !error ? '0 0 0 2px var(--accent-ring)' : 'none',
      }}>
        {prefix && <span style={{ color: 'var(--fg-3)', display: 'inline-flex', flexShrink: 0 }}>{prefix}</span>}
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontSize: fs, color: 'var(--fg-1)', height: '100%',
            ...inputStyle,
          }}
          {...props}
        />
        {suffix && <span style={{ color: 'var(--fg-3)', display: 'inline-flex', flexShrink: 0 }}>{suffix}</span>}
      </div>
      {(helper || error) && (
        <span style={{
          fontSize: 'var(--fs-12)', fontFamily: 'var(--font-mono)',
          color: error ? 'var(--danger)' : 'var(--fg-3)',
        }}>
          {error ?? helper}
        </span>
      )}
    </div>
  )
}

/**
 * Textarea — multiline text input.
 */
export function Textarea({ label, helper, error, rows = 4, style, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-2)' }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', background: 'var(--bg-3)',
          border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--border-1)'}`,
          boxShadow: focused && !error ? '0 0 0 2px var(--accent-ring)' : 'none',
          borderRadius: 'var(--radius-4)', padding: '8px 10px',
          fontSize: 'var(--fs-13)', fontFamily: 'var(--font-mono)',
          color: 'var(--fg-1)', resize: 'vertical', outline: 'none',
          transition: `border-color ${120}ms var(--ease-standard)`,
        }}
        {...props}
      />
      {(helper || error) && (
        <span style={{ fontSize: 'var(--fs-12)', fontFamily: 'var(--font-mono)', color: error ? 'var(--danger)' : 'var(--fg-3)' }}>
          {error ?? helper}
        </span>
      )}
    </div>
  )
}
