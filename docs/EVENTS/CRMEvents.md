# Events — CRM

## Event Catalog

| Event | Publisher | Payload | Consumidores |
|-------|-----------|---------|-------------|
| `ContactCreated` | CRM | `contactId, name, email, type` | Search, Audit |
| `ContactUpdated` | CRM | `contactId, changedFields` | Search, Audit |
| `ContactMerged` | CRM | `survivorId, mergedId` | Sales (reassign orders), Billing (reassign invoices), Audit |
| `ContactDeactivated` | CRM | `contactId` | Sales (no permite nuevas órdenes) |
| `InteractionLogged` | CRM | `interactionId, contactId, type, subject` | Audit |
| `SegmentUpdated` | CRM | `segmentId, memberCount, added[], removed[]` | Audit |
| `ContactBecameVip` | CRM | `contactId, tier` | Notifications (notifica al vendedor asignado) |
| `ContactInactive` | CRM | `contactId, daysSinceLastPurchase` | Notifications (alerta al vendedor) |

## Event Flow Examples

### New Customer → Welcome
```
User → ContactController.create()
  → ContactApplicationService.create()
    → ContactRepository.save()
    → EventPublisher.publish(ContactCreatedEvent)
      → SearchIndexer (indexa para búsqueda)
      → NotificationsListener (envía email de bienvenida)
      → AuditListener
```

### Order → Customer History Update
```
OrderCreatedEvent (from Sales)
  → CRM OrderHistoryListener
    → ContactService.recordPurchase(orderId, customerId, total)
    → ContactRepository.save(updated purchase stats)
    → Check if contact qualifies for VIP tier
      → if yes: EventPublisher.publish(ContactBecameVipEvent)
```
