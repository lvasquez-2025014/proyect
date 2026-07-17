# Analytics API

## GET /api/v1/analytics/dashboard/{type}

Get dashboard data for a specific role.

**Path Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| type | enum | executive, sales_manager, inventory_manager, branch_manager, sales_associate |

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| branch_id | UUID | — | Filter by branch |
| date_from | date | first day of month | Start date |
| date_to | date | today | End date |

**Response 200** (executive)
```json
{
  "kpis": {
    "revenue": { "current": 125000.00, "previous": 98000.00, "change": 27.55 },
    "orders": { "current": 85, "previous": 72, "change": 18.06 },
    "customers": { "current": 320, "previous": 290, "change": 10.34 },
    "avg_order_value": { "current": 1470.59, "previous": 1361.11, "change": 8.04 }
  },
  "charts": {
    "monthly_revenue": [
      { "month": "2026-01", "value": 85000 },
      { "month": "2026-02", "value": 92000 }
    ],
    "sales_by_category": [
      { "category": "Ready-to-Wear", "value": 45000 },
      { "category": "Accessories", "value": 32000 }
    ],
    "sales_by_branch": [
      { "branch": "Madrid", "value": 65000 },
      { "branch": "Barcelona", "value": 35000 }
    ]
  },
  "alerts": {
    "low_stock": 5,
    "overdue_invoices": 3,
    "pending_approvals": 2
  }
}
```

## GET /api/v1/analytics/reports

Generate a custom report.

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| module | string | inventory, sales, crm, billing |
| type | string | stock_value, sales_summary, aging, etc. |
| format | string | json, csv, pdf, excel |
| date_from | date | Start date |
| date_to | date | End date |

**Response 200**: Depends on report type — returns data or file download link.

**Permissions**: MANAGER, ADMIN

## GET /api/v1/analytics/audit-log

View audit trail.

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| user_id | UUID | Filter by user |
| module | string | Filter by module |
| action | string | CREATE, UPDATE, DELETE |
| date_from | date | Start date |
| date_to | date | End date |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "user": { "id": "uuid", "name": "Carlos García" },
      "module": "inventory",
      "action": "UPDATE",
      "entity": "Product",
      "entity_id": "uuid",
      "changes": { "base_price": { "old": 2000, "new": 2500 } },
      "ip_address": "192.168.1.100",
      "created_at": "2026-07-16T10:30:00Z"
    }
  ]
}
```
