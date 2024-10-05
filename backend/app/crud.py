# crud.py

from sqlalchemy.orm import Session
from datetime import date
from typing import List, Optional

from app import models, schemas
from app.utils.security import get_password_hash

# User CRUD operations

def get_user(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.User]:
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        password=hashed_password,
        role=user.role,
        first_name=user.first_name,
        last_name=user.last_name,
        address=user.address,
        phone_number=user.phone_number,
        status=user.status,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: schemas.UserBase) -> Optional[models.User]:
    db_user = get_user(db, user_id)
    if db_user:
        update_data = user_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        if 'password' in update_data:
            db_user.password = get_password_hash(update_data['password'])
        db.commit()
        db.refresh(db_user)
        return db_user
    return None

def delete_user(db: Session, user_id: int) -> bool:
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

# Book CRUD operations

def get_book(db: Session, book_id: int) -> Optional[models.Book]:
    return db.query(models.Book).filter(models.Book.id == book_id).first()

def get_book_by_isbn(db: Session, isbn: str) -> Optional[models.Book]:
    return db.query(models.Book).filter(models.Book.isbn == isbn).first()

def get_book_by_barcode(db: Session, barcode: str) -> Optional[models.Book]:
    return db.query(models.Book).filter(models.Book.barcode == barcode).first()

def get_books(db: Session, skip: int = 0, limit: int = 100) -> List[models.Book]:
    return db.query(models.Book).offset(skip).limit(limit).all()

def create_book(db: Session, book: schemas.BookCreate) -> models.Book:
    db_book = models.Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        publisher=book.publisher,
        edition=book.edition,
        total_quantity=book.total_quantity,
        available_quantity=book.total_quantity,
        barcode=book.barcode,
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, book_id: int, book_update: schemas.BookUpdate) -> Optional[models.Book]:
    db_book = get_book(db, book_id)
    if db_book:
        update_data = book_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
        return db_book
    return None

def delete_book(db: Session, book_id: int) -> bool:
    db_book = get_book(db, book_id)
    if db_book:
        db.delete(db_book)
        db.commit()
        return True
    return False

# Borrow CRUD operations

def borrow_book(db: Session, borrow_data: schemas.BorrowCreate) -> models.Borrow:
    book = get_book_by_barcode(db, borrow_data.book_barcode)
    if not book:
        raise ValueError("Book not found")

    if book.available_quantity <= 0:
        raise ValueError("Book not available")

    book.available_quantity -= 1

    borrow = models.Borrow(
        user_id=borrow_data.user_id,
        book_id=book.id,
        due_date=borrow_data.due_date,
        reserve_date=date.today(),
    )
    db.add(borrow)
    db.commit()
    db.refresh(borrow)
    return borrow

def return_book(db: Session, borrow_id: int) -> Optional[models.Borrow]:
    borrow = db.query(models.Borrow).filter(models.Borrow.id == borrow_id).first()
    if not borrow or borrow.is_returned:
        raise ValueError("Invalid borrow record")

    borrow.is_returned = True
    borrow.return_date = date.today()

    book = get_book(db, borrow.book_id)
    if book:
        book.available_quantity += 1

    db.commit()
    db.refresh(borrow)
    return borrow

def get_borrow_records(db: Session, skip: int = 0, limit: int = 100) -> List[models.Borrow]:
    return db.query(models.Borrow).offset(skip).limit(limit).all()

def get_user_borrow_records(db: Session, user_id: int) -> List[models.Borrow]:
    return db.query(models.Borrow).filter(models.Borrow.user_id == user_id).all()

# Category CRUD operations

def get_category(db: Session, category_id: int) -> Optional[models.Category]:
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def get_categories(db: Session) -> List[models.Category]:
    return db.query(models.Category).all()

def create_category(db: Session, category: schemas.CategoryCreate) -> models.Category:
    db_category = models.Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def assign_category_to_book(db: Session, book_id: int, category_id: int) -> Optional[models.Book]:
    book = get_book(db, book_id)
    category = get_category(db, category_id)
    if not book or not category:
        raise ValueError("Book or Category not found")

    book.categories.append(category)
    db.commit()
    db.refresh(book)
    return book

def remove_category_from_book(db: Session, book_id: int, category_id: int) -> Optional[models.Book]:
    book = get_book(db, book_id)
    category = get_category(db, category_id)
    if not book or not category:
        raise ValueError("Book or Category not found")

    if category in book.categories:
        book.categories.remove(category)
        db.commit()
        db.refresh(book)
    return book