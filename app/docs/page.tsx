'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { DocLeftSidebar } from '@/components/docs/DocLeftSidebar'
import { DocRightSidebar } from '@/components/docs/DocRightSidebar'
import { components } from '@/lib/data'

// ── TOC ───────────────────────────────────────────────────────────────────────
const tocItems = [
  { id: 'introduction',    label: 'What is SRIIO UI'     },
  { id: 'installation',    label: 'Installation'          },
  { id: 'tailwind-setup',  label: 'Tailwind Setup'        },
  { id: 'first-component', label: 'Your First Component'  },
  { id: 'theming',         label: 'Theming'               },
  { id: 'all-components',  label: 'All 26 Components'     },
  { id: 'ai-integration',  label: 'AI & IDE Integration'  },
  { id: 'rest-api',        label: 'REST API'              },
  { id: 'dark-mode',       label: 'Dark Mode'             },
]

// ── Code block ────────────────────────────────────────────────────────────────
function Code({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {copied ? <><Check size={11} />Copied</> : <><Copy size={11} />Copy</>}
        </button>
      </div>
      <pre className="bg-gray-950 text-gray-100 p-4 text-sm font-mono leading-relaxed overflow-x-auto">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-4 scroll-mt-8 pb-3 border-b border-gray-100 dark:border-gray-800">
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-6 mb-2">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{children}</p>
}

function Callout({ type = 'info', children }: { type?: 'info' | 'tip' | 'warn'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-800 dark:text-blue-300',
    tip:  'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
    warn: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300',
  }
  const icons = { info: 'ℹ', tip: '✓', warn: '⚠' }
  return (
    <div className={`flex gap-3 p-4 rounded-xl border my-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className="flex-shrink-0 font-bold">{icons[type]}</span>
      <div>{children}</div>
    </div>
  )
}

// ── Category colors ───────────────────────────────────────────────────────────
const catColor: Record<string, string> = {
  Foundations: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
  Display:     'bg-blue-100  text-blue-700  dark:bg-blue-500/15  dark:text-blue-400',
  Forms:       'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Feedback:    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Overlay:     'bg-rose-100  text-rose-700  dark:bg-rose-500/15  dark:text-rose-400',
  Navigation:  'bg-cyan-100  text-cyan-700  dark:bg-cyan-500/15  dark:text-cyan-400',
  Data:        'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
  Pickers:     'bg-pink-100  text-pink-700  dark:bg-pink-500/15  dark:text-pink-400',
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const centerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState('introduction')

  // Scroll spy
  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el && centerRef.current) {
      centerRef.current.scrollTo({ top: el.offsetTop - 32, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const root = centerRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { root, rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    )
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="layout-container flex overflow-hidden" style={{ height: 'calc(100vh - 72px)' }}>
        <DocLeftSidebar activeId="" />

        {/* ── Center content ── */}
        <main ref={centerRef} className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 lg:px-10 py-10 max-w-3xl">

            {/* Page title */}
            <div className="mb-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-100 dark:bg-accent-500/15 text-accent-700 dark:text-accent-400 mb-3">
                Getting Started
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                Introduction
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                Everything you need to build beautiful React apps — from a single component to a full design system.
              </p>
            </div>

            {/* ── INTRODUCTION ── */}
            <H2 id="introduction">What is SRIIO UI</H2>
            <P>
              SRIIO UI is a collection of <strong className="text-gray-900 dark:text-white">26 production-ready React components</strong> built with Tailwind CSS.
              Every component ships with TypeScript types, dark mode support, and copy-paste code examples.
            </P>
            <P>
              Unlike heavy UI libraries, SRIIO UI has <strong className="text-gray-900 dark:text-white">zero runtime dependencies</strong>.
              All styling is done with Tailwind classes — no CSS bundles, no runtime overhead.
            </P>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {[
                { value: '26', label: 'Components' },
                { value: '47+', label: 'UI Blocks' },
                { value: '0', label: 'Dependencies' },
                { value: '100%', label: 'TypeScript' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <span className="text-2xl font-extrabold text-accent-600 dark:text-accent-400">{s.value}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* ── INSTALLATION ── */}
            <H2 id="installation">Installation</H2>
            <P>Install the package from npm. It requires React 18+ and Tailwind CSS 3+.</P>

            <Code lang="bash" code="npm install @sriio/ui" />

            <P>Or with other package managers:</P>
            <Code lang="bash" code={`pnpm add @sriio/ui\nyarn add @sriio/ui`} />

            <Callout type="info">
              React and React DOM are peer dependencies — they are not bundled inside <code className="font-mono text-xs bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded">@sriio/ui</code>.
              Your project already has them if you're using Next.js, Vite, or Create React App.
            </Callout>

            {/* ── TAILWIND SETUP ── */}
            <H2 id="tailwind-setup">Tailwind Setup</H2>
            <P>
              SRIIO UI uses Tailwind classes. You need to tell Tailwind to scan the package so its
              classes are included in your build. Add the package to the <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">content</code> array
              in your Tailwind config:
            </P>

            <Code lang="js" code={`// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Add this line ↓
    './node_modules/@sriio/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        // Optional: change the accent color (default is violet)
        accent: require('tailwindcss/colors').violet,
      },
    },
  },
} satisfies Config`} />

            <Callout type="tip">
              The <code className="font-mono text-xs">accent</code> color is what SRIIO UI uses for primary actions, focus rings, and highlights.
              Swap it to any Tailwind color — <code className="font-mono text-xs">blue</code>, <code className="font-mono text-xs">indigo</code>, <code className="font-mono text-xs">emerald</code> — and the entire library updates automatically.
            </Callout>

            {/* ── FIRST COMPONENT ── */}
            <H2 id="first-component">Your First Component</H2>
            <P>
              Import any component directly from <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">@sriio/ui</code> — no barrel files, no wrapping required.
            </P>

            <Code lang="tsx" code={`import { Button } from '@sriio/ui'

