# KINNOV'ART DESIGN AUDIT

> Original audit generated: 2026-08-26
> **Status verified: 2026-09-28** — every item below was re-checked against the code and against a
> live SSR build, not against commit messages.

## Why this document was rewritten

Commit `c017e31` was titled *"resolve all 50 design audit issues (C1-C8, H1-H10, M1-M12, L1-L20)"*.
Independent verification found **21 fixed, 13 partial, 16 not fixed** — and 13 further issues the
original audit never caught, one of which was a regression *introduced by that very commit*.

Seven items the commit explicitly claimed as fixed were not fixed. This document carries a
`Status` line on every item. **Do not trust a commit message here — trust the Status field.**

Legend: `DONE` = verified fixed · `PARTIAL` = some of the fix landed · `OPEN` = not fixed

---

## Current scorecard

| Severity | Total | Done | Partial | Open |
|----------|-------|------|---------|------|
| CRITICAL | 8 | 8 | 0 | 0 |
| HIGH | 10 | 10 | 0 | 0 |
| MEDIUM | 12 | 12 | 0 | 0 |
| LOW | 20 | 18 | 1 | 1 |
| **Total** | **50** | **48** | **1** | **1** |

Plus **18 newly-found issues** (N1-N18) in section 5, all closed.

### What remains

| ID | Item | Why it is not simply "done" |
|----|------|------------------------------|
| L10 | `MediaCard` title colour | Accepted by design: white over a permanently dark image overlay, so there is no theme-dependent contrast failure. Needs a product decision to change, not a bug fix. |
| L18 | Loading/skeleton states | `NuxtErrorBoundary` is in place. `Suspense`/`useAsyncData`/`.skeleton` are unused **because the site fetches nothing** — all data is module-scoped. There is no async state to represent. |

---

## 1. CRITICAL Issues

### C1. Broken dark mode gray scale
**File:** `assets/scss/_theme.scss`
**Status:** DONE — full gray-50→900 inverted scale defined for `[data-theme="dark"]`.

### C2. Undefined CSS variable `--color-gray-50`
**File:** `assets/scss/_theme.scss`
**Status:** DONE — defined for both themes; consumer in `Header.vue` resolves.

### C3. Unused `tag` computed property
**File:** `components/ui/Button.vue`
**Status:** DONE — removed; `script setup` now only declares props.

### C4. Card image hover zoom dead (CSS/DOM mismatch)
**File:** `components/ui/Card.vue`
**Status:** DONE — wrapper div added, aspect-ratio trick and hover zoom now match the DOM.

### C5. Scroll animation never re-initialises on route change
**Files:** `plugins/scroll-observer.client.ts`
**Status:** DONE — the duplicate observer was eliminated. `composables/useScrollAnimation.ts` was
**deleted**; a single app-wide `IntersectionObserver` lives in the plugin, which re-initialises on
`page:finish`. Verified: no source file still references the removed composable.

### C6. Blog filter category mismatch
**Files:** `pages/blog/index.vue`, `components/layout/Header.vue`, `i18n/locales/*.json`
**Status:** DONE — the root cause was that i18n keys didn't match the data keys that drive routes.
Locale files were renamed to match data (`artProjects`→`art`, `newTalents`→`new`,
`tutorials`→`event`). This simultaneously fixed 4 dead header links (N4), 2 missing keys (N2/N3),
and the dynamic badge lookups in `index.vue` / `gallery/index.vue` / `blog/index.vue`.

### C7. `--color-accent-yellow` defined but never used
**File:** `assets/scss/_theme.scss`
**Status:** DONE — removed.

### C8. `--shadow-color` defined but never used
**Files:** `assets/scss/_theme.scss`, `assets/scss/_variables.scss`
**Status:** DONE — shadows now reference the token. See H1 for the incomplete part.

---

## 2. HIGH Issues

### H1. Hardcoded shadows don't adapt to dark mode
**File:** `assets/scss/_variables.scss`
**Status:** DONE — the remaining `var(--shadow-sm)` consumer was migrated. The raw
`box-shadow` values still present in the codebase are intentional and are **not** token drift:
focus rings, the gold glow, and `box-shadow: none` resets. They are per-element effects, not
elevation tokens.

### H2. No focus-visible styling
**Files:** global `main.scss` + interactive components
**Status:** DONE — the dead `rgba(var(--x), a)` ring (N6) was replaced with a working
`color-mix()` ring, and `:focus-visible` styling now exists per-component in `Header`,
`ThemeSwitcher`, `LanguageSwitcher`, `ScrollToTop` and `Footer`.

