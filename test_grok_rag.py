#!/usr/bin/env python3
"""
Test script to verify Grok integration in the RAG system
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

async def test_grok_integration():
    """Test the full RAG flow with Grok"""
    print("Testing RAG functionality with Grok integration...")
    print()

    try:
        # Import after setting up the environment
        from services.rag_service import RAGService
        from config import settings

        print(f"+ Successfully imported RAG service")
        print(f"+ Grok API key available: {'Yes' if settings.grok_api_key else 'No'}")
        print(f"+ Cohere API key available: {'Yes' if settings.cohere_api_key else 'No'}")
        print(f"+ Qdrant URL available: {'Yes' if settings.qdrant_url else 'No'}")

        # Create RAG service instance
        rag_service = RAGService()

        # Initialize only the required services (skip database if it fails)
        try:
            await rag_service.initialize_services()
            print("+ Successfully initialized RAG service with database")
        except Exception as e:
            print(f"? Database initialization failed (this is OK for testing): {str(e)}")
            print("+ Proceeding with RAG service without database")

        # Test the Qdrant connection and collection
        health_status = rag_service.health_check()
        print(f"+ Qdrant health check: {'Healthy' if health_status else 'Unhealthy'}")

        if health_status:
            # Get collection stats
            collection_info = rag_service.qdrant_client.get_collection(rag_service.collection_name)
            print(f"+ Collection '{rag_service.collection_name}' has {collection_info.points_count} vectors")

            # Test a simple Grok client connection
            print()
            print("Testing Grok client connection...")
            try:
                grok_client = rag_service._get_grok_client()
                print("+ Grok client created successfully")

                # Test a simple completion
                response = grok_client.chat.completions.create(
                    model="llama3-70b-8192",
                    messages=[
                        {"role": "user", "content": "Hello, just testing the connection."}
                    ],
                    temperature=0.7,
                    max_tokens=50
                )
                print(f"+ Grok API connection: SUCCESS")
                print(f"  Response preview: {response.choices[0].message.content[:50]}...")
            except Exception as e:
                print(f"X Grok API connection: ERROR - {str(e)}")

            # Test a query about Physical AI (should use Grok now)
            print()
            print("Asking: 'What is Physical AI?'")
            print("-" * 50)

            result = await rag_service.process_query(
                query="What is Physical AI?",
                chat_history=[]
            )

            print(f"Response: {result['response']}")
            print(f"Sources: {result.get('sources', [])}")
            print(f"Retrieved documents: {result['context'].get('retrieved_docs', 0)}")

        else:
            print("X Qdrant is not accessible, cannot test RAG functionality")

    except Exception as e:
        print(f"X Error testing RAG functionality: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("RAG System Test with Grok Integration")
    print("=" * 60)

    asyncio.run(test_grok_integration())

    print()
    print("=" * 60)
    print("Test completed!")