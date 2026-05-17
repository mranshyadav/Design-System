'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Copy, Check, Package } from 'lucide-react'
import { components } from '@/lib/data'
import { DocNavbar } from '@/components/docs/DocNavbar'
import { DocLeftSidebar } from '@/components/docs/DocLeftSidebar'
import { DocRightSidebar } from '@/components/docs/DocRightSidebar'
import { VariantSection } from '@/components/docs/VariantSection'

// ─── variant metadata ────────────────────────────────────────────────────────

const VARIANT_NAMES: Record<string, string[]> = {
  button:       ['Default', 'Outline', 'Ghost', 'With Icons', 'Sizes', 'States'],
  badge:        ['Semantic Colors', 'Outlined', 'Pills', 'With Dot', 'Removable', 'Stacked', 'Sizes'],
  avatar:       ['Default', 'With Status', 'Stacked Group', 'Fallback'],
  spinner:      ['Ring Spinner', 'Dots', 'Progress Bar', 'Skeleton'],
  input:        ['Default', 'With Prefix & Suffix', 'Error State', 'Floating Label', 'Sizes'],
  search:       ['Default', 'With Autocomplete', 'With Chips'],
  dropdown:     ['Default', 'Grouped Options'],
  radio:        ['Default', 'Card Style', 'Segmented'],
  checkbox:     ['Default', 'Indeterminate', 'Toggle Switch', 'Card', 'Disabled'],
  alert:        ['Info', 'Success', 'Warning', 'Danger', 'Banner'],
  toast:        ['Default', 'With Action', 'Loading State', 'Stack'],
  progress:     ['Bar', 'Segmented', 'Circular'],
  'empty-state':['Default', 'With Action', 'Compact'],
  tooltip:      ['Top', 'Right', 'Bottom', 'Left'],
  modal:        ['Default', 'With Icon'],
  drawer:       ['Right Slide', 'Left Slide'],
  popover:      ['Default', 'With Actions'],
  tabs:         ['Underline', 'Segmented', 'Pill', 'Vertical'],
  accordion:    ['Bordered', 'Flush'],
  steps:        ['Horizontal', 'Vertical'],
  pagination:   ['Numbered', 'With Summary', 'Load More'],
  navigation:   ['Top Nav', 'Sidebar', 'Breadcrumb', 'Bottom Tabs'],
  table:        ['Default', 'Sortable & Selectable'],
  'date-picker':['Calendar Grid'],
  'time-picker':['12-hour', '24-hour'],
  'file-upload':['Single Drop Zone', 'Multi-file List'],
}

