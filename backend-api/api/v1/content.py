from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import json
from pathlib import Path

from services.document_processor import DocumentProcessor
from config import settings

router = APIRouter()

def verify_api_token(request: Request):
    """Verify the API token in the x-api-token header"""
    token = request.headers.get("x-api-token")
    if not token or token != settings.api_token:
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
    Search through the textbook content using vector search in Qdrant
    """
    try:
        from services.rag_service import RAGService
        rag_service = RAGService()

        # Find relevant documents from Qdrant
        documents = rag_service._find_relevant_documents(request.query, top_k=request.limit)

        # Convert documents to search results format
        results = []
        for doc in documents:
            # Extract title from content (first sentence or first 100 chars)
            content_preview = doc.content[:500]  # Limit content preview
            title = doc.metadata.get("section", "Untitled")

            results.append({
                "id": doc.id,
                "title": title,
                "content": content_preview,
                "url": doc.metadata.get("source_url", ""),
                "score": doc.metadata.get("score", 0.0)
            })

        return ContentSearchResponse(results=results)
    except Exception as e:
        logger.error(f"Error in content search: {str(e)}")
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