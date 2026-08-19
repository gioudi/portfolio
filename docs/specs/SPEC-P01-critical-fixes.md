# SPEC-P01: Phase 1 - Critical Fixes

**Task ID:** JOR-P01
**Type:** fix
**Priority:** Critical
**Status:** Approved & Implementing
**Date:** 2026-08-18
**Author:** Brokkr (AI Architect)
**Approver:** Jör (Visionary)

---

## 1. Summary

Fix 5 critical bugs in the Flask backend that break authentication, project creation, and introduce security risks.

---

## 2. Bugs to Fix

| # | File | Line | Bug | Severity |
|---|------|------|-----|----------|
| 1 | `backend/src/services/project_service.py` | 8 | `__int__` typo (should be `__init__`) | Critical |
| 2 | `backend/src/controllers/auth_controller.py` | 24 | `jsonify(dict, 200)` (comma outside) | High |
| 3 | `backend/src/controllers/project_controller.py` | 10 | No "Bearer " prefix stripping | Critical |
| 4 | `backend/src/services/auth_service.py` | 16, 22 | `print()` with sensitive data | High |
| 5 | `backend/src/models/user.py` | 2, 4 | Own `Base` instead of importing shared | Critical |

---

## 3. Detailed Analysis & Fixes

### Bug #1: ProjectService Constructor Typo

**File:** `backend/src/services/project_service.py:8`

**Current Code:**
```python
class ProjectService:
    def __int__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository
```

**Fixed Code:**
```python
class ProjectService:
    def __init__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository
```

**Why This Matters:**
- `__int__` is not a Python constructor. It's a method for integer conversion.
- `__init__` is the actual constructor called when creating instances.
- Without proper `__init__`, `project_repository` is never assigned to `self`.

**What Breaks Without Fix:**
- `project_controller.py` creates `ProjectService()` without arguments
- When `create_project()` calls `self.project_repository.add_project()`, it throws `AttributeError`
- All project creation fails silently or crashes

---

### Bug #2: JSON Response Format

**File:** `backend/src/controllers/auth_controller.py:24`

**Current Code:**
```python
return jsonify({"message": "Login successful!", "token": token}, 200)
```

**Fixed Code:**
```python
return jsonify({"message": "Login successful!", "token": token}), 200
```

**Why This Matters:**
- `jsonify()` creates a Flask Response object with JSON content type.
- The second argument to `jsonify()` is NOT the HTTP status code.
- Status code must be passed as a separate argument to the `return` statement.

**What Breaks Without Fix:**
- Flask may ignore the status code or raise an error
- Client receives malformed response format
- Auth store on frontend expects `response.data[1] === 401` which never matches

---

### Bug #3: JWT Bearer Stripping

**File:** `backend/src/controllers/project_controller.py:10-14`

**Current Code:**
```python
def token_required(f):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        
        user_id = decode_jwt(token)  # ← Receives "Bearer eyJhbGci..."
        if not user_id:
            return jsonify({"message": "Token is invalid or expired!"}), 403
        
        return f(user_id, *args, **kwargs)
    return decorated
```

**Fixed Code:**
```python
def token_required(f):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        
        # Strip "Bearer " prefix
        if token.startswith("Bearer "):
            token = token.split(" ")[1]
        
        user_id = decode_jwt(token)
        if not user_id:
            return jsonify({"message": "Token is invalid or expired!"}), 403
        
        return f(user_id, *args, **kwargs)
    return decorated
```

**Why This Matters:**
- JWT tokens in HTTP headers follow the format: `Authorization: Bearer <token>`
- `decode_jwt()` expects just the token string, not the prefix.
- With the prefix, `jwt.decode()` fails because the token is malformed.

**What Breaks Without Fix:**
- All protected routes (create project) fail with 403
- Users cannot create projects even when authenticated
- Error message is misleading ("Token is invalid")

---

### Bug #4: Debug Print Statements

**Files:**
- `backend/src/services/auth_service.py:16, 22`
- `backend/src/controllers/project_type_controller.py:17, 25`
- `backend/src/utils/jwt_utils.py:23, 29`

