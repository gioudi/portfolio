import re
from urllib.parse import urlparse


def validate_required_fields(data, required_fields):
    if not data or not isinstance(data, dict):
        return False, "Request body must be a JSON object"
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    return True, None


def validate_string_length(value, field_name, min_len=1, max_len=500):
    if not isinstance(value, str):
        return False, f"{field_name} must be a string"
    value = value.strip()
    if len(value) < min_len:
        return False, f"{field_name} must be at least {min_len} character(s)"
    if len(value) > max_len:
        return False, f"{field_name} must not exceed {max_len} characters"
    return True, None


def validate_url(url, field_name="URL"):
    if not isinstance(url, str):
        return False, f"{field_name} must be a string"
    try:
        result = urlparse(url.strip())
        if not result.scheme or not result.netloc:
            return False, f"{field_name} must be a valid URL with scheme (http/https)"
        if result.scheme not in ("http", "https"):
            return False, f"{field_name} must use http or https"
        return True, None
    except Exception:
        return False, f"{field_name} is not a valid URL"


def validate_email(email):
    if not isinstance(email, str):
        return False, "Email must be a string"
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email.strip()):
        return False, "Invalid email format"
    return True, None


def validate_password_complexity(password):
    if not isinstance(password, str):
        return False, "Password must be a string"
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if len(password) > 128:
        return False, "Password must not exceed 128 characters"
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r'[0-9]', password):
        return False, "Password must contain at least one digit"
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character"
    return True, None


def sanitize_string(value):
    if not isinstance(value, str):
        return value
    value = value.strip()
    value = re.sub(r'<[^>]+>', '', value)
    value = value.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return value


def sanitize_dict(data, string_fields):
    if not isinstance(data, dict):
        return data
    sanitized = {}
    for key, value in data.items():
        if key in string_fields and isinstance(value, str):
            sanitized[key] = sanitize_string(value)
        else:
            sanitized[key] = value
    return sanitized
