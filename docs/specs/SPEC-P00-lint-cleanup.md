# SPEC-P00: Lint Cleanup & Type Safety

**Task ID:** JOR-000
**Type:** chore
**Priority:** High
**Status:** Completed
**Date:** 2026-08-19
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

One-time lint cleanup across the entire frontend codebase: auto-fix formatting, replace all `any` types with proper TypeScript interfaces, remove unused imports, and add a `lint:fix` script for future use.

---

## 2. What Was Done

### 2.1 Added `lint:fix` Script
**File:** `client/package.json`

Added `"lint:fix": "vue-cli-service lint --fix"` to scripts. This runs ESLint with the `--fix` flag, auto-fixing formatting issues (semicolons, indentation, trailing commas, line endings, etc.).

### 2.2 Defined Proper TypeScript Interfaces
**File:** `client/src/store/projects.ts`

| Interface | Purpose |
|-----------|---------|
| `LocalProject` | Type for hardcoded portfolio projects (displayed on home page) |
| `OtherProject` | Type for secondary project cards |
| `MediaItem` | Type for image/video entries in project media arrays |
| `CreateProjectPayload` | Type for the create project API call parameter |
| `Projects` | (exported) Type for API-fetched projects |
| `ProjectTypes` | (exported) Type for project type dropdown data |

Replaced all `as any` casts with proper type annotations.

### 2.3 Removed Unused Imports
**File:** `client/src/views/CreateProjectView.vue`

- Removed unused `router` import (line 134)
- Removed unused `errors` from `useForm` destructure (line 200)

### 2.4 Suppressed External Library Type Declaration
**File:** `client/src/vue-carousel.d.ts`

Added `/* eslint-disable @typescript-eslint/no-explicit-any */` — standard practice for third-party type declarations where the library doesn't provide its own types.

### 2.5 Auto-Fixed Formatting Across 35 Files

Ran `npm run lint:fix` which normalized:
- Line endings (LF/CRLF)
- Trailing commas
- Indentation (spaces/tabs)
- Semicolons
- Quote consistency
- Spacing around operators

---

## 3. Benefits

### 3.1 Type Safety
- **Before:** `any` types bypass TypeScript's compile-time checks. Wrong data shapes pass silently.
- **After:** Proper interfaces catch mismatches at compile time. IDE autocomplete works correctly. Refactoring is safer.

### 3.2 Code Quality
- **Before:** Unused imports add dead code, confuse readers, and slightly increase bundle size.
- **After:** Clean imports mean every statement serves a purpose.

### 3.3 Consistent Formatting
- **Before:** Mixed line endings, inconsistent indentation create noisy `git diff` output and make code reviews harder.
- **After:** Uniform style across all files. Diffs show only meaningful changes.

### 3.4 Developer Experience
- **Before:** No `lint:fix` script — developers had to know the ESLint command.
- **After:** `npm run lint:fix` is a one-command shortcut. Can be added to pre-commit hooks.

### 3.5 Foundation for Future Phases
- All future phases (security, SEO, performance, testing) will include lint checks as part of their workflow.
- No more "lint cleanup" sub-steps needed.

---

## 4. Bugs/Errors Fixed

| # | Issue | Risk if Unfixed |
|---|-------|-----------------|
| 1 | `projects` array typed as `any` | Backend response with wrong shape would pass silently, causing runtime errors on `p.id`, `p.title`, etc. |
| 2 | `otherProjects` typed as `any` | Accessing `.image_alt` or `.site` on a misspelled field would throw at runtime, not compile time |
| 3 | `createProject(projectData: any)` | Calling store action with wrong field names (e.g., `project_name` instead of `name`) would create broken records |
| 4 | `ProjectDetailView` using `(p: any)` | Find callback could compare wrong fields, returning `undefined` silently |
| 5 | Unused `router` import | Dead code; confusing for future developers reading the file |
| 6 | Unused `errors` variable | Suggested error handling existed when it didn't; potential false assumption during debugging |
| 7 | Inconsistent line endings | Cross-platform issues; noisy diffs; potential merge conflicts |

---

## 5. Possible Future Errors (Watch For)

| # | Risk | Likelihood | Mitigation |
|---|------|------------|------------|
| 1 | `LocalProject` interface drifts from actual hardcoded data if new fields are added | Medium | Keep interfaces in sync when modifying project data |
| 2 | `CreateProjectPayload` doesn't match backend expectations after API changes | Low | Update type when backend contract changes (Phase 2+) |
| 3 | `eslint-disable` on `vue-carousel.d.ts` could mask real issues | Low | Only applies to type declaration file, not runtime code |

---

## 6. Files Changed

| File | Change |
|------|--------|
| `client/package.json` | Added `lint:fix` script |
| `client/src/store/projects.ts` | Added interfaces, replaced `any` types |
| `client/src/views/ProjectDetailView.vue` | Imported `LocalProject`, replaced `any` in find |
| `client/src/views/CreateProjectView.vue` | Removed unused `router`, `errors` |
| `client/src/vue-carousel.d.ts` | Added eslint-disable comment |
| 35 files | Auto-fixed formatting (line endings, indentation, trailing commas) |

---

## 7. Documentation Updated

- [x] This spec document
- [x] `BROKKR_JOR_CONTRACT.txt` (added lint-as-workflow note)

---

## 8. Patterns Applied

| Pattern | Where | Benefit |
|---------|-------|---------|
| **Interface Segregation** | Separate `LocalProject`, `OtherProject`, `Projects` types | Each type describes exactly the data it represents |
| **Exported Types** | Interfaces exported from store | Reusable across components (e.g., `ProjectDetailView`) |
| **DRY** | Single source of truth for project types | One interface, used everywhere |
| **Convention over Configuration** | `lint:fix` script | Standard npm script pattern, familiar to all JS developers |

---

*Spec Version: 1.0*
*Last Updated: 2026-08-19*
