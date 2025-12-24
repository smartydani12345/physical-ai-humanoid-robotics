"""Configuration settings for the Physical AI & Humanoid Robotics RAG Chatbot"""

import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings loaded from environment variables"""

    def __init__(self):
        # API Keys and Service URLs
        self.cohere_api_key: str = os.getenv("COHERE_API_KEY", "")
        self.qdrant_url: str = os.getenv("QDRANT_URL", "")
        self.qdrant_api_key: str = os.getenv("QDRANT_API_KEY", "")
        self.gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
        self.neon_url: str = os.getenv("NEON_URL", "")

        # API Authentication
        self.api_token: str = os.getenv("API_TOKEN", "your-api-token-here")

        # Database settings
        self.db_pool_size: int = int(os.getenv("DB_POOL_SIZE", "5"))
        self.db_pool_overflow: int = int(os.getenv("DB_POOL_OVERFLOW", "10"))

        # Qdrant settings
        self.qdrant_collection_name: str = os.getenv("QDRANT_COLLECTION_NAME", "humanoid_ai_book")

        # Validation
        self._validate_required_vars()

    def _validate_required_vars(self):
        """Validate that all required environment variables are set"""
        required_vars = [
            ("COHERE_API_KEY", self.cohere_api_key),
            ("QDRANT_URL", self.qdrant_url),
            ("QDRANT_API_KEY", self.qdrant_api_key),
            ("GEMINI_API_KEY", self.gemini_api_key),
            ("NEON_URL", self.neon_url),
        ]

        missing_vars = [name for name, value in required_vars if not value]

        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")


# Create a global settings instance
settings = Settings()