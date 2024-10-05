# routers/borrows.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date

from app import schemas, models, crud
from app.dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/borrows",
    tags=["borrows"],
)

@router.post("/", response_model=schemas.Borrow)
def borrow_book(
    borrow_data: schemas.BorrowCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ["staff", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.borrow_book(db=db, borrow_data=borrow_data)

@router.post("/return/{borrow_id}", response_model=schemas.Borrow)
def return_book(
    borrow_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ["staff", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.return_book(db=db, borrow_id=borrow_id)