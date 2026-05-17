import React from 'react'

const VARIANTS = {
  neutral: { color: 'var(--fg-2)', borderColor: 'var(--border-1)', background: 'var(--surface)' },
  success: { color: '#1F6B47', borderColor: 'rgba(31,107,71,0.3)', background: 'rgba(31,107,71,0.08)' },
  warning: { color: '#8A5A14', borderColor: 'rgba(138,90,20,0.3)', background: 'rgba(138,90,20,0.08)' },
  danger:  { color: '#9A2222', borderColor: 'rgba(154,34,34,0.3)', background: 'rgba(154,34,34,0.08)' },
  accent:  { color: '#1F3FE0', borderColor: 'rgba(31,63,224,0.3)', background: 'rgba(31,63,224,0.08)' },
  ink:     { color: 'var(--paper)', borderColor: 'var(--ink)', background: 'var(--ink)' },
  outline: { color: 'var(--fg-1)', borderColor: 'var(--border-2)', background: 'transparent' },
}

const SIZES = {
  sm: { fontSize: 10, padding: '2px 6px' },
  md: { fontSize: 11, padding: '3px 8px' },
  lg: { fontSize: 12, padding: '5px 10px' },
}

const DOT_COLORS = { success: '#1F6B47', warning: '#8A5A14', danger: '#9A2222', accent: '#1F3FE0' }

/**
 * Badge — status, semantic, pill, counter variants.
 *
 * @param {'neutral'|'success'|'warning'|'danger'|'accent'|'ink'|'outline'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} pill — rounded-full shape
 * @param {boolean} dot — colored status dot
 */
export function Badge({ variant = 'neutral', size = 'md', pill = false, dot = false, children, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.neutral
  const s = SIZES[size] ?? SIZES.md
  const dotColor = DOT_COLORS[variant]

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-mono)', fontWeight: 500,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      lineHeight: 1.3,
      border: '1px solid',
      borderRadius: pill ? 'var(--radius-full)' : 'var(--radius-2)',
      ...s, ...v, ...style,
    }}>
      {dot && dotColor && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      )}
      {children}
    </span>
  )
}

/**
 * Counter badge — numeric count chip.
 */
export function BadgeCount({ count, variant = 'accent', style }) {
  const bg = variant === 'accent' ? 'var(--accent)' : 'var(--graphite-15)'
  const color = variant === 'accent' ? '#fff' : 'var(--fg-1)'
  const label = typeof count === 'number' && count > 99 ? '99+' : count
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      background: bg, color,
      minWidth: 18, height: 18,
      padding: '0 5px', borderRadius: 9,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 600,
      ...style,
    }}>
      {label}
    </span>
  )
}
