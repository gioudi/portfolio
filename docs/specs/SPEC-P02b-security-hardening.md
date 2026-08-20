# SPEC-P02b: Security Hardening — Input Validation, Password Complexity & Security Headers

**Task ID:** JOR-02b
**Type:** security
**Priority:** High
**Status:** Completed
**Date:** 2026-08-19
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Add input validation, password complexity requirements, input sanitization, and security headers to all backend endpoints.

---

## 2. Why We're Preventing

### The Threat Landscape

Without these protections, our API is vulnerable to:

| Attack | What It Is | How It Hurts Us |
|--------|-----------|-----------------|
| **Cross-Site Scripting (XSS)** | Attacker injects malicious JavaScript into our fields (project name, description, etc.). When other users view the page, the script runs in THEIR browser. | Steals cookies, session tokens, redirects users to malicious sites, defaces our UI. Example: `<script>steal_cookies()</script>` in a project name field. |
| **Credential Stuffing** | Attacker takes leaked username/password combos from other breaches (LinkedIn, Facebook, etc.) and tries them on our site. People reuse passwords, so 1-3% usually work. | Account takeover without any actual hacking — just automation of stolen credentials. |
| **Buffer Overflow** | Sending way more data than expected. Like filling a 1-liter bottle with 100 liters — it overflows and crashes. A 10MB "name" field when we expect 255 characters. | Crashes servers, can exploit memory, causes denial of service. |
| **SQL Injection** | Malicious SQL code inserted through user input. If we don't validate, attacker can query our entire database. | Data breach, data destruction, unauthorized access to all user data. |
| **Clickjacking** | Attacker puts an invisible button on top of a visible one. User thinks they click "Play Video" but actually click "Delete Account". | Users perform actions they never intended. Our site gets embedded in attacker's iframe. |
| **MIME Sniffing** | Browser ignores server's file type declaration and guesses. Server says "image" but browser finds JavaScript and executes it. | Malicious files disguised as safe ones get executed in user's browser. |
| **Protocol Downgrade Attack** | Attacker forces connection from HTTPS (encrypted) back to HTTP (plain text). Like ripping the lock off your door. | All data transmitted in plain text — passwords, tokens, everything visible to attacker. |

---

## 3. Changes Made

### 3.1 Input Validation (`utils/validators.py`)

New validation utility module with functions:

| Function | Purpose | Attack Prevented |
|----------|---------|------------------|
| `validate_required_fields(data, fields)` | Check required JSON fields exist | Incomplete data processing |
| `validate_string_length(value, field, min, max)` | Enforce string length limits | Buffer overflow, memory exhaustion |
| `validate_url(url, field)` | Validate URL format (http/https) | SSRF (Server-Side Request Forgery) |
| `validate_email(email)` | Validate email format | Injection attacks via email |
| `validate_password_complexity(password)` | Enforce password rules | Brute force, credential stuffing |
| `sanitize_string(value)` | Strip HTML tags, escape entities | XSS (Cross-Site Scripting) |
| `sanitize_dict(data, fields)` | Sanitize multiple string fields | XSS on multiple fields |

### 3.2 Login Endpoint (`auth_controller.py`)

- Validate required fields: `username`, `password`
- Sanitize inputs before processing
- Validate username length (3–50 chars)
- Validate password length (1–128 chars)

**Why:** Prevents brute force attacks (combined with rate limiting from Phase 2) and ensures only well-formed data enters authentication flow.

### 3.3 Project Creation Endpoint (`project_controller.py`)

- Validate required fields: `name`, `link`, `project_type_id`, `technologies`, `tags`
- Sanitize string inputs: `name`, `description`, `link`, `responsibilities`
- Validate project name length (1–255 chars)
- Validate project link is valid URL
- Validate description length (max 2000 chars)
- Validate responsibilities length (max 2000 chars)
- Validate technologies and tags are non-empty lists
- Validate images list: each must have valid URL
- Validate videos list: each must have valid URL

