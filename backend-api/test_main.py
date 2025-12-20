import pytest
import asyncio
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_chat_health():
    response = client.get("/api/v1/chat/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_content_health():
    response = client.get("/api/v1/content/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"