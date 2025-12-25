#!/usr/bin/env python3
"""
Debug script to understand the Settings configuration issue
"""

import sys
import os
from dotenv import load_dotenv

# Load environment first
load_dotenv()

# Remove any cached modules to force fresh import
modules_to_remove = [name for name in sys.modules.keys() if 'config' in name.lower() or 'settings' in name.lower()]
for module in modules_to_remove:
    del sys.modules[module]

# Now create a fresh Settings class to test
from pydantic_settings import BaseSettings

class TestSettings(BaseSettings):
    # API Keys
    cohere_api_key: str
    qdrant_url: str
    qdrant_api_key: str
    gemini_api_key: str
    grok_api_key: str  # This is the new field
    neon_url: str
    api_token: str

    class Config:
        env_file = ".env"

try:
    test_settings = TestSettings()
    print("Test Settings created successfully!")
    print(f"Has grok_api_key: {hasattr(test_settings, 'grok_api_key')}")
    print(f"Grok API key: {test_settings.grok_api_key}")
    print(f"All attributes: {[attr for attr in dir(test_settings) if not attr.startswith('_')]}")
except Exception as e:
    print(f"Error creating test settings: {e}")
    import traceback
    traceback.print_exc()