# RAKMYAT — PLAN.md
### Master Implementation Plan (10 Phases)

**Status:** Planning only. No application code, packages, containers, or deployments were created in producing this document.
**Source documents (read in full before planning):** [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [TECHNICAL-ARCHITECTURE.md](./TECHNICAL-ARCHITECTURE.md) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md) · [DESIGN-AUDIT-REPORT.md](./DESIGN-AUDIT-REPORT.md) · [VISUAL-ASSET-MATRIX.md](./VISUAL-ASSET-MATRIX.md) · [VISUAL-QUALITY-GATES.md](./VISUAL-QUALITY-GATES.md) · [COBALT-PORCELAIN-MIGRATION-REPORT.md](./COBALT-PORCELAIN-MIGRATION-REPORT.md) · [COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md](./COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md). All ten existed and were present; none were missing.
**Companion:** [TASKS.md](./TASKS.md) — the executable task register this plan governs. This file states *what* and *why* and *in what order*; TASKS.md states the concrete, independently-executable units.
**Numbering note:** this is the first *implementation* phase sequence (Phase 01–10). It is distinct from the documentation phases already completed (Phase 01 "PRODUCT/DESIGN," Phase 02 "TECHNICAL-ARCHITECTURE/PAGE-BLUEPRINTS/CMS-SCHEMAS," Phase 03 "visual hardening," Phase 03B "Cobalt & Porcelain migration") — those are documentation milestones already behind this project; "Phase 01" below always means *implementation* Phase 01 unless explicitly marked "documentation Phase 0X."

---

## 1. Executive Implementation Summary

Rakmyat's website moves from fully-specified documentation into a ten-phase implementation sequence: foundation and dependency verification (01) → design-system/prototype scaffolding (02) → a hard, owner-approved visual-prototype checkpoint (03) → CMS and content infrastructure (04) → the complete homepage (05) → services/about/process (06) → portfolio/case studies (07) → contact/lead handling (08) → security/SEO/accessibility/performance hardening (09) → production deployment and launch (10). The single most consequential planning decision carried into this document is the **hard blocking dependency at the end of Phase 03**: no page or feature beyond the six-element prototype may be implemented until the owner has explicitly approved the Cobalt Blue & Porcelain visual direction as actually rendered in a browser. Every task in Phases 04–10 is gated on that approval, not merely sequenced after it.

---

## 2. Documentation Baseline

All ten source documents were read in full. One confirmed inconsistency was found and corrected (PRODUCT.md's theme declaration still read "Dark mode only, no toggle" — a residue from before the Phase 03B Cobalt & Porcelain migration); a second, same-category residue was found in the same read-through (PRODUCT.md §36 MVP Scope's "dark-only" qualifier) and corrected identically. Both corrections are logged with full before/after/source/reason in §32 and in this session's final response. No other active document contained a stale normative statement — verified by a full-text search across every active file for the retired palette's names and hex values, re-run after the corrections to confirm zero remaining matches outside the two documents whose job is specifically to preserve that history (DESIGN-AUDIT-REPORT.md, which carries its own superseded-notice banner, and COBALT-PORCELAIN-MIGRATION-REPORT.md/VISUAL-ASSET-MATRIX.md §15, which discuss the old palette only in explicitly contrastive "old→new" language). No document was rewritten wholesale; only the two unambiguous, source-backed corrections were applied.

---

## 3. Approved Decision Hierarchy

When a task in TASKS.md needs to resolve an ambiguity, it resolves it in this order:

1. **Explicit locked decisions in this prompt's governing briefs** (Phase 02/03/03B/04 prompts, as already reflected in the current documents).
2. **DESIGN.md** for anything visual, interactive, motion, or material.
3. **PRODUCT.md** for anything business, content, route, or CTA.
4. **TECHNICAL-ARCHITECTURE.md / CMS-SCHEMAS.md** for engineering mechanics needed to realize 2–3.
5. **PAGE-BLUEPRINTS.md / VISUAL-ASSET-MATRIX.md / VISUAL-QUALITY-GATES.md / COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md** for section-level and asset-level specification and verification detail.

An implementation agent encountering a genuine gap logs it as `OWNER DECISION REQUIRED` (if it's a real-world input, §26) or `SPECIFICATION GAP` (if it's a documentation gap already catalogued in PAGE-BLUEPRINTS.md §31.3/§30) — it never invents a resolution silently. This mirrors the discipline already established across every prior phase of this project.

---

## 4. Cobalt & Porcelain Identity Lock

Binding for every task in this plan, restated from DESIGN.md §5/§27/§43 and the migration/acceptance documents:

| Rule | Detail |
|---|---|
| Default surface | Porcelain-first (`color.bg.page` `#F7F8FC`, `color.bg.section.tinted` `#EDF2FF`) — light is the default, not dark |
| Dark sections | Exactly two on the homepage: HOME-04 (Systems in Motion) and HOME-08 (Final Conversion), using `color.bg.section.dark` (`#1736B8`) — never a third, never elsewhere by default |
| No toggle | No light/dark theme switch anywhere |
| Hero materials | Cobalt enamel, polished ceramic, brushed metal, matte porcelain composite, translucent cobalt glass — with a visible grounding cast shadow and a subtle cobalt reflection onto the surrounding porcelain (DESIGN.md §13/§13.1) |
| Accent discipline | Cobalt (`#2453FF`) at full saturation ≤10% of any porcelain-section viewport; excessive cobalt fills are an explicit anti-pattern (DESIGN.md §36) |
| Typography color | `color.ink.primary` for headlines, `color.ink.secondary` for body — never the reverse |
| Interactive borders | `color.border.interactive` (`#9AACD6`, 🟡 contrast estimate pending automated verification — Phase 01 task) on form fields; `color.border.hairline` (`#DCE3F1`) only on non-interactive dividers |
| Legacy palette | Navy/Cyan/Obsidian and all its hex values are retired — no task may reintroduce them |

Any task whose implementation would visually contradict this table is out of spec by definition, independent of whether it otherwise "works."

---

## 5. Architecture Summary

