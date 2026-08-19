"""
Generate a cryptographically secure SECRET_API_KEY and write it to .env.

Usage:
    python scripts/generate_secret.py

This script:
1. Generates a 64-character hex string using Python's secrets module
2. Creates backend/.env from .env.example if it doesn't exist
3. Inserts the generated key into .env
4. If .env already exists, asks before overwriting the SECRET_API_KEY
"""

import secrets
import os
import sys

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
ENV_FILE = os.path.join(BACKEND_DIR, ".env")
ENV_EXAMPLE = os.path.join(BACKEND_DIR, ".env.example")


def generate_key():
    return secrets.token_hex(32)


def create_env_from_example():
    if not os.path.exists(ENV_EXAMPLE):
        print(f"ERROR: {ENV_EXAMPLE} not found.")
        print("Create backend/.env.example first.")
        sys.exit(1)

    with open(ENV_EXAMPLE, "r") as f:
        content = f.read()

    key = generate_key()
    content = content.replace("your-secret-key-here", key)

    with open(ENV_FILE, "w") as f:
        f.write(content)

    print(f"Created {ENV_FILE}")
    print(f"SECRET_API_KEY={key}")
    print()
    print("IMPORTANT: Never commit .env to version control!")
    return key


def update_existing_env():
    with open(ENV_FILE, "r") as f:
        lines = f.readlines()

    key = generate_key()
    updated = False

    for i, line in enumerate(lines):
        if line.startswith("SECRET_API_KEY="):
            lines[i] = f"SECRET_API_KEY={key}\n"
            updated = True
            break

    if not updated:
        lines.append(f"\nSECRET_API_KEY={key}\n")

    with open(ENV_FILE, "w") as f:
        f.writelines(lines)

    print(f"Updated SECRET_API_KEY in {ENV_FILE}")
    print(f"SECRET_API_KEY={key}")
    return key


def main():
    print("=" * 50)
    print("  SECRET_API_KEY Generator")
    print("=" * 50)
    print()

    if os.path.exists(ENV_FILE):
        print(f".env already exists at {ENV_FILE}")
        answer = input("Regenerate SECRET_API_KEY? (y/N): ").strip().lower()
        if answer != "y":
            print("Aborted.")
            return
        update_existing_env()
    else:
        print(".env not found. Creating from .env.example...")
        create_env_from_example()

    print()
    print("Done! Your backend is ready to use.")


if __name__ == "__main__":
    main()
