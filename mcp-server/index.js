#!/usr/bin/env node
/**
 * SRIIO UI MCP Server
 *
 * Exposes SRIIO UI components to any MCP-compatible AI (Claude Desktop, Cursor, Windsurf, etc.)
 *
 * Install:
 *   cd mcp-server && npm install
 *
 * Add to Claude Desktop (~/.config/claude/claude_desktop_config.json):
 *   {
 *     "mcpServers": {
 *       "sriio-ui": {
 *         "command": "node",
 *         "args": ["/absolute/path/to/mcp-server/index.js"]
 *       }
 *     }
 *   }
 *
 * Or use the live API (no install needed):
 *   base URL: https://sriio.dev/api/components
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

// ── Component registry (inlined so the server is self-contained) ──────────────
// This mirrors lib/registry.ts — update both if you add new components.
const BASE_URL = 'https://sriio.dev/api/components'

async function fetchComponents(query = '', category = '') {
  const params = new URLSearchParams()
  if (query)    params.set('q', query)
  if (category) params.set('category', category)
  const url = `${BASE_URL}?${params}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

async function fetchComponent(slug) {
  const res = await fetch(`${BASE_URL}/${slug}`)
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}

// ── MCP Server ────────────────────────────────────────────────────────────────
const server = new Server(
  { name: 'sriio-ui', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description:
        'List all SRIIO UI components. Optionally filter by search query or category. ' +
        'Returns id, title, description, category, tags, importLine, and variant count.',
      inputSchema: {
        type: 'object',
        properties: {
          query:    { type: 'string', description: 'Search term (matches title, description, tags)' },
          category: { type: 'string', description: 'Filter by category, e.g. "Forms", "Overlay", "Feedback"' },
        },
      },
    },
    {
      name: 'get_component',
      description:
        'Get the full code for a specific SRIIO UI component by its id. ' +
        'Returns React JSX, TypeScript types, and plain Tailwind HTML — all copy-paste ready.',
      inputSchema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            description: 'Component id, e.g. "button", "modal", "date-picker"',
          },
          format: {
            type: 'string',
            enum: ['react', 'typescript', 'tailwind', 'all'],
            description: 'Which code format to return (default: all)',
          },
        },
      },
    },
    {
      name: 'search_components',
      description: 'Search SRIIO UI components by keyword. Returns matching components with import lines.',
      inputSchema: {
        type: 'object',
        required: ['query'],
        properties: {
          query: { type: 'string', description: 'Search keyword' },
        },
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    if (name === 'list_components') {
      const data = await fetchComponents(args?.query ?? '', args?.category ?? '')
      const lines = data.components.map(c =>
        `• **${c.title}** (\`${c.id}\`) — ${c.description}\n  Import: \`${c.importLine}\``
      )
      return {
        content: [{
          type: 'text',
          text: `## SRIIO UI Components (${data.total} total)\n\n${lines.join('\n\n')}`,
        }],
      }
    }

    if (name === 'get_component') {
      const comp = await fetchComponent(args.id)
      if (!comp) {
        return {
          content: [{ type: 'text', text: `Component "${args.id}" not found. Use list_components to see all ids.` }],
          isError: true,
        }
      }

      const fmt = args?.format ?? 'all'
      const sections = []

      sections.push(`## ${comp.title}`)
      sections.push(`> ${comp.description}`)
      sections.push(`**Install:** \`${comp.npm}\``)
      sections.push(`**Import:** \`${comp.importLine}\``)
      sections.push(`**Category:** ${comp.category} · **Variants:** ${comp.variants}`)

      if (fmt === 'react' || fmt === 'all') {
        sections.push(`\n### React / JSX\n\`\`\`tsx\n${comp.code.react}\n\`\`\``)
      }
      if (fmt === 'typescript' || fmt === 'all') {
        sections.push(`\n### TypeScript Props\n\`\`\`typescript\n${comp.code.typescript}\n\`\`\``)
      }
      if (fmt === 'tailwind' || fmt === 'all') {
        sections.push(`\n### Tailwind HTML (no npm needed)\n\`\`\`html\n${comp.code.tailwind}\n\`\`\``)
      }

      return { content: [{ type: 'text', text: sections.join('\n') }] }
    }

    if (name === 'search_components') {
      const data = await fetchComponents(args.query)
      if (data.total === 0) {
        return { content: [{ type: 'text', text: `No components matched "${args.query}".` }] }
      }
      const lines = data.components.map(c =>
        `• **${c.title}** (\`${c.id}\`) — ${c.description}`
      )
      return {
        content: [{
          type: 'text',
          text: `Found ${data.total} component(s) for "${args.query}":\n\n${lines.join('\n')}`,
        }],
      }
    }

    return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true }

  } catch (err) {
    return {
      content: [{ type: 'text', text: `Error: ${err.message}` }],
      isError: true,
    }
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
