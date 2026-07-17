# Authentication API

## POST /api/v1/auth/login

Authenticate user and return tokens.

**Request**
```json
{
  "email": "user@luxury.com",
  "password": "SecurePass123!"
}
```

**Response 200**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 900,
  "token_type": "Bearer"
}
```

**Response 401**
```json
{
  "title": "Invalid Credentials",
  "status": 401,
  "detail": "Email or password is incorrect"
}
```

**Response 423**
```json
{
  "title": "Account Locked",
  "status": 423,
  "detail": "Too many failed attempts. Try again in 15 minutes"
}
```

**Validations**
- `email`: required, valid email format
- `password`: required, min 8 chars

**Permissions**: None (public)

---

## POST /api/v1/auth/register

Register a new company and admin user.

**Request**
```json
{
  "company_name": "Luxury Boutique Madrid",
  "email": "admin@luxuryboutique.com",
  "password": "SecurePass123!",
  "first_name": "Carlos",
  "last_name": "García",
  "phone": "+34 612 345 678"
}
```

**Response 201**
```json
{
  "id": "uuid",
  "email": "admin@luxuryboutique.com",
  "company_id": "uuid",
  "company_name": "Luxury Boutique Madrid",
  "access_token": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Response 409**
```json
{
  "title": "Conflict",
  "status": 409,
  "detail": "Email already registered"
}
```

**Validations**
- `company_name`: required, max 255
- `email`: required, valid email, unique
- `password`: required, min 8, 1 uppercase, 1 number
- `first_name`: required, max 100
- `last_name`: required, max 100

**Permissions**: None (public)

---

## POST /api/v1/auth/refresh

Refresh access token using refresh token (HTTP-only cookie).

**Response 200**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 900
}
```

**Response 401**
```json
{
  "title": "Invalid Token",
  "status": 401,
  "detail": "Refresh token is invalid or expired"
}
```

---

## POST /api/v1/auth/logout

Invalidate current refresh token.

**Response 204**: No content

**Permissions**: Authenticated

---

## POST /api/v1/auth/forgot-password

Send password reset email.

**Request**
```json
{
  "email": "user@luxury.com"
}
```

**Response 204**: No content (always returns 204 to prevent email enumeration)

---

## POST /api/v1/auth/reset-password

Reset password with token from email.

**Request**
```json
{
  "token": "reset-token-here",
  "password": "NewSecurePass123!"
}
```

**Response 204**: No content

**Response 400**
```json
{
  "title": "Invalid Token",
  "status": 400,
  "detail": "Reset token is invalid or expired"
}
```
