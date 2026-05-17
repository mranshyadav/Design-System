'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Zap, ChevronDown, Search, Github, Moon, Sun, Bell, User,
  Monitor, Tablet, Smartphone,
} from 'lucide-react'
import clsx from 'clsx'

interface DocNavbarProps {
  currentSlug?: string
}

const versions = ['v2.0.0', 'v1.9.2', 'v1.8.0']

const navLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Templates', href: '#' },
  { label: 'Icons', href: '#' },
  { label: 'Blog', href: '#' },
]

export function DocNavbar({ currentSlug }: DocNavbarProps) {
  const { theme, setTheme } = useTheme()
  const [versionOpen, setVersionOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState(versions[0])

  return (
    <header className="h-14 flex-shrink-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="h-full flex items-center px-4 gap-3">
        {/* LEFT: Logo + version */}
        <div className="w-[260px] flex-shrink-0 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-accent-600 transition-colors">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">SRIIO UI</span>
          </Link>

          {/* Version dropdown */}
          <div className="relative">
            <button
              onClick={() => setVersionOpen(v => !v)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {selectedVersion}
              <ChevronDown size={11} className={clsx('transition-transform', versionOpen && 'rotate-180')} />
            </button>
            {versionOpen && (
              <div className="absolute top-full left-0 mt-1 w-28 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-card-lg py-1 z-50">
                {versions.map(v => (
                  <button
                    key={v}
                    onClick={() => { setSelectedVersion(v); setVersionOpen(false) }}
                    className={clsx(
                      'w-full text-left px-3 py-1.5 text-xs font-medium transition-colors',
                      v === selectedVersion
                        ? 'text-accent-500 bg-accent-50 dark:bg-accent-500/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CENTER: Search */}
        <div className="flex-1 flex justify-center px-4">
          <button className="flex items-center gap-2 w-full max-w-xs h-8 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group">
            <Search size={13} />
            <span className="flex-1 text-left text-xs">Search docs...</span>
            <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1 py-0.5 text-gray-400">
              <span>⌘</span><span>K</span>
            </kbd>
          </button>
        </div>

        {/* NAV LINKS hidden below xl */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                link.href === '/components'
                  ? 'text-accent-500 bg-accent-50 dark:bg-accent-500/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: actions */}
        <div className="flex items-center gap-1 ml-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Github size={14} />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun size={15} className="hidden dark:block" />
            <Moon size={15} className="dark:hidden" />
          </button>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-500 rounded-full" />
          </button>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User account"
          >
            <User size={15} />
          </button>

          <Link
            href="/components"
            className="ml-1 px-3 py-1.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold transition-colors whitespace-nowrap shadow-sm"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
