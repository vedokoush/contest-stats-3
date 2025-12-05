@echo off
REM Quick setup script for Windows

echo 🚀 PREHSG Contest Hub - Quick Setup
echo ====================================
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
python init_db.py

echo ✅ Backend setup complete!
echo.

REM Frontend setup
echo 📦 Setting up Frontend...
cd ..\frontend
call npm install
echo ✅ Frontend setup complete!
echo.

echo 🎉 Setup complete!
echo.
echo To start development:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   venv\Scripts\activate
echo   python -m uvicorn main:app --reload
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
pause
