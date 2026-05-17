import React from 'react'

/**
 * Spinner — rotating ring in multiple sizes and color variants.
 *
 * @param {number} size — px (14 | 16 | 24 | 40)
 * @param {'accent'|'ink'|'light'} variant
 */
export function Spinner({ size = 16, variant = 'accent', style }) {
  const border = size <= 16 ? 2 : size <= 24 ? 2.5 : 3

  const colors = {
    accent: { track: 'var(--border-2)', head: 'var(--accent)' },
    ink:    { track: 'var(--graphite-15)', head: 'var(--ink)' },
    light:  { track: 'rgba(244,241,234,0.35)', head: 'var(--paper)' },
  }
  const { track, head } = colors[variant] ?? colors.accent

  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      border: `${border}px solid ${track}`,
      borderTopColor: head,
      animation: 'sr-spin 800ms linear infinite',
      display: 'inline-block', flexShrink: 0,
      ...style,
    }} />
  )
}

/**
 * Dots — three pulsing dots for inline working indicators.
 */
export function Dots({ style }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4, ...style }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--fg-3)',
          animation: `sr-pulse 1.2s var(--ease-standard) infinite`,
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
    </span>
  )
}

/**
 * ProgressBar (indeterminate) — thin sliding bar for header loading.
 */
export function IndeterminateBar({ style }) {
  return (
    <div style={{
      width: '100%', height: 2,
      background: 'var(--graphite-08)',
      overflow: 'hidden', position: 'relative',
      borderRadius: 1, ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0, width: '40%',
        background: 'var(--accent)',
        animation: 'sr-progress-slide 1.6s var(--ease-standard) infinite',
      }} />
    </div>
  )
}

/**
 * Skeleton — shimmer loading placeholder.
 */
export function Skeleton({ width, height = 12, borderRadius = 4, style }) {
  return (
    <div style={{
      width, height, borderRadius,
      background: 'linear-gradient(90deg, var(--graphite-04) 0%, var(--graphite-08) 50%, var(--graphite-04) 100%)',
      backgroundSize: '200% 100%',
      animation: 'sr-shimmer 1.4s ease-in-out infinite',
      ...style,
    }} />
  )
}
