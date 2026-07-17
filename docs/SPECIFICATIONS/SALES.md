# Sales — Business Specification

## Objective
Manage the complete sales cycle from quotation to delivery, with support for luxury retail workflows.

## Actors
- Sales associate
- Concierge
- Branch manager
- Customer

## Use Cases
- Create quote (for a customer)
- Convert quote to order
- Create order directly
- Edit order (before confirmation)
- Add products to order (with variants)
- Apply discounts (percentage or fixed)
- Set shipping details
- Confirm order
- Cancel order
- Process return
- View order history
- Print order / quote PDF
- Send order confirmation to customer
- Track order status
- View sales dashboard

## Business Rules
- An order must have at least one line.
- Stock is reserved when order is confirmed (not before).
- Reservations expire after 24 hours if order is not confirmed.
- Discounts require approval if > configurable threshold.
- A confirmed order cannot be edited — only cancelled and re-created.
- A cancelled order releases all reserved stock.
- Returns create a credit note or refund.
- Each order line can be partially or fully returned.
- Gift cards and store credit can be used as payment (future).

## Order Status Flow
```
Draft → Confirmed → Processing → Shipped → Delivered
  ↓                              ↓
Cancelled ←───────────────── Returned
```

## Discount Rules
| Rule | Description |
|------|-------------|
| Max per-line discount | 50% of unit price |
| Max per-order discount | Configurable (default 30%) |
| Discount above limit | Requires manager approval |
| Promo codes | Future feature |

## Quote vs Order
| Feature | Quote | Order |
|---------|-------|-------|
| Reserves stock | No | Yes |
| Valid for | 30 days | N/A |
| Convertible to order | Yes | N/A |
| Editable after confirmation | N/A | No |
| Can be invoiced | No | Yes |

## Order Fields
| Field | Description |
|-------|-------------|
| Order number | Auto-generated |
| Customer | UUID |
| Branch | UUID |
| Sales associate | UUID |
| Status | Enum |
| Subtotal | Decimal |
| Discount | Decimal |
| Tax | Decimal |
| Total | Decimal |
| Notes | Text |
| Shipping address | Text |
