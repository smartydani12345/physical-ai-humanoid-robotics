@echo off
REM Startup script for Physical AI & Humanoid Robotics RAG Chatbot

echo Starting Physical AI & Humanoid Robotics RAG Chatbot...

REM Install dependencies
pip install -r requirements.txt

REM Run the application
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

echo Application stopped.
pause