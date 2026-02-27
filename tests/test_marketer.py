import unittest
from unittest.mock import patch, Mock
import requests
from agents.marketer import distribute_to_channels

class TestDistributeToChannels(unittest.TestCase):

    @patch('agents.marketer.get_distribution_channels')
    @patch('agents.marketer.tracker')
    def test_no_channels(self, mock_tracker, mock_get_channels):
        # Setup
        mock_get_channels.return_value = []

        # Execute
        result = distribute_to_channels("Test Title", "Test Summary", "test-slug")

        # Verify
        self.assertEqual(result, 0)
        mock_get_channels.assert_called_once()
        # Should print warning but not call API

    @patch('agents.marketer.get_distribution_channels')
    @patch('agents.marketer.requests.post')
    @patch('agents.marketer.tracker')
    @patch('agents.marketer.BLOG_BASE_URL', "https://example.com")
    def test_success_distribution(self, mock_tracker, mock_post, mock_get_channels):
        # Setup
        mock_get_channels.return_value = [
            {"name": "site_a", "api_key": "key_a", "endpoint": "https://site-a.com/api"}
        ]

        mock_response = Mock()
        mock_response.status_code = 201
        mock_post.return_value = mock_response

        # Execute
        result = distribute_to_channels("Test Title", "Test Summary", "test-slug")

        # Verify
        self.assertEqual(result, 1)
        mock_post.assert_called_once_with(
            "https://site-a.com/api",
            json={
                "title": "Test Title",
                "summary": "Test Summary",
                "url": "https://example.com/test-slug.html"
            },
            headers={
                "Authorization": "Bearer key_a",
                "Content-Type": "application/json",
            },
            timeout=15
        )
        mock_tracker.log_api_call.assert_called_with("twitter_write") # The code logs 'twitter_write' for channel distribution

    @patch('agents.marketer.get_distribution_channels')
    @patch('agents.marketer.requests.post')
    @patch('agents.marketer.tracker')
    def test_partial_success(self, mock_tracker, mock_post, mock_get_channels):
        # Setup: 2 channels, 1 success, 1 failure
        mock_get_channels.return_value = [
            {"name": "site_success", "api_key": "key_s", "endpoint": "https://s.com"},
            {"name": "site_fail", "api_key": "key_f", "endpoint": "https://f.com"}
        ]

        # Mock responses for consecutive calls
        success_resp = Mock()
        success_resp.status_code = 200

        fail_resp = Mock()
        fail_resp.status_code = 500

        mock_post.side_effect = [success_resp, fail_resp]

        # Execute
        result = distribute_to_channels("Title", "Summary", "slug")

        # Verify
        self.assertEqual(result, 1)
        self.assertEqual(mock_post.call_count, 2)

    @patch('agents.marketer.get_distribution_channels')
    @patch('agents.marketer.requests.post')
    @patch('agents.marketer.tracker')
    def test_request_exception(self, mock_tracker, mock_post, mock_get_channels):
        # Setup
        mock_get_channels.return_value = [
            {"name": "site_error", "api_key": "key_e", "endpoint": "https://e.com"}
        ]

        mock_post.side_effect = requests.RequestException("Connection error")

        # Execute
        result = distribute_to_channels("Title", "Summary", "slug")

        # Verify
        self.assertEqual(result, 0)
        mock_tracker.log_error.assert_called_with("other")

    @patch('agents.marketer.get_distribution_channels')
    def test_invalid_channel_config(self, mock_get_channels):
        # Setup: Missing endpoint or api_key
        mock_get_channels.return_value = [
            {"name": "bad_site", "api_key": "key_only"}, # Missing endpoint
            {"name": "bad_site_2", "endpoint": "https://e.com"} # Missing api_key
        ]

        # Execute
        result = distribute_to_channels("Title", "Summary", "slug")

        # Verify
        self.assertEqual(result, 0)
