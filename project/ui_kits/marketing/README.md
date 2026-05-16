# Marketing UI Kit

A recreation of what SRIIO's marketing site would look like.

> ⚠️ **No source materials.** This is a synthesized direction built from the design tokens in `colors_and_type.css`. The copy, structure, and layout are reasonable defaults for a technical platform — they are not lifted from a real site.

## Files

- `index.html` — composed marketing page (header → hero → features → editorial → CTA → footer)
- `App.jsx` — top-level composition
- `Header.jsx` — sticky top nav with wordmark + links + auth CTAs
- `Hero.jsx` — eyebrow + serif headline + sub + primary CTA + mono "stamp" detail
- `Features.jsx` — 3-up feature grid using bordered cards
- `Editorial.jsx` — serif pull-quote section over paper
- `LogosWall.jsx` — neutral "trusted by" row, all wordmarks in mono
- `CTA.jsx` — closing band with deploy / talk-to-us split
- `Footer.jsx` — mono-heavy four-column footer + colophon

## Components inventory

| Component | Notes |
| --- | --- |
| `Button` (in Header / Hero / CTA) | Primary (ink), accent, ghost variants |
| `Eyebrow` | Mono caps label above headline blocks |
| `FeatureCard` | Border + title + body + mono micro-stat |
| `Stamp` | Inline mono caps + status dot, used for trust signals |
| `NavLink` | Ghost link with hover underline |

## Open / TODO

- Real product screenshots in the hero — currently a placeholder console card
- Real customer logos in `LogosWall` — currently wordmark text placeholders
- Pricing / docs / blog templates — not in this kit yet