Restated from TECHNICAL-ARCHITECTURE.md §3/§8 (unchanged by the visual migration): one Next.js (App Router) application with Payload CMS installed natively inside it, one PostgreSQL database, one modular-monolith deployable, Docker Compose + Caddy on a self-hosted VPS. GSAP drives motion; React Three Fiber renders exactly one hero 3D scene and one particle system, both desktop-only with static fallbacks; every editorial surface is CMS-driven through the controlled collection/global/block registry in CMS-SCHEMAS.md. No microservices, no second backend, no library substitutions — this plan does not revisit any of those locked decisions.

---

## 6. Dependency Compatibility Gate

Restated and operationalized from TECHNICAL-ARCHITECTURE.md §4/§5/§32 as a **Phase 01 entry requirement, not an assumption**:

| Dependency pair | Status at last verification (2026-10-14) | Plan requirement |
|---|---|---|
| Next.js ↔ Payload CMS | Payload requires Next.js ≥16.2.0 (full support merged in `payload@3.73.0`) | P01 task re-verifies the exact installed pair against the live registry before any other P01 work proceeds |
| Payload's `@payloadcms/next` webpack hook ↔ Next.js 16 Turbopack default | Documented, unresolved compatibility risk — **BLOCKED, re-verify at implementation kickoff** | P01 task resolves this explicitly (pin a webpack-compatible config, or confirm a Payload patch has resolved it) before Phase 04 CMS work begins; this is a named entry criterion for Phase 04, not Phase 01 |
| React ↔ `@react-three/fiber` | R3F 9.5 confirmed for React 19.0–19.2; React 19.3 compatibility unconfirmed | P01 pins React to the confirmed range unless re-verification shows otherwise |
| `@react-three/drei` ↔ R3F v9/React 19 | Active, not fully settled community compatibility question | P02 task (where Drei is first actually used, for hero-sculpture camera/lighting helpers) re-verifies before relying on any Drei helper API |
| `@payloadcms/db-postgres` version | Must match `payload` core and `@payloadcms/next` exactly (monorepo versioning convention) | P04 entry task pins all four Payload packages to one identical version |
| Node.js LTS line | Node 24 Active LTS at last verification; Node 26 becomes Active LTS 2026-10-28 | P01 task checks the actual implementation start date against this date and pins accordingly |
| Tailwind CSS v4 | CSS-first `@theme` config, no `tailwind.config.js` | P02 task builds the DESIGN.md §34 token block directly as `@theme` CSS, not a JS config file |

**No dependency compatibility claim in this plan is asserted as current truth without re-verification at the moment Phase 01 actually starts** — every row above is a re-check instruction, not a guarantee, consistent with TECHNICAL-ARCHITECTURE.md §4's own "verification date" caveat.

---

## 7. MVP Scope and Route Inventory

| Route | Locale-prefixed? | Homepage sections / content | Phase delivering it |
|---|---|---|---|
| `/` | Negotiates to `/en` or `/ar` | — | P01 (negotiation logic), P05 (actual homepage content) |
| `/{locale}` (i.e. `/en`, `/ar`) | Yes | HOME-01…08 | P05 |
| `/{locale}/services` | Yes | Services archive | P06 |
| `/{locale}/services/custom-software` | Yes | Shared service template | P06 |
| `/{locale}/services/enterprise-solutions` | Yes | Shared service template | P06 |
| `/{locale}/services/ai-agents-automation` | Yes | Shared service template | P06 |
| `/{locale}/work` | Yes | Portfolio archive | P07 |
| `/{locale}/work/[slug]` | Yes | Single case study | P07 |
| `/{locale}/about` | Yes | About page | P06 |
| `/{locale}/process` | Yes | Process page | P06 |
| `/{locale}/contact` | Yes | Contact + lead form | P08 |
| `/{locale}/privacy` | Yes | Legal page (content gated on owner/legal input, §26) | P08 |
| 404 (locale-aware) | Yes | — | P01 (shell), P09 (final polish/verification) |
| `/admin` (Payload) | No (single admin surface) | — | P04 |

**Explicitly excluded from MVP** (PRODUCT.md §16/§37, restated here as a hard scope boundary): `/solutions`, `/insights` (+ `[slug]`). No phase below includes them; any future work on them is a post-launch roadmap item, not part of this plan.

---

## 8. Design System and Component Strategy

Phase 02 builds the DESIGN.md §18 component registry once, as a shared library, before any full page consumes it: Header/Mobile Nav (§18.1–§18.2), Logo (§18.3), Primary/Secondary Buttons (§18.4–§18.5), Text Link/Icon Button (§18.6–§18.7), Service Row (§18.8), Project Showcase (§18.9), Interactive Diagram (§18.10), Accordion (§18.11), Form controls (§18.12–§18.14), Toast/Modal (§18.15–§18.16), Contact CTA band (§18.17), Footer (§18.18), Loading/Empty/404 states (§18.19–§18.21), the oversized-numeral micro-detail device (§18.22), and the Language Switcher (§20). Every component is built with its full state matrix (default/hover/focus/active/disabled/loading) and both RTL and LTR compositions **in the same implementation pass** — this plan does not permit an "LTR now, RTL later" task split anywhere, per DESIGN.md's own binding rule.

---

## 9. Localization and RTL/LTR Strategy

`next-intl` provides locale routing, message catalogs for UI chrome strings, and the internationalized navigation APIs (TECHNICAL-ARCHITECTURE.md §11–§13). Root `/` negotiation (valid locale cookie → quality-ordered `Accept-Language` → English fallback, without geo detection; owner-approved 2026-10-15) is a Phase 01 task since every subsequent page depends on it existing. `<html lang/dir>` is set at the document-root layout level per locale — never simulated. Every component built in Phase 02 ships both directions together; every page built in Phases 05–08 is verified in both directions before that page's tasks are marked DONE (not deferred to Phase 09, which is a *final* audit pass, not the first RTL check).

---

## 10. CMS and Database Strategy

Phase 04 builds the complete CMS-SCHEMAS.md surface in one phase, before any production page consumes it: 7 collections (Users, Media, Projects, ProjectCategories, Services, Leads, Pages), 8 globals (SiteSettings, Navigation, Footer, Homepage, AboutPage, ProcessPage, ContactSettings, SEODefaults), 14 flexible blocks (scoped only to `projects.flexibleBlocks`), the full repeater set (§19), localization (`en`/`ar-EG` with the `/en`/`/ar` public-prefix distinction, §20), the shared-slug strategy (§21), publishing/preview/access-control (§24–§26), and the Phase 03-added asset-provenance fields (§9.1). PostgreSQL schema is Payload-managed (no hand-written migrations except documented index definitions, TECHNICAL-ARCHITECTURE.md §18). No collection, global, or block is invented beyond this registry.

