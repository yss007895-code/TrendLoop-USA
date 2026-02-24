#!/usr/bin/env python3
"""Remove GOOGLE_APPLICATION_CREDENTIALS setdefault blocks (line-based approach).
Also fix indexing_agent.py to use google.auth.default()."""
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
        continue

    with open(fpath, "r") as f:
        lines = f.readlines()

    new_lines = []
    skip_until_close = False
    removed = 0

    for line in lines:
        if 'os.environ.setdefault(' in line and 'GOOGLE_APPLICATION_CREDENTIALS' in line:
            # Single-line variant
            skip_until_close = False
            removed += 1
            continue
        elif 'os.environ.setdefault(' in line:
            # Check if next lines have GOOGLE_APPLICATION_CREDENTIALS
            # We'll handle by looking at the flag
            skip_until_close = True
            removed += 1
            continue
        elif skip_until_close:
            if 'GOOGLE_APPLICATION_CREDENTIALS' in line or 'google_creds.json' in line:
                removed += 1
                continue
            elif line.strip() == ')':
                skip_until_close = False
                removed += 1
                continue
            else:
                # Not part of the block, keep it
                skip_until_close = False
                new_lines.append(line)
                continue

        new_lines.append(line)

    if removed > 0:
        with open(fpath, "w") as f:
            f.writelines(new_lines)
        print(f"[FIXED] {fname} (removed {removed} lines)")
    else:
        print(f"[OK]    {fname}")

# --- Fix indexing_agent.py: from_service_account_file -> google.auth.default() ---
idx_path = os.path.join(BASE, "agents/indexing_agent.py")
with open(idx_path, "r") as f:
    lines = f.readlines()

new_lines = []
in_get_creds = False
replaced = False
brace_depth = 0

for i, line in enumerate(lines):
    if 'def _get_credentials():' in line and not replaced:
        in_get_creds = True
        # Write the new function
        new_lines.append('def _get_credentials():\n')
        new_lines.append('    """Get OAuth2 credentials for Indexing API (VM service account via ADC)."""\n')
        new_lines.append('    try:\n')
        new_lines.append('        import google.auth\n')
        new_lines.append('\n')
        new_lines.append('        SCOPES = ["https://www.googleapis.com/auth/indexing"]\n')
        new_lines.append('        credentials, project = google.auth.default(scopes=SCOPES)\n')
        new_lines.append('        return credentials\n')
        replaced = True
        continue
    elif in_get_creds:
        # Skip original function body until we hit 'return credentials' or next def
        if 'return credentials' in line:
            in_get_creds = False
            continue
        continue

    new_lines.append(line)

if replaced:
    with open(idx_path, "w") as f:
        f.writelines(new_lines)
    print("[FIXED] indexing_agent.py -> google.auth.default()")

# --- Syntax check ---
print("\n=== Syntax Check ===")
all_ok = True
for fname in files_to_fix:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        continue
    try:
        with open(fpath) as f:
            compile(f.read(), fname, 'exec')
        with open(fpath) as f:
            has_old_env = 'os.environ.setdefault' in f.read() and 'GOOGLE_APPLICATION_CREDENTIALS' in open(fpath).read()
        with open(fpath) as f:
            has_sa = 'from_service_account_file' in f.read()
        marks = []
        if has_old_env:
            marks.append("setdefault")
        if has_sa:
            marks.append("sa_file")
        status = ", ".join(marks) if marks else "CLEAN"
        print(f"  OK  {fname} [{status}]")
    except SyntaxError as e:
        print(f"  ERR {fname}: {e}")
        all_ok = False

print(f"\n{'[SUCCESS]' if all_ok else '[FAIL]'}")
