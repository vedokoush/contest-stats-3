# Quick Reference Guide

## 🎯 Commands Cheat Sheet

### Starting the Application

#### Option 1: Automated (Windows)
```bash
# Run setup.bat to install everything
setup.bat

# Then in two terminals:
# Terminal 1:
cd backend
venv\Scripts\activate
python -m uvicorn main:app --reload

# Terminal 2:
cd frontend
npm run dev
```

#### Option 2: Manual Setup

**Backend**:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python init_db.py
python -m uvicorn main:app --reload
```

**Frontend** (new terminal):
```bash
cd frontend
npm install
npm run dev
```

## 📱 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Main app |
| Admin | http://localhost:5173/admin | Admin panel |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| API Docs Alt | http://localhost:8000/redoc | ReDoc UI |
| Health | http://localhost:8000/health | Status check |

## 🧪 Quick Tests

### Backend Health Check
```bash
curl http://localhost:8000/health
```

### Get All Contests
```bash
curl http://localhost:8000/contests
```

### Create Contest
```bash
curl -X POST http://localhost:8000/contests \
  -H "Content-Type: application/json" \
  -d '{
    "class_level": 9,
    "year": 2025,
    "pre_number": 1,
    "contest_url": "https://example.com",
    "solution_url": "https://example.com"
  }'
```

## 🎨 Component Quick Reference

### Frontend Components Location
```
src/components/
├── Header.tsx         - Navigation bar
├── Sidebar.tsx        - Year accordion
├── ContestCard.tsx    - Contest display
├── AdminPanel.tsx     - Admin CRUD
└── Button.tsx         - Button component
```

### Pages Location
```
src/pages/
├── HomePage.tsx       - Main page (/)
└── AdminPage.tsx      - Admin page (/admin)
```

## 🔌 API Endpoints Quick Reference

### Contests Collection
- `GET /contests` - List all
- `POST /contests` - Create new

### Specific Contest
- `GET /contests/{id}` - Get one
- `PUT /contests/{id}` - Update
- `DELETE /contests/{id}` - Delete

### Filtered Views
- `GET /contests/class/{9|10|11|12}` - By class
- `GET /contests/year/{YYYY}` - By year

### Info & Health
- `GET /health` - Health check
- `GET /` - API info
- `GET /docs` - Swagger docs

## 📊 Database Schema Quick Reference

```
contests
├── id (int) - Primary key
├── class_level (int) - 9-12
├── year (int) - Contest year
├── pre_number (int) - 1-3
├── contest_url (str) - Contest link
└── solution_url (str) - Solution link
```

## 🛠️ Frontend Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🛠️ Backend Development Commands

```bash
# Start with auto-reload
python -m uvicorn main:app --reload

# Start with custom port
python -m uvicorn main:app --reload --port 8001

# Initialize database
python init_db.py

# Check imports
python -c "from main import app; print('OK')"
```

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Change backend port
python -m uvicorn main:app --reload --port 8001

# Change frontend port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Activate venv first
venv\Scripts\activate  # Windows

# Reinstall packages
pip install -r requirements.txt
npm install
```

### Database Issues
```bash
# Reset database
rm backend/contest_hub.db
python backend/init_db.py
```

### API Not Connecting
1. Check backend is running: `curl http://localhost:8000/health`
2. Check frontend is running: http://localhost:5173
3. Check browser console for errors
4. Verify vite.config.ts has correct proxy

## 📚 File Structure Summary

```
contest-stats-3/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Pages
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main
│   ├── package.json
│   └── tailwind.config.js
├── backend/               # FastAPI
│   ├── main.py            # App
│   ├── models.py          # Data models
│   ├── database.py        # DB config
│   ├── routers/           # API routes
│   ├── requirements.txt
│   └── contest_hub.db     # Database
└── Documentation files
```

## 🎯 Development Workflow

1. **Start Backend**:
   ```bash
   cd backend
   venv\Scripts\activate
   python -m uvicorn main:app --reload
   ```

2. **Start Frontend** (new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Make Changes**:
   - Frontend: Edit `.tsx` files → auto-reloads
   - Backend: Edit `.py` files → auto-reloads

4. **Test**:
   - Visit http://localhost:5173
   - Check http://localhost:8000/docs for API

5. **Deploy**:
   - Frontend: `npm run build`
   - Backend: Use Gunicorn

## 🎨 Key Features Checklist

Frontend:
- ✅ Header with class selection
- ✅ Sidebar with year accordion
- ✅ Contest cards with animations
- ✅ Admin panel with CRUD
- ✅ Modern UI with Tailwind
- ✅ Smooth animations

Backend:
- ✅ CRUD API endpoints
- ✅ Database with SQLModel
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Auto docs

## 💡 Pro Tips

1. **API Testing**: Use http://localhost:8000/docs (interactive)
2. **React DevTools**: Install browser extension for debugging
3. **Network Tab**: Check browser DevTools → Network for API calls
4. **Python Debugger**: Add `import pdb; pdb.set_trace()` to debug
5. **Hot Reload**: Both frontend and backend support automatic reload
6. **Database**: Visit SQLite DB file at `backend/contest_hub.db`

## 🚀 Deployment Quick Reference

### Frontend (Vercel/Netlify)
1. Run `npm run build`
2. Deploy `dist/` folder

### Backend (Render/Railway)
1. Set environment: `DATABASE_URL=...`
2. Install packages: `pip install -r requirements.txt`
3. Run: `gunicorn main:app --worker-class uvicorn.workers.UvicornWorker`

## 📖 Documentation Files

- **README.md** - Main overview
- **SETUP.md** - Detailed setup
- **GETTING_STARTED.md** - Quick start
- **IMPLEMENTATION_SUMMARY.md** - Complete summary
- **QUICK_REFERENCE.md** - This file
- **frontend/README.md** - Frontend docs
- **backend/README.md** - Backend docs

## 🆘 Need Help?

1. Read the relevant README file
2. Check GETTING_STARTED.md
3. Review code comments (well-documented)
4. Check API docs at http://localhost:8000/docs
5. Review test examples in GETTING_STARTED.md

---

**Last Updated**: December 5, 2025
**Status**: ✅ Ready to use
