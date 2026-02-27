import unittest
from unittest.mock import patch, MagicMock
import tweepy
# Import the module so we can patch attributes on it
from agents import analyst

class TestFetchTrendingKeywords(unittest.TestCase):
    def setUp(self):
        # Tracker mock setup - create a fresh mock for each test
        self.tracker_patcher = patch('agents.analyst.tracker', autospec=True)
        self.tracker_mock = self.tracker_patcher.start()
        # Important: is_abnormal must return False to allow the loop to proceed
        self.tracker_mock.is_abnormal.return_value = False

        # Save original token and replace with test token
        self.original_token = analyst.X_BEARER_TOKEN
        analyst.X_BEARER_TOKEN = "test_token"

    def tearDown(self):
        # Restore original token
        analyst.X_BEARER_TOKEN = self.original_token
        # Stop tracker patcher
        self.tracker_patcher.stop()

    @patch('agents.analyst.tweepy.Client')
    def test_fetch_trending_keywords_too_many_requests(self, mock_client_class):
        # Setup mock client instance
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Configure search_recent_tweets to raise TooManyRequests
        mock_response = MagicMock()
        mock_response.status_code = 429
        mock_client.search_recent_tweets.side_effect = tweepy.TooManyRequests(mock_response)

        # Call the function
        with patch('agents.analyst.print') as mock_print: # Suppress print
            keywords = analyst.fetch_trending_keywords()

        # Assertions
        self.tracker_mock.log_error.assert_called_with("twitter")

        # Check fallback return - fallback data is hardcoded in _fallback_keywords, so we can check it
        self.assertTrue(len(keywords) > 0)
        self.assertEqual(keywords[0]['keyword'], "coquette fashion")

    @patch('agents.analyst.tweepy.Client')
    def test_fetch_trending_keywords_generic_exception(self, mock_client_class):
        # Setup mock client instance
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Configure search_recent_tweets to raise TweepyException
        mock_client.search_recent_tweets.side_effect = tweepy.TweepyException("Generic Error")

        # Call the function
        with patch('agents.analyst.print') as mock_print:
            keywords = analyst.fetch_trending_keywords()

        # Assertions
        self.assertTrue(self.tracker_mock.log_error.call_count >= 1)
        self.tracker_mock.log_error.assert_called_with("twitter")

        # Check fallback return
        self.assertTrue(len(keywords) > 0)
        self.assertEqual(keywords[0]['keyword'], "coquette fashion")

    @patch('agents.analyst.tweepy.Client')
    def test_fetch_trending_keywords_success(self, mock_client_class):
        # Setup mock client instance
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Mock response data
        mock_tweet1 = MagicMock()
        mock_tweet1.text = "This is a trendy outfit with #fashion #style"
        mock_tweet1.entities = {"hashtags": [{"tag": "fashion"}, {"tag": "style"}]}

        mock_tweet2 = MagicMock()
        mock_tweet2.text = "Another cool look #ootd"
        mock_tweet2.entities = {"hashtags": [{"tag": "ootd"}]}

        mock_response = MagicMock()
        mock_response.data = [mock_tweet1, mock_tweet2]

        mock_client.search_recent_tweets.return_value = mock_response

        # Call the function
        with patch('agents.analyst.print') as mock_print:
            keywords = analyst.fetch_trending_keywords()

        # Assertions
        self.tracker_mock.log_error.assert_not_called()

        # Should return extracted keywords
        self.assertTrue(len(keywords) > 0)

        # Verify call to API
        self.assertTrue(mock_client.search_recent_tweets.called)
        self.tracker_mock.log_api_call.assert_called_with("twitter_read")

if __name__ == '__main__':
    unittest.main()
