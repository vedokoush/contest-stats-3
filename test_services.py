#!/usr/bin/env python3
"""
Quick test script to verify both backend and frontend are working
"""

import subprocess
import time
import sys
import os
from pathlib import Path

def check_backend():
    """Check if backend is running"""
    try:
        import requests
        response = requests.get('http://localhost:8000/health', timeout=2)
        return response.status_code == 200
    except:
        return False

def check_frontend():
    """Check if frontend dev server is running"""
    try:
        import requests
        response = requests.get('http://localhost:5173', timeout=2)
        return response.status_code == 200
    except:
        return False

def main():
    print("🧪 PREHSG Contest Hub - Verification Test")
    print("=" * 50)
    print()
    
    # Check backend
    print("Checking Backend...")
    if check_backend():
        print("✅ Backend is running on http://localhost:8000")
        print("   📚 API Docs: http://localhost:8000/docs")
    else:
        print("❌ Backend is not running on http://localhost:8000")
        print("   Start it with: python -m uvicorn main:app --reload")
    
    print()
    
    # Check frontend
    print("Checking Frontend...")
    if check_frontend():
        print("✅ Frontend is running on http://localhost:5173")
    else:
        print("❌ Frontend is not running on http://localhost:5173")
        print("   Start it with: npm run dev")
    
    print()
    print("=" * 50)
    
    if check_backend() and check_frontend():
        print("🎉 Both services are running! Open http://localhost:5173 in your browser.")
    else:
        print("⚠️  Please start both services before testing the application.")

if __name__ == "__main__":
    main()
