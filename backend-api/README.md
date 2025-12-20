# Physical AI & Humanoid Robotics RAG Chatbot - Backend

This is the backend for a Retrieval-Augmented Generation (RAG) chatbot that answers questions about Physical AI & Humanoid Robotics textbook content.

## Features

- RAG (Retrieval-Augmented Generation) using Cohere embeddings and Qdrant vector database
- Gemini API for answer generation
- Neon Postgres for storing conversations
- Streaming responses support
- Full-text search functionality
- Conversation history management

## Setup

### Prerequisites

1. Python 3.8+
2. Access to the following services:
   - Cohere API (for embeddings)
   - Qdrant Cloud (for vector database)
   - Google Gemini API (for answer generation)
   - Neon Postgres (for conversation storage)

### Installation

1. Clone the repository
2. Navigate to the `backend-api` directory
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables in `.env`:
   ```env
   COHERE_API_KEY=your_cohere_api_key
   QDRANT_URL=your_qdrant_url
   QDRANT_API_KEY=your_qdrant_api_key
   GEMINI_API_KEY=your_gemini_api_key
   NEON_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

5. Set up the database using the schema in `database_schema.sql`

6. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

## Environment Variables

- `COHERE_API_KEY` - API key for Cohere embedding service
- `QDRANT_URL` - URL for Qdrant vector database
- `QDRANT_API_KEY` - API key for Qdrant vector database
- `GEMINI_API_KEY` - API key for Google Gemini
- `NEON_URL` - PostgreSQL connection string for Neon Postgres database

## API Endpoints

### Chat Endpoints
- `POST /api/v1/chat` - Query the chatbot
- `POST /api/v1/chat/stream` - Streaming response from chatbot
- `POST /api/v1/chat/conversation/start` - Start a new conversation
- `POST /api/v1/chat/conversation/{conversation_id}/messages` - Add a message to conversation
- `GET /api/v1/chat/conversation/{conversation_id}/history` - Get conversation history
- `GET /api/v1/chat/conversations` - Get all conversations
- `GET /api/v1/chat/health` - Health check for chat service

### Content Endpoints
- `POST /api/v1/content/search` - Search textbook content
- `POST /api/v1/content/reindex` - Reindex textbook content into vector database
- `GET /api/v1/content/stats` - Get indexed content statistics
- `GET /api/v1/content/health` - Health check for content service

### General Endpoints
- `GET /api/v1/health` - General health check
- `GET /` - Root endpoint

## Architecture

- `main.py` - Main FastAPI application with startup/shutdown events
- `api/v1/chat.py` - Chat-related endpoints and conversation management
- `api/v1/content.py` - Content search and indexing endpoints
- `models/chat_models.py` - Pydantic models for request/response
- `services/rag_service.py` - Core RAG service with conversation persistence
- `services/document_processor.py` - Document processing and indexing service
- `services/database_service.py` - Database connection and operations
- `database_schema.sql` - Database schema for conversation storage
- `initialize.py` - Initialization script for setting up the system

## Initialization

To initialize the system with textbook content, run:

```bash
python initialize.py
```

This script will:
1. Set up the database schema
2. Index the textbook content into the vector database
3. Verify all services are working

## Frontend Integration

The backend is designed to work with a Docusaurus-based frontend. The frontend should be configured to call the backend API endpoints at the appropriate URL.

## Deployment

### GitHub Actions Deployment to Vercel

The project includes GitHub Actions workflow for automated deployment to Vercel. To set this up:

1. Create a Vercel account and import your project
2. Set up the following environment variables in Vercel dashboard:
   - `COHERE_API_KEY`
   - `QDRANT_URL`
   - `QDRANT_API_KEY`
   - `GEMINI_API_KEY`
   - `NEON_URL`

3. Set up the following secrets in GitHub repository:
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`

The workflow will automatically deploy on pushes to the main branch.

## Development

To run tests:
```bash
python test_backend.py
```

## Troubleshooting

1. **Database Connection Issues**: Ensure your NEON_URL is in the correct PostgreSQL format
2. **Qdrant Connection Issues**: Verify your QDRANT_URL and QDRANT_API_KEY are correct
3. **API Key Issues**: Double-check all API keys are valid and have proper permissions
4. **Document Processing Issues**: Ensure the `my-website/docs/my-book` directory exists with markdown files

## Security

- Never commit API keys to version control
- Use environment variables for all sensitive information
- Enable SSL for all database connections
- Implement rate limiting in production