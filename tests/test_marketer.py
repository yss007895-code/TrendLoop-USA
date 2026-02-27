
import pytest
import requests
from agents.marketer import ping_google_indexing

# Constants for testing
TEST_SLUG = "test-slug"
TEST_BLOG_URL = "http://test-blog.com"

@pytest.fixture
def mock_requests(mocker):
    """Fixture to mock requests.get, requests.post, and BLOG_BASE_URL"""
    mock_get = mocker.patch("agents.marketer.requests.get")
    mock_post = mocker.patch("agents.marketer.requests.post")
    # Mock the configuration variable to ensure test independence
    mocker.patch("agents.marketer.BLOG_BASE_URL", TEST_BLOG_URL)
    return mock_get, mock_post

def test_ping_google_indexing_success(mock_requests):
    """Test when both Google and IndexNow return success."""
    mock_get, mock_post = mock_requests

    # Setup mocks
    mock_get.return_value.status_code = 200
    mock_post.return_value.status_code = 200

    # Execute
    result = ping_google_indexing(TEST_SLUG)

    # Verify
    assert result is True

    # Verify Google ping
    mock_get.assert_called_once()
    assert f"sitemap={TEST_BLOG_URL}/sitemap.xml" in mock_get.call_args[0][0]

    # Verify IndexNow
    mock_post.assert_called_once()
    assert mock_post.call_args[0][0] == "https://api.indexnow.org/indexnow"
    payload = mock_post.call_args[1]['json']
    assert payload['host'] == "test-blog.com"
    assert payload['urlList'] == [f"{TEST_BLOG_URL}/{TEST_SLUG}.html"]

def test_ping_google_indexing_partial_failure_google_fails(mock_requests):
    """Test when Google fails but IndexNow succeeds."""
    mock_get, mock_post = mock_requests

    # Setup mocks - Google fails (404), IndexNow succeeds (200)
    mock_get.return_value.status_code = 404
    mock_post.return_value.status_code = 200

    # Execute
    result = ping_google_indexing(TEST_SLUG)

    # Verify - still returns True because one succeeded
    assert result is True

def test_ping_google_indexing_partial_failure_indexnow_fails(mock_requests):
    """Test when Google succeeds but IndexNow fails."""
    mock_get, mock_post = mock_requests

    # Setup mocks - Google succeeds (200), IndexNow fails (500)
    mock_get.return_value.status_code = 200
    mock_post.return_value.status_code = 500

    # Execute
    result = ping_google_indexing(TEST_SLUG)

    # Verify - still returns True because one succeeded
    assert result is True

def test_ping_google_indexing_full_failure(mock_requests):
    """Test when both services fail."""
    mock_get, mock_post = mock_requests

    # Setup mocks - Both fail
    mock_get.return_value.status_code = 500
    mock_post.return_value.status_code = 400

    # Execute
    result = ping_google_indexing(TEST_SLUG)

    # Verify
    assert result is False

def test_ping_google_indexing_exceptions(mock_requests):
    """Test when requests raise exceptions."""
    mock_get, mock_post = mock_requests

    # Setup mocks to raise exceptions
    mock_get.side_effect = requests.RequestException("Google Error")
    mock_post.side_effect = requests.RequestException("IndexNow Error")

    # Execute
    result = ping_google_indexing(TEST_SLUG)

    # Verify
    assert result is False
