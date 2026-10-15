# RAKMYAT — COBALT-PORCELAIN-MIGRATION-REPORT.md
### Phase 03B — Cobalt Blue & Porcelain Design System Migration

**Status:** Documentation only. No application code, components, CSS, or production assets were created.
**Companion documents:** [PRODUCT.md](./PRODUCT.md) (unchanged) · [DESIGN.md](./DESIGN.md) (migrated) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) (migrated) · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) (one reference updated) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md) (unchanged) · [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md) (migrated) · [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) (migrated + new audit section) · [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md) (preserved as historical record, superseded-notice added) · [COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md](./COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md) (new, sibling deliverable)

---

## 1. Executive Summary

The Rakmyat visual identity has been migrated from Navy/Cyan/Obsidian (dark-only) to **Cobalt Blue & Porcelain** (porcelain-first, light by default). This is a comprehensive visual-system migration: the core palette, every semantic color token, the hero sculpture's materials and lighting model, the Digital Architecture diagram's visual language, the homepage's per-section background assignment, and multiple component states were all re-derived from first principles against the new brief — not a find-and-replace of hex values. All business positioning, content, routes, CTAs, portfolio-authenticity rules, localization requirements, and lead-generation requirements in PRODUCT.md are **unchanged**; no conflict between the new visual direction and the existing product scope was found. The homepage keeps its eight sections and their IDs; the route inventory and CMS content relationships are untouched. Two sections (HOME-04 Systems in Motion, HOME-08 Final Conversion) deliberately retain a deep-cobalt dark background — not as a holdover from the old identity, but as the explicitly-authorized "dramatic contrast" moments the new brief calls for, each with its own written justification (§6).

---

## 2. Finalized Palette and Token Decisions

### 2.1 Core brand palette (evaluated, not blindly accepted)

| Token | Hex | Candidate status |
|---|---|---|
| `color.cobalt.signature` | `#2453FF` | Kept as proposed |
| `color.cobalt.deep` | `#1736B8` | Kept as proposed |
| `color.porcelain.base` (→ `color.bg.page`) | `#F7F8FC` | Kept as proposed — **role promoted** from a text/accent color in the old system to the primary site-wide background, which is the central identity shift |
| `color.white.pure` | `#FFFFFF` | Kept as proposed |
| `color.surface.tinted` (→ `color.bg.section.tinted`) | `#EDF2FF` | Kept as proposed ("Soft Blue Surface") |
| `color.surface.tinted.deep` | `#E5ECFF` | Kept as proposed ("Pale Blue Surface"), scope-distinguished from the above by use rather than treated as a duplicate |
| `color.ink.primary` | `#111827` | Kept as proposed ("Dark Ink") |
| `color.ink.secondary` | `#475569` | Kept as proposed ("Secondary Ink") |
| `color.border.hairline` | `#DCE3F1` | Kept as proposed, **scope-restricted** to decorative dividers only (see §2.3) |

### 2.2 Computed contrast ratios (worked by hand against the sRGB relative-luminance formula; flagged for automated-tool re-verification before implementation sign-off, per standard practice for hand-computed values)

| Pairing | Computed ratio | Verdict |
|---|---|---|
| `#111827` (ink.primary) on `#F7F8FC` (bg.page) | ≈16.7:1 | Far exceeds AAA — reserved for headlines, not body copy (too harsh for dense reading) |
| `#475569` (ink.secondary) on `#F7F8FC` (bg.page) | ≈7.1:1 | Clears AAA, the correct default for body copy |
| `#FFFFFF` on `#2453FF` (cta.primary.text on cta.primary.bg) | ≈5.6:1 | Clears AA comfortably |
| `#FFFFFF` on `#1736B8` (white headline on bg.section.dark) | ≈9.3:1 | AAA — confirms the two dark sections are safe for white display type |
| `#2453FF` (cobalt.signature) on `#F7F8FC` (link text on page) | ≈5.3:1 | Clears AA |
| `#DCE3F1` (border.hairline) on `#F7F8FC` | Well under 3:1 | **Fails** WCAG 1.4.11's non-text-contrast floor for UI component boundaries — see §2.3 |

