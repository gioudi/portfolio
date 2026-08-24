# SPEC-P06: Containerization & Backend Deployment

**Task ID:** JOR-008
**Type:** chore / feat
**Priority:** High
**Status:** Implemented — Stage A proofs green; Stage B pending host deployment
**Date:** 2026-08-24
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Containerize the Flask backend (Dockerfile + Compose with PostgreSQL and an opt-in pgAdmin), fix the two defects that currently block production serving, deploy the API to a free host, and wire the GitHub Pages frontend to it. The phase ships with a mandatory **E2E Proof Protocol** (Section 8): every claim — persistence, auth, rate limiting, CORS, cold start — has a numbered, copy-pasteable verification step with expected output. Nothing is "done" until proven.

---

## 2. Findings: What Blocks Containership Today

### 2.1 CRITICAL — DB bootstrap never runs under gunicorn

`backend/src/main.py:88` — `Base.metadata.create_all(engine)`, `create_default_user()`, and `create_default_project_types()` execute only under `if __name__ == '__main__':`. Gunicorn **imports** the module (`main:app`), so `__name__ != "__main__"`:

- No tables created on a fresh database
- No default user seeded → login impossible on any fresh deployment

**Fix:** move bootstrap to module level guarded by an env flag (`RUN_BOOTSTRAP=true` in dev/compose; disabled on multi-worker re-runs via idempotent checks that already exist in the seed functions).

### 2.2 HIGH — No health endpoint

Render/Koyeb health checks and every E2E proof need `GET /health` returning `200 {"status":"ok","db":"postgres|sqlite"}`. Today any probe returns the CSP-protected 404 HTML.

### 2.3 MEDIUM — Frontend API URL hardcoded

`client/src/axios.ts:3` — `axios.defaults.baseURL = "http://localhost:5000"` baked at build time. The deployed GitHub Pages frontend can never reach a live API.

**Fix:** `process.env.VUE_APP_API_BASE || "http://localhost:5000"`, documented in `.env.example`.

### 2.4 LOW — Rate limiter storage

`flask_limiter` defaults to in-memory storage: fine for a single free-tier instance; resets on redeploy. Documented, not fixed (Redis would cost money).

### 2.5 DISCOVERED BY STAGE A — Project serialization broken end-to-end

The E2E proof protocol caught two production-blocking bugs that unit tests had not:

1. `create_project` returned the raw ORM `Project` object → `jsonify` raised `TypeError: Object of type Project is not JSON serializable`. The row **was persisted**, but every successful create answered `500`.
2. `get_projects` called `project.to_dict()`, which **did not exist** on the model → any non-empty list crashed with 500. An empty table masked the bug forever.

**Fix applied:** added `Project.to_dict()` serializer (model layer) and used it in the create response. This is why empty-database testing lies and the proof protocol demands populated round-trips.

### 2.6 DISCOVERED BY STAGE A — Seed password vs complexity validator

A real `.env` whose `DEFAULT_PASSWORD` lacks an uppercase letter silently skips user seeding (WARN only) → login impossible on fresh deploys. Compose now ships validator-compliant dev credentials as explicit overrides; production must set compliant values via dashboard (documented risk).

### 2.7 TEST-HARNESS NOTES (Windows PowerShell 5.1)

- `curl.exe -d '{"json":"with quotes"}'` gets its embedded quotes stripped by PS 5.1 argument marshalling → server receives mangled JSON. All JSON proofs use `Invoke-RestMethod` instead.
- State does not persist between separate shell sessions — login + authenticated call must run in one block.

---

## 3. Target Architecture

```text
GitHub Pages (static Vue SPA)
        │  HTTPS + JWT
        ▼
Free host (Render) ──► Docker: python:3.12-slim + gunicorn
        │                    └─ /health, /api/login (5/min), /api/projects, /api/project-types
        ├─ Postgres: Neon free tier (persistent)   [upgrade path]
        └─ Local dev parity: docker compose (api + db + pgadmin[debug])
```

## 4. Deliverables

