# tests/test_auth.py

def test_login(client, db_session):
    # First, create a test user directly in the database
    password = "testpassword"
    hashed_password = get_password_hash(password)
    user = User(
        username="testuser",
        password=hashed_password,
        role="user",
        first_name="Test",
        last_name="User",
        status="active",
    )
    db_session.add(user)
    db_session.commit()

    # Now, attempt to login using the API
    response = client.post(
        "/auth/token",
        data={"username": "testuser", "password": password},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"