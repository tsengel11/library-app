# app/schemas.py

from typing import List, Optional
from datetime import date
from pydantic import BaseModel

# User Schemas
class UserBase(BaseModel):
    username: str
    role: str  # e.g., 'admin', 'staff', 'user'
    first_name: str
    last_name: str
    address: Optional[str] = None
    phone_number: Optional[str] = None
    status: Optional[str] = "active"  # e.g., 'active', 'inactive'


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None
    status: Optional[str] = None


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


# Book Schemas
class CategoryInBook(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class BookBase(BaseModel):
    title: str
    author: str
    isbn: str
    publisher: Optional[str] = None
    edition: Optional[str] = None
    barcode: str


class BookCreate(BookBase):
    total_quantity: int


class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    edition: Optional[str] = None
    barcode: Optional[str] = None
    total_quantity: Optional[int] = None


class Book(BookBase):
    id: int
    total_quantity: int
    available_quantity: int
    categories: List['CategoryInBook'] = []

    class Config:
        orm_mode = True


# Category Schemas
class BookInCategory(BaseModel):
    id: int
    title: str
    author: str
    isbn: str
    barcode: str

    class Config:
        orm_mode = True


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass  # Additional fields can be added if necessary


class CategoryUpdate(BaseModel):
    name: Optional[str] = None


class Category(CategoryBase):
    id: int
    books: List['BookInCategory'] = []

    class Config:
        orm_mode = True


# Borrow Schemas
class UserInBorrow(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class BookInBorrow(BaseModel):
    id: int
    title: str
    author: str
    isbn: str
    barcode: str

    class Config:
        orm_mode = True


class BorrowBase(BaseModel):
    user_id: int
    book_id: int
    reserve_date: Optional[date] = None
    due_date: Optional[date] = None
    return_date: Optional[date] = None
    is_returned: Optional[bool] = False


class BorrowCreate(BorrowBase):
    pass  # Additional fields can be added if necessary


class BorrowUpdate(BaseModel):
    reserve_date: Optional[date] = None
    due_date: Optional[date] = None
    return_date: Optional[date] = None
    is_returned: Optional[bool] = None


class Borrow(BorrowBase):
    id: int
    user: UserInBorrow
    book: BookInBorrow

    class Config:
        orm_mode = True


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Update forward references
Book.update_forward_refs()
Category.update_forward_refs()
Borrow.update_forward_refs()