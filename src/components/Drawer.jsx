import React, { useEffect } from 'react'

/**
 * Drawer — right-edge slide-over panel.
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {string} title
 * @param {string} eyebrow — small mono label above title
 * @param {React.ReactNode} children — drawer body content
 * @param {React.ReactNode} footer — footer slot; defaults to Cancel + Save
 * @param {Function} onSave
 * @param {number} width — drawer width in px
 */
export function Drawer({ open, onClose, title, eyebrow, children, footer, onSave, width = 400 }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const btnBase = {
    border: 0, borderRadius: 'var(--radius-4)',
    padding: '8px 12px', fontSize: 'var(--fs-13)', fontWeight: 500, cursor: 'pointer',
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 800,
        background: 'rgba(14,15,18,0.30)',
        animation: 'sr-fade-in 200ms var(--ease-standard)',
      }}
    >
      <aside
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width, background: 'var(--surface)',
          borderLeft: '1px solid var(--border-1)',
          boxShadow: '-24px 0 48px rgba(14,15,18,0.12)',
          display: 'flex', flexDirection: 'column',
          animation: 'sr-slide-in 200ms var(--ease-standard)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            {eyebrow && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
                — {eyebrow}
              </div>
            )}
            {title && <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>{title}</div>}
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            color: 'var(--fg-3)', width: 28, height: 28,
            borderRadius: 'var(--radius-4)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 20px', flex: 1, overflow: 'auto' }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid var(--border-1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {footer ?? (
            <>
              <button onClick={onClose} style={{ ...btnBase, background: 'var(--surface)', color: 'var(--fg-1)', border: '1px solid var(--border-1)' }}>Cancel</button>
              <button onClick={onSave} style={{ ...btnBase, background: 'var(--ink)', color: 'var(--paper)' }}>Save changes</button>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
