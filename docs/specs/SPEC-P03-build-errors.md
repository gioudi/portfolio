# SPEC-P03: Fix Build & Runtime Errors

**Task ID:** JOR-003
**Type:** fix
**Priority:** Critical
**Status:** Completed
**Date:** 2026-08-19
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Fix build-blocking and runtime errors across frontend and backend: TypeScript version incompatibility, missing Python dependencies, incorrect service instantiation, model mismatches, and PostgreSQL fallback for local development.

---

## 2. Bugs Fixed

### Bug #1: TypeScript 4.5.5 vs type-fest 4.26.1

**Error:** `TS1005: ',' expected` in `node_modules/vee-validate/node_modules/type-fest/source/sum.d.ts`

**Root cause:** `vee-validate@4.14.4` → `type-fest@4.26.1` requires TS 5.x syntax.

**Fix:** Upgrade `typescript` from `~4.5.5` to `~5.5.0`.

### Bug #2: `useStore is not a function`

**Error:** `TypeError: (0 , useStore) is not a function` at runtime.

**Root cause:** `ProjectsLine.vue` imported `useStore` but store exports `useProjectStore`.

**Fix:** Corrected import in `client/src/components/ProjectsLine.vue`.

### Bug #3: Backend `bcrypt` Module Not Found

**Error:** `ModuleNotFoundError: No module named 'bcrypt'`

**Root cause:** `.venv` was incomplete — no pip, no installed packages.

**Fix:** Bootstrapped pip with `ensurepip`, installed all deps. Also deleted duplicate `backend/.venv`, added `.venv/` to `.gitignore`.

### Bug #4: `ProjectService.__init__()` Missing Argument

**Error:** `TypeError: ProjectService.__init__() missing 1 required positional argument: 'project_repository'`

**Root cause:** `project_controller.py` called `ProjectService()` without passing the repository. Fixed in Phase 1 but controller was missed.

**Fix:** Updated controller to follow same pattern as `project_type_controller` (Session → Repository → Service).

### Bug #5: Foreign Key Mismatch (`user.id` vs `users.id`)

**Error:** `sqlalchemy.exc.NoReferencedTableError: Foreign key associated with column 'projects.user_id' could not find table 'user'`

**Root cause:** `projects.py` had `ForeignKey('user.id')` but User model defines `__tablename__ = 'users'`.

**Fix:** Changed to `ForeignKey('users.id')`.

### Bug #6: `ARRAY(String)` Not Supported by SQLite

**Error:** `ARRAY` type is PostgreSQL-specific, causes failures when falling back to SQLite.

**Root cause:** `projects.py` used `ARRAY(String)` for `technologies` and `tags`.

**Fix:** Changed to `Column(JSON)` — works with both PostgreSQL and SQLite, stores/returns Python lists.

### Bug #7: Models Not Imported Before `create_all`

**Error:** SQLite `create_all` failed because referenced models weren't registered with Base.

**Root cause:** `main.py` only imported `ProjectType` and `User`, not `Project`, `Image`, `Video`, `Media`.

**Fix:** Added all model imports at top of `main.py`.

### Bug #8: No PostgreSQL Fallback for Local Dev

**Error:** Backend crashes immediately if PostgreSQL is not running.

**Root cause:** `database.py` hardcoded PostgreSQL connection with no fallback.

**Fix:** Added SQLite fallback — tries PostgreSQL first, falls back to `portfolio.db` if unavailable.

---

## 3. Files Changed

| File | Change |
|------|--------|
| `client/package.json` | `typescript` `~4.5.5` → `~5.5.0` |
| `client/package-lock.json` | Updated lock file |
| `client/src/components/ProjectsLine.vue` | `useStore` → `useProjectStore` |
| `client/src/store/projects.ts` | Lint auto-fix (formatting) |
| `client/src/views/CreateProjectView.vue` | Lint auto-fix (formatting) |
| `client/src/views/ProjectDetailView.vue` | Lint auto-fix (formatting) |
| `client/src/vue-carousel.d.ts` | Lint auto-fix (formatting) |
| `backend/src/models/database.py` | SQLite fallback when PostgreSQL unavailable |
| `backend/src/models/projects.py` | `ARRAY(String)` → `JSON`, fix FK `users.id` |
| `backend/src/controllers/project_controller.py` | Inject `project_repository` into `ProjectService` |
| `backend/src/main.py` | Import all models before `create_all` |
| `.gitignore` | Added `.venv/` and `*.db` |

---

## 4. Verification

- `npm run lint` — 0 errors
- `npm run build` — clean build
- `python main.py` — Flask starts on `http://127.0.0.1:5000` with SQLite fallback
- PostgreSQL connection warning logged but app continues gracefully

---

*Spec Version: 2.0*
*Last Updated: 2026-08-19*
