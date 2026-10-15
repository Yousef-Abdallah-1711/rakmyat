# RAKMYAT — DESIGN.md
### Master Visual, Motion & Bilingual Design System

**Status:** Phase 03B — Cobalt Blue & Porcelain migration (documentation only; no implementation, no code, no assets generated). Supersedes the Navy/Cyan/Obsidian dark-only identity previously specified in this file. Full migration rationale, old→new mapping, and change log: [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md). Focused acceptance checklist for this new identity: [COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md](./COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md).
**Companion document:** [PRODUCT.md](./PRODUCT.md) — business, content, and bilingual strategy. Service names, CTA copy, route names, and section names in this file are shared verbatim with PRODUCT.md §8/§9/§16/§17; do not rename on one side without updating the other.
**Theme:** Porcelain-first (light), no toggle. Deep cobalt sections are used selectively, in exactly two places (HOME-04, HOME-08), for deliberate dramatic contrast — never as a default, never as a second "dark mode."
**Direction:** Creative Digital Powerhouse — Ultra-Premium Immersive Digital Experience, now expressed through Cobalt Blue & Porcelain rather than Navy/Cyan/Obsidian
**Locales/directions:** `ar-EG` RTL and `en` LTR — designed as two first-class, independently art-directed experiences, not a mirrored pair

---

## 1. Design Vision

Rakmyat's visual language must read as *engineered*, not decorated: every surface, motion, and material choice should look like a deliberate structural decision, the same way the company wants its software to look deliberately architected. The benchmark is a cinematic, editorial technology brand — closer to how a premium hardware or creative-software company presents itself than how a typical software house or AI startup does. Under Cobalt Blue & Porcelain, this ambition is expressed through monumental typography on a confident porcelain canvas, with cobalt as a precise, controlled brand moment rather than an ambient glow — architectural and editorial rather than cinematic-dark. Arabic and English are each designed as the primary language of their own version of the site; RTL is never a mirrored afterthought of an English-first layout.

---

## 2. Creative Direction

**Direction:** Creative Digital Powerhouse. **Philosophy blend:** Experimental Digital Agency × Cinematic Art Direction × Luxury Technology Branding × Editorial Typography × Enterprise Engineering Credibility × Original Interactive Storytelling — now realized in Cobalt Blue & Porcelain rather than a dark-only palette.

**Reference principles (studied for principle, never copied as asset/layout):**

| Studio | Principle borrowed |
|---|---|
| Active Theory | Confidence in large-scale WebGL/3D moments used sparingly, not everywhere |
| BASIC/DEPT | Editorial art direction discipline — typography as the primary visual actor |
| Linear | Interface precision; restraint; a design system that feels inevitable, not decorated |
| Resn | Interaction as narrative device, not spectacle for its own sake |
| Locomotive | Scroll-driven storytelling with clear narrative beats, not endless parallax |
| Instrument | Sophisticated brand-first digital experiences, premium typographic hierarchy |

**What this is not** (hard exclusions, binding on all later sections): generic SaaS templates, typical corporate/software-house layouts, AI-chatbot landing-page tropes, dashboard-style homepages, cyberpunk/neon gaming aesthetics, glassmorphism card grids, stock "glowing brain" AI imagery, repetitive three-card feature grids, and — new under this identity — generic white-SaaS-template blandness (flat white everywhere with no tonal richness is exactly as weak as flat navy everywhere was).

---

## 3. Brand Aesthetic

Porcelain, precise, materially rich but visually quiet. Cobalt is a *brand signal*, used the way an architect uses a single saturated accent material against white stone — confident, placed with intent, never washed across a whole surface. Large type carries the brand; 3D and particle systems punctuate specific narrative moments (hero, Systems in Motion) rather than decorating every section. Two sections (HOME-04, HOME-08) deliberately invert into deep cobalt for dramatic contrast — rare enough to feel earned, not a second theme. Arabic aesthetic is equally large-type-led, with its own rhythm (§9) rather than the English scale reused with a font swap.

---

## 4. Visual Principles

1. **Typography is the primary visual system.** 3D/particles are secondary, narrative-specific layers.
2. **One signature moment per section, not five.** A section earns at most one major visual device (3D sculpture, particle field, or architecture diagram) — never stacked.
3. **Cobalt is scarce and intentional.** Target ≤10% of any porcelain-section viewport's visible pixel area at full saturation (§5.3) — slightly more headroom than the prior cyan-on-dark budget, since cobalt here must carry CTAs, links, *and* brand recognition on a light canvas, but still never a wash.
4. **Negative space is a material.** Sections breathe; nothing is packed edge-to-edge except full-bleed imagery/3D moments by deliberate choice (§8).
5. **RTL and LTR are both "first drafts."** No component ships as "English, then mirrored" — see §12–§13.
6. **Motion explains, it doesn't perform.** Every animation maps to a specific meaning (reveal, state change, causality) — see §24.
7. **Never let ambition break usability.** Every cinematic device has a static/reduced-motion fallback that carries full meaning (§25, §32).
8. **Dark is the exception, not the default.** Deep cobalt sections (§5.2) exist in exactly two places on the homepage and must always be the result of a deliberate contrast decision, never a fallback or a convenience.

---

## 5. Porcelain-First Theme & Color System

No dark-mode toggle. Light/porcelain is the default and majority experience on every page; deep cobalt sections are a rare, deliberate exception (§4 Principle 8), not a second theme. The palette is Cobalt Blue & Porcelain, refined into full semantic tokens below.

### 5.1 Core brand palette (finalized from the candidate set, with reasoning)

| Token | Hex | Role | Evaluation note |
|---|---|---|---|
| `color.cobalt.signature` | `#2453FF` | Primary brand accent — CTAs, links, active states, the sculpture's primary material | Kept as proposed. White text on this value: **~5.6:1** contrast (computed, exceeds AA 4.5:1 for normal text and clears AAA for large text) |
| `color.cobalt.deep` | `#1736B8` | Deep-cobalt dramatic-section background (HOME-04, HOME-08); also the sculpture's shadow-side material tone | Kept as proposed. White text on this value: **~9.3:1** (computed, AAA) — confirms this is safe as a background for white headline text in the two dark sections |
| `color.porcelain.base` | `#F7F8FC` | Primary page/section background (the dominant surface on the site) | Kept as proposed — the candidate's role is promoted from "a text/accent color" in the old system to **the primary background**, which is the central identity shift of this migration |
| `color.white.pure` | `#FFFFFF` | Elevated surfaces (cards, forms), reserved for things that should visually lift off `porcelain.base` | Kept as proposed |
| `color.surface.tinted` | `#EDF2FF` | Alternating section background for rhythm | Kept as proposed ("Soft Blue Surface") |
| `color.surface.tinted.deep` | `#E5ECFF` | A second, slightly stronger tint for nested/elevated-within-tinted contexts | Kept as proposed ("Pale Blue Surface") — renamed for clarity since both candidates read similarly; distinguished by use (base alternating tone vs. nested elevation) |
| `color.ink.primary` | `#111827` | Headlines, highest-emphasis text | Kept as proposed ("Dark Ink"). On `porcelain.base`: **~16.7:1** (computed) — very high; reserved for headlines/short emphasis text, not dense body copy, to avoid an overly harsh page (see §5.4) |
| `color.ink.secondary` | `#475569` | Body copy, supporting text | Kept as proposed ("Secondary Ink"). On `porcelain.base`: **~7.1:1** (computed, clears AAA) — the primary body-copy color precisely because it is gentler than `ink.primary` while still exceeding AAA |
| `color.border.hairline` | `#DCE3F1` | Decorative, non-interactive dividers only | Kept as proposed, but **scope-restricted**: computed contrast against `porcelain.base` is too low (well under the WCAG 1.4.11 3:1 floor for UI component boundaries) to use on any interactive element border — see `color.border.interactive` below for that role |

### 5.2 Extended semantic tokens

