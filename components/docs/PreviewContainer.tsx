'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor, Tablet, Smartphone, Copy, Check,
  Maximize2, AlignRight, Sun, Moon, ExternalLink,
} from 'lucide-react'
import clsx from 'clsx'

type DeviceSize = 'desktop' | 'tablet' | 'mobile'
type CodeTab = 'preview' | 'react' | 'html' | 'tailwind' | 'typescript'

interface PreviewContainerProps {
  preview: React.ReactNode
  code: {
    react: string
    html: string
    tailwind: string
    typescript: string
  }
  componentId: string
}

export function PreviewContainer({ preview, code, componentId }: PreviewContainerProps) {
  const [device, setDevice] = useState<DeviceSize>('desktop')
  const [tab, setTab] = useState<CodeTab>('preview')
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light')
  const [rtl, setRtl] = useState(false)
  const [copied, setCopied] = useState(false)
  const [maximized, setMaximized] = useState(false)

  const getCode = () => {
    if (tab === 'react') return code.react
    if (tab === 'html') return code.html
    if (tab === 'tailwind') return code.tailwind
    if (tab === 'typescript') return code.typescript
    return ''
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deviceConfig: Record<DeviceSize, { maxWidth: string; label: string }> = {
    desktop: { maxWidth: '100%', label: 'Full width' },
    tablet: { maxWidth: '768px', label: '768px' },
    mobile: { maxWidth: '390px', label: '390px' },
  }

  const codeTabs: CodeTab[] = ['preview', 'react', 'html', 'tailwind', 'typescript']

  return (
    <div className={clsx(
      'rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-card',
      maximized && 'fixed inset-4 z-[100] shadow-card-lg'
    )}>
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-10 h-11 flex items-center gap-2 px-3 border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        {/* Left: Edit on GitHub */}
        <a
          href={`https://github.com/sriio/ui/blob/main/components/${componentId}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ExternalLink size={11} />
          <span className="hidden sm:inline">Edit on GitHub</span>
        </a>

        {/* Center: Device buttons */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg">
            {([
              { id: 'desktop' as DeviceSize, icon: Monitor },
              { id: 'tablet' as DeviceSize, icon: Tablet },
              { id: 'mobile' as DeviceSize, icon: Smartphone },
            ]).map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setDevice(id)}
                className={clsx(
                  'flex items-center justify-center w-7 h-6 rounded-md transition-all',
                  device === id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
                title={deviceConfig[id].label}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRtl(r => !r)}
            className={clsx(
              'flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-colors',
              rtl
                ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-500'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
            title="Toggle RTL"
          >
            <AlignRight size={13} />
          </button>

          <button
            onClick={() => setPreviewTheme(t => t === 'light' ? 'dark' : 'light')}
            className={clsx(
              'flex items-center justify-center w-7 h-7 rounded-lg transition-colors',
              previewTheme === 'dark'
                ? 'bg-gray-800 text-gray-300'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400'
            )}
            title="Toggle preview theme"
          >
            {previewTheme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          <button
            onClick={() => setMaximized(m => !m)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Maximize"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Preview canvas */}
      <div className={clsx(
        'relative flex items-center justify-center p-8 min-h-[260px] overflow-hidden',
        previewTheme === 'dark' ? 'bg-gray-950' : 'bg-[#fafafa]',
      )}
        style={{
          backgroundImage: previewTheme === 'dark'
            ? "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")"
            : "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={device}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full flex justify-center"
            style={{ maxWidth: deviceConfig[device].maxWidth }}
            dir={rtl ? 'rtl' : 'ltr'}
          >
            {device !== 'desktop' ? (
              <div className={clsx(
                'w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden',
                previewTheme === 'dark' ? 'dark' : ''
              )}>
                {/* Device frame header */}
                <div className={clsx(
                  'flex items-center justify-center gap-1.5 py-2 border-b',
                  previewTheme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-gray-50 border-gray-100'
                )}>
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[10px] font-mono text-gray-400">{deviceConfig[device].label}</span>
                </div>
                <div className={clsx('p-6', previewTheme === 'dark' ? 'dark' : '')}>
                  {preview}
                </div>
              </div>
            ) : (
              <div className={clsx(previewTheme === 'dark' ? 'dark' : '')}>
                {preview}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Code tabs */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center h-10 px-3 border-b border-gray-100 dark:border-gray-800 gap-0.5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0.5 flex-1">
            {codeTabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize whitespace-nowrap',
                  tab === t
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab !== 'preview' && (
            <button
              onClick={handleCopy}
              className={clsx(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ml-auto flex-shrink-0',
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-accent-500 hover:bg-accent-600 text-white'
              )}
            >
              {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
            </button>
          )}
        </div>

        {tab !== 'preview' && (
          <div className="bg-gray-950 overflow-x-auto">
            <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
              <code>{getCode()}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
