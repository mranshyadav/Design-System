import React, { useState } from 'react'
import { Badge, Button, Tabs } from '../components/index.js'

const ALL_NOTIFS = [
  { id: 1, type: 'order', title: 'New order received', desc: 'Acme Corp placed an order for $3,400.', time: '2 min ago', read: false },
  { id: 2, type: 'alert', title: 'Payment failed', desc: 'Bluewave Inc — card ending 4242 was declined.', time: '18 min ago', read: false },
  { id: 3, type: 'team', title: 'Tom Rivera accepted your invite', desc: 'Tom joined the workspace as a Member.', time: '1 hr ago', read: false },
  { id: 4, type: 'system', title: 'Scheduled maintenance', desc: 'The platform will be down May 20, 02:00–04:00 UTC.', time: '3 hr ago', read: true },
  { id: 5, type: 'order', title: 'Subscription renewed', desc: 'Nexgen AI — Enterprise plan renewed for $9,600.', time: '5 hr ago', read: true },
  { id: 6, type: 'alert', title: 'Unusual login detected', desc: 'Sign-in from a new device in Mumbai, India.', time: 'Yesterday', read: true },
  { id: 7, type: 'team', title: 'Sara Lin updated your role', desc: 'Your role was changed from Viewer to Member.', time: 'Yesterday', read: true },
  { id: 8, type: 'system', title: 'Export ready', desc: 'Your data export from May 15 is ready to download.', time: '2 days ago', read: true },
]

const TYPE_ICONS = {
  order: { bg: 'rgba(31,107,71,0.1)', color: '#1F6B47', icon: '↗' },
  alert: { bg: 'rgba(154,34,34,0.1)', color: 'var(--danger)', icon: '!' },
  team: { bg: 'rgba(31,63,224,0.1)', color: 'var(--accent)', icon: '◎' },
  system: { bg: 'rgba(100,100,100,0.1)', color: 'var(--fg-3)', icon: '⚙' },
}

export function Notifications() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS)
  const [tab, setTab] = useState('all')

  const filtered = tab === 'unread' ? notifs.filter(n => !n.read) : notifs
  const unreadCount = notifs.filter(n => !n.read).length

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))
  const dismiss = (id) => setNotifs(ns => ns.filter(n => n.id !== id))

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden', maxWidth: 560 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 'var(--fs-16)', fontWeight: 600 }}>Notifications</span>
          {unreadCount > 0 && <Badge variant="accent" size="sm">{unreadCount} new</Badge>}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ border: 0, background: 'transparent', fontSize: 'var(--fs-12)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}>
            Mark all read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-1)', padding: '0 20px', display: 'flex', gap: 0 }}>
        {[{ id: 'all', label: 'All' }, { id: 'unread', label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            border: 0, background: 'transparent', padding: '10px 0', marginRight: 20,
            fontSize: 'var(--fs-13)', fontWeight: tab === t.id ? 500 : 400,
            color: tab === t.id ? 'var(--fg-1)' : 'var(--fg-3)',
            borderBottom: `2px solid ${tab === t.id ? 'var(--ink)' : 'transparent'}`,
            cursor: 'pointer', transition: 'all 120ms var(--ease-standard)',
          }}>{t.label}</button>
        ))}
      </div>

      {/* List */}
      <div>
        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--fg-3)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500 }}>All caught up</div>
            <div style={{ fontSize: 'var(--fs-13)', marginTop: 4 }}>No unread notifications</div>
          </div>
        )}
        {filtered.map((n, i) => {
          const icon = TYPE_ICONS[n.type]
          return (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{
                display: 'flex', gap: 12, padding: '14px 20px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border-0)' : 'none',
                background: !n.read ? 'rgba(31,63,224,0.03)' : 'transparent',
                borderLeft: `3px solid ${!n.read ? 'var(--accent)' : 'transparent'}`,
                cursor: n.read ? 'default' : 'pointer',
                transition: 'background 120ms',
              }}
            >
              {/* Icon */}
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: icon.bg, color: icon.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                {icon.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontSize: 'var(--fs-13)', fontWeight: n.read ? 400 : 600, color: 'var(--fg-1)' }}>{n.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{n.time}</span>
                    <button onClick={(e) => { e.stopPropagation(); dismiss(n.id) }} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--fg-3)', fontSize: 16, lineHeight: 1, padding: 0, opacity: 0.6 }}>×</button>
                  </div>
                </div>
                <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginTop: 2, lineHeight: 1.5 }}>{n.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-1)', textAlign: 'center' }}>
          <button style={{ border: 0, background: 'transparent', fontSize: 'var(--fs-12)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}>
            View all notifications
          </button>
        </div>
      )}
    </div>
  )
}
