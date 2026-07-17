# EPIC-004: Sales & Order Management

**Status**: Pending
**Priority**: High
**Dependencies**: EPIC-001, EPIC-002 (Inventory)

## Description
Complete sales cycle: quotes, orders, fulfillment, returns. Integrates with Inventory for stock reservation and CRM for customer history.

## Objectives
- Quote creation and conversion to orders
- Full order lifecycle (draft → confirmed → shipped → delivered)
- Stock reservation on order confirmation
- Discount management with approval workflows
- Order status tracking
- Returns and credit notes

## Acceptance Criteria
- [ ] Create quotes with products, quantities, prices
- [ ] Convert quote to order (draft)
- [ ] Create orders directly
- [ ] Confirm order → reserve stock in Inventory
- [ ] Process partial shipments
- [ ] Cancel order → release stock in Inventory
- [ ] Apply per-line and per-order discounts
- [ ] Discounts above threshold require manager approval
- [ ] Returns create credit notes
- [ ] Order status visible in real-time
- [ ] Domain events published: OrderCreated, OrderConfirmed, OrderShipped, OrderDelivered, OrderCancelled

## Epic Dependencies
EPIC-001, EPIC-002

## Estimated Effort
3-4 sprints
