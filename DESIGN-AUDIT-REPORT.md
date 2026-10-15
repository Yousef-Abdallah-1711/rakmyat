# RAKMYAT — DESIGN-AUDIT-REPORT.md
### Phase 03 — Visual Direction Audit

**Status:** Documentation only. No application code was created; all corrections below were applied as targeted amendments to the existing five documents, not rewrites.
**⚠️ SUPERSEDED PALETTE NOTICE (added at Phase 03B):** this report's findings, screenshots-not-taken, and change log all reference the **Navy/Cyan/Obsidian** dark-only identity that was current when this audit ran. That palette was subsequently replaced by **Cobalt Blue & Porcelain** (see [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md)). Every *structural* finding below (flat backgrounds, hero disconnection, missing textural devices, the resting-state rule, the asset-fallback standard, the density classification, the mandatory prototype gate) remains fully valid and carried forward unchanged into the new palette — only the specific color/hex values and material descriptions named below are historical. This report is preserved as-is, not rewritten, per the instruction to mark superseded decisions clearly rather than erase audit history.
**Companion documents:** [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md) · [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md) · [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) · [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md)

---

## 1. Executive Summary

All five existing documents were read in full. The audit found the existing creative direction (Creative Digital Powerhouse, Navy/Cyan, bilingual RTL-first) sound and did **not** recommend changing it. What the audit found was a **specification-precision gap**, not a creative-direction gap: several sections (the three homepage typography-led sections, the hero's integration with its 3D sculpture, section-to-section backgrounds, and the asset-pending state generally) were specified precisely enough to build *something*, but not precisely enough to prevent an implementation agent from building something visually thin — flat single-color backgrounds, a sculpture that reads as pasted-on rather than lit-into-the-scene, typography-only sections with no textural anchor, and "pending" assets with no defined interim quality bar. These are exactly the failure modes named in the audit brief, and they were real, confirmed gaps in the *specification*, not evidence that a prior build actually exhibited them (no build exists yet). Seven targeted amendments were made across DESIGN.md, PAGE-BLUEPRINTS.md, TECHNICAL-ARCHITECTURE.md, and CMS-SCHEMAS.md (full change log, §7), plus three new governing documents were created. No existing business, content, or technical decision was reversed or lost.

---

## 2. Methodology

Each of the five documents was reviewed against the Phase 03 brief's eleven named failure scenarios (large empty sections, weak typography hierarchy, flat monotonous backgrounds, inconsistent color composition, a disconnected hero sculpture, poorly distributed visual weight, missing/invisible assets, weak section transitions, excessive undeliberate whitespace, unfinished-wireframe sections, and "technically structured but creatively incomplete" overall). For each failure scenario, the audit asked: *does the current specification contain a concrete, measurable rule that would prevent an implementation agent from producing this result, or does it leave enough room that a literal-minded implementation could still produce it?* Findings were sorted into four categories (§3–§6) per the brief's explicit instruction to distinguish them rather than present one undifferentiated list.

---

## 3. Confirmed Specification Defects

These are gaps where the existing documentation genuinely permitted — not caused, but permitted — a weak visual outcome. Each was corrected; see §7 for the exact amendment.

| # | Finding | Failure mode it enables | Severity |
|---|---|---|---|
| D1 | DESIGN.md §5's color tokens defined flat hex values for every section background with no rule requiring tonal variation, gradient, or texture within or between sections | Flat, monotonous dark navy backgrounds; weak section-to-section transitions | High |
| D2 | DESIGN.md §13's hero-sculpture spec made glow-bleed onto the headline "acceptable" rather than required, and gave no compositional-alignment rule between the sculpture and the text block | Hero sculpture disconnected from the rest of the page | High |
| D3 | DESIGN.md §18.8 (Service Row) and the Process timeline had no specified textural device beyond text + a divider line — "large numbered rows" was specified in content terms, not in a way that prevents a bare-text result | Sections resembling unfinished wireframes (specifically HOME-03, HOME-06/07, Process) | High |
| D4 | DESIGN.md §24's motion system specified entrance animation thoroughly but never stated that a section's *post-animation/motion-disabled* state must independently look complete | Animations that never trigger (or are disabled) appearing to leave an unfinished section | Medium |
| D5 | DESIGN.md §28.2/PAGE-BLUEPRINTS.md §23's asset checklist marked every unproduced asset "🔴 Pending" with no defined interim quality bar — nothing prevented "pending" from being implemented as a blank space | Missing or invisible visual assets | High |
| D6 | PAGE-BLUEPRINTS.md's per-section template (29 fields) had no field capturing "visual focal point," "density expectation," or "negative-space intent" — a section could satisfy every existing field and still have no clear answer to "what is this section's one dominant visual idea" | Poorly distributed visual weight; excessive whitespace without deliberate composition | Medium |
| D7 | No document defined a mandatory pre-full-build visual checkpoint — the original Phase 02 documents moved from specification directly to "build the whole site," with visual verification only implied by the testing contract's automated checks | A fully built site discovered late to be visually underwhelming, with the cost of rework already incurred | High |

---

## 4. Implementation Risks

These are not specification defects — the documents are correct — but they identify where correct specification could still go wrong in execution, worth flagging so implementation watches for them:

| # | Risk | Why it's not a spec defect |
|---|---|---|
| R1 | The Payload/Next.js 16 Turbopack compatibility question (TECHNICAL-ARCHITECTURE.md §32) could force a bundler fallback that changes dev-time iteration speed on visual work, indirectly pressuring shortcuts under deadline | This is a dependency-ecosystem risk already correctly logged as BLOCKED, not a documentation gap |
| R2 | `@react-three/drei`'s React 19/R3F v9 compatibility is still an open community question (TECHNICAL-ARCHITECTURE.md §32) — if it forces a downgrade, some Drei helpers used for the hero sculpture's camera/lighting convenience APIs may need manual reimplementation, consuming time that could otherwise go toward visual polish | Correctly flagged as VERIFY-AT-IMPLEMENTATION already |
| R3 | The particle system (DESIGN.md §14) and the full interactive diagram (DESIGN.md §15) both have real performance budgets (DESIGN.md §33) that may be hard to hit on mid-tier mobile devices in practice, even though the *specification* correctly scopes WebGL to desktop-only | A spec can be perfectly correct and still be hard to execute within budget; this is a build-time tuning risk, not a documentation fix |
| R4 | The Arabic font (IBM Plex Sans Arabic)'s actual glyph-shaping behavior across different browser engines has not been verified in a real browser (cannot be, at the documentation stage) — DESIGN.md §7's rules are correct on paper, VISUAL-QUALITY-GATES.md §1 exists specifically because this needs a real-browser check | Addressed procedurally (the new gate), not resolvable by more documentation |
| R5 | "At least one approved project" (VISUAL-ASSET-MATRIX.md §8) being satisfied by an agent-built Concept/Demo project (PRODUCT.md §25) carries a reputational risk if that demo is thin — a hastily-built demo labeled honestly is still a weak first impression even though it's not a dishonest one | Flagged for awareness; PRODUCT.md §25 already requires it be a "real, functioning build," this just notes the execution bar matters even when the honesty bar is met |

---

## 5. Subjective Creative Recommendations

Non-binding. These are not added to any specification as a requirement — they are offered as options the owner may consider, not corrections to anything broken:

| # | Recommendation |
|---|---|
| S1 | Consider a very subtle, site-wide animated grain/noise (near-imperceptible, <2% opacity, slow-drifting) layered across all backgrounds rather than a purely static noise texture (DESIGN.md §5.5) — this is a common technique in premium dark-themed sites for a sense of "expensive" material depth, but it is a genuine aesthetic preference, not a correctness issue, and was deliberately **not** added as a binding rule |
| S2 | Consider widening the cyan glow radius behind every major headline site-wide (not just the hero/CTA sections currently specified) by a small, consistent amount, purely for cross-page visual cohesion — again offered as a preference, since DESIGN.md §4 Principle 3's ≤8% cyan-area budget already constrains how far this could go without owner review |
| S3 | Consider whether the Process timeline (PROCESS-02/03) would benefit from a short per-stage "what you receive" micro-visual (a small icon) in addition to the oversized-numeral device — not added to the spec because it risks reintroducing the "generic icon-per-feature" anti-pattern (DESIGN.md §36) if not executed with real restraint; flagged as a judgment call for the Visual Prototype Gate reviewer rather than pre-decided here |

---

## 6. Decisions Requiring Owner Approval

Distinct from PRODUCT.md §34/TECHNICAL-ARCHITECTURE.md §33/PAGE-BLUEPRINTS.md §30's existing registers — this audit surfaces one policy-level decision specific to this pass, plus restates (does not duplicate the content of) the two prior registers' still-open items most relevant to visual work:

| # | Decision | Why it needs explicit sign-off |
|---|---|---|
| O1 | **Scope of agent-generated assets as final, shippable visuals** (DESIGN.md §42.1) | The Phase 03 brief explicitly authorizes this, and this audit implemented that authorization — but "the hero sculpture, particle system, and diagrams may be agent-built rather than owner-supplied" is a real brand-risk decision (quality of agent-generated 3D/imagery varies) that still passes through the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5) as the actual checkpoint. This is not asking permission to proceed (the brief already granted it) — it is naming the specific moment (Gate 5) where the owner's judgment is still the deciding factor, so that moment is not skipped under the assumption that "generation was pre-authorized, so no review is needed." |
| O2 | Final logo/wordmark (carried from PRODUCT.md §34, restated because it is the one asset in VISUAL-ASSET-MATRIX.md explicitly *not* covered by the generation authorization) | Brand-identity decision, not a decorative asset |
| O3 | At least one approved real/demo project before launch (carried from PRODUCT.md §23/§34) | Restated here because it is the asset category where "generate a fallback" is explicitly the wrong answer (VISUAL-ASSET-MATRIX.md §8) — the honest empty state is correct until this is resolved, one way or the other |

