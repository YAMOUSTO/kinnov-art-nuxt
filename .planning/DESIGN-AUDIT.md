# KINNOV'ART DESIGN AUDIT
> Generated: 2026-08-26 | Scope: Full design, styling, and functionality review

---

## 1. CRITICAL Issues (Must Fix)

### C1. Broken dark mode gray scale
**File:** `assets/scss/_theme.scss:72-77`
Dark mode only redefines `gray-100`, `gray-200`, `gray-300`, `gray-800`, `gray-900`. Gray-400 through gray-700 remain light-mode values, creating a jarring mix.
**Fix:** Define the complete gray scale for dark mode.

### C2. Undefined CSS variable `--color-gray-50`
**File:** `components/layout/Header.vue:381`
Mobile dropdown uses `background: var(--color-gray-50)` but this variable is never defined.
**Fix:** Add `--color-gray-50: #F9FAFB;` (light) and `--color-gray-50: #1A1A1A;` (dark) to `_theme.scss`.

### C3. Unused `tag` computed property / dead code
**File:** `components/ui/Button.vue:53`
`const tag = computed(...)` is computed but never used in the template.
**Fix:** Remove the unused computed property.

### C4. Card image hover zoom is dead — CSS selector mismatch
**File:** `components/ui/Card.vue:64-82`
CSS targets `.card__image-wrapper` but template uses `class="card__image"` with no wrapper. Hover zoom and aspect-ratio trick are broken.
**Fix:** Add a wrapper div or restructure CSS to match the DOM.

### C5. Scroll animation never re-initializes on route change
**File:** `composables/useScrollAnimation.ts:36-43` + `app.vue:12`
Observer runs once at mount. New `.scroll-reveal` elements on SPA navigation are never observed.
**Fix:** Use `useRouter().afterEach()` or `useRoute()` watcher to re-run observer after navigation.

### C6. Blog filter category mismatch — filter broken
**File:** `pages/blog/index.vue:69` vs `composables/useData.ts:211`
Filter tab uses `'tutorial'` but blog `[category].vue` route param uses different key. `getPostsByCategory('tutorials')` won't find data using `'tutorial'`.
**Fix:** Standardize category keys across data and routes.

### C7. `--color-accent-yellow` defined but never used
**File:** `assets/scss/_theme.scss:19-21`
Three CSS variables defined but never referenced anywhere.
**Fix:** Remove or document as reserved.

### C8. `--shadow-color` CSS variable defined but never used
**File:** `assets/scss/_theme.scss:46,80`
Defined in both themes but shadows use hardcoded `rgba(0,0,0,...)`.
**Fix:** Use `var(--shadow-color)` in shadow definitions or remove.

---

## 2. HIGH Issues (Should Fix)

### H1. Hardcoded shadows don't adapt to dark mode
**File:** `assets/scss/_variables.scss:107-112`
All shadow values use `rgba(0, 0, 0, ...)`. Invisible on dark backgrounds.
**Fix:** Use CSS variables for shadows.

### H2. No focus-visible styling on interactive components
**Files:** `Header.vue`, `ThemeSwitcher.vue`, `LanguageSwitcher.vue`, `ScrollToTop.vue`, `MediaCard.vue`, `gallery/index.vue`
No `:focus-visible` outlines on buttons/links. Keyboard users can't see focus.
**Fix:** Add `:focus-visible` outline to all interactive elements.

### H3. Mobile nav has no focus trap
**File:** `components/layout/Header.vue:264-283`
Focus not trapped inside mobile menu. No `aria-expanded` on dropdown toggles.
**Fix:** Implement focus trap and add ARIA attributes.

### H4. Footer newsletter form lacks label
**File:** `components/layout/Footer.vue:56-67`
Email input has no `<label>`. Placeholder disappears on input.
**Fix:** Add visually-hidden label with `class="sr-only"`.

### H5. Contact form uses `alert()` — blocks UI
**File:** `pages/contact.vue:142`
Native `alert()` is unprofessional. Also hardcoded French.
**Fix:** Replace with reactive success message/toast.

