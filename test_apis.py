#!/usr/bin/env python3
"""
Test script to verify individual API connections
"""

import asyncio
import sys
from pathlib import Path
import os

# Add the backend-api directory to the path
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
        from backend_api.config import settings

        cohere_client = cohere.Client(settings.cohere_api_key)

        # Test embedding generation
        response = cohere_client.embed(
            texts=["test"],
            model="embed-english-v3.0",
            input_type="search_query"
        )

        print("✅ Cohere API: Working")
        print(f"   Embedding dimensions: {len(response.embeddings[0])}")
        return True
    except Exception as e:
        print(f"❌ Cohere API: Error - {str(e)}")
        return False

async def test_qdrant():
    """Test Qdrant connection"""
    print("\nTesting Qdrant connection...")
    try:
        from qdrant_client import QdrantClient
        from backend_api.config import settings

        qdrant_client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )

        # Test connection
        collections = qdrant_client.get_collections()
        collection_names = [collection.name for collection in collections.collections]

        print("✅ Qdrant: Connected")
        print(f"   Available collections: {collection_names}")

        # Check if our collection exists
        if "humanoid_ai_book" in collection_names:
            collection_info = qdrant_client.get_collection("humanoid_ai_book")
            print(f"   'humanoid_ai_book' collection: {collection_info.points_count} vectors")

        return True
    except Exception as e:
        print(f"❌ Qdrant: Error - {str(e)}")
        return False

async def test_gemini():
    """Test Gemini API connection"""
    print("\nTesting Gemini API...")
    try:
        import google.generativeai as genai
        from backend_api.config import settings

        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel('gemini-pro')

        # Test simple generation
        response = model.generate_content("Hello, world!")

        print("✅ Gemini API: Working")
        print(f"   Response preview: {response.text[:50]}...")
        return True
    except Exception as e:
        print(f"❌ Gemini API: Error - {str(e)}")
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
    print(f"  Cohere: {'✅ Working' if results['cohere'] else '❌ Error'}")
    print(f"  Qdrant: {'✅ Working' if results['qdrant'] else '❌ Error'}")
    print(f"  Gemini: {'✅ Working' if results['gemini'] else '❌ Error'}")

    if all(results.values()):
        print("\n🎉 All APIs are working correctly!")
    else:
        print("\n⚠️  Some APIs have issues. Please check the configuration.")

    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())