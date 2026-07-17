# Integration — Stripe

**Status**: Planned
**Priority**: High

## Scope
Process payments for invoices, subscriptions, and e-commerce orders.

## Capabilities
- Payment intent creation
- Webhook for payment confirmation, failure, refund
- Subscription management (recurring invoices)
- Multi-currency support

## Requirements
- Stripe Connect (for multi-tenant payment routing)
- Webhook endpoints for async events
- PCI compliance (Stripe handles card data — we never store it)

## Data Flow
```
ERP → Stripe API → Payment Intent
Stripe → Webhook → Payment Confirmation → ERP → Update Invoice
ERP → Stripe API → Refund
Stripe → Webhook → Refund Confirmation → ERP → Credit Note
```

## Events Consumed
| Stripe Event | ERP Action |
|-------------|-----------|
| `payment_intent.succeeded` | Mark invoice as paid |
| `payment_intent.payment_failed` | Log failure, notify customer |
| `charge.refunded` | Create credit note |
| `invoice.payment_succeeded` | Mark recurring invoice as paid |

## Security
- Stripe API key stored as environment variable
- Webhook signature verification (Stripe-Signature header)
- No card data stored in ERP database