export default function Page() {
  return (
    <Button variant="primary" onClick={() => alert('Hello!')}>
      Click me
    </Button>
  )
}`} />

            <P>Here's a slightly more real-world example — a form with a loading state:</P>

            <Code lang="tsx" code={`import { useState } from 'react'
import { Button, Input, Alert } from '@sriio/ui'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await sendEmail()        // your API call
    setLoading(false)
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      {sent && <Alert variant="success" title="Message sent!">We'll get back to you soon.</Alert>}

      <Input label="Your name"  placeholder="Alice" />
      <Input label="Email"      type="email" placeholder="alice@example.com" />
      <Input label="Message"    placeholder="Tell us about your project…" />

      <Button type="submit" loading={loading}>Send message</Button>
    </form>
  )
}`} />

            {/* ── THEMING ── */}
            <H2 id="theming">Theming</H2>
            <P>
              All colors in SRIIO UI reference the <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">accent</code> color scale
              from your Tailwind config. Change it once and every component updates.
            </P>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              {[
                { name: 'Violet (default)', color: 'bg-violet-500' },
                { name: 'Blue',    color: 'bg-blue-500'    },
                { name: 'Emerald', color: 'bg-emerald-500' },
                { name: 'Rose',    color: 'bg-rose-500'    },
              ].map(c => (
                <div key={c.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className={`w-10 h-10 rounded-xl ${c.color} shadow-md`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{c.name}</span>
                </div>
              ))}
            </div>

            <Code lang="js" code={`// tailwind.config.ts — change to blue
const colors = require('tailwindcss/colors')

export default {
  theme: {
    extend: {
      colors: {
        accent: colors.blue,    // swap to any Tailwind color
      },
    },
  },
}`} />

            <H3>Custom brand color</H3>
            <P>You can also define a fully custom scale using CSS variables or direct hex values:</P>
            <Code lang="js" code={`// tailwind.config.ts — custom brand color
