"""
Test the rate limiter on the login endpoint.

Usage:
    python scripts/test_rate_limit.py [--url URL] [--requests N] [--delay SECONDS]

Default:
    --url       http://localhost:5000/api/login
    --requests  6 (5 should pass, 6th should be rate-limited)
    --delay     1 (seconds between requests)

This script sends multiple login requests and shows which ones
succeed (200/401) and which ones are rate-limited (429).

Expected behavior with 5/minute limit:
    Request 1-5: 200 or 401 (valid or invalid credentials)
    Request 6+:  429 (Too Many Requests)
"""

import argparse
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: 'requests' library not installed.")
    print("Install it with: pip install requests")
    sys.exit(1)


def test_rate_limit(url, num_requests, delay):
    print("=" * 50)
    print("  Rate Limiter Test")
    print("=" * 50)
    print()
    print(f"URL:        {url}")
    print(f"Requests:   {num_requests}")
    print(f"Delay:      {delay}s between requests")
    print()

    passed = 0
    limited = 0
    errors = 0

    for i in range(1, num_requests + 1):
        try:
            response = requests.post(
                url,
                json={"username": "test", "password": "test"},
                headers={"Content-Type": "application/json"},
                timeout=5,
            )

            status = response.status_code

            if status == 429:
                limited += 1
                symbol = "BLOCKED"
                color = "\033[91m"  # Red
            elif status in (200, 401):
                passed += 1
                symbol = "PASS"
                color = "\033[92m"  # Green
            else:
                errors += 1
                symbol = "ERROR"
                color = "\033[93m"  # Yellow

            reset = color + "\033[0m"
            print(f"  Request {i}: {color}{symbol}{reset} (HTTP {status})")

        except requests.exceptions.ConnectionError:
            errors += 1
            print(f"  Request {i}: \033[93mCONNECTION ERROR\033[0m (is the server running?)")

        except Exception as e:
            errors += 1
            print(f"  Request {i}: \033[93mERROR\033[0m ({e})")

        if i < num_requests:
            time.sleep(delay)

    print()
    print("=" * 50)
    print("  Results")
    print("=" * 50)
    print(f"  Passed:   {passed}")
    print(f"  Limited:  {limited}")
    print(f"  Errors:   {errors}")
    print()

    if limited > 0:
        print("  \033[92mRate limiter is working!\033[0m")
        print("  Some requests were correctly blocked with HTTP 429.")
    elif errors > 0:
        print("  \033[93mCould not determine results.\033[0m")
        print("  Check that the server is running and URL is correct.")
    else:
        print("  \033[91mRate limiter may NOT be working.\033[0m")
        print("  All requests passed — none were rate-limited.")

    print()
    return limited > 0


def main():
    parser = argparse.ArgumentParser(description="Test the login rate limiter")
    parser.add_argument(
        "--url",
        default="http://localhost:5000/api/login",
        help="Login endpoint URL (default: http://localhost:5000/api/login)",
    )
    parser.add_argument(
        "--requests",
        type=int,
        default=6,
        help="Number of requests to send (default: 6)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1,
        help="Seconds between requests (default: 1)",
    )

    args = parser.parse_args()
    success = test_rate_limit(args.url, args.requests, args.delay)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
