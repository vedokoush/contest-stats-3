# PREHSG Contest Hub - Backend

Production-ready FastAPI backend for contest management.

## Features

- ⚡ **FastAPI** - High-performance Python web framework
- 🗄️ **SQLModel** - SQL databases in Python with ORM, data validation, and more
- 💾 **SQLite** - Lightweight embedded database
- 📚 **OpenAPI/Swagger** - Auto-generated API documentation
- 🔒 **CORS** - Enabled for React development
- 🎯 **Type hints** - Full type annotations for better IDE support

## Project Structure

```
backend/
├── main.py              # FastAPI app setup and routes
├── database.py          # Database configuration
├── models.py            # SQLModel data models
├── init_db.py           # Database initialization script
├── requirements.txt     # Python dependencies
└── routers/
    └── contests.py      # Contest CRUD endpoints
```

## Installation & Setup

1. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the database with sample data:
   ```bash
   python init_db.py
   ```

4. Start the development server:
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

## API Endpoints

### Health & Info
- `GET /health` - Health check
- `GET /` - API information

### Contests (CRUD)
- `GET /contests` - Get all contests
- `POST /contests` - Create new contest
- `GET /contests/{id}` - Get specific contest
- `PUT /contests/{id}` - Update contest
- `DELETE /contests/{id}` - Delete contest

### Filtered Endpoints
- `GET /contests/class/{class_level}` - Get contests by class (9-12)
- `GET /contests/year/{year}` - Get contests by year

## API Documentation

Once the server is running, you can access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Database Schema

```python
Contest:
  - id: int (primary key)
  - class_level: int (9-12)
  - year: int (2000-2100)
  - pre_number: int (1-3)
  - contest_url: str
  - solution_url: str
```

## Example Requests

### Get all contests
```bash
curl http://localhost:8000/contests
```

### Create a contest
```bash
curl -X POST http://localhost:8000/contests \
  -H "Content-Type: application/json" \
  -d '{
    "class_level": 9,
    "year": 2025,
    "pre_number": 1,
    "contest_url": "https://example.com/contest",
    "solution_url": "https://example.com/solution"
  }'
```

### Update a contest
```bash
curl -X PUT http://localhost:8000/contests/1 \
  -H "Content-Type: application/json" \
  -d '{
    "class_level": 10,
    "year": 2025,
    "pre_number": 2,
    "contest_url": "https://example.com/contest2",
    "solution_url": "https://example.com/solution2"
  }'
```

### Delete a contest
```bash
curl -X DELETE http://localhost:8000/contests/1
```

## Environment Variables

- `DATABASE_URL` - Database connection string (default: `sqlite:///./contest_hub.db`)

Example with PostgreSQL:
```bash
export DATABASE_URL="postgresql://user:password@localhost/contest_hub"
```

## Development

### Running with auto-reload
```bash
python -m uvicorn main:app --reload
```

### Running tests (when added)
```bash
pytest
```

### Database Debugging

Enable SQL query logging by setting `echo=True` in `database.py`:
```python
engine = create_engine(DATABASE_URL, echo=True)
```

## Production Deployment

For production, use a production-grade ASGI server:

```bash
pip install gunicorn

gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

Or with Docker:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## API Response Format

All responses follow a consistent JSON format:

### Success Response
```json
{
  "id": 1,
  "class_level": 9,
  "year": 2025,
  "pre_number": 1,
  "contest_url": "https://...",
  "solution_url": "https://..."
}
```

### Error Response
```json
{
  "detail": "Contest with id 999 not found"
}
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React dev server)

Modify `main.py` to add additional origins for production.
