#!/usr/bin/env python3
"""
Initialization script for Physical AI & Humanoid Robotics RAG Chatbot
This script will:
1. Set up the database schema
2. Index the textbook content into the vector database
3. Verify all services are working
"""

import asyncio
import os
import subprocess
import sys
from pathlib import Path

# Add the backend-api directory to the path
sys.path.insert(0, str(Path(__file__).parent))

from dotenv import load_dotenv

# Load environment variables from .env file in the backend-api directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

from services.document_processor import DocumentProcessor
from services.rag_service import RAGService
from services.database_service import DatabaseService

async def setup_database():
    """Set up the database schema"""
    print("Setting up database schema...")

    # Execute the SQL schema against the Neon database
    import asyncpg

    try:
        # Connect to the database
        neon_url = os.getenv("NEON_URL")
        if not neon_url:
            print("X NEON_URL environment variable not set!")
            return False

        # Extract database connection info from the URL
        # The Neon URL format is typically: postgresql://user:password@ep-xxx.apirest.region.aws.neon.tech/dbname?sslmode=require
        import urllib.parse
        parsed = urllib.parse.urlparse(neon_url)

        # Connect without specifying database to create extensions
        conn = await asyncpg.connect(
            host=parsed.hostname,
            port=parsed.port,
            user=parsed.username,
            password=parsed.password,
            database=parsed.path[1:] if parsed.path else 'neondb',
            ssl='require'
        )

        # Read the schema file
        schema_file = Path(__file__).parent / "database_schema.sql"
        with open(schema_file, 'r', encoding='utf-8') as f:
            schema_sql = f.read()

        # Execute the schema
        await conn.execute(schema_sql)
        await conn.close()

        print("✓ Database schema set up successfully!")
        return True
    except Exception as e:
        print(f"X Error setting up database schema: {str(e)}")
        return False

async def index_documents():
    """Index textbook content into the vector database"""
    print("Indexing textbook content...")

    try:
        processor = DocumentProcessor()

        # Check collection stats before indexing
        stats_before = processor.get_collection_stats()
        print(f"Documents before indexing: {stats_before.get('vector_count', 0)}")

        # Index documents
        success = await processor.reindex_all_documents()

        if success:
            stats_after = processor.get_collection_stats()
            print(f"Documents after indexing: {stats_after.get('vector_count', 0)}")
            print("✓ Document indexing completed successfully!")
            return True
        else:
            print("X Document indexing failed!")
            return False
    except Exception as e:
        print(f"X Error indexing documents: {str(e)}")
        return False

async def verify_services():
    """Verify that all services are working correctly"""
    print("Verifying services...")

    try:
        # Test RAG service
        rag_service = RAGService()
        await rag_service.initialize_services()

        # Test health check
        is_healthy = rag_service.health_check()
        if is_healthy:
            print("✓ RAG service is healthy!")
        else:
            print("X RAG service health check failed!")
            return False

        # Test a simple query
        result = await rag_service.process_query(
            query="What is Physical AI?",
            chat_history=[]
        )

        if result["response"] and result["response"] != "I don't know":
            print("✓ RAG service query test passed!")
        else:
            print("? RAG service query returned 'I don't know' - this might be expected if no documents are indexed yet")

        await rag_service.db_service.close()
        return True
    except Exception as e:
        print(f"X Error verifying services: {str(e)}")
        return False

async def main():
    """Main initialization function"""
    print("Starting Physical AI & Humanoid Robotics RAG Chatbot initialization...")
    print()

    results = []

    # Set up database
    results.append(await setup_database())
    print()

    # Index documents
    results.append(await index_documents())
    print()

    # Verify services
    results.append(await verify_services())
    print()

    # Summary
    passed = sum(results)
    total = len(results)

    print(f"Initialization Summary: {passed}/{total} steps completed successfully")

    if passed == total:
        print("Initialization completed successfully!")
        print("✓ You can now start the application with: uvicorn main:app --reload")
        return True
    else:
        print("? Some initialization steps failed. Please check the logs above.")
        return False

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)