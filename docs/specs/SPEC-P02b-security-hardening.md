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

## 2. Changes Made

### 2.1 Input Validation (`utils/validators.py`)

New validation utility module with functions:

| Function | Purpose |
|----------|---------|
| `validate_required_fields(data, fields)` | Check required JSON fields exist |
| `validate_string_length(value, field, min, max)` | Enforce string length limits |
| `validate_url(url, field)` | Validate URL format (http/https) |
| `validate_email(email)` | Validate email format |
| `validate_password_complexity(password)` | Enforce password rules |
| `sanitize_string(value)` | Strip HTML tags, escape entities |
| `sanitize_dict(data, fields)` | Sanitize multiple string fields |

### 2.2 Login Endpoint (`auth_controller.py`)

- Validate required fields: `username`, `password`
- Sanitize inputs before processing
- Validate username length (3–50 chars)
- Validate password length (1–128 chars)

### 2.3 Project Creation Endpoint (`project_controller.py`)

- Validate required fields: `name`, `link`, `project_type_id`, `technologies`, `tags`
- Sanitize string inputs: `name`, `description`, `link`, `responsibilities`
- Validate project name length (1–255 chars)
- Validate project link is valid URL
- Validate description length (max 2000 chars)
- Validate responsibilities length (max 2000 chars)
- Validate technologies and tags are non-empty lists
- Validate images list: each must have valid URL
- Validate videos list: each must have valid URL

### 2.4 Password Complexity (`main.py`)

Default user creation now validates password meets requirements:
- Minimum 8 characters, maximum 128
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (`!@#$%^&*(),.?":{}|<>`)
- Skips user creation with warning if password doesn't meet requirements

### 2.5 Security Headers (`main.py`)

Added `@app.after_request` handler with headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS filter |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS |
| `Content-Security-Policy` | `default-src 'self'` | Restrict resource loading |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |

### 2.6 CSRF Protection

**Not required** for this API. CSRF attacks target cookie-based authentication. This API uses JWT tokens sent via `Authorization` header, which browsers never send automatically. CSRF protection is inherently provided by the JWT pattern.

---

## 3. Files Changed

| File | Change |
|------|--------|
| `backend/src/utils/validators.py` | New — validation utility module |
| `backend/src/controllers/auth_controller.py` | Added input validation and sanitization |
| `backend/src/controllers/project_controller.py` | Added input validation and sanitization |
| `backend/src/main.py` | Password complexity check + security headers |
| `backend/.env.example` | Updated password example with complexity note |

---

## 4. Verification

- Login with missing fields → 400 error with descriptive message
- Login with short username → 400 error
- Create project with missing fields → 400 error
- Create project with invalid URL → 400 error
- Create project with HTML in name → sanitized (tags stripped)
- Default user with weak password → skipped with warning
- All responses include security headers

---

*Spec Version: 1.0*
*Last Updated: 2026-08-19*
