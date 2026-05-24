import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from './utils'

// ─── Shared helpers ─────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getExt(name: string): string {
  return name.split('.').pop()?.toUpperCase().slice(0, 3) ?? '???'
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  )
}

// ─── FileUploadSingle ────────────────────────────────────────────────────────

export interface FileUploadSingleProps {
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number
  label?: string
  hint?: string
  disabled?: boolean
  className?: string
}

export function FileUploadSingle({
  value,
  onChange,
  accept,
  maxSize,
  label = 'Click to upload or drag and drop',
  hint,
  disabled = false,
  className,
}: FileUploadSingleProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function processFile(file: File) {
    if (maxSize && file.size > maxSize) {
      setError(`File exceeds maximum size of ${formatBytes(maxSize)}`)
      onChange(null)
      return
    }
    setError(null)
    onChange(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  if (value) {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
            <FileIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{value.name}</p>
            <p className="text-xs text-gray-500">{formatBytes(value.size)}</p>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => { setError(null); onChange(null) }}
              className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Remove file"
            >
              <XIcon />
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <label
        className={cn(
          'flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed transition-colors cursor-pointer',
          disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
            : isDragOver
            ? 'border-violet-500 bg-violet-50'
            : 'border-gray-300 bg-gray-50 hover:bg-violet-50 hover:border-violet-400'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon
          className={cn(
            'w-8 h-8 mb-2',
            isDragOver ? 'text-violet-500' : 'text-gray-400'
          )}
        />
        <p className={cn('text-sm font-medium', isDragOver ? 'text-violet-600' : 'text-gray-600')}>
          {label}
        </p>
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        {maxSize && (
          <p className="text-xs text-gray-400 mt-0.5">
            Max size: {formatBytes(maxSize)}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          aria-label={label}
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── FileUploadBulk ──────────────────────────────────────────────────────────

export interface FileUploadBulkProps {
  value: File[]
  onChange: (files: File[]) => void
  accept?: string
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  className?: string
}

interface FileEntry {
  file: File
  id: string
  progress: number
  error?: string
}

export function FileUploadBulk({
  value,
  onChange,
  accept,
  maxFiles = 10,
  maxSize,
  disabled = false,
  className,
}: FileUploadBulkProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [entries, setEntries] = useState<FileEntry[]>(() =>
    value.map((f) => ({ file: f, id: Math.random().toString(36).slice(2), progress: 100 }))
  )
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync entries when value changes externally
  useEffect(() => {
    setEntries((prev) => {
      const existing = new Map(prev.map((e) => [e.file, e]))
      return value.map((f) => existing.get(f) ?? { file: f, id: Math.random().toString(36).slice(2), progress: 100 })
    })
  }, [value])

  function addFiles(newFiles: File[]) {
    const available = maxFiles - value.length
    if (available <= 0) return

    const toAdd = newFiles.slice(0, available)
    const newEntries: FileEntry[] = toAdd.map((file) => {
      const error = maxSize && file.size > maxSize
        ? `Exceeds ${formatBytes(maxSize)}`
        : undefined
      return {
        file,
        id: Math.random().toString(36).slice(2),
        progress: 0,
        error,
      }
    })

    const validFiles = toAdd.filter((_, i) => !newEntries[i].error)
    onChange([...value, ...validFiles])

    // Animate progress for valid files
    newEntries.forEach((entry, i) => {
      if (entry.error) {
        setEntries((prev) => [...prev, { ...entry, progress: 0 }])
        return
      }
      let prog = 0
      const interval = setInterval(() => {
        prog = Math.min(prog + Math.random() * 20 + 10, 100)
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? { ...e, progress: Math.round(prog) } : e))
        )
        if (prog >= 100) clearInterval(interval)
      }, 80)
      setEntries((prev) => [...prev, entry])
    })
  }

  function removeFile(id: string) {
    const entry = entries.find((e) => e.id === id)
    if (!entry) return
    const newFiles = value.filter((f) => f !== entry.file)
    onChange(newFiles)
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length) addFiles(files)
    e.target.value = ''
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    const files = Array.from(e.dataTransfer.files)
    if (files.length) addFiles(files)
  }

  const isFull = value.length >= maxFiles

  return (
    <div className={cn('w-full', className)}>
      {/* Drop zone */}
      <label
        className={cn(
          'flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed transition-colors',
          disabled || isFull
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
            : isDragOver
            ? 'border-violet-500 bg-violet-50 cursor-copy'
            : 'border-gray-300 bg-gray-50 hover:bg-violet-50 hover:border-violet-400 cursor-pointer'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon className={cn('w-6 h-6 mb-1', isDragOver ? 'text-violet-500' : 'text-gray-400')} />
        <p className={cn('text-sm', isDragOver ? 'text-violet-600' : 'text-gray-500')}>
          {isFull
            ? `Maximum ${maxFiles} files reached`
            : 'Drop files here or click to browse'}
        </p>
        {!isFull && maxFiles && (
          <p className="text-xs text-gray-400 mt-0.5">
            {value.length}/{maxFiles} files
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          disabled={disabled || isFull}
          onChange={handleChange}
          className="sr-only"
          aria-label="Upload files"
        />
      </label>

      {/* File list */}
      {entries.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
            >
              {/* Extension badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <span className="text-xs font-bold text-violet-600">
                  {getExt(entry.file.name)}
                </span>
              </div>

              {/* Name + size + progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{entry.file.name}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatBytes(entry.file.size)}</span>
                </div>
                {entry.error ? (
                  <p className="text-xs text-red-500 mt-0.5">{entry.error}</p>
                ) : entry.progress < 100 ? (
                  <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-150"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-green-600 mt-0.5">Uploaded</p>
                )}
              </div>

              {/* Remove */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeFile(entry.id)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label={`Remove ${entry.file.name}`}
                >
                  <XIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
