# tests/test_returns.py

def test_return_book(client, db_session):
    # Similar setup as borrowing a book

    # Create users, book, and perform a borrow operation
    # ...

    # Now, return the book
    response = client.post(f"/borrows/return/{borrow_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["is_returned"] == True