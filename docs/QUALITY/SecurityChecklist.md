# Security Checklist

## Authentication & Authorization

- [ ] Passwords hashed with BCrypt (cost factor ≥ 12)
- [ ] JWT signed with RS256 (asymmetric)
- [ ] Access tokens expire in 15 minutes
- [ ] Refresh tokens expire in 7 days
- [ ] Refresh tokens stored HTTP-only, Secure, SameSite=Strict
- [ ] Rate limiting on login endpoint (5 attempts/minute)
- [ ] Account lockout after 5 failed attempts (15 min)
- [ ] Password reset tokens expire in 1 hour
- [ ] Role-based access control on all endpoints
- [ ] Method-level security: `@PreAuthorize` on all mutating endpoints

## Data Protection

- [ ] All API traffic over HTTPS (TLS 1.2+)
- [ ] PII encrypted at rest (AES-256)
- [ ] No secrets in code (environment variables only)
- [ ] Secrets rotated regularly
- [ ] Database backups encrypted
- [ ] Multi-tenant data isolation (company_id filter on all queries)
- [ ] SQL injection prevented (parameterized queries always)

## API Security

- [ ] CORS restricted to specific origins
- [ ] Security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- [ ] Request size limits enforced
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak stack traces or internal details
- [ ] API versioning (breaking changes create new version)
- [ ] Webhooks signed with HMAC
- [ ] Rate limiting on all API endpoints (100 req/min per user)

## Infrastructure

- [ ] Docker images scanned for vulnerabilities (Trivy)
- [ ] Dependencies scanned weekly (Dependabot / Snyk)
- [ ] Access logs retained for 90 days
- [ ] Audit log of all data modifications
- [ ] Production environment isolated from staging/development
- [ ] Principle of least privilege on database users

## Frontend

- [ ] No sensitive data in client-side code
- [ ] API tokens never stored in localStorage (memory only)
- [ ] XSS prevented (React auto-escaping + CSP headers)
- [ ] CSRF protected (JWT immune; double-submit cookie if needed)
- [ ] Third-party scripts loaded with integrity hashes (SRI)

## Verification

- [ ] Penetration test performed quarterly
- [ ] Dependency vulnerability scan in CI
- [ ] SAST (Static Application Security Testing) in CI
- [ ] DAST (Dynamic Application Security Testing) on staging
- [ ] Security review for every PR that touches auth or data
