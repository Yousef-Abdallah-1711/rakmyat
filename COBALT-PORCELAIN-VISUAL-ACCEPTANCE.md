# RAKMYAT — COBALT-PORCELAIN-VISUAL-ACCEPTANCE.md
### Phase 03B — Focused Acceptance Checklist for the Cobalt Blue & Porcelain Identity

**Status:** Documentation only.
**Relationship to VISUAL-QUALITY-GATES.md:** that document defines the *process* (six sequential gates, roles, sign-off) and is palette-independent — it was not rewritten for this migration because it didn't need to be. **This document is the identity-specific pass/fail checklist** the Visual Prototype Gate (VISUAL-QUALITY-GATES.md §5) and Full-Page Visual QA (§6) are actually scored against for the Cobalt Blue & Porcelain identity specifically. Use both together: VISUAL-QUALITY-GATES.md tells you *when* to check; this document tells you *what "pass" means* for this palette.

---

## 1. Hero Visual Acceptance Criteria (HOME-01)

| # | Criterion | Pass condition |
|---|---|---|
| H1 | Porcelain canvas | Background is `color.bg.page` — not tinted, not dark, not a gradient toward any dark tone |
| H2 | Sculpture material read | At least three distinct materials (cobalt enamel, polished ceramic, brushed metal, translucent cobalt glass) are visually distinguishable in a static screenshot — not a single flat-shaded color |
| H3 | Grounding (replaces the old glow-bleed test) | The sculpture casts a visible, soft shadow onto the porcelain surface AND reflects a faint cobalt tint onto an adjacent surface — **fail if the object looks cut out and pasted onto a flat background** |
| H4 | Vertical alignment | Sculpture's optical center aligns with the headline block's cap-height midline, ±10% of headline block height, at ≥1280px |
| H5 | Disconnection Test | Delete the sculpture from the screenshot (mentally or via a design tool). If the headline/subhead/CTA cluster looks equally complete without it, **fail** |
| H6 | Cobalt restraint | Cobalt at full saturation ≤10% of the hero viewport, concentrated in the sculpture + primary CTA — not washed across the background |
| H7 | Headline weight | `color.ink.primary` used for the headline, `color.ink.secondary` for the subhead — not the reverse, not both at `ink.primary` |
| H8 | Both CTAs interactive immediately | No layout shift, no animation gating access, from first paint |
| H9 | RTL recomposition | Arabic hero repositions the sculpture (not mirrors it), with the shadow/reflection direction re-aimed toward the Arabic headline's position |
| H10 | Mobile grounding fallback | The mobile static/video fallback preserves the same material read and grounding (shadow visible in the static image, not just the live 3D render) |

---

## 2. Homepage Section Visual Criteria (HOME-02 through HOME-08)

| Section | Must-pass check specific to this identity |
|---|---|
| HOME-02 Selected Work | Background is `color.bg.page` (not tinted) — real screenshots must sit on the most neutral possible canvas |
| HOME-03 What We Create | Background is `color.bg.section.tinted`; oversized numeral renders at `color.ink.muted` 6–10% opacity (not the old 8–12% dark-theme range) — verify visually, a numeral at the old opacity value will look too heavy on light |
| HOME-04 Systems in Motion | **Background is `color.bg.section.dark` — this is the one section where porcelain is the wrong answer.** Verify the particle field's self-illumination genuinely reads as light/energy against the dark backdrop, not muddy. All text in this section uses `color.ink.onDark`/`color.ink.onDark.secondary`, never `ink.primary`/`ink.secondary` (those are calibrated for light backgrounds and will fail contrast on dark cobalt) |
| HOME-05 Engineering Behind the Experience | Background is `color.bg.section.tinted`; diagram reads as a light blueprint (white/pale-blue modules, cobalt lines) — fail if it still looks like a dark panel with a color swap |
| HOME-06 From Vision to Reality | Background is `color.bg.page` |
| HOME-07 Rakmyat Philosophy | Background is `color.bg.page`, no texture beyond what §5.5 mandates for any large flat section — this is the "quietest section," verify it reads as a deliberate pause, not a gap |
| HOME-08 Final Conversion | **Background is `color.bg.section.dark` — the second and last deliberate dark section.** Primary CTA uses the **inverted** treatment (white fill, cobalt-deep text) — fail if the standard cobalt-fill/white-text button is used here, since that would under-perform against an already-cobalt background |

**Cross-section check:** exactly two of the eight sections are dark (HOME-04, HOME-08), and they are not adjacent. Any build with a third dark section, or with HOME-04/08 lightened to porcelain, fails this checklist regardless of how either individual section looks in isolation.

---

## 3. Component Quality Criteria