No previously flagged owner decision (PRODUCT.md §34, TECHNICAL-ARCHITECTURE.md §33, PAGE-BLUEPRINTS.md §30) was silently resolved by this audit — all remain open exactly as previously logged.

---

## 7. Change Log

| # | Original weakness | Proposed correction | Affected document | Affected section(s) | Reason | Acceptance criterion | Owner approval required? |
|---|---|---|---|---|---|---|---|
| 1 | D1 — no tonal-variation/gradient rule for section backgrounds | Added §5.5 Surface Treatment, Depth & Section Transitions — mandatory gradient/noise/vignette per section, 80–120px blend zone between sections | DESIGN.md | New §5.5, §5.6 | Prevents flat/monotonous backgrounds and weak transitions | VISUAL-QUALITY-GATES.md §2's checklist passes on real screenshots | No — technical specification tightening within the approved palette |
| 2 | D2 — hero/sculpture integration optional, no alignment rule | Added §13.1 Hero Integration & Disconnection Test — glow-bleed required, vertical-alignment rule, explicit pass/fail test | DESIGN.md | New §13.1 | Prevents the sculpture reading as disconnected from the page | Disconnection Test documented pass, screenshot evidence at Gate 5 | No |
| 3 | D3 — no textural device for typography-only sections | Added §18.22 Visual Micro-Detail Standard — oversized background numeral (120–160px, 8–12% opacity) for every numbered row/stage | DESIGN.md | New §18.22 | Prevents "unfinished wireframe" perception on HOME-03/06/07-adjacent, Process, service-detail rows | Device present and correctly specified wherever §18.8/Process timeline is implemented | No |
| 4 | D4 — no resting-state completeness rule | Added §24.6 Resting-State Completeness | DESIGN.md | New §24.6 | Prevents sections depending on animation to look finished | Reduced-motion screenshot independently passes Section Completeness Gate | No |
| 5 | D5 — no interim-asset quality bar | Added §42 Visual Hardening Addendum (42.1 generation authorization, 42.2 interim fallback standard, 42.3 authenticity carve-out) | DESIGN.md | New §42 | Prevents missing/invisible assets; operationalizes the brief's 6A authorization | Every VISUAL-ASSET-MATRIX.md row has a defined Fallback, none are blank | **Yes — O1** (policy awareness, not a blocking approval) |
| 6 | D6 — no focal-point/density field in the page-blueprint template | Added §31 Visual Completeness Addendum — density classification (Rich/Structured-minimal/Quiet) and named focal point for every section ID | PAGE-BLUEPRINTS.md | New §31 | Prevents poorly distributed visual weight and undeliberate whitespace, without forcing decoration into intentionally minimal (Quiet-class) sections | Every section ID in §6–§17 has a density class and focal point in §31.1's table | No |
| 7 | D7 — no mandatory pre-build visual checkpoint | Created VISUAL-QUALITY-GATES.md (6 gates, Gate 5 is a hard checkpoint) mapped to real section IDs via PAGE-BLUEPRINTS.md §31.2 | New file + PAGE-BLUEPRINTS.md §31.2 | — | Prevents discovering visual weakness only after a full build | Gate 5 approval explicitly recorded before any page beyond the 6-element prototype is built | **Yes — this gate's approval is the owner's, by design** |
| 8 | (Supporting) No asset-level readiness tracking existed in one place | Created VISUAL-ASSET-MATRIX.md (12 asset categories, full fallback/provenance/owner-dependency detail) | New file | — | Centralizes D5's fix into an actionable, checkable matrix | Every asset referenced in PAGE-BLUEPRINTS.md resolves to a matrix row (VISUAL-QUALITY-GATES.md §3 step 1) | No |
| 9 | (Supporting) Asset provenance/authenticity had no data-layer enforcement, only written policy | Added §9.1 Asset Provenance Fields (`provenance`, `conceptualOnly`) | CMS-SCHEMAS.md | New §9.1 | Operationalizes "never fabricate... conceptual imagery allowed when identified as conceptual" at the schema level | Every `media` record carries a provenance value | No |
| 10 | (Supporting) No technical documentation of how generated assets get built/tested | Added §35 Asset Generation Pipeline, §36 Visual QA Tooling | TECHNICAL-ARCHITECTURE.md | New §35, §36 | Gives the generation authorization (D5/§42) and the new gates (VISUAL-QUALITY-GATES.md) a concrete technical mechanism | Screenshot-capture tooling exists and is used per Gate 5/6 | No |

