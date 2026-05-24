import React from 'react'
import { cn } from './utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'

interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg',
}

const statusDotSize: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 border',
  sm: 'w-2 h-2 border',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-3.5 h-3.5 border-2',
}

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-emerald-500',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-400',
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({ name, src, size = 'md', status, className }: AvatarProps) {
  const initials = getInitials(name)
  const bgColor = getColorFromName(name)
  const px = sizePx[size]

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-medium text-white',
          sizeClasses[size],
          !src && bgColor
        )}
        style={{ width: px, height: px }}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.classList.add(bgColor)
                const text = document.createElement('span')
                text.textContent = initials
                parent.appendChild(text)
              }
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            statusDotSize[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}

type AvatarStackSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarStackProps {
  users: Array<{ name: string; src?: string }>
  max?: number
  size?: AvatarStackSize
  className?: string
}

const overflowSizeClasses: Record<AvatarStackSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
}

const overflowSizePx: Record<AvatarStackSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
}

export function AvatarStack({ users, max = 3, size = 'md', className }: AvatarStackProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visible.map((user, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          <Avatar name={user.name} src={user.src} size={size as AvatarSize} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'ring-2 ring-white rounded-full flex items-center justify-center',
            'bg-gray-200 text-gray-600 font-medium flex-shrink-0',
            overflowSizeClasses[size]
          )}
          style={{ width: overflowSizePx[size], height: overflowSizePx[size] }}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
