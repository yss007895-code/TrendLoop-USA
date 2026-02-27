import os
import json
import pytest
from unittest.mock import patch
from config import get_distribution_channels

def test_get_distribution_channels_default():
    """Test when DISTRIBUTION_CHANNELS is not set (default)"""
    # Ensure the environment variable is not present for this test
    with patch.dict(os.environ, {}, clear=True):
        assert get_distribution_channels() == []

def test_get_distribution_channels_valid_list():
    """Test when DISTRIBUTION_CHANNELS is a valid JSON list"""
    channels_data = [
        {"name": "site_a", "api_key": "123", "endpoint": "http://a.com"},
        {"name": "site_b", "api_key": "456", "endpoint": "http://b.com"}
    ]
    json_str = json.dumps(channels_data)

    with patch.dict(os.environ, {"DISTRIBUTION_CHANNELS": json_str}):
        result = get_distribution_channels()
        assert result == channels_data
        assert len(result) == 2
        assert result[0]["name"] == "site_a"

def test_get_distribution_channels_valid_json_not_list():
    """Test when DISTRIBUTION_CHANNELS is valid JSON but not a list (e.g. dict)"""
    # A dict is valid JSON but the function expects a list
    json_str = json.dumps({"name": "site_a", "api_key": "123"})

    with patch.dict(os.environ, {"DISTRIBUTION_CHANNELS": json_str}):
        assert get_distribution_channels() == []

def test_get_distribution_channels_invalid_json():
    """Test when DISTRIBUTION_CHANNELS is invalid JSON"""
    invalid_json = "{invalid_json"

    with patch.dict(os.environ, {"DISTRIBUTION_CHANNELS": invalid_json}):
        assert get_distribution_channels() == []

def test_get_distribution_channels_empty_list():
    """Test when DISTRIBUTION_CHANNELS is an empty JSON list"""
    with patch.dict(os.environ, {"DISTRIBUTION_CHANNELS": "[]"}):
        assert get_distribution_channels() == []
