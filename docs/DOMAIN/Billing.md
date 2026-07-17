# Domain — Billing (Bounded Context)

## Bounded Context: Billing

**Ubicación**: `com.luxury.billing`
**Esquema DB**: `billing.*`
**Dueño del contexto**: Billing Module

---

## Aggregate Roots

### Invoice
- **ID**: `InvoiceId` (UUID)
- **Entidades**: `Invoice`, `InvoiceLine`, `Payment`
- **Value Objects**: `InvoiceNumber`, `InvoiceStatus`, `Money`, `TaxAmount`, `PaymentMethod`
- **Domain Events**: `InvoiceCreated`, `InvoiceSent`, `PaymentReceived`, `InvoiceOverdue`, `InvoiceCancelled`
- **Reglas**:
  - Una factura puede generarse desde una orden (automática) o manualmente
  - Una orden puede tener múltiples facturas (facturación parcial)
  - Una factura pagada no puede modificarse — solo notarse de crédito
  - Una factura vencida no puede pagarse parcialmente por debajo del mínimo

### CreditNote
- **ID**: `CreditNoteId` (UUID)
- **Entidades**: `CreditNote`, `CreditNoteLine`
- **Domain Events**: `CreditNoteIssued`
- **Reglas**:
  - Una nota de crédito reduce el saldo de la factura original
  - No puede exceder el monto de la factura original

### RecurringInvoice
- **ID**: `RecurringInvoiceId` (UUID)
- **Entidades**: `RecurringInvoice`, `RecurringLine`
- **Value Objects**: `Schedule` (frequency, day, interval)
- **Domain Events**: `RecurringInvoiceGenerated`

---

## Máquina de Estados (Invoice)

```
                ┌─────────┐
                │  Draft   │
                └────┬─────┘
                     │
              ┌──────▼──────┐
              │    Sent     │
              └──────┬──────┘
                     │
           ┌─────────┼─────────┐
           │         │         │
     ┌─────▼──┐  ┌──▼────┐  ┌─▼──────┐
     │  Paid   │  │Overdue│  │Partial │
     └────┬───┘  └──┬────┘  └──┬─────┘
          │         │          │
     ┌────▼──┐      │          │
     │Refund │◄─────┴──────────┘
     └───────┘

  Draft ──────► Cancelled
```

---

## Value Objects principales

| Value Object | Atributos |
|-------------|-----------|
| `InvoiceNumber` | prefix, year, sequence |
| `TaxAmount` | rate, base, amount |
| `PaymentMethod` | type (card, transfer, cash, check), reference |
| `DueDate` | date, terms |

## Invariantes del Contexto

- `amount_due = grand_total - amount_paid`, siempre ≥ 0
- Una factura no puede pagarse por encima de `grand_total` (el exceso crea una nota de crédito o queda como crédito a favor)
- Los impuestos se calculan por línea, no sobre el total (para soporte multi-tasa)

## Límites del Contexto

**Comunica con:**
- Sales → recibe `OrderDeliveredEvent` para auto-generar invoice
- Notifications → publica `InvoiceOverdue` para recordatorios

**No le pertenece:**
- Órdenes (pertenecen a Sales)
- Clientes (pertenecen a CRM)
