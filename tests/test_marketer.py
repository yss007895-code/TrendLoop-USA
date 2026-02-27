
import os
import pytest
from agents.marketer import update_sitemap
from config import BLOG_BASE_URL
from datetime import datetime, timezone

def test_update_sitemap_creates_file(tmp_path):
    """Test that update_sitemap creates a sitemap.xml file in the specified directory."""
    slugs = ["test-slug-1", "test-slug-2"]
    update_sitemap(slugs, output_dir=str(tmp_path))

    sitemap_path = tmp_path / "sitemap.xml"
    assert sitemap_path.exists()

    content = sitemap_path.read_text(encoding="utf-8")
    assert "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" in content
    assert "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" in content

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    for slug in slugs:
        expected_url = f"{BLOG_BASE_URL}/{slug}.html"
        assert f"<loc>{expected_url}</loc>" in content
        assert f"<lastmod>{today}</lastmod>" in content
        assert "<changefreq>daily</changefreq>" in content

def test_update_sitemap_empty_slugs(tmp_path):
    """Test that update_sitemap handles an empty list of slugs correctly."""
    slugs = []
    update_sitemap(slugs, output_dir=str(tmp_path))

    sitemap_path = tmp_path / "sitemap.xml"
    assert sitemap_path.exists()

    content = sitemap_path.read_text(encoding="utf-8")
    assert "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" in content
    assert "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" in content
    assert "</urlset>" in content
    assert "<url>" not in content
