import React, { useState } from 'react'
import { ToastProvider } from './components/index.js'
import { DashboardStats } from './blocks/DashboardStats.jsx'
import { CRUDTable } from './blocks/CRUDTable.jsx'
import { SettingsPage } from './blocks/SettingsPage.jsx'
import { UserManagement } from './blocks/UserManagement.jsx'
import { KanbanBoard } from './blocks/KanbanBoard.jsx'
import { Notifications } from './blocks/Notifications.jsx'
import { PricingTable } from './blocks/PricingTable.jsx'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦', desc: 'KPI metrics & activity feed' },
  { id: 'table', label: 'CRUD Table', icon: '⊟', desc: 'Data table with search & actions' },
  { id: 'kanban', label: 'Kanban Board', icon: '⊞', desc: 'Sprint board with drag & drop' },
  { id: 'users', label: 'User Management', icon: '◎', desc: 'Team members & roles' },
  { id: 'notifications', label: 'Notifications', icon: '⊙', desc: 'Notification center panel' },
  { id: 'settings', label: 'Settings', icon: '⚙', desc: 'Profile, security & billing' },
  { id: 'pricing', label: 'Pricing Table', icon: '◈', desc: 'Plans with feature comparison' },
]

const BLOCKS = {
  dashboard: DashboardStats,
  table: CRUDTable,
  kanban: KanbanBoard,
  users: UserManagement,
  notifications: Notifications,
  settings: SettingsPage,
  pricing: PricingTable,
}

export function BlocksApp() {
  const [active, setActive] = useState('dashboard')
  const Block = BLOCKS[active]

  return (
    <ToastProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-2)' }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, flexShrink: 0, background: 'var(--surface)',
          borderRight: '1px solid var(--border-1)',
          display: 'flex', flexDirection: 'column',
          position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
        }}>
          {/* Brand */}
          <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border-1)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-18)', letterSpacing: '-0.01em' }}>SRIIO</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>Product Blocks</div>
          </div>

          {/* Nav */}
          <nav style={{ padding: '12px 8px', flex: 1 }}>
            {NAV.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{
                width: '100%', textAlign: 'left', border: 0,
                borderRadius: 'var(--radius-6)', padding: '8px 10px',
                marginBottom: 2, cursor: 'pointer',
                background: active === item.id ? 'var(--bg-3)' : 'transparent',
                borderLeft: `2px solid ${active === item.id ? 'var(--accent)' : 'transparent'}`,
                transition: 'all 120ms var(--ease-standard)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: active === item.id ? 'var(--accent)' : 'var(--fg-3)', width: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 'var(--fs-13)', fontWeight: active === item.id ? 500 : 400, color: active === item.id ? 'var(--fg-1)' : 'var(--fg-2)' }}>
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)' }}>
            <a href="#" onClick={() => window.location.reload()} style={{ fontSize: 'var(--fs-12)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              ← Component Library
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Page header */}
          <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-1)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 'var(--fs-18)', fontWeight: 600 }}>
                {NAV.find(n => n.id === active)?.label}
              </h1>
              <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-13)', color: 'var(--fg-3)' }}>
                {NAV.find(n => n.id === active)?.desc}
              </p>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', color: 'var(--fg-3)', background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)', padding: '3px 8px' }}>
              src/blocks/{active === 'dashboard' ? 'DashboardStats' : active === 'table' ? 'CRUDTable' : active === 'users' ? 'UserManagement' : active === 'kanban' ? 'KanbanBoard' : active === 'notifications' ? 'Notifications' : active === 'settings' ? 'SettingsPage' : 'PricingTable'}.jsx
            </div>
          </div>

          {/* Block */}
          <div style={{ padding: 32, flex: 1 }}>
            <Block />
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
