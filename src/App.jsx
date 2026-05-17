import React, { useState } from 'react'
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

/* ── tiny layout helpers ─────────────────────────────────── */
const Section = ({ title, children }) => (
  <section style={{ marginBottom: 64 }}>
    <h2 style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 24, marginTop: 0,
    }}>
      — {title}
    </h2>
    {children}
  </section>
)

const Row = ({ label, children, wrap = true }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-3)', paddingTop: 4 }}>{label}</span>
    <div style={{ display: 'flex', flexWrap: wrap ? 'wrap' : 'nowrap', gap: 8, alignItems: 'flex-start' }}>{children}</div>
  </div>
)

/* ── Toast trigger button ─────────────────────────────────── */
function ToastButtons() {
  const { toast } = useToast()
  return (
    <Row label="Toasts">
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'success', title: 'Pipeline deployed', description: 'orders.normalize · 14:02:11Z', action: <a href="#" style={{ color: 'var(--accent)', fontWeight: 500 }}>View →</a> })}>Success</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'error', title: "Couldn't connect to source", description: 'postgres-primary · timeout after 5 s', action: <a href="#" style={{ color: 'var(--danger)', fontWeight: 500 }}>Retry</a> })}>Error</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'loading', title: 'Deploying orders.normalize…', description: 'v2.4.0 → v2.4.1 · est. 12 s', duration: 0 })}>Loading</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'info', title: 'Maintenance window', description: 'us-east-1 scheduled Saturday 02:00 UTC' })}>Info</Button>
    </Row>
  )
}

