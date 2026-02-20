"""AWS Auto Setup - CloudWatch Alarms + EBS Snapshots + SNS Email Alerts.
One-time setup script. Run after configuring AWS credentials.

Sets up:
1. SNS Topic + Email subscription for alerts
2. CloudWatch Alarm: CPU > 80% -> email
3. CloudWatch Alarm: StatusCheckFailed -> email
4. EBS weekly auto-snapshot via Data Lifecycle Manager
5. Weekly cron for EBS snapshot (backup method)

Usage:
  1. Configure AWS: aws configure (or set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY)
  2. Run: python3 aws_setup.py your@email.com
"""
import os
import sys
import io
import json
import subprocess

if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

REGION = "us-east-1"
INSTANCE_ID = "i-0c7efc783623d8e91"

# Add local bin to PATH for awscli
os.environ["PATH"] = os.environ.get("PATH", "") + ":/home/ubuntu/.local/bin"


def run_aws(cmd):
    """Run AWS CLI command and return output."""
    full_cmd = f"aws --region {REGION} {cmd}"
    result = subprocess.run(
        full_cmd, shell=True, capture_output=True, text=True, timeout=30
    )
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr.strip()[:200]}")
        return None
    return result.stdout.strip()


def check_aws_credentials():
    """Verify AWS credentials are configured."""
    output = run_aws("sts get-caller-identity")
    if not output:
        print("[Setup] AWS credentials not configured!")
        print("[Setup] Run: aws configure")
        print("[Setup] Or set: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env")
        return False
    data = json.loads(output)
    print(f"[Setup] AWS Account: {data.get('Account')}")
    print(f"[Setup] User ARN: {data.get('Arn')}")
    return True


def create_sns_topic(email):
    """Create SNS topic and subscribe email."""
    print("\n[1/4] Creating SNS Topic for alerts...")

    # Create topic
    output = run_aws('sns create-topic --name TrendLoop-Server-Alerts')
    if not output:
        return None

    topic_arn = json.loads(output).get("TopicArn")
    print(f"  Topic ARN: {topic_arn}")

    # Subscribe email
    output = run_aws(
        f'sns subscribe --topic-arn {topic_arn} '
        f'--protocol email --notification-endpoint {email}'
    )
    if output:
        print(f"  Email subscription created: {email}")
        print(f"  >>> CHECK YOUR EMAIL AND CONFIRM THE SUBSCRIPTION! <<<")

    return topic_arn


def create_cpu_alarm(topic_arn):
    """Create CloudWatch alarm for CPU > 80%."""
    print("\n[2/4] Creating CPU alarm (>80%)...")

    cmd = (
        f'cloudwatch put-metric-alarm '
        f'--alarm-name "TrendLoop-CPU-High" '
        f'--alarm-description "CPU usage exceeds 80% for 5 minutes" '
        f'--metric-name CPUUtilization '
        f'--namespace AWS/EC2 '
        f'--statistic Average '
        f'--period 300 '
        f'--threshold 80 '
        f'--comparison-operator GreaterThanThreshold '
        f'--evaluation-periods 2 '
        f'--dimensions Name=InstanceId,Value={INSTANCE_ID} '
        f'--alarm-actions {topic_arn} '
        f'--ok-actions {topic_arn} '
        f'--unit Percent '
        f'--treat-missing-data missing'
    )
    output = run_aws(cmd)
    if output is not None:
        print("  CPU alarm created: >80% for 10min -> email")
    return output is not None


def create_status_check_alarm(topic_arn):
    """Create CloudWatch alarm for EC2 status check failure."""
    print("\n[3/4] Creating Status Check alarm...")

    cmd = (
        f'cloudwatch put-metric-alarm '
        f'--alarm-name "TrendLoop-StatusCheck-Failed" '
        f'--alarm-description "EC2 instance status check failed" '
        f'--metric-name StatusCheckFailed '
        f'--namespace AWS/EC2 '
        f'--statistic Maximum '
        f'--period 300 '
        f'--threshold 1 '
        f'--comparison-operator GreaterThanOrEqualToThreshold '
        f'--evaluation-periods 2 '
        f'--dimensions Name=InstanceId,Value={INSTANCE_ID} '
        f'--alarm-actions {topic_arn} '
        f'--treat-missing-data breaching'
    )
    output = run_aws(cmd)
    if output is not None:
        print("  Status check alarm created: instance down -> email")
    return output is not None


