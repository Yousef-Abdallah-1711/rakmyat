# RAKMYAT — DESIGNER.md

> **AI Visual Identity & Creative Production System**
> Version 1.0 · 2026-10-14 · Applies to social media, advertising, presentations, thumbnails, and brand visuals
> **Scope:** Visual asset production. This file complements, but does not replace, the website's `DESIGN.md`, `PRODUCT.md`, or technical specifications.

## 1. Mission & creative intention

RAKMYAT (رقميات) is a premium software engineering and AI automation brand. Its creative work must make sophisticated technology feel **tangible, engineered, confident, and approachable**. Design for the impression of a capable creative technology partner, not a generic AI tools page.

**Creative signature:** *Premium 3D Tech Editorial* — oversized editorial type, bright porcelain paper-like environments, luminous cobalt technical objects, sophisticated geometric glass/chrome materials, meticulously arranged diagrams, and a clear story at first glance.

**Personality:** bold, precise, modern, ambitious, intelligent, premium, trustworthy.
**Avoid:** generic SaaS dashboard art, neon cyberpunk, dark sci-fi, chaotic infographics, random floating icons, stock photography, excessive gradients, visual clutter, and tiny unreadable text.

## 2. Reference artwork and authority

The four owner-supplied images are **visual references**, not an interchangeable logo asset pack. Store approved reference copies in `brand/references/` (suggested names below) and approved source artwork in `brand/assets/`. This Markdown file alone cannot preserve exact image pixels.

| Reference | Suggested local name | What to learn from it |
|---|---|---|
| Arabic AI website-build poster | `ref-01-ai-build-poster.png` | Oversized Arabic headline, cobalt marker strokes, layered paper/wireframes, central computer and technical pipeline, high contrast |
| Arabic Rakmyat services poster | `ref-02-services-poster.png` | Bilingual logo, split hero, coherent 3D tech props, service hierarchy, cobalt CTA, porcelain backdrop |
| Wide English Rakmyat brand hero | `ref-03-english-hero.png` | Editorial headline, faceted R sculpture, premium material realism, soft studio shadows, controlled floating accents |
| Circular Rakmyat emblem | `ref-04-logo-emblem.png` | Faceted cobalt/silver R, bilingual lockup, luminous glass/metal aesthetic |

**Logo authority:** These references illustrate the approved *direction*. Do not treat an AI-rendered raster logo as a mathematically accurate master. Before exact brand production, the owner must approve a clean vector master (`SVG`/`PDF`) and the official Arabic and English wordmarks. Until then, preserve the geometry shown in the supplied references rather than inventing a different R.

## 3. Core palette

| Role | Hex | Usage |
|---|---|---|
| Signature Cobalt | `#2453FF` | Main accent, arrows, underlines, chips, CTA |
| Deep Cobalt | `#1736B8` | Depth, select dark surfaces, strong blue accents |
| Porcelain | `#F7F8FC` | Default bright background |
| Pure White | `#FFFFFF` | Clean highlight surfaces |
| Soft Blue | `#EDF2FF` | Tonal background and atmospheric separation |
| Pale Blue | `#E5ECFF` | Subtle panels, gradients and lighting spill |
| Primary Ink | `#111827` | Main text and strong hierarchy |
| Secondary Ink | `#475569` | Supporting copy |
| Hairline | `#DCE3F1` | Subtle boundaries |
| Interactive Border | `#6D82B8` | Form and interactive boundaries where needed; verified at 3.39:1 minimum on approved light surfaces |

**Render-only lighting colors:** saturated electric blues, ice-blue specular reflections and near-white highlights may appear as lighting/material effects; they are **not additional brand UI tokens**. Prefer natural falloff over broad flat gradients.

**Color distribution guidance (not an exact mathematical rule):** 65–80% porcelain/white, 10–25% ink/text, 5–15% cobalt accents; individual 3D hero objects may occupy more saturated blue area without turning the entire composition blue. Ensure the headline wins over glow effects.

## 4. Typography and language