### 2.3 A genuine finding, not a cosmetic swap: the hairline-border candidate needed a second token

Computing the hairline-border candidate's contrast against the porcelain background showed it falls well short of the 3:1 WCAG 1.4.11 requires for interactive UI component boundaries (form fields, focus-adjacent states). Rather than either (a) silently using a non-compliant border on every input field, or (b) darkening the one candidate until decorative dividers become too heavy, a **second token was introduced**: `color.border.interactive` (`#9AACD6`, 🟡 estimated ≥3:1, flagged for automated verification). `color.border.hairline` is now explicitly scoped to non-interactive decorative dividers only. This is the one place in the migration where the brief's instruction to "recalculate contrast... independently" surfaced a real decision beyond the given candidates, and it's logged here rather than silently resolved.

### 2.4 State colors (success/warning/error) were re-derived, not reused

The prior dark-theme state colors (`#4ADE9A` mint green, `#E8C468` amber, `#F2766B` coral) were tuned for legibility *on navy* and would be too light/low-contrast on porcelain. New values were derived for light-background legibility: `#15803D` (success), `#B45309` (warning), `#DC2626` (error) — all deep, saturated tones chosen specifically for AA/AAA performance on `#F7F8FC`/`#FFFFFF`. The old light values are retained as documented "on-dark" variants in case any future component needs to render inside the two dark sections.

---

## 3. Full Change Log

| # | File | Section(s) | Change |
|---|---|---|---|
| 1 | DESIGN.md | Header metadata, §1–§4 | Theme/direction description updated to porcelain-first; added Principle 8 ("dark is the exception, not the default") |
| 2 | DESIGN.md | §5 (full rewrite) | Core palette, extended semantic tokens, usage ratios, contrast table, surface-treatment rules all rebuilt for Cobalt Blue & Porcelain |
| 3 | DESIGN.md | §6.2, §7.3 (new) | Documented that type families/weights/scale are unchanged; only color-role application changed (ink tokens replace porcelain-as-text) |
| 4 | DESIGN.md | §13 (rebuilt), §13.1 (rewritten) | Sculpture materials/lighting rebuilt for a porcelain canvas (studio rig + cast shadow replacing rim-light-in-darkness); Disconnection Test rewritten around grounding/shadow rather than glow-bleed |
| 5 | DESIGN.md | §14 | Reframed as one of exactly two *deliberate* dark sections, with an explicit rationale (self-illuminating particles need a dark backdrop) rather than a leftover default |
| 6 | DESIGN.md | §15 | Rebuilt as a light "blueprint" diagram aesthetic (white/pale-blue modules, cobalt lines) |
| 7 | DESIGN.md | §16–§18 | Imagery grading direction, iconography token references, and every component's color tokens updated throughout |
| 8 | DESIGN.md | §24.3 | Button-hover direction corrected (now deepens toward `cobalt.deep` rather than lightening — the correct light-theme hover direction) |
| 9 | DESIGN.md | §27 (rebuilt) | Homepage background assignment per section — see §6 below |
| 10 | DESIGN.md | §34 (full rewrite) | CSS token block rebuilt; `--shadow-*` promoted to the primary depth mechanism, replacing glow-as-depth |
| 11 | DESIGN.md | §36–§39 | Anti-patterns and QA checklists updated (removed "dark-only" hard rule, added "excessive cobalt fills" and "flat porcelain" anti-patterns, added deep-cobalt-section-count check) |
| 12 | DESIGN.md | §43 (new) | Migration pointer note — this file is now the living spec, history lives here |
| 13 | PAGE-BLUEPRINTS.md | §1 (note added), 11 per-section Background rows, §31 density table | All background-token references updated; HOME-04/HOME-08 explicitly reassigned to `color.bg.section.dark` with rationale; HOME-01's grounding language updated; loading-skeleton token corrected |
| 14 | TECHNICAL-ARCHITECTURE.md | §1 | "dark-only" → "porcelain-first" in the executive summary's one palette-adjacent sentence |
| 15 | CMS-SCHEMAS.md | — | No change — confirmed no palette-dependent content exists in this file |
| 16 | VISUAL-QUALITY-GATES.md | §2 (rewritten) | Color & Surface gate rebuilt for the new palette, including a new "deep-cobalt section discipline" check (exactly 2 of 8) that did not exist under the old all-dark identity; one stray cross-reference fixed |
| 17 | VISUAL-ASSET-MATRIX.md | §2 materials, §15 (new) | Sculpture creation-method materials updated; full per-asset migration audit added, honestly concluding nothing had been produced yet so nothing requires literal regeneration — only specifications were corrected |
| 18 | DESIGN-AUDIT-REPORT.md | Header | Superseded-palette notice added; report body left untouched (historical record preserved, not rewritten) |
| 19 | PRODUCT.md | — | **No change** — read in full, no conflict found with the new visual direction |

