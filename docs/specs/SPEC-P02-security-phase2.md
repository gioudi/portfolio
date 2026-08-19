# SPEC-P02: Phase 2 - Security Hardening

**Task ID:** JOR-002
**Type:** fix/chore
**Priority:** Critical
**Status:** Proposed
**Date:** 2026-08-19
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Harden the Flask backend against common security vulnerabilities: restrict CORS, add rate limiting on login, disable debug mode, extract duplicated `token_required` decorator, and clean up dead code. This is the first of a multi-phase security effort.

---

## 2. Security Audit (Current State)

| # | Issue | Severity | File | Status |
|---|-------|----------|------|--------|
| 1 | CORS allows ALL origins (`*`) | **Critical** | `main.py:39` | Must fix |
| 2 | No rate limiting on login | **High** | `main.py:48` | Must fix |
| 3 | `debug=True` in production | **High** | `main.py:78` | Must fix |
| 4 | `token_required` duplicated | **Medium** | `project_controller.py:8`, `project_type_controller.py:14` | Should fix |
| 5 | Dead `encode_jwt` import | **Low** | `auth_controller.py:5` | Should fix |
| 6 | Dead `encode_jwt` function with wrong key | **Low** | `jwt_utils.py:12-18` | Should fix |
| 7 | No input validation on project creation | **Medium** | `project_controller.py:29` | Will fix later (Phase 2b) |
| 8 | `str(e)` in error response leaks internals | **Medium** | `auth_controller.py:28` | Should fix |

---

## 3. Detailed Fixes

### Fix #1: Restrict CORS Origins

**File:** `backend/src/main.py:39`

**Current:**
```python
CORS(app, resources={r"/*": {"origins": "*"}})
```

**Proposed:**
```python
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:8080").split(",")

CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})
```

**Why:**
- `*` means ANY website can make API requests to your backend
- An attacker could host a malicious page that calls your API using a logged-in user's browser
- Restricting to specific origins blocks this class of attack (CSRF-like)

**Environment variable:**
```
ALLOWED_ORIGINS=https://gioudi.github.io,http://localhost:8080
```

---

### Fix #2: Rate Limiting on Login

**File:** `backend/src/main.py` + new dependency

**What:** Add `flask-limiter` to limit login attempts to 5 per minute per IP.

**Why:**
- Without rate limiting, an attacker can try thousands of passwords per second
- Brute force attacks become trivially easy
- 5 attempts/minute is generous for legitimate users but blocks automated attacks

**New dependency:** `flask-limiter` in `requirements.txt`

**Implementation:**
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(get_remote_address, app=app)

@auth_blueprint.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    ...
```

---

### Fix #3: Disable Debug Mode

**File:** `backend/src/main.py:78`

**Current:**
```python
app.run(debug=True)
```

**Proposed:**
```python
DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
app.run(debug=DEBUG)
```

**Why:**
- `debug=True` exposes the Werkzeug debugger — an attacker can execute arbitrary Python code on your server via the interactive debugger console
- Stack traces reveal internal file paths, database structure, and code logic
- Should ONLY be true in local development

---

### Fix #4: Extract Duplicated `token_required`

**Files:** `project_controller.py`, `project_type_controller.py`
**New file:** `utils/auth_decorator.py`

**Current:** Identical `token_required` decorator in both controllers (8 lines each).

**Proposed:** Single `token_required` in `utils/auth_decorator.py`, imported by both controllers.

**Why:**
- DRY violation — two identical copies of the same logic
- If token handling changes, you'd need to update both files
- Bug risk: one copy gets updated, the other doesn't

---

### Fix #5-6: Clean Up Dead Code

**Files:** `auth_controller.py:5`, `jwt_utils.py:12-18`

- `auth_controller.py` imports `encode_jwt` but never calls it (auth_service does its own `jwt.encode`)
- `jwt_utils.encode_jwt()` uses `'sub'` as key but `decode_jwt()` looks for `'user_id'` — a latent bug if anyone ever calls `encode_jwt`

**Action:** Remove the unused import and the dead `encode_jwt` function.

---

### Fix #7: Sanitize Error Response

**File:** `backend/src/controllers/auth_controller.py:28`

**Current:**
```python
return jsonify({"message": "An error occurred", "error": str(e)}), 500
```

**Proposed:**
```python
return jsonify({"message": "An error occurred"}), 500
```

**Why:** `str(e)` can leak database errors, file paths, or other internal details to the client.

---

## 4. Files Changed

| File | Change |
|------|--------|
| `backend/src/main.py` | CORS restriction, rate limiting, debug mode fix |
| `backend/src/utils/auth_decorator.py` | **New** — extracted `token_required` |
| `backend/src/controllers/project_controller.py` | Import `token_required` from utils |
| `backend/src/controllers/project_type_controller.py` | Import `token_required` from utils |
| `backend/src/controllers/auth_controller.py` | Remove dead import, sanitize error |
| `backend/src/utils/jwt_utils.py` | Remove dead `encode_jwt` function |
| `backend/requirements.txt` | Add `flask-limiter` |
| `.env.example` | Add `ALLOWED_ORIGINS`, `FLASK_DEBUG` vars |

---

## 5. What This Does NOT Fix (Deferred)

| Issue | Reason Deferred | Target Phase |
|-------|-----------------|--------------|
| Input validation on project creation | Requires schema design, more complex | Phase 2b |
| CSRF protection | API-only backend with JWT — lower risk | Phase 2b |
| Password complexity requirements | Affects user model + validation | Phase 2b |
| Token refresh mechanism | Requires new endpoint + frontend changes | Phase 3+ |

---

## 6. Testing After Fix

1. **CORS test:** Make a request from a non-allowed origin → should be blocked
2. **Rate limit test:** Send 6 login requests in 1 minute → 6th should return 429
3. **Debug mode test:** Check that `debug=True` is NOT active in production config
4. **Token test:** Verify login + protected routes still work after refactor

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Rate limiter breaks local dev | Low | Medium | Use env var to disable in dev |
| CORS too restrictive | Medium | High | Test with actual frontend URL |
| Refactor breaks auth flow | Low | High | Run manual test suite after |

---

## 8. Patterns Applied

| Pattern | Where | Benefit |
|---------|-------|---------|
| **DRY** | Extracted `token_required` | Single source of truth |
| **Configuration as Code** | CORS via env vars | No code changes for different environments |
| **Fail-Safe Defaults** | `debug=False` by default | Secure unless explicitly enabled |
| **Rate Limiting** | Login endpoint | Brute force protection |

---

*Spec Version: 1.0*
*Last Updated: 2026-08-19*
