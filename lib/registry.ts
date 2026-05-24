export interface ComponentEntry {
  title: string
  description: string
  category: string
  tags: string[]
  variants: number
  npm: string
  importLine: string
  code: {
    react: string
    typescript: string
    tailwind: string
  }
}

export const registry: Record<string, ComponentEntry> = {
  badge: {
    title: 'Badge',
    description: 'Small status indicators and count labels for displaying metadata, notifications, or categorization.',
    category: 'Data Display',
    tags: ['badge', 'label', 'status', 'count', 'notification'],
    variants: 8,
    npm: 'npm install @sriio/ui',
    importLine: `import { Badge, BadgeCount } from '@sriio/ui'`,
    code: {
      react: `import { Badge, BadgeCount } from '@sriio/ui'

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>

      <div className="relative inline-flex">
        <button className="rounded-full bg-gray-100 p-2">
          <span className="sr-only">Notifications</span>
          🔔
        </button>
        <BadgeCount count={12} max={9} />
      </div>

      <BadgeCount count={3} />
      <BadgeCount count={0} showZero />
    </div>
  )
}`,
      typescript: `import { HTMLAttributes } from 'react'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'ghost'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

interface BadgeCountProps {
  count: number
  max?: number
  showZero?: boolean
  offset?: [number, number]
  className?: string
}`,
      tailwind: `<!-- Badge variants -->
<div class="flex flex-wrap items-center gap-3">
  <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">Default</span>
  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">Primary</span>
  <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">Success</span>
  <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">Warning</span>
  <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Danger</span>
  <span class="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700">Outline</span>

  <!-- Badge with dot indicator -->
  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
    <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
    Active
  </span>

  <!-- BadgeCount on icon -->
  <div class="relative inline-flex">
    <button class="rounded-full bg-gray-100 p-2">🔔</button>
    <span class="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">9+</span>
  </div>
</div>`,
    },
  },

  avatar: {
    title: 'Avatar',
    description: 'User profile images with fallback initials, status indicators, and group stacking support.',
    category: 'Data Display',
    tags: ['avatar', 'profile', 'image', 'user', 'stack'],
    variants: 6,
    npm: 'npm install @sriio/ui',
    importLine: `import { Avatar, AvatarStack } from '@sriio/ui'`,
    code: {
      react: `import { Avatar, AvatarStack } from '@sriio/ui'

const users = [
  { name: 'Alice Chen', src: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { name: 'Bob Smith', src: 'https://i.pravatar.cc/150?img=2', status: 'away' },
  { name: 'Carol White', src: 'https://i.pravatar.cc/150?img=3', status: 'busy' },
  { name: 'David Kim', status: 'offline' },
]

export default function AvatarDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Avatar src={users[0].src} name={users[0].name} size="sm" status="online" />
        <Avatar src={users[1].src} name={users[1].name} size="md" status="away" />
        <Avatar src={users[2].src} name={users[2].name} size="lg" status="busy" />
        <Avatar name={users[3].name} size="xl" status="offline" />
      </div>

      <AvatarStack
        users={users.map(u => ({ src: u.src, name: u.name }))}
        max={3}
        size="md"
      />
    </div>
  )
}`,
      typescript: `type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'
type AvatarShape = 'circle' | 'square'

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  fallbackColor?: string
  className?: string
}

interface AvatarStackUser {
  src?: string
  name?: string
}

interface AvatarStackProps {
  users: AvatarStackUser[]
  max?: number
  size?: AvatarSize
  className?: string
}`,
      tailwind: `<!-- Single Avatar with status -->
<div class="relative inline-flex">
  <img
    src="https://i.pravatar.cc/150?img=1"
    alt="Alice Chen"
    class="h-10 w-10 rounded-full object-cover ring-2 ring-white"
  />
  <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
</div>

<!-- Avatar with initials fallback -->
<div class="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
  DK
</div>

<!-- Avatar Stack -->
<div class="flex -space-x-2">
  <img src="https://i.pravatar.cc/150?img=1" class="h-8 w-8 rounded-full ring-2 ring-white" alt="User 1" />
  <img src="https://i.pravatar.cc/150?img=2" class="h-8 w-8 rounded-full ring-2 ring-white" alt="User 2" />
  <img src="https://i.pravatar.cc/150?img=3" class="h-8 w-8 rounded-full ring-2 ring-white" alt="User 3" />
  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">+4</div>
</div>`,
    },
  },

  button: {
    title: 'Button',
    description: 'Versatile action element with multiple variants, sizes, loading states, and icon support.',
    category: 'Inputs',
    tags: ['button', 'action', 'cta', 'submit', 'loading'],
    variants: 10,
    npm: 'npm install @sriio/ui',
    importLine: `import { Button } from '@sriio/ui'`,
    code: {
      react: `import { Button } from '@sriio/ui'

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Variants */}
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* States */}
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" loading>Saving...</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" leftIcon="✚">Add Item</Button>
        <Button variant="outline" fullWidth>Full Width</Button>
      </div>
    </div>
  )
}`,
      typescript: `import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'link'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  rounded?: boolean
}`,
      tailwind: `<!-- Button variants -->
<div class="flex flex-wrap gap-3">
  <button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">Primary</button>
  <button class="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Secondary</button>
  <button class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Outline</button>
  <button class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Ghost</button>
  <button class="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Danger</button>
</div>

<!-- Loading button -->
<button disabled class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-75">
  <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
  </svg>
  Saving...
</button>`,
    },
  },

  spinner: {
    title: 'Spinner',
    description: 'Loading state indicators including spinning circles, animated dots, and skeleton placeholders.',
    category: 'Feedback',
    tags: ['spinner', 'loading', 'skeleton', 'dots', 'placeholder'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Spinner, Dots, Skeleton } from '@sriio/ui'`,
    code: {
      react: `import { Spinner, Dots, Skeleton } from '@sriio/ui'

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Spinners */}
      <div className="flex items-center gap-6">
        <Spinner size="sm" />
        <Spinner size="md" color="primary" />
        <Spinner size="lg" color="success" />
        <Spinner size="xl" color="danger" />
      </div>

      {/* Dots */}
      <div className="flex items-center gap-6">
        <Dots size="sm" />
        <Dots size="md" color="primary" />
        <Dots size="lg" />
      </div>

      {/* Skeleton placeholders */}
      <div className="w-80 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}`,
      typescript: `type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'white'

interface SpinnerProps {
  size?: SpinnerSize
  color?: SpinnerColor
  label?: string
  className?: string
}

interface DotsProps {
  size?: SpinnerSize
  color?: SpinnerColor
  className?: string
}

interface SkeletonProps {
  className?: string
  animate?: boolean
  rounded?: boolean | string
}`,
      tailwind: `<!-- Spinner -->
<svg class="h-6 w-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
</svg>

<!-- Dots -->
<div class="flex items-center gap-1">
  <span class="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></span>
  <span class="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></span>
  <span class="h-2 w-2 animate-bounce rounded-full bg-blue-600"></span>
</div>

<!-- Skeleton -->
<div class="w-80 space-y-3">
  <div class="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
  <div class="h-4 w-full animate-pulse rounded bg-gray-200"></div>
  <div class="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
  <div class="flex items-center gap-3 pt-2">
    <div class="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-2">
      <div class="h-3 w-3/4 animate-pulse rounded bg-gray-200"></div>
      <div class="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
    </div>
  </div>
</div>`,
    },
  },

  input: {
    title: 'Input',
    description: 'Text input fields and multiline textarea with label, helper text, error states, and icon slots.',
    category: 'Inputs',
    tags: ['input', 'text', 'form', 'textarea', 'field'],
    variants: 7,
    npm: 'npm install @sriio/ui',
    importLine: `import { Input, Textarea } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Input, Textarea } from '@sriio/ui'

export default function InputDemo() {
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  return (
    <div className="w-full max-w-md space-y-5">
      <Input
        label="Full Name"
        placeholder="Jane Doe"
        leftIcon="👤"
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="jane@example.com"
        helperText="We'll never share your email."
      />
      <Input
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        error="Password must be at least 8 characters"
      />
      <Input
        label="Username"
        placeholder="cooluser"
        disabled
        helperText="Username cannot be changed."
      />
      <Textarea
        label="Bio"
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="Tell us about yourself..."
        rows={4}
        maxLength={200}
        showCount
      />
    </div>
  )
}`,
      typescript: `import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'flushed'
  fullWidth?: boolean
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  fullWidth?: boolean
}`,
      tailwind: `<!-- Input with label -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Email Address</label>
  <div class="relative">
    <input
      type="email"
      placeholder="jane@example.com"
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
  <p class="text-xs text-gray-500">We'll never share your email.</p>
</div>

<!-- Input with error -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Password</label>
  <input
    type="password"
    class="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
  />
  <p class="text-xs text-red-500">Password must be at least 8 characters</p>
</div>

<!-- Textarea -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Bio</label>
  <textarea rows="4" placeholder="Tell us about yourself..." class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"></textarea>
</div>`,
    },
  },

  search: {
    title: 'Search',
    description: 'Instant search input with optional suggestions dropdown, keyboard navigation, and clear button.',
    category: 'Inputs',
    tags: ['search', 'filter', 'find', 'autocomplete', 'lookup'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Search } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Search } from '@sriio/ui'

