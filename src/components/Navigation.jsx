import React, { useState } from 'react'

/**
 * TopNav — sticky marketing navigation bar.
 *
 * @param {Array<{label, href}>} links
 * @param {React.ReactNode} logo
 * @param {React.ReactNode} actions — right-side slot
 */
export function TopNav({ links = [], logo, actions, style }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(244,241,234,0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-1)',
      ...style,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {logo}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {links.map((l, i) => (
            <a key={i} href={l.href ?? '#'} style={{
              fontSize: 'var(--fs-14)', color: 'var(--fg-2)', padding: '8px 12px',
              borderRadius: 'var(--radius-4)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>
      </div>
    </header>
  )
}

/**
 * Sidebar — product app nav with sections and active state.
 *
 * @param {Array<{head: string, items: {id, label, icon?, count?}[]}>} sections
 * @param {string} activeId
 * @param {Function} onChange — (id) => void
 * @param {React.ReactNode} header — workspace switcher slot
 * @param {React.ReactNode} footer — user profile slot
 */
export function Sidebar({ sections = [], activeId, onChange, header, footer, style }) {
  return (
    <aside style={{
      width: 240, background: 'var(--paper)',
      borderRight: '1px solid var(--border-1)',
      padding: '16px 12px', display: 'flex',
      flexDirection: 'column', gap: 24,
      ...style,
    }}>
      {header}
      <nav style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((sec) => (
          <div key={sec.head}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--fg-3)',
              padding: '0 8px', marginBottom: 6,
            }}>
              — {sec.head}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sec.items.map(item => {
                const active = item.id === activeId
                return (
                  <button key={item.id} onClick={() => onChange?.(item.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    padding: '6px 8px', border: 0, borderRadius: 'var(--radius-4)',
                    background: active ? 'rgba(31,63,224,0.08)' : 'transparent',
                    color: active ? 'var(--accent)' : 'var(--fg-2)',
                    fontSize: 'var(--fs-13)', fontWeight: active ? 500 : 400,
                    textAlign: 'left', cursor: 'pointer',
                    boxShadow: active ? 'inset 2px 0 0 var(--accent)' : 'none',
                    transition: 'background 120ms var(--ease-standard)',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-3)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                  >
                    {item.icon && <span style={{ width: 16, fontFamily: 'var(--font-mono)', fontSize: 14, color: active ? 'var(--accent)' : 'var(--fg-3)', textAlign: 'center' }}>{item.icon}</span>}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.count !== undefined && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: active ? 'var(--accent)' : 'var(--fg-3)' }}>
                        {item.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      {footer}
    </aside>
  )
}

/**
 * Breadcrumb — path-style navigation.
 *
 * @param {Array<{label: string, href?: string}>} crumbs
 */
export function Breadcrumb({ crumbs = [], style }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-14)', ...style }}>
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1
        return (
          <React.Fragment key={i}>
            {last
              ? <span style={{ color: 'var(--fg-1)', fontWeight: 500 }}>{c.label}</span>
              : <a href={c.href ?? '#'} style={{ color: 'var(--fg-3)' }}>{c.label}</a>
            }
            {!last && <span style={{ color: 'var(--graphite-25)', fontFamily: 'var(--font-mono)' }}>/</span>}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

/**
 * BottomTabs — mobile bottom tab bar.
 *
 * @param {Array<{id, label, icon}>} tabs
 * @param {string} activeId
 * @param {Function} onChange
 */
export function BottomTabs({ tabs = [], activeId, onChange, style }) {
  return (
    <nav style={{
      display: 'grid', gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
      background: 'var(--surface)', border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-12)', padding: 6,
      ...style,
    }}>
      {tabs.map(tab => {
        const active = tab.id === activeId
        return (
          <button key={tab.id} onClick={() => onChange?.(tab.id)} style={{
            background: active ? 'rgba(31,63,224,0.08)' : 'transparent',
            border: 0, padding: '8px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: active ? 'var(--accent)' : 'var(--fg-3)',
            fontSize: 11, cursor: 'pointer', borderRadius: 'var(--radius-6)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 1 }}>{tab.icon}</span>
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