| Token | Hex / value | Role |
|---|---|---|
| `color.bg.page` | `#F7F8FC` (= `porcelain.base`) | `<body>` background on every route |
| `color.bg.section.tinted` | `#EDF2FF` | Alternating light-section background, used for rhythm against `color.bg.page` |
| `color.bg.section.dark` | `#1736B8` (= `cobalt.deep`) | **Reserved for exactly two sections** (HOME-04, HOME-08) — never a default or alternating tone |
| `color.surface.1` | `#FFFFFF` | Cards, form fields, first elevation (pairs with `shadow.sm`, §34, for depth — light themes read elevation via shadow, not via a lighter/darker fill alone) |
| `color.surface.2` | `#FFFFFF` | Modals, popovers, second elevation (pairs with `shadow.lg` for stronger separation — same fill as `surface.1`, elevation communicated by shadow intensity + z-index, not a second color) |
| `color.border.hairline` | `#DCE3F1` | Default **decorative** dividers (section rules, card edges) — not for interactive-element boundaries |
| `color.border.interactive` | `#6D82B8` | Form-field borders and interactive boundaries; minimum verified contrast is 3.39:1 on the light section surface |
| `color.ink.primary` | `#111827` | Headlines, highest-emphasis text |
| `color.ink.secondary` | `#475569` | Body copy, captions |
| `color.ink.muted` | `#606C80` | Metadata, timestamps, disabled-adjacent labels; minimum verified text contrast is 4.74:1 on the light section surface |
| `color.cobalt.signature` | `#2453FF` | Primary accent, links, active states, CTA fill |
| `color.cobalt.dim` | `#6E8FFF` | Hover-adjacent/secondary cobalt for lower-emphasis accents on light backgrounds |
| `color.cobalt.glow.outer` | `rgba(36,83,255,0.08)` | Ambient color-bleed halo (soft, large radius) — on porcelain this reads as a tinted soft shadow/ambient light, not a dark-room glow; opacity deliberately lower than the old cyan-on-dark value since porcelain is already bright |
| `color.cobalt.glow.inner` | `rgba(36,83,255,0.18)` | Tighter color-bleed core, used where the sculpture's reflected light should visibly tint an adjacent surface |
| `color.cta.primary.bg` | `#2453FF` | Primary button fill |
| `color.cta.primary.text` | `#FFFFFF` | Primary button label (white-on-cobalt, ~5.6:1) |
| `color.cta.secondary.border` | `#2453FF` | Secondary (outline) button border |
| `color.cta.secondary.text` | `#2453FF` | Secondary button label (cobalt-on-porcelain, ~5.3:1) |
| `color.state.success` | `#15803D` | Form success, confirmation states (deep green, chosen specifically for AA/AAA legibility on `porcelain.base`/`white.pure` — the prior dark-theme mint green would fail on a light background) |
| `color.state.warning` | `#B45309` | Non-blocking warnings (deep amber, same light-background legibility reasoning) |
| `color.state.error` | `#DC2626` | Form/validation errors (deep red, same reasoning) |
| `color.state.focus` | `#2453FF` | Focus ring color (always visible, never suppressed) |
| `color.overlay.scrim` | `rgba(17,24,39,0.5)` | Modal/menu backdrop scrim — stays dark even in a light theme, standard practice for separating a modal from its backdrop |
| `color.selection.bg` | `rgba(36,83,255,0.15)` | `::selection` background |
| `color.material.cobalt.enamel` | `#2453FF`, high-gloss | Primary 3D sculptural material — glossy, saturated (§13) |
| `color.material.ceramic.polished` | `#F2F4FA`, soft specular | Structural/base 3D material — polished porcelain-white ceramic (§13) |
| `color.material.metal.brushed` | `#A7B2C7`, anisotropic highlight | Structural rib/edge 3D material — brushed metallic, replaces the old "graphite" (§13) |
| `color.material.composite.porcelain` | `#E3E7F0`, matte | Body-mass 3D material — matte porcelain composite (§13) |
| `color.material.glass.cobalt` | `rgba(36,83,255,0.35)`, translucent | Accent-facet 3D material — translucent cobalt glass, 1–2 facets only (§13) |
| `color.particle.core` | `#5B8DFF` | Particle system primary color (§14) — brighter than `cobalt.signature` so it self-illuminates convincingly against the one dark section it lives in |
| `color.particle.dim` | `#2E3A5C` | Particle system "unresolved/fragmented" state color (§14), tuned for the dark `bg.section.dark` backdrop |

**On-dark variants (for the two deep-cobalt sections only, if a component ever needs to render inside them):** `color.ink.onDark` = `#FFFFFF`, `color.ink.onDark.secondary` = `#C7D2FE`, `color.border.onDark` = `rgba(255,255,255,0.18)`. These exist specifically for HOME-04/HOME-08 content and must never be used on a porcelain/tinted background.

### 5.3 Usage ratios (per viewport, target)

| Layer | Target area share |
|---|---|
| Porcelain/tinted backgrounds | 55–70% |
| Surfaces (cards, forms) | 15–20% |
| Text (ink primary/secondary/muted) | 10–15% |
| Cobalt at full saturation | ≤10%, concentrated in CTAs, active accents, the sculpture, brand moments |
| Deep-cobalt dramatic sections | Exactly 2 of 8 homepage sections (25%) — a ceiling, not a target to hit elsewhere on the site |
| Borders/dividers | ≤2% |

### 5.4 Contrast & verification requirements

- Headlines (`color.ink.primary` on `color.bg.page`): **~16.7:1** (computed) — far exceeds AAA; reserved for short, large-type headline use specifically because this much contrast on dense body copy reads as harsh, not because it fails any requirement.
- Body copy (`color.ink.secondary` on `color.bg.page`): **~7.1:1** (computed) — the deliberate choice for anything beyond a headline, clearing AAA while remaining visually softer than full `ink.primary`.
- Body copy on `color.surface.tinted`/`color.white.pure`: re-verify `ink.secondary`'s ratio against each specific background it actually renders on (not just `bg.page`) before sign-off — all three light backgrounds are close enough in lightness that the ratio should hold, but this is marked for an automated check, not assumed from one computed pairing.
- Primary CTA label (`color.cta.primary.text` `#FFFFFF` on `color.cta.primary.bg` `#2453FF`): **~5.6:1** (computed) — clears AA comfortably for both normal and large text.
- White headline text on `color.bg.section.dark` (`#1736B8`): **~9.3:1** (computed, AAA) — confirms the two dark sections are safe for white display type.
- `color.border.interactive` (`#6D82B8`) against `color.bg.page`/`color.surface.tinted`/`color.white.pure`: **3.57:1 / 3.39:1 / 3.79:1** respectively, verified with the WCAG relative-luminance formula; all exceed WCAG 1.4.11's 3:1 non-text-contrast requirement.
- `color.border.hairline` (`#DCE3F1`) is **explicitly not** interactive-boundary-compliant (well under 3:1 against `porcelain.base`) — restricted to purely decorative dividers where WCAG's non-text-contrast rule does not apply, per §5.1's scope note.
- Never place body text directly on `color.cobalt.signature` at reduced opacity — always resolve to a solid computed color before contrast checks.
- Arabic text requires the same contrast minimums as English at every pairing above. `ink.muted` (`#606C80`) has verified text contrast of **5.00:1 / 4.74:1 / 5.31:1** against porcelain/tinted/white, respectively.

### 5.5 Surface Treatment, Depth & Section Transitions

A flat, single-hex background color is **not a complete section background** for any section taller than one viewport — this was true under the dark identity and remains true under Cobalt & Porcelain; a page of uniformly flat white sections is exactly as weak as a page of uniformly flat navy sections. Every section background must carry at least one of the following:

| Treatment | Specification | Use when |
|---|---|---|
| Subtle vertical gradient | Interpolate between `color.bg.page` and `color.bg.section.tinted` (or, within the two dark sections, between `color.bg.section.dark` and a slightly deeper/lighter cobalt), ≤6% perceptual-lightness delta, no visible banding | Default for any full-bleed section background |
| Low-opacity grain/noise | SVG-filter or data-URI noise texture, ≤4% opacity, warm-neutral tint on light sections / cool-neutral tint on the two dark sections, fine grain | Large flat sections with no other texture (e.g. §27 row 07 Philosophy) |
| Anchored radial glow/tint | Reuse `color.cobalt.glow.outer` at low opacity, positioned at the section's named visual focal point (PAGE-BLUEPRINTS.md §31.1) | Sections with a hero-weight statement or CTA (HOME-01, HOME-08, service-page hero) |
| Soft cast shadow | A large, soft, low-opacity shadow (not a hard drop-shadow) anchored beneath/behind a focal element, grounding it on the porcelain surface | Any section whose focal point is a 3D/sculptural or card-elevated element on a light background (HOME-01 especially, §13.1) |

**Section-to-section transition rule:** adjacent sections never meet on a hard one-pixel color cut. The boundary 80–120px of each section blends toward the next section's background value — including the transition *into and out of* the two dark sections, which get a deliberately more pronounced blend (120–160px) since the lightness jump is much larger there than between two light tones.

### 5.6 Visual Density Floor (cross-reference)

Every section is assigned one of three density classes — **Rich**, **Structured-minimal**, **Quiet** — defined and applied per-section in PAGE-BLUEPRINTS.md §31. A flat background plus bare text with none of §5.5's treatments and no device from §18.22 is only acceptable for a section explicitly classified **Quiet**; any **Rich** or **Structured-minimal** section rendering that way is a specification or implementation defect, not an acceptable minimal composition. This rule is palette-independent and carries forward unchanged from the Phase 03 audit.

---

## 6. English Typography

| Role | Family | Note |
|---|---|---|
| Display/Headlines | **Space Grotesk** (variable) | Distinctive grotesk, strong brand signature, good at large display sizes — retained; no compatibility or quality issue was found that would justify a font change for this migration |
| Body | **Inter** (variable) | High readability, excellent variable-font/hinting support, industry-proven at small sizes — retained |
| Technical labels/metadata | **IBM Plex Mono** | Monospace for eyebrows, technical tags, coordinates-style metadata — retained |

Licensing: all three are open-source (OFL/Apache-family), cleared for unlimited commercial web use with no royalty — confirmed-safe choice, no licensing blocker. Variable-font files preferred for performance (single file per family covering weight range).

### 6.1 English type scale

Unchanged from the prior specification — sizes, weights, line-heights, and letter-spacing below are palette-independent and carry forward as-is.

