import React, { useEffect } from 'react'

/**
 * Modal — dialog overlay with scrim, header, body, footer.
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {string} title
 * @param {string} eyebrow — small mono label above title
 * @param {React.ReactNode} description
 * @param {React.ReactNode} children — modal body
 * @param {React.ReactNode} footer — custom footer; defaults to Cancel + Confirm
 * @param {string} confirmLabel
 * @param {'primary'|'danger'} confirmVariant
 * @param {Function} onConfirm
 */
export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  description,
  children,
  footer,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  onConfirm,
  icon,
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const btnBase = { border: 0, borderRadius: 'var(--radius-4)', padding: '7px 12px', fontSize: 'var(--fs-13)', fontWeight: 500, cursor: 'pointer' }
  const confirmBg = confirmVariant === 'danger' ? 'var(--danger)' : 'var(--ink)'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(14,15,18,0.40)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '12vh',
        animation: 'sr-fade-in 160ms var(--ease-standard)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 460, maxWidth: '90vw',
          background: 'var(--surface)',
          border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-12)',
          boxShadow: 'var(--shadow-3)',
          overflow: 'hidden', position: 'relative',
          animation: 'sr-rise 200ms var(--ease-standard)',
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', right: 12, top: 12,
          background: 'transparent', border: 0, cursor: 'pointer',
          color: 'var(--fg-3)', width: 28, height: 28,
          borderRadius: 'var(--radius-4)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >×</button>

        {/* Header */}
        <div style={{ padding: '18px 20px 0' }}>
          {icon && (
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: confirmVariant === 'danger' ? 'var(--danger-soft)' : 'var(--bg-3)',
              color: confirmVariant === 'danger' ? 'var(--danger)' : 'var(--fg-2)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}>
              {icon}
            </div>
          )}
          {eyebrow && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              — {eyebrow}
            </div>
          )}
          {title && <div style={{ fontSize: 'var(--fs-18)', fontWeight: 600, marginTop: 4 }}>{title}</div>}
          {description && <p style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-2)', marginTop: 8, lineHeight: 1.55, maxWidth: '100%' }}>{description}</p>}
        </div>

        {/* Body */}
        {children && <div style={{ padding: '16px 20px 20px' }}>{children}</div>}

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 20px', borderTop: '1px solid var(--border-1)',
          background: 'var(--bg-3)',
        }}>
          {footer ?? (
            <>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 3, padding: '1px 5px' }}>esc</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={onClose} style={{ ...btnBase, background: 'transparent', color: 'var(--fg-1)', border: '1px solid var(--border-1)' }}>Cancel</button>
                <button onClick={onConfirm} style={{ ...btnBase, background: confirmBg, color: '#fff' }}>{confirmLabel}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
