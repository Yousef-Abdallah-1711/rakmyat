# RAKMYAT — VISUAL-ASSET-MATRIX.md
### Phase 03 — Asset Readiness & Fallback Matrix

**Status:** Documentation only. No assets were generated in producing this document; this is the planning matrix the Phase 03 brief's §6/§11 deliverable requires before any generation happens.
**Companion documents:** [DESIGN.md](./DESIGN.md) §42 (generation authorization) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) §23/§31 · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) §35 · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md) §9.1 · [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md) §3
**How to use this matrix:** before building any section in PAGE-BLUEPRINTS.md §6–§17, find its asset(s) here. "Status" tells you whether a final asset exists; "Fallback" tells you exactly what to build/generate if it does not. **A row with status "Pending" is never skipped — its Fallback column is the current instruction, not a placeholder for later.**

---

## 1. Matrix Legend

| Column | Meaning |
|---|---|
| Asset | Named deliverable |
| Used in | Section ID(s), PAGE-BLUEPRINTS.md §6–§17 |
| Creation method | Per DESIGN.md §42.1 — `procedural-3d`, `procedural-particle`, `custom-svg`, `ai-generated`, `css-construction`, or `owner-supplied` |
| Target spec | Dimensions/format/performance ceiling |
| Status | `Final — approved` / `Pending` |
| Fallback (if Pending) | The exact interim asset to build now, per DESIGN.md §42.2 |
| Mobile behavior | What ships below 768px |
| Provenance tag | The `media.provenance` value this asset will carry (CMS-SCHEMAS.md §9.1) |
| Owner dependency | What, if anything, still needs owner input before "Final" is possible |

---

## 2. Signature Sculptural 3D (Hero)

| Field | Value |
|---|---|
| Used in | HOME-01 |
| Creation method | `procedural-3d` — built as Three.js/R3F geometry, materials (cobalt enamel, polished ceramic, brushed metal, matte porcelain composite, translucent cobalt glass), and a studio-plus-cast-shadow lighting rig in code, per DESIGN.md §13/§13.1 (Phase 03B: materials/lighting rebuilt for the porcelain canvas) |
| Target spec | ≤1.5MB WebGL payload (model+textures), desktop only (≥768px) |
| Status | Pending |
| Fallback | Build the faceted polyhedral form directly as procedural R3F geometry per §13's shape-language rule — this **is** the first production pass, not a lesser placeholder, since §13 already specifies the asset as code-constructible; it becomes "Final" once it clears DESIGN.md §13.1's Disconnection Test and the Visual Prototype Gate |
| Mobile behavior | Pre-rendered static image or short video loop of the same scene (DESIGN.md §13) — captured from the procedural build via an offline render pass, not a separately-modeled asset |
| Provenance tag | `procedural` |
| Owner dependency | None technically blocking production; owner review happens at the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5), not before |

### 2.1 Arabic recomposition variant

