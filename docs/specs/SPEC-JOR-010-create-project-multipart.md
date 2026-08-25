# SPEC-JOR-010: Project Creation — Multipart Uploads & Cloudinary Integration

**Task ID:** JOR-010
**Type:** bugfix / integration
**Priority:** High
**Status:** Implemented — verified locally; pending merge + v2.0.1 release
**Date:** 2026-08-25
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

The admin "Create project" form failed in production with `415 Unsupported Media Type`.
Root cause was a frontend/backend contract mismatch plus a latent Cloudinary SDK
configuration bug. This spec documents both fixes and the release path (v2.0.1).

---

## 2. Why We're Fixing

### The broken contract

| Layer | Behavior before fix |
|-------|--------------------|
| Frontend (`store/projects.ts`) | Always posts **multipart/form-data** (FilePond file fields), even with zero files |
| Backend (`project_controller.py`) | Only read the body via **`request.get_json()`** |

Flask rejects any non-JSON body at `get_json()` with **415** before any business logic
runs. Result: the create-project feature never worked end-to-end through the UI —
local Stage A proofs passed because the E2E robot posts raw JSON, masking the gap
(P-B6 "create through deployed UI" was still unchecked for exactly this reason).

### The latent Cloudinary bug

Even with a correct payload, uploads would have failed: **`cloudinary.config()` was only
called in `backend/config.py`, which no runtime module imports.** The SDK therefore had
no credentials at request time (`Must supply api_key`).

---

## 3. Changes Made

### 3.1 Backend accepts JSON *and* multipart (`project_controller.py`)

- Content-Type sniffing: JSON bodies keep the existing validation flow untouched.
- Multipart bodies are parsed from `request.form` / `request.files`:
  - text fields mapped to the same dict shape as JSON calls
  - `technologies` / `tags` collected as lists (`getlist`)
  - `project_type_id` coerced to `int`
  - every file under `images` is streamed to Cloudinary → `{url}` entries
  - optional `video` file → uploaded with `resource_type="video"`
- Missing/failed image uploads return a clear `400` instead of an HTML 500:
  - multipart without images → `400 At least one valid image upload is required`
  - service-level `ValueError` now caught → `400` with message

### 3.2 Cloudinary configured at point of use (`utils/cloudinary_helper.py`)

- `cloudinary.config(...)` runs at module import (env-driven, same values as compose/Render).
- New `upload_stream_to_cloudinary(stream, resource_type="image")` uploads in-memory
  streams directly — no `/tmp` staging files (closes a Phase-2 review finding).

---

## 4. Files Changed

| File | Change |
|------|--------|
| `backend/src/controllers/project_controller.py` | dual-format parsing, graceful 400s |
| `backend/src/utils/cloudinary_helper.py` | SDK config + stream uploader |
| `client/.env.production` | bakes Render API URL into production builds |
| `client/src/assets/Screenshot*.png` | removed — replaced by Cloudinary assets |

---

## 5. Verification

| Check | Result |
|-------|--------|
| UI-shaped multipart POST **with** image → `201` + Cloudinary URL persisted | ✅ local stack |
| multipart **without** images → friendly `400` | ✅ |
| malformed JSON → `400 Invalid request body` (no HTML crash) | ✅ |
| JSON contract regression (Stage A robot) | ✅ 8/8 proofs pass |
| Cloudinary delivery `f_auto,q_auto` | ✅ BA shots: 941 KB PNG → 178 KB auto-format |

Uploaded project assets (Nexus / British Airways card):
`portfolio/nexus-ba-01 … nexus-ba-06`
`https://res.cloudinary.com/douq2tfdm/image/upload/f_auto,q_auto/portfolio/nexus-ba-0X`

---

## 6. Release Plan — v2.0.1

1. Branch `fix/JOR-010-create-project-multipart` created **from `staging`** (synced to `main` first).
2. PR → merge into `staging`; identical branch merges into `main` (or staging→main PR).
3. Tag `v2.0.1` on main; GitHub Release notes = this spec summary.
4. Render auto-deploys main; P-B6 ("create through deployed UI") re-run as final proof.

---

## 7. Risks

| Risk | Mitigation |
|------|-----------|
| Large uploads slow request workers | gunicorn timeout 60 s already set; Cloudinary SDK streams |
| Duplicate config call if `config.py` also imported | idempotent — same env values |
| Old bundles caching 415 behavior | service worker skipWaiting+clientsClaim already active |

---

*Spec Version: 1.0 — 2026-08-25*
