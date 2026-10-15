# RAKMYAT — PAGE-BLUEPRINTS.md
### Phase 02 — Locked Page & Section Implementation Specification

**Status:** Documentation only. No pages, components, or CSS were created.
**Companion documents:** [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md)
**Method note (transparency on template application):** every section below uses the exact 29-field template from the Phase 02 prompt §19, two-column form (`Field | Specification`). For the three Service Detail pages, the prompt's own instruction (§21) states they "share one engineering template" — so the full 29-field table is given once in full under **8. Custom Software Service**, and the Enterprise Solutions / AI Agents & Automation pages (§9–§10) give the same structural template with only their content deltas filled in, cross-referencing §8 for every field that is identical by design (layout, libraries, motion, accessibility, responsive behavior). This is stated explicitly here rather than silently tripling 29 identical rows, and is itself a documentation-mechanics decision within this document's authorized discretion (prompt §1), not a content/design decision. No field is skipped for any section; where a value is not yet knowable (missing business input), the cell states **SPECIFICATION GAP — OWNER APPROVAL REQUIRED** or cites the exact PRODUCT.md §34 row, never a fabricated placeholder.

---

## 1. Experience Principles

Restated from DESIGN.md §4 as the binding check against which every section below was authored: typography-led, one signature visual moment per section, cobalt ≤10% of viewport, generous negative space, RTL and LTR both designed as first drafts (never "English then mirrored"), motion always meaningful, every cinematic device has a static/reduced-motion fallback, and dark is the exception (exactly two homepage sections) rather than the default. Any section specification that would violate one of these eight principles is a defect in this document, not an acceptable implementation choice — flagged in §29 Acceptance Criteria.

---

## 2. Global Design Tokens

Not restated in full here (would duplicate DESIGN.md §34 verbatim) — this document's every "Typography," "Spacing," "Background" row below references the exact token names defined in DESIGN.md §5–§9/§34 (e.g. `color.bg.section.tinted`, `type.en.h2`, `space.7`). Implementers should treat DESIGN.md §34's CSS custom-property block as the literal source values; this file only states *which* token applies *where*. **Phase 03B note:** background token names below were updated to the Cobalt Blue & Porcelain palette (DESIGN.md §5) — `color.bg.page` is now the porcelain default, `color.bg.section.tinted` is the alternating pale-blue tone, and `color.bg.section.dark` is reserved for exactly the two deliberate deep-cobalt sections named in DESIGN.md §27 (HOME-04, HOME-08).

---

## 3. Component Registry

Cross-reference to DESIGN.md §18's 21 component specifications (§18.1–§18.21) — every "Components" row below names a component by its DESIGN.md subsection number (e.g. "DESIGN.md §18.4 Primary Button") rather than re-describing the component's anatomy, per the no-duplication convention DESIGN.md itself established for §19/§21–§23.

---

## 4. Header Specification

| Field | Specification |
|---|---|
| Section ID | GLOBAL-HEADER |
| Page | All routes (persistent) |
| Section name | Global Header / Navigation |
| Business purpose | Persistent wayfinding + always-available primary conversion path (PRODUCT.md §20 CTA hierarchy) |
| Visual direction | DESIGN.md §18.1 — transparent over the porcelain hero, resolving to a white (`color.white.pure`) scroll-solid state with a `color.border.hairline` bottom divider; `color.ink.secondary` nav text (`color.ink.primary` on the active route); `color.cobalt.signature` CTA and active-route underline; no pill container, no floating glass navbar (Phase 03B Cobalt & Porcelain direction) |
| Desktop layout | 88px height; logo inline-start, nav items per DESIGN.md §11 order, language switcher + primary CTA in utility cluster inline-end |
| Tablet layout | Same 88px→72px height step at 1024px per DESIGN.md §18.1; nav items retained if they fit, else collapse to drawer at the content-density threshold observed during implementation |
| Mobile layout | 72px height; logo + language switcher + hamburger only (DESIGN.md §18.2) |
| Background | Transparent over the porcelain hero; resolves to `color.white.pure` at 92% opacity + 12px backdrop-blur + `color.border.hairline` bottom edge after 40px scroll (DESIGN.md §18.1) |
| Typography | `type.en.nav` / `type.ar.nav` (DESIGN.md §6.1/§7.2) |
| Spacing | `space.4` horizontal padding mobile, `space.5`–`space.6` desktop (DESIGN.md §9.4) |
| Components | DESIGN.md §18.1 Header, §18.2 Mobile Drawer, §18.3 Logo, §20 Language Switcher, §18.4 Primary Button |
| Styling | Tailwind utilities + CSS Module for the scroll-state backdrop-blur transition (TECHNICAL-ARCHITECTURE.md §14) |
| Libraries | None beyond React/Tailwind for the bar itself; GSAP only for the scroll-state background transition (short, CSS-eligible — implementation may choose plain CSS transition instead, see Animation row) |
| Animation | Background opacity/blur transition on scroll, `motion.fast`/`ease.standard` (DESIGN.md §24.1–§24.2) — CSS transition, not GSAP, per TECHNICAL-ARCHITECTURE.md §24.4's "CSS-only" bucket |
| Interaction | Nav-item hover underline (DESIGN.md §18.1), drawer open/close (DESIGN.md §18.2), focus-visible ring on every interactive child |
| RTL | DESIGN.md §11 — logo/CTA/switcher at logical start/end, drawer enters from left edge |
| LTR | DESIGN.md §12 — standard Western order, drawer enters from right edge |
| CMS source | `navigation` global, `site-settings` global (logo reference) |
| CMS fields | `navigation.items[]`, `navigation.primaryCta`, `site-settings` logo asset (CMS-SCHEMAS.md §14) |
| Media | Logo asset (interim typographic lockup per DESIGN.md §18.3 pending final logo, PRODUCT.md §34) |
| SEO | `<nav>` semantic landmark, no heading inside header competing with page `<h1>` |
| Accessibility | Full keyboard operability, focus trap in open drawer, `Esc` closes drawer, `aria-label` on hamburger/language-switcher icon buttons (DESIGN.md §32) |
| Performance | Header renders server-side immediately; no client JS required for initial paint, drawer/scroll-state logic hydrates progressively |
| Analytics | `nav_cta_click`, `language_switch` (PRODUCT.md §29) |
| Empty state | N/A — always populated from the `navigation` global, which has a locked 5-item set at MVP (CMS-SCHEMAS.md §14) |
| Error state | If `navigation` global fails to load, render the hard-coded five-item fallback matching the locked set (defensive default, never a broken/empty header) |
| Acceptance criteria | Header renders identically in structure across all MVP routes; drawer passes keyboard-only navigation test; zero horizontal overflow at 320px; RTL/LTR QA checklist items for header pass (DESIGN.md §38/§39) |
| Source reference | DESIGN.md §18.1–§18.2, §11–§12, §20; PRODUCT.md §15, §20, §29 |

---

## 5. Footer Specification

