# RAKMYAT — TASKS.md
### Executable Task Register (Phases 01–10)

**Execution status (2026-10-15):** Phase 01 foundation and the owner-approved CMS administrator authentication exception have been implemented, reviewed, validated, and committed as `e48c4f74efe5039e4c77ad95164aca3b0a22ec1f` on `main`. P01-T006's example env file and P01-T017's frozen lockfile are included in that commit. P01-T009's former first-user blocker is resolved. All Phase 01 tasks remain `IN_REVIEW` pending Technical Lead approval; no such approval is claimed.
**Governing plan:** [PLAN.md](./PLAN.md) — read §20 for phase goals/exit criteria before executing any task below; this file is the decomposition of that plan, not an independent source of truth.
**Task ID convention:** `P{phase}-T{number}`, stable and unique, zero-padded to 3 digits.
**Status values:** `TODO` · `IN_PROGRESS` · `BLOCKED` · `IN_REVIEW` · `DONE` — no other value is valid.
**Hard gate reminder:** every task in Phase 04–10 depends on `P03-T018` (the owner-approved Visual Prototype Gate) unless explicitly marked otherwise as a narrow non-rendering preparatory exception per PLAN.md §19/§23. Tasks are listed `TODO` with that explicit dependency — they are not marked `BLOCKED`, since `BLOCKED` is reserved for a task whose dependency has actually failed or stalled, not one simply waiting on a future prerequisite (per the governing brief's explicit instruction).
**Template field key (applies to every task below):** Status/Priority/Depends-on → Source → Objective → Inputs/Files → Instructions (incl. locked constraints, libraries, data contracts) → RTL/LTR → Responsive → Motion → CMS → Security → Performance → Tests → Acceptance criteria → DoD evidence. A field reads `N/A` only when genuinely inapplicable to that task, never to save space.

---

## PHASE 01 — Foundation & Compatibility

Goal/exit criteria: PLAN.md §20 Phase 01. Environment/dependency foundation with one narrowly scoped, owner-approved Payload Users authentication collection for CMS administrator first-user setup. No Phase 04 business collections, globals, content schemas, or editorial features.

#### P01-T001 — Re-verify the full dependency compatibility matrix against live registries
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** None
- **Source:** TECHNICAL-ARCHITECTURE.md §4–§5, §32
- **Objective:** Before pinning any version, re-query the npm registry / official docs for Next.js, React, Payload core + `@payloadcms/next` + `@payloadcms/db-postgres` + `@payloadcms/richtext-lexical`, `@react-three/fiber`, `@react-three/drei`, Tailwind CSS, `next-intl`, GSAP + `@gsap/react`, Zod + `@hookform/resolvers`, Vitest, Playwright, `@axe-core/playwright`, `@sentry/nextjs`, Node.js LTS, pnpm — confirming or correcting every row marked `VERIFY-AT-IMPLEMENTATION`/`UNVERIFIED` in TECHNICAL-ARCHITECTURE.md §4.
- **Inputs/Files:** none created — this is a research task; output is a short written confirmation (comment block or `docs/dependency-verification.md` is explicitly NOT a new planning doc per the no-extra-files rule — record the result directly in this task's completion evidence instead).
- **Instructions:** Query each package's latest version and peer-dependency range; do not install anything yet. For each row, state: confirmed-as-documented / corrected-to-X / still-unresolved.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** N/A (research task)
- **Acceptance criteria:** Every `VERIFY-AT-IMPLEMENTATION`/`UNVERIFIED` row in TECHNICAL-ARCHITECTURE.md §4 has an explicit, dated, sourced resolution recorded in this task's completion evidence.
- **DoD evidence (2026-10-14; npm registry metadata queried with `pnpm view <package> version peerDependencies engines --json`; official Next/Payload docs and release notes cross-checked):** Registry latest → `next` 16.4.1 (Node >=20.9; React/React DOM peer ^19), `react`/`react-dom` 19.3.1 (React DOM requires React ^19.3.1), `payload` and all three required `@payloadcms/*` packages 3.90.2; Payload packages must stay exactly matched, and `@payloadcms/next@3.90.2` requires Next >=16.3.3 <17.0.0. `@payloadcms/richtext-lexical` peer React/React DOM ranges include 19.3.1. `tailwindcss`/`@tailwindcss/postcss` 4.3.3; `next-intl` 4.14.9 (Next 12–16, React 16.8–19); `gsap` 3.15.0; `@gsap/react` 2.1.2 (GSAP ^3.12.5, React >=17); `three` 0.186.1; `@react-three/fiber` 9.8.1 (React/DOM >=19 <19.4, Three >=0.156); `@react-three/drei` 10.7.9 (React 19, Fiber ^9); `embla-carousel-react` 8.6.0 (React 16.8–19); `radix-ui` 1.8.1 (React/DOM 16.8–19); `lucide-react` 1.57.0 (React 16.5–19); `react-hook-form` 7.90.0 (React 16.8–19); `zod` 4.6.7; `@hookform/resolvers` 5.9.1 (Zod ^3.25 or ^4, RHF ^7.55); `vitest` 5.0.4 (Vite ^6.4/^7/^8; Node ^22.12/^24/>=26); `@testing-library/react` 16.3.3 (React/DOM ^18 or ^19); `@playwright/test` 1.64.1 (Node >=20); `@axe-core/playwright` 4.13.0 (Playwright Core >=1); ESLint latest 10.12.0 but Phase 01 task explicitly locks ESLint 9, so selected 9.39.2 (Next config peer >=9); Prettier 3.9.10; `@sentry/nextjs` 11.7.0 (Next ^14–16; Node >=20.19); TypeScript latest 7.0.2, but architecture asks latest 5.x, so selected 5.9.3. Vitest's Vite 8 peer chain required matching `esbuild` 0.28.2 and `tsx` 4.22.4; `pnpm peers check` now reports no unmet peers. Node.js releases checked on 2026-10-14 show Node 24.22.0 as current LTS; `.nvmrc` pins 24.22.0, while this workstation's existing runtime is 24.16.0 (still within the supported 24.x line). Node 26 remains Current, not LTS. Corepack successfully fetched and ran the architecture-pinned pnpm 12.13.0. Compatibility corrections: Next floor is 16.3.3 for the chosen Payload release, React 19.3.1 is within current React peers, and Fiber/Drei current majors pair on React 19. No application package was installed before these checks. Verification is limited to registry metadata and official framework/CMS documentation; the integrated build remains P01-T009. Reviewer: Technical Lead; Approval: Pending.

**Registry recheck (2026-10-15):** Direct npm registry queries confirm the stack's locked latest versions remain current except `@react-three/fiber`, now 9.8.2 (its peer range includes React/React DOM >=19 <19.4 and Three >=0.156; Drei 10.7.9 accepts Fiber ^9). The installed stack remains peer-clean. The pnpm default `latest` dist-tag is 12.11.2; 12.13.0 is under `next-12`, so the project pin and lockfile were corrected to stable pnpm 12.11.2. Frozen installation passes with this pin. Node.js official release listings on 2026-10-15 show 24.22.0 LTS and 26.12.0 Current; `.nvmrc` remains on 24.22.0. Sources: npm registry metadata (`pnpm view` / `npm view`, queried 2026-10-15); https://nodejs.org/en/blog/release (accessed 2026-10-15).

#### P01-T002 — Decide the Payload `@payloadcms/next` ↔ Next.js 16 Turbopack bundler strategy (documentation-only decision)
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §4, §5, §32, ADR-008
- **Objective:** Using only T001's re-verified evidence (official docs/release notes/changelogs — no application exists yet to test against), decide and document the bundler strategy (pin to a confirmed-compatible Next 16.2.x/16.3.x patch, force webpack mode via a CLI flag/config setting, or rely on a confirmed Payload patch that has resolved the conflict natively). **This task produces a recorded decision only — it does not and cannot validate that decision against a real build, because no Next.js application exists yet at this point in the task graph (that is P01-T003, which does not depend on this task for exactly that reason).** The decision is validated for real in P01-T009, once both the app (T003) and Payload's integration (T009) exist to validate it against.
- **Inputs/Files:** None created — the decision is recorded in this task's completion evidence and consumed as an input by P01-T009.
- **Instructions:** Do not silently pick webpack-vs-Turbopack without recording why; this is ADR-008's "BLOCKED — re-verify at implementation kickoff" item being closed out at the decision level. Do not claim this decision is "proven" here — that would repeat the exact build-before-initialization defect this task was rewritten to avoid (identified during the final documentation hardening pass).
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** Bundler choice affects dev-loop speed only, not production budgets.
- **Tests:** N/A — no application exists yet for this task to test against; see P01-T009 for the real validation.
- **Acceptance criteria:** A recorded, sourced decision exists (which bundler mode, and why) before P01-T009 begins — not a guess, and not deferred silently.
- **DoD evidence (2026-10-14):** Select Webpack for both development and production build using the documented Next CLI `--webpack` flag. The chosen `@payloadcms/next@3.90.2` declares support for Next >=16.3.3 <17, and Payload's official installation docs identify `withPayload()` as the supported Next config integration; Next 16's official CLI documents `--webpack` for both `next dev` and `next build`. This avoids relying on a Turbopack compatibility workaround for Payload's webpack config hook. This is a documentation-stage choice only; P01-T009 must prove the integrated build and `/admin` route before this decision is considered technically validated. Sources: https://payloadcms.com/docs/getting-started/installation (accessed 2026-10-14); https://nextjs.org/docs/app/api-reference/cli/next (accessed 2026-10-14); live peer metadata recorded in P01-T001. Reviewer: Technical Lead; Approval: Pending.

#### P01-T003 — Initialize the Next.js App Router project (TypeScript strict, pnpm)
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §3, §9
- **Objective:** Create the single Next.js application with App Router, TypeScript strict mode, and pnpm as the package manager (via Corepack pin, not a global install).
- **Inputs/Files:** `package.json`, `tsconfig.json` (`strict: true`, `moduleResolution: "bundler"` per `@hookform/resolvers`'s subpath-export requirement), `next.config.ts`.
- **Instructions:** Directory layout follows TECHNICAL-ARCHITECTURE.md §9 exactly (`app/[locale]/...`, `collections/`, `globals/`, `blocks/`, `components/`, `lib/`) — do not invent an alternate structure.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** No secrets committed; `.gitignore` covers `.env*`. · **Performance:** N/A
- **Tests:** `pnpm build` succeeds on a bare scaffold.
- **Acceptance criteria:** `pnpm dev` and `pnpm build` both succeed; `tsc --noEmit` passes with zero errors on the scaffold.
- **DoD evidence:** `corepack pnpm dev` runs in the Compose app; `corepack pnpm build` succeeds; strict TypeScript check passes. Reviewer: Technical Lead; Approval: Pending.

#### P01-T004 — Configure Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §4 (Tailwind row), §14
- **Objective:** Install `tailwindcss`/`@tailwindcss/postcss` and establish the `@theme` CSS entry point that DESIGN.md §34's token block will populate in Phase 02 — this task only wires the pipeline, it does not populate tokens yet.
- **Inputs/Files:** `postcss.config.mjs`, `app/globals.css` (empty `@theme {}` block).
- **Instructions:** No `tailwind.config.js` — Tailwind v4's CSS-first config is mandatory per the locked stack.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** A trivial Tailwind utility class renders correctly in a smoke page.
- **Acceptance criteria:** No `tailwind.config.js` file exists anywhere in the repo; `@theme` block compiles.
- **DoD evidence:** Tailwind v4 PostCSS pipeline and CSS `@theme {}` compile in the successful production build. Reviewer: Technical Lead; Approval: Pending.

#### P01-T005 — Configure ESLint + Prettier
- **Status:** IN_REVIEW · **Priority:** P1 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §3, §26
- **Objective:** Flat-config ESLint 9.x + Prettier 3.x, including Next.js's own recommended rule set.
- **Inputs/Files:** `eslint.config.mjs`, `.prettierrc`.
- **Instructions:** Verify ESLint's required major version against the pinned Next.js version (T001) before locking.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** `pnpm lint` runs clean on the scaffold.
- **Acceptance criteria:** Lint/format scripts exist in `package.json` and pass on the current scaffold.
- **DoD evidence:** `corepack pnpm lint`, `corepack pnpm format:check`, and `corepack pnpm typecheck` pass. Reviewer: Technical Lead; Approval: Pending.

#### P01-T006 — Establish environment/secrets configuration convention
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §21, §27
- **Objective:** Define the `.env.local`/`.env.example` convention (DB connection string, Payload secret, Sentry DSN placeholder, analytics placeholder), untracked by git, with `.env.example` committed as a template with no real values.
- **Inputs/Files:** `.env.example`, `.gitignore` update.
- **Instructions:** No real secret value is ever committed, including in `.env.example`.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This is itself the primary security control for this task. · **Performance:** N/A
- **Tests:** N/A (convention/config task).
- **Acceptance criteria:** `.env.local` is git-ignored; `.env.example` contains only placeholder keys.
- **DoD evidence (2026-10-15):** `git check-ignore -v .env.local` confirms the real local env file is ignored; `.env.example` contains nine placeholder-only entries and no real values. The safe template is committed in `e48c4f74efe5039e4c77ad95164aca3b0a22ec1f`. Reviewer: Technical Lead; Approval: Pending.

#### P01-T007 — Author the Docker Compose development stack
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §27
- **Objective:** `docker-compose.yml` (dev variant) with `app` and `db` services on an internal network, no published DB port.
- **Inputs/Files:** `docker-compose.yml`, `Dockerfile` (dev stage).
- **Instructions:** Postgres image pinned to the exact tag confirmed in T001 (e.g. `postgres:18.6-alpine`), not a floating tag.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** DB port not published to host; non-root container user. · **Performance:** N/A
- **Tests:** `docker compose up` brings up both services without error.
- **Acceptance criteria:** `app` can reach `db` over the internal network; `db` port is not reachable from the host.
- **DoD evidence:** `docker compose --env-file .env.local up --build` builds the app image and starts app + PostgreSQL; app binds to 127.0.0.1:3101, PostgreSQL 5432 is not published, and the app container runs as `node`. Services share a project-private bridge network. Reviewer: Technical Lead; Approval: Pending.

#### P01-T008 — Provision PostgreSQL dev service and verify connectivity
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T007
- **Source:** TECHNICAL-ARCHITECTURE.md §18, §27
- **Objective:** Confirm the `app` container can open a connection to `db` using the pinned `@payloadcms/db-postgres` adapter's expected connection-string shape, before any collection exists.
- **Inputs/Files:** `.env.local` `DATABASE_URI` value (local only, never committed).
- **Instructions:** Use a throwaway connection test script, not a real Payload collection yet.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** Credentials local-only. · **Performance:** N/A
- **Tests:** Connection test script exits 0.
- **Acceptance criteria:** A successful round-trip query against `db` from `app`.
- **DoD evidence:** `corepack pnpm db:check` succeeds from the app container before and after PostgreSQL restart; the named database volume is retained. Reviewer: Technical Lead; Approval: Pending.

#### P01-T009 — Payload CMS compatibility spike (auth-only Users collection) + real validation of T002's bundler decision
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T002, P01-T003, P01-T004, P01-T008
- **Source:** TECHNICAL-ARCHITECTURE.md §17, ADR-001/ADR-002/ADR-008
- **Objective:** Install Payload core + the Postgres adapter + `@payloadcms/next` at the exact matched version (T001), wire `withPayload()` in `next.config.ts` **applying T002's recorded bundler decision**, and boot the admin UI with one minimal `Users` authentication collection solely for CMS administrator authentication and first-user setup. This auth-only exception was explicitly approved by the owner on 2026-10-15. **This is the task that actually closes out ADR-008/T002's decision with a real build** — T002 could only record a decision from documentation evidence since no application existed yet; this task is the first point in the graph where both the app (T003) and Payload's integration exist simultaneously, so it is the correct place for the real `next build`/`next dev` proof, not T002.
- **Inputs/Files:** `payload.config.ts`, `collections/Users.ts` (Payload auth fields only; no custom business fields), `next.config.ts` (bundler-mode setting per T002's decision), `app/(payload)/admin/[[...segments]]/page.tsx`.
- **Instructions:** This is explicitly a spike, not Phase 04 schema work. The sole collection permitted is the owner-approved minimal Users auth collection; do not add business collections, globals, content schemas, roles, or editorial features. If T002's recorded decision turns out not to work in practice (the Turbopack conflict persists despite the chosen mitigation), this task fails and routes back to T002 for a revised decision — it does not silently work around the problem.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** Proves the integration boots; no real schema. · **Security:** Default Payload auth active even on the empty admin. · **Performance:** N/A
- **Tests:** Production Webpack build; Playwright admin first-user creation and login; unauthenticated user creation denial; database-backed user lookup; login again after PostgreSQL container restart.
- **Acceptance criteria:** Build succeeds (closing out T002's decision for real); admin UI renders without errors; first admin user can be created and log in; hashed auth data survives a PostgreSQL restart; public user registration is denied after the initial setup; only the auth-only Users collection is configured.
- **DoD evidence (2026-10-15):** Production Webpack build succeeds with Payload 3.90.2 and the single auth-only `Users` collection. The Admin UI first-user form created a temporary integration account; login and authenticated user lookup succeeded before and after a Docker Compose PostgreSQL restart, proving persistence. Unauthenticated `GET /api/users` and `POST /api/users` were denied. The temporary account was deleted. No Phase 04 business collections, globals, custom content fields, roles, or editorial features were added. Owner approval for this narrow exception is recorded above. Reviewer: Technical Lead; Approval: Pending.

#### P01-T010 — Implement root locale-negotiation routing shell
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T003
- **Source:** PRODUCT.md §14; TECHNICAL-ARCHITECTURE.md §11
- **Objective:** `/` performs the one-time negotiation sequence (valid locale cookie → quality-ordered supported `Accept-Language` → `en` fallback, with no geo detection) and redirects into `/en` or `/ar`, never serving content directly.
- **Inputs/Files:** `proxy.ts`.
- **Instructions:** Locale cookie persists 1 year once set; an explicit user selection (future language switcher) is never silently overridden.
- **RTL/LTR:** The negotiated locale determines the subsequent `<html dir/lang>` in T011. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** Negotiation adds no more than one redirect hop.
- **Tests:** Unit test for the negotiation function (no cookie + Arabic `Accept-Language` → `/ar`; no cookie + other → `/en`; cookie present → honors it regardless of header).
- **Acceptance criteria:** Matches PRODUCT.md §14's owner-approved policy: valid cookie, then supported language preference, then English; no geo lookup; never defaults to Arabic globally.
- **DoD evidence (2026-10-15):** Owner approved the no-geo cookie → `Accept-Language` → English policy in this session. Unit tests cover cookie precedence, quality ordering, unsupported/missing languages, out-of-range quality rejection, and English fallback. Playwright verifies Arabic header redirect/cookie, saved-cookie precedence, and `q` preference at all three viewport projects (21/21 E2E tests passed). Cookie lifetime is one year. Reviewer: Technical Lead; Approval: Pending.

#### P01-T011 — Configure `next-intl` base routing (`/en`, `/ar`)
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T003, P01-T010
- **Source:** TECHNICAL-ARCHITECTURE.md §11–§13
- **Objective:** Wire `next-intl`'s routing config for the two locales, the internationalized `Link`/`useRouter`/`redirect` APIs, and the `app/[locale]/layout.tsx` that sets `<html lang dir>` per locale (`ar-EG`/`rtl` for `ar`, `en`/`ltr` for `en`).
- **Inputs/Files:** `i18n/routing.ts`, `app/[locale]/layout.tsx`, `messages/en.json`, `messages/ar.json` (empty shells, populated in Phase 02+).
- **Instructions:** Public URL prefix stays `/ar` even though Payload's internal locale code is `ar-EG` (TECHNICAL-ARCHITECTURE.md §12) — these are documented as independent concerns, do not conflate them.
- **RTL/LTR:** This task *is* the RTL/LTR foundation — `dir` set at `<html>`, never a wrapper `div`. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Component test asserting `document.documentElement.dir === 'rtl'` on `/ar/*` and `'ltr'` on `/en/*`.
- **Acceptance criteria:** Both locale trees resolve; `dir`/`lang` correct at the document root, not simulated.
- **DoD evidence:** Playwright passes `/en` and `/ar` document checks: `lang=en`/`dir=ltr` and `lang=ar-EG`/`dir=rtl`; next-intl messages load in both locale trees. Reviewer: Technical Lead; Approval: Pending.

#### P01-T012 — Scaffold the full directory structure
- **Status:** IN_REVIEW · **Priority:** P1 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §9
- **Objective:** Create the empty directory skeleton (`collections/`, `globals/`, `blocks/`, `components/motion`, `components/three`, `components/ui`, `components/sections`, `lib/payload`, `lib/i18n`, `lib/seo`, `lib/analytics`, `lib/validation`) so later phases have a fixed, agreed target.
- **Inputs/Files:** Empty directories with a `.gitkeep` or trivial index placeholder where needed.
- **Instructions:** No implementation inside these yet — structure only.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** N/A
- **Acceptance criteria:** Directory tree matches TECHNICAL-ARCHITECTURE.md §9 exactly.
- **DoD evidence:** Required Phase 01 folders exist under `app/`, `collections/`, `globals/`, `blocks/`, `components/`, and `lib/` at the architecture paths. Reviewer: Technical Lead; Approval: Pending.

#### P01-T013 — Baseline Vitest + React Testing Library setup
- **Status:** IN_REVIEW · **Priority:** P1 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §26
- **Objective:** Install and configure Vitest + RTL with one trivial smoke test (renders a `<div>`, asserts text content).
- **Inputs/Files:** `vitest.config.ts`, `tests/smoke.test.tsx`.
- **Instructions:** Confirm RTL's version supports React 19's `act`/concurrent semantics (T001 flagged this as unverified).
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The smoke test itself.
- **Acceptance criteria:** `pnpm test` runs and passes.
- **DoD evidence (2026-10-15):** `corepack pnpm test`: 2 files passed, 7 tests passed, including the React Testing Library render smoke test and locale negotiation cases. Reviewer: Technical Lead; Approval: Pending.

#### P01-T014 — Baseline Playwright setup
- **Status:** IN_REVIEW · **Priority:** P1 · **Depends on:** P01-T003, P01-T011
- **Source:** TECHNICAL-ARCHITECTURE.md §26, §36
- **Objective:** Install `@playwright/test`, configure projects for desktop/mobile viewports, write one smoke test (homepage loads with HTTP 200, both `/en` and `/ar`).
- **Inputs/Files:** `playwright.config.ts`, `e2e/smoke.spec.ts`.
- **Instructions:** Configure the 1440/768/390px viewport projects now (DESIGN.md §30) so later phases reuse them rather than redefining.
- **RTL/LTR:** Smoke test checks both locale roots. · **Responsive:** Viewport projects configured. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The smoke spec itself.
- **Acceptance criteria:** `pnpm e2e` passes against the dev server.
- **DoD evidence (2026-10-15):** Final `corepack pnpm e2e`: 21/21 passed across desktop (1440), tablet (768), and mobile (390) projects, covering both locale routes, cookie precedence, and Accept-Language quality ordering. Reviewer: Technical Lead; Approval: Pending.

#### P01-T015 — Baseline `@axe-core/playwright` setup
- **Status:** IN_REVIEW · **Priority:** P1 · **Depends on:** P01-T014
- **Source:** TECHNICAL-ARCHITECTURE.md §26
- **Objective:** Wire `@axe-core/playwright` into the Playwright suite with one smoke accessibility scan against the bare homepage shell.
- **Inputs/Files:** `e2e/a11y-smoke.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Scan runs against both locale roots. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The smoke scan itself.
- **Acceptance criteria:** Zero critical/serious violations on the bare shell.
- **DoD evidence (2026-10-15):** Final `corepack pnpm e2e`: six axe scans (English and Arabic at all three viewport projects) passed with no serious or critical violations. Reviewer: Technical Lead; Approval: Pending.

#### P01-T016 — Baseline Sentry SDK (no-op safe)
- **Status:** IN_REVIEW · **Priority:** P2 · **Depends on:** P01-T003, P01-T006
- **Source:** TECHNICAL-ARCHITECTURE.md §31
- **Objective:** Install `@sentry/nextjs`, wire the standard Next.js integration, but guard initialization so a missing/placeholder DSN never throws — safe no-op until a real DSN is configured.
- **Inputs/Files:** `sentry.client.config.ts`, `sentry.server.config.ts`, `instrumentation.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** No DSN committed. · **Performance:** Negligible bundle impact verified.
- **Tests:** App boots with `SENTRY_DSN` unset, no runtime error.
- **Acceptance criteria:** Build and dev server both succeed with and without a DSN present.
- **DoD evidence:** Production builds pass with Sentry DSN unset and with the `REPLACE_WITH_VALID_SENTRY_DSN` placeholder; development server and browser checks pass with DSN unset. Placeholder guards prevent SDK initialization. Reviewer: Technical Lead; Approval: Pending.

#### P01-T017 — Pin and lock final Phase 01 dependency versions
- **Status:** IN_REVIEW · **Priority:** P0 · **Depends on:** P01-T001, P01-T002, P01-T009, P01-T013, P01-T014, P01-T015, P01-T016
- **Source:** TECHNICAL-ARCHITECTURE.md §4, §32–§34
- **Objective:** Commit the generated `pnpm-lock.yaml` reflecting every package actually installed in this phase, and record the final Node.js LTS decision (24 vs. 26, per T001's re-check against the 2026-10-28 Active-LTS cutover date).
- **Inputs/Files:** `pnpm-lock.yaml`, `.nvmrc`/`package.json` `engines` field.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** CI (once it exists) installs from the committed lockfile without drift.
- **Acceptance criteria:** Lockfile committed; Node version decision recorded with its date-based rationale.
- **DoD evidence (2026-10-15):** `corepack pnpm install --frozen-lockfile` passes with stable pnpm 12.11.2, and `pnpm-lock.yaml` records the exact pnpm and dependency graph. `.nvmrc` pins Node 24.22.0 LTS; this workstation has Node 24.16.0, and the Docker image uses Node 24 Alpine. The release-age gate remains enabled with exact-version exemptions for recently published locked packages. `pnpm-lock.yaml` is committed in `e48c4f74efe5039e4c77ad95164aca3b0a22ec1f`. Reviewer: Technical Lead; Approval: Pending.

**Phase 01 exit:** all 17 tasks `DONE`; PLAN.md §20 Phase 01 exit criteria met; technical-lead sign-off recorded.

### Phase 01 closure review (2026-10-15)

Owner decisions recorded in this session: (1) a minimal Payload Users authentication collection is approved only for administrator authentication and first-user setup; (2) root locale selection is valid locale cookie → quality-ordered supported `Accept-Language` → English, with no geo detection. These do not constitute technical-lead approval.

All 17 tasks were rechecked against their original acceptance criteria. Technical acceptance criteria pass, including P01-T006 and P01-T017 after the reviewed commit. T009 was exercised end-to-end: empty-admin first-user form, account creation, login, authenticated lookup, unauthenticated read/create denial, PostgreSQL restart persistence, and temporary-account cleanup. The Phase 01 files, including `.env.example` and `pnpm-lock.yaml`, are committed on `main` as `e48c4f74efe5039e4c77ad95164aca3b0a22ec1f`. The final Compose build passed; the app ran as `node`, PostgreSQL was healthy and reachable, and port 5432 was unpublished. Final checks passed: `corepack pnpm install --frozen-lockfile` (pnpm 12.11.2), `corepack pnpm test` (2 files, 7 tests), `corepack pnpm auth:check`, `corepack pnpm e2e` (21/21, including six axe scans), lint, format, typecheck, peer check, and production build. The auth integration test removed its temporary user.

**Open exit blocker:** Technical Lead review/approval remains pending. Every Phase 01 task remains `IN_REVIEW`; none is marked `DONE`. No Phase 02 work has started. Unreviewed later-phase design/schema/audit files remain unstaged and uncommitted. See [PHASE-01-CLOSURE-REPORT.md](./PHASE-01-CLOSURE-REPORT.md) for the 17-task PASS/BLOCKED checklist and Phase 02 recommendation.

### Corrective action revalidation (2026-10-15)

This dated revalidation supersedes any earlier Phase 01 closure statements above when results differ. The original per-task acceptance criteria remain the authoritative criteria and are unchanged. Evidence details and the exact-criteria matrix are in [PHASE-01-CLOSURE-REPORT.md](./PHASE-01-CLOSURE-REPORT.md). All 17 task statuses remain `IN_REVIEW`; evidence passing is not an approval and no owner or Technical Lead approval is recorded.

| Task | Corrective-pass evidence against the original criterion | Evidence result |
|---|---|---|
| P01-T001 | 2026-10-15 registry/version and peer evidence remains recorded above; `corepack pnpm install --frozen-lockfile` and `corepack pnpm peers check` pass. | PASS |
| P01-T002 | Sourced Webpack decision predates T009; current dev server and `corepack pnpm build` use `--webpack` and pass. | PASS |
| P01-T003 | App Router dev route returns 200; clean production Webpack build and `corepack pnpm typecheck` pass. | PASS |
| P01-T004 | No `tailwind.config.js`; CSS-first Tailwind `@theme` compiles in the production build. | PASS |
| P01-T005 | `lint`, `format:check`, and `typecheck` scripts exist; final reruns pass. | PASS |
| P01-T006 | `.env.local` remains ignored; `.env.example` contains placeholders only; current Phase 01 files do not add environment values. | PASS |
| P01-T007 | Compose app is loopback-published and runs as `node`; healthy DB has no host port mapping. | PASS |
| P01-T008 | `docker compose --env-file .env.local exec -T app pnpm db:check` passes after DB restart. | PASS |
| P01-T009 | Auth integration verifies first-user setup, login, authenticated read, unauthenticated read/create denial, DB restart persistence, and cleanup; `/admin` returns 200. Only Users is configured. | PASS |
| P01-T010 | Cookie → supported `Accept-Language` → English behavior remains covered by unit/E2E checks; no geo lookup. | PASS |
| P01-T011 | Playwright verifies `/en` (`lang=en`, `dir=ltr`) and `/ar` (`lang=ar-EG`, `dir=rtl`) at the document root. | PASS |
| P01-T012 | Locale home moved to `app/[locale]/(marketing)/page.tsx`; required §9 skeleton exists; `/en` and `/ar` remain unchanged. Payload stays in `(payload)` and exposes the same public paths. | PASS |
| P01-T013 | `corepack pnpm test`: 2 files, 7 tests passed. | PASS |
| P01-T014 | `corepack pnpm e2e`: 27/27 passed across desktop, tablet, and mobile, including route/API regression tests. | PASS |
| P01-T015 | Six axe scans in the E2E suite report no serious or critical violations. | PASS |
| P01-T016 | Production build and dev route both pass with DSN unset and with `SENTRY_DSN=REPLACE_WITH_VALID_SENTRY_DSN`; placeholder tests use no real credential. | PASS |
| P01-T017 | Frozen lockfile installation passes; `pnpm-lock.yaml` is tracked in commit `e48c4f74efe5039e4c77ad95164aca3b0a22ec1f`; dated Node 24 LTS rationale remains recorded. | PASS |

**Corrective outcomes:** P01-T012's documented route-group structure is now implemented. GraphQL and its development playground are disabled/absent for Phase 01; regression checks confirm GraphQL POST and playground requests return 404 while REST and Admin remain available. The empty closure report was restored byte-for-byte from the parent commit before this addendum was written; its prior state at `6d8bd7617e9d1cf74627af5c8033f57b14d6ccd3` was a two-byte newline-only file. The full production build completed with no compiler warning lines; the earlier generic warning did not recur. The final commit SHA for this corrective pass is to be recorded after the reviewed validation commit is created.

**Formal gate:** Technical Lead review/approval and owner acceptance are still pending. Keep all tasks `IN_REVIEW`; Phase 02 remains NO-GO until the authorized reviewers record their decisions. No Phase 02 implementation has begun.

---

## PHASE 02 — Design System & Visual Prototype Foundation

Goal/exit criteria: PLAN.md §20 Phase 02. Builds the full DESIGN.md §18 component registry + token system; no full inner pages.

#### P02-T001 — Implement the Cobalt & Porcelain token set as Tailwind `@theme` CSS
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T004
- **Source:** DESIGN.md §5, §34
- **Objective:** Populate `app/globals.css`'s `@theme` block with every token from DESIGN.md §34's CSS block (colors, spacing, radius, borders, shadows, glow, motion, z-index, breakpoints, grid, the `--dir` logical-direction helper).
- **Inputs/Files:** `app/globals.css`.
- **Instructions:** Values copied exactly from DESIGN.md §34 — no independent color selection. `color.border.interactive` (`#9AACD6`) ships with its 🟡 verify-at-implementation flag carried into a code comment, not silently treated as final.
- **RTL/LTR:** `--dir` custom property wired per §9.5. · **Responsive:** Breakpoint tokens included. · **Motion:** Timing/easing tokens included. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Snapshot test confirming every token name in DESIGN.md §34 exists as a usable Tailwind utility/CSS variable.
- **Acceptance criteria:** Zero Navy/Cyan/Obsidian hex values present anywhere in the generated CSS (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §7 Q1, checked here at the earliest possible point).
- **DoD evidence:** Generated CSS diff; Reviewer: Technical Lead; Approval: Pending.

#### P02-T002 — Automated contrast re-verification of the token set
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001
- **Source:** DESIGN.md §5.4; COBALT-PORCELAIN-MIGRATION-REPORT.md §2.2, §9 (R4)
- **Objective:** Run an automated contrast-checking tool against every pairing in DESIGN.md §5.4's table (including the 🟡-flagged `color.border.interactive` estimate) and record pass/fail with exact computed ratios, closing out Risk R4.
- **Inputs/Files:** None created — tool output recorded in this task's completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** Verified for both locales' ink tokens identically (color is locale-independent). · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Tool run itself is the test.
- **Acceptance criteria:** Every pairing meets its stated WCAG target; `color.border.interactive` confirmed ≥3:1 or revised if it fails.
- **DoD evidence:** Tool output with exact ratios; Reviewer: Technical Lead; Approval: Pending.

#### P02-T003 — English font loading (locale-scoped)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T011
- **Source:** DESIGN.md §6, §33; TECHNICAL-ARCHITECTURE.md §24
- **Objective:** Self-host Space Grotesk, Inter, and IBM Plex Mono via `next/font`, subset+variable, loaded only inside `/en`'s layout branch.
- **Inputs/Files:** `app/[locale]/(marketing)/layout.tsx` (or a locale-split font module).
- **Instructions:** `font-display: swap`; preload only the two above-the-fold weights (DESIGN.md §33).
- **RTL/LTR:** English-only load path — never bundled into `/ar`'s critical path. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** ≤180KB combined per DESIGN.md §33, verified via build output.
- **Tests:** Build-size check against the 180KB budget.
- **Acceptance criteria:** Fonts load only on `/en/*`; budget met.
- **DoD evidence:** Bundle-analyzer output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T004 — Arabic font loading (locale-scoped)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T011
- **Source:** DESIGN.md §7, §33
- **Objective:** Self-host IBM Plex Sans Arabic via `next/font`, subset+variable, loaded only inside `/ar`'s layout branch.
- **Inputs/Files:** Locale-split font module (Arabic branch).
- **Instructions:** N/A
- **RTL/LTR:** Arabic-only load path. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** ≤120KB per DESIGN.md §33.
- **Tests:** Build-size check against the 120KB budget.
- **Acceptance criteria:** Font loads only on `/ar/*`; budget met; zero Latin-face fallback used for Arabic text (DESIGN.md §7).
- **DoD evidence:** Bundle-analyzer output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T005 — Build Primary Button component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T003, P02-T004
- **Source:** DESIGN.md §18.4, §24.3; CMS-SCHEMAS.md (consumes `cta` groups generically)
- **Objective:** `components/ui/PrimaryButton.tsx` with `lg`/`md`/`sm` size variants and the full default/hover(deepen-to-`cobalt.deep`)/active/focus/disabled/loading state matrix.
- **Inputs/Files:** `components/ui/PrimaryButton.tsx`, `PrimaryButton.module.css` (or Tailwind-only if sufficient).
- **Instructions:** Hover **deepens**, never lightens (DESIGN.md §18.4/§24.3 — a direct correction from the old dark-theme direction). Arabic variant gets +20% inline padding per DESIGN.md §18.4.
- **RTL/LTR:** Logical padding (`padding-inline-*`), both locale label examples tested. · **Responsive:** Touch target ≥44×44px below 1024px. · **Motion:** `motion.fast`/`ease.standard` hover, `motion.instant` active-scale. · **CMS:** Accepts `label`/`href` props generically — not CMS-aware itself. · **Security:** N/A · **Performance:** N/A
- **Tests:** RTL component test for every state, both locale label examples (EN "Start a Project" / AR "ابدأ مشروعك").
- **Acceptance criteria:** Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's Primary Button row exactly (hover direction specifically).
- **DoD evidence:** Component test output + a single-state screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P02-T006 — Build Secondary Button, Text Link, Icon Button
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T003, P02-T004
- **Source:** DESIGN.md §18.5–§18.7
- **Objective:** Three components sharing the same sizing/focus/disabled rules as T005, with their own fill/border/hover treatments (light cobalt-tint hover for Secondary, underline-on-hover for Text Link, 40×40px hit target for Icon Button).
- **Inputs/Files:** `components/ui/SecondaryButton.tsx`, `TextLink.tsx`, `IconButton.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Logical properties throughout. · **Responsive:** Touch targets per §18.7. · **Motion:** Per §24.3. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** RTL component tests, both locales.
- **Acceptance criteria:** Matches DESIGN.md §18.5–§18.7 exactly.
- **DoD evidence:** Component test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T007 — Build Header / Desktop Navigation component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T005, P02-T006, P02-T009
- **Source:** DESIGN.md §18.1; PAGE-BLUEPRINTS.md §4
- **Objective:** `components/ui/Header.tsx` — logo (inline-start), nav items, utility cluster (language switcher + primary CTA, inline-end), transparent-to-solid scroll-state transition with the new `color.border.hairline` bottom edge once solid.
- **Inputs/Files:** `components/ui/Header.tsx`.
- **Instructions:** 88px desktop / 72px tablet-mobile height; scroll-state transition is CSS-only (TECHNICAL-ARCHITECTURE.md §24.4), not GSAP.
- **RTL/LTR:** Full §11/§12 compliance — logo/CTA/switcher at logical start/end. · **Responsive:** Collapses to logo+hamburger below 400px width per §18.1. · **Motion:** `motion.fast` background/border transition. · **CMS:** Props-driven from `navigation` global (wired in Phase 04/05, not here — this task builds the component against mock props). · **Security:** N/A · **Performance:** Server-rendered shell, scroll-state logic hydrates progressively.
- **Tests:** RTL component test for nav order in both directions.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §4 field-for-field.
- **DoD evidence:** Component test output + EN/AR screenshot pair; Reviewer: Technical Lead; Approval: Pending.

#### P02-T008 — Build Mobile Navigation drawer component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T007
- **Source:** DESIGN.md §18.2
- **Objective:** Full-height drawer, slides from inline-end edge, focus-trapped, closes via swipe-toward-start/✕/`Esc`, nav items at `type.en.h3`/`type.ar.h3` size, language switcher pinned above the primary CTA.
- **Inputs/Files:** `components/ui/MobileDrawer.tsx`.
- **Instructions:** 320ms `ease.decelerate` slide + 200ms backdrop fade using `color.overlay.scrim`.
- **RTL/LTR:** Enters from the correct physical edge per direction (right in LTR, left in RTL) via the logical-end convention. · **Responsive:** Mobile/tablet only. · **Motion:** Per §24.1–§24.2. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Keyboard-only navigation test (open, tab through items, `Esc` closes, focus returns to hamburger).
- **Acceptance criteria:** Passes the keyboard-only test in both directions.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T009 — Build Language Switcher component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P01-T011
- **Source:** DESIGN.md §20
- **Objective:** Two-way toggle ("العربية"/"English", real names not flags), preserves the equivalent route in the other locale, shows a fallback notice when no equivalent page exists yet.
- **Inputs/Files:** `components/ui/LanguageSwitcher.tsx`.
- **Instructions:** Route-preservation logic uses `next-intl`'s internationalized navigation APIs, not manual string concatenation.
- **RTL/LTR:** Positioned inline-start of the primary CTA in both directions. · **Responsive:** Repeats at the top of the mobile drawer. · **Motion:** 200ms cross-fade on switch. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Unit test for the fallback-route logic (page exists → direct switch; page doesn't exist → closest valid equivalent + notice).
- **Acceptance criteria:** Never silently stays on the same language or 404s on switch.
- **DoD evidence:** Unit test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T010 — Build Footer component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T006
- **Source:** DESIGN.md §18.18; PAGE-BLUEPRINTS.md §5
- **Objective:** Four logical columns, `color.border.hairline` top edge, repeated language switcher, copyright line.
- **Inputs/Files:** `components/ui/Footer.tsx`.
- **Instructions:** Columns reorder via DOM order + logical flex-direction, not per-locale duplication.
- **RTL/LTR:** Column order verified both directions. · **Responsive:** Single-column stack on mobile. · **Motion:** None (quiet component). · **CMS:** Props-driven from `footer` global (wired Phase 05). · **Security:** N/A · **Performance:** Fully server-rendered.
- **Tests:** RTL component test for column order.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §5 field-for-field.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T011 — Build Form Input/Textarea/Select, Checkbox, Validation Message
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001
- **Source:** DESIGN.md §18.12–§18.14
- **Objective:** Label-above-field pattern (never placeholder-as-label), `color.border.interactive` border (not `hairline`), focus halo via `color.cobalt.glow.outer`, inline `aria-live="polite"` validation messages.
- **Inputs/Files:** `components/ui/FormField.tsx`, `Checkbox.tsx`, `ValidationMessage.tsx`.
- **Instructions:** Numeric/email/phone fields force `dir="ltr"` internally even inside an RTL form, per DESIGN.md §8/§18.12.
- **RTL/LTR:** Verified both directions, incl. the LTR-forced numeric/email sub-case inside an RTL form. · **Responsive:** Full-width fields at every breakpoint. · **Motion:** Border/focus transition only. · **CMS:** N/A · **Security:** No client-only validation trusted (server reuse in Phase 08). · **Performance:** N/A
- **Tests:** Accessibility test for `aria-live` announcement firing on a simulated error.
- **Acceptance criteria:** Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's Form fields row (interactive border, not hairline).
- **DoD evidence:** a11y test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T012 — Wire Radix UI primitives for Accordion and Modal
- **Status:** TODO · **Priority:** P1 · **Depends on:** P02-T001
- **Source:** DESIGN.md §18.11, §18.16; TECHNICAL-ARCHITECTURE.md §25
- **Objective:** Install the unified `radix-ui` package; build Accordion (chevron rotate, `aria-expanded`, `max-height` transition, reduced-motion instant toggle) and Modal (focus-trapped, `Esc` closes, `color.overlay.scrim` backdrop) on top of Radix's accessible primitives rather than hand-rolling focus management.
- **Inputs/Files:** `components/ui/Accordion.tsx`, `Modal.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Chevron mirrors per §12.1. · **Responsive:** N/A · **Motion:** 300ms cap, reduced-motion instant. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Keyboard-trap test for Modal.
- **Acceptance criteria:** Matches DESIGN.md §18.11/§18.16.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T013 — Build the oversized-numeral micro-detail device
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T003, P02-T004
- **Source:** DESIGN.md §18.22
- **Objective:** A reusable `components/ui/OversizedNumeral.tsx` rendering `01`/`02`/`03`… at 120–160px desktop, weight 500, `color.ink.muted` at 6–10% opacity, positioned behind/beside a row's text block.
- **Inputs/Files:** `components/ui/OversizedNumeral.tsx`.
- **Instructions:** This is typography, not an image — no asset dependency. Opacity value is the corrected light-theme range (6–10%), not the retired dark-theme 8–12% range.
- **RTL/LTR:** Numeral position follows logical start/end per the consuming component. · **Responsive:** Scales down at smaller breakpoints. · **Motion:** None. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual snapshot at the specified opacity.
- **Acceptance criteria:** Matches DESIGN.md §18.22 exactly; opacity verified not to compete with foreground text (Gate 1/2).
- **DoD evidence:** Snapshot; Reviewer: Technical Lead; Approval: Pending.

#### P02-T014 — Build Service Row component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T003, P02-T004, P02-T013
- **Source:** DESIGN.md §18.8
- **Objective:** Full-width editorial row on `color.bg.section.tinted`: oversized numeral (T013) + service name + description + inline-end chevron link, hover text-shift 8px toward inline-end.
- **Inputs/Files:** `components/ui/ServiceRow.tsx`.
- **Instructions:** No card/icon wrapper — pure editorial row, per the explicit anti-pattern rule (DESIGN.md §36).
- **RTL/LTR:** Hover-shift direction flips via the `--dir` logical transform. · **Responsive:** Numbered index stacks above name on mobile. · **Motion:** 200ms hover shift + entrance reveal. · **CMS:** Accepts `title`/`summary`/`pillarNumber`/`slug` props generically. · **Security:** N/A · **Performance:** N/A
- **Tests:** RTL component test for hover-shift direction.
- **Acceptance criteria:** Matches DESIGN.md §18.8; renders as a single accessible link per row (not nested interactive elements, per PAGE-BLUEPRINTS.md §6.3's accessibility row).
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T015 — Build Project Showcase card component (incl. classification badge)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T003, P02-T004
- **Source:** DESIGN.md §18.9, §29; PRODUCT.md §23.1
- **Objective:** Full-bleed/near-full-bleed 16:10 image card, classification badge (all four values' colors) pinned at the image's logical-start corner, hover scale 1→1.02 + shadow intensify.
- **Inputs/Files:** `components/ui/ProjectShowcase.tsx`, `ClassificationBadge.tsx`.
- **Instructions:** Badge colors: Real Client Project = `cobalt.signature`; Internal Product = `ink.muted`-toned; Concept/Demo = `state.warning` (`#B45309`); Confidential Summary = `border.interactive`-toned.
- **RTL/LTR:** Badge at logical-start corner. · **Responsive:** 16:10 maintained at every breakpoint via `next/image`. · **Motion:** 400ms hover scale, desktop only. · **CMS:** Accepts `projects` collection fields generically. · **Security:** N/A · **Performance:** Native lazy-loading except first visible card.
- **Tests:** Visual test confirming all four badge colors render distinctly.
- **Acceptance criteria:** Matches COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3's badge row exactly.
- **DoD evidence:** Four-badge screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P02-T016 — Build Loading, Empty, and 404 shell states
- **Status:** TODO · **Priority:** P1 · **Depends on:** P02-T005, P02-T006
- **Source:** DESIGN.md §18.19–§18.21
- **Objective:** Skeleton component (`color.surface.tinted` blocks, 1.5s opacity pulse), generic Empty-state component (icon-free, one sentence + link), and the 404 page shell (headline + two links, no 3D/particle asset).
- **Inputs/Files:** `components/ui/Skeleton.tsx`, `EmptyState.tsx`, `app/[locale]/not-found.tsx`.
- **Instructions:** 404 has no CMS dependency by design — must render even if Payload/DB is unreachable.
- **RTL/LTR:** Verified both directions. · **Responsive:** N/A · **Motion:** 1.5s pulse only. · **CMS:** 404 explicitly has none. · **Security:** N/A · **Performance:** 404 is the fastest-loading route by design.
- **Tests:** 404 renders correctly with the dev server's DB connection intentionally severed.
- **Acceptance criteria:** 404 still renders correctly under a simulated DB outage.
- **DoD evidence:** Test output under simulated outage; Reviewer: Technical Lead; Approval: Pending.

#### P02-T017 — Implement RTL/LTR layout foundation
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T011
- **Source:** DESIGN.md §9.5, §11–§12
- **Objective:** Establish the project-wide logical-property convention (Tailwind's `ms-*`/`me-*`/`ps-*`/`pe-*`/`start-*`/`end-*` utilities) as the only allowed spacing/positioning approach in shared components — enforced via an ESLint rule or code-review checklist item, not just a convention nobody checks.
- **Inputs/Files:** ESLint rule config (custom or community plugin) flagging physical `left`/`right`/`margin-left`/etc. in `components/`.
- **Instructions:** The one documented exception (signed `translateX` for motion, via `--dir`) is allow-listed explicitly, not left as a silent gap in the rule.
- **RTL/LTR:** This task *is* the enforcement mechanism. · **Responsive:** N/A · **Motion:** The `--dir` exception is scoped here. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Lint run against T005–T016's components finds zero physical-property violations.
- **Acceptance criteria:** Lint rule active and passing against every component built so far in this phase.
- **DoD evidence:** Lint output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T018 — Implement GSAP motion foundation
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §15; DESIGN.md §24
- **Objective:** `lib/motion/tokens.ts` (duration/easing values matching DESIGN.md §24.1–§24.2 exactly) and the section-scoped `useGSAP()` + `ScrollTrigger` pattern (trigger scoped to the section's own container ref, never a document-spanning timeline).
- **Inputs/Files:** `lib/motion/tokens.ts`, `components/motion/ScrollReveal.tsx` (a reusable section-reveal wrapper).
- **Instructions:** `ScrollReveal` must respect `prefers-reduced-motion` by rendering its final state instantly, centrally — not re-implemented per consumer.
- **RTL/LTR:** N/A (motion tokens are direction-neutral; the `--dir`-based exception lives in T017). · **Responsive:** N/A · **Motion:** This task is the foundation itself. · **CMS:** N/A · **Security:** N/A · **Performance:** No scroll-hijacking (DESIGN.md §24.5), verified by this wrapper never overriding native scroll position.
- **Tests:** Component test confirming `ScrollReveal` renders its final state immediately under `prefers-reduced-motion: reduce`.
- **Acceptance criteria:** One working scroll-reveal demo on the scaffold page.
- **DoD evidence:** Test output + a recorded interaction; Reviewer: Technical Lead; Approval: Pending.

#### P02-T019 — Implement the analytics `track()` abstraction
- **Status:** TODO · **Priority:** P1 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §23; PRODUCT.md §29
- **Objective:** `lib/analytics/track.ts` exporting a `track(eventName, properties)` function that no-ops safely until a real vendor SDK is wired (PRODUCT.md §34's pending decision), with every event name from PRODUCT.md §29 pre-declared as a typed constant so call sites can't typo an unapproved name.
- **Inputs/Files:** `lib/analytics/track.ts`, `lib/analytics/events.ts`.
- **Instructions:** No personally-identifying lead data ever passed as a property (TECHNICAL-ARCHITECTURE.md §23's hard rule) — enforced via the typed properties shape, not just a comment.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** PII exclusion as above. · **Performance:** No-op path adds negligible overhead.
- **Tests:** Unit test confirming `track()` doesn't throw with no vendor configured.
- **Acceptance criteria:** Every PRODUCT.md §29 event name exists as a typed constant.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P02-T020 — Re-verify `@react-three/drei` compatibility before relying on its helpers
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §32 (Risk, R3 in PLAN.md §27)
- **Objective:** Before Phase 03 builds the hero sculpture, confirm whether `@react-three/drei`'s camera/lighting/environment helpers are safe to use against the pinned React 19/R3F 9.5 pair, or whether the sculpture's camera/lighting rig must be hand-rolled against raw `@react-three/fiber`/`three` APIs instead.
- **Inputs/Files:** None created — a short spike component in a scratch route, discarded or promoted depending on outcome.
- **Instructions:** Record the decision (use Drei / hand-roll) before P03-T002 begins.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Spike component renders a trivial mesh with at least one Drei helper (e.g. `<Environment>`) without a runtime/type error.
- **Acceptance criteria:** Explicit go/no-go recorded for Drei usage in P03.
- **DoD evidence:** Spike output + decision note; Reviewer: Technical Lead; Approval: Pending.

#### P02-T021 — Scaffold the prototype route and labeled local fixtures
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T007, P02-T008, P02-T009, P02-T010, P02-T014, P02-T015, P02-T016, P02-T017, P02-T018
- **Source:** PAGE-BLUEPRINTS.md §31.2; VISUAL-QUALITY-GATES.md §5
- **Objective:** A dedicated prototype route composing Header, Footer, and placeholder slots for HOME-01/02/03/04, fed by explicitly-labeled local fixture data (e.g. `fixtures/prototype/*.ts`, filenames and content clearly marked "NOT REAL CONTENT — PROTOTYPE FIXTURE ONLY") — never anything that could be mistaken for live CMS content.
- **Inputs/Files:** `app/[locale]/(prototype)/page.tsx` (or similar non-production route), `fixtures/prototype/*.ts`.
- **Instructions:** This route is not part of the MVP route inventory (PLAN.md §7) — it exists only to host the Phase 03 gate and should be removable before Phase 10.
- **RTL/LTR:** Renders both locales. · **Responsive:** All three required viewports render without crashing. · **Motion:** Scroll-reveal demo active. · **CMS:** Explicitly fixture-only, not CMS-driven. · **Security:** N/A · **Performance:** N/A
- **Tests:** Playwright smoke test that the prototype route renders in both locales at all three viewports.
- **Acceptance criteria:** Ready for P03's hero/particle work to be dropped into the HOME-01/HOME-04 slots.
- **DoD evidence:** Smoke test output; Reviewer: Technical Lead; Approval: Pending.

**Phase 02 exit:** all 21 tasks `DONE`; PLAN.md §20 Phase 02 exit criteria met; technical-lead sign-off recorded. **No full inner page was built in this phase** (verified against the task list above — every task is a component/foundation, not a page).

---

## PHASE 03 — Visual Prototype & Owner Approval

Goal/exit criteria: PLAN.md §20 Phase 03. **Hard checkpoint — see PLAN.md §19.** Scope is exactly the six elements below; do not expand or reduce it.

#### P03-T001 — Build hero headline/subhead/CTA typography block (HOME-01 text layer)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T021
- **Source:** PAGE-BLUEPRINTS.md §6.1; PRODUCT.md §9.2–§9.3; DESIGN.md §6.1/§7.2
- **Objective:** Render the hero headline/subhead/CTA cluster using the fixture copy ("We Engineer the Extraordinary" / "بنحوّل الأفكار الكبيرة لأنظمة رقمية استثنائية") with per-line staggered entrance.
- **Inputs/Files:** `components/sections/home/Hero.tsx` (text layer only — the 3D canvas is T002).
- **Instructions:** `type.en.hero-h1`/`type.ar.hero-h1` headline in `color.ink.primary`; subhead in `color.ink.secondary` (DESIGN.md §6.2/§7.3 — never the reverse).
- **RTL/LTR:** Headline inline-start in both directions (left in EN, right in AR). · **Responsive:** Headline drops to mobile `display` size at 320px with manual line-break control. · **Motion:** 80ms-staggered line entrance, `motion.cinematic`/`ease.cinematic`. · **CMS:** Fixture-fed only in this phase. · **Security:** N/A · **Performance:** Both CTAs interactive from first paint regardless of entrance-animation state.
- **Tests:** Component test asserting both CTAs are clickable before the entrance animation's `motion.cinematic` duration has elapsed.
- **Acceptance criteria:** PRODUCT.md §17.1's acceptance line ("headline + both CTAs visible and interactive within first viewport at 360px with zero layout shift after font load").
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P03-T002 — Build the Signature 3D sculpture (procedural geometry + Cobalt & Porcelain materials)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T020
- **Source:** DESIGN.md §13; TECHNICAL-ARCHITECTURE.md §16, §35; VISUAL-ASSET-MATRIX.md §2
- **Objective:** Build the faceted polyhedral sculpture as R3F geometry with five materials (cobalt enamel, polished ceramic, brushed metal, matte porcelain composite, translucent cobalt glass) and a studio lighting rig (soft overhead key light + cobalt-tinted fill light) — no rim-light-in-darkness.
- **Inputs/Files:** `components/three/HeroSculpture.tsx`, `components/three/materials/*.ts`.
- **Instructions:** Dynamically imported via `next/dynamic` with `ssr:false`; desktop-only (≥768px) — not mounted below that breakpoint at all (T005 covers the mobile path).
- **RTL/LTR:** Composition position/orientation handled in T004, not here (this task builds the base asset). · **Responsive:** Not loaded <768px. · **Motion:** Idle micro-rotation ≤4° (20–30s loop); pointer parallax ≤8° desktop only. · **CMS:** `sculptureAsset` field will reference this build's output in Phase 05 — fixture-only here. · **Security:** N/A · **Performance:** ≤1.5MB WebGL payload (model+textures), verified via bundle analysis.
- **Tests:** Visual check that at least three materials are distinguishable in a static render (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1 H2).
- **Acceptance criteria:** Silhouette is describable in one sentence (DESIGN.md §13's "avoiding generic abstract 3D" test); no floating-orb/torus/blob result.
- **DoD evidence:** Render screenshot showing material distinction; Reviewer: Technical Lead; Approval: Pending.

#### P03-T003 — Implement hero grounding (cast shadow + cobalt color-bleed reflection)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T002
- **Source:** DESIGN.md §13.1, §5.5
- **Objective:** Add a soft, large-radius cast shadow beneath/behind the sculpture onto `color.bg.page`, plus a faint cobalt-tinted reflection bleeding onto the nearest adjacent surface (the 2–3 nearest headline characters) — replacing the retired rim-light-bleed mechanism.
- **Inputs/Files:** `components/three/HeroSculpture.tsx` (shadow/reflection layer), `components/sections/home/Hero.tsx` (reflection target styling).
- **Instructions:** This is the exact mechanism the Disconnection Test (T014) will grade.
- **RTL/LTR:** Reflection direction re-aimed in T004 for Arabic, not duplicated here. · **Responsive:** N/A (desktop-only asset). · **Motion:** Shadow is static, not animated. · **CMS:** N/A · **Security:** N/A · **Performance:** Shadow/reflection technique kept within the ≤1.5MB budget already allocated to T002.
- **Tests:** Visual check per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1 H3 ("fail if the object looks cut out and pasted onto a flat background").
- **Acceptance criteria:** H3's pass condition met in a static screenshot.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P03-T004 — Implement hero Arabic recomposition (not mirroring)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T002, P03-T003
- **Source:** DESIGN.md §13 directional composition rule, §13.1 H9
- **Objective:** For `/ar`, reposition the sculpture to the opposite screen side and re-aim the light rig/shadow/reflection direction toward the Arabic headline's position — the same asset, a different camera/light configuration, never a horizontally-flipped render.
- **Inputs/Files:** `components/three/HeroSculpture.tsx` (locale-aware rig configuration prop).
- **Instructions:** N/A
- **RTL/LTR:** This task *is* the RTL requirement for the hero. · **Responsive:** N/A · **Motion:** Same idle/parallax behavior, mirrored position only. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual check per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §4 A2 (verified independently, not assumed mirrored from English).
- **Acceptance criteria:** H9/A2 pass conditions met.
- **DoD evidence:** AR screenshot alongside the EN one from T003; Reviewer: Technical Lead; Approval: Pending.

#### P03-T005 — Implement hero mobile static/video fallback
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T003, P03-T004
- **Source:** DESIGN.md §13; VISUAL-ASSET-MATRIX.md §2, §13
- **Objective:** Capture an offline render of the grounded, lit scene (both EN and AR compositions) as a static image or short muted video loop, served below 768px instead of the live WebGL canvas.
- **Inputs/Files:** `public/assets/hero-fallback-en.*`, `public/assets/hero-fallback-ar.*`, `components/sections/home/Hero.tsx` (breakpoint-gated swap).
- **Instructions:** The fallback must preserve the same grounding (visible shadow) established in T003 — not a lower-fidelity render that drops it.
- **RTL/LTR:** Both EN/AR fallback assets captured. · **Responsive:** This task *is* the <768px path. · **Motion:** If video, ≤8s loop, muted, poster frame set. · **CMS:** `sculptureFallback` field will reference this in Phase 05. · **Security:** N/A · **Performance:** ≤400KB per DESIGN.md §33.
- **Tests:** Build-size check against the 400KB budget.
- **Acceptance criteria:** COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1 H10.
- **DoD evidence:** Mobile screenshot (390px) showing the grounded fallback; Reviewer: Technical Lead; Approval: Pending.

#### P03-T006 — Wire hero entrance animation + reduced-motion fallback
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T001, P03-T002
- **Source:** DESIGN.md §24.3, §24.6
- **Objective:** Compose T001's text stagger with T002's idle rotation/parallax into one coherent entrance sequence; `prefers-reduced-motion` yields the static final-resolved frame with grounding already visible (not a motion-dependent reveal of the shadow).
- **Inputs/Files:** `components/sections/home/Hero.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Entrance timing identical both directions (text alignment handles direction). · **Responsive:** N/A · **Motion:** This task is the composition itself. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** `prefers-reduced-motion: reduce` screenshot test per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §6 M1.
- **Acceptance criteria:** M1's pass condition met.
- **DoD evidence:** Reduced-motion screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P03-T007 — Build Selected Work (HOME-02) composition with fixture project cards
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T015, P02-T021
- **Source:** PAGE-BLUEPRINTS.md §6.2; DESIGN.md §27 row 02
- **Objective:** Large featured-project media + asymmetric editorial arrangement on `color.bg.page`, using 2–3 clearly-labeled fixture cards (never content resembling a real client project).
- **Inputs/Files:** `components/sections/home/SelectedWork.tsx`.
- **Instructions:** Fixture classification badges must span at least two of the four values so T014's badge-color check has something to verify.
- **RTL/LTR:** Badge at logical-start corner, grid reading order per §11/§12. · **Responsive:** Single-column at mobile. · **Motion:** Scroll-reveal + hover scale. · **CMS:** Fixture-only in this phase. · **Security:** N/A · **Performance:** N/A
- **Tests:** Component test for badge rendering across classification values.
- **Acceptance criteria:** Zero stock imagery; classification badges visible and correctly colored.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P03-T008 — Build What We Create (HOME-03) editorial service rows
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T013, P02-T014
- **Source:** PAGE-BLUEPRINTS.md §6.3; DESIGN.md §27 row 03
- **Objective:** Three Service Row instances (T014) on `color.bg.section.tinted` with the oversized numeral device (T013), using the three real locked service names (PRODUCT.md §8) since these are not fabricated content.
- **Inputs/Files:** `components/sections/home/WhatWeCreate.tsx`.
- **Instructions:** No three-card grid — editorial rows only (DESIGN.md §36 anti-pattern check).
- **RTL/LTR:** Chevron mirrors; hover-shift flips. · **Responsive:** Numbered index stacks above name on mobile. · **Motion:** Entrance reveal + hover shift. · **CMS:** Service names/summaries are real PRODUCT.md content, hard-coded in this phase (Phase 06 wires the live CMS version). · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual check confirming no card/grid pattern present.
- **Acceptance criteria:** COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §2 HOME-03 row.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P03-T009 — Build Particle Intelligence system (HOME-04, on deep cobalt)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T020
- **Source:** DESIGN.md §14, §27 row 04; TECHNICAL-ARCHITECTURE.md §16, §35
- **Objective:** Build the three-stage procedural particle simulation (fragmented → connected → automated) rendered on `color.bg.section.dark`, with `color.particle.dim`→`color.cobalt.dim`→`color.particle.core` color progression and additive self-illumination.
- **Inputs/Files:** `components/three/ParticleIntelligence.tsx`.
- **Instructions:** Dynamically imported, desktop-only (≥768px). All text in this section uses `color.ink.onDark`/`color.ink.onDark.secondary`, never the light-background ink tokens (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §2 HOME-04 row).
- **RTL/LTR:** Stage progression does not mirror (time-based) — verified explicitly, not assumed. · **Responsive:** Not loaded <768px. · **Motion:** 600–900ms stage transitions, scroll-linked within this section's own range only. · **CMS:** `stages[]` content fixture-fed here. · **Security:** N/A · **Performance:** ≤400KB WebGL payload.
- **Tests:** Visual check confirming self-illumination reads as light/energy, not muddy, against the dark backdrop.
- **Acceptance criteria:** DESIGN.md §14's full property table satisfied.
- **DoD evidence:** Screenshot on `bg.section.dark`; Reviewer: Technical Lead; Approval: Pending.

#### P03-T010 — Implement HOME-04 manual stage controls + reduced-motion fallback
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T009
- **Source:** DESIGN.md §14, §26; PAGE-BLUEPRINTS.md §6.4
- **Objective:** Prev/next controls always available (never scroll-only progression); `prefers-reduced-motion` renders a static three-frame stepped sequence **on the same dark background**, not a light fallback.
- **Inputs/Files:** `components/sections/home/SystemsInMotion.tsx`.
- **Instructions:** The three stage names/descriptions are real DOM text, not canvas-only (accessibility requirement, DESIGN.md §14/§26/§32).
- **RTL/LTR:** Controls/text follow reading direction; particle motion itself does not mirror. · **Responsive:** Mobile uses the pre-baked sprite/Canvas2D fallback, still on the dark background (COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §5, mobile row). · **Motion:** Manual control + reduced-motion path. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Screen-reader test confirming stage text is announced regardless of canvas render state.
- **Acceptance criteria:** COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §6 M2.
- **DoD evidence:** Reduced-motion screenshot on dark background; Reviewer: Technical Lead; Approval: Pending.

#### P03-T011 — Polish Header for the prototype
- **Status:** TODO · **Priority:** P1 · **Depends on:** P02-T007, P02-T009
- **Source:** DESIGN.md §18.1; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3
- **Objective:** Verify the scroll-state transition and `color.border.hairline` edge render correctly against the actual porcelain hero background (not just the Phase 02 mock), and that it sits correctly above the sculpture's z-index.
- **Inputs/Files:** `components/ui/Header.tsx` (adjustments only, no new component).
- **Instructions:** N/A
- **RTL/LTR:** Re-verified against the real hero, both directions. · **Responsive:** All three required viewports. · **Motion:** Scroll-state transition re-checked. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual check at scroll position 0 and 60px.
- **Acceptance criteria:** COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §3 Header row.
- **DoD evidence:** Two-state screenshot (transparent/solid); Reviewer: Technical Lead; Approval: Pending.

#### P03-T012 — Polish Footer for the prototype
- **Status:** TODO · **Priority:** P2 · **Depends on:** P02-T010
- **Source:** DESIGN.md §18.18
- **Objective:** Verify Footer renders correctly as the prototype's closing element, with fixture-level column content (not real contact details, which remain 🔴 pending per PRODUCT.md §34).
- **Inputs/Files:** `components/ui/Footer.tsx` (adjustments only).
- **Instructions:** N/A
- **RTL/LTR:** Re-verified. · **Responsive:** All three viewports. · **Motion:** N/A (quiet component). · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual check.
- **Acceptance criteria:** Matches DESIGN.md §18.18.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P03-T013 — Execute Gate 1 (Typography) against the prototype
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T001, P03-T007, P03-T008, P03-T011, P03-T012
- **Source:** VISUAL-QUALITY-GATES.md §1
- **Objective:** Run the full Gate 1 checklist (display headline appearance, paragraph readability, font loading/fallback, weight distribution, line-height, letter-spacing, line wrapping, Arabic glyph shaping, mixed-content isolation, optical alignment, responsive scaling) against real browser screenshots of the six elements, both locales.
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** Real screenshots, not token-table review (VISUAL-QUALITY-GATES.md §1's binding rule).
- **RTL/LTR:** Full checklist run independently per locale. · **Responsive:** 1280/1024/768/390/320px. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist itself.
- **Acceptance criteria:** Every row in VISUAL-QUALITY-GATES.md §1's table passes.
- **DoD evidence:** Annotated screenshot set; Reviewer: Design reviewer (human); Approval: Pending.

#### P03-T014 — Execute Gate 2 (Color & Surface) incl. the Disconnection Test
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T003, P03-T009
- **Source:** VISUAL-QUALITY-GATES.md §2; DESIGN.md §13.1; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §1
- **Objective:** Run Gate 2's full checklist including the rewritten Disconnection Test (H5) and the new "deep-cobalt section discipline" check confirming exactly HOME-04 uses `color.bg.section.dark` within this prototype's scope (HOME-08 is not in the prototype, so the "exactly two, total" count is verified in Phase 05, not here — this gate confirms HOME-04 is correctly dark and nothing else in the prototype is).
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** N/A (color is direction-neutral; composition already checked in T004). · **Responsive:** All three viewports. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist itself, incl. a color-histogram or visual-estimate check of cobalt-area ≤10%.
- **Acceptance criteria:** Every row in VISUAL-QUALITY-GATES.md §2 passes; Disconnection Test explicitly passes (not just "looks fine").
- **DoD evidence:** Annotated screenshot set incl. the Disconnection Test evidence; Reviewer: Design reviewer (human); Approval: Pending.

#### P03-T015 — Execute Gate 3 (Asset Completeness) for all prototype assets
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T002, P03-T005, P03-T009, P03-T010
- **Source:** VISUAL-QUALITY-GATES.md §3; VISUAL-ASSET-MATRIX.md §2–§3, §15
- **Objective:** Confirm every asset used by the six prototype elements resolves to a VISUAL-ASSET-MATRIX.md row, is tagged with its `provenance` value (conceptually — the CMS field itself doesn't exist until Phase 04, so this is recorded as a to-be-tagged note), and that no stock substitute was used anywhere.
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist itself.
- **Acceptance criteria:** Every asset traced to a matrix row with a recorded provenance intent.
- **DoD evidence:** Asset-to-matrix-row mapping table; Reviewer: Technical Lead; Approval: Pending.

#### P03-T016 — Execute Gate 4 (Section Completeness) for all six elements
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T013, P03-T014, P03-T015
- **Source:** VISUAL-QUALITY-GATES.md §4; PAGE-BLUEPRINTS.md §31.1
- **Objective:** Run the full per-element Section Completeness checklist (required content present, focal point visible, layout balance, no unintended empty regions, typography/assets/motion all already-passed, static-state complete, RTL/LTR both reviewed, responsive compositions intentional) against each of the six elements.
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** Any single failed row blocks this gate for that element (VISUAL-QUALITY-GATES.md §4's explicit "no partial pass" rule).
- **RTL/LTR:** Both directions independently reviewed per element. · **Responsive:** All three viewports per element. · **Motion:** Static-state re-confirmed per element. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist itself, six times (once per element).
- **Acceptance criteria:** All six elements pass with zero failed rows.
- **DoD evidence:** Six completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P03-T017 — Capture the full required screenshot matrix
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T016
- **Source:** VISUAL-QUALITY-GATES.md §5; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8
- **Objective:** Capture ≥40 screenshots: 6 elements × 3 viewports (1440/768/390) × 2 locales, plus `prefers-reduced-motion` variants of HOME-01 and HOME-04, using the Playwright screenshot-capture suite from TECHNICAL-ARCHITECTURE.md §36.
- **Inputs/Files:** `e2e/prototype-screenshots.spec.ts`, output images (stored outside the repo or in a git-ignored artifacts directory — not committed as production assets).
- **Instructions:** Post-animation-settle state captured, not mid-animation.
- **RTL/LTR:** Both locales, every element. · **Responsive:** All three viewports, every element. · **Motion:** Pre- and post-settle, plus reduced-motion variants. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The capture script itself; asserts ≥40 images produced.
- **Acceptance criteria:** Full matrix captured per VISUAL-QUALITY-GATES.md §5's requirement list, nothing short-counted.
- **DoD evidence:** Screenshot count + index; Reviewer: Technical Lead; Approval: Pending.

#### P03-T018 — Present the prototype for owner review and record the Gate 5 decision
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T017
- **Source:** VISUAL-QUALITY-GATES.md §5; COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8; PLAN.md §19
- **Objective:** Present the staging-deployed prototype (PLAN.md §24) plus the full screenshot matrix (T017) to the owner, and record one of: **PASS** / **CONDITIONAL PASS** (with the specific re-testable condition named) / **FAIL** (with the specific failing row cited, per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §8).
- **Inputs/Files:** None created — the decision itself is the deliverable, recorded in this task's completion evidence and referenced by every Phase 04–10 task as their blocking dependency.
- **Instructions:** **A technically-passing Playwright/Lighthouse/axe run does not satisfy this gate on its own** — only an explicit owner decision does. Do not mark this `DONE` on the strength of T013–T017 alone.
- **RTL/LTR:** N/A (already covered by prior tasks). · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** N/A — this is a human decision, not an automated check.
- **Acceptance criteria:** An explicit, dated, recorded owner decision exists. On FAIL, the specific failing element(s)/row(s) are cited and routed back to the relevant T001–T016 task, not a vague "redo the prototype."
- **DoD evidence:** The recorded decision, dated, with the owner's name/role; Reviewer: N/A; **Approval: Owner (this is the one task in the entire register whose approval authority is the owner, not the technical lead).**

**Phase 03 exit:** all 18 tasks `DONE`, with **P03-T018 recording PASS or an owner-accepted CONDITIONAL PASS** (a FAIL routes the cited tasks back to `TODO`/`IN_PROGRESS` and re-runs T013–T018). **Every task in Phases 04–10 below lists `P03-T018` as a blocking dependency** and may not proceed to `IN_PROGRESS` until it reads `DONE` with a PASS/CONDITIONAL-PASS outcome recorded.

---

## PHASE 04 — CMS & Content Infrastructure

Goal/exit criteria: PLAN.md §20 Phase 04. **All tasks below depend on P03-T018**, except T001–T002 which are schema/config-only and may start in parallel with Phase 03 per PLAN.md §19/§23's narrow exception (no rendered route consumes them until Phase 05).

#### P04-T001 — Pin matching versions across all four Payload packages
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T017
- **Source:** TECHNICAL-ARCHITECTURE.md §4 (Payload rows)
- **Objective:** Confirm `payload` core, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical` are all pinned to the exact same version number per Payload's monorepo convention, re-verified against the live registry at this point in time (versions may have moved since P01-T001's check).
- **Inputs/Files:** `package.json` version pins.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** This task is the CMS version foundation. · **Security:** N/A · **Performance:** N/A
- **Tests:** `pnpm install` succeeds with no peer-dependency warnings for these four packages.
- **Acceptance criteria:** All four packages share one version string.
- **DoD evidence:** `package.json` diff + install output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T002 — Configure Payload + Postgres adapter base config
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T001, P01-T009
- **Source:** TECHNICAL-ARCHITECTURE.md §17–§18
- **Objective:** Replace P01-T009's compatibility config with the full Phase 04 base `payload.config.ts` (admin config, Postgres adapter wired to `DATABASE_URI`, Lexical editor registered), retaining the Phase 01 auth-only `Users` collection and adding no other collection in this task.
- **Inputs/Files:** `payload.config.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** Base config. · **Security:** N/A · **Performance:** N/A
- **Tests:** `/admin` still boots cleanly on the real base config.
- **Acceptance criteria:** Boots with zero errors.
- **DoD evidence:** Screenshot of booted admin; Reviewer: Technical Lead; Approval: Pending.

#### P04-T003 — Implement `users` collection + auth
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T002
- **Source:** CMS-SCHEMAS.md §4.1
- **Objective:** Extend the Phase 01 auth-only `collections/Users.ts` with the Phase 04 CMS-SCHEMAS.md §4.1 fields: `name`, unique `email`, and `role` (`super-admin`/`content-editor`/`lead-manager`), retaining Payload's built-in auth; do not create a second Users collection.
- **Inputs/Files:** `collections/Users.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Admin UI only, not locale-specific. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Field-for-field per CMS-SCHEMAS.md §4.1. · **Security:** Password hashing via Payload's auth system, never stored plain. · **Performance:** N/A
- **Tests:** Integration test creating a user with each role value.
- **Acceptance criteria:** Matches §4.1 exactly; unique email enforced.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T004 — Implement RBAC access-control functions
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T003
- **Source:** CMS-SCHEMAS.md §4.2, §26
- **Objective:** A shared `lib/payload/access.ts` exporting the role-based `access` functions (Super Admin: full; Content Editor: content read/write, no leads/users; Lead Manager: leads read/update-status, no content/user write) applied identically across every collection/global built in this phase.
- **Inputs/Files:** `lib/payload/access.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** This is the CMS security foundation for the entire phase. · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** Integration test matrix: each role × each collection × each operation (create/read/update/delete), asserting the exact CMS-SCHEMAS.md §26 table.
- **Acceptance criteria:** Full matrix passes with zero deviations from §26.
- **DoD evidence:** Test matrix output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T005 — Implement `media` collection + provenance fields
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002, P04-T004
- **Source:** CMS-SCHEMAS.md §9, §9.1
- **Objective:** `collections/Media.ts` with `alt` (localized, required), `caption` (localized, optional), MIME-type restriction (`image/avif`, `image/webp`, `image/png`, `image/jpeg`, `image/svg+xml`, `video/mp4`), size limit, plus the Phase-03-added `provenance` (select, default `original-production`) and `conceptualOnly` (checkbox) fields.
- **Inputs/Files:** `collections/Media.ts`.
- **Instructions:** N/A
- **RTL/LTR:** `alt`/`caption` localized per field. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Field-for-field per §9/§9.1. · **Security:** MIME/size validation at the Payload upload-config level. · **Performance:** N/A
- **Tests:** Upload test rejecting a disallowed MIME type.
- **Acceptance criteria:** Matches §9/§9.1 exactly.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T006 — Implement `project-categories` collection
- **Status:** TODO · **Priority:** P2 · **Depends on:** P04-T002, P04-T004
- **Source:** CMS-SCHEMAS.md §6
- **Objective:** `collections/ProjectCategories.ts` — `name` (localized), `slug` (unique).
- **Inputs/Files:** `collections/ProjectCategories.ts`.
- **Instructions:** N/A
- **RTL/LTR:** `name` localized. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §6. · **Security:** N/A · **Performance:** N/A
- **Tests:** CRUD integration test.
- **Acceptance criteria:** Matches §6.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T007 — Implement `services` collection
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002, P04-T004, P04-T005
- **Source:** CMS-SCHEMAS.md §7
- **Objective:** `collections/Services.ts` — all fields per §7 (`title`, `slug` fixed to the three locked values, `pillarNumber`, `summary`, `problems[]`, `deliverables[]`, `architectureDiagram` group, `processSummary`, `relatedProjects`, `cta`, `seo`, `status`).
- **Inputs/Files:** `collections/Services.ts`.
- **Instructions:** `slug` values locked to `custom-software`/`enterprise-solutions`/`ai-agents-automation` — not freely editable to a fourth value (this is enforced editorially/by seed, not a hard schema constraint, since Payload selects don't support a closed record set at the collection level — document this as the editorial control point).
- **RTL/LTR:** Localized fields per §7. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §7 field-for-field. · **Security:** N/A · **Performance:** N/A
- **Tests:** CRUD integration test; repeater item-schema test for `problems[]`/`deliverables[]`.
- **Acceptance criteria:** Matches §7.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T008 — Implement `projects` collection
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002, P04-T004, P04-T005, P04-T006, P04-T007
- **Source:** CMS-SCHEMAS.md §5
- **Objective:** `collections/Projects.ts` — every field in §5 (`title`, `slug` unique shared-across-locales, `classification` enum, `industry`, `clientDisplayName`, `clientDisclosureApproved`, `summary`, `heroMedia`, `thumbnail`, `featured`, `featuredOrder`, `archiveOrder`, `services` relationship, `challenge`/`solution` richText, `engineeringDecisions[]`, `technologies[]`, `verifiedOutcomes[]`, `outcomeEvidence`, `projectGallery[]`, `flexibleBlocks`, `relatedProjects`, `seo`, `status`, `publishedAt`).
- **Inputs/Files:** `collections/Projects.ts`.
- **Instructions:** `flexibleBlocks` field references the block registry built in T016 — if T016 isn't done yet, stub this field and revisit before T008 is marked `DONE`.
- **RTL/LTR:** Localized fields per §5. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §5 field-for-field. · **Security:** `clientDisplayName` never exposed without `clientDisclosureApproved` (enforced in T009). · **Performance:** N/A
- **Tests:** CRUD integration test; field-presence test for every §5 row.
- **Acceptance criteria:** Matches §5 exactly, including the shared-slug (not locale-scoped) uniqueness rule (§21).
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T009 — Implement the hard publishing-rule hooks
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T008
- **Source:** CMS-SCHEMAS.md §24; PRODUCT.md §23.1, §26
- **Objective:** A `beforeChange` hook on `projects` rejecting a save where `status: 'published'` AND `classification: 'real-client'` AND `clientDisclosureApproved: false` simultaneously, and a second rejecting `status: 'published'` with non-empty `verifiedOutcomes` but empty `outcomeEvidence`.
- **Inputs/Files:** `collections/Projects.ts` (hooks section).
- **Instructions:** This is the single most important integrity control in the entire CMS layer per the project's standing authenticity rule — do not treat it as optional polish.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** This task is the CMS integrity layer. · **Security:** Prevents fabricated-claim publication at the data layer, not just by convention. · **Performance:** N/A
- **Tests:** Integration test: attempt to publish a `real-client` project without disclosure approval → rejected with a named validation error; same for `verifiedOutcomes` without `outcomeEvidence`.
- **Acceptance criteria:** Both rejection paths proven by a failing-then-passing test pair (reject the bad case, then show the good case saves fine).
- **DoD evidence:** Test output showing both the rejection and the successful case; Reviewer: Technical Lead; Approval: Pending.

#### P04-T010 — Implement `leads` collection + access restriction
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002, P04-T004
- **Source:** CMS-SCHEMAS.md §10
- **Objective:** `collections/Leads.ts` — every field in §10; `create` access public-but-only-via-the-validated-Server-Action (not a directly public API write); `read`/`update`/`delete` restricted to Super Admin + Lead Manager.
- **Inputs/Files:** `collections/Leads.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A (internal data, not rendered bilingual UI itself). · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §10. · **Security:** Never public-readable — this is the single highest-sensitivity collection in the schema. · **Performance:** N/A
- **Tests:** Integration test confirming an unauthenticated direct API read attempt is rejected.
- **Acceptance criteria:** Matches §10; zero public read path exists.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T011 — Implement `pages` collection (Privacy, draft-gated)
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T002, P04-T004
- **Source:** CMS-SCHEMAS.md §8
- **Objective:** `collections/Pages.ts` — `title`, `slug` (unique), `body` (richText), `lastReviewedAt`, `seo`, `status`. Create exactly one record (`slug: privacy`), left in `draft` until real legal text is supplied.
- **Inputs/Files:** `collections/Pages.ts`.
- **Instructions:** Do not populate `body` with placeholder legal text — leave it genuinely empty/draft, per PRODUCT.md §18.8's hard rule.
- **RTL/LTR:** `body`/`title` localized. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §8. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test confirming a `draft` page is excluded from public queries.
- **Acceptance criteria:** Matches §8; `privacy` record exists in `draft`.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T012 — Implement Site Settings, Navigation, Footer globals
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002, P04-T004, P04-T005
- **Source:** CMS-SCHEMAS.md §14–§15
- **Objective:** Three globals matching §14 (`navigation.items[]` locked 5-item order + `primaryCta`) and §15 (`footer.missionOneLiner`/`navigationLinks[]`/`serviceLinks[]`/`contactLinks[]`/`legalLinks[]`/`copyrightText`), plus a minimal `site-settings` global carrying the logo asset reference and legal-entity placeholder fields (🔴 pending owner input, left empty).
- **Inputs/Files:** `globals/SiteSettings.ts`, `globals/Navigation.ts`, `globals/Footer.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Labels localized per item. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §14–§15. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test reading each global's default/empty state.
- **Acceptance criteria:** Matches §14–§15 field-for-field.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T013 — Implement Homepage global
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T007, P04-T008, P04-T012
- **Source:** CMS-SCHEMAS.md §11
- **Objective:** `globals/Homepage.ts` — all eight field groups (`hero`, `selectedWork`, `whatWeCreate`, `systemsInMotion` exactly-3-stages, `engineeringBehind`, `visionToReality` reference, `philosophy`, `finalConversion`), plus `seo`.
- **Inputs/Files:** `globals/Homepage.ts`.
- **Instructions:** `systemsInMotion.stages` uses `minRows: 3, maxRows: 3`.
- **RTL/LTR:** Every text field localized per §11. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §11 exactly — this is Phase 05's primary data source. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test asserting the stages array rejects a 2nd or 4th entry.
- **Acceptance criteria:** Matches §11.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T014 — Implement About Page and Process Page globals
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T012
- **Source:** CMS-SCHEMAS.md §12–§13
- **Objective:** `globals/AboutPage.ts` (incl. optional `teamMembers[]`, empty by default) and `globals/ProcessPage.ts` (`steps[]` exactly-6, locked order).
- **Inputs/Files:** `globals/AboutPage.ts`, `globals/ProcessPage.ts`.
- **Instructions:** `steps` uses `minRows: 6, maxRows: 6`.
- **RTL/LTR:** Localized per §12–§13. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §12–§13. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test asserting `steps` rejects a 5th or 7th entry.
- **Acceptance criteria:** Matches §12–§13.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T015 — Implement Contact Settings and SEO Defaults globals
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T012
- **Source:** CMS-SCHEMAS.md §16–§17
- **Objective:** `globals/ContactSettings.ts` (field labels, `projectTypeOptions[]` matching the three service slugs + "not sure," `budgetRangeOptions[]` empty by default per the pending currency decision, `timelineOptions[]` pre-populated) and `globals/SEODefaults.ts`.
- **Inputs/Files:** `globals/ContactSettings.ts`, `globals/SEODefaults.ts`.
- **Instructions:** `budgetRangeOptions` ships empty — do not invent brackets or a currency.
- **RTL/LTR:** Labels localized. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §16–§17. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test reading both globals' default state.
- **Acceptance criteria:** Matches §16–§17; `budgetRangeOptions` confirmed empty, not populated with invented values.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T016 — Implement the 14 flexible blocks registry
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T005, P04-T008
- **Source:** CMS-SCHEMAS.md §18
- **Objective:** All 14 blocks (`richText`, `splitContent`, `fullBleedMedia`, `imageGallery`, `videoShowcase`, `featureGrid`, `architectureDiagram`, `technologyStack`, `processTimeline`, `verifiedMetrics`, `approvedTestimonial`, `quote`, `cta`, `relatedProjects`) scoped **only** to `projects.flexibleBlocks` — not exposed as a field type anywhere else.
- **Inputs/Files:** `blocks/*.ts` (one file per block), wired into `collections/Projects.ts`'s `flexibleBlocks` field.
- **Instructions:** No `customCss`/`customJs` field on any block, per the prompt's hard prohibition.
- **RTL/LTR:** Text fields localized per block. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §18 field-for-field, all 14 blocks. · **Security:** No arbitrary styling/script injection surface, verified by the absence of any such field. · **Performance:** N/A
- **Tests:** Integration test confirming `flexibleBlocks` accepts each of the 14 types and rejects an unregistered 15th type.
- **Acceptance criteria:** Matches §18; registry closed (no arbitrary block types).
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T017 — Implement the full repeater field schema set
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T007, P04-T008, P04-T012, P04-T013, P04-T014, P04-T015
- **Source:** CMS-SCHEMAS.md §19
- **Objective:** Verify/finalize every repeater item schema listed in §19 (project gallery images, engineering decisions, technology stack groups, verified outcomes, service deliverables/problems, process steps, team members, contact methods, navigation items, footer links, Systems-in-Motion stages, engineering principles) exactly matches its min/max/localization spec.
- **Inputs/Files:** Cross-cutting — touches the collection/global files already created above; this task is a verification pass, not new files.
- **Instructions:** N/A
- **RTL/LTR:** Per-repeater localization confirmed. · **Responsive:** N/A · **Motion:** N/A · **CMS:** This is the repeater audit. · **Security:** N/A · **Performance:** N/A
- **Tests:** One integration test per repeater confirming its min/max bound.
- **Acceptance criteria:** Every row in §19 verified against the actual implemented field.
- **DoD evidence:** Test matrix output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T018 — Configure localization (`en`/`ar-EG`, fallback behavior)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T002
- **Source:** CMS-SCHEMAS.md §20; TECHNICAL-ARCHITECTURE.md §12
- **Objective:** `locales: ['en', 'ar-EG']`, `defaultLocale: 'en'`, `fallback: true` in `payload.config.ts` — documented as independent from the public `/en`/`/ar` route-prefix policy (T not conflated).
- **Inputs/Files:** `payload.config.ts` (localization block).
- **Instructions:** N/A
- **RTL/LTR:** This task is the CMS-side RTL/LTR content foundation. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Core config. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test confirming a field with only an `en` value falls back correctly when queried in `ar-EG`.
- **Acceptance criteria:** Fallback behavior matches §20 exactly.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T019 — Implement the shared-slug strategy
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T007, P04-T008, P04-T018
- **Source:** CMS-SCHEMAS.md §21; PRODUCT.md §14
- **Objective:** Confirm `projects.slug`/`services.slug` are `unique: true` at the collection level (not locale-scoped), proving one record serves both `/en/work/{slug}` and `/ar/work/{slug}`.
- **Inputs/Files:** Verification pass on T007/T008's existing field config.
- **Instructions:** N/A
- **RTL/LTR:** This is the mechanism that makes shared-slug bilingual routing possible. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Verification task. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test attempting to create two `projects` records with the same slug → rejected.
- **Acceptance criteria:** Uniqueness enforced at the data layer, not just editorial convention.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P04-T020 — Configure persistent media storage + document S3 migration path
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T005, P01-T007
- **Source:** TECHNICAL-ARCHITECTURE.md §19; CMS-SCHEMAS.md §27
- **Objective:** Mount a named Docker volume for uploaded media (not the container's ephemeral writable layer), and confirm the `media` collection's stored shape (relative path + metadata, not an absolute local path) would support an S3-compatible adapter swap later with no schema change.
- **Inputs/Files:** `docker-compose.yml` volume mount.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Restart the `app` container and confirm a previously-uploaded test file still resolves.
- **Acceptance criteria:** Media survives container recreation.
- **DoD evidence:** Before/after container-restart test; Reviewer: Technical Lead; Approval: Pending.

#### P04-T021 — Implement database indexes
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T006, P04-T007, P04-T008, P04-T010, P04-T003
- **Source:** CMS-SCHEMAS.md §28
- **Objective:** Apply `index: true` (or `unique: true` where specified) to every field listed in §28's table (`projects.slug`, `services.slug`, `pages.slug`, `projects.status`, `projects.classification`, `projects.featured`, the `services↔projects` relationship, `leads.status`, `leads.submittedAt`, `users.email`).
- **Inputs/Files:** Field-config updates across the already-created collection files.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §28. · **Security:** N/A · **Performance:** Query performance for the archive/filtering use case in Phase 07 depends on these.
- **Tests:** Query-plan check (or at minimum, a timed query benchmark before/after) on the `projects.status` filter.
- **Acceptance criteria:** Every §28 row has its index applied.
- **DoD evidence:** Index list from the Postgres schema; Reviewer: Technical Lead; Approval: Pending.

#### P04-T022 — Configure cache-revalidation hooks
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T007, P04-T008, P04-T011, P04-T012, P04-T013, P04-T014, P04-T015
- **Source:** CMS-SCHEMAS.md §30; TECHNICAL-ARCHITECTURE.md §24
- **Objective:** `afterChange` hooks on `projects`/`services`/`pages`/every global that call `revalidatePath`/`revalidateTag` for exactly the routes that record affects (e.g., publishing a project revalidates both locale variants of `/work` and `/work/{slug}`, plus any service page listing it as related work) — not a blanket full-site revalidation.
- **Inputs/Files:** `lib/payload/revalidation.ts`, wired into each collection/global's `hooks.afterChange`.
- **Instructions:** N/A
- **RTL/LTR:** Both locale variants of an affected route are revalidated together. · **Responsive:** N/A · **Motion:** N/A · **CMS:** This task is the cache-invalidation layer. · **Security:** N/A · **Performance:** Prevents unnecessary full-site cache busts on every save.
- **Tests:** Integration test confirming a project-publish event triggers exactly the expected path list, not more.
- **Acceptance criteria:** Matches §30's targeted-revalidation principle.
- **DoD evidence:** Test output showing the exact revalidated-path list; Reviewer: Technical Lead; Approval: Pending.

#### P04-T023 — Configure live preview for Projects and Services
- **Status:** TODO · **Priority:** P2 · **Depends on:** P04-T007, P04-T008
- **Source:** CMS-SCHEMAS.md §25
- **Objective:** Wire Payload's `admin.livePreview` config pointing at the correct locale-prefixed draft route for `projects` and `services`.
- **Inputs/Files:** `collections/Projects.ts`, `collections/Services.ts` (admin config additions).
- **Instructions:** N/A
- **RTL/LTR:** Preview respects the editor's selected locale. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Matches §25. · **Security:** N/A · **Performance:** N/A
- **Tests:** Manual check: editing a draft project shows the live-preview panel updating.
- **Acceptance criteria:** Live preview functional for both collections.
- **DoD evidence:** Screenshot of the live-preview panel; Reviewer: Technical Lead; Approval: Pending.

#### P04-T024 — Secure `/admin` route and session hardening
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T003, P04-T004
- **Source:** TECHNICAL-ARCHITECTURE.md §21, §36
- **Objective:** Confirm Payload's default auth/session cookie settings are hardened appropriately for production (secure/httpOnly cookies, reasonable session expiry) and document the 🟡-recommended IP-allowlisting option (TECHNICAL-ARCHITECTURE.md §21) for Phase 10's Caddy config to optionally apply.
- **Inputs/Files:** `payload.config.ts` (auth/session settings).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** Security smoke test confirming session cookies carry `Secure`/`HttpOnly` flags in a production-mode build.
- **Acceptance criteria:** Cookie flags confirmed; IP-allowlist option documented for Phase 10.
- **DoD evidence:** Test output + cookie inspection; Reviewer: Technical Lead; Approval: Pending.

#### P04-T025 — Seed explicitly-labeled non-public test fixtures
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T006, P04-T007, P04-T008, P04-T013, P04-T014, P04-T015, P04-T016, P04-T017
- **Source:** PRODUCT.md §25; this plan's governing brief §19
- **Objective:** Seed script populating every collection/global with content clearly marked as test fixtures (e.g., a `services` seed uses the three real locked names since those are genuine content, but any `projects` seed fixture is explicitly tagged `conceptualOnly: true` and named obviously, e.g. "Fixture Demo Project — Not For Publication") so Phases 05–08 have realistic data to build against without any risk of a fixture being mistaken for real client work.
- **Inputs/Files:** `scripts/seed.ts`.
- **Instructions:** Never seed a fixture that could pass as a real client project without its `conceptualOnly`/classification flags making that obvious.
- **RTL/LTR:** Seed content provided in both locales, independently written (not machine-translated), per the standing bilingual-content rule. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Populates every collection/global built in this phase. · **Security:** No real secrets/PII in seed data. · **Performance:** N/A
- **Tests:** Running the seed script twice is idempotent (doesn't duplicate records).
- **Acceptance criteria:** Phases 05–08 can develop against this seed without any fabricated-content risk.
- **DoD evidence:** Seed script run output; Reviewer: Technical Lead; Approval: Pending.

**Phase 04 exit:** all 25 tasks `DONE`; schemas match CMS-SCHEMAS.md field-for-field (spot-checked per task above); publishing-rule hooks proven by test; `leads` confirmed never public; technical-lead sign-off recorded.

---

## PHASE 05 — Complete Homepage

Goal/exit criteria: PLAN.md §20 Phase 05. All tasks depend on P03-T018 and Phase 04 completion.

#### P05-T001 — Build the homepage route shell
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T013
- **Source:** TECHNICAL-ARCHITECTURE.md §9; PAGE-BLUEPRINTS.md §6
- **Objective:** `app/[locale]/(marketing)/page.tsx` composing Header/Footer (Phase 02) and eight section slots, with `generateMetadata()` reading `homepage.seo` (falling back to `seo-defaults`).
- **Inputs/Files:** `app/[locale]/(marketing)/page.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Shell renders both locales via the existing layout. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Reads `homepage` global via Payload Local API. · **Security:** N/A · **Performance:** N/A
- **Tests:** Route renders 200 for `/en` and `/ar`.
- **Acceptance criteria:** Shell composes without error against live (seeded) CMS data.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T002 — Wire HOME-01 to live CMS content (replace prototype fixtures)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P03-T002, P03-T003, P03-T004, P03-T005, P03-T006
- **Source:** PAGE-BLUEPRINTS.md §6.1; CMS-SCHEMAS.md §11
- **Objective:** Replace the Phase 03 fixture data feeding `Hero.tsx` with the real `homepage.hero` field group (`headline`, `subheadline`, `primaryCtaLabel/Href`, `secondaryCtaLabel/Href`, `sculptureAsset`, `sculptureFallback`, `heroAccessibilityDescription`) via Payload's Local API.
- **Inputs/Files:** `components/sections/home/Hero.tsx` (data-source swap), `lib/payload/queries/homepage.ts`.
- **Instructions:** The 3D sculpture/grounding/AR-recomposition logic built in Phase 03 is reused as-is — only the data source changes.
- **RTL/LTR:** Re-verified against real seeded content, both locales. · **Responsive:** Re-verified. · **Motion:** Unchanged from Phase 03. · **CMS:** This task is the CMS wiring itself. · **Security:** N/A · **Performance:** `fetchpriority="high"` retained on the hero asset.
- **Tests:** E2E test asserting the rendered headline text matches the seeded `homepage.hero.headline` value exactly.
- **Acceptance criteria:** Zero hard-coded fixture strings remain in `Hero.tsx`.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T003 — Wire HOME-02 to live CMS content + honest empty state
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P03-T007
- **Source:** PAGE-BLUEPRINTS.md §6.2; PRODUCT.md §17.2
- **Objective:** Replace Phase 03's fixture cards with `homepage.selectedWork.featuredProjects` relationship data; if empty, render the exact honest empty-state message ("Selected work is in progress...") linking to `/process`, never a fabricated placeholder grid.
- **Inputs/Files:** `components/sections/home/SelectedWork.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales, both the populated and empty states. · **Responsive:** Re-verified. · **Motion:** Unchanged. · **CMS:** `featuredProjects[]` query. · **Security:** N/A · **Performance:** N/A
- **Tests:** Two E2E tests — one against a seed with featured projects, one against a seed with none, asserting the correct state renders.
- **Acceptance criteria:** Both states tested and correct.
- **DoD evidence:** Test output for both states; Reviewer: Technical Lead; Approval: Pending.

#### P05-T004 — Wire HOME-03 to live CMS content (`services` collection)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P03-T008
- **Source:** PAGE-BLUEPRINTS.md §6.3
- **Objective:** Replace Phase 03's hard-coded service names with a live query against the `services` collection (ordered by `pillarNumber`), gracefully rendering 2-of-3 rows if one service is unpublished.
- **Inputs/Files:** `components/sections/home/WhatWeCreate.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** Re-verified. · **Motion:** Unchanged. · **CMS:** `services` collection query. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test with one service unpublished, asserting 2 rows render, not a broken 3rd slot.
- **Acceptance criteria:** Graceful 2-of-3 rendering confirmed.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T005 — Wire HOME-04 to live CMS content
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P03-T009, P03-T010
- **Source:** PAGE-BLUEPRINTS.md §6.4
- **Objective:** Replace Phase 03's fixture stage content with `homepage.systemsInMotion` (`sectionHeadline`, `sectionDescription`, `stages[]` exactly 3, `fallbackMedia`).
- **Inputs/Files:** `components/sections/home/SystemsInMotion.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales; particle motion still confirmed not mirrored. · **Responsive:** Re-verified incl. the dark-background mobile fallback. · **Motion:** Unchanged from Phase 03. · **CMS:** `homepage.systemsInMotion` query. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test asserting all 3 stage names render as real DOM text (screen-reader equivalence re-confirmed against live data).
- **Acceptance criteria:** Matches CMS-SCHEMAS.md §11's exactly-3 constraint.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T006 — Build HOME-05 Engineering Behind the Experience
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001
- **Source:** PAGE-BLUEPRINTS.md §6.5; DESIGN.md §15, §27 row 05
- **Objective:** New section (not in the Phase 03 prototype) — background-weight light-blueprint diagram + 1–7 `engineeringPrinciples[]` list items on `color.bg.section.tinted`, wired to `homepage.engineeringBehind`.
- **Inputs/Files:** `components/sections/home/EngineeringBehind.tsx`, `components/ui/ArchitectureDiagram.tsx` (background-weight variant).
- **Instructions:** CTA destination defaults to `/contact` per the resolved SPECIFICATION GAP in PAGE-BLUEPRINTS.md §6.5.
- **RTL/LTR:** Diagram flow mirrors reading direction (the one visual system where flow *does* mirror). · **Responsive:** Stacked, simplified diagram on mobile. · **Motion:** Scroll-reveal only, no idle loop. · **CMS:** `homepage.engineeringBehind` query. · **Security:** No fabricated certification claims (PRODUCT.md §26 — manually verified against the actual seeded copy). · **Performance:** SVG-based, no WebGL.
- **Tests:** Content-honesty check: no certification/compliance claim present in rendered output.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §6.5 field-for-field; Gate 4 passes for this new section.
- **DoD evidence:** Screenshot + content-honesty check record; Reviewer: Technical Lead; Approval: Pending.

#### P05-T007 — Build HOME-06 From Vision to Reality (summary timeline)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P04-T014
- **Source:** PAGE-BLUEPRINTS.md §6.6; DESIGN.md §15
- **Objective:** Horizontal/vertical six-stage timeline summarizing `process-page.steps[]` (title/description subset, not the full `deliverables[]` — that's Phase 06's `/process` page).
- **Inputs/Files:** `components/sections/home/VisionToReality.tsx`, `components/ui/ProcessTimeline.tsx` (shared with Phase 06).
- **Instructions:** Include the "see full process" link-through per the resolved SPECIFICATION GAP in PAGE-BLUEPRINTS.md §6.6.
- **RTL/LTR:** Progress-fill direction mirrors reading direction. · **Responsive:** Vertical on mobile. · **Motion:** Direction-aware progressive reveal, reduced-motion static. · **CMS:** `process-page.steps[]` reference query. · **Security:** N/A · **Performance:** SVG-based.
- **Tests:** Content test confirming the six stage names match PRODUCT.md §17.6 exactly, no invented seventh stage.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §6.6; Gate 4 passes.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P05-T008 — Build HOME-07 Rakmyat Philosophy
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001
- **Source:** PAGE-BLUEPRINTS.md §6.7; PRODUCT.md §17.7
- **Objective:** Single-column manifesto on `color.bg.page`, wired to `homepage.philosophy`, subtle line-based reveal (never character-by-character for Arabic).
- **Inputs/Files:** `components/sections/home/Philosophy.tsx`.
- **Instructions:** Use `type.en.h1`/`type.ar.h1` for the manifesto body per the resolved SPECIFICATION GAP in PAGE-BLUEPRINTS.md §6.7.
- **RTL/LTR:** Standard RTL paragraph flow. · **Responsive:** Reduced type scale at smaller breakpoints. · **Motion:** Line-based reveal only. · **CMS:** `homepage.philosophy` query. · **Security:** N/A · **Performance:** Zero JS beyond the line-reveal.
- **Tests:** Content-length test: manifesto body ≤80 words per language.
- **Acceptance criteria:** Word-count check passes; Arabic text confirmed never animated character-by-character.
- **DoD evidence:** Word-count test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T009 — Build HOME-08 Final Conversion (on-dark inverted CTA)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001
- **Source:** PAGE-BLUEPRINTS.md §6.8; DESIGN.md §27 row 08
- **Objective:** `color.bg.section.dark` CTA band (the second of exactly two deliberate dark sections) wired to `homepage.finalConversion`, with the Primary Button's **inverted** treatment (white fill, `cobalt.deep` text) — not the standard cobalt-fill/white-text button.
- **Inputs/Files:** `components/sections/home/FinalConversion.tsx`, `components/ui/PrimaryButton.tsx` (new `onDark` variant prop).
- **Instructions:** `nextStepNote` copy never states an invented response time (PRODUCT.md §17.8 hard rule) — verified against the actual seeded copy, not just the schema's capability to allow honest copy.
- **RTL/LTR:** Standard logical layout. · **Responsive:** Stacked full-width on mobile, primary CTA on top. · **Motion:** Subtle entrance only, "no complex animation." · **CMS:** `homepage.finalConversion` query. · **Security:** N/A · **Performance:** N/A
- **Tests:** Content-honesty check on `nextStepNote`; contrast test confirming the inverted button meets AA against `bg.section.dark`.
- **Acceptance criteria:** Deep-cobalt-section-count check (exactly 2 total on the homepage, this + HOME-04) passes.
- **DoD evidence:** Screenshot + contrast test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T010 — Remove all prototype-only fixture code from HOME-01–04
- **Status:** TODO · **Priority:** P1 · **Depends on:** P05-T002, P05-T005
- **Source:** PLAN.md §20 Phase 05 scope
- **Objective:** Delete the `fixtures/prototype/*.ts` imports and any prototype-route-specific branching left in the HOME-01–04 components after T002–T005's CMS wiring.
- **Inputs/Files:** `components/sections/home/Hero.tsx`, `SelectedWork.tsx`, `WhatWeCreate.tsx`, `SystemsInMotion.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Grep/lint check confirming no import from `fixtures/prototype/` remains in these four files.
- **Acceptance criteria:** Zero prototype-fixture imports remain.
- **DoD evidence:** Grep output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T011 — Implement homepage SEO
- **Status:** TODO · **Priority:** P1 · **Depends on:** P05-T001 through P05-T009
- **Source:** TECHNICAL-ARCHITECTURE.md §22; PRODUCT.md §27–§28
- **Objective:** `generateMetadata()` reading `homepage.seo`; `hreflang` alternates (`ar-EG`/`en`/`x-default`→en); `Organization` structured data from `seo-defaults`.
- **Inputs/Files:** `app/[locale]/(marketing)/page.tsx` metadata export.
- **Instructions:** No `Review`/`AggregateRating` schema (PRODUCT.md §28's explicit prohibition).
- **RTL/LTR:** Both locale variants emit correct `hreflang`. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Reads `seo-defaults`/`homepage.seo`. · **Security:** N/A · **Performance:** N/A
- **Tests:** Metadata snapshot test for both locales.
- **Acceptance criteria:** Valid `hreflang` triple present on both locale versions.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T012 — Wire analytics events for all homepage CTAs
- **Status:** TODO · **Priority:** P1 · **Depends on:** P05-T001 through P05-T009, P02-T019
- **Source:** PRODUCT.md §29
- **Objective:** `hero_cta_primary_click`/`hero_cta_secondary_click` on HOME-01; `work_card_click` (tagged classification) on HOME-02; final-CTA events on HOME-08 per the recommended extension in PAGE-BLUEPRINTS.md §30/§27.
- **Inputs/Files:** Event-dispatch calls added to the relevant section components, using `lib/analytics/track.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** No PII in event properties. · **Performance:** N/A
- **Tests:** Unit test asserting `track()` is called with the correct event name on each CTA click (mocked).
- **Acceptance criteria:** Every PRODUCT.md §29 homepage-relevant event fires correctly.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P05-T013 — RTL/LTR + responsive verification for HOME-05/06/07
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T006, P05-T007, P05-T008
- **Source:** DESIGN.md §38–§39; PAGE-BLUEPRINTS.md §31.1
- **Objective:** Full RTL/LTR QA checklist run against the three sections not covered by the Phase 03 prototype, at all required breakpoints.
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** This task is the check itself. · **Responsive:** This task is the check itself. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The DESIGN.md §38/§39 checklists.
- **Acceptance criteria:** Zero failed rows.
- **DoD evidence:** Completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P05-T014 — Execute Gate 4 (Section Completeness) for all eight homepage sections
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T002 through P05-T009, P05-T013
- **Source:** VISUAL-QUALITY-GATES.md §4
- **Objective:** Run the full Section Completeness checklist against HOME-01 through HOME-08 as now rendered against live CMS content (not fixtures).
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** Both directions, all eight sections. · **Responsive:** All three viewports, all eight sections. · **Motion:** Static-state re-confirmed for all eight. · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist, eight times.
- **Acceptance criteria:** All eight sections pass.
- **DoD evidence:** Eight completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P05-T015 — Playwright journey test: full homepage scroll-through
- **Status:** TODO · **Priority:** P1 · **Depends on:** P05-T014
- **Source:** PRODUCT.md §19.1; TECHNICAL-ARCHITECTURE.md §26
- **Objective:** One E2E journey test per locale: land on `/`, verify negotiation, scroll through all eight sections, click the hero primary CTA, confirm navigation to `/contact`.
- **Inputs/Files:** `e2e/homepage-journey.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Run once per locale. · **Responsive:** Run at 1440px and 390px. · **Motion:** N/A · **CMS:** Against the seeded Phase 04 fixtures. · **Security:** N/A · **Performance:** N/A
- **Tests:** The journey test itself.
- **Acceptance criteria:** Passes in both locales, both viewports.
- **DoD evidence:** Playwright report; Reviewer: Technical Lead; Approval: Pending.

**Phase 05 exit:** all 15 tasks `DONE`; all eight homepage sections pass Gate 4 against live CMS content; zero prototype-fixture code remains; homepage SEO present; technical-lead sign-off recorded.

---

## PHASE 06 — Services, About & Process

Goal/exit criteria: PLAN.md §20 Phase 06. All tasks depend on P03-T018 and Phase 04 completion; may run parallel to Phase 05/07/08 per PLAN.md §23.

#### P06-T001 — Build `/services` archive route
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T007
- **Source:** PAGE-BLUEPRINTS.md §7; PRODUCT.md §18.1
- **Objective:** Four sections (hero, three-pillar editorial rows reusing `ServiceRow`, engineering-approach texture, CTA band), querying the `services` collection ordered by `pillarNumber`.
- **Inputs/Files:** `app/[locale]/(marketing)/services/page.tsx`.
- **Instructions:** No three-card grid (DESIGN.md §36).
- **RTL/LTR:** Both locales. · **Responsive:** Full breakpoint matrix. · **Motion:** Scroll-reveal only. · **CMS:** `services` collection query. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test asserting all three published services render as rows linking to their detail pages.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §7.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T002 — Build the shared service-detail template
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T001, P02-T005, P02-T006, P02-T015
- **Source:** PAGE-BLUEPRINTS.md §8
- **Objective:** `app/[locale]/(marketing)/services/[slug]/page.tsx` — the seven-section shared template (hero, problems, deliverables, diagram, approach, related work, CTA) parameterized by the `services` record matching `[slug]`.
- **Inputs/Files:** `app/[locale]/(marketing)/services/[slug]/page.tsx`.
- **Instructions:** "Related Work" section hides entirely (not shown empty) when `relatedProjects` is empty (PRODUCT.md §18.2).
- **RTL/LTR:** Diagram flow mirrors reading direction; all other sections standard logical layout. · **Responsive:** Full matrix. · **Motion:** Diagram modules fade/settle staggered along flow direction. · **CMS:** `services` single-record query by slug. · **Security:** N/A · **Performance:** No WebGL on this template.
- **Tests:** E2E test for the related-work hide-when-empty behavior.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §8 field-for-field.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T003 — Wire Custom Software service content
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T002, P06-T006
- **Source:** PAGE-BLUEPRINTS.md §8; PRODUCT.md §8.1
- **Objective:** Seed/confirm the `services` record (`slug: custom-software`) carries its full PRODUCT.md §8.1-derived content (problems/deliverables matching the scope table) and renders correctly through T002's template.
- **Inputs/Files:** CMS content only — no new code beyond what T002 provides.
- **Instructions:** N/A
- **RTL/LTR:** Both locales' content independently authored. · **Responsive:** N/A (inherits T002). · **Motion:** N/A (inherits T002). · **CMS:** Content record. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test asserting the rendered page matches the seeded content.
- **Acceptance criteria:** Renders correctly at `/en/services/custom-software` and `/ar/services/custom-software`.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T004 — Wire Enterprise Solutions service content
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T002, P06-T006
- **Source:** PAGE-BLUEPRINTS.md §9; PRODUCT.md §8.2
- **Objective:** Same as T003, for `slug: enterprise-solutions`, with engagement-model copy reflecting PRODUCT.md §8.2's "discovery-led scoping → phased delivery" framing.
- **Inputs/Files:** CMS content only.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** Inherits T002. · **Motion:** Inherits T002. · **CMS:** Content record. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test.
- **Acceptance criteria:** Renders correctly at both locale routes; engagement-model copy verified against PRODUCT.md §8.2.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T005 — Wire AI Agents & Automation service content
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T002, P06-T006
- **Source:** PAGE-BLUEPRINTS.md §10; PRODUCT.md §8.3, §6 (ICP-5)
- **Objective:** Same as T003/T004, for `slug: ai-agents-automation`, with copy framed honestly per PRODUCT.md §26 (no unsupported automation claims) and the recommended scoped-pilot framing from §8.3.
- **Inputs/Files:** CMS content only.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** Inherits T002. · **Motion:** Inherits T002. · **CMS:** Content record. · **Security:** N/A · **Performance:** N/A
- **Tests:** Content-honesty check: no unsupported AI-capability claim present.
- **Acceptance criteria:** Renders correctly; honesty check passes.
- **DoD evidence:** Test output + honesty-check record; Reviewer: Technical Lead; Approval: Pending.

#### P06-T006 — Build the full interactive Digital Architecture diagram component
- **Status:** TODO · **Priority:** P0 · **Depends on:** P02-T001, P02-T003, P02-T004
- **Source:** DESIGN.md §15; TECHNICAL-ARCHITECTURE.md §35
- **Objective:** The light "blueprint" diagram (white/pale-blue modules, cobalt connection lines, direction-aware flow, keyboard-navigable modules) as a reusable component consumed by T002's template, content-swapped per service via the `architectureDiagram` field group.
- **Inputs/Files:** `components/ui/ArchitectureDiagramFull.tsx` (distinct from HOME-05's background-weight variant built in P05-T006).
- **Instructions:** Isometric 30°/30° projection, fixed; connection lines animate a traveling pulse, not an arrowhead.
- **RTL/LTR:** Flow direction mirrors — the one visual system where this is correct. · **Responsive:** Simplifies to vertical stacked flow <768px. · **Motion:** Scroll-triggered staggered module settle. · **CMS:** Reads `services.architectureDiagram`. · **Security:** N/A · **Performance:** SVG-based, no WebGL.
- **Tests:** Keyboard-navigation test (arrow keys move focus along the connection graph in reading-direction order).
- **Acceptance criteria:** Matches DESIGN.md §15 exactly.
- **DoD evidence:** Keyboard-nav test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T007 — Build `/about` route
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T014
- **Source:** PAGE-BLUEPRINTS.md §11
- **Objective:** Eight sections (hero, who-we-are, philosophy, beliefs, how-we-work, capabilities, team [conditional], CTA) wired to `about-page` global.
- **Inputs/Files:** `app/[locale]/(marketing)/about/page.tsx`.
- **Instructions:** Team section (07) renders nothing at all when `teamMembers` is empty — not a placeholder.
- **RTL/LTR:** Both locales. · **Responsive:** Full matrix. · **Motion:** Scroll-reveal only, no WebGL. · **CMS:** `about-page` global. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test confirming the team section is fully absent (not an empty container) when the field is empty.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §11; `brandStory` content flagged internally as still PENDING OWNER APPROVAL even though rendered.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T008 — Build `/process` route
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T014, P06-T006
- **Source:** PAGE-BLUEPRINTS.md §12
- **Objective:** Five sections (hero, full six-stage timeline with complete `deliverables[]`, quality principles, CTA) wired to `process-page` global, reusing the `ProcessTimeline` component shared with HOME-06.
- **Inputs/Files:** `app/[locale]/(marketing)/process/page.tsx`.
- **Instructions:** Six stage names/descriptions must match PRODUCT.md §17.6 exactly, no invented seventh stage.
- **RTL/LTR:** Progress-fill direction mirrors. · **Responsive:** Vertical timeline on mobile. · **Motion:** Direction-aware reveal, reduced-motion static. · **CMS:** `process-page` global, full field set (not the HOME-06 summary subset). · **Security:** N/A · **Performance:** N/A
- **Tests:** Content test confirming all six stages + their full deliverable lists render.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §12.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T009 — Bilingual content wiring verification across all six routes
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T003, P06-T004, P06-T005, P06-T007, P06-T008
- **Source:** PRODUCT.md §12; this plan §9
- **Objective:** Confirm every localized field across the services archive, three service details, about, and process pages carries independently-authored Arabic content (not a translation pass stand-in) — a manual editorial review, not a code check.
- **Inputs/Files:** None created — recorded as completion evidence.
- **Instructions:** N/A
- **RTL/LTR:** This is the check itself. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Manual editorial review checklist.
- **Acceptance criteria:** Zero fields found to be machine-translated rather than natively written.
- **DoD evidence:** Review notes; Reviewer: Design reviewer (human) or content owner; Approval: Pending.

#### P06-T010 — SEO for services archive, three detail pages, about, process
- **Status:** TODO · **Priority:** P1 · **Depends on:** P06-T001 through P06-T008
- **Source:** TECHNICAL-ARCHITECTURE.md §22
- **Objective:** `generateMetadata()` + `hreflang` for all six routes, reading each record's `seo` field group with `seo-defaults` fallback.
- **Inputs/Files:** Metadata exports on each route file.
- **Instructions:** N/A
- **RTL/LTR:** hreflang triple per route. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Metadata snapshot tests.
- **Acceptance criteria:** All six routes emit valid metadata.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P06-T011 — RTL/LTR + responsive verification across all six routes
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T009
- **Source:** DESIGN.md §38–§39
- **Objective:** Full QA checklist per route.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** This is the check. · **Responsive:** This is the check. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The checklists.
- **Acceptance criteria:** Zero failed rows across all six routes.
- **DoD evidence:** Completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P06-T012 — Execute Gate 4 + Playwright journey tests for Phase 06 routes
- **Status:** TODO · **Priority:** P0 · **Depends on:** P06-T010, P06-T011
- **Source:** VISUAL-QUALITY-GATES.md §4; PRODUCT.md §19
- **Objective:** Section Completeness gate for every section across the six routes, plus one Playwright journey test per route (both locales): services archive → one detail page → about → process.
- **Inputs/Files:** `e2e/services-journey.spec.ts`, `e2e/about-process-journey.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** 1440/390px minimum. · **Motion:** N/A · **CMS:** Against seeded content. · **Security:** N/A · **Performance:** N/A
- **Tests:** The journey tests themselves.
- **Acceptance criteria:** All sections pass Gate 4; all journey tests pass both locales.
- **DoD evidence:** Gate checklists + Playwright report; Reviewer: Technical Lead + Design reviewer; Approval: Pending.

**Phase 06 exit:** all 12 tasks `DONE`; six routes fully functional, bilingually verified, Gate 4-passed; technical-lead sign-off recorded.

---

## PHASE 07 — Portfolio & Case Studies

Goal/exit criteria: PLAN.md §20 Phase 07. All tasks depend on P03-T018 and Phase 04 completion; may run parallel to Phase 05/06/08.

#### P07-T001 — Build `/work` archive route (simple-list mode)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T008, P04-T009
- **Source:** PAGE-BLUEPRINTS.md §13; PRODUCT.md §18.3
- **Objective:** Four sections (hero, featured project, archive list, CTA), querying published `projects` ordered by `archiveOrder`, rendering as a simple list (no filter UI) at <6 published projects.
- **Inputs/Files:** `app/[locale]/(marketing)/work/page.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Classification badge at logical-start corner. · **Responsive:** Full matrix. · **Motion:** Scroll-reveal + hover scale. · **CMS:** `projects` collection query (`status: 'published'`). · **Security:** N/A · **Performance:** Native lazy-loading below the fold.
- **Tests:** E2E test asserting only published projects render.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §13.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T002 — Implement the ≥6-project filtering mode
- **Status:** TODO · **Priority:** P1 · **Depends on:** P07-T001
- **Source:** PAGE-BLUEPRINTS.md §13; Phase-02 prompt §24
- **Objective:** When ≥6 published projects exist, enable classification + service-pillar filtering via URL search params, filtered server-side (no client-side re-fetch of the full list).
- **Inputs/Files:** `app/[locale]/(marketing)/work/page.tsx` (search-param handling).
- **Instructions:** This is a hard conditional on project count, not an editorial choice.
- **RTL/LTR:** Filter controls follow logical layout. · **Responsive:** Full matrix. · **Motion:** N/A · **CMS:** Server-side filtered query. · **Security:** N/A · **Performance:** No client-side full-list fetch.
- **Tests:** Test asserting the filter UI is absent at 5 published projects and present at 6.
- **Acceptance criteria:** Threshold behavior verified at the exact boundary (5 vs. 6).
- **DoD evidence:** Test output at both boundary values; Reviewer: Technical Lead; Approval: Pending.

#### P07-T003 — Wire classification-badge rendering for all four values
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T001, P02-T015
- **Source:** DESIGN.md §29; PRODUCT.md §23.1
- **Objective:** Confirm the `ClassificationBadge` component (built in Phase 02) correctly renders all four classification values against live seeded `projects` data on the archive.
- **Inputs/Files:** Verification pass — no new component.
- **Instructions:** N/A
- **RTL/LTR:** Badge position re-verified against live data. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Reads `projects.classification`. · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual test with all four classification values seeded.
- **Acceptance criteria:** Four distinct badge treatments confirmed against live content.
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P07-T004 — Build `/work/[slug]` dynamic route shell
- **Status:** TODO · **Priority:** P0 · **Depends on:** P04-T008
- **Source:** PAGE-BLUEPRINTS.md §14
- **Objective:** `app/[locale]/(marketing)/work/[slug]/page.tsx` resolving the shared-slug `projects` record; unknown/unpublished slug → `notFound()` (404), never a silent redirect.
- **Inputs/Files:** `app/[locale]/(marketing)/work/[slug]/page.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales resolve the same record via the shared slug. · **Responsive:** N/A (content blocks in T005–T006 handle this). · **Motion:** N/A · **CMS:** Dynamic query by slug. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test: unknown slug returns HTTP 404.
- **Acceptance criteria:** 404 confirmed, not a redirect to `/work`.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T005 — Wire the always-present single-portfolio content blocks
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T004
- **Source:** PAGE-BLUEPRINTS.md §14 (blocks 01, 02, 03, 04, 06, 09, 11)
- **Objective:** Hero, overview, business challenge, solution, engineering decisions, related services, final CTA — rendered from `projects.heroMedia/summary/challenge/solution/engineeringDecisions/services`.
- **Inputs/Files:** `components/sections/work/ProjectHero.tsx`, `ProjectNarrative.tsx`, `EngineeringDecisions.tsx`, `RelatedServices.tsx`.
- **Instructions:** Split-section media/text order follows logical start/end, not hard-coded physical sides.
- **RTL/LTR:** Logical split-section order. · **Responsive:** Single-column on mobile. · **Motion:** Scroll-reveal per block. · **CMS:** Direct `projects` field reads. · **Security:** N/A · **Performance:** `next/image` responsive `srcset`.
- **Tests:** E2E test asserting all seven always-present blocks render.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §14.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T006 — Wire the conditional single-portfolio content blocks
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T005, P04-T009
- **Source:** PAGE-BLUEPRINTS.md §14 (blocks 05, 07, 08, 10)
- **Objective:** Product Showcase gallery, Technology Stack, Outcomes, Next Project — each individually omitting itself (not rendering empty) when its source field is empty.
- **Inputs/Files:** `components/sections/work/TechnologyStack.tsx`, `VerifiedOutcomes.tsx`, `NextProjectCard.tsx`.
- **Instructions:** `verifiedOutcomes` must never render without `outcomeEvidence` populated — this is enforced at the CMS layer (P04-T009) but re-verified here at the render layer as a defense-in-depth check.
- **RTL/LTR:** Logical layout. · **Responsive:** Single-column on mobile. · **Motion:** Scroll-reveal. · **CMS:** Conditional field reads. · **Security:** Re-verifies the P04-T009 publishing-rule invariant holds at render time. · **Performance:** N/A
- **Tests:** Four E2E tests (one per conditional block), each confirming correct omission when the source field is empty.
- **Acceptance criteria:** All four conditional blocks correctly omit when empty.
- **DoD evidence:** Four test outputs; Reviewer: Technical Lead; Approval: Pending.

#### P07-T007 — Implement the flexible-blocks renderer
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T005, P04-T016
- **Source:** PAGE-BLUEPRINTS.md §14; CMS-SCHEMAS.md §18
- **Objective:** A `FlexibleBlocksRenderer` component mapping each of the 14 `blockType` values to its corresponding React component, rejecting (logging, not crashing) any unregistered block type.
- **Inputs/Files:** `components/sections/work/FlexibleBlocksRenderer.tsx`, `components/blocks/*.tsx` (14 components).
- **Instructions:** No custom CSS/JS injection path anywhere in this renderer, per the standing controlled-registry rule.
- **RTL/LTR:** Each block component handles its own localized fields. · **Responsive:** Each block responsive per its own spec. · **Motion:** Scroll-reveal per block. · **CMS:** Renders `projects.flexibleBlocks[]`. · **Security:** Closed registry — no arbitrary styling/script surface. · **Performance:** N/A
- **Tests:** Test rendering all 14 block types from a seeded fixture project.
- **Acceptance criteria:** All 14 render correctly; an unregistered 15th type is handled gracefully (not a crash).
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T008 — Wire Embla for the Image Gallery block
- **Status:** TODO · **Priority:** P1 · **Depends on:** P07-T007
- **Source:** PAGE-BLUEPRINTS.md §14; TECHNICAL-ARCHITECTURE.md §10
- **Objective:** `embla-carousel-react` wired specifically to the `imageGallery` block type — Embla is not loaded anywhere else in the application (genuine galleries only, per the locked constraint).
- **Inputs/Files:** `components/blocks/ImageGalleryBlock.tsx`.
- **Instructions:** N/A
- **RTL/LTR:** Gallery navigation respects reading direction. · **Responsive:** Touch-swipe on mobile. · **Motion:** Embla's own transition. · **CMS:** Reads the block's `images[]`. · **Security:** N/A · **Performance:** Embla code-split, only loaded when a project actually has an `imageGallery` block.
- **Tests:** Bundle-analysis test confirming Embla is absent from the bundle of a project page with no gallery block.
- **Acceptance criteria:** Code-splitting confirmed.
- **DoD evidence:** Bundle-analyzer output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T009 — End-to-end verification: real-client disclosure gate
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T004, P07-T005, P04-T009
- **Source:** CMS-SCHEMAS.md §5, §24; PRODUCT.md §23.1
- **Objective:** Prove, through the actual rendered UI (not just the CMS-layer unit test from P04-T009), that a `real-client`-classified project without `clientDisclosureApproved` cannot display its `clientDisplayName` anywhere on its rendered page.
- **Inputs/Files:** Test fixture + E2E test.
- **Instructions:** This is a UI-layer re-verification of a CMS-layer control — defense in depth, not redundant.
- **RTL/LTR:** Verified both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** E2E test asserting the client name string never appears in the rendered DOM for an unapproved record.
- **Acceptance criteria:** Zero leakage confirmed.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T010 — End-to-end verification: unpublished/unknown slug 404 behavior
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T004
- **Source:** PAGE-BLUEPRINTS.md §14; CMS-SCHEMAS.md §24
- **Objective:** Confirm an unpublished project's slug 404s for a public visitor even if the record exists in draft.
- **Inputs/Files:** E2E test.
- **Instructions:** N/A
- **RTL/LTR:** Verified both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** Confirms draft content is never publicly reachable by slug-guessing. · **Performance:** N/A
- **Tests:** The E2E test itself.
- **Acceptance criteria:** 404 confirmed for a seeded draft record's slug.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T011 — Verify the honest empty state when zero published projects exist
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T001
- **Source:** PRODUCT.md §23/§17.2; PAGE-BLUEPRINTS.md §13
- **Objective:** Confirm `/work` renders the honest empty-state message (not a fabricated grid) when the `projects` collection has zero published records.
- **Inputs/Files:** E2E test with an empty-projects seed variant.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The E2E test itself.
- **Acceptance criteria:** Correct empty state renders; zero fabricated project cards appear.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T012 — Author one labeled Concept/Demo project (content-risk mitigation)
- **Status:** TODO · **Priority:** P2 · **Depends on:** P04-T025
- **Source:** PRODUCT.md §25, §34 (content dependency, not a code blocker per PLAN.md §26)
- **Objective:** If no real/owner-approved project exists by this point, build one genuine, functioning internal demo (e.g., a small working AI document-processing demo or sample dashboard) and publish it classified `concept-demo`, clearly labeled, so `/work` doesn't ship empty — explicitly optional and does not block any other Phase 07 task.
- **Inputs/Files:** A real built demo artifact + its `projects` CMS record.
- **Instructions:** Must be a real, functioning build — not a mockup screenshot presented as interactive (PRODUCT.md §25's explicit rule).
- **RTL/LTR:** Demo content written natively in both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** `projects` record, `classification: concept-demo`, `conceptualOnly: true`. · **Security:** N/A · **Performance:** N/A
- **Tests:** Manual review confirming the demo is genuinely functional, not a static mockup.
- **Acceptance criteria:** If built, it passes the same classification-badge/disclosure rules as any other project.
- **DoD evidence:** Demo walkthrough recording/screenshot; Reviewer: Technical Lead; Approval: Pending (optional task — may remain `TODO` indefinitely without blocking Phase 07's exit if PRODUCT.md §34's project gap is otherwise accepted by the owner as an interim launch state).

#### P07-T013 — Portfolio SEO
- **Status:** TODO · **Priority:** P1 · **Depends on:** P07-T001, P07-T004
- **Source:** TECHNICAL-ARCHITECTURE.md §22; PRODUCT.md §28
- **Objective:** `generateMetadata()` for the archive and per-project pages; **no `Article` structured data** on case studies (PRODUCT.md §28 reserves that for future `/insights` content, not case studies).
- **Inputs/Files:** Metadata exports on both route files.
- **Instructions:** N/A
- **RTL/LTR:** hreflang per route. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Reads per-project `seo` group. · **Security:** N/A · **Performance:** N/A
- **Tests:** Metadata snapshot tests.
- **Acceptance criteria:** Valid metadata; no `Article` schema present.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P07-T014 — RTL/LTR + responsive verification
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T002, P07-T005, P07-T006, P07-T007
- **Source:** DESIGN.md §38–§39
- **Objective:** Full QA checklist for both routes.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** This is the check. · **Responsive:** This is the check. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The checklists.
- **Acceptance criteria:** Zero failed rows.
- **DoD evidence:** Completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P07-T015 — Execute Gate 4 for archive + single-portfolio sections
- **Status:** TODO · **Priority:** P0 · **Depends on:** P07-T014
- **Source:** VISUAL-QUALITY-GATES.md §4
- **Objective:** Section Completeness gate for all 4 archive sections + all 11 single-portfolio content blocks.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** Both directions. · **Responsive:** All viewports. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist, 15 times.
- **Acceptance criteria:** All sections pass.
- **DoD evidence:** Completed checklists; Reviewer: Design reviewer (human); Approval: Pending.

#### P07-T016 — Playwright + integration test suite for Phase 07
- **Status:** TODO · **Priority:** P1 · **Depends on:** P07-T009, P07-T010, P07-T011, P07-T015
- **Source:** TECHNICAL-ARCHITECTURE.md §26
- **Objective:** Consolidate T002/T009/T010/T011's individual tests into the Phase 07 regression suite entry, run as a unit.
- **Inputs/Files:** `e2e/portfolio-suite.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The suite itself.
- **Acceptance criteria:** Full suite green.
- **DoD evidence:** Playwright report; Reviewer: Technical Lead; Approval: Pending.

**Phase 07 exit:** all 16 mandatory tasks `DONE` (T012 may remain open per its own note without blocking exit, subject to owner acceptance); zero fabricated client/project/outcome content anywhere in the rendered output; technical-lead sign-off plus the explicit content-honesty check from PLAN.md §20 Phase 07.

---

## PHASE 08 — Contact & Lead Management

Goal/exit criteria: PLAN.md §20 Phase 08. All tasks depend on P03-T018 and Phase 04 completion; may run parallel to Phase 05/06/07.

#### P08-T001 — Build `/contact` route shell
- **Status:** TODO · **Priority:** P0 · **Depends on:** P03-T018, P04-T015
- **Source:** PAGE-BLUEPRINTS.md §15; PRODUCT.md §18.7
- **Objective:** Four sections (hero, form, contact methods [conditional], what-happens-next) on `color.bg.page`, wired to `contact-settings` global for copy/labels.
- **Inputs/Files:** `app/[locale]/(marketing)/contact/page.tsx`.
- **Instructions:** This is the "quietest page on the site" — no decorative visual system.
- **RTL/LTR:** Both locales. · **Responsive:** Full-width fields at every breakpoint, no multi-column form. · **Motion:** Minimal — field focus states only. · **CMS:** `contact-settings` global. · **Security:** N/A · **Performance:** N/A
- **Tests:** Route renders 200 both locales.
- **Acceptance criteria:** Matches PAGE-BLUEPRINTS.md §15's density-class expectations (Structured-minimal for the form, Quiet elsewhere).
- **DoD evidence:** Screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P08-T002 — Implement the contact form UI (React Hook Form)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T001, P02-T011
- **Source:** PRODUCT.md §21; CMS-SCHEMAS.md §10
- **Objective:** All seven fields (`fullName`, `workEmail`, `companyName`, `projectType`, `projectDescription`, `budgetRange` [optional, hidden gracefully while `budgetRangeOptions` is empty], `timeline`), built on the Phase 02 `FormField` components.
- **Inputs/Files:** `components/sections/contact/ContactForm.tsx`.
- **Instructions:** Label-above-field throughout; no placeholder-as-label.
- **RTL/LTR:** Arabic labels; email/phone-adjacent fields forced `dir="ltr"` internally. · **Responsive:** Full-width fields. · **Motion:** Standard focus/validation transitions only. · **CMS:** Field labels/options from `contact-settings`. · **Security:** Client-side validation is UX only, never trusted (T003/T004 provide the real boundary). · **Performance:** N/A
- **Tests:** Component test confirming `budgetRange` renders hidden/optional when `budgetRangeOptions` is empty.
- **Acceptance criteria:** Matches PRODUCT.md §21's field table exactly.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T003 — Implement the shared Zod validation schema
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T002
- **Source:** CMS-SCHEMAS.md §10, §23; PRODUCT.md §21
- **Objective:** `lib/validation/contactForm.ts` — one Zod schema imported by both the client form (via `@hookform/resolvers/zod`) and the Phase-08 Server Action, so client and server validation can never drift apart.
- **Inputs/Files:** `lib/validation/contactForm.ts`.
- **Instructions:** `projectDescription` minimum 20 characters; `workEmail` valid email pattern; required fields enforced per PRODUCT.md §21's table.
- **RTL/LTR:** Error messages localized (the schema returns message keys, not hard-coded English strings). · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This schema is the actual trust boundary once reused server-side in T004. · **Performance:** N/A
- **Tests:** Unit tests for every field's valid/invalid cases, both locales' error-key resolution.
- **Acceptance criteria:** 100% field coverage in the unit test suite.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T004 — Implement the Server Action: re-validation, rate limiting, honeypot
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §20–§21; PRODUCT.md §21
- **Objective:** A Server Action re-running T003's Zod schema server-side (never trusting the client payload), applying a token-bucket rate limit keyed by IP+form fingerprint, and checking an invisible honeypot field — all before any database write is attempted.
- **Inputs/Files:** `app/[locale]/(marketing)/contact/actions.ts`.
- **Instructions:** Origin-check protection relies on Next.js Server Actions' built-in same-origin enforcement — documented, not re-implemented.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** Rate-limit check adds negligible latency.
- **Tests:** Integration test: a bot-filled honeypot submission is silently rejected; a rate-limit-exceeding burst is rejected with the correct error.
- **Acceptance criteria:** Both rejection paths proven.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T005 — Wire the Server Action to `Leads` collection persistence
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T004, P04-T010
- **Source:** TECHNICAL-ARCHITECTURE.md §20; CMS-SCHEMAS.md §10
- **Objective:** On successful validation, write the lead via Payload's Local API to the `leads` collection, including `locale`, `discoveryCallRequested` (if applicable), and `sourcePage` system fields.
- **Inputs/Files:** `app/[locale]/(marketing)/contact/actions.ts` (persistence call).
- **Instructions:** The success response to the client is only returned after this write is confirmed — never optimistically before.
- **RTL/LTR:** `locale` field records which locale the submission came from. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Writes to `leads`. · **Security:** N/A · **Performance:** N/A
- **Tests:** Integration test: submit → read the `leads` collection → confirm the record exists with correct field values.
- **Acceptance criteria:** This is the single most important proof in Phase 08 — a real, persisted lead record, not a simulated success.
- **DoD evidence:** Test output showing the persisted record; Reviewer: Technical Lead; Approval: Pending.

#### P08-T006 — Implement the success state (scoped copy)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T005
- **Source:** PRODUCT.md §21 (hard rule); PAGE-BLUEPRINTS.md §15
- **Objective:** A persistent confirmation message (not an auto-dismissing toast) replacing the form on success, copy scoped to exactly what's guaranteed ("We received your project details and will follow up personally") — never implying delivery to an external inbox/CRM that isn't configured (PRODUCT.md §34 🔴).
- **Inputs/Files:** `components/sections/contact/ContactForm.tsx` (success branch).
- **Instructions:** N/A
- **RTL/LTR:** Both locales' copy independently written. · **Responsive:** N/A · **Motion:** N/A · **CMS:** Copy sourced from `contact-settings.whatHappensNextCopy`. · **Security:** N/A · **Performance:** N/A
- **Tests:** Content-honesty check: success copy contains no claim of external delivery.
- **Acceptance criteria:** Copy matches PRODUCT.md §21's constraint exactly.
- **DoD evidence:** Content-honesty check record; Reviewer: Technical Lead; Approval: Pending.

#### P08-T007 — Implement error states (inline + form-level, `aria-live`)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T003
- **Source:** DESIGN.md §18.14; PRODUCT.md §21
- **Objective:** Field-level inline errors (Phase 02's `ValidationMessage`) plus a form-level error summary on server/network failure, both announced via `aria-live="polite"`.
- **Inputs/Files:** `components/sections/contact/ContactForm.tsx` (error branches).
- **Instructions:** Form state is preserved on error (not cleared) so the visitor doesn't retype everything.
- **RTL/LTR:** Arabic error copy drafted natively. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Accessibility test confirming the `aria-live` region announces on a simulated server-side rejection.
- **Acceptance criteria:** Form data is retained after a failed submission (verified by test, not assumed).
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T008 — Implement Discovery Call fallback routing
- **Status:** TODO · **Priority:** P1 · **Depends on:** P08-T002
- **Source:** PRODUCT.md §22
- **Objective:** The "Book a Discovery Call" CTA (wherever it appears site-wide) routes to `/contact` with `projectType`/intent pre-flagged as a discovery request (`discoveryCallRequested: true` on submission) and displays `contact-settings.discoveryFallbackNotice` — never a fabricated calendar embed, since no booking tool exists yet (PRODUCT.md §34 🔴).
- **Inputs/Files:** `components/sections/contact/ContactForm.tsx` (query-param-driven pre-fill), CTA `href` updates site-wide.
- **Instructions:** N/A
- **RTL/LTR:** Notice copy localized. · **Responsive:** N/A · **Motion:** N/A · **CMS:** `discoveryFallbackNotice` field. · **Security:** N/A · **Performance:** N/A
- **Tests:** E2E test: click Discovery Call CTA from the homepage → land on `/contact` with the flag pre-set and the notice visible.
- **Acceptance criteria:** No calendar embed exists anywhere; fallback notice always shown for this entry path.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T009 — Build `/privacy` route
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T011
- **Source:** PAGE-BLUEPRINTS.md §16; PRODUCT.md §18.8
- **Objective:** Single-section legal-document page reading the `pages` collection's `privacy` record — remains unreachable/404 to the public while that record is in `draft` (no real legal text yet).
- **Inputs/Files:** `app/[locale]/(marketing)/privacy/page.tsx`.
- **Instructions:** Never populate with invented legal text to make the page "complete-looking."
- **RTL/LTR:** Readable paragraph flow both directions, correct max line-length per locale. · **Responsive:** N/A · **Motion:** None. · **CMS:** `pages` collection, `slug: privacy`. · **Security:** N/A · **Performance:** Trivial, static text.
- **Tests:** Test confirming the route 404s (or shows a "coming soon" equivalent, per owner preference — not invented here) while the record is in `draft`.
- **Acceptance criteria:** No fabricated legal text ships under any circumstance.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T010 — Contact and Privacy SEO
- **Status:** TODO · **Priority:** P2 · **Depends on:** P08-T001, P08-T009
- **Source:** TECHNICAL-ARCHITECTURE.md §22
- **Objective:** Metadata for both routes; `/contact` intentionally not optimized for broad organic traffic (low-funnel, high-intent page, per PRODUCT.md §26).
- **Inputs/Files:** Metadata exports.
- **Instructions:** N/A
- **RTL/LTR:** hreflang per route. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Metadata snapshot tests.
- **Acceptance criteria:** Valid metadata on both routes.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T011 — RTL/LTR + responsive verification (incl. LTR-isolated fields inside an RTL form)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T002, P08-T009
- **Source:** DESIGN.md §8, §18.12, §38–§39
- **Objective:** Full QA checklist, with specific attention to the Arabic contact form's forced-`dir="ltr"` email/phone-adjacent fields rendering correctly inside the overall RTL form layout.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** This is the check, with the specific mixed-direction sub-case called out. · **Responsive:** This is the check. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The checklists plus a specific visual check of the mixed-direction field.
- **Acceptance criteria:** Zero failed rows, including the mixed-direction sub-case.
- **DoD evidence:** Completed checklists + mixed-direction screenshot; Reviewer: Design reviewer (human); Approval: Pending.

#### P08-T012 — Execute Gate 4 (Structured-minimal density class)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T011
- **Source:** VISUAL-QUALITY-GATES.md §4; PAGE-BLUEPRINTS.md §31.1
- **Objective:** Section Completeness gate against Contact's correct density classification — the form itself is the composition, no added decoration expected; fail if anything was decoratively added that contradicts this.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** Both directions. · **Responsive:** All viewports. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The gate checklist.
- **Acceptance criteria:** Passes against the Structured-minimal bar specifically (not graded as if it were a Rich section).
- **DoD evidence:** Completed checklist; Reviewer: Design reviewer (human); Approval: Pending.

#### P08-T013 — Unit tests: Zod schema field coverage
- **Status:** TODO · **Priority:** P1 · **Depends on:** P08-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §26
- **Objective:** Consolidate T003's per-field unit tests into the Phase 08 suite entry (this task tracks the suite's existence as a discrete deliverable, not new test logic beyond T003's).
- **Inputs/Files:** `tests/validation/contactForm.test.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales' error-key resolution. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The suite itself.
- **Acceptance criteria:** 100% field coverage confirmed as a standing, run-in-CI suite.
- **DoD evidence:** Test run output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T014 — Integration test: lead persistence end-to-end
- **Status:** TODO · **Priority:** P0 · **Depends on:** P08-T005
- **Source:** TECHNICAL-ARCHITECTURE.md §20, §26
- **Objective:** Consolidate T005's persistence test into the standing Phase 08 integration suite.
- **Inputs/Files:** `tests/integration/leadPersistence.test.ts`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The suite itself.
- **Acceptance criteria:** Green in CI once CI exists (Phase 09).
- **DoD evidence:** Test run output; Reviewer: Technical Lead; Approval: Pending.

#### P08-T015 — Accessibility test: `aria-live` announcements and label-above-field
- **Status:** TODO · **Priority:** P1 · **Depends on:** P08-T007
- **Source:** DESIGN.md §32
- **Objective:** `@axe-core/playwright` scan of `/contact` plus a manual screen-reader spot check of the error-announcement flow.
- **Inputs/Files:** `e2e/contact-a11y.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The scan + the manual check.
- **Acceptance criteria:** Zero critical/serious axe violations; manual screen-reader check confirms the announcement actually fires audibly.
- **DoD evidence:** axe report + manual check notes; Reviewer: Technical Lead; Approval: Pending.

**Phase 08 exit:** all 15 tasks `DONE`; a real lead persists end-to-end (proven by test, not claimed); `/privacy` not publicly live without approved legal text; owner has explicitly decided whether to launch with the interim internal-only lead pipeline (PLAN.md §20 Phase 08's dual approval authority) or wait for external-delivery configuration.

---

## PHASE 09 — Security, SEO, Accessibility & Performance Hardening

Goal/exit criteria: PLAN.md §20 Phase 09. Depends on Phases 05–08 complete (every route must exist to be audited). This phase confirms what was already built — it does not build foundational security/SEO/a11y for the first time.

#### P09-T001 — Full CMS access-control review
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P06-T001, P07-T001, P08-T001, P04-T004
- **Source:** TECHNICAL-ARCHITECTURE.md §21; CMS-SCHEMAS.md §26
- **Objective:** Re-run the full P04-T004 role × collection × operation matrix end-to-end against the now-complete application, confirming nothing introduced in Phases 05–08 (e.g., a new API route) accidentally widened an access boundary.
- **Inputs/Files:** None created — audit pass.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** This is the audit itself. · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** The full re-run matrix.
- **Acceptance criteria:** Zero deviation from CMS-SCHEMAS.md §26 found.
- **DoD evidence:** Matrix output; Reviewer: Technical Lead; Approval: Pending.

#### P09-T002 — Upload-security validation review
- **Status:** TODO · **Priority:** P1 · **Depends on:** P04-T005
- **Source:** CMS-SCHEMAS.md §9; TECHNICAL-ARCHITECTURE.md §21
- **Objective:** Confirm MIME-type and size-limit enforcement on the `media` collection actually rejects a disallowed upload in the production-configured app (not just the Phase 04 dev-mode test).
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** Upload-rejection test against the staging build.
- **Acceptance criteria:** Rejection confirmed in staging, not just dev.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P09-T003 — Implement CSP and security headers
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T003
- **Source:** TECHNICAL-ARCHITECTURE.md §21
- **Objective:** Content-Security-Policy and standard security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, etc.) via `next.config.ts` `headers()` or Caddy response headers — exact values tuned against the actual asset origins in use (self-hosted fonts, no third-party script origins beyond the eventual analytics vendor).
- **Inputs/Files:** `next.config.ts` (headers block) or `Caddyfile` snippet (finalized in Phase 10).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** Header-presence test against a staging response.
- **Acceptance criteria:** All headers present with values that don't break the WebGL canvases or self-hosted fonts.
- **DoD evidence:** Header dump from a staging request; Reviewer: Technical Lead; Approval: Pending.

#### P09-T004 — Secrets and dependency vulnerability scan
- **Status:** TODO · **Priority:** P0 · **Depends on:** P01-T017
- **Source:** TECHNICAL-ARCHITECTURE.md §21
- **Objective:** Run `pnpm audit` (or equivalent) across the final dependency set; resolve or explicitly accept (with rationale) every high/critical finding.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** The scan itself.
- **Acceptance criteria:** No open high/critical finding without a recorded acceptance rationale.
- **DoD evidence:** Scan output + any acceptance notes; Reviewer: Technical Lead; Approval: Pending.

#### P09-T005 — Verify `hreflang`/sitemap/robots correctness across every route
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T011, P06-T010, P07-T013, P08-T010
- **Source:** TECHNICAL-ARCHITECTURE.md §22
- **Objective:** Crawl the staging deployment with a sitemap/hreflang validator tool, confirming every MVP route (PLAN.md §7) appears in `sitemap.xml` with both locale variants and a correct `hreflang`/`x-default` set, and that `robots.txt` allows both locale trees.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** This task's entire purpose. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Validator tool run.
- **Acceptance criteria:** Zero validator errors.
- **DoD evidence:** Validator report; Reviewer: Technical Lead; Approval: Pending.

#### P09-T006 — Verify structured data across routes
- **Status:** TODO · **Priority:** P1 · **Depends on:** P09-T005
- **Source:** TECHNICAL-ARCHITECTURE.md §22; PRODUCT.md §28
- **Objective:** Validate `Organization`/`BreadcrumbList` JSON-LD with Google's Rich Results Test (or equivalent), confirming no `Review`/`AggregateRating`/`Article` schema appears anywhere (the explicit prohibitions from PRODUCT.md §28).
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The validator run.
- **Acceptance criteria:** Valid schema present; prohibited schema types confirmed absent.
- **DoD evidence:** Validator report; Reviewer: Technical Lead; Approval: Pending.

#### P09-T007 — Full `@axe-core/playwright` sweep across every route, both locales
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P06-T001, P07-T001, P08-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §26; DESIGN.md §32
- **Objective:** Run the accessibility scan against every MVP route in both `/en` and `/ar`, at minimum the 1440/390px viewports.
- **Inputs/Files:** `e2e/a11y-full-sweep.spec.ts`.
- **Instructions:** N/A
- **RTL/LTR:** Both locales, every route. · **Responsive:** Both viewports. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The sweep itself.
- **Acceptance criteria:** Zero critical/serious violations across the full matrix.
- **DoD evidence:** Full axe report; Reviewer: Technical Lead; Approval: Pending.

#### P09-T008 — Manual accessibility review
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T007
- **Source:** DESIGN.md §32 (binding caveat: automated tools are insufficient alone)
- **Objective:** Human review of contrast-in-context (the automated check validates token pairs; this validates actual rendered compositions with overlapping surfaces), focus order sanity across every page, and a screen-reader spot-check of the hero/particle-system non-visual equivalents and the contact form's error flow.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** Both locales reviewed independently. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The manual review itself.
- **Acceptance criteria:** No finding beyond what T007 already caught, or findings resolved before this task closes.
- **DoD evidence:** Review notes; Reviewer: Design reviewer (human); Approval: Pending.

#### P09-T009 — Core Web Vitals measurement on real/throttled devices
- **Status:** TODO · **Priority:** P0 · **Depends on:** P05-T001, P06-T001, P07-T001, P08-T001
- **Source:** DESIGN.md §33; PRODUCT.md §31
- **Objective:** Measure LCP/CLS/INP against DESIGN.md §33's budgets on the staging deployment, using Lighthouse CI or equivalent under network/CPU throttling, for every MVP route, both locales.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** Both locales measured independently (Arabic font-loading path is a distinct performance case). · **Responsive:** Mobile throttled profile specifically. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** This task's entire purpose.
- **Tests:** The measurement run.
- **Acceptance criteria:** LCP ≤2.5s, CLS ≤0.1, INP ≤200ms at the 75th percentile, or an explicit owner-accepted re-scope recorded for any route that doesn't meet budget.
- **DoD evidence:** Lighthouse/field-data report; Reviewer: Technical Lead; Approval: Pending.

#### P09-T010 — 3D/particle performance tuning and low-power fallback verification
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T009, P03-T002, P03-T009
- **Source:** DESIGN.md §33; TECHNICAL-ARCHITECTURE.md §16
- **Objective:** Confirm the hero sculpture and particle system both degrade to their static fallbacks below a measured frame-budget threshold or under `prefers-reduced-motion`, on desktop-width viewports too (not just by the 768px breakpoint rule).
- **Inputs/Files:** `lib/three/shouldRenderCanvas()` tuning.
- **Instructions:** N/A
- **RTL/LTR:** Fallback verified both locales/compositions. · **Responsive:** Desktop-width low-power case specifically tested, not just mobile. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** This task's entire purpose.
- **Tests:** Simulated low-power/throttled-GPU test confirming fallback engages correctly.
- **Acceptance criteria:** Fallback confirmed functional on a simulated low-power desktop, not just assumed from the mobile-breakpoint logic.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P09-T011 — Mobile fallback verification across all WebGL-gated sections
- **Status:** TODO · **Priority:** P1 · **Depends on:** P09-T010
- **Source:** DESIGN.md §13, §14, §31
- **Objective:** Confirm the hero and particle-system mobile fallbacks render correctly at 320/360/390/430px, with the particle fallback specifically confirmed to stay on its dark background (not a light-background regression, per COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §5).
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** All four smallest breakpoints. · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Visual check at each breakpoint.
- **Acceptance criteria:** COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md §5's mobile row passes.
- **DoD evidence:** Screenshot set; Reviewer: Technical Lead; Approval: Pending.

#### P09-T012 — Finalize analytics-consent wiring
- **Status:** TODO · **Priority:** P2 · **Depends on:** P02-T019
- **Source:** TECHNICAL-ARCHITECTURE.md §23; PRODUCT.md §34
- **Objective:** If the analytics-platform decision (PRODUCT.md §34 🔴) has resolved by this point, wire the real vendor SDK behind `track()` with consent-gating; if not, confirm the no-op path remains safe for launch.
- **Inputs/Files:** `lib/analytics/track.ts` (vendor wiring, if applicable).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** Consent-gating before any tracking fires. · **Performance:** N/A
- **Tests:** Test confirming no tracking call fires before consent is granted (if a vendor is wired).
- **Acceptance criteria:** Either a working consent-gated vendor integration, or a confirmed-safe no-op state — never a half-wired vendor call firing without consent.
- **DoD evidence:** Test output; Reviewer: Technical Lead; Approval: Pending.

#### P09-T013 — Run the full cross-route/cross-locale/cross-breakpoint E2E regression suite
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T001 through P09-T012
- **Source:** TECHNICAL-ARCHITECTURE.md §26
- **Objective:** Consolidate every Playwright spec written across Phases 02–08 into one comprehensive regression run across every MVP route, both locales, and the three required breakpoints.
- **Inputs/Files:** CI pipeline config (if not already present) running the full `e2e/` directory.
- **Instructions:** N/A
- **RTL/LTR:** Full matrix. · **Responsive:** Full matrix. · **Motion:** Incl. reduced-motion variants. · **CMS:** Against the seeded Phase 04 fixtures. · **Security:** N/A · **Performance:** N/A
- **Tests:** The full suite run.
- **Acceptance criteria:** 100% green.
- **DoD evidence:** Full test report; Reviewer: Technical Lead; Approval: Pending.

#### P09-T014 — Execute Gate 6 (Full-Page Visual QA) per route, per locale
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T013
- **Source:** VISUAL-QUALITY-GATES.md §6
- **Objective:** Capture full-page + per-section + mobile + both-locale + post-settle + reduced-motion screenshots for every MVP route, run the automated detection suite (empty/unfinished sections, missing images, overflow, contrast) plus the mandatory human review (layout imbalance, whitespace intent, section transitions, visual hierarchy, styling consistency).
- **Inputs/Files:** `e2e/gate6-full-page-qa.spec.ts`.
- **Instructions:** A passing automated run is a precondition for requesting human sign-off, never a substitute for it (VISUAL-QUALITY-GATES.md §6's binding caveat).
- **RTL/LTR:** Every route, both locales, independently reviewed. · **Responsive:** Every route, all required viewports. · **Motion:** Pre/post-settle + reduced-motion, every route. · **CMS:** Against production-representative content (the real seed, or real content if available by this point). · **Security:** N/A · **Performance:** N/A
- **Tests:** The automated detection suite.
- **Acceptance criteria:** Automated suite green AND human reviewer sign-off recorded per route, per locale.
- **DoD evidence:** Full screenshot archive + automated report + human reviewer sign-off notes; Reviewer: Design reviewer (human); Approval: Pending.

#### P09-T015 — Compile and sign the security/performance/accessibility audit report
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T001 through P09-T014
- **Source:** PLAN.md §20 Phase 09
- **Objective:** A single compiled record (findings + fixes applied, not just findings) covering T001–T014's results, serving as this phase's exit deliverable — **not a new standalone Markdown planning file** (per the governing brief's "no extra files" rule, this is recorded as this task's completion evidence, e.g. as a dated note attached here or in the team's existing issue tracker, not a new project-root `.md` file).
- **Inputs/Files:** None created in the project root.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This is the compiled security record. · **Performance:** This is the compiled performance record.
- **Tests:** N/A (compilation task).
- **Acceptance criteria:** No open critical/high finding from T001–T014 without a recorded resolution or owner-accepted rationale.
- **DoD evidence:** The compiled report; Reviewer: Technical Lead; Approval: Pending (owner approval only required if a visual regression from the Phase 03/05 approved direction was found, per PLAN.md §20 Phase 09's approval-authority note).

**Phase 09 exit:** all 15 tasks `DONE`; no open critical/high security finding; Core Web Vitals met or explicitly re-scoped; Gate 6 passes on every route in both locales.

---

## PHASE 10 — Production Deployment & Launch

Goal/exit criteria: PLAN.md §20 Phase 10. Depends on Phase 09 complete and passed.

#### P10-T001 — Author the production Dockerfile
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T015
- **Source:** TECHNICAL-ARCHITECTURE.md §27
- **Objective:** Multi-stage production `Dockerfile` (build stage → slim runtime stage), non-root user, based on the Node image pinned in P01-T017 (re-verified against the 2026-10-28 Node 26 Active-LTS date if deployment happens after it).
- **Inputs/Files:** `Dockerfile` (production target).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** Non-root user; minimal base image. · **Performance:** Multi-stage build minimizes final image size.
- **Tests:** `docker build --target production` succeeds; container runs as non-root (verified via `whoami` inside the running container).
- **Acceptance criteria:** Production image builds and runs as non-root.
- **DoD evidence:** Build + runtime-user check output; Reviewer: Technical Lead; Approval: Pending.

#### P10-T002 — Author the production `docker-compose.yml`
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §27
- **Objective:** `app`/`db`/`caddy` services, `db` health-check-gated before `app` accepts traffic, no port published except Caddy's 80/443, `db` on an internal-only network.
- **Inputs/Files:** `docker-compose.prod.yml`.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** No DB port published; internal network isolation. · **Performance:** N/A
- **Tests:** `docker compose -f docker-compose.prod.yml up` brings up all three services correctly ordered.
- **Acceptance criteria:** `app` only starts accepting traffic after `db`'s health check passes.
- **DoD evidence:** Compose startup log showing correct ordering; Reviewer: Technical Lead; Approval: Pending.

#### P10-T003 — Author the Caddyfile (env-based domain, template now / binding pending)
- **Status:** TODO · **Priority:** P0 · **Depends on:** P09-T015
- **Source:** TECHNICAL-ARCHITECTURE.md §28; PRODUCT.md header metadata (🔴 domain decision)
- **Objective:** Author a `Caddyfile` template that reads its site domain from an environment variable (e.g. `{$SITE_DOMAIN}`), never a hardcoded `rakmyat.com`/`rakmyat.online` string — the canonical domain is **🔴 OWNER DECISION REQUIRED** (neither `rakmyat.com`, PRODUCT.md's original assumption, nor `rakmyat.online`, observed on recent social-media materials, is confirmed). Automatic HTTPS via ACME, reverse-proxy to `app`, security headers from P09-T003 applied at this layer.
- **Inputs/Files:** `Caddyfile` (template, env-var-driven), `.env.production.example` entry for `SITE_DOMAIN`.
- **Instructions:** This task's *template authoring* is not blocked by the domain decision (it can be fully written and tested against a staging/test subdomain using a placeholder `SITE_DOMAIN` value). **What genuinely is blocked:** the final production binding of a real ACME certificate to the confirmed canonical domain, and the `www`-vs-apex redirect preference (PLAN.md §26) — both require the owner's domain decision and must not be guessed. Do not implement a "sensible default" domain binding in production; a staging/test-domain validation satisfies this task's completion, production go-live binding is tracked separately in P10-T013/T014.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** TLS + headers. · **Performance:** N/A
- **Tests:** TLS certificate issuance succeeds on a staging/test subdomain using the env-var-driven template.
- **Acceptance criteria:** Template works end-to-end against a placeholder domain; zero hardcoded `rakmyat.com`/`rakmyat.online` string exists in the `Caddyfile`; the production domain binding is explicitly deferred to P10-T013, not silently assumed here.
- **DoD evidence:** Certificate + header-check output against the staging/test domain; Reviewer: Technical Lead; Approval: Pending.

#### P10-T004 — Configure production environment secrets
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T001
- **Source:** TECHNICAL-ARCHITECTURE.md §21
- **Objective:** Real `DATABASE_URI`, Payload secret, Sentry DSN, and (if resolved) analytics keys provisioned on the VPS via an untracked `.env`/Docker secrets mechanism — never committed, never logged.
- **Inputs/Files:** VPS-local `.env.production` (not in the repo).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** This task's entire purpose. · **Performance:** N/A
- **Tests:** App boots successfully reading these secrets.
- **Acceptance criteria:** No secret appears in `git log`, build output, or application logs.
- **DoD evidence:** `git log`/log-scan confirming absence; Reviewer: Technical Lead; Approval: Pending.

#### P10-T005 — Configure persistent database and media volumes in production
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T002
- **Source:** TECHNICAL-ARCHITECTURE.md §18–§19; CMS-SCHEMAS.md §27
- **Objective:** Named Docker volumes for Postgres data and uploaded media, confirmed to survive a container recreation in the production topology (re-verifying P04-T020's dev-environment check against the real production compose file).
- **Inputs/Files:** `docker-compose.prod.yml` volume definitions.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Recreate the `app`/`db` containers and confirm data/media persist.
- **Acceptance criteria:** Confirmed survival across container recreation in the actual production compose setup.
- **DoD evidence:** Before/after recreation test; Reviewer: Technical Lead; Approval: Pending.

#### P10-T006 — Implement scheduled backup jobs
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T005
- **Source:** TECHNICAL-ARCHITECTURE.md §29; PLAN.md §25
- **Objective:** A scheduled job (cron or equivalent) running `pg_dump` + a media-volume archive, shipped to the off-VPS destination resolved per PLAN.md §26 (🔴 if still unresolved at this point, this task is genuinely blocked — it is the one case in this entire register where a missing owner input is a real code/infra blocker, not just a content gap).
- **Inputs/Files:** Backup script + scheduler config (cron/systemd timer).
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** Backups encrypted at rest on the destination. · **Performance:** N/A
- **Tests:** A scheduled run actually executes and produces a dump + archive at the destination.
- **Acceptance criteria:** One successful automated backup observed.
- **DoD evidence:** Backup-destination listing showing the produced files; Reviewer: Technical Lead; Approval: Pending.

#### P10-T007 — Perform and time a full restore drill
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T006
- **Source:** TECHNICAL-ARCHITECTURE.md §29; PLAN.md §25, §27 (R7)
- **Objective:** Stand up a fresh `db` container, restore the latest `pg_dump`, restore the media archive, redeploy `app`/`caddy`, and run the Phase 09 smoke-test pass — all timed, so the actual recovery-time estimate is known, not assumed.
- **Inputs/Files:** None created — a procedural drill, documented in this task's completion evidence.
- **Instructions:** This drill must actually happen — a backup strategy never restored from is not a verified one (this plan's hard rule, PLAN.md §25).
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** The timing result itself is the deliverable.
- **Tests:** Post-restore smoke test (homepage + one service page + one case study + contact-form dry run).
- **Acceptance criteria:** Full restore completes successfully; smoke test passes post-restore; total time recorded.
- **DoD evidence:** Timed drill log + post-restore smoke-test output; Reviewer: Technical Lead; Approval: Pending.

#### P10-T008 — Configure health checks
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T002
- **Source:** TECHNICAL-ARCHITECTURE.md §27
- **Objective:** Health-check definitions for `app` (HTTP endpoint), `db` (Postgres readiness probe), and `caddy` (process/port check) in the production compose file.
- **Inputs/Files:** `docker-compose.prod.yml` health-check blocks.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** `docker compose ps` shows all three services healthy after startup.
- **Acceptance criteria:** All three report healthy.
- **DoD evidence:** `docker compose ps` output; Reviewer: Technical Lead; Approval: Pending.

#### P10-T009 — Wire Sentry production DSN and alerting
- **Status:** TODO · **Priority:** P1 · **Depends on:** P10-T004, P01-T016
- **Source:** TECHNICAL-ARCHITECTURE.md §31
- **Objective:** Real production DSN wired into the P01-T016 no-op-safe Sentry setup; confirm an intentionally-triggered test exception actually arrives in Sentry, tagged with locale/route.
- **Inputs/Files:** Production env var only — no code change beyond what P01-T016 already built.
- **Instructions:** N/A
- **RTL/LTR:** Error tagged with the locale it occurred on. · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** Triggered test exception appears in the Sentry dashboard.
- **Acceptance criteria:** Confirmed end-to-end delivery.
- **DoD evidence:** Sentry dashboard screenshot; Reviewer: Technical Lead; Approval: Pending.

#### P10-T010 — Document and test the rollback procedure
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T002, P10-T008
- **Source:** TECHNICAL-ARCHITECTURE.md §30; PLAN.md §25
- **Objective:** Redeploy the previous image tag and confirm the application returns to a healthy, correct prior state; explicitly test and document the down-migration path for any schema change made across Phases 04–09 that wasn't purely additive (if none exist, record that finding explicitly rather than skipping the check).
- **Inputs/Files:** None created — a procedural test, documented in this task's completion evidence.
- **Instructions:** Rollback is never assumed safe for a destructive schema change without this explicit test.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** A simulated rollback (deploy N, then roll back to N-1) succeeds.
- **Acceptance criteria:** Rollback confirmed functional, not assumed.
- **DoD evidence:** Rollback drill log; Reviewer: Technical Lead; Approval: Pending.

#### P10-T011 — Run production smoke tests
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T002 through P10-T010
- **Source:** TECHNICAL-ARCHITECTURE.md §29
- **Objective:** Against the real production deployment: homepage loads (both locales) + one service page + one case study + a contact-form dry run (using a clearly-labeled test submission, cleaned up afterward or flagged in the `leads` collection as test data).
- **Inputs/Files:** `e2e/production-smoke.spec.ts` (run against the production URL, not staging).
- **Instructions:** N/A
- **RTL/LTR:** Both locales. · **Responsive:** 1440/390px minimum. · **Motion:** N/A · **CMS:** Against real production content/CMS state. · **Security:** N/A · **Performance:** N/A
- **Tests:** The smoke suite itself.
- **Acceptance criteria:** All four smoke checks pass against the real production URL.
- **DoD evidence:** Smoke-test report; Reviewer: Technical Lead; Approval: Pending.

#### P10-T012 — Final production SEO checks
- **Status:** TODO · **Priority:** P1 · **Depends on:** P10-T011
- **Source:** TECHNICAL-ARCHITECTURE.md §22
- **Objective:** Re-run P09-T005's hreflang/sitemap/robots validator against the real production domain (not staging), confirming the live DNS/TLS setup doesn't introduce a mismatch.
- **Inputs/Files:** None created.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** The validator run.
- **Acceptance criteria:** Zero validator errors against the live domain.
- **DoD evidence:** Validator report; Reviewer: Technical Lead; Approval: Pending.

#### P10-T013 — Resolve or explicitly accept all Phase-10-blocking owner inputs
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T006
- **Source:** PLAN.md §26 (bottom row)
- **Objective:** For each of the canonical production domain (`rakmyat.com` vs. `rakmyat.online`, neither confirmed), backup destination, uptime-monitoring provider, and `www`/apex preference: either the owner has provided it, or the owner has explicitly, in writing, accepted a documented interim state — never silently shipped as if resolved. The domain decision gates the other three (the `www`/apex preference and the Caddyfile binding in P10-T003 cannot finalize without it).
- **Inputs/Files:** None created — the recorded decisions are this task's deliverable.
- **Instructions:** Do not default the domain decision the way P10-T003 allows a staging-only placeholder — this task requires the real, owner-confirmed value (or an explicit dated acceptance of an interim one) before production go-live.
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** N/A
- **Acceptance criteria:** Every item in PLAN.md §26's bottom row (now four items, including the domain decision found during the final hardening audit) has either a real value or an explicit owner-dated acceptance note.
- **DoD evidence:** The recorded decisions/acceptances; Reviewer: N/A; Approval: Owner.

#### P10-T014 — Final owner launch acceptance and go-live
- **Status:** TODO · **Priority:** P0 · **Depends on:** P10-T007, P10-T010, P10-T011, P10-T012, P10-T013
- **Source:** PLAN.md §20 Phase 10, §30
- **Objective:** Present the completed, audited, backed-up, smoke-tested production deployment to the owner for final launch sign-off — explicitly distinct from the Phase 03 visual-direction approval and the Phase 09 technical-audit sign-off, and recorded as its own dated decision.
- **Inputs/Files:** None created — the decision itself.
- **Instructions:** N/A
- **RTL/LTR:** N/A · **Responsive:** N/A · **Motion:** N/A · **CMS:** N/A · **Security:** N/A · **Performance:** N/A
- **Tests:** N/A
- **Acceptance criteria:** All of PLAN.md §30's Launch Readiness Criteria are met at the moment this is recorded.
- **DoD evidence:** The recorded launch-acceptance decision, dated; Reviewer: N/A; **Approval: Owner.**

**Phase 10 exit:** all 14 tasks `DONE`, with **P10-T014 recording explicit owner launch acceptance**. The site is live.

---

## Final Register Summary

| Phase | Task count | Hard gate in this phase |
|---|---|---|
| 01 — Foundation & Compatibility | 17 | None (technical-lead sign-off only) |
| 02 — Design System & Prototype Foundation | 21 | None (technical-lead sign-off only) |
| 03 — Visual Prototype & Owner Approval | 18 | **P03-T018 — Owner Gate 5 approval** |
| 04 — CMS & Content Infrastructure | 25 | None beyond the inherited P03-T018 dependency |
| 05 — Complete Homepage | 15 | None beyond the inherited P03-T018 dependency |
| 06 — Services, About & Process | 12 | None beyond the inherited P03-T018 dependency |
| 07 — Portfolio & Case Studies | 16 | None beyond the inherited P03-T018 dependency |
| 08 — Contact & Lead Management | 15 | None beyond the inherited P03-T018 dependency (plus a dual technical/owner sign-off on the interim lead pipeline) |
| 09 — Security, SEO, Accessibility & Performance Hardening | 15 | Gate 6 (P09-T014) |
| 10 — Production Deployment & Launch | 14 | **P10-T014 — Final owner launch acceptance** |
| **Total** | **168** | **Two owner gates: P03-T018, P10-T014** |

**Dependency integrity:** every task above lists its exact prerequisite task IDs (no vague "after setup"/"once design is ready" language anywhere in this register); the graph is acyclic by construction (each phase's tasks depend only on same-phase-earlier or prior-phase tasks, never forward); Phases 04–10 all carry the `P03-T018` gate explicitly rather than being marked `BLOCKED` prematurely, per the governing brief's distinction between a genuine blocker and a task simply awaiting its listed prerequisite.
