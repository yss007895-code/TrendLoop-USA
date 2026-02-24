#!/usr/bin/env python3
"""Fix indexing_agent.py to use google.auth.default() instead of service account file.
Also remove .env GOOGLE_APPLICATION_CREDENTIALS reference."""
import re

# Fix indexing_agent.py
path = "/home/ubuntu/TrendLoop-USA/agents/indexing_agent.py"
with open(path, "r") as f:
    content = f.read()

# Replace _get_credentials function body
old_pattern = r'def _get_credentials\(\):.*?return credentials'
new_func = '''def _get_credentials():
    """Get OAuth2 credentials for Indexing API (uses VM service account via ADC)."""
    try:
        import google.auth

        SCOPES = ["https://www.googleapis.com/auth/indexing"]
        credentials, project = google.auth.default(scopes=SCOPES)
        return credentials'''

content = re.sub(old_pattern, new_func, content, flags=re.DOTALL, count=1)

with open(path, "w") as f:
    f.write(content)
print(f"[OK] {path} - updated to google.auth.default()")

# Remove GOOGLE_APPLICATION_CREDENTIALS from .env
env_path = "/home/ubuntu/TrendLoop-USA/.env"
with open(env_path, "r") as f:
    lines = f.readlines()
with open(env_path, "w") as f:
    for line in lines:
        if "GOOGLE_APPLICATION_CREDENTIALS" not in line:
            f.write(line)
print(f"[OK] {env_path} - removed GOOGLE_APPLICATION_CREDENTIALS")

# Verify vertex_agent.py no longer has the setdefault
for agent in [
    "/home/ubuntu/TrendLoop-USA/agents/vertex_agent.py",
    "/home/ubuntu/TrendLoop-USA/agents/indexing_agent.py",
    "/home/ubuntu/TrendLoop-USA/batch_publisher.py",
]:
    with open(agent, "r") as f:
        txt = f.read()
    has_old = "GOOGLE_APPLICATION_CREDENTIALS" in txt
    has_sa_file = "from_service_account_file" in txt
    print(f"  {agent.split('/')[-1]}: GOOGLE_APP_CREDS={has_old}, sa_file={has_sa_file}")

print("\n[DONE] All files updated for VM-attached service account auth.")
