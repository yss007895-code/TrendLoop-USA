
import unittest
from unittest.mock import MagicMock, patch, mock_open
import agents.writer
import html
import re
import os

class TestWriterSanitization(unittest.TestCase):
    def setUp(self):
        # Mock dependencies to isolate tests
        self.original_gemini_key = agents.writer.GEMINI_API_KEY
        agents.writer.GEMINI_API_KEY = "mock_key"

        self.mock_client = MagicMock()
        self.mock_response = MagicMock()
        self.mock_client.models.generate_content.return_value = self.mock_response

        # Patch the internal gemini call to return controlled content
        self.original_call_gemini = agents.writer._call_gemini
        agents.writer._call_gemini = MagicMock()

    def tearDown(self):
        agents.writer.GEMINI_API_KEY = self.original_gemini_key
        agents.writer._call_gemini = self.original_call_gemini

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.makedirs")
    def test_xss_script_removal(self, mock_makedirs, mock_file):
        """Test that <script> tags are removed from the blog post content."""
        malicious_content = """
        <h1>Safe Title</h1>
        <p>Safe paragraph.</p>
        <script>alert('XSS');</script>
        <p>Another safe paragraph.</p>
        """
        agents.writer._call_gemini.return_value = malicious_content

        keywords = [{"keyword": "test", "count": 1}]
        result = agents.writer.generate_blog_post(keywords)

        self.assertIsNotNone(result)
        content = result['html']

        # Verify <script> tag is gone.
        self.assertNotIn("<script>", content)
        self.assertIn("<h1>Safe Title</h1>", content)
        self.assertIn("<p>Safe paragraph.</p>", content)

        # Ensure file was written (mocked)
        mock_file.assert_called()

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.makedirs")
    def test_xss_event_handlers_removal(self, mock_makedirs, mock_file):
        """Test that event handlers like onclick are removed."""
        malicious_content = """
        <a href="http://example.com" onclick="alert('XSS')">Click me</a>
        <img src=x onerror=alert(1)>
        """
        agents.writer._call_gemini.return_value = malicious_content

        keywords = [{"keyword": "test", "count": 1}]
        result = agents.writer.generate_blog_post(keywords)

        self.assertIsNotNone(result)
        content = result['html']

        self.assertNotIn("onclick", content)
        self.assertNotIn("onerror", content)
        # img tags are not in allowed list, so they should be stripped completely
        self.assertNotIn("<img", content)

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.makedirs")
    def test_valid_html_preservation(self, mock_makedirs, mock_file):
        """Test that valid HTML tags and attributes are preserved."""
        valid_content = """
        <h1>Fashion Trends</h1>
        <h2>Subheading</h2>
        <p>This is a <strong>bold</strong> statement.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>
        <a href="https://amazon.com" target="_blank" title="Amazon">Buy Now</a>
        """
        agents.writer._call_gemini.return_value = valid_content

        keywords = [{"keyword": "test", "count": 1}]
        result = agents.writer.generate_blog_post(keywords)

        self.assertIsNotNone(result)
        content = result['html']

        self.assertIn("<h1>Fashion Trends</h1>", content)
        self.assertIn("<h2>Subheading</h2>", content)
        self.assertIn("<strong>bold</strong>", content)
        self.assertIn("<ul>", content)
        self.assertIn("<li>Item 1</li>", content)
        self.assertIn('href="https://amazon.com"', content)
        self.assertIn('target="_blank"', content)

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.makedirs")
    def test_title_escaping(self, mock_makedirs, mock_file):
        """Test that the title is properly escaped in the HTML head."""
        malicious_input = '<h1>Title "><script>alert(1)</script></h1><p>Content</p>'

        agents.writer._call_gemini.return_value = malicious_input

        keywords = [{"keyword": "test", "count": 1}]
        result = agents.writer.generate_blog_post(keywords)

        self.assertIsNotNone(result)
        full_html = result['html']

        # Logic in writer.py:
        # 1. Extracts title from h1: 'Title "><script>alert(1)</script>'
        # 2. re.sub(r"<[^>]+>", "", title) removes tags: 'Title ">alert(1)'
        # 3. html.escape(title) escapes result: 'Title &quot;&gt;alert(1)'

        expected_title_part = "Title &quot;&gt;alert(1)"
        expected_title_tag = f"<title>{expected_title_part} | TrendLoop USA</title>"

        self.assertIn(expected_title_tag, full_html)

        # Check meta description
        expected_meta = f'content="{expected_title_part} - Discover'
        self.assertIn(expected_meta, full_html)

if __name__ == "__main__":
    unittest.main()