const suggestions = [
  'React components',
  'Tailwind CSS',
  'TypeScript types',
  'API documentation',
  'Getting started',
]

export default function SearchDemo() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = (value: string) => {
    setQuery(value)
    setResults(
      value
        ? suggestions.filter(s =>
            s.toLowerCase().includes(value.toLowerCase())
          )
        : []
    )
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <Search
        value={query}
        onChange={handleSearch}
        placeholder="Search documentation..."
        suggestions={results}
        onSelect={val => setQuery(val)}
        onClear={() => { setQuery(''); setResults([]) }}
        loading={false}
        size="md"
      />
    </div>
  )
}`,
      typescript: `interface SearchProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onSelect?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  suggestions?: string[]
  loading?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled'
  debounce?: number
  className?: string
}`,
      tailwind: `<!-- Search input -->
<div class="relative w-full max-w-md">
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input
    type="search"
    placeholder="Search..."
    class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
  <button class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

<!-- Suggestions dropdown -->
<div class="mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
  <ul class="py-1">
    <li class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">React components</li>
    <li class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Tailwind CSS</li>
    <li class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">TypeScript types</li>
  </ul>
</div>`,
    },
  },

  dropdown: {
    title: 'Dropdown',
    description: 'Contextual menu with support for items, sections, icons, keyboard navigation, and nested menus.',
    category: 'Navigation',
    tags: ['dropdown', 'menu', 'select', 'context', 'actions'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Dropdown } from '@sriio/ui'`,
    code: {
      react: `import { Dropdown } from '@sriio/ui'

export default function DropdownDemo() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        trigger={<button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white">Actions ▾</button>}
        items={[
          {
            section: 'Account',
            items: [
              { label: 'Profile', icon: '👤', onClick: () => console.log('profile') },
              { label: 'Settings', icon: '⚙️', onClick: () => console.log('settings') },
            ],
          },
          {
            section: 'Danger Zone',
            items: [
              { label: 'Delete Account', icon: '🗑️', variant: 'danger', onClick: () => console.log('delete') },
            ],
          },
        ]}
        placement="bottom-start"
      />

      <Dropdown
        trigger={<button className="rounded-md border px-3 py-2 text-sm">Sort by ▾</button>}
        items={[
          { label: 'Newest first', onClick: () => {} },
          { label: 'Oldest first', onClick: () => {} },
          { label: 'Alphabetical', onClick: () => {} },
        ]}
      />
    </div>
  )
}`,
      typescript: `type DropdownPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top'

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  variant?: 'default' | 'danger'
  shortcut?: string
}

interface DropdownSection {
  section?: string
  items: DropdownItem[]
}

interface DropdownProps {
  trigger: React.ReactNode
  items: (DropdownItem | DropdownSection)[]
  placement?: DropdownPlacement
  width?: number | 'trigger' | 'auto'
  closeOnSelect?: boolean
  disabled?: boolean
}`,
      tailwind: `<!-- Dropdown trigger + menu -->
<div class="relative inline-block text-left">
  <button class="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Options
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <!-- Dropdown panel -->
  <div class="absolute left-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
    <div class="py-1">
      <p class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Account</p>
      <a href="#" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">👤 Profile</a>
      <a href="#" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">⚙️ Settings</a>
      <hr class="my-1 border-gray-100" />
      <button class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">🗑️ Delete Account</button>
    </div>
  </div>
</div>`,
    },
  },

  radio: {
    title: 'RadioGroup',
    description: 'Single-selection radio button group with horizontal/vertical layouts, descriptions, and card variants.',
    category: 'Inputs',
    tags: ['radio', 'select', 'choice', 'form', 'option'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { RadioGroup } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { RadioGroup } from '@sriio/ui'

const plans = [
  { value: 'free', label: 'Free', description: 'Perfect for hobby projects' },
  { value: 'pro', label: 'Pro', description: '$9/mo · Unlimited projects' },
  { value: 'team', label: 'Team', description: '$29/mo · Up to 10 members' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing', disabled: true },
]

export default function RadioGroupDemo() {
  const [plan, setPlan] = useState('free')
  const [size, setSize] = useState('md')

  return (
    <div className="space-y-8">
      <RadioGroup
        label="Select a plan"
        value={plan}
        onChange={setPlan}
        options={plans}
        orientation="vertical"
      />

      <RadioGroup
        label="Size"
        value={size}
        onChange={setSize}
        options={[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ]}
        orientation="horizontal"
        variant="card"
      />
    </div>
  )
}`,
      typescript: `interface RadioOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface RadioGroupProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'card' | 'button'
  size?: 'sm' | 'md' | 'lg'
  error?: string
  helperText?: string
  name?: string
  className?: string
}`,
      tailwind: `<!-- Radio group vertical -->
<fieldset>
  <legend class="mb-3 text-sm font-medium text-gray-700">Select a plan</legend>
  <div class="space-y-2">
    <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-blue-500 bg-blue-50 p-3">
      <input type="radio" name="plan" value="free" checked class="mt-0.5 h-4 w-4 text-blue-600" />
      <div>
        <span class="block text-sm font-medium text-gray-900">Free</span>
        <span class="text-xs text-gray-500">Perfect for hobby projects</span>
      </div>
    </label>
    <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
      <input type="radio" name="plan" value="pro" class="mt-0.5 h-4 w-4 text-blue-600" />
      <div>
        <span class="block text-sm font-medium text-gray-900">Pro</span>
        <span class="text-xs text-gray-500">$9/mo · Unlimited projects</span>
      </div>
    </label>
    <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 opacity-50 cursor-not-allowed">
      <input type="radio" name="plan" value="enterprise" disabled class="mt-0.5 h-4 w-4 text-blue-600" />
      <div>
        <span class="block text-sm font-medium text-gray-900">Enterprise</span>
        <span class="text-xs text-gray-500">Custom pricing</span>
      </div>
    </label>
  </div>
</fieldset>`,
    },
  },

  checkbox: {
    title: 'Checkbox & Toggle',
    description: 'Checkbox for multi-selection with indeterminate support, and Toggle for boolean on/off states.',
    category: 'Inputs',
    tags: ['checkbox', 'toggle', 'switch', 'form', 'boolean'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Checkbox, Toggle } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Checkbox, Toggle } from '@sriio/ui'

export default function CheckboxDemo() {
  const [items, setItems] = useState([
    { id: 1, label: 'Send email notifications', checked: true },
    { id: 2, label: 'Enable two-factor auth', checked: false },
    { id: 3, label: 'Public profile', checked: false },
  ])
  const [darkMode, setDarkMode] = useState(false)
  const [newsletter, setNewsletter] = useState(true)

  const toggle = (id: number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={() => toggle(item.id)}
            label={item.label}
          />
        ))}
        <Checkbox label="Disabled option" disabled />
      </div>

      <div className="space-y-4">
        <Toggle
          checked={darkMode}
          onChange={setDarkMode}
          label="Dark mode"
          size="md"
        />
        <Toggle
          checked={newsletter}
          onChange={setNewsletter}
          label="Newsletter"
          helperText="Receive weekly updates"
          size="sm"
        />
      </div>
    </div>
  )
}`,
      typescript: `import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  description?: string
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  error?: string
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}`,
      tailwind: `<!-- Checkbox -->
<label class="flex cursor-pointer items-center gap-3">
  <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
  <span class="text-sm text-gray-700">Send email notifications</span>
</label>

<!-- Toggle / Switch -->
<label class="flex cursor-pointer items-center gap-3">
  <div class="relative">
    <input type="checkbox" class="sr-only peer" checked />
    <div class="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 transition-colors"></div>
    <div class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></div>
  </div>
  <div>
    <span class="block text-sm font-medium text-gray-700">Dark mode</span>
    <span class="text-xs text-gray-500">Toggle dark color scheme</span>
  </div>
</label>`,
    },
  },

  alert: {
    title: 'Alert',
    description: 'Contextual notification banners for success, error, warning, and info messages with optional actions.',
    category: 'Feedback',
    tags: ['alert', 'notification', 'banner', 'message', 'status'],
    variants: 6,
    npm: 'npm install @sriio/ui',
    importLine: `import { Alert } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Alert } from '@sriio/ui'

export default function AlertDemo() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const dismiss = (id: string) => setDismissed(prev => [...prev, id])

  return (
    <div className="w-full max-w-xl space-y-3">
      {!dismissed.includes('info') && (
        <Alert
          variant="info"
          title="Update available"
          description="A new version of SRIIO UI is available. Run npm update @sriio/ui to upgrade."
          onDismiss={() => dismiss('info')}
        />
      )}
      <Alert
        variant="success"
        title="Payment successful"
        description="Your subscription has been activated. Enjoy all Pro features!"
      />
      <Alert
        variant="warning"
        title="Trial ending soon"
        description="Your free trial expires in 3 days."
        action={{ label: 'Upgrade now', onClick: () => console.log('upgrade') }}
      />
      <Alert
        variant="danger"
        title="Deployment failed"
        description="Build error in src/index.ts at line 42."
        onDismiss={() => {}}
      />
    </div>
  )
}`,
      typescript: `interface AlertAction {
  label: string
  onClick: () => void
}

type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'default'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: AlertAction
  onDismiss?: () => void
  dismissible?: boolean
  className?: string
}`,
      tailwind: `<!-- Info alert -->
<div class="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
  <span class="text-blue-500 mt-0.5">ℹ️</span>
  <div class="flex-1">
    <p class="text-sm font-medium text-blue-800">Update available</p>
    <p class="mt-1 text-sm text-blue-700">A new version is ready to install.</p>
  </div>
  <button class="text-blue-400 hover:text-blue-600">✕</button>
</div>

<!-- Success alert -->
<div class="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
  <span class="text-green-500 mt-0.5">✅</span>
  <div class="flex-1">
    <p class="text-sm font-medium text-green-800">Payment successful</p>
    <p class="mt-1 text-sm text-green-700">Your subscription is now active.</p>
  </div>
</div>

<!-- Warning alert with action -->
<div class="flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
  <span class="text-yellow-500 mt-0.5">⚠️</span>
  <div class="flex-1">
    <p class="text-sm font-medium text-yellow-800">Trial ending soon</p>
    <p class="mt-1 text-sm text-yellow-700">Your trial expires in 3 days.</p>
    <button class="mt-2 text-sm font-medium text-yellow-800 underline hover:text-yellow-900">Upgrade now →</button>
  </div>
</div>`,
    },
  },

  toast: {
    title: 'Toast',
    description: 'Ephemeral notification toasts with auto-dismiss, queue support, and action buttons.',
    category: 'Feedback',
    tags: ['toast', 'notification', 'snackbar', 'message', 'ephemeral'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { ToastProvider, useToast } from '@sriio/ui'`,
    code: {
      react: `import { ToastProvider, useToast } from '@sriio/ui'

function ToastTriggers() {
  const toast = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => toast.success('Profile saved successfully!')}
        className="rounded-md bg-green-600 px-4 py-2 text-sm text-white"
      >
        Success Toast
      </button>
      <button
        onClick={() => toast.error('Failed to connect. Please retry.')}
        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
      >
        Error Toast
      </button>
      <button
        onClick={() => toast.warning('Storage almost full (90%)', { duration: 6000 })}
        className="rounded-md bg-yellow-500 px-4 py-2 text-sm text-white"
      >
        Warning Toast
      </button>
      <button
        onClick={() => toast.info('New message from Alice', {
          action: { label: 'View', onClick: () => console.log('view') },
        })}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        Info with Action
      </button>
    </div>
  )
}

