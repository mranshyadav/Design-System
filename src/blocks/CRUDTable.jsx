import React, { useState } from 'react'
import { Badge, Button, Input, Dropdown, Modal, Pagination } from '../components/index.js'

const STATUSES = { active: 'success', pending: 'warning', archived: 'neutral', cancelled: 'danger' }

const initialRows = [
  { id: 1, name: 'Acme Corp', plan: 'Enterprise', owner: 'James Osei', status: 'active', seats: 42, mrr: '$3,400' },
  { id: 2, name: 'Veritas Labs', plan: 'Pro', owner: 'Sara Lin', status: 'active', seats: 8, mrr: '$640' },
  { id: 3, name: 'Orbit Media', plan: 'Starter', owner: 'Tom Rivera', status: 'pending', seats: 3, mrr: '$99' },
  { id: 4, name: 'Nexgen AI', plan: 'Enterprise', owner: 'Priya Mehta', status: 'active', seats: 120, mrr: '$9,600' },
  { id: 5, name: 'Bluewave Inc', plan: 'Pro', owner: 'Ethan Brooks', status: 'cancelled', seats: 5, mrr: '$0' },
  { id: 6, name: 'Stronghold FS', plan: 'Pro', owner: 'Aiko Tanaka', status: 'active', seats: 11, mrr: '$880' },
  { id: 7, name: 'Delphi Systems', plan: 'Starter', owner: 'Chris Payne', status: 'archived', seats: 2, mrr: '$0' },
]

const SortIcon = ({ active, dir }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--accent)' : 'var(--fg-3)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'asc' ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
  </svg>
)

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

export function CRUDTable() {
  const [rows, setRows] = useState(initialRows)
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [deleteId, setDeleteId] = useState(null)
  const [editRow, setEditRow] = useState(null)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const PAGE_SIZE = 5

  const statusOptions = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Archived', value: 'archived' },
    { label: 'Cancelled', value: 'cancelled' },
  ]

  const filtered = rows
    .filter(r => statusFilter === 'all' || r.status === statusFilter)
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.owner.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const allSelected = paginated.length > 0 && paginated.every(r => selected.includes(r.id))

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const confirmDelete = () => {
    setRows(r => r.filter(row => row.id !== deleteId))
    setDeleteId(null)
  }

  const toggleAll = () => setSelected(allSelected ? selected.filter(id => !paginated.find(r => r.id === id)) : [...new Set([...selected, ...paginated.map(r => r.id)])])

  const colHead = (key, label) => (
    <th style={{ padding: '10px 16px', textAlign: 'left', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }} onClick={() => toggleSort(key)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--fs-11)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>
        {label}
        <SortIcon active={sortKey === key} dir={sortDir} />
      </div>
    </th>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Input placeholder="Search accounts…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} size="sm" />
        </div>
        <Dropdown
          trigger={<Button variant="secondary" size="sm">{statusOptions.find(o => o.value === statusFilter)?.label} ▾</Button>}
          items={statusOptions.map(o => ({ label: o.label, onClick: () => { setStatusFilter(o.value); setPage(1) } }))}
        />
        {selected.length > 0 && (
          <Button variant="danger" size="sm" onClick={() => { setRows(r => r.filter(row => !selected.includes(row.id))); setSelected([]) }}>
            Delete {selected.length} selected
          </Button>
        )}
        <Button variant="primary" size="sm" onClick={() => setEditRow({ id: Date.now(), name: '', plan: 'Starter', owner: '', status: 'pending', seats: 1, mrr: '$0' })}>
          + Add account
        </Button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-3)', borderBottom: '1px solid var(--border-1)' }}>
              <tr>
                <th style={{ padding: '10px 16px', width: 40 }}>
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                </th>
                {colHead('name', 'Account')}
                {colHead('plan', 'Plan')}
                {colHead('owner', 'Owner')}
                {colHead('status', 'Status')}
                {colHead('seats', 'Seats')}
                {colHead('mrr', 'MRR')}
                <th style={{ padding: '10px 16px', width: 80 }} />
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={row.id} style={{
                  borderBottom: i < paginated.length - 1 ? '1px solid var(--border-0)' : 'none',
                  background: selected.includes(row.id) ? 'rgba(31,63,224,0.03)' : 'transparent',
                  borderLeft: selected.includes(row.id) ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'background 120ms',
                }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" checked={selected.includes(row.id)} onChange={() => setSelected(s => s.includes(row.id) ? s.filter(id => id !== row.id) : [...s, row.id])} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 'var(--fs-14)', fontWeight: 500 }}>{row.name}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-2)' }}>{row.plan}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-2)' }}>{row.owner}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge variant={STATUSES[row.status]} size="sm">{row.status}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)' }}>{row.seats}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)', fontWeight: 500 }}>{row.mrr}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setEditRow(row)} style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-2)' }}>
                        <EditIcon />
                      </button>
                      <button onClick={() => setDeleteId(row.id)} style={{ border: '1px solid var(--border-1)', background: 'transparent', borderRadius: 'var(--radius-4)', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 40, textAlign: 'center', color: 'var(--fg-3)', fontSize: 'var(--fs-14)' }}>
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
          <Pagination page={page} total={Math.ceil(filtered.length / PAGE_SIZE)} onChange={setPage} />
        </div>
      </div>

      {/* Delete confirm */}
      <Modal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete account"
        description="This will permanently remove the account and all associated data. This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
      />

      {/* Edit / Add modal */}
      {editRow && (
        <Modal
          open
          onClose={() => setEditRow(null)}
          title={editRow.name ? `Edit — ${editRow.name}` : 'Add account'}
          confirmLabel="Save"
          onConfirm={() => {
            setRows(r => r.find(row => row.id === editRow.id) ? r.map(row => row.id === editRow.id ? editRow : row) : [...r, editRow])
            setEditRow(null)
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
            <Input label="Account name" value={editRow.name} onChange={e => setEditRow(r => ({ ...r, name: e.target.value }))} />
            <Input label="Owner" value={editRow.owner} onChange={e => setEditRow(r => ({ ...r, owner: e.target.value }))} />
            <Input label="MRR" value={editRow.mrr} onChange={e => setEditRow(r => ({ ...r, mrr: e.target.value }))} />
          </div>
        </Modal>
      )}
    </div>
  )
}
