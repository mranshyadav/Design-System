export interface Block {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  isNew?: boolean
  isPro?: boolean
  componentCount?: number
}

export interface Category {
  id: string
  label: string
  icon: string
  count: number
  description: string
}

export interface Component {
  id: string
  title: string
  description: string
  category: string
  variants: number
  imports: string
  tags: string[]
}

export const categories: Category[] = [
  { id: 'all',            label: 'All Blocks',     icon: '⊞', count: 47, description: 'Browse every block' },
  { id: 'hero',           label: 'Hero Sections',  icon: '◈', count: 6,  description: 'Landing page hero blocks' },
  { id: 'dashboard',      label: 'Dashboard',      icon: '▦', count: 8,  description: 'Admin and analytics layouts' },
  { id: 'tables',         label: 'Tables',         icon: '≡', count: 5,  description: 'Data table patterns' },
  { id: 'forms',          label: 'Forms',          icon: '⊟', count: 6,  description: 'Input forms and wizards' },
  { id: 'authentication', label: 'Authentication', icon: '◉', count: 4,  description: 'Login, signup, 2FA' },
  { id: 'navigation',     label: 'Navigation',     icon: '↗', count: 4,  description: 'Navbars, sidebars, tabs' },
  { id: 'pricing',        label: 'Pricing',        icon: '◈', count: 3,  description: 'Pricing tables and plans' },
  { id: 'cards',          label: 'Cards',          icon: '⊡', count: 5,  description: 'Content and data cards' },
  { id: 'marketing',      label: 'Marketing',      icon: '◇', count: 4,  description: 'Feature and CTA sections' },
  { id: 'settings',       label: 'Settings',       icon: '⚙', count: 3,  description: 'Profile and account settings' },
  { id: 'ecommerce',      label: 'E-commerce',     icon: '⊕', count: 3,  description: 'Product grids and checkout' },
  { id: 'footers',        label: 'Footers',        icon: '⊘', count: 3,  description: 'Site footer layouts' },
  { id: 'modals',         label: 'Modals',         icon: '⊙', count: 3,  description: 'Dialog and overlay patterns' },
]

