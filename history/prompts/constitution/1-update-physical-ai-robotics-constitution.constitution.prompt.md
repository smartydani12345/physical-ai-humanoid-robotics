---
id: 1
title: update-physical-ai-robotics-constitution
stage: constitution
date: 2025-12-20
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 5-vla-systems
user: claude
command: sp.constitution
labels: [constitution, backend, rag, chatbot, physical-ai, humanoid-robotics]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```
Project: Physical AI & Humanoid Robotics – Backend RAG Chatbot (Spec-KitPlus) Objective: Implement a production-ready backend Retrieval-Augmented Generation (RAG) chatbot for a Docusaurus-based textbook website. The frontend is already deployed on Vercel. This constitution governs ONLY backend implementation, integration, automation, and deployment triggers. ──────────────────────── SCOPE (STRICT) ──────────────────────── - Backend ONLY (FastAPI) - Frontend already exists and must not be modified - Respect existing folder structure - Update files, do NOT rewrite architecture ──────────────────────── EXISTING BACKEND STRUCTURE (MUST FOLLOW) ──────────────────────── backend-api/ ├─ api/ │ └─ v1/ │ ├─ chat.py │ └─ content.py ├─ models/ │ └─ chat_models.py ├─ services/ │ └─ rag_service.py ├─ config.py ├─ database_schema.sql └─ main.py No duplicate files allowed outside this structure. ──────────────────────── MANDATORY TECH STACK ──────────────────────── Vector Database: - Qdrant Cloud (Free Tier) - Collection: humanoid_ai_book - Payload fields: - text - chapter - section - source_url Embeddings: - Cohere Embed v3 - Used for document ingestion and query embeddings - No local or sentence-transformer models allowed LLM: - OpenAI Agents SDK - Gemini API via OpenAI-compatible endpoint - Used ONLY for: - Answer generation - Urdu translation Database: - Neon Serverless Postgres - Store: - conversations - messages - timestamps - session/user IDs - Schema auto-created on startup Authentication: - Token-based - Header: x-api-token - Token loaded from environment variable API_TOKEN - All chat endpoints protected ──────────────────────── RAG PIPELINE (NON-NEGOTIABLE) ──────────────────────── 1. User query received 2. If selected_text exists: - Ignore Qdrant - Answer ONLY from selected_text 3. Else: - Generate embedding with Cohere - Query Qdrant top-K 4. If no relevant content: - Respond EXACTLY: "I don't know" 5. Gemini receives: - User query - Retrieved context ONLY 6. Response must be: - Academic - Concise - Tutor-style - Zero hallucination ──────────────────────── API CONTRACT ──────────────────────── POST /api/v1/chat POST /api/v1/chat/stream POST /api/v1/content/search GET /api/v1/chat/health GET /health Streaming must be suppor
```

## Response snapshot

Updated the project constitution to reflect the specific requirements for the Physical AI & Humanoid Robotics Backend RAG Chatbot project. The new constitution includes:

- Core Principles: Backend-Only Implementation, Architecture Preservation, RAG Pipeline Compliance, Tech Stack Adherence, Security & Authentication, Quality Standards
- Technical Requirements: API Contract Standards, Database Schema Compliance, Vector Database Configuration
- Development Workflow: Testing Requirements, Deployment & Monitoring
- Governance: Compliance and approval requirements

## Outcome

- ✅ Impact: Created project-specific constitution with detailed principles for Physical AI & Humanoid Robotics RAG chatbot backend
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with project-specific constitution
- 🔁 Next prompts: Implementation of the backend components following the constitution
- 🧠 Reflection: The constitution now clearly defines the project's scope, tech stack, and implementation requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of backend components following the constitution