#!/usr/bin/env node
/**
 * Generates registry.json from lib/registry.ts so the MCP server
 * works offline without needing the deployed API.
 *
 * Run once after cloning or when components change:
 *   cd mcp-server && node generate.mjs
 */

import fs from 'fs'
import vm from 'vm'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const srcPath = path.join(__dir, '../lib/registry.ts')
const outPath = path.join(__dir, 'registry.json')

let src = fs.readFileSync(srcPath, 'utf8')

// Strip TypeScript-only syntax so vm can evaluate it as JS
src = src.replace(/export interface[\s\S]*?\n}\n/, '')          // remove interface block
src = src.replace(/: Record<string, ComponentEntry>/, '')        // remove type annotation
src = src.replace(/export type .+\n/g, '')                       // remove type aliases
src = src.replace(/ as ComponentId\[\]/, '')                     // remove type cast
src = src.replace(/^export /gm, '')                              // strip export keywords

// const/let are block-scoped in vm — append assignment to expose the value
src += '\n__out__.registry = registry'
const ctx = { __out__: {} }
vm.runInNewContext(src, ctx)

fs.writeFileSync(outPath, JSON.stringify(ctx.__out__.registry, null, 2))
console.log(`✓ registry.json — ${Object.keys(ctx.__out__.registry).length} components`)
