import unittest
from unittest.mock import patch, mock_open
import os
from datetime import datetime, timezone
from agents.marketer import update_sitemap
from config import BLOG_BASE_URL

class TestMarketer(unittest.TestCase):
    @patch("builtins.open", new_callable=mock_open)
    def test_update_sitemap_basic(self, mock_file):
        """Test basic sitemap generation with multiple slugs."""
        slugs = ["test-slug-1", "test-slug-2"]
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        # Expected XML content pieces to verify
        expected_header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        expected_url1 = f"""  <url>
    <loc>{BLOG_BASE_URL}/test-slug-1.html</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
  </url>"""
        expected_url2 = f"""  <url>
    <loc>{BLOG_BASE_URL}/test-slug-2.html</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
  </url>"""
        expected_footer = '</urlset>'

        update_sitemap(slugs)

        # Verify file open
        # The code calculates output_dir relative to __file__ in agents/marketer.py
        # agents/marketer.py -> dirname -> agents -> dirname -> root -> docs
        # We can just verify it ends with 'docs/sitemap.xml'
        args, _ = mock_file.call_args
        self.assertTrue(args[0].endswith("docs/sitemap.xml"))
        self.assertEqual(args[1], "w")

        # Verify content written
        handle = mock_file()
        # combine all writes
        written_content = "".join(call.args[0] for call in handle.write.call_args_list)

        self.assertIn(expected_header, written_content)
        self.assertIn(expected_url1, written_content)
        self.assertIn(expected_url2, written_content)
        self.assertIn(expected_footer, written_content)

    @patch("builtins.open", new_callable=mock_open)
    def test_update_sitemap_empty(self, mock_file):
        """Test sitemap generation with empty list of slugs."""
        slugs = []

        expected_header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        expected_footer = '</urlset>'

        update_sitemap(slugs)

        handle = mock_file()
        written_content = "".join(call.args[0] for call in handle.write.call_args_list)

        self.assertIn(expected_header, written_content)
        self.assertIn(expected_footer, written_content)
        # Should not contain any <url> tags (except possibly in comments if code changed, but here we expect clean XML)
        self.assertNotIn("<url>", written_content)

if __name__ == "__main__":
    unittest.main()
