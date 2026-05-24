import { NextRequest, NextResponse } from 'next/server'
import { registry } from '@/lib/registry'
import { components } from '@/lib/data'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const meta = components.find(c => c.id === slug)
  const entry = registry[slug]

  if (!meta || !entry) {
    return NextResponse.json({ error: `Component "${slug}" not found.` }, { status: 404 })
  }

  return NextResponse.json(
    {
      id: slug,
      title: entry.title,
      description: entry.description,
      category: entry.category,
      tags: entry.tags,
      variants: entry.variants,
      npm: entry.npm,
      importLine: entry.importLine,
      code: entry.code,
    },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  )
}
