#!/usr/bin/env python3
"""Final fix: Remove os.environ.setdefault GOOGLE_APPLICATION_CREDENTIALS blocks
and update indexing_agent.py to use google.auth.default().

This script targets ONLY the 3-line setdefault block pattern, not arbitrary ')' lines.
"""
import re
import os

BASE = "/home/ubuntu/TrendLoop-USA"

files_to_fix = [
    "agents/vertex_agent.py",
    "agents/indexing_agent.py",
    "agents/analytics_agent.py",
    "agents/analytics_data_agent.py",
    "agents/translation_agent.py",
    "agents/tts_agent.py",
    "agents/vision_agent.py",
    "batch_publisher.py",
    "fashion_tuner.py",
]

for fname in files_to_fix:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        print(f"[SKIP] {fname}")
        continue

    with open(fpath, "r") as f:
        content = f.read()

    original = content

    # Remove the exact 3-line block:
    #   os.environ.setdefault(
    #       "GOOGLE_APPLICATION_CREDENTIALS",
    #       os.path.join(..., "google_creds.json"),
    #   )
    content = re.sub(
        r'os\.environ\.setdefault\(\s*\n\s*"GOOGLE_APPLICATION_CREDENTIALS",\s*\n\s*os\.path\.join\([^)]+\)[^)]*,?\s*\n\s*\)\s*\n',
        '',
        content
    )

    # Also handle single-line variant:
    #   os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS", os.path.join(...))
    content = re.sub(
        r'os\.environ\.setdefault\(\s*"GOOGLE_APPLICATION_CREDENTIALS"\s*,\s*os\.path\.join\([^)]+\)\s*\)\s*\n',
        '',
        content
    )

    # Clean up resulting double blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    if content != original:
        with open(fpath, "w") as f:
            f.write(content)
        print(f"[FIXED] {fname}")
    else:
        print(f"[OK]    {fname} (no changes)")

# --- Special fix for indexing_agent.py ---
# Replace from_service_account_file with google.auth.default()
idx_path = os.path.join(BASE, "agents/indexing_agent.py")
with open(idx_path, "r") as f:
    content = f.read()

old_get_creds = re.compile(
    r'def _get_credentials\(\):\s*\n'
    r'\s*"""[^"]*"""\s*\n'
    r'\s*try:\s*\n'
    r'\s*from google\.oauth2 import service_account\s*\n'
    r'\s*\n?'
    r'\s*SCOPES = \["https://www\.googleapis\.com/auth/indexing"\]\s*\n'
    r'\s*creds_path = os\.environ\.get\("GOOGLE_APPLICATION_CREDENTIALS", ""\)\s*\n'
    r'\s*\n?'
    r'\s*if not creds_path or not os\.path\.exists\(creds_path\):\s*\n'
    r'\s*print\("\[Indexing\] No credentials file found\. Skipping\."\)\s*\n'
    r'\s*return None\s*\n'
    r'\s*\n?'
    r'\s*credentials = service_account\.Credentials\.from_service_account_file\(\s*\n'
    r'\s*creds_path, scopes=SCOPES\s*\n'
    r'\s*\)\s*\n'
    r'\s*return credentials',
    re.MULTILINE
)

new_get_creds = '''def _get_credentials():
    """Get OAuth2 credentials for Indexing API (uses VM service account via ADC)."""
    try:
        import google.auth

        SCOPES = ["https://www.googleapis.com/auth/indexing"]
        credentials, project = google.auth.default(scopes=SCOPES)
        return credentials'''

result = old_get_creds.sub(new_get_creds, content)
if result != content:
    with open(idx_path, "w") as f:
        f.write(result)
    print("[FIXED] indexing_agent.py - _get_credentials() -> google.auth.default()")
else:
    print("[OK]    indexing_agent.py - _get_credentials() already updated or pattern mismatch")

# --- Verify syntax ---
print("\n=== Syntax Check ===")
all_ok = True
for fname in files_to_fix:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        continue
    try:
        with open(fpath) as f:
            compile(f.read(), fname, 'exec')
        has_old = "google_creds" in open(fpath).read()
        status = "CLEAN" if not has_old else "has google_creds ref"
        print(f"  OK  {fname} ({status})")
    except SyntaxError as e:
        print(f"  ERR {fname}: {e}")
        all_ok = False

if all_ok:
    print("\n[SUCCESS] All files pass syntax check.")
else:
    print("\n[FAIL] Some files have syntax errors!")
