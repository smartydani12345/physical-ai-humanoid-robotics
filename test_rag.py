#!/usr/bin/env python3
"""
Test script to demonstrate the RAG system with book content
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

async def test_rag_functionality():
    """Test the RAG functionality directly"""
    print("Testing RAG functionality with Physical AI & Humanoid Robotics book content...")
    print()

    try:
        from services.rag_service import RAGService
        from config import settings

        print("+ Successfully imported RAG service")

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

            # Test a query about Physical AI
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

            print()
            print("Asking: 'What are the key components of humanoid robotics?'")
            print("-" * 50)

            result2 = await rag_service.process_query(
                query="What are the key components of humanoid robotics?",
                chat_history=[]
            )

            print(f"Response: {result2['response']}")
            print(f"Sources: {result2.get('sources', [])}")
            print(f"Retrieved documents: {result2['context'].get('retrieved_docs', 0)}")

            print()
            print("Asking: 'Explain the difference between Physical AI and Embodied AI'")
            print("-" * 50)

            result3 = await rag_service.process_query(
                query="Explain the difference between Physical AI and Embodied AI",
                chat_history=[]
            )

            print(f"Response: {result3['response']}")
            print(f"Sources: {result3.get('sources', [])}")
            print(f"Retrieved documents: {result3['context'].get('retrieved_docs', 0)}")

        else:
            print("X Qdrant is not accessible, cannot test RAG functionality")

    except Exception as e:
        print(f"X Error testing RAG functionality: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("RAG System Test for Physical AI & Humanoid Robotics")
    print("=" * 60)

    asyncio.run(test_rag_functionality())

    print()
    print("=" * 60)
    print("Test completed!")