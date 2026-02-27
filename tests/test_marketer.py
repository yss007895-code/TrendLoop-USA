
import unittest
from unittest.mock import patch, MagicMock
from agents.marketer import post_to_twitter

class TestMarketer(unittest.TestCase):

    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    @patch('agents.marketer.X_API_KEY', 'dummy_key')
    @patch('agents.marketer.X_API_SECRET', 'dummy_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'dummy_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'dummy_token_secret')
    @patch('agents.marketer.BLOG_BASE_URL', 'https://example.com')
    def test_post_to_twitter_success_short(self, mock_tracker, mock_client_class):
        # Setup mock client
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client
        mock_response = MagicMock()
        mock_response.data = {'id': '123456789'}
        mock_client.create_tweet.return_value = mock_response

        # Call function
        summary = "Short summary"
        slug = "test-slug"
        result = post_to_twitter(summary, slug)

        # Assertions
        self.assertTrue(result)
        mock_client.create_tweet.assert_called_once()
        args, kwargs = mock_client.create_tweet.call_args
        expected_text = "Short summary\n\nRead more: https://example.com/test-slug.html"
        self.assertEqual(kwargs['text'], expected_text)
        mock_tracker.log_api_call.assert_called_with("twitter_write")

    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    @patch('agents.marketer.X_API_KEY', 'dummy_key')
    @patch('agents.marketer.X_API_SECRET', 'dummy_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'dummy_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'dummy_token_secret')
    @patch('agents.marketer.BLOG_BASE_URL', 'https://example.com')
    def test_post_to_twitter_success_truncated(self, mock_tracker, mock_client_class):
        # Setup mock client
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client
        mock_response = MagicMock()
        mock_response.data = {'id': '123456789'}
        mock_client.create_tweet.return_value = mock_response

        # Call function with long summary
        long_summary = "A" * 300
        slug = "test-slug"
        result = post_to_twitter(long_summary, slug)

        # Assertions
        self.assertTrue(result)
        mock_client.create_tweet.assert_called_once()
        args, kwargs = mock_client.create_tweet.call_args
        tweet_text = kwargs['text']

        # Verify length is within limit
        self.assertLessEqual(len(tweet_text), 280)

        # Verify truncation structure
        self.assertTrue(tweet_text.endswith("...\n\nRead more: https://example.com/test-slug.html"))

        # Verify the content is from the summary
        self.assertTrue(tweet_text.startswith("AAAAA"))

    @patch('agents.marketer.X_API_KEY', '')
    def test_post_to_twitter_missing_credentials(self):
        result = post_to_twitter("summary", "slug")
        self.assertFalse(result)

    @patch('agents.marketer.tweepy.Client')
    @patch('agents.marketer.tracker')
    @patch('agents.marketer.X_API_KEY', 'dummy_key')
    @patch('agents.marketer.X_API_SECRET', 'dummy_secret')
    @patch('agents.marketer.X_ACCESS_TOKEN', 'dummy_token')
    @patch('agents.marketer.X_ACCESS_TOKEN_SECRET', 'dummy_token_secret')
    def test_post_to_twitter_api_error(self, mock_tracker, mock_client_class):
        # Setup mock client to raise exception
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Need to import tweepy exception to mock raising it, or use a generic exception if the code catches generic
        # The code catches tweepy.TweepyException
        import tweepy
        mock_client.create_tweet.side_effect = tweepy.TweepyException("API Error")

        # Call function
        result = post_to_twitter("summary", "slug")

        # Assertions
        self.assertFalse(result)
        mock_tracker.log_error.assert_called_with("twitter")

if __name__ == '__main__':
    unittest.main()
