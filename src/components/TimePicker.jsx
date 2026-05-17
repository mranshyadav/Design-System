import React, { useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

/**
 * TimePicker — column-scroll time selector with 12h/24h mode.
 *
 * @param {string} value — "HH:MM" 24h
 * @param {Function} onChange — (value) => void
 * @param {boolean} use24h — 24-hour mode (default: false)
 */
export function TimePicker({ value = '09:00', onChange, use24h = false, style }) {
  const [rawH, rawM] = value.split(':').map(Number)
  const [hour, setHour] = useState(rawH)
  const [minute, setMinute] = useState(rawM)
  const [meridiem, setMeridiem] = useState(rawH >= 12 ? 'PM' : 'AM')

  const emit = (h, m, mer) => {
    let h24 = h
    if (!use24h) {
      if (mer === 'AM' && h === 12) h24 = 0
      else if (mer === 'PM' && h !== 12) h24 = h + 12
    }
    onChange?.(`${pad(h24)}:${pad(m)}`)
  }

  const hours = use24h ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const displayHour = use24h ? hour : (hour % 12 || 12)

  const colStyle = {
    height: 200, overflow: 'auto', width: 64,
    display: 'flex', flexDirection: 'column',
    scrollSnapType: 'y mandatory',
    scrollbarWidth: 'none',
  }
  const itemStyle = (active) => ({
    flexShrink: 0, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-16)', cursor: 'pointer',
    scrollSnapAlign: 'center',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#fff' : 'var(--fg-2)',
    borderRadius: 'var(--radius-4)',
    fontWeight: active ? 500 : 400,
  })

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-8)', overflow: 'hidden',
      boxShadow: 'var(--shadow-2)', width: 'fit-content',
      ...style,
    }}>
      {/* Display */}
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid var(--border-1)',
        fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)',
        letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1,
      }}>
        {pad(displayHour)}:{pad(minute)}{!use24h && <span style={{ fontSize: 'var(--fs-18)', marginLeft: 6 }}>{meridiem}</span>}
      </div>
      {/* Columns */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Hours */}
        <div style={colStyle}>
          {hours.map(h => (
            <div key={h} style={itemStyle(h === displayHour)} onClick={() => { setHour(h); emit(h, minute, meridiem) }}>
              {pad(h)}
            </div>
          ))}
        </div>
        <div style={{ width: 1, background: 'var(--border-1)', alignSelf: 'stretch' }} />
        {/* Minutes */}
        <div style={colStyle}>
          {minutes.filter(m => m % 5 === 0).map(m => (
            <div key={m} style={itemStyle(m === minute)} onClick={() => { setMinute(m); emit(hour, m, meridiem) }}>
              {pad(m)}
            </div>
          ))}
        </div>
        {/* AM/PM */}
        {!use24h && (
          <>
            <div style={{ width: 1, background: 'var(--border-1)', alignSelf: 'stretch' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, padding: '0 12px' }}>
              {['AM', 'PM'].map(m => (
                <button key={m} onClick={() => { setMeridiem(m); emit(hour, minute, m) }} style={{
                  background: meridiem === m ? 'var(--ink)' : 'transparent',
                  color: meridiem === m ? 'var(--paper)' : 'var(--fg-2)',
                  border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)',
                  padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)',
                  cursor: 'pointer', fontWeight: 500,
                }}>
                  {m}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
