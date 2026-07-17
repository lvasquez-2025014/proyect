# FEATURE-0001: Create Company (Onboarding)

**Status**: Pending
**Priority**: Critical
**Epic**: EPIC-001 (Authentication)
**Estimate**: 3 days

## Description
First-time user flow: register a new company and become its admin.

## Acceptance Criteria
- [ ] Registration form: company name, admin email, password, admin name
- [ ] Company created with default settings (USD, UTC, English)
- [ ] Admin user created with role ADMIN
- [ ] Default branch created (Main Office)
- [ ] Default warehouse created under main branch
- [ ] Welcome email sent
- [ ] User automatically logged in after registration
- [ ] Duplicate email rejected

## Validation Rules
- Company name: required, 2-255 chars
- Email: valid format, unique
- Password: min 8 chars, 1 uppercase, 1 number
- Admin name: required, 2-100 chars

## Notes
This is the first feature a user interacts with. Must be polished.
