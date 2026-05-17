# Product UI Kit

A recreation of what SRIIO's product app would look like — the data-platform control surface implied by the marketing copy.

> ⚠️ **No source materials.** This is a synthesized direction built from the design tokens in `colors_and_type.css`. The information architecture is a reasonable default for a typed-pipeline / schema-registry product. Replace with a real product structure when one exists.

## Layout

A familiar three-region console: **left sidebar** (workspace + nav), **top bar** (breadcrumbs + global actions + user), **main canvas** (the active view). A **command palette** opens with `⌘K`.

## Files

- `index.html` — composed app (Pipelines list view by default)
- `App.jsx` — top-level layout
- `Sidebar.jsx` — workspace switcher + section nav
- `TopBar.jsx` — breadcrumb + search + actions + user
- `PipelineTable.jsx` — primary data table view
- `DetailPanel.jsx` — right-edge slide-over for selected pipeline
- `CommandPalette.jsx` — `⌘K` overlay
- `EmptyState.jsx` — used for unconnected sources

## Components inventory

| Component | Notes |
| --- | --- |
| `NavItem` | Sidebar row with icon-glyph + label |
| `BreadcrumbCrumb` | Mono separator slashes |
| `Badge`, `StatusDot` | Re-used everywhere |
| `Kbd` | Inline keyboard hint chip |
| `IconBtn` | Toolbar icon button with tooltip-on-hover (visual only) |

## What's omitted on purpose

- Real icons — we use ascii glyphs as placeholders since no icon library or sprite has been confirmed for SRIIO. Marketing kit uses the same approach. Swap to Lucide / Phosphor / a custom set when chosen.
- Charts — kept out of this pass; would normally use the mono type system and graphite scale.
- Settings, billing, members — only the primary workspace view is implemented.

## Interactions implemented

- Selecting a table row opens the right detail panel
- `⌘K` (or click the search box) opens the command palette
- Sidebar collapses workspace switcher on hover