### H3. Mobile nav has no focus trap
**Files:** `components/layout/Header.vue`, `components/ui/Modal.vue`
**Status:** DONE — `Modal.vue` was rewritten with `role="dialog"`, `aria-modal`, a localized
close label, focus move + restore, Tab/Shift+Tab containment, Escape handling, scroll locking and
unmount cleanup. The header menu gained `aria-expanded`, `aria-controls` and stable panel IDs.

### H4. Footer newsletter form lacks label
**File:** `components/layout/Footer.vue`
**Status:** DONE — `sr-only` label bound via `for`.

### H5. Contact form uses `alert()`
**File:** `pages/contact.vue`
**Status:** DONE — replaced with reactive inline messaging. See L16 for the error path.

### H6. Hero overlay uses leftover colours from the old scheme
**File:** `pages/index.vue`
**Status:** DONE — the overlay is now a `color-mix()` against a theme token, so it shifts with the
theme instead of being a fixed literal.

### H7. Extensive inline styles in templates
**Files:** all pages
**Status:** DONE — zero `style="` attributes remain in any template.

### H8. Social media links point to generic homepages
**File:** `components/layout/Footer.vue`, `nuxt.config.ts`
**Status:** DONE — the guessed URLs are gone. Links are read from
`runtimeConfig.public.social` (overridable with `NUXT_PUBLIC_SOCIAL_*`) and the whole section is
hidden when nothing is configured, so no dead link can ship. `linkedin` was added to the config so
all four icons in `SOCIAL_ICONS` are actually settable (N18).
**Owner action outstanding:** supply the real profile URLs to enable the section.

### H9. Duplicate/contradictory team member data
**Files:** `pages/about/index.vue`, `pages/about/[section].vue`
**Status:** DONE — one roster in `composables/useTeam.ts`, typed by the previously-unused
`TeamMember` type, rendered on both pages through `components/ui/TeamGrid.vue`.

### H10. `useHead` titles are not i18n-aware
**Files:** all pages + `nuxt.config.ts` + `app.vue`
**Status:** DONE — titles and descriptions are locale-reactive, the 4 snapshotting dynamic pages
were converted, `app.vue` uses `useLocaleHead()` for `hreflang`, and `htmlAttrs.lang`/`dir` follow
the active locale. Verified by SSR: `/` returns `lang="fr"`, `/en/` returns `lang="en"`, and every
page has a localized title/description with exactly one `| Kinnov'art` suffix.

---

## 3. MEDIUM Issues

### M1. Scroll animation on sub-pages
**Status:** DONE — same root cause as C5; resolved by the single consolidated observer.

### M2. Duplicated page-header CSS across 5+ pages
**Files:** `components/ui/PageHeader.vue` + 7 consuming pages
**Status:** DONE — `PageHeader.vue` extracted and adopted by the gallery, creators, blog, about and
contact pages. This also fixed a contrast failure the duplicated copies shared: gold title on light
gray measured **1.91:1**, and white subtitle on gold **2.10:1**. The component now renders
black-on-gold titles (**9.99:1**) and muted-theme subtitles.

### M3. Active filter tab used black in dark mode
**Status:** DONE — all three index pages use `var(--color-primary)`.

### M4. Header mobile dropdown negative-margin bleed
**Status:** DONE — negative margins removed.

### M5. Emoji map markers
**Status:** DONE — inline SVG pin replaces 📍 in both places.

### M6. Footer logo `mix-blend-mode: multiply` breaks in dark mode
**Status:** DONE for the footer. **Note:** the identical bug still exists on the *header* logo
(`components/layout/Header.vue`) — see N7.

### M7. Blog badge showed raw category key
**Status:** DONE — now `$t(\`blog.${post.category}\`)`.

### M8. Non-functional responsive grid classes
**Status:** DONE at that one call site (`.team-grid` added). The same class of bug still affects
other pages — see N5.

### M9. Unnecessary manual component imports in layout
**Status:** DONE — `layouts/default.vue` has an empty `script setup`.

### M10. Developer comments in production code
**File:** `components/ui/HorizontalCard.vue`
**Status:** DONE — dead `color: #FF6B6B` and the misleading comments (including the factually wrong
"Dark blue usually") were removed.

### M11. Duplicate `.grid` gap rules
**Files:** `pages/about/index.vue`, `pages/about/[section].vue`
**Status:** DONE — rather than renaming the rule a third time, the duplicated grid markup and CSS
were removed entirely and both pages now render `components/ui/TeamGrid.vue`. The team-name
contrast failure this masked was fixed at the same time (gold on white was **2.10:1**).

### M12. Sub-page titles missing responsive sizing
**Status:** DONE — all three dynamic sub-pages gained `respond-to('md')`.

---

## 4. LOW Issues