---

## 8. Final Validation

- [x] **Cross-document consistency:** every new/amended section cross-references the correct companion document and section number; spot-checked that DESIGN.md §42, PAGE-BLUEPRINTS.md §31, TECHNICAL-ARCHITECTURE.md §35–§36, and CMS-SCHEMAS.md §9.1 all reference each other correctly and reference VISUAL-QUALITY-GATES.md/VISUAL-ASSET-MATRIX.md consistently.
- [x] **Every MVP section has a visual-completeness criterion:** PAGE-BLUEPRINTS.md §31.1's density table covers every section ID enumerated in §6–§17; §31.3 extends the acceptance-criteria requirement to all of them at once.
- [x] **All mandatory assets have defined fallbacks:** VISUAL-ASSET-MATRIX.md §2–§13 — every row has a non-blank Fallback value except §8 (project screenshots), whose correct "fallback" is explicitly the honest empty state, not a generated substitute — a deliberate exception, not an oversight.
- [x] **Bilingual visual requirements verified in the gates:** VISUAL-QUALITY-GATES.md §1 (typography), §5 (prototype requires both locales), §6 (full-page QA requires both locales) all explicitly require Arabic and English independently, never assuming one validates the other.
- [x] **Prototype approval is a hard gate:** VISUAL-QUALITY-GATES.md §5 states explicitly that no page beyond the six-element prototype is built before recorded owner approval.
- [x] **No existing product requirement was lost:** PRODUCT.md was not modified; DESIGN.md/PAGE-BLUEPRINTS.md/TECHNICAL-ARCHITECTURE.md/CMS-SCHEMAS.md were amended only via additive insertions (new subsections/sections), with every original line preserved — verified by reviewing each edit as a pure addition, never a deletion or rewrite of existing content.
- [x] **No application code was created:** this entire pass produced three new Markdown files and additive Markdown amendments to five existing files; no `.tsx`/`.ts`/`.css`/config/Docker/migration file exists anywhere in the project directory.

**Stopping here, as instructed.** Implementation does not begin without separate owner approval, and specifically never bypasses the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5) regardless of how complete the documentation now is.
