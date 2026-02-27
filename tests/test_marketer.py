import pytest
from unittest.mock import patch, MagicMock
import requests
from agents.marketer import ping_google_indexing, BLOG_BASE_URL

# Mock the tracker module in agents.marketer
@pytest.fixture
def mock_tracker():
    with patch("agents.marketer.tracker") as mock:
        yield mock

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_success(mock_post, mock_get, mock_tracker):
    """
    Test happy path:
    - Google returns 200
    - IndexNow returns 200
    - Function should return True
    """
    # Setup mocks
    mock_get.return_value.status_code = 200
    mock_post.return_value.status_code = 200

    slug = "test-slug-2024"
    result = ping_google_indexing(slug)

    # Assertions
    assert result is True

    # Check Google Ping URL
    expected_sitemap = f"{BLOG_BASE_URL}/sitemap.xml"
    mock_get.assert_called_once()
    args, _ = mock_get.call_args
    assert "google.com/ping" in args[0]
    assert expected_sitemap in args[0]

    # Check IndexNow Payload
    expected_page_url = f"{BLOG_BASE_URL}/{slug}.html"
    mock_post.assert_called_once()
    args, kwargs = mock_post.call_args
    assert "api.indexnow.org" in args[0]
    assert kwargs['json']['urlList'] == [expected_page_url]

    # Verify tracker calls
    mock_tracker.log_api_call.assert_any_call("google_index")
    mock_tracker.log_api_call.assert_any_call("indexnow")

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_partial_failure_google(mock_post, mock_get, mock_tracker):
    """
    Test partial failure:
    - Google returns 500 (Fail)
    - IndexNow returns 200 (Success)
    - Function should return True (because at least one succeeded)
    """
    mock_get.return_value.status_code = 500
    mock_post.return_value.status_code = 200

    result = ping_google_indexing("slug")

    assert result is True
    mock_tracker.log_api_call.assert_called_with("indexnow") # Google succeeded call not logged if exception raised? No, here status code is checked.
    # In code: tracker.log_api_call("google_index") is called before checking status code.
    # So both should be logged as API calls, but printed failure.

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_partial_failure_indexnow(mock_post, mock_get, mock_tracker):
    """
    Test partial failure:
    - Google returns 200 (Success)
    - IndexNow returns 500 (Fail)
    - Function should return True
    """
    mock_get.return_value.status_code = 200
    mock_post.return_value.status_code = 500

    result = ping_google_indexing("slug")

    assert result is True

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_total_failure(mock_post, mock_get, mock_tracker):
    """
    Test total failure:
    - Google returns 500
    - IndexNow returns 500
    - Function should return False
    """
    mock_get.return_value.status_code = 500
    mock_post.return_value.status_code = 500

    result = ping_google_indexing("slug")

    assert result is False

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_exceptions(mock_post, mock_get, mock_tracker):
    """
    Test exception handling:
    - requests.get raises RequestException
    - requests.post raises RequestException
    - Function should return False and log errors
    """
    mock_get.side_effect = requests.RequestException("Google Down")
    mock_post.side_effect = requests.RequestException("IndexNow Down")

    result = ping_google_indexing("slug")

    assert result is False
    assert mock_tracker.log_error.call_count == 2
    mock_tracker.log_error.assert_any_call("other")

@patch("agents.marketer.requests.get")
@patch("agents.marketer.requests.post")
def test_ping_google_indexing_mixed_exception_and_success(mock_post, mock_get, mock_tracker):
    """
    Test mixed scenario:
    - Google raises Exception
    - IndexNow succeeds
    - Function should return True
    """
    mock_get.side_effect = requests.RequestException("Google Down")
    mock_post.return_value.status_code = 200

    result = ping_google_indexing("slug")

    assert result is True
    # Google caused error log
    mock_tracker.log_error.assert_called_with("other")
    # IndexNow caused api call log
    mock_tracker.log_api_call.assert_called_with("indexnow")
