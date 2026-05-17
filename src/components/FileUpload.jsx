import React, { useState, useRef } from 'react'
import { ProgressBar } from './Progress.jsx'

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
)

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * FileUploadSingle — single file upload with drag-and-drop and upload states.
 *
 * @param {Function} onFile — (File) => void
 * @param {string} accept — file accept string
 * @param {number} progress — 0-100 while uploading (undefined = idle)
 * @param {'idle'|'uploading'|'done'|'error'} status
 * @param {string} errorMessage
 */
export function FileUploadSingle({ onFile, accept, progress, status = 'idle', errorMessage, style }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)

  const handleFile = (f) => { setFile(f); onFile?.(f) }

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const isDone = status === 'done'
  const isError = status === 'error'
  const isUploading = status === 'uploading'

  return (
    <div style={style}>
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${isError ? 'var(--danger)' : dragging ? 'var(--accent)' : isDone ? '#1F6B47' : 'var(--border-1)'}`,
          borderRadius: 'var(--radius-8)',
          padding: '32px 24px', textAlign: 'center',
          background: dragging ? 'var(--accent-soft)' : isDone ? 'rgba(31,107,71,0.05)' : 'var(--bg-3)',
          cursor: file ? 'default' : 'pointer',
          transition: 'border-color 120ms var(--ease-standard), background 120ms var(--ease-standard)',
        }}
      >
        <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        <div style={{
          color: isError ? 'var(--danger)' : isDone ? '#1F6B47' : 'var(--fg-3)',
          display: 'flex', justifyContent: 'center', marginBottom: 12,
        }}>
          <UploadIcon />
        </div>
        {!file && (
          <>
            <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500, color: 'var(--fg-1)', marginBottom: 4 }}>
              Drop a file or <span style={{ color: 'var(--accent)' }}>browse</span>
            </div>
            <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
              {accept ?? 'Any file'} · Max 50 MB
            </div>
          </>
        )}
        {file && (
          <div style={{ fontSize: 'var(--fs-14)', fontWeight: 500, color: 'var(--fg-1)', fontFamily: 'var(--font-mono)' }}>
            {file.name}
            <span style={{ marginLeft: 8, color: 'var(--fg-3)', fontSize: 'var(--fs-12)' }}>
              {formatBytes(file.size)}
            </span>
          </div>
        )}
        {isError && errorMessage && (
          <div style={{ fontSize: 'var(--fs-12)', color: 'var(--danger)', marginTop: 6 }}>{errorMessage}</div>
        )}
      </div>
      {isUploading && (
        <ProgressBar value={progress ?? 0} label="Uploading…" style={{ marginTop: 12 }} />
      )}
    </div>
  )
}

/**
 * FileUploadBulk — multi-file list with individual statuses.
 *
 * @param {Array<{name: string, size: number, status: 'pending'|'uploading'|'done'|'error', progress?: number}>} files
 * @param {Function} onAdd — (FileList) => void
 * @param {Function} onRemove — (index) => void
 */
export function FileUploadBulk({ files = [], onAdd, onRemove, style }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const STATUS_COLORS = { done: '#1F6B47', error: '#9A2222', uploading: 'var(--accent)', pending: 'var(--fg-3)' }
  const STATUS_LABELS = { done: '✓ Done', error: '✗ Failed', uploading: 'Uploading…', pending: 'Queued' }

  return (
    <div style={style}>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); onAdd?.(e.dataTransfer.files) }}
        style={{
          border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border-1)'}`,
          borderRadius: 'var(--radius-8)', padding: '20px',
          background: dragging ? 'var(--accent-soft)' : 'var(--bg-3)',
          cursor: 'pointer', textAlign: 'center',
          transition: 'border-color 120ms var(--ease-standard)',
        }}
      >
        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={e => onAdd?.(e.target.files)} />
        <span style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-2)' }}>
          Drop files or <span style={{ color: 'var(--accent)', fontWeight: 500 }}>choose files</span>
        </span>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border-1)',
              borderRadius: 'var(--radius-6)', padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: STATUS_COLORS[f.status] ?? 'var(--fg-3)', flexShrink: 0 }}>
                  <FileIcon />
                </span>
                <span style={{ flex: 1, fontSize: 'var(--fs-13)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {f.name}
                </span>
                <span style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', color: STATUS_COLORS[f.status], flexShrink: 0 }}>
                  {STATUS_LABELS[f.status]}
                </span>
                <span style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                  {formatBytes(f.size)}
                </span>
                <button onClick={() => onRemove?.(i)} style={{
                  background: 'transparent', border: 0, cursor: 'pointer',
                  color: 'var(--fg-3)', fontSize: 16, lineHeight: 1, padding: 0, flexShrink: 0,
                }}>×</button>
              </div>
              {f.status === 'uploading' && f.progress !== undefined && (
                <ProgressBar value={f.progress} size="sm" style={{ marginTop: 8 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
