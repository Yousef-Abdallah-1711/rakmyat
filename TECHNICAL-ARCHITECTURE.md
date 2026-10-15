# RAKMYAT — TECHNICAL-ARCHITECTURE.md
### Phase 02 — Locked Technical & Infrastructure Specification

**Status:** Documentation only. No application code, configuration files, Dockerfiles, compose files, migrations, or packages were created in producing this document.
**Decision authority:** This document converts locked decisions from the Phase 02 prompt, DESIGN.md, and PRODUCT.md into implementation-ready technical specification. It does not introduce new creative, UX, or business decisions. Where this file cites a design or content rule, the citation (`DESIGN.md §x` / `PRODUCT.md §x`) is the source of truth; this file only adds the engineering mechanics required to build it.
**Companion documents:** [PRODUCT.md](./PRODUCT.md) · [DESIGN.md](./DESIGN.md) · [PAGE-BLUEPRINTS.md](./PAGE-BLUEPRINTS.md) · [CMS-SCHEMAS.md](./CMS-SCHEMAS.md)
**Version verification date:** 2026-10-14 (all package-version claims below carry this as their evidence date; see §4/§5 for per-package sourcing — re-verify before dependency installation, since this date may be weeks or months before implementation actually starts).

---

## 1. Executive Architecture Summary

Rakmyat's website is a single Next.js (App Router) application with Payload CMS installed natively inside it, backed by one PostgreSQL database, deployed as a small set of Docker Compose services behind a Caddy reverse proxy on a self-hosted VPS. The frontend renders the exact bilingual, RTL/LTR, porcelain-first cinematic experience locked in DESIGN.md and PRODUCT.md (Cobalt Blue & Porcelain identity, Phase 03B — see DESIGN.md §5/§43) — GSAP drives motion, React Three Fiber renders the one signature 3D hero scene (desktop-only), and every piece of editorial content (homepage sections, services, projects/case studies, process, about, legal) is CMS-driven through a controlled block/collection registry rather than hard-coded. The architecture is deliberately a modular monolith: one deployable unit, clear internal boundaries, no microservices, no second backend framework. Every technology choice below is the one locked in the Phase 02 prompt §5 — this document does not substitute, does not add alternatives, and flags unresolved compatibility questions as explicit risks (§32) rather than resolving them unilaterally.

---

## 2. Source Documents & Decision Authority

| Decision domain | Authority | This document's role |
|---|---|---|
| Brand, positioning, content, routes, CTAs, bilingual copy | PRODUCT.md | Consumed as-is; never altered |
| Visual system, tokens, motion, RTL/LTR composition, component anatomy | DESIGN.md | Consumed as-is; never altered |
| Technology stack, infrastructure, CMS architecture, engineering mechanics | This prompt (Phase 02) §3–§9, §29–§40 | Elaborated into implementation detail |
| Conflicts between the above | Resolved in favor of: (1) this prompt's explicit locks, (2) DESIGN.md for anything visual/interactive, (3) PRODUCT.md for anything business/content/route-related, (4) technical necessity last | Documented in §33 if unresolved |

