# Prompt: Performance Review

```
Review performance of {component/page/endpoint}.

## Frontend Focus
- Bundle size for the route (use next-bundle-analyzer)
- Images optimized? (Next.js Image, WebP, dimensions set)
- Lazy loading for below-fold content?
- Client component scope minimized? (push "use client" down)
- Re-renders: unnecessary? (React DevTools profiler)
- TanStack Query caching configured? (staleTime, gcTime)
- Memoization needed? (useMemo/useCallback after profiling)

## Backend Focus
- N+1 queries? (Hibernate stats, logs)
- Indexes present for the query?
- Pagination used? (page size limited)
- Async for heavy operations?
- Caching (Redis) for frequent reads?

## Output Format
- Issue: description
- Severity: critical/major/minor
- Impact: estimated improvement
- Fix: specific code change
```