| Field | Value |
|---|---|
| Used in | HOME-01 (`/ar` route) |
| Creation method | `procedural-3d` — same geometry/material asset, re-aimed light rig and repositioned per DESIGN.md §13's explicit "recompose, never mirror" rule |
| Status | Pending (depends on §2's base asset existing first) |
| Fallback | Same procedural build, second camera/light configuration — not a second modeled asset |
| Owner dependency | None additional |

---

## 3. Particle Intelligence System

| Field | Value |
|---|---|
| Used in | HOME-04 |
| Creation method | `procedural-particle` — Three.js/Canvas particle simulation per DESIGN.md §14's three-stage color/density/motion spec |
| Target spec | ≤400KB desktop WebGL payload, desktop only (≥768px) |
| Status | Pending |
| Fallback | Build the three-stage simulation directly (fragmented → connected → automated) as the production asset; if performance budget is at risk on first pass, ship a reduced-density version (150–250 particles, DESIGN.md §14) as the interim and tune upward only if budget allows |
| Mobile behavior | Pre-baked animated sprite sheet or capped Canvas2D (≤250 particles) per DESIGN.md §14 |
| Provenance tag | `procedural` |
| Owner dependency | None |

---

## 4. Digital Architecture Diagram Template

| Field | Value |
|---|---|
| Used in | HOME-05 (background-weight), SVC-TEMPLATE-04 ×3 (full interactive — custom-software/enterprise-solutions/ai-agents-automation) |
| Creation method | `custom-svg` — hand-constructed or code-generated SVG per DESIGN.md §15's isometric module/connection-line spec |
| Target spec | Lightweight SVG, isometric 30°/30° projection, consistent module/line styling across all 4 instances (1 shared template + 3 content-swapped copies) |
| Status | Pending |
| Fallback | Build the template first (modules, connection lines, label positions) with placeholder module labels reading each service's actual content once `services` records exist — this is the production asset, not a stand-in |
| Mobile behavior | Simplifies to vertical stacked flow or a static image with equivalent alt text (DESIGN.md §15) |
| Provenance tag | `custom-svg` → maps to `procedural` in the `provenance` enum (CMS-SCHEMAS.md §9.1 does not have a separate SVG value; `procedural` covers code-constructed SVG) |
| Owner dependency | Content accuracy depends on `services` collection content being finalized (PRODUCT.md §8) — the diagram's visual template itself has no owner dependency |

---

## 5. Process Timeline (SVG)

| Field | Value |
|---|---|
| Used in | HOME-06, PROCESS-02/03 |
| Creation method | `custom-svg` + the oversized-numeral typography device (DESIGN.md §18.22 — not an image asset, a type/opacity spec) |
| Target spec | Lightweight SVG connector line + CSS/typography numerals |
| Status | Pending (SVG connector), N/A (numeral device requires no asset production, only implementation) |
| Fallback | Build the connector line directly; the numeral device has no fallback state — it is implemented once, correctly, from DESIGN.md §18.22's spec |
| Mobile behavior | Vertical timeline, same connector asset reflowed |
| Provenance tag | `procedural` |
| Owner dependency | None — six-stage content is already locked (PRODUCT.md §17.6) |

---

## 6. Custom Icon Set

| Field | Value |
|---|---|
| Used in | Global (header, buttons, forms, nav) — DESIGN.md §17 |
| Creation method | `custom-svg`, geometric/monoline 1.5px stroke at 24px base |
| Target spec | Per DESIGN.md §17 — single consistent style, directional-mirroring rules per §12.1 |
| Status | Pending |
| Fallback | Build the minimum required set first: chevron (directional), close (✕), menu (hamburger), check, play/pause, back/forward arrow, carousel arrow, language-switcher indicator — expand only as new components require a new icon, never speculatively |
| Mobile behavior | Same SVGs, no separate mobile variant needed |
| Provenance tag | `procedural` |
| Owner dependency | None |

---

## 7. Final Logo / Wordmark

| Field | Value |
|---|---|
| Used in | GLOBAL-HEADER, GLOBAL-FOOTER |
| Creation method | `owner-supplied` (final) / `custom-svg` (interim typographic lockup) |
| Target spec | SVG, works at header height (88px/72px) and footer scale |
| Status | Pending — **this is the one asset in this matrix not authorized for agent-generation as final**, since a brand's primary mark is a identity decision, not a decorative asset (DESIGN.md §42.1's authorization covers decorative/structural/conceptual assets, not the brand mark itself) |
| Fallback | Interim typographic lockup — "Rakmyat"/"رقميات" in Space Grotesk/IBM Plex Sans Arabic at weight 600, no icon mark, per DESIGN.md §18.3 — ships as the working asset until a final logo is approved |
| Mobile behavior | Same SVG, scaled |
| Provenance tag | `original-production` once final; the interim lockup tags as `procedural` |
| Owner dependency | 🔴 Final logo/wordmark approval (PRODUCT.md §34) — the only hard blocker in this entire matrix that this document does not attempt to route around |

---

## 8. Real/Demo Project Screenshots

