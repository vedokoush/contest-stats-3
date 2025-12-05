# Getting Started Guide

## 🚀 PREHSG Contest Hub - Complete Setup

This guide will help you get the full-stack application running in under 5 minutes.

## Prerequisites

### Required Software
- **Node.js 18+** - Download from https://nodejs.org/
- **Python 3.9+** - Download from https://www.python.org/

Verify installation:
```bash
node --version
npm --version
python --version
```

## ⚡ Quick Setup (Windows)

1. Run the setup script:
   ```bash
   setup.bat
   ```

2. This will:
   - Create Python virtual environment
   - Install backend dependencies
   - Initialize database with sample data
   - Install frontend dependencies

3. Start the services in separate terminals

## 📋 Manual Setup

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Initialize database with sample contests
python init_db.py

# Start backend server
python -m uvicorn main:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Verify it's working:**
- Visit http://localhost:8000/docs - Interactive API documentation
- Visit http://localhost:8000/health - Health check endpoint

### Step 2: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Open in Browser:**
- Main app: http://localhost:5173/
- Admin panel: http://localhost:5173/admin

## 🎯 Using the Application

### Home Page (`http://localhost:5173/`)

1. **Select a Class**: Click buttons for Class 9, 10, 11, or 12
2. **View Contests**: The sidebar shows contests organized by year
3. **Expand Years**: Click on a year to see Pre #1, Pre #2, Pre #3
4. **View Contest**: Click "Contest" button to open contest link
5. **View Solution**: Click "Solution" button to open solution

### Admin Panel (`http://localhost:5173/admin`)

1. **Add Contest**: Click "Add Contest" button
   - Fill in class, year, pre number
   - Add contest and solution URLs
   - Click "Add"

2. **Edit Contest**: Click edit icon in table
   - Modify any field
   - Click "Update"

3. **Delete Contest**: Click delete icon with confirmation

## 🔧 API Examples

All API requests use `http://localhost:8000/api` as base.

### Get all contests
```bash
curl http://localhost:8000/contests
```

### Create contest
```bash
curl -X POST http://localhost:8000/contests \
  -H "Content-Type: application/json" \
  -d '{
    "class_level": 9,
    "year": 2025,
    "pre_number": 1,
    "contest_url": "https://codeforces.com",
    "solution_url": "https://codeforces.com/blog"
  }'
```

### Get contests by class
```bash
curl http://localhost:8000/contests/class/9
```

### Get contests by year
```bash
curl http://localhost:8000/contests/year/2025
```

### Update contest
```bash
curl -X PUT http://localhost:8000/contests/1 \
  -H "Content-Type: application/json" \
  -d '{
    "class_level": 10,
    "year": 2025,
    "pre_number": 2,
    "contest_url": "https://...",
    "solution_url": "https://..."
  }'
```

### Delete contest
```bash
curl -X DELETE http://localhost:8000/contests/1
```

## 📚 Important URLs

| Purpose | URL |
|---------|-----|
| Main App | http://localhost:5173/ |
| Admin Panel | http://localhost:5173/admin |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |
| Health Check | http://localhost:8000/health |

## 🐛 Troubleshooting

### Port Already in Use

**Backend port 8000 in use:**
```bash
python -m uvicorn main:app --reload --port 8001
```

**Frontend port 5173 in use:**
```bash
npm run dev -- --port 3000
```

### Module Not Found (Python)

Make sure virtual environment is activated:
```bash
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### npm: command not found

Node.js is not installed. Download from https://nodejs.org/

### Database Issues

Reset database:
```bash
# Delete the database file
rm backend/contest_hub.db  # macOS/Linux
del backend\contest_hub.db # Windows

# Reinitialize
cd backend
python init_db.py
```

### Backend not connecting to frontend

Check that:
1. Backend is running on `http://localhost:8000`
2. Frontend is running on `http://localhost:5173`
3. Check browser console for error messages
4. Verify CORS is enabled in `backend/main.py`

## 📁 Project Structure Overview

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Sidebar.tsx     # Year accordion sidebar
│   │   ├── ContestCard.tsx # Contest card display
│   │   ├── AdminPanel.tsx  # Admin CRUD interface
│   │   └── Button.tsx      # Custom button
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Main page
│   │   └── AdminPage.tsx   # Admin page
│   ├── lib/
│   │   └── api.ts          # Axios API client
│   ├── App.tsx             # Router setup
│   └── main.tsx            # Entry point
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.ts          # Vite config
└── package.json

backend/
├── main.py                 # FastAPI app
├── database.py             # Database config
├── models.py               # SQLModel definitions
├── init_db.py              # Initialize sample data
├── routers/
│   └── contests.py         # Contest API routes
└── requirements.txt        # Python dependencies
```

## 🎨 Design Features

- **Modern UI**: Clean, minimalistic design
- **Responsive**: Works on mobile and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Dark/Light**: Professional color scheme
- **Accessible**: Semantic HTML and ARIA labels

## 🚀 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Output: dist/ folder ready for deployment
```

### Backend
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

## 📖 Documentation

- **Frontend**: See `frontend/README.md`
- **Backend**: See `backend/README.md`
- **Full Setup**: See `SETUP.md`

## ✨ What's Included

✅ Complete React frontend with Vite
✅ FastAPI backend with SQLModel ORM
✅ SQLite database with sample data
✅ Full CRUD admin panel
✅ Beautiful UI with Tailwind CSS + shadcn/ui
✅ Smooth animations with Framer Motion
✅ Type-safe code (TypeScript + Python hints)
✅ Auto-generated API documentation
✅ CORS enabled for development
✅ Hot reload support

## 🎓 Learning Resources

- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **FastAPI**: https://fastapi.tiangolo.com/
- **SQLModel**: https://sqlmodel.tiangolo.com/

## 💡 Tips

1. **Check API Docs**: When backend is running, visit http://localhost:8000/docs to see all available endpoints
2. **Network Tab**: Use browser DevTools Network tab to debug API calls
3. **React DevTools**: Install React DevTools browser extension for debugging
4. **Python Debugger**: Add `import pdb; pdb.set_trace()` in backend code to debug

## 🆘 Still Having Issues?

1. Read the error message carefully
2. Check that both backend AND frontend are running
3. Try stopping and restarting services
4. Delete `node_modules` and `venv` and reinstall
5. Check the README files in `frontend/` and `backend/`

## 🎉 Success!

If you can see the PREHSG Contest Hub app at http://localhost:5173/, you're all set!

Happy coding! 🚀

---

**Need help?** Check the detailed documentation in the README files or review the inline code comments.
