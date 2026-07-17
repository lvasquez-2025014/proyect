# Authentication — Business Specification

## Objective
Allow users to securely access the ERP system, manage their sessions, and control permissions at company level.

## Actors
- Anonymous user (login, register)
- Authenticated user (any role)
- System admin (manage users, roles)

## Use Cases
- Login with email + password
- Login with single sign-on (SSO) — future
- Register new company (first user)
- Forgot password / reset password
- Logout (invalidate session)
- Refresh access token
- View active sessions
- Revoke session

## Business Rules
- A user can belong to only one company.
- A company must have at least one admin user.
- Passwords must be hashed (never stored in plain text).
- After 5 failed login attempts, account is locked for 15 minutes.
- Session expires after 24 hours of inactivity.
- Password reset links expire after 1 hour.
- Deleting a user is a soft delete (they become inactive).
- An inactive user cannot log in.

## Validations
- Email must be valid format.
- Password minimum 8 characters, at least 1 uppercase, 1 number.
- Company name required on registration.

## States
```
Anonymous → Authenticated (login)
Authenticated → Anonymous (logout / session expire)
Active → Inactive (admin disables user)
```
