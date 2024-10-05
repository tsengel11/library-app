# tests/test_books.py

def test_create_book(client, db_session):
    # Create a staff user to authorize book creation
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
    db_session.commit()

    # Get the token for the staff user
    response = client.post(
        "/auth/token",
        data={"username": "staff", "password": password},
    )
    token = response.json()["access_token"]

    # Use the token to create a new book
    new_book_data = {
        "title": "Test Book",
        "author": "Test Author",
        "isbn": "1234567890",
        "publisher": "Test Publisher",
        "edition": "1st",
        "total_quantity": 5,
        "barcode": "9876543210",
    }
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/books/", json=new_book_data, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == new_book_data["title"]
    assert data["author"] == new_book_data["author"]