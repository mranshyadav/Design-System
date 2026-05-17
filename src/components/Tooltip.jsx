import React, { useState, useRef } from 'react'

/**
 * Tooltip — hover tooltip with 4 placement options.
 *
 * @param {'top'|'bottom'|'left'|'right'} placement
 * @param {React.ReactNode} content — tooltip text or rich content
 * @param {React.ReactNode} children — trigger element
 */
export function Tooltip({ placement = 'top', content, children, style }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const show = () => setVisible(true)
  const hide = () => setVisible(false)

  const offset = 8
  const tipStyle = (() => {
    switch (placement) {
      case 'top':    return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: offset }
      case 'bottom': return { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop: offset }
      case 'left':   return { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight: offset }
      case 'right':  return { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft: offset }
      default:       return {}
    }
  })()

  return (
    <span
      ref={ref}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute', zIndex: 200,
          background: 'var(--ink)', color: 'var(--paper)',
          fontSize: 'var(--fs-12)', lineHeight: 1.4,
          padding: '5px 9px', borderRadius: 'var(--radius-4)',
          whiteSpace: 'nowrap', pointerEvents: 'none',
          boxShadow: 'var(--shadow-2)',
          animation: 'sr-fade-in 100ms var(--ease-standard)',
          ...tipStyle,
        }}>
          {content}
        </div>
      )}
    </span>
  )
}