### H6. Hero overlay uses leftover colors from old scheme
**File:** `pages/index.vue:267`
`rgba(46, 64, 87, 0.9)` and `rgba(255, 107, 107, 0.8)` don't match current tokens.
**Fix:** Replace with gradients using `var(--color-primary)`, etc.

### H7. Extensive inline styles in templates
**Files:** `pages/index.vue`, `gallery/index.vue`, `blog/index.vue`, `artists/index.vue`, `about/index.vue`, `contact.vue`
Inline `style="margin-top: 3rem; color: var(--color-accent);"` scattered throughout.
**Fix:** Move all inline styles to scoped SCSS classes.

### H8. Social media links point to generic homepages
**File:** `components/layout/Footer.vue:81-96`
All social links go to `facebook.com`, `instagram.com`, etc. — not actual profiles.
**Fix:** Replace with real URLs or hide until available.

### H9. Duplicate/contradictory team member data
**Files:** `pages/about/index.vue:60-79` vs `pages/about/[section].vue:47-74`
Same roles, different names and photos. Data inconsistency.
**Fix:** Use a single shared composable for team data.

### H10. `useHead` titles are not i18n-aware
**Files:** All page `useHead()` calls
Page titles and meta descriptions stay in French when switching to English.
**Fix:** Use computed values that react to `locale`.

---

## 3. MEDIUM Issues (Nice to Fix)

### M1. Scroll animation never re-initializes (affects sub-pages)
**Files:** `gallery/[category].vue`, `artists/[type].vue`, `blog/[category].vue`, `about/[section].vue`
Same root cause as C5.

### M2. Duplicated page-header CSS across 5+ pages
**Files:** `gallery/index.vue`, `artists/index.vue`, `blog/index.vue`, `about/index.vue`, `contact.vue`
Identical `.page-title`, `.page-subtitle`, `.filter-tabs`, `.filter-tab` copy-pasted.
**Fix:** Extract to shared SCSS partial or create `PageHeader.vue`.

### M3. Active filter tab uses black (`$color-secondary`) — bad in dark mode
**Files:** `gallery/index.vue`, `blog/index.vue`, `artists/index.vue`
Active state inverts to white background in dark mode.
**Fix:** Use `--color-primary` (gold) for active state.

### M4. Header mobile dropdown negative-margin bleed
**File:** `components/layout/Header.vue:384-387`
Negative margins may cause horizontal overflow on narrow screens.
**Fix:** Test on 320px viewport.

### M5. Contact/about pages use emoji 📍 as map marker
**Files:** `pages/contact.vue:107`, `pages/about/index.vue:50`
Inconsistent with SVG icon system.
**Fix:** Use proper SVG pin icon.

### M6. Footer logo `mix-blend-mode: multiply` breaks in dark mode
**File:** `components/layout/Footer.vue:162`
Multiply on gold background produces muddy result.
**Fix:** Use separate logo variants for light/dark.

### M7. Blog `[category].vue` badge shows raw category key
**File:** `pages/blog/[category].vue:19`
Shows `"tutorial"` instead of translated label.
**Fix:** Use `$t(\`blog.${post.category}\`)`.

### M8. Non-functional responsive grid classes
**File:** `pages/about/[section].vue:46`
`md:grid-cols-2 lg:grid-cols-3` classes don't exist in the SCSS utilities.
**Fix:** Use existing grid classes or define missing utilities.

### M9. Nuxt layout manual imports are unnecessary
**File:** `layouts/default.vue:12-13`
Nuxt auto-imports components. Explicit imports are redundant.
**Fix:** Remove the imports.

### M10. HorizontalCard has developer comments in production code
**File:** `components/ui/HorizontalCard.vue:111-118`
SCSS comments and dead `color: #FF6B6B` line.
**Fix:** Remove comments and dead code.

### M11. Duplicate `.grid` gap rules
**File:** `pages/about/[section].vue:142-148`
Overrides global `.grid` gap unnecessarily.
**Fix:** Remove duplicate.

### M12. Sub-page titles missing responsive sizing
**Files:** `gallery/[category].vue`, `blog/[category].vue`, `artists/[type].vue`
`.page-title` has no `@include respond-to('md')` unlike parent pages.
**Fix:** Add responsive breakpoints.

---

## 4. LOW Issues (Polish)