| Token | Family | Weight | Desktop | Tablet | Mobile | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|---|
| `type.en.display-xl` | Space Grotesk | 600 | clamp(3.5rem, 2.2rem + 4vw, 6.5rem) | 3.25rem | 2.5rem | 1.02 | -0.01em |
| `type.en.display-lg` | Space Grotesk | 600 | clamp(2.75rem, 2rem + 3vw, 4.75rem) | 2.75rem | 2.1rem | 1.04 | -0.01em |
| `type.en.hero-h1` | Space Grotesk | 600 | clamp(2.5rem, 1.8rem + 2.5vw, 4rem) | 2.5rem | 2rem | 1.08 | -0.005em |
| `type.en.h1` | Space Grotesk | 600 | 2.5rem | 2.25rem | 1.75rem | 1.15 | 0 |
| `type.en.h2` | Space Grotesk | 500 | 2rem | 1.75rem | 1.5rem | 1.2 | 0 |
| `type.en.h3` | Space Grotesk | 500 | 1.5rem | 1.375rem | 1.25rem | 1.25 | 0 |
| `type.en.h4` | Space Grotesk | 500 | 1.25rem | 1.2rem | 1.1rem | 1.3 | 0 |
| `type.en.body-lg` | Inter | 400 | 1.25rem | 1.15rem | 1.1rem | 1.5 | 0 |
| `type.en.body` | Inter | 400 | 1rem | 1rem | 0.9375rem | 1.6 | 0 |
| `type.en.body-sm` | Inter | 400 | 0.875rem | 0.875rem | 0.8125rem | 1.55 | 0 |
| `type.en.caption` | Inter | 500 | 0.75rem | 0.75rem | 0.75rem | 1.4 | 0.01em |
| `type.en.eyebrow` | IBM Plex Mono | 500 | 0.8125rem | 0.8125rem | 0.75rem | 1.3 | 0.08em, uppercase |
| `type.en.technical-label` | IBM Plex Mono | 400 | 0.75rem | 0.75rem | 0.6875rem | 1.4 | 0.04em |
| `type.en.nav` | Inter | 500 | 0.9375rem | 0.9375rem | 1rem (mobile menu) | 1.4 | 0 |
| `type.en.button` | Space Grotesk | 500 | 1rem | 1rem | 0.9375rem | 1.2 | 0.01em |
| `type.en.form-label` | Inter | 500 | 0.875rem | 0.875rem | 0.875rem | 1.4 | 0.01em |

**Line length:** body copy max-width 62–70ch desktop, 38–44ch mobile. **Headline wrapping:** manual `<br>`/wrap control at display sizes to avoid orphaned short last words.

### 6.2 Color Application on Porcelain (Phase 03B)

Weight distribution and scale are unchanged and were re-evaluated for the new background: at 500–600 weight (the ceiling already in place, see §6.1), Space Grotesk display sizes read cleanly on `color.bg.page` with no optical-weight correction needed — no change to weight was required. What changed is purely which color token carries each role: headline-weight text uses `color.ink.primary`, body-weight text defaults to `color.ink.secondary` (not `ink.primary`) specifically to avoid the harsher contrast noted in §5.4, and metadata/caption-weight text uses `color.ink.muted`. No component should apply `ink.primary` to a body-length paragraph.

---

## 7. Arabic Typography

| Role | Family | Note |
|---|---|---|
| Display/Headlines/Body | **IBM Plex Sans Arabic** (variable where available) | Full Arabic glyph coverage, modern/professional register, strong Latin-numeral pairing for mixed content — retained; no compatibility or quality issue found to justify a change |
| Technical labels (Latin terms embedded in Arabic, e.g. "API", "SaaS") | **IBM Plex Mono** (same as English) | Keeps embedded English/technical terms visually consistent across both locales |

Arabic does **not** reuse Space Grotesk/Inter at any size — unchanged rationale from the prior specification.

### 7.1 Arabic typography rules

Unchanged from the prior specification (palette-independent):
- **No letter-spacing (`tracking`) applied to Arabic text at any size.**
- **No uppercase/small-caps transforms.**
- **Line-height is taller than the English equivalent at every scale** (+0.1–0.15 over the English line-height at matching roles).
- **Avoid font weights above 600 ("Bold")** for large Arabic headlines.
- **No text clipping on diacritics.**
- **Numerals:** Western Arabic numerals (0–9) per PRODUCT.md §10.

### 7.2 Arabic type scale

Unchanged from the prior specification.

| Token | Family | Weight | Desktop | Tablet | Mobile | Line-height | Max line length |
|---|---|---|---|---|---|---|---|
| `type.ar.display-xl` | IBM Plex Sans Arabic | 600 | clamp(2.75rem, 1.8rem + 3.5vw, 5.25rem) | 2.75rem | 2.1rem | 1.25 | — |
| `type.ar.display-lg` | IBM Plex Sans Arabic | 600 | clamp(2.25rem, 1.7rem + 2.5vw, 3.75rem) | 2.25rem | 1.9rem | 1.3 | — |
| `type.ar.hero-h1` | IBM Plex Sans Arabic | 600 | clamp(2rem, 1.6rem + 2vw, 3.25rem) | 2rem | 1.75rem | 1.32 | — |
| `type.ar.h1` | IBM Plex Sans Arabic | 600 | 2.125rem | 1.9rem | 1.6rem | 1.35 | — |
| `type.ar.h2` | IBM Plex Sans Arabic | 500 | 1.75rem | 1.5rem | 1.35rem | 1.4 | — |
| `type.ar.h3` | IBM Plex Sans Arabic | 500 | 1.375rem | 1.25rem | 1.15rem | 1.45 | — |
| `type.ar.h4` | IBM Plex Sans Arabic | 500 | 1.15rem | 1.1rem | 1.05rem | 1.45 | — |
| `type.ar.body-lg` | IBM Plex Sans Arabic | 400 | 1.2rem | 1.15rem | 1.1rem | 1.7 | 55ch |
| `type.ar.body` | IBM Plex Sans Arabic | 400 | 1rem | 1rem | 0.9375rem | 1.8 | 58ch |
| `type.ar.body-sm` | IBM Plex Sans Arabic | 400 | 0.875rem | 0.875rem | 0.8125rem | 1.7 | — |
| `type.ar.caption` | IBM Plex Sans Arabic | 500 | 0.75rem | 0.75rem | 0.75rem | 1.5 | — |
| `type.ar.eyebrow` | IBM Plex Sans Arabic | 500 | 0.8125rem | 0.8125rem | 0.75rem | 1.4 | no uppercase |
| `type.ar.nav` | IBM Plex Sans Arabic | 500 | 1rem | 1rem | 1.0625rem | 1.4 | — |
| `type.ar.button` | IBM Plex Sans Arabic | 500 | 1.0625rem | 1.0625rem | 1rem | 1.3 | +10% width vs. English button |
| `type.ar.form-label` | IBM Plex Sans Arabic | 500 | 0.9375rem | 0.9375rem | 0.9375rem | 1.5 | — |

### 7.3 Color Application on Porcelain (Phase 03B)

Same mapping as §6.2: Arabic headline-weight text uses `color.ink.primary`, body-weight text uses `color.ink.secondary`, metadata uses `color.ink.muted`. The independent-composition requirement (Arabic is art-directed on its own terms, not mirrored from English) is unaffected by the palette change and remains fully binding — see §31.

Button width implication (unchanged): because Arabic CTA strings run longer than their English counterparts at equivalent visual weight, buttons use `min-width` + intrinsic padding rather than a fixed width shared across locales — see §22.

---

## 8. Bidirectional Typography Rules

Unchanged from the prior specification (palette-independent):
- **Mixed Arabic/English text:** wrap embedded Latin terms in `<span dir="ltr" style="unicode-bidi: isolate">`.
- **URLs, emails:** always rendered LTR-isolated.
- **Phone numbers:** rendered LTR-isolated.
- **Numbers/dates/currency:** Western Arabic numerals read LTR even inside an RTL paragraph, no special isolation needed.
- **Code snippets / API names / Latin product names:** isolate with `dir="ltr"` spans; never transliterate.
- **Do not use the Unicode RLM/LRM marks as a first resort.**

---

## 9. Grid & Layout

Unchanged from the prior specification (palette-independent).

### 9.1 Desktop grid (≥1280px)
12 columns, max content width 1440px (full-bleed sections exceed this deliberately), gutter 24px, outer margin 80px at 1440px+ scaling down to 48px at 1280px.

### 9.2 Tablet grid (768–1279px)
8 columns, gutter 20px, outer margin 40px (1024px) down to 32px (768px).

### 9.3 Mobile grid (320–767px)
4 columns, gutter 16px, outer margin 16px fixed (safe-area-aware, §31).

### 9.4 Spacing scale (8px base unit)

| Token | Value |
|---|---|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 16px |
| `space.4` | 24px |
| `space.5` | 32px |
| `space.6` | 48px |
| `space.7` | 64px |
| `space.8` | 96px |
| `space.9` | 128px |
| `space.10` | 192px |

Section vertical rhythm (desktop): `space.9`–`space.10` between major homepage sections; `space.7` between sub-blocks within a section; mobile compresses to `space.7`/`space.6` respectively.

### 9.5 Logical properties mandate
All spacing/positioning in component CSS uses **logical properties**, not physical left/right — unchanged from the prior specification; see §20–§23 for the one documented physical-property exception (signed `translateX` for motion).

---

## 10. Spacing System

Covered in §9.4.

---

## 11. RTL Layout Architecture

