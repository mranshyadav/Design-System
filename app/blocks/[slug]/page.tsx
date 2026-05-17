'use client'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Eye, Code2, Copy, Check, ExternalLink, Bookmark, BookmarkCheck, Share2 } from 'lucide-react'
import { blocks } from '@/lib/data'
import { PreviewMockup } from '@/components/blocks/PreviewMockup'
import clsx from 'clsx'

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl bg-gray-950 border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {[1,2,3].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-700" />)}
          </div>
          <span className="text-xs text-gray-500 font-mono ml-2">component.tsx</span>
        </div>
        <button
          onClick={handleCopy}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700'
          )}
        >
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy code</>}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

function BlockPreview({ block }: { block: typeof blocks[0] }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const sampleCode = `import { ${block.title.replace(/\s+/g, '')} } from '@/components/blocks/${block.category}'

export default function Example() {
  return (
    <${block.title.replace(/\s+/g, '')}
      title="${block.title}"
      description="${block.description}"
    />
  )
}`

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(sampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-card">
      {/* Tab bar */}
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
              {tab === 'preview' ? <Eye size={12} /> : <Code2 size={12} />}
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(b => !b)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700 transition-all"
          >
            {bookmarked
              ? <BookmarkCheck size={12} className="text-accent-500" />
              : <Bookmark size={12} />}
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleCopyCode}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-accent-500 hover:bg-accent-600 text-white'
            )}
          >
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy code</>}
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'preview' ? (
        <div className="min-h-[500px] bg-gray-50 dark:bg-gray-800/30 bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[image:linear-gradient(to_right,rgb(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.02)_1px,transparent_1px)] flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex gap-1.5">
                {['bg-red-400','bg-amber-400','bg-green-400'].map(c => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 mx-3 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center px-3">
                <span className="text-[10px] text-gray-400 font-mono">preview.sriio.dev/{block.id}</span>
              </div>
              <ExternalLink size={12} className="text-gray-400" />
            </div>
            {/* Actual mockup preview */}
            <div className="h-80 lg:h-96">
              <PreviewMockup category={block.category} />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <CodeBlock code={sampleCode} />
        </div>
      )}
    </div>
  )
}

export default function BlockDetailPage({ params }: { params: { slug: string } }) {
  const block = blocks.find(b => b.id === params.slug)
  if (!block) notFound()

  const related = blocks
    .filter(b => b.category === block.category && b.id !== block.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="layout-container pt-20 pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blocks" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blocks</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium capitalize">{block.category}</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{block.title}</span>
          </div>
        </div>
      </div>

      <div className="layout-container py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div>
            {/* Block header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-semibold capitalize">
                    {block.category}
                  </span>
                  {block.isNew && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent-500 text-white text-xs font-bold uppercase tracking-wider">New</span>
                  )}
                  {block.isPro && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">Pro</span>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                  {block.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{block.description}</p>
              </div>
              <button className="flex-shrink-0 p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
                <Share2 size={15} />
              </button>
            </div>

            {/* Preview/Code block */}
            <BlockPreview block={block} />

            {/* Tags */}
            {block.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {block.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blocks?tag=${tag}`}
                    className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-500/10 transition-all border border-transparent hover:border-accent-200 dark:hover:border-accent-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Block info */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Block info</h3>
              <dl className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                  <dd className="font-medium text-gray-900 dark:text-white capitalize">{block.category}</dd>
                </div>
                {block.componentCount && (
                  <div className="flex justify-between items-center text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Variants</dt>
                    <dd className="font-mono text-gray-900 dark:text-white">{block.componentCount}</dd>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">License</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">MIT</dd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Framework</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">React + Tailwind</dd>
                </div>
              </dl>
            </div>

            {/* Installation */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Usage</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">1</span>
                  <p>Copy the component code using the button above</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">2</span>
                  <p>Paste it into your project directory</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">3</span>
                  <p>Customize colors, spacing, and content to fit your design</p>
                </div>
              </div>
            </div>

            {/* Related blocks */}
            {related.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Related blocks</h3>
                <div className="space-y-2">
                  {related.map(b => (
                    <Link
                      key={b.id}
                      href={`/blocks/${b.id}`}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors truncate">{b.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{b.description}</p>
                      </div>
                      <ArrowLeft size={12} className="flex-shrink-0 text-gray-300 group-hover:text-accent-400 rotate-180 transition-colors" />
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
