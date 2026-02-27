import unittest
from unittest.mock import patch, MagicMock
import tweepy
from agents.analyst import fetch_trending_keywords, STOP_WORDS, FASHION_SEED_QUERIES

class TestAnalyst(unittest.TestCase):
    def setUp(self):
        # Reset tracker before each test if possible, or we just rely on the mock.
        # Since 'tracker' is imported in 'agents.analyst', patching 'agents.analyst.tracker'
        # is the correct way to control it.
        pass

    @patch('agents.analyst.X_BEARER_TOKEN', "test_token")
    @patch('agents.analyst.tweepy.Client')
    @patch('agents.analyst.tracker')
    def test_fetch_trending_keywords_too_many_requests(self, mock_tracker, mock_client_class):
        # Mock setup
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Mock tracker.is_abnormal to always return False so loop proceeds
        mock_tracker.is_abnormal.return_value = False

        # Properly construct tweepy.TooManyRequests
        mock_response = MagicMock()
        mock_response.status_code = 429
        mock_response.text = "Too Many Requests"
        mock_client.search_recent_tweets.side_effect = tweepy.TooManyRequests(mock_response)

        # Test execution
        keywords = fetch_trending_keywords()

        # Verification
        mock_client.search_recent_tweets.assert_called_once()  # Should stop after first failure
        mock_tracker.log_error.assert_called_with("twitter")
        self.assertTrue(len(keywords) > 0)  # Should return fallback keywords

    @patch('agents.analyst.X_BEARER_TOKEN', "test_token")
    @patch('agents.analyst.tweepy.Client')
    @patch('agents.analyst.tracker')
    def test_fetch_trending_keywords_tweepy_exception(self, mock_tracker, mock_client_class):
        # Mock setup
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Mock tracker.is_abnormal to always return False
        mock_tracker.is_abnormal.return_value = False

        mock_client.search_recent_tweets.side_effect = tweepy.TweepyException("Generic error")

        # Test execution
        keywords = fetch_trending_keywords()

        # Verification
        # Should attempt all queries even if one fails
        self.assertEqual(mock_client.search_recent_tweets.call_count, len(FASHION_SEED_QUERIES))
        self.assertEqual(mock_tracker.log_error.call_count, len(FASHION_SEED_QUERIES))
        self.assertTrue(len(keywords) > 0)  # Should return fallback keywords if all fail

    @patch('agents.analyst.X_BEARER_TOKEN', "test_token")
    @patch('agents.analyst.tweepy.Client')
    @patch('agents.analyst.tracker')
    def test_fetch_trending_keywords_success(self, mock_tracker, mock_client_class):
        # Mock setup
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        # Mock tracker.is_abnormal to always return False
        mock_tracker.is_abnormal.return_value = False

        # Create a mock response with data
        mock_tweet = MagicMock()
        mock_tweet.text = "fashion trend 2024"
        mock_tweet.entities = {"hashtags": [{"tag": "fashion"}, {"tag": "trend"}]}

        mock_response = MagicMock()
        mock_response.data = [mock_tweet]

        mock_client.search_recent_tweets.return_value = mock_response

        # Test execution
        keywords = fetch_trending_keywords()

        # Verification
        self.assertEqual(mock_client.search_recent_tweets.call_count, len(FASHION_SEED_QUERIES))
        mock_tracker.log_api_call.assert_called()
        self.assertTrue(len(keywords) > 0)

        # Check if 'fashion' or 'trend' is in the results (depending on STOP_WORDS and logic)
        found_keywords = [k['keyword'] for k in keywords]

        self.assertTrue(any("fashion" in k for k in found_keywords) or any("trend" in k for k in found_keywords))

if __name__ == '__main__':
    unittest.main()
