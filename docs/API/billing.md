# Billing API

## Invoices

### GET /api/v1/billing/invoices

List invoices with filters.

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| status | enum | — | draft, sent, paid, overdue, cancelled, refunded |
| customer_id | UUID | — | Filter by customer |
| date_from | date | — | Issue date start |
| date_to | date | — | Issue date end |
| overdue | bool | — | Only overdue invoices |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "invoice_number": "INV-2026-0001",
      "customer": { "id": "uuid", "name": "María López" },
      "status": "sent",
      "issue_date": "2026-07-01",
      "due_date": "2026-07-31",
      "grand_total": 5203.00,
      "amount_paid": 0,
      "amount_due": 5203.00,
      "currency": "USD"
    }
  ]
}
```

### POST /api/v1/billing/invoices

Generate invoice (from order or manual).

**Request** (from order)
```json
{
  "order_id": "uuid"
}
```

**Request** (manual)
```json
{
  "customer_id": "uuid",
  "lines": [
    { "description": "Consulting services", "quantity": 1, "unit_price": 3000.00, "tax_rate": 0.21 }
  ],
  "due_date": "2026-08-15",
  "notes": "Invoice for August consulting"
}
```

**Response 201**: Returns created invoice

### POST /api/v1/billing/invoices/{id}/pay

Record a payment.

**Request**
```json
{
  "amount": 5203.00,
  "payment_method": "bank_transfer",
  "reference": "TRF-2026-001",
  "payment_date": "2026-07-20"
}
```

**Response 200**
```json
{
  "id": "uuid",
  "status": "paid",
  "amount_paid": 5203.00,
  "amount_due": 0
}
```

**Validations**
- Payment amount cannot exceed amount_due
- Partial payments allowed

### POST /api/v1/billing/invoices/{id}/credit-note

Generate credit note.

**Request**
```json
{
  "reason": "Customer returned item",
  "lines": [
    { "invoice_line_id": "uuid", "amount": 2500.00 }
  ]
}
```

**Response 201**: Returns credit note
