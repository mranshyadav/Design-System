import React, { useState } from 'react'
import { Input, Textarea, Toggle, Button, Badge, Alert } from '../components/index.js'

const NAV = [
  { id: 'profile', label: 'Profile' },
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' },
  { id: 'team', label: 'Team' },
]

const NOTIF_SETTINGS = [
  { id: 'new_order', label: 'New orders', desc: 'Receive a notification when a new order is placed.' },
  { id: 'payment_fail', label: 'Payment failures', desc: 'Get alerted when a payment fails or is declined.' },
  { id: 'weekly_digest', label: 'Weekly digest', desc: 'A summary of your account activity every Monday.' },
  { id: 'security_alerts', label: 'Security alerts', desc: 'Logins from new devices or unusual activity.' },
  { id: 'product_updates', label: 'Product updates', desc: 'New features, releases, and changelog.' },
]

const TEAM = [
  { name: 'Priya Mehta', email: 'priya@sriio.com', role: 'Owner', status: 'active' },
  { name: 'James Osei', email: 'james@sriio.com', role: 'Admin', status: 'active' },
  { name: 'Sara Lin', email: 'sara@sriio.com', role: 'Member', status: 'active' },
  { name: 'Tom Rivera', email: 'tom@sriio.com', role: 'Member', status: 'invited' },
]

function Avatar({ name, size = 40 }) {
  const colors = ['#1F3FE0', '#1F6B47', '#9A5C0A', '#7C2F9A', '#9A2222']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: colors[idx], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.36, fontWeight: 600, flexShrink: 0 }}>
      {name.split(' ').map(p => p[0]).join('').slice(0, 2)}
    </div>
  )
}

function Section({ title, desc, children, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 'var(--fs-16)', fontWeight: 600 }}>{title}</h3>
          {desc && <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-13)', color: 'var(--fg-3)' }}>{desc}</p>}
        </div>
        {action}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)' }}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, desc, children, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '16px 20px', borderBottom: last ? 'none' : '1px solid var(--border-0)', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  )
}

export function SettingsPage() {
  const [tab, setTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({ new_order: true, payment_fail: true, weekly_digest: false, security_alerts: true, product_updates: false })
  const [profile, setProfile] = useState({ name: 'Priya Mehta', email: 'priya@sriio.com', title: 'Founder & CEO', bio: 'Building precision tools for modern infrastructure teams.', timezone: 'Asia/Kolkata' })
  const [twofa, setTwofa] = useState(true)
  const [sessions, setSessions] = useState(true)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden', minHeight: 560 }}>
      {/* Sidebar nav */}
      <div style={{ width: 200, borderRight: '1px solid var(--border-1)', padding: '16px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 12px 12px', fontSize: 'var(--fs-11)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>Settings</div>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            width: '100%', textAlign: 'left', border: 0, padding: '8px 16px',
            background: tab === n.id ? 'var(--bg-3)' : 'transparent',
            color: tab === n.id ? 'var(--fg-1)' : 'var(--fg-2)',
            fontSize: 'var(--fs-14)', fontWeight: tab === n.id ? 500 : 400,
            cursor: 'pointer', borderRadius: 0,
            borderLeft: `2px solid ${tab === n.id ? 'var(--accent)' : 'transparent'}`,
            transition: 'all 120ms var(--ease-standard)',
          }}>{n.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 28, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {saved && <Alert variant="success" title="Changes saved" description="Your settings have been updated successfully." />}

        {tab === 'profile' && (
          <>
            <Section title="Public profile" desc="This information is visible to your team members.">
              <div style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'flex-start', borderBottom: '1px solid var(--border-0)', flexWrap: 'wrap' }}>
                <Avatar name={profile.name} size={64} />
                <div style={{ flex: 1 }}>
                  <Button variant="secondary" size="sm">Upload photo</Button>
                  <p style={{ margin: '6px 0 0', fontSize: 'var(--fs-11)', color: 'var(--fg-3)' }}>JPG, PNG or GIF · Max 2 MB</p>
                </div>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Input label="Full name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                  <Input label="Job title" value={profile.title} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} />
                </div>
                <Input label="Email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                <Textarea label="Bio" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" size="sm" onClick={save}>Save profile</Button>
                </div>
              </div>
            </Section>
          </>
        )}

        {tab === 'notifications' && (
          <Section title="Notifications" desc="Choose which events send you an email.">
            {NOTIF_SETTINGS.map((n, i) => (
              <Row key={n.id} label={n.label} desc={n.desc} last={i === NOTIF_SETTINGS.length - 1}>
                <Toggle checked={notifs[n.id]} onChange={v => setNotifs(s => ({ ...s, [n.id]: v }))} />
              </Row>
            ))}
          </Section>
        )}

        {tab === 'security' && (
          <>
            <Section title="Authentication" desc="Manage how you sign in to your account.">
              <Row label="Two-factor authentication" desc="Add an extra layer of security to your account.">
                <Toggle checked={twofa} onChange={setTwofa} />
              </Row>
              <Row label="Active sessions" desc="Automatically sign out from inactive sessions." last>
                <Toggle checked={sessions} onChange={setSessions} />
              </Row>
            </Section>
            <Section title="Password" desc="Change your account password.">
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Input label="Current password" type="password" placeholder="••••••••" />
                <Input label="New password" type="password" placeholder="••••••••" />
                <Input label="Confirm new password" type="password" placeholder="••••••••" />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" size="sm" onClick={save}>Update password</Button>
                </div>
              </div>
            </Section>
          </>
        )}

        {tab === 'team' && (
          <Section title="Team members" desc="Manage who has access to your workspace." action={<Button variant="primary" size="sm">Invite member</Button>}>
            {TEAM.map((m, i) => (
              <div key={m.email} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < TEAM.length - 1 ? '1px solid var(--border-0)' : 'none' }}>
                <Avatar name={m.name} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-13)', fontWeight: 500 }}>{m.name}</div>
                  <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)' }}>{m.email}</div>
                </div>
                {m.status === 'invited' && <Badge variant="warning" size="sm">Invited</Badge>}
                <span style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-2)', minWidth: 56, textAlign: 'right' }}>{m.role}</span>
                {m.role !== 'Owner' && (
                  <button style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', padding: '4px 10px', fontSize: 'var(--fs-12)', cursor: 'pointer', color: 'var(--danger)' }}>Remove</button>
                )}
              </div>
            ))}
          </Section>
        )}

        {tab === 'billing' && (
          <>
            <Section title="Current plan" desc="You are on the Pro plan.">
              <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 'var(--fs-20)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Pro Plan</div>
                  <div style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-3)', marginTop: 4 }}>$79 / month · Renews June 1, 2026</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="secondary" size="sm">Manage plan</Button>
                  <Button variant="ghost" size="sm">Cancel</Button>
                </div>
              </div>
            </Section>
            <Section title="Payment method" desc="Your card on file.">
              <Row label="Visa ending in 4242" desc="Expires 08 / 2027" last>
                <Button variant="secondary" size="sm">Update</Button>
              </Row>
            </Section>
          </>
        )}

        {(tab === 'account') && (
          <Section title="Account" desc="Manage your organization settings.">
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Input label="Organization name" defaultValue="SRIIO Inc." />
              <Input label="Slug" defaultValue="sriio" prefix={<span style={{ color: 'var(--fg-3)' }}>app.sriio.com/</span>} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" size="sm" onClick={save}>Save</Button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
