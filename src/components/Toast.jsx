import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { Spinner } from './Spinner.jsx'

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
    </svg>
  ),
}

const ICON_COLORS = { success: '#1F6B47', error: '#9A2222', info: 'var(--accent)', loading: undefined }

const ToastCtx = createContext(null)

/**
 * ToastProvider — wrap your app to enable toasts.
 * useToast() gives you { toast }
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  const toast = useCallback(({ variant = 'success', title, description, action, duration = 4000 }) => {
    const id = ++idRef.current
    setToasts(t => [...t, { id, variant, title, description, action }])
    if (duration && variant !== 'loading') {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }, [dismiss])

  return (
    <ToastCtx.Provider value={{ toast, dismiss }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 16, right: 16,
        display: 'flex', flexDirection: 'column', gap: 10,
        width: 340, zIndex: 9999,
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

function ToastItem({ variant, title, description, action, onDismiss }) {
  const iconColor = ICON_COLORS[variant]
  const isLoading = variant === 'loading'

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '18px 1fr auto',
      gap: 12, alignItems: 'flex-start',
      padding: '12px 14px', borderRadius: 'var(--radius-6)',
      background: 'var(--surface)', border: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-2)', fontSize: 'var(--fs-13)', lineHeight: 1.5,
      animation: 'sr-rise 200ms var(--ease-standard)',
      position: 'relative', overflow: 'hidden',
    }}>
      <span style={{ color: iconColor, display: 'inline-flex', paddingTop: 1 }}>
        {isLoading ? <Spinner size={18} variant="accent" /> : ICONS[variant]}
      </span>
      <div>
        <div style={{ fontWeight: 500, color: 'var(--fg-1)' }}>{title}</div>
        {description && (
          <div style={{ color: 'var(--fg-2)', marginTop: 2, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            {description}
          </div>
        )}
        {action && <div style={{ marginTop: 4 }}>{action}</div>}
      </div>
      <button onClick={onDismiss} style={{
        background: 'transparent', border: 0, cursor: 'pointer',
        color: 'var(--fg-3)', fontSize: 16, lineHeight: 1, padding: 0,
      }}>×</button>
    </div>
  )
}