export default function ToastDemo() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <ToastTriggers />
    </ToastProvider>
  )
}`,
      typescript: `type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface ToastOptions {
  duration?: number
  action?: { label: string; onClick: () => void }
  icon?: React.ReactNode
  onDismiss?: () => void
}

interface ToastProviderProps {
  position?: ToastPosition
  maxToasts?: number
  children: React.ReactNode
}

interface UseToast {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}`,
      tailwind: `<!-- Toast notification (positioned fixed) -->
<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">

  <!-- Success toast -->
  <div class="flex w-80 items-start gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
    <span class="mt-0.5 text-green-500">✅</span>
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900">Profile saved!</p>
    </div>
    <button class="text-gray-400 hover:text-gray-600">✕</button>
  </div>

  <!-- Error toast with action -->
  <div class="flex w-80 items-start gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
    <span class="mt-0.5 text-red-500">❌</span>
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900">Connection failed</p>
      <button class="mt-1 text-xs font-medium text-blue-600 hover:underline">Retry</button>
    </div>
    <button class="text-gray-400 hover:text-gray-600">✕</button>
  </div>

</div>`,
    },
  },

  progress: {
    title: 'Progress',
    description: 'Linear progress bar and circular progress ring for tracking task completion and loading states.',
    category: 'Feedback',
    tags: ['progress', 'loading', 'bar', 'circle', 'completion'],
    variants: 6,
    npm: 'npm install @sriio/ui',
    importLine: `import { ProgressBar, ProgressCircle } from '@sriio/ui'`,
    code: {
      react: `import { ProgressBar, ProgressCircle } from '@sriio/ui'

