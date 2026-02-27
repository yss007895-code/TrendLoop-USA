import unittest
from unittest.mock import patch, MagicMock
import os
import sys
from datetime import datetime, timezone

# Add the current directory to sys.path so we can import agents
sys.path.append(os.getcwd())

from agents import writer

class TestWriterRefactor(unittest.TestCase):
    def setUp(self):
        # Ensure API key is set so the function proceeds
        self.original_api_key = writer.GEMINI_API_KEY
        writer.GEMINI_API_KEY = "dummy_key"

    def tearDown(self):
        writer.GEMINI_API_KEY = self.original_api_key

    @patch("agents.writer.genai.Client")
    @patch("agents.writer._call_gemini")
    @patch("builtins.open", new_callable=MagicMock)
    @patch("os.makedirs")
    def test_generate_blog_post_flow(self, mock_makedirs, mock_open, mock_call_gemini, mock_client):
        # Setup mocks
        # First call returns article HTML, second call returns summary text
        mock_call_gemini.side_effect = [
            "<h1>Test Title</h1><p>Test Content</p>",
            "Test Summary"
        ]

        # Setup file mock
        file_handle = MagicMock()
        mock_open.return_value.__enter__.return_value = file_handle

        keywords = [{"keyword": "test fashion", "count": 10}]

        # Execute function
        result = writer.generate_blog_post(keywords)

        # Verify result structure
        self.assertIsInstance(result, dict)
        self.assertEqual(result["title"], "Test Title")
        self.assertEqual(result["summary"], "Test Summary")
        # Check slug format (date-slug_base)
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        self.assertTrue(result["slug"].startswith(today))
        self.assertTrue("test-title" in result["slug"])

        # Verify internal calls
        self.assertEqual(mock_call_gemini.call_count, 2)
        mock_client.assert_called_once_with(api_key="dummy_key")
        mock_makedirs.assert_called()
        mock_open.assert_called()

        # Verify file content
        file_handle.write.assert_called()
        written_content = file_handle.write.call_args[0][0]
        self.assertIn("<!DOCTYPE html>", written_content)
        self.assertIn("Test Title", written_content)
        self.assertIn("Test Content", written_content)

if __name__ == "__main__":
    unittest.main()
