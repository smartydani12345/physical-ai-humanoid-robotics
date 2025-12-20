# Architecture: Physical AI & Humanoid Robotics Book Project

**Project**: Physical AI & Humanoid Robotics with RAG Chatbot and Personalization
**Date**: 2025-01-13
**Status**: Architecture Design Complete

## Overview

This document defines the complete architecture for the Physical AI & Humanoid Robotics book project, incorporating:
1. AI/Spec-Driven Book Creation with Docusaurus
2. Integrated RAG Chatbot with OpenAI Agents/ChatKit SDKs
3. User Authentication with Better-Auth
4. Personalized Content Delivery
5. Advanced features with Claude Code Subagents and Agent Skills

## System Architecture

### 1. Frontend Layer (Docusaurus Book Website)
- **Framework**: Docusaurus v3.x
- **Hosting**: GitHub Pages
- **Components**:
  - Static book content with 10 chapters
  - Interactive RAG chatbot widget
  - User authentication UI
  - Personalization controls
  - Custom React components for exercises and quizzes

### 2. Backend Services Layer
- **API Server**: FastAPI for RAG chatbot backend
- **Authentication**: Better-Auth for user management
- **Database**: Neon Serverless Postgres for user data and content metadata
- **Vector Store**: Qdrant Cloud Free Tier for document embeddings

### 3. AI Services Layer
- **RAG System**: OpenAI Agents/ChatKit SDKs for question answering
- **Content Processing**: Document chunking and embedding pipeline
- **Personalization Engine**: User profile-based content adaptation

### 4. Development Tools Layer
- **Spec-Kit Plus**: For spec-driven development
- **Claude Code**: For development assistance and automation
- **Claude Code Subagents**: For reusable intelligence
- **Agent Skills**: For task automation

## Component Architecture

### Frontend Components

#### 1. Book Navigation
- **Location**: Docusaurus sidebar
- **Function**: Chapter navigation and progress tracking
- **Integration**: Standard Docusaurus navigation

#### 2. RAG Chatbot Widget
- **Location**: Floating widget on all book pages
- **Function**: Answer questions about book content
- **Technology**: OpenAI ChatKit SDK
- **Features**:
  - Context-aware responses
  - Citations to specific book sections
  - Ability to answer from user-selected text

#### 3. Authentication UI
- **Location**: Header and dedicated auth pages
- **Function**: User signup/login with background assessment
- **Technology**: Better-Auth integration
- **Features**:
  - Signup form with background questions
  - Login/logout functionality
  - User profile management

#### 4. Personalization Controls
- **Location**: At the start of each chapter
- **Function**: Customize content based on user background
- **Features**:
  - Difficulty level adjustment
  - Content depth customization
  - Example language preference

### Backend Services

#### 1. RAG API Service (FastAPI)
```
Endpoints:
- POST /api/chat: Process user questions and return RAG responses
- POST /api/embed: Process and store document embeddings
- GET /api/chunk/:id: Retrieve specific content chunks
- POST /api/query-selection: Answer questions about selected text
```

#### 2. Authentication Service (Better-Auth)
```
Features:
- User registration with background questions
- Login/logout
- Session management
- Profile updates
```

#### 3. Personalization Service
```
Endpoints:
- GET /api/personalization/:chapter: Get personalized content
- POST /api/preferences: Update user preferences
- GET /api/profile: Get user profile and background
```

## Data Architecture

### Database Schema (Neon Postgres)

#### 1. Users Table
```sql
users:
- id (UUID, primary key)
- email (string, unique)
- name (string)
- created_at (timestamp)
- software_background (string) -- e.g., "beginner", "intermediate", "expert"
- hardware_background (string) -- e.g., "none", "basic", "advanced"
- preferred_difficulty (string) -- e.g., "beginner", "intermediate", "advanced"
- preferred_language (string) -- e.g., "python", "cpp", "both"
```

#### 2. Content Chunks Table (for RAG)
```sql
content_chunks:
- id (UUID, primary key)
- chapter_id (string)
- chunk_text (text)
- embedding_vector (vector) -- for similarity search
- metadata (json) -- section, page, difficulty level
- created_at (timestamp)
```