Unchanged from the prior specification — these mechanics are palette-independent:
- `<html dir="rtl" lang="ar">` for all `/ar/*` routes; `<html dir="ltr" lang="en">` for all `/en/*` routes.
- **Navigation order:** primary nav items read right-to-left in logical order matching the Arabic reading sequence.
- **Logo placement:** inline-end side is mirrored automatically by `dir`. Logo mark itself never mirrors (§12).
- **CTA placement:** primary CTA sits at the inline-end of the nav bar in both directions.
- **Language switcher:** opposite end from the primary CTA, at inline-start of the utility cluster — see §21.
- **Breadcrumbs:** chevron direction mirrors (§12).
- **Grid reading order:** editorial asymmetric layouts place the dominant visual element at the inline-start side by default, unless a specific section's art direction calls for an intentional recomposition (§27).
- **Mobile navigation:** slide-in menu enters from the inline-end edge.

---

## 12. LTR Layout Architecture

Unchanged from the prior specification.
- `<html dir="ltr" lang="en">`.
- Nav reads left-to-right in standard Western order; primary CTA sits at the far right (inline-end); language switcher sits left of utility cluster (inline-start).
- Breadcrumb chevrons point right (`›`).
- Mobile drawer enters from the right edge.

### 12.1 Directional icon mirroring rule (applies to both §11 and §12)

| Icon type | Mirrors with direction? |
|---|---|
| Back/forward arrows | ✅ Yes |
| Breadcrumb chevrons | ✅ Yes |
| Carousel/slider nav arrows | ✅ Yes |
| Directional transition chevrons (process timeline, §17.6) | ✅ Yes |
| Rakmyat logo mark | ❌ Never |
| External brand marks (any future client/partner logo) | ❌ Never |
| Play/pause icon | ❌ Never |
| Non-directional system icons (close ✕, search, menu hamburger, checkmark) | ❌ Never |

---

## 13. Signature Sculptural 3D

**Concept (unchanged):** a precise geometric structure that visually resolves from complexity into order — subtly referencing the letter "R" through a single clean structural edge, never as a literal, decorative monogram. **Materials, lighting, and environmental integration are rebuilt below for a porcelain canvas.**

| Property | Specification |
|---|---|
| Shape language | Faceted, architectural polyhedral form — angular, not organic/blobby; one dominant structural axis suggesting the "R" stroke without rendering a literal letter (unchanged) |
| Materials | **Cobalt enamel** (`color.material.cobalt.enamel` — primary glossy body), **polished ceramic** (`color.material.ceramic.polished` — structural base facets), **brushed metallic** (`color.material.metal.brushed` — structural ribs, replacing the old graphite), **matte porcelain composite** (`color.material.composite.porcelain` — body-mass sections), **translucent cobalt glass** (`color.material.glass.cobalt` — one or two accent facets only, reading as a jewel-like inset catching light rather than an internally glowing core) |
| Lighting | Studio-style rig: a soft, large overhead key light (neutral white) establishes form and material read; a secondary cobalt-tinted fill light subtly tints shadow edges and the translucent-glass facets blue; no rim-light-in-darkness (there is no darkness to rim-light against on a porcelain canvas) |
| Composition | Occupies 35–45% of hero viewport width on desktop; floats at optical center-right (LTR) / center-left (RTL) of the hero canvas — unchanged proportions, new lighting logic |
| Camera | Static-feeling "locked" perspective with subtle parallax-on-scroll/pointer (≤8° rotation range) — unchanged |
| Depth | Rendered against `color.bg.page` with a soft, large-radius cast shadow (not a glow) beneath/behind it, per §5.5's "soft cast shadow" treatment — this is the mechanism that grounds the object on the porcelain surface |
| Background integration | The object casts a believable soft shadow onto the porcelain surface, and its glossy cobalt-enamel facets reflect a faint tint of the surrounding light back onto the nearest surface (a soft, diffuse color-bleed per §5.5's anchored-tint treatment) — this replaces the old "rim-light bleeding onto the headline" mechanism (§13.1) |
| Animation | Idle: slow (20–30s loop) micro-rotation ≤4°; on scroll-into-view: single settle-in rotation (§24); on pointer move (desktop only): parallax tilt ≤8°, eased, never snapping — unchanged |
| Mobile fallback | Below 768px, render as a pre-composed static image/lightweight video loop of the same asset (no live WebGL) — same material/lighting direction preserved |
| Reduced motion | Static final-resolved frame, no rotation, no parallax |
| Performance | WebGL/3D payload budget ≤1.5MB (model + textures) on desktop; not loaded at all below 768px |

**Directional composition rule (unchanged mechanism, restated for the new lighting model):** the sculpture does **not** get mirrored left-right between locales. In the English (LTR) hero, headline sits inline-start (left), sculpture sits inline-end (right). In the Arabic (RTL) hero, headline sits inline-start (right), and the sculpture is **recomposed**, not flipped — same asset, repositioned to the opposite screen side with its studio light rig re-aimed so the key light still reads as coming from "above and toward the headline," and its cast shadow still falls toward the reading-flow side that visually supports the text block. 🔵 Commission the sculpture with an adjustable/re-liftable rig specifically to satisfy this requirement (§28).

**Avoiding generic abstract 3D (unchanged):** no floating glass orbs, no generic torus/blob morphs, no particle-text logos. The sculpture must read as a specific, nameable object. **Avoiding generic light-mode 3D (new):** also avoid a flat matte-white "clay render" look with no material distinction — the cobalt-enamel/ceramic/metal/composite material mix (above) exists specifically so the object reads as multi-material and engineered, not a single-material placeholder shape.

### 13.1 Hero Integration & Disconnection Test

The failure mode this gate prevents — "a hero sculpture disconnected from the rest of the page" — is identical under the new palette; the mechanism that prevents it changes from glow-bleed-in-darkness to shadow-and-reflection-on-porcelain:

- **Grounding is required, not optional.** The sculpture must cast a visible, soft shadow onto the porcelain surface beneath/around it, and its glossy facets must visibly reflect a faint cobalt tint onto the nearest adjacent surface (§5.5) — if a screenshot shows the sculpture floating with no cast shadow and no reflected tint, as if cut out and pasted onto the page, the composition fails.
- **Vertical alignment (unchanged):** the sculpture's optical center aligns with the headline block's cap-height midline, ±10% of the headline block's height, at desktop widths (≥1280px).
- **Disconnection test (acceptance criterion, rewritten):** screenshot the hero at 1440px. If the sculpture shows no cast shadow and no reflected color-bleed onto the porcelain canvas around it — i.e., it looks like a rendered object dropped onto a flat background rather than an object actually sitting in a lit studio scene with the headline — the hero fails this gate. Fix via shadow, reflection/tint, alignment, or recomposing the negative space between the two elements (not by adding unrelated decoration). Mandatory check in the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5) before any further implementation proceeds.

---

## 14. Particle Intelligence Art Direction

**Concept (unchanged):** disorganized points of light gradually resolving into a precise, engineered structure — visualizing "fragmented information becoming an engineered system," used specifically in homepage §17.4 (Systems in Motion). **This is one of the two sections that deliberately uses the deep-cobalt dark background (§5.2 `color.bg.section.dark`)** — a self-illuminating particle field genuinely needs a dark backdrop to read as energy/light rather than as dots on paper, which is the one place in this identity where "dark" is the correct, deliberate choice rather than a default being retained out of habit.

| Property | Specification |
|---|---|
| Background | `color.bg.section.dark` (`#1736B8`) — the section's dark status is intentional and load-bearing for this specific visual system, not a leftover from the prior dark-only identity |
| Density | 400–800 particles desktop (canvas/WebGL), reduced to 150–250 or a pre-baked animated sprite on mobile |
| Motion behavior | Stage 1 ("Fragmented"): high positional noise, slow drift, `color.particle.dim`. Stage 2 ("Connected"): particles ease toward a loose network with visible connecting lines, color shifts toward `color.cobalt.dim`. Stage 3 ("Automated"): particles snap into a precise geometric lattice, full `color.particle.core`, connecting lines become clean straight structural lines |
| Color | `color.particle.dim` → `color.cobalt.dim` → `color.particle.core` across the three stages (ties directly to PRODUCT.md §17.4 stage labels) |
| Lighting | Particles self-illuminate (additive blending) against the dark backdrop |
| Visual complexity | Capped at one connecting-line render pass; no secondary bloom/glow layers stacked on top |
| Interaction | Desktop: pointer proximity gently repels/attracts nearby particles (≤20px displacement). Scroll: stage transition scroll-linked within the section's own scroll range only |
| RTL/LTR behavior | The fragmented→connected→automated resolution direction is time-based, not mirrored (§25) |
| Performance budget | Desktop WebGL particle layer ≤400KB; mobile uses a pre-rendered sprite sheet or capped Canvas2D (≤250 particles) |
| Reduced-motion alternative | Static three-frame illustration with a simple crossfade or stepped tap/click control |

---

## 15. Digital Architecture Visual System

**Concept (unchanged):** isometric/spatial diagrams representing enterprise platforms, connected modules, API integrations, AI agents, and data pipelines — used on service detail pages and homepage §17.5/§17.6 supporting visuals. **Rebuilt as a light "blueprint" aesthetic:**

