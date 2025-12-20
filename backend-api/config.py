from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Keys
    cohere_api_key: str
    qdrant_url: str
    qdrant_api_key: str
    gemini_api_key: str
    neon_url: str

    # Qdrant settings
    qdrant_collection_name: str = "textbook_content"

    # Database settings
    db_pool_size: int = 10
    db_pool_overflow: int = 20

    # Model settings
    max_tokens: int = 1000
    temperature: float = 0.7

    class Config:
        env_file = ".env"

settings = Settings()