# FEATURE-0005: Create Order

**Status**: Pending
**Priority**: High
**Epic**: EPIC-004 (Sales)
**Estimate**: 5 days

## Description
Create a sales order with products, quantities, prices, and discounts. Full order lifecycle management.

## Acceptance Criteria
- [ ] Select customer (from CRM)
- [ ] Add products with quantities
- [ ] Support product variants
- [ ] Per-line unit price (override)
- [ ] Per-line and per-order discounts (percentage or fixed)
- [ ] Discount approval if above threshold
- [ ] Order totals: subtotal, discount, tax, grand total
- [ ] Order status tracking (draft → confirmed → ...)
- [ ] Order number auto-generated
- [ ] Notes and shipping address
- [ ] Create order as draft
- [ ] Confirm order (reserves stock, updates CRM)

## API Endpoints
- POST /api/v1/sales/orders
- GET /api/v1/sales/orders (paginated, filterable)
- GET /api/v1/sales/orders/{id}
- PATCH /api/v1/sales/orders/{id}/status
- POST /api/v1/sales/orders/{id}/cancel

## UI
- Order creation form with customer selector, product picker, line editor
- Order detail view with status timeline
- Order list with filters and search