| Property | Specification |
|---|---|
| Perspective | Fixed isometric projection (30°/30°), unchanged |
| Module shapes | Flat-topped rectangular "cards" in `color.white.pure` with a thin `color.border.hairline` edge, sitting on `color.bg.section.tinted` — a light blueprint/schematic read rather than the old dark-panel look |
| Connection lines | Clean orthogonal routed lines in `color.cobalt.signature`, with directional flow indicated by a small animated pulse traveling along the line |
| Labeling | Technical-label type token (`type.en.technical-label` / Arabic equivalent), `color.ink.secondary`, positioned at the module's logical-start corner |
| Direction-aware reading order | Diagram's primary flow runs in the reading direction: left-to-right in English, right-to-left in Arabic — the one visual system whose *flow* mirrors (§25) |
| Interactive states | Hover/focus on a module raises it one elevation step via `shadow.sm`→`shadow.md` (not a color change, consistent with §5.2's "elevation via shadow" rule) and highlights its direct connection lines |
| Animation | On scroll-into-view: modules fade/settle in sequence along the flow direction, staggered; no idle looping animation once settled |
| Fallback | Below 768px: simplifies to a vertical stacked flow or a static image with equivalent alt text |

**When to use which system (unchanged):** Signature 3D (§13) = brand/hero moments only. Particle Intelligence (§14) = the one deliberately-dark transformation narrative. Digital Architecture (§15) = anywhere the site explains how systems/integrations actually work. No two sections in a row reuse the same visual system (§27).

---

## 16. Imagery & Media

- **No stock photography anywhere** — all imagery is either the three signature visual systems (§13–§15), genuine product screenshots from real/demo projects (PRODUCT.md §25), or clean typographic/editorial compositions with no imagery at all.
- **Portfolio imagery:** real product screenshots, 16:10 for case-study hero images, 4:3 for in-page detail shots; color-graded with a subtle cool-porcelain cast (cooled slightly toward `cobalt.dim`) so screenshots sit visually inside the site's palette rather than looking raw/un-treated.
- **Video backgrounds:** permitted only for the Signature 3D mobile fallback (§13) and, if produced later, a single hero loop — muted, ≤8s loop, ≤3MB compressed, `poster` frame set.
- **Format/compression:** AVIF with WebP fallback; SVG for all diagrams/icons; responsive `srcset` at minimum 3 widths.
- **Loading priority:** hero 3D/image asset is the only element allowed `fetchpriority="high"`.
- **Asset status:** see [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) for current status, and §9 of that document for the migration audit of every asset produced under the prior dark identity.

---

## 17. Iconography

A single custom icon set, geometric/monoline (1.5px stroke at 24px base size), no filled icon style mixed in except for small status dots (success/warning/error). Icons never use a third color beyond `color.ink.primary`/`color.ink.secondary`/`color.cobalt.signature` (active/hover state only). Directional-mirroring rules per §12.1. No emoji anywhere in the interface.

---

## 18. Component Design System

General rules applying to every component below: built with logical properties only (§9.5); every interactive state (hover/focus/active/disabled/loading) is specified in both locales using the same tokens (§5–§7); every component's Arabic content example uses real Arabic strings from PRODUCT.md's content matrix, not Latin placeholder text; avoid excessive cobalt fills — use it intentionally for brand recognition and action hierarchy, not as a default fill for every surface (brief §8's explicit caution).

### 18.1 Header / Desktop Navigation
- **Anatomy:** logo (inline-start) · nav items · utility cluster: language switcher + primary CTA (inline-end).
- **Height:** 88px desktop, 72px tablet/mobile. **Background:** transparent over the hero's porcelain canvas, resolving to `color.white.pure` at 92% opacity + 12px backdrop-blur after 40px scroll, with a `color.border.hairline` bottom edge once solid (a light header needs a defining edge that a dark header, which separated from its background by brightness alone, did not).
- **Nav item type:** `type.en.nav` / `type.ar.nav`, `color.ink.secondary` default. **Hover:** underline grows from 0 to full width, `color.cobalt.signature`. **Active route:** permanent 2px underline in `color.cobalt.signature`, label color shifts to `color.ink.primary`.
- **Focus:** 2px `color.state.focus` outline, 2px offset.
- **Mobile:** collapses to logo + hamburger (inline-end) + CTA may hide into the drawer if width is tight below 400px.

### 18.2 Mobile Navigation (drawer)
- Full-height drawer sliding from inline-end edge, `color.white.pure` background with a `color.border.hairline` inline-start edge, nav items stacked vertically at `type.en.h3`/`type.ar.h3` size, language switcher pinned above the primary CTA at the drawer's bottom.
- Open/close: 320ms `ease.decelerate` slide + 200ms backdrop fade (`color.overlay.scrim`); closing via swipe-toward-start gesture, ✕ icon, or `Esc` key.
- Focus trapped inside drawer while open; focus returns to the hamburger button on close.

### 18.3 Logo
- Wordmark lockup ("Rakmyat" Latin / "رقميات" Arabic) — 🔴 final logo not supplied; interim spec is a clean Space Grotesk/IBM Plex Sans Arabic wordmark at 600 weight in `color.ink.primary` (or `color.cobalt.signature` if a single-color brand mark is preferred — 🟡 flagged as a lightweight open question for the owner, not a blocker), no icon mark, until a real mark is approved. Never mirrors (§12.1).

### 18.4 Primary Button
- **Anatomy:** label only. Fill `color.cta.primary.bg`, text `color.cta.primary.text`, radius `radius.md` (§34), padding `space.3` block / `space.4` inline (English) — Arabic gets +20% inline padding.
- **Hover:** background shifts to `color.cobalt.deep` (a *darker*, not lighter, shift — correct for a light theme, where hover states typically deepen rather than brighten), 160ms `ease.standard`. **Active:** scale(0.98), 100ms. **Focus:** `color.state.focus` outline, 2px offset. **Disabled:** 40% opacity. **Loading:** label replaced by a 16px spinner in `color.cta.primary.text`, button width locked.
- **Size variants:** `lg` (56px), `md` (48px), `sm` (40px) — unchanged.

### 18.5 Secondary Button
- Outline style: 1.5px `color.cta.secondary.border`, transparent fill, `color.cta.secondary.text` label. Hover: fill transitions to `rgba(36,83,255,0.06)` (a very light cobalt tint fill, the light-theme equivalent of the old dark-theme hover tint). Same sizing/focus/disabled/loading rules as §18.4.

### 18.6 Text Link
- `color.cobalt.signature` text, no underline at rest, underline appears on hover. Focus: outline per standard focus token.

### 18.7 Icon Button
- 40×40px minimum hit target, `color.ink.secondary` default → `color.ink.primary` hover/focus, `color.cobalt.signature` for an active/toggled state.

### 18.8 Service Row (homepage §17.3 / services index)
- Full-width editorial row on `color.bg.section.tinted`: large numbered index + service name at `type.en.h2`/`type.ar.h2` (`color.ink.primary`) + one-sentence description (`color.ink.secondary`) + inline-end chevron link (`color.cobalt.signature`). Divider below each row in `color.border.hairline`. Hover: entire row's text shifts 8px toward inline-end, 200ms.

### 18.9 Project Showcase / Case Study Preview
- Full-bleed or near-full-bleed image (16:10) on `color.bg.page`, classification badge pinned at the image's inline-start top corner, project name (`color.ink.primary`) + one-line context below, metadata row in `type.en.technical-label` (`color.ink.muted`). Hover (desktop): image scales to 1.02 over 400ms, soft shadow intensifies slightly (`shadow.sm`→`shadow.md`) to lift the card off the page.

### 18.10 Interactive Diagram / Workflow Visualization
- Implements §15's light blueprint system. Keyboard-navigable: each module is a focusable element, arrow keys move focus along the diagram's connection graph in reading-direction order.

### 18.11 Accordion
- Header row: `type.en.h4`/`type.ar.h4` (`color.ink.primary`) + chevron (`color.cobalt.signature`, rotates 180° open). `aria-expanded` state, content animates height via `max-height` transition capped at 300ms.

### 18.12 Form Input / Textarea / Select
- `color.white.pure` background, 1.5px `color.border.interactive` border (not `border.hairline` — this is exactly the interactive-component case §5.1/§5.4 flags), `radius.sm`. Focus: border becomes `color.state.focus`, 2px, plus a subtle `color.cobalt.glow.outer` halo. Label always visible above the field in `color.ink.primary` (no placeholder-as-label pattern). RTL: numeric/email/phone fields force `dir="ltr"` internally.

### 18.13 Checkbox
- 20×20px, `color.border.interactive` default, `color.cobalt.signature` fill + white check glyph when checked.

### 18.14 Validation Message
- Inline, below the field, `color.state.error` text, preceded by a small non-mirroring error icon. Announced via `aria-live="polite"`. Arabic error copy drafted natively.

### 18.15 Toast
- Top-of-viewport, inline-end-anchored in LTR / inline-start-anchored in RTL, `color.white.pure` background with `shadow.lg`, auto-dismiss 4s, `role="status"`.

### 18.16 Modal
- `color.overlay.scrim` backdrop, `color.surface.2` (`color.white.pure` + `shadow.lg`) panel, focus-trapped, `Esc` to close.

### 18.17 Contact CTA (section-level)
- Full-width banded section on `color.bg.section.tinted`, large headline (`color.ink.primary`) + both CTAs side-by-side on desktop (stacked full-width on mobile, primary on top).

### 18.18 Footer
- Four logical columns on `color.bg.page` with a `color.border.hairline` top edge, locale switcher repeated, copyright line in `color.ink.muted`, `/privacy` link.

### 18.19 Loading State
- Section-level skeletons use `color.surface.tinted` blocks with a slow (1.5s) opacity pulse (0.6↔1) — a light-theme skeleton reads as a slightly darker tint against the page, the inverse of the old dark-theme lighter-block skeleton.

### 18.20 Empty State
- Centered icon-free message in `color.ink.secondary`, one sentence, link to `/process`.

### 18.21 404 Page
- Minimal: short on-brand message, two links (home, contact), no 3D/particle asset.

### 18.22 Visual Micro-Detail Standard

Typography-only sections are a named failure risk ("sections resembling unfinished wireframes") when they are only text on a flat background — true under either palette. The fix remains a quiet typographic device, re-tuned for light backgrounds:

- **Oversized background numeral:** for every numbered row/stage, render the number at 120–160px (desktop), weight 500, `color.ink.muted` at **6–10% opacity** (a light-theme numeral needs slightly lower opacity than the old dark-theme one, since `ink.muted` against a light background is more visually assertive at equal opacity than a light token was against a dark background) — large enough to register as deliberate texture, faint enough to never compete with the foreground headline.
- This numeral is typography, not an image asset — no production required, only the type token + opacity value above.

---

## 19. Header & Navigation

Covered fully in §18.1–§18.2.

---

## 20. Language Switcher

| Aspect | Specification |
|---|---|
| Desktop placement | Utility cluster, inline-start of the primary CTA (§11/§12) |
| Mobile placement | Top of the nav drawer, pinned as the first interactive element |
| Current-language indication | Active locale in `color.ink.primary` + subtle `color.bg.section.tinted` pill background; inactive locale in `color.ink.secondary`, no pill |
| Visible labels | "العربية" and "English" — real language names, never flag icons alone |
| Interaction | Two-way toggle; `aria-label="Switch to English"` / `aria-label="التبديل إلى العربية"` |
| Keyboard | Fully tabbable, `Enter`/`Space` activates |
| Route preservation | Switching preserves the equivalent page in the other locale (PRODUCT.md §14/§16) |
| Fallback behavior | If the equivalent page doesn't exist yet, navigate to the closest valid equivalent with an on-page notice — never a silent same-language stay or a 404 |
| Direction transition | Page content cross-fades (200ms) while `dir`/`lang` swap |

---

## 21. (merged into §20 — see §20)

---

## 22. Buttons & Links

Fully specified in §18.4–§18.6.

---

## 23. Forms

Fully specified in §18.12–§18.14, with field-level content defined in PRODUCT.md §21.

---

## 24. Motion System

**Motion intensity: Balanced** — unchanged from the prior specification; motion timing/easing is palette-independent.

### 24.1 Timing tokens

| Token | Duration | Use |
|---|---|---|
| `motion.instant` | 100ms | Button active-state scale, checkbox toggle |
| `motion.fast` | 160–200ms | Hover states, focus transitions, nav underline |
| `motion.standard` | 300ms | Component entrance (card, accordion), drawer backdrop |
| `motion.slow` | 400–600ms | Section-level reveals, image scale-on-hover, drawer slide |
| `motion.cinematic` | 800–1200ms | Hero text stagger, 3D settle-in-on-scroll |

### 24.2 Easing curves

| Token | Curve | Use |
|---|---|---|
| `ease.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for most UI transitions |
| `ease.decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Entrances |
| `ease.accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `ease.cinematic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero/3D settle moments only |

### 24.3 Concrete interaction specs

Unchanged from the prior specification except where a token name changed (cosmetic rename only, same timing/distance/opacity values):

| Interaction | Duration/Easing | Distance/Scale/Opacity |
|---|---|---|
| Hero text entrance (per line, staggered 80ms apart) | `motion.cinematic` / `ease.cinematic` | translateY(24px→0), opacity(0→1) |
| Scroll reveal | `motion.slow` / `ease.decelerate` | translateY(16px→0), opacity(0→1), once at 30% visibility |
| Project image hover scale | `motion.slow` / `ease.standard` | scale(1→1.02) |
| Button hover | `motion.fast` / `ease.standard` | background color shift (now deepens toward `cobalt.deep` rather than lightening, §18.4) |
| Button active | `motion.instant` / `ease.standard` | scale(1→0.98) |
| Nav underline | `motion.fast` / `ease.standard` | width(0→100%) |
| 3D sculpture idle | 20–30s loop / linear | rotate ≤4° |
| 3D sculpture pointer parallax | `motion.fast` response / `ease.standard` | tilt ≤8° |
| Particle stage transition (§14) | 600–900ms / `ease.standard`, scroll-linked within section | position/color interpolation |
| Drawer open/close | `motion.slow` (320ms) / `ease.decelerate` in, `ease.accelerate` out | translateX(100%→0) inline-end-anchored |
| Page/locale cross-fade | `motion.standard` | opacity only |

### 24.4 What is CSS vs. JS/WebGL

Unchanged: CSS-only (hover/focus/active states, nav underline, accordion, button states, drawer slide, page cross-fade); JS-required/IntersectionObserver (scroll-reveal triggers, staggered hero entrance, settle-in-once entrances); WebGL/Canvas-required (Signature 3D §13, Particle Intelligence §14, both desktop-only with non-WebGL fallbacks).

### 24.5 Hard constraints

Unchanged: no scroll-hijacking; no animation delays CTA access; no layout shift from any animation.

### 24.6 Resting-State Completeness

Unchanged rule, palette-independent: every section's fully-settled state must be independently complete and premium — motion enhances arrival, never substitutes for a finished static composition. Acceptance check: disable all motion and screenshot every section against the same visual-completeness bar as its animated state.

---

## 25. RTL Motion Behavior

Unchanged from the prior specification — motion direction follows the logical/meaningful axis, not a blanket mirror.

| Motion type | RTL behavior |
|---|---|
| Nav underline growth | Mirrors (tied to text reading direction) |
| Drawer slide | Mirrors (tied to layout) |
| Breadcrumb/carousel directional transitions | Mirrors |
| Digital Architecture diagram flow (§15) | Mirrors (reading-direction process sequence) |
| Particle Intelligence stage resolution (§14) | Does **not** mirror (time-based state change) |
| 3D sculpture idle rotation/parallax (§13) | Does **not** mirror (physical rotation has no reading direction; only composition/light-rig aim change per §13's recomposition rule) |
| Hero text stagger | Identical animation, text alignment follows `text-align: start` |

---

## 26. Scroll Storytelling

Unchanged: used in exactly two places (Systems in Motion particle stages, the hero's one-time settle-in), both scoped to their own section's scroll range, each with a static/manual-control/reduced-motion fallback.

---

## 27. Homepage Art Direction

Maps directly to PRODUCT.md §17's eight sections — rebuilt backgrounds and visual notes for Cobalt Blue & Porcelain. **Rhythm:** light-led throughout, with exactly two deliberate deep-cobalt moments (rows 04 and 08) for dramatic contrast, bookending the back half of the page.

| # | Section | Visual system used | Background | Key visual note |
|---|---|---|---|---|
| 01 | The Statement Hero | Signature 3D (§13) | `color.bg.page` with a soft cast shadow + cobalt color-bleed anchor (§5.5) | Full viewport height; porcelain architectural canvas per the brief; see §13.1's grounding/disconnection rule for AR vs. EN |
| 02 | Selected Work | None (real imagery only, §16) | `color.bg.page` | Full-bleed project imagery on a neutral porcelain canvas so real product screenshots stay the dominant color story |
| 03 | What We Create | None (pure editorial typography, §18.8) | `color.bg.section.tinted` | Large numbered rows on the pale-blue tint; oversized-numeral device (§18.22) in `ink.muted` |
| 04 | Systems in Motion | Particle Intelligence (§14) | **`color.bg.section.dark`** (deliberate exception, §14) | The one dark, self-illuminating generative moment on the page — earns its drama precisely because it's rare |
| 05 | Engineering Behind the Experience | Digital Architecture, light blueprint texture (§15) | `color.bg.section.tinted` | Diagram is low-contrast/background-weight here; the full interactive version lives on service pages |
| 06 | From Vision to Reality | None (editorial timeline/list, direction-aware per §15's flow rule) | `color.bg.page` | Horizontal (desktop) / vertical (mobile) six-stage timeline on porcelain |
| 07 | Rakmyat Philosophy | None (large single-column editorial typography only) | `color.bg.page` | Quietest section on the page by design — a typographic pause, porcelain throughout, no tint needed |
| 08 | Final Conversion | None (clean CTA band) | **`color.bg.section.dark`** (deliberate exception) | A bold, confident deep-cobalt close — white headline, white primary CTA treatment inverted (cobalt button becomes white-fill/cobalt-text on this background, §18.4's on-dark variant) |

This table enforces §4's Principle 2 ("one signature moment per section, not five") and Principle 8 ("dark is the exception, not the default") simultaneously — exactly two of eight sections are dark, and neither is adjacent to the other, preserving good rhythm.

---

## 28. Asset Production Briefs & Inner Page Art Direction

### 28.1 Inner page art direction
- **Service detail pages:** one Digital Architecture diagram (§15, light blueprint) per page, full interactive version; otherwise editorial typography on `color.bg.page`/`color.bg.section.tinted` alternation, no 3D/particles.
- **Work/case study pages:** real imagery only (§16) on `color.bg.page`, no generative visual systems.
- **About/Process pages:** editorial typography-led, one small Digital Architecture-style diagram on Process only, nothing on About.
- **Contact page:** quietest page on the site — `color.bg.page` throughout, form + minimal supporting copy, no decorative visual system.

### 28.2 Asset production checklist

| Asset | Required for MVP? | Status |
|---|---|---|
| Signature 3D sculpture model (cobalt enamel/ceramic/metal/composite materials, studio lighting + cast shadow, EN composition + AR recomposition per §13) | ✅ Required | 🔴 Pending production — see VISUAL-ASSET-MATRIX.md §15 for migration-specific rebuild notes |
| Particle Intelligence system (dark-section build, §14) | ✅ Required | 🔴 Pending production |
| Digital Architecture diagram template (light blueprint rebuild) | ✅ Required | 🔴 Pending production |
| Custom icon set (§17) | ✅ Required | 🔴 Pending production |
| Final logo/wordmark | ✅ Required | 🔴 Pending — interim typographic lockup specified in §18.3 |
| Real/demo project screenshots for `/work` | ✅ Required (at least 1) | 🔴 Pending — see PRODUCT.md §23/§25 |
| OG share images (EN + AR) | ✅ Required | 🔴 Pending production |
| Favicon/app icons | ✅ Required | 🔴 Pending production |
| `/insights` article imagery | ❌ Phase 2 | N/A |

---

## 29. Portfolio Visual System

Governed by §18.9 (card component) and §16 (imagery rules) and PRODUCT.md §23 (classification system). Classification badge rendered in `type.en.technical-label`/Arabic equivalent on a `color.white.pure` pill (with `shadow.sm`) with a logical-start-edge color bar: `color.cobalt.signature` for Real Client Project, `color.ink.muted`-toned neutral for Internal Product, `color.state.warning`-toned for Concept/Demo, `color.border.interactive`-toned for Confidential Summary.

---

## 30. Responsive Design

Unchanged from the prior specification (breakpoints are palette-independent).

| Breakpoint | Grid | Key behavior change |
|---|---|---|
| 320–359px | 4-col, 16px margin | Smallest supported; hero headline drops to `display` mobile size; 3D sculpture mobile fallback only |
| 360–389px | 4-col | Standard small-phone baseline |
| 390–429px | 4-col | iOS standard baseline |
| 430–767px | 4-col, slightly looser line-length | Large-phone baseline |
| 768–1023px | 8-col, 32–40px margin | Nav may still collapse to drawer depending on item count |
| 1024–1279px | 8-col | Desktop nav appears; two-column layouts begin |
| 1280–1439px | 12-col, 48px margin | Full desktop composition |
| 1440–1919px | 12-col, 80px margin, 1440px content cap | Primary design target |
| 1920px+ | 12-col, content capped at 1440px | No layout stretches edge-to-edge beyond the cap except full-bleed imagery/3D |

No horizontal overflow at any breakpoint. Touch targets ≥44×44px below 1024px. Safe-area insets applied to the mobile nav drawer.

---

## 31. Mobile Arabic Experience

Unchanged mechanics from the prior specification — mobile Arabic is designed as its own composition, not a shrunk desktop-Arabic layout. Hero stacking, service-row wrapping, CTA full-width fallback, and label-above-field form behavior all carry forward unchanged; only the color tokens referenced within these rules changed (§18.22, §6.2/§7.3).

---

## 32. Accessibility

Target: WCAG 2.2 AA, both locales independently verified. Mechanics unchanged from the prior specification (§5.4 above carries the updated contrast values for this palette). Semantic HTML, keyboard operability, `lang`/`dir` attributes, screen-reader labels, `aria-live` form errors, non-visual equivalents for the 3D/particle systems, reduced-motion support, and bidirectional text isolation all carry forward unchanged in mechanism.

---

## 33. Performance Budgets

Unchanged from the prior specification — budgets are palette-independent.

| Resource | Budget | Note |
|---|---|---|
| JS (initial load, excluding 3D/particle chunks) | ≤180KB gzipped | Route-level code splitting |
| WebGL/3D payload (desktop hero only) | ≤1.5MB | Not loaded below 768px |
| Particle system payload (desktop only) | ≤400KB | Not loaded below 768px |
| Fonts (English, subset+variable) | ≤180KB combined, woff2 | Preloaded for above-the-fold weights only |
| Fonts (Arabic, subset+variable) | ≤120KB, woff2 | Loaded only on `/ar/*` routes |
| Hero image/video fallback (mobile) | ≤400KB | AVIF/WebP or compressed H.264 loop |
| Total page weight (mobile) | ≤1.2MB | |
| Third-party scripts | ≤1 analytics script | 🔴 analytics vendor not yet chosen |

---

## 34. Design Tokens

```css
:root {
  /* Color — Cobalt Blue & Porcelain */
  --color-bg-page: #F7F8FC;
  --color-bg-section-tinted: #EDF2FF;
  --color-bg-section-tinted-deep: #E5ECFF;
  --color-bg-section-dark: #1736B8;
  --color-surface-1: #FFFFFF;
  --color-surface-2: #FFFFFF;
  --color-border-hairline: #DCE3F1;
  --color-border-interactive: #6D82B8;
  --color-ink-primary: #111827;
  --color-ink-secondary: #475569;
  --color-ink-muted: #606C80;
  --color-cobalt-signature: #2453FF;
  --color-cobalt-dim: #6E8FFF;
  --color-cobalt-deep: #1736B8;
  --color-cobalt-glow-outer: rgba(36,83,255,0.08);
  --color-cobalt-glow-inner: rgba(36,83,255,0.18);
  --color-cta-primary-bg: #2453FF;
  --color-cta-primary-text: #FFFFFF;
  --color-state-success: #15803D;
  --color-state-warning: #B45309;
  --color-state-error: #DC2626;
  --color-state-focus: #2453FF;
  --color-overlay-scrim: rgba(17,24,39,0.5);
  --color-selection-bg: rgba(36,83,255,0.15);
  /* On-dark variants, used only inside the two deep-cobalt sections */
  --color-ink-on-dark: #FFFFFF;
  --color-ink-on-dark-secondary: #C7D2FE;
  --color-border-on-dark: rgba(255,255,255,0.18);
  --color-particle-core: #5B8DFF;
  --color-particle-dim: #2E3A5C;

  /* Spacing (8px base) — unchanged */
  --space-1: 4px;  --space-2: 8px;  --space-3: 16px; --space-4: 24px; --space-5: 32px;
  --space-6: 48px; --space-7: 64px; --space-8: 96px; --space-9: 128px; --space-10: 192px;

  /* Radius — unchanged */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;

  /* Borders */
  --border-hairline: 1px solid var(--color-border-hairline);
  --border-interactive: 1.5px solid var(--color-border-interactive);

  /* Shadows (light-theme: primary depth mechanism, replacing the old dark-theme glow-as-depth approach) */
  --shadow-sm: 0 2px 8px rgba(17,24,39,0.06);
  --shadow-md: 0 8px 24px rgba(17,24,39,0.10);
  --shadow-lg: 0 24px 64px rgba(17,24,39,0.16);

  /* Cobalt glow/tint (ambient color-bleed, not a dark-room glow) */
  --glow-outer: 0 0 80px var(--color-cobalt-glow-outer);
  --glow-inner: 0 0 24px var(--color-cobalt-glow-inner);

  /* Motion — unchanged */
  --motion-instant: 100ms; --motion-fast: 180ms; --motion-standard: 300ms;
  --motion-slow: 500ms; --motion-cinematic: 1000ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);

  /* Z-index — unchanged */
  --z-base: 0; --z-elevated: 10; --z-nav: 100; --z-drawer: 200; --z-modal: 300; --z-toast: 400;

  /* Breakpoints — unchanged */
  --bp-xs: 320px; --bp-sm: 390px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px; --bp-2xl: 1440px;

  /* Grid — unchanged */
  --container-max: 1440px;
  --gutter-desktop: 24px; --gutter-tablet: 20px; --gutter-mobile: 16px;
}

/* Logical-direction motion helper — unchanged mechanism */
:root { --dir: 1; }
[dir="rtl"] { --dir: -1; }
/* usage example: transform: translateX(calc(var(--dir) * 24px)); */
```

---

## 35. Asset Production Briefs

See §28.2 for the checklist and [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) §15 for the full per-asset migration audit (regenerate / adjust / no-change) against the new identity. Each line item requires a dedicated production brief (materials/lighting spec sheet for the 3D sculpture — now specifying cobalt enamel, polished ceramic, brushed metal, porcelain composite, translucent cobalt glass, and the studio-plus-cast-shadow lighting rig rather than the old dark-chrome/rim-light rig; particle system art-direction doc for the dark Systems-in-Motion build; icon grid spec) to be written at the start of the implementation phase.

---

## 36. Anti-Patterns

Explicitly forbidden — updated for Cobalt Blue & Porcelain:

- A dark-mode-only identity, or treating any section as dark by default rather than by the two deliberate exceptions in §27.
- Generic purple/pink AI-gradient backgrounds.
- Stock "glowing brain," circuit-board texture, or humanoid-robot imagery.
- Repetitive glassmorphism card grids as a default layout pattern.
- Three-card feature grids for the service pillars (§18.8's editorial Service Row replaces this).
- **Excessive cobalt fills** — cobalt used as a default background/surface color anywhere outside CTAs, active states, the sculpture, and the two deliberate dark sections (brief §8's explicit caution; this is the direct successor to the old "cyan stays restrained" rule).
- **Flat, textureless porcelain everywhere** — the light-mode equivalent of the old flat-navy problem; §5.5's surface treatments are mandatory, not optional polish.
- **Harsh, undifferentiated `ink.primary` applied to body copy** — reserved for headlines; body text uses `ink.secondary` (§5.4/§6.2).
- Scroll-hijacking of the native scrollbar/behavior (§24.5).
- Fabricated statistics, testimonials, logos, or certifications (PRODUCT.md §26/§29 — binding on visual design too).
- Mirroring the 3D sculpture or any brand mark naively between RTL/LTR (§13/§12.1).
- Treating Arabic as a translated, re-flowed copy of the English layout rather than its own composition (§31 and throughout §7–§13).
- Decorative 3D/particle effects on every section (§4 Principle 2, §27's one-system-per-section table).
- Placeholder Latin "lorem ipsum" or Latin dummy text used to mock up Arabic layouts.

---

## 37. Visual QA Checklist

- [ ] Cobalt accent area measured ≤10% of viewport at full saturation on every major section screenshot, except within the two deliberate dark sections where cobalt is the dominant background by design.
- [ ] No two consecutive homepage sections use the same signature visual system (§27 table).
- [ ] Deep-cobalt dark sections total exactly 2 of 8 homepage sections, not more (§4 Principle 8, §27).
- [ ] All text contrast pairs verified against §5.4 minimums in both locales, on every light background they actually render against (page/tinted/white), not assumed from a single pairing.
- [ ] Logo never appears mirrored in any RTL screenshot.
- [ ] Every button's Arabic label fits without truncation at 320px width.
- [ ] Every image is real content or a produced signature-system asset — zero stock photography present.
- [ ] Porcelain-first confirmed: light sections are the clear majority on every page; no page defaults to a dark background outside the two approved homepage exceptions.
- [ ] Every section carries at least one of §5.5's surface treatments — no flat, textureless porcelain block larger than one viewport.

---

## 38. RTL QA Checklist

- [ ] `<html dir="rtl" lang="ar">` present on every `/ar/*` route.
- [ ] Nav, CTA, language switcher, breadcrumbs, footer columns all resolve to correct logical positions with zero component-specific left/right CSS overrides.
- [ ] Directional icons mirror; non-directional icons do not (§12.1).
- [ ] Digital Architecture diagram flow direction (§15) reads right-to-left in Arabic.
- [ ] Particle Intelligence stage transitions (§14) are visually identical in Arabic and English — confirmed NOT mirrored.
- [ ] 3D sculpture composition recomposed (not mirrored) per §13, with cast-shadow/reflection direction re-verified against the Arabic headline position.
- [ ] Mixed Arabic/English strings render LTR-isolated with no reversed character order.
- [ ] Mobile drawer opens from the correct (left) edge in RTL.
- [ ] Arabic type scale (§7.2) used throughout.
- [ ] Arabic buttons/labels tested for wrap/overflow at 320px per §31.

---

## 39. LTR QA Checklist

- [ ] `<html dir="ltr" lang="en">` present on every `/en/*` route.
- [ ] Nav, CTA, language switcher, breadcrumbs, footer columns resolve correctly in standard Western order.
- [ ] Directional icons point the expected standard LTR direction.
- [ ] Digital Architecture diagram flow reads left-to-right.
- [ ] English type scale (§6.1) used throughout.
- [ ] Hero composition matches §13's LTR description (headline inline-start/left, sculpture inline-end/right, shadow/reflection grounding verified).
- [ ] No leftover logical-property bugs that only manifest in one direction.

---

## 40. Design Acceptance Criteria

This documentation is complete when:
- [x] Every token category required by the brief has concrete values in §34, rebuilt for Cobalt Blue & Porcelain.
- [x] Every signature visual system (§13–§15) has shape/material/lighting/composition/animation/mobile-fallback/accessibility/performance specified, plus an explicit RTL vs. LTR composition rule, for the new palette.
- [x] Every major component (§18) has purpose, anatomy, states, responsive behavior, and RTL/LTR behavior specified against the new tokens.
- [x] Motion system defines concrete duration/easing/distance values (§24) and an explicit RTL-mirrors-or-not rule per motion type (§25) — unchanged, confirmed still correct under the new palette.
- [x] Arabic typography is a fully independent scale (§7), unaffected by the palette migration.
- [x] Anti-patterns list (§36) directly answers the new identity's originality-review questions, including the brief's explicit "avoid excessive blue fills" caution.
- [x] Service names, CTA copy, and section names match PRODUCT.md verbatim.

Implementation-phase acceptance criteria: visual QA (§37), RTL QA (§38), and LTR QA (§39) checklists all pass on real rendered pages before launch; performance budgets (§33) measured on real devices.

---

## 41. Implementation Handoff & Cross-Document Consistency

**Cross-reference table (binding):**

| Shared element | PRODUCT.md location | DESIGN.md location |
|---|---|---|
| Service pillar names (3) | §8 | §27 table, §18.8 |
| Primary/secondary CTA copy (both locales) | §9.2–§9.3, §12.2, §17, §20 | §18.4–§18.5 |
| Route inventory | §16 | §30 breakpoints apply to all listed routes |
| Homepage 8 sections | §17 | §27 |
| Default-locale/routing policy | §14 | §11/§12 |
| Portfolio classification system | §23.1 | §29, §18.9 |
| Color palette | (not specified — visual-only) | §5 (Cobalt Blue & Porcelain, migrated from Navy/Cyan/Obsidian) |
| Typography | (content/length constraints only, §12) | §6–§8 (families/scale unchanged; color application updated §6.2/§7.3) |
| Accessibility target (WCAG 2.2 AA) | §30 | §32 |
| Performance targets | §31 | §33 |
| Missing business inputs | §34 | §28.2 |

**Build order recommendation:** tokens (§34) → global shell with locale-aware `<html dir/lang>` + nav/footer (§18.1–§18.2, §18.18, §20) → homepage (§27) → service pages (§28.1) → work/portfolio (§29) → about/process/contact/privacy (§28.1) → 404 (§18.21). Every component's first implementation pass includes its RTL variant from commit one.

**Confirmation:** no website code, components, pages, or assets were generated in the production of this document.

---

## 42. Visual Hardening Addendum — Phase 03

Added during the Phase 03 audit pass; all references below are unaffected by the Phase 03B palette migration — the asset-generation authorization, interim fallback standard, and authenticity carve-out are process rules, not color rules. Cross-reference: [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md), [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md), [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md) (historical — references the prior dark palette; see its superseded-notice banner), PAGE-BLUEPRINTS.md §31, TECHNICAL-ARCHITECTURE.md §35–§36, CMS-SCHEMAS.md §9.1.

### 42.1 Asset Generation Authorization

Every asset in §28.2's production checklist may be produced by an implementation agent using original generation methods, within the exact art-direction constraints locked in §13–§17 (now the Cobalt Blue & Porcelain versions of those constraints):

| Method | Use for |
|---|---|
| Procedural 3D construction (Three.js/R3F geometry, materials, lighting built in code) | Signature Sculptural 3D (§13) — now specifying cobalt-enamel/ceramic/metal/composite materials and a studio-plus-cast-shadow lighting rig |
| Procedural/shader-driven particle systems | Particle Intelligence (§14), built against the dark `color.bg.section.dark` backdrop |
| Custom SVG, hand-constructed or code-generated | Digital Architecture diagrams (§15, now a light blueprint aesthetic), icon set (§17), process timeline |
| AI-generated imagery | Abstract/editorial background textures, conceptual imagery explicitly labeled as such — never real client work, logos, team photos, or testimonials |
| CSS/data-URI construction | Surface treatments (§5.5's gradient/noise/vignette/cast-shadow), the oversized-numeral device (§18.22) |

### 42.2 Interim Fallback Standard

Until a final, owner-reviewed asset exists for a given slot in §28.2, the slot is filled with a procedurally-generated or custom SVG/CSS placeholder meeting the same art-direction bar as a finished asset (§13–§17's Cobalt Blue & Porcelain rules) — never a blank `div`, a generic stock icon, or an unrelated stand-in.

### 42.3 Authenticity Carve-Out (restated, binding)

Generation authorization under §42.1 never extends to: real client projects, client logos, team photographs presented as real people, client testimonials, project screenshots presented as authentic deliverables, or performance/business metrics. Conceptual/generated imagery is allowed only when internally tagged as such (CMS-SCHEMAS.md §9.1's `provenance`/`conceptualOnly` fields).

---

## 43. Phase 03B Migration Note

This file now reflects the Cobalt Blue & Porcelain identity in full; it is the current, authoritative visual specification. Nothing in §1–§42 above should be read as "formerly dark" or "pending migration" — the migration is complete in this document. Historical record of *why* each specific change was made, the full old→new token mapping, and the section-by-section rationale live in [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md), per the instruction to preserve audit history rather than erase it — that history belongs in the migration report, not scattered as inline caveats throughout the living design spec.
