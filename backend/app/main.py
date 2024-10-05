# main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import uvicorn
from dotenv import load_dotenv
from app import models, schemas, crud
from app.database import SessionLocal, engine
from app.dependencies import get_db, get_current_user
from app.utils import security
from app.routers import auth, users, books, borrows, categories

# Create all database tables
models.Base.metadata.create_all(bind=engine)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Library Web Application",
    description="A web application for library management.",
    version="1.0.0"
)

# Set up CORS middleware
origins = [
    "http://localhost",
    "http://localhost:4200",  # Adjust according to your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(books.router)
app.include_router(borrows.router)
app.include_router(categories.router)

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "OK"}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Library Web Application API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)