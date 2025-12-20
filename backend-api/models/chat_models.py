from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[datetime] = None

class ChatRequest(BaseModel):
    message: str
    selected_text: Optional[str] = None  # If provided, answer ONLY from this text
    history: Optional[List[Dict[str, str]]] = []
    context: Optional[Dict[str, Any]] = {}
    conversation_id: Optional[str] = None  # For tracking conversation history

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = []
    context: Optional[Dict[str, Any]] = {}
    timestamp: Optional[datetime] = None