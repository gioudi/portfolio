# SPEC-P05: Testing & Frontend Quality

**Task ID:** JOR-007
**Type:** test
**Priority:** High
**Status:** Completed
**Date:** 2026-08-24
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Introduce a real unit test suite for the portfolio frontend and fix every defect the tests surfaced: two components calling a nonexistent Pinia API, a production build fully blocked by CRLF/prettier errors, an invalid CSS filter, a mobile timeline layout bug, ragged project-card grids, and hard-clipped card descriptions. Replaces the scaffold placeholder test with 25 meaningful assertions across 8 suites covering all Pinia stores and key UI components, including grid/responsive class contracts.

> **Note on SPEC-P04 discrepancy:** SPEC-P04 listed `ToggleButton.vue`, `LanguageToggleButtonC.vue`, `theme.ts`, and `language.ts` as *deleted* dead code. They were never actually removed from the repository — they survived as broken orphaned code (`usePinia` does not exist in pinia v2). Rather than deleting them, this phase repairs them into working, tested components. The theme/language toggles are now ready to be wired into the UI in Phase 7.

---

## 2. Why Each Change Matters

### 2.1 Broken Components Repaired (Impact: 2 components rescued from crash-on-mount)

**Without:** `ToggleButton.vue` and `LanguageToggleButtonC.vue` imported `usePinia` from pinia — an API that does not exist in pinia v2 (0 occurrences in `pinia/dist/pinia.mjs`). Both also treated raw state objects as store instances (`pinia.state.theme.toggleTheme()`), which cannot work since actions are not part of state. Any mount would throw immediately.

**With:** Both use proper store composables — `useThemeStore()` with `storeToRefs()` for reactive destructuring, and `useLanguageStore()` plus the component-scoped i18n composer (`i18n.locale.value`) so locale sync works in both legacy and composition mode.

**Issue Avoided:** Shipping UI controls that crash; silent drift between what specs claim and what the code contains.

### 2.2 Build Blockers Cleared (Impact: production build compiles again)

**Without:** 654 prettier `Delete ␍` errors (CRLF line endings) across 5 source files failed the eslint gate inside `npm run build` — no deployable artifact could be produced at all.

**With:** `lint:fix` normalizes line endings; build completes with 0 errors.

**Issue Avoided:** A repo where CI/deploy was red for reasons unrelated to code logic.

### 2.3 Mobile Timeline Fix (Impact: zigzag timeline renders correctly under 768px)

**Without:** The responsive override targeted `.container:before`, but the dashed center line is drawn by `.timeline:before`. On phones the line stayed at `left: 50%` while blocks went full-width — a floating line through the middle of text.

**With:** Override targets `.timeline:before` (`left: 0.5rem`) plus marker spacing, so the rail hugs the left edge with content beside it.

**Issue Avoided:** Core portfolio section visually broken on the majority of first-time (mobile) visitors' devices.

### 2.4 Project Card Grid Alignment (Impact: equal-height cards, aligned CTAs)

**Without:** Bulma columns stretch to row height, but `.card` content did not — cards in the same row had ragged bottoms and "View Details"/"Go to web" buttons floated directly under variable-length descriptions.

**With:** `.card` becomes a flex column filling cell height; `.card-content` grows and pushes the CTA to the bottom via `margin-top: auto`.

**Issue Avoided:** Unprofessional masonry-looking grid on the page recruiters see first.

### 2.5 Description Clamping (Impact: clean truncation instead of mid-word cut)

**Without:** `.description { height: 2.5rem; overflow: hidden }` sliced text mid-glyph with no visual cue of continuation.

**With:** `-webkit-line-clamp: 3` with box-orient vertical — three full lines ending in an ellipsis, degrading gracefully in unsupported browsers.

**Issue Avoided:** Text looking broken/buggy rather than intentionally summarized.

### 2.6 Invalid CSS Filter Fixed (Impact: skill icons actually grayscale)

**Without:** `filter: grayscale(100)` — unitless value is invalid per CSS spec, so the rule was silently dropped and icons rendered in full color.

**With:** `grayscale(100%)`; hover transition now visibly restores color.

**Issue Avoided:** A designed interaction effect that never existed in practice.

### 2.7 Real Test Suite (Impact: 25 tests / 8 suites, zero placeholders)

**Without:** A single scaffold spec importing a component deleted long ago (`HelloWorld.vue`) — the suite could only fail, proving nothing.

**With:**

| Suite | Covers |
|-------|--------|
| `store/theme.spec.ts` | Default light theme; toggle flips state both ways |
| `store/language.spec.ts` | Default `en`; `setCurrentLanguage` updates state |
| `store/auth.spec.ts` | Logged-out start; login persists token + Authorization header; 401 rejection path; logout clears token/state/storage |
| `store/projects.spec.ts` | Seeded data integrity; lookup by id (hit + miss); API fetch populates state; created projects appended |
| `components/LanguageToggleButtonC.spec.ts` | Flag icon reflects locale; click syncs store **and** vue-i18n global locale en↔es↔en |
| `components/VerticalTimeLine.spec.ts` | 7 events render; left/right classes alternate by index parity; markers present; titles visible |
| `components/ProjectsLine.spec.ts` | 9 articles render; **responsive contract**: `is-multiline` grid with `is-half-tablet` + `is-one-quarter-desktop` cells; lazy-loaded images with alt text; clamp class present |
| `components/FooterLine.spec.ts` | Copyright name resolved through vue-i18n |

