# RAKMYAT — Phase 02 Implementation & Acceptance Report

**Report date:** 2026-10-15
**Project:** `H:\Projects\rakmyat`
**Branch:** `main`
**Scope:** P02-T001 through P02-T021
**Review role:** Implementation and evidence review by Codex. This is not an independent human Technical Lead approval or owner visual approval.

## 1. Executive summary

Phase 02 establishes the Cobalt Blue & Porcelain design foundation, bilingual EN/AR component system, responsive prototype validation route, and the documented motion, analytics, and Three.js readiness foundations. The implementation remains inside Phase 02: no production marketing page, hero sculpture, Systems in Motion particle scene, or Phase 03 visual prototype was built. Fixture content is labeled as non-real content.

All 21 Phase 02 acceptance areas have implementation evidence. The original independent review found an undefined surface token affecting the drawer and fields and missing browser visuals for Accordion, OversizedNumeral, and ServiceRow. A corrective pass fixed the token and added the missing localized production visual evidence; current revalidation results supersede the earlier counts below: production build, typecheck, lint and logical CSS check, formatting, 27 unit tests, 95 browser passes, open-drawer accessibility scans, Payload authentication persistence, and PostgreSQL connectivity all passed. The browser suite reports five expected viewport-specific skips; see the corrective addendum.

At initial implementation review, the Phase 02 task register was **IN_REVIEW** pending the independent audit and owner decision. Following the corrective revalidation and the Project Owner's approval dated October 15, 2026, all 21 verified tasks are now **DONE** in TASKS.md. No separate external or human Technical Lead approval is claimed. P02-T003/T004 use self-hosted, licensed WOFF2 subsets with locale-conditional React preload hints rather than `next/font` route modules; this deviation and the measured payload/CLS results are disclosed below and accepted as a Phase 03 follow-up.

**Recommendation: CONDITIONAL GO for formal Phase 02 technical review.** Do not start Phase 03 until the designated Technical Lead records their review and the owner separately approves the Phase 03 visual gate. No Phase 03 approval is asserted.

## 2. Authorization and entry gate

The Project Owner formally approved Phase 01 closure on 2026-10-15. The approval and corrective evidence are recorded in `PHASE-01-CLOSURE-REPORT.md` and `TASKS.md`. The technical-advisory record is attributed to Codex; it does not represent a separate human Technical Lead signature. The Phase 01 approval commit is present on `origin/main` at `8eb0d3166b374e8d52dd74926a655e887e4ba8db`.

The accepted Phase 01 corrective/closure and Phase 02 source-document commit is local at `18b6467e28b7368c0eef12dba0c2dbe9ee3fcef1`. The independent owner audit, `PHASE-01-OWNER-ACCEPTANCE-AUDIT.md`, remains an untracked user artifact and was preserved. Phase 02 implementation is not pushed.

## 3. Task-by-task acceptance matrix

This final matrix reflects the accepted task outcomes after corrective revalidation and the Project Owner's October 15, 2026 closure decision. Task status records acceptance of each task's stated criteria; it does not imply a separate human Technical Lead signature or Homepage visual approval.