No contradiction between PRODUCT.md, DESIGN.md, and this prompt was found during the production of this document. One **unresolved external compatibility risk** (Payload's Next.js integration vs. Turbopack-by-default in Next.js 16) is logged in §32 and §33 — it is a dependency-ecosystem risk, not a contradiction between the source documents.

---

## 3. Locked Technology Stack

Restated verbatim from the Phase 02 prompt §5 for traceability — no substitutions:

| Layer | Technology |
|---|---|
| Frontend framework | Next.js, App Router |
| UI runtime | React |
| Language | TypeScript, strict mode |
| Runtime | Node.js, Active LTS |
| Package manager | pnpm |
| Styling | Tailwind CSS |
| Specialized styles | CSS Modules + CSS Custom Properties |
| Accessible primitives | Radix UI (selective) |
| Icons | Lucide React (selective) + Rakmyat custom icon set (DESIGN.md §17) |
| i18n | next-intl |
| CMS | Payload CMS |
| Database | PostgreSQL |
| DB integration | `@payloadcms/db-postgres` |
| Rich text | Payload Lexical |
| Content structuring | Payload Blocks + Arrays |
| Forms | React Hook Form + Zod + `@hookform/resolvers` |
| Animation | GSAP + `@gsap/react` + ScrollTrigger |
| 3D | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Carousels | Embla Carousel |
| Images | `next/image` |
| Testing | Vitest, React Testing Library, Playwright, `@axe-core/playwright` |
| Lint/format | ESLint, Prettier |
| Containerization | Docker, Docker Compose |
| Reverse proxy | Caddy |
| Error monitoring | Sentry (`@sentry/nextjs`) |
| Analytics | GA4 — pending owner activation/consent configuration (🔴 PRODUCT.md §34) |

---

## 4. Package Version Matrix

All versions below were verified via live package-registry/vendor-documentation search on **2026-10-14**. "Decision status" of `LOCKED` means pin to this version range at implementation; `VERIFY-AT-IMPLEMENTATION` means the Phase 02 research surfaced a time-sensitive or conflicting signal that must be re-checked against the registry on the actual implementation start date before pinning.

| Package | Purpose | Proposed version | Latest verified (2026-10-14) | Compatibility constraints | Node compat | License | Decision status |
|---|---|---|---|---|---|---|---|
| `next` | Framework | `^16.2.6` (Payload-compatible floor) | 16.4.0 | Payload CMS requires ≥16.2.0; Payload+Next16 Turbopack conflict noted (§32) — may require pinning to a specific 16.2.x/16.3.x patch once resolved | Node ≥18.18 (Next 16 likely raises floor — verify) | MIT | VERIFY-AT-IMPLEMENTATION |
| `react` / `react-dom` | UI runtime | `^19.2.0` | 19.3.0 (Sep 2026) | R3F 9.5 confirmed for React 19.0–19.2; do not jump to 19.3 until R3F's support range is reconfirmed | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `typescript` | Language | latest 5.x stable | not re-queried this cycle | Strict mode mandated regardless of patch version | — | Apache-2.0 | UNVERIFIED |
| `payload` (core) | CMS | `^3.73.0` minimum (Next 16 floor) | `@payloadcms/db-postgres` observed at 3.90.2 — core payload package itself should be pinned to the **same** version number as `@payloadcms/db-postgres`/`@payloadcms/next`/`@payloadcms/richtext-lexical` per Payload's monorepo versioning convention | Requires Next.js ≥16.2.0 for full Next 16 support (PR #14456) | Node per Next.js floor | MIT | VERIFY-AT-IMPLEMENTATION |
| `@payloadcms/next` | Payload↔Next glue | same version as `payload` core | — | Injects a `webpack()` config hook — conflicts with Turbopack-as-default in Next 16 (§32) | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `@payloadcms/db-postgres` | Postgres adapter | `^3.90.2` | 3.90.2 | Built on Drizzle ORM + node-postgres; Postgres + Lexical marked stable after a year of testing | — | MIT | LOCKED (re-pin to exact patch at install) |
| `@payloadcms/richtext-lexical` | Rich text | same version as `payload` core | — | — | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `tailwindcss` | Styling | `^4.3.3` | 4.3.3 (Jul 2026) | CSS-first config via `@theme`, no `tailwind.config.js`; Next.js 15.1+ has built-in PostCSS support via `@tailwindcss/postcss` | — | MIT | LOCKED |
| `next-intl` | i18n | `^4.14.9` | 4.14.9 | App-Router-first, Server Component APIs (`getTranslations`, `getFormatter`), no routing hacks needed | — | MIT | LOCKED |
| `gsap` | Animation | `^3.15.0` | 3.15.0 | 100% free incl. all plugins (ScrollTrigger, SplitText) under GreenSock standard "no charge" license | — | Custom (GreenSock Standard — free for commercial use) | LOCKED |
| `@gsap/react` | React/GSAP glue (`useGSAP`) | `^2.1.2` | 2.1.2 — registry snapshot showed this as "last published 2 years ago," which is stale for an actively maintained ecosystem; re-check for a newer release at implementation | — | Same as `gsap` | VERIFY-AT-IMPLEMENTATION |
| `three` | 3D engine | satisfy `@react-three/fiber@9.5.0`'s peer range | not independently queried — pin to whatever `three` version R3F 9.5's `package.json` peerDependencies specifies at install time | Must match R3F's declared peer range exactly | — | MIT | UNVERIFIED |
| `@react-three/fiber` | React 3D renderer | `^9.5.0` | 9.5.0 | Confirmed React 19.0–19.2 support; one search signal claimed 19.3 compatibility — treat as unconfirmed until cross-checked against the package's own README at install time | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `@react-three/drei` | R3F helpers | latest matching R3F 9.x | not independently version-pinned this cycle | Must track R3F major version; GitHub discussion #2213 ("Is React 19 & R3F v9 Supported?") indicates this pairing is still an active compatibility conversation in the ecosystem — verify before pinning | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `embla-carousel-react` | Carousel | `^8.6.0` | 8.6.0 stable (9.0.0 only exists as `-rc`) | Use stable v8, not the v9 release candidate | — | MIT | LOCKED |
| `radix-ui` (unified package) | Accessible primitives | `^1.8.1` | 1.8.1 | Prefer the unified `radix-ui` package over per-primitive `@radix-ui/react-*` installs to avoid node_modules bloat (per the ecosystem's own stated direction) | — | MIT | LOCKED |
| `lucide-react` | Utility icons (non-branded only — custom icon set per DESIGN.md §17 covers everything else) | `^1.56.0` | 1.56.0 | v1.0 removed brand/logo icons from the package — irrelevant to Rakmyat since no third-party brand icons are used anyway | — | ISC | LOCKED |
| `react-hook-form` | Forms | latest 7.x compatible with `@hookform/resolvers ^5.9` | not independently re-queried; resolvers 5.x generally targets RHF ^7.x | Confirm exact RHF version against `@hookform/resolvers` peerDependencies at install | — | MIT | VERIFY-AT-IMPLEMENTATION |
| `zod` | Validation | `^4.6.7` | 4.6.7 | Zod 4 is stable; requires `@hookform/resolvers ^5.1.0`+ | — | MIT | LOCKED |
| `@hookform/resolvers` | RHF↔Zod glue | `^5.9.1` | 5.9.1 | Auto-detects Zod 3 vs. 4 schemas; requires `tsconfig` `moduleResolution: "bundler"` (or `node16`/`nodenext`) for subpath exports to resolve | — | MIT | LOCKED |
| `vitest` | Unit tests | `^5.0.4` | 5.0.4 (Oct 12, 2026) | — | — | MIT | LOCKED |
| `@testing-library/react` | Component tests | latest matching React 19 | not independently re-queried | Must support React 19's `act`/concurrent semantics | — | MIT | UNVERIFIED |
| `@playwright/test` | E2E | `^1.62.1` | 1.62.1 stable (1.63 referenced only in a dev/pre-release context) | — | — | Apache-2.0 | LOCKED |
| `@axe-core/playwright` | A11y testing | `^4.13.0` | 4.13.0 | — | — | MPL-2.0 | LOCKED |
| `eslint` | Lint | latest 9.x (flat config) | not independently re-queried | Flat config is now the ESLint standard; Next.js 16's own ESLint integration must be checked for its required major version | — | MIT | UNVERIFIED |
| `prettier` | Format | latest 3.x | not independently re-queried | Stable, low-risk, minimal breaking-change surface for ~2 years | — | MIT | UNVERIFIED |
| `@sentry/nextjs` | Error monitoring | `^11.4.0` | 11.4.0 | — | — | MIT | LOCKED |
| PostgreSQL (Docker image) | Database | `postgres:18` (Alpine variant preferred for image size) | 18.6 (Aug 2026) | Pin to an exact minor (e.g. `postgres:18.6-alpine`) in `docker-compose.yml`, not a floating `:18` tag, for reproducible deploys | — | PostgreSQL License | LOCKED (pin exact tag at implementation) |
| Caddy (Docker image) | Reverse proxy/TLS | `caddy:2.11.7-alpine` | 2.11.7 (Oct 3, 2026) | — | — | Apache-2.0 | LOCKED |
| Node.js (Docker base image) | Runtime | `node:24-alpine` (Active LTS as of this verification date) | Node 24 = current Active LTS; Node 26 becomes Active LTS on **2026-10-28**, two weeks after this verification date | Re-check at implementation: if the build starts after 2026-10-28, Node 26 LTS becomes the more future-proof pin | — | MIT | VERIFY-AT-IMPLEMENTATION |
| pnpm | Package manager | `^12.11.2` (pin via Corepack, not a global install; use the stable `latest` dist-tag) | 12.11.2 (stable `latest` as of Oct 15, 2026) | — | — | MIT | LOCKED |

**Verification date caveat (binding):** every `LOCKED` row above is locked at the *version-range* level, not necessarily the exact patch — exact patch pins belong in the implementation phase's lockfile, generated at install time against whatever the registry serves that day. Every `VERIFY-AT-IMPLEMENTATION` / `UNVERIFIED` row must be re-checked before `pnpm install` is run for real; none of those are safe to copy into a `package.json` unchecked.

---

## 5. Compatibility Evidence

| Claim | Evidence | Source |
|---|---|---|
| Payload CMS installs natively inside a Next.js app (App Router) | Payload 3.0 ("the first CMS that installs directly into any Next.js app"), stable since Nov 2024 | payloadcms.com/posts/blog/payload-30… |
| Payload's Postgres adapter uses Drizzle ORM + node-postgres, marked stable after a year of testing | Payload docs, `@payloadcms/db-postgres` README | payloadcms.com/docs/database/overview; github.com/payloadcms/payload/blob/main/docs/database/postgres.mdx |
| Payload requires Next.js ≥16.2.0 for full Next 16 support, merged in `payload@3.73.0` | PR #14456 | github.com/payloadcms/payload/pull/14456 |
| Payload's `@payloadcms/next` injects a `webpack()` hook that can conflict with Turbopack, Next 16's default bundler | Community compatibility writeup | buildwithmatija.com/blog/payload-cms-nextjs-16-compatibility-breakthrough |
| GSAP (incl. ScrollTrigger, SplitText) is 100% free for commercial use | GreenSock standard license page | gsap.com/standard-license |
| `@react-three/fiber@9.x` pairs with `react@19`; confirmed range React 19.0–19.2 | R3F release notes / ecosystem writeups | github.com/pmndrs/react-three-fiber/releases; hysenlabs.com review |
| `@react-three/drei` + React 19/R3F v9 compatibility is an active, not fully settled, community topic | GitHub Discussion #2213 | github.com/pmndrs/drei/discussions/2213 |
| Zod 4 requires `@hookform/resolvers ≥5.1.0`; 5.x auto-detects Zod 3 vs. 4 | resolvers PR #777; Zod issue #4992 | github.com/react-hook-form/resolvers/pull/777 |
| Tailwind CSS v4 uses CSS-first `@theme` config, no `tailwind.config.js`; Next.js 15.1+ has built-in PostCSS support | Tailwind v4 release coverage | fireup.pro; sitepoint.com |
| Node 24 is current Active LTS; Node 26 becomes Active LTS 2026-10-28 | Node.js release-schedule coverage | bex.co/blog/…node-26-active-lts…; herodevs.com |

---

## 6. Rejected Technologies

Per Phase 02 prompt §5, the following are explicitly forbidden and were not considered: WordPress, Supabase (in place of Postgres/Payload), Framer Motion/Motion, AOS, Swiper, Bootstrap, Material UI, Chakra UI, a prebuilt agency template, a separate Express/NestJS backend, Kubernetes, Lenis (smooth-scroll library — native scrolling only, no scroll-jacking per DESIGN.md §24.5). No alternative to any locked technology in §3 was evaluated or substituted anywhere in this document.

---

## 7. Architecture Decision Records

**ADR-001 — Single Next.js app hosts both frontend and Payload CMS.**
Decision: one deployable, one repo, one process boundary. Rationale: Payload 3's native Next.js installation makes a separate CMS service unnecessary complexity for this scale of site (locked in Phase 02 prompt §7). Status: Locked (prompt-mandated).

**ADR-002 — PostgreSQL via `@payloadcms/db-postgres`, no alternative DB adapter.**
Rationale: locked by prompt §5; Drizzle-based adapter is Payload's own recommended production path for relational data with the content complexity Rakmyat's schema requires (classification enums, relationships, localized fields). Status: Locked.

**ADR-003 — GSAP as the sole animation engine; CSS for simple states.**
Rationale: locked by prompt §5/§34; DESIGN.md §24.4 already splits CSS-only vs. JS-required(GSAP/IntersectionObserver) vs. WebGL-required motion — this ADR just confirms GSAP is the one JS engine filling the middle tier, never Framer Motion/AOS. Status: Locked.

**ADR-004 — React Three Fiber scoped to the hero sculpture only, unless a service page explicitly needs 3D.**
Rationale: DESIGN.md §15 states Digital Architecture diagrams are SVG, not 3D, by default; this ADR operationalizes that as a code-boundary rule — no R3F `Canvas` component may be mounted outside the hero component and (if ever required) a single named exception component, to prevent WebGL sprawl. Status: Locked (prompt §21 allows a documented exception "only if the existing approved DESIGN.md explicitly requires a 3D scene" — none currently does, so the exception path is unused at MVP).

**ADR-005 — Locale-prefixed routing via `next-intl`, English-derived slugs shared across locales.**
Rationale: PRODUCT.md §14 locks this routing policy; `next-intl`'s App Router-first design (Server Component `getTranslations`, internationalized `Link`/`useRouter`) is the correct mechanism to implement it without custom middleware hacks. Status: Locked.

**ADR-006 — Payload admin runs on the same origin, protected by role-based access control, not a separate subdomain.**
Rationale: simplifies Caddy/TLS/cookie configuration for a single-VPS deploy; access control (§29) is enforced at the Payload collection/global level regardless of origin, so a separate admin subdomain would add operational complexity without a security benefit at this scale. Status: Locked (technical-necessity decision within this document's authorized discretion — does not alter any user-facing experience).

**ADR-007 — Media stored on a persistent Docker volume at MVP, with a documented migration path to S3-compatible object storage.**
Rationale: prompt §33 explicitly forbids assuming a container filesystem is durable without a backup strategy; a local volume is acceptable for MVP content volume (a handful of case studies) provided backups (§29 of this doc) are real, and the schema (CMS-SCHEMAS.md §27) is written so switching Payload's upload adapter to S3-compatible storage later requires no field-shape changes. Status: Locked.

**ADR-008 — Turbopack-vs-Payload-webpack-hook conflict is not resolved in this document.**
Rationale: this is a live, version-sensitive upstream compatibility question (§4/§5/§32), not a Rakmyat-specific design decision — resolving it requires checking the exact Payload/Next.js patch versions available on the actual implementation start date. Status: **BLOCKED — re-verify at implementation kickoff**, documented as a risk in §32/§33, not guessed at here.

---

## 8. Application Architecture

Modular monolith, one Next.js application, enforced internal boundaries (not physical service boundaries):

```
Public Frontend  →  Data Access Layer  →  Payload Local API  →  PostgreSQL
      ↑                                         ↑
 Motion/3D Layer                         CMS Admin (Payload-managed UI)
      ↑                                         ↑
 next-intl (locale/dir)                 Access Control (roles, §29)
```

- **Public frontend** never queries PostgreSQL directly — it goes through Payload's Local API (server-side, same process) or the REST/GraphQL API (not required at this scale; Local API is preferred for Server Components to avoid an unnecessary network hop within the same process).
- **Form submission** (§20/PRODUCT.md §21) is a Server Action or Route Handler that validates with Zod server-side (never trusting client-side validation alone) before writing to the `Leads` collection via the Local API.
- **CMS admin** is Payload's own managed admin UI, mounted at an app route (e.g. `/admin`), gated by Payload's authentication — not a custom-built admin panel.
- **Motion/3D layer** is a presentation-only boundary: GSAP/R3F components receive already-resolved, already-localized content as props; they contain no data-fetching or CMS logic.

---

## 9. Proposed Directory Structure

Documentation-only illustration — no files created:

```
app/
  [locale]/
    (marketing)/
      page.tsx                      # Homepage
      services/
        page.tsx                    # Services archive
        [slug]/page.tsx             # Service detail (shared template, §21)
      work/
        page.tsx                    # Portfolio archive
        [slug]/page.tsx             # Single portfolio
      about/page.tsx
      process/page.tsx
      contact/page.tsx
      privacy/page.tsx
    layout.tsx                       # Locale-aware <html lang/dir>, nav, footer
    not-found.tsx                    # 404
  (payload)/
    admin/[[...segments]]/page.tsx    # Payload admin mount
  api/
    [...]                            # Payload REST/GraphQL mount, form Route Handler
collections/
  Projects.ts
  ProjectCategories.ts
  Services.ts
  Pages.ts
  Media.ts
  Leads.ts
  Users.ts
globals/
  SiteSettings.ts
  Navigation.ts
  Footer.ts
  Homepage.ts
  AboutPage.ts
  ProcessPage.ts
  ContactSettings.ts
  SEODefaults.ts
blocks/
  RichText.ts, SplitContent.ts, FullBleedMedia.ts, ImageGallery.ts,
  VideoShowcase.ts, FeatureGrid.ts, ArchitectureDiagram.ts,
  TechnologyStack.ts, ProcessTimeline.ts, VerifiedMetrics.ts,
  ApprovedTestimonial.ts, Quote.ts, CTA.ts, RelatedProjects.ts
components/
  motion/        # GSAP-driven components (reveal, stagger, timeline)
  three/         # R3F hero sculpture + particle system
  ui/             # Buttons, forms, nav — DESIGN.md §18 component registry
  sections/       # One component per homepage/page section
lib/
  payload/        # Local API helpers, typed query functions
  i18n/            # next-intl config, locale routing helpers
  seo/             # Metadata builders, hreflang, sitemap
  analytics/       # Event-dispatch abstraction (§23 of this doc)
  validation/      # Shared Zod schemas (contact form, etc.)
payload.config.ts
next.config.ts
```

---

## 10. Server/Client Component Boundaries

| Area | Default | Client boundary needed for |
|---|---|---|
| Homepage sections 02/03/05/06/07/08 | Server Component | Scroll-reveal triggers only (small client wrapper per DESIGN.md §24.4) |
| Homepage hero (01) | Server Component shell | R3F `Canvas` + GSAP entrance — isolated client component, dynamically imported, desktop-only (`next/dynamic`, no SSR for the 3D canvas) |
| Homepage "Systems in Motion" (04) | Server Component shell | Particle Intelligence canvas — same dynamic-import, desktop-only pattern |
| Service/About/Process/Privacy pages | Server Component | Any inline SVG diagram reveal (GSAP) wrapped in a small client component |
| Portfolio archive filtering | Server Component, server-side filtering via URL search params (prompt §24) | None — explicitly no client-side filter state per the locked spec |
| Single portfolio page | Server Component | Embla gallery (client component, genuine image galleries only per prompt §25) |
| Contact form | Server Component page shell | The form itself (React Hook Form state, client component); submission handled by a Server Action |
| Header/nav | Server Component shell | Mobile drawer open/close state, language-switcher interaction (client components) |
| Payload admin | Entirely Payload-managed | N/A — not custom-built |

Rule: a component becomes a Client Component only when it needs browser APIs, interactivity state, or a library that requires it (GSAP, R3F, React Hook Form, Embla) — never by default.

---

## 11. Routing

Implements PRODUCT.md §14–§16 exactly. `app/[locale]/...` segment handles both `en` and `ar` via `next-intl`'s routing config. Root `/` proxy performs the owner-approved 2026-10-15 locale-negotiation sequence (valid locale cookie → quality-ordered supported `Accept-Language` → English fallback; no geo detection) and redirects into `/en` or `/ar`; it never serves content directly. 404 is locale-aware per PRODUCT.md §18.9/§28 of this prompt. No Arabic-script slugs anywhere (prompt §8/PRODUCT.md §14).

---

## 12. Internationalization

`next-intl` provides: message catalogs per locale (`en.json`, `ar.json` — content for *UI chrome strings* like nav labels, form labels, button text; long-form editorial content comes from Payload, not message files, per CMS-SCHEMAS.md §20), the internationalized `Link`/`useRouter`/`redirect` APIs so navigation never needs manual locale-prefix string concatenation, and Server Component-safe `getTranslations`. The `ar-EG` locale is modeled as `next-intl` locale `ar` with its public URL prefix `/ar` (prompt §8 — never `/ar-EG` in the URL) while the Payload localization config may use the fuller `ar-EG` locale code internally for CMS field localization, since Payload's localization and the public route prefix are independent concerns documented separately.

---

## 13. RTL/LTR Engineering

- `app/[locale]/layout.tsx` sets `<html lang={locale === 'ar' ? 'ar-EG' : 'en'} dir={locale === 'ar' ? 'rtl' : 'ltr'}>` at the document root — never a wrapper `<div dir>` (DESIGN.md §11).
- All component styling uses Tailwind's logical-property utilities (`ms-*`/`me-*`/`ps-*`/`pe-*`/`start-*`/`end-*`, Tailwind v4 supports these natively) or CSS Modules written with logical properties (DESIGN.md §9.5) — no `left`/`right` utility classes in shared components.
- The one documented physical-property exception (signed `translateX` for motion, DESIGN.md §9.5) is implemented via the `--dir` CSS custom property from DESIGN.md §34's token file, consumed inside GSAP tween configs as `getComputedStyle(root).getPropertyValue('--dir')` at animation-setup time, not duplicated per-locale GSAP timelines.
- Directional vs. non-directional icon mirroring (DESIGN.md §12.1) is implemented as a small `DirectionalIcon` wrapper component that reads the ambient `dir` from context and conditionally applies a `scale-x-[-1]` transform — centralizing the mirror-or-not rule in one place rather than scattering conditional logic across every icon usage.

---

## 14. Design System Mapping

| DESIGN.md token category | Implementation mechanism |
|---|---|
| Color tokens (§5) | Tailwind v4 `@theme` CSS variables, 1:1 with DESIGN.md §34's `:root` custom-property list |
| Typography (§6–§7) | Two parallel Tailwind font-family utilities (`font-en-display`, `font-en-body`, `font-ar`) gated by `[dir]` — never a single shared `font-sans` reused across locales |
| Spacing (§9.4) | Tailwind spacing scale extended to match `space.1`–`space.10` exactly, not Tailwind's default scale |
| Motion tokens (§24.1–§24.2) | Exported as a `lib/motion/tokens.ts` TS module consumed by GSAP tween configs, kept in sync with the CSS custom properties by value (not re-derived independently) |
| Component anatomy (§18) | One React component per DESIGN.md subsection (§18.1 → `Header.tsx`, §18.4 → `Button.tsx`, etc.) — a 1:1 naming mapping so any future DESIGN.md edit has an obvious code target |

---

## 15. Motion Architecture

GSAP timelines are created inside `useGSAP()` (`@gsap/react`) scoped to each section's container ref, never a single global timeline spanning the whole page — this keeps IntersectionObserver-gated reveals (DESIGN.md §24.3) independently triggerable and cleans up correctly on route change (critical for the locale-switch cross-fade, DESIGN.md §20). ScrollTrigger instances are created with their own `scrollTrigger: { trigger: sectionRef }` scoped to that section's DOM range — never `scrollTrigger` configs that span the full document, which is how DESIGN.md §24.5/§26's "no scroll-hijacking, section-scoped only" rule is enforced in code, not just in the spec.

---

## 16. 3D Architecture

- Hero sculpture (DESIGN.md §13) and Particle Intelligence (DESIGN.md §14) are the only two R3F `Canvas` mounts in the application (ADR-004).
- Both are loaded via `next/dynamic` with `ssr: false` and a `loading:` fallback matching the static/mobile fallback asset — so the WebGL bundle is never sent to a client below the 768px breakpoint (DESIGN.md §13/§14) and never blocks first paint on desktop either.
- Both respect `prefers-reduced-motion` and a runtime low-power-device check (DESIGN.md §33's "degrade to static fallback even on desktop-width viewports" rule) by feature-detecting via a shared `lib/three/shouldRenderCanvas()` utility checked once at mount, not per-frame.
- `@react-three/drei`'s `<Html>`/accessibility helpers are **not** used to inject the Systems-in-Motion stage text — that text is real DOM content outside the canvas per DESIGN.md §14/§26/§32 (screen-reader equivalence requirement), with the canvas purely as a decorative sibling layer.

---

## 17. CMS Integration

Payload is configured as a plugin inside `next.config.ts` (`withPayload()`, the standard Payload 3 Next.js integration) rather than a separate server process. Collections/globals/blocks are defined exactly per CMS-SCHEMAS.md — this document does not restate the schemas, only the integration mechanics: Payload's Local API (`getPayload({ config })`) is called from Server Components/Server Actions for all read/write operations; the public site never calls Payload's REST/GraphQL endpoints over HTTP for its own rendering (that network path is reserved for any future external integration, not used by the frontend itself, which keeps everything in one process with no added latency).

---

## 18. PostgreSQL Architecture

One Postgres instance, one database, accessed only by the Payload adapter from within the application container's private Docker network (§36 — "No publicly exposed database port"). Indexes follow CMS-SCHEMAS.md §28 (slug uniqueness, classification filtering, publish-status queries, locale lookups). No raw SQL is written outside what Payload's adapter generates, except for the documented index definitions in CMS-SCHEMAS.md §28, which are expressed as Payload field-level `index: true` configuration, not hand-written migrations, wherever Payload's schema API supports it.

---

## 19. Media Storage

Payload's Media collection (CMS-SCHEMAS.md §9) stores files on a dedicated, named Docker volume mounted into the app container (ADR-007) — not the container's ephemeral writable layer, which does not survive container recreation (prompt §33's explicit warning). Backup (§29 of this doc) includes this volume, not just the database dump. Documented future migration path: swap Payload's `upload` adapter configuration to an S3-compatible provider; because CMS-SCHEMAS.md's media field shape stores a relative path + metadata rather than an absolute local-disk path, this swap requires a data migration script (re-upload + URL rewrite) but no schema change.

---

## 20. Lead Submission Architecture

Implements PRODUCT.md §21 and prompt §26: contact form → client-side React Hook Form + Zod validation (fast feedback) → Server Action re-validates with the **same** Zod schema server-side (never trust the client) → on success, writes to the `Leads` collection (CMS-SCHEMAS.md §10) via Payload's Local API → success state only renders after that write is confirmed (PRODUCT.md §21's "no claim of delivery without a real pipeline" rule, satisfied here because the Leads collection *is* the real pipeline — the gap PRODUCT.md flagged as 🔴 is specifically *external* delivery to an inbox/CRM, which remains pending owner configuration, not the internal persistence, which this architecture does provide). Rate limiting and honeypot/spam protection (§26 of this doc / prompt §36) are applied in the Server Action before the Payload write, not after.

---

## 21. Security

| Concern | Mechanism |
|---|---|
| CMS authentication | Payload's built-in auth (collection-based `Users`, hashed credentials, session cookie) |
| Role-based authorization | Three roles (Super Admin, Content Editor, Lead Manager) enforced via Payload `access` functions per collection/global — see CMS-SCHEMAS.md §4/§26 |
| Server-side validation | Zod schemas re-run server-side for every write path (forms, no client-trusted writes) |
| Lead data privacy | `Leads` collection readable only by Super Admin/Lead Manager roles; never exposed via any public API query |
| Rate limiting | Applied at the Server Action/Route Handler layer (e.g. token-bucket keyed by IP+form fingerprint) before any DB write |
| Spam protection | Honeypot field (invisible, bot-only) + rate limiting; no third-party CAPTCHA mandated by the source docs, so none is added without owner sign-off |
| CSRF/origin protection | Next.js Server Actions carry built-in origin-check protection; Route Handlers (if used instead) require explicit same-origin header verification |
| File upload validation | Payload Media collection restricts MIME types and max size (CMS-SCHEMAS.md §9) |
| CSP / security headers | Set via `next.config.ts` headers() or Caddy response headers — documented as a requirement, exact header values are an implementation-time task, not invented here |
| Secrets management | `.env` files never committed; Docker Compose reads secrets from an untracked `.env` file or Docker secrets, never hard-coded |
| DB network isolation | Postgres container on an internal-only Docker network, no published port (§36) |
| TLS | Caddy automatic HTTPS (ACME) — no manual certificate handling |
| Admin protection | Payload admin behind the same auth as above; 🟡 recommend restricting `/admin` at the Caddy layer to known IP ranges if the owner has static office/VPN IPs — flagged as an optional hardening step pending that input |
| Audit logging | Payload's built-in collection timestamps (`createdAt`/`updatedAt`/`createdBy` where configured) serve as a minimal audit trail; a dedicated audit-log collection is a documented future extension (CMS-SCHEMAS.md §32), not MVP |
| Dependency scanning | `pnpm audit` / Dependabot-equivalent in CI — implementation-time setup, not invented here |
| Container security | Non-root user in the app Dockerfile, minimal base images (`-alpine` variants per §4) |
| Backup encryption | Database dumps and media backups encrypted at rest on the backup destination — exact mechanism depends on the backup destination chosen at implementation (§29) |

---

## 22. SEO

Implements PRODUCT.md §27–§28 via Next.js's Metadata API: per-route `generateMetadata()` pulling locale-specific title/description from Payload's SEO fields (CMS-SCHEMAS.md §17 SEO Defaults Global + per-collection `seo` field group), `hreflang` alternates (`ar-EG`, `en`, `x-default`→English) generated from the known locale pair for every route, one `sitemap.xml` (Next.js's `sitemap.ts` convention) enumerating both locale variants of every published route, `robots.txt` allowing both locale trees, Open Graph tags per locale, `Organization`/`BreadcrumbList` structured data (no `Review`/`AggregateRating` per PRODUCT.md §28's explicit prohibition absent real reviews). Draft/unpublished CMS content is excluded from the sitemap and from public queries by filtering on Payload's `status` field (CMS-SCHEMAS.md §5/§24). **Base site URL (used by `sitemap.ts`, canonical `<link>` tags, and Open Graph `og:url`) is read from an environment variable (e.g. `NEXT_PUBLIC_SITE_URL`), never hardcoded** — the canonical production domain is a 🔴 open owner decision (§28), and this abstraction lets every environment (local/staging/production) carry its own correct value without a code change once that decision resolves.

---

## 23. Analytics

Event names are preserved verbatim from PRODUCT.md §29 (listed in the prompt §38). A thin `lib/analytics/track.ts` abstraction wraps the actual GA4 call (or a no-op if consent/activation hasn't happened — PRODUCT.md §34's 🔴 pending analytics-platform confirmation) so the event-dispatch call sites in components never couple directly to a specific vendor SDK. No personally identifying lead data (name, email, project description) is ever passed as an event property — only categorical metadata (e.g. `project_type`, `from_locale`/`to_locale`).

---

## 24. Performance

Implements DESIGN.md §33's budgets. Mechanisms: route-level code-splitting (automatic via App Router), dynamic `next/dynamic` imports with `ssr:false` for both R3F canvases (§16), `next/font` for self-hosted, subsetted variable fonts (English and Arabic font files loaded only on their respective locale's route tree — DESIGN.md §33's explicit "never bundled into the other locale's critical path" rule, enforced by placing the `next/font` declarations inside locale-specific layout files rather than the root layout), `next/image` with AVIF/WebP + responsive `srcset` for all raster media, and Payload-side image-size variant generation feeding those `srcset`s. Core Web Vitals targets (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms) are measured post-deploy via real-device/Lighthouse CI checks — not claimed as already achieved (PRODUCT.md §31/DESIGN.md §33's shared caveat).

---

## 25. Accessibility

Implements PRODUCT.md §30 and DESIGN.md §32 at the code level: semantic landmarks (`<nav>`, `<main>`, `<footer>`) in every page template, one `<h1>` per route, Radix UI primitives used specifically for components needing robust keyboard/focus semantics the team should not hand-roll (dialogs/modals if the discovery-call modal in DESIGN.md §18.16 is ever implemented, accordions per DESIGN.md §18.11), `aria-live` regions for form validation (DESIGN.md §18.14), and a global `prefers-reduced-motion` media-query gate consumed by both the GSAP token module (§15) and the R3F mount-check utility (§16) so reduced-motion is enforced once, centrally, not re-implemented per component.

---

## 26. Testing

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Pure functions — Zod schemas, SEO metadata builders, locale-routing helpers |
| Component | React Testing Library (+ Vitest) | UI component rendering/interaction in isolation, both locales |
| E2E | Playwright | Full user journeys (PRODUCT.md §19) across both locales, all MVP routes, desktop+mobile viewports (DESIGN.md §30 breakpoints) |
| Accessibility | `@axe-core/playwright` | Automated WCAG 2.2 AA scan on every MVP route, both `dir` values, as part of the Playwright suite — not a replacement for manual review (DESIGN.md §32's explicit caveat) |
| Visual/manual | DESIGN.md §37–§39 checklists | Performed by a human against the Visual/RTL/LTR QA checklists — not automatable away |

Required coverage areas (prompt §40): all MVP routes × both locales × both directions × three breakpoint classes (mobile/tablet/desktop); navigation and language switching; CMS access control (role-based write/read boundaries); portfolio publishing and all four classification values; dynamic case-study rendering with flexible blocks; contact form validation (client + server) and lead persistence; SEO metadata presence; reduced-motion behavior; 3D/WebGL failure fallback (simulate WebGL-unavailable and confirm the static fallback renders); Docker Compose startup; database backup/restore drill (§29).

---

## 27. Docker Compose Architecture

Services (names indicative, not final config): `app` (Next.js + Payload, built from a multi-stage Dockerfile, non-root user), `db` (Postgres, internal network only, named volume for data), `caddy` (reverse proxy + automatic TLS, the only service with published ports 80/443). `app` depends on `db` with a health-check gate (Postgres readiness probe) before Next.js starts accepting traffic. Media volume (§19) mounted into `app`. No service other than `caddy` is reachable from outside the VPS's private network.

---

## 28. Caddy & TLS

Caddy's automatic HTTPS (ACME via Let's Encrypt) terminates TLS and reverse-proxies to the `app` service over the internal Docker network. **🔴 OWNER DECISION REQUIRED — canonical domain unconfirmed:** PRODUCT.md's original assumption was `rakmyat.com`; the brand's social-media presence has since used `rakmyat.online`. Neither is confirmed registered/hosted, and this document does not assume the canonical domain changed, nor invent DNS/ownership verification. The `Caddyfile` (not created in this phase) must read its domain from an environment variable (e.g. `SITE_DOMAIN`), never a hardcoded string, so local/staging deployment is unaffected by this open decision; only the final production `Caddyfile` instantiation and the `www`-vs-apex canonicalization preference (already flagged below) are blocked on it. Security headers (§21) are applied at this layer where simpler than in Next.js itself.

---

## 29. Backup & Restore

- **Database:** scheduled `pg_dump` (e.g. nightly) to an off-VPS destination (exact destination — S3-compatible bucket, remote host, etc. — is 🔴 pending owner/infra decision; not invented here).
- **Media volume:** scheduled archive (e.g. `tar` + encrypted transfer) of the Docker volume contents, same destination policy as above.
- **Restore procedure (to document fully at implementation):** stand up a fresh `db` container, restore the latest `pg_dump`, restore the media volume archive, redeploy `app`/`caddy`, run a smoke-test pass (homepage + one service page + one case study + contact form dry-run) before cutting traffic back over.
- **Verification requirement:** restore drills must actually be performed and timed at least once before go-live — a backup strategy that has never been restored from is not a verified backup strategy (this is a hard requirement per §40's testing contract, not optional documentation).

---

## 30. Deployment & Rollback

Deploy: build a new image tag, run database migrations (Payload's schema push, since Payload manages its own schema against the configured collections — no hand-written SQL migrations expected at this scale), swap the `app` container via `docker compose up -d app` with the health-checked dependency on `db` already satisfied, verify via the smoke-test pass (§29). Rollback: redeploy the previous image tag; because Payload's schema changes are additive in the common case (new optional fields), most rollbacks will not require a database rollback — a destructive schema change (field removal/rename) requires a documented, tested down-migration path before it ships, not an assumption that rollback is always safe.

---

## 31. Monitoring

`@sentry/nextjs` captures unhandled exceptions on both server and client, tagged with locale/route for triage. Caddy/Docker-level uptime monitoring (exact provider — 🔴 not specified by the owner, not invented here) should alert on the `app`/`db`/`caddy` health checks defined in §27. Core Web Vitals field data collection (§24) feeds into whichever analytics platform is ultimately activated (PRODUCT.md §34).

---

## 32. Dependency Risks

| Risk | Detail | Status |
|---|---|---|
| Payload `@payloadcms/next`'s `webpack()` hook vs. Next.js 16's Turbopack default | Documented community compatibility issue (§5); may require forcing webpack mode for the dev/build pipeline (`next dev --webpack` style) until Payload ships a Turbopack-native integration, or pinning to a Next.js 16.2.x patch confirmed compatible | **BLOCKED — re-verify at implementation kickoff against the exact Payload/Next versions available that day** |
| `@react-three/drei` + React 19/R3F v9 pairing | Still an active community compatibility discussion, not a fully closed question as of this verification date | VERIFY-AT-IMPLEMENTATION |
| React 19.3 vs. R3F's confirmed 19.0–19.2 support window | Conflicting search signals found (§4) | VERIFY-AT-IMPLEMENTATION — pin React to 19.2.x unless R3F's own docs confirm 19.3 support by implementation time |
| `@gsap/react` registry staleness signal | Snapshot showed "last published 2 years ago," unusual for an active ecosystem — may indicate the search tool returned cached/incomplete registry data rather than an actually-stale package | VERIFY-AT-IMPLEMENTATION |
| Node 24 vs. Node 26 LTS timing | Node 26 becomes Active LTS 2026-10-28, which may fall before or after the actual implementation start date depending on scheduling | VERIFY-AT-IMPLEMENTATION |

None of these risks block the *documentation* phase; all are logged so the implementation phase does not silently discover them mid-build.

---

## 33. Owner Decision Register

Carried forward from PRODUCT.md §34 plus technical-infrastructure-specific additions:

| Decision | Status | Blocks |
|---|---|---|
| Backup destination (S3-compatible bucket vs. remote host vs. other) | 🔴 | §29 |
| Uptime-monitoring provider | 🔴 | §31 |
| Canonical production domain (`rakmyat.com` vs. `rakmyat.online`, neither confirmed) | 🔴 | §28; blocks production Caddyfile/sitemap/canonical-URL instantiation, not local development |
| `www` vs. apex domain canonicalization preference (depends on the above being resolved first) | 🔴 | §28 |
| CAPTCHA/third-party spam tooling (beyond honeypot + rate limiting) approval, if ever desired | 🟡 not currently planned, needs explicit ask if owner wants it | §21 |
| Admin-panel IP allowlisting at the Caddy layer | 🟡 recommended if static IPs exist | §21 |
| External lead-delivery destination (email/CRM/webhook) | 🔴 (carried from PRODUCT.md §34) | §20 |
| All items already listed in PRODUCT.md §34 (logo, contact details, legal entity, privacy text, approved projects, analytics vendor, numeral preference, target countries, booking tool) | 🔴/🟡 (unchanged) | Various, see PRODUCT.md §34 |

**Payload/Next.js Turbopack compatibility (§32)** is also logged here as the one item that is a pure technical-verification task (not an owner input) but still blocks a clean implementation start until checked.

---

## 34. Implementation Readiness Checklist

- [x] Technology stack matches Phase 02 prompt §5 exactly, no substitutions (§3, §6).
- [x] Every package has a researched version with a cited source, or is explicitly marked UNVERIFIED/VERIFY-AT-IMPLEMENTATION rather than invented (§4–§5).
- [x] No contradiction found between PRODUCT.md, DESIGN.md, and this prompt (§2); one genuine upstream dependency risk logged, not silently resolved (§32–§33).
- [x] Directory structure, component boundaries, and routing map directly to PRODUCT.md/DESIGN.md's locked decisions with no new UX invented (§9–§13).
- [x] Security, SEO, analytics, performance, accessibility, and testing contracts all reference the exact requirements already locked in PRODUCT.md/DESIGN.md/the prompt, adding only engineering mechanics (§21–§26).
- [x] Backup/restore, deployment/rollback, and monitoring are documented as real operational procedures, not hand-waved (§29–§31).
- [x] All missing real-world/infra inputs are logged in §33, not assumed.
- [ ] **Pending before implementation can begin:** re-verification of every `VERIFY-AT-IMPLEMENTATION`/`UNVERIFIED` row in §4 against the live registries on the actual start date, and resolution of the Payload/Turbopack risk (§32).

No PLAN.md, TASKS.md, or SpecKit files were created. No application source, components, CSS, Tailwind config, package manifests, Dockerfiles, compose files, migrations, test files, or assets were created. PRODUCT.md and DESIGN.md were read in full and were not modified.

---

## 35. Asset Generation Pipeline (Phase 03 Addendum)

Documents the technical mechanism behind DESIGN.md §42's asset-generation authorization:

- **Procedural 3D** (Signature Sculptural 3D, DESIGN.md §13): constructed as Three.js/R3F geometry, materials, and lighting in code — the already-locked stack (§3/§16) supports this natively; no separate 3D-modeling tool or file format is required as a hard dependency, though an externally-authored model remains an acceptable alternative if produced later.
- **AI-generated imagery** (abstract/editorial backgrounds, conceptual imagery only — never real client work): 🔴 SPECIFICATION GAP — no image-generation vendor/API is locked by the Phase 02 prompt's technology stack (§3/§5); the implementation agent uses whatever generation tool its environment provides and tags the output via CMS-SCHEMAS.md §9.1's `provenance: ai-generated` field. If no such tool is available in a given environment, fall back to custom SVG/CSS/procedural construction (next bullet) rather than stock photography (DESIGN.md §16's hard prohibition).
- **Custom SVG/CSS construction** (diagrams, icons, surface-treatment textures per DESIGN.md §5.5, the oversized-numeral device per §18.22): produced as code, optimized before shipping (SVGO-equivalent minification), delivered through the same `next/image`/media pipeline as any other asset (§24) — generation method does not create a second delivery path.
- Every generated asset is still subject to the existing performance budgets (§24/DESIGN.md §33) and accessibility-equivalent-text requirements (§25/DESIGN.md §32) regardless of how it was produced.

## 36. Visual QA Tooling (Phase 03 Addendum)

Extends the testing contract (§26) to support the new visual-quality gates (VISUAL-QUALITY-GATES.md):

- Playwright is additionally configured to capture full-page and per-section screenshots at 1440px/768px/390px, in both locales, in both the default-motion and `prefers-reduced-motion: reduce` states, and after animation-settle (a fixed wait or an explicit "animation complete" signal from the component) — feeding the Full-Page Visual QA process (VISUAL-QUALITY-GATES.md §6) and the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5).
- A visual-regression baseline (screenshot diffing against the first owner-approved prototype) is recommended once that prototype exists, to catch unintended drift on later changes — exact mechanism (Playwright's built-in snapshot assertions vs. a dedicated visual-diff service) is an implementation-time choice, not locked here.
- **Binding caveat:** these tools catch technical regressions (a missing image, a broken layout, unintended overflow, a contrast failure) — none of them, individually or combined, certify "premium" visual quality. That judgment remains a human sign-off step (VISUAL-QUALITY-GATES.md §4/§9) and is never satisfied by a passing Lighthouse, Playwright, or axe-core run alone.
