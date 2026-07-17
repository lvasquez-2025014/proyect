# EPIC-001: Authentication & Multi-tenant

**Status**: Pending
**Priority**: Critical
**Dependencies**: None (foundation epic)

## Description
Implement authentication system with JWT, multi-tenant isolation, role-based access control, and company onboarding.

## Objectives
- Users can register a new company and become admin
- Users can log in with email + password
- JWT access tokens (15min) + refresh tokens (7d)
- Multi-tenant data isolation (company_id in all queries)
- Role-based access control (RBAC) with 6 roles
- Password reset flow
- Account lockout after 5 failed attempts

## Acceptance Criteria
- [ ] POST /api/v1/auth/register creates company + admin user
- [ ] POST /api/v1/auth/login returns JWT tokens
- [ ] GET /api/v1/auth/me returns authenticated user profile
- [ ] All endpoints return 401 without valid token
- [ ] Users can only access data from their own company
- [ ] Role permissions enforced on all mutating endpoints
- [ ] Account locks after 5 failed login attempts
- [ ] Password reset email sent and token expires after 1 hour
- [ ] Refresh token rotation (old token invalidated on refresh)
- [ ] Rate limiting: 5 login attempts/minute per IP

## Technical Notes
- JWT with RS256 (asymmetric keys)
- Hibernate @TenantId or Spring Filter for multi-tenant
- BCrypt for password hashing (cost factor 12)

## Epic Dependencies
None (foundation layer)

## Estimated Effort
2-3 sprints
