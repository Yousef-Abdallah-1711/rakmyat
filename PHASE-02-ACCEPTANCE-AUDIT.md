# RAKMYAT — Phase 02 Independent Technical & Visual Acceptance Audit

**Audit date:** 2026-10-15  
**Project:** `H:\Projects\rakmyat`  
**Reviewed commit:** `5166846a1c81e19c7c4c6b64db2cb177325e22f4` (`main`)  
**Review role:** Independent implementation and evidence review. This report does not mark tasks DONE, record owner approval, or grant Phase 03 visual approval.

## 1. Executive summary

Phase 02 establishes a substantial bilingual design-system foundation. The production build, unit suite, browser suite, accessibility scans, authentication persistence check, PostgreSQL connectivity check, and static checks passed during this audit. Browser-measured English and Arabic font payloads are within their specified budgets, and the Arabic glyphs use IBM Plex Sans Arabic. The five browser skips are viewport-specific and legitimate.

**Recommendation: NO-GO for formal Phase 02 acceptance.** The mobile navigation drawer uses an undefined `--color-white-pure` custom property, leaving its panel transparent. On the English drawer, the independent Axe run found a serious text contrast violation at 2.13:1. The same undefined surface token is used by form controls, so the required white field surface is absent. These are implementation defects, not evidence gaps. Several additional component-specific visual criteria remain unverified because those components do not appear in the prototype route or the captured browser views. The implementation report's unconditional all-areas-complete framing is therefore stronger than this independent evidence supports.

No Phase 03 work was started. This audit does not assert owner or Technical Lead approval and leaves all Phase 02 workflow statuses unchanged.

## 2. Audit scope and method

Reviewed the requested authoritative sources: `PRODUCT.md`, `DESIGN.md`, `TECHNICAL-ARCHITECTURE.md`, `PAGE-BLUEPRINTS.md`, `VISUAL-QUALITY-GATES.md`, `COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md`, `PLAN.md`, `TASKS.md`, and `PHASE-02-IMPLEMENTATION-REPORT.md`. Inspected Phase 02 source, tests, static assets, font licenses, package manifest and lockfile, screenshots, and commit `5166846`.

The implementation report was treated as a claim to verify. Acceptance wording in the matrix below is copied from the 21 Phase 02 task entries in `TASKS.md`. Evidence includes a fresh production build and browser run, fresh production screenshots, browser network resource measurements, an independent drawer accessibility scan, a database-outage 404 check, and source/test inspection. Browser captures are saved under `test-results/phase-02-independent-audit/`; the tracked Phase 02 screenshots were restored after the test run.

## 3. Phase 02 acceptance matrix