const VARIANT_DESCS: Record<string, string[]> = {
  button: [
    'Solid filled buttons across all semantic variants — primary, secondary, danger, and success.',
    'Outlined buttons with transparent backgrounds. Ideal for secondary actions.',
    'Ghost buttons with no border or background. Great for tertiary or subtle actions.',
    'Buttons with leading and trailing icons for added visual context.',
    'Full size scale from xs through xl for use in any density context.',
    'Disabled and loading states to communicate interactive feedback.',
  ],
  badge: [
    'Semantic color system: info, success, warning, and danger.',
    'Outlined badge variants with transparent backgrounds.',
    'Fully rounded pill shape for tags and labels.',
    'With a colored status dot for live indicator use cases.',
    'Removable badges with an ×  dismiss button.',
    'Stacked/overlapping badge group for user presence.',
    'Size variants from xs to lg.',
  ],
  avatar: [
    'Initial-based avatars with auto-assigned background colors.',
    'Avatars with live status indicator dots (online, away, offline).',
    'Stacked avatar group with overflow count badge.',
    'Graceful image fallback to initials or placeholder.',
  ],
  spinner: [
    'Classic ring spinner for full-page or inline loading.',
    'Three-dot bouncing animation for subtle load states.',
    'Horizontal indeterminate progress bar.',
    'Skeleton shimmer placeholder for content loading.',
  ],
  input: [
    'Standard text input with label and helper text.',
    'With leading icon prefix and trailing action suffix.',
    'Error state with validation message and red border.',
    'Floating animated label that moves on focus.',
    'Full size scale: sm, md (default), and lg.',
  ],
  search: [
    'Search input with keyboard shortcut hint.',
    'Live autocomplete dropdown with suggestions.',
    'Chip-based search with multi-token input.',
  ],
  dropdown: [
    'Basic single-select dropdown menu.',
    'Grouped options with section headings.',
  ],
  radio: [
    'Standard radio group with label and description.',
    'Card-style radio buttons for visual selection.',
    'Segmented control for compact single-choice UI.',
  ],
  checkbox: [
    'Standard checkbox with label text.',
    'Indeterminate state for bulk selection.',
    'Toggle/switch style checkbox.',
    'Card-style checkbox with icon and description.',
    'Disabled state variants.',
  ],
  alert: [
    'Informational alert with icon and description.',
    'Success confirmation alert.',
    'Warning alert for cautionary messages.',
    'Danger alert for critical errors.',
    'Full-width dismissible banner.',
  ],
  toast: [
    'Default notification toast.',
    'Toast with an inline action button.',
    'Loading toast with spinner.',
    'Stacked toast queue.',
  ],
  progress: [
    'Horizontal progress bar with label and percentage.',
    'Segmented step progress.',
    'Circular progress ring.',
  ],
  'empty-state': [
    'Full empty state with icon, title, and description.',
    'Empty state with a primary action CTA.',
    'Compact inline empty state for tables and lists.',
  ],
  tooltip: [
    'Tooltip positioned above the trigger.',
    'Tooltip to the right of the trigger.',
    'Tooltip positioned below the trigger.',
    'Tooltip to the left of the trigger.',
  ],
  modal: [
    'Standard dialog with header, body, and footer actions.',
    'Dialog with a large icon header for confirmations.',
  ],
  drawer: [
    'Slide-over panel from the right edge.',
    'Slide-over panel from the left edge.',
  ],
  popover: [
    'Basic popover with content and close.',
    'Popover with action buttons in the footer.',
  ],
  tabs: [
    'Underline indicator tabs (default).',
    'Segmented pill tabs for compact contexts.',
    'Rounded pill navigation tabs.',
    'Vertical tab list for sidebar navigation.',
  ],
  accordion: [
    'Bordered accordion with dividers between items.',
    'Flush accordion without external borders.',
  ],
  steps: [
    'Horizontal step-by-step wizard indicator.',
    'Vertical step list for mobile or sidebar use.',
  ],
  pagination: [
    'Numbered pagination with prev/next and ellipsis.',
    'Pagination with result count summary.',
    'Infinite scroll load-more button.',
  ],
  navigation: [
    'Top navigation bar with links and actions.',
    'Collapsible sidebar navigation.',
    'Breadcrumb trail for deep hierarchies.',
    'Mobile-friendly bottom tab bar.',
  ],
  table: [
    'Clean data table with header and rows.',
    'Sortable columns with row selection checkboxes.',
  ],
  'date-picker': ['Full calendar grid with month navigation.'],
  'time-picker': ['12-hour time picker with AM/PM selector.', '24-hour time picker.'],
  'file-upload': [
    'Single-file drag-and-drop zone.',
    'Multi-file list with progress indicators.',
  ],
}

// ─── preview builder ──────────────────────────────────────────────────────────