---

## 11. Visual Asset Production Strategy

Per DESIGN.md §42 and VISUAL-ASSET-MATRIX.md: every pending asset (3D sculpture, particle system, diagram template, icon set, logo interim lockup, OG images, favicons, surface treatments, numeral device) is produced using an authorized generation method (procedural 3D/particle construction, custom SVG, CSS construction, or AI-generated conceptual imagery where appropriate) — an implementation agent is not blocked waiting for owner-supplied decorative imagery. The **one exception** is the final brand logo (VISUAL-ASSET-MATRIX.md §14), which remains an owner-approval dependency this plan does not route around. Real/demo project screenshots remain content-gated (PRODUCT.md §23/§25) — Phase 07 ships the honest empty state until at least one approved project exists, never a generated stand-in presented as real work.

---

## 12. Motion and 3D Strategy

GSAP (+`@gsap/react`+ScrollTrigger) is the one JS animation engine; CSS covers simple state transitions (TECHNICAL-ARCHITECTURE.md §15/§24.4). React Three Fiber mounts in exactly two places — the hero sculpture and the Systems-in-Motion particle field — both desktop-only via `next/dynamic` with `ssr:false`, both with a static fallback that is independently complete per DESIGN.md §24.6's resting-state rule. No scroll-hijacking anywhere (DESIGN.md §24.5). Every motion-bearing component ships its `prefers-reduced-motion` fallback in the same task that builds its animated state — reduced-motion is not a separate backlog item.

---

## 13. Security Strategy

Implemented incrementally from Phase 01 onward (TECHNICAL-ARCHITECTURE.md §21), never deferred wholesale to Phase 09: non-root Docker users and secrets discipline from Phase 01; Payload RBAC (Super Admin/Content Editor/Lead Manager) from Phase 04; server-side Zod re-validation, rate limiting, and honeypot spam protection from Phase 08; CSP/security headers, dependency scanning, and a full access-control review as the Phase 09 *audit*, confirming what was already built rather than building security for the first time at that point.

---

## 14. Performance Strategy

DESIGN.md §33 budgets (≤180KB initial JS, ≤1.5MB hero WebGL, ≤400KB particle WebGL, locale-scoped font loading, ≤1.2MB total mobile page weight) are design constraints on Phases 02–08's component/page work, not a Phase 09 cleanup target. Phase 09 measures against these budgets on real devices and fixes regressions; it does not discover the budgets for the first time.

---

## 15. Accessibility Strategy

WCAG 2.2 AA (DESIGN.md §32/PRODUCT.md §30) is built into each component (Phase 02) and each page (Phases 05–08) at construction time — semantic landmarks, keyboard operability, `aria-live` validation, non-visual equivalents for the 3D/particle systems, bidirectional text isolation. Phase 09 runs the comprehensive `@axe-core/playwright` sweep plus the manual review automated tools cannot do (contrast-in-context, focus-order sanity, screen-reader spot checks) across every route and both locales — again, an audit of what exists, not the first accessibility work.

---

## 16. SEO and Analytics Strategy

Per-route `generateMetadata()`, `hreflang` alternates, sitemap, and Open Graph (TECHNICAL-ARCHITECTURE.md §22) are built page-by-page in Phases 05–08. Analytics event dispatch (PRODUCT.md §29, the `lib/analytics/track.ts` abstraction, TECHNICAL-ARCHITECTURE.md §23) ships as a no-op-safe abstraction from Phase 02 so every later page can fire its events without waiting on vendor activation; GA4 (or whatever vendor is ultimately approved) is wired behind that abstraction once PRODUCT.md §34's pending analytics-platform decision resolves — this plan does not block any page's build on that decision.

---

## 17. Testing Strategy

| Layer | Tool | When it's written |
|---|---|---|
| Unit | Vitest | Alongside the function it tests, every phase |
| Component | React Testing Library | Alongside the component it tests, Phase 02 onward |
| E2E | Playwright | One journey-level test per page as that page ships (Phases 05–08), expanded into the full cross-route/cross-locale/cross-breakpoint matrix in Phase 09 |
| Accessibility | `@axe-core/playwright` | Per-route smoke check as each route ships; full sweep in Phase 09 |
| Visual | Manual + Playwright screenshot capture | Gates 1–4 continuously (every section as built); Gate 5 at the Phase 03 checkpoint; Gate 6 per-page in Phase 09 |

No phase's exit criteria accept "tests will be added later" — the test for a given unit ships in the same phase as the unit, except for the cross-cutting Phase 09 sweep, which is explicitly a *comprehensive* pass, not the *first* pass.

---

## 18. Visual Quality Gate Strategy

All six gates from VISUAL-QUALITY-GATES.md are preserved, unmodified, and mapped directly onto this phase sequence — no replacement framework was introduced:

| Gate | Primary phase(s) | What it checks here |
|---|---|---|
| Gate 1 — Typography | P02, P03, ongoing | Real-browser rendering of DESIGN.md §6–§8's type scale, both locales |
| Gate 2 — Color & Surface | P02, P03, ongoing | Cobalt restraint, surface treatments, the two-dark-sections-only rule (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §2/§3) |
| Gate 3 — Asset Completeness | P02–P08, continuous | Every "Media" reference in PAGE-BLUEPRINTS.md resolves to a VISUAL-ASSET-MATRIX.md row before that section ships |
| Gate 4 — Section Completeness | P03 (prototype), P05–P08 (every production section) | PAGE-BLUEPRINTS.md §31's density-class completeness bar |
| Gate 5 — Visual Prototype | **P03 — hard checkpoint, §19** | Owner approval of the six-element prototype; blocks P04–P10 |
| Gate 6 — Full-Page Visual QA | **P09** | Per-route, per-locale, per-breakpoint, pre/post-animation, reduced-motion screenshot review |

---

## 19. Visual Prototype Hard Checkpoint

