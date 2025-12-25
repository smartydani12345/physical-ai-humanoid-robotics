import sys
import os

# Add the backend-api directory to Python path
sys.path.insert(0, './backend-api')

# Import the FastAPI app from the backend-api directory
from main import app

# Make sure the app is available for Vercel's Python runtime
# Vercel will look for the 'app' object in this file
__all__ = ['app']