Axios and router are mocked (`__esModule: true` factories) so suites run hermetically — no network, no ESM transform issues from `node_modules/axios`.

**Issue Avoided:** Regressions reaching the deployed portfolio; CSS/class refactors silently breaking the responsive grid (the class assertions act as executable documentation).

---

## 3. Design Patterns Applied

| Pattern | Where | What It Means |
|---------|-------|---------------|
| **Store Composable Pattern** | Toggle components | Consume Pinia via dedicated store hooks, never raw state surgery |
| **Reactive Destructuring** | `storeToRefs()` | Keeps destructured state reactive instead of snapshotting values |
| **Test Double (Mock)** | `jest.mock("@/axios")` | HTTP isolated from logic; suites deterministic and offline-safe |
| **Contract Testing** | ProjectsLine class assertions | Responsive Bulma classes asserted so grid breakpoints are protected |
| **Arrange–Act–Assert** | All suites | Uniform readable test structure |
| **Hermetic Suites** | No network/localStorage coupling | Tests pass in any environment/order |

---

## 4. Files Changed

| File | Change |
|------|--------|
| `client/src/components/ToggleButton.vue` | Rewritten script: `useThemeStore` + `storeToRefs` (was nonexistent `usePinia`) |
| `client/src/components/LanguageToggleButtonC.vue` | Rewritten script: `useLanguageStore` + composer `locale.value` |
| `client/src/components/VerticalTimeLine.vue` | Mobile media query targets `.timeline:before`; marker margin fix |
| `client/src/components/SkillsLine.vue` | `grayscale(100)` → `grayscale(100%)` |
| `client/src/components/ProjectsLine.vue` | Flex-column equal-height cards, bottom-pinned CTAs, 3-line description clamp |
| `client/src/main.ts` | Lint normalization only (CRLF) |
| `client/src/router/index.ts` | Lint normalization only (CRLF) |
| `client/src/store/projects.ts` | Lint normalization only (CRLF) |
| `client/src/views/ProjectDetailView.vue` | Lint normalization only (CRLF) |
| `client/vue.config.js` | Lint normalization only (CRLF) |
| `client/tests/unit/example.spec.ts` | **Deleted** — referenced non-existent HelloWorld component |
| `client/tests/unit/store/*.spec.ts` | **New** — theme, language, auth, projects suites |
| `client/tests/unit/components/*.spec.ts` | **New** — LanguageToggle, VerticalTimeLine, ProjectsLine, FooterLine suites |

---

## 5. Risks Prevented

| Risk | What Happens Without This | How We Prevent It |
|------|--------------------------|-------------------|
| Undeployable build | 654 lint errors block webpack eslint gate | Normalized line endings + verified green build |
| Crashing components | Any future use of toggle components threw on mount | Repaired to canonical Pinia API, covered by tests |
| Mobile layout regression | Timeline rail centered over full-width content < 768px | Correct selector + suite locks structure |
| Grid drift | Refactors dropping responsive column classes go unnoticed | Executable class-contract assertions |
| False confidence | Placeholder test suite failing forever | 25 real assertions, all passing |

---

## 6. Concept Dictionary

| Term | Definition |
|------|-----------|
| **Pinia store** | Vue 3 state container exposing state/getters/actions via composable (`defineStore`) |
| **storeToRefs** | Pinia helper destructuring store state as reactive refs without losing reactivity |
| **vue-i18n composer** | Composition API handle (`useI18n()`) whose `locale.value` works in legacy and composition modes |
| **CRLF / LF** | Windows vs Unix line endings; mixed endings trip prettier/eslint gates |
| **line-clamp** | CSS technique truncating text after N lines with ellipsis |
| **is-half-tablet / is-one-quarter-desktop** | Bulma responsive column fractions (50% ≥769px, 25% ≥1024px) |
| **Test double** | Stand-in object (mock) replacing real dependency (axios) during testing |
| **Responsive contract test** | Assertion locking the presence of framework breakpoint classes against accidental removal |

---

## 7. Deferred Items

| Item | Why Deferred | Future Phase |
|------|-------------|-------------|
| Wire theme/language toggles into header UI | Both fixed at `top/right:20px` would overlap; needs design decision | Phase 7 (Polish) |
| Component tests for views (HomeView, ProjectDetailView) | Carousel/FilePond deps need `transformIgnorePatterns` tuning | Phase 5 follow-up |
| Cypress e2e happy-path (home → detail) | Requires backend stubbing strategy decision | Phase 5 follow-up |
| Bundle-size advisories (entrypoint > 244 KiB) | Inherited from Phase 4 scope; needs chunk analysis | Phase 7 (Polish) |
| `no-console` warnings (11) | Intentional SW diagnostics; needs logger abstraction | Phase 7 (Polish) |
| Update browserslist DB | Data refresh unrelated to correctness | Housekeeping |

---

## 8. Verification

- [x] `npm run test:unit` — **8 suites / 25 tests, all passing**
- [x] `npm run build` — compiles, **0 errors** (warnings pre-existing/inherited)
- [x] `npm run lint` — 0 errors (11 pre-existing `no-console` warnings)
- [x] Toggle components mount and mutate their stores correctly
- [x] Language toggle keeps vue-i18n locale in sync with the store
- [x] Timeline blocks alternate left/right and render all 7 events
- [x] Projects grid keeps tablet/desktop responsive classes under test protection
- [ ] Manual smoke on real device (deferred to Phase 7 polish round)

---

*Spec Version: 1.0*