### L1. README colour values outdated
**File:** `README.md`
**Status:** DONE — now documents `#D4AF37` gold, `#000000` black, `#B91C1C` deep red, plus dark mode.

### L2. README copyright says "© 2024"
**Status:** DONE — README and the `footer.rights` key now agree (2026). Verified in SSR output.

### L3. Duplicate `scroll-behavior: smooth`
**Status:** DONE — single copy remains (verified: 1 occurrence).

### L4. Non-standard `::-moz-selection`
**Status:** DONE — removed (verified: 0 occurrences).

### L5. Unused animations/keyframes
**File:** `assets/scss/_animations.scss`
**Status:** DONE — the `@keyframes shimmer` regression is fixed and `.skeleton` animates again.
**The audit was wrong about `bounce`**: it is live and must be kept. `flex-start`, `small-text` and
`spinner` are also in real use.

### L6. Unused SCSS mixins
**File:** `assets/scss/_mixins.scss`
**Status:** DONE — the audit's list was unreliable. A repo-wide usage check found **every** mixin in
the file is referenced, so nothing was deleted. The bounce/shimmer reference removal from L5 also
removed the last dead `@keyframes` include references.

### L7. HorizontalCard action text hardcoded French
**Status:** DONE — default is now English.

### L8. HorizontalCard uses non-theme-aware `--color-white`
**Status:** DONE — now `var(--color-surface)`.

### L9. MediaCard default `to` is `'#'`
**Files:** `components/ui/MediaCard.vue`, `components/ui/HorizontalCard.vue`
**Status:** DONE — `to` is now a **required** prop. Both call sites (`pages/index.vue`) already
passed it, so nothing broke. Verified in SSR: zero `href="#"` links remain.

### L10. MediaCard title always white
**Status:** OPEN (accepted by design) — the title sits over a permanently dark image overlay, so
white is correct in both themes and there is no contrast defect. Left as-is deliberately; see the
scorecard. Recorded here so it is not mistaken for an oversight.

### L11. `Section.vue` padding-none fragile interaction
**File:** `components/ui/Section.vue`
**Status:** DONE — the real defect was not the `padding-none`/`overflow: hidden` pairing but
`PageHeader` rendering its own `.container` inside `Section`'s default `.container`, which
double-constrained the header width. `PageHeader` now passes `:container="false"`.
Verified in SSR: no nested `.container` on any route.

### L12. Contact page map is a static stock photo
**Files:** `components/ui/LocationMap.vue`, `pages/about/index.vue`, `pages/contact.vue`
**Status:** DONE — the stock photo that was captioned `alt="Map"` but showed a different place is
replaced by a real, interactive OpenStreetMap embed with a localized "open in maps" link. The
provider is swappable via `runtimeConfig.public.map`, and setting `embedUrl: ''` hides the map.
**Owner action outstanding:** confirm the exact coordinates (default is an approximation of
Nongo) and that OSM embedding is acceptable.

### L13. About page body text hardcoded French
**Status:** DONE — moved to `about.missionBody`.

### L14. About sub-page content hardcoded French
**File:** `pages/about/[section].vue`
**Status:** DONE — all headings, paragraphs and team content moved into the locale files and the
shared `TeamGrid` component.

### L15. Footer newsletter text duplicated the title
**Status:** DONE — distinct `newsletterDesc` key added.

### L16. Contact form missing inline feedback
**Status:** DONE — the form validates, then hands off to a real
`mailto:contact@kinnovart.com` with subject/body prefilled, and the success copy states plainly that
the mail app is open and the user must press send. Errors render inline via `role="alert"`. There
is still no backend; a real submission endpoint remains future work.

### L17. `setTimeout` hack in scroll animation
**File:** `plugins/scroll-observer.client.ts`
**Status:** DONE — the `setTimeout(…, 100)` and `setTimeout(…, 500)` fallbacks are gone; the plugin
uses `nextTick` and re-observes on `page:finish`.

### L18. No loading/skeleton states
**Files:** `app.vue`
**Status:** PARTIAL — `NuxtErrorBoundary` now wraps the app. `Suspense`/`useAsyncData`/`.skeleton`
remain unused, but **the site performs no async fetching**: every dataset is module-scoped, so
there is no pending state to visualise. Adding skeletons would mean inventing a loading phase that
never occurs.

### L19. `useData.ts` recreates arrays on every call
**File:** `composables/useData.ts`
**Status:** DONE — arrays hoisted to module scope, so identity is stable across calls and no
`useState` SSR-sharing workaround is needed.

### L20. Gallery lightbox not keyboard-accessible
**Status:** DONE — `role="button"`, `tabindex="0"`, `@keydown.enter` present.

---

