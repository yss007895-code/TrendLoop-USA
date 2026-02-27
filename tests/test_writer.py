import pytest
from agents.writer import _wrap_in_html_page

def test_wrap_in_html_page_structure():
    """Verify the basic HTML structure."""
    title = "Test Title"
    article_html = "<p>Test Content</p>"
    date = "2023-10-27"

    html = _wrap_in_html_page(title, article_html, date)

    assert "<!DOCTYPE html>" in html
    assert '<html lang="en">' in html
    assert "<head>" in html
    assert "<body>" in html
    assert "</html>" in html

def test_wrap_in_html_page_content():
    """Verify that inputs are correctly inserted."""
    title = "Unique Title"
    article_html = "<div id='content'>Article Body</div>"
    date = "2024-01-01"

    html = _wrap_in_html_page(title, article_html, date)

    assert f"<title>{title} | TrendLoop USA</title>" in html
    assert f'<meta name="description" content="{title} - Discover the latest fashion trends in the USA.">' in html
    assert f'<div class="date">{date}</div>' in html
    assert article_html in html
    assert f"&copy; {date[:4]} TrendLoop USA. All rights reserved." in html

def test_wrap_in_html_page_empty_inputs():
    """Verify function handles empty strings gracefully."""
    html = _wrap_in_html_page("", "", "")

    assert "<title> | TrendLoop USA</title>" in html
    assert '<meta name="description" content=" - Discover the latest fashion trends in the USA.">' in html
    assert '<div class="date"></div>' in html
    assert "&copy;  TrendLoop USA. All rights reserved." in html
