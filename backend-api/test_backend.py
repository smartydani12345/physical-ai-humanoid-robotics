import asyncio
import os
from dotenv import load_dotenv
from services.document_processor import DocumentProcessor
from services.rag_service import RAGService
from services.database_service import DatabaseService

# Load environment variables
load_dotenv()

async def test_document_processor():
    """Test the document processor functionality"""
    print("Testing Document Processor...")

    processor = DocumentProcessor()

    # Get collection stats before processing
    stats_before = processor.get_collection_stats()
    print(f"Collection stats before processing: {stats_before}")

    # Process documents - use correct path relative to project root
    import os
    docs_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "my-website", "docs", "my-book")
    success = await processor.process_docusaurus_docs(docs_path)

    if success:
        stats_after = processor.get_collection_stats()
        print(f"Collection stats after processing: {stats_after}")
        print("[PASS] Document processor test passed!")
        return True
    else:
        print("[FAIL] Document processor test failed!")
        return False

async def test_rag_service():
    """Test the RAG service functionality"""
    print("\nTesting RAG Service...")

    rag_service = RAGService()

    # Initialize services
    await rag_service.initialize_services()

    # Test basic query
    try:
        result = await rag_service.process_query(
            query="What is Physical AI?",
            chat_history=[]
        )

        print(f"Query result: {result['response'][:100]}...")
        print("[PASS] RAG service test passed!")
        await rag_service.db_service.close()
        return True
    except Exception as e:
        print(f"[FAIL] RAG service test failed: {str(e)}")
        await rag_service.db_service.close()
        return False

async def test_database_service():
    """Test the database service functionality"""
    print("\nTesting Database Service...")

    db_service = DatabaseService()

    try:
        # Initialize the service
        await db_service.initialize()

        # Create a test conversation
        import uuid
        conversation_id = str(uuid.uuid4())
        await db_service.create_conversation(conversation_id, "Test Conversation")

        # Add test messages
        await db_service.add_message(conversation_id, "user", "Hello, test message!")
        await db_service.add_message(conversation_id, "assistant", "Hello, this is a test response!")

        # Get conversation history
        history = await db_service.get_conversation_history(conversation_id)
        print(f"Retrieved {len(history)} messages from conversation")

        # Get all conversations
        conversations = await db_service.get_all_conversations()
        print(f"Total conversations: {len(conversations)}")

        print("[PASS] Database service test passed!")
        await db_service.close()
        return True
    except Exception as e:
        print(f"[FAIL] Database service test failed: {str(e)}")
        try:
            await db_service.close()
        except:
            pass
        return False

async def run_all_tests():
    """Run all backend functionality tests"""
    print("Starting backend functionality tests...\n")

    results = []

    # Test document processor
    results.append(await test_document_processor())

    # Test database service
    results.append(await test_database_service())

    # Test RAG service
    results.append(await test_rag_service())

    # Summary
    passed = sum(results)
    total = len(results)

    print(f"\nTest Summary: {passed}/{total} tests passed")

    if passed == total:
        print("[SUCCESS] All tests passed! Backend is functioning correctly.")
        return True
    else:
        print("[WARNING] Some tests failed. Please check the implementation.")
        return False

if __name__ == "__main__":
    asyncio.run(run_all_tests())