/* ── Main app ─────────────────────────────────────────────── */
function AppContent() {
  /* badge */
  /* modal */
  const [modalOpen, setModalOpen] = useState(false)
  /* drawer */
  const [drawerOpen, setDrawerOpen] = useState(false)
  /* radio */
  const [radio, setRadio] = useState('strict')
  const [radioCard, setRadioCard] = useState('prod')
  const [radioSeg, setRadioSeg] = useState('weekly')
  /* checkbox */
  const [cb1, setCb1] = useState(false)
  const [cb2, setCb2] = useState(true)
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  /* dropdown */
  const [region, setRegion] = useState('us-east-1')
  /* tabs */
  const [tab, setTab] = useState('overview')
  /* steps */
  const [step, setStep] = useState(1)
  /* pagination */
  const [page, setPage] = useState(2)
  /* search */
  const [searchVal, setSearchVal] = useState('')
  /* sidebar nav */
  const [navActive, setNavActive] = useState('pipelines')
  /* date */
  const [date, setDate] = useState('2026-05-16')
  /* time */
  const [time, setTime] = useState('09:30')
  /* file upload */
  const [bulkFiles, setBulkFiles] = useState([
    { name: 'orders-2026-05.csv', size: 4200000, status: 'done', progress: 100 },
    { name: 'events-raw.jsonl', size: 820000, status: 'uploading', progress: 62 },
    { name: 'schema-v3.proto', size: 14000, status: 'error' },
  ])

  /* table data */
  const TABLE_COLS = [
    { key: 'name', label: 'Pipeline', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'schema', label: 'Schema', mono: true },
    { key: 'p95', label: 'p95', align: 'right', mono: true },
    { key: 'owner', label: 'Owner' },
  ]
  const TABLE_ROWS = [
    { id: 'p1', name: 'orders.normalize', status: <Badge variant="success" dot>deployed</Badge>, schema: 'v2.4.1', p95: '12.4 ms', owner: 'data-platform' },
    { id: 'p2', name: 'events.dedupe', status: <Badge variant="success" dot>deployed</Badge>, schema: 'v1.0.7', p95: '9.1 ms', owner: 'data-platform' },
    { id: 'p3', name: 'payments.audit', status: <Badge variant="warning" dot>throttled</Badge>, schema: 'v3.2.0', p95: '48.6 ms', owner: 'trust-safety' },
    { id: 'p4', name: 'users.enrich', status: <Badge variant="danger" dot>failed</Badge>, schema: 'v0.9.2', p95: '—', owner: 'growth' },
  ]
  const [selectedRow, setSelectedRow] = useState('p2')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top nav */}
      <TopNav
        links={[
          { label: 'Platform' }, { label: 'Schemas' }, { label: 'Docs' },
          { label: 'Pricing' }, { label: 'Changelog' },
        ]}
        logo={<span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, letterSpacing: '-0.02em' }}>SRIIO</span>}
        actions={<>
          <Button variant="text" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">Start free →</Button>
        </>}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8, marginTop: 0 }}>
          SRIIO <em>Component Library</em>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, marginBottom: 64, flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--fg-2)', fontSize: 'var(--fs-16)', margin: 0, maxWidth: 560 }}>
            25+ production-ready React components built on the SRIIO design system — technical, minimal, and corporate-trustworthy.
          </p>
          <a href="#blocks" onClick={() => window.location.reload()} style={{ flexShrink: 0, border: '1px solid var(--border-1)', borderRadius: 'var(--radius-6)', padding: '8px 16px', fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none', background: 'var(--surface)', whiteSpace: 'nowrap' }}>
            View Product Blocks →
          </a>
        </div>

        {/* ── Badges ─────────────────────────────────── */}
        <Section title="Badges">
          <Row label="Semantic">
            <Badge variant="success" dot>deployed</Badge>
            <Badge variant="warning" dot>throttled</Badge>
            <Badge variant="danger" dot>failed</Badge>
            <Badge variant="neutral">queued</Badge>
            <Badge variant="accent">v2.4.1</Badge>
          </Row>
          <Row label="Styles">
            <Badge variant="ink">ink solid</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="accent" pill>pill</Badge>
            <Badge variant="success" pill dot>live</Badge>
          </Row>
          <Row label="Sizes">
            <Badge variant="success" size="sm">sm</Badge>
            <Badge variant="success" size="md">md</Badge>
            <Badge variant="success" size="lg">lg</Badge>
          </Row>
          <Row label="Counters">
            <BadgeCount count={3} />
            <BadgeCount count={12} />
            <BadgeCount count={100} />
            <BadgeCount count={0} variant="neutral" />
          </Row>
        </Section>

        {/* ── Avatars ─────────────────────────────────── */}
        <Section title="Avatars">
          <Row label="Sizes">
            <Avatar initials="PR" size={24} colorIndex={1} />
            <Avatar initials="JL" size={32} colorIndex={2} />
            <Avatar initials="DM" size={40} colorIndex={0} />
            <Avatar initials="KS" size={56} colorIndex={3} />
          </Row>
          <Row label="Shapes">
            <Avatar initials="PR" size={40} colorIndex={0} />
            <Avatar initials="JL" size={40} colorIndex={1} square />
          </Row>
          <Row label="Status">
            <Avatar initials="PR" size={40} colorIndex={0} status="online" />
            <Avatar initials="JL" size={40} colorIndex={1} status="away" />
            <Avatar initials="DM" size={40} colorIndex={2} status="busy" />
          </Row>
          <Row label="Stack">
            <AvatarStack avatars={[
              { initials: 'PR', colorIndex: 0 }, { initials: 'JL', colorIndex: 1 },
              { initials: 'DM', colorIndex: 4 }, { initials: 'KS', colorIndex: 2 },
              { initials: 'AA', colorIndex: 3 }, { initials: 'RB', colorIndex: 5 },
            ]} max={4} size={32} />
          </Row>
        </Section>

        {/* ── Buttons ─────────────────────────────────── */}
        <Section title="Buttons">
          <Row label="Variants">
            <Button variant="primary">Save changes</Button>
            <Button variant="accent">Deploy</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete source</Button>
          </Row>
          <Row label="Sizes">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button variant="primary" loading>Deploying</Button>
            <Button variant="accent" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </Row>
        </Section>

        {/* ── Spinners ─────────────────────────────────── */}
        <Section title="Spinners & loading">
          <Row label="Ring sizes">
            <Spinner size={16} />
            <Spinner size={24} />
            <Spinner size={40} />
            <Spinner size={24} variant="ink" />
          </Row>
          <Row label="Dots">
            <Dots />
          </Row>
          <Row label="Bar">
            <IndeterminateBar style={{ width: 200 }} />
          </Row>
          <Row label="Skeleton" wrap={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
              <Skeleton width="60%" height={14} />
              <Skeleton width="90%" height={10} />
              <Skeleton width="75%" height={10} />
            </div>
          </Row>
        </Section>

        {/* ── Inputs ─────────────────────────────────── */}
        <Section title="Inputs">
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Pipeline name" placeholder="orders.normalize" />
            <Input label="Region" placeholder="us-east-1" size="sm" />
            <Input label="API key" placeholder="sk-…" size="lg"
              prefix={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>}
            />
            <Input label="Tags" placeholder="critical, finance" error="Invalid tag format — use comma-separated values." />
            <Textarea label="Notes" placeholder="Pipeline notes…" rows={3} />
          </div>
        </Section>

        {/* ── Search ─────────────────────────────────── */}
        <Section title="Search">
          <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                { group: 'Pipelines', items: [{ label: `${searchVal}.normalize`, meta: 'v2.4.1' }, { label: `${searchVal}.audit`, meta: 'v1.1.0' }] },
                { group: 'Schemas', items: [{ label: `${searchVal.charAt(0).toUpperCase() + searchVal.slice(1)}Event`, meta: 'schema' }] },
              ] : []}
            />
          </div>
        </Section>

        {/* ── Dropdown ─────────────────────────────────── */}
        <Section title="Dropdown / select">
          <div style={{ maxWidth: 280 }}>
            <Dropdown
              value={region}
              onChange={setRegion}
              placeholder="Choose a region"
              options={[
                { group: 'Americas', items: [
                  { value: 'us-east-1', label: 'us-east-1', meta: 'Virginia' },
                  { value: 'us-west-2', label: 'us-west-2', meta: 'Oregon' },
                  { value: 'sa-east-1', label: 'sa-east-1', meta: 'São Paulo' },
                ]},
                { group: 'EMEA', items: [
                  { value: 'eu-west-1', label: 'eu-west-1', meta: 'Ireland' },
                  { value: 'eu-central-1', label: 'eu-central-1', meta: 'Frankfurt' },
                ]},
                { items: [{ value: 'disconnect', label: 'Disconnect region…', danger: true }] },
              ]}
            />
          </div>
        </Section>

        {/* ── Radio ─────────────────────────────────── */}
        <Section title="Radio">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <div style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Standard</div>
              <RadioGroup value={radio} onChange={setRadio} options={[
                { value: 'strict', label: 'Schema-enforced (strict)', description: 'Reject any payload with extra or missing fields.' },
                { value: 'flexible', label: 'Schema-flexible (warn)', description: 'Accept unknown fields, emit a warning.' },
                { value: 'off', label: 'Schema-off', description: 'Not available on this plan.', disabled: true },
              ]} />
              <div style={{ marginTop: 20, fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Segmented</div>
              <RadioGroup value={radioSeg} onChange={setRadioSeg} variant="segmented" options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Card style</div>
              <RadioGroup value={radioCard} onChange={setRadioCard} variant="card" options={[
                { value: 'prod', label: 'Production', description: 'Versioned schemas, signed payloads, 12-month retention.', price: '$0 / 1M' },
                { value: 'staging', label: 'Staging', description: 'Same guarantees, 30-day retention, no SLA.', price: '$0 / 1M' },
                { value: 'dev', label: 'Dev', description: 'Local-first, no retention. Free.', price: 'free' },
              ]} />
            </div>
          </div>
        </Section>

        {/* ── Checkbox & Toggle ─────────────────────────────────── */}
        <Section title="Checkbox & toggle">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Checkbox checked={false} label="Off" />
              <Checkbox checked={true} onChange={setCb2} label="On" />
              <Checkbox checked="indeterminate" label="Indeterminate" />
              <Checkbox checked={true} disabled label="Disabled · on" />
              <Checkbox checked={false} label="Error state" error="You must accept the terms." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Toggle checked={toggle1} onChange={setToggle1} label="Enable schema validation" />
              <Toggle checked={toggle2} onChange={setToggle2} label="Allow breaking changes" />
              <div style={{ marginTop: 8 }}>
                <Checkbox checked={true} label="Sign every payload" description="Adds an HMAC header. ~0.4 ms overhead." />
                <Checkbox checked={false} label="Email me on failure" description="Sends to priya@northwind.dev." />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Alerts ─────────────────────────────────── */}
        <Section title="Alerts">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 640 }}>
            <Alert variant="info" title="Maintenance window" description="us-east-1 will be unavailable Saturday 02:00–03:00 UTC for registry upgrade." dismissible />
            <Alert variant="success" title="Pipeline deployed" description="orders.normalize v2.4.1 is live in us-east-1." meta="14:02:11Z" />
            <Alert variant="warning" title="Schema deprecation" description="orders.v1 will be removed in 30 days. 3 consumers still depend on it."
              action={<a href="#" style={{ color: '#8A5A14', fontWeight: 500, fontSize: 13 }}>View consumers →</a>} />
            <Alert variant="danger" title="Schema mismatch" description={<>Field <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(154,34,34,0.10)', padding: '1px 4px', borderRadius: 2 }}>account_id</code>: expected string, received null. 14 payloads quarantined.</>}
              action={<a href="#" style={{ color: '#9A2222', fontWeight: 500, fontSize: 13 }}>View payload →</a>} />
            <Alert variant="banner" title="v2.4 is here — typed payloads now generally available."
              description={<>Migrate from beta in under an hour. <a href="#" style={{ color: 'var(--paper)', textDecoration: 'underline' }}>Read the guide</a>.</>} dismissible />
          </div>
        </Section>

        {/* ── Toasts ─────────────────────────────────── */}
        <Section title="Toasts">
          <ToastButtons />
        </Section>

        {/* ── Progress ─────────────────────────────────── */}
        <Section title="Progress">
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProgressBar value={62} label="Uploading payload" />
            <Row label="Sizes">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <ProgressBar value={35} size="sm" />
                <ProgressBar value={62} size="md" />
                <ProgressBar value={88} size="lg" />
              </div>
            </Row>
            <Row label="Semantic">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <ProgressBar value={96} color="success" />
                <ProgressBar value={72} color="warning" />
                <ProgressBar value={24} color="danger" />
              </div>
            </Row>
            <Row label="Segmented">
              <ProgressSegmented total={6} filled={4} style={{ flex: 1 }} />
            </Row>
            <Row label="Circular">
              <ProgressCircle value={60} />
              <ProgressCircle value={100} color="success" />
              <ProgressCircle />
            </Row>
          </div>
        </Section>

        {/* ── Empty states ─────────────────────────────────── */}
        <Section title="Empty states">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <EmptyState
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0z"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>}
              eyebrow="No pipelines"
              title="Nothing's running yet"
              description="Connect a source and SRIIO will start ingesting in under a minute."
              actions={<><Button variant="primary" size="sm">Connect a source</Button><Button variant="secondary" size="sm">Read the docs</Button></>}
            />
            <EmptyState
              dashed
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>}
              eyebrow="No results"
              title={<>No pipelines match <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>"users."</code></>}
              description="Try a broader query, or remove a filter."
              actions={<Button variant="secondary" size="sm">Clear filters</Button>}
            />
            <EmptyState
              variant="danger"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>}
              eyebrow="Disconnected"
              title="Source postgres-primary is unreachable"
              description="We can't reach the host. Check VPC rules or reissue credentials."
              actions={<Button variant="primary" size="sm">Retry connection</Button>}
            />
            <EmptyState
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
              eyebrow="All clear"
              title="Inbox zero"
              description="No alerts in the last 24 hours. We'll let you know when something changes."
            />
          </div>
        </Section>

        {/* ── Tooltip ─────────────────────────────────── */}
        <Section title="Tooltips">
          <Row label="Placements">
            <Tooltip placement="top" content="Top tooltip">
              <Button variant="secondary" size="sm">Top</Button>
            </Tooltip>
            <Tooltip placement="bottom" content="Bottom tooltip">
              <Button variant="secondary" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip placement="left" content="Left tooltip">
              <Button variant="secondary" size="sm">Left</Button>
            </Tooltip>
            <Tooltip placement="right" content="Right tooltip">
              <Button variant="secondary" size="sm">Right</Button>
            </Tooltip>
          </Row>
        </Section>

        {/* ── Modal ─────────────────────────────────── */}
        <Section title="Modal">
          <Row label="Destructive">
            <Button variant="danger" onClick={() => setModalOpen(true)}>Delete pipeline…</Button>
          </Row>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            eyebrow="Destructive · Permanent"
            title={<>Delete pipeline <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>orders.normalize</code>?</>}
            description="This will stop ingestion immediately and remove 12 months of audit history. Three downstream consumers depend on this pipeline."
            confirmLabel="Delete pipeline"
            confirmVariant="danger"
            onConfirm={() => setModalOpen(false)}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-2)' }}>
                Type <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}>orders.normalize</span> to confirm.
              </span>
              <input style={{ background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-4)', padding: '8px 10px', fontSize: 'var(--fs-13)', fontFamily: 'var(--font-mono)', color: 'var(--danger)', outline: 'none' }} defaultValue="orders.normalize" />
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>This action cannot be undone.</span>
            </div>
          </Modal>
        </Section>

        {/* ── Drawer ─────────────────────────────────── */}
        <Section title="Drawer">
          <Row label="Right edge">
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          </Row>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            eyebrow="Edit · Pipeline"
            title="orders.normalize"
            onSave={() => setDrawerOpen(false)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Badge variant="success" dot>deployed · v2.4.1</Badge>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>— Configuration</div>
                {[['Region', 'us-east-1'], ['Source', 'postgres-primary'], ['Sink', 'warehouse-snowflake'], ['Owner', 'data-platform']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-1)', fontSize: 13 }}>
                    <span style={{ color: 'var(--fg-3)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <Textarea label="Notes" rows={4} defaultValue="Normalize order events from postgres-primary. Strips PII before warehouse export." />
              <Input label="Tags" defaultValue="critical, finance, pii-clean" />
            </div>
          </Drawer>
        </Section>

        {/* ── Popover ─────────────────────────────────── */}
        <Section title="Popovers">
          <Row label="Click">
            <Popover
              trigger={<Button variant="secondary" size="sm">Pipeline actions ▾</Button>}
              content={
                <div style={{ padding: '4px' }}>
                  {['Edit configuration', 'Clone pipeline', 'View audit log', 'Pause ingestion'].map((label, i) => (
                    <div key={i} style={{ padding: '8px 12px', fontSize: 13, borderRadius: 'var(--radius-4)', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {label}
                    </div>
                  ))}
                  <div style={{ height: 1, background: 'var(--border-1)', margin: '4px 0' }} />
                  <div style={{ padding: '8px 12px', fontSize: 13, borderRadius: 'var(--radius-4)', color: 'var(--danger)', cursor: 'pointer' }}>Delete pipeline…</div>
                </div>
              }
            />
          </Row>
        </Section>

        {/* ── Tabs ─────────────────────────────────── */}
        <Section title="Tabs">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <Tabs
              variant="underline"
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'runs', label: 'Runs', badge: 128 },
                { id: 'schema', label: 'Schema' },
                { id: 'consumers', label: 'Consumers', badge: 3 },
                { id: 'audit', label: 'Audit' },
                { id: 'settings', label: 'Settings' },
              ]}
              activeId={tab}
              onChange={setTab}
            />
            <Tabs
              variant="segmented"
              tabs={[
                { id: 'json', label: 'JSON' },
                { id: 'yaml', label: 'YAML' },
                { id: 'proto', label: 'Protobuf' },
                { id: 'sdl', label: 'SDL' },
              ]}
            />
            <Tabs
              variant="pill"
              tabs={[
                { id: 'all', label: 'All · 8' },
                { id: 'healthy', label: 'Healthy · 5' },
                { id: 'attn', label: 'Needs attention · 2' },
                { id: 'archived', label: 'Archived' },
              ]}
            />
            <Tabs
              variant="vertical"
              tabs={[
                { id: 'general', label: 'General', panel: 'General workspace settings' },
                { id: 'members', label: 'Members', panel: <><strong>Members</strong><br/>14 users in acme-prod · 3 admins · invite by email or SAML.</> },
                { id: 'api', label: 'API keys', panel: 'Manage API credentials' },
                { id: 'webhooks', label: 'Webhooks', panel: 'Configure outbound webhooks' },
                { id: 'billing', label: 'Billing', panel: 'View and manage billing' },
              ]}
            />
          </div>
        </Section>

        {/* ── Accordion ─────────────────────────────────── */}
        <Section title="Accordion">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Accordion
              variant="bordered"
              defaultOpen="q1"
              items={[
                { id: 'q1', title: 'What is a typed payload?', body: <>A typed payload carries its <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', padding: '1px 5px', borderRadius: 2 }}>schema-id</code> in the header, so consumers reject anything that doesn't match. Breaking changes fail at the boundary, not in production.</> },
                { id: 'q2', title: 'How is the registry versioned?' },
                { id: 'q3', title: 'Can I self-host?' },
                { id: 'q4', title: 'What does p95 latency include?' },
              ]}
            />
            <Accordion
              variant="flush"
              defaultOpen="faq1"
              items={[
                { id: 'faq1', num: '01', title: 'How long does the migration take?', body: 'Most teams move their first pipeline in under an hour and finish a full migration in a fortnight.' },
                { id: 'faq2', num: '02', title: 'Do you handle PII redaction?' },
                { id: 'faq3', num: '03', title: "What's the SLA?" },
              ]}
            />
          </div>
        </Section>

        {/* ── Steps ─────────────────────────────────── */}
        <Section title="Steps">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Steps current={step} steps={[
              { label: 'Connect source' },
              { label: 'Define schema' },
              { label: 'Configure pipeline' },
              { label: 'Deploy' },
            ]} />
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Button variant="secondary" size="sm" onClick={() => setStep(s => Math.max(0, s-1))}>← Back</Button>
              <Button variant="primary" size="sm" onClick={() => setStep(s => Math.min(4, s+1))}>Next →</Button>
            </div>
            <div style={{ marginTop: 16 }}>
              <Steps orientation="vertical" current={2} steps={[
                { label: 'Connect source', description: 'postgres-primary · us-east-1' },
                { label: 'Define schema', description: 'OrdersEvent v2.4.1' },
                { label: 'Configure pipeline', description: 'In progress…' },
                { label: 'Deploy' },
              ]} />
            </div>
          </div>
        </Section>

        {/* ── Pagination ─────────────────────────────────── */}
        <Section title="Pagination">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Pagination page={page} total={13} onChange={setPage} />
            <Pagination page={page} total={16} onChange={setPage} summary={`Showing ${(page-1)*20+1}–${page*20} of 312 pipelines`} />
            <Pagination variant="load-more" page={1} total={10} onChange={() => {}} />
          </div>
        </Section>

        {/* ── Navigation ─────────────────────────────────── */}
        <Section title="Navigation">
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'flex-start' }}>
            <Sidebar
              activeId={navActive}
              onChange={setNavActive}
              header={
                <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-6)', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                  <span style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--ink)', color: 'var(--paper)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16 }}>A</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>acme-prod</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>WORKSPACE · PRO</div>
                  </div>
                  <span style={{ color: 'var(--fg-3)' }}>⌄</span>
                </button>
              }
              sections={[
                { head: 'Workspace', items: [
                  { id: 'pipelines', label: 'Pipelines', icon: '▦', count: 12 },
                  { id: 'sources', label: 'Sources', icon: '◇', count: 5 },
                  { id: 'schemas', label: 'Schemas', icon: '≡', count: 38 },
                  { id: 'registry', label: 'Registry', icon: '◈' },
                  { id: 'audit', label: 'Audit log', icon: '◉' },
                ]},
                { head: 'Develop', items: [
                  { id: 'playground', label: 'Playground', icon: '▷' },
                  { id: 'sdks', label: 'SDKs', icon: '{}' },
                  { id: 'webhooks', label: 'Webhooks', icon: '↗' },
                ]},
              ]}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Breadcrumb crumbs={[
                { label: 'acme-prod' },
                { label: 'pipelines' },
                { label: 'orders.normalize' },
                { label: 'runs' },
              ]} />
              <BottomTabs
                tabs={[
                  { id: 'pipelines', label: 'Pipelines', icon: '▦' },
                  { id: 'sources', label: 'Sources', icon: '◇' },
                  { id: 'activity', label: 'Activity', icon: '⌖' },
                  { id: 'search', label: 'Search', icon: '⌕' },
                  { id: 'you', label: 'You', icon: '○' },
                ]}
                activeId={navActive}
                onChange={setNavActive}
                style={{ width: 360 }}
              />
            </div>
          </div>
        </Section>

        {/* ── Table ─────────────────────────────────── */}
        <Section title="Table">
          <div style={{ border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
            <Table
              columns={TABLE_COLS}
              rows={TABLE_ROWS}
              selectedId={selectedRow}
              onRowClick={row => setSelectedRow(row.id)}
              summary="4 pipelines · 2 deployed · 1 throttled · 1 failed"
            />
          </div>
        </Section>

        {/* ── Date & Time pickers ─────────────────────────────────── */}
        <Section title="Date & time pickers">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <DatePicker value={date} onChange={setDate} />
            <TimePicker value={time} onChange={setTime} />
          </div>
        </Section>

        {/* ── File upload ─────────────────────────────────── */}
        <Section title="File upload">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Single</div>
              <FileUploadSingle accept=".csv, .jsonl" />
            </div>
            <div>
              <div style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Bulk</div>
              <FileUploadBulk
                files={bulkFiles}
                onAdd={() => {}}
                onRemove={i => setBulkFiles(f => f.filter((_, idx) => idx !== i))}
              />
            </div>
          </div>
        </Section>
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