---

## 4. File-by-File Modifications (summary)

- **PRODUCT.md:** read in full; zero changes. Business positioning, services, routes, CTAs, portfolio authenticity, localization, lead generation, and launch requirements are all palette-independent and remain exactly as specified.
- **DESIGN.md:** the most heavily changed file — effectively every section that referenced a color token was touched, though section numbers 1–42 and all cross-references were preserved, with a new §43 added for migration provenance.
- **PAGE-BLUEPRINTS.md:** 23 token/background references updated across ~15 targeted edits; the per-section 29-field template structure, all section IDs, and all non-color content (CMS fields, analytics events, accessibility rules, acceptance criteria) are untouched.
- **TECHNICAL-ARCHITECTURE.md:** one sentence updated; the entire technology stack, infrastructure, security, and deployment architecture are untouched (correctly — none of it was palette-dependent).
- **CMS-SCHEMAS.md:** untouched — confirmed, not assumed, via a full-file search for palette-dependent content.
- **VISUAL-QUALITY-GATES.md:** Gate 2 rebuilt; Gates 1, 3, 4, 5, 6 were re-read and confirmed to need no change, since they describe *process* (how to check, when, by whom), which is palette-independent.
- **VISUAL-ASSET-MATRIX.md:** one creation-method description updated; one new section (§15) added for the migration audit itself.
- **DESIGN-AUDIT-REPORT.md:** preserved, superseded-notice added — this is intentional per the instruction not to erase audit history.

---

## 5. Old-to-New Visual Mapping

| Old concept | New concept | Notes |
|---|---|---|
| Obsidian/Navy page background | Porcelain page background | The default surface flips from dark to light |
| Cyan signature accent on dark | Cobalt signature accent on light | Same *role* (brand accent, CTAs, links), different environment |
| Rim-light-in-darkness (hero) | Studio key light + cast shadow + color-bleed reflection (hero) | Not a color swap — a different lighting *model*, because there is no darkness left to rim-light against |
| Dark chrome / black glass / graphite sculptural materials | Cobalt enamel / polished ceramic / brushed metal / porcelain composite / translucent cobalt glass | Full material-palette rebuild |
| "Glow is the depth mechanism" | "Shadow is the depth mechanism" | Light themes read elevation via `shadow.sm/md/lg`, not via a lighter/darker fill |
| Dark panel diagram modules, cyan lines | White/pale-blue "blueprint" modules, cobalt lines | Digital Architecture system rebuilt as a light schematic |
| Every homepage section dark | Six of eight sections light, two deliberately dark | See §6 |
| Button hover lightens | Button hover deepens | Correct light-theme hover direction |

---

## 6. Homepage Section-by-Section Redesign Summary

