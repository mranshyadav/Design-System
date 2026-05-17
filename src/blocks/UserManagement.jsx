import React, { useState } from 'react'
import { Badge, Button, Input, Dropdown, Modal } from '../components/index.js'

const ROLES = ['Owner', 'Admin', 'Member', 'Viewer']
const ROLE_COLORS = { Owner: 'ink', Admin: 'accent', Member: 'neutral', Viewer: 'neutral' }

const initialUsers = [
  { id: 1, name: 'Priya Mehta', email: 'priya@sriio.com', role: 'Owner', status: 'active', joined: 'Jan 12, 2024', lastSeen: '2 min ago' },
  { id: 2, name: 'James Osei', email: 'james@sriio.com', role: 'Admin', status: 'active', joined: 'Feb 3, 2024', lastSeen: '1 hr ago' },
  { id: 3, name: 'Sara Lin', email: 'sara@sriio.com', role: 'Member', status: 'active', joined: 'Feb 18, 2024', lastSeen: '3 hr ago' },
  { id: 4, name: 'Tom Rivera', email: 'tom@sriio.com', role: 'Member', status: 'invited', joined: '—', lastSeen: '—' },
  { id: 5, name: 'Aiko Tanaka', email: 'aiko@sriio.com', role: 'Viewer', status: 'active', joined: 'Mar 5, 2024', lastSeen: 'Yesterday' },
  { id: 6, name: 'Ethan Brooks', email: 'ethan@sriio.com', role: 'Member', status: 'inactive', joined: 'Mar 20, 2024', lastSeen: '2 weeks ago' },
]

function Avatar({ name, size = 36 }) {
  const colors = ['#1F3FE0', '#1F6B47', '#9A5C0A', '#7C2F9A', '#9A2222']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: colors[idx], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.36, fontWeight: 600, flexShrink: 0 }}>
      {name.split(' ').map(p => p[0]).join('').slice(0, 2)}
    </div>
  )
}

const StatusDot = ({ status }) => {
  const colors = { active: '#1F6B47', invited: '#9A5C0A', inactive: 'var(--fg-3)' }
  return <span style={{ width: 7, height: 7, borderRadius: '50%', background: colors[status] ?? 'var(--fg-3)', display: 'inline-block', marginRight: 5 }} />
}

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [removeId, setRemoveId] = useState(null)
  const [invite, setInvite] = useState({ email: '', role: 'Member' })

  const filtered = users.filter(u =>
    (roleFilter === 'all' || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  )

  const changeRole = (id, role) => setUsers(us => us.map(u => u.id === id ? { ...u, role } : u))
  const confirmRemove = () => { setUsers(us => us.filter(u => u.id !== removeId)); setRemoveId(null) }
  const sendInvite = () => {
    setUsers(us => [...us, { id: Date.now(), name: invite.email.split('@')[0], email: invite.email, role: invite.role, status: 'invited', joined: '—', lastSeen: '—' }])
    setInviteOpen(false)
    setInvite({ email: '', role: 'Member' })
  }

  const roleOptions = [{ label: 'All roles', value: 'all' }, ...ROLES.map(r => ({ label: r, value: r }))]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-18)', fontWeight: 600 }}>Team members</h2>
          <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-13)', color: 'var(--fg-3)' }}>{users.length} members · {users.filter(u => u.status === 'active').length} active</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setInviteOpen(true)}>Invite member</Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Input placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} size="sm" />
        </div>
        <Dropdown
          trigger={<Button variant="secondary" size="sm">{roleOptions.find(o => o.value === roleFilter)?.label} ▾</Button>}
          items={roleOptions.map(o => ({ label: o.label, onClick: () => setRoleFilter(o.value) }))}
        />
      </div>

      {/* User list */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
        {/* List header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 12, padding: '10px 20px', background: 'var(--bg-3)', borderBottom: '1px solid var(--border-1)' }}>
          {['User', 'Role', 'Status', 'Last seen', ''].map((h, i) => (
            <div key={i} style={{ fontSize: 'var(--fs-11)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>{h}</div>
          ))}
        </div>

        {filtered.map((user, i) => (
          <div key={user.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            alignItems: 'center', gap: 12, padding: '14px 20px',
            borderBottom: i < filtered.length - 1 ? '1px solid var(--border-0)' : 'none',
            transition: 'background 120ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <Avatar name={user.name} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
              </div>
            </div>

            {/* Role */}
            <div>
              {user.role === 'Owner' ? (
                <Badge variant="ink" size="sm">Owner</Badge>
              ) : (
                <Dropdown
                  trigger={<button style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', padding: '3px 8px', fontSize: 'var(--fs-12)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--fg-1)' }}>{user.role} ▾</button>}
                  items={ROLES.filter(r => r !== 'Owner').map(r => ({ label: r, onClick: () => changeRole(user.id, r) }))}
                />
              )}
            </div>

            {/* Status */}
            <div style={{ fontSize: 'var(--fs-13)' }}>
              <StatusDot status={user.status} />
              <span style={{ color: 'var(--fg-2)', textTransform: 'capitalize' }}>{user.status}</span>
            </div>

            {/* Last seen */}
            <div style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{user.lastSeen}</div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6 }}>
              {user.status === 'invited' && (
                <button style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', padding: '4px 10px', fontSize: 'var(--fs-12)', cursor: 'pointer', color: 'var(--accent)' }}>Resend</button>
              )}
              {user.role !== 'Owner' && (
                <button onClick={() => setRemoveId(user.id)} style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', padding: '4px 10px', fontSize: 'var(--fs-12)', cursor: 'pointer', color: 'var(--danger)' }}>Remove</button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--fg-3)', fontSize: 'var(--fs-14)' }}>No members found</div>
        )}
      </div>

      {/* Invite modal */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite team member"
        description="They'll receive an email with a link to join your workspace."
        confirmLabel="Send invite"
        onConfirm={sendInvite}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
          <Input label="Email address" type="email" placeholder="colleague@company.com" value={invite.email} onChange={e => setInvite(i => ({ ...i, email: e.target.value }))} />
          <div>
            <div style={{ fontSize: 'var(--fs-12)', fontWeight: 500, marginBottom: 6, color: 'var(--fg-2)' }}>Role</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ROLES.filter(r => r !== 'Owner').map(r => (
                <button key={r} onClick={() => setInvite(i => ({ ...i, role: r }))} style={{
                  border: `1px solid ${invite.role === r ? 'var(--accent)' : 'var(--border-1)'}`,
                  background: invite.role === r ? 'rgba(31,63,224,0.06)' : 'transparent',
                  color: invite.role === r ? 'var(--accent)' : 'var(--fg-2)',
                  borderRadius: 'var(--radius-4)', padding: '6px 14px',
                  fontSize: 'var(--fs-13)', cursor: 'pointer', fontWeight: invite.role === r ? 500 : 400,
                  transition: 'all 120ms var(--ease-standard)',
                }}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Remove confirm */}
      <Modal
        open={removeId !== null}
        onClose={() => setRemoveId(null)}
        title="Remove member"
        description="This member will lose access to your workspace immediately."
        confirmLabel="Remove"
        confirmVariant="danger"
        onConfirm={confirmRemove}
      />
    </div>
  )
}
