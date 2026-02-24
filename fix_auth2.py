#!/usr/bin/env python3
"""Clean up ALL remaining google_creds.json references from project code."""
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
        print(f"[SKIP] {fname} not found")
        continue

    with open(fpath, "r") as f:
        content = f.read()

    original = content

    # Pattern 1: Full 3-line os.environ.setdefault block
    content = re.sub(
        r'os\.environ\.setdefault\(\s*\n?\s*"GOOGLE_APPLICATION_CREDENTIALS",\s*\n?\s*os\.path\.join\([^)]+\)[^)]*\)\s*\n?',
        '',
        content
    )

    # Pattern 2: Leftover fragments like ', "google_creds.json"),'
    content = re.sub(r',\s*"google_creds\.json"\),?\s*\n?', '\n', content)

    # Pattern 3: Any remaining standalone GOOGLE_APPLICATION_CREDENTIALS setdefault
    content = re.sub(
        r'os\.environ\.setdefault\(\s*"GOOGLE_APPLICATION_CREDENTIALS"[^)]*\)\s*\n?',
        '',
        content
    )

    # Clean up double blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    if content != original:
        with open(fpath, "w") as f:
            f.write(content)
        print(f"[FIXED] {fname}")
    else:
        print(f"[OK]    {fname} (no changes needed)")

# Final verification
print("\n=== Verification ===")
for fname in files_to_fix:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r") as f:
        content = f.read()
    has_creds = "google_creds" in content or "GOOGLE_APPLICATION_CREDENTIALS" in content
    has_sa_file = "from_service_account_file" in content
    status = "CLEAN" if not has_creds and not has_sa_file else "NEEDS FIX"
    print(f"  {status}: {fname}")

print("\n[DONE]")
