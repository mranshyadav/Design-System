import Link from 'next/link'
import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  'Components': [
    { label: 'Badge & Avatar',   href: '/components/badge' },
    { label: 'Buttons',          href: '/components/button' },
    { label: 'Forms & Inputs',   href: '/components/input' },
    { label: 'Modals & Drawers', href: '/components/modal' },
    { label: 'Navigation',       href: '/components/navigation' },
    { label: 'Data Table',       href: '/components/table' },
  ],
  'Blocks': [
    { label: 'Hero Sections',    href: '/blocks?cat=hero' },
    { label: 'Dashboard',        href: '/blocks?cat=dashboard' },
    { label: 'Authentication',   href: '/blocks?cat=authentication' },
    { label: 'Pricing Tables',   href: '/blocks?cat=pricing' },
    { label: 'Forms',            href: '/blocks?cat=forms' },
    { label: 'Marketing',        href: '/blocks?cat=marketing' },
  ],
  'Resources': [
    { label: 'Documentation',    href: '/docs' },
    { label: 'GitHub Repository',href: 'https://github.com/mranshyadav/Design-System' },
    { label: 'Changelog',        href: '/changelog' },
    { label: 'Roadmap',          href: '/roadmap' },
    { label: 'Contributing',     href: '/contributing' },
    { label: 'License (MIT)',    href: '/license' },
  ],
  'Design System': [
    { label: 'Design Tokens',    href: '/docs/tokens' },
    { label: 'Typography',       href: '/docs/typography' },
    { label: 'Color Palette',    href: '/docs/colors' },
    { label: 'Spacing Scale',    href: '/docs/spacing' },
    { label: 'Icons',            href: '/docs/icons' },
    { label: 'Motion',           href: '/docs/motion' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="layout-container py-16">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-500">
                <Zap size={15} className="text-white" />
              </div>
              <span className="font-bold text-base tracking-tight text-gray-900 dark:text-white">SRIIO <span className="text-accent-500">UI</span></span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
              A precision-crafted React component library and UI block system built for modern product teams.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/mranshyadav/Design-System', Icon: Github, label: 'GitHub' },
                { href: '#', Icon: Twitter, label: 'Twitter' },
                { href: '#', Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-card">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 border-t border-b border-gray-200 dark:border-gray-800 mb-8">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Stay in the loop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">New components and blocks — delivered monthly.</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 sm:w-64 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-accent-500 transition-colors"
            />
            <button className="px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} SRIIO UI. Released under the MIT license.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