export const blocks: Block[] = [
  {
    id: 'hero-01',
    title: 'Centered Hero',
    description: 'Centered layout with headline, subtext, dual CTA buttons and a gradient background accent.',
    category: 'hero',
    tags: ['hero', 'marketing', 'cta'],
    isNew: true,
    componentCount: 3,
  },
  {
    id: 'hero-02',
    title: 'Split Hero with Preview',
    description: 'Left-aligned text and CTAs with an interactive component mockup on the right.',
    category: 'hero',
    tags: ['hero', 'split', 'preview'],
    componentCount: 5,
  },
  {
    id: 'hero-03',
    title: 'Minimal Editorial Hero',
    description: 'Typography-forward hero with large display heading, muted body and a single CTA.',
    category: 'hero',
    tags: ['hero', 'minimal', 'editorial'],
    componentCount: 2,
  },
  {
    id: 'hero-04',
    title: 'Hero with Stats Bar',
    description: 'Full-width hero followed by an inline metrics strip with animated counters.',
    category: 'hero',
    tags: ['hero', 'stats', 'metrics'],
    componentCount: 4,
  },
  {
    id: 'hero-05',
    title: 'Video Background Hero',
    description: 'Dark overlay hero with looping background video, badge label and gradient text.',
    category: 'hero',
    tags: ['hero', 'video', 'dark'],
    isPro: true,
    componentCount: 3,
  },
  {
    id: 'hero-06',
    title: 'Hero with Waitlist Form',
    description: 'Single-input email capture hero with social proof avatars and success toast.',
    category: 'hero',
    tags: ['hero', 'form', 'waitlist'],
    isNew: true,
    componentCount: 4,
  },
  {
    id: 'dashboard-01',
    title: 'Analytics Overview',
    description: 'KPI metric cards with trend arrows, a sparkline chart strip, and recent activity feed.',
    category: 'dashboard',
    tags: ['dashboard', 'analytics', 'charts'],
    isNew: true,
    componentCount: 8,
  },
  {
    id: 'dashboard-02',
    title: 'Full Admin Layout',
    description: 'Complete app shell with sticky sidebar, top bar, breadcrumbs and a main content area.',
    category: 'dashboard',
    tags: ['dashboard', 'layout', 'sidebar'],
    isPro: true,
    componentCount: 12,
  },
  {
    id: 'dashboard-03',
    title: 'Revenue Dashboard',
    description: 'Revenue over time chart, top products table, conversion funnel, and cohort breakdown.',
    category: 'dashboard',
    tags: ['dashboard', 'revenue', 'charts'],
    componentCount: 7,
  },
  {
    id: 'dashboard-04',
    title: 'User Growth Dashboard',
    description: 'User acquisition metrics, retention curve, geographic map and device breakdown.',
    category: 'dashboard',
    tags: ['dashboard', 'users', 'growth'],
    componentCount: 6,
  },
  {
    id: 'dashboard-05',
    title: 'Pipeline Monitor',
    description: 'Real-time pipeline status board with run history, error logs and p95 latency.',
    category: 'dashboard',
    tags: ['dashboard', 'monitoring', 'data'],
    isNew: true,
    componentCount: 9,
  },
  {
    id: 'tables-01',
    title: 'Sortable Data Table',
    description: 'Full-featured table with column sorting, row selection, bulk actions and pagination.',
    category: 'tables',
    tags: ['table', 'data', 'sortable'],
    componentCount: 4,
  },
  {
    id: 'tables-02',
    title: 'CRUD Table with Modals',
    description: 'Accounts table with search, filter, status badges, inline edit and delete confirmation.',
    category: 'tables',
    tags: ['table', 'crud', 'modal'],
    isNew: true,
    componentCount: 6,
  },
  {
    id: 'tables-03',
    title: 'Comparison Table',
    description: 'Feature comparison table with check marks, tooltips and a sticky header row.',
    category: 'tables',
    tags: ['table', 'comparison', 'pricing'],
    componentCount: 3,
  },
  {
    id: 'forms-01',
    title: 'Multi-Step Wizard',
    description: 'Four-step form wizard with progress bar, inline validation and a review summary.',
    category: 'forms',
    tags: ['form', 'wizard', 'steps'],
    componentCount: 7,
  },
  {
    id: 'forms-02',
    title: 'Settings Form',
    description: 'Tabbed settings layout with profile, notifications, security and billing sections.',
    category: 'forms',
    tags: ['form', 'settings', 'tabs'],
    isNew: true,
    componentCount: 6,
  },
  {
    id: 'forms-03',
    title: 'Invite Team Form',
    description: 'Email multi-input with role selector, avatar preview stack and permission matrix.',
    category: 'forms',
    tags: ['form', 'team', 'invite'],
    componentCount: 4,
  },
  {
    id: 'auth-01',
    title: 'Sign In Page',
    description: 'Centered login card with email/password, OAuth buttons, and "forgot password" flow.',
    category: 'authentication',
    tags: ['auth', 'login', 'oauth'],
    componentCount: 4,
  },
  {
    id: 'auth-02',
    title: 'Sign Up Page',
    description: 'Two-column registration with form on the left and feature highlights on the right.',
    category: 'authentication',
    tags: ['auth', 'signup', 'registration'],
    componentCount: 5,
  },
  {
    id: 'auth-03',
    title: 'Two-Factor Auth',
    description: 'OTP code input grid with resend timer, device trust toggle and backup codes.',
    category: 'authentication',
    tags: ['auth', '2fa', 'security'],
    isNew: true,
    componentCount: 4,
  },
  {
    id: 'nav-01',
    title: 'Mega Menu Navbar',
    description: 'Sticky top nav with a full-width dropdown mega menu, search and notification bell.',
    category: 'navigation',
    tags: ['nav', 'mega-menu', 'dropdown'],
    componentCount: 6,
  },
  {
    id: 'nav-02',
    title: 'App Sidebar',
    description: 'Collapsible icon sidebar with workspace switcher, grouped sections and user avatar.',
    category: 'navigation',
    tags: ['nav', 'sidebar', 'app'],
    isPro: true,
    componentCount: 5,
  },
  {
    id: 'pricing-01',
    title: 'Three-Tier Pricing',
    description: 'Monthly/annual toggle, three plan cards with feature lists and a comparison table.',
    category: 'pricing',
    tags: ['pricing', 'billing', 'plans'],
    componentCount: 5,
  },
  {
    id: 'pricing-02',
    title: 'Usage-Based Pricing',
    description: 'Slider-based volume estimator with live price calculation and enterprise CTA.',
    category: 'pricing',
    tags: ['pricing', 'usage', 'calculator'],
    isNew: true,
    componentCount: 4,
  },
  {
    id: 'cards-01',
    title: 'Stats Cards Grid',
    description: 'Four KPI cards with icon, metric, trend indicator and sparkline mini-chart.',
    category: 'cards',
    tags: ['cards', 'stats', 'kpi'],
    componentCount: 3,
  },
  {
    id: 'cards-02',
    title: 'Team Members Grid',
    description: 'Avatar card grid with name, role badge, last-seen status and action dropdown.',
    category: 'cards',
    tags: ['cards', 'team', 'users'],
    componentCount: 4,
  },
  {
    id: 'marketing-01',
    title: 'Feature Grid',
    description: 'Six-column icon feature grid with heading, body text and optional link per item.',
    category: 'marketing',
    tags: ['marketing', 'features', 'grid'],
    componentCount: 3,
  },
  {
    id: 'marketing-02',
    title: 'Logo Wall',
    description: 'Auto-scrolling marquee of partner/customer logos with trust caption.',
    category: 'marketing',
    tags: ['marketing', 'logos', 'trust'],
    componentCount: 2,
  },
  {
    id: 'settings-01',
    title: 'Profile Settings',
    description: 'Avatar upload, personal info form, timezone selector and danger zone section.',
    category: 'settings',
    tags: ['settings', 'profile', 'account'],
    componentCount: 5,
  },
  {
    id: 'settings-02',
    title: 'Team & Permissions',
    description: 'Member list with role dropdowns, invitation modal, and permission matrix table.',
    category: 'settings',
    tags: ['settings', 'team', 'permissions'],
    componentCount: 6,
  },
  {
    id: 'ecommerce-01',
    title: 'Product Grid',
    description: 'Responsive product card grid with image, price badge, rating stars and add-to-cart.',
    category: 'ecommerce',
    tags: ['ecommerce', 'products', 'grid'],
    componentCount: 4,
  },
  {
    id: 'modals-01',
    title: 'Confirmation Dialog',
    description: 'Danger-variant modal with icon, description, confirm input and cancel/confirm buttons.',
    category: 'modals',
    tags: ['modal', 'dialog', 'confirm'],
    componentCount: 3,
  },
  {
    id: 'footers-01',
    title: 'Multi-Column Footer',
    description: 'Four-column link footer with logo, newsletter signup, social icons and legal links.',
    category: 'footers',
    tags: ['footer', 'links', 'newsletter'],
    componentCount: 4,
  },
]

