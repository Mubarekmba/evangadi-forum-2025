# 📘 Evangadi Forum – Authentication API Documentation

This document describes the authentication-related API endpoints used in the **Evangadi Forum Web Application**.
It covers user authentication, registration, login, and authorization using JWT.

---

## 🔐 Authentication Middleware

### Check Authenticated User

**Endpoint**
```
GET /api/user/checkUser
```

**Method:** GET

**Description**  
Checks whether the current user is authenticated and returns basic user information.

**Request Headers**

| Header | Value |
|------|------|
| Authorization | Bearer `<token>` |

**Successful Response**

**Status Code:** `200 OK`  
**Content-Type:** `application/json`

```json
{
  "message": "Valid user",
  "username": "Kebede",
  "userid": "123"
}
```

**Error Response**

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Unauthorized",
  "message": "Authentication invalid"
}
```

---

## 📝 User Registration (Sign Up)

### Register a New User

**Endpoint**
```
POST /api/user/register
```

**Method:** POST

**Description**  
Registers a new user.

**Request Body Parameters**

| Field | Type | Description |
|------|------|------------|
| username | string | Unique username |
| first_name | string | User's first name |
| last_name | string | User's last name |
| email | string | User's email address |
| password | string | Password (minimum 8 characters) |

**Example Request Body**

```json
{
  "username": "kebede123",
  "first_name": "Kebede",
  "last_name": "Abebe",
  "email": "kebede@example.com",
  "password": "password123"
}
```

**Successful Response**

**Status Code:** `201 Created`

```json
{
  "message": "User registered successfully"
}
```

### Error Responses

#### Missing or Invalid Fields

**Status Code:** `400 Bad Request`

```json
{
  "error": "Bad Request",
  "message": "Please provide all required fields"
}
```

#### Weak Password

**Status Code:** `400 Bad Request`

```json
{
  "error": "Bad Request",
  "message": "Password must be at least 8 characters"
}
```

#### User Already Exists

**Status Code:** `409 Conflict`

```json
{
  "error": "Conflict",
  "message": "User already existed"
}
```

#### Internal Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred."
}
```

---

## 🔑 User Login

### Login User

**Endpoint**
```
POST /api/user/login
```

**Method:** POST

**Description**  
Authenticates a user and returns a JWT access token.

**Request Body Parameters**

| Field | Type | Description |
|------|------|------------|
| email | string | User email |
| password | string | User password |

**Example Request Body**

```json
{
  "email": "kebede@example.com",
  "password": "password123"
}
```

**Successful Response**

**Status Code:** `200 OK`

```json
{
  "message": "Login successful",
  "token": "jwt_access_token_here"
}
```

**Error Response**

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

---

## 📌 General Notes

- All protected endpoints require authentication.
- JWT must be included in the request header as:
  ```
  Authorization: Bearer <token>
  ```
- Passwords are hashed before being stored in the database.
- Tokens should be stored securely on the client side.

---

## 🚀 Evangadi Forum API

A community-driven platform where users ask questions, share knowledge, and learn together.