#### 3. User Preferences Table
```sql
user_preferences:
- id (UUID, primary key)
- user_id (UUID, foreign key)
- chapter_id (string)
- difficulty_override (string) -- user override for specific chapter
- content_style (string) -- e.g., "theoretical", "practical", "both"
- last_accessed (timestamp)
```

### Vector Database (Qdrant Cloud)

#### 1. Collection: book_content
- **Vectors**: Embeddings of content chunks
- **Payload**:
  - chunk_id (reference to Postgres)
  - chapter_id
  - section_title
  - difficulty_level
  - content_type (text, code, diagram_description)

## Integration Architecture

### 1. RAG Pipeline
```
Document Processing:
1. Extract text from Docusaurus markdown files
2. Chunk text into semantic units
3. Generate embeddings using OpenAI API
4. Store in Qdrant vector database
5. Maintain mapping in Postgres

Query Processing:
1. User asks question via chatbot
2. Question embedding generated
3. Similarity search in Qdrant
4. Relevant chunks retrieved
5. Context assembled and sent to OpenAI
6. Response generated and returned to user
```

### 2. Personalization Pipeline
```
Content Customization:
1. User profile retrieved from Postgres
2. Chapter content loaded from Docusaurus
3. Content adapter applies user preferences
4. Customized content rendered
5. Usage tracked for future improvement
```

## Claude Code Implementation Strategy

### 1. Subagents for Reusable Intelligence
- **Content Generation Subagent**: Generate chapter content based on outline
- **Code Example Subagent**: Create and validate code snippets
- **Diagram Description Subagent**: Generate diagrams and visual aids
- **Quiz Generation Subagent**: Create quiz questions from content
- **Exercise Creation Subagent**: Generate programming exercises

### 2. Agent Skills for Task Automation
- **Deployment Skill**: Automate GitHub Pages deployment
- **Database Migration Skill**: Manage Neon Postgres schema changes
- **Vector Indexing Skill**: Automate Qdrant index updates
- **Content Validation Skill**: Validate content quality and accuracy

## Security Architecture

### 1. Authentication Security
- OAuth 2.0 with PKCE for secure authentication
- JWT tokens for session management
- Rate limiting to prevent abuse
- Secure password hashing

### 2. Data Security
- Encryption at rest for sensitive data
- API key management for external services
- Input validation and sanitization
- Secure embedding processing

### 3. RAG Security
- Content access control based on user permissions
- Query validation to prevent prompt injection
- Response sanitization to prevent XSS

## Deployment Architecture

### 1. Frontend Deployment
- **Platform**: GitHub Pages
- **Process**:
  - Build Docusaurus site with custom components
  - Deploy to GitHub Pages branch
  - CDN distribution

### 2. Backend Deployment
- **API Server**: Deploy to Vercel or Railway
- **Database**: Neon Serverless Postgres
- **Vector Store**: Qdrant Cloud
- **Authentication**: Better-Auth with secure configuration

### 3. CI/CD Pipeline
- Automated testing of RAG functionality
- Content validation checks
- Security scanning
- Staging environment for preview

## Performance Architecture

### 1. Caching Strategy
- CDN caching for static book content
- API response caching for common queries
- Database query optimization
- Vector search optimization

### 2. Scalability Considerations
- Serverless architecture for variable load
- Auto-scaling for API endpoints
- Optimized vector search for large content sets
- Efficient embedding generation

## Monitoring and Analytics

### 1. Application Monitoring
- API performance metrics
- RAG response times
- User engagement tracking
- Error logging and alerting

### 2. Content Analytics
- Chapter completion rates
- Popular content sections
- User preference patterns
- Chatbot query analysis

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Docusaurus + React | Book presentation and UI |
| Backend API | FastAPI | RAG and personalization services |
| Authentication | Better-Auth | User management |
| Database | Neon Postgres | User data and metadata |
| Vector Store | Qdrant Cloud | Document embeddings for RAG |
| AI Services | OpenAI Agents/ChatKit | Question answering |
| Development | Claude Code + Spec-Kit Plus | Development automation |
| Hosting | GitHub Pages | Static site hosting |

This architecture provides a comprehensive foundation for implementing the Physical AI & Humanoid Robotics book project with all required features, including the RAG chatbot, authentication, and personalization capabilities.