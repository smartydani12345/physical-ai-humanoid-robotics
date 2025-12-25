#!/usr/bin/env python3
"""
Simple test script to verify individual API connections
"""

import asyncio
import os
from pathlib import Path

# Add the backend-api directory to the path
import sys
sys.path.insert(0, str(Path(__file__).parent / "backend-api"))

from dotenv import load_dotenv

# Load environment variables from .env file in the backend-api directory
env_path = Path(__file__).parent / "backend-api" / ".env"
load_dotenv(dotenv_path=env_path)

async def test_cohere():
    """Test Cohere API connection"""
    print("Testing Cohere API...")
    try:
        import cohere

        # Get API key from environment
        cohere_api_key = os.getenv("COHERE_API_KEY")
        if not cohere_api_key:
            print("X Cohere API: API key not found in environment")
            return False

        cohere_client = cohere.Client(cohere_api_key)

        # Test embedding generation
        response = cohere_client.embed(
            texts=["test"],
            model="embed-english-v3.0",
            input_type="search_query"
        )

        print("SUCCESS: Cohere API is working")
        print(f"  Embedding dimensions: {len(response.embeddings[0])}")
        return True
    except Exception as e:
        print(f"ERROR: Cohere API - {str(e)}")
        return False

async def test_qdrant():
    """Test Qdrant connection"""
    print("\nTesting Qdrant connection...")
    try:
        from qdrant_client import QdrantClient

        # Get credentials from environment
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if not qdrant_url or not qdrant_api_key:
            print("X Qdrant: URL or API key not found in environment")
            return False

        qdrant_client = QdrantClient(
            url=qdrant_url,
            api_key=qdrant_api_key,
        )

        # Test connection
        collections = qdrant_client.get_collections()
        collection_names = [collection.name for collection in collections.collections]

        print("SUCCESS: Qdrant is connected")
        print(f"  Available collections: {collection_names}")

        # Check if our collection exists
        if "humanoid_ai_book" in collection_names:
            collection_info = qdrant_client.get_collection("humanoid_ai_book")
            print(f"  'humanoid_ai_book' collection: {collection_info.points_count} vectors")

        return True
    except Exception as e:
        print(f"ERROR: Qdrant - {str(e)}")
        return False

async def test_gemini():
    """Test Gemini API connection"""
    print("\nTesting Gemini API...")
    try:
        import google.generativeai as genai

        # Get API key from environment
        gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not gemini_api_key:
            print("X Gemini API: API key not found in environment")
            return False

        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-pro')

        # Test simple generation
        response = model.generate_content("Hello, world!")

        print("SUCCESS: Gemini API is working")
        print(f"  Response preview: {response.text[:50]}..." if response.text else "  Got empty response")
        return True
    except Exception as e:
        print(f"ERROR: Gemini API - {str(e)}")
        return False

async def main():
    print("API Connection Test for Physical AI & Humanoid Robotics")
    print("=" * 60)

    results = {}

    results['cohere'] = await test_cohere()
    results['qdrant'] = await test_qdrant()
    results['gemini'] = await test_gemini()

    print("\n" + "=" * 60)
    print("Summary:")
    print(f"  Cohere: {'SUCCESS' if results['cohere'] else 'ERROR'}")
    print(f"  Qdrant: {'SUCCESS' if results['qdrant'] else 'ERROR'}")
    print(f"  Gemini: {'SUCCESS' if results['gemini'] else 'ERROR'}")

    if all(results.values()):
        print("\nAll APIs are working correctly!")
    else:
        print("\nSome APIs have issues. Please check the configuration.")

    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())