# routers/categories.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import schemas, models, crud
from app.dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)

@router.post("/", response_model=schemas.Category)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.create_category(db=db, category=category)

@router.get("/", response_model=List[schemas.Category])
def read_categories(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    categories = crud.get_categories(db)
    return categories