**This is the single most important dependency in this entire plan.** Scope (PAGE-BLUEPRINTS.md §31.2, unchanged by this planning pass): GLOBAL-HEADER, HOME-01 (hero + sculpture), HOME-02 (Selected Work), HOME-03 (What We Create — the brief's "Services" prototype element maps to this editorial section, not the `/services` route, which is Phase 06 scope), HOME-04 (Systems in Motion + particles), GLOBAL-FOOTER. Required evidence: screenshots at 1440px/768px/390px, both locales, pre- and post-animation-settle, plus `prefers-reduced-motion` variants — minimum 40 screenshots per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8/VISUAL-QUALITY-GATES.md §5. **Passing criteria are PASS / CONDITIONAL PASS / FAIL as defined in COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8** — a technically-green Playwright/Lighthouse/axe run is necessary but never sufficient; only an explicit owner approval of the rendered visual direction satisfies this gate. The separate, earlier experimental homepage prototype directory referenced in this planning brief is **not** treated as prior approval of anything — it is out of scope for this plan and is not touched by it.

**Encoding as a hard dependency (not a recommendation):** every task in Phases 04 through 10 carries `P03-GATE` as a blocking dependency in TASKS.md, except the small set of documentation-only/non-mutating preparatory tasks PAGE-BLUEPRINTS.md and VISUAL-QUALITY-GATES.md already allow to proceed in parallel (e.g., writing a CMS field schema into Payload config touches no rendered page and is not gated; rendering that field's content on a live route is).

---

## 20. Ten-Phase Implementation Roadmap

### PHASE 01 — Foundation & Compatibility

- **Goal:** a reproducible, compatible development environment with no unresolved critical integration blocker.
- **Scope:** repo init + baseline controls; Next.js App Router + React + TypeScript strict; pnpm; Tailwind v4 (CSS-first) + CSS Modules; ESLint + Prettier; env/secrets config; Docker dev environment + Postgres service; Payload compatibility spike (resolves the Turbopack/webpack-hook risk, §6); base locale-negotiation routing shell; baseline Vitest/RTL/Playwright/axe scaffolding.
- **Inputs:** TECHNICAL-ARCHITECTURE.md §3–§9, §27, §32; this plan §6.
- **Prerequisites:** none — this is the entry phase.
- **Deliverables:** running `pnpm dev`/`pnpm build`, Docker Compose dev stack, a pinned, verified-compatible `package.json`, a locale-negotiating root route, a green baseline test run.
- **Technical design references:** TECHNICAL-ARCHITECTURE.md §9 (directory structure), §27 (Compose architecture).
- **UI/visual references:** none yet (Phase 02).
- **CMS references:** none yet (Phase 04) — the Payload *compatibility spike* in this phase installs and smoke-tests Payload without building real collections.
- **Testing:** Vitest/RTL/Playwright/axe installed and running a trivial smoke test each.
- **Quality gates:** none of the six visual gates apply yet — this phase is pre-visual.
- **Exit criteria:** reproducible dev environment; compatible core dependency set (§6 table re-verified, not assumed); successful build + smoke tests; no unresolved critical integration blocker (the Payload/Turbopack risk is explicitly resolved one way or another, not carried forward silently).
- **Approval authority:** technical lead sign-off (no owner visual approval needed yet).

### PHASE 02 — Design System & Visual Prototype Foundation

- **Goal:** the complete, reusable Cobalt & Porcelain component/token library, ready for the Phase 03 prototype to consume.
- **Scope:** full DESIGN.md §34 token set as Tailwind v4 `@theme` CSS; English + Arabic font loading (`next/font`, locale-scoped); global grid/spacing; Button/Link/Header/Footer/Icon-Button components with full state matrices; Radix UI primitives wired for accordion/modal use; GSAP+`@gsap/react`+ScrollTrigger foundation (the `lib/motion/tokens.ts` module, section-scoped timeline pattern); RTL/LTR foundation (`<html dir/lang>` per locale, logical-property utility conventions, the `--dir` CSS custom property); prototype route scaffolding; clearly-labeled local-only static fixtures for prototype use (never real content).
- **Inputs:** DESIGN.md §5–§9, §18, §24, §34; VISUAL-ASSET-MATRIX.md §11–§12.
- **Prerequisites:** Phase 01 exit criteria met.
- **Deliverables:** a component library covering DESIGN.md §18.1–§18.8, §18.17–§18.22, §20; a working locale-aware layout shell; GSAP/ScrollTrigger demonstrably working on at least one scroll-reveal.
- **Technical design references:** TECHNICAL-ARCHITECTURE.md §10 (Server/Client boundaries), §14–§15 (design-system/motion mapping).
- **UI/visual references:** DESIGN.md §18 in full; PAGE-BLUEPRINTS.md §4–§5 (Header/Footer specs).
- **CMS references:** none — components take props, not CMS queries, at this stage.
- **Localization:** both directions built together per-component, not sequentially.
- **Security:** no new surface at this stage beyond what Phase 01 established.
- **Performance:** font-loading budget (DESIGN.md §33) enforced from this phase, not retrofitted.
- **Testing:** RTL component tests for every built component, both locales.
- **Quality gates:** Gates 1–2 begin applying (typography/color as components render); Gate 3 begins (asset references start existing).
- **Exit criteria:** every component in scope renders correctly in both directions, passes its own RTL/component test, and is ready to be composed into the Phase 03 prototype — **do not build unapproved full inner pages in this phase**.
- **Approval authority:** technical lead sign-off.

### PHASE 03 — Visual Prototype & Owner Approval

- **Goal:** owner-approved visual direction, satisfying §19's hard checkpoint.
- **Scope:** exactly the six elements in §19 — GLOBAL-HEADER, HOME-01 (incl. the procedurally-built 3D sculpture + AR recomposition + mobile fallback), HOME-02, HOME-03, HOME-04 (incl. the particle system + fallback), GLOBAL-FOOTER — plus responsive/RTL/LTR verification, the full required screenshot capture, reduced-motion checks, and execution of Gates 1–4 against this scope.
- **Inputs:** DESIGN.md §13–§14, §27; PAGE-BLUEPRINTS.md §6.1–§6.4, §31.2; VISUAL-ASSET-MATRIX.md §2–§3; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1–§8.
- **Prerequisites:** Phase 02 component library complete.
- **Deliverables:** the six rendered elements, the full screenshot set, a Gate 1–4 pass record, and an explicit owner decision (PASS / CONDITIONAL PASS / FAIL per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8).
- **Technical design references:** TECHNICAL-ARCHITECTURE.md §16 (3D architecture), §35–§36 (asset generation pipeline, visual QA tooling).
- **UI/visual references:** every row in COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1–§7.
- **CMS references:** the prototype uses local fixtures, not live CMS content (Phase 04 doesn't exist yet) — explicitly labeled as such.
- **Testing:** Playwright screenshot-capture suite (TECHNICAL-ARCHITECTURE.md §36) run against all required viewport/locale/motion-state combinations.
- **Quality gates:** Gates 1, 2, 3, 4 must individually pass before Gate 5 is presented; Gate 5 itself is this phase's exit criterion.
- **Exit criteria:** owner has explicitly recorded approval (or conditional approval with a specific, re-testable condition). **This is a hard blocker for Phases 04–10** — no later-phase implementation task may begin before this is recorded, per §19.
- **Approval authority:** **Owner** (not technical lead, not an automated check — DESIGN.md/VISUAL-QUALITY-GATES.md are explicit that a passing Playwright/Lighthouse/axe run is necessary but not sufficient).

### PHASE 04 — CMS & Content Infrastructure

- **Goal:** a fully functional, secured Payload CMS matching CMS-SCHEMAS.md exactly.
- **Scope:** full Payload+Postgres integration (version-pinned per §6); all 7 collections, 8 globals, 14 blocks (scoped to `projects.flexibleBlocks` only), full repeater set; localization config (`en`/`ar-EG` with the `/en`/`/ar` public-prefix distinction); media upload + persistent-volume storage; RBAC (Super Admin/Content Editor/Lead Manager); draft/publish + the hard publishing-rule hooks (CMS-SCHEMAS.md §24 — no unapproved real-client disclosure, no unverified outcomes); live preview for Projects/Services; cache-revalidation hooks; secured `/admin`; content seeding using explicitly-labeled non-public test fixtures only.
- **Inputs:** CMS-SCHEMAS.md in full; TECHNICAL-ARCHITECTURE.md §17–§20, §26–§30.
- **Prerequisites:** **Phase 03 Gate 5 approval recorded.** (Schema/collection *definition* work that touches no rendered route may start in parallel with Phase 03 per §19's narrow exception — but the moment any CMS-driven content is rendered on a route, that work is gated.)
- **Deliverables:** a running `/admin`, all collections/globals queryable via Payload's Local API, the publishing-rule hooks demonstrably rejecting a disallowed save (test-proven, not just coded).
- **Technical design references:** TECHNICAL-ARCHITECTURE.md §17–§20 (CMS integration, Postgres, media, lead architecture).
- **CMS references:** CMS-SCHEMAS.md §1–§33 in full.
- **Security:** RBAC access functions per §26; `leads` never public-readable; no secrets in seed fixtures.
- **Testing:** integration tests for every collection's access-control matrix; a test that a `real-client` project without `clientDisclosureApproved` cannot publish.
- **Quality gates:** none of the six visual gates apply directly (this phase is backend-weighted), but Gate 3 (Asset Completeness) begins tracking real media uploads here.
- **Exit criteria:** CMS functional and secured; schemas match CMS-SCHEMAS.md field-for-field; published/draft visibility correct; no public exposure of leads or unpublished content.
- **Approval authority:** technical lead sign-off.

### PHASE 05 — Complete Homepage

- **Goal:** the full, CMS-driven, production homepage — all eight sections, both locales.
- **Scope:** HOME-01…08 wired to the `homepage`/`process-page` globals; the Engineering diagram (background-weight); the six-stage process timeline (summary view, full detail lives on `/process` in Phase 06); the Philosophy section; the Final Conversion band (on-dark CTA treatment); production media/fallback integration per VISUAL-ASSET-MATRIX.md; GSAP cleanup (no leftover prototype-only hacks from Phase 03); per-section SEO; analytics-event wiring; full responsive + RTL/LTR verification for all eight sections (not just the four the prototype covered).
- **Inputs:** PAGE-BLUEPRINTS.md §6.1–§6.8; DESIGN.md §27; PRODUCT.md §17.
- **Prerequisites:** Phase 03 Gate 5 approval; Phase 04 CMS live.
- **Deliverables:** `/en` and `/ar` fully rendering all eight sections against real (or honestly-labeled-pending) CMS content.
- **UI/visual references:** every HOME-0X row in PAGE-BLUEPRINTS.md §6.
- **CMS references:** `homepage` global (all eight field groups), `process-page` global (referenced subset), `services`/`projects` relationships.
- **Testing:** one Playwright journey test (homepage scroll-through, both locales); RTL/LTR component tests for HOME-05/06/07 (not covered by the Phase 03 prototype).
- **Quality gates:** Gate 4 (Section Completeness) run against all eight sections; Gate 3 confirmed for every homepage asset reference.
- **Exit criteria:** all eight sections pass Gate 4; homepage SEO metadata present; zero prototype-only placeholder code remains.
- **Approval authority:** technical lead sign-off (the *direction* was already owner-approved in Phase 03; this phase extends it, it does not re-seek approval for the same decisions — though a materially different HOME-05/06/07 composition, since those weren't in the prototype, gets a lightweight visual spot-check, not a full Gate 5 re-run).

### PHASE 06 — Services, About & Process

- **Scope:** `/services` archive; all three service detail pages (shared template + per-service content delta per PAGE-BLUEPRINTS.md §8–§10); the Digital Architecture diagram (full interactive version, one per service); `/about` (8 sections, team section conditionally omitted if empty); `/process` (full six-stage detail); bilingual content wiring for all of the above; section-level Gate 4; SEO.
- **Inputs:** PAGE-BLUEPRINTS.md §7–§12; PRODUCT.md §18.1–§18.6; CMS-SCHEMAS.md §7, §12–§13.
- **Prerequisites:** Phase 03 Gate 5; Phase 04 CMS live.
- **Deliverables:** six fully-rendered inner-page routes (×2 locales = 12 rendered surfaces, counting the three service pages as one template × three content sets).
- **Testing:** Playwright journey test per page; axe smoke check per route.
- **Quality gates:** Gate 4 per section; Gate 3 for diagram assets.
- **Exit criteria:** every route in scope passes Gate 4; related-work sections correctly hide when empty (PRODUCT.md §18.2); About's team section correctly omits when empty.
- **Approval authority:** technical lead sign-off.

### PHASE 07 — Portfolio & Case Studies

- **Scope:** `/work` archive (simple-list vs. filtered-grid behavior gated on the ≥6-project threshold, prompt-locked); classification-badge system (all four values); `/work/[slug]` dynamic route; the full flexible-block registry rendering (controlled, no arbitrary styling); Embla galleries (genuine galleries only); related projects; the hard publishing-rule enforcement from Phase 04 verified end-to-end through the UI; portfolio SEO.
- **Inputs:** PAGE-BLUEPRINTS.md §13–§14; PRODUCT.md §23–§25; CMS-SCHEMAS.md §5–§6, §18–§19.
- **Prerequisites:** Phase 03 Gate 5; Phase 04 CMS live.
- **Deliverables:** `/work` and `/work/[slug]` fully functional against whatever real/honestly-labeled content exists at the time (PRODUCT.md §34's project-content gap is a content dependency, not a code blocker — the honest empty state ships if no project exists yet, §26).
- **Testing:** test asserting a `real-client` project without disclosure approval cannot render its client name; test asserting an unpublished project 404s rather than rendering.
- **Quality gates:** Gate 4; Gate 3 for all project media.
- **Exit criteria:** zero fabricated projects, clients, or outcomes anywhere in the rendered output (manually verified against actual CMS content, not just the schema's capability to prevent it).
- **Approval authority:** technical lead sign-off, plus an explicit content-honesty check against PRODUCT.md §26/§29.

### PHASE 08 — Contact & Lead Management

- **Scope:** `/contact` page; the full field set from PRODUCT.md §21/CMS-SCHEMAS.md §10 via React Hook Form + Zod (client) and the same Zod schema server-side (Server Action); rate limiting + honeypot; `Leads` collection persistence; success/error states (success copy scoped to what's actually guaranteed — internal persistence, not unconfigured external delivery, per PRODUCT.md §21's hard rule); Discovery Call fallback routing (PRODUCT.md §22); `/privacy` page wired to the `pages` collection, remaining in `draft` until real legal text exists (CMS-SCHEMAS.md §8/§24).
- **Inputs:** PAGE-BLUEPRINTS.md §15–§16; PRODUCT.md §21–§22; TECHNICAL-ARCHITECTURE.md §20, §21.
- **Prerequisites:** Phase 03 Gate 5; Phase 04 CMS live.
- **Deliverables:** a working contact form that actually persists a lead (verified via an integration test reading the `Leads` collection after a simulated submission), and a `/privacy` route that does not go live with invented legal text.
- **Testing:** form-validation unit tests (every field, both client and server schema); integration test for lead persistence; accessibility test for `aria-live` error announcements.
- **Quality gates:** Gate 4 (Contact is a "Structured-minimal" density-class section per PAGE-BLUEPRINTS.md §31.1 — the form itself is the composition, no added decoration expected).
- **Exit criteria:** no claim of external lead delivery without a configured destination (PRODUCT.md §34 🔴); `/privacy` not publicly live without approved legal text.
- **Approval authority:** technical lead sign-off; owner sign-off specifically on whether to launch with the interim internal-only lead pipeline or wait for external delivery configuration (§26).

### PHASE 09 — Security, SEO, Accessibility & Performance Hardening

- **Goal:** the comprehensive audit-and-harden pass — confirming what Phases 01–08 already built, not building foundational security/SEO/a11y for the first time.
- **Scope:** full security audit (CMS access review, upload validation, CSP/security headers, secrets/dependency scan); `hreflang`/sitemap/robots/structured-data verification across every route; full `@axe-core/playwright` sweep + manual accessibility review; Core Web Vitals measurement against DESIGN.md §33's budgets on real devices; 3D/particle performance tuning and low-power fallback verification; analytics-consent wiring finalized; the comprehensive cross-route/cross-locale/cross-breakpoint E2E regression suite; **Gate 6 — Full-Page Visual QA** executed on every MVP route.
- **Inputs:** TECHNICAL-ARCHITECTURE.md §21–§26, §33, §36; VISUAL-QUALITY-GATES.md §6.
- **Prerequisites:** Phases 04–08 complete (every route exists to be audited).
- **Deliverables:** a signed audit report (findings + fixes, not just findings); a Gate 6 pass record per route/locale.
- **Testing:** the full Playwright/axe/Vitest suite, green, as a release gate.
- **Quality gates:** **Gate 6** is this phase's defining deliverable; Gates 1–4 are re-confirmed, not re-discovered.
- **Exit criteria:** no open critical/high security finding; Core Web Vitals targets met or explicitly re-scoped with owner sign-off; Gate 6 passes on every route in both locales.
- **Approval authority:** technical lead sign-off on the audit; owner sign-off is not required for this phase specifically (the owner's visual authority was already exercised at Gate 5; Gate 6 confirms the *built* site matches what was approved, which is a technical verification, not a new creative decision) — **unless** Gate 6 surfaces a material visual regression from what Gate 5 approved, in which case it returns to an owner decision.

### PHASE 10 — Production Deployment & Launch

- **Scope:** production Docker Compose; Caddy + automatic TLS; VPS configuration; environment secrets (never committed); database + media persistence; automated backups **with a verified restore drill** (not just a backup script that's never been tested); health checks; Sentry monitoring; rollback procedure (tested, not assumed); production smoke tests; final production SEO checks; final owner acceptance; launch.
- **Inputs:** TECHNICAL-ARCHITECTURE.md §27–§31; this plan §24–§25.
- **Prerequisites:** Phase 09 complete and passed.
- **Deliverables:** a live, monitored, backed-up production deployment.
- **Testing:** production smoke test suite (homepage + one service page + one case study + contact-form dry run, per TECHNICAL-ARCHITECTURE.md §29).
- **Quality gates:** none new — this phase verifies deployment mechanics, not visual/content quality (already covered by Gates 1–6).
- **Exit criteria:** restore drill actually performed and timed; rollback actually tested; all §26 real-world owner inputs either resolved or explicitly accepted as a documented interim state by the owner (never silently shipped as if resolved).
- **Approval authority:** **Owner** — final launch sign-off, explicitly distinct from the Phase 03 visual-direction sign-off and the Phase 09 technical-audit sign-off.

---

## 21. Phase Dependencies

```
P01 ──► P02 ──► P03 (OWNER GATE) ──┬──► P04 ──► P05 ──┬──► P06 ──┐
                                     │                 ├──► P07 ──┤
                                     │                 └──► P08 ──┤
                                     │                            ├──► P09 ──► P10 (OWNER GATE)
                                     └── (schema-only prep may start here, per §19's narrow exception)
```

P05, P06, P07, P08 all depend on P04 (CMS live) and the P03 gate, but **not on each other** — see §23.

---

## 22. Critical Path

P01 → P02 → **P03 (owner gate)** → P04 → P05 → P09 → P10. P05 is on the critical path (not P06/P07/P08) because the homepage is the first full production page exercising the complete CMS integration end-to-end; P06–P08 can run concurrently with or immediately after P05 without extending the critical path, provided P04 is complete. The Phase 03 owner gate is the single highest-variance item on the path — its duration depends entirely on owner availability and the number of revision cycles needed, not on engineering effort, and should be planned for accordingly (§27 risk R1).

---

## 23. Parallelizable Work

| Can run in parallel with | Constraint |
|---|---|
| P06, P07, P08 (relative to each other) | All three depend on P04+P03-gate, none depend on each other |
| P04's non-rendering schema-definition tasks and P03 | Only the *definition* work (Payload config, collection schemas) — the moment a route renders CMS content, it's gated by P03 |
| Visual-asset production tasks (§11) and almost any phase | Procedural/SVG/CSS asset construction has no code dependency beyond DESIGN.md's specs — it can start as early as P02 for anything the Phase 03 prototype needs, and continue in the background for P05–P08's assets |
| P10's infrastructure-definition tasks (Dockerfile/Caddyfile authoring) and P04–P08 | Writing the deployment config doesn't require the application to be feature-complete — only *running* it in production does |

---

## 24. Environments and Deployment Strategy

Three environments: **local** (Docker Compose dev stack, Phase 01), **staging** (mirrors production Compose topology, used for Phase 03's prototype review and Phase 09's Gate 6 execution so the owner/auditor reviews the same environment shape as production, not a developer's laptop), **production** (Phase 10). Staging is provisioned at the start of Phase 03 specifically so the owner's visual-prototype review happens against a realistic deployment, not `localhost`.

---

## 25. Backup, Restore, and Rollback Strategy

Per TECHNICAL-ARCHITECTURE.md §29–§30: scheduled `pg_dump` + media-volume archive to an off-VPS destination (🔴 destination itself is an open owner/infra decision, §26); a restore drill is **performed and timed at least once in Phase 10 before launch sign-off** — a backup strategy never restored from is not a verified one, and this plan does not accept "we have a backup script" as satisfying this requirement. Rollback: redeploy the previous image tag; any destructive CMS schema change (field removal/rename) requires a tested down-migration path before it ships, not an assumption that rollback is always safe.

---

## 26. Content and Owner Input Dependencies

Carried forward from PRODUCT.md §34, TECHNICAL-ARCHITECTURE.md §33, PAGE-BLUEPRINTS.md §30, DESIGN-AUDIT-REPORT.md §6, and COBALT-PORCELAIN-MIGRATION-REPORT.md §10 — **not re-resolved here**, mapped instead to the gate each one affects:

| Pending input | Blocks | Does it block unrelated technical work? |
|---|---|---|
| Final logo/wordmark | Header/Footer final visual polish, favicons | No — interim typographic lockup ships; unrelated engineering proceeds |
| At least one approved real/demo project | `/work`, `/work/[slug]`, HOME-02 showing real content instead of the empty state | No — the honest empty state ships; Phase 07's code is complete and tested regardless |
| Client disclosure approval (per real-client project) | That specific project's public client name | No — enforced per-project by the CMS hook, doesn't block other projects |
| Verified outcomes (per project) | That project's outcomes section | No — section omits itself when absent |
| Real business contact details | Footer contact column, `/contact` page §3 section | No — section renders nothing until populated |
| Legal entity information, approved privacy policy text | `/privacy` going live (stays in draft) | No — rest of the site is unaffected |
| Lead notification destination (email/CRM/webhook) | External lead delivery | No — internal `Leads` persistence (the actual code deliverable) works regardless; this only affects whether a human sees a notification outside the admin panel |
| Discovery-call booking provider | A real calendar embed | No — falls back to the contact form with a flagged intent, which is fully functional |
| Analytics platform activation/consent config | Live analytics data | No — the `track.ts` abstraction no-ops safely until activated |
| Canonical production domain (`rakmyat.com` vs. `rakmyat.online`, neither confirmed — found during the final documentation hardening pass) | Production Caddyfile binding, sitemap/canonical-URL base, final SEO configuration | Genuinely launch-blocking (§28/TECHNICAL-ARCHITECTURE.md §22/§28), but **not** a Phase 01–09 blocker — every spec reads the domain from an environment variable until this resolves |
| Backup destination, uptime-monitoring provider, `www`/apex preference (the last of which depends on the domain decision above) | Phase 10 launch readiness specifically | These genuinely gate Phase 10's exit criteria (§25) — they are launch-blocking, unlike the others above which are content-blocking only |

**Principle enforced throughout this plan (per the brief's explicit instruction):** missing marketing/content/business input never blocks unrelated technical work. Only the Phase 10 infrastructure-category inputs in the bottom row are true launch blockers.

---

## 27. Risks and Mitigations

| # | Risk | Mitigation |
|---|---|---|
| R1 | Phase 03's owner gate has unbounded duration (depends on owner availability/revision cycles) | Staging environment provisioned early (§24) so review cycles are fast; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md's explicit pass/fail criteria (§8) minimize ambiguous back-and-forth |
| R2 | Payload/Next.js 16 Turbopack compatibility (TECHNICAL-ARCHITECTURE.md §32) could force a bundler-mode change mid-Phase-01 | Resolved as an explicit P01 exit criterion, not discovered mid-build in a later phase |
| R3 | `@react-three/drei` compatibility is an open community question | P02's Drei-dependent tasks re-verify before relying on specific helper APIs; a fallback plan (hand-rolled camera/light helpers without Drei) is a documented contingency, not a surprise |
| R4 | Hand-computed contrast ratios (COBALT-PORCELAIN-MIGRATION-REPORT.md §2.2) need automated re-verification | P01/P02 includes an explicit automated-contrast-check task before any component ships as "final" |
| R5 | A future editor adds a third dark homepage section "because it looks good" | Enforced by VISUAL-QUALITY-GATES.md §2's "deep-cobalt section discipline" check, re-run at every Gate 4/6 pass, not just once |
| R6 | Portfolio launches thin (few/no real projects) | PRODUCT.md §25 explicitly authorizes an agent-built, honestly-labeled Concept/Demo project as a mitigation — tracked as a content task in P07, not a blocker |
| R7 | Backup/restore never actually tested before launch | P10's exit criteria hard-require a timed restore drill, not just script existence (§25) |
| R8 | Hero sculpture's new grounding/shadow lighting model is a harder production problem than the old rim-light approach (COBALT-PORCELAIN-MIGRATION-REPORT.md §9) | Flagged explicitly as a P02/P03 production risk, not assumed trivial; extra review time budgeted at the Gate 5 checkpoint |

---

## 28. Definition of Ready

A task is Ready to move from `TODO` when: its dependencies in TASKS.md are all `DONE`, its source references are resolvable (the cited document section actually exists and says what the task claims), and — for any task in Phase 04 or later — the Phase 03 Gate 5 approval is recorded (or the task is one of the narrow non-rendering exceptions in §19/§23).

---

## 29. Definition of Done

A task is `DONE` only when (restated as a binding checklist from the governing brief §18, not loosened here): its required files/modules exist; its acceptance criteria pass; its unit/integration/E2E tests (as applicable) pass; its RTL/LTR requirements pass (if applicable); its responsive requirements pass (if applicable); its security requirements pass (if applicable); its applicable visual gate passes; and completion evidence (commands run, output, screenshots where required) is recorded in TASKS.md. **Documentation existing is never sufficient evidence of DONE.** A phase is `DONE` only when every mandatory task in it is `DONE` and its exit gate (§20) is approved by the correct authority.

---

## 30. Launch Readiness Criteria

All of: Phase 01–09 exit criteria met; Phase 10's restore drill and rollback test performed; every Phase 10-blocking owner input (§26 bottom row) resolved or explicitly accepted as a documented interim state by the owner; Gate 6 passed on every MVP route in both locales; no open critical/high security finding; final owner launch sign-off recorded (§20 Phase 10's approval authority) — distinct from and in addition to the Phase 03 visual-direction sign-off.

---

## 31. Requirements Traceability Matrix

A representative sample (full traceability is maintained at the task level in TASKS.md, where every task cites its exact source sections — this table demonstrates the method, it is not a duplicate of that per-task detail):

| Requirement | Source | Delivered by | Verified by |
|---|---|---|---|
| Locale-prefixed routing, `en`/`ar` shared slugs | PRODUCT.md §14/§16 | P01 (negotiation), P05–P08 (per-route) | E2E route tests, both locales |
| Exactly two dark homepage sections | DESIGN.md §27, COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §2 | P03, P05 | Gate 2/Gate 6 "deep-cobalt section discipline" check |
| Hero sculpture grounding (cast shadow + reflection) | DESIGN.md §13.1 | P03 | Disconnection Test screenshot evidence, Gate 5 |
| No fabricated client/testimonial/outcome | PRODUCT.md §26/§29 | P07 | Manual content-honesty review, CMS publishing hooks (automated) |
| Real-client disclosure gate | CMS-SCHEMAS.md §24 | P04 | Integration test (publish rejected without approval) |
| Contact form server-side validation | PRODUCT.md §21, TECHNICAL-ARCHITECTURE.md §20 | P08 | Unit + integration tests |
| WCAG 2.2 AA | PRODUCT.md §30, DESIGN.md §32 | P02–P08 (built), P09 (audited) | `@axe-core/playwright`, manual review |
| Core Web Vitals budgets | DESIGN.md §33 | P02–P08 (constrained), P09 (measured) | Lighthouse/field data |
| Restore drill actually performed | TECHNICAL-ARCHITECTURE.md §29 | P10 | Timed drill record |

---

## 32. Open Decisions and Blockers

### Documentation synchronization performed this session

| File | Original conflicting requirement | Corrected requirement | Source of authority | Reason |
|---|---|---|---|---|
| PRODUCT.md (header metadata, line 10) | "**Theme:** Dark mode only, no toggle" | "Porcelain-first (light), no toggle — Cobalt Blue & Porcelain identity; exactly two homepage sections... use a deliberate deep-cobalt dark treatment, never a site-wide default" | DESIGN.md §5/§43; COBALT-PORCELAIN-MIGRATION-REPORT.md | Direct, unambiguous contradiction of the current approved identity — this was the exact inconsistency this brief flagged |
| PRODUCT.md §36 MVP Scope | "...WCAG 2.2 AA, dark-only, with the homepage's..." | "...WCAG 2.2 AA, Cobalt Blue & Porcelain (porcelain-first, with exactly two deliberate deep-cobalt homepage sections per DESIGN.md §5/§27), with the homepage's..." | DESIGN.md §5/§27 | Same category of stale statement, found during the required full-text sweep of the remainder of PRODUCT.md |

No other active document contained a similar contradiction (verified via full-text search for every retired-palette term/hex value, post-correction, across all ten source documents — zero remaining matches outside the two documents whose explicit job is to preserve that history).

### `OWNER DECISION REQUIRED` (cannot be resolved from the approved source documents — not guessed at)

All items already logged in PRODUCT.md §34 / TECHNICAL-ARCHITECTURE.md §33 / PAGE-BLUEPRINTS.md §30 / DESIGN-AUDIT-REPORT.md §6 / COBALT-PORCELAIN-MIGRATION-REPORT.md §10 remain open exactly as previously logged (full list in §26 above) — **none were silently resolved in producing this plan.** No new `OWNER DECISION REQUIRED` item was discovered during this planning pass beyond what was already catalogued.

**Readiness:** documentation is now internally consistent (the one flagged inconsistency plus the one additional one found are both corrected and logged above). Phase 01 may begin as soon as the owner has reviewed this plan and TASKS.md — Phase 01 itself requires no visual/business approval, only the standing technical-lead sign-off defined in §20.
