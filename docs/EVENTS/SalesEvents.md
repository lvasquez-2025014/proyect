# Events — Sales

## Event Catalog

| Event | Publisher | Payload | Consumidores |
|-------|-----------|---------|-------------|
| `QuoteCreated` | Sales | `quoteId, customerId, total, salesPersonId` | CRM, Audit |
| `QuoteConverted` | Sales | `quoteId, orderId, customerId` | CRM, Audit |
| `QuoteExpired` | Sales | `quoteId, customerId` | CRM (notifica al vendedor) |
| `OrderCreated` | Sales | `orderId, customerId, total, branchId, lines[]` | CRM, Audit |
| `OrderConfirmed` | Sales | `orderId, lines[{productId, variantId, quantity}]` | Inventory (reservar stock), Audit |
| `OrderShipped` | Sales | `orderId, trackingNumber, carrier` | Notifications, Audit |
| `OrderDelivered` | Sales | `orderId` | Billing (generar invoice), Notifications, Audit |
| `OrderCancelled` | Sales | `orderId, reason, lines[{productId, variantId, quantity}]` | Inventory (liberar stock), Billing, Audit |

## Event Flow Examples

### Order Placed → Confirmed
```
User → OrderController.create()
  → OrderApplicationService.create()
    → OrderRepository.save(OrderStatus.DRAFT)
    → EventPublisher.publish(OrderCreatedEvent)
      → CRMListener (actualiza purchase history)

User → OrderController.confirm()
  → OrderApplicationService.confirm()
    → OrderDomainService.confirm()
    → OrderRepository.save(OrderStatus.CONFIRMED)
    → EventPublisher.publish(OrderConfirmedEvent)
      → InventoryListener (StockService.reserve())
        → EventPublisher.publish(StockReservedEvent)
```

### Order Cancelled
```
User → OrderController.cancel()
  → OrderApplicationService.cancel()
    → OrderRepository.save(OrderStatus.CANCELLED)
    → EventPublisher.publish(OrderCancelledEvent)
      → InventoryListener (StockService.release())
        → EventPublisher.publish(StockReleasedEvent)
      → BillingListener (cancela invoices pendientes)
```
