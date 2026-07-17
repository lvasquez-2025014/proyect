# Backend Architecture — Spring Boot

## Request Lifecycle

```
HTTP Request
  │
  ├── Tomcat / Netty (WebServer)
  │
  ├── Filters
  │   ├── CorrelationIdFilter → MDC.put("correlation_id")
  │   ├── SecurityFilter → JWT validation → SecurityContext
  │   ├── TenantFilter → extract tenant_id → MDC + ThreadLocal
  │   └── RateLimitFilter → check rate limit
  │
  ├── DispatcherServlet
  │
  ├── Interceptors
  │   ├── LoggingInterceptor → log request/response
  │   └── AuditInterceptor → log access (lecturas)
  │
  ├── @RestController
  │   ├── @Valid → Jakarta Validation
  │   ├── @PreAuthorize → Spring Security
  │   └── Controller Method → ApplicationService
  │
  ├── @ExceptionHandler
  │   └── GlobalExceptionHandler → ProblemDetail (RFC 7807)
  │
  └── HTTP Response
```

---

## Capas

### Controllers
- Solo reciben/validan input y delegan a ApplicationService
- No contienen lógica de negocio
- Mapean a DTOs de request/response
- Anotaciones: `@PreAuthorize`, `@Valid`, `@PageableDefault`

### Application Services
- Orquestan use cases
- Manejan transacciones (`@Transactional`)
- Publican domain events
- No contienen lógica de dominio pura

### Domain Services
- Lógica de negocio pura (sin efectos secundarios)
- Sin dependencias de infraestructura
- Stateless

### Repositories (Ports)
- Interfaces definidas en `domain/port/outbound/`
- Implementadas en `infrastructure/persistence/`
- Solo métodos de dominio (no expongan JPA)

---

## Filtros (orden de ejecución)

```
1. CorrelationIdFilter      → MDC, response header
2. TenantFilter              → Extrae tenant_id del JWT
3. SecurityFilter            → Valida JWT, setea SecurityContext
4. RateLimitFilter           → Verifica rate limit por usuario/IP
5. RequestLoggingFilter      → Log de request entrante
6. Controller
7. ResponseLoggingFilter     → Log de response saliente
```

---

## Transacciones

### Reglas

1. `@Transactional` en ApplicationService, NUNCA en Controller o Repository
2. Transacciones cortas (< 1s). Operaciones largas → async
3. Eventos publicados después del commit (`@TransactionalEventListener(phase = AFTER_COMMIT)`)
4. READ ONLY para queries: `@Transactional(readOnly = true)`

### Ejemplo

```java
@Service
@Transactional
public class ProductApplicationService {
    private final ProductRepository repository;
    private final DomainEventPublisher events;

    public ProductResponse create(CreateProductRequest request) {
        var product = Product.create(request.sku(), request.name(), request.basePrice());
        var saved = repository.save(product);
        events.publish(new ProductCreatedEvent(saved.id()));
        return ProductMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(ProductMapper::toResponse);
    }
}
```

---

## Conexiones Externas

```
┌────────────────────────────────────────────────────────────┐
│                     Application                             │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │  PostgreSQL (JPA)   │  │    Redis (Lettuce)   │         │
│  │  Pool: HikariCP 20  │  │  Pool: max 10       │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │  MinIO (S3 Client)  │  │  RabbitMQ (future)  │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
│  ┌─────────────────────┐                                    │
│  │  External APIs      │                                    │
│  │  (Resend, Stripe)   │                                    │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Inicialización de la App

```
1. Flyway migrations (schema validation + migrations)
2. Seed data (roles, permissions, default admin)
3. Cache warmup (categorías, brands activas)
4. Health check endpoints registrados
5. Scheduled tasks started (daily stock alerts, invoice overdue check)
```

---

## Configuración por Ambiente

| Propiedad | Development | Staging | Production |
|-----------|-------------|---------|------------|
| DB URL | localhost:5432 | staging.render.com | prod.render.com |
| Redis | localhost:6379 | staging... | prod... |
| Log level | DEBUG | INFO | INFO |
| Tracing | disabled | 100% sample | 10% sample |
| CORS | * | staging domain | production domain |
| Rate limit | 1000/min | 200/min | 100/min |
| Async threads | 4 | 8 | 16 |

---

## Scheduled Tasks

```java
@Component
public class ScheduledTasks {
    // Daily at 6 AM: check low stock
    @Scheduled(cron = "0 0 6 * * *", zone = "UTC")
    public void checkLowStock() { ... }

    // Daily at 8 AM: send invoice overdue reminders
    @Scheduled(cron = "0 0 8 * * *", zone = "UTC")
    public void sendOverdueReminders() { ... }

    // Daily at 2 AM: recalculate customer segments
    @Scheduled(cron = "0 0 2 * * *", zone = "UTC")
    public void recalculateSegments() { ... }

    // Hourly: cleanup expired stock reservations
    @Scheduled(cron = "0 0 * * * *", zone = "UTC")
    public void cleanupExpiredReservations() { ... }
}
```
