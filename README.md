# Physical AI & Humanoid Robotics

🚀 **Live Website:**
👉 [https://my-website-phi-puce.vercel.app](https://my-website-phi-puce.vercel.app)

A Docusaurus-based interactive textbook and learning platform for **Physical AI**, **Humanoid Robotics**, and intelligent systems.
Features a RAG (Retrieval-Augmented Generation) chatbot backend for intelligent Q&A about the textbook content.

---

## Features

- 📚 Structured textbook chapters for Physical AI & Humanoid Robotics
- 🌐 Fast global deployment via **Vercel**
- 🤖 RAG-based chatbot with semantic search capabilities
- 🔗 Integration with Cohere, Qdrant, and Google Gemini
- 💾 Conversation history persistence with Neon Postgres
- 🌍 Multilingual support (English + Urdu)
- 🔧 Modular architecture (frontend Docusaurus + backend FastAPI)

---

## Architecture

- **Frontend**: Docusaurus-based documentation website (`my-website/`)
- **Backend**: FastAPI RAG chatbot (`backend-api/`)
- **Vector Database**: Qdrant Cloud for semantic search
- **Database**: Neon Postgres for conversation history
- **AI Services**: Google Gemini for responses, Cohere for embeddings

---

## Backend Deployment

The RAG chatbot backend can be deployed to Vercel. See [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md) for detailed instructions.

### Prerequisites
- Vercel account
- API keys for Cohere, Qdrant, and Google Gemini
- Neon Postgres database

### Environment Variables (for backend)
- `COHERE_API_KEY`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `GEMINI_API_KEY`
- `NEON_URL`
- `API_TOKEN`

---

## Frontend Development & Deployment

### Local Development
1. Navigate to the website directory:
   ```bash
   cd my-website
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

### Frontend Deployment
The Docusaurus frontend is automatically deployed to Vercel via the existing GitHub integration.

---

## Backend Development

### Setup
1. Navigate to the backend directory:
   ```bash
   cd backend-api
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env`

4. Start the development server:
   ```bash
   uvicorn main:app --reload
   ```

### Initialization
Before using the RAG system, initialize the database and index content:
```bash
python initialize.py
```

---

## API Documentation

The backend API provides:
- `/api/v1/chat/chat` - Main chat functionality
- `/api/v1/chat/conversation` - Conversation management
- `/api/v1/content` - Content search and indexing
- `/api/v1/health` - Health checks

API documentation available at `/docs` when backend is running.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

This project is licensed under the MIT License.

