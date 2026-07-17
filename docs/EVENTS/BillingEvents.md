# Events — Billing

## Event Catalog

| Event | Publisher | Payload | Consumidores |
|-------|-----------|---------|-------------|
| `InvoiceCreated` | Billing | `invoiceId, orderId, customerId, total, dueDate` | CRM, Audit |
| `InvoiceSent` | Billing | `invoiceId, customerId, channel` | Audit |
| `PaymentReceived` | Billing | `invoiceId, amount, method, reference` | Sales (marca orden como pagada), CRM, Audit |
| `InvoiceOverdue` | Billing | `invoiceId, customerId, amountDue, daysOverdue` | Notifications, CRM |
| `InvoiceCancelled` | Billing | `invoiceId, reason` | Sales, Audit |
| `CreditNoteIssued` | Billing | `creditNoteId, invoiceId, amount, reason` | CRM, Audit |
| `InvoicePaid` | Billing | `invoiceId, totalPaid, paymentDate` | Sales (order fulfilled), CRM |

## Event Flow Example

### Invoice → Payment → Reconciliation
```
OrderDeliveredEvent (from Sales)
  → Billing InvoiceGenerationListener
    → InvoiceApplicationService.generateFromOrder()
    → InvoiceRepository.save(InvoiceStatus.SENT)
    → EventPublisher.publish(InvoiceCreatedEvent)
      → CRMListener

User → PaymentController.record()
  → PaymentApplicationService.record()
    → PaymentRepository.save()
    → InvoiceService.updatePaidAmount()
    → if invoice.total == invoice.amountPaid:
        → InvoiceRepository.save(InvoiceStatus.PAID)
        → EventPublisher.publish(InvoicePaidEvent)
          → SalesListener (marca orden como pagada)
```
