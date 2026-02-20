"""Google Indexing API Agent - Instant search exposure for new posts.
Notifies Google the moment a new post is published, so it gets crawled
and indexed within minutes instead of days.

Uses Google Cloud Service Account (ADC) credentials.
Requires: Indexing API enabled in Google Cloud Console.
"""
import os
import sys
import io
import json

if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__))))

os.environ.setdefault(
    "GOOGLE_APPLICATION_CREDENTIALS",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "google_creds.json"),
)

from safety import tracker

BLOG_BASE_URL = os.environ.get("BLOG_BASE_URL", "https://trendloopusa.net")


def _get_credentials():
    """Get OAuth2 credentials for Indexing API."""
    try:
        from google.oauth2 import service_account

        SCOPES = ["https://www.googleapis.com/auth/indexing"]
        creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")

        if not creds_path or not os.path.exists(creds_path):
            print("[Indexing] No credentials file found. Skipping.")
            return None

        credentials = service_account.Credentials.from_service_account_file(
            creds_path, scopes=SCOPES
        )
        return credentials
    except ImportError:
        print("[Indexing] google-auth not installed. pip install google-auth")
        return None
    except Exception as e:
        print(f"[Indexing] Credentials error: {e}")
        return None


def _make_request(url, action="URL_UPDATED"):
    """Send indexing request to Google."""
    credentials = _get_credentials()
    if not credentials:
        return False

    try:
        from google.auth.transport.requests import AuthorizedSession

        session = AuthorizedSession(credentials)
        endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

        payload = {
            "url": url,
            "type": action,
        }

        response = session.post(endpoint, json=payload)
        tracker.log_api_call("indexing_api")

        if response.status_code == 200:
            data = response.json()
            print(f"[Indexing] OK: {url}")
            print(f"[Indexing] Notify time: {data.get('urlNotificationMetadata', {}).get('latestUpdate', {}).get('notifyTime', 'N/A')}")
            return True
        elif response.status_code == 403:
            print(f"[Indexing] 403 Forbidden - Enable Indexing API in Cloud Console")
            print(f"[Indexing] Also verify site ownership in Search Console")
            return False
        elif response.status_code == 429:
            print(f"[Indexing] Rate limited. Try again later.")
            return False
        else:
            print(f"[Indexing] Error {response.status_code}: {response.text[:200]}")
            return False
    except Exception as e:
        print(f"[Indexing] Request error: {e}")
        tracker.log_error("indexing_api")
        return False


def notify_url_updated(slug):
    """Notify Google that a URL has been updated/created."""
    url = f"{BLOG_BASE_URL}/{slug}.html"
    print(f"[Indexing] Submitting: {url}")
    return _make_request(url, "URL_UPDATED")


def notify_url_deleted(slug):
    """Notify Google that a URL has been removed."""
    url = f"{BLOG_BASE_URL}/{slug}.html"
    print(f"[Indexing] Removing: {url}")
    return _make_request(url, "URL_DELETED")


def submit_batch(slugs):
    """Submit multiple URLs for indexing."""
    print(f"[Indexing] Batch submitting {len(slugs)} URLs...")
    success = 0
    failed = 0

    for slug in slugs:
        ok = notify_url_updated(slug)
        if ok:
            success += 1
        else:
            failed += 1
            # If we get 403, stop trying (API not enabled)
            if failed >= 3:
                print("[Indexing] Too many failures. Stopping batch.")
                break

    print(f"[Indexing] Batch complete: {success} OK, {failed} failed out of {len(slugs)}")
    return success


def get_notification_status(slug):
    """Check the indexing status of a URL."""
    credentials = _get_credentials()
    if not credentials:
        return None

    try:
        from google.auth.transport.requests import AuthorizedSession
        import urllib.parse

        session = AuthorizedSession(credentials)
        url = f"{BLOG_BASE_URL}/{slug}.html"
        encoded_url = urllib.parse.quote(url, safe="")
        endpoint = f"https://indexing.googleapis.com/v3/urlNotifications/metadata?url={encoded_url}"

        response = session.get(endpoint)
        tracker.log_api_call("indexing_api")

        if response.status_code == 200:
            return response.json()
        else:
            print(f"[Indexing] Status check failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"[Indexing] Status check error: {e}")
        return None


def submit_all_existing():
    """Submit all existing blog posts for indexing."""
    import glob

    docs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "docs")
    html_files = glob.glob(os.path.join(docs_dir, "*.html"))

    slugs = []
    for f in html_files:
        name = os.path.basename(f)
        if name != "index.html":
            slugs.append(os.path.splitext(name)[0])

    if not slugs:
        print("[Indexing] No posts found to index.")
        return 0

    print(f"[Indexing] Found {len(slugs)} posts to submit.")
    return submit_batch(slugs)


if __name__ == "__main__":
    print("=== Google Indexing API Test ===")
    if len(sys.argv) > 1:
        if sys.argv[1] == "--all":
            submit_all_existing()
        else:
            notify_url_updated(sys.argv[1])
    else:
        print("Usage:")
        print("  python3 indexing_agent.py SLUG    - Submit single URL")
        print("  python3 indexing_agent.py --all   - Submit all existing posts")
