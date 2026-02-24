#!/usr/bin/env python3
"""Test ADC (Application Default Credentials) on GCE VM."""
import google.auth

credentials, project = google.auth.default()
print(f"[OK] ADC project: {project}")
print(f"[OK] Credentials type: {type(credentials).__name__}")
sa_email = getattr(credentials, "service_account_email", "N/A")
print(f"[OK] Service account: {sa_email}")

# Test Vertex AI init
try:
    import vertexai
    vertexai.init(project="fashion-money-maker", location="us-central1")
    print("[OK] Vertex AI initialized successfully")
except Exception as e:
    print(f"[WARN] Vertex AI init: {e}")

# Test Gemini API key
import os
import sys
sys.path.insert(0, "/home/ubuntu/TrendLoop-USA")
from dotenv import load_dotenv
load_dotenv("/home/ubuntu/TrendLoop-USA/.env")
key = os.environ.get("GEMINI_API_KEY", "")
print(f"[OK] GEMINI_API_KEY: {'set (' + key[:10] + '...)' if key else 'NOT SET'}")
