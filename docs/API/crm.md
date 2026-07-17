# CRM API

## Customers

### GET /api/v1/crm/customers

List customers with search and filters.

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| search | string | — | Search name, email, phone, company |
| type | enum | — | individual, organization |
| is_vip | bool | — | Filter VIP customers |
| assigned_to | UUID | — | Filter by sales associate |
| created_after | date | — | Customers created after date |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "type": "individual",
      "first_name": "María",
      "last_name": "López",
      "email": "maria@example.com",
      "phone": "+34 612 345 678",
      "company_name": null,
      "is_vip": true,
      "total_purchases": 12500.00,
      "order_count": 8,
      "last_purchase": "2026-07-01",
      "assigned_to": { "id": "uuid", "name": "Carlos García" },
      "created_at": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### GET /api/v1/crm/customers/{id}

Get customer details with addresses, preferences, and recent interactions.

**Response 200**
```json
{
  "id": "uuid",
  "type": "individual",
  "first_name": "María",
  "last_name": "López",
  "email": "maria@example.com",
  "phone": "+34 612 345 678",
  "is_vip": true,
  "addresses": [
    { "id": "uuid", "type": "billing", "line1": "Calle Serrano 42", "city": "Madrid", "is_primary": true }
  ],
  "preferences": {
    "clothing_size": "M",
    "shoe_size": "38",
    "preferred_color": "Gold",
    "preferred_material": "Silk",
    "allergies": "Nickel",
    "notes": "Prefers white glove delivery"
  },
  "recent_interactions": [
    { "id": "uuid", "type": "call", "subject": "Follow-up on watch order", "created_at": "2026-07-15" }
  ],
  "statistics": {
    "total_purchases": 12500.00,
    "order_count": 8,
    "average_order_value": 1562.50,
    "last_purchase": "2026-07-01",
    "lifetime_value": 12500.00
  }
}
```

### POST /api/v1/crm/customers

Create a new customer.

**Request**
```json
{
  "type": "individual",
  "first_name": "Ana",
  "last_name": "Martínez",
  "email": "ana@example.com",
  "phone": "+34 612 345 679",
  "is_vip": false,
  "addresses": [
    { "type": "both", "line1": "Calle Gran Vía 10", "city": "Madrid", "country": "Spain", "is_primary": true }
  ]
}
```

**Response 201**: Returns created customer

### POST /api/v1/crm/interactions

Log an interaction with a customer.

**Request**
```json
{
  "customer_id": "uuid",
  "type": "call",
  "subject": "Follow-up on product inquiry",
  "description": "Customer asked about new collection arrival",
  "direction": "outbound",
  "status": "completed"
}
```

**Response 201**
```json
{
  "id": "uuid",
  "type": "call",
  "subject": "Follow-up on product inquiry",
  "created_at": "2026-07-16T11:00:00Z"
}
```
