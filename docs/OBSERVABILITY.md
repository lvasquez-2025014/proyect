# Observabilidad — Métricas, Tracing, Health Checks

## Stack

| Componente | Tecnología | Propósito |
|------------|-----------|-----------|
| Métricas | Prometheus + Spring Actuator | KPIs técnicos y de negocio |
| Dashboards | Grafana | Visualización de métricas |
| Tracing | Micrometer + Jaeger | Trazas distribuidas entre módulos |
| Logs | Loki + Grafana | Agregación de logs JSON |
| Alertas | Grafana Alerting | Notificaciones en Slack/Email |
| Health | Spring Actuator | Endpoints de health check |

---

## Métricas

### Técnicas (Spring Actuator + Micrometer)

| Métrica | Descripción | Umbral de alerta |
|---------|-------------|-----------------|
| `jvm.memory.used` | Memoria JVM usada | > 80% del heap |
| `jvm.threads.live` | Threads activos | > 200 |
| `db.connections.active` | Conexiones DB activas | > 80% del pool |
| `http.server.requests.duration` | Duración de requests HTTP | p95 > 1000ms |
| `cache.hit.ratio` | Ratio de aciertos de caché | < 0.5 |

### De Negocio

| Métrica | Descripción | Tags |
|---------|-------------|------|
| `erp.orders.created.total` | Órdenes creadas | tenant, branch |
| `erp.orders.confirmed.total` | Órdenes confirmadas | tenant, branch |
| `erp.products.created.total` | Productos creados | tenant |
| `erp.invoices.paid.total` | Facturas pagadas | tenant, currency |
| `erp.stock.movements.total` | Movimientos de stock | tenant, type |
| `erp.users.active.total` | Usuarios activos | tenant |
| `erp.api.requests.total` | Requests por endpoint | tenant, method, status |

### Implementación

```java
@RestController
@RequestMapping("/api/v1/inventory/products")
public class ProductController {

    private final MeterRegistry meterRegistry;

    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody CreateProductRequest req) {
        var product = service.create(req);
        meterRegistry.counter("erp.products.created.total",
            Tags.of("tenant", currentTenant())
        ).increment();
        return ResponseEntity.created(...).body(product);
    }
}
```

---

## Health Checks

### Endpoints

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
      probes:
        enabled: true
```

### Health Check Endpoints

| Endpoint | Verifica | Status Code |
|----------|----------|-------------|
| `/actuator/health/liveness` | App responde | 200/503 |
| `/actuator/health/readiness` | DB, Redis conectados | 200/503 |
| `/actuator/health` | Todos los components | 200/503 |
| `/actuator/info` | Versión, commit, environment | 200 |

### Custom Health Indicators

```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        try {
            var result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return Health.up().withDetail("database", "PostgreSQL 16").build();
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}
```

---

## Tracing Distribuido

```yaml
# application.yml
management:
  tracing:
    sampling:
      probability: 0.1  # 10% de requests trazados
  zipkin:
    tracing:
      endpoint: http://jaeger:4318/api/v2/spans
```

Los traces incluyen:
- Request HTTP completo (method, path, status, duration)
- Llamadas a base de datos (query, params, duration)
- Llamadas a otros módulos vía eventos
- Propagación del `correlation_id`

---

## Dashboards (Grafana)

### Dashboard: Operaciones
- CPU / Memoria / Disco
- Throughput de requests (RPS)
- Latencia p50/p95/p99
- Tasa de error
- Conexiones DB activas
- Hit ratio de caché

### Dashboard: Negocio
- Órdenes creadas/confirmadas/canceladas (time series)
- Productos creados
- Facturas emitidas/pagadas/vencidas
- Stock movimientos por tipo
- Usuarios activos

### Dashboard: Módulo (por contexto)
- Inventory: stock bajo, ajustes, transferencias
- Sales: conversión quote→order, avg order value
- CRM: contactos creados, interacciones
- Billing: facturas vencidas, días promedio de cobro

---

## Reglas de Alerta

| Alerta | Condición | Canal | Prioridad |
|--------|-----------|-------|-----------|
| App caída | Health check falla 3 veces | Slack + Email | P0 |
| Error rate alto | > 5% en 5 minutos | Slack | P1 |
| Latencia alta | p95 > 2s en 5 minutos | Slack | P1 |
| DB conexiones | > 80% del pool | Slack | P2 |
| Disco | > 85% de uso | Slack | P2 |
| Stock bajo | Algún producto bajo reorder point | Slack (daily) | P3 |
| Facturas vencidas | > 10 invoices overdue > 30 días | Slack (daily) | P3 |
