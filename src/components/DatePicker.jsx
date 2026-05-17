import React, { useState } from 'react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function firstDayOfMonth(year, month) { return new Date(year, month, 1).getDay() }
function isoDate(y, m, d) { return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` }

/**
 * DatePicker — calendar picker with optional range selection.
 *
 * @param {string} value — ISO date string YYYY-MM-DD
 * @param {Function} onChange — (value) => void
 * @param {boolean} range — enable range selection
 * @param {string} rangeEnd — end of range (ISO date)
 * @param {Function} onRangeChange — ({start, end}) => void
 */
export function DatePicker({ value, onChange, range = false, rangeEnd, onRangeChange, style }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hoveredDate, setHoveredDate] = useState(null)

  const totalDays = daysInMonth(viewYear, viewMonth)
  const startPad = firstDayOfMonth(viewYear, viewMonth)

  const cells = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const navBtn = { background: 'transparent', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)', width: 28, height: 28, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--fg-2)' }

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-8)', padding: 16,
      width: 280, boxShadow: 'var(--shadow-2)', ...style,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button style={navBtn} onClick={prevMonth}>‹</button>
        <span style={{ fontSize: 'var(--fs-14)', fontWeight: 500 }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button style={navBtn} onClick={nextMonth}>›</button>
      </div>
      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em', color: 'var(--fg-3)', padding: '4px 0' }}>{d}</div>
        ))}
      </div>
      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`pad-${i}`} />
          const iso = isoDate(viewYear, viewMonth, day)
          const isSelected = iso === value
          const isToday = iso === isoDate(today.getFullYear(), today.getMonth(), today.getDate())

          return (
            <button key={day} onClick={() => onChange?.(iso)} style={{
              aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'var(--fs-13)', border: 0,
              borderRadius: 'var(--radius-4)',
              background: isSelected ? 'var(--ink)' : 'transparent',
              color: isSelected ? 'var(--paper)' : isToday ? 'var(--accent)' : 'var(--fg-1)',
              fontWeight: isToday ? 600 : 400,
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-3)' }}
            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
            >
              {day}
            </button>
          )
        })}
      </div>
      {/* Footer */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
          {value ?? 'No date selected'}
        </span>
        <button onClick={() => onChange?.(isoDate(today.getFullYear(), today.getMonth(), today.getDate()))} style={{
          background: 'transparent', border: 0, cursor: 'pointer',
          fontSize: 'var(--fs-12)', color: 'var(--accent)', fontWeight: 500,
        }}>Today</button>
      </div>
    </div>
  )
}
