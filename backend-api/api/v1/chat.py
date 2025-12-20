from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import logging
import os
import uuid
from datetime import datetime

from models.chat_models import ChatRequest, ChatResponse, ChatMessage

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Get API token from environment
API_TOKEN = os.getenv("API_TOKEN")

def verify_api_token(request: Request):
    """Verify the API token in the x-api-token header"""
    token = request.headers.get("x-api-token")
    if not token or token != API_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing API token")

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, token: str = Depends(verify_api_token)):
    """
    Process chat messages using RAG methodology
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        logger.info(f"Processing chat request: {request.message[:50]}...")

        # Process the query using RAG service with conversation_id if provided
        result = await rag_service.process_query(
            query=request.message,
            selected_text=request.selected_text,
            chat_history=request.history,
            context=request.context,
            conversation_id=request.conversation_id
        )

        return ChatResponse(
            response=result["response"],
            sources=result.get("sources", []),
            context=result.get("context", {}),
            timestamp=datetime.now()
        )
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest, token: str = Depends(verify_api_token)):
    """
    Process chat messages with streaming response
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        logger.info(f"Processing streaming chat request: {request.message[:50]}...")

        # Get streaming response from RAG service
        async for chunk in rag_service.process_query_stream(
            query=request.message,
            selected_text=request.selected_text,
            chat_history=request.history,
            context=request.context,
            conversation_id=request.conversation_id
        ):
            yield chunk
    except Exception as e:
        logger.error(f"Error processing streaming chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/health")
async def chat_health():
    """
    Health check for the chat service
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()
        health_status = rag_service.health_check()
        return {"status": "healthy", "rag_service": health_status}
    except Exception as e:
        logger.error(f"Error in chat health check: {str(e)}")
        return {"status": "unhealthy", "rag_service": False}

# Additional chat endpoints
@router.post("/chat/conversation/start")
async def start_conversation(token: str = Depends(verify_api_token)):
    """
    Start a new conversation and return a conversation ID
    """
    from services.rag_service import RAGService
    rag_service = RAGService()

    conversation_id = str(uuid.uuid4())

    # Create conversation in database
    await rag_service.db_service.create_conversation(conversation_id, "New Conversation")

    return {"conversation_id": conversation_id}

@router.post("/chat/conversation/{conversation_id}/messages")
async def add_message_to_conversation(conversation_id: str, message: ChatMessage, token: str = Depends(verify_api_token)):
    """
    Add a message to an existing conversation
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        # Process the message using RAG service with conversation_id
        result = await rag_service.process_query(
            query=message.content,
            chat_history=[{"role": "user", "content": message.content}],
            context={},
            conversation_id=conversation_id
        )

        return {
            "user_message": {
                "role": "user",
                "content": message.content,
                "timestamp": datetime.now()
            },
            "assistant_response": {
                "role": "assistant",
                "content": result["response"],
                "timestamp": datetime.now()
            },
            "sources": result.get("sources", [])
        }
    except Exception as e:
        logger.error(f"Error adding message to conversation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/conversation/{conversation_id}/history")
async def get_conversation_history(conversation_id: str, token: str = Depends(verify_api_token)):
    """
    Get the history of a specific conversation
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        history = await rag_service.db_service.get_conversation_history(conversation_id)
        return {"conversation_id": conversation_id, "history": history}
    except Exception as e:
        logger.error(f"Error getting conversation history: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/conversations")
async def get_all_conversations(token: str = Depends(verify_api_token)):
    """
    Get all conversations
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        conversations = await rag_service.db_service.get_all_conversations()
        return {"conversations": conversations}
    except Exception as e:
        logger.error(f"Error getting conversations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))