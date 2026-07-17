# Domain — Inventory (Bounded Context)

## Bounded Context: Inventory

**Ubicación**: `com.luxury.inventory`
**Esquema DB**: `inventory.*`
**Dueño del contexto**: Inventory Module

---

## Aggregate Roots

### Product
- **ID**: `ProductId` (UUID)
- **Entidades**: `Product`, `Variant`, `Category`, `Brand`
- **Value Objects**: `Sku`, `Money`, `TaxRate`, `Weight`, `Barcode`
- **Domain Events**: `ProductCreated`, `ProductUpdated`, `ProductDeactivated`
- **Reglas**:
  - SKU debe ser único por compañía
  - Precio base debe ser positivo
  - Un producto con stock > 0 no puede eliminarse (solo desactivarse)

### Stock
- **ID**: `StockId` (UUID)
- **Entidades**: `Stock`, `StockMovement`, `Warehouse`, `Lot`
- **Value Objects**: `Quantity`, `SerialNumber`, `LotNumber`
- **Domain Events**: `StockAdjusted`, `StockReserved`, `StockReleased`, `StockTransferInitiated`
- **Reglas**:
  - `available = quantity - reserved`, nunca negativo
  - Los movimientos de stock son append-only (nunca se eliminan)
  - Una reserva expira tras 24 horas si la orden no se confirma

### Warehouse
- **ID**: `WarehouseId` (UUID)
- **Entidades**: — (entidad simple)
- **Value Objects**: `WarehouseCode`, `Address`
- **Domain Events**: —

---

## Relaciones entre Aggregates

```
Product 1──N Variant
Product 1──N Stock
Stock N──1 Warehouse
Stock N──1 Lot
Stock 1──N StockMovement
```

## Invariantes del Contexto

- Un producto no puede tener stock negativo en ningún warehouse
- Una transferencia entre warehouses actualiza ambos stocks atómicamente
- El costo promedio se recalcula en cada recepción de stock

## Límites del Contexto

**Comunica con:**
- Sales → recibe `OrderConfirmedEvent` para reservar stock
- Sales → recibe `OrderCancelledEvent` para liberar stock
- Purchasing → recibe `GoodsReceivedEvent` para incrementar stock
- Billing → (no directo)

**No le pertenece:**
- Precios de venta (pertenecen a Sales)
- Órdenes de compra (pertenecen a Purchasing)
- Órdenes de venta (pertenecen a Sales)
