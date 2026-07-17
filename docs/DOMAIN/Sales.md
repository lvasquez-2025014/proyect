# Domain — Sales (Bounded Context)

## Bounded Context: Sales

**Ubicación**: `com.luxury.sales`
**Esquema DB**: `sales.*`
**Dueño del contexto**: Sales Module

---

## Aggregate Roots

### Order
- **ID**: `OrderId` (UUID)
- **Entidades**: `Order`, `OrderLine`, `Discount`
- **Value Objects**: `OrderNumber`, `OrderStatus`, `Money`, `Percentage`, `Quantity`
- **Domain Events**: `OrderCreated`, `OrderConfirmed`, `OrderShipped`, `OrderDelivered`, `OrderCancelled`
- **Reglas**:
  - Una orden debe tener al menos una línea
  - El estado sigue una máquina de estados estricta
  - Una orden confirmada no puede editarse
  - Los descuentos sobre el límite requieren aprobación

### Quote
- **ID**: `QuoteId` (UUID)
- **Entidades**: `Quote`, `QuoteLine`
- **Value Objects**: `QuoteStatus`, `ValidityPeriod`
- **Domain Events**: `QuoteCreated`, `QuoteConverted`, `QuoteExpired`
- **Reglas**:
  - Una cotización vence a los 30 días
  - Una cotización no reserva stock
  - Convertir una cotización → crea una orden en estado draft

---

## Máquina de Estados (Order)

```
                ┌─────────┐
                │  Draft   │
                └────┬─────┘
                     │
              ┌──────▼──────┐
              │  Confirmed  │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │  Processing │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Shipped   │
              └──────┬──────┘
                     │
              ┌──────▼───────┐
              │  Delivered   │
              └──────┬───────┘
                     │
              ┌──────▼──────┐
              │  Returned   │
              └─────────────┘

  Draft ──────► Cancelled
  Confirmed ──► Cancelled
```

---

## Invariantes del Contexto

- Una orden confirmada reserva stock en Inventory
- Una orden cancelada libera stock en Inventory
- El total de la orden = suma de líneas - descuentos + impuestos

## Límites del Contexto

**Comunica con:**
- Inventory → publica `OrderConfirmedEvent`, `OrderCancelledEvent`
- CRM → publica `OrderCreatedEvent` (actualiza historial del cliente)
- Billing → (invoice generada desde order)

**No le pertenece:**
- Stock (pertenece a Inventory)
- Clientes (pertenecen a CRM)
- Facturas (pertenecen a Billing)
