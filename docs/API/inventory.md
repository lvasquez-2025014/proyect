# Inventory API

## Products

### GET /api/v1/inventory/products

List products with pagination, filtering, and sorting.

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 0 | Zero-based page index |
| size | int | 20 | Page size (max 100) |
| sort | string | createdAt,desc | Sort field and direction |
| search | string | — | Search by name, SKU, barcode |
| category_id | UUID | — | Filter by category |
| brand_id | UUID | — | Filter by brand |
| status | enum | — | active, inactive |
| is_active | bool | — | Filter by active status |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "sku": "LMW-001",
      "name": "Leather Watch Strap",
      "description": "Hand-stitched Italian leather...",
      "category": { "id": "uuid", "name": "Accessories" },
      "brand": { "id": "uuid", "name": "Luxury Brand" },
      "base_price": 450.00,
      "cost_price": 180.00,
      "tax_rate": 0.21,
      "unit": "unit",
      "is_active": true,
      "has_variants": true,
      "stock_quantity": 45,
      "created_at": "2026-07-16T10:30:00Z",
      "updated_at": "2026-07-16T10:30:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "total_elements": 150,
  "total_pages": 8,
  "first": true,
  "last": false
}
```

**Permissions**: Authenticated

---

### GET /api/v1/inventory/products/{id}

Get product by ID.

**Response 200**
```json
{
  "id": "uuid",
  "sku": "LMW-001",
  "name": "Leather Watch Strap",
  "description": "Hand-stitched Italian leather...",
  "category": { "id": "uuid", "name": "Accessories" },
  "brand": { "id": "uuid", "name": "Luxury Brand" },
  "base_price": 450.00,
  "cost_price": 180.00,
  "tax_rate": 0.21,
  "unit": "unit",
  "is_active": true,
  "variants": [
    {
      "id": "uuid",
      "sku": "LMW-001-BLK",
      "attributes": { "color": "Black" },
      "price_adjustment": 0,
      "is_active": true
    }
  ],
  "images": [
    { "id": "uuid", "url": "https://cdn.luxury.com/img/1.jpg", "is_primary": true }
  ],
  "stock": { "total": 45, "reserved": 5, "available": 40 },
  "created_at": "2026-07-16T10:30:00Z",
  "updated_at": "2026-07-16T10:30:00Z"
}
```

**Response 404**
```json
{
  "title": "Not Found",
  "status": 404,
  "detail": "Product not found"
}
```

**Permissions**: Authenticated

---

### POST /api/v1/inventory/products

Create a new product.

**Request**
```json
{
  "sku": "LMW-002",
  "name": "Gold Pendant Necklace",
  "description": "18K gold pendant with diamond...",
  "category_id": "uuid",
  "brand_id": "uuid",
  "base_price": 2500.00,
  "cost_price": 1200.00,
  "tax_rate": 0.21,
  "unit": "unit",
  "is_active": true
}
```

**Response 201**: Returns created product (same as GET /{id})

**Response 400**
```json
{
  "title": "Validation Failed",
  "status": 400,
  "detail": "Validation error",
  "errors": [
    { "field": "sku", "message": "SKU is required" },
    { "field": "base_price", "message": "Must be positive" }
  ]
}
```

**Response 409**
```json
{
  "title": "Conflict",
  "status": 409,
  "detail": "SKU already exists"
}
```

**Permissions**: ADMIN, MANAGER

---

### PATCH /api/v1/inventory/products/{id}

Update product fields (partial update).

**Request**
```json
{
  "name": "Updated Name",
  "base_price": 2750.00
}
```

**Response 200**: Returns updated product

**Permissions**: ADMIN, MANAGER

---

### DELETE /api/v1/inventory/products/{id}

Soft delete a product.

**Response 204**: No content

**Response 409**
```json
{
  "title": "Conflict",
  "status": 409,
  "detail": "Cannot delete product with existing stock or open orders. Deactivate instead."
}
```

**Permissions**: ADMIN

---

## Categories

### GET /api/v1/inventory/categories

List categories as tree.

**Response 200**
```json
[
  {
    "id": "uuid",
    "name": "Ready-to-Wear",
    "slug": "ready-to-wear",
    "sort_order": 1,
    "children": [
      { "id": "uuid", "name": "Dresses", "slug": "dresses", "sort_order": 1, "children": [] }
    ]
  }
]
```

---

## Stock

### GET /api/v1/inventory/stock?product_id={id}&branch_id={id}

Get stock level for a product in a branch.

**Response 200**
```json
{
  "product_id": "uuid",
  "branch_id": "uuid",
  "warehouses": [
    {
      "id": "uuid",
      "name": "Main Warehouse",
      "quantity": 50,
      "reserved": 5,
      "available": 45
    }
  ],
  "total": { "quantity": 50, "reserved": 5, "available": 45 }
}
```

### POST /api/v1/inventory/stock/adjust

Adjust stock (physical count correction).

**Request**
```json
{
  "product_id": "uuid",
  "variant_id": "uuid",
  "warehouse_id": "uuid",
  "new_quantity": 48,
  "reason": "Physical count correction"
}
```

**Response 200**
```json
{
  "movement_id": "uuid",
  "previous_quantity": 50,
  "new_quantity": 48,
  "difference": -2
}
```

**Permissions**: ADMIN, INVENTORY_MANAGER
