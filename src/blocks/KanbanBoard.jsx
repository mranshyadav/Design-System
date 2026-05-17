import React, { useState } from 'react'
import { Badge, Button, Modal, Input, Dropdown } from '../components/index.js'

const PRIORITIES = { high: 'danger', medium: 'warning', low: 'neutral' }

const initialCols = [
  {
    id: 'todo', label: 'To Do', color: 'var(--fg-3)',
    cards: [
      { id: 1, title: 'Audit API rate limits', priority: 'high', assignee: 'James Osei', due: 'May 20', tags: ['backend'] },
      { id: 2, title: 'Update onboarding copy', priority: 'low', assignee: 'Sara Lin', due: 'May 24', tags: ['content'] },
      { id: 3, title: 'Design new empty states', priority: 'medium', assignee: 'Aiko Tanaka', due: 'May 22', tags: ['design'] },
    ]
  },
  {
    id: 'progress', label: 'In Progress', color: '#1F3FE0',
    cards: [
      { id: 4, title: 'Migrate auth to OAuth 2.0', priority: 'high', assignee: 'Priya Mehta', due: 'May 18', tags: ['backend', 'security'] },
      { id: 5, title: 'Build usage analytics dashboard', priority: 'medium', assignee: 'Tom Rivera', due: 'May 21', tags: ['frontend'] },
    ]
  },
  {
    id: 'review', label: 'In Review', color: '#9A5C0A',
    cards: [
      { id: 6, title: 'Billing webhook handler', priority: 'high', assignee: 'James Osei', due: 'May 17', tags: ['backend'] },
      { id: 7, title: 'Token refresh edge cases', priority: 'medium', assignee: 'Ethan Brooks', due: 'May 19', tags: ['backend'] },
    ]
  },
  {
    id: 'done', label: 'Done', color: '#1F6B47',
    cards: [
      { id: 8, title: 'Set up CI pipeline', priority: 'high', assignee: 'Priya Mehta', due: 'May 14', tags: ['devops'] },
      { id: 9, title: 'Component library v1.0', priority: 'medium', assignee: 'Aiko Tanaka', due: 'May 15', tags: ['design', 'frontend'] },
    ]
  },
]

function Avatar({ name, size = 22 }) {
  const colors = ['#1F3FE0', '#1F6B47', '#9A5C0A', '#7C2F9A', '#9A2222']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: colors[idx], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.38, fontWeight: 600, flexShrink: 0, border: '1.5px solid var(--surface)' }}>
      {name.split(' ').map(p => p[0]).join('').slice(0, 2)}
    </div>
  )
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export function KanbanBoard() {
  const [cols, setCols] = useState(initialCols)
  const [addingTo, setAddingTo] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const addCard = (colId) => {
    if (!newTitle.trim()) return
    setCols(cs => cs.map(c => c.id === colId ? {
      ...c, cards: [...c.cards, { id: Date.now(), title: newTitle.trim(), priority: 'medium', assignee: 'Priya Mehta', due: '—', tags: [] }]
    } : c))
    setNewTitle('')
    setAddingTo(null)
  }

  const moveCard = (cardId, toColId) => {
    let card
    const next = cols.map(c => {
      const found = c.cards.find(cd => cd.id === cardId)
      if (found) card = found
      return { ...c, cards: c.cards.filter(cd => cd.id !== cardId) }
    })
    setCols(next.map(c => c.id === toColId ? { ...c, cards: [...c.cards, card] } : c))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-18)', fontWeight: 600 }}>Sprint board</h2>
          <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-13)', color: 'var(--fg-3)' }}>May 13 – May 24, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm">Filter</Button>
          <Button variant="primary" size="sm" onClick={() => setAddingTo('todo')}>+ Add card</Button>
        </div>
      </div>

      {/* Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'start' }}>
        {cols.map(col => (
          <div
            key={col.id}
            onDragOver={e => { e.preventDefault(); setDragOver(col.id) }}
            onDrop={e => { e.preventDefault(); if (dragging) { moveCard(dragging, col.id); setDragging(null); setDragOver(null) } }}
            style={{
              background: dragOver === col.id ? 'rgba(31,63,224,0.04)' : 'var(--bg-3)',
              borderRadius: 'var(--radius-8)',
              border: `1px solid ${dragOver === col.id ? 'var(--accent)' : 'var(--border-1)'}`,
              transition: 'border-color 120ms, background 120ms',
              minHeight: 200,
            }}
          >
            {/* Column header */}
            <div style={{ padding: '12px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--fs-13)', fontWeight: 600 }}>{col.label}</span>
                <span style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', background: 'var(--bg-2)', borderRadius: 'var(--radius-4)', padding: '1px 6px' }}>{col.cards.length}</span>
              </div>
              <button onClick={() => setAddingTo(col.id)} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--fg-3)', display: 'flex', alignItems: 'center', padding: 2, borderRadius: 'var(--radius-4)' }}>
                <PlusIcon />
              </button>
            </div>

            {/* Cards */}
            <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {col.cards.map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => setDragging(card.id)}
                  onDragEnd={() => { setDragging(null); setDragOver(null) }}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border-1)',
                    borderRadius: 'var(--radius-6)', padding: '10px 12px',
                    cursor: 'grab', opacity: dragging === card.id ? 0.4 : 1,
                    transition: 'opacity 120ms, box-shadow 120ms',
                    boxShadow: dragging === card.id ? 'none' : 'var(--shadow-1)',
                  }}
                  onMouseEnter={e => { if (dragging !== card.id) e.currentTarget.style.boxShadow = 'var(--shadow-2)' }}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-1)'}
                >
                  <div style={{ fontSize: 'var(--fs-13)', fontWeight: 500, color: 'var(--fg-1)', marginBottom: 8, lineHeight: 1.4 }}>
                    {card.title}
                  </div>
                  {card.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                      {card.tags.map(t => (
                        <span key={t} style={{ fontSize: 'var(--fs-10)', fontFamily: 'var(--font-mono)', background: 'var(--bg-3)', color: 'var(--fg-3)', borderRadius: 'var(--radius-4)', padding: '2px 6px', border: '1px solid var(--border-1)' }}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Badge variant={PRIORITIES[card.priority]} size="sm">{card.priority}</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{card.due}</span>
                      <Avatar name={card.assignee} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add card inline */}
              {addingTo === col.id && (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-6)', padding: 10 }}>
                  <Input
                    placeholder="Card title…"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addCard(col.id); if (e.key === 'Escape') { setAddingTo(null); setNewTitle('') } }}
                    size="sm"
                    autoFocus
                  />
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <Button variant="primary" size="sm" onClick={() => addCard(col.id)}>Add</Button>
                    <Button variant="ghost" size="sm" onClick={() => { setAddingTo(null); setNewTitle('') }}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