| Task | Acceptance evidence and result | Status |
|---|---|---|
| P02-T001 | Tailwind v4 `@theme` includes the documented design tokens and layout/type aliases. Token-name test compares DESIGN.md §34 against CSS; forbidden legacy palette values are checked. | DONE |
| P02-T002 | WCAG relative-luminance checks cover primary, secondary, and muted text on page, tinted, and white surfaces; interactive borders on all three; white on primary CTA and deep cobalt. Exact ratios are in §4. | DONE |
| P02-T003 | Self-hosted Space Grotesk, Inter, and IBM Plex Mono subsets are served only when their English faces are used. EN renders exactly two font preload hints (Space Grotesk and Inter); transfer stays within 180 KiB. Uses static licensed WOFF2 assets and React preload hints instead of the prescribed `next/font` modules; see §6. | DONE — accepted deviation and Phase 03 CLS follow-up |
| P02-T004 | IBM Plex Sans Arabic WOFF2 subsets load for Arabic; browser checks confirm Arabic glyph coverage, no Space Grotesk/Inter faces on Arabic pages, zero Arabic font preloads, and transfer within 120 KiB. Uses local WOFF2/CSS rather than `next/font`; see §6. | DONE — accepted deviation and Phase 03 CLS follow-up |
| P02-T005 | PrimaryButton provides `lg`/`md`/`sm`, disabled and loading behavior, visible focus styling, and deepens to deep cobalt on hover. Unit and browser tests cover loading and hover. | DONE |
| P02-T006 | SecondaryButton, TextLink, and IconButton provide semantic link/button variants, labels, size/focus styling, and logical layout. Unit tests verify accessible roles and names. | DONE |
| P02-T007 | Header provides logo, desktop navigation, language selection, CTA, responsive collapse, and scroll-state styling. EN/AR route/browser checks verify rendered navigation and layout. | DONE |
| P02-T008 | Radix-based mobile drawer supports focus containment, Escape and close controls, direction-aware inline-end entry, and swipe toward inline-start. Keyboard-only tests cover EN/AR on tablet and mobile profiles; focus returns to the trigger. Corrective E2E additionally verifies opaque panel/scrim, open-state Axe, narrow mobile, outside-click backdrop, reduced motion and focus restoration. | DONE |
| P02-T009 | Localized language switch uses next-intl `getPathname` to generate locale-specific native `<a>` hrefs, preserves `/phase-02` in both directions, and records fallback notice state when a route is unavailable. Unit and browser route-switch tests pass. | DONE |
| P02-T010 | Footer renders the four logical content groups, language switch, copyright, and responsive single-column layout. EN/AR browser and screenshot evidence included. | DONE |
| P02-T011 | FormField supports input, textarea, select, labeled hints/errors, `aria-live="polite"` validation status, and forces email/numeric/phone/url fields to LTR. Corrective RTL/EN browser fixtures show default/focus/invalid/disabled states, real field surfaces and checkbox states in both locales; Axe passes. | DONE |
| P02-T012 | Radix Accordion and Modal are implemented with reduced-motion styles. Corrective production browser evidence covers Accordion collapsed/expanded and reduced-motion instant behavior in EN/AR at desktop/tablet/mobile/narrow-mobile; existing Modal keyboard/focus checks remain passing. | DONE |
| P02-T013 | OversizedNumeral is reusable, responsive, and hidden from assistive technology as decorative content. Corrective production screenshots show its actual low-opacity editorial composition with adjacent service copy in both directions and at all four widths. | DONE |
| P02-T014 | ServiceRow renders as one accessible link, includes the decorative numeral, and uses logical direction-aware motion. Corrective browser evidence covers default/focus at all four widths and hover at desktop/tablet, with direction-aware 8px shift, in EN/AR. | DONE |
| P02-T015 | ProjectShowcase uses `next/image`, a 16:10 media frame, accessible image text, and all four classification badge variants. Unit tests cover image/card semantics; browser tests verify four distinct badge border colors and screenshots show the labeled fixtures. | DONE |
| P02-T016 | Skeleton, EmptyState, and localized 404 shells are implemented. A production server with `DATABASE_URI` intentionally set to unreachable `127.0.0.1:9` returned the custom localized 404 with HTTP 404 and its expected heading. | DONE |
| P02-T017 | `pnpm lint` runs the custom logical CSS enforcement check over 45 app/component/lib source files. No physical left/right layout or unapproved horizontal transform violations were found. | DONE |
| P02-T018 | GSAP/useGSAP and ScrollTrigger are section-scoped to the component ref. The prototype includes a reveal demo; browser test checks the reduced-motion static state. | DONE |
| P02-T019 | Analytics event names are typed from the PRODUCT.md §29 set, property shapes exclude lead PII fields, and the adapter safely no-ops with no vendor. Unit test passes. | DONE |
| P02-T020 | `@react-three/drei` `PerspectiveCamera` rendered through the pinned React 19/R3F/Three test renderer without runtime/type errors; frozen install and peer checks pass. Decision: use Drei's camera helper for the future spike; do not build a 3D scene in Phase 02. | DONE |
| P02-T021 | `/[locale]/phase-02` composes the Header, Footer, four labeled HOME fixture slots, classification examples, Modal check, and reveal demo. Browser coverage includes EN/AR at 1440×900, 768×1024, 390×844, and 320×740. | DONE |

## 4. Contrast evidence

The following ratios were computed from the implemented hex tokens using WCAG relative luminance. They meet the targets in DESIGN.md §5.4.