export default function ProgressDemo() {
  return (
    <div className="space-y-8">
      {/* Progress bars */}
      <div className="w-full max-w-md space-y-4">
        <ProgressBar value={25} label="Uploading..." showValue />
        <ProgressBar value={60} color="success" label="Processing" showValue />
        <ProgressBar value={85} color="warning" size="lg" />
        <ProgressBar value={100} color="primary" label="Complete!" showValue />
        <ProgressBar indeterminate label="Loading..." />
      </div>

      {/* Progress circles */}
      <div className="flex items-center gap-8">
        <ProgressCircle value={25} size={80} />
        <ProgressCircle value={65} size={100} color="success" showValue />
        <ProgressCircle value={90} size={120} color="warning" showValue label="Storage" />
        <ProgressCircle indeterminate size={60} />
      </div>
    </div>
  )
}`,
      typescript: `type ProgressColor = 'primary' | 'success' | 'warning' | 'danger' | 'default'
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value?: number
  min?: number
  max?: number
  color?: ProgressColor
  size?: ProgressSize
  label?: string
  showValue?: boolean
  indeterminate?: boolean
  animate?: boolean
  className?: string
}

interface ProgressCircleProps {
  value?: number
  min?: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: ProgressColor
  showValue?: boolean
  label?: string
  indeterminate?: boolean
  className?: string
}`,
      tailwind: `<!-- Progress bar -->
<div class="w-full">
  <div class="mb-1 flex items-center justify-between">
    <span class="text-sm font-medium text-gray-700">Uploading...</span>
    <span class="text-sm text-gray-500">60%</span>
  </div>
  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <div class="h-full w-[60%] rounded-full bg-blue-600 transition-all duration-300"></div>
  </div>
</div>

<!-- Indeterminate bar -->
<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
  <div class="h-full w-1/3 animate-[slide_1.5s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
</div>

<!-- Progress circle (SVG) -->
<div class="relative inline-flex items-center justify-center">
  <svg class="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3"></circle>
    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2563eb" stroke-width="3"
      stroke-dasharray="65 35" stroke-linecap="round"></circle>
  </svg>
  <span class="absolute text-sm font-semibold text-gray-900">65%</span>
</div>`,
    },
  },

  'empty-state': {
    title: 'EmptyState',
    description: 'Placeholder UI shown when content is absent, with illustration, message, and call-to-action support.',
    category: 'Data Display',
    tags: ['empty', 'placeholder', 'zero-state', 'blank', 'no-data'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { EmptyState } from '@sriio/ui'`,
    code: {
      react: `import { EmptyState } from '@sriio/ui'

export default function EmptyStateDemo() {
  return (
    <div className="space-y-10">
      <EmptyState
        icon="📭"
        title="No messages yet"
        description="When you receive messages, they'll appear here."
        action={{
          label: 'Compose message',
          onClick: () => console.log('compose'),
        }}
      />

      <EmptyState
        icon="🔍"
        title="No results found"
        description='We couldn\'t find anything matching "dark mode toggle". Try a different search.'
        action={{ label: 'Clear search', onClick: () => {} }}
        size="sm"
      />

      <EmptyState
        icon="📁"
        title="This folder is empty"
        description="Upload files or create a new folder to get started."
        actions={[
          { label: 'Upload files', onClick: () => {}, variant: 'primary' },
          { label: 'New folder', onClick: () => {}, variant: 'outline' },
        ]}
      />
    </div>
  )
}`,
      typescript: `interface EmptyStateAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
}

interface EmptyStateProps {
  icon?: React.ReactNode
  illustration?: React.ReactNode
  title: string
  description?: string
  action?: EmptyStateAction
  actions?: EmptyStateAction[]
  size?: 'sm' | 'md' | 'lg'
  className?: string
}`,
      tailwind: `<!-- Empty state -->
<div class="flex flex-col items-center justify-center px-4 py-16 text-center">
  <div class="mb-4 text-5xl">📭</div>
  <h3 class="mb-2 text-lg font-semibold text-gray-900">No messages yet</h3>
  <p class="mb-6 max-w-sm text-sm text-gray-500">
    When you receive messages, they'll appear here. Start a conversation to get going.
  </p>
  <button class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
    Compose message
  </button>
</div>

<!-- Small empty state -->
<div class="flex flex-col items-center py-8 text-center">
  <div class="mb-3 text-3xl">🔍</div>
  <p class="text-sm font-medium text-gray-900">No results found</p>
  <p class="mt-1 text-xs text-gray-500">Try a different search term</p>
  <button class="mt-3 text-xs font-medium text-blue-600 hover:underline">Clear search</button>
</div>`,
    },
  },

  tooltip: {
    title: 'Tooltip',
    description: 'Contextual floating label that appears on hover or focus, with configurable placement and delay.',
    category: 'Overlays',
    tags: ['tooltip', 'hint', 'popover', 'helper', 'label'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Tooltip } from '@sriio/ui'`,
    code: {
      react: `import { Tooltip } from '@sriio/ui'

export default function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-8">
      <Tooltip content="This is a default tooltip" placement="top">
        <button className="rounded-md border px-3 py-2 text-sm">Top</button>
      </Tooltip>

      <Tooltip content="Appears on the right side" placement="right">
        <button className="rounded-md border px-3 py-2 text-sm">Right</button>
      </Tooltip>

      <Tooltip content="Appears below the element" placement="bottom">
        <button className="rounded-md border px-3 py-2 text-sm">Bottom</button>
      </Tooltip>

      <Tooltip
        content={
          <div>
            <p className="font-semibold">Rich tooltip</p>
            <p className="text-xs opacity-80">Supports any React content</p>
          </div>
        }
        placement="top"
        maxWidth={200}
      >
        <button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">Rich</button>
      </Tooltip>

      <Tooltip content="Disabled tooltip" disabled>
        <button className="rounded-md border px-3 py-2 text-sm opacity-50" disabled>Disabled</button>
      </Tooltip>
    </div>
  )
}`,
      typescript: `type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: TooltipPlacement
  delay?: number
  maxWidth?: number
  disabled?: boolean
  arrow?: boolean
  className?: string
}`,
      tailwind: `<!-- Tooltip wrapper (use JS to toggle visibility) -->
<div class="group relative inline-block">
  <button class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
    Hover me
  </button>

  <!-- Tooltip -->
  <div class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
    <div class="rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white whitespace-nowrap shadow-lg">
      This is a tooltip
      <!-- Arrow -->
      <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
