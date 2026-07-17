# Domain — Notifications (Bounded Context)

## Bounded Context: Notifications

**Ubicación**: `com.luxury.notifications` (compartido / infraestructura)
**Esquema DB**: `notifications.*`
**Dueño del contexto**: Shared Kernel

---

## Aggregate Roots

### Notification
- **ID**: `NotificationId` (UUID)
- **Entidades**: `Notification`, `NotificationDelivery`
- **Value Objects**: `NotificationType`, `NotificationChannel`, `NotificationPriority`, `TemplateName`
- **Domain Events**: `NotificationCreated`, `NotificationDelivered`, `NotificationFailed`
- **Reglas**:
  - Una notificación puede entregarse por múltiples canales (in-app + email)
  - Los canales se configuran por usuario y tipo
  - Las notificaciones críticas no pueden desactivarse
  - In-app notifications se retienen 90 días

### NotificationTemplate
- **ID**: `TemplateId` (UUID)
- **Entidades**: `Template`, `TemplateTranslation`
- **Value Objects**: `TemplateVariables`
- **Domain Events**: —
- **Reglas**:
  - Las plantillas soportan variables: `{{user_name}}`, `{{order_number}}`, etc.
  - Cada template tiene versiones para cada idioma soportado

---

## Tipos de Notificación

| Tipo | Prioridad | Canales |
|------|-----------|---------|
| `STOCK_LOW` | Alta | in-app, email |
| `ORDER_CONFIRMED` | Media | in-app, email |
| `ORDER_SHIPPED` | Media | in-app, email |
| `INVOICE_OVERDUE` | Alta | in-app, email |
| `PAYMENT_RECEIVED` | Media | in-app |
| `APPROVAL_REQUIRED` | Alta | in-app, email |
| `SYSTEM_MAINTENANCE` | Crítica | in-app, email |
| `PASSWORD_CHANGED` | Alta | email |
| `WELCOME` | Media | email |

---

## Invariantes del Contexto

- Una notificación crítica siempre se entrega por al menos un canal
- El envío de email es asíncrono (no bloquea la operación que lo origina)
- Las notificaciones fallidas se reintentan 3 veces

## Límites del Contexto

**Escucha eventos de:**
- Inventory → `StockLowEvent`
- Sales → `OrderConfirmedEvent`, `OrderShippedEvent`
- Billing → `InvoiceOverdueEvent`, `PaymentReceivedEvent`
- Identity → `UserCreatedEvent`, `PasswordChangedEvent`
- CRM → eventos de cumpleaños e inactividad

**No le pertenece:**
- Contenido de las notificaciones (se define en templates)
- Canales físicos (email, SMS — son implementaciones de infraestructura)
