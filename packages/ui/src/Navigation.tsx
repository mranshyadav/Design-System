import React, { ReactNode } from 'react'
import { cn } from './utils'

// ─── TopNav ────────────────────────────────────────────────────────────────

export interface TopNavLink {
  label: string
  href: string
  active?: boolean
}

export interface TopNavProps {
  logo: ReactNode
  links: TopNavLink[]
  actions?: ReactNode
  sticky?: boolean
  className?: string
}

export function TopNav({
  logo,
  links,
  actions,
  sticky = true,
  className,
}: TopNavProps) {
  return (
    <header
      className={cn(
        'h-16 border-b border-gray-200 bg-white',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className="flex items-center h-full px-6 gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Links */}
        <nav className="flex items-center gap-1 flex-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm transition-colors',
                link.active
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </header>
  )
}

// ─── Sidebar ───────────────────────────────────────────────────────────────

export interface SidebarLink {
  label: string
  href?: string
  icon?: ReactNode
  active?: boolean
  badge?: number
}

export interface SidebarProps {
  links: SidebarLink[]
  logo?: ReactNode
  footer?: ReactNode
  collapsed?: boolean
  className?: string
}

export function Sidebar({
  links,
  logo,
  footer,
  collapsed = false,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col h-full border-r border-gray-200 bg-white transition-all duration-200 overflow-hidden',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      {logo && (
        <div className={cn('flex-shrink-0 flex items-center h-16 px-3 border-b border-gray-200', collapsed && 'justify-center')}>
          {logo}
        </div>
      )}

      {/* Links */}
      <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
        {links.map((link, i) => {
          const Tag = link.href ? 'a' : 'button'
          return (
            <Tag
              key={i}
              {...(link.href ? { href: link.href } : { type: 'button' as const })}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left',
                link.active
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100',
                collapsed && 'justify-center'
              )}
              title={collapsed ? link.label : undefined}
            >
              {link.icon && (
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {link.icon}
                </span>
              )}
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{link.label}</span>
                  {link.badge !== undefined && (
                    <span className={cn(
                      'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium',
                      link.active
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {link.badge}
                    </span>
                  )}
                </>
              )}
            </Tag>
          )
        })}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="flex-shrink-0 border-t border-gray-200 p-2">
          {footer}
        </div>
      )}
    </aside>
  )
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

export function Breadcrumb({
  items,
  separator = '/',
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm flex-wrap', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-gray-300 text-xs select-none" aria-hidden>
                {separator}
              </span>
            )}
            {isLast ? (
              <span className="flex items-center gap-1 text-gray-900 font-medium">
                {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <span className="flex items-center gap-1 text-gray-500">
                {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

// ─── BottomTabs ────────────────────────────────────────────────────────────

export interface BottomTab {
  id: string
  label: string
  icon: ReactNode
  active?: boolean
}

export interface BottomTabsProps {
  tabs: BottomTab[]
  onChange: (id: string) => void
  className?: string
}

export function BottomTabs({ tabs, onChange, className }: BottomTabsProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 bg-white flex z-40',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors',
            tab.active ? 'text-violet-600' : 'text-gray-500'
          )}
          aria-current={tab.active ? 'page' : undefined}
        >
          <span className="w-6 h-6 flex items-center justify-center">
            {tab.icon}
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
