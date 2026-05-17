import React, { useState } from 'react'

/**
 * Tabs — underline, segmented, pill, and vertical variants.
 *
 * @param {Array<{id: string, label: string, badge?: string|number, panel?: React.ReactNode}>} tabs
 * @param {string} activeId
 * @param {Function} onChange — (id) => void
 * @param {'underline'|'segmented'|'pill'|'vertical'} variant
 */
export function Tabs({ tabs = [], activeId, onChange, variant = 'underline', style }) {
  const [internal, setInternal] = useState(activeId ?? tabs[0]?.id)
  const active = activeId ?? internal
  const setActive = onChange ?? setInternal
  const activeTab = tabs.find(t => t.id === active)

  if (variant === 'segmented') {
    return (
      <div style={style}>
        <div style={{ display: 'inline-flex', padding: 2, background: 'var(--bg-3)', borderRadius: 'var(--radius-6)' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)} style={{
              background: active === tab.id ? 'var(--surface)' : 'transparent',
              border: 0, padding: '7px 14px',
              fontSize: 'var(--fs-13)', fontWeight: 500,
              color: active === tab.id ? 'var(--fg-1)' : 'var(--fg-2)',
              borderRadius: 'var(--radius-4)', cursor: 'pointer',
              boxShadow: active === tab.id ? 'var(--shadow-1)' : 'none',
              transition: 'background 120ms var(--ease-standard)',
            }}>
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab?.panel && <div style={{ marginTop: 12 }}>{activeTab.panel}</div>}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div style={style}>
        <div style={{ display: 'flex', gap: 6 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)} style={{
              background: active === tab.id ? 'rgba(31,63,224,0.08)' : 'transparent',
              border: `1px solid ${active === tab.id ? 'rgba(31,63,224,0.30)' : 'transparent'}`,
              padding: '6px 12px',
              fontSize: 'var(--fs-13)', fontWeight: 500,
              color: active === tab.id ? 'var(--accent)' : 'var(--fg-2)',
              borderRadius: 'var(--radius-full)', cursor: 'pointer',
            }}
            onMouseEnter={e => { if (active !== tab.id) e.currentTarget.style.background = 'var(--bg-3)' }}
            onMouseLeave={e => { if (active !== tab.id) e.currentTarget.style.background = 'transparent' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab?.panel && <div style={{ marginTop: 12 }}>{activeTab.panel}</div>}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, ...style }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)} style={{
              background: active === tab.id ? 'rgba(31,63,224,0.08)' : 'transparent',
              border: 0, textAlign: 'left', padding: '8px 12px',
              borderRadius: 'var(--radius-4)',
              color: active === tab.id ? 'var(--accent)' : 'var(--fg-2)',
              fontSize: 'var(--fs-13)', fontWeight: 500, cursor: 'pointer',
              boxShadow: active === tab.id ? 'inset 2px 0 0 var(--accent)' : 'none',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
            onMouseEnter={e => { if (active !== tab.id) e.currentTarget.style.background = 'var(--bg-3)' }}
            onMouseLeave={e => { if (active !== tab.id) e.currentTarget.style.background = 'transparent' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-6)', padding: 14,
          fontSize: 'var(--fs-13)', color: 'var(--fg-2)',
        }}>
          {activeTab?.panel ?? activeTab?.label}
        </div>
      </div>
    )
  }

  // underline (default)
  return (
    <div style={style}>
      <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--border-1)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)} style={{
            background: 'transparent', border: 0,
            padding: '10px 0', cursor: 'pointer',
            color: active === tab.id ? 'var(--fg-1)' : 'var(--fg-2)',
            fontSize: 'var(--fs-14)', fontWeight: 500,
            borderBottom: `2px solid ${active === tab.id ? 'var(--ink)' : 'transparent'}`,
            marginBottom: -1,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'color 120ms var(--ease-standard)',
          }}>
            {tab.label}
            {tab.badge !== undefined && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                background: active === tab.id ? 'var(--ink)' : 'var(--bg-3)',
                color: active === tab.id ? 'var(--paper)' : 'var(--fg-3)',
                padding: '1px 6px', borderRadius: 9999,
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {activeTab?.panel && <div style={{ paddingTop: 16 }}>{activeTab.panel}</div>}
    </div>
  )
}
