"""
Database configuration and initialization
SQLite database with SQLModel ORM
"""

import os
from sqlmodel import SQLModel, create_engine, Session

# Database URL - using SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./contest_hub.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False,  # Set to True for SQL debugging
)

def create_db_and_tables():
    """Create database and all tables"""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Dependency for getting database session"""
    with Session(engine) as session:
        yield session
