# Performance Checklist

## Frontend

### Build Time
- [ ] Bundle size analyzed (use `next-bundle-analyzer`)
- [ ] Code splitting at route level (Next.js does this automatically)
- [ ] Dynamic imports for heavy libraries: `const Chart = dynamic(() => import('./Chart'))`
- [ ] Tree-shaking confirmed (no unused imports)
- [ ] CSS purged (Tailwind does this; verify in production)

### Runtime
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images use Next.js `<Image>` with explicit dimensions
- [ ] Images served in WebP format
- [ ] Fonts self-hosted or preloaded (no FOIT)
- [ ] Third-party scripts loaded with `strategy: "lazyOnload"`
- [ ] API responses cached (TanStack Query stale time)
- [ ] Pagination on all list endpoints (max 100 per page)
- [ ] Debounced search inputs (>300ms)
- [ ] Virtual scrolling for long lists (future)

### Caching
- [ ] Static pages use ISR (Incremental Static Regeneration)
- [ ] API responses cached (Redis, server-side)
- [ ] SWR strategy for data fetching
- [ ] Service worker registered (PWA — future)

## Backend

### Database
- [ ] Query execution time < 100ms for 95% of queries
- [ ] N+1 queries eliminated (verified with Hibernate stats)
- [ ] Missing indexes detected (use `pg_stat_user_indexes`)
- [ ] Slow queries logged (auto-explain in production)
- [ ] Connection pool configured (HikariCP, max 20)
- [ ] Pagination uses keyset pagination for large datasets (future)

### API
- [ ] Response times < 500ms for 95% of requests
- [ ] Compression enabled (gzip/brotli)
- [ ] No serialization of unnecessary fields
- [ ] JSON serialization uses efficient library (Jackson with `jackson-module-blackbird` or similar)
- [ ] Bulk operations batched (not one-by-one in loops)

### Backend Processing
- [ ] Heavy operations use `@Async` or message queue
- [ ] PDF generation happens in background
- [ ] Email sending is async
- [ ] Report generation is async with download notification
- [ ] Caching layer for frequent queries (Redis)

## Measurement
- [ ] Lighthouse score > 90 for marketing pages
- [ ] PageSpeed Insights score > 85
- [ ] API performance monitored (Sentry / Prometheus)
- [ ] Performance budget defined and enforced in CI
