'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, Github, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import clsx from 'clsx'

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/blocks',     label: 'Blocks' },
  { href: '/components', label: 'Components' },
  { href: '/figma',      label: 'Figma' },
  { href: '/docs',       label: 'Docs' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
      scrolled
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm'
        : 'bg-transparent'
    )}>
      <div className="layout-container">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-500 shadow-sm">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
              SRIIO <span className="text-accent-500">UI</span>
            </span>
          </Link>

          {/* Search bar */}
          <button
            onClick={openCommandPalette}
            className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-accent-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-150 w-56 text-sm"
          >
            <Search size={14} className="flex-shrink-0" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-mono text-gray-400 dark:text-gray-500">
              ⌘K
            </kbd>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const isActive = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'px-2.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions — matches DocNavbar style */}
          <div className="flex items-center gap-1.5">
            {/* Mobile search */}
            <button
              onClick={openCommandPalette}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search size={16} />
            </button>

            {/* GitHub with label */}
            <a
              href="https://github.com/mranshyadav/Design-System"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={15} />
              <span className="hidden lg:inline">GitHub</span>
            </a>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Sign In */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Sign In
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-1">
          {navLinks.map(link => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
            <Link
              href="/contact"
              className="block text-center px-4 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
