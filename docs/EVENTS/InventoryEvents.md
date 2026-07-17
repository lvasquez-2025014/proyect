# Events — Inventory

## Event Catalog

| Event | Publisher | Payload | Consumidores |
|-------|-----------|---------|-------------|
| `ProductCreated` | Inventory | `productId, sku, name, categoryId` | Audit, Search |
| `ProductUpdated` | Inventory | `productId, sku, changedFields` | Audit, Search |
| `ProductDeactivated` | Inventory | `productId` | Sales (no permite nuevas ventas) |
| `StockAdjusted` | Inventory | `productId, variantId, warehouseId, previousQty, newQty, reason, userId` | Audit |
| `StockReserved` | Inventory | `productId, variantId, warehouseId, quantity, orderId` | Audit |
| `StockReleased` | Inventory | `productId, variantId, warehouseId, quantity, orderId` | Audit |
| `StockTransferInitiated` | Inventory | `productId, quantity, sourceWarehouse, targetWarehouse` | Audit |
| `StockLow` | Inventory | `productId, currentStock, reorderPoint` | Notifications, Purchasing |
| `StockReceived` | Inventory | `productId, quantity, warehouseId, poId` | Purchasing, Audit |

## Event Flow Examples

### Product Created
```
User → ProductController.create()
  → ProductApplicationService.create()
    → ProductDomainService.create()
    → ProductRepository.save()
    → EventPublisher.publish(ProductCreatedEvent)
      → AuditListener (registra en audit log)
      → SearchIndexer (indexa para búsqueda)
```

### Stock Reserved (from confirmed order)
```
Sales → OrderConfirmedEvent
  → Inventory StockReservationListener
    → StockService.reserve()
    → StockRepository.save()
    → EventPublisher.publish(StockReservedEvent)
      → AuditListener
```
