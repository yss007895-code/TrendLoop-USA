
import pytest
from unittest.mock import MagicMock, patch, mock_open
import sys
import os

# Ensure the agents module can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents import writer

def test_generate_blog_post_empty_keywords():
    """Test generate_blog_post with empty keywords list."""
    # Mock API Key to be present so we pass the first check
    with patch("agents.writer.GEMINI_API_KEY", "dummy_key"):
        result = writer.generate_blog_post([])
        assert result == {}

def test_generate_blog_post_no_api_key():
    """Test generate_blog_post without API key."""
    with patch("agents.writer.GEMINI_API_KEY", ""):
        result = writer.generate_blog_post([{"keyword": "test", "count": 1}])
        assert result == {}

def test_generate_blog_post_success():
    """Test generate_blog_post happy path."""
    mock_keywords = [{"keyword": "test_keyword", "count": 10}]

    # Mock everything needed
    with patch("agents.writer.GEMINI_API_KEY", "dummy_key"), \
         patch("agents.writer.genai.Client") as MockClient, \
         patch("agents.writer.open", mock_open()) as mocked_file, \
         patch("agents.writer.os.makedirs") as mocked_makedirs:

        # Setup mock client response
        mock_instance = MockClient.return_value
        mock_response = MagicMock()
        mock_response.text = "<html><body><h1>Test Title</h1><p>Content</p></body></html>"
        mock_instance.models.generate_content.return_value = mock_response

        result = writer.generate_blog_post(mock_keywords)

        assert result is not None
        assert result["title"] == "Test Title"
        assert "test-title" in result["slug"]
        assert result["file_path"].endswith(".html")
