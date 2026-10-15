# RAKMYAT — VISUAL-QUALITY-GATES.md
### Phase 03 — Visual Direction Hardening & Premium Design Quality Gates

**Status:** Documentation only. No application code was created.
**Companion documents:** [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md) · [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) · [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md)
**Purpose:** a binding, sequential set of quality gates an implementation must pass through — not a style guide (that is DESIGN.md's job) and not a bug tracker (that is standard QA's job). This document exists specifically to prevent the failure mode named in the Phase 03 brief: *"a website that feels technically structured but creatively incomplete."* Every gate below is derived from a real, named gap found in the Phase 03 audit (see [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md) for the full finding-by-finding evidence).
**Binding principle, stated once, applying to every gate below:** automated tools (Lighthouse, Playwright, axe-core) detect technical defects. None of them — individually or combined — certify premium visual quality. Every gate that includes an automated check also includes a mandatory human-review step, and the automated check never substitutes for it.

---

## 0. Gate Sequence

```
Gate 1 (Typography) ─┐
Gate 2 (Color/Surface)├─→ Gate 3 (Asset Completeness) ─→ Gate 4 (Section Completeness) ─→ Gate 5 (Visual Prototype — HARD CHECKPOINT) ─→ Gate 6 (Full-Page Visual QA, per page)
```

Gates 1–4 are section-level and run continuously as sections are built. **Gate 5 is a hard stop:** no page beyond the prototype's six elements (PAGE-BLUEPRINTS.md §31.2) may be built until Gate 5 is explicitly approved by the owner. Gate 6 runs once per page, after Gate 5 has passed, before that page is considered launch-ready.

---

## 1. Typography Quality Gate

**Rule:** typography is never approved from CSS token definitions alone. DESIGN.md §6–§8 define the scale, weights, and bidirectional rules in the abstract; this gate verifies they look right in an actual browser.

**Required evidence (real screenshots, not token tables):**

| Check | Viewport(s) | What to look for |
|---|---|---|
| Display headline appearance | 1440px, 390px | No orphaned single-word last lines (manual `<br>` control working, DESIGN.md §6.1); negative letter-spacing not causing visual collision between characters at the actual rendered font |
| Paragraph readability | 1440px, 768px, 390px | Line length within DESIGN.md §6.1/§7.2's ch targets as actually rendered, not just configured |
| Font loading / fallback | All | No visible FOUT/FOIT flash beyond `font-display: swap`'s expected brief fallback-to-webfont swap; fallback font (system stack) doesn't cause a layout-shift large enough to be visually jarring |
| Weight distribution | 1440px | Arabic display headlines never exceed weight 600 as rendered (DESIGN.md §7.1) — verify the actual font file's available weights match, since some variable fonts clamp differently than configured |
| Line-height | 1440px, 390px | Arabic line-height visibly taller than English at matching roles (DESIGN.md §7.1); no diacritic clipping (Rakmyat's own copy is undiacritized, but verify any future user-facing Arabic string with diacritics doesn't clip) |
| Letter spacing | 1440px | Confirm **zero** tracking applied to any rendered Arabic string (DESIGN.md §7.1 hard rule) — a visual spot-check, not just a CSS audit, since inherited utility classes can leak tracking unexpectedly |
| Line wrapping | 768px, 390px | Headlines/buttons wrap at sensible word boundaries; Arabic CTA buttons tested against DESIGN.md §31's "full-width rather than truncate" rule at 320px |
| Arabic glyph shaping | 1440px | Letters correctly join (no broken ligatures) at every weight used — a known risk with variable Arabic fonts under certain browser/OS font-rendering engines |
| Arabic/Latin mixed content | 1440px | Embedded Latin terms (API, SaaS, project names) render LTR-isolated with correct punctuation order inside an RTL sentence (DESIGN.md §8) |
| Optical alignment | 1440px | Numerals, mixed-script baselines, and button label vertical centering look optically correct, not just mathematically centered |
| Responsive scaling | 1280/1024/768/390/320px | `clamp()`-based fluid tokens (DESIGN.md §6.1/§7.2) produce smooth, not jumpy, size transitions across the range |

**Sign-off:** a named reviewer confirms each row above against real screenshots, both locales, before any section using that typography token is marked complete.

---

## 2. Color & Surface Quality Gate

**Rule:** preserves the owner-approved Cobalt Blue & Porcelain direction (DESIGN.md §5, migrated from the prior Navy/Cyan/Obsidian identity per [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md)) — this gate does not permit introducing a different palette. It verifies the palette is applied with enough tonal differentiation and depth to avoid the audit's named failures: "flat, monotonous backgrounds... poorly distributed visual weight" (originally named against the dark identity, equally applicable to an all-flat-porcelain result).

