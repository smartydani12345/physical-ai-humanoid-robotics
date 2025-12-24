from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path

# Load environment variables from .env file in the backend-api directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

from config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import routers
from api.v1.chat import router as chat_router
from api.v1.content import router as content_router

app = FastAPI(
    title="Physical AI & Humanoid Robotics RAG Chatbot",
    description="A RAG chatbot for Physical AI & Humanoid Robotics textbook",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(content_router, prefix="/api/v1/content", tags=["content"])

# Global RAG service instance for startup/shutdown
rag_service_instance = None

@app.on_event("startup")
async def startup_event():
    """Initialize services on application startup"""
    logger.info("Validating environment variables...")
    try:
        # This will raise an exception if required variables are missing
        _ = settings.api_token  # Access the settings to trigger validation
        logger.info("Environment variables validated successfully")
    except ValueError as e:
        logger.error(f"Environment variable validation failed: {str(e)}")
        raise

    logger.info("Initializing RAG service...")
    try:
        from services.rag_service import RAGService
        global rag_service_instance
        rag_service_instance = RAGService()

        # Initialize RAG service - allow partial initialization if database fails
        try:
            await rag_service_instance.initialize_services()
            logger.info("RAG service initialized successfully with database")
        except Exception as db_error:
            logger.warning(f"Database initialization failed (this is OK for basic functionality): {str(db_error)}")
            logger.info("RAG service initialized with Qdrant only (no chat history persistence)")

        logger.info("RAG service initialization completed")
    except Exception as e:
        logger.error(f"Error initializing RAG service: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    """Clean up services on application shutdown"""
    logger.info("Shutting down RAG service...")
    global rag_service_instance
    if rag_service_instance:
        await rag_service_instance.db_service.close()
        logger.info("RAG service shutdown complete")

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "Physical AI & Humanoid Robotics RAG Chatbot"}

@app.get("/")
async def root():
    return {"message": "Welcome to Physical AI & Humanoid Robotics RAG Chatbot API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)