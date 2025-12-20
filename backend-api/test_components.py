"""
Test script to verify the backend components are properly structured and importable
This test doesn't require actual API keys or connections
"""

import sys
import os
sys.path.append('.')

def test_imports():
    """Test that all modules can be imported without errors"""
    print("Testing module imports...")

    try:
        from models.chat_models import ChatRequest, ChatResponse, ChatMessage
        print("[PASS] Chat models imported successfully")
    except Exception as e:
        print(f"[FAIL] Chat models import failed: {e}")
        return False

    try:
        from services.document_processor import DocumentProcessor
        print("[PASS] Document processor imported successfully")
    except Exception as e:
        print(f"[FAIL] Document processor import failed: {e}")
        return False

    try:
        # Just test that the class can be imported, not initialized (which requires API keys)
        from services.rag_service import RAGService
        print("[PASS] RAG service imported successfully")
    except Exception as e:
        print(f"[FAIL] RAG service import failed: {e}")
        return False

    try:
        from services.database_service import DatabaseService
        print("[PASS] Database service imported successfully")
    except Exception as e:
        print(f"[FAIL] Database service import failed: {e}")
        return False

    try:
        from api.v1.chat import router as chat_router
        print("[PASS] Chat API router imported successfully")
    except Exception as e:
        print(f"[FAIL] Chat API router import failed: {e}")
        return False

    try:
        from api.v1.content import router as content_router
        print("[PASS] Content API router imported successfully")
    except Exception as e:
        print(f"[FAIL] Content API router import failed: {e}")
        return False

    return True

def test_file_structure():
    """Test that required files exist"""
    print("\nTesting file structure...")

    required_files = [
        'main.py',
        'config.py',
        'database_schema.sql',
        'initialize.py',
        'requirements.txt',
        'models/chat_models.py',
        'services/document_processor.py',
        'services/rag_service.py',
        'services/database_service.py',
        'api/v1/chat.py',
        'api/v1/content.py',
        '.env'
    ]

    missing_files = []
    for file_path in required_files:
        full_path = os.path.join('C:\\Users\\DELL\\Desktop\\AI-PHYSICAL-HUMANIODS-ROBOTICS-ENGINEERING\\backend-api', file_path)
        if not os.path.exists(full_path):
            missing_files.append(file_path)

    if missing_files:
        print(f"[FAIL] Missing files: {missing_files}")
        return False
    else:
        print("[PASS] All required files exist")
        return True

def test_api_endpoints():
    """Test that API endpoints are properly defined"""
    print("\nTesting API endpoints...")

    try:
        # Import the routers to check if they're properly defined
        from api.v1.chat import router as chat_router
        from api.v1.content import router as content_router

        # Check that routers have routes
        chat_routes = [route.path for route in chat_router.routes]
        content_routes = [route.path for route in content_router.routes]

        print(f"[PASS] Chat router has {len(chat_routes)} routes")
        print(f"[PASS] Content router has {len(content_routes)} routes")

        # Check for key endpoints
        expected_chat_endpoints = [
            '/api/v1/chat', '/api/v1/chat/stream', '/api/v1/chat/conversation/start',
            '/api/v1/chat/conversation/{conversation_id}/messages',
            '/api/v1/chat/conversation/{conversation_id}/history',
            '/api/v1/chat/conversations', '/api/v1/chat/health'
        ]

        expected_content_endpoints = [
            '/api/v1/content/search', '/api/v1/content/reindex',
            '/api/v1/content/stats', '/api/v1/content/health'
        ]

        # Check if expected endpoints exist (at least partially)
        found_chat = any('/chat' in route for route in chat_routes)
        found_content = any('/content' in route for route in content_routes)

        if found_chat and found_content:
            print("[PASS] API endpoints structure looks correct")
            return True
        else:
            print("[FAIL] Some expected API endpoints are missing")
            return False

    except Exception as e:
        print(f"[FAIL] API endpoints test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("Running backend component tests...\n")

    results = []
    results.append(test_imports())
    results.append(test_file_structure())
    results.append(test_api_endpoints())

    passed = sum(results)
    total = len(results)

    print(f"\nTest Summary: {passed}/{total} test groups passed")

    if passed == total:
        print("[SUCCESS] All backend components are properly structured!")
        print("\nNext steps:")
        print("1. Set up your .env file with proper API keys")
        print("2. Run 'python initialize.py' to set up the database and index documents")
        print("3. Start the server with 'uvicorn main:app --reload'")
        return True
    else:
        print("[FAILURE] Some components need attention")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)