def setup_ebs_snapshot_cron():
    """Set up weekly EBS snapshot via cron + AWS CLI."""
    print("\n[4/4] Setting up weekly EBS snapshot...")

    # Get volume ID
    output = run_aws(
        f'ec2 describe-instances --instance-ids {INSTANCE_ID} '
        f'--query "Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId" '
        f'--output text'
    )
    if not output or output == "None":
        print("  Could not find volume ID")
        return False

    volume_id = output.strip()
    print(f"  Volume ID: {volume_id}")

    # Create snapshot script
    snapshot_script = f"""#!/bin/bash
# Weekly EBS snapshot for TrendLoop USA
export PATH=$PATH:/home/ubuntu/.local/bin
VOLUME_ID="{volume_id}"
DESCRIPTION="TrendLoop-weekly-$(date +%Y%m%d)"

echo "[Snapshot] Creating EBS snapshot: $DESCRIPTION"
SNAP_ID=$(aws --region {REGION} ec2 create-snapshot \\
    --volume-id $VOLUME_ID \\
    --description "$DESCRIPTION" \\
    --tag-specifications 'ResourceType=snapshot,Tags=[{{Key=Name,Value=TrendLoop-Weekly}},{{Key=AutoCleanup,Value=true}}]' \\
    --query 'SnapshotId' --output text 2>&1)

if [ $? -eq 0 ]; then
    echo "[Snapshot] Created: $SNAP_ID"
else
    echo "[Snapshot] Failed: $SNAP_ID"
fi

# Delete snapshots older than 30 days
echo "[Snapshot] Cleaning old snapshots..."
OLD_SNAPS=$(aws --region {REGION} ec2 describe-snapshots \\
    --filters "Name=tag:AutoCleanup,Values=true" \\
    --query "Snapshots[?StartTime<='$(date -d '-30 days' --iso-8601)'].SnapshotId" \\
    --output text 2>/dev/null)

for snap in $OLD_SNAPS; do
    echo "[Snapshot] Deleting old: $snap"
    aws --region {REGION} ec2 delete-snapshot --snapshot-id $snap 2>/dev/null
done
echo "[Snapshot] Done."
"""

    script_path = "/home/ubuntu/TrendLoop-USA/ebs_snapshot.sh"
    with open(script_path, "w") as f:
        f.write(snapshot_script)
    os.chmod(script_path, 0o755)

    # Add to crontab (every Sunday at 5 AM UTC)
    result = subprocess.run(["crontab", "-l"], capture_output=True, text=True)
    cron = result.stdout if result.returncode == 0 else ""

    if "ebs_snapshot" not in cron:
        cron += f"\n# Weekly EBS snapshot (Sunday 5AM UTC)\n"
        cron += f"0 5 * * 0 {script_path} >> /home/ubuntu/TrendLoop-USA/logs/snapshot.log 2>&1\n"
        subprocess.run(["crontab", "-"], input=cron, text=True, capture_output=True)
        print("  Cron added: Sunday 5AM UTC")

    print(f"  Script: {script_path}")
    return True


def setup_daily_git_push():
    """Set up daily auto git push via cron."""
    print("\n[Bonus] Setting up daily git push...")

    push_script = """#!/bin/bash
# Daily auto git push for TrendLoop USA
cd /home/ubuntu/TrendLoop-USA

# Source environment
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Configure git
GITHUB_TOKEN="${GITHUB_TOKEN}"
if [ -z "$GITHUB_TOKEN" ]; then
    echo "[GitPush] No GITHUB_TOKEN. Skipping."
    exit 0
fi

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/yss007895-code/TrendLoop-USA.git" 2>/dev/null

# Stage and commit
git add -A
CHANGES=$(git diff --cached --stat)
if [ -z "$CHANGES" ]; then
    echo "[GitPush] No changes to push."
    exit 0
fi

DATE=$(date +%Y-%m-%d)
git commit -m "Auto-sync: Daily backup ${DATE}" 2>/dev/null

# Push
git push origin main 2>&1
if [ $? -eq 0 ]; then
    echo "[GitPush] Pushed successfully: ${DATE}"
else
    echo "[GitPush] Push failed"
fi
"""

    script_path = "/home/ubuntu/TrendLoop-USA/daily_git_push.sh"
    with open(script_path, "w") as f:
        f.write(push_script)
    os.chmod(script_path, 0o755)

    # Add to crontab (daily at 11PM UTC / 6PM EST)
    result = subprocess.run(["crontab", "-l"], capture_output=True, text=True)
    cron = result.stdout if result.returncode == 0 else ""

    if "daily_git_push" not in cron:
        cron += f"\n# Daily auto git push (11PM UTC / 6PM EST)\n"
        cron += f"0 23 * * * {script_path} >> /home/ubuntu/TrendLoop-USA/logs/git_push.log 2>&1\n"
        subprocess.run(["crontab", "-"], input=cron, text=True, capture_output=True)
        print("  Cron added: daily 11PM UTC")

    print(f"  Script: {script_path}")
    return True


def main():
    print("=" * 60)
    print("  TrendLoop USA - AWS Auto Setup")
    print("=" * 60)

    if len(sys.argv) < 2:
        print("\nUsage: python3 aws_setup.py YOUR_EMAIL@example.com")
        print("\nPrerequisite: Configure AWS credentials first:")
        print("  aws configure")
        print("  (Need: Access Key ID, Secret Access Key, Region: us-east-1)")
        sys.exit(1)

    email = sys.argv[1]
    print(f"\nAlert email: {email}")

    # Check AWS credentials
    if not check_aws_credentials():
        sys.exit(1)

    # 1. Create SNS topic
    topic_arn = create_sns_topic(email)
    if not topic_arn:
        print("\nFailed to create SNS topic. Check IAM permissions.")
        sys.exit(1)

    # 2. CPU alarm
    create_cpu_alarm(topic_arn)

    # 3. Status check alarm
    create_status_check_alarm(topic_arn)

    # 4. EBS snapshot
    setup_ebs_snapshot_cron()

    # 5. Daily git push
    setup_daily_git_push()

    print("\n" + "=" * 60)
    print("  Setup Complete!")
    print("=" * 60)
    print(f"\n  1. CHECK YOUR EMAIL ({email}) and confirm SNS subscription!")
    print(f"  2. CPU >80% alarm: TrendLoop-CPU-High")
    print(f"  3. Instance down alarm: TrendLoop-StatusCheck-Failed")
    print(f"  4. EBS snapshot: Every Sunday 5AM UTC")
    print(f"  5. Git push: Daily 11PM UTC")
    print(f"\n  Save this SNS Topic ARN: {topic_arn}")


if __name__ == "__main__":
    main()
