import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")

SQLITE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "portfolio.db")

_base_engine = None

try:
    _pg_url = f"postgresql+pg8000://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
    _base_engine = create_engine(_pg_url)
    _base_engine.connect()
    print("[DB] Connected to PostgreSQL")
except Exception as e:
    print(f"[DB] PostgreSQL unavailable ({e}), falling back to SQLite")
    _base_engine = create_engine(f"sqlite:///{SQLITE_PATH}")

engine = _base_engine

Base = declarative_base()

Session = sessionmaker(bind=engine)
