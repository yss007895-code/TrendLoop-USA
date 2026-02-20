"""Google Analytics Data API Agent - Smart content optimization.
Pulls GA4 data daily, identifies high-CTR keywords,
and feeds them back into the content scheduler for data-driven publishing.

Requires:
  - GA4 Property ID in .env (GA4_PROPERTY_ID=123456789)
  - Google Analytics Data API enabled in Cloud Console
  - Service account added as viewer in GA4 Admin > Property Access
"""
import os
import sys
import io
import json
from datetime import datetime, timezone, timedelta

if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__))))

os.environ.setdefault(
    "GOOGLE_APPLICATION_CREDENTIALS",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "google_creds.json"),
)

from safety import tracker

GA4_PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "")
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


def _get_client():
    """Lazy-load GA4 Data API client."""
    if not GA4_PROPERTY_ID:
        print("[Analytics] GA4_PROPERTY_ID not set. Skipping.")
        return None
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        return BetaAnalyticsDataClient()
    except ImportError:
        print("[Analytics] google-analytics-data not installed.")
        print("[Analytics] Run: pip3 install google-analytics-data")
        return None
    except Exception as e:
        print(f"[Analytics] Client init failed: {e}")
        return None


def get_top_pages(days=7, limit=20):
    """Get top performing pages by pageviews and engagement."""
    client = _get_client()
    if not client:
        return []

    try:
        from google.analytics.data_v1beta.types import (
            RunReportRequest, DateRange, Dimension, Metric, OrderBy
        )

        request = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            date_ranges=[DateRange(
                start_date=f"{days}daysAgo",
                end_date="today",
            )],
            dimensions=[
                Dimension(name="pagePath"),
                Dimension(name="pageTitle"),
            ],
            metrics=[
                Metric(name="screenPageViews"),
                Metric(name="averageSessionDuration"),
                Metric(name="engagementRate"),
                Metric(name="bounceRate"),
            ],
            order_bys=[
                OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True),
            ],
            limit=limit,
        )

        response = client.run_report(request)
        tracker.log_api_call("analytics_data")

        pages = []
        for row in response.rows:
            pages.append({
                "path": row.dimension_values[0].value,
                "title": row.dimension_values[1].value,
                "pageviews": int(row.metric_values[0].value),
                "avg_duration": round(float(row.metric_values[1].value), 1),
                "engagement_rate": round(float(row.metric_values[2].value), 3),
                "bounce_rate": round(float(row.metric_values[3].value), 3),
            })

        print(f"[Analytics] Top {len(pages)} pages (last {days} days)")
        return pages

    except Exception as e:
        print(f"[Analytics] Top pages error: {e}")
        tracker.log_error("analytics_data")
        return []


def get_search_queries(days=7, limit=30):
    """Get organic search queries driving traffic (requires Search Console link)."""
    client = _get_client()
    if not client:
        return []

    try:
        from google.analytics.data_v1beta.types import (
            RunReportRequest, DateRange, Dimension, Metric, OrderBy
        )

        request = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            date_ranges=[DateRange(
                start_date=f"{days}daysAgo",
                end_date="today",
            )],
            dimensions=[
                Dimension(name="sessionDefaultChannelGroup"),
                Dimension(name="landingPagePlusQueryString"),
            ],
            metrics=[
                Metric(name="sessions"),
                Metric(name="engagementRate"),
                Metric(name="conversions"),
            ],
            order_bys=[
                OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True),
            ],
            limit=limit,
        )

        response = client.run_report(request)
        tracker.log_api_call("analytics_data")

        queries = []
        for row in response.rows:
            channel = row.dimension_values[0].value
            if channel.lower() in ("organic search", "organic"):
                queries.append({
                    "landing_page": row.dimension_values[1].value,
                    "sessions": int(row.metric_values[0].value),
                    "engagement_rate": round(float(row.metric_values[1].value), 3),
                    "conversions": int(row.metric_values[2].value),
                })

        print(f"[Analytics] {len(queries)} organic landing pages found")
        return queries

    except Exception as e:
        print(f"[Analytics] Search queries error: {e}")
        tracker.log_error("analytics_data")
        return []