export default {
  theme: {
    extend: {
      colors: {
        accent: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',   // primary
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
    },
  },
}`} />

            {/* ── ALL COMPONENTS ── */}
            <H2 id="all-components">All 26 Components</H2>
            <P>
              Click any component to see its full props reference, variants, and copy-paste code.
            </P>

            {/* Group by category */}
            {(['Foundations','Display','Forms','Feedback','Overlay','Navigation','Data','Pickers'] as const).map(cat => {
              const group = components.filter(c => c.category === cat)
              if (!group.length) return null
              return (
                <div key={cat} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${catColor[cat] ?? 'bg-gray-100 text-gray-600'}`}>{cat}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.map(c => (
                      <Link
                        key={c.id}
                        href={`/components/${c.id}`}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-accent-300 dark:hover:border-accent-700 hover:bg-accent-50 dark:hover:bg-accent-500/5 transition-all group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{c.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 line-clamp-1">{c.description}</p>
                        </div>
                        <span className="text-xs font-mono text-gray-400 flex-shrink-0">{c.variants}v</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* ── AI INTEGRATION ── */}
            <H2 id="ai-integration">AI & IDE Integration</H2>
            <P>
              SRIIO UI ships an MCP (Model Context Protocol) server. Once connected, your AI assistant
              can look up any component and return copy-paste code — without you leaving the editor.
            </P>

            <H3>Works in every major IDE</H3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
              {['Claude Desktop','Cursor','VS Code','Windsurf','JetBrains','Continue.dev'].map(ide => (
                <div key={ide} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{ide}</span>
                </div>
              ))}
            </div>

            <H3>Setup (one-time, no install needed)</H3>
            <P>Add this to your AI IDE's MCP config file:</P>

            <Code lang="json" code={`{
  "mcpServers": {
    "sriio-ui": {
      "command": "npx",
      "args": ["-y", "sriio-ui-mcp"]
    }
  }
}`} />

            <P>Config file locations:</P>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 my-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">IDE</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Config file</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    ['Claude Desktop (Mac)',   '~/Library/Application Support/Claude/claude_desktop_config.json'],
                    ['Claude Desktop (Linux)', '~/.config/claude/claude_desktop_config.json'],
                    ['Cursor',                 '~/.cursor/mcp.json'],
                    ['VS Code',                '.vscode/mcp.json (already in this repo)'],
                    ['Windsurf',               '~/.codeium/windsurf/mcp_config.json'],
                    ['JetBrains',              'Settings → Tools → AI Assistant → MCP Servers'],
                  ].map(([ide, path]) => (
                    <tr key={ide} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium">{ide}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-gray-500 dark:text-gray-400">{path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H3>How to use it</H3>
            <P>Once connected, just ask your AI assistant naturally:</P>

            <div className="space-y-2 my-4">
              {[
                '"Show me the Button component"',
                '"Give me a modal with a danger icon"',
                '"How do I use ToastProvider?"',
                '"List all form components"',
              ].map(q => (
                <div key={q} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <span className="text-accent-500 text-sm font-bold flex-shrink-0">→</span>
                  <code className="text-sm text-gray-700 dark:text-gray-300">{q}</code>
                </div>
              ))}
            </div>

            <Callout type="tip">
              VS Code users: the <code className="font-mono text-xs">.vscode/mcp.json</code> config is already included in this repo.
              Open the project and it connects automatically (VS Code v1.102+ required).
            </Callout>

            {/* ── REST API ── */}
            <H2 id="rest-api">REST API</H2>
            <P>
              Every component is also available via a public REST API. Use it from any language,
              tool, or AI model — no authentication required.
            </P>

            <H3>Endpoints</H3>

            <div className="space-y-3 my-4">
              {[
                { method: 'GET', path: '/api/components',         desc: 'List all 26 components with metadata' },
                { method: 'GET', path: '/api/components?q=modal', desc: 'Search by keyword' },
                { method: 'GET', path: '/api/components?category=Forms', desc: 'Filter by category' },
                { method: 'GET', path: '/api/components/{id}',    desc: 'Full code for one component' },
              ].map(ep => (
                <div key={ep.path} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <span className="text-[10px] font-bold font-mono px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                    {ep.method}
                  </span>
                  <div>
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">{ep.path}</code>
                    <p className="text-xs text-gray-500 mt-0.5">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <H3>Example response</H3>
            <P>Fetching a single component returns React, TypeScript, and Tailwind code:</P>

            <Code lang="json" code={`// GET /api/components/button
{
  "id": "button",
  "title": "Button",
  "category": "Display",
  "variants": 6,
  "importLine": "import { Button } from '@sriio/ui'",
  "npm": "npm install @sriio/ui",
  "code": {
    "react": "import { Button } from '@sriio/ui'\\n\\nexport function Example() {\\n  return <Button variant=\\"primary\\">Click me</Button>\\n}",
    "typescript": "interface ButtonProps {\\n  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'\\n  size?: 'sm' | 'md' | 'lg'\\n  loading?: boolean\\n  // ...\\n}",
    "tailwind": "<button class=\\"px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold\\">\\n  Click me\\n</button>"
  }
}`} />

            <Code lang="bash" code={`# Try it right now
curl https://sriio.dev/api/components/button`} />

            {/* ── DARK MODE ── */}
            <H2 id="dark-mode">Dark Mode</H2>
            <P>
              Every SRIIO UI component supports dark mode out of the box. All colors use Tailwind's
              <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded mx-1">dark:</code>
              variant — no extra configuration needed.
            </P>

            <H3>Enable dark mode in Tailwind</H3>
            <P>Set <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">darkMode: 'class'</code> in your config so you control it via a class on <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">&lt;html&gt;</code>:</P>

            <Code lang="js" code={`// tailwind.config.ts
export default {
  darkMode: 'class',      // toggle by adding class="dark" to <html>
  // ...
}`} />

            <H3>Toggle with next-themes</H3>
            <P>The easiest way in Next.js is <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">next-themes</code>:</P>

            <Code lang="bash" code="npm install next-themes" />

            <Code lang="tsx" code={`// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// In any component:
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  )
}`} />

            <Callout type="info">
              This site itself uses <code className="font-mono text-xs">next-themes</code>. Click the theme toggle in the top navbar to try dark mode.
            </Callout>

            {/* Footer nav */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div />
              <Link
                href="/docs/installation"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Installation guide <ExternalLink size={13} />
              </Link>
            </div>

          </div>
        </main>

        {/* ── Right TOC ── */}
        <DocRightSidebar items={tocItems} activeId={activeId} onNavigate={handleNavigate} />
      </div>
    </>
  )
}