| # | Section | Old background | New background | Rationale for the new choice |
|---|---|---|---|---|
| 01 | The Statement Hero | Dark navy, rim-lit sculpture | Porcelain, grounded sculpture (cast shadow + color-bleed) | Brief explicitly requires "porcelain architectural canvas" for the hero |
| 02 | Selected Work | Dark navy | Porcelain | Real product imagery is the visual; a neutral light canvas lets screenshots read cleanly without a dark-theme color cast |
| 03 | What We Create | Dark alt-navy | Tinted pale blue | Alternating rhythm tone; oversized numeral device recalibrated for light (§DESIGN.md §18.22) |
| 04 | Systems in Motion | Dark navy | **Deep cobalt (deliberate)** | A self-illuminating particle field genuinely needs a dark backdrop to read as light/energy — this is a real technical/perceptual constraint, not a preference, and is the first of exactly two authorized dark moments |
| 05 | Engineering Behind the Experience | Dark alt-navy | Tinted pale blue | Diagram now reads as a light blueprint texture |
| 06 | From Vision to Reality | Dark navy | Porcelain | Timeline reads cleanly as light editorial content |
| 07 | Rakmyat Philosophy | Porcelain-on-dark (i.e., was already the "quietest," lightest-feeling dark section) | Porcelain | Already the quietest section; now genuinely light rather than merely "the least dark" |
| 08 | Final Conversion | Dark navy + cyan glow | **Deep cobalt (deliberate)** | A bold, confident closing statement — the brief's "confident cobalt primary CTA" is best delivered as a full-bleed brand-color moment at the page's exit, the second and last authorized dark exception |

**Rhythm result:** light → light → tinted → **dark** → tinted → light → light → **dark**. The two dark sections are not adjacent, preserving the alternating-density rhythm principle from the Phase 03 audit, and both have an explicit, independent justification rather than existing as a holdover default.

---

## 7. Asset Regeneration Requirements

Per VISUAL-ASSET-MATRIX.md §15's full audit: **no asset had actually been produced yet**, so there is nothing to literally regenerate. Had production already happened, the sculpture (§2) and the surface-treatment system (§11) would have required a genuine rebuild (different lighting model, different gradient math), the Digital Architecture diagram (§4) and screenshots' color grading (§8) would have required a color/contrast pass, and the rest would have needed only token-reference updates. Production now proceeds directly against the corrected specifications in DESIGN.md §13–§17 — see VISUAL-ASSET-MATRIX.md for the authoritative per-asset status.

---

## 8. Accessibility Implications

- Every text/background pairing was recomputed for the new palette (§2.2) rather than assumed to "still work" because the old dark-theme pairings happened to clear AA/AAA.
- One genuine accessibility gap was found and fixed before it could ship: the hairline-border candidate fails WCAG 1.4.11 for interactive components; a second, stronger border token was introduced specifically for that use case (§2.3).
- State colors (success/warning/error) were re-derived rather than reused, since the old dark-theme-tuned values would have under-performed on a light background (§2.4).
- The sculpture's non-visual accessibility equivalent (`heroAccessibilityDescription`) and the particle system's real-DOM-text stage descriptions are unaffected by the palette change — these were never color-dependent.
- Reduced-motion behavior is unaffected — the resting-state-completeness rule (DESIGN.md §24.6) and all reduced-motion fallbacks carry forward unchanged in mechanism.

---

## 9. Remaining Risks