| Check | Requirement |
|---|---|
| Background contrast between adjacent sections | Every section pair at a boundary uses DESIGN.md §5.5's gradient/noise/vignette/cast-shadow treatment and 80–120px blend zone (120–160px when transitioning into/out of a deep-cobalt section) — verified visually, not just by confirming the CSS exists |
| Surface layering | Cards/forms/modals visibly sit at a distinct elevation from their section background via shadow (`shadow.sm`/`shadow.md`/`shadow.lg`), since `color.surface.1`/`.surface.2` are the same white fill as `color.bg.page` in this identity — elevation must read through shadow/z-index, not color, and fails this check if it doesn't |
| Accent placement | Cobalt at full saturation measured ≤10% of any porcelain-section screenshot's pixel area (DESIGN.md §5.3/§4 Principle 3) — spot-check with a color-histogram tool or visual estimate per section; the two deep-cobalt sections (HOME-04, HOME-08) are exempt from this ceiling since cobalt is their background by design |
| Deep-cobalt section discipline | Confirm exactly two homepage sections use `color.bg.section.dark` (DESIGN.md §27) and that no other page introduces a dark section without an equally deliberate justification — this check did not exist under the prior all-dark identity and is new to this gate |
| Text contrast | Matches DESIGN.md §5.4's ratios as rendered against the *actual* background (porcelain/tinted/white, and separately against `bg.section.dark` for the two exception sections) — including any gradient/texture layered under it per §5.5 |
| 3D material integration | Sculpture's cobalt-enamel/polished-ceramic/brushed-metal/translucent-cobalt-glass materials (DESIGN.md §13) read as distinct materials under the studio lighting rig, not a flat-shaded placeholder |
| Depth and lighting | Hero's cast shadow and cobalt color-bleed visibly ground the sculpture on the porcelain surface (DESIGN.md §13.1's now-mandatory grounding rule) — this is checked here as a color/lighting concern and again in Gate 4 as a composition concern |
| Visual transitions between sections | No hard one-pixel color cut anywhere on a page (DESIGN.md §5.5) |

