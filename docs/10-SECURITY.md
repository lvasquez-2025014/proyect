# Security — Luxury ERP

---

## Authentication & Authorization

### JWT
- **Access Token**: 15 minutes, signed with RS256 (asymmetric).
- **Refresh Token**: 7 days, stored in HTTP-only secure cookie.
- **Public/Private Key Pair**: generated per environment, stored securely (not in repo).

```yaml
# application.yml
jwt:
  private-key: ${JWT_PRIVATE_KEY}
  public-key: ${JWT_PUBLIC_KEY}
  access-token-expiration: 900000    # 15 min
  refresh-token-expiration: 604800000 # 7 days
```

### Authentication Flow
```
1. POST /api/v1/auth/login → { accessToken, refreshToken }
2. Client stores accessToken in memory (Zustand store)
3. All requests include Authorization: Bearer {accessToken}
4. On 401 → try refresh POST /api/v1/auth/refresh
5. On refresh failure → redirect to login
```

### Authorization
- **RBAC** (Role-Based Access Control).
- Roles: `ADMIN`, `MANAGER`, `SALES`, `WAREHOUSE`, `VIEWER`.
- Method-level security: `@PreAuthorize("hasRole('ADMIN')")`.
- Resource-level: custom `@PermissionCheck` annotation for data ownership.

```java
@PostMapping("/products")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
public ResponseEntity<ProductResponse> create(@Valid @RequestBody CreateProductRequest request) {
    return ResponseEntity.ok(service.create(request));
}
```

### Multi-Tenant
- Each company (tenant) has isolated data via `tenant_id` column.
- Tenant resolved from JWT claim `tenant_id`.
- All queries filter by `WHERE tenant_id = :currentTenant` (Spring Filter or Hibernate `@TenantId`).

## CORS

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    var config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(System.getenv("CORS_ORIGINS")));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);
    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}
```

## Security Headers

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.headers(headers -> headers
        .xssProtection(XssProtectionHeaderWriter.xssProtectionEnabled())
        .contentSecurityOptions(csp -> csp.policyDirectives(
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
        ))
        .frameOptions(frame -> frame.sameOrigin())
        .httpStrictTransportSecurity(hsts -> hsts
            .includeSubDomains(true)
            .maxAgeInSeconds(31536000))
    );
    return http.build();
}
```

## Rate Limiting

```java
// Using Bucket4j or Spring Cloud Gateway filter
@Bean
public Filter rateLimitFilter() {
    return (request, response, chain) -> {
        var bucket = Bucket4j.builder()
            .addLimit(Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1))))
            .build();
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).setStatus(429);
        }
    };
}
```

## XSS & CSRF

- **XSS**: All user input is sanitized on output (Thymeleaf/React auto-escape). CSP headers as additional layer.
- **CSRF**: Disabled for REST API (JWT is immune to CSRF). Enabled for cookie-based auth if used.
- **SQL Injection**: Prevented by JPA (parameterized queries). Raw queries use `@Query` with bind parameters.

## Data Protection

| Measure | Implementation |
|---------|---------------|
| Password hashing | BCrypt (Spring Security) |
| PII encryption | `@Column(columnDefinition = "BYTEA")` + AES-256 at application level |
| TLS | Enforced on all environments (Let's Encrypt auto-renewal) |
| Secrets management | Environment variables (never in repo) |
| Audit log | All CUD operations logged with timestamp, user, and IP |

## API Security Checklist

- [ ] All endpoints behind authentication (except `/api/v1/auth/*`, health, webhooks).
- [ ] JWT validated on every request (custom `OncePerRequestFilter`).
- [ ] Input validation on all endpoints (@Valid).
- [ ] Pagination limits enforced (max 100 per page).
- [ ] No sensitive data in URLs (use POST for auth).
- [ ] Error responses don't leak stack traces.
- [ ] CORS restricted to known origins.
- [ ] Rate limiting on auth endpoints (5 attempts per minute).
- [ ] Webhook signatures verified.
- [ ] Dependencies scanned weekly (Dependabot / Snyk).
