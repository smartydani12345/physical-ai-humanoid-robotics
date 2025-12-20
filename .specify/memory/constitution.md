<!-- SYNC IMPACT REPORT:
Version change: 1.0.0 → 1.1.0
Modified principles: None (new constitution)
Added sections: All principles specific to Physical AI & Humanoid Robotics RAG chatbot
Removed sections: Template placeholders
Templates requiring updates: N/A (new constitution)
Follow-up TODOs: None
-->
# Physical AI & Humanoid Robotics Backend RAG Chatbot Constitution

## Core Principles

### Backend-Only Implementation
<!-- I. Backend-Only -->
All development strictly limited to backend implementation (FastAPI); Frontend components must remain unmodified; Respect existing folder structure and update files without rewriting architecture.

### Architecture Preservation
<!-- II. Architecture Preservation -->
Must follow existing backend-api/ directory structure exactly; No duplicate files allowed outside specified structure; Update existing files rather than creating new architectural elements.

### RAG Pipeline Compliance
<!-- III. RAG Pipeline Compliance -->
Non-negotiable adherence to specified RAG pipeline: Handle selected_text first, then Qdrant querying, respond with "I don't know" when no relevant content found; Zero hallucination required in responses.

### Tech Stack Adherence
<!-- IV. Tech Stack Adherence -->
Mandatory use of specified technology stack: Qdrant Cloud (Free Tier), Cohere Embed v3 for embeddings, OpenAI Agents SDK with Gemini API, Neon Serverless Postgres; No alternatives allowed without explicit approval.

### Security & Authentication
<!-- V. Security & Authentication -->
Token-based authentication required for all chat endpoints using x-api-token header; API token must be loaded from environment variable API_TOKEN; All endpoints must be protected.

### Quality Standards
<!-- VI. Quality Standards -->
Responses must be academic, concise, and tutor-style; Zero hallucination policy strictly enforced; Responses must be grounded in retrieved context only.

## Technical Requirements

### API Contract Standards
The following endpoints must be implemented: POST /api/v1/chat, POST /api/v1/chat/stream, POST /api/v1/content/search, GET /api/v1/chat/health, GET /health; Streaming support must be available for chat endpoints; All responses must follow specified format.

### Database Schema Compliance
Neon Serverless Postgres schema must store conversations, messages, timestamps, and session/user IDs; Schema auto-creation must occur on startup; Proper indexing required for performance.

### Vector Database Configuration
Qdrant Cloud collection must be named humanoid_ai_book with payload fields: text, chapter, section, source_url; Cohere Embed v3 must be used for both document ingestion and query embeddings.

## Development Workflow

### Testing Requirements
All RAG functionality must be thoroughly tested including: selected_text handling, Qdrant querying, fallback responses, streaming functionality; Integration tests required for database operations and vector search; Unit tests for individual service components.

### Deployment & Monitoring
Production-ready code required with proper error handling and logging; Health check endpoints must accurately reflect system status; Performance monitoring required for Qdrant queries and LLM responses.

## Governance

All implementation must strictly follow the specified RAG pipeline and tech stack requirements; Any deviation from the prescribed architecture requires explicit approval; Code reviews must verify compliance with all principles; Changes to the core RAG flow require additional scrutiny and approval.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Date of initial adoption | **Last Amended**: 2025-12-20