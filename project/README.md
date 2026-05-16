# SRIIO Design System

> **Status:** Synthesized direction — no source materials were provided.
> This system was built from a brand brief alone (tone: Technical · Minimal/editorial · Corporate/trustworthy).
> Everything below is a starting direction, not ground truth. Please review, redirect, and replace anywhere it doesn't match your intent.

---

## What is SRIIO?

**SRIIO** is treated here as a precision technical platform brand — a company that would sit comfortably alongside the likes of Bloomberg Terminal, Stripe, Linear, or research-grade instrumentation software. The name is rendered as an all-caps wordmark (`SRIIO`), pronounced as a single word, with no expanded acronym committed to.

> ⚠️ **Assumption to confirm:** I picked a "technical infrastructure / data platform" interpretation because it fits all three tone tags. If SRIIO is actually consumer-facing, fintech, healthcare, climate tech, etc., the palette and voice in this system will need to shift. Tell me what SRIIO does and I'll re-tune.

### Source materials

| Source | Status |
| --- | --- |
| Website / product URL | None provided |
| Codebase (local or GitHub) | None provided |
| Figma file | None provided |
| Logo / brand assets | None provided — wordmark drawn from typography |
| Screenshots | None provided |

If any of these exist, sending them via the **Import** menu would let me lift exact colors, fonts, and components instead of inventing them.

---

## Index

The root of this project is the design system. Key files:

| Path | What it is |
| --- | --- |
| `README.md` | This file — brand context, content + visual foundations, iconography |
| `SKILL.md` | Agent-Skill manifest so this system can be reused as a downloadable skill |
| `colors_and_type.css` | All CSS tokens — colors, type scale, spacing, radii, shadows, semantic vars |
| `fonts/` | Webfonts (Instrument Serif, Geist, Geist Mono — pulled from Google Fonts) |
| `assets/` | Logos (SVG wordmark + mark), favicon, sample imagery placeholders |
| `preview/` | Small HTML specimen cards surfaced in the Design System tab |
| `ui_kits/marketing/` | Marketing site UI kit — header, hero, feature blocks, footer |
| `ui_kits/product/` | Product app UI kit — sidebar, data table, panels, command bar |

---

## Content fundamentals

How SRIIO copy should sound.

**Voice in one line:** *Precise. Editorial. Quietly authoritative. Never cute.*

### Tone rules

- **Declarative, not aspirational.** State what something does. Avoid "empower," "unleash," "unlock," "transform."
- **Specific over abstract.** Real numbers, real units, real names. `12.4ms p99` beats `lightning fast`.
- **You-voice for the reader, we-voice for SRIIO.** Address the reader directly ("Your data stays in your VPC."). Use "we" only when describing SRIIO's actions ("We sign every release.").
- **Sentence case for everything UI-side.** Title Case for editorial headlines and section headers only.
- **No exclamation marks** outside of celebratory empty-states (and even there, sparingly).
- **No emoji** in product or marketing surfaces. Status is communicated with shape and color, not 🎉.

### Casing

| Surface | Rule | Example |
| --- | --- | --- |
| Headlines (marketing) | Title Case for proper editorial feel | `A Precision Layer for Critical Systems` |
| H2 / H3 in product | Sentence case | `Recent runs` |
| Buttons | Sentence case, verb-first | `Save changes`, not `Save Changes` or `SAVE` |
| Labels & metadata | Sentence case, terse | `Last run`, `Region`, `p95 latency` |
| Brand name | Always uppercase | `SRIIO` |

### Punctuation & numerals

- **Em-dashes** for editorial asides ( — ), not hyphens. No spaces in print contexts, optional in UI.
- **Oxford comma** always.
- **Numerals over words** for any quantity ≥ 2. Spell out only `one` in flowing prose.
- **SI-style units with non-breaking space**: `12 ms`, `4 GB`, `3.2 K rows`.
- **ISO-style dates** in product UI (`2026-05-16`), human-readable in marketing (`May 16, 2026`).
- **Smart quotes** ( " " ' ' ) in body copy. Straight quotes only in code blocks.