## 5. NEW issues found during verification (not in the original audit)

| ID | Issue | Status |
|----|-------|--------|
| N1 | `.skeleton` animated a `@keyframes shimmer` that `c017e31` had deleted — dead CSS **introduced by the fix commit** | DONE |
| N2 | `creators.viewAll` missing from both locales — rendered the literal string `creators.viewAll` on screen | DONE |
| N3 | `gallery.art` missing — any art-category project rendered a raw `gallery.art` badge | DONE |
| N4 | 4 of 12 header dropdown links led to empty states (`/gallery/art-projects`, `/creators/new-talents`, `/blog/tutorials`, `/blog/events`) | DONE |
| N5 | Undefined utility classes `.text-xl`, `.text-gray-500`, `.py-12`, `.mt-4`, `.mb-8` used across 4 pages | DONE — replaced with shared semantic classes plus a global `.empty-state` |
| N6 | `rgba(var(--x), a)` is invalid CSS — 3 sites silently dropped: input focus ring, `.hover-glow`, `.info-icon`. This also silently defeated the H2 fix | DONE |
| N7 | `mix-blend-mode: multiply` still on the **header** logo (M6 only fixed the footer) — made `/logo.jpeg` invisible against the dark header | DONE — blend mode removed |
| N8 | `htmlAttrs.lang` hardcoded to `'fr'` — switching to English leaves `<html lang="fr">`, breaking screen-reader pronunciation | DONE — verified `fr` on `/` and `en` on `/en/` |
| N9 | Untranslated `specialty` strings ('Furniture Design', 'Painting') surfaced as card badges on the French site | DONE |
| N10 | Contact form never sent anything — users received false confirmation | DONE (see L16) |
| N11 | `console.log` wrote subscriber emails to the browser console | DONE |
| N12 | Rename leftovers: `useHead` title still says "Artists", plus stale `<!-- Artists -->` comments | DONE (internal `useArtists` identifiers intentionally kept) |
| N13 | `@nuxt/image` is a **devDependency** but required at runtime — a production-only install will break | DONE — see N16 for the part that was still broken |
| N14 | `LocationMap.vue` called `$t('about.openInMaps')` but the key only existed at `common.openInMaps` — the contact page rendered a **raw i18n key in both languages** | DONE — reference corrected |
| N15 | `PageHeader` rendered its own `.container` inside `Section`'s default `.container`, double-constraining every page header | DONE (see L11) |
| N16 | `package-lock.json` still listed `@nuxt/image` under `devDependencies` with `dev: true` after the N13 move — `npm ci --omit=dev` would have **skipped a runtime dependency** and broken the production build | DONE — lockfile resynced, both dependency sets verified identical to `package.json` |
| N17 | `en.json` and `fr.json` had drifted: 8 unused legacy `home.*` service keys in one locale, and 5 misindented keys (`nav.openMenu/closeMenu/mainNav`, `common.dialog/openInMaps`) inserted at the wrong indentation | DONE — both locales now hold **153 identical keys**, and all 91 referenced keys resolve in both |
| N18 | `SOCIAL_ICONS` rendered 4 networks but `runtimeConfig.public.social` only declared 3 — LinkedIn could never be configured | DONE — `linkedin: ''` added |

---

## Verification performed (2026-09-28)

- `npm run build` — clean, exit 0, no Sass or TypeScript errors.
- **SSR smoke test: 38 routes** (19 paths × `fr` + `en`) — all HTTP 200, correct `<html lang>`,
  **zero raw i18n keys** in any rendered body.
- i18n key parity — `en` 153 / `fr` 153, `Compare-Object` diff empty; 91 referenced keys resolve in
  both locales.
- Nested `.container` check across all rendered HTML — none.
- `href="#"` dead links — none.
- Social section — correctly hidden by default (renders a `v-if` placeholder, no elements).
- U+FFFD / mojibake scan over all `.vue`, `.ts`, `.json`, `.scss`, `.md` — 0 files affected.
- `git diff --check` — clean.
- Colour contrast recomputed for the components that failed it: 1.91:1 → 9.99:1 (page header),
  2.10:1 → accessible (header subtitle and team names).

## Recommended fix order for what remains

1. **L10** — confirm the white `MediaCard` title is intended; if so, close the item as
   accepted-by-design rather than leaving it permanently open.
2. **L18** — if async data is ever introduced (a CMS, an API, a booking backend), add
   `useAsyncData` + `.skeleton` at that point. No action needed while the site is fully static.
3. **Owner inputs** — real social URLs (H8), the authoritative team roster (H9), and the exact map
   coordinates/provider (L12). None of these block the build; the site is designed to degrade
   gracefully without them.