| Field | Value |
|---|---|
| Used in | HOME-02, WORK-ARCHIVE-02/03, PORTFOLIO-SINGLE-01/05 |
| Creation method | `client-supplied` (Real Client Project) / `owner-supplied` or agent-built (Internal Product, Concept/Demo — PRODUCT.md §25 authorizes building genuine internal demo projects) |
| Target spec | 16:10 hero, 4:3 detail, DESIGN.md §16's color-grading/cropping rules |
| Status | Pending — zero approved projects exist at time of writing (PRODUCT.md §23/§34 🔴) |
| Fallback | **Not a visual fallback — a content fallback:** PAGE-BLUEPRINTS.md §6.2/§13's honest empty state ("Selected work is in progress...") ships instead of any placeholder image. This is the one asset category where the correct "fallback" is *showing less*, not generating a substitute visual, because a generated image presented as a project screenshot would violate DESIGN.md §42.3's authenticity carve-out |
| Mobile behavior | N/A while empty-state is active |
| Provenance tag | `client-supplied` (real) / `procedural` or `ai-generated` (if the agent builds a genuine labeled demo project per PRODUCT.md §25) / N/A while empty |
| Owner dependency | 🔴 At least one approved project (any classification) — PRODUCT.md §34. Agent may proactively build one labeled Concept/Demo project to avoid shipping with an empty portfolio, per PRODUCT.md §25's explicit authorization — this is a content/engineering task, not a pure visual-asset task, flagged here for cross-reference only |

---

## 9. OG Share Images