- **Arabic:** IBM Plex Sans Arabic as the project default. Use approved heavier weights for headlines. If unavailable in a rendering environment, use a tested Arabic sans fallback with comparable proportions; do not substitute a decorative calligraphic face.
- **English display:** Space Grotesk.
- **English body:** Inter.
- **Technical labels:** IBM Plex Mono, used sparingly.
- **Arabic headlines:** bold or extra-bold, short, high-contrast, optically spaced, correct Arabic shaping, right-to-left reading order.
- **English:** assertive editorial typography with restrained tracking; uppercase only for short labels, not body paragraphs.
- **Bilingual:** maintain distinct language blocks. Do not reverse Latin words, numbers, code, URLs, or logos. Never apply letter spacing to Arabic.

### Type hierarchy for social graphics

1. **Hero hook:** the first and largest reading element; ideally 4–10 Arabic words across 1–3 intentional lines.
2. **Emphasis word:** one high-value phrase in cobalt, or an AI/code token where context demands it.
3. **Visual centerpiece:** large 3D object or clear diagram that reinforces the hook.
4. **Supporting proof:** concise explanatory line, service labels, or 3 concise benefit points.
5. **CTA / website:** clear but subordinate to the headline.
6. **Brand signature:** logo and brand name legible, never competing with the hook.

**No fake readability:** inspect all Arabic words individually after generation; AI image rendering can produce spelling and glyph errors. When accuracy is critical, render background/3D art separately and typeset copy in Figma, Illustrator, Canva, or another real layout editor.

## 5. Logo and brand mark

**Primary symbol:** angular faceted letter **R**, assembled from sharp planar surfaces, visually blue/cobalt on one side and silver/porcelain chrome on another, with a cut-through negative space and a grounded 3D stance.

**Lockups:**
- Horizontal bilingual: R symbol + `RAKMYAT` + `رقميات`.
- Emblem: R symbol with bilingual name, centered in a generous circular or square safe area.
- Symbol-only: approved R geometry, for small badges/avatars when legible.

**Rules:** preserve geometry and orientation, aspect ratio, and wordmark spelling; use clear space of at least 0.5× the symbol width around a standalone logo where possible. Avoid overprinting on busy art. Do not stretch, skew, recolor arbitrarily, add an unrelated sparkle, or recreate a new R for every post. A 3D R sculpture may be used as an illustration, but must not silently replace the master logo.

**Pending approval:** definitive vector master, exact lockup proportions, minimum sizes, and official logo variants. Do not claim these are locked from raster references alone.

## 6. 3D materials, lighting and rendering

**Materials:**
- Faceted cobalt translucent glass with controlled refraction
- Metallic silver/chrome with realistic reflections
- Smooth white ceramic and frosted acrylic
- Premium glossy cobalt enamel
- Subtle blue-edge light and physically plausible soft contact shadows

**Lighting:** high-key studio environment, broad softbox key light, restrained cool-blue rim, visible ambient occlusion, real contact shadows. Avoid blown-out whites, unreadable reflections, over-glowing blue objects, or plastic-looking chrome.

**Object vocabulary:** architectural R sculpture, modular browser frames, engineered app interfaces, cloud/integration nodes, server stacks, database cylinders, thin orbital curves, coded symbols, process arrows, editorial blueprint paper. Every object must tell the same story as the headline.

**Depth:** one dominant foreground hero object, supporting midground technical props, a quiet background. Soft depth of field may apply to minor foreground ornaments, **never** to headline, CTA or important diagram nodes.

## 7. Composition and template hierarchy

**General formula:** strong hook → one hero concept → optional explanation → CTA → logo/URL. Use negative space to establish premium hierarchy. Do not fill every corner.

### Template A — Educational / viral vertical poster
- Format: 4:5 or 9:16 depending on placement.
- Top 30–40%: huge Arabic hook and one cobalt emphasized term.
- Middle 35–45%: one layered 3D technical story/diagram.
- Bottom 15–25%: 3–4 short process steps, small brand signature or CTA.
- Signature treatment: pale blue marker underline, paper/blueprint surfaces, cobalt arrows, restrained handwritten English micro-notes.
- Use when teaching workflows such as PLAN → BUILD → TEST → ITERATE.

### Template B — Corporate services announcement
- Format: 4:5 feed.
- Top: logo/brand and concise positioning.
- Upper-middle: oversized Arabic value proposition + supporting 3D laptop/R object.
- Middle/lower: three services in readable modules; not every post must use cards.
- Bottom: high-contrast CTA and `rakmyat.online` **only if confirmed as the approved publishing URL**.
- Prefer concise service descriptions over long bullet lists.

