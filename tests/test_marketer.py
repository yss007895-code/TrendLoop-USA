
import pytest
from unittest.mock import patch, MagicMock
from agents.marketer import distribute_to_channels
import requests

@pytest.fixture
def mock_get_distribution_channels():
    with patch('agents.marketer.get_distribution_channels') as mock:
        yield mock

@pytest.fixture
def mock_requests_post():
    with patch('requests.post') as mock:
        yield mock

def test_distribute_no_channels(mock_get_distribution_channels):
    """Test when no distribution channels are configured."""
    mock_get_distribution_channels.return_value = []

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 0

def test_distribute_success(mock_get_distribution_channels, mock_requests_post):
    """Test successful distribution to one channel."""
    mock_get_distribution_channels.return_value = [
        {"name": "site_a", "api_key": "key_a", "endpoint": "http://site-a.com/api"}
    ]

    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_requests_post.return_value = mock_response

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 1
    mock_requests_post.assert_called_once()

    # Check if the correct payload was sent
    args, kwargs = mock_requests_post.call_args
    assert kwargs['json']['title'] == "Title"
    assert kwargs['json']['summary'] == "Summary"
    assert "slug" in kwargs['json']['url']
    assert kwargs['headers']['Authorization'] == "Bearer key_a"

def test_distribute_failure(mock_get_distribution_channels, mock_requests_post):
    """Test distribution failure (non-200 status code)."""
    mock_get_distribution_channels.return_value = [
        {"name": "site_a", "api_key": "key_a", "endpoint": "http://site-a.com/api"}
    ]

    mock_response = MagicMock()
    mock_response.status_code = 500
    mock_requests_post.return_value = mock_response

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 0

def test_distribute_exception(mock_get_distribution_channels, mock_requests_post):
    """Test exception during distribution."""
    mock_get_distribution_channels.return_value = [
        {"name": "site_a", "api_key": "key_a", "endpoint": "http://site-a.com/api"}
    ]

    mock_requests_post.side_effect = requests.RequestException("Connection error")

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 0

def test_distribute_incomplete_config(mock_get_distribution_channels, mock_requests_post):
    """Test skipping channels with incomplete configuration."""
    mock_get_distribution_channels.return_value = [
        {"name": "site_a", "api_key": "", "endpoint": "http://site-a.com/api"}, # Missing API key
        {"name": "site_b", "api_key": "key_b", "endpoint": ""}, # Missing endpoint
        {"name": "site_c", "api_key": "key_c", "endpoint": "http://site-c.com/api"} # Valid
    ]

    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_requests_post.return_value = mock_response

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 1 # Only one valid channel succeeded
    assert mock_requests_post.call_count == 1

def test_distribute_mixed_results(mock_get_distribution_channels, mock_requests_post):
    """Test mixed results (some succeed, some fail)."""
    mock_get_distribution_channels.return_value = [
        {"name": "site_a", "api_key": "key_a", "endpoint": "http://site-a.com/api"},
        {"name": "site_b", "api_key": "key_b", "endpoint": "http://site-b.com/api"}
    ]

    # First call succeeds, second fails
    mock_response_success = MagicMock()
    mock_response_success.status_code = 200

    mock_response_failure = MagicMock()
    mock_response_failure.status_code = 400

    mock_requests_post.side_effect = [mock_response_success, mock_response_failure]

    result = distribute_to_channels("Title", "Summary", "slug")

    assert result == 1
    assert mock_requests_post.call_count == 2
