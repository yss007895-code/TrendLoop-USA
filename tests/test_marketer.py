import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Add the parent directory to the path so we can import agents
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agents.marketer import post_to_twitter

class TestPostToTwitter(unittest.TestCase):
    @patch('agents.marketer.BLOG_BASE_URL', 'https://test-blog.com')
    @patch('agents.marketer.X_API_KEY', 'test_key')
    @patch('agents.marketer.X_API_SECRET', 'test_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'test_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'test_token_secret')
    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    def test_post_to_twitter_success(self, mock_tracker, mock_client_class):
        # Mock successful tweet creation
        mock_client_instance = mock_client_class.return_value
        mock_response = MagicMock()
        mock_response.data = {'id': '12345'}
        mock_client_instance.create_tweet.return_value = mock_response

        summary = "This is a short summary."
        slug = "test-slug"

        result = post_to_twitter(summary, slug)

        self.assertTrue(result)
        mock_client_instance.create_tweet.assert_called_once()
        args, kwargs = mock_client_instance.create_tweet.call_args
        self.assertIn(summary, kwargs['text'])
        self.assertIn(slug, kwargs['text'])
        mock_tracker.log_api_call.assert_called_with("twitter_write")

    @patch('agents.marketer.X_API_KEY', '')
    def test_post_to_twitter_missing_credentials(self):
        summary = "This is a short summary."
        slug = "test-slug"

        result = post_to_twitter(summary, slug)

        self.assertFalse(result)

    @patch('agents.marketer.BLOG_BASE_URL', 'https://test-blog.com')
    @patch('agents.marketer.X_API_KEY', 'test_key')
    @patch('agents.marketer.X_API_SECRET', 'test_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'test_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'test_token_secret')
    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    def test_post_to_twitter_long_summary(self, mock_tracker, mock_client_class):
        # Mock successful tweet creation
        mock_client_instance = mock_client_class.return_value
        mock_response = MagicMock()
        mock_response.data = {'id': '12345'}
        mock_client_instance.create_tweet.return_value = mock_response

        # Create a summary that will exceed 280 characters when combined with the URL
        long_summary = "A" * 300
        slug = "test-slug"

        result = post_to_twitter(long_summary, slug)

        self.assertTrue(result)
        mock_client_instance.create_tweet.assert_called_once()
        args, kwargs = mock_client_instance.create_tweet.call_args
        tweet_text = kwargs['text']

        # Verify truncation logic
        self.assertTrue(len(tweet_text) <= 280)
        # Verify it uses the mocked base URL
        self.assertTrue(tweet_text.endswith(f"...\n\nRead more: https://test-blog.com/{slug}.html"))

    @patch('agents.marketer.X_API_KEY', 'test_key')
    @patch('agents.marketer.X_API_SECRET', 'test_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'test_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'test_token_secret')
    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    def test_post_to_twitter_api_error(self, mock_tracker, mock_client_class):
        import tweepy
        # Mock API error
        mock_client_instance = mock_client_class.return_value
        mock_client_instance.create_tweet.side_effect = tweepy.TweepyException("API Error")

        summary = "This is a short summary."
        slug = "test-slug"

        result = post_to_twitter(summary, slug)

        self.assertFalse(result)
        mock_tracker.log_error.assert_called_with("twitter")

if __name__ == '__main__':
    unittest.main()
