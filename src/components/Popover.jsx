import React, { useState, useRef, useEffect } from 'react'

/**
 * Popover — floating panel anchored to a trigger.
 *
 * @param {React.ReactNode} trigger — the element that opens the popover
 * @param {React.ReactNode} content — popover body
 * @param {'top'|'bottom'|'left'|'right'} placement
 * @param {'click'|'hover'} trigger — open mode
 */
export function Popover({ trigger, content, placement = 'bottom', openOn = 'click', style }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const tipPos = (() => {
    const offset = 8
    switch (placement) {
      case 'top':    return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: offset }
      case 'left':   return { right: '100%',  top: 0, marginRight: offset }
      case 'right':  return { left: '100%',   top: 0, marginLeft: offset }
      default:       return { top: '100%',    left: 0, marginTop: offset }
    }
  })()

  const handlers = openOn === 'hover'
    ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
    : { onClick: () => setOpen(o => !o) }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }} {...handlers}>
      {trigger}
      {open && (
        <div style={{
          position: 'absolute', zIndex: 300,
          background: 'var(--surface)', border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-8)', boxShadow: 'var(--shadow-2)',
          minWidth: 200,
          animation: 'sr-rise 150ms var(--ease-standard)',
          ...tipPos,
        }}>
          {content}
        </div>
      )}
    </div>
  )
}