</div>`,
    },
  },

  modal: {
    title: 'Modal',
    description: 'Accessible dialog overlay with header, body, footer, focus trap, and backdrop dismiss support.',
    category: 'Overlays',
    tags: ['modal', 'dialog', 'overlay', 'popup', 'lightbox'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Modal } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Modal } from '@sriio/ui'

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="flex gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        Open Modal
      </button>

      <button
        onClick={() => setConfirmOpen(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
      >
        Confirm Delete
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        size="md"
        footer={
          <>
            <button onClick={() => setIsOpen(false)} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
            <button onClick={() => setIsOpen(false)} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white">Save changes</button>
          </>
        }
      >
        <p className="text-sm text-gray-600">Update your profile information below.</p>
      </Modal>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Account"
        variant="danger"
        size="sm"
      >
        <p className="text-sm text-gray-600">Are you sure? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}`,
      typescript: `type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
type ModalVariant = 'default' | 'danger'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  variant?: ModalVariant
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
}`,
      tailwind: `<!-- Modal backdrop + dialog -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <!-- Dialog -->
  <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <h2 class="text-lg font-semibold text-gray-900">Edit Profile</h2>
      <button class="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">✕</button>
    </div>

    <!-- Body -->
    <div class="px-6 py-4">
      <p class="text-sm text-gray-600">Update your profile information below.</p>
    </div>

    <!-- Footer -->
    <div class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
      <button class="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
      <button class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Save changes</button>
    </div>
  </div>
</div>`,
    },
  },

  drawer: {
    title: 'Drawer',
    description: 'Slide-in panel from any edge of the screen for navigation, filters, or detail views.',
    category: 'Overlays',
    tags: ['drawer', 'sidebar', 'panel', 'slide', 'off-canvas'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Drawer } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Drawer } from '@sriio/ui'

export default function DrawerDemo() {
  const [rightOpen, setRightOpen] = useState(false)
  const [leftOpen, setLeftOpen] = useState(false)

  return (
    <div className="flex gap-3">
      <button
        onClick={() => setRightOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
      >
        Open Right Drawer
      </button>
      <button
        onClick={() => setLeftOpen(true)}
        className="rounded-md border px-4 py-2 text-sm"
      >
        Open Left Drawer
      </button>

      <Drawer
        isOpen={rightOpen}
        onClose={() => setRightOpen(false)}
        title="Notifications"
        placement="right"
        size="md"
      >
        <div className="space-y-4 p-4">
          <p className="text-sm text-gray-600">You have 3 new notifications.</p>
          <div className="rounded-lg border p-3 text-sm">🔔 Alice commented on your post</div>
          <div className="rounded-lg border p-3 text-sm">✅ Deployment succeeded</div>
          <div className="rounded-lg border p-3 text-sm">📧 New message from support</div>
        </div>
      </Drawer>

      <Drawer
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        title="Filters"
        placement="left"
        size="sm"
      >
        <p className="p-4 text-sm text-gray-600">Filter options go here.</p>
      </Drawer>
    </div>
  )
}`,
      typescript: `type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'
type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  placement?: DrawerPlacement
  size?: DrawerSize
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
}`,
      tailwind: `<!-- Right drawer -->
<div class="fixed inset-0 z-50 flex justify-end">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black/40" onclick="closeDrawer()"></div>

  <!-- Panel -->
  <div class="relative flex h-full w-80 flex-col bg-white shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
      <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>
      <button class="rounded p-1 text-gray-400 hover:bg-gray-100">✕</button>
    </div>

    <!-- Scrollable body -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div class="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">🔔 Alice commented on your post</div>
      <div class="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">✅ Deployment succeeded</div>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 px-4 py-3">
      <button class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Mark all as read</button>
    </div>
  </div>
</div>`,
    },
  },

  popover: {
    title: 'Popover',
    description: 'Floating content panel anchored to a trigger element, ideal for rich contextual interactions.',
    category: 'Overlays',
    tags: ['popover', 'floating', 'overlay', 'panel', 'context'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Popover } from '@sriio/ui'`,
    code: {
      react: `import { Popover } from '@sriio/ui'

export default function PopoverDemo() {
  return (
    <div className="flex items-center gap-6 p-8">
      <Popover
        trigger={<button className="rounded-md border px-3 py-2 text-sm">User info</button>}
        placement="bottom-start"
      >
        <div className="w-56 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">👤</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Alice Chen</p>
              <p className="text-xs text-gray-500">alice@example.com</p>
            </div>
          </div>
          <hr className="my-2" />
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50">View Profile</button>
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50">Sign out</button>
        </div>
      </Popover>

      <Popover
        trigger={<button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">Color picker ▾</button>}
        placement="bottom"
      >
        <div className="grid grid-cols-5 gap-2 p-3">
          {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'gray', 'black'].map(c => (
            <button key={c} className={\`h-6 w-6 rounded-full bg-\${c}-500\`} />
          ))}
        </div>
      </Popover>
    </div>
  )
}`,
      typescript: `type PopoverPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

interface PopoverProps {
  trigger: React.ReactElement
  children: React.ReactNode
  placement?: PopoverPlacement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  arrow?: boolean
  offset?: number
  className?: string
}`,
      tailwind: `<!-- Popover trigger + panel -->
<div class="relative inline-block">
  <button class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
    User info
  </button>

  <!-- Popover panel -->
  <div class="absolute left-0 top-full z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
    <!-- Arrow -->
    <div class="absolute -top-1.5 left-4 h-3 w-3 rotate-45 border-l border-t border-gray-200 bg-white"></div>

    <div class="p-3">
      <div class="flex items-center gap-3 pb-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">👤</div>
        <div>
          <p class="text-sm font-semibold text-gray-900">Alice Chen</p>
          <p class="text-xs text-gray-500">alice@example.com</p>
        </div>
      </div>
      <hr class="my-2 border-gray-100" />
      <button class="w-full rounded px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50">View Profile</button>
      <button class="w-full rounded px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50">Sign out</button>
    </div>
  </div>
</div>`,
    },
  },

  tabs: {
    title: 'Tabs',
    description: 'Horizontal and vertical tab navigation for switching between related content panels.',
    category: 'Navigation',
    tags: ['tabs', 'navigation', 'panel', 'switch', 'segment'],
    variants: 6,
    npm: 'npm install @sriio/ui',
    importLine: `import { Tabs } from '@sriio/ui'`,
    code: {
      react: `import { Tabs } from '@sriio/ui'

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: '📊',
    content: <p className="text-sm text-gray-600">Overview of your dashboard metrics and activity.</p>,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    badge: 3,
    content: <p className="text-sm text-gray-600">Detailed analytics and usage reports.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    content: <p className="text-sm text-gray-600">Configure your preferences and account settings.</p>,
  },
  {
    id: 'billing',
    label: 'Billing',
    disabled: true,
    content: null,
  },
]

export default function TabsDemo() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <Tabs tabs={tabs} defaultTab="overview" variant="underline" />
      <Tabs tabs={tabs.slice(0, 3)} defaultTab="overview" variant="pills" />
      <Tabs tabs={tabs.slice(0, 3)} defaultTab="overview" variant="boxed" />
    </div>
  )
}`,
      typescript: `interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: number | string
  content?: React.ReactNode
  disabled?: boolean
}

type TabsVariant = 'underline' | 'pills' | 'boxed' | 'solid'
type TabsOrientation = 'horizontal' | 'vertical'

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  activeTab?: string
  onTabChange?: (id: string) => void
  variant?: TabsVariant
  orientation?: TabsOrientation
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}`,
      tailwind: `<!-- Underline tabs -->
<div>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex gap-1">
      <button class="border-b-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600">Overview</button>
      <button class="border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Analytics</button>
      <button class="border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Settings</button>
      <button class="cursor-not-allowed border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-300" disabled>Billing</button>
    </nav>
  </div>
  <div class="py-4">
    <p class="text-sm text-gray-600">Overview content goes here.</p>
  </div>
</div>

<!-- Pills tabs -->
<div class="flex gap-1 rounded-lg bg-gray-100 p-1">
  <button class="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow">Overview</button>
  <button class="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Analytics</button>
  <button class="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Settings</button>
</div>`,
    },
  },

  accordion: {
    title: 'Accordion',
    description: 'Collapsible content sections with single or multiple expand modes and smooth animations.',
    category: 'Data Display',
    tags: ['accordion', 'collapse', 'expand', 'faq', 'disclosure'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Accordion } from '@sriio/ui'`,
    code: {
      react: `import { Accordion } from '@sriio/ui'

const faqItems = [
  {
    id: 'q1',
    title: 'How do I install SRIIO UI?',
    content: 'Run npm install @sriio/ui in your project root, then import components as needed.',
  },
  {
    id: 'q2',
    title: 'Is SRIIO UI accessible?',
    content: 'Yes! All components follow WAI-ARIA guidelines and support keyboard navigation and screen readers.',
  },
  {
    id: 'q3',
    title: 'Can I customize the theme?',
    content: 'Absolutely. SRIIO UI uses CSS variables and Tailwind, making it easy to match your brand.',
  },
  {
    id: 'q4',
    title: 'Does it support TypeScript?',
    content: 'Yes, full TypeScript support with exported types for all components and props.',
  },
]

export default function AccordionDemo() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <Accordion
        items={faqItems}
        defaultOpen="q1"
        variant="bordered"
      />

      <Accordion
        items={faqItems.slice(0, 3)}
        multiple
        variant="separated"
      />
    </div>
  )
}`,
      typescript: `interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

