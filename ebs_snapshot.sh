#!/bin/bash
# Weekly EBS snapshot for TrendLoop USA
export PATH=$PATH:/home/ubuntu/.local/bin
VOLUME_ID="vol-0310ae32d40aafecf"
REGION="us-east-1"
DESCRIPTION="TrendLoop-weekly-$(date +%Y%m%d)"

echo "[$(date)] Creating EBS snapshot: $DESCRIPTION"
SNAP_ID=$(aws --region $REGION ec2 create-snapshot     --volume-id $VOLUME_ID     --description "$DESCRIPTION"     --tag-specifications 'ResourceType=snapshot,Tags=[{Key=Name,Value=TrendLoop-Weekly},{Key=AutoCleanup,Value=true}]'     --query 'SnapshotId' --output text 2>&1)

if [ $? -eq 0 ]; then
    echo "[Snapshot] Created: $SNAP_ID"
else
    echo "[Snapshot] Failed: $SNAP_ID"
fi

# Delete snapshots older than 4 weeks (keep last 4)
echo "[Snapshot] Cleaning old snapshots..."
aws --region $REGION ec2 describe-snapshots     --filters "Name=tag:AutoCleanup,Values=true"     --query 'Snapshots | sort_by(@, &StartTime) | [0:-4].SnapshotId'     --output text 2>/dev/null | tr '\t' '\n' | while read snap; do
    if [ ! -z "$snap" ] && [ "$snap" != "None" ]; then
        echo "[Snapshot] Deleting old: $snap"
        aws --region $REGION ec2 delete-snapshot --snapshot-id $snap 2>/dev/null
    fi
done
echo "[Snapshot] Done."