function Preview({ id, vi }: { id: string; vi: number }) {
  const base = 'flex items-center justify-center w-full min-h-[180px] p-8'

  if (id === 'button') {
    const variants = [
      <div key="d" className="flex flex-wrap gap-3 justify-center">
        {[['bg-accent-500 hover:bg-accent-600 text-white','Primary'],['bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200','Secondary'],['bg-red-500 hover:bg-red-600 text-white','Danger'],['bg-emerald-500 hover:bg-emerald-600 text-white','Success']].map(([c,l])=>(
          <button key={l} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${c}`}>{l}</button>
        ))}
      </div>,
      <div key="o" className="flex flex-wrap gap-3 justify-center">
        {[['border-accent-500 text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-500/10','Primary'],['border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800','Secondary'],['border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10','Danger']].map(([c,l])=>(
          <button key={l} className={`px-4 py-2 rounded-lg text-sm font-semibold border bg-transparent transition-colors ${c}`}>{l}</button>
        ))}
      </div>,
      <div key="g" className="flex flex-wrap gap-3 justify-center">
        {[['text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-500/10','Ghost Primary'],['text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800','Ghost Default'],['text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10','Ghost Danger']].map(([c,l])=>(
          <button key={l} className={`px-4 py-2 rounded-lg text-sm font-semibold bg-transparent transition-colors ${c}`}>{l}</button>
        ))}
      </div>,
      <div key="i" className="flex flex-wrap gap-3 justify-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-semibold"><span>+</span> New Item</button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold bg-white dark:bg-gray-900"><span>↓</span> Download</button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold"><span>🗑</span> Delete</button>
      </div>,
      <div key="s" className="flex flex-wrap items-center gap-3 justify-center">
        {[['px-2 py-1 text-xs','xs'],['px-3 py-1.5 text-sm','sm'],['px-4 py-2 text-sm','md'],['px-5 py-2.5 text-base','lg'],['px-6 py-3 text-lg','xl']].map(([c,l])=>(
          <button key={l} className={`rounded-lg bg-accent-500 text-white font-semibold ${c}`}>{l}</button>
        ))}
      </div>,
      <div key="st" className="flex flex-wrap gap-3 justify-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-semibold opacity-75 cursor-wait">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          Loading...
        </button>
        <button disabled className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 text-sm font-semibold cursor-not-allowed">Disabled</button>
        <button className="px-4 py-2 rounded-lg border border-accent-500 text-accent-600 dark:text-accent-400 text-sm font-semibold bg-transparent">Active</button>
      </div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'badge') {
    const variants = [
      <div key="c" className="flex flex-wrap gap-2 justify-center">{[['bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400','Info'],['bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400','Success'],['bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400','Warning'],['bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400','Danger'],['bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300','Default']].map(([c,l])=><span key={l} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${c}`}>{l}</span>)}</div>,
      <div key="o" className="flex flex-wrap gap-2 justify-center">{[['border-blue-400 text-blue-600','Info'],['border-emerald-400 text-emerald-600','Success'],['border-amber-400 text-amber-600','Warning'],['border-red-400 text-red-600','Danger']].map(([c,l])=><span key={l} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-transparent ${c}`}>{l}</span>)}</div>,
      <div key="p" className="flex flex-wrap gap-2 justify-center">{[['bg-violet-100 text-violet-700','Design'],['bg-sky-100 text-sky-700','Frontend'],['bg-pink-100 text-pink-700','React'],['bg-emerald-100 text-emerald-700','Open Source']].map(([c,l])=><span key={l} className={`px-3 py-1 rounded-full text-xs font-medium ${c}`}>{l}</span>)}</div>,
      <div key="dot" className="flex flex-wrap gap-3 justify-center">{[['bg-emerald-100 text-emerald-700','bg-emerald-500','Online'],['bg-amber-100 text-amber-700','bg-amber-500','Away'],['bg-gray-100 text-gray-600','bg-gray-400','Offline']].map(([c,d,l])=><span key={l} className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${c}`}><span className={`w-1.5 h-1.5 rounded-full ${d}`}/>{l}</span>)}</div>,
      <div key="r" className="flex flex-wrap gap-2 justify-center">{['React','TypeScript','Next.js','Tailwind'].map(t=><span key={t} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{t}<button className="ml-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">×</button></span>)}</div>,
      <div key="st" className="flex items-center">{['bg-violet-500','bg-blue-500','bg-emerald-500','bg-amber-500'].map((c,i)=><div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold ${c}`} style={{marginLeft: i ? -8 : 0}}>{String.fromCharCode(65+i)}</div>)}<div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500" style={{marginLeft:-8}}>+3</div></div>,
      <div key="sz" className="flex flex-wrap items-center gap-3 justify-center">{[['text-[10px] px-2 py-px','xs'],['text-xs px-2.5 py-0.5','sm'],['text-sm px-3 py-1','md'],['text-base px-4 py-1.5','lg']].map(([c,l])=><span key={l} className={`rounded-full bg-accent-100 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400 font-semibold ${c}`}>{l} badge</span>)}</div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'avatar') {
    const variants = [
      <div key="d" className="flex gap-3 justify-center">{[['bg-violet-500','A'],['bg-blue-500','B'],['bg-emerald-500','C'],['bg-amber-500','D'],['bg-rose-500','E']].map(([c,l])=><div key={l} className={`w-10 h-10 rounded-full ${c} flex items-center justify-center text-white font-bold text-sm`}>{l}</div>)}</div>,
      <div key="s" className="flex gap-4 justify-center">{[['bg-violet-500','A','bg-emerald-500'],['bg-blue-500','B','bg-amber-500'],['bg-rose-500','C','bg-gray-400']].map(([c,l,dot])=><div key={l} className="relative"><div className={`w-10 h-10 rounded-full ${c} flex items-center justify-center text-white font-bold text-sm`}>{l}</div><div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${dot} border-2 border-white dark:border-gray-900`}/></div>)}</div>,
      <div key="g" className="flex items-center">{[['bg-violet-500','bg-blue-500','bg-emerald-500','bg-amber-500','bg-rose-500']].flat().map((c,i)=><div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-bold text-xs`} style={{marginLeft:i?-8:0}}>{String.fromCharCode(65+i)}</div>)}<div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-gray-500" style={{marginLeft:-8}}>+5</div></div>,
      <div key="f" className="flex gap-3 justify-center">{[['bg-gray-200 dark:bg-gray-700 text-gray-400','?'],['bg-gray-100 dark:bg-gray-800 text-gray-400','🖼'],['bg-accent-100 dark:bg-accent-900/30 text-accent-500','J']].map(([c,l])=><div key={l} className={`w-10 h-10 rounded-full ${c} flex items-center justify-center font-bold`}>{l}</div>)}</div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'spinner') {
    const variants = [
      <div key="r" className="flex gap-6 items-center justify-center">{['w-6 h-6 border-2','w-8 h-8 border-2','w-10 h-10 border-3'].map((c,i)=><div key={i} className={`${c} border-accent-500 border-t-transparent rounded-full animate-spin`}/>)}</div>,
      <div key="d" className="flex gap-2 justify-center">{[0,1,2].map(i=><div key={i} className="w-2.5 h-2.5 bg-accent-500 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</div>,
      <div key="p" className="w-full max-w-xs flex flex-col gap-3"><div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"><div className="h-full w-2/3 bg-accent-500 rounded-full"/></div><div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"><div className="h-full bg-accent-400 rounded-full animate-pulse" style={{width:'45%'}}/></div></div>,
      <div key="sk" className="w-full max-w-xs space-y-2">{[['w-full h-4'],['w-4/5 h-4'],['w-3/5 h-4'],['w-2/3 h-3']].map(([c],i)=><div key={i} className={`${c} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}/>)}</div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'input') {
    const variants = [
      <div key="d" className="w-full max-w-xs"><label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email address</label><input readOnly value="user@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"/><p className="mt-1.5 text-xs text-gray-400">We'll never share your email.</p></div>,
      <div key="p" className="w-full max-w-xs space-y-3">
        <div className="flex items-center gap-0 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900"><span className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-400 text-sm border-r border-gray-200 dark:border-gray-700">https://</span><input readOnly value="mysite.com" className="flex-1 px-3 py-2.5 text-sm bg-transparent text-gray-900 dark:text-white focus:outline-none"/></div>
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"><span className="pl-3 text-gray-400">🔍</span><input readOnly placeholder="Search..." className="flex-1 px-2 py-2.5 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"/></div>
      </div>,
      <div key="e" className="w-full max-w-xs"><label className="block text-xs font-semibold text-red-600 mb-1.5">Password</label><input readOnly value="abc" className="w-full px-3.5 py-2.5 rounded-xl border border-red-400 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none ring-1 ring-red-400"/><p className="mt-1.5 text-xs text-red-500">Password must be at least 8 characters.</p></div>,
      <div key="fl" className="w-full max-w-xs"><div className="relative"><input readOnly value="John Doe" className="w-full px-3.5 pt-5 pb-2 rounded-xl border border-accent-500 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none ring-2 ring-accent-500/20 peer"/><label className="absolute left-3.5 top-1.5 text-[10px] font-semibold text-accent-500 transition-all">Full name</label></div></div>,
      <div key="sz" className="w-full max-w-xs space-y-2">{[['py-1.5 px-3 text-xs rounded-lg','Small'],['py-2.5 px-3.5 text-sm rounded-xl','Medium (default)'],['py-3.5 px-4 text-base rounded-xl','Large']].map(([c,l])=><input key={l} readOnly placeholder={l} className={`w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none ${c}`}/>)}</div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'alert') {
    const variants = [
      <div key="i" className="w-full max-w-sm p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"><div className="font-semibold text-sm mb-0.5">ℹ Heads up!</div><div className="text-xs opacity-80">You have 3 unread messages in your inbox.</div></div>,
      <div key="s" className="w-full max-w-sm p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"><div className="font-semibold text-sm mb-0.5">✓ Successfully saved!</div><div className="text-xs opacity-80">Your changes have been saved and are now live.</div></div>,
      <div key="w" className="w-full max-w-sm p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"><div className="font-semibold text-sm mb-0.5">⚠ Billing issue</div><div className="text-xs opacity-80">Your payment method expires in 7 days. Update it now.</div></div>,
      <div key="d" className="w-full max-w-sm p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"><div className="font-semibold text-sm mb-0.5">✕ Delete failed</div><div className="text-xs opacity-80">You don't have permission to delete this resource.</div></div>,
      <div key="b" className="w-full p-3.5 bg-accent-500 text-white flex items-center justify-between rounded-xl"><div><span className="font-semibold text-sm">🚀 New version available!</span><span className="text-xs opacity-80 ml-2">v2.1.0 is ready to install.</span></div><button className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">Update now</button></div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'tabs') {
    const items = ['Overview','Analytics','Settings','Billing']
    const variants = [
      <div key="u" className="w-full max-w-sm"><div className="flex border-b border-gray-200 dark:border-gray-700">{items.map((t,i)=><button key={t} className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${i===0?'border-accent-500 text-accent-600 dark:text-accent-400':'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>{t}</button>)}</div><div className="pt-4 text-sm text-gray-500 dark:text-gray-400">Content for <strong className="text-gray-900 dark:text-white">Overview</strong> tab.</div></div>,
      <div key="seg" className="w-full max-w-sm"><div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">{['Monthly','Annual','Enterprise'].map((t,i)=><button key={t} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${i===1?'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm':'text-gray-500 dark:text-gray-400'}`}>{t}</button>)}</div></div>,
      <div key="pill" className="w-full max-w-sm"><div className="flex gap-1 flex-wrap">{items.map((t,i)=><button key={t} className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${i===0?'bg-accent-500 text-white':'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{t}</button>)}</div></div>,
      <div key="vert" className="flex gap-4 w-full max-w-sm"><div className="flex flex-col gap-0.5 flex-shrink-0">{items.map((t,i)=><button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg text-left transition-all ${i===0?'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400':'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{t}</button>)}</div><div className="flex-1 text-sm text-gray-500 dark:text-gray-400 pt-1">Selected: <strong className="text-gray-900 dark:text-white">Overview</strong></div></div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'modal') {
    const variants = [
      <div key="d" className="relative w-full max-w-sm">
        <div className="absolute inset-0 -m-8 bg-black/20 dark:bg-black/40 rounded-2xl"/>
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 z-10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Edit Profile</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update your display name and email address.</p>
          <div className="space-y-3 mb-5"><input readOnly placeholder="Display name" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"/><input readOnly placeholder="Email" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"/></div>
          <div className="flex gap-2 justify-end"><button className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Cancel</button><button className="px-4 py-2 text-sm rounded-lg bg-accent-500 text-white font-semibold">Save changes</button></div>
        </div>
      </div>,
      <div key="ic" className="relative w-full max-w-xs">
        <div className="absolute inset-0 -m-8 bg-black/20 dark:bg-black/40 rounded-2xl"/>
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 text-center z-10">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4 text-2xl">⚠</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Delete account?</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">This will permanently delete all your data. This action cannot be undone.</p>
          <div className="flex gap-2"><button className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Cancel</button><button className="flex-1 px-4 py-2 text-sm rounded-lg bg-red-500 text-white font-semibold">Yes, delete</button></div>
        </div>
      </div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'progress') {
    const variants = [
      <div key="b" className="w-full max-w-sm space-y-4">
        {[['accent','75','Uploading…'],['emerald','100','Complete'],['amber','40','Processing…'],['red','15','Syncing…']].map(([c,v,l])=>(
          <div key={l}><div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-gray-400">{l}</span><span className="font-mono text-gray-500">{v}%</span></div><div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800"><div className={`h-full rounded-full bg-${c}-500 transition-all`} style={{width:`${v}%`}}/></div></div>
        ))}
      </div>,
      <div key="seg" className="w-full max-w-xs space-y-4">
        <div><div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Step 3 of 5</div><div className="flex gap-1">{[1,2,3,4,5].map(i=><div key={i} className={`flex-1 h-2 rounded-full ${i<=3?'bg-accent-500':'bg-gray-100 dark:bg-gray-800'}`}/>)}</div></div>
      </div>,
      <div key="c" className="flex gap-6 justify-center">{[[75,'accent'],[100,'emerald'],[40,'amber']].map(([v,c])=>{const r=20;const circ=2*Math.PI*r;const offset=circ-((v as number)/100)*circ;return(<div key={c} className="flex flex-col items-center gap-1"><svg width="56" height="56" className="-rotate-90"><circle cx="28" cy="28" r={r} fill="none" className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="4"/><circle cx="28" cy="28" r={r} fill="none" className={`stroke-${c}-500`} strokeWidth="4" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}/></svg><span className="text-xs font-mono text-gray-500">{v}%</span></div>)})}</div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'tooltip') {
    const positions = [
      <div key="t" className="flex flex-col items-center gap-1">
        <div className="px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs shadow-lg">Tooltip content</div>
        <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"/>
        <button className="px-4 py-2 rounded-lg border border-dashed border-accent-400 text-accent-600 dark:text-accent-400 text-sm font-medium">Hover me</button>
      </div>,
      <div key="r" className="flex items-center gap-1">
        <button className="px-4 py-2 rounded-lg border border-dashed border-accent-400 text-accent-600 dark:text-accent-400 text-sm font-medium">Hover me</button>
        <div className="border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"/>
        <div className="px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs shadow-lg">Tooltip content</div>
      </div>,
      <div key="b" className="flex flex-col items-center gap-1">
        <button className="px-4 py-2 rounded-lg border border-dashed border-accent-400 text-accent-600 dark:text-accent-400 text-sm font-medium">Hover me</button>
        <div className="border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"/>
        <div className="px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs shadow-lg">Tooltip content</div>
      </div>,
      <div key="l" className="flex items-center gap-1">
        <div className="px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs shadow-lg">Tooltip content</div>
        <div className="border-4 border-transparent border-l-gray-900 dark:border-l-gray-700"/>
        <button className="px-4 py-2 rounded-lg border border-dashed border-accent-400 text-accent-600 dark:text-accent-400 text-sm font-medium">Hover me</button>
      </div>,
    ]
    return <div className={base}>{positions[vi] ?? positions[0]}</div>
  }

  if (id === 'pagination') {
    const variants = [
      <div key="n" className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1">{['‹',...[1,2,3,'…',8],'›'].map((p,i)=><button key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${p===2?'bg-accent-500 text-white font-semibold':'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>{p}</button>)}</div>
      </div>,
      <div key="s" className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1">{['‹',...[1,2,3,'…',12],'›'].map((p,i)=><button key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${p===2?'bg-accent-500 text-white font-semibold':'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>{p}</button>)}</div>
        <p className="text-xs text-gray-400">Showing <strong className="text-gray-700 dark:text-gray-300">11–20</strong> of <strong className="text-gray-700 dark:text-gray-300">156 results</strong></p>
      </div>,
      <div key="lm" className="flex flex-col items-center gap-3 w-full max-w-xs">
        <div className="w-full space-y-2">{[1,2,3].map(i=><div key={i} className="h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"/>)}</div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Load more <span className="text-gray-400">↓</span></button>
      </div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  if (id === 'table') {
    const rows = [['Alex Johnson','alex@acme.com','Admin','Active'],['Sam Rivera','sam@acme.com','Editor','Active'],['Jordan Lee','jordan@acme.com','Viewer','Inactive']]
    const variants = [
      <div key="d" className="w-full max-w-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 gap-4">{['Name','Email','Role','Status'].map(h=><span key={h} className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex-1">{h}</span>)}</div>
        {rows.map(([n,e,r,s])=><div key={n} className="flex items-center px-4 py-3 border-t border-gray-100 dark:border-gray-700/50 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"><span className="text-sm font-medium text-gray-900 dark:text-white flex-1">{n}</span><span className="text-xs text-gray-500 flex-1 font-mono">{e}</span><span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{r}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${s==='Active'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400':'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}`}>{s}</span></div>)}
      </div>,
      <div key="s" className="w-full max-w-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 gap-4"><div className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 mr-1"/>{['Name ↕','Email','Role','Status'].map(h=><span key={h} className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">{h}</span>)}</div>
        {rows.map(([n,e,r,s],ri)=><div key={n} className={`flex items-center px-4 py-3 border-t border-gray-100 dark:border-gray-700/50 gap-4 ${ri===1?'bg-accent-50/50 dark:bg-accent-500/5':''}`}><div className={`w-4 h-4 rounded border-2 mr-1 flex items-center justify-center ${ri===1?'bg-accent-500 border-accent-500':'border-gray-300 dark:border-gray-600'}`}>{ri===1&&<span className="text-white text-[8px] font-bold">✓</span>}</div><span className="text-sm font-medium text-gray-900 dark:text-white flex-1">{n}</span><span className="text-xs text-gray-500 flex-1 font-mono">{e}</span><span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{r}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${s==='Active'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400':'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}`}>{s}</span></div>)}
      </div>,
    ]
    return <div className={base}>{variants[vi] ?? variants[0]}</div>
  }

  // ── generic fallback for remaining components ───────────────────────────────
  const colors = ['bg-accent-500','bg-emerald-500','bg-violet-500','bg-amber-500','bg-rose-500','bg-sky-500']
  const c = colors[vi % colors.length]
  return (
    <div className={`${base} flex-col gap-3`}>
      <div className={`w-14 h-14 rounded-2xl ${c} flex items-center justify-center text-2xl text-white shadow-lg`}>
        {['◈','⊞','⊟','◉','⊙','↗','≡','⊕'][vi % 8]}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">{id} — {VARIANT_NAMES[id]?.[vi] ?? `Variant ${vi + 1}`}</p>
        <p className="text-xs text-gray-400 mt-0.5">Interactive preview</p>
      </div>
    </div>
  )
}

// ─── code generator ───────────────────────────────────────────────────────────

function buildCode(id: string, imports: string, label: string) {
  const comp = imports.split(',')[0].trim()
  return {
    react: `import { ${imports} } from '@sriio/ui'\n\nexport default function Example() {\n  return (\n    <${comp}\n      variant="${label.toLowerCase().replace(/\s+/g, '-')}"\n    />\n  )\n}`,
    html: `<!-- ${label} variant -->\n<div class="${id}-${label.toLowerCase().replace(/\s+/g, '-')}">\n  <!-- ${comp} content -->\n</div>`,
    tailwind: `<!-- Tailwind implementation -->\n<div class="flex items-center gap-3 p-4 rounded-xl\n     bg-white border border-gray-200\n     dark:bg-gray-900 dark:border-gray-800">\n  <!-- ${label} content -->\n</div>`,
    typescript: `import type { ${comp}Props } from '@sriio/ui'\n\nconst props: ${comp}Props = {\n  variant: '${label.toLowerCase().replace(/\s+/g, '-')}',\n  size: 'md',\n}\n\nexport { props }`,
  }
}

// ─── install snippet ──────────────────────────────────────────────────────────

function InstallSnippet({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gray-950 border border-gray-800">
      <code className="text-sm font-mono text-gray-300">{text}</code>
      <button onClick={copy} className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
        {copied ? <><Check size={13} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={13} /> Copy</>}
      </button>
    </div>
  )
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ComponentDocPage({ params }: { params: { slug: string } }) {
  const component = components.find(c => c.id === params.slug)
  if (!component) notFound()

  const [activeId, setActiveId] = useState(`variant-0`)
  const centerRef = useRef<HTMLElement>(null)

  const variantNames = VARIANT_NAMES[component.id] ?? []
  const variantDescs = VARIANT_DESCS[component.id] ?? []
  const variants = Array.from({ length: component.variants }, (_, i) => ({
    id: `variant-${i}`,
    label: variantNames[i] ?? `Variant ${i + 1}`,
    desc: variantDescs[i] ?? `${component.title} — ${variantNames[i] ?? `variant ${i + 1}`}.`,
    index: i,
  }))

  const tocItems = variants.map(v => ({ id: v.id, label: v.label }))

  // scrollspy
  useEffect(() => {
    const el = centerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { root: el, rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    )
    variants.forEach(v => {
      const sec = el.querySelector(`#${v.id}`)
      if (sec) observer.observe(sec)
    })
    return () => observer.disconnect()
  }, [component.id])

  const scrollTo = useCallback((id: string) => {
    const el = centerRef.current?.querySelector(`#${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white dark:bg-gray-950">
      <DocNavbar currentSlug={params.slug} />

      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        <DocLeftSidebar activeId={params.slug} />

        {/* ── center content ── */}
        <main ref={centerRef} className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto px-8 py-10">

            {/* breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/components" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Components</Link>
              <span>/</span>
              <span className="text-gray-500 dark:text-gray-400 capitalize">{component.category}</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{component.title}</span>
            </nav>

            {/* header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-semibold capitalize">
                  {component.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-mono">
                  {component.variants} variant{component.variants !== 1 ? 's' : ''}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                {component.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                {component.description}
              </p>
            </div>

            {/* install */}
            <div className="mb-8 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Installation</h2>
              <InstallSnippet text="npm install @sriio/ui" />
              <InstallSnippet text={`import { ${component.imports} } from '@sriio/ui'`} />
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />

            {/* variants heading */}
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8 flex items-center gap-2">
              <Package size={12} />
              Variants
            </h2>

            {/* variant sections */}
            {variants.map(v => (
              <VariantSection
                key={v.id}
                id={v.id}
                label={v.label}
                description={v.desc}
                preview={<Preview id={component.id} vi={v.index} />}
                code={buildCode(component.id, component.imports, v.label)}
                componentId={component.id}
                index={v.index}
              />
            ))}

            <div className="h-24" />
          </div>
        </main>

        <DocRightSidebar items={tocItems} activeId={activeId} onNavigate={scrollTo} />
      </div>
    </div>
  )
}
