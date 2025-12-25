# Physical AI & Humanoid Robotics RAG Chatbot

This project integrates a RAG (Retrieval-Augmented Generation) chatbot into the Physical AI & Humanoid Robotics textbook website, allowing users to ask questions about the book content and receive AI-powered responses based on the textbook material.

## Features

- **AI-Powered Q&A**: Ask questions about Physical AI, Humanoid Robotics, and related topics
- **Context-Aware Responses**: The chatbot retrieves relevant information from the textbook before generating responses
- **Book-Specific Knowledge**: Trained on the Physical AI & Humanoid Robotics textbook content
- **Cross-Chapter Understanding**: Can answer questions that span multiple chapters
- **Quick Actions**: Predefined questions for common topics across different chapters
- **Page Context Awareness**: Takes current page context into account for more relevant answers

## Architecture

The system consists of:

1. **Frontend**: Docusaurus-based website with React chatbot component
2. **Backend**: FastAPI server with RAG service
3. **Vector Database**: Qdrant for semantic search of textbook content
4. **AI Models**:
   - Cohere for document embeddings
   - Grok (via Groq API) for response generation

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- API keys for:
  - Cohere
  - Grok (via Groq API)
  - Qdrant Cloud (if using hosted version)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-api
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create/update the `.env` file with your API keys:
   ```env
   COHERE_API_KEY=your_cohere_api_key_here
   QDRANT_URL=your_qdrant_url_here
   QDRANT_API_KEY=your_qdrant_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here  # Optional, if you want to keep as backup
   GROK_API_KEY=your_grok_api_key_here
   NEON_URL=your_neon_db_url_here
   API_TOKEN=physical_ai_robotics_secret_token
   ```

4. Start the backend server:
   ```bash
   python main.py
   ```
   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/my-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create/update the `.env` file with your configuration:
   ```env
   REACT_APP_API_TOKEN=physical_ai_robotics_secret_token
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run start
   ```
   The website will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/chat/chat` - Chat with the RAG system
- `GET /api/v1/chat/health` - Chat service health check
- `POST /api/v1/chat/conversation/start` - Start a new conversation
- `POST /api/v1/chat/conversation/{conversation_id}/messages` - Add message to conversation
- `GET /api/v1/chat/conversation/{conversation_id}/history` - Get conversation history

## Chatbot Features

### Quick Actions
The chatbot provides quick action buttons for common chapter topics:
- Chapter 1: Introduction concepts
- Chapter 2: ROS 2 concepts
- Chapter 3: Simulation techniques
- Chapter 4: Computer Vision techniques

### Context Awareness
The chatbot considers the current page context to provide more relevant answers.

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure all API keys in the `.env` files are valid and have the necessary permissions.

2. **CORS Issues**: The backend allows all origins by default, but you may need to adjust this for production.

3. **Qdrant Connection**: Verify that your Qdrant URL and API key are correct and that the collection exists.

4. **Gemini API Errors**:
   - Check that your Gemini API key is valid and has sufficient quota
   - Ensure the Google Cloud project has billing enabled
   - Verify that the Gemini API is enabled in Google Cloud Console
   - If you continue to have issues, you can use alternative LLM providers (see Advanced Configuration below)

5. **Database Connection**: If using the Neon database, ensure your connection string is correct and the database is accessible.

### Testing the RAG System

Run the test script to verify RAG functionality:
```bash
python test_rag.py
```

## Security

- API requests require a valid `x-api-token` header
- The token is configured in both backend and frontend `.env` files
- All API keys are stored in environment variables, not in the code

## Deployment

For production deployment:
1. Update API keys in environment variables
2. Configure proper CORS settings
3. Set up a production database connection
4. Use a reverse proxy (like Nginx) for the frontend
5. Implement proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request