# tests/test_users.py

def test_create_user(client, db_session):
    # Create an admin user to authorize user creation
    password = "adminpassword"
    hashed_password = get_password_hash(password)
    admin_user = User(
        username="admin",
        password=hashed_password,
        role="admin",
        first_name="Admin",
        last_name="User",
        status="active",
    )
    db_session.add(admin_user)
    db_session.commit()

    # Get the token for the admin user
    response = client.post(
        "/auth/token",
        data={"username": "admin", "password": password},
    )
    token = response.json()["access_token"]

    # Use the token to create a new user
    new_user_data = {
        "username": "newuser",
        "password": "newpassword",
        "role": "user",
        "first_name": "New",
        "last_name": "User",
        "status": "active",
    }
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/users/", json=new_user_data, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == new_user_data["username"]
    assert data["role"] == new_user_data["role"]