| Pairing | Ratios |
|---|---:|
| Primary ink `#111827` on porcelain `#F7F8FC` / tinted `#EDF2FF` / white `#FFFFFF` | 16.72:1 / 15.84:1 / 17.74:1 |
| Secondary ink `#475569` on porcelain / tinted / white | 7.14:1 / 6.76:1 / 7.58:1 |
| Muted ink `#606C80` on porcelain / tinted / white | 5.00:1 / 4.74:1 / 5.31:1 |
| Interactive border `#6D82B8` on porcelain / tinted / white | 3.57:1 / 3.39:1 / 3.79:1 |
| White on primary CTA cobalt `#2453FF` / deep cobalt `#1736B8` | 5.59:1 / 9.31:1 |

The hairline `#DCE3F1` is used for decorative dividers only, consistent with DESIGN.md. No new palette was introduced.

## 5. Design system and browser evidence

- **Tokens:** brand and semantic colors, surface/border states, typography scales/weights/leading/tracking, spacing, containers, breakpoints, grid, radii, shadows, motion/easing, z-index, and `--dir` support.
- **Typography:** Space Grotesk, Inter, IBM Plex Mono, and IBM Plex Sans Arabic are self-hosted as licensed subsets. Browser checks assert English font preloads are exactly two, Arabic preloads are zero, only locale-appropriate families load, and both locale budgets pass.
- **Components:** buttons, links, icon button, responsive header, language switch, mobile drawer, footer, form controls and feedback, Accordion, Modal, service row, project showcase/classification badges, oversized numeral, skeleton, empty state, and 404 shell.
- **Direction and layout:** logical CSS enforcement, direction tokens, localized HTML `lang`/`dir`, direction-aware drawer/motion, next-intl `getPathname` links for locale switching, and no horizontal overflow at tested widths.
- **Motion/analytics/3D readiness:** scoped GSAP reveal, reduced-motion behavior, typed no-op analytics, and a Drei helper compatibility spike. No production analytics vendor or WebGL scene is configured.
- **Visual artifacts:** production-rendered screenshots under `screenshots/phase-02/`: EN/AR desktop, tablet, and mobile. The narrow-mobile route is browser-tested at 320 px but intentionally has no screenshot artifact. The screenshots show only fixture-labeled implementation content.

## 6. Technical decisions and known limitations

1. **Locale-scoped fonts:** `next/font` in the shared dynamic locale root generated preload hints for English faces on Arabic pages. The implementation now uses licensed self-hosted WOFF2 subsets, CSS `@font-face`, and server-rendered `ReactDOM.preload` calls only for EN. Browser checks verify zero cross-locale font requests/preloads and the required budgets. This meets the performance/locale acceptance outcome but differs from the task's `next/font` implementation instruction; a human Technical Lead should review this deviation.
2. **Drei compatibility:** the test-renderer smoke emitted an upstream `THREE_CJS_DEPRECATED` warning from `@react-three/test-renderer` loading `three` through CommonJS. Rendering, TypeScript, and peer checks passed. This is a dependency warning, not a failed test; revisit when upgrading the test renderer.
3. **Production database topology:** the standalone production host process cannot reach the Compose-only database by design. Payload authentication/persistence was verified via `pnpm auth:check` against the project environment, and `db:check` succeeded inside the Compose app. The standalone invalid-DB process was used only for the 404-without-DB acceptance check.
4. **GraphQL:** remains intentionally disabled under the Phase 01 disposition. Browser checks assert GraphQL and playground routes are unavailable; re-enabling requires resolving the duplicate scalar/module issue and adding API tests.
5. **Phase 03 work:** none started. The prototype route is a removable, fixture-only validation surface and is not part of the production route inventory.

## 7. Validation results

| Command / check | Result |
|---|---|
| `corepack pnpm install --frozen-lockfile` | PASS — lockfile current; pinned pnpm 12.11.2 |
| `corepack pnpm lint` | PASS — ESLint and logical CSS check; 45 source files |
| `corepack pnpm format:check` | PASS |
| `corepack pnpm typecheck` | PASS |
| `corepack pnpm test` | PASS — 5 files, 25 tests; upstream Three.js CommonJS deprecation warning noted in §6 |
| `corepack pnpm e2e` | PASS — 71 passed, 5 expected skips; 76 total across four viewport projects |
| `corepack pnpm peers check` | PASS — no peer issues |
| `corepack pnpm build` | PASS — Next 16.4.1 Webpack production build |
| `corepack pnpm auth:check` | PASS — setup/login, protected access, PostgreSQL restart persistence, cleanup |
| `docker compose --env-file .env.local exec -T app pnpm db:check` | PASS — PostgreSQL connection |
| Production custom 404 with unreachable `DATABASE_URI` | PASS — HTTP 404 and localized custom heading; Payload admin is not part of this DB-outage expectation |
| Production screenshot run | PASS — six EN/AR screenshots across desktop/tablet/mobile; six route, font, layout, and axe checks passed |

