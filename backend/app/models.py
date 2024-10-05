# models.py

from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import date

from app.database import Base

# Association table for many-to-many relationship between books and categories
# Association table
book_category_table = Table(
    'book_category',
    Base.metadata,
    Column('book_id', Integer, ForeignKey('books.id'), primary_key=True),
    Column('category_id', Integer, ForeignKey('categories.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # e.g., 'admin', 'staff', 'user'
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    status = Column(String, nullable=True)  # e.g., 'active', 'inactive'

    borrows = relationship('Borrow', back_populates='user')

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    isbn = Column(String, unique=True, nullable=False)
    publisher = Column(String, nullable=True)
    edition = Column(String, nullable=True)
    total_quantity = Column(Integer, nullable=False)
    available_quantity = Column(Integer, nullable=False)
    barcode = Column(String, unique=True, nullable=False)

    borrows = relationship('Borrow', back_populates='book')
    categories = relationship('Category', secondary=book_category_table, back_populates='books')

class Borrow(Base):
    __tablename__ = 'borrows'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    reserve_date = Column(Date, default=date.today)
    due_date = Column(Date, nullable=False)
    return_date = Column(Date, nullable=True)
    is_returned = Column(Boolean, default=False)

    user = relationship('User', back_populates='borrows')
    book = relationship('Book', back_populates='borrows')

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    books = relationship('Book', secondary=book_category_table, back_populates='categories')

