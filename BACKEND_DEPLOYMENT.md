# Physical AI & Humanoid Robotics RAG Chatbot - Backend Deployment

## Overview
This repository contains a RAG (Retrieval-Augmented Generation) chatbot backend for the Physical AI & Humanoid Robotics textbook. The backend is built with FastAPI and deployed on Vercel.

## Architecture
- **FastAPI**: Web framework for the API
- **Cohere**: For generating text embeddings
- **Qdrant**: Vector database for semantic search
- **Google Gemini**: For answer generation
- **Neon Postgres**: For conversation history persistence
- **Vercel**: Cloud platform for deployment

## Deployment to Vercel

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a Vercel account
3. Prepare API keys for all required services

### Environment Variables
Set the following environment variables in your Vercel project:

```
COHERE_API_KEY=your_cohere_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
NEON_URL=your_neon_postgres_connection_string
API_TOKEN=your_api_token_for_authentication
```

### Deployment Steps

1. **Link your Vercel project**:
   ```bash
   vercel link
   ```

2. **Set environment variables**:
   ```bash
   vercel env add
   ```
   Add each of the environment variables listed above.

3. **Deploy the backend**:
   ```bash
   vercel --prod
   ```

### Alternative: Using the deployment script
Run the provided deployment script:
```bash
./deploy-backend.sh
```

## API Endpoints

### Chat Endpoints
- `POST /api/v1/chat/chat` - Main chat endpoint
- `GET /api/v1/chat/health` - Health check
- `POST /api/v1/chat/conversation/start` - Start new conversation
- `GET /api/v1/chat/conversation/{id}/history` - Get conversation history

### Headers Required
- `x-api-token`: Your API authentication token

## Local Development

1. Install dependencies:
   ```bash
   cd backend-api
   pip install -r requirements.txt
   ```

2. Set up environment variables in `.env` file

3. Run the application:
   ```bash
   cd backend-api
   uvicorn main:app --reload --port=8000
   ```

## Initialization

Before using the RAG system, you need to initialize the database and index the content:

1. Run the initialization script:
   ```bash
   python initialize.py
   ```

This will:
- Create the database tables
- Index the Docusaurus documentation content into Qdrant

## Features

- **RAG-powered responses**: Answers based on textbook content
- **Selected text mode**: Answer only from user-selected text
- **Conversation history**: Persistent chat history
- **Streaming responses**: Real-time response streaming
- **Urdu translation**: Optional Urdu translation of responses
- **Health checks**: Comprehensive health monitoring

## Frontend Integration

The backend is designed to work with the Docusaurus frontend. The frontend can call the backend API endpoints with proper authentication.

## Troubleshooting

1. **Environment variables not loaded**: Make sure all required environment variables are set in Vercel dashboard
2. **Database connection issues**: Verify your Neon Postgres connection string
3. **Vector search not working**: Check that Cohere and Qdrant credentials are correct and content has been indexed
4. **API token errors**: Ensure the x-api-token header is included in all requests

## Support

For issues with deployment or functionality, please check:
- API documentation at `/docs` and `/redoc`
- Server logs in the Vercel dashboard
- Ensure all external service credentials are valid