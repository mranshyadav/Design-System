---
name: sriio-design
description: Use this skill to generate well-branded interfaces and assets for SRIIO, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Foundations:** `colors_and_type.css` — all CSS tokens (colors, type scale, spacing, radii, shadows, motion). Import this once and use the semantic vars (`--fg-1`, `--bg-1`, `--accent`, etc.).
- **Fonts:** `fonts/` — Instrument Serif (display) + Geist (sans) + Geist Mono (data). All three are Google Fonts substitutions; flag any real licensed faces to swap in.
- **Brand:** `assets/sriio-wordmark.svg`, `assets/sriio-mark.svg`, `assets/sriio-wordmark-inverse.svg`.
- **Preview cards:** `preview/` — small specimens showing each token category in use.
- **UI kits:**
  - `ui_kits/marketing/` — composed marketing-page recreation (Header / Hero / Features / Editorial / CTA / Footer)
  - `ui_kits/product/` — composed product-app recreation (Sidebar / TopBar / PipelineTable / DetailPanel / CommandPalette)

## House rules (do not violate without flagging)

1. **One signal color per screen.** The accent (`#1F3FE0`) is rationed — one CTA, one focused row, one chart line. Never two.
2. **No gradients, no emoji, no hand-drawn SVG illustrations.** Solid surfaces, real iconography, real photography.
3. **Editorial serif for display moments, sans for UI, mono for data and metadata.** Don't blend roles.
4. **No bounces in motion.** Standard easing only: `cubic-bezier(0.2, 0.7, 0.1, 1.0)`.
5. **Pills are for status dots only.** Default radius is 4 (inputs), 8 (cards), 12 (modals).
6. **`SRIIO` is always uppercase.** Buttons are sentence case. Body and labels are sentence case. Editorial headlines are Title Case.
7. **Iconography:** Lucide stroke icons at 16/20/24 with stroke-width 1.5 (flagged substitution — replace with custom set if one exists).