| Risk | Detail |
|---|---|
| Hand-computed contrast ratios need automated re-verification | Every ratio in §2.2 was computed by hand against the WCAG relative-luminance formula; correct methodology was used, but a dedicated contrast-checking tool should re-verify all of them (especially `color.border.interactive`'s estimated ≥3:1) before implementation sign-off — flagged, not asserted as final |
| The two deep-cobalt sections are a new discipline that must be enforced in review, not just in the spec | Nothing technically prevents a future editor/implementer from adding a third dark section "because it looks cool" — VISUAL-QUALITY-GATES.md §2's new "deep-cobalt section discipline" check exists specifically to catch this, but it depends on a human reviewer actually running it |
| The sculpture's lighting model is a genuinely harder production problem than the old rim-light approach | Grounding an object convincingly on a light surface (believable soft shadow + subtle color-bleed) is a more demanding render/shader problem than a glow-in-darkness effect; flagged as a real production-risk, not just a spec change, for whoever builds §2's asset |
| Real project screenshots (once they exist) will need their color grading checked against the new light canvas | Carried forward from VISUAL-ASSET-MATRIX.md §15's audit — this only becomes a live risk once PRODUCT.md §34's project-content gap is resolved |

---

## 10. Unresolved Owner Decisions

Distinct from PRODUCT.md §34 / TECHNICAL-ARCHITECTURE.md §33 / PAGE-BLUEPRINTS.md §30 / DESIGN-AUDIT-REPORT.md §6's existing registers (all of which remain open, unchanged, and are not restated in full here):

| # | Decision | Status |
|---|---|---|
| 1 | Logo/wordmark color: `color.ink.primary` (dark, neutral) vs. `color.cobalt.signature` (brand-color mark) for the interim typographic lockup (DESIGN.md §18.3) | 🟡 Lightweight open question, not a blocker — flagged for owner preference, default is `ink.primary` if no response |
| 2 | Final logo/wordmark itself | 🔴 Carried forward unchanged from PRODUCT.md §34 — still the one asset this migration cannot route around with agent-generation |
| 3 | At least one approved real/demo project | 🔴 Carried forward unchanged from PRODUCT.md §23/§34 |

No previously flagged owner decision from any prior phase was silently resolved or removed by this migration.

---

## 11. Cross-Document Consistency Results

- [x] All eight original documents were read in full before any edit was made.
- [x] PRODUCT.md confirmed unchanged (business/content/route/CTA/portfolio/localization/lead-gen decisions all preserved).
- [x] The new palette (Cobalt Blue & Porcelain) is referenced consistently across DESIGN.md, PAGE-BLUEPRINTS.md, VISUAL-QUALITY-GATES.md, and VISUAL-ASSET-MATRIX.md — verified via a full-text search for every old-identity term (`Navy`, `Cyan`, `Obsidian`, `dark-only`, `rim-light`, old hex-adjacent token names) across all active documents after editing; zero stray references remain outside DESIGN-AUDIT-REPORT.md's intentionally-preserved historical body.
- [x] No active dark-only identity requirement remains anywhere — the only "dark" language remaining describes the two deliberate, justified exceptions (HOME-04, HOME-08).
- [x] All eight homepage sections have updated visual direction (§6 above).
- [x] All shared components in DESIGN.md §18 have updated color-token references for every state (default/hover/focus/active/disabled/loading).
- [x] VISUAL-ASSET-MATRIX.md matches the new identity, including the new §15 migration audit.
- [x] VISUAL-QUALITY-GATES.md reflects the new identity in Gate 2, with the other five gates confirmed unaffected (process, not palette).
- [x] No previously approved product or technical decision was silently overwritten — every change in §3's log is additive/corrective to the visual layer only.
- [x] No application code or configuration was created.

**Readiness status for Phase 04:** documentation is migrated and internally consistent. Per the stop condition, implementation, the six-element prototype, and any production code/asset generation do not begin until the owner has separately reviewed and approved this migrated documentation.

---

## 12. Phase 02 implementation contrast re-verification — 2026-10-15

The first automated WCAG relative-luminance check found that the proposed interactive border (`#9AACD6`) measured 2.14:1 on porcelain, 2.03:1 on tinted blue, and 2.27:1 on white. The proposed muted text (`#8B96A8`) measured 2.82:1, 2.67:1, and 2.99:1 on those same surfaces. Both candidates fail their intended non-text (3:1) or normal-text (4.5:1) contrast requirement.

The semantic color roles and Cobalt Blue & Porcelain identity are unchanged. The accessible replacements are `color.border.interactive` = `#6D82B8` (3.57:1 porcelain, 3.39:1 tinted, 3.79:1 white) and `color.ink.muted` = `#606C80` (5.00:1 porcelain, 4.74:1 tinted, 5.31:1 white). These values are recorded in the normative token table and acceptance checklist. The earlier palette table and this implementation addendum preserve the decision trail; the new values govern implementation.
