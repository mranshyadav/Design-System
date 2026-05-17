'use client'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Copy, Check, Code2, ExternalLink } from 'lucide-react'
import { components } from '@/lib/data'
import clsx from 'clsx'

export default function ComponentDetailPage({ params }: { params: { slug: string } }) {
  const component = components.find(c => c.id === params.slug)
  if (!component) notFound()

  const [activeVariant, setActiveVariant] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  const sampleCode = `import { ${component.title} } from '@/components/ui/${component.id}'

export default function Example() {
  return (
    <${component.title}
      variant="default"
      size="md"
    >
      ${component.title} content
    </${component.title}>
  )
}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const related = components
    .filter(c => c.category === component.category && c.id !== component.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/components" className="hover:text-gray-900 dark:hover:text-white transition-colors">Components</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium capitalize">{component.category}</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{component.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-semibold capitalize mb-2">
                {component.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                {component.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{component.description}</p>
            </div>

            {/* Variant selector */}
            {component.variants > 1 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {Array.from({ length: Math.min(component.variants, 6) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(i)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                      activeVariant === i
                        ? 'bg-accent-500 text-white border-accent-500'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent-300'
                    )}
                  >
                    Variant {i + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Preview / Code tabs */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-card">
              <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  {(['preview', 'code'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={clsx(
                        'flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all capitalize',
                        activeTab === tab
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      )}
                    >
                      {tab === 'code' ? <Code2 size={12} /> : null}
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-accent-500 hover:bg-accent-600 text-white'
                  )}
                >
                  {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="min-h-64 flex items-center justify-center p-8 bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[image:linear-gradient(to_right,rgb(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.03)_1px,transparent_1px)]">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-3">◈</div>
                    <p className="text-sm">{component.title} preview</p>
                    <p className="text-xs mt-1 text-gray-300 dark:text-gray-600">Variant {activeVariant + 1} of {component.variants}</p>
                  </div>
                </div>
              ) : (
                <div className="p-5">
                  <div className="rounded-xl bg-gray-950 border border-gray-800 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-gray-900/50">
                      <div className="flex gap-1.5">
                        {[1,2,3].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-700" />)}
                      </div>
                      <span className="text-xs text-gray-500 font-mono ml-2">{component.id}.tsx</span>
                    </div>
                    <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      <code>{sampleCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Component info</h3>
              <dl className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                  <dd className="font-medium text-gray-900 dark:text-white capitalize">{component.category}</dd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Variants</dt>
                  <dd className="font-mono text-gray-900 dark:text-white">{component.variants}</dd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Framework</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">React</dd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Styling</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">Tailwind CSS</dd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">License</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">MIT</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Related components</h3>
                <div className="space-y-1">
                  {related.map(c => (
                    <Link
                      key={c.id}
                      href={`/components/${c.id}`}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors truncate">{c.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{c.variants} variants</p>
                      </div>
                      <ExternalLink size={12} className="flex-shrink-0 text-gray-300 group-hover:text-accent-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
