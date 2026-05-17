import React, { useState } from 'react'
import { Spinner } from './Spinner.jsx'

const BASE = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  fontFamily: 'var(--font-sans)', fontWeight: 500,
  borderRadius: 'var(--radius-4)', border: '1px solid transparent',
  cursor: 'pointer', lineHeight: 1.2, letterSpacing: '-0.005em',
  transition: `background ${120}ms var(--ease-standard), border-color ${120}ms var(--ease-standard)`,
}

const SIZES = {
  sm: { fontSize: 13, padding: '6px 10px' },
  md: { fontSize: 14, padding: '8px 14px' },
  lg: { fontSize: 15, padding: '10px 18px' },
}

const VARIANTS = {
  primary:   { background: 'var(--ink)',     color: 'var(--surface)', borderColor: 'transparent' },
  accent:    { background: 'var(--accent)',  color: 'var(--surface)', borderColor: 'transparent' },
  secondary: { background: 'var(--surface)', color: 'var(--fg-1)',    borderColor: 'var(--border-1)' },
  ghost:     { background: 'transparent',    color: 'var(--fg-1)',    borderColor: 'var(--border-1)' },
  text:      { background: 'transparent',    color: 'var(--fg-1)',    borderColor: 'transparent', padding: '8px 4px' },
  danger:    { background: 'var(--surface)', color: 'var(--danger)',  borderColor: 'rgba(154,34,34,0.3)' },
}

const HOVER_BG = {
  primary:   'var(--graphite-85)',
  accent:    'var(--accent-hover)',
  secondary: 'var(--bg-3)',
  ghost:     'var(--bg-3)',
  text:      'transparent',
  danger:    'rgba(154,34,34,0.06)',
}

/**
 * Button — primary, accent, secondary, ghost, text, danger variants.
 * Supports size sm|md|lg, loading state, and disabled.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}) {
  const [hovered, setHovered] = useState(false)
  const v = VARIANTS[variant] ?? VARIANTS.primary
  const s = SIZES[size] ?? SIZES.md
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...BASE, ...s, ...v,
        ...(hovered && !isDisabled ? { background: HOVER_BG[variant] } : {}),
        ...(isDisabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}),
        ...style,
      }}
      {...props}
    >
      {loading && <Spinner size={14} variant={variant === 'primary' || variant === 'accent' ? 'light' : 'ink'} />}
      {children}
    </button>
  )
}