| # | Artifact | Detail |
|---|----------|--------|
| D1 | `backend/Dockerfile` | `python:3.12-slim`, non-root user, `pip install -r requirements.txt`, `CMD ["gunicorn","-b","0.0.0.0:$PORT","src.main:app"]`, HEALTHCHECK hitting `/health` |
| D2 | `backend/.dockerignore` | `.venv`, `__pycache__`, `*.db`, `.env` |
| D3 | `docker-compose.yml` | `api` (build, `RUN_BOOTSTRAP=true`, port 5000), `db` (`postgres:16-alpine`, named volume `pgdata`), `pgadmin` behind `profiles: [debug]` on :5050 |
| D4 | `/health` endpoint | Reports app + DB engine kind |
| D5 | Bootstrap relocation | Section 2.1 fix |
| D6 | `client/src/axios.ts` | Env-driven base URL |
| D7 | `.env.example` updates | `ALLOWED_ORIGINS`, `VUE_APP_API_BASE`, `DEFAULT_USER/PASSWORD/EMAIL`, `POSTGRES_*` |
| D8 | Deploy config | Render Blueprint (`render.yaml`) or dashboard setup doc |

## 5. Free Hosting Decision Matrix

| Host | Always-on | Persistent disk | Effort | Verdict |
|------|-----------|-----------------|--------|---------|
| **Render** free | No — sleeps ~15 min idle (~50 s wake) | No | Lowest (git push auto-deploy) | ✅ **Primary choice** |
| **PythonAnywhere** free | Yes | Yes | Low (web UI config) | Fallback if cold-starts annoy; Cloudinary outbound needs whitelist check |
| Koyeb free | Scale-to-zero | No | Medium | Valid alternate |
| HF Spaces (Docker) | Sleeps | No | Medium (port 7860 constraint) | Not chosen |
| Oracle Always Free VPS | Yes | Yes | High (self-manage nginx/certs) | Future power option |

**DB strategy:** start on the Compose Postgres locally; in production either Render ephemeral disk (demo-grade, data resets on redeploys — acceptable, documented) or point `POSTGRES_*` at **Neon** free tier for real persistence. Same env vars both ways — zero code delta.

---

## 6. Security Continuity

- Secrets only via host dashboard / compose env — never in repo (extends SECRET-001 policy)
- Existing headers (HSTS, CSP, nosniff, frame-deny) verified live in Proof P-B3
- Login rate limit (5/min) proven with existing `scripts/test_rate_limit.py` pointed at the public URL
- `ALLOWED_ORIGINS` = exactly `https://gioudi.github.io` (+ localhost for dev)

---

## 7. Concept Dictionary

| Term | Definition |
|------|-----------|
| **Gunicorn** | WSGI server that imports the Flask app; `__main__` blocks never run under it |
| **HEALTHCHECK** | Docker directive probing `/health`; orchestrators restart unhealthy containers |
| **Named volume** | Docker-managed storage surviving container recreation (`pgdata`) |
| **Cold start** | Latency when a sleeping free-tier instance wakes (~50 s on Render) |
| **Neon** | Serverless managed Postgres with a genuine free tier |
| **E2E proof** | Numbered command + expected output demonstrating behavior against the real system |

---

## 8. E2E PROOF PROTOCOL (mandatory exit criteria)

> Every step lists **command → expected result**. Steps marked 📸 produce evidence for the phase review. All PowerShell-friendly.

### Stage A — Local Compose stack

| ID | Command | Expected | Result |
|----|---------|----------|--------|
| P-A1 | `docker compose up --build` | api log: `[DB] Connected to PostgreSQL`; no traceback | ✅ + `[BOOTSTRAP] ready`, container `healthy` |
| P-A2 | `curl http://localhost:5000/health` | `200 {"status":"ok","db":"postgres"}` | ✅ `{"db":"postgresql","status":"ok"}` |
| P-A3 | POST `/api/login` with seed creds | `200` + JWT in response | ✅ `Login successful!` (99-char JWT) |
| P-A4 | `GET /api/projects` | `200` JSON array | ✅ |
| P-A5 | `POST /api/projects` with Bearer token | `201`; new project returned | ✅ after 2.5 fix; serialized project + image |
| P-A6 | `docker compose exec db psql -U portfolio -c "SELECT id, name FROM projects;"` 📸 | Created project visible in SQL | ✅ transcript in review notes |
| P-A7 | `docker compose restart api` → repeat P-A4 | Data **still there** (volume persistence proven) | ✅ 2 rows survive restart |
| P-A8 | 6th login inside 60 s | `429 Too Many Requests` | ✅ 5×401 → 429 `5 per 1 minute` |
| P-A9 | `docker compose --profile debug up` → browse `localhost:5050` 📸 | pgAdmin shows tables/rows | ✅ HTTP 200; server tree: host `db`, user from compose |

