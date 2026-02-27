import unittest
import time
import io
import sys
from unittest.mock import patch
from safety import UsageTracker

class TestUsageTracker(unittest.TestCase):
    def setUp(self):
        self.tracker = UsageTracker()

    def test_init(self):
        self.assertIsInstance(self.tracker.start_time, float)
        self.assertEqual(self.tracker.api_calls["gemini"], 0)
        self.assertEqual(self.tracker.api_calls["twitter_read"], 0)
        self.assertEqual(self.tracker.consecutive_errors, 0)
        self.assertEqual(self.tracker.errors["gemini"], 0)

    def test_log_api_call(self):
        self.tracker.log_api_call("gemini")
        self.assertEqual(self.tracker.api_calls["gemini"], 1)
        self.assertEqual(self.tracker.consecutive_errors, 0)

        # Test consecutive errors reset
        self.tracker.consecutive_errors = 5
        self.tracker.log_api_call("gemini")
        self.assertEqual(self.tracker.consecutive_errors, 0)

        # Test unknown service (should not crash, and count should not increase)
        current_total = sum(self.tracker.api_calls.values())
        self.tracker.log_api_call("unknown_service")
        self.assertEqual(sum(self.tracker.api_calls.values()), current_total)

    def test_log_error(self):
        self.tracker.log_error("gemini")
        self.assertEqual(self.tracker.errors["gemini"], 1)
        self.assertEqual(self.tracker.consecutive_errors, 1)

        self.tracker.log_error("gemini")
        self.assertEqual(self.tracker.errors["gemini"], 2)
        self.assertEqual(self.tracker.consecutive_errors, 2)

        # Test unknown service
        # If service is unknown, errors count shouldn't change, but consecutive_errors increments
        current_errors = sum(self.tracker.errors.values())
        self.tracker.log_error("unknown_service")
        self.assertEqual(sum(self.tracker.errors.values()), current_errors)
        self.assertEqual(self.tracker.consecutive_errors, 3)

    def test_is_abnormal(self):
        # Test consecutive errors default (3)
        self.tracker.consecutive_errors = 2
        self.assertFalse(self.tracker.is_abnormal())

        self.tracker.consecutive_errors = 3
        self.assertTrue(self.tracker.is_abnormal())

        # Test custom max_consecutive
        self.assertFalse(self.tracker.is_abnormal(max_consecutive=4))

        # Test total calls limit (> 50)
        self.tracker.consecutive_errors = 0
        self.tracker.api_calls["gemini"] = 50
        self.assertFalse(self.tracker.is_abnormal())

        self.tracker.api_calls["gemini"] = 51
        self.assertTrue(self.tracker.is_abnormal())

    def test_print_report(self):
        self.tracker.log_api_call("gemini")
        self.tracker.log_error("gemini")

        captured_output = io.StringIO()
        with patch('sys.stdout', new=captured_output):
            self.tracker.print_report()

        output = captured_output.getvalue()
        self.assertIn("API 사용량 및 비용 보고서", output)
        self.assertIn("총 API 호출:       1회", output)
        self.assertIn("총 에러:           1회", output)
        self.assertIn("gemini: 1회", output)

if __name__ == '__main__':
    unittest.main()