| Field | Value |
|---|---|
| Used in | All routes' metadata (TECHNICAL-ARCHITECTURE.md §22) |
| Creation method | `css-construction` (programmatic — e.g. Next.js `ImageResponse`/`opengraph-image` convention compositing headline text over a brand-token background) or `ai-generated` background texture composited the same way |
| Target spec | 1200×630px, one per locale minimum (headline text differs) |
| Status | Pending |
| Fallback | Build the programmatic template first (brand background + page-title overlay) — this is the production method, not a stopgap, since social-share images are inherently generated-per-page rather than hand-designed one at a time |
| Mobile behavior | N/A (OG images aren't responsive) |
| Provenance tag | `procedural` |
| Owner dependency | None |

---

## 10. Favicon / App Icons

| Field | Value |
|---|---|
| Used in | Global |
| Creation method | `custom-svg`, derived from the logo (§7) — interim lockup version until final logo exists |
| Target spec | Standard favicon/app-icon size set |
| Status | Pending, blocked on §7's interim/final logo decision |
| Fallback | Simple monogram/wordmark-initial treatment derived from the interim typographic lockup |
| Mobile behavior | Standard app-icon sizes for home-screen/PWA contexts |
| Provenance tag | `procedural` |
| Owner dependency | Same as §7 |

---

## 11. Surface Treatments (Backgrounds)

| Field | Value |
|---|---|
| Used in | Every section, per DESIGN.md §5.5 |
| Creation method | `css-construction` — gradient/noise/vignette are CSS or inline-SVG-filter constructs, not image files |
| Target spec | ≤4% opacity noise, ≤6% lightness-delta gradients, per DESIGN.md §5.5 |
| Status | Pending (no asset file — this is a CSS pattern to implement once and reuse as a token/utility) |
| Fallback | N/A — this is the production method, applied directly |
| Mobile behavior | Identical, no separate mobile asset |
| Provenance tag | `procedural` |
| Owner dependency | None |

---

## 12. Oversized Numeral Device

| Field | Value |
|---|---|
| Used in | HOME-03, HOME-06, PROCESS-02/03, SVC-TEMPLATE-02/03, SERVICES-ARCHIVE-02 (every Structured-minimal section per PAGE-BLUEPRINTS.md §31.1) |
| Creation method | Typography (DESIGN.md §18.22) — not a visual asset at all, included here for completeness since it is the primary device preventing "unfinished wireframe" perception on these sections |
| Status | N/A — implemented directly from the token spec, no production step |
| Owner dependency | None |

---

## 13. Hero Mobile Static/Video Fallback

Covered under §2 (produced as an offline render of the procedural 3D scene, not a separate asset).

---

## 14. Matrix Summary — Owner-Blocking Items

Of the 12 asset categories above, **exactly one** (§7, Final Logo/Wordmark) has a real owner-approval dependency that this document cannot route around with agent-generation, consistent with DESIGN.md §42.1 excluding the brand mark itself from generation authorization. Every other category has either a zero-dependency production path (build it directly, it IS the asset) or a content-dependency already logged elsewhere (§8's project-screenshot gap, tracked in PRODUCT.md §23/§34, not duplicated as a separate blocker here).

---

## 15. Phase 03B Asset Migration Audit — Navy/Cyan/Obsidian → Cobalt Blue & Porcelain

Per [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md). **Governing fact that shapes this entire audit:** every asset category in §2–§13 was still `Pending` (never produced) at the time of this migration — this document's own §14 summary already confirms nothing had been generated. That means there is, in the literal sense the brief asks about, **nothing to regenerate** — there is no existing dark-navy-background asset sitting in the project that now looks wrong on porcelain. What this audit actually does, honestly, is confirm that every category's *specification* (not an instance) was reviewed and updated where the palette change affected it, so that if any asset *had* been produced under the old identity, this table shows exactly what would have been required.

| Asset category | Was the spec dark-background-dependent? | Action taken | Would a pre-existing asset need regeneration, material redesign, lighting adjustment, background removal, color adaptation, contrast correction, or a new fallback? |
|---|---|---|---|
| §2 Signature 3D Sculpture | Yes — materials (dark chrome, black glass, graphite, translucent cyan glass) and lighting (single rim light in darkness) were built specifically for a dark canvas | **Updated** — materials rebuilt to cobalt enamel/polished ceramic/brushed metal/porcelain composite/translucent cobalt glass; lighting rebuilt to a studio rig + cast shadow (DESIGN.md §13) | Would require full **material redesign + lighting adjustment** — the old rim-light-in-darkness approach does not merely need a color swap, it needs a different lighting *model* entirely, which is exactly what DESIGN.md §13 now specifies |
| §3 Particle Intelligence | No — this system was always self-illuminating and needs a dark backdrop to read correctly; it simply moved from being one of many dark sections to being one of exactly two deliberate ones | **No change to the asset spec itself** — only the surrounding page's background assignment changed (DESIGN.md §27) | No change required |
| §4 Digital Architecture Diagram | Yes — the old spec rendered dark panel modules with cyan connection lines | **Updated** — rebuilt as a light "blueprint" aesthetic (white/pale-blue modules, cobalt lines, DESIGN.md §15) | Would require **color adaptation** (module fills, line color) — structurally the same diagram, different palette |
| §5 Process Timeline | No — SVG connector line geometry is palette-neutral; only the token values it references changed | **Token references updated** (cobalt line color) | **Color adaptation** only |
| §6 Custom Icon Set | No — monoline icon geometry is palette-neutral | **Token references updated** (`ink.primary`/`ink.secondary`/`cobalt.signature` instead of the old dark-theme tokens) | **Color adaptation** only |
| §7 Final Logo/Wordmark | No instance exists yet; the interim lockup's color reference updated | **Token reference updated** | **Color adaptation** only, if an interim asset had existed |
| §8 Real/Demo Project Screenshots | Partially — the color-grading direction (§16) shifted from a cool/navy cast to a cool-porcelain cast | **Grading direction updated** (DESIGN.md §16) | Would require **contrast correction** — real screenshots graded for a dark-surrounding page can look muddy on a light one; any screenshot produced before this migration would need its grading re-checked against `color.bg.page`, not regenerated from scratch |
| §9 OG Share Images | Yes — the template's background/text-overlay colors are palette-dependent by nature | **Token references updated** (background now porcelain/cobalt-brand rather than dark) | **Background removal + color adaptation** if a pre-migration template had existed |
| §10 Favicon/App Icons | Depends entirely on §7 | Same status as §7 | Same as §7 |
| §11 Surface Treatments | Yes, structurally — the gradient/noise direction (interpolating between two *dark* tones) is now interpolating between two *light* tones, and the "anchored glow" is now a softer, lower-opacity color-bleed appropriate to an already-bright background | **Fully rebuilt** (DESIGN.md §5.5) | Would require a genuine **lighting adjustment** — the opacity/contrast math for a glow-in-darkness vs. a tint-on-brightness are different enough that this isn't a simple value swap |
| §12 Oversized Numeral Device | Yes — opacity target shifted from "light numeral at 8–12% on dark" to "muted-ink numeral at 6–10% on light" (DESIGN.md §18.22) | **Opacity range adjusted** | **Contrast correction** |
| §13 Hero Mobile Fallback | Covered under §2 | Same as §2 | Same as §2 |

**Conclusion:** had any of these assets existed as produced files before this migration, roughly half the categories (§2, §4, §11) would have needed a genuine rebuild (material/lighting/structural), and the other half would have needed a lighter color/contrast pass. Because none existed yet, the *specifications* alone were corrected, and production proceeds directly against the corrected Cobalt Blue & Porcelain specs in §2–§13 above — there is no legacy dark-themed asset anywhere in this project to clean up.
