#!/usr/bin/env python3
"""
Script to check available methods on the Qdrant client
"""

import sys
from pathlib import Path
import os

# Add the backend-api directory to the path
sys.path.insert(0, str(Path(__file__).parent / "backend-api"))

from dotenv import load_dotenv

# Load environment variables from .env file in the backend-api directory
env_path = Path(__file__).parent / "backend-api" / ".env"
load_dotenv(dotenv_path=env_path)

def check_qdrant_methods():
    """Check available methods on the Qdrant client"""
    print("Checking Qdrant client methods...")

    try:
        from qdrant_client import QdrantClient
        from config import settings

        # Initialize Qdrant client
        qdrant_client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )

        print(f"Qdrant client type: {type(qdrant_client)}")
        print("\nAvailable methods on Qdrant client:")

        # Get all methods and attributes
        methods = [method for method in dir(qdrant_client) if not method.startswith('_')]
        for method in sorted(methods):
            print(f"  - {method}")

        print("\nMethods containing 'search':")
        search_methods = [method for method in methods if 'search' in method.lower()]
        for method in search_methods:
            print(f"  - {method}")

        print("\nMethods containing 'point':")
        point_methods = [method for method in methods if 'point' in method.lower()]
        for method in point_methods:
            print(f"  - {method}")

        print(f"\nQdrant client version: {getattr(qdrant_client, '__version__', 'Unknown')}")

    except Exception as e:
        print(f"Error checking Qdrant client: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_qdrant_methods()