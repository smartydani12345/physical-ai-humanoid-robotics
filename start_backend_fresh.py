#!/usr/bin/env python3
"""
Fresh start script for the backend API server to ensure proper configuration loading
"""

import sys
import os
import subprocess

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Change to the backend-api directory
backend_dir = os.path.join(script_dir, "backend-api")

# Execute the main.py with a fresh Python process
result = subprocess.run([
    sys.executable, "-c",
    """
import sys
import os
# Add backend-api to path
sys.path.insert(0, '.')
os.chdir('.')

# Import and run main
import main
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(main.app, host='0.0.0.0', port=8000)
    """
], cwd=backend_dir, capture_output=False)
