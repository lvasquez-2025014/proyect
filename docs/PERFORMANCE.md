# Performance — Guía Completa

## Principios

1. **La performance es una feature.** Un ERP lento cuesta dinero a los usuarios.
2. **Mide antes de optimizar.** Sin datos, no sabes qué optimizar.
3. **Optimiza para el p95, no el promedio.** El 5% más lento es el que duele.
4. **Capa por capa.** Frontend → API → Backend → DB, en ese orden.

---

## Frontend Performance

### Bundle Size
- Objetivo: JS inicial < 150KB (gzipped)
- Usar `next-bundle-analyzer` para inspeccionar
- Dynamic imports para librerías pesadas: `const Chart = dynamic(() => import('./Chart'))`
- Evitar `import *` de librerías grandes (lodash, moment → date-fns, dayjs)

### Images
- Next.js `<Image>` con `width`, `height`, `priority` para LCP
- Formato WebP, lazy loading para below-fold
- CDN (Vercel Edge / Cloudinary)
- Responsive images con `sizes` attribute

### Caching
- TanStack Query: staleTime configurado por recurso (products: 30s, categories: 5min)
- Static pages con ISR (revalidate cada hora)
- API responses cacheadas en Redis (ttl basado en frecuencia de cambio)

### Rendering
- Server Components por defecto (0 JS para contenido estático)
- Streaming con Suspense para cargas parciales
- React Server Components para datos que no necesitan interactividad

### Virtualization
- Listas largas (> 100 items): `@tanstack/react-virtual`
- Tablas grandes: server-side pagination (no cargar todo y virtualizar en cliente)

---

## API Performance

### Pagination
- Todas las listas con paginación server-side
- Page size máximo: 100 (default: 20)
- Keyset pagination para datasets grandes (evitar `OFFSET`)

### Response Size
- Seleccionar campos específicos (evitar `SELECT *`)
- JSON comprimido (gzip/brotli)
- No incluir relaciones completas si no se necesitan

### Caching
- Endpoints GET cacheados en Redis (ttl por tipo)
- Cache invalidation on write (tag-based: `product:*`)
- `Cache-Control` headers en responses

---

## Backend Performance

### Database Queries
- Siempre usar índices (ver `DATABASE/` para cada tabla)
- Fetch joins para relaciones (evitar N+1)
- Proyecciones específicas (no `SELECT *`)
- Paginación en DB (no cargar todo y filtrar en Java)

### Async Processing
| Operación | Procesamiento |
|-----------|--------------|
| PDF generation | Async + notificación |
| Email sending | Async (cola) |
| Report generation | Async + notificación |
| Bulk imports | Async con progress tracking |
| OCR processing | Async (cola) |

### Caching Layer (Redis)
```yaml
# Estrategia de cache
products:
  ttl: 300          # 5 min
  key: "product:{id}"
  invalidate_on: [product.update, product.delete]

categories:
  ttl: 1800         # 30 min
  key: "category:tree"
  invalidate_on: [category.create, category.update]

stock:
  ttl: 60           # 1 min (cambia frecuentemente)
  key: "stock:{productId}:{warehouseId}"
  invalidate_on: [stock.adjust, stock.reserve]
```

### Connection Pool
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      idle-timeout: 300000
      max-lifetime: 600000
      connection-timeout: 5000
```

---

## Database Performance

### Indexes
- Índices compuestos para queries frecuentes:
  ```sql
  CREATE INDEX idx_orders_tenant_status_created
      ON sales.orders(company_id, status, created_at DESC);
  ```
- Partial indexes para filtros comunes:
  ```sql
  CREATE INDEX idx_invoices_overdue
      ON billing.invoices(due_date)
      WHERE status NOT IN ('paid', 'cancelled');
  ```
- Covering indexes para index-only scans:
  ```sql
  CREATE INDEX idx_stock_summary ON inventory.stock(product_id, warehouse_id)
      INCLUDE (quantity, reserved);
  ```

### Query Optimization
- `EXPLAIN ANALYZE` en queries lentas
- Seq scan solo en tablas < 1000 filas
- `work_mem` ajustado para sorts en disco
- `effective_cache_size` = 75% de RAM disponible

### Connection Pool Tuning
- Pool size = `(core_count * 2) + effective_spindle_count`
- Para app típica (4 cores): ~10 conexiones
- Monitorear con `pg_stat_activity`

---

## CDN

| Recurso | CDN | Cache Policy |
|---------|-----|-------------|
| Images (products) | Vercel Edge / Cloudinary | 1 year, immutable |
| Static JS/CSS | Vercel Edge | 1 year, immutable |
| Fonts | Self-hosted + CDN | 1 year |
| API responses | Redis (app-level) | Por recurso |
| Pages | Vercel Edge (ISR) | Por página |

---

## Monitoreo de Performance

| Qué monitorear | Herramienta | Alerta si |
|----------------|-------------|-----------|
| LCP | Lighthouse CI / Web Vitals | > 2.5s |
| API latency (p95) | Prometheus + Grafana | > 1s |
| DB query time (p95) | pg_stat_statements | > 100ms |
| Cache hit ratio | Redis INFO | < 0.8 |
| Error rate | Sentry | > 1% |
| Bundle size | GitHub Actions (size-limit) | > 150KB gzip |