**Code to Remove:**
```python
# auth_service.py
print(f"User fetched: {user.username}, Password: {user.password}")  # SECURITY RISK
print(f"Generated token: {token}")  # SECURITY RISK

# project_type_controller.py
print(token)  # SECURITY RISK
print(user_id)  # DEBUG

# jwt_utils.py
print(payload)  # DEBUG
print(f"Token has invalid: {e}")  # Should use proper logging
```

**Why This Matters:**
- Password hashes exposed in logs
- JWT tokens exposed in logs
- Debug output clutters production logs
- Potential information leakage in shared hosting environments

---

### Bug #5: User Model Base Declaration

**File:** `backend/src/models/user.py:2-4`

**Current Code:**
```python
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()  # ← Creates NEW Base

class User(Base):
    __tablename__ = 'users'
```

**Fixed Code:**
```python
from models.database import Base  # ← Import shared Base

class User(Base):
    __tablename__ = 'users'
```

**Why This Matters:**
- SQLAlchemy uses Base to track all models.
- When you call `Base.metadata.create_all()`, it creates tables for all models attached to that Base.
- If User has its own Base, it's not tracked by the shared Base.

**What Breaks Without Fix:**
- `users` table might not be created
- Relationships between User and Project may fail
- Database migrations could miss the User model

---

## 4. Design Patterns Applied

| Pattern | Where Applied | Benefit |
|---------|---------------|---------|
| **Constructor Injection** | ProjectService receives repository via `__init__` | Loose coupling, testable code |
| **Singleton** | Single shared `Base` for all models | Consistent model tracking |
| **Middleware** | `token_required` decorator processes requests | Separation of concerns |
| **DRY** | Centralized token extraction logic | No code duplication |
| **Single Responsibility** | Remove logging from auth logic | Each class has one job |

---

## 5. SOLID Principles Addressed

| Principle | Violation | Fix |
|-----------|-----------|-----|
| **S - Single Responsibility** | `login()` does auth + logging | Remove print statements |
| **O - Open/Closed** | Hardcoded token extraction | Centralized extraction function |
| **L - Liskov Substitution** | Inconsistent response formats | Standardized jsonify usage |
| **I - Interface Segregation** | User model depends on wrong Base | Use shared interface (Base) |
| **D - Dependency Inversion** | Service depends on concrete class | Accept repository via constructor |

---

## 6. Architectural Decisions

### Decision 1: Use Shared Base (Singleton Pattern)
- **Context:** Multiple models need consistent tracking
- **Decision:** All models import Base from `database.py`
- **Consequence:** Single source of truth for SQLAlchemy tracking

### Decision 2: Centralized Token Extraction (Middleware Pattern)
- **Context:** Multiple controllers need to extract JWT tokens
- **Decision:** Create `extract_token()` utility function
- **Consequence:** All controllers use same logic, easier to maintain

### Decision 3: Remove All Print Statements (SRP)
- **Context:** Print statements expose sensitive data
- **Decision:** Remove all debug prints
- **Future:** Replace with proper Logger class (Phase 2)

---

## 7. Testing After Fix

### Manual Verification Steps:
1. Start backend: `python main.py`
2. Test login: `POST /api/login` with valid credentials
3. Test project creation: `POST /api/projects` with valid token
4. Check server console: No sensitive data printed

### Expected Results:
- Login returns token in correct format
- Project creation works with Bearer token
- No password/token leaks in console

---

## 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing auth | Low | High | Test both login and protected routes |
| Missing print statement | Medium | Low | Search all files for `print(` |
| Import errors | Low | High | Verify all models import correctly |

---

## 9. Documentation Updated

- [x] This spec document
- [ ] PORTFOLIO_REVIEW.txt (after implementation)

---

## 10. Approval

**Jör's Approval:** Pending
**Implementation Status:** Ready to execute

---

*Spec Version: 1.0*
*Last Updated: 2026-08-18*
