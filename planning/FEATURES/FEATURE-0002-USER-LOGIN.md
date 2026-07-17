# FEATURE-0002: User Login

**Status**: Pending
**Priority**: Critical
**Epic**: EPIC-001 (Authentication)
**Estimate**: 2 days

## Description
Authenticate existing users with email + password.

## Acceptance Criteria
- [ ] Login form with email and password
- [ ] JWT access token (15min) returned + refresh token (7d) in HTTP-only cookie
- [ ] Error message for invalid credentials
- [ ] Account lockout after 5 failed attempts (15 min cooldown)
- [ ] "Remember me" extends refresh token to 30 days
- [ ] Redirect to dashboard on success
- [ ] Redirect to login when accessing protected routes without token

## API
POST /api/v1/auth/login

## Notes
Rate limit: 5 attempts per minute per IP.