### Template C — Premium English brand hero
- Format: 16:9 or wide banner.
- Left: compact brand lockup, two-line editorial headline, short capabilities line and restrained CTA.
- Right: monumental faceted 3D R sculpture, grounded on a pale stage.
- Supporting UI/AI/integration motifs orbit around the sculpture but never obscure it.
- Use white/porcelain backgrounds and cobalt emphasis on one part of the headline.

### Template D — Minimal brand avatar / logo cover
- Format: 1:1.
- Center: approved R sculpture or logo master.
- Below: bilingual brand name if readable.
- Background: white/porcelain with a delicate blue border or light halo.
- No CTA, service lists, or unrelated decorations.

### Template E — Case study / results visual
- Format: 4:5 or 16:9.
- Lead with the real project or outcome; use a large product visualization and 1–3 verified facts.
- No fabricated client names, performance claims, testimonials, or dashboards.
- Brand mark stays secondary to the case study.

## 8. Output sizes and safe areas

- Instagram/Facebook feed portrait: **1080 × 1350 (4:5)**.
- Square post/avatar: **1080 × 1080 (1:1)**.
- Reel/Story cover: **1080 × 1920 (9:16)**, keep essential text out of top/bottom UI overlays and allow extra central-safe margins.
- Wide website/social hero: **1920 × 1080 (16:9)** or the channel's actual approved dimensions.

Recommended initial margins: 6–8% outer padding for feed posters; increase if type is oversized. Check each channel's current crop behavior before publishing. Keep important logo, headline and CTA in the safe area.

## 9. Social creative is NOT website UI

The social system can be bolder, denser, more cinematic and poster-like than the site, but must retain brand DNA. The website uses editorial sections and deliberate scroll motion; a social post needs a strong single-frame hook. Do not reproduce a website landing page as a social image, and do not turn every social post into a three-column service-card layout.

For website implementation, **`DESIGN.md` and `PAGE-BLUEPRINTS.md` remain authoritative** for grids, sections, tokens, motion, and interaction. This file governs exported marketing artwork and related brand visuals.

## 10. Content system

**Approved service pillars:**
1. `تطوير البرمجيات المخصصة` — Custom Software Development
2. `أنظمة المؤسسات والتكاملات` — Enterprise Solutions & Integrations
3. `وكلاء الذكاء الاصطناعي والأتمتة` — AI Agents & Automation

**Brand names:** `RAKMYAT` and `رقميات`.

**Headline examples:**
- `بنحوّل أفكارك لأنظمة رقمية متكاملة`
- `بناء موقع كامل بالـ AI بالطريقة الصحيحة`
- `We Engineer the Extraordinary`

Treat examples as approved creative direction, not mandatory copy on every design. Copy must be supplied or approved per asset. Do not fabricate numbers, client names, awards, credentials or outcomes.

**URL:** `rakmyat.online` appears in supplied visuals, while the website's production canonical domain has been marked an owner decision. Confirm the publishing URL before printing it on final artwork. Do not silently substitute `rakmyat.com`.

## 11. Visual consistency rules

**Always:**
- Establish a single primary visual story.
- Use cobalt and porcelain as the dominant visual language.
- Use premium, physically credible materials.
- Keep Arabic copy properly shaped and readable.
- Use the same approved R geometry and wordmarks.
- Give text intentional breathing room.
- Keep supporting icons stylistically consistent.
- Use arrows/blueprint marks only where they clarify meaning.
- Preserve high contrast and sensible reading order.

**Never:**
- Change the logo geometry from post to post.
- Introduce purple/pink cyberpunk palettes.
- Cover the image with tiny text or excessive badges.
- Create random unrelated AI robots in every design.
- Use glowing borders around every object.
- Reuse the exact same composition for unrelated subjects.
- Publish misspelled Arabic or synthetic illegible UI labels.
- Treat an AI-generated mockup as an editable brand master.

## 12. Reusable AI art-direction prompt

