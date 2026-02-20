#!/bin/bash
# Daily auto git push for TrendLoop USA
cd /home/ubuntu/TrendLoop-USA
export PATH=$PATH:/home/ubuntu/.local/bin

# Source environment
if [ -f .env ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Check token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "[GitPush] No GITHUB_TOKEN. Skipping."
    exit 0
fi

# Configure git
git config user.email "bot@trendloopusa.net" 2>/dev/null
git config user.name "TrendLoop Bot" 2>/dev/null
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/yss007895-code/TrendLoop-USA.git" 2>/dev/null

# Stage changes (exclude secrets)
git add docs/ agents/ data/ *.py *.sh *.md .gitignore 2>/dev/null

# Check for changes
CHANGES=$(git diff --cached --stat 2>/dev/null)
if [ -z "$CHANGES" ]; then
    echo "[$(date)] [GitPush] No changes."
    exit 0
fi

DATE=$(date +%Y-%m-%d)
git commit -m "Auto-sync: Daily backup ${DATE}" 2>/dev/null

# Push
git push origin main 2>&1
if [ $? -eq 0 ]; then
    echo "[$(date)] [GitPush] Pushed successfully"
else
    echo "[$(date)] [GitPush] Push failed"
fi
