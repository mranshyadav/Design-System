'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight } from 'lucide-react'
import { components, componentCategories } from '@/lib/data'
import clsx from 'clsx'

function MiniPreview({ id }: { id: string }) {
  const previews: Record<string, React.ReactNode> = {
    badge: (
      <div className="flex flex-wrap gap-1.5 p-2 justify-center">
        {[['bg-emerald-100 text-emerald-700','Active'],['bg-amber-100 text-amber-700','Pending'],['bg-red-100 text-red-700','Failed'],['bg-blue-100 text-blue-600','Draft']].map(([cls, label]) => (
          <span key={label} className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${cls}`}>{label}</span>
        ))}
      </div>
    ),
    button: (
      <div className="flex gap-1.5 flex-wrap justify-center p-2">
        <span className="px-3 py-1.5 rounded-lg bg-accent-500 text-white text-[9px] font-semibold">Primary</span>
        <span className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-[9px] font-semibold">Secondary</span>
        <span className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[9px] font-semibold">Danger</span>
      </div>
    ),
    input: (
      <div className="flex flex-col gap-1.5 p-3 w-full max-w-[160px]">
        <div className="text-[8px] text-gray-500 font-medium">Label</div>
        <div className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-[9px] text-gray-400">Placeholder text</div>
        <div className="text-[8px] text-gray-400">Helper text</div>
      </div>
    ),
    alert: (
      <div className="flex flex-col gap-1 p-2 w-full max-w-[180px]">
        {[['bg-blue-50 border-blue-200 text-blue-700','ℹ Info'],['bg-emerald-50 border-emerald-200 text-emerald-700','✓ Success'],['bg-red-50 border-red-200 text-red-700','⚠ Error']].map(([cls, label]) => (
          <div key={label} className={`px-2 py-1.5 rounded-lg border text-[8px] font-medium ${cls}`}>{label}</div>
        ))}
      </div>
    ),
    modal: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20 rounded-xl" />
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 w-32 z-10">
          <div className="text-[9px] font-semibold text-gray-800 dark:text-white mb-1">Confirm action?</div>
          <div className="text-[8px] text-gray-500 mb-2">This cannot be undone.</div>
          <div className="flex gap-1">
            <span className="flex-1 text-center px-1 py-1 rounded bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-600 dark:text-gray-300">Cancel</span>
            <span className="flex-1 text-center px-1 py-1 rounded bg-accent-500 text-white text-[8px]">Confirm</span>
          </div>
        </div>
      </div>
    ),
    table: (
      <div className="w-full p-1.5">
        <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {['Name','Status','Value'].map(h => <span key={h} className="text-[8px] font-semibold text-gray-500 flex-1">{h}</span>)}
          </div>
          {[['Item one','Active','$120'],['Item two','Pending','$84'],['Item three','Done','$210']].map(([name, status, val]) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 border-t border-gray-100 dark:border-gray-700/50">
              <span className="text-[8px] font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">{name}</span>
              <span className="text-[7px] px-1 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{status}</span>
              <span className="text-[8px] text-gray-500 font-mono flex-1 text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    avatar: (
      <div className="flex items-center gap-1.5 p-2 justify-center">
        {[['bg-violet-400','A'],['bg-emerald-400','B'],['bg-amber-400','C'],['bg-rose-400','D']].map(([bg, letter], i) => (
          <div key={letter} className={`rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800 ${bg}`} style={{width: 24+i*3, height: 24+i*3, fontSize: 8+i}}>
            {letter}
          </div>
        ))}
        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center text-[7px] text-gray-400">+2</div>
      </div>
    ),
    spinner: (
      <div className="flex items-center gap-3 p-2 justify-center">
        {[['border-accent-500 w-4 h-4'],['border-emerald-400 w-5 h-5'],['border-amber-400 w-6 h-6']].map((cls, i) => (
          <div key={i} className={`rounded-full border-2 border-t-transparent animate-spin ${cls}`} />
        ))}
      </div>
    ),
    search: (
      <div className="flex flex-col gap-1.5 p-2 w-full max-w-[180px]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-accent-400 bg-white dark:bg-gray-900">
          <div className="w-2.5 h-2.5 rounded-full border border-gray-400 flex-shrink-0" />
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="w-2 h-2 text-gray-400">✕</div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          {['Dashboard','Dark mode','Settings'].map(item => (
            <div key={item} className="px-2 py-1 text-[8px] text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700/50 last:border-0 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />{item}
            </div>
          ))}
        </div>
      </div>
    ),
    dropdown: (
      <div className="relative flex flex-col items-start p-2 w-full max-w-[160px]">
        <div className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mb-1">
          <span className="text-[8px] text-gray-600 dark:text-gray-300">Select option</span>
          <span className="text-[7px] text-gray-400">▼</span>
        </div>
        <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {[['✓ Option A', true],['Option B', false],['Option C', false]].map(([label, active]) => (
            <div key={String(label)} className={`px-2 py-1 text-[8px] border-b border-gray-100 dark:border-gray-700/40 last:border-0 ${active ? 'text-accent-600 font-semibold bg-accent-50 dark:bg-accent-500/10' : 'text-gray-600 dark:text-gray-300'}`}>
              {String(label)}
            </div>
          ))}
        </div>
      </div>
    ),
    radio: (
      <div className="flex flex-col gap-1.5 p-3 justify-center">
        {[['Option A', true],['Option B', false],['Option C', false]].map(([label, checked]) => (
          <div key={String(label)} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked ? 'border-accent-500' : 'border-gray-300 dark:border-gray-600'}`}>
              {checked && <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />}
            </div>
            <span className={`text-[9px] ${checked ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>{String(label)}</span>
          </div>
        ))}
      </div>
    ),
    checkbox: (
      <div className="flex flex-col gap-1.5 p-3 justify-center">
        {[['Subscribe to newsletter', true],['Enable notifications', true],['Dark mode', false]].map(([label, checked]) => (
          <div key={String(label)} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded flex items-center justify-center flex-shrink-0 border ${checked ? 'bg-accent-500 border-accent-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'}`}>
              {checked && <span className="text-white text-[7px] leading-none font-bold">✓</span>}
            </div>
            <span className="text-[8px] text-gray-600 dark:text-gray-300">{String(label)}</span>
          </div>
        ))}
      </div>
    ),
    toast: (
      <div className="flex flex-col gap-1.5 p-2 w-full max-w-[180px]">
        {[
          ['bg-emerald-500','✓','Saved successfully!'],
          ['bg-amber-500','⚠','Changes pending'],
          ['bg-red-500','✕','Upload failed'],
        ].map(([bg, icon, msg]) => (
          <div key={msg} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className={`w-3.5 h-3.5 rounded-full ${bg} flex items-center justify-center text-white text-[6px] flex-shrink-0`}>{icon}</div>
            <span className="text-[8px] text-gray-700 dark:text-gray-300 flex-1">{msg}</span>
            <span className="text-[8px] text-gray-300">✕</span>
          </div>
        ))}
      </div>
    ),
    progress: (
      <div className="flex flex-col gap-2.5 p-3 w-full max-w-[180px]">
        {[['accent','75','Uploading...'],['emerald','100','Complete'],['amber','40','Processing']].map(([color, val, label]) => (
          <div key={label}>
            <div className="flex justify-between mb-0.5">
              <span className="text-[7px] text-gray-500">{label}</span>
              <span className="text-[7px] font-mono text-gray-500">{val}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div className={`h-full rounded-full bg-${color}-500`} style={{width: `${val}%`}} />
            </div>
          </div>
        ))}
      </div>
    ),
    'empty-state': (
      <div className="flex flex-col items-center justify-center gap-1.5 p-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-300 dark:text-gray-500 text-lg">○</div>
        <span className="text-[8px] font-semibold text-gray-600 dark:text-gray-300">No results found</span>
        <span className="text-[7px] text-gray-400 text-center">Try adjusting your search</span>
        <div className="px-2.5 py-1 rounded-lg bg-accent-500 text-white text-[7px] font-semibold mt-0.5">Refresh</div>
      </div>
    ),
    tooltip: (
      <div className="flex flex-col items-center justify-center gap-2 p-3">
        <div className="relative">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-gray-900 dark:bg-gray-700 text-white text-[7px] whitespace-nowrap shadow-lg">
            Tooltip text here
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-dashed border-accent-300 text-[9px] text-accent-500 font-medium">Hover me</div>
        </div>
        <div className="flex gap-1.5 mt-3">
          {['top','right','bottom'].map(pos => (
            <div key={pos} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[7px] text-gray-500">{pos}</div>
          ))}
        </div>
      </div>
    ),
    drawer: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/15 rounded-xl" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700 rounded-r-xl p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[8px] font-semibold text-gray-800 dark:text-white">Menu</div>
            <div className="text-[8px] text-gray-400">✕</div>
          </div>
          {['Profile','Settings','Help','Logout'].map(item => (
            <div key={item} className="text-[8px] text-gray-600 dark:text-gray-300 px-1.5 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">{item}</div>
          ))}
        </div>
      </div>
    ),
    popover: (
      <div className="flex flex-col items-center justify-center gap-2 p-3">
        <div className="relative mt-6">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-2">
            <div className="text-[8px] font-semibold text-gray-800 dark:text-white mb-1">Quick info</div>
            <div className="text-[7px] text-gray-500 mb-1.5">Details shown in popover</div>
            <div className="flex gap-1">
              <div className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[7px] text-gray-500">Close</div>
              <div className="px-1.5 py-0.5 rounded bg-accent-500 text-white text-[7px]">Action</div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-200 dark:border-t-gray-700" />
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-accent-300 text-[9px] text-accent-500 font-medium">Trigger</div>
        </div>
      </div>
    ),
    tabs: (
      <div className="flex flex-col p-2 w-full max-w-[180px]">
        <div className="flex items-center gap-0.5 border-b border-gray-200 dark:border-gray-700 mb-2">
          {[['Overview', true],['Analytics', false],['Settings', false]].map(([label, active]) => (
            <div key={String(label)} className={`px-2 py-1 text-[7px] font-medium border-b-2 -mb-px ${active ? 'border-accent-500 text-accent-600 dark:text-accent-400' : 'border-transparent text-gray-500 dark:text-gray-400'}`}>
              {String(label)}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-3/5" />
        </div>
      </div>
    ),
    accordion: (
      <div className="flex flex-col p-2 w-full max-w-[180px] gap-1">
        {[['What is SRIIO UI?', true],['How to install?', false],['Is it free?', false]].map(([q, open]) => (
          <div key={String(q)} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-2 py-1.5 bg-white dark:bg-gray-900">
              <span className="text-[7px] font-medium text-gray-700 dark:text-gray-300">{String(q)}</span>
              <span className="text-[8px] text-gray-400">{open ? '▲' : '▼'}</span>
            </div>
            {open && <div className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-[6px] text-gray-500 border-t border-gray-100 dark:border-gray-700">A fully open-source library for React...</div>}
          </div>
        ))}
      </div>
    ),
    steps: (
      <div className="flex flex-col gap-0 p-2 w-full max-w-[160px]">
        {[['Account','Done',true,true],['Details','Current',true,false],['Review','Pending',false,false]].map(([label, status, done, active], i) => (
          <div key={String(label)} className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold flex-shrink-0 ${done ? 'bg-accent-500 text-white' : active ? 'bg-white dark:bg-gray-900 border-2 border-accent-500 text-accent-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                {done ? '✓' : i+1}
              </div>
              {i < 2 && <div className={`w-0.5 h-3 ${done ? 'bg-accent-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
            <div className="pb-2">
              <div className={`text-[8px] font-semibold ${active ? 'text-gray-900 dark:text-white' : done ? 'text-gray-500' : 'text-gray-400'}`}>{String(label)}</div>
              <div className="text-[6px] text-gray-400">{String(status)}</div>
            </div>
          </div>
        ))}
      </div>
    ),
    pagination: (
      <div className="flex flex-col items-center gap-2 p-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[8px] text-gray-400">‹</div>
          {[1,2,3,'…',8].map((p, i) => (
            <div key={i} className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] ${p === 2 ? 'bg-accent-500 text-white font-semibold' : 'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>{p}</div>
          ))}
          <div className="w-5 h-5 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[8px] text-gray-400">›</div>
        </div>
        <div className="text-[7px] text-gray-400">Page 2 of 8 · 156 results</div>
      </div>
    ),
    navigation: (
      <div className="flex flex-col p-1.5 w-full max-w-[180px]">
        <div className="flex items-center justify-between px-2 py-1.5 mb-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-accent-500" />
            <span className="text-[8px] font-bold text-gray-800 dark:text-white">SRIIO</span>
          </div>
          <div className="flex gap-1.5 text-[7px] text-gray-500">
            <span className="text-accent-500 font-semibold">Home</span>
            <span>Blocks</span>
            <span>Docs</span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          {[['◻ Home', true],['◻ Blocks', false],['◻ Docs', false]].map(([item, active]) => (
            <div key={String(item)} className={`px-2 py-1 rounded-md text-[7px] ${active ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 font-semibold' : 'text-gray-500'}`}>{String(item)}</div>
          ))}
        </div>
      </div>
    ),
    'date-picker': (
      <div className="flex flex-col p-2 w-full max-w-[170px]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mb-1.5">
          <span className="text-[8px] text-gray-500">📅</span>
          <span className="text-[8px] text-gray-700 dark:text-gray-300">May 17, 2026</span>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1.5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[7px] text-gray-400">‹</span>
            <span className="text-[7px] font-semibold text-gray-700 dark:text-gray-300">May 2026</span>
            <span className="text-[7px] text-gray-400">›</span>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} className="text-[6px] text-gray-400 text-center">{d}</div>)}
            {[...Array(17)].map((_, i) => (
              <div key={i} className={`text-[6px] text-center py-0.5 rounded ${i+1 === 17 ? 'bg-accent-500 text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}>{i+1}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    'time-picker': (
      <div className="flex flex-col items-center gap-2 p-2">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 w-full max-w-[160px]">
          <span className="text-[8px] text-gray-500">⏱</span>
          <span className="text-[8px] text-gray-700 dark:text-gray-300">02:30 PM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-[7px] text-gray-400">▲</div>
            <div className="w-9 h-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center text-[10px] font-mono font-bold text-gray-800 dark:text-white">02</div>
            <div className="text-[7px] text-gray-400">▼</div>
          </div>
          <div className="text-sm font-bold text-gray-400">:</div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-[7px] text-gray-400">▲</div>
            <div className="w-9 h-7 rounded-lg border border-accent-400 bg-white dark:bg-gray-900 flex items-center justify-center text-[10px] font-mono font-bold text-accent-600">30</div>
            <div className="text-[7px] text-gray-400">▼</div>
          </div>
          <div className="flex flex-col gap-0.5 ml-1">
            <div className="px-1.5 py-0.5 rounded bg-accent-500 text-white text-[7px] font-semibold">PM</div>
            <div className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-[7px]">AM</div>
          </div>
        </div>
      </div>
    ),
    'file-upload': (
      <div className="flex flex-col items-center gap-1.5 p-2 w-full max-w-[180px]">
        <div className="w-full rounded-xl border-2 border-dashed border-accent-300 dark:border-accent-700 bg-accent-50 dark:bg-accent-500/5 flex flex-col items-center justify-center py-2.5 gap-0.5">
          <div className="text-base">⬆</div>
          <span className="text-[8px] font-semibold text-accent-600 dark:text-accent-400">Drop files here</span>
          <span className="text-[7px] text-gray-400">or click to browse</span>
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          {[['report.pdf','3.2 MB'],['image.png','1.8 MB']].map(([name, size]) => (
            <div key={name} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 text-red-500 text-[6px] flex items-center justify-center font-bold flex-shrink-0">PDF</div>
              <span className="text-[7px] text-gray-600 dark:text-gray-300 flex-1 truncate">{name}</span>
              <span className="text-[6px] text-gray-400">{size}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {previews[id] || (
        <div className="text-2xl text-gray-300 dark:text-gray-600">
          {['◈','◇','▦','≡','⊟','◉','▷','⊙'][Math.abs(id.charCodeAt(0) % 8)]}
        </div>
      )}
    </div>
  )
}

export default function ComponentsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let result = components
    if (activeCategory !== 'All') result = result.filter(c => c.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [query, activeCategory])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 pt-24 pb-10 lg:pt-28 lg:pb-14">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">Components</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Component library
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              26 production-ready components built with React and Tailwind CSS. MIT licensed, no dependencies.
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-400 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {['All', ...componentCategories.filter(c => c !== 'All')].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    'flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    activeCategory === cat
                      ? 'bg-accent-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> components
            {activeCategory !== 'All' && <> in <span className="text-accent-500 font-semibold">{activeCategory}</span></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No components found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Try a different search term.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All') }}
              className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(component => (
              <Link
                key={component.id}
                href={`/components/${component.id}`}
                className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-accent-300 dark:hover:border-accent-700 shadow-card hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Mini preview */}
                <div className="w-full h-28 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 mb-4 flex items-center justify-center overflow-hidden">
                  <MiniPreview id={component.id} />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">{component.title}</h3>
                  <span className="flex-shrink-0 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
                    {component.variants}v
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 flex-1">{component.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 capitalize">{component.category}</span>
                  <ArrowRight size={12} className="text-gray-400 group-hover:text-accent-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
