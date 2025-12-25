#!/bin/bash

# Deployment script for Physical AI & Humanoid Robotics RAG Chatbot Backend

echo "Setting up Vercel deployment for RAG Chatbot Backend..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "Vercel CLI is installed."

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Set up Vercel project
echo "Initializing Vercel project for backend..."
vercel pull --yes --environment=production --token=${VERCEL_TOKEN}

# Deploy the backend API
echo "Deploying backend API to Vercel..."
vercel --prod --token=${VERCEL_TOKEN} --scope=${VERCEL_ORG_ID} --project=${VERCEL_PROJECT_NAME}

echo "Backend deployment completed!"