> Create a premium **RAKMYAT / رقميات** social media design using the attached approved brand references and `DESIGNER.md`. Maintain the same faceted cobalt-and-silver R identity, porcelain-white high-key studio environment, deep navy typography, electric cobalt accents, physically realistic translucent glass/chrome/ceramic 3D materials, soft contact shadows, precise editorial hierarchy, and subtle blueprint/process details. This must look like an expertly art-directed **social media poster**, not a website screenshot, SaaS template or generic infographic. Make one strong visual idea dominate. Preserve intentional negative space and legible Arabic RTL typography. Use the exact provided copy without inventing words. Output in [FORMAT], for [PLATFORM], with [HEADLINE], [SECONDARY COPY], [CTA], and [MAIN VISUAL STORY]. Use the approved master logo as a placed asset, not a regenerated approximation. If exact Arabic typesetting cannot be guaranteed, generate the art without embedded text and provide a separate typography/layout specification.

### Brief variables required for each new asset

| Variable | Example |
|---|---|
| `PLATFORM` | Instagram feed |
| `FORMAT` | 1080 × 1350 |
| `OBJECTIVE` | Introduce services |
| `AUDIENCE` | Founders and SMEs |
| `HEADLINE` | بنحوّل أفكارك لأنظمة رقمية متكاملة |
| `SECONDARY COPY` | Custom Software / Enterprise Systems / AI Agents |
| `MAIN VISUAL STORY` | 3D faceted R surrounded by modular app and integration objects |
| `CTA` | ابدأ مشروعك مع رقميات |
| `LOGO FILE` | Path to approved transparent SVG/PNG |
| `PUBLISHING URL` | Owner-approved URL, if applicable |

## 13. Reusable negative prompt / rejection criteria

> No generic SaaS hero, no stock-photo humans, no dark cyberpunk, no purple gradients, no random futuristic city, no AI-generated fake logo, no distorted Arabic, no meaningless microtext, no repeated card grid unless explicitly requested, no overwhelming glow, no cartoon robot unless the concept requires one, no clutter, no unrealistic fake client metrics, no cropped CTA, no illegible UI, no excessive tiny icons.

## 14. Production workflow

1. **Read** `DESIGNER.md`, the current creative brief and the supplied visual references.
2. **Identify** the intended platform, dimensions, audience, goal, headline and CTA.
3. **Choose** one appropriate template; avoid repeating layouts mechanically.
4. **Storyboard** the visual hierarchy in words before generation.
5. **Generate** one high-quality visual direction, maintaining the approved palette/materials.
6. **Typeset** final Arabic and logo with reliable layout tools where pixel accuracy matters.
7. **Review** spelling, logo integrity, composition, color, legibility, cropping and brand fit.
8. **Export** a platform-ready PNG/JPG and retain the editable source where available.
9. **Archive** the final image and its brief/prompt for reproducibility.

## 15. Quality assurance checklist

- [ ] Correct R logo geometry and bilingual brand spelling
- [ ] Approved cobalt/porcelain/ink color family
- [ ] Headline legible at phone thumbnail size
- [ ] Arabic letters correctly shaped, words correctly spelled, punctuation appropriate
- [ ] One clear hero focal point, no competing focal objects
- [ ] Technical 3D objects tell a coherent story
- [ ] Physically credible glass/metal/ceramic and grounding shadows
- [ ] Adequate negative space and clear hierarchy
- [ ] No excessive generic cards, tiny text or clutter
- [ ] Correct platform aspect ratio and safe margins
- [ ] CTA clear and correct when required
- [ ] URL confirmed before publishing
- [ ] No fabricated social proof or business claims
- [ ] Readable contrast for all essential text
- [ ] Final export inspected at full size and mobile size

## 16. Project storage recommendation

```text
rakmyat-brand/
├── DESIGNER.md
├── references/
│   ├── ref-01-ai-build-poster.png
│   ├── ref-02-services-poster.png
│   ├── ref-03-english-hero.png
│   └── ref-04-logo-emblem.png
├── assets/
│   ├── logo-master.svg           # pending owner-approved vector
│   ├── logo-horizontal.svg       # pending owner-approved vector
│   └── logo-symbol.svg           # pending owner-approved vector
├── briefs/
├── prompts/
├── editable/
└── exports/
```

**Important:** The reference images are not interchangeable with an official vector logo. Keep their provenance and do not silently redraw the brand mark.

## 17. Ownership and updates

Update this file only after an approved identity decision or a documented repeatable design improvement. When changing a palette, logo geometry, typography or core visual system, obtain owner approval and synchronize affected website/brand documentation. Individual campaign experiments may vary composition and narrative without changing the identity.