type AccordionVariant = 'default' | 'bordered' | 'separated' | 'ghost'

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string | string[]
  open?: string | string[]
  onOpenChange?: (open: string | string[]) => void
  multiple?: boolean
  variant?: AccordionVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}`,
      tailwind: `<!-- Accordion -->
<div class="w-full divide-y divide-gray-200 rounded-lg border border-gray-200">

  <!-- Open item -->
  <div>
    <button class="flex w-full items-center justify-between px-4 py-4 text-left">
      <span class="text-sm font-medium text-gray-900">How do I install SRIIO UI?</span>
      <svg class="h-4 w-4 rotate-180 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div class="px-4 pb-4">
      <p class="text-sm text-gray-600">Run npm install @sriio/ui in your project root.</p>
    </div>
  </div>

  <!-- Closed item -->
  <div>
    <button class="flex w-full items-center justify-between px-4 py-4 text-left">
      <span class="text-sm font-medium text-gray-900">Is SRIIO UI accessible?</span>
      <svg class="h-4 w-4 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

</div>`,
    },
  },

  steps: {
    title: 'Steps',
    description: 'Visual step-by-step progress indicator for multi-stage workflows, wizards, and onboarding flows.',
    category: 'Navigation',
    tags: ['steps', 'wizard', 'stepper', 'progress', 'onboarding'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Steps } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Steps } from '@sriio/ui'

const steps = [
  { id: 'account', label: 'Account', description: 'Create your account' },
  { id: 'profile', label: 'Profile', description: 'Add your details' },
  { id: 'plan', label: 'Plan', description: 'Choose a subscription' },
  { id: 'confirm', label: 'Confirm', description: 'Review and confirm' },
]

export default function StepsDemo() {
  const [current, setCurrent] = useState(1)

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Steps
        steps={steps}
        currentStep={current}
        variant="horizontal"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setCurrent(s => Math.max(0, s - 1))}
          disabled={current === 0}
          className="rounded-md border px-4 py-2 text-sm disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={() => setCurrent(s => Math.min(steps.length - 1, s + 1))}
          disabled={current === steps.length - 1}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <Steps steps={steps.slice(0, 3)} currentStep={1} variant="vertical" />
    </div>
  )
}`,
      typescript: `interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  optional?: boolean
}

type StepsVariant = 'horizontal' | 'vertical'
type StepStatus = 'complete' | 'current' | 'upcoming' | 'error'

interface StepsProps {
  steps: Step[]
  currentStep: number
  variant?: StepsVariant
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  onStepClick?: (index: number) => void
  className?: string
}`,
      tailwind: `<!-- Horizontal steps -->
<ol class="flex items-center w-full">
  <!-- Completed step -->
  <li class="flex items-center text-blue-600 flex-1">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">✓</span>
    <span class="mx-3 text-sm font-medium">Account</span>
    <div class="flex-1 h-px bg-blue-600"></div>
  </li>

  <!-- Current step -->
  <li class="flex items-center flex-1">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 text-sm font-medium text-blue-600">2</span>
    <span class="mx-3 text-sm font-medium text-gray-900">Profile</span>
    <div class="flex-1 h-px bg-gray-200"></div>
  </li>

  <!-- Upcoming step -->
  <li class="flex items-center">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-medium text-gray-400">3</span>
    <span class="ml-3 text-sm font-medium text-gray-400">Confirm</span>
  </li>
</ol>`,
    },
  },

  pagination: {
    title: 'Pagination',
    description: 'Page navigation control with page numbers, ellipsis, prev/next buttons, and page-size selector.',
    category: 'Navigation',
    tags: ['pagination', 'pages', 'navigation', 'pager', 'list'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { Pagination } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Pagination } from '@sriio/ui'

export default function PaginationDemo() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const total = 243

  return (
    <div className="space-y-6">
      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        showTotal
      />

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        showTotal
        showPageSize
        size="sm"
      />

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        variant="minimal"
      />
    </div>
  )
}`,
      typescript: `interface PaginationProps {
  page: number
  total: number
  pageSize?: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  showTotal?: boolean
  showPageSize?: boolean
  siblingCount?: number
  boundaryCount?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'simple'
  disabled?: boolean
  className?: string
}`,
      tailwind: `<!-- Pagination -->
<nav class="flex items-center justify-between">
  <p class="text-sm text-gray-500">Showing <span class="font-medium">1–10</span> of <span class="font-medium">243</span> results</p>

  <div class="flex items-center gap-1">
    <!-- Prev -->
    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40" disabled>‹</button>

    <!-- Pages -->
    <button class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-medium text-white">1</button>
    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">2</button>
    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">3</button>
    <span class="flex h-8 w-8 items-center justify-center text-sm text-gray-400">…</span>
    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">25</button>

    <!-- Next -->
    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-sm text-gray-500 hover:bg-gray-50">›</button>
  </div>
</nav>`,
    },
  },

  navigation: {
    title: 'Navigation',
    description: 'Complete navigation suite: top navbar, collapsible sidebar, breadcrumb trail, and mobile bottom tabs.',
    category: 'Navigation',
    tags: ['navigation', 'navbar', 'sidebar', 'breadcrumb', 'tabs'],
    variants: 8,
    npm: 'npm install @sriio/ui',
    importLine: `import { TopNav, Sidebar, Breadcrumb, BottomTabs } from '@sriio/ui'`,
    code: {
      react: `import { TopNav, Sidebar, Breadcrumb, BottomTabs } from '@sriio/ui'

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊', active: true },
  { label: 'Projects', href: '/projects', icon: '📁', badge: 4 },
  { label: 'Team', href: '/team', icon: '👥' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'SRIIO UI' },
]