**Explicit anti-patterns checked here:** generic cyberpunk neon saturation, excessive cobalt fills used as a default surface color (brief §8's explicit caution), flat textureless porcelain repeated with no tonal variation, a dark section appearing anywhere outside the two deliberate homepage exceptions.

---

## 3. Asset Completeness Gate

**Rule:** a missing asset is never silently treated as complete, and an approved asset is never silently swapped for an unrelated generic placeholder. Full detail lives in [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) — this gate is the checklist for *using* that matrix during implementation.

| Step | Requirement |
|---|---|
| 1 | Before building a section, check its row(s) in VISUAL-ASSET-MATRIX.md — every "Media" reference in PAGE-BLUEPRINTS.md §6–§17 must resolve to a matrix row |
| 2 | If the matrix row's status is "Final — approved," use it as-is |
| 3 | If "Pending," produce the Interim Fallback (DESIGN.md §42.2) — generated via an approved method (DESIGN.md §42.1), meeting the full art-direction bar, never a blank space or generic icon |
| 4 | Tag every produced/sourced asset with its `provenance` value (CMS-SCHEMAS.md §9.1) before it ships, even as an interim fallback |
| 5 | Never substitute a stock photo for a planned custom asset under any circumstance (DESIGN.md §16/§36 hard rule) — if no generation method is available, escalate, don't substitute |

---

## 4. Section Completeness Gate

**Rule:** a section is not visually complete merely because it renders without errors. Checked per section, against its density class (PAGE-BLUEPRINTS.md §31.1):

| Check | Pass condition |
|---|---|
| Required content present | Every field marked required in the section's CMS source (CMS-SCHEMAS.md) is populated in the test content used for review — a section reviewed with empty optional fields is fine; reviewed with empty *required* fields is not a valid review |
| Visual focal point visible | The focal point named in PAGE-BLUEPRINTS.md §31.1 is the first thing a reviewer's eye lands on in an unprompted 3-second glance test |
| Layout balance matches spec | Desktop/tablet/mobile compositions match PAGE-BLUEPRINTS.md's per-breakpoint rows, not just "looks fine at one size" |
| No unintended empty regions | Any whitespace present is explainable by DESIGN.md Principle 4 (intentional negative space) or the section's Quiet classification — if a reviewer can't explain *why* a large empty area exists, it fails |
| Typography readable and polished | Gate 1 already passed for this section's tokens |
| Assets load or approved fallback appears | Gate 3 already passed for this section's assets |
| Motion doesn't hide essential content | CTAs, headlines, and classification badges are never obscured mid-animation (DESIGN.md §24.5) |
| Static state visually complete | DESIGN.md §24.6's resting-state rule — screenshot with motion disabled, confirm it independently passes this same checklist |
| RTL and LTR both visually reviewed | Both directions reviewed independently — an RTL pass is never assumed from an LTR pass (PAGE-BLUEPRINTS.md §31.1's binding note) |
| Responsive compositions intentional | Mobile isn't "the desktop layout, shrunk" — DESIGN.md §31's distinct-composition rule verified visually, not just specified |

**Any single failed row blocks visual approval for that section.** A section may re-enter this gate after a fix; it does not get a partial pass.

---

## 5. Visual Prototype Gate (hard checkpoint)

**This is the one gate in this document that blocks forward progress entirely, not just a single section's approval.**

**Scope** (mapped to real section IDs in PAGE-BLUEPRINTS.md §31.2):

| Element | Section ID |
|---|---|
| Global header | GLOBAL-HEADER |
| Homepage hero | HOME-01 |
| One media-rich section | HOME-02 |
| One typography-led section | HOME-03 |
| One interactive section | HOME-04 |
| Footer | GLOBAL-FOOTER |

**Requirements before this gate can be presented for approval:**
1. All six elements built with real typography, real/generated assets (not lorem-ipsum/greybox placeholders), real motion direction.
2. Gates 1–4 individually passed for each of the six elements.
3. Screenshots captured at **1440px, 768px, 390px**, in **both English and Arabic**, for all six elements — minimum 6 elements × 3 viewports × 2 locales = 36 screenshots, plus the reduced-motion/static-settle variant of HOME-01/HOME-04 (DESIGN.md §24.6) = 40 total minimum.
4. HOME-01's Disconnection Test (DESIGN.md §13.1) explicitly evaluated and documented pass/fail with the screenshot it was judged against.

**Outcome:** the owner reviews the prototype and either **approves** (full build may proceed) or returns specific, section-tagged feedback (which re-enters Gates 1–4 for the affected element only, not a full restart). **No page beyond this six-element set is built before approval is recorded.**

---

## 6. Full-Page Visual QA Process

Runs once per page, after Gate 5 has passed, before that page ships.

**Capture requirements:**
- Full-page screenshot, both locales
- Individual per-section screenshot, both locales (every section ID that page contains, per PAGE-BLUEPRINTS.md §6–§17)
- Mobile (390px) full-page screenshot, both locales
- Post-animation-settle screenshot (motion finished)
- `prefers-reduced-motion: reduce` screenshot (DESIGN.md §24.6's static-state requirement)

**Automated detection (via the Playwright suite extended per TECHNICAL-ARCHITECTURE.md §36):**

| Defect class | Detection method |
|---|---|
| Empty/unfinished section | Visual-regression diff against the approved prototype/previous approved build, flagged for human review on any large diff |
| Missing image | Network/console error capture + `alt`-text presence check |
| Broken typography | Font-load failure detection (console errors), basic overflow/clipping checks via DOM measurement |
| Unintended overflow | `document.body.scrollWidth` vs. viewport-width assertion at every breakpoint (zero horizontal overflow, DESIGN.md §30 hard rule) |
| Contrast failures | axe-core automated scan (TECHNICAL-ARCHITECTURE.md §26) |

**Human review (required, not optional, for every page):**

| Defect class | Why automation can't catch it |
|---|---|
| Layout imbalance | "Technically not overflowing" ≠ "visually balanced" — requires a trained eye |
| Excessive whitespace | Only a human can distinguish "intentional pause" (Quiet class, correct) from "looks unfinished" (defect) |
| Poor section transitions | Requires judging the gradient/vignette blend (DESIGN.md §5.5) actually reads as smooth, not just that the CSS property exists |
| Incorrect visual hierarchy | Requires judging what a viewer's eye actually does, not what the DOM order says it should do |
| Inconsistent styling | Cross-section consistency (e.g., does every CTA button look like the same button) is a holistic judgment |

**Explicit caveat (repeated, binding):** a passing automated run across all the above checks is a *precondition* for requesting human sign-off, not a substitute for it. A page is not launch-ready until a named human reviewer has completed both the per-section and full-page review and recorded approval.

---

## 7. Roles & Sign-off

| Role | Responsibility |
|---|---|
| Implementation agent/engineer | Builds to spec, runs automated checks, captures required screenshots, flags any SPECIFICATION GAP encountered rather than inventing a resolution |
| Design reviewer (human) | Performs Gates 1, 2, 4's subjective checks, and the Full-Page Visual QA's human-review row; has authority to fail a section/page regardless of automated-check status |
| Owner | Sole approver of Gate 5 (Visual Prototype); sole approver of any item logged in DESIGN-AUDIT-REPORT.md's "Decisions Requiring Owner Approval" |

---

## 8. Relationship to This Audit's Other Deliverables

- Every gate above that references "the asset" defers to [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) for which specific asset, its status, and its fallback.
- Every finding that justified adding a gate is traceable in [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md)'s change log.
- This document does not restate DESIGN.md's visual specifications — it only adds the verification process around them. Where a gate references a rule (e.g. "≤10% cobalt"), DESIGN.md is the source of the number; this document is the source of *when and how it gets checked*.
