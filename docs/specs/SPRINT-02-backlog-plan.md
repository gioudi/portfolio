# SPRINT-02 BACKLOG — Findings Register & Roadmap Proposal

**Task ID:** PLAN-2026-08-25
**Type:** planning / contract renovation
**Priority:** High
**Status:** Proposed — awaiting Jör's approval of scope & sequence
**Date:** 2026-08-25
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Where We Are (verified live)

| Component | State |
|-----------|-------|
| Frontend | GitHub Pages, v2.0.x bundle, Render API baked in |
| Backend | Render Docker + Postgres, auto-deploy from main |
| Create-project | FIXED & merged (JOR-010): multipart + Cloudinary streaming |
| Git flow | staging ⇄ main synced @ c2351c0 / 61af00e ✅ |

---

## 2. Findings Register (full-project review)

| # | Finding | Severity | Disposition |
|---|---------|----------|-------------|
| F1 | Landing renders **hardcoded** store arrays; `fetchProjects()` is dead code writing an unused field; `ProjectDetailView.vue` reads hardcoded too → **created projects never appear publicly** | **High** | Epic E1 |
| F2 | JWT issued with **no `exp` claim** (`auth_service.py`) → tokens valid forever, no revocation path | Med-High | Epic E6 |
| F3 | Zero backend tests; frontend suite exists but majors-stale | Med | Epic E6 |
| F4 | No CI on PRs — lint/tests/build only run locally by discipline | Med | Epic E6 |
| F5 | `media_controller` routes never registered; Media model only used in seed block — orphan code | Low | Epic E6 |
| F6 | Login rate-limiter uses in-memory storage (resets on restart, per-worker) | Low | Accept for now |
| F7 | Dev-dependency majors outdated (Jest 27, Cypress, ESLint 10, Bulma 1.x, Prettier 3) + Dependabot noise | Low-Med | Epic E6 |
| F8 | Images stored as URL only — no `public_id` column → deletion needs schema tweak or URL parsing | Med | Blocks E1 delete |
| F9 | gh-pages deploys are manual/scripted (procedure documented) | Low | Accept |
| F10 | Service worker may serve one stale navigation after a deploy (mitigated by skipWaiting) | Low | Accept |

---

## 3. Proposed Epics & Estimates

*(1 session ≈ 2–3 focused hours, AI-assisted per contract)*

### E1 — JOR-011 · Projects CRUD completion *(the big one)*
- Landing + detail view read **live API** (newest first), hardcoded arrays kept only as offline fallback
- Backend `PUT /api/projects/<id>` and `DELETE` (admin JWT)
- Migration: add `public_id` to images/videos → `DELETE` destroys Cloudinary assets before removing rows
- Admin "Manage projects" screen: list / edit / delete with confirmation
**Estimate: 1.5–2 sessions**

### E2 — JOR-012 · Recent-work carousel
- `vue3-carousel` (installed) showing latest N projects, autoplay + pagination; reuses E1 data layer
**Estimate: 0.5 session · depends on E1**

### E3 — JOR-013 · Profile view
- `profile` table (hero text, bio, location, contact links, socials), public GET + admin PUT, dedicated ProfileView + landing section
**Estimate: 1–1.5 sessions**

### E4 — JOR-014 · Contact & quote requests
- `messages` table (type: contact | quote, budget range, details, status)
- `POST /api/contact`: rate-limited + honeypot (+captcha optional)
- Admin inbox (read / archive); optional email notification via Resend free tier
**Estimate: 1–1.5 sessions**

### E5 — JOR-015 · FAQ assistant ("agent")
- **Phase A (recommended):** rule/intent widget answering *who am I / contact / pricing* grounded on profile DB + deep-links into the quote form — zero running cost
- **Phase B (optional):** LLM-backed agent over profile+projects data — needs API key, cost cap and guardrails
**Estimate: A = 1 session · B = 1–2 sessions + running cost**

### E6 — Platform hardening pack
- GitHub Actions CI (PR: lint+test+build), JWT `exp` + refresh flow, pytest seed (auth/projects/contact), Dependabot grouping + dev-majors upgrade day, resolve F5 (wire or delete media routes)
**Estimate: 1.5–2 sessions (splittable)**

---

## 4. Proposed Sequence

| Sprint | Contents | Sessions |
|--------|----------|----------|
| **Sprint 2** | E1 → E2 → CI slice of E6 | 3–4 |
| **Sprint 3** | E3 → E4 (+pytest seed) | 2.5–3 |
| **Sprint 4** | E5-A → E6 leftovers → E5-B go/no-go | 2–3 |

**Roadmap total ≈ 8–10 sessions (~1 month at current cadence).**

---

## 5. Decisions Requested from Jör

| # | Decision | Default if silent |
|---|----------|-------------------|
| D1 | Delete projects: hard delete vs soft-delete flag | Hard delete |
| D2 | Email notifications: Resend free tier or inbox-only | Inbox-only first |
| D3 | Chatbot appetite: stop at Phase A or budget Phase B | Phase A |
| D4 | Ordering: newest-first everywhere vs pinned flagship card | Newest-first |
| D5 | Hardcoded arrays: keep as fallback or full API-driven | Keep as fallback |

---

*Plan Version: 1.0 — 2026-08-25*
