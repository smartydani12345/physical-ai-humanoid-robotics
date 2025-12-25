import os
import sys
from urllib.parse import parse_qs

# Add the backend-api directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend-api'))

from main import app
from services.rag_service import RAGService
from config import settings
import json
import logging
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Router
from starlette.responses import Response

# Initialize the RAG service
rag_service = None

async def init_rag_service():
    global rag_service
    if rag_service is None:
        rag_service = RAGService()
        await rag_service.initialize_services()

def handle_request(event, context):
    """Vercel-compatible handler for FastAPI app"""
    try:
        # Extract HTTP method and path
        method = event['httpMethod']
        path = event['path']
        headers = event.get('headers', {})
        query_params = event.get('queryStringParameters', {})

        # Handle the request based on path
        if path == '/api/v1/health' and method == 'GET':
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, x-api-token',
                },
                'body': json.dumps({
                    "status": "healthy",
                    "service": "Physical AI & Humanoid Robotics RAG Chatbot"
                })
            }

        elif path == '/api/v1/chat/chat' and method == 'POST':
            # Handle chat requests
            body = json.loads(event.get('body', '{}')) if event.get('body') else {}

            # Initialize RAG service if not already done
            import asyncio
            asyncio.run(init_rag_service())

            # Process the chat request
            query = body.get('message', '')
            selected_text = body.get('selected_text')
            chat_history = body.get('history', [])
            context = body.get('context', {})
            conversation_id = body.get('conversation_id')

            # Validate API token
            token = headers.get('x-api-token') or headers.get('X-API-Token')
            if not token or token != settings.api_token:
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    'body': json.dumps({"detail": "Invalid or missing API token"})
                }

            # Process the query using RAG service
            import asyncio
            result = asyncio.run(rag_service.process_query(
                query=query,
                selected_text=selected_text,
                chat_history=chat_history,
                context=context,
                conversation_id=conversation_id
            ))

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({
                    "response": result["response"],
                    "sources": result.get("sources", []),
                    "context": result.get("context", {}),
                    "timestamp": "2025-12-22T10:30:00Z"  # This would be dynamic in real implementation
                })
            }

        elif path == '/' and method == 'GET':
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({
                    "message": "Welcome to Physical AI & Humanoid Robotics RAG Chatbot API"
                })
            }

        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({"detail": "Not Found"})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({"detail": str(e)})
        }

# Export the handler function
handler = handle_request