export default function NavigationDemo() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav
        logo={<span className="font-bold text-blue-600">SRIIO UI</span>}
        items={navItems}
        rightSlot={<button className="rounded-full bg-gray-100 p-2">👤</button>}
      />

      <div className="flex flex-1">
        <Sidebar items={navItems} collapsed={false} />

        <main className="flex-1 p-6">
          <Breadcrumb items={breadcrumbs} separator="/" />
          <p className="mt-4 text-gray-600">Main content area</p>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomTabs items={navItems.slice(0, 4)} activeItem="/" />
    </div>
  )
}`,
      typescript: `interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: number | string
  active?: boolean
  disabled?: boolean
  children?: NavItem[]
}

interface TopNavProps {
  logo?: React.ReactNode
  items?: NavItem[]
  rightSlot?: React.ReactNode
  sticky?: boolean
  bordered?: boolean
  className?: string
}

interface SidebarProps {
  items: NavItem[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  width?: number
  className?: string
}

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  className?: string
}

interface BottomTabsProps {
  items: NavItem[]
  activeItem?: string
  className?: string
}`,
      tailwind: `<!-- Top Navigation -->
<nav class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
  <div class="flex items-center gap-8">
    <a href="/" class="text-lg font-bold text-blue-600">SRIIO UI</a>
    <div class="hidden items-center gap-1 md:flex">
      <a href="/" class="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">Dashboard</a>
      <a href="/projects" class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Projects</a>
      <a href="/team" class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Team</a>
    </div>
  </div>
  <button class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">👤</button>
</nav>

<!-- Breadcrumb -->
<nav class="flex items-center gap-1.5 text-sm">
  <a href="/" class="text-gray-500 hover:text-gray-700">Home</a>
  <span class="text-gray-400">/</span>
  <a href="/projects" class="text-gray-500 hover:text-gray-700">Projects</a>
  <span class="text-gray-400">/</span>
  <span class="font-medium text-gray-900">SRIIO UI</span>
</nav>`,
    },
  },

  table: {
    title: 'Table',
    description: 'Feature-rich data table with sorting, filtering, pagination, row selection, and column customization.',
    category: 'Data Display',
    tags: ['table', 'data', 'grid', 'sort', 'filter'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { Table } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { Table } from '@sriio/ui'

const users = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2023-03-22' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2023-06-10' },
  { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Editor', status: 'Active', joined: '2024-01-05' },
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (val: string) => (
      <span className={\`rounded-full px-2 py-0.5 text-xs font-medium \${val === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}\`}>
        {val}
      </span>
    ),
  },
  { key: 'joined', label: 'Joined', sortable: true },
]

export default function TableDemo() {
  const [selected, setSelected] = useState<number[]>([])

  return (
    <Table
      data={users}
      columns={columns}
      rowKey="id"
      selectable
      selectedRows={selected}
      onSelectionChange={setSelected}
      striped
      hoverable
      bordered={false}
    />
  )
}`,
      typescript: `interface TableColumn<T = unknown> {
  key: string
  label: string
  sortable?: boolean
  width?: number | string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T) => React.ReactNode
  className?: string
}

interface TableProps<T = Record<string, unknown>> {
  data: T[]
  columns: TableColumn<T>[]
  rowKey: keyof T
  loading?: boolean
  selectable?: boolean
  selectedRows?: (string | number)[]
  onSelectionChange?: (keys: (string | number)[]) => void
  onRowClick?: (row: T) => void
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  stickyHeader?: boolean
  emptyText?: string
  className?: string
}`,
      tailwind: `<!-- Data table -->
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
  <table class="w-full text-sm">
    <thead class="border-b border-gray-200 bg-gray-50">
      <tr>
        <th class="w-10 px-4 py-3"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" /></th>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 cursor-pointer hover:text-gray-700">
          Name ↕
        </th>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Role</th>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 bg-white">
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" /></td>
        <td class="px-4 py-3 font-medium text-gray-900">Alice Chen</td>
        <td class="px-4 py-3 text-gray-500">alice@example.com</td>
        <td class="px-4 py-3 text-gray-700">Admin</td>
        <td class="px-4 py-3"><span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Active</span></td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" /></td>
        <td class="px-4 py-3 font-medium text-gray-900">Bob Smith</td>
        <td class="px-4 py-3 text-gray-500">bob@example.com</td>
        <td class="px-4 py-3 text-gray-700">Editor</td>
        <td class="px-4 py-3"><span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">Inactive</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
  },

  'date-picker': {
    title: 'DatePicker',
    description: 'Calendar-based date selector with range support, disabled dates, and locale formatting.',
    category: 'Inputs',
    tags: ['date', 'calendar', 'picker', 'form', 'schedule'],
    variants: 5,
    npm: 'npm install @sriio/ui',
    importLine: `import { DatePicker } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { DatePicker } from '@sriio/ui'

export default function DatePickerDemo() {
  const [single, setSingle] = useState<Date | null>(null)
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })

  return (
    <div className="space-y-6">
      <DatePicker
        label="Start date"
        value={single}
        onChange={setSingle}
        placeholder="Select a date"
        minDate={new Date()}
        format="MM/dd/yyyy"
      />

      <DatePicker
        label="Travel dates"
        mode="range"
        startDate={range.start}
        endDate={range.end}
        onRangeChange={setRange}
        placeholder="Select date range"
        numberOfMonths={2}
      />

      <DatePicker
        label="Meeting date"
        value={single}
        onChange={setSingle}
        disabledDates={[
          new Date(2025, 0, 1),
          new Date(2025, 11, 25),
        ]}
        disabledDaysOfWeek={[0, 6]}
        helperText="Weekdays only"
      />
    </div>
  )
}`,
      typescript: `type DatePickerMode = 'single' | 'range' | 'multiple'

interface DatePickerProps {
  label?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  mode?: DatePickerMode
  startDate?: Date | null
  endDate?: Date | null
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
  placeholder?: string
  format?: string
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  disabledDaysOfWeek?: number[]
  numberOfMonths?: number
  locale?: string
  helperText?: string
  error?: string
  disabled?: boolean
  className?: string
}`,
      tailwind: `<!-- Date picker input -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Start Date</label>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <input type="text" placeholder="MM/DD/YYYY" class="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
  </div>
</div>

<!-- Calendar dropdown -->
<div class="mt-1 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
  <div class="mb-3 flex items-center justify-between">
    <button class="rounded p-1 text-gray-400 hover:text-gray-700">‹</button>
    <span class="text-sm font-semibold text-gray-900">January 2025</span>
    <button class="rounded p-1 text-gray-400 hover:text-gray-700">›</button>
  </div>
  <div class="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400">
    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
  </div>
  <div class="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
    <button class="rounded-full py-1 text-gray-300">29</button>
    <button class="rounded-full py-1 hover:bg-gray-100">1</button>
    <button class="rounded-full bg-blue-600 py-1 text-white">2</button>
    <button class="rounded-full py-1 hover:bg-gray-100">3</button>
    <button class="rounded-full py-1 hover:bg-gray-100">4</button>
    <button class="rounded-full py-1 text-gray-300 cursor-not-allowed">5</button>
    <button class="rounded-full py-1 text-gray-300 cursor-not-allowed">6</button>
  </div>
