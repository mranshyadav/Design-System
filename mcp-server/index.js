#!/usr/bin/env node
/**
 * SRIIO UI — MCP Server
 *
 * Works 100% offline — reads from bundled registry.json.
 * No API key, no network, no deploy required.
 *
 * ─── Setup (one-time per machine) ─────────────────────────────────────────────
 *
 *   cd mcp-server && npm install
 *
 * ─── Claude Desktop ───────────────────────────────────────────────────────────
 *   Mac:   ~/Library/Application Support/Claude/claude_desktop_config.json
 *   Linux: ~/.config/claude/claude_desktop_config.json
 *
 *   {
 *     "mcpServers": {
 *       "sriio-ui": {
 *         "command": "node",
 *         "args": ["/absolute/path/to/mcp-server/index.js"]
 *       }
 *     }
 *   }
 *
 * ─── Cursor ───────────────────────────────────────────────────────────────────
 *   File: ~/.cursor/mcp.json  (or Cursor Settings → MCP)
 *
 *   {
 *     "mcpServers": {
 *       "sriio-ui": {
 *         "command": "node",
 *         "args": ["/absolute/path/to/mcp-server/index.js"]
 *       }
 *     }
 *   }
 *
 * ─── VS Code (v1.102+) ────────────────────────────────────────────────────────
 *   File: .vscode/mcp.json  (project-level) or User Settings → MCP
 *
 *   {
 *     "servers": {
 *       "sriio-ui": {
 *         "type": "stdio",
 *         "command": "node",
 *         "args": ["/absolute/path/to/mcp-server/index.js"]
 *       }
 *     }
 *   }
 *
 * ─── Windsurf ─────────────────────────────────────────────────────────────────
 *   File: ~/.codeium/windsurf/mcp_config.json
 *
 *   {
 *     "mcpServers": {
 *       "sriio-ui": {
 *         "command": "node",
 *         "args": ["/absolute/path/to/mcp-server/index.js"]
 *       }
 *     }
 *   }
 *
 * ─── JetBrains (IntelliJ, WebStorm, etc.) ────────────────────────────────────
 *   Settings → Tools → AI Assistant → Model Context Protocol (MCP)
 *   Click + → add command: node /absolute/path/to/mcp-server/index.js
 *
 * ─── Continue.dev (VS Code extension) ────────────────────────────────────────
 *   File: ~/.continue/config.json
 *
 *   {
 *     "mcpServers": [
 *       { "name": "sriio-ui", "command": "node /absolute/path/to/mcp-server/index.js" }
 *     ]
 *   }
 *
 * ─── Cline / Roo-Cline (VS Code extension) ───────────────────────────────────
 *   Cline sidebar → Settings (gear) → MCP Servers → Add Server
 *   Command: node /absolute/path/to/mcp-server/index.js
 *
 * ─── GitHub Copilot (VS Code Agent Mode) ─────────────────────────────────────
 *   Same as VS Code above — uses .vscode/mcp.json
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// ── Load local registry (no network needed) ───────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url))
const registry = JSON.parse(readFileSync(join(__dir, 'registry.json'), 'utf8'))
const ids = Object.keys(registry)

function searchRegistry(query = '', category = '') {
  const q = query.toLowerCase()
  const cat = category.toLowerCase()
  return ids
    .map(id => ({ id, ...registry[id] }))
    .filter(c => {
      const matchesQ = !q || (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      )
      const matchesCat = !cat || c.category.toLowerCase().includes(cat)
      return matchesQ && matchesCat
    })
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
          query:    { type: 'string', description: 'Search keyword (title, description, tags)' },
          category: { type: 'string', description: 'Filter by category: Foundations, Display, Forms, Feedback, Overlay, Navigation, Data, Pickers' },
        },
      },
    },
    {
      name: 'get_component',
      description:
        'Get copy-paste code for a SRIIO UI component. Returns React JSX, TypeScript props, and raw Tailwind HTML.',
      inputSchema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            description: 'Component id — e.g. "button", "modal", "date-picker". Use list_components to see all ids.',
          },
          format: {
            type: 'string',
            enum: ['react', 'typescript', 'tailwind', 'all'],
            description: 'Code format to return (default: all)',
          },
        },
      },
    },
    {
      name: 'search_components',
      description: 'Search SRIIO UI components by keyword. Returns matched components with import lines.',
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
    // ── list_components ───────────────────────────────────────────────────────
    if (name === 'list_components') {
      const results = searchRegistry(args?.query, args?.category)
      const lines = results.map(c =>
        `• **${c.title}** (\`${c.id}\`) [${c.category}] — ${c.description}\n  Import: \`${c.importLine}\``
      )
      return {
        content: [{
          type: 'text',
          text: `## SRIIO UI — ${results.length} component${results.length !== 1 ? 's' : ''}\n\n${lines.join('\n\n')}`,
        }],
      }
    }

    // ── get_component ─────────────────────────────────────────────────────────
    if (name === 'get_component') {
      const comp = registry[args.id]
      if (!comp) {
        const suggestions = ids.filter(id => id.includes(args.id) || args.id.includes(id)).slice(0, 3)
        const hint = suggestions.length ? `\nDid you mean: ${suggestions.map(s => `\`${s}\``).join(', ')}?` : ''
        return {
          content: [{ type: 'text', text: `Component \`${args.id}\` not found.${hint}\nUse \`list_components\` to see all ${ids.length} ids.` }],
          isError: true,
        }
      }

      const fmt = args?.format ?? 'all'
      const sections = [
        `## ${comp.title}`,
        `> ${comp.description}`,
        `**Install:** \`${comp.npm}\``,
        `**Import:** \`${comp.importLine}\``,
        `**Category:** ${comp.category} · **Variants:** ${comp.variants}`,
      ]

      if (fmt === 'react'      || fmt === 'all') sections.push(`\n### React / JSX\n\`\`\`tsx\n${comp.code.react}\n\`\`\``)
      if (fmt === 'typescript' || fmt === 'all') sections.push(`\n### TypeScript Props\n\`\`\`typescript\n${comp.code.typescript}\n\`\`\``)
      if (fmt === 'tailwind'   || fmt === 'all') sections.push(`\n### Tailwind HTML (zero npm)\n\`\`\`html\n${comp.code.tailwind}\n\`\`\``)

      return { content: [{ type: 'text', text: sections.join('\n') }] }
    }

    // ── search_components ─────────────────────────────────────────────────────
    if (name === 'search_components') {
      const results = searchRegistry(args.query)
      if (results.length === 0) {
        return { content: [{ type: 'text', text: `No components matched \`${args.query}\`.` }] }
      }
      const lines = results.map(c =>
        `• **${c.title}** (\`${c.id}\`) — ${c.description}`
      )
      return {
        content: [{
          type: 'text',
          text: `Found **${results.length}** match${results.length !== 1 ? 'es' : ''} for "${args.query}":\n\n${lines.join('\n')}`,
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
