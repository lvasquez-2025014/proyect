# Logging — Estrategia

## Principios

1. **Logs estructurados en JSON** — legibles por máquina, parseables, searchables.
2. **Niveles de log semánticos** — cada nivel tiene un significado preciso.
3. **Contexto rico** — cada entrada incluye tenant, usuario, correlation ID.
4. **No loguear datos sensibles** — ni passwords, tokens, emails completos (solo hash), ni PII.

---

## Niveles de Log

| Nivel | Significado | Ejemplos |
|-------|-------------|----------|
| `ERROR` | Operación fallida que requiere atención humana | Excepción no esperada, conexión DB caída, pago rechazado |
| `WARN` | Operación exitosa pero con condiciones anormales | Producto sin stock, consulta lenta (>500ms), reintento de conexión |
| `INFO` | Evento importante del negocio | Orden creada, usuario registrado, factura pagada |
| `DEBUG` | Detalle de flujo interno | Entrada/salida de métodos, valores de variables (solo desarrollo) |
| `TRACE` | Traza detallada de request/response | Solo para debugging en staging |

## Reglas de Nivel

- **Nunca usar `ERROR` para eventos esperados** (un 404 no es un error).
- **Nunca usar `INFO` para debug** (cada ciclo de request no es un evento).
- **Usar `WARN` para umbrales** (no para operaciones normales).
- **En producción, nivel mínimo `INFO`**. `DEBUG` y `TRACE` se activan bajo demanda.

---

## Formato JSON

```json
{
  "@timestamp": "2026-07-16T10:30:00.123Z",
  "level": "INFO",
  "logger": "com.luxury.inventory.application.ProductService",
  "message": "Product created successfully",
  "correlation_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "tenant_id": "uuid",
  "user_id": "uuid",
  "module": "inventory",
  "entity_type": "Product",
  "entity_id": "uuid",
  "duration_ms": 45,
  "extra": {
    "sku": "LMW-001",
    "category": "Accessories"
  }
}
```

---

## Configuración (Logback)

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeContext>false</includeContext>
            <fieldNames>
                <timestamp>@timestamp</timestamp>
                <levelValue>[ignore]</levelValue>
                <version>[ignore]</version>
            </fieldNames>
        </encoder>
    </appender>

    <appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="JSON" />
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
    </appender>

    <root level="INFO">
        <appender-ref ref="ASYNC" />
    </root>
</configuration>
```

---

## Qué NO se Loggea

| ❌ No loggear | Razón |
|--------------|-------|
| Passwords (ni hash) | Riesgo de seguridad |
| Tokens JWT | Pueden ser reutilizados |
| Números completos de tarjeta | PCI compliance |
| Emails completos en logs no seguros | GDPR |
| Datos biométricos | Privacidad |
| Stack traces de SQL | Pueden exponer estructura interna |

---

## Correlation ID

Se genera en el frontend (o API Gateway) y se propaga a través de todos los servicios:

```java
// Backend: MDC filter
@Component
public class CorrelationIdFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain chain) {
        String correlationId = request.getHeader("X-Correlation-Id");
        if (correlationId == null) {
            correlationId = UUID.randomUUID().toString();
        }
        MDC.put("correlation_id", correlationId);
        response.setHeader("X-Correlation-Id", correlationId);
        chain.doFilter(request, response);
        MDC.clear();
    }
}
```

```typescript
// Frontend: fetch interceptor
const originalFetch = window.fetch;
window.fetch = (url, options) => {
  options.headers = {
    ...options.headers,
    'X-Correlation-Id': crypto.randomUUID(),
  };
  return originalFetch(url, options);
};
```

---

## Rotación y Retención

| Entorno | Rotación | Retención | Almacenamiento |
|---------|----------|-----------|---------------|
| Desarrollo | — | 7 días | Archivo local |
| Staging | Diaria | 30 días | Loki + Grafana |
| Producción | Horaria | 90 días | Loki + S3 (cold storage) |

---

## Frontend Logging

```typescript
// lib/logger.ts
const logger = {
  info: (message: string, data?: Record<string, unknown>) => {
    console.log(JSON.stringify({ level: 'INFO', message, ...data }));
    // En producción: enviar a backend logging endpoint
  },
  error: (error: Error, context?: Record<string, unknown>) => {
    console.error(JSON.stringify({ level: 'ERROR', message: error.message, stack: error.stack, ...context }));
    Sentry.captureException(error, { extra: context });
  },
};
```
