# SPEC-SECRET-001: Credential Cleanup

**Task ID:** SECRET-001
**Type:** security
**Priority:** High
**Status:** Completed
**Date:** 2026-08-20
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Remove hardcoded credentials from source code and documentation. All sensitive values (usernames, passwords, emails) must come from environment variables, never from hardcoded strings.

---

## 2. Why This Matters

### The Threat

**Before:** Username `'sergiopenagos'` was hardcoded in `main.py`. An attacker who reads the source code (it's public on GitHub) now has:
- The exact username to try
- A valid password example in `.env.example`
- Half the credentials needed for brute-force

**After:** Username comes from `os.getenv("DEFAULT_USER")`. Source code reveals nothing about actual credentials.

### What This Prevents

| Attack | Without Fix | With Fix |
|--------|-------------|----------|
| **Brute Force** | Attacker knows exact username from source code | Username is unknown — must guess both username AND password |
| **Credential Stuffing** | Default password in `.env.example` is a valid password | Default password is obviously fake placeholder |
| **Social Engineering** | Real email in README can be used for phishing | Email is generic placeholder in docs |

---

## 3. Changes Made

### 3.1 `backend/src/main.py` — Use env var for username

**Before:**
```python
existing_user = session.query(User).filter_by(username='sergiopenagos').first()
DEFAULT_PASSWORD = os.getenv("DEFAULT_PASSWORD")
DEFAULT_USER = os.getenv("DEFAULT_USER")
DEFAULT_EMAIL = os.getenv("DEFAULT_EMAIL")
```

**After:**
```python
DEFAULT_USER = os.getenv("DEFAULT_USER")
DEFAULT_PASSWORD = os.getenv("DEFAULT_PASSWORD")
DEFAULT_EMAIL = os.getenv("DEFAULT_EMAIL")

existing_user = session.query(User).filter_by(username=DEFAULT_USER).first()
```

**Why:** Username was the only credential hardcoded. Password and email already used env vars. This makes the code consistent and secure.

### 3.2 `backend/.env.example` — Generic placeholders

**Before:**
```
DEFAULT_USER=sergiopenagos
DEFAULT_EMAIL=sergio@example.com
DEFAULT_PASSWORD=Ch@ngeMe1!  # Must have: 8+ chars, uppercase, lowercase, digit, special char
```

**After:**
```
DEFAULT_USER=admin
DEFAULT_EMAIL=your-email@example.com
DEFAULT_PASSWORD=ChangeMe-Only-Example!
```

**Why:**
- `sergiopenagos` → `admin` (generic, not a real username)
- `sergio@example.com` → `your-email@example.com` (obviously placeholder)
- `Ch@ngeMe1!` → `ChangeMe-Only-Example!` (clearly not a real password)
- Removed trailing comment (some dotenv parsers include it in value)

### 3.3 `README.md` — Remove real credentials from documentation

**Before:**
```
DEFAULT_USER=sergiopenagos
DEFAULT_PASSWORD=your_password
DEFAULT_EMAIL=sergiopenagos881@gmail.com
```

**After:**
```
DEFAULT_USER=admin
DEFAULT_PASSWORD=your_secure_password
DEFAULT_EMAIL=your-email@example.com
```

**Why:** Documentation is public. Real credentials in README = free credential harvesting for attackers.

---

## 4. Design Patterns Applied

| Pattern | Where | What It Means |
|---------|-------|---------------|
| **Environment Variables** | main.py | All config comes from env, never from code |
| **Fail-Safe Defaults** | .env.example | Placeholders are obviously fake — can't accidentally deploy with them |
| **Separation of Concerns** | Code vs Config | Code contains logic; config contains values |
| **Principle of Least Privilege** | Source code | Source code reveals nothing about actual credentials |

---

## 5. Files Changed

| File | Change |
|------|--------|
| `backend/src/main.py` | Username query now uses env var instead of hardcoded string |
| `backend/.env.example` | Replaced real values with generic placeholders |
| `README.md` | Replaced real credentials with generic placeholders |

---

## 6. What This Does NOT Change

| Item | Reason | Location |
|------|--------|----------|
| Contact email in ContactStep.vue | Intentional — portfolio is meant to be public contact info | `client/src/components/ContactStep.vue` |
| LinkedIn URL in ContactStep.vue | Intentional — portfolio links to professional profiles | `client/src/components/ContactStep.vue` |
| GitHub URLs in ContactStep.vue | Intentional — portfolio links to code repositories | `client/src/components/ContactStep.vue` |
| Real credentials in local `.env` | Correct — `.env` is gitignored, never committed | `backend/.env` |

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking local dev | Very Low | Low | Local `.env` has real values (gitignored) |
| Forgetting to set env vars in production | Medium | High | README documents: "copy .env.example to .env" |
| Accidentally committing `.env` | Low | Critical | `.gitignore` already covers `.env`, `.env.local`, `.env.*.local` |

---

## 8. Verification

- [ ] `main.py` has no hardcoded usernames
- [ ] `.env.example` has only generic placeholders
- [ ] `README.md` has only generic placeholders
- [ ] Local `.env` still works with real values
- [ ] `git log -S "sergiopenagos"` shows no matches in new code

---

*Spec Version: 1.0*
*Last Updated: 2026-08-20*
