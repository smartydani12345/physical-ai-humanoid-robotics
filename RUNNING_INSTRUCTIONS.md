# Running Instructions for Physical AI & Humanoid Robotics RAG Chatbot

## Server Status
Both servers are currently running:

### Backend API Server
- **URL**: http://localhost:8000
- **Main Endpoint**: http://localhost:8000/
- **Health Check**: http://localhost:8000/api/v1/health
- **Chat API**: http://localhost:8000/api/v1/chat/chat

### Frontend Docusaurus Server
- **URL**: http://localhost:3000
- **Status**: Running and serving the book website

## How to Access the RAG Chatbot

1. Open your web browser
2. Navigate to: http://localhost:3000
3. The website will load with all book chapters and modules
4. Look for the floating chat button in the bottom-right corner of any page
5. Click the button to open the RAG chatbot interface
6. Ask questions about the Physical AI & Humanoid Robotics content

## Troubleshooting Browser Access

If you're having trouble accessing the website, try these solutions:

### 1. Clear Browser Cache
- Open browser settings
- Clear browsing data (especially cache and cookies)
- Restart browser and try again

### 2. Try Incognito/Private Mode
- Open an incognito or private browsing window
- Navigate to http://localhost:3000
- This bypasses cached content and extensions

### 3. Check Antivirus/Firewall
- Temporarily disable any antivirus software that might block local servers
- Check firewall settings to ensure ports 3000 and 8000 are not blocked

### 4. Disable Browser Extensions
- Disable ad blockers or security extensions temporarily
- These can sometimes interfere with local development servers

### 5. Alternative Access Methods
If the website doesn't load, you can test the backend API directly:

```bash
# Test the API endpoint
curl http://localhost:8000/

# Test the health endpoint
curl http://localhost:8000/api/v1/health

# Test the chat endpoint (with proper headers)
curl -X POST http://localhost:8000/api/v1/chat/chat \
  -H "Content-Type: application/json" \
  -H "x-api-token: your-api-token-here" \
  -d '{"message":"Hello, are you working?","history":[],"context":{},"conversation_id":null}'
```

## Server Management

### Stopping the Servers
- To stop the backend server: Press `Ctrl+C` in the terminal where it's running
- To stop the frontend server: Press `Ctrl+C` in the terminal where it's running

### Restarting the Servers
Backend server:
```bash
cd backend-api
python main.py
```

Frontend server:
```bash
cd frontend/my-website
npm start
```

## System Features

### RAG Chatbot Features
- **Site-wide availability**: Available on all book chapters and modules
- **Quick actions**: Predefined questions for common chapter topics
- **Context awareness**: Takes current page context into account
- **Conversation history**: Maintains chat history (when database is accessible)

### Book Content Coverage
The chatbot has access to content from:
- Chapter 1: Introduction to Physical AI & Humanoid Robotics
- Chapter 2: ROS 2 - The Robotic Nervous System
- Chapter 3: Simulation and Modeling
- Chapter 4: Computer Vision
- Chapter 5: Vision-Language-Action (VLA) Systems
- Chapter 6: Humanoid Development
- Chapter 7: Conversational Robotics
- Chapter 8: Advanced Concepts
- Chapter 9: Advanced Topics
- Chapter 10: Future Directions

## API Documentation

### Chat Endpoint
- **URL**: `POST /api/v1/chat/chat`
- **Headers**:
  - `Content-Type: application/json`
  - `x-api-token: [your-api-token]`
- **Request Body**:
```json
{
  "message": "Your question here",
  "history": [{"role": "user", "content": "previous message"}],
  "context": {},
  "conversation_id": "optional-conversation-id"
}
```

### Health Check
- **URL**: `GET /api/v1/health`
- **Response**: `{"status": "healthy", "service": "Physical AI & Humanoid Robotics RAG Chatbot"}`

## Support

If you continue to experience issues accessing the system:

1. Verify both servers are running using the health checks above
2. Check that ports 3000 and 8000 are not being used by other applications
3. Ensure you have the latest Node.js and Python versions installed
4. Check that all dependencies were installed correctly during setup