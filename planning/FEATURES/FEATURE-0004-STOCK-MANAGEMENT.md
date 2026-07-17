# FEATURE-0004: Stock Management

**Status**: Pending
**Priority**: High
**Epic**: EPIC-002 (Inventory)
**Estimate**: 5 days

## Description
Track stock levels per product+variant+warehouse, record movements, manage adjustments and transfers.

## Acceptance Criteria
- [ ] View stock levels for a product (by warehouse)
- [ ] Record inbound stock (purchase receipt)
- [ ] Record outbound stock (sale shipment)
- [ ] Stock adjustment (physical count correction)
- [ ] Stock transfer between warehouses
- [ ] Stock movement history (append-only, never deleted)
- [ ] Stock reservations (for confirmed orders)
- [ ] Low stock indicator (highlight products below reorder point)
- [ ] Stock audit log: who, what, when, previous value, new value

## Business Rules
- Stock can never be negative
- A movement is never deleted (only reversed)
- Available = quantity - reserved
- Reservations expire after 24 hours

## API Endpoints
- GET /api/v1/inventory/stock?productId=&warehouseId=
- POST /api/v1/inventory/stock/adjust
- POST /api/v1/inventory/stock/transfer
- GET /api/v1/inventory/stock/movements?productId=