export const components: Component[] = [
  { id: 'badge',       title: 'Badge',        description: 'Status indicators, semantic labels and count bubbles.',       category: 'Foundations', variants: 7,  imports: 'Badge, BadgeCount',                    tags: ['status', 'label'] },
  { id: 'avatar',      title: 'Avatar',       description: 'User initials with color, status dots and stacked groups.',    category: 'Foundations', variants: 4,  imports: 'Avatar, AvatarStack',                  tags: ['user', 'profile'] },
  { id: 'button',      title: 'Button',       description: '6 variants, 3 sizes, loading and disabled states.',            category: 'Display',     variants: 6,  imports: 'Button',                               tags: ['action', 'cta'] },
  { id: 'spinner',     title: 'Spinner',      description: 'Ring, dots, indeterminate bar and shimmer skeleton.',          category: 'Display',     variants: 4,  imports: 'Spinner, Dots, Skeleton',              tags: ['loading', 'feedback'] },
  { id: 'input',       title: 'Input',        description: 'Text field with label, prefix, suffix, error and sizes.',     category: 'Forms',       variants: 5,  imports: 'Input, Textarea',                      tags: ['form', 'text'] },
  { id: 'search',      title: 'Search',       description: 'Global search with kbd hint, chips and autocomplete.',        category: 'Forms',       variants: 3,  imports: 'Search',                               tags: ['form', 'search'] },
  { id: 'dropdown',    title: 'Dropdown',     description: 'Grouped options, check state and danger items.',              category: 'Forms',       variants: 2,  imports: 'Dropdown',                             tags: ['form', 'select'] },
  { id: 'radio',       title: 'Radio Group',  description: 'Standard, card-style and segmented variants.',                category: 'Forms',       variants: 3,  imports: 'RadioGroup',                           tags: ['form', 'choice'] },
  { id: 'checkbox',    title: 'Checkbox',     description: 'Off, on, indeterminate, disabled, error and toggle.',        category: 'Forms',       variants: 5,  imports: 'Checkbox, Toggle',                     tags: ['form', 'boolean'] },
  { id: 'alert',       title: 'Alert',        description: 'Info, success, warning, danger and banner variants.',        category: 'Feedback',    variants: 5,  imports: 'Alert',                                tags: ['feedback', 'status'] },
  { id: 'toast',       title: 'Toast',        description: 'Global notification stack via React context.',                category: 'Feedback',    variants: 4,  imports: 'ToastProvider, useToast',              tags: ['feedback', 'notification'] },
  { id: 'progress',    title: 'Progress',     description: 'Bar, segmented dots and circular — including indeterminate.', category: 'Feedback',    variants: 3,  imports: 'ProgressBar, ProgressCircle',          tags: ['feedback', 'loading'] },
  { id: 'empty-state', title: 'Empty State',  description: 'Icon, title, description and action slots.',                 category: 'Feedback',    variants: 3,  imports: 'EmptyState',                           tags: ['feedback', 'empty'] },
  { id: 'tooltip',     title: 'Tooltip',      description: '4 placements triggered on hover and focus.',                  category: 'Overlay',     variants: 4,  imports: 'Tooltip',                              tags: ['overlay', 'hint'] },
  { id: 'modal',       title: 'Modal',        description: 'Dialog with scrim, icon, body and footer actions.',          category: 'Overlay',     variants: 2,  imports: 'Modal',                                tags: ['overlay', 'dialog'] },
  { id: 'drawer',      title: 'Drawer',       description: 'Right-edge slide-over with header, body, footer.',           category: 'Overlay',     variants: 2,  imports: 'Drawer',                               tags: ['overlay', 'panel'] },
  { id: 'popover',     title: 'Popover',      description: 'Floating panel with 4 placements and click-outside close.',  category: 'Overlay',     variants: 2,  imports: 'Popover',                              tags: ['overlay', 'menu'] },
  { id: 'tabs',        title: 'Tabs',         description: 'Underline, segmented, pill and vertical variants.',          category: 'Navigation',  variants: 4,  imports: 'Tabs',                                 tags: ['nav', 'sections'] },
  { id: 'accordion',   title: 'Accordion',    description: 'Bordered stacked and flush editorial FAQ styles.',           category: 'Navigation',  variants: 2,  imports: 'Accordion',                            tags: ['nav', 'faq'] },
  { id: 'steps',       title: 'Steps',        description: 'Horizontal and vertical with done/active/pending states.',   category: 'Navigation',  variants: 2,  imports: 'Steps',                                tags: ['nav', 'wizard'] },
  { id: 'pagination',  title: 'Pagination',   description: 'Numbered with ellipsis, summary and load-more variants.',   category: 'Navigation',  variants: 3,  imports: 'Pagination',                           tags: ['nav', 'data'] },
  { id: 'navigation',  title: 'Navigation',   description: 'TopNav, Sidebar, Breadcrumb, and BottomTabs.',              category: 'Navigation',  variants: 4,  imports: 'TopNav, Sidebar, Breadcrumb, BottomTabs', tags: ['nav', 'layout'] },
  { id: 'table',       title: 'Table',        description: 'Sortable, selectable rows with checkbox and summary.',      category: 'Data',        variants: 2,  imports: 'Table',                                tags: ['data', 'grid'] },
  { id: 'date-picker', title: 'Date Picker',  description: 'Calendar grid with month nav and today shortcut.',          category: 'Pickers',     variants: 1,  imports: 'DatePicker',                           tags: ['picker', 'calendar'] },
  { id: 'time-picker', title: 'Time Picker',  description: 'Scrollable columns with AM/PM and 24h mode.',              category: 'Pickers',     variants: 2,  imports: 'TimePicker',                           tags: ['picker', 'time'] },
  { id: 'file-upload', title: 'File Upload',  description: 'Single drag-and-drop and multi-file bulk list.',           category: 'Pickers',     variants: 2,  imports: 'FileUploadSingle, FileUploadBulk',     tags: ['picker', 'upload'] },
]

export const componentCategories = [
  'All', 'Foundations', 'Display', 'Forms', 'Feedback', 'Overlay', 'Navigation', 'Data', 'Pickers',
]

export const stats = [
  { value: '27+',   label: 'Components',      sub: 'Fully interactive' },
  { value: '47+',   label: 'UI Blocks',       sub: 'Copy & paste ready' },
  { value: '100%',  label: 'TypeScript',      sub: 'Fully typed' },
  { value: '0',     label: 'Dependencies',    sub: 'Zero runtime deps' },
]
