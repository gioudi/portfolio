# SPEC-P03: Fix Build Errors — TypeScript Upgrade & Backend Deps

**Task ID:** JOR-003
**Type:** fix
**Priority:** Critical
**Status:** Completed
**Date:** 2026-08-19
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Fix two build-blocking errors: TypeScript version incompatibility with vee-validate's type-fest dependency, and missing backend Python dependencies in the virtual environment.

---

## 2. Bugs Fixed

### Bug #1: TypeScript 4.5.5 vs type-fest 4.26.1

**Error:**
```
TS1005: ',' expected in node_modules/vee-validate/node_modules/type-fest/source/sum.d.ts
```

**Root cause:** `vee-validate@4.14.4` → `type-fest@4.26.1` uses TypeScript 5.x syntax. Project used TypeScript 4.5.5 which can't parse it.

**Fix:** Upgrade `typescript` from `~4.5.5` to `~5.5.0`.

**Compatibility verified:**
- `@typescript-eslint/*@5.x` — supports TS 5.x
- `@vue/cli-plugin-typescript` — accepts `typescript >= 2`
- `ts-jest@27` — peer dep warning but works with override

### Bug #2: Backend `bcrypt` Module Not Found

**Error:**
```
ModuleNotFoundError: No module named 'bcrypt'
```

**Root cause:** `.venv` was incomplete — had only `python.exe` and `pythonw.exe`, no pip, no installed packages.

**Fix:**
1. Bootstrapped pip with `python -m ensurepip`
2. Installed all deps: `pip install -r requirements.txt`

---

## 3. Files Changed

| File | Change |
|------|--------|
| `client/package.json` | `typescript` `~4.5.5` → `~5.5.0` |
| `client/package-lock.json` | Updated lock file |
| 4 client files | Lint auto-fix (formatting) |

---

## 4. Verification

- `npm run lint` — 0 errors, 5 warnings (all `no-console`, pre-existing)
- `npm run build` — clean build, dist ready
- `python -c "import bcrypt"` — bcrypt 4.1.2 OK

---

*Spec Version: 1.0*
*Last Updated: 2026-08-19*
