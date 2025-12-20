import asyncpg
import os
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
from config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.connection_pool = None

    async def initialize(self):
        """Initialize the database connection pool"""
        try:
            self.connection_pool = await asyncpg.create_pool(
                settings.neon_url,
                min_size=settings.db_pool_size,
                max_size=settings.db_pool_overflow
            )
            logger.info("Database connection pool initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing database connection pool: {str(e)}")
            raise

    async def close(self):
        """Close the database connection pool"""
        if self.connection_pool:
            await self.connection_pool.close()
            logger.info("Database connection pool closed")

    async def create_conversation(self, conversation_id: str, title: str = "New Conversation"):
        """Create a new conversation in the database"""
        try:
            async with self.connection_pool.acquire() as conn:
                await conn.execute(
                    """
                    INSERT INTO conversations (id, title, created_at, updated_at)
                    VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                    """,
                    conversation_id, title
                )
            logger.info(f"Created conversation: {conversation_id}")
        except Exception as e:
            logger.error(f"Error creating conversation: {str(e)}")
            raise

    async def add_message(self, conversation_id: str, role: str, content: str, urdu_translation: Optional[str] = None):
        """Add a message to a conversation"""
        try:
            async with self.connection_pool.acquire() as conn:
                await conn.execute(
                    """
                    INSERT INTO messages (id, conversation_id, role, content, urdu_translation, timestamp)
                    VALUES (gen_random_uuid()::text, $1, $2, $3, $4, CURRENT_TIMESTAMP)
                    """,
                    conversation_id, role, content, urdu_translation
                )

                # Update conversation's updated_at timestamp
                await conn.execute(
                    """
                    UPDATE conversations
                    SET updated_at = CURRENT_TIMESTAMP
                    WHERE id = $1
                    """,
                    conversation_id
                )
            logger.info(f"Added message to conversation: {conversation_id}")
        except Exception as e:
            logger.error(f"Error adding message: {str(e)}")
            raise

    async def get_conversation_history(self, conversation_id: str) -> List[Dict[str, str]]:
        """Get conversation history for a given conversation ID"""
        try:
            async with self.connection_pool.acquire() as conn:
                rows = await conn.fetch(
                    """
                    SELECT role, content, urdu_translation, timestamp
                    FROM messages
                    WHERE conversation_id = $1
                    ORDER BY timestamp ASC
                    """,
                    conversation_id
                )

                return [
                    {
                        "role": row["role"],
                        "content": row["content"],
                        "urdu_translation": row["urdu_translation"],
                        "timestamp": row["timestamp"]
                    }
                    for row in rows
                ]
        except Exception as e:
            logger.error(f"Error getting conversation history: {str(e)}")
            return []

    async def get_all_conversations(self) -> List[Dict[str, Any]]:
        """Get all conversations"""
        try:
            async with self.connection_pool.acquire() as conn:
                rows = await conn.fetch(
                    """
                    SELECT id, title, created_at, updated_at
                    FROM conversations
                    ORDER BY updated_at DESC
                    """
                )

                return [
                    {
                        "id": row["id"],
                        "title": row["title"],
                        "created_at": row["created_at"],
                        "updated_at": row["updated_at"]
                    }
                    for row in rows
                ]
        except Exception as e:
            logger.error(f"Error getting conversations: {str(e)}")
            return []

    async def delete_conversation(self, conversation_id: str):
        """Delete a conversation and all its messages"""
        try:
            async with self.connection_pool.acquire() as conn:
                await conn.execute(
                    "DELETE FROM conversations WHERE id = $1",
                    conversation_id
                )
            logger.info(f"Deleted conversation: {conversation_id}")
        except Exception as e:
            logger.error(f"Error deleting conversation: {str(e)}")
            raise