</div>`,
    },
  },

  'time-picker': {
    title: 'TimePicker',
    description: 'Time selection input with clock face, scroll wheels, and 12/24-hour format support.',
    category: 'Inputs',
    tags: ['time', 'clock', 'picker', 'form', 'schedule'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { TimePicker } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { TimePicker } from '@sriio/ui'

export default function TimePickerDemo() {
  const [time, setTime] = useState<string | null>(null)
  const [rangeStart, setRangeStart] = useState<string | null>(null)
  const [rangeEnd, setRangeEnd] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-xs">
      <TimePicker
        label="Meeting time"
        value={time}
        onChange={setTime}
        placeholder="Select time"
        format="12h"
        minuteStep={15}
      />

      <TimePicker
        label="Start time"
        value={rangeStart}
        onChange={setRangeStart}
        format="24h"
        minuteStep={5}
        helperText="24-hour format"
      />

      <TimePicker
        label="End time"
        value={rangeEnd}
        onChange={setRangeEnd}
        format="24h"
        minuteStep={5}
        minTime={rangeStart ?? undefined}
        disabled={!rangeStart}
        helperText={rangeStart ? 'Must be after start time' : 'Select a start time first'}
      />
    </div>
  )
}`,
      typescript: `type TimeFormat = '12h' | '24h'

interface TimePickerProps {
  label?: string
  value?: string | null
  onChange?: (time: string | null) => void
  placeholder?: string
  format?: TimeFormat
  minuteStep?: number
  secondStep?: number
  showSeconds?: boolean
  minTime?: string
  maxTime?: string
  disabled?: boolean
  helperText?: string
  error?: string
  clearable?: boolean
  className?: string
}`,
      tailwind: `<!-- Time picker input -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Meeting time</label>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <input type="text" placeholder="HH:MM AM" class="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
  </div>
</div>

<!-- Time picker dropdown panel -->
<div class="mt-1 w-52 rounded-xl border border-gray-200 bg-white shadow-xl">
  <div class="flex divide-x divide-gray-100">
    <!-- Hours column -->
    <div class="flex-1 overflow-y-auto py-2 max-h-48 scrollbar-hide">
      <div class="px-2 py-1 text-center text-xs font-medium text-gray-400 uppercase">Hr</div>
      <button class="w-full rounded py-1.5 text-sm text-gray-500 hover:bg-gray-50">11</button>
      <button class="w-full rounded bg-blue-600 py-1.5 text-sm font-semibold text-white">12</button>
      <button class="w-full rounded py-1.5 text-sm text-gray-500 hover:bg-gray-50">01</button>
    </div>
    <!-- Minutes column -->
    <div class="flex-1 overflow-y-auto py-2 max-h-48 scrollbar-hide">
      <div class="px-2 py-1 text-center text-xs font-medium text-gray-400 uppercase">Min</div>
      <button class="w-full rounded py-1.5 text-sm text-gray-500 hover:bg-gray-50">45</button>
      <button class="w-full rounded bg-blue-600 py-1.5 text-sm font-semibold text-white">00</button>
      <button class="w-full rounded py-1.5 text-sm text-gray-500 hover:bg-gray-50">15</button>
    </div>
    <!-- AM/PM -->
    <div class="flex w-14 flex-col py-2">
      <div class="px-2 py-1 text-center text-xs font-medium text-gray-400 uppercase">—</div>
      <button class="rounded bg-blue-600 py-1.5 text-sm font-semibold text-white mx-1">AM</button>
      <button class="rounded py-1.5 text-sm text-gray-500 hover:bg-gray-50 mx-1">PM</button>
    </div>
  </div>
</div>`,
    },
  },

  'file-upload': {
    title: 'FileUpload',
    description: 'Drag-and-drop file upload for single or multiple files with progress tracking and file previews.',
    category: 'Inputs',
    tags: ['upload', 'file', 'drag-drop', 'attachment', 'media'],
    variants: 4,
    npm: 'npm install @sriio/ui',
    importLine: `import { FileUploadSingle, FileUploadBulk } from '@sriio/ui'`,
    code: {
      react: `import { useState } from 'react'
import { FileUploadSingle, FileUploadBulk } from '@sriio/ui'

export default function FileUploadDemo() {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    await fetch('/api/upload', { method: 'POST', body: formData })
  }

  return (
    <div className="space-y-8 max-w-lg">
      <FileUploadSingle
        label="Profile photo"
        value={avatar}
        onChange={setAvatar}
        accept="image/*"
        maxSize={2 * 1024 * 1024}
        onUpload={handleUpload}
        preview
        helperText="PNG, JPG up to 2MB"
      />

      <FileUploadBulk
        label="Attachments"
        files={files}
        onChange={setFiles}
        accept=".pdf,.doc,.docx,.txt"
        maxSize={10 * 1024 * 1024}
        maxFiles={5}
        onUpload={async (file) => handleUpload(file)}
        helperText="PDF, DOC up to 10MB each. Max 5 files."
      />
    </div>
  )
}`,
      typescript: `interface FileUploadSingleProps {
  label?: string
  value?: File | null
  onChange?: (file: File | null) => void
  accept?: string
  maxSize?: number
  onUpload?: (file: File) => Promise<void>
  preview?: boolean
  previewUrl?: string
  disabled?: boolean
  helperText?: string
  error?: string
  className?: string
}

interface UploadedFile {
  file: File
  progress?: number
  status?: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

interface FileUploadBulkProps {
  label?: string
  files?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  maxSize?: number
  maxFiles?: number
  onUpload?: (file: File) => Promise<void>
  disabled?: boolean
  helperText?: string
  error?: string
  className?: string
}`,
      tailwind: `<!-- Single file upload dropzone -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700">Profile photo</label>
  <div class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
    <div class="mb-3 text-4xl">📁</div>
    <p class="text-sm font-medium text-gray-700">Drag & drop your file here</p>
    <p class="mt-1 text-xs text-gray-500">or <span class="text-blue-600 underline cursor-pointer">browse to upload</span></p>
    <p class="mt-2 text-xs text-gray-400">PNG, JPG up to 2MB</p>
    <input type="file" class="sr-only" accept="image/*" />
  </div>
</div>

<!-- File list with progress -->
<ul class="mt-4 space-y-2">
  <li class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
    <span class="text-2xl">📄</span>
    <div class="flex-1 min-w-0">
      <p class="truncate text-sm font-medium text-gray-900">document.pdf</p>
      <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div class="h-full w-3/4 rounded-full bg-blue-600 transition-all"></div>
      </div>
      <p class="mt-0.5 text-xs text-gray-500">75% · 1.2 MB</p>
    </div>
    <button class="text-gray-400 hover:text-gray-600">✕</button>
  </li>
  <li class="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
    <span class="text-2xl">📄</span>
    <div class="flex-1 min-w-0">
      <p class="truncate text-sm font-medium text-gray-900">report.docx</p>
      <p class="text-xs text-green-600">✓ Uploaded</p>
    </div>
    <button class="text-gray-400 hover:text-gray-600">✕</button>
  </li>
</ul>`,
    },
  },
}