The full E2E suite runs axe on the shell and prototype route in both languages across four viewport profiles. No serious or critical violations were reported. Manual keyboard checks are backed by browser tests for the drawer and modal.

## 8. Git and file safety

The Phase 02 implementation is committed locally on `main` (commit subject: `Implement Phase 02 design system foundation`). `origin/main` is `18b6467e28b7368c0eef12dba0c2dbe9ee3fcef1`, which includes the approved Phase 01 closure and Phase 02 source documents. The implementation commit has not been pushed and remains subject to human Technical Lead review. The Phase 01 independent owner audit remains untracked and untouched.

The implementation commit contains only Phase 02 implementation, tests, screenshots, font assets/licenses, TASKS.md evidence, and this report. `.env.local`, database state, build output, test reports, and unrelated user files are excluded.

## 9. Phase 02 recommendation and Phase 03 handoff

**CONDITIONAL GO for Technical Lead review.** Implementation and verification evidence are complete for all 21 task areas. Keep their workflow status **IN_REVIEW** until a human Technical Lead completes the exit review and records approval. The WOFF2/preload implementation deviation and Three.js test-renderer warning are disclosed above.

The token system, bilingual type/layout rules, reusable UI primitives, focus behavior, reduced-motion wrapper, analytics contract, labeled prototype slots, and Drei helper spike are ready for that review. Do not begin Phase 03 until the Technical Lead signs off Phase 02 and the owner explicitly approves the Phase 03 visual checkpoint. No owner visual approval or Phase 03 approval is claimed.

## 10. Corrective acceptance addendum (2026-10-15)

This addendum records the corrective pass against the complete historical independent report in [PHASE-02-ACCEPTANCE-AUDIT.md](PHASE-02-ACCEPTANCE-AUDIT.md). The original report is preserved unchanged. Evidence details and the exact-criteria matrix are in [PHASE-02-CORRECTIVE-ACCEPTANCE-REPORT.md](PHASE-02-CORRECTIVE-ACCEPTANCE-REPORT.md).

- **Undefined surface token:** replaced all `--color-white-pure` uses with approved `--color-surface-1` in shared UI styling. `tests/design-foundation.test.ts` now checks every referenced `--color-*` token in shared/app CSS is declared in `app/globals.css`; no undefined color-token references remain.
- **Drawer:** panel uses opaque surface1; open-state Axe scans pass with zero serious/critical issues for EN/AR at tablet, mobile and narrow-mobile. Browser tests cover physical entry edge, panel/scrim, keyboard open, focus containment, Tab navigation, Escape, focus restoration, backdrop dismissal where exposed, and reduced motion. Desktop correctly has no mobile drawer.
- **Forms:** controls and checkbox use the approved surface and interactive border. Corrective fixtures exercise default, hover/focus, disabled and error states, announcements, descriptions, and LTR email/numeric controls in both locale trees. Success styling is not part of the documented component contract; success validation remains a sibling message component rather than an invented green palette state.
- **Visual evidence:** production screenshots in `screenshots/phase-02/corrective/{en,ar}-{desktop,tablet,mobile,narrow-mobile}/` include the localized fixture prototype, Accordion collapsed/expanded, form controls, ServiceRow default/focus, ServiceRow hover at desktop/tablet, and drawer open for viewport widths below 1024px. These are actual production-browser renders of the implementation, not mockups.
- **Fonts:** measured transfer remains English 81,704 bytes (80,804 body) against 184,320 bytes and Arabic 48,056 transferred (47,456 body) against 122,880 bytes. Locale isolation and IBM Plex Sans Arabic glyph rendering pass. The source implementation still differs from the `next/font` implementation direction: licensed WOFF2 + CSS and locale-conditional `ReactDOM.preload` are used to avoid English preloads from the shared locale root. This deviation is not hidden or recast as `next/font`; measured outcome criteria pass. Delayed Arabic font loading had previously measured tablet CLS 0.0547; retain that risk for later representative hero typography review.
- **Drei:** scoped compatibility remains limited to `PerspectiveCamera` + a trivial mesh under the test renderer and clean package peer checks. The CJS deprecation reproduces from `@react-three/test-renderer` importing Three's CommonJS build; it is not an application, React, Fiber or Drei runtime warning. No browser Canvas/WebGL, Environment, lighting or production hero test is claimed. The selected camera helper is supported by the tested spike only; any broader scene requires its own browser smoke.
- **Skipped browser cases:** unchanged 5 skips are legitimate project filters: two desktop runs skip mobile-drawer cases because desktop has no mobile drawer; three tablet/mobile/narrow runs skip desktop-only hover behavior. Both interaction types run in the applicable projects.
- **Final verification:** `corepack pnpm install --frozen-lockfile`, `pnpm test` (5 files/27 tests; known test-renderer warning), `pnpm e2e` (95 passed/5 skipped), lint/logical CSS (45 source files), format check, typecheck, peer check, production build, `pnpm auth:check`, and in-container `pnpm db:check` passed. Production screenshots were captured with `next start` at 1440×900, 768×1024, 390×844 and 320×740. E2E Axe checks include both the closed page and actual open drawer; no serious or critical violations were reported.
- **Workflow and gate:** all 21 tasks remain `IN_REVIEW`; no task is marked `DONE`. This addendum is technical-advisory evidence only, not a human Technical Lead approval, owner acceptance, or Phase 03 visual approval. No Phase 03 work has begun.

