# RISK-006: Security Breach

**Status**: Active
**Probability**: Low
**Impact**: Critical
**Category**: Security

## Description
JWT compromise, SQL injection, XSS, or data exposure could expose customer data.

## Mitigation
- JWT with RS256 (asymmetric keys) — refresh tokens rotated
- All inputs validated (@Valid, never trust client)
- Parameterized queries only (no SQL concatenation)
- CSP headers + React auto-escaping (XSS prevention)
- CORS restricted to known origins
- Rate limiting on all endpoints
- Audit log tracks all data access (detection)
- Secrets never in repository (environment variables)
- Regular dependency scanning (Dependabot)
- Penetration testing before v1.0

## Contingency
If breach occurs:
1. Revoke all tokens immediately
2. Identify entry point and close it
3. Notify affected users (per GDPR)
4. Full security audit