### Example copy snippets

**Hero (marketing):**
> A precision layer for critical systems.
> SRIIO sits between your data sources and the systems that act on them — typed, versioned, and audited end-to-end.

**Feature block:**
> **Typed end-to-end.** Every payload carries its schema. Breaking changes fail at the boundary, not in production.

**Empty state (product):**
> No runs yet. Connect a source to start ingesting.

**Error:**
> Schema mismatch on field `account_id` — expected `string`, received `null`.
> [View payload] [Retry]

**Toast (success):**
> Pipeline `orders.normalize` deployed to production.

### What to avoid

- "Effortlessly", "seamlessly", "magically", "AI-powered" as a feature
- Exclamation marks in marketing copy
- Sentences that start with "Imagine if…"
- Emoji icons in feature blocks
- Gradient text effects in headlines

---

## Visual foundations

The composition rules that make a screen look like SRIIO.

### Palette

A neutral spine — warm paper as the primary surface, near-black ink, a graphite mid-tone — paired with **one** signal accent (electric ink-blue) and three semantic states (green/amber/red, all muted toward graphite).

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0E0F12` | Body text, primary buttons, wordmark |
| `--paper` | `#F4F1EA` | Primary background, marketing canvas |
| `--surface` | `#FFFFFF` | Cards, dialogs, code blocks |
| `--graphite-90 → 10` | (see CSS) | UI neutrals, borders, fills |
| `--accent` | `#1F3FE0` | Single signal color — links, primary CTA, focus rings |
| `--success` | `#1F6B47` | Healthy state, deployed |
| `--warning` | `#8A5A14` | Throttled, deprecating |
| `--danger`  | `#9A2222` | Failed, breaking change |

**Rule:** Accent is rationed. A typical screen has **one** accented element (a primary CTA, a focused row, a chart line). If you have a second, you've made a mistake.

### Type

A three-family system. Pairing follows an editorial newspaper logic: serif for display, sans for UI, mono for data.

| Role | Family | Weights | Substitution risk |
| --- | --- | --- | --- |
| Display (headlines, marketing) | **Instrument Serif** | 400 / 400 italic | Free Google substitution — flagged |
| UI body, labels, buttons | **Geist** | 400 / 500 / 600 | Free Google substitution — flagged |
| Data, metadata, code, IDs | **Geist Mono** | 400 / 500 | Free Google substitution — flagged |

> ⚠️ **Font substitution flag:** None of these were specified by the brand brief. All three are pulled from Google Fonts as a high-quality starting point. If SRIIO licenses commercial faces (e.g. Söhne, Tiempos, GT America, Untitled Sans), drop the `.woff2` files into `fonts/` and the `@font-face` rules in `colors_and_type.css` will pick them up.

**Type scale:** see `colors_and_type.css`. Editorial display sizes are *large* and use Instrument Serif italic on hero moments to lean into the editorial register.

### Spacing & grid

