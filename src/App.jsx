import React, { useState, useEffect } from 'react'
import {
  Badge, BadgeCount,
  Avatar, AvatarStack,
  Button,
  Spinner, Dots, IndeterminateBar, Skeleton,
  Input, Textarea,
  Search,
  Dropdown,
  RadioGroup,
  Checkbox, Toggle,
  Alert,
  ToastProvider, useToast,
  ProgressBar, ProgressSegmented, ProgressCircle,
  EmptyState,
  Tooltip,
  Modal,
  Drawer,
  Popover,
  Tabs,
  Accordion,
  Steps,
  Pagination,
  TopNav, Sidebar, Breadcrumb, BottomTabs,
  Table,
  DatePicker,
  TimePicker,
  FileUploadSingle, FileUploadBulk,
} from './components/index.js'

/* ── Nav structure ──────────────────────────────────────────── */
const NAV_GROUPS = [
  { group: 'Foundations', items: [
    { id: 'badges',   label: 'Badge',   imports: 'Badge, BadgeCount' },
    { id: 'avatars',  label: 'Avatar',  imports: 'Avatar, AvatarStack' },
  ]},
  { group: 'Display', items: [
    { id: 'buttons',  label: 'Button',  imports: 'Button' },
    { id: 'spinners', label: 'Spinner', imports: 'Spinner, Dots, Skeleton' },
  ]},
  { group: 'Forms', items: [
    { id: 'inputs',   label: 'Input',           imports: 'Input, Textarea' },
    { id: 'search',   label: 'Search',          imports: 'Search' },
    { id: 'dropdown', label: 'Dropdown',        imports: 'Dropdown' },
    { id: 'radio',    label: 'Radio Group',     imports: 'RadioGroup' },
    { id: 'checkbox', label: 'Checkbox',        imports: 'Checkbox, Toggle' },
  ]},
  { group: 'Feedback', items: [
    { id: 'alerts',       label: 'Alert',       imports: 'Alert' },
    { id: 'toast',        label: 'Toast',       imports: 'useToast' },
    { id: 'progress',     label: 'Progress',    imports: 'ProgressBar, ProgressCircle' },
    { id: 'empty-state',  label: 'Empty State', imports: 'EmptyState' },
  ]},
  { group: 'Overlay', items: [
    { id: 'tooltip', label: 'Tooltip', imports: 'Tooltip' },
    { id: 'modal',   label: 'Modal',   imports: 'Modal' },
    { id: 'drawer',  label: 'Drawer',  imports: 'Drawer' },
    { id: 'popover', label: 'Popover', imports: 'Popover' },
  ]},
  { group: 'Navigation', items: [
    { id: 'tabs',       label: 'Tabs',       imports: 'Tabs' },
    { id: 'accordion',  label: 'Accordion',  imports: 'Accordion' },
    { id: 'steps',      label: 'Steps',      imports: 'Steps' },
    { id: 'pagination', label: 'Pagination', imports: 'Pagination' },
    { id: 'navigation', label: 'Navigation', imports: 'TopNav, Sidebar, Breadcrumb' },
  ]},
  { group: 'Data', items: [
    { id: 'table', label: 'Table', imports: 'Table' },
  ]},
  { group: 'Pickers', items: [
    { id: 'date-picker',  label: 'Date Picker',  imports: 'DatePicker' },
    { id: 'time-picker',  label: 'Time Picker',  imports: 'TimePicker' },
    { id: 'file-upload',  label: 'File Upload',  imports: 'FileUploadSingle, FileUploadBulk' },
  ]},
]

const ALL_IDS = NAV_GROUPS.flatMap(g => g.items.map(i => i.id))

/* ── Active section tracker ─────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState('badges')
  useEffect(() => {
    const observers = ALL_IDS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-10% 0px -80% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])
  return active
}

/* ── Layout primitives ──────────────────────────────────────── */
function ComponentCard({ id, title, description, imports, children }) {
  return (
    <div id={id} style={{
      background: 'var(--surface)', border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-8)', overflow: 'hidden',
      scrollMarginTop: 68, marginBottom: 20,
    }}>
      <div style={{
        padding: '18px 24px', borderBottom: '1px solid var(--border-1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-15)', fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h2>
          {description && <p style={{ margin: '3px 0 0', fontSize: 'var(--fs-12)', color: 'var(--fg-3)', lineHeight: 1.5 }}>{description}</p>}
        </div>
        {imports && (
          <code style={{
            fontSize: 10, fontFamily: 'var(--font-mono)',
            background: 'var(--bg-3)', border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-4)', padding: '4px 9px',
            color: 'var(--fg-2)', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {`import { ${imports} }`}
          </code>
        )}
      </div>
      <div style={{ padding: '20px 24px' }}>{children}</div>
    </div>
  )
}

function Preview({ children, center = false, column = false, style }) {
  return (
    <div style={{
      background: 'var(--bg-2)', border: '1px solid var(--border-0)',
      borderRadius: 'var(--radius-6)', padding: '24px',
      display: 'flex', flexDirection: column ? 'column' : 'row',
      flexWrap: column ? 'nowrap' : 'wrap', gap: 12,
      alignItems: center ? 'center' : 'flex-start',
      justifyContent: center ? 'center' : 'flex-start',
      ...style,
    }}>
      {children}
    </div>
  )
}

function Label({ children, first }) {
  return (
    <div style={{
      fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
      letterSpacing: '0.07em', color: 'var(--fg-3)',
      marginBottom: 10, marginTop: first ? 0 : 20,
    }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border-1)', margin: '20px 0' }} />
}

/* ── Toast demo ─────────────────────────────────────────────── */
function ToastDemo() {
  const { toast } = useToast()
  return (
    <Preview>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'success', title: 'Pipeline deployed', description: 'orders.normalize · 14:02:11Z' })}>Success</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'error', title: "Couldn't connect", description: 'postgres-primary · timeout after 5 s' })}>Error</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'loading', title: 'Deploying…', description: 'v2.4.0 → v2.4.1 · est. 12 s', duration: 0 })}>Loading</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'info', title: 'Maintenance window', description: 'us-east-1 scheduled Saturday 02:00 UTC' })}>Info</Button>
    </Preview>
  )
}

