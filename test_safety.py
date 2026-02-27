import os
import safety
import pytest

def test_safe_delete_exists(monkeypatch, tmp_path):
    """Test safe_delete with an existing file."""
    # Create a dummy file to delete
    file_to_delete = tmp_path / "test_file.txt"
    file_to_delete.write_text("content")

    # Create a temporary deleted items directory
    deleted_items_dir = tmp_path / "_deleted_items"

    # Patch DELETED_DIR in safety module
    monkeypatch.setattr(safety, "DELETED_DIR", str(deleted_items_dir))

    # Call safe_delete
    result = safety.safe_delete(str(file_to_delete))

    # Verify the original file is gone
    assert not file_to_delete.exists()

    # Verify the return value is the new path
    assert result.startswith(str(deleted_items_dir))
    assert os.path.exists(result)

    # Verify the content is preserved
    with open(result, "r") as f:
        assert f.read() == "content"

def test_safe_delete_not_found():
    """Test safe_delete with a non-existent file."""
    result = safety.safe_delete("non_existent_file.txt")
    assert result == ""
