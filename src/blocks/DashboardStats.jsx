import React, { useState } from 'react'
import { Badge } from '../components/index.js'

const metrics = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, sub: 'vs last month' },
  { label: 'Active Users', value: '3,842', change: '+8.2%', up: true, sub: 'vs last month' },
  { label: 'New Orders', value: '1,209', change: '-3.1%', up: false, sub: 'vs last month' },
  { label: 'Conversion Rate', value: '4.63%', change: '+0.4%', up: true, sub: 'vs last month' },
]

const activity = [
  { user: 'Priya Mehta', action: 'placed a new order', time: '2 min ago', amount: '$320.00' },
  { user: 'James Osei', action: 'upgraded to Pro plan', time: '14 min ago', amount: '$79.00' },
  { user: 'Sara Lin', action: 'submitted a refund request', time: '1 hr ago', amount: '-$45.00' },
  { user: 'Tom Rivera', action: 'placed a new order', time: '2 hr ago', amount: '$128.50' },
  { user: 'Aiko Tanaka', action: 'cancelled subscription', time: '3 hr ago', amount: '$0.00' },
  { user: 'Ethan Brooks', action: 'placed a new order', time: '5 hr ago', amount: '$540.00' },
]

const topProducts = [
  { name: 'Pro Plan — Annual', sales: 284, revenue: '$22,432', pct: 82 },
  { name: 'Starter Plan — Monthly', sales: 193, revenue: '$9,650', pct: 60 },
  { name: 'Enterprise Add-on', sales: 41, revenue: '$8,200', pct: 48 },
  { name: 'One-time Setup Fee', sales: 38, revenue: '$3,800', pct: 28 },
]

const ArrowUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
const ArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

function Avatar({ name, size = 32 }) {
  const colors = ['#1F3FE0','#1F6B47','#9A5C0A','#7C2F9A','#9A2222']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: colors[idx], color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
    }}>
      {name.split(' ').map(p => p[0]).join('').slice(0, 2)}
    </div>
  )
}

export function DashboardStats() {
  const [period, setPeriod] = useState('30d')
  const periods = [{ v: '7d', l: '7 days' }, { v: '30d', l: '30 days' }, { v: '90d', l: '90 days' }]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 'var(--fs-20)', fontWeight: 600, margin: 0 }}>Overview</h2>
          <p style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-3)', margin: '2px 0 0' }}>Your business performance at a glance</p>
        </div>
        <div style={{ display: 'flex', background: 'var(--bg-3)', borderRadius: 'var(--radius-6)', padding: 3, gap: 2 }}>
          {periods.map(p => (
            <button key={p.v} onClick={() => setPeriod(p.v)} style={{
              border: 0, borderRadius: 'var(--radius-4)', padding: '5px 12px',
              fontSize: 'var(--fs-12)', fontWeight: 500, cursor: 'pointer',
              background: period === p.v ? 'var(--surface)' : 'transparent',
              color: period === p.v ? 'var(--fg-1)' : 'var(--fg-3)',
              boxShadow: period === p.v ? 'var(--shadow-1)' : 'none',
              transition: 'all 120ms var(--ease-standard)',
            }}>{p.l}</button>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {metrics.map(m => (
          <div key={m.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-8)', padding: '20px 20px 18px',
          }}>
            <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {m.label}
            </div>
            <div style={{ fontSize: 'var(--fs-28)', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              {m.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: m.up ? '#1F6B47' : 'var(--danger)', fontSize: 'var(--fs-12)', fontWeight: 600 }}>
                {m.up ? <ArrowUp /> : <ArrowDown />} {m.change}
              </span>
              <span style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)' }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Recent activity */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-14)', fontWeight: 600 }}>Recent Activity</span>
            <button style={{ border: 0, background: 'transparent', fontSize: 'var(--fs-12)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}>View all</button>
          </div>
          {activity.map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
              borderBottom: i < activity.length - 1 ? '1px solid var(--border-0)' : 'none',
            }}>
              <Avatar name={a.user} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-13)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.user} <span style={{ fontWeight: 400, color: 'var(--fg-2)' }}>{a.action}</span>
                </div>
                <div style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', marginTop: 2 }}>{a.time}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-12)', color: a.amount.startsWith('-') ? 'var(--danger)' : 'var(--fg-1)', fontWeight: 500, flexShrink: 0 }}>
                {a.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Top products */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-1)' }}>
            <span style={{ fontSize: 'var(--fs-14)', fontWeight: 600 }}>Top Products</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {topProducts.map((p, i) => (
              <div key={i} style={{ padding: '10px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-1)' }}>{p.name}</span>
                  <span style={{ fontSize: 'var(--fs-12)', fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{p.revenue}</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 99, transition: 'width 600ms var(--ease-standard)' }} />
                </div>
                <div style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', marginTop: 4 }}>{p.sales} sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