| Task | Acceptance criteria (TASKS.md) | Implementation and evidence | Result | Remaining risk |
|---|---|---|---|---|
| P02-T001 | “Zero Navy/Cyan/Obsidian hex values present anywhere in the generated CSS (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §7 Q1, checked here at the earliest possible point).” | `app/globals.css` defines the Cobalt Blue & Porcelain tokens; token and forbidden-palette tests pass. Generated CSS scan found none of the retired Navy/Cyan/Obsidian palette values. | **PASS** | Token completeness still needs correction: `--color-white-pure` is referenced by four CSS locations but is not defined. This does not introduce a retired palette hex, but breaks the surface mapping used by T008/T011 and other elements. |
| P02-T002 | “Every pairing meets its stated WCAG target; `color.border.interactive` confirmed ≥3:1 or revised if it fails.” | `tests/design-foundation.test.ts` computes WCAG relative luminance. Ratios: primary text 15.84–17.74:1; secondary 6.76–7.58:1; muted 4.74–5.31:1; interactive border 3.39–3.79:1; white on primary/deep cobalt 5.59/9.31:1. | **PASS** | These token pairings pass. The drawer's composited backdrop/text pairing is a separate runtime failure: 2.13:1, reported under T008 and §7. |
| P02-T003 | “Fonts load only on `/en/*`; budget met.” | `app/[locale]/layout.tsx` conditionally preloads Space Grotesk and Inter for English. Browser Resource Timing and response bodies show English-only requests totaling 80,804 body bytes / 81,704 transferred bytes, below 180 KiB. No Arabic font requests occurred on English routes. | **PASS** | Uses CSS `@font-face` plus `ReactDOM.preload`, not the specified `next/font` route modules. The locale/budget outcome passes; this implementation deviation should remain explicit in technical records. |
| P02-T004 | “Font loads only on `/ar/*`; budget met; zero Latin-face fallback used for Arabic text (DESIGN.md §7).” | Arabic route fetched IBM Plex Sans Arabic Arabic and Latin subsets only: 47,456 body bytes / 48,056 transferred bytes, below 120 KiB. No English font requests or preloads. `document.fonts.check` passed; Chromium platform-font inspection of the Arabic H1 reported IBM Plex Sans Arabic. | **PASS** | Uses self-hosted CSS faces instead of `next/font`. `font-display: swap` causes measurable Arabic layout shift under delayed font responses; see §4. |
| P02-T005 | “Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's Primary Button row exactly (hover direction specifically).” | `PrimaryButton` includes documented size, disabled/loading, focus, and hover states. Unit and browser checks cover behavior; fresh English/Arabic production screenshots show the CTA. Desktop hover behavior was exercised by E2E. | **PASS** | Visual checks cover the scaffold CTA. No separate form submission flow is part of this phase. |
| P02-T006 | “Matches DESIGN.md §18.5–§18.7 exactly.” | SecondaryButton, TextLink, and IconButton source and role/name/focus tests were inspected in `components/ui/` and `tests/phase-02-components.test.tsx`. Their logical CSS checks pass. | **PASS** | Component-specific visual states are not all represented in the prototype screenshots. |
| P02-T007 | “Matches PAGE-BLUEPRINTS.md §4 field-for-field.” | Header source provides logo, desktop navigation, utility cluster, responsive controls, language switcher, CTA, and scroll shell. Browser tests exercise EN/AR navigation and responsive collapse; production captures show desktop and mobile composition in both directions. | **PASS** | Header is reviewed as a design-system scaffold, not as the final marketing-page header over a hero. |
| P02-T008 | “Passes the keyboard-only test in both directions.” | Browser keyboard checks pass for English and Arabic drawer open/tab/Escape/focus return. However, the panel background in `components/ui/MobileDrawer.module.css` references undefined `--color-white-pure`; computed background is transparent. Fresh screenshots show page content through the open panel. Axe on the English drawer reports a serious contrast violation: 2.13:1 for language text against the composited background (4.5:1 required). | **FAIL** | Define/use a valid surface token and retest both directions, keyboard behavior, visual obscuration, and Axe. Arabic Axe did not flag this instance, but the transparent-panel defect is still visible. |
| P02-T009 | “Never silently stays on the same language or 404s on switch.” | `lib/i18n/locale-switch.ts` uses localized route resolution and fallback notice. Unit coverage verifies existing/missing route behavior; Playwright switches `/en/phase-02` ↔ `/ar/phase-02` successfully. | **PASS** | Fallback notice uses the same undefined white surface variable, so its fill can be transparent; its route/fallback behavior passes. |
| P02-T010 | “Matches PAGE-BLUEPRINTS.md §5 field-for-field.” | Footer source contains four logical groups, language switcher, legal/contact links, and copyright. Tests inspect structure/order; EN/AR desktop and mobile production screenshots show direction and mobile stacking. | **PASS** | Future CMS-provided content is represented by props/mocks only, as scoped. |
| P02-T011 | “Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's Form fields row (interactive border, not hairline).” | Form controls use `--color-border-interactive` at 1.5px and focus styling, but `app/globals.css` sets their background to undefined `--color-white-pure`. The token is not declared in the theme. This does not match the required white form surface. The actual controls are not mounted in the prototype route, so there is no supporting browser screenshot. | **FAIL** | Replace with a defined white/surface token; capture input, textarea, select, checkbox, focus and validation states in both directions; run browser accessibility checks. |
| P02-T012 | “Matches DESIGN.md §18.11/§18.16.” | Radix Accordion and Modal implementations use the unified `radix-ui` dependency. Unit tests cover semantics and modal keyboard/focus behavior. Modal appears in the prototype and fresh production screenshot. Accordion is not mounted in the prototype route and has no production visual capture. | **INSUFFICIENT EVIDENCE** | Need rendered browser evidence for accordion open/closed, chevron direction, motion, and reduced-motion behavior, alongside modal visual/focus behavior. |
| P02-T013 | “Matches DESIGN.md §18.22 exactly; opacity verified not to compete with foreground text (Gate 1/2).” | `OversizedNumeral` is implemented with aria-hidden treatment and responsive styling; tests assert structure, but the component is not mounted in the prototype route and no rendered visual snapshot proves its opacity/relationship to foreground text. | **INSUFFICIENT EVIDENCE** | Capture rendered numeral with adjacent editorial text at desktop and mobile; verify the opacity and overlap against Gate 1/2. |
| P02-T014 | “Matches DESIGN.md §18.8; renders as a single accessible link per row (not nested interactive elements, per PAGE-BLUEPRINTS.md §6.3's accessibility row).” | `ServiceRow` source renders a link with logical direction/hover handling; component tests inspect semantics and the single-link contract. It is not shown in the prototype route or production screenshots. | **INSUFFICIENT EVIDENCE** | Need browser render in EN/AR and responsive widths to assess editorial spacing, hover direction, number placement, and no nested interactive elements in rendered DOM. |
| P02-T015 | “Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's badge row exactly.” | Four classification variants are implemented. Unit checks and browser test verify distinct badge border colors; all four examples appear in the prototype screenshots. | **PASS** | Badge fill also uses undefined `--color-white-pure`; current distinct borders remain visible, but surface appearance should be corrected with the shared token fix. ProjectShowcase card itself is not shown. |
| P02-T016 | “404 still renders correctly under a simulated DB outage.” | Started production server with deliberately unreachable `DATABASE_URI`; browser visited an unknown localized route and received HTTP 404 with the custom “This page is not here.” heading. No DB/Payload access was needed for this route. | **PASS** | The outage test covers the public 404 shell, not admin/CMS routes, which are outside this acceptance criterion. |
| P02-T017 | “Lint rule active and passing against every component built so far in this phase.” | `corepack pnpm lint` passes and reports the logical CSS checker scanned 45 source files. Inspected `scripts/check-logical-css.mjs`; no physical left/right violations were reported. | **PASS** | The check is custom static scanning; future CSS syntax should remain covered by its allowlist/tests. |
| P02-T018 | “One working scroll-reveal demo on the scaffold page.” | `ScrollReveal` scopes `useGSAP`/ScrollTrigger to its local ref and returns final state for reduced motion. Fresh non-reduced-motion production interaction showed the element's transform move from 8.13px to 0 after scroll; E2E also checks the settled state. | **PASS** | Browser E2E's default reduced-motion case alone would not prove animation; the audit added the explicit non-reduced-motion production interaction. |
| P02-T019 | “Every PRODUCT.md §29 event name exists as a typed constant.” | `lib/analytics/events.ts` exports the typed event object; unit test compares it with all ten names from PRODUCT.md §29. `track()` safely no-ops without a configured vendor and property types exclude lead PII. | **PASS** | Vendor delivery is intentionally not configured in Phase 02. |
| P02-T020 | “Explicit go/no-go recorded for Drei usage in P03.” | The report records a scoped decision to use Drei's camera helper for a future spike; the component test renders `PerspectiveCamera` with a mesh through `@react-three/test-renderer`. Frozen install and `pnpm peers check` pass. | **PASS — scoped** | This supports use of the tested camera helper with the pinned stack, not blanket approval for all Drei helpers or a production Canvas/WebGL scene. The spike did not exercise `Environment`, lighting, browser WebGL, or the intended hero scene. Phase 03 must run its own Canvas/browser smoke before relying on those pieces. |
| P02-T021 | “Ready for P03's hero/particle work to be dropped into the HOME-01/HOME-04 slots.” | `/[locale]/phase-02` composes header/footer, four labeled HOME fixture slots, modal, badge examples and reveal demo. Browser tests cover EN/AR at 1440×900, 768×1024, 390×844 and 320×740; all fixture slots are explicitly non-real content. | **PASS** | This is a slot/scaffold readiness result only. It is not a Phase 03 design, visual, or content approval. |

## 4. Font loading findings and measured payloads

### Implementation and deviation

The original task's implementation direction was `next/font`. The implementation report says that using `next/font` in the shared dynamic `[locale]` root emitted English font preload hints on Arabic pages. The current implementation uses licensed local WOFF2 files, CSS `@font-face`, Unicode-range subsets, `font-display: swap`, and server-rendered `ReactDOM.preload` calls for Space Grotesk and Inter only when `locale === 'en'` in `app/[locale]/layout.tsx`. This is a deliberate implementation deviation. The requested output behavior (locale isolation and byte budgets) passed the browser checks.

### Actual browser measurements

Measured in fresh Chromium production contexts with cache disabled. `body bytes` are decoded response-body byte lengths; `transferred bytes` are Resource Timing `transferSize` including response overhead. These are observed network response values, not estimates based on filenames.

| Locale | Font responses observed | Body bytes | Transferred bytes | Budget | Result |
|---|---|---:|---:|---:|---|
| English | Space Grotesk Latin 22,320; Inter Latin 48,432; IBM Plex Mono 400 10,052 | **80,804** | **81,704** | 180 KiB / 184,320 bytes | Pass |
| Arabic | IBM Plex Sans Arabic Latin 13,944; Arabic subset 33,512 | **47,456** | **48,056** | 120 KiB / 122,880 bytes | Pass |

English fetched no Arabic font files. Arabic fetched no English font files and had zero font preloads. The unused IBM Plex Mono 500 asset was not requested on the audited routes. On Arabic text, `document.fonts.check` passed and Chromium's platform-font inspection identified the H1 glyphs as IBM Plex Sans Arabic. The Arabic subset serves Arabic glyphs; the Latin subset is used for Latin characters/branding on Arabic routes, not as a fallback for Arabic glyphs.

### Layout shift

The fonts use `font-display: swap` without fallback metric overrides. Browser-measured unthrottled cumulative layout shift was low but nonzero for Arabic at some viewports (0.011 desktop, 0.0265 tablet; near-zero mobile). With a 700 ms font response delay, Arabic tablet CLS reached 0.0547. English remained near zero (maximum observed 0.0013). This does not exceed a stated Phase 02 font byte criterion, but it is a typography/performance risk for later headline-heavy pages and should be remeasured with hero copy and metric-adjusted fallback before visual acceptance of those pages.

## 5. Three.js / Drei compatibility findings

Pinned packages inspected: React/React DOM 19.3.1, Three.js 0.186.1, React Three Fiber 9.8.1, Drei 10.7.9, and `@react-three/test-renderer` 9.1.1. Registry peer metadata queried during the implementation and `pnpm peers check` passed. The selected peer ranges accept React 19, Fiber 9, and the tested Three version. The official [React Three Fiber releases](https://github.com/pmndrs/react-three-fiber/releases) identify the current v9 line as compatible with React 19.3.

`corepack pnpm test` reproduces the `THREE_CJS_DEPRECATED` warning. With `NODE_OPTIONS=--trace-deprecation`, the call path points to `three@0.186.1/build/three.cjs`, required from `@react-three/test-renderer/.../react-three-test-renderer.cjs.dev.js`. The warning originates from the **test renderer's CommonJS import of Three.js**. It is not emitted by the application, React compatibility layer, Fiber runtime, or Drei itself. The renderer test passes and finds both a Mesh and `PerspectiveCamera` in its scene graph.

**Compatibility conclusion:** evidence supports the pinned peer compatibility and the tested Drei camera helper in the test renderer. It does not establish browser WebGL compatibility or validate Drei environment/lighting helpers. Phase 02 task T020 records a scoped camera-helper decision; do not interpret that as a blanket Phase 03 hero go-ahead. A real browser Canvas smoke with the intended helper set is required before using that stack in the hero.

## 6. Visual, responsive, and RTL/LTR findings

Fresh production screenshots were captured and reviewed at the documented desktop, tablet and mobile widths:

- `test-results/phase-02-independent-audit/prod-en-desktop.png`
- `test-results/phase-02-independent-audit/prod-en-tablet.png`
- `test-results/phase-02-independent-audit/prod-en-mobile.png`
- `test-results/phase-02-independent-audit/prod-ar-desktop.png`
- `test-results/phase-02-independent-audit/prod-ar-tablet.png`
- `test-results/phase-02-independent-audit/prod-ar-mobile.png`
- `test-results/phase-02-independent-audit/prod-en-mobile-drawer.png`
- `test-results/phase-02-independent-audit/prod-ar-mobile-drawer.png`
- `test-results/phase-02-independent-audit/prod-en-modal.png`

The captures show the Cobalt Blue & Porcelain palette, bilingual typography, logical EN/AR header/footer ordering, CTA, modal, badges and fixture slots. Arabic content is right-aligned and its Arabic glyphs use IBM Plex Sans Arabic. The mobile footer stacks as intended, and RTL placement reverses through logical layout rules. No horizontal overflow was detected at 1440×900, 768×1024, 390×844 or the 320×740 E2E narrow viewport. The prototype page has substantial blank space below the header; this is a scaffold presentation, not a complete marketing composition.

The mobile drawer's direction and keyboard behavior work, but its undefined background token makes the drawer transparent and lets underlying content compete with navigation text. This is visually clear in both EN and AR drawer screenshots and is a release-blocking design/accessibility defect.

This route is a design-system scaffold, not an assembled component gallery. It does not visually render FormField/Checkbox, Accordion, OversizedNumeral, ServiceRow, ProjectShowcase, Skeleton, EmptyState, or the 404 state in the normal production screenshot set. The Modal, badges, CTA, Header/Footer and reveal are represented. Those absent examples may be inspected in code/unit tests, but those are not browser visual approval. No claims are made about final marketing pages, hero/particle work, or Phase 03 visual quality.

## 7. Accessibility findings

The fresh browser suite ran Axe on the prototype in English and Arabic across its viewport projects and reported no serious/critical issue on the normal shell routes. Keyboard tests passed for the drawer in both directions and for modal focus/close behavior. The independent audit also opened the mobile drawer and ran Axe against the actual open state:

- English: one **serious `color-contrast`** violation, 2.13:1 for language-switch text against the actual composited drawer backdrop; 4.5:1 is required for that text size.
- Arabic: no Axe violation was emitted for the drawer instance, but the panel's transparent computed background and visible page-through defect remained.

The implementation report's summary that the complete browser suite has no serious/critical violations needs this qualification: the independent open-drawer state exposes a serious issue. Fix the surface token and repeat Axe plus keyboard and visual checks in EN and AR.

## 8. Tests and skipped-test analysis

Fresh audit runs:

| Command/check | Result |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Pass; lockfile current |
| `corepack pnpm test` | Pass; 5 files, 25 tests. Emits the traced Three.js CJS deprecation described in §5. |
| `corepack pnpm lint` | Pass; ESLint plus logical CSS check across 45 source files |
| `corepack pnpm format:check` | Pass |
| `corepack pnpm typecheck` | Pass |
| `corepack pnpm peers check` | Pass; no unmet peer dependencies |
| `corepack pnpm e2e` | Pass; 71 passed, 5 skipped (76 total) across desktop/tablet/mobile/narrow projects |
| `corepack pnpm build` | Pass; Next 16.4.1 Webpack production build |
| `corepack pnpm auth:check` | Pass; first user, login/protected access, DB restart persistence and cleanup |
| `docker compose --env-file .env.local exec -T app pnpm db:check` | Pass; app-to-PostgreSQL connection |
| Production 404 with unreachable `DATABASE_URI` | Pass; HTTP 404 and custom localized heading while database is unavailable |
| Browser font measurement | Pass; actual locale-isolated requests and byte totals recorded in §4 |
| Browser non-reduced-motion reveal | Pass; transform settles from 8.13px to 0 after scroll |

The five skips are expected project filters in `e2e/phase-02.spec.ts`: two desktop instances skip mobile-drawer keyboard tests because the desktop UI has no mobile drawer; three tablet/mobile/narrow instances skip the button-hover test because that interaction is desktop-only. Each behavior runs in the viewport where it applies. These are legitimate, not missing test results.

## 9. Git review

- Local `main` is at `5166846a1c81e19c7c4c6b64db2cb177325e22f4`; `origin/main` is at `18b6467e28b7368c0eef12dba0c2dbe9ee3fcef1`.
- Local `main` is **one commit ahead and zero commits behind** `origin/main`. No push was performed.
- Reviewed commit `5166846` contains 69 changed paths: Phase 02 implementation, dependencies/lockfile, tests, fonts and their licenses, screenshots, `TASKS.md`, and the implementation report. No unrelated user documents or local database/environment files are part of that commit.
- A targeted high-confidence secret-pattern scan of the commit diff found zero matches. This is a targeted scan, not a claim of exhaustive secret-scanner coverage.
- `PHASE-01-OWNER-ACCEPTANCE-AUDIT.md` remains untracked and untouched. E2E updates to tracked screenshot evidence were restored after the run. The new audit report is also untracked; nothing was committed or pushed.

## 10. Required corrective actions

1. Define a valid white/surface token or replace `--color-white-pure` references with an existing token in the drawer, form controls, fallback notice and classification badge. Add a guard test for undefined custom properties.
2. Re-capture and review the drawer in English and Arabic at mobile/tablet widths; rerun open-drawer Axe and keyboard tests. Acceptance requires an opaque panel and no serious/critical contrast issue.
3. Add rendered browser examples for form fields, Accordion, OversizedNumeral, ServiceRow, ProjectShowcase, loading/empty states and 404, then compare each against the cited design/blueprint details. Preserve fixture labeling and do not imply these are production pages.
4. Re-measure Arabic CLS with delayed fonts after representative headline and body content exists; consider metric-compatible fallback faces before Phase 03 visual acceptance.
5. Before any Phase 03 Canvas/hero dependency on Drei, run a browser WebGL smoke with the actual camera/lighting/environment helpers intended for use and record the exact supported scope.
6. After corrections, rerun the relevant test suites and update task evidence. Keep task workflow statuses IN_REVIEW until the authorized review process records its decision.

## 11. Recommendation

**NO-GO for formal Phase 02 acceptance at this audit point.** P02-T008 and P02-T011 fail because an undefined surface token breaks specified design behavior; P02-T012 through T014 have insufficient rendered visual evidence. The remaining task results and automated checks provide useful passing evidence but do not offset those findings. Fix the shared surface token, obtain the missing component visual evidence, and repeat the affected accessibility/browser checks before requesting formal review.

This report does not mark Phase 02 tasks DONE, record owner approval, authorize a push, or claim Phase 03 visual approval. No Phase 03 work was started.
