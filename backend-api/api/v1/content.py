from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import json
from pathlib import Path

from services.document_processor import DocumentProcessor

router = APIRouter()

# Get API token from environment
API_TOKEN = os.getenv("API_TOKEN")

def verify_api_token(request: Request):
    """Verify the API token in the x-api-token header"""
    token = request.headers.get("x-api-token")
    if not token or token != API_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing API token")

class ContentSearchRequest(BaseModel):
    query: str
    limit: Optional[int] = 10

class ContentSearchResponse(BaseModel):
    results: List[Dict[str, Any]]

class ReindexRequest(BaseModel):
    docs_dir: Optional[str] = "my-website/docs/my-book"

class ReindexResponse(BaseModel):
    status: str
    message: str
    stats: Optional[Dict[str, Any]] = None

@router.post("/content/search", response_model=ContentSearchResponse)
async def search_content(request: ContentSearchRequest, token: str = Depends(verify_api_token)):
    """
    Search through the textbook content
    """
    try:
        # This is a simplified search - in a real implementation, this would query the vector database
        # For now, we'll return some sample results
        sample_results = [
            {
                "id": "chapter-5-intro",
                "title": "Introduction to VLA Systems",
                "content": "Vision-Language-Action (VLA) systems represent a paradigm shift in robotics, integrating perception, understanding, and action into unified AI frameworks...",
                "url": "/docs/my-book/chapter-5#1-introduction-to-vla-systems",
                "score": 0.95
            },
            {
                "id": "chapter-5-whisper",
                "title": "Voice-to-Action Implementation with Whisper",
                "content": "Whisper is used in VLA systems for voice-to-action processing. Whisper processes audio input to convert spoken commands to text...",
                "url": "/docs/my-book/chapter-5#voice-to-action-implementation",
                "score": 0.89
            },
            {
                "id": "chapter-5-cognitive-planning",
                "title": "Cognitive Planning in VLA Systems",
                "content": "Cognitive planning is a critical component of VLA systems that bridges high-level commands with executable actions...",
                "url": "/docs/my-book/chapter-5#cognitive-planning-in-vla-systems",
                "score": 0.87
            }
        ]

        # Filter results based on query (simplified)
        query_lower = request.query.lower()
        filtered_results = []

        for result in sample_results:
            if query_lower in result["title"].lower() or query_lower in result["content"].lower():
                filtered_results.append(result)

        # Limit results
        limited_results = filtered_results[:request.limit]

        return ContentSearchResponse(results=limited_results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/content/reindex")
async def reindex_content(request: ReindexRequest, token: str = Depends(verify_api_token)):
    """
    Reindex all textbook content into the vector database
    """
    try:
        processor = DocumentProcessor()

        # Reindex all documents
        stats = await processor.reindex_all_documents(request.docs_dir)

        return ReindexResponse(
            status="success" if stats.get("status") != "error" else "error",
            message="Reindexing completed successfully" if stats.get("status") != "error" else f"Reindexing failed: {stats.get('message', 'Unknown error')}",
            stats=stats
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during reindexing: {str(e)}")

@router.get("/content/stats")
async def get_content_stats(token: str = Depends(verify_api_token)):
    """
    Get statistics about the indexed content
    """
    try:
        processor = DocumentProcessor()
        stats = processor.get_collection_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting content stats: {str(e)}")

@router.get("/content/health")
async def content_health():
    """
    Health check for the content service
    """
    return {"status": "healthy"}