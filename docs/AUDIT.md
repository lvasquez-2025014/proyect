# Audit — Sistema de Auditoría

## Principios

1. **Toda modificación de datos se audita.** No hay excepciones.
2. **El audit log es append-only.** Nunca se modifica ni elimina.
3. **El audit log incluye contexto completo.** Quién, qué, cuándo, cómo, valor anterior, valor nuevo.
4. **El audit log es seguro.** Solo SUPER_ADMIN puede leerlo.

---

## Tabla de Auditoría

```sql
CREATE SCHEMA audit;

CREATE TABLE audit.logs (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id      UUID NOT NULL,           -- Tenant
    user_id         UUID NOT NULL,           -- Quién
    user_email      VARCHAR(255) NOT NULL,   -- Email en ese momento (inmutable)
    user_ip         INET NOT NULL,           -- Desde dónde
    user_agent      TEXT,                    -- Navegador/cliente
    session_id      UUID,                    -- Sesión
    action          VARCHAR(20) NOT NULL,    -- CREATE, UPDATE, DELETE, RESTORE
    module          VARCHAR(50) NOT NULL,    -- inventory, sales, crm, billing
    entity_type     VARCHAR(50) NOT NULL,    -- Product, Order, Invoice
    entity_id       UUID NOT NULL,           -- ID del registro afectado
    changes         JSONB NOT NULL DEFAULT '{}',  -- {field: {old: X, new: Y}}
    metadata        JSONB NOT NULL DEFAULT '{}',  -- Contexto adicional
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_company ON audit.logs(company_id, created_at DESC);
CREATE INDEX idx_audit_user ON audit.logs(user_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit.logs(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit.logs(action);
CREATE INDEX idx_audit_module ON audit.logs(module);
CREATE INDEX idx_audit_created ON audit.logs(created_at);
```

---

## Implementación

### Backend: Spring AOP + Hibernate Envers (o custom)

```java
@Aspect
@Component
public class AuditAspect {

    @AfterReturning("@annotation(auditable)", returning = "result")
    public void audit(JoinPoint joinPoint, Auditable auditable, Object result) {
        AuditLog log = AuditLog.builder()
            .companyId(currentTenant())
            .userId(currentUser().id())
            .userEmail(currentUser().email())
            .userIp(request.getRemoteAddr())
            .userAgent(request.getHeader("User-Agent"))
            .sessionId(request.getSession().getId())
            .action(auditable.action())
            .module(auditable.module())
            .entityType(result.getClass().getSimpleName())
            .entityId(extractId(result))
            .changes(extractChanges(joinPoint, auditable))
            .metadata(extractMetadata(joinPoint))
            .build();
        auditRepository.save(log);
    }
}
```

### Anotación

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String action();    // CREATE | UPDATE | DELETE
    String module();    // inventory | sales | crm | billing
    String entity();    // Product | Order | Invoice
}
```

### Uso

```java
@Auditable(action = "UPDATE", module = "inventory", entity = "Product")
public ProductResponse update(UUID id, UpdateProductRequest request) { ... }
```

---

## Qué se Audita

| Acción | Se Audita | Cambios Registrados |
|--------|-----------|-------------------|
| CREATE producto | ✓ | Todos los campos iniciales |
| UPDATE producto | ✓ | Solo campos modificados {old → new} |
| DELETE producto | ✓ | Soft delete: deleted_at → timestamp |
| LOGIN | ✓ | user_id, IP, user-agent, éxito/fallo |
| LOGIN fallido | ✓ | email intentado, IP, user-agent |
| CREATE orden | ✓ | Todos los campos iniciales |
| CONFIRM orden | ✓ | Status: draft → confirmed |
| PAGO registro | ✓ | Método, monto, referencia |
| VIEW producto | ✗ | No se auditan lecturas |
| REPORT generado | ✓ | Usuario, tipo, fecha, filtros |
| EXPORT datos | ✓ | Usuario, tipo, registros exportados |

---

## Retención

| Tipo | Retención | Acción |
|------|-----------|--------|
| Audit logs | 5 años | Archive a cold storage |
| Login logs | 1 año | Delete |
| Export logs | 1 año | Delete |
| Report logs | 6 meses | Delete |

---

## API de Auditoría

```http
GET /api/v1/audit/logs?entity_type=Product&entity_id=uuid&page=0&size=20
Authorization: Bearer {super_admin_token}

Response:
{
  "content": [
    {
      "id": "uuid",
      "user": { "id": "uuid", "name": "Carlos García" },
      "action": "UPDATE",
      "module": "inventory",
      "entity_type": "Product",
      "entity_id": "uuid",
      "changes": {
        "base_price": { "old": "2000.00", "new": "2500.00" },
        "updated_at": { "old": "2026-07-15T10:00:00Z", "new": "2026-07-16T10:30:00Z" }
      },
      "metadata": { "reason": "Price adjustment for new collection" },
      "ip": "192.168.1.100",
      "created_at": "2026-07-16T10:30:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "total_elements": 1
}
```