| Field | Specification |
|---|---|
| Section ID | GLOBAL-FOOTER |
| Page | All routes (persistent) |
| Section name | Global Footer |
| Business purpose | Secondary navigation, legal compliance link, repeated locale choice, brand close |
| Visual direction | DESIGN.md §18.18 — four logical columns, no decorative visual system |
| Desktop layout | Four-column grid (brand/mission · navigation · services · contact/legal) within the 12-col grid |
| Tablet layout | Two-column reflow (brand+nav / services+contact) |
| Mobile layout | Single-column stack, accordion-free simple list order |
| Background | `color.bg.page` or `color.bg.section.tinted` (implementation choice within DESIGN.md §5 palette, not independently specified by DESIGN.md — SPECIFICATION GAP: exact footer background token not explicitly pinned in DESIGN.md; default to `color.bg.page` with a `color.border.hairline` top edge for the quietest possible close, consistent with Principle 2's "signature moments are rare," flag for design sign-off at implementation) |
| Typography | `type.en.body-sm`/`type.ar.body-sm` for links, `type.en.caption` for copyright line |
| Spacing | `space.7` vertical padding top, `space.5` column gaps (DESIGN.md §9.4) |
| Components | DESIGN.md §18.18 Footer, §20 Language Switcher (repeated), §18.6 Text Link |
| Styling | Tailwind + logical-property flex/grid (DESIGN.md §9.5) |
| Libraries | None — static content, no motion |
| Animation | None (DESIGN.md §27 confirms no homepage section after hero reuses heavy motion; footer is motion-free by the same "quiet close" logic) |
| Interaction | Standard link hover/focus states (DESIGN.md §18.6) |
| RTL | Columns reorder via DOM order + logical flex-direction (DESIGN.md §18.18) |
| LTR | Standard column order |
| CMS source | `footer` global |
| CMS fields | `footer.missionOneLiner`, `navigationLinks[]`, `serviceLinks[]`, `contactLinks[]`, `legalLinks[]`, `copyrightText` (CMS-SCHEMAS.md §15) |
| Media | None |
| SEO | `<footer>` landmark; `/privacy` link present on every page for crawlability |
| Accessibility | Keyboard-operable links, sufficient contrast for `color.ink.muted` copyright line (DESIGN.md §5.4) |
| Performance | Fully server-rendered, zero client JS |
| Analytics | `language_switch` (if used from this instance) |
| Empty state | `contactLinks` renders nothing (not a broken-looking empty row) until PRODUCT.md §34's contact-details input is resolved |
| Error state | If `footer` global fails to load, render a minimal fallback (`copyrightText` + `/privacy` link only) |
| Acceptance criteria | No horizontal overflow at 320px; all links keyboard-reachable; RTL column order verified in QA (DESIGN.md §38) |
| Source reference | DESIGN.md §18.18; PRODUCT.md §34 |

---

## 6. Homepage — All 8 Sections

### 6.1 HOME-01 — The Statement Hero

| Field | Specification |
|---|---|
| Section ID | HOME-01 |
| Page | `/` (homepage) |
| Section name | The Statement Hero |
| Business purpose | Immediate brand/visual impact + primary conversion entry point (PRODUCT.md §17.1) |
| Visual direction | DESIGN.md §13 Signature Sculptural 3D + §27 row 01 |
| Desktop layout | Full viewport height; headline inline-start, sculpture inline-end, 35–45% viewport width (DESIGN.md §13) |
| Tablet layout | Reduced sculpture scale, headline retains dominance (Phase-02 prompt §11) |
| Mobile layout | Headline + both CTAs stacked above static sculpture fallback image (DESIGN.md §31); WebGL not loaded below 768px |
| Background | `color.bg.page` (porcelain) with a soft cast shadow + anchored `color.cobalt.glow.outer` color-bleed behind the sculpture (DESIGN.md §27 row 01, §13.1) |
| Typography | `type.en.hero-h1`/`type.ar.hero-h1` headline, `type.en.body-lg`/`type.ar.body-lg` subhead |
| Spacing | `space.9`–`space.10` section padding (DESIGN.md §9.4) |
| Components | DESIGN.md §18.4 Primary Button, §18.5 Secondary Button, hero text block, 3D canvas wrapper |
| Styling | Tailwind + CSS Module for hero-specific composition (asymmetric split not a reusable utility pattern) |
| Libraries | React Three Fiber + Drei (desktop only, dynamically imported) + GSAP (`@gsap/react`) for entrance stagger |
| Animation | Per-line staggered entrance (80ms stagger, `motion.cinematic`/`ease.cinematic`, DESIGN.md §24.3); sculpture idle rotation ≤4° (20–30s loop); pointer parallax ≤8° desktop only |
| Interaction | Pointer-move parallax (desktop); both CTAs interactive from first paint regardless of entrance animation state (DESIGN.md §24.5) |
| RTL | Sculpture recomposed (not mirrored) to opposite side with re-aimed light rig; headline moves to inline-start/right (DESIGN.md §13's directional composition rule) |
| LTR | Headline left, sculpture right (DESIGN.md §13) |
| CMS source | `homepage` global → `hero` field group |
| CMS fields | `headline`, `subheadline`, `primaryCtaLabel`/`Href`, `secondaryCtaLabel`/`Href`, `sculptureAsset`, `sculptureFallback`, `heroAccessibilityDescription` (CMS-SCHEMAS.md §11) |
| Media | Sculpture 3D asset bundle + mobile static/video fallback (DESIGN.md §28.2 — 🔴 pending production) |
| SEO | Page `<h1>` lives here; no competing `<h1>` elsewhere on the homepage |
| Accessibility | `heroAccessibilityDescription` provides non-visual equivalent of the 3D scene; CTAs keyboard-reachable immediately; `prefers-reduced-motion` yields static final-resolved sculpture frame (DESIGN.md §13/§32) |
| Performance | WebGL payload ≤1.5MB desktop, not loaded <768px (DESIGN.md §33); hero asset gets `fetchpriority="high"` (DESIGN.md §16) |
| Analytics | `hero_cta_primary_click`, `hero_cta_secondary_click` (PRODUCT.md §17.1/§29) |
| Empty state | N/A — hero is always populated; if `sculptureAsset` is missing, render `sculptureFallback` only (graceful asset-missing degradation, not a broken hero) |
| Error state | WebGL context failure → fall back to the static image immediately (feature-detected, DESIGN.md §33's low-power fallback logic, TECHNICAL-ARCHITECTURE.md §16) |
| Acceptance criteria | Headline + both CTAs visible and interactive within first viewport at 360px with zero layout shift after font load (PRODUCT.md §17.1); LCP element is the headline text, not the 3D canvas |
| Source reference | PRODUCT.md §17.1, §9.2–§9.3; DESIGN.md §13, §27 row 01; Phase-02 prompt §11 |

### 6.2 HOME-02 — Selected Work

| Field | Specification |
|---|---|
| Section ID | HOME-02 |
| Page | `/` |
| Section name | Selected Work |
| Business purpose | Prove capability via real/clearly-labeled work (PRODUCT.md §17.2) |
| Visual direction | DESIGN.md §27 row 02 — real imagery only, zero decorative 3D/particles |
| Desktop layout | Large featured project media, asymmetric editorial arrangement |
| Tablet layout | Two-column/staggered only where content density supports it (Phase-02 prompt §12) |
| Mobile layout | Single-column project sequence, full-width responsive media |
| Background | `color.bg.page` — neutral porcelain canvas so real product screenshots stay the dominant color story (DESIGN.md §27) |
| Typography | `type.en.h3`/`type.ar.h3` project name, `type.en.technical-label`/Arabic equivalent metadata (DESIGN.md §18.9) |
| Spacing | `space.8` section padding, `space.4` between cards (DESIGN.md §9.4) |
| Components | DESIGN.md §18.9 Project Showcase |
| Styling | Tailwind + `next/image` responsive sizing |
| Libraries | `next/image`, GSAP for restrained reveal only |
| Animation | Scroll-reveal entrance (`motion.slow`/`ease.decelerate`, DESIGN.md §24.3); image hover scale 1→1.02 (desktop) |
| Interaction | Card click → `/work/[slug]`; hover scale desktop-only, no hover-dependent content on touch |
| RTL | Classification badge at image's logical-start corner (DESIGN.md §18.9); grid reading order per DESIGN.md §11 |
| LTR | Standard order (DESIGN.md §12) |
| CMS source | `homepage` global → `selectedWork`, relationship to `projects` |
| CMS fields | `homepage.selectedWork.sectionLabel`, `featuredProjects[]` → `projects.title/classification/heroMedia/industry/summary` (CMS-SCHEMAS.md §11) |
| Media | Real project screenshots, 16:10 (DESIGN.md §16) — no stock photography |
| SEO | Internal links to `/work/[slug]` detail pages |
| Accessibility | Classification badge text is real DOM text, not image-embedded; image `alt` from `media.alt` (CMS-SCHEMAS.md §9) |
| Performance | Below-the-fold → native lazy-loading except the first visible card |
| Analytics | `work_card_click` tagged with classification (PRODUCT.md §29) |
| Empty state | If `featuredProjects` is empty: honest single-panel message "Selected work is in progress — here's how we approach every engagement" linking to `/process`, per PRODUCT.md §17.2 — never a fabricated placeholder grid |
| Error state | If a referenced project is unpublished/deleted, it is excluded from the query (CMS-SCHEMAS.md §24 publish-status filtering), not rendered broken |
| Acceptance criteria | Zero stock imagery present; every card shows a classification badge; empty state renders correctly when 0 projects exist (test both states) |
| Source reference | PRODUCT.md §17.2, §23; DESIGN.md §16, §18.9, §27 row 02; Phase-02 prompt §12 |

### 6.3 HOME-03 — What We Create

| Field | Specification |
|---|---|
| Section ID | HOME-03 |
| Page | `/` |
| Section name | What We Create |
| Business purpose | Explain the three service pillars in plain language (PRODUCT.md §17.3) |
| Visual direction | DESIGN.md §18.8 Service Row, §27 row 03 — pure editorial typography, no cards/icons/bento grid |
| Desktop layout | Three large numbered rows, full-width, thin dividers between |
| Tablet layout | Same row structure, reduced text scale |
| Mobile layout | Numbered index stacks above service name (not inline), per DESIGN.md §31 |
| Background | `color.bg.section.tinted` (DESIGN.md §27) |
| Typography | `type.en.h2`/`type.ar.h2` service name, `type.en.body`/`type.ar.body` description (DESIGN.md §18.8) |
| Spacing | `space.7` between rows, `space.8` section padding |
| Components | DESIGN.md §18.8 Service Row |
| Styling | CSS + Tailwind, no component-kit cards |
| Libraries | GSAP for entrance reveal only; CSS for hover text-shift |
| Animation | Hover: row text shifts 8px toward inline-end, 200ms (DESIGN.md §18.8); entrance reveal per §24.3 |
| Interaction | Entire row clickable → `/services/{slug}`; inline-end chevron link, directional per DESIGN.md §12.1 |
| RTL | Chevron mirrors; hover shift direction flips via logical transform (DESIGN.md §9.5 exception) |
| LTR | Standard |
| CMS source | `homepage` global → `whatWeCreate`, relationship to `services` |
| CMS fields | `homepage.whatWeCreate.sectionLabel`, `servicesOrder[]` → `services.title/summary/pillarNumber/slug` (CMS-SCHEMAS.md §7/§11) |
| Media | None — pure typography |
| SEO | Internal links to all three `/services/{slug}` pages |
| Accessibility | Entire row is a single accessible link (not nested interactive elements), numbered index read correctly by screen readers (not decorative-only) |
| Performance | Fully server-rendered, no client JS beyond the entrance reveal |
| Analytics | `service_page_cta_click`-equivalent tracked as a nav-style click, tagged with pillar (PRODUCT.md §29 — exact event name reused from the service-page CTA event since this is the same destination) |
| Empty state | N/A — `services` collection is a fixed 3-record set at MVP, never empty |
| Error state | If a `services` record is unpublished, its row is omitted from this section (graceful 2-of-3 rendering rather than broken) |
| Acceptance criteria | No three-card grid pattern present in the rendered output (explicit anti-pattern check, DESIGN.md §36); all three rows link correctly in both locales |
| Source reference | PRODUCT.md §17.3, §8; DESIGN.md §18.8, §27 row 03; Phase-02 prompt §13 |

### 6.4 HOME-04 — Systems in Motion

| Field | Specification |
|---|---|
| Section ID | HOME-04 |
| Page | `/` |
| Section name | Systems in Motion |
| Business purpose | Demonstrate the fragmented→connected→automated transformation narrative (PRODUCT.md §17.4) |
| Visual direction | DESIGN.md §14 Particle Intelligence, §27 row 04 |
| Desktop layout | Large dark visual stage, 3-stage narrative, visible stage labels, manual stage controls |
| Tablet layout | Same structure, reduced particle density if needed for performance |
| Mobile layout | Static/lightweight pre-rendered states, manual controls only, no WebGL |
| Background | `color.bg.section.dark` — one of exactly two deliberate deep-cobalt sections on the homepage; required here because a self-illuminating particle field needs a dark backdrop to read as light/energy (DESIGN.md §14, §27 row 04, §5.2) |
| Typography | `type.en.h2`/`type.ar.h2` section headline, `type.en.h4`/`type.ar.h4` stage labels — all rendered in `color.ink.onDark`/`color.ink.onDark.secondary` (DESIGN.md §5.2) since this section sits on `color.bg.section.dark` |
| Spacing | `space.8` section padding |
| Components | Particle canvas wrapper, stage-label text blocks, prev/next manual controls |
| Styling | Canvas/WebGL layer + Tailwind for surrounding text/controls |
| Libraries | Three.js (desktop only, dynamic import) + GSAP for stage-transition control |
| Animation | 600–900ms stage transitions, scroll-linked **within this section's own scroll range only** — no global scroll hijack (DESIGN.md §14/§24.5/§26) |
| Interaction | Manual prev/next stage controls always available (never scroll-only progression); pointer-proximity particle repel (desktop, ≤20px) |
| RTL | Stage progression is time-based, **does not mirror** (DESIGN.md §14/§25); text/controls follow reading direction |
| LTR | Same time-based progression, standard control placement |
| CMS source | `homepage` global → `systemsInMotion` |
| CMS fields | `sectionHeadline`, `sectionDescription`, `stages[]` (exactly 3: `stageTitle`, `stageDescription`, `stageAccessibilityText`), `fallbackMedia` (CMS-SCHEMAS.md §11/§19) |
| Media | Pre-baked animated sprite/fallback media for mobile + low-power desktop fallback (DESIGN.md §33) |
| SEO | Stage names/descriptions are real text content (not canvas-only), contributing to on-page text relevance |
| Accessibility | Three stage names/descriptions readable as real DOM content regardless of canvas render (DESIGN.md §14/§26/§32 hard requirement); `prefers-reduced-motion` → static 3-frame stepped sequence |
| Performance | WebGL particle payload ≤400KB desktop, not loaded <768px (DESIGN.md §33) |
| Analytics | Stage-navigation interaction is not separately named in PRODUCT.md §29's event list — SPECIFICATION GAP: no event name locked for manual stage-control clicks; recommend extending the analytics contract at implementation, not inventing an unapproved event name here |
| Empty state | N/A — fixed 3-stage content structure, always populated |
| Error state | WebGL failure → render the static 3-frame fallback with manual controls still functional |
| Acceptance criteria | Native page scroll never hijacked past this section; reduced-motion variant fully conveys the 3-stage narrative via text alone; RTL build confirmed NOT mirroring stage motion (DESIGN.md §38 checklist item) |
| Source reference | PRODUCT.md §17.4; DESIGN.md §14, §25, §27 row 04; Phase-02 prompt §14 |

### 6.5 HOME-05 — Engineering Behind the Experience

| Field | Specification |
|---|---|
| Section ID | HOME-05 |
| Page | `/` |
| Section name | Engineering Behind the Experience |
| Business purpose | Technical credibility via genuine practices, not certifications (PRODUCT.md §17.5) |
| Visual direction | DESIGN.md §15 Digital Architecture used sparingly as background texture (not a full interactive diagram here), §27 row 05 |
| Desktop layout | Asymmetric editorial layout, large statement + structured list, subtle architecture lines |
| Tablet layout | Same structure, simplified diagram weight |
| Mobile layout | Stacked content, simplified diagram, no overlapping text (Phase-02 prompt §15) |
| Background | `color.bg.section.tinted` (DESIGN.md §27) |
| Typography | `type.en.h2`/`type.ar.h2` headline, `type.en.body`/`type.ar.body` principle descriptions |
| Spacing | `space.8` section padding, `space.4` between principle items |
| Components | Background-weight SVG diagram, principle list items, DESIGN.md §18.5 Secondary Button (CTA) |
| Styling | SVG + CSS |
| Libraries | SVG, GSAP for restrained reveal |
| Animation | Scroll-reveal only, `motion.slow`/`ease.decelerate`; no idle looping (DESIGN.md §15 — "calmer by design") |
| Interaction | CTA click → `/contact` or `/process` (per content decision at implementation — SPECIFICATION GAP: exact CTA destination not pinned by PRODUCT.md, default to `/contact` per the global CTA hierarchy, PRODUCT.md §20) |
| RTL | Diagram flow mirrors reading direction (DESIGN.md §15/§25 — this is the one visual system where flow direction *does* mirror) |
| LTR | Standard left-to-right flow |
| CMS source | `homepage` global → `engineeringBehind` |
| CMS fields | `headline`, `description`, `engineeringPrinciples[]` (1–7 items: Architecture/Security/Testing/Performance/Monitoring/Maintainability/Scalability), `supportingDiagram`, `cta` (CMS-SCHEMAS.md §11/§19) |
| Media | SVG architecture diagram asset (DESIGN.md §28.2 — 🔴 pending production) |
| SEO | Genuine-practice descriptions contribute credibility-relevant on-page text, no fabricated certification schema (PRODUCT.md §28's explicit prohibition) |
| Accessibility | Diagram has an accessibility-equivalent text description field (not rendered, available to AT) |
| Performance | SVG is lightweight by nature; no WebGL in this section |
| Analytics | Not separately tracked beyond the CTA's existing event name |
| Empty state | If `engineeringPrinciples` has fewer than the full set, render only what exists — never pad with invented principles |
| Error state | N/A — static content, no dynamic failure mode beyond the generic CMS-unavailable fallback |
| Acceptance criteria | No unsupported compliance/certification claim present anywhere in rendered copy (PRODUCT.md §26/§29 hard rule, verified against actual CMS content at publish time, not just the schema) |
| Source reference | PRODUCT.md §17.5, §26; DESIGN.md §15, §27 row 05; Phase-02 prompt §15 |

### 6.6 HOME-06 — From Vision to Reality

| Field | Specification |
|---|---|
| Section ID | HOME-06 |
| Page | `/` |
| Section name | From Vision to Reality |
| Business purpose | Explain the six-stage delivery process to build trust before conversion (PRODUCT.md §17.6) |
| Visual direction | DESIGN.md §27 row 06 — editorial timeline, direction-aware per §15's flow rule |
| Desktop layout | Horizontal six-stage sequence, thin connecting line |
| Tablet layout | Horizontal retained if space allows, else transitions to vertical early |
| Mobile layout | Vertical timeline, logical reading order, no horizontal overflow (Phase-02 prompt §16) |
| Background | `color.bg.page` (DESIGN.md §27) |
| Typography | `type.en.h4`/`type.ar.h4` stage title, `type.en.body-sm`/`type.ar.body-sm` stage description |
| Spacing | `space.6` between stages |
| Components | SVG timeline connector, stage markers |
| Styling | SVG + CSS |
| Libraries | SVG, GSAP ScrollTrigger (section-scoped) |
| Animation | Progressive stage reveal as the timeline scrolls into view, direction-aware progress fill (DESIGN.md §16) |
| Interaction | Non-interactive display (no click-to-expand at MVP — stages are summarized here, full detail lives on `/process`) |
| RTL | Timeline reads right-to-left, progress fill direction follows reading direction (mirrors, per DESIGN.md §15's flow-based exception) |
| LTR | Left-to-right |
| CMS source | `process-page` global → `steps[]` (referenced, not duplicated — CMS-SCHEMAS.md §11/§13 note) |
| CMS fields | `process-page.steps[].stepNumber/title/description` (summarized subset shown here; `deliverables[]` shown only on `/process`) |
| Media | None |
| SEO | Internal link target: `/process` for full detail (if a "see full process" link is added — SPECIFICATION GAP: PRODUCT.md §17.6 does not explicitly confirm a link-through CTA here; recommend one for consistency with the rest of the homepage's internal-linking pattern, flag for content sign-off) |
| Accessibility | Timeline progress is a visual enhancement over real, always-present stage text — reduced-motion renders a static timeline with no fill animation |
| Performance | SVG-based, lightweight |
| Analytics | Not separately tracked |
| Empty state | N/A — exactly 6 stages always populated (CMS-SCHEMAS.md §13 `minRows/maxRows: 6`) |
| Error state | N/A |
| Acceptance criteria | Content matches the six locked stage names exactly (Discovery, Architecture, Product Design, Engineering, Validation, Launch & Evolution) with no invented seventh stage |
| Source reference | PRODUCT.md §17.6; DESIGN.md §15, §27 row 06; Phase-02 prompt §16 |

### 6.7 HOME-07 — Rakmyat Philosophy

| Field | Specification |
|---|---|
| Section ID | HOME-07 |
| Page | `/` |
| Section name | Rakmyat Philosophy |
| Business purpose | Emotional brand identity via a distinctive manifesto (PRODUCT.md §17.7) |
| Visual direction | DESIGN.md §27 row 07 — quietest section on the page, single-column, no cards/3D/particles |
| Desktop layout | Single-column, large/oversized typography, generous negative space |
| Tablet layout | Same composition, reduced type scale |
| Mobile layout | Same composition, further reduced type scale, no stacking complexity needed (single column throughout) |
| Background | `color.bg.page` (DESIGN.md §27) |
| Typography | `type.en.display-lg`/`type.ar.display-lg` or `h1` scale for the manifesto body (exact token — SPECIFICATION GAP: DESIGN.md §27 does not pin an exact token for this section's body text; recommend `type.en.h1`/`type.ar.h1` as the manifesto's visual weight, one step below the hero's `display`/`hero-h1` tokens, consistent with Principle "quietest section" — flag for design sign-off) |
| Spacing | `space.9` section padding (large, matching "typographic pause" intent) |
| Components | None beyond a text block |
| Styling | CSS only |
| Libraries | GSAP for a subtle line-based reveal only (prompt §17 — "do not split Arabic text into individual characters") |
| Animation | Subtle line-based reveal, `motion.slow`/`ease.decelerate`; explicitly never character-by-character for Arabic (breaks letter shaping, Phase-02 prompt §17/DESIGN.md §34) |
| Interaction | None — purely read-only content |
| RTL | Standard paragraph RTL flow, no directional narrative concerns (static text) |
| LTR | Standard |
| CMS source | `homepage` global → `philosophy` |
| CMS fields | `manifestoHeadline`, `manifestoBody`, `optionalSupportingLabel` (CMS-SCHEMAS.md §11) |
| Media | None |
| SEO | Contributes brand-voice text content; not a primary SEO target section |
| Accessibility | Plain readable text, no motion-dependent comprehension |
| Performance | Zero JS beyond the optional line-reveal; trivially fast |
| Analytics | Not tracked |
| Empty state | N/A — always populated, though current copy is draft/PENDING OWNER REVIEW (PRODUCT.md §17.7) |
| Error state | N/A |
| Acceptance criteria | Manifesto copy does not exceed the ≤80-word-per-language limit (PRODUCT.md §17.7); Arabic text never animates character-by-character |
| Source reference | PRODUCT.md §17.7; DESIGN.md §27 row 07; Phase-02 prompt §17 |

### 6.8 HOME-08 — Final Conversion

| Field | Specification |
|---|---|
| Section ID | HOME-08 |
| Page | `/` |
| Section name | Final Conversion |
| Business purpose | Generate qualified project inquiries at the page's natural exit point (PRODUCT.md §17.8) |
| Visual direction | DESIGN.md §27 row 08 — clean CTA band, no 3D/particles, focus entirely on the two CTAs |
| Desktop layout | Large headline + both CTAs side-by-side |
| Tablet layout | Same, CTAs may wrap to stacked if width is tight |
| Mobile layout | Stacked full-width, primary CTA on top (PRODUCT.md §18/Phase-02 prompt §18) |
| Background | `color.bg.section.dark` — the second of exactly two deliberate deep-cobalt sections on the homepage; a bold, confident close (DESIGN.md §27 row 08, §5.2) |
| Typography | `type.en.display-lg`/`type.ar.display-lg` headline in `color.ink.onDark` (DESIGN.md §27 row 08's "high-impact" framing — consistent with the hero-adjacent weight, since this is the page's second-most-important visual moment) |
| Spacing | `space.8` section padding |
| Components | DESIGN.md §18.4 Primary Button (on-dark variant: white fill, `color.cobalt.deep` text, inverted from the standard cobalt-fill/white-text treatment so it still reads clearly against the dark background), §18.5 Secondary Button, §18.17 Contact CTA band |
| Styling | CSS + Tailwind |
| Libraries | GSAP for subtle entrance only |
| Animation | Subtle entrance reveal, refined button hover/active states — "no complex animation" (Phase-02 prompt §18) |
| Interaction | Primary CTA → `/contact`; Secondary CTA → Discovery Call fallback flow (PRODUCT.md §22 — routes to `/contact` with discovery intent flagged until a real booking tool exists) |
| RTL | Standard logical-property layout, no directional narrative concern |
| LTR | Standard |
| CMS source | `homepage` global → `finalConversion` |
| CMS fields | `headline`, `primaryCtaLabel`/`Href`, `secondaryCtaLabel`/`Href`, `nextStepNote` (CMS-SCHEMAS.md §11) |
| Media | None |
| SEO | Final internal link to `/contact` |
| Accessibility | Both CTAs large touch targets (≥44×44px); white CTA treatment verified at ≈9.3:1 against the `color.bg.section.dark` background (DESIGN.md §5.4) |
| Performance | Trivial — no heavy assets |
| Analytics | Reuses `hero_cta_primary_click`/`hero_cta_secondary_click`-style naming — SPECIFICATION GAP: PRODUCT.md §29's event list does not define a distinct final-CTA event name separate from the hero's; recommend `final_cta_primary_click`/`final_cta_secondary_click` as a natural extension at implementation, not already locked in PRODUCT.md, flagged rather than silently assumed |
| Empty state | N/A — always populated |
| Error state | N/A |
| Acceptance criteria | `nextStepNote` copy never states an invented response time (PRODUCT.md §17.8 hard rule); Discovery Call CTA never implies a live calendar booking that doesn't exist (PRODUCT.md §22) |
| Source reference | PRODUCT.md §17.8, §22; DESIGN.md §27 row 08; Phase-02 prompt §18 |

---

## 7. Services Archive (`/services`)

| Field | Specification | (applies to all 4 sub-sections unless noted) |
|---|---|---|
| Section ID | SERVICES-ARCHIVE-01..04 | |
| Page | `/services` | |
| Section name | 01 Editorial Services Hero · 02 Three Service Pillars · 03 Engineering Approach · 04 Project Inquiry CTA | Per Phase-02 prompt §20 |
| Business purpose | Orient a visitor into the three pillars before committing to one detail page (PRODUCT.md §18.1) | |
| Visual direction | Large typography, numbered service rows (reuses DESIGN.md §18.8 pattern from HOME-03) — no generic three-card grid, no stock photography, no dashboard illustrations (Phase-02 prompt §20) | |
| Desktop layout | 01: full-width editorial hero statement. 02: full-width editorial rows (identical pattern to HOME-03). 03: asymmetric layout, same restrained diagram treatment as HOME-05. 04: CTA band, same pattern as HOME-08 | |
| Tablet layout | Reduced text scale and spacing throughout (Phase-02 prompt §20) | |
| Mobile layout | Single-column rows throughout | |
| Background | 01/03: `color.bg.section.tinted` alternating with 02/04: `color.bg.page` (rhythm consistent with DESIGN.md §27's alternating pattern; this inner page stays light throughout, no deep-cobalt section) | |
| Typography | 01: `type.en.hero-h1`/`type.ar.hero-h1`. 02: `type.en.h2`/`type.ar.h2` per row (DESIGN.md §18.8). 03: `type.en.h2`+body. 04: `type.en.display-lg` | |
| Spacing | `space.8`–`space.9` between the four sections (DESIGN.md §9.4) | |
| Components | DESIGN.md §18.8 Service Row (section 02), restrained SVG diagram (section 03, same treatment as HOME-05), §18.17 Contact CTA (section 04) | |
| Styling | Tailwind + CSS, consistent with homepage equivalents | |
| Libraries | GSAP for entrance reveals only; no 3D/particles on this page (DESIGN.md §28.1 — inner pages keep signature moments rare) | |
| Animation | Scroll-reveal per section, `motion.slow`/`ease.decelerate` | |
| Interaction | Section 02 rows link to their respective `/services/{slug}` detail page; section 04 CTAs link to `/contact` | |
| RTL | Same logical-property rules as HOME-03/HOME-05/HOME-08 equivalents | |
| LTR | Standard | |
| CMS source | `services` collection (list query, all 3 published records, ordered by `pillarNumber`) | |
| CMS fields | `services.title/summary/pillarNumber/slug` per row (CMS-SCHEMAS.md §7) | |
| Media | None beyond the restrained diagram in section 03 | |
| SEO | Target "software engineering company," "enterprise software partner," "AI automation company" buyer-intent phrasing (PRODUCT.md §18.1/§27) — illustrative only, no keyword-volume research performed (PRODUCT.md §27's caveat) | |
| Accessibility | Same landmark/heading/contrast rules as every other page | |
| Performance | Fully server-rendered, no WebGL on this route | |
| Analytics | `service_page_cta_click` tagged per pillar on row click; standard contact-CTA events on section 04 | |
| Empty state | If fewer than 3 `services` records are published (should not happen at MVP, but defensively): render only the published subset, never pad | |
| Error state | N/A beyond generic CMS-unavailable fallback | |
| Acceptance criteria | No three-card grid pattern present (DESIGN.md §36); all three service rows link correctly in both locales; related-case-study block (if shown) hidden entirely when none exist, not shown empty (PRODUCT.md §18.2) | |
| Source reference | PRODUCT.md §18.1; DESIGN.md §18.8, §28.1; Phase-02 prompt §20 | |

---

## 8. Custom Software Service (`/services/custom-software`)

Full 29-field template given once here for all 7 sections of the **shared service-detail template** (Phase-02 prompt §21). Sections 9–10 give only the content deltas.

| Field | Specification |
|---|---|
| Section ID | SVC-TEMPLATE-01..07 (01 Service Statement Hero · 02 Business Problems We Solve · 03 Scope & Deliverables · 04 Digital Architecture Showcase · 05 Our Engineering Approach · 06 Related Work · 07 Start a Project CTA) |
| Page | `/services/custom-software` (template shared with `/services/enterprise-solutions`, `/services/ai-agents-automation`) |
| Section name | See above — identical structure across all three service pages (Phase-02 prompt §21) |
| Business purpose | Deep-dive one pillar for its matched ICP; find proof of fit (PRODUCT.md §18.2) |
| Visual direction | Large editorial headings, technical architecture diagrams, clean structural dividers, porcelain/tinted light surfaces, cobalt only for emphasis (Phase-02 prompt §21, migrated to Cobalt Blue & Porcelain per DESIGN.md §28.1) — no decorative AI brains, no stock business photography |
| Desktop layout | 01: hero statement (smaller-scale version of HOME-01's typography, no 3D sculpture). 02: editorial problem list. 03: deliverables list (DESIGN.md §18.8-style rows). 04: full interactive Digital Architecture diagram (unlike the homepage's background-weight use, DESIGN.md §28.1). 05: short engineering-approach statement. 06: related-work cards (DESIGN.md §18.9, hidden if empty). 07: CTA band (DESIGN.md §18.17) |
| Tablet layout | Same section order, reduced type scale, diagram simplifies per DESIGN.md §15's fallback rule |
| Mobile layout | Single-column throughout; diagram (04) simplifies to vertical stacked flow or static image per DESIGN.md §15 |
| Background | Alternating `color.bg.page`/`color.bg.section.tinted` per section, consistent with the site-wide rhythm (light throughout — no deep-cobalt section on service detail pages) |
| Typography | 01: `type.en.h1`/`type.ar.h1`. 02–03: `type.en.h3`+body rows. 05: `type.en.h2`+body. 06: `type.en.h3` card titles. 07: `type.en.display-lg` |
| Spacing | `space.8` between sections |
| Components | DESIGN.md §18.8 rows (02/03), §18.10 Interactive Diagram (04), §18.9 Project Showcase (06), §18.17 Contact CTA (07) |
| Styling | Tailwind + CSS Module for the diagram's SVG composition |
| Libraries | SVG + GSAP for the diagram (04); Three.js only if a future DESIGN.md revision explicitly requires 3D for a specific service — not used at MVP (Phase-02 prompt §21/ADR-004) |
| Animation | Scroll-reveal per section; diagram modules fade/settle in sequence along the flow direction, staggered (DESIGN.md §15/§24.3) |
| Interaction | Diagram modules are keyboard-focusable, arrow-key navigable along the connection graph (DESIGN.md §18.10); section 06 cards link to `/work/[slug]`; section 07 CTAs link to `/contact` |
| RTL | Diagram flow mirrors reading direction (DESIGN.md §15, the one visual system where flow *does* mirror); all other sections follow standard logical-property rules |
| LTR | Standard |
| CMS source | `services` collection, single record (`slug: custom-software`) |
| CMS fields | `title`, `summary`, `problems[]`, `deliverables[]`, `architectureDiagram` (group), `processSummary`, `relatedProjects[]`, `cta` (CMS-SCHEMAS.md §7) |
| Media | Service-specific SVG architecture diagram (DESIGN.md §28.2 — 🔴 pending production, one per service) |
| SEO | Per-service metadata via `services.seo` field group, falling back to `seo-defaults` global (CMS-SCHEMAS.md §7/§17) |
| Accessibility | Diagram's `diagramDescription` field provides the non-visual equivalent (CMS-SCHEMAS.md §7); all section headings in correct hierarchical order under the page's one `<h1>` |
| Performance | No WebGL at MVP for this page; SVG diagram is lightweight |
| Analytics | `service_page_cta_click` tagged `custom-software` |
| Empty state | Section 06 (Related Work) is hidden entirely — not rendered empty — when `relatedProjects` has zero published entries (PRODUCT.md §18.2's explicit rule) |
| Error state | N/A beyond generic CMS-unavailable fallback |
| Acceptance criteria | Page never name-drops a trendy technology not actually used (PRODUCT.md §18.2/§23.2); diagram has full keyboard navigation; related-work section correctly hides when empty |
| Source reference | PRODUCT.md §18.2, §8.1; DESIGN.md §15, §18.8–§18.10, §28.1; Phase-02 prompt §21 |

---

## 9. Enterprise Solutions Service (`/services/enterprise-solutions`)

**Template:** identical to §8's full 29-field table in every structural, visual, motion, responsive, RTL/LTR, accessibility, and performance field. Content deltas only:

| Field | Delta from §8 |
|---|---|
| Section name / content | Pillar: Enterprise Digital Systems / الأنظمة المؤسسية الرقمية (PRODUCT.md §8.2) |
| Section 02 content | Problems scoped to: disconnected ERP/CRM, manual re-entry, broken reporting (PRODUCT.md §8.2 scope table) |
| Section 03 content | Deliverables scoped to: ERP/CRM implementation, enterprise portals, business process digitalization, API integrations, legacy modernization, workflow systems, data-driven applications (PRODUCT.md §8.2) |
| Section 04 diagram topic | Integration/data-pipeline visualization specific to enterprise system connections (DESIGN.md §15's "connected modules, API integrations" use case) |
| CMS record | `services` collection, `slug: enterprise-solutions` |
| Analytics tag | `service_page_cta_click` tagged `enterprise-solutions` |
| Acceptance criteria addition | Engagement-model copy reflects PRODUCT.md §8.2's "discovery-led scoping → phased delivery with defined rollback points" — never a fixed-scope promise inappropriate to integration risk |
| Source reference | PRODUCT.md §8.2, §18.2; DESIGN.md §15, §28.1; Phase-02 prompt §21 |

---

## 10. AI Agents & Automation Service (`/services/ai-agents-automation`)

**Template:** identical to §8's full 29-field table in every structural, visual, motion, responsive, RTL/LTR, accessibility, and performance field. Content deltas only:

| Field | Delta from §8 |
|---|---|
| Section name / content | Pillar: AI Agents & Automation / الذكاء الاصطناعي والأتمتة (PRODUCT.md §8.3) |
| Section 02 content | Problems scoped to: repetitive manual workflows, support load, document-heavy processes (PRODUCT.md §6 ICP-5) |
| Section 03 content | Deliverables scoped to: AI agents, workflow automation, AI-powered internal assistants, intelligent document processing, customer support automation, knowledge-based assistants, multi-step automation, AI integrations (PRODUCT.md §8.3) |
| Section 04 diagram topic | AI-agent/data-pipeline visualization — multi-step automation flow (DESIGN.md §15's "AI agents, data pipelines" use case) |
| CMS record | `services` collection, `slug: ai-agents-automation` |
| Analytics tag | `service_page_cta_click` tagged `ai-agents-automation` |
| Acceptance criteria addition | Copy always frames AI capability honestly — no unsupported automation claims (PRODUCT.md §6 ICP-5 objections, §26); 🟡 recommend a scoped-pilot framing per PRODUCT.md §8.3's engagement-model note, surfaced in `processSummary` content at the editorial stage, not a schema change |
| Source reference | PRODUCT.md §8.3, §6 (ICP-5), §18.2; DESIGN.md §15, §28.1; Phase-02 prompt §21 |

---

## 11. About Page (`/about`)

| Field | Specification | (applies across all 8 sub-sections, deltas noted inline) |
|---|---|---|
| Section ID | ABOUT-01..08 | 01 Editorial About Hero · 02 Who We Are · 03 Engineering Philosophy · 04 What We Believe · 05 How We Work · 06 Our Capabilities · 07 Team (conditional) · 08 Final CTA (Phase-02 prompt §22) |
| Page | `/about` | |
| Business purpose | Build trust via company identity and philosophy, especially for ICP-3/ICP-4 due-diligence readers (PRODUCT.md §18.5) | |
| Visual direction | Premium editorial storytelling, large typography, asymmetric layouts, controlled negative space — no generic corporate portraits, no fabricated team members, no fake office photography (Phase-02 prompt §22) | |
| Desktop layout | 01: hero statement. 02–06: alternating asymmetric text/diagram-free editorial blocks. 07: only rendered if `teamMembers` is non-empty, simple portrait+name+role grid when present. 08: CTA band (DESIGN.md §18.17 pattern) | |
| Tablet layout | Same section order, reduced asymmetry/scale | |
| Mobile layout | Single-column stack throughout | |
| Background | Alternating `color.bg.page`/`color.bg.section.tinted` | |
| Typography | 01: `type.en.h1`. 02–06: `type.en.h2`+body per block. 07: `type.en.h4` name/role. 08: `type.en.display-lg` | |
| Spacing | `space.8` between sections | |
| Components | Text blocks only, §18.17 Contact CTA (08) | |
| Styling | Tailwind + CSS | |
| Libraries | GSAP for line/section reveals only — explicitly no WebGL scene on this page (Phase-02 prompt §22) | |
| Animation | Scroll-reveal, `motion.slow`/`ease.decelerate`; CSS hover transitions on any inline links | |
| Interaction | Section 08 CTAs → `/contact` | |
| RTL | Standard logical-property rules; asymmetric block composition re-evaluated per side at implementation (no 3D/directional-recomposition concern on this page, unlike the hero) | |
| LTR | Standard | |
| CMS source | `about-page` global | |
| CMS fields | `heroHeadline/Subhead`, `brandStory`, `philosophyBody`, `beliefs[]`, `howWeWork`, `capabilities[]`, `teamMembers[]` (conditional), `cta` (CMS-SCHEMAS.md §12) | |
| Media | Team photos only if `teamMembers` is populated (optional, 🔴 PRODUCT.md §34) | |
| SEO | About-page metadata via `about-page` global's `seo` field | |
| Accessibility | Standard landmark/heading rules; if section 07 is omitted, heading hierarchy still flows correctly from 06 to 08 (no skipped-but-expected heading level) | |
| Performance | Fully server-rendered, no WebGL | |
| Analytics | Contact-CTA click events only (section 08) | |
| Empty state | Section 07 (Team) renders nothing at all — not an empty "coming soon" placeholder — when `teamMembers` is empty (Phase-02 prompt §22's explicit instruction) | |
| Error state | N/A beyond generic CMS-unavailable fallback | |
| Acceptance criteria | `brandStory` copy is flagged internally as PENDING OWNER APPROVAL until explicitly confirmed (prompt §22); no fabricated team member, photo, or office image ever appears | |
| Source reference | PRODUCT.md §18.5, §9.8; DESIGN.md §28.1; Phase-02 prompt §22 | |

---

## 12. Process Page (`/process`)

| Field | Specification |
|---|---|
| Section ID | PROCESS-01..05 (01 Process Hero · 02 Six-Stage Engineering Process · 03 Deliverables by Stage · 04 Quality & Validation Approach · 05 Project CTA) |
| Page | `/process` |
| Business purpose | Give enterprise/technical buyers (ICP-3) a concrete, specific delivery process (PRODUCT.md §18.6) |
| Visual direction | Editorial process documentation, large numbered steps, precise timeline, technical credibility (Phase-02 prompt §23) |
| Desktop layout | 01: hero statement. 02: horizontal six-stage timeline (fuller version of HOME-06, with full deliverable detail). 03: deliverable rows per stage. 04: quality-principles list. 05: CTA band |
| Tablet layout | Horizontal timeline retained where space allows (Phase-02 prompt §23) |
| Mobile layout | Vertical timeline |
| Background | Alternating `color.bg.page`/`color.bg.section.tinted` |
| Typography | 01: `type.en.h1`. 02: `type.en.h3` stage titles. 03: `type.en.body` deliverable list items. 04: `type.en.h2`+body. 05: `type.en.display-lg` |
| Spacing | `space.8` between sections |
| Components | SVG timeline (shared pattern with HOME-06), §18.17 Contact CTA |
| Styling | SVG + Tailwind |
| Libraries | SVG, GSAP ScrollTrigger (section-scoped) |
| Animation | Direction-aware progressive stage reveal (DESIGN.md §16/Phase-02 prompt §23); reduced-motion → static timeline |
| Interaction | Non-interactive timeline display; CTA → `/contact` |
| RTL | Progress fill direction mirrors reading direction (same rule as HOME-06, DESIGN.md §15's flow exception) |
| LTR | Standard |
| CMS source | `process-page` global |
| CMS fields | `heroHeadline/Subhead`, `steps[]` (exactly 6, full `deliverables[]` shown here unlike HOME-06's summary view), `qualityPrinciples[]`, `cta` (CMS-SCHEMAS.md §13) |
| Media | None |
| SEO | Process-page metadata via global's `seo` field |
| Accessibility | Timeline progress is a visual enhancement over always-present text; standard heading hierarchy |
| Performance | SVG-based, lightweight, no WebGL |
| Analytics | Contact-CTA click only |
| Empty state | N/A — fixed 6-stage structure |
| Error state | N/A |
| Acceptance criteria | Six stage names/descriptions match PRODUCT.md §17.6 exactly, no invented seventh stage or renamed stage; deliverable list per stage is specific enough to read as a real internal process, not marketing copy (PRODUCT.md §18.6) |
| Source reference | PRODUCT.md §18.6, §17.6; DESIGN.md §15–§16; Phase-02 prompt §23 |

---

## 13. Portfolio Archive (`/work`)

| Field | Specification |
|---|---|
| Section ID | WORK-ARCHIVE-01..04 (01 Work Hero · 02 Featured Project · 03 Project Archive · 04 Project Inquiry CTA) |
| Page | `/work` |
| Business purpose | Prove capability across the full body of work (PRODUCT.md §18.3/§23) |
| Visual direction | Editorial portfolio gallery, large real media, minimal metadata, strong asymmetric composition — no generic SaaS cards (Phase-02 prompt §24) |
| Desktop layout | 01: hero statement. 02: one dominant-width featured project. 03: asymmetric grid of remaining projects. 04: CTA band |
| Tablet layout | Two-column grid where content density permits (02/03) |
| Mobile layout | Single-column project sequence throughout |
| Background | Alternating `color.bg.page`/`color.bg.section.tinted` |
| Typography | 01: `type.en.h1`. 02/03: `type.en.h3` project names (DESIGN.md §18.9). 04: `type.en.display-lg` |
| Spacing | `space.8` between sections, `space.4` grid gaps |
| Components | DESIGN.md §18.9 Project Showcase, §18.17 Contact CTA |
| Styling | Tailwind + `next/image` |
| Libraries | `next/image`, GSAP for restrained reveals |
| Animation | Scroll-reveal entrance, image hover scale (desktop) per DESIGN.md §18.9/§24.3 |
| Interaction | **Filtering (03):** if <6 published projects, render a simple list, no filter UI; if ≥6, enable classification + service-pillar filtering via URL search params, server-side filtered (Phase-02 prompt §24 — a hard conditional, not an editorial choice) |
| RTL | Classification badge logical-start corner; grid reading order per DESIGN.md §11 |
| LTR | Standard |
| CMS source | `projects` collection (list query), `project-categories` collection (filter options, only active at ≥6 published projects) |
| CMS fields | `projects.title/classification/thumbnail/heroMedia/industry/services/featured/archiveOrder/status` (CMS-SCHEMAS.md §5) |
| Media | Real project screenshots only (DESIGN.md §16) |
| SEO | `/work/[slug]` internal links; portfolio-index metadata |
| Accessibility | Classification badges as real text; filter controls (when active) keyboard-operable with clear `aria-pressed`/`aria-current` state |
| Performance | Server-side filtering (no client-side re-fetch/re-render of the full list); native lazy-loading below the fold |
| Analytics | `work_card_click` tagged with classification + (if filtered) active filter state |
| Empty state | Honest empty state (PRODUCT.md §23/§17.2 pattern) when zero published projects exist — never fabricated projects (Phase-02 prompt §24's explicit instruction) |
| Error state | N/A beyond generic CMS-unavailable fallback |
| Acceptance criteria | Filter UI only renders at the ≥6-project threshold, verified by test with both 5 and 6 published records; every card shows its classification badge; zero stock imagery |
| Source reference | PRODUCT.md §18.3, §23; DESIGN.md §16, §18.9; Phase-02 prompt §24 |

---

## 14. Single Portfolio (`/work/[slug]`)

11 content blocks per Phase-02 prompt §25. Shared structural/motion/accessibility fields given once; per-block content noted where distinct.

| Field | Specification |
|---|---|
| Section ID | PORTFOLIO-SINGLE-01..11 (01 Project Hero · 02 Overview · 03 Business Challenge · 04 Solution · 05 Product Showcase (conditional) · 06 Engineering Decisions · 07 Technology Stack (conditional) · 08 Outcomes (conditional) · 09 Related Services · 10 Next Project (conditional) · 11 Final Project CTA) |
| Page | `/work/[slug]` (dynamic, CMS-driven) |
| Business purpose | Case-study storytelling as the site's strongest proof mechanism (PRODUCT.md §18.4/§24) |
| Visual direction | Cinematic project hero, real product imagery, editorial case-study storytelling, large typography — no fake dashboards, no fabricated metrics, no fake testimonials (Phase-02 prompt §25) |
| Desktop layout | 01: large hero media + project title + classification badge. 02–04/06: editorial split sections (text one side, supporting media/diagram other side, logical-start/end). 05: full-bleed media when `projectGallery`/flexible media blocks exist. 07/08: shown only when populated. 09: related-services links. 10: shown only when a next project exists in the archive order. 11: CTA band |
| Tablet layout | Split sections may stack earlier than desktop; otherwise same order |
| Mobile layout | Single-column narrative throughout, responsive real screenshots, no sideways overflow (Phase-02 prompt §25) |
| Background | Alternating `color.bg.page`/`color.bg.section.tinted` across blocks |
| Typography | 01: `type.en.h1` project title. 02–08: `type.en.h2`/h3 block headings + body. 11: `type.en.display-lg` |
| Spacing | `space.8` between content blocks |
| Components | DESIGN.md §18.9-style hero treatment, `flexibleBlocks` renderer (CMS-SCHEMAS.md §18), Embla gallery (05, genuine image galleries only), §18.17 Contact CTA (11) |
| Styling | `next/image`, Payload Blocks renderer, Tailwind |
| Libraries | `next/image`, Payload Blocks/Arrays, GSAP (reveals), Embla (05 only, genuine galleries) |
| Animation | Scroll-reveal per block; no WebGL anywhere on this page (real imagery carries the visual weight, DESIGN.md §28.1) |
| Interaction | Flexible-block content is editor-controlled within the allowed registry (CMS-SCHEMAS.md §18) — editors may add/remove/reorder approved blocks, never inject custom CSS/JS (Phase-02 prompt §25's explicit boundary) |
| RTL | Split-section media/text order follows logical start/end, not a hard-coded left/right; project hero classification badge at logical-start corner |
| LTR | Standard |
| CMS source | `projects` collection, single record by `slug` |
| CMS fields | `title`, `classification`, `industry`, `summary`, `heroMedia`, `challenge`, `solution`, `engineeringDecisions[]`, `technologies[]` (07, conditional on non-empty), `verifiedOutcomes[]` + `outcomeEvidence` (08, conditional and evidence-gated), `services[]` (09), `relatedProjects[]` (10), `flexibleBlocks[]` (05 and elsewhere), `seo` (CMS-SCHEMAS.md §5) |
| Media | Real project screenshots/video only; classification badge always visible (DESIGN.md §29) |
| SEO | Per-project `seo` field group; `Article`-style structured data is **not** applied here (PRODUCT.md §28 reserves `Article` schema for future `/insights` content, not case studies) |
| Accessibility | Classification badge and all narrative text are real DOM content; gallery (05) keyboard-navigable via Embla's accessible API configuration |
| Performance | `next/image` responsive `srcset`; no WebGL; Embla only loaded when a gallery block is actually present on that project (code-split, not bundled site-wide) |
| Analytics | Project-level engagement is tracked upstream via `work_card_click` on the archive; this page itself primarily tracks the final CTA click |
| Empty state | 404 for an unknown/unpublished `slug` (not a silent redirect to `/work`, Phase-02 prompt §18.4's explicit rule); blocks 05/07/08/10 individually omit themselves when their source data is empty |
| Error state | Unknown slug → `/404` (locale-aware, §17) |
| Acceptance criteria | `technologies[]` never lists a technology not actually used (PRODUCT.md §23.2); `verifiedOutcomes[]` never renders without a populated `outcomeEvidence` (CMS-SCHEMAS.md §24's publish-blocking hook); a `real-client` classified project never renders `clientDisplayName` unless `clientDisclosureApproved = true` (CMS-SCHEMAS.md §5/§24) |
| Source reference | PRODUCT.md §18.4, §23.2, §24; DESIGN.md §28.1, §29; Phase-02 prompt §25, §30–§31 |

---

## 15. Contact Page (`/contact`)

| Field | Specification |
|---|---|
| Section ID | CONTACT-01..04 (01 Contact Hero · 02 Project Inquiry Form · 03 Contact Methods · 04 What Happens Next) |
| Page | `/contact` |
| Business purpose | Capture a qualified lead or route to discovery-call intent (PRODUCT.md §18.7/§21) |
| Visual direction | Large editorial contact headline, minimal dark form, clear field hierarchy — no generic SaaS card wrapper, no modal-only inquiry experience (Phase-02 prompt §26) |
| Desktop layout | 01: headline statement. 02: form, generous field spacing, no card border treatment. 03: contact methods list (once available, 🔴 PRODUCT.md §34). 04: short reassurance copy block |
| Tablet layout | Same order, form fields remain full-width |
| Mobile layout | Same order, full-width fields, label-above-field pattern critical here (DESIGN.md §18.12/§31) |
| Background | `color.bg.page` — "quietest page on the site" (DESIGN.md §28.1) |
| Typography | 01: `type.en.h1`. 02: `type.en.form-label`/`type.ar.form-label` field labels. 03/04: `type.en.body` |
| Spacing | `space.5` between form fields, `space.8` between sections |
| Components | DESIGN.md §18.12 Form Input/Textarea/Select, §18.13 Checkbox (if a consent checkbox is ever added — not currently in PRODUCT.md §21's field list, so not included at MVP), §18.14 Validation Message, §18.4 Primary Button (submit) |
| Styling | Tailwind + CSS Module for form layout |
| Libraries | React Hook Form, Zod, `@hookform/resolvers` (TECHNICAL-ARCHITECTURE.md §20) |
| Animation | Minimal — field focus states (CSS), inline validation message appearance (DESIGN.md §18.14), no large-scale motion (consistent with "quietest page") |
| Interaction | Client-side validation on blur/submit; server-side re-validation on submit (TECHNICAL-ARCHITECTURE.md §20); success state replaces the form with a confirmation message, not a toast (persistent confirmation is more appropriate for a high-intent action than an auto-dismissing toast) |
| RTL | Arabic labels, correct input direction; email/phone fields forced `dir="ltr"` internally while label stays in form's natural direction (DESIGN.md §18.12/§8; PRODUCT.md §21) |
| LTR | Standard |
| CMS source | `contact-settings` global |
| CMS fields | `heroHeadline/Subhead`, `formFieldLabels`, `projectTypeOptions[]`, `budgetRangeOptions[]` (🔴 empty pending owner input), `timelineOptions[]`, `contactMethods[]`, `whatHappensNextCopy`, `discoveryFallbackNotice` (CMS-SCHEMAS.md §16) |
| Media | None |
| SEO | Contact-page metadata; this page is intentionally not optimized for broad organic traffic (low-funnel, high-intent page) |
| Accessibility | `aria-live="polite"` validation announcements (DESIGN.md §18.14/§32); label-above-field pattern (never placeholder-as-label); full keyboard operability |
| Performance | Lightweight — no 3D, no particles, minimal JS beyond the form library |
| Analytics | `contact_form_start`, `contact_form_field_error`, `contact_form_submit_success`, `contact_form_submit_fail` (PRODUCT.md §21/§29) |
| Empty state | `contactMethods` section (03) renders nothing until contact details are provided (🔴 PRODUCT.md §34) — not a placeholder "coming soon" |
| Error state | Server-side validation failure → inline field errors + a general form-level error summary; network/server failure on submit → `contact_form_submit_fail` event + a visible retry-safe error message (never a silent failure) |
| Acceptance criteria | Success confirmation never claims delivery to a CRM/inbox that doesn't exist yet — copy matches PRODUCT.md §21's "no claim of lead delivery without a real pipeline" rule exactly, scoped to what TECHNICAL-ARCHITECTURE.md §20 actually guarantees (internal `Leads` persistence, not external delivery); budget-range field renders as optional/hidden gracefully if `budgetRangeOptions` is empty |
| Source reference | PRODUCT.md §18.7, §21, §22; DESIGN.md §18.12–§18.14, §28.1; Phase-02 prompt §26 |

---

## 16. Privacy Page (`/privacy`)

| Field | Specification |
|---|---|
| Section ID | PRIVACY-01 |
| Page | `/privacy` |
| Business purpose | Legal compliance for any page that collects personal data (the contact form) (PRODUCT.md §18.8) |
| Visual direction | Minimal editorial legal document, readable typography — no 3D, no decorative particles, no unnecessary animations (Phase-02 prompt §27) |
| Desktop layout | Single-column readable document, generous line-length control (`type.en.body-lg` max-width per DESIGN.md §6.1) |
| Tablet layout | Same, narrower max-width |
| Mobile layout | Same, full-width within mobile margins |
| Background | `color.bg.page` |
| Typography | `type.en.h1` page title, `type.en.h3` section headings (Data Collected / Purpose / Retention / Third Parties / Data Requests / Contact Method), `type.en.body` body text |
| Spacing | `space.6` between legal sections |
| Components | Rich-text renderer only — no interactive components |
| Styling | Tailwind typographic defaults (prose-equivalent styling respecting DESIGN.md §6/§7 tokens, not a generic un-themed "prose" class) |
| Libraries | None — static rich text (Payload Lexical render) |
| Animation | None |
| Interaction | A single contact-method link for data-subject requests |
| RTL | Standard RTL paragraph flow, max line-length per DESIGN.md §7.2 (`type.ar.body` 58ch) |
| LTR | Standard, 62–70ch max-width (DESIGN.md §6.1) |
| CMS source | `pages` collection, record with `slug: privacy` |
| CMS fields | `title`, `body` (richText), `lastReviewedAt`, `seo`, `status` (CMS-SCHEMAS.md §8) |
| Media | None |
| SEO | Indexable, standard metadata; no structured data |
| Accessibility | Standard heading hierarchy within the rich text, sufficient contrast, no motion |
| Performance | Trivial — static text |
| Analytics | None |
| Empty state | N/A — page is not published until real legal text exists (CMS-SCHEMAS.md §8/§24 draft/published gate) |
| Error state | N/A |
| Acceptance criteria | **Page does not go live with invented legal terms** — `body` field remains in `draft` status until counsel/owner-approved text is supplied (PRODUCT.md §18.8/§33/§34 🔴 hard rule) |
| Source reference | PRODUCT.md §18.8, §33–§34; Phase-02 prompt §27 |

---

## 17. 404 Page

| Field | Specification |
|---|---|
| Section ID | NOTFOUND-01 |
| Page | `/[locale]/*` (catch-all, locale-aware) |
| Business purpose | Graceful recovery from a broken/unknown link without losing the visitor (PRODUCT.md §18.9) |
| Visual direction | Dark background, large editorial headline, short supporting text, two links — no 3D, no unnecessary libraries (Phase-02 prompt §28) |
| Desktop layout | Centered single-column message block |
| Tablet layout | Same |
| Mobile layout | Same, full-width within mobile margins |
| Background | `color.bg.page` |
| Typography | `type.en.h1`/`type.ar.h1` headline, `type.en.body` supporting text |
| Spacing | `space.8` vertical centering padding |
| Components | DESIGN.md §18.21 404 Page, §18.6 Text Link ×2 |
| Styling | CSS only |
| Libraries | None |
| Animation | None (DESIGN.md §18.21's explicit "keeps this error path lightweight") |
| Interaction | "Back to Home" and "Contact" links |
| RTL | Standard logical layout |
| LTR | Standard |
| CMS source | None — static, hard-coded copy (per DESIGN.md §18.21's "no 3D/particle asset," implying minimal/no CMS dependency so the error page can render even if the CMS connection itself is the failure) |
| CMS fields | N/A by design |
| Media | None |
| SEO | Returns a true HTTP 404 status (not a 200 "soft 404"); excluded from sitemap (TECHNICAL-ARCHITECTURE.md §22) |
| Accessibility | Standard heading/link semantics |
| Performance | Fastest-loading page on the site by design |
| Analytics | Not separately tracked at MVP — SPECIFICATION GAP: no 404-tracking event name locked in PRODUCT.md §29; recommend one at implementation if 404 monitoring is desired |
| Empty state | N/A — this page *is* the empty/not-found state for every other route |
| Error state | N/A — it is itself the error state |
| Acceptance criteria | Renders correctly even if Payload/the database is unreachable (since it has no CMS dependency); correct `lang`/`dir` for the attempted locale segment, falling back to `en` if the locale segment itself is unrecognized (PRODUCT.md §14) |
| Source reference | PRODUCT.md §18.9, §14; DESIGN.md §18.21; Phase-02 prompt §28 |

---

## 18. Global Loading States

| Context | Behavior |
|---|---|
| Route-level navigation (App Router `loading.tsx`) | DESIGN.md §18.19 skeleton pattern — `color.surface.tinted` blocks matching the real layout shape, slow 1.5s opacity pulse, never a spinner for full-page loads |
| Contact form submission | Submit button enters its `loading` state (DESIGN.md §18.4 — spinner replaces label, width locked, no layout shift) |
| Portfolio archive filter change (server-side, prompt §24) | Brief skeleton state on the archive grid only, header/footer/hero remain static (no full-page reload flash) |
| 3D/particle canvas mount (desktop) | Static fallback frame shown immediately, WebGL scene replaces it once loaded — never a blank canvas during load (DESIGN.md §13/§14) |

---

## 19. Global Error States

| Context | Behavior |
|---|---|
| Unknown route | 404 (§17) |
| Payload/DB unavailable for a content page | Render the page shell with the generic "content temporarily unavailable" fallback per-section (each section's "Error state" row above specifies its own graceful degradation, e.g. Header's fixed 5-item fallback, §4) — never a blank white screen or an unhandled Next.js error boundary shown to a visitor |
| Contact-form server validation/network failure | Inline + form-level error message, `contact_form_submit_fail` event, form state preserved (not cleared) so the visitor doesn't retype everything |
| WebGL context failure (hero/particle canvas) | Immediate fallback to static asset (§6.1/§6.4) |
| Unhandled client exception | Caught by `@sentry/nextjs` (TECHNICAL-ARCHITECTURE.md §31); user-facing Next.js error boundary should still present an on-brand minimal message, not a raw stack trace — exact copy is a content task deferred to implementation, not invented here |

---

## 20. Responsive Matrix

Cross-reference to DESIGN.md §30's breakpoint table (320/360/390/430/768/1024/1280/1440/1920px) — every page specified in §6–§17 above inherits that table directly; this section exists per the prompt's required structure as a pointer, not a duplicate, consistent with the no-duplication convention used throughout DESIGN.md itself.

| Page | Breakpoint-specific note beyond the global matrix |
|---|---|
| Homepage hero (HOME-01) | 3D sculpture only at ≥768px (DESIGN.md §13) |
| Systems in Motion (HOME-04) | WebGL particle canvas only at ≥768px (DESIGN.md §14) |
| Service detail diagram | Vertical-stack fallback <768px (DESIGN.md §15) |
| Portfolio archive filtering | Filter UI presence is content-driven (≥6 projects), not breakpoint-driven, but filter *layout* still follows the standard grid matrix |
| Contact form | Full-width fields at every breakpoint, no multi-column form layout even on desktop (DESIGN.md §18.12's clarity-first rule) |

---

## 21. RTL/LTR Matrix

Cross-reference to DESIGN.md §11–§12 (layout architecture), §25 (motion mirroring table), §12.1 (icon mirroring), §38–§39 (QA checklists). Per-page directional notes already embedded in each section's RTL/LTR rows above (§6–§17); the one cross-page rule worth restating centrally: **the Digital Architecture diagram (service pages §8–§10, and its background-weight use on HOME-05/HOME-06-adjacent process content) is the only visual system whose *flow*, not just its *layout*, mirrors between locales** — every other motion/visual system either always mirrors (layout-bound) or never mirrors (time-based/physical), per DESIGN.md §25's decision table.

---

## 22. Motion Matrix

| Page/section | Motion system(s) used | None used elsewhere on this page? |
|---|---|---|
| Homepage | Signature 3D (01 only), Particle Intelligence (04 only), restrained Digital Architecture texture (05 only), GSAP scroll-reveals (all sections) | ✅ confirmed no two consecutive sections share a heavy system (DESIGN.md §27 table) |
| Services archive | Restrained Digital Architecture texture (03 only) | ✅ |
| Service detail (×3) | Full interactive Digital Architecture diagram (04 only) | ✅ — no 3D/particles on these pages |
| About | GSAP reveals only, no 3D/particles/diagrams | ✅ |
| Process | SVG timeline + GSAP ScrollTrigger only | ✅ |
| Portfolio archive | GSAP reveals + image hover scale only | ✅ |
| Single portfolio | GSAP reveals + Embla (galleries only, conditional) | ✅ — real imagery carries the visual weight, no generative system |
| Contact | Minimal — field focus/validation transitions only | ✅ "quietest page" |
| Privacy / 404 | None | ✅ |

This table operationalizes DESIGN.md §4 Principle 2 ("one signature moment per section, not five") across the entire site, not just the homepage.

---

## 23. Media Asset Matrix

| Asset | Required for which page(s) | Status |
|---|---|---|
| Signature 3D sculpture (+ mobile fallback, AR recomposition) | Homepage HOME-01 | 🔴 pending production (DESIGN.md §28.2) |
| Particle Intelligence system (+ mobile fallback) | Homepage HOME-04 | 🔴 pending production |
| Digital Architecture diagram template | Homepage HOME-05 (background-weight), all 3 service detail pages (full interactive) | 🔴 pending production — one diagram instance per service, same template |
| Process timeline SVG | Homepage HOME-06, `/process` | 🔴 pending production |
| Custom icon set | Global (header, buttons, forms) | 🔴 pending production |
| Final logo/wordmark | Global (header, footer) | 🔴 pending — interim typographic lockup (DESIGN.md §18.3) |
| Real/demo project screenshots | `/work`, `/work/[slug]`, Homepage HOME-02 | 🔴 pending — at least 1 required before launch (PRODUCT.md §23/§25) |
| OG share images (per locale) | All routes' metadata | 🔴 pending production |
| Favicon/app icons | Global | 🔴 pending production |

Identical to DESIGN.md §28.2 — restated here mapped explicitly to the pages that consume each asset, which DESIGN.md's version does not do.

---

## 24. Section-to-Library Matrix

| Library | Used in |
|---|---|
| React Three Fiber + Drei | HOME-01, HOME-04 only (ADR-004) |
| GSAP + `@gsap/react` + ScrollTrigger | Every page's scroll-reveal entrances; HOME-04's stage transitions; HOME-06/`/process` timeline progress |
| Embla Carousel | Single-portfolio galleries only, conditionally loaded |
| React Hook Form + Zod + `@hookform/resolvers` | `/contact` only |
| `next/image` | Every page with real imagery (HOME-02, `/work`, `/work/[slug]`) |
| Radix UI (selective) | Any dialog/accordion if implemented (DESIGN.md §18.11/§18.16) — not required at MVP since no FAQ/accordion content is currently specified on any MVP page |
| Lucide React (selective, non-branded icons only) | Utility icons (chevrons where not covered by the custom icon set, close/menu icons) across global chrome |

---

## 25. Section-to-CMS Matrix

Consolidated from each section's "CMS source"/"CMS fields" rows in §4–§17 — see CMS-SCHEMAS.md §2–§3 for the authoritative collection/global inventory this matrix draws from. No new CMS structure is introduced in this section; it exists as the required cross-reference per prompt §42 item 25.

---

## 26. SEO Matrix

| Page | Primary buyer-intent target (illustrative, unresearched per PRODUCT.md §27) |
|---|---|
| Homepage | "custom software engineering company," "AI automation agency MENA" |
| `/services/custom-software` | "custom software development company Egypt" |
| `/services/enterprise-solutions` | "ERP integration partner," "enterprise software engineering firm" |
| `/services/ai-agents-automation` | "AI automation agency," "business process automation company" |
| `/work`, `/work/[slug]` | Project/case-study-specific long-tail, not keyword-targeted at MVP (proof content, not SEO content, per PRODUCT.md §24) |
| `/about`, `/process` | Low SEO priority, trust/credibility-first pages |
| `/contact` | Not SEO-targeted — high-intent conversion page |

Full `hreflang`/sitemap/structured-data mechanics are specified in TECHNICAL-ARCHITECTURE.md §22, not repeated here.

---

## 27. Analytics Matrix

Consolidated list, all sourced from PRODUCT.md §29 (none invented beyond the two SPECIFICATION GAPs explicitly flagged in §6.4/§6.8/§17 above):

`hero_cta_primary_click`, `hero_cta_secondary_click`, `nav_cta_click`, `service_page_cta_click` (tagged per pillar), `work_card_click` (tagged per classification), `contact_form_start`, `contact_form_field_error`, `contact_form_submit_success`, `contact_form_submit_fail`, `language_switch`, `discovery_call_click`.

**Flagged gaps (not silently filled):** no locked event name exists for (a) Systems-in-Motion manual stage-navigation clicks, (b) a final-CTA-specific event distinct from the hero's, (c) 404-page tracking. All three are reasonable, low-risk extensions to propose at implementation, but this document does not invent them as if already approved.

---

## 28. Accessibility Matrix

| Requirement | Verified present in which sections |
|---|---|
| One `<h1>` per page | Every page spec above names its single `<h1>`-bearing section (always section 01 of that page) |
| Non-visual equivalent for every generative visual system | HOME-01 (`heroAccessibilityDescription`), HOME-04 (`stageAccessibilityText` ×3, real DOM text), service-page diagrams (`diagramDescription`) |
| `aria-live` validation | `/contact` only (the only form on the MVP site) |
| Reduced-motion fallback | HOME-01, HOME-04 explicitly; all GSAP-driven reveals site-wide degrade to instant-appear under `prefers-reduced-motion` (DESIGN.md §32) |
| Keyboard-navigable diagram | Service detail pages (§8–§10), full interactive version; HOME-05's background-weight diagram is decorative-only and not independently keyboard-focusable (it duplicates no unique information not already in the section's text) |
| Label-above-field forms | `/contact` only |

---

## 29. Acceptance Criteria

Phase 02 documentation is complete when:
- [x] Every MVP route from PRODUCT.md §16 has a full page blueprint in this document (§6–§17).
- [x] Every homepage section (HOME-01–08) uses the complete 29-field template with no field skipped (§6).
- [x] The three service-detail pages share one documented template per the prompt's own instruction, with content deltas explicit rather than silently assumed identical (§8–§10).
- [x] Every cross-page matrix required by prompt §42 items 20–28 exists (§20–§28).
- [x] No section specification uses a vague phrase ("modern," "premium feel," "as needed") — every cell cites a concrete token, component, or PRODUCT.md/DESIGN.md section (spot-checked across §6–§17).
- [x] Every genuine missing decision is marked **SPECIFICATION GAP — OWNER APPROVAL REQUIRED** or cross-referenced to an existing PRODUCT.md §34 row, never silently invented (flagged instances: footer background token choice §5, HOME-05 CTA destination §6.5, HOME-06 "see full process" link §6.6, HOME-07 body typography token §6.7, final-CTA/stage-nav/404 analytics event names §6.4/§6.8/§17/§27).
- [x] No application code, components, or CSS files were created.

---

## 30. Owner Approval Requirements

In addition to PRODUCT.md §34 and TECHNICAL-ARCHITECTURE.md §33 (not repeated here), this document surfaces the following **documentation-mechanics** items that need a design/content decision before implementation, distinct from "real-world business input" gaps:

| Item | Where flagged | Recommended default if no response |
|---|---|---|
| Footer background token (`color.bg.page` vs. `color.bg.section.tinted`) | §5 | `color.bg.page` |
| HOME-05 engineering CTA destination (`/contact` vs. `/process`) | §6.5 | `/contact` (matches global CTA hierarchy, PRODUCT.md §20) |
| HOME-06 "see full process" link-through | §6.6 | Add it, for internal-linking consistency |
| HOME-07 manifesto body typography token | §6.7 | `type.en.h1`/`type.ar.h1` |
| Final-CTA-distinct analytics event names | §6.8/§27 | `final_cta_primary_click` / `final_cta_secondary_click` |
| Systems-in-Motion stage-navigation event name | §6.4/§27 | `systems_in_motion_stage_click` |
| 404-page tracking event | §17/§27 | `404_page_view` (if 404 monitoring is desired at all — optional) |

No implementation should silently resolve these without a sign-off step; they are listed here specifically so that step has a concrete checklist to work from.

---

## 31. Visual Completeness Addendum — Phase 03

Added during the Phase 03 audit pass alongside DESIGN.md §5.5/§13.1/§18.22/§24.6/§42, TECHNICAL-ARCHITECTURE.md §35–§36, and the three new companion files: [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md), [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md), [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md). This section strengthens every section instance in §6–§17 against the "large empty sections," "poorly distributed visual weight," and "sections resembling unfinished wireframes" failure modes, without adding decoration to sections that are intentionally minimal.

### 31.1 Density classification (applies to every section ID in §6–§17)

Every section is one of three density classes. The class determines what "visually complete" means for that section — a **Quiet** section with bare typography on a treated background (DESIGN.md §5.5) is correct and complete; the same treatment on a **Rich** section would be a defect.

| Class | Definition | Completeness bar |
|---|---|---|
| **Rich** | Contains a real/generated image, 3D scene, particle system, or interactive diagram as its focal element | The asset must be present (or its approved interim fallback, DESIGN.md §42.2) and visible in the fold — never a reserved empty space waiting for an asset that isn't there |
| **Structured-minimal** | Typography-led, but uses the oversized-numeral/micro-detail device (DESIGN.md §18.22) or a surface treatment (DESIGN.md §5.5) as its textural anchor | The micro-detail device must be present; bare text alone on a flat background fails this class |
| **Quiet** | Deliberately minimal by design intent — negative space *is* the content (DESIGN.md Principle 4) | No added decoration required; the acceptance test is subjective ("reads as a deliberate pause, not a loading gap") via the human-review gate, VISUAL-QUALITY-GATES.md §4 |

| Section ID(s) | Class | Focal point |
|---|---|---|
| GLOBAL-HEADER | Structured-minimal | Logo + active-route underline |
| GLOBAL-FOOTER | Quiet | Mission one-liner (brand close) |
| HOME-01 | Rich | Sculpture + headline cluster (DESIGN.md §13.1) |
| HOME-02 | Rich | Featured project image |
| HOME-03 | Structured-minimal | Largest oversized numeral + its service row (DESIGN.md §18.22) |
| HOME-04 | Rich, **deep-cobalt** | Particle canvas — one of exactly two deliberate dark sections on the homepage (DESIGN.md §27, §5.2) |
| HOME-05 | Structured-minimal | Headline + background-weight diagram |
| HOME-06 | Structured-minimal | Timeline numeral/marker (DESIGN.md §18.22) |
| HOME-07 | Quiet | Manifesto headline — intentionally the quietest section on the page |
| HOME-08 | Rich (CTA-anchored), **deep-cobalt** | Headline + inverted CTA on `color.bg.section.dark` — the second and last deliberate dark section (DESIGN.md §27, §5.2) |
| SERVICES-ARCHIVE-01/04 | Structured-minimal / Rich (CTA-anchored) | Hero statement / CTA band |
| SERVICES-ARCHIVE-02 | Structured-minimal | Same device as HOME-03 |
| SERVICES-ARCHIVE-03 | Structured-minimal | Diagram texture, same treatment as HOME-05 |
| SVC-TEMPLATE-01/05/07 | Structured-minimal / Structured-minimal / Rich (CTA-anchored) | Hero statement / approach statement / CTA band |
| SVC-TEMPLATE-02/03 | Structured-minimal | Numbered problem/deliverable rows (DESIGN.md §18.22) |
| SVC-TEMPLATE-04 | Rich | Full interactive Digital Architecture diagram |
| SVC-TEMPLATE-06 | Rich (conditional — hidden if empty) | Related-work card image |
| ABOUT-01/08 | Structured-minimal / Rich (CTA-anchored) | Hero statement / CTA band |
| ABOUT-02–06 | Quiet | Editorial text blocks — intentional, per Phase-02 prompt §22's "premium editorial storytelling" framing |
| ABOUT-07 | Rich (conditional — omitted entirely if empty) | Team portrait grid |
| PROCESS-01/05 | Structured-minimal / Rich (CTA-anchored) | Hero statement / CTA band |
| PROCESS-02/03 | Structured-minimal | Timeline numeral device (DESIGN.md §18.22) |
| PROCESS-04 | Quiet | Quality-principles list |
| WORK-ARCHIVE-01/04 | Structured-minimal / Rich (CTA-anchored) | Hero statement / CTA band |
| WORK-ARCHIVE-02/03 | Rich | Featured/archive project imagery |
| PORTFOLIO-SINGLE-01 | Rich | Hero project media |
| PORTFOLIO-SINGLE-02/03/04/06 | Quiet | Narrative text blocks (overview/challenge/solution/engineering decisions) — editorial prose is the correct texture here, not added decoration |
| PORTFOLIO-SINGLE-05/07/08/10 | Rich (all conditional — omitted if empty) | Gallery media / tech-stack list / outcomes / next-project card |
| PORTFOLIO-SINGLE-09/11 | Quiet / Rich (CTA-anchored) | Related-services links / CTA band |
| CONTACT-01/04 | Quiet | Hero statement / reassurance text |
| CONTACT-02 | Structured-minimal | The form itself — field rhythm and label hierarchy are the composition, no decoration added (DESIGN.md §18.12) |
| CONTACT-03 | Quiet (conditional — hidden if empty) | Contact methods list |
| PRIVACY-01 | Quiet | Legal document body — intentionally undecorated |
| NOTFOUND-01 | Quiet | Error message — intentionally undecorated, fastest/lightest page by design |

### 31.2 Visual Prototype Gate — section mapping

Operationalizes VISUAL-QUALITY-GATES.md §5's required prototype component list against this document's actual section IDs, so the prototype checkpoint is concrete rather than abstract:

| Prototype requirement | Section ID used |
|---|---|
| Global header | GLOBAL-HEADER |
| Homepage hero | HOME-01 |
| One media-rich section | HOME-02 (or SVC-TEMPLATE-06 if HOME-02's featured project isn't ready) |
| One typography-led section | HOME-03 (exercises the oversized-numeral device, DESIGN.md §18.22) |
| One interactive section | HOME-04 (or SVC-TEMPLATE-04 if particle system isn't ready — the diagram is the lower-risk interactive system to prototype first) |
| Footer | GLOBAL-FOOTER |

No full-page implementation proceeds beyond this six-element prototype until it clears every gate in VISUAL-QUALITY-GATES.md §5, in both locales, at 1440/768/390px.

### 31.3 Blanket acceptance-criteria amendment

Every section's "Acceptance criteria" row in §6–§17 is amended to additionally require: passing the Section Completeness Gate (VISUAL-QUALITY-GATES.md §4) for its assigned density class above. This is stated once, here, rather than rewritten into all ~55 existing table rows individually.
