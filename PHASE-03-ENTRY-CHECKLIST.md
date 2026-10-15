# RAKMYAT — Phase 03 Entry Checklist

**Prepared:** 2026-10-15  
**Source of truth:** [PLAN.md §19–§20](PLAN.md), [TASKS.md Phase 03](TASKS.md)  
**State:** Preparation only. Phase 03 implementation has not started. Homepage visual design is not approved.

## Objective and boundary

Create and browser-validate the **real RAKMYAT homepage prototype**: a coherent, premium editorial composition made from the six elements defined in PLAN.md §19. This phase is not another generic component showcase. Compose the header, HOME-01 hero and sculpture, HOME-02 Selected Work, HOME-03 What We Create, HOME-04 Systems in Motion, and footer as one intentional homepage experience. Preserve the Cobalt Blue & Porcelain system, with strong editorial typography, distinctive visual storytelling, responsive layout, high-quality RTL, and production-grade interaction.

Use clearly labeled local fixture content; do not claim it is live CMS content or owner-approved production copy. Do not implement any page or feature beyond the six-element prototype. Phase 04–10 rendered work remains gated by the explicit owner Gate 5 outcome recorded in P03-T018.

## Entry checks before starting implementation

- [x] Phase 02 closure is recorded in TASKS.md; all P02 tasks are `DONE` with the dated Project Owner decision and technical-advisory evidence. No separate human Technical Lead approval is inferred.
- [ ] Read the governing source sections: PLAN.md §§19, 20 Phase 03, 24; TASKS.md P03-T001–P03-T018; PAGE-BLUEPRINTS.md §§6.1–6.4 and 31.2; DESIGN.md §§13–14, 24, 27; VISUAL-QUALITY-GATES.md §§1–5; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §§1–8; VISUAL-ASSET-MATRIX.md §§2–3.
- [ ] Provision the staging environment at Phase 03 start as required by PLAN.md §24; verify the review deployment shape and access before visual review.
- [ ] Recheck the accepted Phase 02 follow-ups before use: English/Arabic font loading and payloads, Arabic delayed-font CLS mitigation or explicit follow-up measurement, and Drei/browser Canvas compatibility for the exact camera/lighting/Environment helpers intended for the sculpture. The prior `PerspectiveCamera` test-renderer spike does not establish browser WebGL compatibility.
- [ ] Define the asset/provenance plan before introducing any prototype artwork. Trace every used asset to VISUAL-ASSET-MATRIX.md; no stock imagery or fabricated client imagery.
- [ ] Obtain the final Rakmyat logo/wordmark before final brand polish or favicon work; DESIGN.md §18.3 permits the interim typographic lockup meanwhile. Build the required signature sculpture procedurally and use only assets with documented provenance; do not use stock or fabricated client imagery.
- [ ] Confirm fixture-only labeling and remove any component-gallery framing. The user-facing artifact must read as one homepage, not a library demo page.

## Scope lock: six homepage elements

- [ ] GLOBAL-HEADER: polished scroll-state header, reviewed over the actual porcelain hero and above the sculpture z-index.
- [ ] HOME-01: hero headline/subhead and both CTAs, plus the signature procedural 3D sculpture, Cobalt & Porcelain materials, grounding (cast shadow and reflection), Arabic recomposition, mobile fallback, and coordinated reduced-motion behavior.
- [ ] HOME-02: Selected Work with 2–3 clearly labeled fixture cards in an asymmetric editorial media composition; no stock imagery.
- [ ] HOME-03: What We Create with three editorial Service Rows and oversized numeral detail; no card grid.
- [ ] HOME-04: Systems in Motion on deep cobalt, with three-stage particle progression, accessible DOM stage copy, manual controls, and the specified mobile/reduced-motion fallback.
- [ ] GLOBAL-FOOTER: quiet, correctly ordered closing element in both directions and all required widths.

## Task sequence and review gates

| Tasks | Work / evidence required | Gate |
|---|---|---|
| P03-T001–T006 | Hero copy/CTA, procedural sculpture, grounding, Arabic recomposition, mobile fallback, coordinated entrance/reduced-motion state. Verify first-viewport CTAs and no post-font layout shift. | Task tests and visual acceptance references; no owner gate yet. |
| P03-T007–T010 | Selected Work editorial composition; three service rows; particle intelligence; manual stage controls and accessible/reduced-motion/mobile fallback. | Fixture content, asset traceability, interaction and fallback tests. |
| P03-T011–T012 | Polish header against actual hero/sculpture; confirm footer composition. | Both locales and all three required viewports. |
| P03-T013 | Gate 1 Typography: full checklist, real renders, both locales. | Every VISUAL-QUALITY-GATES.md §1 row passes. |
| P03-T014 | Gate 2 Color & Surface: restraint, Disconnection Test, exactly HOME-04 dark within prototype. | Every §2 row passes; cobalt area and grounding evidence included. |
| P03-T015 | Gate 3 Asset Completeness. | Every asset maps to VISUAL-ASSET-MATRIX and has provenance intent; no stock substitute. |
| P03-T016 | Gate 4 Section Completeness for all six elements. | Six complete checklists; zero failed rows; RTL/LTR and responsive composition checked independently. |
| P03-T017 | Full screenshot matrix. | At least 40 settled screenshots: six elements × three widths (1440/768/390) × EN/AR, plus reduced-motion HOME-01/HOME-04 variants; index and counts included. |
| P03-T018 | Present staging deployment and screenshot matrix to Project Owner; record PASS, specific CONDITIONAL PASS, or FAIL. | Owner decision is the Gate 5 deliverable. Automated tests alone cannot pass this gate. |

## Required review quality

- [ ] Review EN and AR separately; verify Arabic shaping, mixed-content isolation, logical alignment, recomposition, directional controls, and physical overflow.
- [ ] Review 1440px, 768px, 390px and the 320px narrow-width stress case. Capture 1440/768/390 as the required matrix; use 320px to catch wrapping/clipping risks.
- [ ] Review settled and reduced-motion states, keyboard behavior, focus, contrast, mobile controls, sculpture grounding, mobile fallback, particle fallback, scroll-state header, and footer.
- [ ] Apply VISUAL-QUALITY-GATES.md §§1–4 continuously; any failed checklist row blocks Gate 5 presentation.
- [ ] Confirm the homepage composition is premium and editorial, not a generic SaaS landing page or component showcase. Do not claim visual approval before the owner’s Gate 5 decision.

## Exit and downstream block

- [ ] All 18 Phase 03 tasks are `DONE` only when their own evidence is complete and P03-T018 records owner PASS or owner-accepted CONDITIONAL PASS.
- [ ] Record any conditional outcome as a specific, testable condition with named affected task(s), retest, and owner decision.
- [ ] On FAIL, route each cited issue back to its P03 task and repeat T013–T018 after correction.
- [ ] Do not move gated Phase 04–10 rendered implementation into `IN_PROGRESS` before P03-T018 records an accepted owner outcome. Only PLAN.md §19’s narrow non-rendered preparatory exception applies.

**Current decision:** Phase 02 closure is recorded separately. This checklist does not start Phase 03, build the homepage, or approve its visual direction.
