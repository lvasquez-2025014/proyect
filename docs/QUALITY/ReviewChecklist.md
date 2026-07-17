# Code Review Checklist

## General

- [ ] Code follows project coding standards (`docs/08-CODING-STANDARDS.md`)
- [ ] No unnecessary complexity (KISS)
- [ ] No premature optimization (YAGNI)
- [ ] No dead code, commented code, or TODO without ticket
- [ ] No console.log / System.out.println in production code
- [ ] No hardcoded values that should be configuration
- [ ] No sensitive data exposed (secrets, tokens, PII)

## Architecture & Design

- [ ] Follows Clean Architecture rules (domain → application → infrastructure)
- [ ] Module boundaries respected (no cross-module direct access)
- [ ] Dependency injection used correctly (constructor injection)
- [ ] Single Responsibility Principle followed
- [ ] No circular dependencies
- [ ] API changes are backward compatible or versioned
- [ ] Events used for cross-module communication where appropriate

## Frontend

- [ ] Server component by default (no unnecessary "use client")
- [ ] Props interface defined and exported
- [ ] Zustand used for UI state, TanStack Query for server state
- [ ] Form validation with Zod schema
- [ ] Error boundaries in place (`error.tsx`)
- [ ] Loading states handled (`loading.tsx` or Suspense)
- [ ] Responsive design verified (desktop + mobile)
- [ ] Dark mode supported
- [ ] Images use Next.js `<Image>` with dimensions
- [ ] No memory leaks (useEffect cleanup, subscription cleanup)

## Backend

- [ ] DTOs used (entities never exposed directly)
- [ ] `@Valid` on request bodies
- [ ] Exception handling via `@ExceptionHandler` (no try-catch in controllers)
- [ ] `@Transactional` on application service, not controller or repository
- [ ] Pagination on all list endpoints
- [ ] N+1 query problem avoided (fetch joins, entity graphs)
- [ ] Large datasets use streaming or pagination
- [ ] Logging at appropriate level (info for actions, debug for details)

## Testing

- [ ] Unit tests for all new domain logic
- [ ] Integration tests for new API endpoints
- [ ] Tests cover edge cases and error scenarios
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test data uses factories/builders
- [ ] No test depends on another test

## Documentation

- [ ] Public APIs have doc comments
- [ ] README updated if setup changed
- [ ] Relevant SPECIFICATIONS/ files updated
- [ ] API documented (if new endpoint)
- [ ] Database tables documented (if new migration)

## Security

- [ ] Auth check on endpoints (permission verified)
- [ ] Input validated and sanitized
- [ ] No SQL injection risk
- [ ] No XSS risk (output properly escaped)
- [ ] No mass assignment (DTOs don't expose sensitive fields)