**Bonus (local preview of P-B3):** security headers confirmed on `/health` locally — HSTS, nosniff, X-Frame-Options, CSP, Referrer-Policy all present.

### Stage B — Deployed environment

| ID | Action | Expected |
|----|--------|----------|
| P-B1 | `curl https://<app>.onrender.com/health` | `200 {"status":"ok", ...}` |
| P-B2 | Repeat A3/A4/A5 against public URL | Same results over HTTPS |
| P-B3 | `curl -I` any endpoint | HSTS, nosniff, X-Frame-Options, CSP headers present 📸 |
| P-B4 | `scripts/test_rate_limit.py` → public URL | 429 documented after threshold |
| P-B5 | Browser: GitHub Pages site → Login view → authenticate | Real token stored; protected route opens |
| P-B6 | Create project through the deployed UI | Appears in list after refresh (full round-trip SPA↔API) 📸 |
| P-B7 | Wait >15 min idle → first request | Slow-but-successful response ≈50 s (cold start, documented) |
| P-B8 | DevTools Network from Pages origin | No CORS errors; `Origin: https://gioudi.github.io` accepted |

### Exit rule
Phase closes only when **all Stage A + B rows are checked** in SPEC verification with linked evidence.

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Render free disk wipes on redeploy | Documented demo-grade caveat; one-env switch to Neon when persistence matters |
| Cold-start looks like outage | `/health` + documented wake time; status note in README |
| Secrets leakage | Dashboard-only config; `.env` gitignored (already); `.dockerignore` blocks it from images |
| Bootstrap races with multiple workers | Seed functions idempotent (existing checks); `RUN_BOOTSTRAP` single-run convention |

---

## 10. Verification Checklist

- [x] D1 `backend/Dockerfile` — slim, non-root, HEALTHCHECK, gunicorn `--chdir src main:app`
- [x] D2 `backend/.dockerignore` — excludes `.env`, `*.db`, caches
- [x] D3 `docker-compose.yml` — api + db (healthcheck-gated) + pgadmin behind `debug` profile
- [x] D4 `/health` endpoint reporting app + DB engine
- [x] D5 Bootstrap relocation (`RUN_BOOTSTRAP`) — gunicorn-safe seeding
- [x] D6 `client/src/axios.ts` env-driven base URL
- [x] D7 `.env.example` aligned with real config surface (`POSTGRES_*`, `RUN_BOOTSTRAP`)
- [x] D8 `render.yaml` blueprint with `sync: false` secrets
- [x] Stage A proofs P-A1…P-A9 green (results table above)
- [ ] Stage B proofs P-B1…P-B8 — blocked on Render account + first deploy (Jör)
- [ ] README: deploy section + cold-start note (with Stage B)
- [x] SPEC updated with discovered-bug fixes (2.5, 2.6)

## 11. Deferred Items

| Item | Why | When |
|------|-----|------|
| Controller/service image-contract mismatch | Service requires ≥1 image; controller validates only *if present* — align both | Phase 7 |
| Redis-backed rate limiting | Costs money; single instance suffices | If scaled beyond 1 instance |
| CI image build (GitHub Actions → registry) | Nice-to-have; Render builds natively | Phase 7+ |
| Alembic migrations | `create_all` adequate while schema is small | First schema change after launch |
| Custom domain / TLS tuning | Subdomain acceptable for demo | Post-launch |

---

*Spec Version: 1.1*
