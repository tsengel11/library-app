# create_admin_user.py

import os
import sys

# Set up the path to import app modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, schemas, crud
from app.utils.security import get_password_hash

def create_admin_user():
    # Create the database tables if they don't exist
    models.Base.metadata.create_all(bind=engine)

    # Create a new database session
    db: Session = SessionLocal()

    # Check if an admin user already exists
    existing_user = crud.get_user_by_username(db, username='admin')
    if existing_user:
        print("Admin user already exists.")
        return

    # Securely get the admin password
    from getpass import getpass
    password = getpass("Enter password for admin user: ")

    # Create the admin user data
    admin_data = schemas.UserCreate(
        username='admin',
        password=password,
        role='admin',
        first_name='Admin',
        last_name='User',
        address=None,
        phone_number=None,
        status='active',
    )

    # Create the admin user
    try:
        admin_user = crud.create_user(db, user=admin_data)
        db.commit()
        print("Admin user created successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == '__main__':
    create_admin_user()