- **4px base unit.** Spacing tokens: `2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- **12-column grid** with `24px` gutters at marketing widths (1280px max content width).
- **8-column grid** with `16px` gutters in product surfaces.
- Vertical rhythm aligned to 4px for tight UI, 8px for editorial.

### Backgrounds & imagery

- **No gradients.** Solid surfaces only. Color shifts happen via paper → surface → graphite, not via gradient stops.
- **No hand-drawn illustrations.** Imagery is either (a) annotated technical screenshots, (b) high-contrast black-and-white photography with a subtle warm tint matching `--paper`, or (c) data visualization rendered in the actual product type system.
- **Full-bleed hero images are rare.** When used, they sit behind editorial type and crop tight on a real product surface.
- **No repeating patterns or textures.** The paper background is flat. The grid is the texture.

### Animation

- **Easing:** custom cubic-bezier `(0.2, 0.7, 0.1, 1.0)` — a quick start, soft landing. Encoded as `--ease-standard`.
- **Durations:** `120ms` for state changes, `200ms` for layout, `320ms` for entrance/exit. Encoded.
- **No bounces.** No `cubic-bezier(... back)`. No spring physics on UI chrome.
- **Fades over slides.** When a panel appears, it fades (opacity + 4px translate). It does not fly in.
- **One thing moves at a time.** If the page is changing, the chrome holds still.

### State styling

| State | Treatment |
| --- | --- |
| **Hover** (interactive) | Background shifts one step darker on graphite scale; text underline appears on links |
| **Active / pressed** | `transform: translateY(0.5px)` + one more step darker; no shrink |
| **Focus** | `2px` outset ring in `--accent`, offset `2px` — never removed for mouse users |
| **Disabled** | Opacity `0.45`, no color change, `cursor: not-allowed` |
| **Selected (table row, list)** | Background `--accent` at 6% opacity, left border `2px` `--accent` |

### Borders, radii, shadows

- **Radii:** `0px` (data grids, code), `4px` (default inputs/buttons), `8px` (cards), `12px` (modals). Never `9999px` (no pill shapes anywhere except status dots).
- **Borders:** `1px solid var(--graphite-15)` is the default. Borders carry structural weight — they do real work, they aren't decorative.
- **Shadows:** A two-layer system.
  - `--shadow-1`: `0 1px 0 rgba(14,15,18,0.04), 0 1px 2px rgba(14,15,18,0.04)` — resting cards
  - `--shadow-2`: `0 4px 12px rgba(14,15,18,0.06), 0 1px 2px rgba(14,15,18,0.06)` — menus, popovers
  - `--shadow-3`: `0 24px 48px rgba(14,15,18,0.12), 0 2px 4px rgba(14,15,18,0.08)` — dialogs only
- **No inner shadows.** No glow. No colored shadows.

### Transparency & blur

- Used **only** for sticky headers (88% paper, 12px backdrop blur) and modal scrims (ink at 40%).
- Never on buttons, cards, or text.

### Cards

The default card: `--surface` background, `1px solid --graphite-15` border, `8px` radius, `--shadow-1`, `24px` internal padding. No tints, no colored borders, no left-accent strips.

### Layout rules

- **Fixed elements** are rare: only the marketing nav and the product top bar. Sidebars scroll with content where possible.
- **Reading width** for prose is capped at `66ch` (`~660px`).
- **Dense data** views run edge-to-edge with `--surface` backgrounds and zero-radius cells.

---

## Iconography

**System:** [Lucide](https://lucide.dev) — used at `16px` (inline), `20px` (default UI), `24px` (marketing/feature blocks). Stroke width `1.5px`, never `2px`.

> ⚠️ **Substitution flag:** Lucide is a free, high-quality open-source icon set used as a placeholder. If SRIIO has a custom icon set, replace `assets/icons/` and update `colors_and_type.css` icon-size tokens accordingly.

**Rules:**

- **Stroke icons only.** No filled icons except for status dots (◉) and selected states.
- **No emoji** anywhere in product or marketing surfaces.
- **No unicode symbol icons** (✓, ✗, →) except in monospace contexts (code, terminal output, diff views) where they belong.
- **Icons accompany labels.** A bare icon button is allowed only in toolbars and only with a tooltip.
- **One icon per affordance.** No decorative icons in headers.

**Logo / wordmark:**

- `assets/sriio-wordmark.svg` — primary all-caps wordmark in Instrument Serif italic
- `assets/sriio-mark.svg` — square mark (`S` glyph for favicon, app icons)
- Minimum size: wordmark 64px wide, mark 16px square
- Clear space: `0.5×` the cap-height around all sides

---

## Caveats / open questions

1. **What does SRIIO actually do?** The entire palette and voice were tuned to a technical-platform interpretation. Confirm or redirect.
2. **Brand colors** are invented. The electric ink-blue accent is a strong opinion — swap if SRIIO has an actual brand color.
3. **Fonts are substitutions** for whatever SRIIO would license commercially. Drop real `.woff2` files into `fonts/` to replace.
4. **No logo was provided** — the wordmark is set in Instrument Serif italic. A real designed mark should replace it.
5. **No product screens exist** — UI kit components are reasoned defaults that follow the visual foundations, not recreations of anything real.