**Updated recommendation:** CONDITIONAL GO for final owner/technical review of Phase 02 evidence. Acceptance is not recorded here. The font-loading mechanism deviation and delayed Arabic CLS risk remain explicit review items; Drei readiness is scoped to the tested camera helper. Phase exit stays pending the project’s required reviewer decisions.

## 11. Formal Phase 02 closure decision (2026-10-15)

**Project Owner decision:** The Project Owner reviewed the Phase 02 corrective acceptance results and desktop, tablet, and mobile screenshots and formally **APPROVED Phase 02 closure on October 15, 2026**, with the technical limitations and visual follow-up items below. This is the Project Owner's decision. The technical record is Codex's evidence-based advisory review; no separate external or human Technical Lead approval is claimed.

All 21 Phase 02 acceptance criteria were verified against the final matrix and are marked `DONE` in TASKS.md. The sticky-header/form check found that scrolling the email field at 320px Arabic could place its label behind the 72px sticky header. Form controls now have a logical `scroll-margin-block-start` that keeps the full label/input below the header. A Playwright regression checks both label and input geometry in EN/AR at 1440, 768, 390, and 320px; the final check passed. Production screenshots also include the scrolled form/header state.

The Project Owner accepts these recorded limitations for Phase 02 closure:

1. **Fonts:** locale-specific browser requests and measured payload budgets pass, but the code uses licensed local WOFF2/CSS faces and conditional `ReactDOM.preload`, not the task-directed `next/font` modules. English transfer is 81,704 bytes; Arabic transfer is 48,056 bytes. Arabic tablet CLS measured 0.0547 with a 700ms font delay. Reassess fallback metrics and CLS on representative Phase 03 hero copy.
2. **Drei:** the compatibility result is scoped to the tested `PerspectiveCamera` helper with the pinned dependency set. The `THREE_CJS_DEPRECATED` warning comes from the test renderer's CommonJS import of Three. Browser Canvas/WebGL, Environment, lighting, and the final hero scene were not tested; Phase 03 must run the intended browser smoke before relying on them.
3. **Visual follow-up:** no approved project artwork was available for a ProjectShowcase media screenshot, and the corrective screenshot set does not claim visual acceptance for ProjectShowcase, loading/empty or 404 presentation. The task-level badge and DB-outage criteria pass; these broader presentation checks remain visual follow-ups. Phase 03's homepage design is not approved by this closure.

The final regression run passed: 27 unit tests; 95 browser tests with five documented viewport-specific skips; open-drawer Axe scans with zero serious/critical violations; lint, formatting, typecheck, peer checks, frozen installation, production build, Payload authentication/persistence, and PostgreSQL connectivity. The final commit/push synchronization is recorded in the repository history and completion message.

**Phase 02 is formally closed by Project Owner approval dated 2026-10-15.** This closure does not approve the homepage design, start Phase 03, or claim a separate human Technical Lead signature. The prepared [PHASE-03-ENTRY-CHECKLIST.md](PHASE-03-ENTRY-CHECKLIST.md) is planning guidance only.
