import unittest
from unittest.mock import patch
from agents.writer import generate_blog_post

class TestWriter(unittest.TestCase):
    @patch('agents.writer.GEMINI_API_KEY', 'dummy_api_key')
    @patch('agents.writer.genai.Client')
    def test_generate_blog_post_empty_keywords(self, mock_client):
        # Call with empty keywords list
        result = generate_blog_post([])

        # Verify result is empty dictionary
        self.assertEqual(result, {})

        # Verify genai.Client was NOT initialized
        mock_client.assert_not_called()