| Component | Pass condition specific to this identity |
|---|---|
| Primary Button (§18.4) | Hover **deepens** toward `color.cobalt.deep` — fail if hover lightens (that was the correct direction for the old dark-theme button; it is wrong here) |
| Secondary Button (§18.5) | Hover fill is a very light cobalt tint (`rgba(36,83,255,0.06)`) — fail if this reads as a visible "block" rather than a subtle wash |
| Form fields (§18.12) | Border uses `color.border.interactive` (`#6D82B8`), **not** `color.border.hairline` (`#DCE3F1`) — fail if the decorative hairline token is used on an interactive element; verified interactive-border contrast is at least 3.39:1 on approved light surfaces |
| Cards/showcases (§18.9) | Elevation reads via shadow (`shadow.sm`→`shadow.md` on hover), not via a color/fill change — fail if a card is indistinguishable from its background without zooming in on the shadow |
| Header (§18.1) | Solid state after scroll shows a `color.border.hairline` bottom edge — fail if the header has no defining edge once opaque (a light header separating from a light page needs this; the old dark header didn't) |
| Classification badges (§18.9/§29) | Real Client Project badge uses `color.cobalt.signature`; Concept/Demo uses `color.state.warning` (`#B45309`, the new deep-amber value) — fail if the old light-amber dark-theme value is reused, since it will under-perform on the white badge pill |
| Loading skeletons (§18.19) | Skeleton blocks are `color.surface.tinted` (a pale-blue tint against the page), pulsing 0.6↔1 opacity — fail if skeletons render as light-on-light with no visible pulse |

---

## 4. Arabic and English Checks (identity-specific additions to the standing RTL/LTR QA)

| # | Check |
|---|---|
| A1 | Arabic headline color is `color.ink.primary`, body is `color.ink.secondary` — same rule as English (§6.2/§7.3), verified independently in an Arabic screenshot, not assumed from the English pass |
| A2 | Arabic hero's shadow/reflection direction (H9 above) is independently verified, not assumed mirrored from English |
| A3 | Arabic numeral device (§18.22) opacity reads correctly against `color.ink.muted` — Arabic numerals (Western Arabic numerals per the standing rule) must be equally legible/faint as the English version at the same opacity |
| A4 | HOME-04's on-dark Arabic text (`ink.onDark`) is checked for Arabic glyph legibility against `color.bg.section.dark` specifically — white-on-cobalt-deep contrast is high (≈9.3:1) but glyph-shaping legibility at weight/size extremes should still get a real-browser look, not be assumed from the contrast number alone |

---

## 5. Desktop / Tablet / Mobile Checks

| Breakpoint | Identity-specific check |
|---|---|
| 1440px (desktop) | Full material read on the sculpture (H2); full particle density on HOME-04; all surface treatments (§5.5) visible |
| 768px (tablet) | Sculpture reduced-scale but still grounded (shadow still visible, not cropped away); HOME-04 particle density may reduce but the dark background must not lighten |
| 390px (mobile) | Sculpture replaced by the static/video fallback (H10); HOME-04 uses the pre-baked sprite/Canvas2D fallback **on the same dark background** — fail if the mobile fallback for HOME-04 renders on a light background, since the particle colors were tuned specifically for a dark backdrop and will look washed-out/illegible on porcelain |

---

## 6. Motion and Static-State Checks

| # | Check |
|---|---|
| M1 | `prefers-reduced-motion` screenshot of HOME-01 shows the sculpture's final-resolved frame **with its grounding shadow already visible** — not a motion-dependent reveal of the shadow |
| M2 | `prefers-reduced-motion` screenshot of HOME-04 shows a static 3-frame stepped sequence **on the dark background**, not a light fallback |
| M3 | Button hover-direction (deepen, not lighten — §3 above) is verified in an actual recorded interaction, not just read from the token table |
| M4 | Section-to-section transition blend zones (80–120px, 120–160px into/out of the two dark sections) are visually smooth in a full-page scroll screenshot — no visible hard seam at the light↔dark boundaries specifically (these are the highest-risk seams in the whole site, since the lightness jump is largest there) |

---

## 7. Asset Quality Checks

| # | Check |
|---|---|
| Q1 | No asset anywhere uses a hex value from the retired Navy/Cyan/Obsidian palette (`#03070D`, `#0A1830`, `#23374B`, `#62E5F0`, `#F5FAFF`) — a direct value audit, not just a visual impression |
| Q2 | Every produced asset is tagged with its `provenance` value (CMS-SCHEMAS.md §9.1) before it ships, per the standing Phase 03 rule, unaffected by this migration |
| Q3 | The sculpture's cast-shadow/reflection rendering is evaluated as its own quality bar, independent of the old rim-light asset's quality bar — do not grade the new asset against expectations set by the old lighting model |
| Q4 | Diagram SVGs (service pages) show the light-blueprint treatment consistently across all three service-detail instances — no instance left in a dark-panel state from before the migration |

---

## 8. Pass/Fail Definition for the Visual Prototype Gate

The six-element prototype (GLOBAL-HEADER, HOME-01, HOME-02, HOME-03, HOME-04, GLOBAL-FOOTER — per VISUAL-QUALITY-GATES.md §5/PAGE-BLUEPRINTS.md §31.2) is scored against this document as follows:

- **PASS:** every applicable row in §1–§7 above is satisfied for the six elements in scope, at all three required viewports, in both locales, including the reduced-motion variants of HOME-01 and HOME-04.
- **CONDITIONAL PASS:** no criterion above fails outright, but one or more 🟡-flagged items from COBALT-PORCELAIN-MIGRATION-REPORT.md §9 (e.g., the hand-computed contrast ratios) have not yet been re-verified with an automated tool — owner may approve the prototype's *direction* while requiring that verification before full-page rollout.
- **FAIL:** any §1–§7 row marked "fail if..." above is observed in the actual screenshots. The prototype returns to the implementation agent with the specific failing row cited — not a general "make it better" note.

No page beyond the six-element prototype is built until a PASS or an explicit owner-approved CONDITIONAL PASS is recorded, consistent with VISUAL-QUALITY-GATES.md §5's hard-checkpoint rule, which this document does not weaken.
