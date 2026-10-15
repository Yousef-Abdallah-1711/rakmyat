# Phase 01 screenshot set

Captured 2026-10-15 from the local app at `http://127.0.0.1:3101` with Playwright. These files cover every current browser UI route: the English and Arabic foundation pages at the three viewport sizes in `VISUAL-QUALITY-GATES.md`, the root route after locale negotiation, and Payload's initial admin-user setup screen. The Next.js development indicator is hidden in the captured images only.

| Screenshot | Route | Viewport | Result |
|---|---|---:|---|
| `en-1440x900.png` | `/en` | 1440 × 900 | HTTP 200 |
| `en-768x1024.png` | `/en` | 768 × 1024 | HTTP 200 |
| `en-390x844.png` | `/en` | 390 × 844 | HTTP 200 |
| `ar-1440x900.png` | `/ar` | 1440 × 900 | HTTP 200 |
| `ar-768x1024.png` | `/ar` | 768 × 1024 | HTTP 200 |
| `ar-390x844.png` | `/ar` | 390 × 844 | HTTP 200 |
| `root-redirect-1440x900.png` | `/` → `/en` | 1440 × 900 | HTTP 200 after redirect |
| `admin-first-user-1440x900.png` | `/admin` → `/admin/create-first-user` | 1440 × 900 | HTTP 200; first-user form shown |
| `admin-blocked-1440x900.png` | Legacy capture of the same first-user screen | 1440 × 900 | Superseded by the post-closure capture above |

These are screenshots of the current Phase 01 implementation. The designed marketing pages and visual-prototype sections are not implemented yet, so they are not represented here.
