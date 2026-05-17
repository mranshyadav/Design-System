import React, { useState } from 'react'

const ICONS = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
    </svg>
  ),
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <path d="M12 9v4M12 17h.01"/>
    </svg>
  ),
  danger: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
    </svg>
  ),
  banner: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
}

const STYLES = {
  info:    { bg: 'var(--surface)', border: 'var(--border-1)', icon: 'var(--fg-2)', link: 'var(--accent)' },
  success: { bg: 'rgba(31,107,71,0.08)', border: 'rgba(31,107,71,0.30)', icon: '#1F6B47', link: '#1F6B47' },
  warning: { bg: 'rgba(138,90,20,0.08)', border: 'rgba(138,90,20,0.30)', icon: '#8A5A14', link: '#8A5A14' },
  danger:  { bg: 'rgba(154,34,34,0.08)', border: 'rgba(154,34,34,0.30)', icon: '#9A2222', link: '#9A2222' },
  banner:  { bg: 'var(--ink)', border: 'var(--ink)', icon: 'var(--paper)', link: 'var(--paper)' },
}

/**
 * Alert — info, success, warning, danger, banner variants.
 * Supports title, description, actions, and dismissal.
 *
 * @param {'info'|'success'|'warning'|'danger'|'banner'} variant
 * @param {string} title
 * @param {React.ReactNode} description
 * @param {React.ReactNode} action — link/button slot
 * @param {string} meta — timestamp etc (info/success)
 * @param {boolean} dismissible
 */
export function Alert({ variant = 'info', title, description, action, meta, dismissible = false, style }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const s = STYLES[variant] ?? STYLES.info
  const isBanner = variant === 'banner'
  const textColor = isBanner ? 'var(--paper)' : 'var(--fg-1)'
  const descColor = isBanner ? 'var(--graphite-25)' : 'var(--fg-2)'

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '18px 1fr auto',
      gap: 12, alignItems: 'flex-start',
      padding: '12px 14px', borderRadius: 'var(--radius-6)',
      border: `1px solid ${s.border}`, background: s.bg,
      fontSize: 'var(--fs-13)', lineHeight: 1.5,
      ...style,
    }}>
      <span style={{ color: s.icon, display: 'inline-flex', paddingTop: 1 }}>
        {ICONS[variant]}
      </span>
      <div>
        {title && <div style={{ fontWeight: 500, color: textColor }}>{title}</div>}
        {description && <div style={{ color: descColor, marginTop: title ? 2 : 0 }}>{description}</div>}
        {action && <div style={{ marginTop: 6 }}>{action}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: descColor, letterSpacing: '0.04em' }}>{meta}</span>}
        {dismissible && (
          <button onClick={() => setDismissed(true)} style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            color: isBanner ? 'var(--paper)' : 'var(--fg-3)', opacity: 0.65,
            fontSize: 16, lineHeight: 1, padding: 0,
          }}>×</button>
        )}
      </div>
    </div>
  )
}
