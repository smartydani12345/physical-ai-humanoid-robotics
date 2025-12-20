# Quickstart Guide: Physical AI & Humanoid Robotics Book Project

## Overview
This guide will help you set up the development environment for the Physical AI & Humanoid Robotics book project with RAG chatbot, authentication, and personalization features.

## Prerequisites
- Node.js (v18 or higher)
- Python (v3.11 or higher)
- Git
- Access to OpenAI API key
- Access to Qdrant Cloud (free tier)
- Access to Neon Serverless Postgres

## Project Structure
```
AI-PHYSICAL-HUMANIODS-ROBOTICS-ENGINEERING/
├── my-website/              # Docusaurus frontend
├── backend-api/             # FastAPI backend
├── claude-code/             # Claude Code automation
├── scripts/                 # Utility scripts
└── specs/                   # Specification files
```

## Setup Instructions

### 1. Clone and Initialize the Repository
```bash
git clone <repository-url>
cd AI-PHYSICAL-HUMANIODS-ROBOTICS-ENGINEERING
```

### 2. Frontend Setup (Docusaurus)
```bash
# Navigate to the frontend directory
cd my-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your API endpoints and configuration
```

### 3. Backend Setup (FastAPI)
```bash
# Navigate to the backend directory
cd ../backend-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your database URLs, API keys, etc.
```

### 4. Environment Configuration

#### Frontend (.env in my-website/)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_OPENAI_API_KEY=your_openai_key_here
```

#### Backend (.env in backend-api/)
```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname
QDRANT_URL=https://your-cluster.qdrant.tech
QDRANT_API_KEY=your_qdrant_key
OPENAI_API_KEY=your_openai_key
SECRET_KEY=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### 5. Database Setup
```bash
# In backend-api directory with virtual environment activated
cd backend-api

# Run database migrations
alembic upgrade head
```

### 6. Running the Applications

#### Frontend (Docusaurus)
```bash
cd my-website
npm start
# Frontend will run on http://localhost:3000
```

#### Backend (FastAPI)
```bash
cd backend-api
uvicorn main:app --reload --port 8000
# Backend API will run on http://localhost:8000
```

## Development Workflow

### 1. Content Development
- Add/edit textbook content in `my-website/docs/my-book/`
- Each chapter should follow the 10-element structure:
  1. Learning Objectives & Prerequisites
  2. Core Concepts & Theory
  3. Practical Implementation
  4. Diagrams
  5. Code Snippets
  6. Real-world Examples
  7. AI-Native Collaboration
  8. Exercises (3 beginner, 2 intermediate, 1 advanced)
  9. Chapter Quiz (5 MCQs + practical)
  10. Next Steps

### 2. RAG Content Indexing
After adding new content, index it for the RAG system:
```bash
cd backend-api
python scripts/index_content.py
```

### 3. Claude Code Automation
Use Claude Code Subagents for content generation:
```bash
cd claude-code
# Run specific subagents as needed
python subagents/content_generator.py
```

## Key Features Implementation

### 1. RAG Chatbot Integration
- The chatbot component is in `my-website/src/components/RAGChatbot/`
- API endpoints are in `backend-api/api/v1/chat.py`
- To test: ask questions about textbook content in the chat widget

### 2. Authentication (Better-Auth)
- Setup in `backend-api/api/v1/auth.py`
- Frontend components in `my-website/src/components/Auth/`
- Background assessment questions are configured during signup

### 3. Personalization Engine
- Implemented in `backend-api/services/personalization_service.py`
- Frontend controls in `my-website/src/components/Personalization/`
- Users can customize content at the start of each chapter

### 4. Claude Code Subagents
Located in `claude-code/subagents/`:
- `content_generator.py` - Generate textbook content
- `code_validator.py` - Validate code examples
- `diagram_creator.py` - Create diagram descriptions
- `quiz_generator.py` - Generate quiz questions

### 5. Claude Code Agent Skills
Located in `claude-code/skills/`:
- `deployment_skill.py` - Automated deployment
- `validation_skill.py` - Content validation
- `indexing_skill.py` - Content indexing for RAG

## Testing

### Frontend Testing
```bash
cd my-website
npm test
```

### Backend Testing
```bash
cd backend-api
python -m pytest tests/
```

### Integration Testing
```bash
# Test the complete RAG functionality
cd backend-api
python -m pytest tests/test_rag.py
```

## Deployment

### Frontend (GitHub Pages)
```bash
cd my-website
npm run build
# The build output is in the build/ directory
# Deploy this to GitHub Pages
```

### Backend (Vercel/Railway)
- Connect your GitHub repository to Vercel or Railway
- Set environment variables as specified in .env.example
- Deploy the backend-api directory

## Common Tasks

### 1. Adding a New Chapter
1. Create new markdown file in `my-website/docs/my-book/`
2. Follow the 10-element structure
3. Add to `my-website/sidebars.js`
4. Run RAG indexing script
5. Test with the chatbot

### 2. Updating Personalization Logic
1. Modify `backend-api/services/personalization_service.py`
2. Update frontend components in `my-website/src/components/Personalization/`
3. Test with different user profiles

### 3. Extending Claude Code Subagents
1. Add new subagent in `claude-code/subagents/`
2. Update configuration in `claude-code/config.json`
3. Test the automation capability

## Troubleshooting

### Frontend Issues
- If Docusaurus doesn't start: Check that backend is running on port 8000
- If components don't load: Verify API endpoints in .env

### Backend Issues
- If database migrations fail: Check DATABASE_URL in .env
- If RAG doesn't work: Verify QDRANT configuration and content indexing

### RAG Issues
- If chatbot returns poor responses: Re-index content with `python scripts/index_content.py`
- If responses are too slow: Check Qdrant Cloud performance

## Next Steps

1. **Start with Chapter 1**: Begin by reviewing and enhancing the existing content
2. **Test RAG functionality**: Ask questions about the textbook content
3. **Implement personalization**: Test content adaptation based on user profiles
4. **Use Claude Code**: Try the automation features for content generation
5. **Add more chapters**: Follow the 10-element structure for consistency

## Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Better-Auth Documentation](https://better-auth.com/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [OpenAI Documentation](https://platform.openai.com/docs/)
- [Claude Code Documentation](https://www.claude.com/product/claude-code)
- [Spec-Kit Plus Documentation](https://github.com/panaversity/spec-kit-plus/)

You're now ready to start contributing to the Physical AI & Humanoid Robotics book project! 🚀