"""
Script to initialize the database with sample data
Run this once to populate the database
"""

from database import create_db_and_tables, engine
from models import Contest
from sqlmodel import Session

def init_db():
    """Initialize database with sample data"""
    create_db_and_tables()
    
    with Session(engine) as session:
        # Check if data already exists
        from sqlmodel import select
        existing = session.exec(select(Contest)).first()
        if existing:
            print("Database already populated!")
            return
        
        # Sample data
        sample_contests = [
            Contest(
                class_level=9,
                year=2025,
                pre_number=1,
                contest_url="https://codeforces.com/",
                solution_url="https://codeforces.com/blog/entry/1/",
            ),
            Contest(
                class_level=9,
                year=2025,
                pre_number=2,
                contest_url="https://codeforces.com/",
                solution_url="https://codeforces.com/blog/entry/2/",
            ),
            Contest(
                class_level=9,
                year=2025,
                pre_number=3,
                contest_url="https://codeforces.com/",
                solution_url="https://codeforces.com/blog/entry/3/",
            ),
            Contest(
                class_level=10,
                year=2025,
                pre_number=1,
                contest_url="https://atcoder.jp/",
                solution_url="https://atcoder.jp/contests/abc001/editorial",
            ),
            Contest(
                class_level=10,
                year=2025,
                pre_number=2,
                contest_url="https://atcoder.jp/",
                solution_url="https://atcoder.jp/contests/abc002/editorial",
            ),
            Contest(
                class_level=10,
                year=2025,
                pre_number=3,
                contest_url="https://atcoder.jp/",
                solution_url="https://atcoder.jp/contests/abc003/editorial",
            ),
            Contest(
                class_level=11,
                year=2025,
                pre_number=1,
                contest_url="https://www.codechef.com/",
                solution_url="https://discuss.codechef.com/",
            ),
            Contest(
                class_level=11,
                year=2025,
                pre_number=2,
                contest_url="https://www.codechef.com/",
                solution_url="https://discuss.codechef.com/",
            ),
            Contest(
                class_level=11,
                year=2025,
                pre_number=3,
                contest_url="https://www.codechef.com/",
                solution_url="https://discuss.codechef.com/",
            ),
            Contest(
                class_level=12,
                year=2025,
                pre_number=1,
                contest_url="https://projecteuler.net/",
                solution_url="https://projecteuler.net/thread=1",
            ),
            Contest(
                class_level=12,
                year=2025,
                pre_number=2,
                contest_url="https://projecteuler.net/",
                solution_url="https://projecteuler.net/thread=2",
            ),
            Contest(
                class_level=12,
                year=2025,
                pre_number=3,
                contest_url="https://projecteuler.net/",
                solution_url="https://projecteuler.net/thread=3",
            ),
            # 2024 contests
            Contest(
                class_level=9,
                year=2024,
                pre_number=1,
                contest_url="https://codeforces.com/",
                solution_url="https://codeforces.com/blog/entry/100/",
            ),
            Contest(
                class_level=10,
                year=2024,
                pre_number=1,
                contest_url="https://atcoder.jp/",
                solution_url="https://atcoder.jp/contests/abc100/editorial",
            ),
        ]
        
        session.add_all(sample_contests)
        session.commit()
        print(f"✅ Database initialized with {len(sample_contests)} sample contests!")

if __name__ == "__main__":
    init_db()
