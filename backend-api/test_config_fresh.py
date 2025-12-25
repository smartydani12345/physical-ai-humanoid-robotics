#!/usr/bin/env python3
"""
Direct test of the config module to verify grok_api_key is available
"""

import sys
import os
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from dotenv import load_dotenv
load_dotenv()

# Force a fresh import by removing from cache if it exists
if 'config' in sys.modules:
    del sys.modules['config']

# Now import fresh
import config
print("Testing fresh import of config module...")

# Check if grok_api_key is available
print(f"Settings has grok_api_key attribute: {hasattr(config.settings, 'grok_api_key')}")
print(f"Grok API key value: {getattr(config.settings, 'grok_api_key', 'NOT FOUND')}")

# List all attributes
print(f"All settings attributes: {[attr for attr in dir(config.settings) if not attr.startswith('_')]}")