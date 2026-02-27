import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add the current directory to sys.path so we can import agents
sys.path.append(os.getcwd())

from agents import writer

class TestWriterAgent(unittest.TestCase):

    def setUp(self):
        # We don't need to reset global variable anymore, but we instantiate the class
        self.writer_agent = writer.WriterAgent()

    @patch('agents.writer.genai')
    @patch('agents.writer.tracker')
    @patch('agents.writer.GEMINI_API_KEY', 'fake_key')
    @patch('agents.writer.GEMINI_DAILY_CALL_LIMIT', 2)
    def test_generate_blog_post_success(self, mock_tracker, mock_genai):
        # Mock the client and response
        mock_client = MagicMock()
        mock_genai.Client.return_value = mock_client

        mock_response = MagicMock()
        mock_response.text = "<h1>Fashion Title</h1><p>Content</p>"
        mock_client.models.generate_content.return_value = mock_response

        keywords = [{"keyword": "test fashion", "count": 10}]

        # We need to mock file writing as well to avoid creating files
        with patch("builtins.open", unittest.mock.mock_open()) as mock_file:
             result = self.writer_agent.generate_blog_post(keywords)

        self.assertIsNotNone(result)
        self.assertEqual(result["title"], "Fashion Title")
        self.assertIn("Fashion Title", result["html"])

        # Verify API called twice (once for blog post, once for summary)
        self.assertEqual(self.writer_agent.gemini_call_count, 2)

    @patch('agents.writer.genai')
    @patch('agents.writer.tracker')
    @patch('agents.writer.GEMINI_API_KEY', 'fake_key')
    @patch('agents.writer.GEMINI_DAILY_CALL_LIMIT', 1)
    def test_generate_blog_post_limit_reached(self, mock_tracker, mock_genai):
        mock_client = MagicMock()
        mock_genai.Client.return_value = mock_client

        mock_response = MagicMock()
        mock_response.text = "<h1>Fashion Title</h1><p>Content</p>"
        mock_client.models.generate_content.return_value = mock_response

        keywords = [{"keyword": "test fashion", "count": 10}]

        # Set limit to 1.
        # First call (blog post) should succeed. count becomes 1.
        # Second call (summary) should fail because count (1) >= limit (1).

        with patch("builtins.open", unittest.mock.mock_open()) as mock_file:
             result = self.writer_agent.generate_blog_post(keywords)

        self.assertEqual(self.writer_agent.gemini_call_count, 1)
        # Summary should be default fallback because API call was blocked
        self.assertTrue(result["summary"].startswith("New fashion trends alert!"))

if __name__ == '__main__':
    unittest.main()
