# Inventory — Business Specification

## Objective
Manage stock across multiple branches and warehouses with full audit trail, supporting luxury-specific needs like variants, lots, and serial numbers.

## Actors
- Warehouse operator
- Inventory manager
- Branch manager
- System admin

## Use Cases

### Stock Management
- View current stock (by product, branch, warehouse)
- View stock movement history
- Transfer stock between branches
- Transfer stock between warehouses within a branch
- Adjust stock (count correction)
- Reserve stock for an order
- Release stock (order cancelled)
- Receive stock from supplier
- Set reorder point and maximum stock levels

### Lots & Serial Numbers
- Assign lot number on receipt
- Track serial numbers per item
- Query stock by lot
- Query stock by serial number
- Expiry date tracking (for lots)

### Reports
- Stock valuation report
- Low stock report
- Stock movement report
- Inventory aging report
- Inventory turnover report

## Business Rules
- Stock can never be negative (system enforces this).
- A stock movement is never deleted — only reversed with a compensating movement.
- Every modification must have: user, timestamp, reason, and previous value.
- A product with active stock cannot be deleted (only deactivated).
- Stock reservations expire after 24 hours if order is not confirmed.
- When stock is received, cost price is updated (weighted average).
- Serial numbers must be unique per product.
- Transfer between branches updates stock in both branches atomically.
- Low stock alerts trigger at reorder point.

## Movement Types
| Type | Description |
|------|-------------|
| inbound | Stock received from supplier |
| outbound | Stock shipped to customer |
| transfer_out | Sent to another branch |
| transfer_in | Received from another branch |
| adjustment | Physical count correction |
| reservation | Held for pending order |
| release | Reservation cancelled |

## Stock Visibility
- Stock per product is tracked at: product + variant + warehouse + lot level.
- Available stock = quantity - reserved.

## States (per stock record)
```
Active → Reserved
Reserved → Active (release)
Active → Outbound (sold)
```
