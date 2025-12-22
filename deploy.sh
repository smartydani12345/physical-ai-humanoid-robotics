#!/bin/bash

# Deployment script for Physical AI & Humanoid Robotics RAG Chatbot backend
# This script automates the deployment process to Vercel

set -e  # Exit on any error

echo "🚀 Starting deployment of Physical AI & Humanoid Robotics RAG Chatbot backend..."

# Check if we're in a git repository
if ! git status > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

echo "✅ Git repository verified"

# Check if git is clean (no uncommitted changes that should be included)
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Detected uncommitted changes, adding and committing..."
    git add .
    git commit -m "feat: deploy backend RAG chatbot for Physical AI & Humanoid Robotics textbook

- Implement Qdrant vector search for textbook content
- Integrate Cohere embeddings for semantic search
- Connect Gemini LLM for response generation
- Use Neon Postgres for conversation history
- Add streaming support for chat responses
- Enforce selected-text-only mode when specified
- Add health check endpoints for monitoring
- Secure endpoints with x-api-token authentication

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
    echo "✅ Changes committed"
fi

# Check current branch
current_branch=$(git branch --show-current)
echo "📋 Current branch: $current_branch"

# If not on main branch, switch to main or create it
if [ "$current_branch" != "main" ]; then
    echo "🔄 Switching to main branch..."
    git checkout -B main
fi

# Ensure we have the origin remote set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📡 Setting up remote origin..."
    git remote add origin https://github.com/smartydani12345/physical-ai-humanoid-robotics.git
fi

# Push changes to remote
echo "📤 Pushing changes to remote repository..."
git push -u origin main
echo "✅ Changes pushed successfully"

# Wait a moment for GitHub to process the push
sleep 5

echo "🎉 Deployment process completed!"
echo "Your backend should now be deploying to Vercel via GitHub integration."
echo ""
echo "To verify the deployment, you can check:"
echo "- Vercel dashboard for build status"
echo "- Health endpoints once deployment is complete:"
echo "  - GET /api/v1/health (public)"
echo "  - GET /api/v1/chat/health (protected with x-api-token header)"

# Optionally, provide instructions for checking deployment status
echo ""
echo "💡 Tip: You can monitor the deployment status in your Vercel dashboard at:"
echo "https://vercel.com/dashboard"