### L1. README color values are outdated
**File:** `README.md:49-51`
Lists `#2E4057` (Deep Blue), `#FF6B6B` (Coral), `#FFD166` (Yellow). Actual tokens are Gold/Black/Red.
**Fix:** Update README.

### L2. README copyright says "© 2024"
**File:** `README.md:77`
**Fix:** Update or make dynamic.

### L3. Duplicate `scroll-behavior: smooth`
**Files:** `main.scss:24` + `_animations.scss:237`
**Fix:** Remove from one location.

### L4. Non-standard `::-moz-selection`
**File:** `main.scss:41-44`
Unsupported since Firefox 62 (2018).
**Fix:** Remove.

### L5. Unused animations/keyframes
**File:** `_animations.scss`
`pulse`, `bounce`, `shimmer`, `slideInLeft`, `slideInRight`, `fadeInDown`, `hover-rotate` never used.
**Fix:** Remove to reduce CSS bundle.

### L6. Unused SCSS mixins
**File:** `_mixins.scss`
`flex-start`, `flex-end`, `flex-column`, `small-text`, `aspect-ratio`, `clearfix`, `overlay`, `truncate`, `line-clamp`, `scale-hover`, `spinner`, `fade-in`, `slide-up` never used.
**Fix:** Audit and remove.

### L7. HorizontalCard action text default is hardcoded French
**File:** `components/ui/HorizontalCard.vue:40`
`actionText: 'Lire Plus'`
**Fix:** Use English default or accept i18n key.

### L8. HorizontalCard uses `var(--color-white)` — not theme-aware
**File:** `components/ui/HorizontalCard.vue:48`
Always `#FFFFFF` even in dark mode.
**Fix:** Change to `var(--color-surface)`.

### L9. MediaCard default `to` is `'#'`
**File:** `components/ui/MediaCard.vue:46`
**Fix:** Make `to` required or handle gracefully.

### L10. MediaCard title always white
**File:** `components/ui/MediaCard.vue:140`
Acceptable given dark overlay, but document constraint.

### L11. Section.vue padding-none fragile interaction
**File:** `components/ui/Section.vue:62-64`
**Fix:** Document or simplify.

### L12. Contact page map is a static stock photo
**File:** `pages/contact.vue:100-111`
Not a functional map.
**Fix:** Integrate real map or use branded static image.

### L13. About page body text is hardcoded French
**File:** `pages/about/index.vue:16-18`
**Fix:** Move to i18n.

### L14. About sub-page content is all hardcoded French
**File:** `pages/about/[section].vue:15-74`
**Fix:** Move to i18n.

### L15. Footer newsletter text duplicates the title
**File:** `components/layout/Footer.vue:55`
Same translation key as `<h4>` above.
**Fix:** Use distinct key.

### L16. Contact form missing inline feedback
**File:** `pages/contact.vue:127-143`
Only `alert()` on success.
**Fix:** Add inline success/error messages.

### L17. `useScrollAnimation` uses `setTimeout(100)` hack
**File:** `composables/useScrollAnimation.ts:38`
**Fix:** Use `nextTick()` or `MutationObserver`.

### L18. No loading/skeleton states
**Files:** All page components
**Fix:** Add `<NuxtErrorBoundary>` and loading states.

### L19. `useData.ts` recreates arrays on every call
**File:** `composables/useData.ts`
Wastes memory during SSR.
**Fix:** Use `useState()` for shared state.

### L20. Gallery lightbox not keyboard-accessible
**File:** `pages/gallery/index.vue:33`
`@click` on div without keyboard support.
**Fix:** Add `role="button"`, `tabindex="0"`, `@keydown.enter`.

---

## Summary

| Severity | Count | Action |
|----------|-------|--------|
| CRITICAL | 8 | Must fix before any new feature work |
| HIGH | 10 | Should fix in next sprint |
| MEDIUM | 12 | Nice to fix, improves consistency |
| LOW | 20 | Polish items, fix opportunistically |

**Recommended fix order:** C5 (scroll animation) → C1 (dark mode grays) → C2 (undefined variable) → C4 (card hover) → C6 (blog filter) → H6 (hero colors) → H7 (inline styles) → H10 (i18n titles) → then work through remaining items.