def get_traffic_by_category(days=30):
    """Analyze traffic by content category to prioritize topics."""
    client = _get_client()
    if not client:
        return {}

    try:
        from google.analytics.data_v1beta.types import (
            RunReportRequest, DateRange, Dimension, Metric, OrderBy
        )

        request = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            date_ranges=[DateRange(
                start_date=f"{days}daysAgo",
                end_date="today",
            )],
            dimensions=[Dimension(name="pagePath")],
            metrics=[
                Metric(name="screenPageViews"),
                Metric(name="engagementRate"),
            ],
            order_bys=[
                OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True),
            ],
            limit=100,
        )

        response = client.run_report(request)
        tracker.log_api_call("analytics_data")

        # Categorize pages by keyword patterns
        categories = {
            "workwear": 0, "casual": 0, "date-night": 0,
            "seasonal": 0, "luxury": 0, "budget": 0,
            "streetwear": 0, "minimalist": 0, "denim": 0,
            "athleisure": 0, "accessories": 0, "capsule": 0,
        }

        for row in response.rows:
            path = row.dimension_values[0].value.lower()
            views = int(row.metric_values[0].value)
            for cat in categories:
                if cat in path:
                    categories[cat] += views

        print(f"[Analytics] Category traffic analysis complete")
        return categories

    except Exception as e:
        print(f"[Analytics] Category analysis error: {e}")
        return {}


def generate_smart_topics(count=5):
    """Generate content topics based on analytics data.
    High-traffic categories get more posts. Low-bounce pages get repeated.
    """
    top_pages = get_top_pages(days=14, limit=30)
    category_traffic = get_traffic_by_category(days=30)

    if not top_pages and not category_traffic:
        print("[Analytics] No data available. Using default topics.")
        return []

    # Find high-engagement topics
    high_engagement = [
        p for p in top_pages
        if p.get("engagement_rate", 0) > 0.5 and p.get("pageviews", 0) > 10
    ]

    # Sort categories by traffic
    sorted_cats = sorted(category_traffic.items(), key=lambda x: x[1], reverse=True)
    top_cats = [c[0] for c in sorted_cats[:5] if c[1] > 0]

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "top_pages": top_pages[:10],
        "high_engagement_pages": high_engagement[:5],
        "top_categories": top_cats,
        "category_traffic": category_traffic,
        "suggested_focus": top_cats[:3] if top_cats else ["casual", "workwear", "seasonal"],
    }

    # Save report
    os.makedirs(DATA_DIR, exist_ok=True)
    report_path = os.path.join(DATA_DIR, "analytics_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"[Analytics] Report saved: {report_path}")
    print(f"[Analytics] Focus categories: {report['suggested_focus']}")

    return report


def get_daily_performance_summary():
    """Quick daily performance check."""
    client = _get_client()
    if not client:
        return None

    try:
        from google.analytics.data_v1beta.types import (
            RunReportRequest, DateRange, Metric
        )

        # Yesterday vs day before
        request = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            date_ranges=[
                DateRange(start_date="yesterday", end_date="yesterday"),
                DateRange(start_date="2daysAgo", end_date="2daysAgo"),
            ],
            metrics=[
                Metric(name="sessions"),
                Metric(name="screenPageViews"),
                Metric(name="engagementRate"),
                Metric(name="newUsers"),
            ],
        )

        response = client.run_report(request)
        tracker.log_api_call("analytics_data")

        if response.rows:
            row = response.rows[0]
            yesterday = {
                "sessions": int(row.metric_values[0].value),
                "pageviews": int(row.metric_values[1].value),
                "engagement": round(float(row.metric_values[2].value), 3),
                "new_users": int(row.metric_values[3].value),
            }
            prev = {
                "sessions": int(row.metric_values[4].value) if len(row.metric_values) > 4 else 0,
                "pageviews": int(row.metric_values[5].value) if len(row.metric_values) > 5 else 0,
            }

            growth = "UP" if yesterday["sessions"] > prev.get("sessions", 0) else "DOWN"
            print(f"[Analytics] Yesterday: {yesterday['sessions']} sessions, "
                  f"{yesterday['pageviews']} pageviews ({growth})")
            return {"yesterday": yesterday, "previous": prev, "trend": growth}

    except Exception as e:
        print(f"[Analytics] Daily summary error: {e}")
    return None


if __name__ == "__main__":
    print("=== Google Analytics Data API Test ===")
    if not GA4_PROPERTY_ID:
        print("Set GA4_PROPERTY_ID in .env first.")
        print("Example: GA4_PROPERTY_ID=123456789")
        print("\nSetup steps:")
        print("1. Go to GA4 Admin > Property Settings > Copy Property ID")
        print("2. Add GA4_PROPERTY_ID=XXXXX to .env")
        print("3. In GA4 Admin > Property Access > Add service account email as Viewer")
        print("4. Enable Analytics Data API in Cloud Console")
    else:
        report = generate_smart_topics()
        if report:
            print(json.dumps(report, indent=2))
