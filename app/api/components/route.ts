import { NextRequest, NextResponse } from 'next/server'
import { registry } from '@/lib/registry'
import { components } from '@/lib/data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  const category = searchParams.get('category')?.toLowerCase() ?? ''

  let list = components.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    category: c.category,
    variants: c.variants,
    tags: c.tags,
    importLine: registry[c.id]?.importLine ?? '',
    npm: 'npm install @sriio/ui',
  }))

  if (q) {
    list = list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.includes(q))
    )
  }

  if (category) {
    list = list.filter(c => c.category.toLowerCase() === category)
  }

  return NextResponse.json(
    { total: list.length, components: list },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  )
}
