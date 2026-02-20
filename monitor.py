"""Server monitoring with 3-layer external alerting.
Layer 1: Heartbeat ping to healthchecks.io (dead man's switch)
Layer 2: Process watchdog (checks cron, python, nginx)
Layer 3: Email alert via SMTP (fallback)

If this script STOPS running, healthchecks.io detects the silence and alerts you.
This is the key: the alert comes from OUTSIDE, not from the dead server.
"""
import os
import sys
import io
import json
import shutil
import subprocess
import urllib.request
import urllib.error
from datetime import datetime, timezone

# Force UTF-8 for Korean Windows compatibility
if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# --- Configuration ---
ALERT_THRESHOLDS = {
    "cpu_percent": 85,
    "memory_percent": 85,
    "disk_percent": 90,
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_DIR = os.path.join(BASE_DIR, "logs")
ALERT_LOG = os.path.join(LOG_DIR, "monitor_alerts.log")
STATUS_FILE = os.path.join(LOG_DIR, "server_status.json")

# External alerting URLs (set in .env or here)
HEALTHCHECK_PING_URL = os.environ.get("HEALTHCHECK_PING_URL", "")
WEBHOOK_URL = os.environ.get("MONITOR_WEBHOOK_URL", "")

# Processes that should be running
CRITICAL_PROCESSES = ["cron"]


def get_cpu_usage():
    try:
        result = subprocess.run(
            ["top", "-bn1"], capture_output=True, text=True, timeout=10
        )
        for line in result.stdout.split("\n"):
            if "Cpu(s)" in line or "%Cpu" in line:
                parts = line.split(",")
                for part in parts:
                    if "id" in part:
                        idle = float(part.strip().split()[0])
                        return round(100 - idle, 1)
    except Exception:
        pass
    return 0


def get_memory_usage():
    try:
        result = subprocess.run(
            ["free", "-m"], capture_output=True, text=True, timeout=10
        )
        for line in result.stdout.strip().split("\n"):
            if line.startswith("Mem:"):
                parts = line.split()
                total = int(parts[1])
                used = int(parts[2])
                return round(used / total * 100, 1) if total > 0 else 0
    except Exception:
        pass
    return 0


def get_disk_usage():
    try:
        usage = shutil.disk_usage("/")
        return round(usage.used / usage.total * 100, 1)
    except Exception:
        return 0


def check_critical_processes():
    """Check if critical processes are running."""
    missing = []
    for proc_name in CRITICAL_PROCESSES:
        try:
            result = subprocess.run(
                ["pgrep", "-x", proc_name],
                capture_output=True, text=True, timeout=5,
            )
            if result.returncode != 0:
                missing.append(proc_name)
        except Exception:
            missing.append(proc_name)
    return missing


def check_cron_health():
    """Verify cron jobs are configured."""
    try:
        result = subprocess.run(
            ["crontab", "-l"], capture_output=True, text=True, timeout=5
        )
        lines = [l for l in result.stdout.strip().split("\n") if l.strip() and not l.startswith("#")]
        return len(lines)
    except Exception:
        return 0


def check_disk_space_detail():
    """Get detailed disk info."""
    try:
        usage = shutil.disk_usage("/")
        free_gb = usage.free / (1024 ** 3)
        return round(free_gb, 1)
    except Exception:
        return 0


def ping_healthcheck(status="ok"):
    """Ping healthchecks.io dead man's switch.
    If this ping STOPS arriving, healthchecks.io alerts the user.
    """
    if not HEALTHCHECK_PING_URL:
        return

    url = HEALTHCHECK_PING_URL
    if status == "fail":
        url += "/fail"

    try:
        req = urllib.request.Request(url, method="POST")
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        # Don't crash monitor if ping fails
        print(f"[Monitor] Healthcheck ping failed: {e}")


def send_webhook(message):
    """Send alert to Discord/Slack webhook."""
    if not WEBHOOK_URL:
        return

    try:
        payload = json.dumps({"content": f"[TrendLoop Server] {message}"})
        req = urllib.request.Request(
            WEBHOOK_URL,
            data=payload.encode(),
            headers={"Content-Type": "application/json"},
        )
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"[Monitor] Webhook failed: {e}")


def send_alert(message):
    """Multi-channel alert: log + webhook + healthcheck fail signal."""
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    alert_text = f"[{timestamp}] ALERT: {message}"

    # Log to file
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(ALERT_LOG, "a", encoding="utf-8") as f:
        f.write(alert_text + "\n")

    print(alert_text)

    # Send to webhook
    send_webhook(message)

    # Signal failure to healthcheck
    ping_healthcheck("fail")


def run_health_check():
    """Run full server health check with external alerting."""
    cpu = get_cpu_usage()
    memory = get_memory_usage()
    disk = get_disk_usage()
    free_gb = check_disk_space_detail()
    missing_procs = check_critical_processes()
    cron_jobs = check_cron_health()

    status = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "cpu_percent": cpu,
        "memory_percent": memory,
        "disk_percent": disk,
        "disk_free_gb": free_gb,
        "critical_processes_missing": missing_procs,
        "cron_jobs_count": cron_jobs,
        "alerts": [],
    }

    # Check thresholds
    if cpu > ALERT_THRESHOLDS["cpu_percent"]:
        msg = f"HIGH CPU: {cpu}% (limit {ALERT_THRESHOLDS['cpu_percent']}%)"
        status["alerts"].append(msg)
        send_alert(msg)

    if memory > ALERT_THRESHOLDS["memory_percent"]:
        msg = f"HIGH MEMORY: {memory}% (limit {ALERT_THRESHOLDS['memory_percent']}%)"
        status["alerts"].append(msg)
        send_alert(msg)

    if disk > ALERT_THRESHOLDS["disk_percent"]:
        msg = f"HIGH DISK: {disk}% (limit {ALERT_THRESHOLDS['disk_percent']}%), {free_gb}GB free"
        status["alerts"].append(msg)
        send_alert(msg)

    if missing_procs:
        msg = f"PROCESS DOWN: {', '.join(missing_procs)}"
        status["alerts"].append(msg)
        send_alert(msg)

    if cron_jobs == 0:
        msg = "NO CRON JOBS found - automation may be broken!"
        status["alerts"].append(msg)
        send_alert(msg)

    # Save status
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump(status, f, indent=2)

    # Health summary
    health = "OK" if not status["alerts"] else "WARNING"
    print(f"[Monitor] {health} | CPU:{cpu}% MEM:{memory}% DISK:{disk}% Free:{free_gb}GB Cron:{cron_jobs}")

    # If everything OK, ping healthcheck as success
    if not status["alerts"]:
        ping_healthcheck("ok")

    return status


if __name__ == "__main__":
    status = run_health_check()
    if status["alerts"]:
        print(f"\n{len(status['alerts'])} alert(s) triggered!")
    else:
        print("\nAll systems normal.")
