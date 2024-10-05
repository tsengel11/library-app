# tests/test_borrows.py

def test_borrow_book(client, db_session):
    # Create a staff user
    password = "staffpassword"
    hashed_password = get_password_hash(password)
    staff_user = User(
        username="staff",
        password=hashed_password,
        role="staff",
        first_name="Staff",
        last_name="Member",
        status="active",
    )
    db_session.add(staff_user)

    # Create a regular user
    user_password = "userpassword"
    hashed_password = get_password_hash(user_password)
    regular_user = User(
        username="regularuser",
        password=hashed_password,
        role="user",
        first_name="Regular",
        last_name="User",
        status="active",
    )
    db_session.add(regular_user)

    # Create a book
    book = models.Book(
        title="Test Book",
        author="Test Author",
        isbn="1234567890",
        publisher="Test Publisher",
        edition="1st",
        total_quantity=5,
        available_quantity=5,
        barcode="9876543210",
    )
    db_session.add(book)
    db_session.commit()

    # Get the token for the staff user
    response = client.post(
        "/auth/token",
        data={"username": "staff", "password": password},
    )
    token = response.json()["access_token"]

    # Staff user borrows the book for the regular user
    borrow_data = {
        "user_id": regular_user.id,
        "book_barcode": book.barcode,
        "due_date": "2024-10-05",
    }
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/borrows/", json=borrow_data, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == regular_user.id
    assert data["book_id"] == book.id