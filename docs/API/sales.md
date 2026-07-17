# Sales API

## Orders

### GET /api/v1/sales/orders

List orders with pagination and filters.

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 0 | Page index |
| size | int | 20 | Page size |
| sort | string | createdAt,desc | Sort |
| status | enum | — | draft, confirmed, processing, shipped, delivered, cancelled |
| customer_id | UUID | — | Filter by customer |
| branch_id | UUID | — | Filter by branch |
| created_by | UUID | — | Filter by sales associate |
| date_from | date | — | Start date |
| date_to | date | — | End date |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "order_number": "ORD-2026-0001",
      "customer": { "id": "uuid", "name": "María López" },
      "status": "confirmed",
      "sub_total": 4500.00,
      "discount_total": 200.00,
      "tax_total": 903.00,
      "grand_total": 5203.00,
      "currency": "USD",
      "branch": { "id": "uuid", "name": "Madrid Boutique" },
      "created_by": { "id": "uuid", "name": "Carlos García" },
      "line_count": 3,
      "created_at": "2026-07-16T10:30:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "total_elements": 45,
  "total_pages": 3
}
```

**Permissions**: Authenticated

---

### POST /api/v1/sales/orders

Create a new order.

**Request**
```json
{
  "customer_id": "uuid",
  "branch_id": "uuid",
  "lines": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": 2,
      "unit_price": 2500.00,
      "tax_rate": 0.21
    }
  ],
  "discounts": [
    { "type": "percentage", "value": 10, "reason": "VIP customer" }
  ],
  "notes": "Gift wrapping requested",
  "shipping_address": "Calle Serrano 42, Madrid"
}
```

**Response 201**: Returns created order

**Validations**
- At least 1 line
- Product exists and is active
- Quantity > 0
- Discount requires approval if > limit

**Permissions**: SALES, MANAGER, ADMIN

---

### PATCH /api/v1/sales/orders/{id}/status

Update order status.

**Request**
```json
{
  "status": "confirmed"
}
```

**Response 200**: Returns updated order

**Valid Transitions**
| From | To |
|------|----|
| draft | confirmed |
| draft | cancelled |
| confirmed | processing |
| processing | shipped |
| shipped | delivered |
| confirmed | cancelled |
| delivered | returned |

**Permissions**: varies by status change

---

### POST /api/v1/sales/orders/{id}/cancel

Cancel an order.

**Request**
```json
{
  "reason": "Customer requested cancellation"
}
```

**Response 200**: Returns cancelled order