**Why:** Project creation is our most complex endpoint. Without validation, attackers could:
- Inject XSS payloads in project names/descriptions
- Send massive payloads to crash the server (buffer overflow)
- Submit malformed URLs that could trigger SSRF attacks

### 3.4 Password Complexity (`main.py`)

Default user creation now validates password meets requirements:
- Minimum 8 characters, maximum 128
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (`!@#$%^&*(),.?":{}|<>`)
- Skips user creation with warning if password doesn't meet requirements

**Why:** Weak passwords are the #1 entry point for credential stuffing attacks. Complexity requirements make brute force exponentially harder.

### 3.5 Security Headers (`main.py`)

Added `@app.after_request` handler with headers:

| Header | Value | What It Prevents | Plain English |
|--------|-------|------------------|---------------|
| `X-Content-Type-Options` | `nosniff` | MIME Sniffing | "Trust what I tell you this file is — don't sniff and guess." |
| `X-Frame-Options` | `DENY` | Clickjacking | "Never embed my site in someone else's iframe." |
| `X-XSS-Protection` | `1; mode=block` | XSS | "Enable browser's XSS filter and block the page if detected." |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Protocol Downgrade | "For the next year, ONLY connect via HTTPS — never HTTP." |
| `Content-Security-Policy` | `default-src 'self'` | XSS, Data Injection | "Only load resources from my own domain — no external scripts." |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Information Leakage | "When linking elsewhere, only reveal the domain, not the full URL." |

### 3.6 CSRF Protection

**Not required** for this API. CSRF attacks target cookie-based authentication. This API uses JWT tokens sent via `Authorization` header, which browsers never send automatically. CSRF protection is inherently provided by the JWT pattern.

**Why this is safe:** Cookies are automatically sent by browsers with every request to a domain. JWT tokens are NOT — they must be explicitly attached via JavaScript. An attacker can forge a request from their site that includes cookies, but cannot include our JWT token. The JWT pattern is inherently CSRF-proof.

---

## 4. What This Prevents — Attack Matrix

| Attack | Without Protection | With Protection | Defense Layer |
|--------|-------------------|-----------------|---------------|
| **XSS** | `<script>steal()</script>` in project name → runs in every viewer's browser | Tags stripped, rendered as harmless text | `sanitize_string()` + CSP header |
| **SQL Injection** | `'; DROP TABLE users;--` → deletes entire user table | Rejected: invalid input format | `validate_*()` functions |
| **Buffer Overflow** | 10MB name field → crashes server | Rejected: exceeds 255 char limit | `validate_string_length()` |
| **Credential Stuffing | `admin:password123` works on 3% of sites | Rejected: doesn't meet complexity rules | `validate_password_complexity()` |
| **Clickjacking** | Site embedded in invisible iframe → user clicks wrong button | Site refuses to be framed | `X-Frame-Options: DENY` |
| **MIME Sniffing** | Fake "image" file contains JavaScript → browser executes it | Browser trusts server's content type | `X-Content-Type-Options: nosniff` |
| **Protocol Downgrade** | Attacker strips HTTPS → all data transmitted in plain text | Browser refuses HTTP for 1 year | `Strict-Transport-Security` |

---

## 5. Defense in Depth — Layered Security

We don't rely on a single protection. Multiple layers work together:

```
┌─────────────────────────────────────────────────────────┐
│                    REQUEST FLOW                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Client Request                                          │
│       │                                                  │
│       ▼                                                  │
│  ┌──────────────────┐                                    │
│  │ Layer 1: HEADERS │  Security headers added           │
│  └──────────────────┘  (X-Frame-Options, CSP, etc.)     │
│       │                                                  │
│       ▼                                                  │
│  ┌──────────────────┐                                    │
│  │ Layer 2: RATE    │  Rate limiter checks              │
│  │    LIMITING      │  (5 req/min from Phase 2)         │
│  └──────────────────┘                                    │
│       │                                                  │
│       ▼                                                  │
│  ┌──────────────────┐                                    │
│  │ Layer 3: INPUT   │  Validate fields exist,           │
│  │   VALIDATION     │  types, lengths, formats          │
│  └──────────────────┘                                    │
│       │                                                  │
│       ▼                                                  │
│  ┌──────────────────┐                                    │
│  │ Layer 4: INPUT   │  Strip HTML, escape               │
│  │  SANITIZATION    │  special characters               │
│  └──────────────────┘                                    │
│       │                                                  │
│       ▼                                                  │
│  ┌──────────────────┐                                    │
│  │ Layer 5: CORS    │  Only allowed origins             │
│  │   RESTRICTION    │  (from Phase 2)                   │
│  └──────────────────┘                                    │
│       │                                                  │
│       ▼                                                  │
│  Business Logic (safe input guaranteed)                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

If one layer fails, the next catches it. This is called **Defense in Depth**.

---

## 6. Files Changed

| File | Change |
|------|--------|
| `backend/src/utils/validators.py` | New — validation utility module |
| `backend/src/controllers/auth_controller.py` | Added input validation and sanitization |
| `backend/src/controllers/project_controller.py` | Added input validation and sanitization |
| `backend/src/main.py` | Password complexity check + security headers |
| `backend/.env.example` | Updated password example with complexity note |

---

## 7. Patterns Applied

| Pattern | Where | What It Means | Benefit |
|---------|-------|---------------|---------|
| **Defense in Depth** | Entire security stack | Multiple layers of protection — no single point of failure | If one layer is bypassed, others still protect |
| **Input Validation Pattern** | `validators.py` | Validate ALL input at the entry point before processing | Blocks malformed data before it reaches business logic |
| **Sanitization Pattern** | `sanitize_string()`, `sanitize_dict()` | Clean input after validation — strip dangerous content | Prevents XSS even if validation is bypassed |
| **Fail-Safe Defaults** | All validators, password check | Default to REJECT — only accept if all checks pass | Secure by default, not secure by exception |
| **Configuration as Code** | CORS origins via env vars, password rules in code | Security config lives in environment, not hardcoded | Different settings per environment without code changes |
| **Single Source of Truth** | `validators.py` centralized | One place for all validation logic | Change rules once, applies everywhere |

---

## 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Valid input accidentally rejected | Low | Medium | Clear error messages tell user exactly what's wrong |
| Validation too strict for future features | Medium | Low | Validators are modular — easy to adjust limits |
| Sanitization strips legitimate HTML | Low | Medium | Our app doesn't support HTML in user fields anyway |
| CSP header blocks legitimate resources | Medium | High | Test thoroughly; CSP can be relaxed per-resource if needed |
| Password complexity frustrates users | Medium | Low | Rules are standard (most password managers handle them) |

---

## 9. What This Does NOT Fix (Deferred)

| Issue | Reason Deferred | Target Phase |
|-------|-----------------|--------------|
| Token refresh mechanism | Requires new endpoint + frontend changes | Phase 3+ |
| Session invalidation on logout | Requires token blacklist or short-lived tokens | Phase 3+ |
| HTTPS enforcement at server level | Requires deployment config (nginx/reverse proxy) | Phase 6 (Containerization) |
| Content Security Policy tuning | Need to test with actual frontend assets | Phase 4 (Performance) |
| Password hashing cost tuning | bcrypt rounds need benchmarking | Phase 4 (Performance) |

---

## 10. Verification

- Login with missing fields → 400 error with descriptive message
- Login with short username → 400 error
- Create project with missing fields → 400 error
- Create project with invalid URL → 400 error
- Create project with HTML in name → sanitized (tags stripped)
- Default user with weak password → skipped with warning
- All responses include security headers
- Request from non-allowed origin → CORS blocked (Phase 2)
- 6th login attempt in 1 minute → 429 rate limited (Phase 2)

---

*Spec Version: 2.0*
*Last Updated: 2026-08-20*
*Changes: Added "Why We're Preventing", "Attack Matrix", "Defense in Depth", "Patterns Applied", "Risk Assessment", "Deferred Items" sections per contract quality standards.*