/* ── Main App ───────────────────────────────────────────────── */
function AppContent() {
  const activeSection = useActiveSection()
  const [navFilter, setNavFilter] = useState('')

  /* interactive state */
  const [modalOpen, setModalOpen]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [radio, setRadio]           = useState('strict')
  const [radioCard, setRadioCard]   = useState('prod')
  const [radioSeg, setRadioSeg]     = useState('weekly')
  const [cb1, setCb1]               = useState(false)
  const [cb2, setCb2]               = useState(true)
  const [toggle1, setToggle1]       = useState(true)
  const [toggle2, setToggle2]       = useState(false)
  const [region, setRegion]         = useState('us-east-1')
  const [tab, setTab]               = useState('overview')
  const [step, setStep]             = useState(1)
  const [page, setPage]             = useState(2)
  const [searchVal, setSearchVal]   = useState('')
  const [navActive, setNavActive]   = useState('pipelines')
  const [date, setDate]             = useState('2026-05-16')
  const [time, setTime]             = useState('09:30')
  const [bulkFiles, setBulkFiles]   = useState([
    { name: 'orders-2026-05.csv', size: 4200000, status: 'done', progress: 100 },
    { name: 'events-raw.jsonl',   size: 820000,  status: 'uploading', progress: 62 },
    { name: 'schema-v3.proto',    size: 14000,   status: 'error' },
  ])
  const [selectedRow, setSelectedRow] = useState('p2')

  const TABLE_COLS = [
    { key: 'name',   label: 'Pipeline', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'schema', label: 'Schema', mono: true },
    { key: 'p95',    label: 'p95', align: 'right', mono: true },
    { key: 'owner',  label: 'Owner' },
  ]
  const TABLE_ROWS = [
    { id: 'p1', name: 'orders.normalize', status: <Badge variant="success" dot>deployed</Badge>,  schema: 'v2.4.1', p95: '12.4 ms', owner: 'data-platform' },
    { id: 'p2', name: 'events.dedupe',    status: <Badge variant="success" dot>deployed</Badge>,  schema: 'v1.0.7', p95: '9.1 ms',  owner: 'data-platform' },
    { id: 'p3', name: 'payments.audit',   status: <Badge variant="warning" dot>throttled</Badge>, schema: 'v3.2.0', p95: '48.6 ms', owner: 'trust-safety' },
    { id: 'p4', name: 'users.enrich',     status: <Badge variant="danger" dot>failed</Badge>,     schema: 'v0.9.2', p95: '—',       owner: 'growth' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredGroups = navFilter.trim()
    ? NAV_GROUPS.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(navFilter.toLowerCase())),
      })).filter(g => g.items.length > 0)
    : NAV_GROUPS

  const totalComponents = 27

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-2)' }}>

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside style={{
        width: 232, flexShrink: 0, position: 'fixed', top: 0, left: 0, bottom: 0,
        background: 'var(--surface)', borderRight: '1px solid var(--border-1)',
        display: 'flex', flexDirection: 'column', zIndex: 30, overflowY: 'auto',
      }}>
        {/* Brand */}
        <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid var(--border-1)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1 }}>SRIIO</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 3, padding: '2px 5px' }}>UI</span>
          </div>
          <input
            value={navFilter}
            onChange={e => setNavFilter(e.target.value)}
            placeholder="Filter components…"
            style={{
              width: '100%', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-5)',
              padding: '6px 10px', fontSize: 'var(--fs-12)', background: 'var(--bg-3)',
              color: 'var(--fg-1)', outline: 'none', boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-1)'}
          />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px 12px', overflowY: 'auto' }}>
          {filteredGroups.map(group => (
            <div key={group.group} style={{ marginBottom: 2 }}>
              <div style={{
                padding: '8px 8px 4px', fontSize: 10, fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', fontWeight: 600,
              }}>
                {group.group}
              </div>
              {group.items.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
                  borderRadius: 'var(--radius-4)', padding: '6px 10px', marginBottom: 1,
                  background: activeSection === item.id ? 'var(--bg-3)' : 'transparent',
                  borderLeft: `2px solid ${activeSection === item.id ? 'var(--accent)' : 'transparent'}`,
                  color: activeSection === item.id ? 'var(--fg-1)' : 'var(--fg-2)',
                  fontSize: 'var(--fs-13)', fontWeight: activeSection === item.id ? 500 : 400,
                  transition: 'all 100ms var(--ease-standard)',
                }}>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            {totalComponents} components
          </div>
          <a
            href="#blocks"
            onClick={() => window.location.reload()}
            style={{ fontSize: 'var(--fs-12)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
          >
            Product Blocks →
          </a>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div style={{ marginLeft: 232, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Sticky header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 20,
          background: 'rgba(244,241,234,0.88)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-1)',
          padding: '0 32px', height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: 'var(--fs-14)', fontWeight: 600 }}>Component Library</h1>
            <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 4, padding: '2px 7px' }}>
              v1.0
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>React + Vite</span>
            <a
              href="https://github.com/mranshyadav/Design-System"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 'var(--fs-12)', fontWeight: 500, color: 'var(--fg-2)', textDecoration: 'none', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)', padding: '4px 12px', background: 'var(--surface)' }}
            >
              GitHub
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: '32px', maxWidth: 940, width: '100%', boxSizing: 'border-box' }}>

          {/* Hero */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 10px' }}>
              SRIIO <em>Design System</em>
            </h2>
            <p style={{ color: 'var(--fg-3)', fontSize: 'var(--fs-14)', margin: 0, maxWidth: 500, lineHeight: 1.6 }}>
              {totalComponents} production-ready React components. Technical, minimal, corporate-trustworthy.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
              {[['27', 'Components'], ['8', 'Categories'], ['100%', 'Inline styles'], ['0', 'Dependencies']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 700, letterSpacing: '-0.02em' }}>{val}</div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ BADGES ══════════════════════════════════════════ */}
          <ComponentCard id="badges" title="Badge" description="Semantic status indicators, version labels, pill variants, and count bubbles." imports="Badge, BadgeCount">
            <Label first>Semantic</Label>
            <Preview>
              <Badge variant="success" dot>deployed</Badge>
              <Badge variant="warning" dot>throttled</Badge>
              <Badge variant="danger" dot>failed</Badge>
              <Badge variant="neutral">queued</Badge>
              <Badge variant="accent">v2.4.1</Badge>
              <Badge variant="ink">ink</Badge>
              <Badge variant="outline">outline</Badge>
            </Preview>

            <Label>Pill & dot styles</Label>
            <Preview>
              <Badge variant="accent" pill>pill accent</Badge>
              <Badge variant="success" pill dot>live</Badge>
              <Badge variant="warning" pill dot>degraded</Badge>
              <Badge variant="danger" pill>critical</Badge>
            </Preview>

            <Label>Sizes</Label>
            <Preview center>
              <Badge variant="success" size="sm">sm</Badge>
              <Badge variant="success" size="md">md</Badge>
              <Badge variant="success" size="lg">lg</Badge>
            </Preview>

            <Label>Count badges</Label>
            <Preview center>
              <BadgeCount count={3} />
              <BadgeCount count={12} />
              <BadgeCount count={100} />
              <BadgeCount count={0} variant="neutral" />
            </Preview>
          </ComponentCard>

          {/* ══ AVATARS ═════════════════════════════════════════ */}
          <ComponentCard id="avatars" title="Avatar" description="User initials with color palette, status indicators, shape variants, and stacked groups." imports="Avatar, AvatarStack">
            <Label first>Sizes</Label>
            <Preview center>
              <Avatar initials="PR" size={24} colorIndex={1} />
              <Avatar initials="JL" size={32} colorIndex={2} />
              <Avatar initials="DM" size={40} colorIndex={0} />
              <Avatar initials="KS" size={56} colorIndex={3} />
            </Preview>

            <Label>Shape & status</Label>
            <Preview center>
              <Avatar initials="PR" size={40} colorIndex={0} />
              <Avatar initials="JL" size={40} colorIndex={1} square />
              <Avatar initials="PR" size={40} colorIndex={0} status="online" />
              <Avatar initials="JL" size={40} colorIndex={1} status="away" />
              <Avatar initials="DM" size={40} colorIndex={2} status="busy" />
            </Preview>

            <Label>Stack</Label>
            <Preview>
              <AvatarStack avatars={[
                { initials: 'PR', colorIndex: 0 }, { initials: 'JL', colorIndex: 1 },
                { initials: 'DM', colorIndex: 4 }, { initials: 'KS', colorIndex: 2 },
                { initials: 'AA', colorIndex: 3 }, { initials: 'RB', colorIndex: 5 },
              ]} max={4} size={32} />
            </Preview>
          </ComponentCard>

          {/* ══ BUTTONS ═════════════════════════════════════════ */}
          <ComponentCard id="buttons" title="Button" description="6 variants, 3 sizes, loading and disabled states." imports="Button">
            <Label first>Variants</Label>
            <Preview>
              <Button variant="primary">Save changes</Button>
              <Button variant="accent">Deploy</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Delete</Button>
              <Button variant="text">Text link</Button>
            </Preview>

            <Label>Sizes</Label>
            <Preview center>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Preview>

            <Label>States</Label>
            <Preview>
              <Button variant="primary" loading>Deploying</Button>
              <Button variant="accent" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Preview>
          </ComponentCard>

          {/* ══ SPINNERS ════════════════════════════════════════ */}
          <ComponentCard id="spinners" title="Spinner" description="Ring spinner, pulsing dots, indeterminate bar, and shimmer skeleton." imports="Spinner, Dots, IndeterminateBar, Skeleton">
            <Label first>Ring</Label>
            <Preview center>
              <Spinner size={16} />
              <Spinner size={24} />
              <Spinner size={40} />
              <Spinner size={24} variant="ink" />
            </Preview>

            <Label>Dots & bar</Label>
            <Preview center>
              <Dots />
              <IndeterminateBar style={{ width: 180 }} />
            </Preview>

            <Label>Skeleton</Label>
            <Preview>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
                <Skeleton width="60%" height={14} />
                <Skeleton width="90%" height={10} />
                <Skeleton width="75%" height={10} />
              </div>
            </Preview>
          </ComponentCard>

          {/* ══ INPUTS ══════════════════════════════════════════ */}
          <ComponentCard id="inputs" title="Input" description="Text input and textarea with label, helper text, prefix/suffix, error, and size variants." imports="Input, Textarea">
            <Preview column style={{ maxWidth: 400 }}>
              <Input label="Pipeline name" placeholder="orders.normalize" />
              <Input label="Region" placeholder="us-east-1" size="sm" />
              <Input label="API key" placeholder="sk-…"
                prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>}
              />
              <Input label="Tags" placeholder="critical, finance" error="Invalid tag format — use comma-separated values." />
              <Textarea label="Notes" placeholder="Pipeline notes…" rows={3} />
            </Preview>
          </ComponentCard>

          {/* ══ SEARCH ══════════════════════════════════════════ */}
          <ComponentCard id="search" title="Search" description="Global search with keyboard shortcut hint, active filter chips, and autocomplete results." imports="Search">
            <Preview column style={{ maxWidth: 460 }}>
              <Search placeholder="Search pipelines, sources, schemas…" kbd="⌘K" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
              <Search
                placeholder="Refine…"
                filters={[{ label: 'region:us-east-1' }, { label: 'status:failed' }]}
                onRemoveFilter={() => {}}
                value=""
              />
              <Search
                placeholder="Search…"
                size="lg"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                results={searchVal ? [
                  { group: 'Pipelines', items: [
                    { label: `${searchVal}.normalize`, meta: 'v2.4.1' },
                    { label: `${searchVal}.audit`, meta: 'v1.1.0' },
                  ]},
                  { group: 'Schemas', items: [
                    { label: `${searchVal.charAt(0).toUpperCase() + searchVal.slice(1)}Event`, meta: 'schema' },
                  ]},
                ] : []}
              />
            </Preview>
          </ComponentCard>

          {/* ══ DROPDOWN ════════════════════════════════════════ */}
          <ComponentCard id="dropdown" title="Dropdown" description="Grouped options, selected state with checkmark, danger items, and keyboard navigation." imports="Dropdown">
            <Preview>
              <div style={{ minWidth: 240 }}>
                <Dropdown
                  value={region}
                  onChange={setRegion}
                  placeholder="Choose a region"
                  options={[
                    { group: 'Americas', items: [
                      { value: 'us-east-1',  label: 'us-east-1',  meta: 'Virginia' },
                      { value: 'us-west-2',  label: 'us-west-2',  meta: 'Oregon' },
                      { value: 'sa-east-1',  label: 'sa-east-1',  meta: 'São Paulo' },
                    ]},
                    { group: 'EMEA', items: [
                      { value: 'eu-west-1',    label: 'eu-west-1',    meta: 'Ireland' },
                      { value: 'eu-central-1', label: 'eu-central-1', meta: 'Frankfurt' },
                    ]},
                    { items: [{ value: 'disconnect', label: 'Disconnect region…', danger: true }] },
                  ]}
                />
              </div>
            </Preview>
          </ComponentCard>

          {/* ══ RADIO ═══════════════════════════════════════════ */}
          <ComponentCard id="radio" title="Radio Group" description="Standard, card-style, and segmented variants with disabled states and descriptions." imports="RadioGroup">
            <Label first>Standard</Label>
            <Preview>
              <div style={{ minWidth: 320 }}>
                <RadioGroup value={radio} onChange={setRadio} options={[
                  { value: 'strict',   label: 'Schema-enforced (strict)', description: 'Reject any payload with extra or missing fields.' },
                  { value: 'flexible', label: 'Schema-flexible (warn)',   description: 'Accept unknown fields, emit a warning.' },
                  { value: 'off',      label: 'Schema-off', description: 'Not available on this plan.', disabled: true },
                ]} />
              </div>
            </Preview>

            <Label>Card style</Label>
            <Preview>
              <div style={{ minWidth: 340, width: '100%' }}>
                <RadioGroup value={radioCard} onChange={setRadioCard} variant="card" options={[
                  { value: 'prod',    label: 'Production', description: 'Versioned schemas, signed payloads, 12-month retention.', price: '$0 / 1M' },
                  { value: 'staging', label: 'Staging',    description: 'Same guarantees, 30-day retention, no SLA.',              price: '$0 / 1M' },
                  { value: 'dev',     label: 'Dev',        description: 'Local-first, no retention. Free.',                         price: 'free' },
                ]} />
              </div>
            </Preview>

            <Label>Segmented</Label>
            <Preview>
              <RadioGroup value={radioSeg} onChange={setRadioSeg} variant="segmented" options={[
                { value: 'daily',   label: 'Daily' },
                { value: 'weekly',  label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]} />
            </Preview>
          </ComponentCard>

          {/* ══ CHECKBOX ════════════════════════════════════════ */}
          <ComponentCard id="checkbox" title="Checkbox & Toggle" description="Off, on, indeterminate, disabled, and error states — plus a sliding toggle switch." imports="Checkbox, Toggle">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <Label first>Checkbox states</Label>
                <Preview column>
                  <Checkbox checked={false}             label="Off" />
                  <Checkbox checked={true}              label="On" />
                  <Checkbox checked="indeterminate"     label="Indeterminate" />
                  <Checkbox checked={true}  disabled    label="Disabled · on" />
                  <Checkbox checked={false}             label="Error state" error="You must accept the terms." />
                  <Checkbox checked={true}              label="With description" description="Adds an HMAC header. ~0.4 ms overhead." />
                </Preview>
              </div>
              <div>
                <Label first>Toggle</Label>
                <Preview column>
                  <Toggle checked={toggle1} onChange={setToggle1} label="Enable schema validation" />
                  <Toggle checked={toggle2} onChange={setToggle2} label="Allow breaking changes" />
                </Preview>
              </div>
            </div>
          </ComponentCard>

          {/* ══ ALERTS ══════════════════════════════════════════ */}
          <ComponentCard id="alerts" title="Alert" description="Info, success, warning, danger, and full-width banner variants with dismiss and action slots." imports="Alert">
            <Preview column>
              <Alert variant="info"    title="Maintenance window" description="us-east-1 will be unavailable Saturday 02:00–03:00 UTC." dismissible />
              <Alert variant="success" title="Pipeline deployed"  description="orders.normalize v2.4.1 is live in us-east-1." meta="14:02:11Z" />
              <Alert variant="warning" title="Schema deprecation" description="orders.v1 will be removed in 30 days. 3 consumers still depend on it."
                action={<a href="#" style={{ color: '#8A5A14', fontWeight: 500, fontSize: 13 }}>View consumers →</a>} />
              <Alert variant="danger"  title="Schema mismatch"
                description={<>Field <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(154,34,34,0.10)', padding: '1px 4px', borderRadius: 2 }}>account_id</code>: expected string, received null. 14 payloads quarantined.</>}
                action={<a href="#" style={{ color: '#9A2222', fontWeight: 500, fontSize: 13 }}>View payload →</a>} />
              <Alert variant="banner"  title="v2.4 is here — typed payloads now generally available."
                description={<>Migrate in under an hour. <a href="#" style={{ color: 'var(--paper)', textDecoration: 'underline' }}>Read the guide</a>.</>} dismissible />
            </Preview>
          </ComponentCard>

          {/* ══ TOAST ═══════════════════════════════════════════ */}
          <ComponentCard id="toast" title="Toast" description="Global notification stack via React context. 4 variants: success, error, loading, info." imports="ToastProvider, useToast">
            <ToastDemo />
          </ComponentCard>

          {/* ══ PROGRESS ════════════════════════════════════════ */}
          <ComponentCard id="progress" title="Progress" description="Bar with label and percentage, segmented step dots, and SVG circular — including indeterminate mode." imports="ProgressBar, ProgressSegmented, ProgressCircle">
            <Label first>Bar — sizes & colors</Label>
            <Preview column style={{ maxWidth: 420 }}>
              <ProgressBar value={62} label="Uploading payload" />
              <ProgressBar value={35} size="sm" />
              <ProgressBar value={88} size="lg" />
              <ProgressBar value={96} color="success" />
              <ProgressBar value={72} color="warning" />
              <ProgressBar value={24} color="danger" />
            </Preview>

            <Label>Segmented & circular</Label>
            <Preview center>
              <ProgressSegmented total={6} filled={4} style={{ width: 180 }} />
              <ProgressCircle value={60} />
              <ProgressCircle value={100} color="success" />
              <ProgressCircle />
            </Preview>
          </ComponentCard>

          {/* ══ EMPTY STATE ═════════════════════════════════════ */}
          <ComponentCard id="empty-state" title="Empty State" description="Icon, eyebrow, title, description, and action slots — with dashed border and danger variants." imports="EmptyState">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <EmptyState
                icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0z"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>}
                eyebrow="No pipelines" title="Nothing's running yet"
                description="Connect a source and SRIIO will start ingesting in under a minute."
                actions={<><Button variant="primary" size="sm">Connect a source</Button><Button variant="secondary" size="sm">Docs</Button></>}
              />
              <EmptyState dashed
                icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>}
                eyebrow="No results" title={<>No match for <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>"users."</code></>}
                description="Try a broader query, or remove a filter."
                actions={<Button variant="secondary" size="sm">Clear filters</Button>}
              />
              <EmptyState variant="danger"
                icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>}
                eyebrow="Disconnected" title="Source unreachable"
                description="Check VPC rules or reissue credentials."
                actions={<Button variant="primary" size="sm">Retry</Button>}
              />
              <EmptyState
                icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                eyebrow="All clear" title="Inbox zero"
                description="No alerts in the last 24 hours."
              />
            </div>
          </ComponentCard>

          {/* ══ TOOLTIP ═════════════════════════════════════════ */}
          <ComponentCard id="tooltip" title="Tooltip" description="4 placements: top, bottom, left, right. Triggered on hover and focus." imports="Tooltip">
            <Preview center>
              <Tooltip placement="top"    content="Top tooltip"><Button variant="secondary" size="sm">Top</Button></Tooltip>
              <Tooltip placement="bottom" content="Bottom tooltip"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
              <Tooltip placement="left"   content="Left tooltip"><Button variant="secondary" size="sm">Left</Button></Tooltip>
              <Tooltip placement="right"  content="Right tooltip"><Button variant="secondary" size="sm">Right</Button></Tooltip>
            </Preview>
          </ComponentCard>

          {/* ══ MODAL ═══════════════════════════════════════════ */}
          <ComponentCard id="modal" title="Modal" description="Centered dialog with scrim, icon, eyebrow, body children, footer actions, and ESC-to-close." imports="Modal">
            <Preview>
              <Button variant="danger" onClick={() => setModalOpen(true)}>Delete pipeline…</Button>
            </Preview>
            <Modal
              open={modalOpen} onClose={() => setModalOpen(false)}
              eyebrow="Destructive · Permanent"
              title={<>Delete <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>orders.normalize</code>?</>}
              description="This will stop ingestion immediately and remove 12 months of audit history."
              confirmLabel="Delete pipeline" confirmVariant="danger" onConfirm={() => setModalOpen(false)}
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-2)' }}>
                  Type <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}>orders.normalize</span> to confirm.
                </span>
                <input style={{ background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)', padding: '8px 10px', fontSize: 'var(--fs-13)', fontFamily: 'var(--font-mono)', color: 'var(--danger)', outline: 'none' }} defaultValue="orders.normalize" />
              </div>
            </Modal>
          </ComponentCard>

          {/* ══ DRAWER ══════════════════════════════════════════ */}
          <ComponentCard id="drawer" title="Drawer" description="Right-edge slide-over panel with eyebrow, title, scrollable body, footer actions, and ESC-to-close." imports="Drawer">
            <Preview>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
            </Preview>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} eyebrow="Edit · Pipeline" title="orders.normalize" onSave={() => setDrawerOpen(false)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Badge variant="success" dot>deployed · v2.4.1</Badge>
                {[['Region', 'us-east-1'], ['Source', 'postgres-primary'], ['Sink', 'warehouse-snowflake'], ['Owner', 'data-platform']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-1)', fontSize: 13 }}>
                    <span style={{ color: 'var(--fg-3)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{v}</span>
                  </div>
                ))}
                <Textarea label="Notes" rows={4} defaultValue="Normalize order events from postgres-primary. Strips PII before warehouse export." />
                <Input label="Tags" defaultValue="critical, finance, pii-clean" />
              </div>
            </Drawer>
          </ComponentCard>

          {/* ══ POPOVER ═════════════════════════════════════════ */}
          <ComponentCard id="popover" title="Popover" description="Floating panel with 4 placements, click or hover open mode, and click-outside dismiss." imports="Popover">
            <Preview>
              <Popover
                trigger={<Button variant="secondary" size="sm">Pipeline actions ▾</Button>}
                content={
                  <div style={{ padding: 4 }}>
                    {['Edit configuration', 'Clone pipeline', 'View audit log', 'Pause ingestion'].map((label, i) => (
                      <div key={i} style={{ padding: '8px 12px', fontSize: 13, borderRadius: 'var(--radius-4)', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >{label}</div>
                    ))}
                    <div style={{ height: 1, background: 'var(--border-1)', margin: '4px 0' }} />
                    <div style={{ padding: '8px 12px', fontSize: 13, borderRadius: 'var(--radius-4)', color: 'var(--danger)', cursor: 'pointer' }}>Delete pipeline…</div>
                  </div>
                }
              />
            </Preview>
          </ComponentCard>

          {/* ══ TABS ════════════════════════════════════════════ */}
          <ComponentCard id="tabs" title="Tabs" description="Underline with badge counts, segmented, pill/filter, and vertical with panel content." imports="Tabs">
            <Label first>Underline (with badge counts)</Label>
            <Preview column>
              <Tabs variant="underline"
                tabs={[
                  { id: 'overview',   label: 'Overview' },
                  { id: 'runs',       label: 'Runs',      badge: 128 },
                  { id: 'schema',     label: 'Schema' },
                  { id: 'consumers',  label: 'Consumers', badge: 3 },
                  { id: 'audit',      label: 'Audit' },
                ]}
                activeId={tab} onChange={setTab}
              />
            </Preview>

            <Label>Segmented</Label>
            <Preview>
              <Tabs variant="segmented" tabs={[{ id: 'json', label: 'JSON' }, { id: 'yaml', label: 'YAML' }, { id: 'proto', label: 'Protobuf' }, { id: 'sdl', label: 'SDL' }]} />
            </Preview>

            <Label>Pill / filter</Label>
            <Preview>
              <Tabs variant="pill" tabs={[{ id: 'all', label: 'All · 8' }, { id: 'healthy', label: 'Healthy · 5' }, { id: 'attn', label: 'Needs attention · 2' }, { id: 'archived', label: 'Archived' }]} />
            </Preview>

            <Label>Vertical</Label>
            <Preview>
              <Tabs variant="vertical"
                tabs={[
                  { id: 'general',  label: 'General',  panel: 'General workspace settings' },
                  { id: 'members',  label: 'Members',  panel: '14 users · 3 admins · invite by email or SAML.' },
                  { id: 'api',      label: 'API keys', panel: 'Manage API credentials' },
                  { id: 'webhooks', label: 'Webhooks', panel: 'Configure outbound webhooks' },
                  { id: 'billing',  label: 'Billing',  panel: 'View and manage billing' },
                ]}
              />
            </Preview>
          </ComponentCard>

          {/* ══ ACCORDION ═══════════════════════════════════════ */}
          <ComponentCard id="accordion" title="Accordion" description="Bordered stacked and flush/editorial FAQ variants, with allowMultiple support." imports="Accordion">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <Label first>Bordered</Label>
                <Accordion variant="bordered" defaultOpen="q1" items={[
                  { id: 'q1', title: 'What is a typed payload?', body: <>A typed payload carries its <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', padding: '1px 5px', borderRadius: 2 }}>schema-id</code> in the header, so consumers reject anything that doesn't match.</> },
                  { id: 'q2', title: 'How is the registry versioned?' },
                  { id: 'q3', title: 'Can I self-host?' },
                  { id: 'q4', title: 'What does p95 latency include?' },
                ]} />
              </div>
              <div>
                <Label first>Flush / editorial</Label>
                <Accordion variant="flush" defaultOpen="faq1" items={[
                  { id: 'faq1', num: '01', title: 'How long does migration take?', body: 'Most teams move their first pipeline in under an hour.' },
                  { id: 'faq2', num: '02', title: 'Do you handle PII redaction?' },
                  { id: 'faq3', num: '03', title: "What's the SLA?" },
                ]} />
              </div>
            </div>
          </ComponentCard>

          {/* ══ STEPS ═══════════════════════════════════════════ */}
          <ComponentCard id="steps" title="Steps" description="Horizontal and vertical orientation. Done, active, and pending states with checkmark on completion." imports="Steps">
            <Label first>Horizontal</Label>
            <Preview column>
              <Steps current={step} steps={[{ label: 'Connect source' }, { label: 'Define schema' }, { label: 'Configure pipeline' }, { label: 'Deploy' }]} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" size="sm" onClick={() => setStep(s => Math.max(0, s - 1))}>← Back</Button>
                <Button variant="primary"   size="sm" onClick={() => setStep(s => Math.min(4, s + 1))}>Next →</Button>
              </div>
            </Preview>

            <Label>Vertical</Label>
            <Preview>
              <Steps orientation="vertical" current={2} steps={[
                { label: 'Connect source',      description: 'postgres-primary · us-east-1' },
                { label: 'Define schema',        description: 'OrdersEvent v2.4.1' },
                { label: 'Configure pipeline',   description: 'In progress…' },
                { label: 'Deploy' },
              ]} />
            </Preview>
          </ComponentCard>

          {/* ══ PAGINATION ══════════════════════════════════════ */}
          <ComponentCard id="pagination" title="Pagination" description="Numbered with ellipsis, summary text variant, and load-more button." imports="Pagination">
            <Preview column>
              <Pagination page={page} total={13} onChange={setPage} />
              <Pagination page={page} total={16} onChange={setPage} summary={`Showing ${(page - 1) * 20 + 1}–${page * 20} of 312 pipelines`} />
              <Pagination variant="load-more" page={1} total={10} onChange={() => {}} />
            </Preview>
          </ComponentCard>

          {/* ══ NAVIGATION ══════════════════════════════════════ */}
          <ComponentCard id="navigation" title="Navigation" description="Sticky TopNav, icon Sidebar with grouped sections, Breadcrumb trail, and mobile BottomTabs." imports="TopNav, Sidebar, Breadcrumb, BottomTabs">
            <Label first>Sidebar + Breadcrumb</Label>
            <Preview style={{ alignItems: 'flex-start', gap: 20, overflowX: 'auto' }}>
              <Sidebar activeId={navActive} onChange={setNavActive}
                header={
                  <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-6)', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                    <span style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--ink)', color: 'var(--paper)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16 }}>A</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>acme-prod</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' }}>WORKSPACE · PRO</div>
                    </div>
                    <span style={{ color: 'var(--fg-3)' }}>⌄</span>
                  </button>
                }
                sections={[
                  { head: 'Workspace', items: [
                    { id: 'pipelines', label: 'Pipelines', icon: '▦', count: 12 },
                    { id: 'sources',   label: 'Sources',   icon: '◇', count: 5 },
                    { id: 'schemas',   label: 'Schemas',   icon: '≡', count: 38 },
                    { id: 'registry',  label: 'Registry',  icon: '◈' },
                    { id: 'audit',     label: 'Audit log', icon: '◉' },
                  ]},
                  { head: 'Develop', items: [
                    { id: 'playground', label: 'Playground', icon: '▷' },
                    { id: 'sdks',       label: 'SDKs',       icon: '{}' },
                    { id: 'webhooks',   label: 'Webhooks',   icon: '↗' },
                  ]},
                ]}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Breadcrumb crumbs={[{ label: 'acme-prod' }, { label: 'pipelines' }, { label: 'orders.normalize' }, { label: 'runs' }]} />
                <BottomTabs
                  tabs={[
                    { id: 'pipelines', label: 'Pipelines', icon: '▦' },
                    { id: 'sources',   label: 'Sources',   icon: '◇' },
                    { id: 'activity',  label: 'Activity',  icon: '⌖' },
                    { id: 'search',    label: 'Search',    icon: '⌕' },
                    { id: 'you',       label: 'You',       icon: '○' },
                  ]}
                  activeId={navActive} onChange={setNavActive}
                  style={{ width: 360 }}
                />
              </div>
            </Preview>
          </ComponentCard>

          {/* ══ TABLE ═══════════════════════════════════════════ */}
          <ComponentCard id="table" title="Table" description="Sortable columns, row selection with accent border, per-row checkboxes, sticky header, and summary footer." imports="Table">
            <div style={{ border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
              <Table
                columns={TABLE_COLS} rows={TABLE_ROWS}
                selectedId={selectedRow} onRowClick={row => setSelectedRow(row.id)}
                summary="4 pipelines · 2 deployed · 1 throttled · 1 failed"
              />
            </div>
          </ComponentCard>

          {/* ══ DATE PICKER ═════════════════════════════════════ */}
          <ComponentCard id="date-picker" title="Date Picker" description="Calendar grid with month navigation, today highlight, and Today shortcut." imports="DatePicker">
            <Preview center>
              <DatePicker value={date} onChange={setDate} />
            </Preview>
          </ComponentCard>

          {/* ══ TIME PICKER ═════════════════════════════════════ */}
          <ComponentCard id="time-picker" title="Time Picker" description="Scrollable hour and minute columns with AM/PM toggle and 12h/24h mode." imports="TimePicker">
            <Preview center>
              <TimePicker value={time} onChange={setTime} />
              <TimePicker value={time} onChange={setTime} use24h />
            </Preview>
          </ComponentCard>

          {/* ══ FILE UPLOAD ═════════════════════════════════════ */}
          <ComponentCard id="file-upload" title="File Upload" description="Single file drag-and-drop with upload states, and multi-file bulk list with per-file status." imports="FileUploadSingle, FileUploadBulk">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <Label first>Single file</Label>
                <FileUploadSingle accept=".csv, .jsonl" />
              </div>
              <div>
                <Label first>Bulk files</Label>
                <FileUploadBulk
                  files={bulkFiles}
                  onAdd={() => {}}
                  onRemove={i => setBulkFiles(f => f.filter((_, idx) => idx !== i))}
                />
              </div>
            </div>
          </ComponentCard>

          <div style={{ height: 64 }} />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
