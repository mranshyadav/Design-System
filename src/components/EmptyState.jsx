import React from 'react'

/**
 * EmptyState — centered empty content block with icon, title, description, actions.
 *
 * @param {React.ReactNode} icon — SVG icon element
 * @param {string} eyebrow — small mono label above title
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} actions — button(s) to render below description
 * @param {boolean} dashed — dashed border style (e.g. no results)
 * @param {'default'|'danger'} variant — changes icon bg color
 */
export function EmptyState({ icon, eyebrow, title, description, actions, dashed = false, variant = 'default', style }) {
  const iconBg = variant === 'danger' ? 'rgba(154,34,34,0.10)' : 'var(--bg-3)'
  const iconColor = variant === 'danger' ? '#9A2222' : 'var(--fg-2)'
  const eyebrowColor = variant === 'danger' ? '#9A2222' : 'var(--fg-3)'

  return (
    <div style={{
      background: dashed ? 'transparent' : 'var(--surface)',
      border: `1px ${dashed ? 'dashed' : 'solid'} var(--border-1)`,
      borderRadius: 'var(--radius-8)',
      padding: '32px 24px',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      minHeight: 220, justifyContent: 'center',
      ...style,
    }}>
      {icon && (
        <span style={{
          width: 40, height: 40, borderRadius: 'var(--radius-8)',
          background: iconBg, color: iconColor,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 6,
        }}>
          {icon}
        </span>
      )}
      {eyebrow && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-10)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: eyebrowColor,
        }}>
          — {eyebrow}
        </div>
      )}
      {title && (
        <div style={{ fontSize: 'var(--fs-16)', fontWeight: 600, color: 'var(--fg-1)' }}>
          {title}
        </div>
      )}
      {description && (
        <div style={{
          fontSize: 'var(--fs-13)', color: 'var(--fg-2)',
          maxWidth: 280, lineHeight: 1.5,
        }}>
          {description}
        </div>
      )}
      {actions && (
        <div style={{ display: 'inline-flex', gap: 8, marginTop: 8 }}>
          {actions}
        </div>
      )}
    </div>
  )
}
